<script lang="ts">
import { defineComponent, ref, onMounted, computed, onUnmounted, watch } from 'vue';
import { reverseGeocode } from '@/utils/reverseGeocode';
import { io, Socket } from 'socket.io-client';
import { mqttService, type InterruptModeConfig } from '@/services/mqtt.service';
import Swal from 'sweetalert2';

const FAILOVER_TIMEOUT_MS = 10_000; // 10 seconds timeout for main device

export default defineComponent({
  setup() {
    const mainDevice = ref<any>(null);
    const simDevice = ref<any>(null);
    const lastMainUpdate = ref<number>(0);
    const now = ref(Date.now());
    const socket = ref<Socket | null>(null);
    const connectionStatus = ref<string>('disconnected');
    const updateInterval = ref<NodeJS.Timeout | null>(null);
    


    onMounted(() => {
      // Initialize MQTT service
      mqttService.initialize();
      
      // Connect to backend Socket.io server
      socket.value = io('http://localhost:3001', {
        withCredentials: true,
        transports: ['websocket', 'polling']
      });

      // Connection status handling
      socket.value.on('connect', () => {
        connectionStatus.value = 'connected';
        console.log('Connected to backend server');
      });

      socket.value.on('disconnect', () => {
        connectionStatus.value = 'disconnected';
        console.log('Disconnected from backend server');
      });

      // Handle initial data when client first connects
      socket.value.on('initialData', (data) => {
        console.log('Received initial data:', data);
        if (data.main) {
          mainDevice.value = data.main;
          lastMainUpdate.value = data.main.timestamp || Date.now();
        }
        if (data.sim) {
          simDevice.value = data.sim;
        }
      });

      // Handle real-time device updates
      socket.value.on('deviceUpdate', (update) => {
        console.log('Device update received:', update);
        if (update.type === 'main' || update.type === 'device') {
          mainDevice.value = update.data;
          lastMainUpdate.value = Date.now();
        } else if (update.type === 'sim') {
          simDevice.value = update.data;
        }
      });

      // Periodically update 'now' so computed property reacts to time
      updateInterval.value = setInterval(() => {
        now.value = Date.now();
      }, 1000);
    });

    onUnmounted(() => {
      if (socket.value) {
        socket.value.disconnect();
      }
      if (updateInterval.value) {
        clearInterval(updateInterval.value);
      }
      // Disconnect MQTT service
      mqttService.disconnect();
    });

    // Computed property for displaying device with failover
    const displayedDevice = computed(() => {
      if (mainDevice.value && now.value - lastMainUpdate.value <= FAILOVER_TIMEOUT_MS) {
        return mainDevice.value;
      } else if (simDevice.value) {
        return simDevice.value;
      }
      return null;
    });

    // Non-blocking safe device used by the template so the UI doesn't wait for live data
    const safeDevice = computed(() => {
      return displayedDevice.value || {
        name: 'Unknown Device',
        location: 'N/A',
        type: 'Unknown',
        status: 'offline',
        lastSeen: 'Never',
        metrics: []
      };
    });

    // Abstract location (sector/district)
    const abstractLocation = ref('');

    watch(displayedDevice, async (device) => {
      if (device && typeof device.location === 'string') {
        // If location is coordinates
        if (/^-?\d+\.\d+,\s*-?\d+\.\d+$/.test(device.location)) {
          const [lat, lon] = device.location.split(',').map(s => parseFloat(s.trim()));
          const data = await reverseGeocode(lat, lon);
          // Try to extract sector/district/city/town/village
          let area = '';
          if (data && data.address) {
            // Concatenate relevant fields for specificity
            const parts: string[] = [];
            if (data.address.city_district) parts.push(data.address.city_district);
            if (data.address.suburb) parts.push(data.address.suburb);
            if (data.address.neighbourhood) parts.push(data.address.neighbourhood);
            if (data.address.city) parts.push(data.address.city);
            if (data.address.town) parts.push(data.address.town);
            if (data.address.village) parts.push(data.address.village);
            if (data.address.state_district) parts.push(data.address.state_district);
            if (data.address.state) parts.push(data.address.state);
            if (data.address.county) parts.push(data.address.county);
            if (data.address.country) parts.push(data.address.country);
            // Remove duplicates and join
            area = Array.from(new Set(parts)).join(', ');
            if (!area && data.display_name) {
              area = data.display_name.split(',').slice(0,3).join(', ');
            }
            if (!area) area = device.location;
          } else if (data && data.display_name) {
            area = data.display_name.split(',').slice(0,3).join(', ');
          } else {
            area = device.location;
          }
          abstractLocation.value = area;
        } else {
          abstractLocation.value = device.location;
        }
      }
    }, { immediate: true });
    const statusClass = computed(() => {
      const status = displayedDevice.value?.status;
      switch (status) {
        case 'online':
          return 'badge-light-success';
        case 'offline':
          return 'badge-light-danger';
        case 'warning':
          return 'badge-light-warning';
        case 'NORMAL':
          return 'badge-light-primary';
        default:
          return 'badge-light-primary';
      }
    });

    const metricClass = (metric: any) => {
      if (metric.type.toLowerCase().includes('battery') && metric.value <= 20) return 'text-danger';
      if (metric.type.toLowerCase().includes('signal') && metric.value <= 50) return 'text-warning';
      return 'text-primary';
    };

    const connectionStatusClass = computed(() => {
      return connectionStatus.value === 'connected' ? 'text-success' : 'text-danger';
    });

    // Modal/Popup functionality
    const showLogModal = ref<boolean>(false);
    const showModeModal = ref<boolean>(false);
    const showSetNoModal = ref<boolean>(false);
    const showElectrodeModal = ref<boolean>(false);
    
    // Mode options and sub-modals
    const showNormalModal = ref<boolean>(false);
    const showAutoModal = ref<boolean>(false);
    const showManualModal = ref<boolean>(false);
    const showDpolModal = ref<boolean>(false);
    const showInstModal = ref<boolean>(false);
    const showAlarmModal = ref<boolean>(false);
    const showAlarmSetupModal = ref<boolean>(false);
    const showAlarmSetopModal = ref<boolean>(false);
    const showAlarmReffcalModal = ref<boolean>(false);
    const savingConfiguration = ref<boolean>(false);

    // Interrupt mode form data
    const autoForm = ref({
      startDate: '',
      startTime: '',
      stopDate: '',
      stopTime: '',
      onTime: '', // On time in seconds
      offTime: '', // Off time in seconds
      dd: '',
      mm: '',
      yy: '',
      HH: '',
      MM: '',
      ss: ''
    });

    // DPOL mode form data
    const dpolForm = ref({
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      dd: '',
      mm: '',
      yy: '',
      HH: '',
      MM: ''
    });

    // INST mode form data
    const instForm = ref({
      startDate: '',
      startTime: '',
      dd: '',
      mm: '',
      yy: '',
      HH: '',
      MM: '',
      duration: 'daily' // daily or weekly
    });

    // Electrode selection data
    const selectedElectrode = ref<string>('');

    // Alarm item form data
    const alarmSetupForm = ref({
      value: '00.0',
      unit: '',
      threshold: '',
      enabled: false
    });

    const alarmSetopForm = ref({
      value: '00.0',
      unit: '',
      threshold: '',
      enabled: false
    });

    const alarmReffcalForm = ref({
      value: '00.0',
      unit: '',
      calibration: '',
      enabled: false
    });

    // SET NO timer configuration data
    const setNoForm = ref({
      ton: {
        field1: '',
        field2: '',
        field3: '',
        field4: '',
        field5: '',
        field6: ''
      },
      toff: {
        field1: '',
        field2: '',
        field3: '',
        field4: '',
        field5: '',
        field6: ''
      }
    });

    // Functions to open modals
    const openLogModal = () => {
      showLogModal.value = true;
    };

    const openModeModal = () => {
      showModeModal.value = true;
    };

    const openSetNoModal = () => {
      showSetNoModal.value = true;
    };

    const openElectrodeModal = () => {
      showElectrodeModal.value = true;
    };

    const openAlarmModal = () => {
      showAlarmModal.value = true;
    };

    // Functions to open alarm item modals
    const openAlarmItemModal = (type: string) => {
      showAlarmModal.value = false;
      if (type === 'setup') {
        showAlarmSetupModal.value = true;
      } else if (type === 'setop') {
        showAlarmSetopModal.value = true;
      } else if (type === 'reffcal') {
        showAlarmReffcalModal.value = true;
      }
    };

    // Functions to open mode sub-modals
    const openNormalModal = () => {
      showModeModal.value = false;
      showNormalModal.value = true;
    };

    const openAutoModal = () => {
      showModeModal.value = false;
      showAutoModal.value = true;
    };

    const openManualModal = () => {
      showModeModal.value = false;
      showManualModal.value = true;
    };

    const openDpolModal = () => {
      showModeModal.value = false;
      showDpolModal.value = true;
    };

    const openInstModal = () => {
      showModeModal.value = false;
      showInstModal.value = true;
    };

    // Functions to close modals
    const closeLogModal = () => {
      showLogModal.value = false;
    };

    const closeModeModal = () => {
      showModeModal.value = false;
    };

    const closeSetNoModal = () => {
      showSetNoModal.value = false;
    };

    const closeElectrodeModal = () => {
      showElectrodeModal.value = false;
    };

    const closeAlarmModal = () => {
      showAlarmModal.value = false;
    };

    // Functions to close alarm item modals
    const closeAlarmSetupModal = () => {
      showAlarmSetupModal.value = false;
    };

    const closeAlarmSetopModal = () => {
      showAlarmSetopModal.value = false;
    };

    const closeAlarmReffcalModal = () => {
      showAlarmReffcalModal.value = false;
    };

    // Functions to close mode sub-modals and return to main mode modal
    const closeNormalModal = () => {
      showNormalModal.value = false;
    };

    const closeAutoModal = () => {
      showAutoModal.value = false;
    };

    const saveInterruptModeConfiguration = async () => {
      try {
        savingConfiguration.value = true;

        // Validate required fields
        if (!autoForm.value.startDate || !autoForm.value.startTime || 
            !autoForm.value.stopDate || !autoForm.value.stopTime ||
            !autoForm.value.onTime || !autoForm.value.offTime) {
          await Swal.fire({
            title: 'Validation Error',
            text: 'Please fill in all required fields including start/stop date/time and on/off time settings.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          return;
        }

        // Prepare configuration data
        const config: InterruptModeConfig = {
          startDate: autoForm.value.startDate,
          startTime: autoForm.value.startTime,
          stopDate: autoForm.value.stopDate,
          stopTime: autoForm.value.stopTime,
          onTime: parseInt(autoForm.value.onTime.toString()),
          offTime: parseInt(autoForm.value.offTime.toString()),
          dateFormat: {
            dd: autoForm.value.dd,
            mm: autoForm.value.mm,
            yy: autoForm.value.yy,
            HH: autoForm.value.HH,
            MM: autoForm.value.MM,
            ss: autoForm.value.ss
          }
        };

        console.log('Sending interrupt mode configuration:', config);

        // Send configuration to device via MQTT
        const response = await mqttService.setInterruptMode('123', config);

        if (response.success) {
          await Swal.fire({
            title: 'Configuration Sent!',
            text: 'Interrupt mode configuration has been sent to the device successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          
          // Close the modal
          closeAutoModal();
          showModeModal.value = false;
        } else {
          throw new Error(response.message || 'Configuration failed');
        }

      } catch (error: any) {
        console.error('Error sending interrupt mode configuration:', error);
        
        await Swal.fire({
          title: 'Configuration Failed',
          text: error.message || 'Failed to send configuration to device. Please check your connection and try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      } finally {
        savingConfiguration.value = false;
      }
    };

    const closeManualModal = () => {
      showManualModal.value = false;
    };

    const closeDpolModal = () => {
      showDpolModal.value = false;
    };

    const closeInstModal = () => {
      showInstModal.value = false;
    };

    // Functions to go back to main mode modal
    const backToModeModal = () => {
      showNormalModal.value = false;
      showAutoModal.value = false;
      showManualModal.value = false;
      showDpolModal.value = false;
      showInstModal.value = false;
      showAlarmModal.value = false;
      showModeModal.value = true;
    };

    // Function to close all modals
    const closeAllModals = () => {
      showLogModal.value = false;
      showModeModal.value = false;
      showSetNoModal.value = false;
      showElectrodeModal.value = false;
      showNormalModal.value = false;
      showAutoModal.value = false;
      showManualModal.value = false;
      showDpolModal.value = false;
      showInstModal.value = false;
      showAlarmModal.value = false;
      showAlarmSetupModal.value = false;
      showAlarmSetopModal.value = false;
      showAlarmReffcalModal.value = false;
    };

    // Save timer configuration
    const saveTimerConfiguration = async () => {
      try {
        const config = {
          ton: setNoForm.value.ton,
          toff: setNoForm.value.toff
        };

        console.log('Sending timer configuration:', config);
        const response = await mqttService.setTimerConfiguration('123', config);
        
        if (response.success) {
          await Swal.fire({
            title: 'Timer Configuration Sent!',
            text: 'Timer settings have been sent to the device.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          closeSetNoModal();
        } else {
          throw new Error(response.message || 'Configuration failed');
        }
      } catch (error: any) {
        console.error('Error configuring timer:', error);
        await Swal.fire({
          title: 'Configuration Failed',
          text: error.message || 'Failed to configure timer. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    };

    // Save electrode configuration
    const saveElectrodeConfiguration = async () => {
      try {
        if (!selectedElectrode.value) {
          await Swal.fire({
            title: 'Selection Required',
            text: 'Please select an electrode type.',
            icon: 'warning',
            confirmButtonText: 'OK'
          });
          return;
        }

        console.log('Sending electrode configuration:', selectedElectrode.value);
        const response = await mqttService.setElectrodeConfiguration('123', selectedElectrode.value);
        
        if (response.success) {
          await Swal.fire({
            title: 'Electrode Configuration Sent!',
            text: `${selectedElectrode.value} electrode configuration has been sent to the device.`,
            icon: 'success',
            confirmButtonText: 'OK'
          });
          closeElectrodeModal();
        } else {
          throw new Error(response.message || 'Configuration failed');
        }
      } catch (error: any) {
        console.error('Error configuring electrode:', error);
        await Swal.fire({
          title: 'Configuration Failed',
          text: error.message || 'Failed to configure electrode. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    };

    // Save manual mode action
    const executeManualAction = async (action: 'start' | 'stop') => {
      try {
        console.log('Sending manual mode action:', action);
        const response = await mqttService.setManualMode('123', action);
        
        if (response.success) {
          await Swal.fire({
            title: 'Command Sent!',
            text: `Manual ${action} command has been sent to the device.`,
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          });
        } else {
          throw new Error(response.message || 'Command failed');
        }
      } catch (error: any) {
        console.error('Error executing manual action:', error);
        await Swal.fire({
          title: 'Command Failed',
          text: error.message || 'Failed to send command to device. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    };

    // Save normal mode configuration
    const saveNormalModeConfiguration = async () => {
      try {
        console.log('Sending normal mode configuration');
        const response = await mqttService.setNormalMode('123', {});
        
        if (response.success) {
          await Swal.fire({
            title: 'Normal Mode Activated!',
            text: 'Normal mode configuration has been sent to the device.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          closeNormalModal();
          showModeModal.value = false;
        } else {
          throw new Error(response.message || 'Configuration failed');
        }
      } catch (error: any) {
        console.error('Error configuring normal mode:', error);
        await Swal.fire({
          title: 'Configuration Failed',
          text: error.message || 'Failed to configure normal mode. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    };

    // Save DPOL mode configuration
    const saveDpolModeConfiguration = async () => {
      try {
        const config = {
          startDate: dpolForm.value.startDate,
          startTime: dpolForm.value.startTime,
          endDate: dpolForm.value.endDate,
          endTime: dpolForm.value.endTime,
          dateFormat: {
            dd: dpolForm.value.dd,
            mm: dpolForm.value.mm,
            yy: dpolForm.value.yy,
            HH: dpolForm.value.HH,
            MM: dpolForm.value.MM
          }
        };

        console.log('Sending DPOL mode configuration:', config);
        const response = await mqttService.setDpolMode('123', config);
        
        if (response.success) {
          await Swal.fire({
            title: 'DPOL Mode Configuration Sent!',
            text: 'DPOL mode settings have been sent to the device.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          closeDpolModal();
          showModeModal.value = false;
        } else {
          throw new Error(response.message || 'Configuration failed');
        }
      } catch (error: any) {
        console.error('Error configuring DPOL mode:', error);
        await Swal.fire({
          title: 'Configuration Failed',
          text: error.message || 'Failed to configure DPOL mode. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    };

    // Save INST mode configuration
    const saveInstModeConfiguration = async () => {
      try {
        const config = {
          startDate: instForm.value.startDate,
          startTime: instForm.value.startTime,
          duration: instForm.value.duration,
          dateFormat: {
            dd: instForm.value.dd,
            mm: instForm.value.mm,
            yy: instForm.value.yy,
            HH: instForm.value.HH,
            MM: instForm.value.MM
          }
        };

        console.log('Sending INST mode configuration:', config);
        const response = await mqttService.setInstMode('123', config);
        
        if (response.success) {
          await Swal.fire({
            title: 'INST Mode Configuration Sent!',
            text: 'INST mode settings have been sent to the device.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          closeInstModal();
          showModeModal.value = false;
        } else {
          throw new Error(response.message || 'Configuration failed');
        }
      } catch (error: any) {
        console.error('Error configuring INST mode:', error);
        await Swal.fire({
          title: 'Configuration Failed',
          text: error.message || 'Failed to configure INST mode. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    };

    // Save alarm configuration
    const saveAlarmConfiguration = async () => {
      try {
        const config = {
          setup: alarmSetupForm.value.enabled ? {
            value: alarmSetupForm.value.value,
            threshold: alarmSetupForm.value.threshold,
            enabled: alarmSetupForm.value.enabled
          } : undefined,
          setop: alarmSetopForm.value.enabled ? {
            value: alarmSetopForm.value.value,
            threshold: alarmSetopForm.value.threshold,
            enabled: alarmSetopForm.value.enabled
          } : undefined,
          reffcal: alarmReffcalForm.value.enabled ? {
            value: alarmReffcalForm.value.value,
            calibration: alarmReffcalForm.value.calibration,
            enabled: alarmReffcalForm.value.enabled
          } : undefined
        };

        console.log('Sending alarm configuration:', config);
        const response = await mqttService.setAlarmConfiguration('123', config);
        
        if (response.success) {
          await Swal.fire({
            title: 'Alarm Configuration Sent!',
            text: 'Alarm settings have been sent to the device.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          closeAlarmModal();
        } else {
          throw new Error(response.message || 'Configuration failed');
        }
      } catch (error: any) {
        console.error('Error configuring alarm:', error);
        await Swal.fire({
          title: 'Configuration Failed',
          text: error.message || 'Failed to configure alarm. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    };

    return {
      displayedDevice,
      safeDevice,
      statusClass,
      metricClass,
      connectionStatus,
      connectionStatusClass,
      abstractLocation,
      showLogModal,
      showModeModal,
      showSetNoModal,
      showElectrodeModal,
      showNormalModal,
      showAutoModal,
      showManualModal,
      showDpolModal,
      showInstModal,
      showAlarmModal,
      showAlarmSetupModal,
      showAlarmSetopModal,
      showAlarmReffcalModal,
      openLogModal,
      openModeModal,
      openSetNoModal,
      openElectrodeModal,
      openAlarmModal,
      openAlarmItemModal,
      openNormalModal,
      openAutoModal,
      openManualModal,
      openDpolModal,
      openInstModal,
      closeLogModal,
      closeModeModal,
      closeSetNoModal,
      closeElectrodeModal,
      closeAlarmModal,
      closeAlarmSetupModal,
      closeAlarmSetopModal,
      closeAlarmReffcalModal,
      closeNormalModal,
      closeAutoModal,
      saveInterruptModeConfiguration,
      savingConfiguration,
      closeManualModal,
      closeDpolModal,
      closeInstModal,
      closeAllModals,
      backToModeModal,
      autoForm,
      dpolForm,
      instForm,
      selectedElectrode,
      setNoForm,
      alarmSetupForm,
      alarmSetopForm,
      alarmReffcalForm,
      // New configuration functions
      saveTimerConfiguration,
      saveElectrodeConfiguration,
      executeManualAction,
      saveNormalModeConfiguration,
      saveDpolModeConfiguration,
      saveInstModeConfiguration,
      saveAlarmConfiguration,
    };
  }
});
</script>

<template>
  <div class="card">
    <div class="card-header border-0 pt-6">
      <div class="card-title">
        <div class="d-flex align-items-center justify-content-between">
          <h3 class="mb-0">Device Details</h3>
          <span class="badge" :class="connectionStatusClass">
            <i class="bi bi-circle-fill me-1"></i>
            {{ connectionStatus }}
          </span>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-lg-6">
          <div class="mb-5">
            <h4 class="fs-1 text-gray-800 w-bolder mb-6">Basic Information</h4>
            <div class="d-flex flex-column">
              <div class="row mb-7">
                <label class="col-lg-4 fw-bold text-muted">Device Name</label>
                <div class="col-lg-8">
                  <span class="fw-bold fs-6 text-gray-800">{{ safeDevice.name }}</span>
                </div>
              </div>
              <div class="row mb-7">
                <label class="col-lg-4 fw-bold text-muted">Location</label>
                <div class="col-lg-8">
                  <span class="fw-bold fs-6 text-gray-800">{{ abstractLocation || safeDevice.location }}</span>
                </div>
              </div>
              <div class="row mb-7">
                <label class="col-lg-4 fw-bold text-muted">Type</label>
                <div class="col-lg-8">
                  <span class="fw-bold fs-6 text-gray-800">{{ safeDevice.type }}</span>
                </div>
              </div>
              <div class="row mb-7">
                <label class="col-lg-4 fw-bold text-muted">Status</label>
                <div class="col-lg-8">
                  <span class="badge" :class="statusClass">{{ safeDevice.status }}</span>
                </div>
              </div>
              <div class="row mb-7">
                <label class="col-lg-4 fw-bold text-muted">Last Seen</label>
                <div class="col-lg-8">
                  <span class="fw-bold fs-6 text-gray-800">{{ safeDevice.lastSeen }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="mb-5">
            <h4 class="fs-1 text-gray-800 w-bolder mb-6">Device Metrics</h4>
            <div class="row g-4">
              <div class="col-md-4" v-for="metric in (safeDevice.metrics || [])" :key="metric.type">
                <div class="card bg-light">
                  <div class="card-body p-4">
                    <div class="d-flex flex-column align-items-center">
                      <i :class="[metric.icon, metricClass(metric)]" style="font-size: 2rem"></i>
                      <h5 class="mt-2 mb-0">{{ metric.value }}</h5>
                      <p class="text-muted mb-0 text-capitalize">{{ metric.type }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Alarm Control -->
          <div class="mb-5">
            <h4 class="fs-1 text-gray-800 w-bolder mb-6">Alarm System</h4>
            <div class="row justify-content-start">
              <div class="col-md-6">
                <div class="card bg-danger cursor-pointer" @click="openAlarmModal">
                  <div class="card-body p-3 text-center">
                    <i class="bi bi-exclamation-triangle text-white" style="font-size: 1.8rem"></i>
                    <h6 class="mt-2 mb-1 text-white">Alarm</h6>
                    <small class="text-white-75">System Alerts</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <!-- Device Control Boxes -->
          <div class="mb-5">
            <h4 class="fs-1 text-gray-800 w-bolder mb-6">Device Controls</h4>
            <div class="row g-3">
              <div class="col-md-6">
                <div class="card bg-primary cursor-pointer" @click="openLogModal">
                  <div class="card-body p-4 text-center">
                    <i class="bi bi-journal-text text-white" style="font-size: 2rem"></i>
                    <h5 class="mt-2 mb-0 text-white">Log No</h5>
                    <p class="text-white-50 mb-0">View Logs</p>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="card bg-success cursor-pointer" @click="openModeModal">
                  <div class="card-body p-4 text-center">
                    <i class="bi bi-gear text-white" style="font-size: 2rem"></i>
                    <h5 class="mt-2 mb-0 text-white">Mode</h5>
                    <p class="text-white-50 mb-0">Device Mode</p>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="card bg-warning cursor-pointer" @click="openSetNoModal">
                  <div class="card-body p-4 text-center">
                    <i class="bi bi-sliders text-white" style="font-size: 2rem"></i>
                    <h5 class="mt-2 mb-0 text-white">SET NO</h5>
                    <p class="text-white-50 mb-0">Settings</p>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="card bg-info cursor-pointer" @click="openElectrodeModal">
                  <div class="card-body p-4 text-center">
                    <i class="bi bi-lightning text-white" style="font-size: 2rem"></i>
                    <h5 class="mt-2 mb-0 text-white">Electrode</h5>
                    <p class="text-white-50 mb-0">Electrode Config</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Alarm Modal -->
  <div class="modal fade" tabindex="-1" :class="{ show: showAlarmModal, 'd-block': showAlarmModal }" v-if="showAlarmModal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header bg-danger">
          <h5 class="modal-title text-white">
            <i class="bi bi-exclamation-triangle me-2"></i>
            Alarm Configuration
          </h5>
          <button type="button" class="btn-close btn-close-white" @click="closeAlarmModal"></button>
        </div>
        <div class="modal-body p-4">
          <!-- Alarm Configuration Items -->
          <div class="row">
            <div class="col-md-6">
              <h6 class="fw-bold mb-4">Alarm Parameters</h6>
              
              <!-- Set UP -->
              <div class="card border mb-3 cursor-pointer" @click="openAlarmItemModal('setup')">
                <div class="card-body p-4 text-center">
                  <i class="bi bi-arrow-up-circle text-danger" style="font-size: 2rem"></i>
                  <h6 class="mt-2 mb-1">Set UP</h6>
                  <small class="text-muted">00.0</small>
                </div>
              </div>

              <!-- Set OP -->
              <div class="card border mb-3 cursor-pointer" @click="openAlarmItemModal('setop')">
                <div class="card-body p-4 text-center">
                  <i class="bi bi-arrow-down-circle text-warning" style="font-size: 2rem"></i>
                  <h6 class="mt-2 mb-1">Set OP</h6>
                  <small class="text-muted">00.0</small>
                </div>
              </div>

              <!-- Ref Fcal -->
              <div class="card border mb-3 cursor-pointer" @click="openAlarmItemModal('reffcal')">
                <div class="card-body p-4 text-center">
                  <i class="bi bi-calculator text-info" style="font-size: 2rem"></i>
                  <h6 class="mt-2 mb-1">Ref Fcal</h6>
                  <small class="text-muted">00.0</small>
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <h6 class="fw-bold mb-4">Active Alarms</h6>
              <div class="alert alert-info">
                <i class="bi bi-info-circle me-2"></i>
                No active alarms
              </div>
              
              <h6 class="fw-bold mb-3 mt-5">Notification Settings</h6>
              <div class="form-check mb-3">
                <input class="form-check-input" type="checkbox" id="emailNotif" checked>
                <label class="form-check-label" for="emailNotif">
                  Email Notifications
                </label>
              </div>
              <div class="form-check mb-3">
                <input class="form-check-input" type="checkbox" id="soundNotif">
                <label class="form-check-label" for="soundNotif">
                  Sound Alerts
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="pushNotif" checked>
                <label class="form-check-label" for="pushNotif">
                  Push Notifications
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeAlarmModal">Close</button>
          <button type="button" class="btn btn-danger" @click="saveAlarmConfiguration">Save Settings</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Alarm Setup Modal -->
  <div class="modal fade" tabindex="-1" :class="{ show: showAlarmSetupModal, 'd-block': showAlarmSetupModal }" v-if="showAlarmSetupModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-danger">
          <h5 class="modal-title text-white">
            <i class="bi bi-arrow-up-circle me-2"></i>
            Set UP Configuration
          </h5>
          <button type="button" class="btn-close btn-close-white" @click="closeAlarmSetupModal"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label">Set UP Value</label>
            <div class="input-group">
              <input type="number" class="form-control" v-model="alarmSetupForm.value" step="0.1">
              <span class="input-group-text">V</span>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Threshold</label>
            <input type="number" class="form-control" v-model="alarmSetupForm.threshold" step="0.1">
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="enableSetup" v-model="alarmSetupForm.enabled">
            <label class="form-check-label" for="enableSetup">
              Enable Set UP Alarm
            </label>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeAlarmSetupModal">Cancel</button>
          <button type="button" class="btn btn-danger">Save</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Alarm Set OP Modal -->
  <div class="modal fade" tabindex="-1" :class="{ show: showAlarmSetopModal, 'd-block': showAlarmSetopModal }" v-if="showAlarmSetopModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-warning">
          <h5 class="modal-title text-dark">
            <i class="bi bi-arrow-down-circle me-2"></i>
            Set OP Configuration
          </h5>
          <button type="button" class="btn-close" @click="closeAlarmSetopModal"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label">Set OP Value</label>
            <div class="input-group">
              <input type="number" class="form-control" v-model="alarmSetopForm.value" step="0.1">
              <span class="input-group-text">V</span>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Threshold</label>
            <input type="number" class="form-control" v-model="alarmSetopForm.threshold" step="0.1">
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="enableSetop" v-model="alarmSetopForm.enabled">
            <label class="form-check-label" for="enableSetop">
              Enable Set OP Alarm
            </label>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeAlarmSetopModal">Cancel</button>
          <button type="button" class="btn btn-warning">Save</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Alarm Ref Fcal Modal -->
  <div class="modal fade" tabindex="-1" :class="{ show: showAlarmReffcalModal, 'd-block': showAlarmReffcalModal }" v-if="showAlarmReffcalModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-info">
          <h5 class="modal-title text-white">
            <i class="bi bi-calculator me-2"></i>
            Ref Fcal Configuration
          </h5>
          <button type="button" class="btn-close btn-close-white" @click="closeAlarmReffcalModal"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label">Ref Fcal Value</label>
            <div class="input-group">
              <input type="number" class="form-control" v-model="alarmReffcalForm.value" step="0.1">
              <span class="input-group-text">mV</span>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Calibration Factor</label>
            <input type="number" class="form-control" v-model="alarmReffcalForm.calibration" step="0.001">
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="enableReffcal" v-model="alarmReffcalForm.enabled">
            <label class="form-check-label" for="enableReffcal">
              Enable Ref Fcal Alarm
            </label>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeAlarmReffcalModal">Cancel</button>
          <button type="button" class="btn btn-info">Save</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Log Modal -->
  <div class="modal fade" tabindex="-1" :class="{ show: showLogModal, 'd-block': showLogModal }" v-if="showLogModal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Log No Configuration</h5>
          <button type="button" class="btn-close" @click="closeLogModal"></button>
        </div>
        <div class="modal-body">
          <p>Log configuration panel will be implemented here.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeLogModal">Close</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Mode Modal -->
  <div class="modal fade" tabindex="-1" :class="{ show: showModeModal, 'd-block': showModeModal }" v-if="showModeModal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Device Mode Configuration</h5>
          <button type="button" class="btn-close" @click="closeModeModal"></button>
        </div>
        <div class="modal-body">
          <p class="mb-4">Select the operating mode for the device:</p>
          <div class="row g-3">
            <div class="col-md-4">
              <div class="card bg-primary cursor-pointer" @click="openNormalModal">
                <div class="card-body p-3 text-center">
                  <i class="bi bi-circle text-white" style="font-size: 1.5rem"></i>
                  <h6 class="mt-2 mb-0 text-white">Normal</h6>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card bg-success cursor-pointer" @click="openAutoModal">
                <div class="card-body p-3 text-center">
                  <i class="bi bi-gear-fill text-white" style="font-size: 1.5rem"></i>
                  <h6 class="mt-2 mb-0 text-white">Interrupt Mode</h6>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card bg-warning cursor-pointer" @click="openManualModal">
                <div class="card-body p-3 text-center">
                  <i class="bi bi-hand-index text-white" style="font-size: 1.5rem"></i>
                  <h6 class="mt-2 mb-0 text-white">Manual</h6>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card bg-info cursor-pointer" @click="openDpolModal">
                <div class="card-body p-3 text-center">
                  <i class="bi bi-diagram-3 text-white" style="font-size: 1.5rem"></i>
                  <h6 class="mt-2 mb-0 text-white">DPOL</h6>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card bg-danger cursor-pointer" @click="openInstModal">
                <div class="card-body p-3 text-center">
                  <i class="bi bi-speedometer2 text-white" style="font-size: 1.5rem"></i>
                  <h6 class="mt-2 mb-0 text-white">INST</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModeModal">Close</button>
        </div>
      </div>
    </div>
  </div>

  <!-- SET NO Modal -->
  <div class="modal fade" tabindex="-1" :class="{ show: showSetNoModal, 'd-block': showSetNoModal }" v-if="showSetNoModal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">SET NO Configuration</h5>
          <button type="button" class="btn-close" @click="closeSetNoModal"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <!-- TON (Timer ON) Configuration -->
            <div class="col-md-6">
              <div class="card border-success mb-3">
                <div class="card-header bg-success text-white">
                  <h6 class="mb-0"><i class="bi bi-play-circle me-2"></i>TON (Timer ON)</h6>
                </div>
                <div class="card-body">
                  <div class="row g-2">
                    <div class="col-2">
                      <input type="number" class="form-control text-center timer-input" v-model="setNoForm.ton.field1" placeholder="00" min="0" max="99">
                    </div>
                    <div class="col-auto d-flex align-items-center">
                      <span class="timer-separator">|</span>
                    </div>
                    <div class="col-2">
                      <input type="number" class="form-control text-center timer-input" v-model="setNoForm.ton.field2" placeholder="00" min="0" max="99">
                    </div>
                    <div class="col-auto d-flex align-items-center">
                      <span class="timer-separator">|</span>
                    </div>
                    <div class="col-2">
                      <input type="number" class="form-control text-center timer-input" v-model="setNoForm.ton.field3" placeholder="00" min="0" max="99">
                    </div>
                  </div>
                  <div class="row g-2 mt-2">
                    <div class="col-2">
                      <input type="number" class="form-control text-center timer-input" v-model="setNoForm.ton.field4" placeholder="00" min="0" max="99">
                    </div>
                    <div class="col-auto d-flex align-items-center">
                      <span class="timer-separator">|</span>
                    </div>
                    <div class="col-2">
                      <input type="number" class="form-control text-center timer-input" v-model="setNoForm.ton.field5" placeholder="00" min="0" max="99">
                    </div>
                    <div class="col-auto d-flex align-items-center">
                      <span class="timer-separator">|</span>
                    </div>
                    <div class="col-2">
                      <input type="number" class="form-control text-center timer-input" v-model="setNoForm.ton.field6" placeholder="00" min="0" max="99">
                    </div>
                  </div>
                  <small class="form-text text-muted mt-2">Set timer ON duration values</small>
                </div>
              </div>
            </div>

            <!-- TOFF (Timer OFF) Configuration -->
            <div class="col-md-6">
              <div class="card border-danger mb-3">
                <div class="card-header bg-danger text-white">
                  <h6 class="mb-0"><i class="bi bi-stop-circle me-2"></i>TOFF (Timer OFF)</h6>
                </div>
                <div class="card-body">
                  <div class="row g-2">
                    <div class="col-2">
                      <input type="number" class="form-control text-center timer-input" v-model="setNoForm.toff.field1" placeholder="00" min="0" max="99">
                    </div>
                    <div class="col-auto d-flex align-items-center">
                      <span class="timer-separator">|</span>
                    </div>
                    <div class="col-2">
                      <input type="number" class="form-control text-center timer-input" v-model="setNoForm.toff.field2" placeholder="00" min="0" max="99">
                    </div>
                    <div class="col-auto d-flex align-items-center">
                      <span class="timer-separator">|</span>
                    </div>
                    <div class="col-2">
                      <input type="number" class="form-control text-center timer-input" v-model="setNoForm.toff.field3" placeholder="00" min="0" max="99">
                    </div>
                  </div>
                  <div class="row g-2 mt-2">
                    <div class="col-2">
                      <input type="number" class="form-control text-center timer-input" v-model="setNoForm.toff.field4" placeholder="00" min="0" max="99">
                    </div>
                    <div class="col-auto d-flex align-items-center">
                      <span class="timer-separator">|</span>
                    </div>
                    <div class="col-2">
                      <input type="number" class="form-control text-center timer-input" v-model="setNoForm.toff.field5" placeholder="00" min="0" max="99">
                    </div>
                    <div class="col-auto d-flex align-items-center">
                      <span class="timer-separator">|</span>
                    </div>
                    <div class="col-2">
                      <input type="number" class="form-control text-center timer-input" v-model="setNoForm.toff.field6" placeholder="00" min="0" max="99">
                    </div>
                  </div>
                  <small class="form-text text-muted mt-2">Set timer OFF duration values</small>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Timer Status Display -->
          <div class="row mt-3">
            <div class="col-md-12">
              <div class="alert alert-info">
                <h6><i class="bi bi-info-circle me-2"></i>Timer Configuration Summary</h6>
                <div class="row">
                  <div class="col-md-6">
                    <strong>TON:</strong> 
                    {{ setNoForm.ton.field1 || '00' }}|{{ setNoForm.ton.field2 || '00' }}|{{ setNoForm.ton.field3 || '00' }} / 
                    {{ setNoForm.ton.field4 || '00' }}|{{ setNoForm.ton.field5 || '00' }}|{{ setNoForm.ton.field6 || '00' }}
                  </div>
                  <div class="col-md-6">
                    <strong>TOFF:</strong> 
                    {{ setNoForm.toff.field1 || '00' }}|{{ setNoForm.toff.field2 || '00' }}|{{ setNoForm.toff.field3 || '00' }} / 
                    {{ setNoForm.toff.field4 || '00' }}|{{ setNoForm.toff.field5 || '00' }}|{{ setNoForm.toff.field6 || '00' }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeSetNoModal">Cancel</button>
          <button type="button" class="btn btn-primary" @click="saveTimerConfiguration">Save Timer Configuration</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Electrode Modal -->
  <div class="modal fade" tabindex="-1" :class="{ show: showElectrodeModal, 'd-block': showElectrodeModal }" v-if="showElectrodeModal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Electrode Configuration</h5>
          <button type="button" class="btn-close" @click="closeElectrodeModal"></button>
        </div>
        <div class="modal-body">
          <p class="mb-4">Select the electrode type for the device:</p>
          <div class="row g-3">
            <div class="col-md-6">
              <div class="card cursor-pointer" :class="{ 'border-primary bg-light': selectedElectrode === 'CuCuSO4' }" @click="selectedElectrode = 'CuCuSO4'">
                <div class="card-body p-4 text-center">
                  <div class="form-check d-flex justify-content-center">
                    <input class="form-check-input me-2" type="radio" name="electrode" id="cucuso4" value="CuCuSO4" v-model="selectedElectrode">
                  </div>
                  <i class="bi bi-circle text-primary" style="font-size: 2rem"></i>
                  <h5 class="mt-2 mb-0">CuCuSO₄</h5>
                  <p class="text-muted mb-0">Copper Sulfate</p>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card cursor-pointer" :class="{ 'border-primary bg-light': selectedElectrode === 'Zinc' }" @click="selectedElectrode = 'Zinc'">
                <div class="card-body p-4 text-center">
                  <div class="form-check d-flex justify-content-center">
                    <input class="form-check-input me-2" type="radio" name="electrode" id="zinc" value="Zinc" v-model="selectedElectrode">
                  </div>
                  <i class="bi bi-hexagon text-success" style="font-size: 2rem"></i>
                  <h5 class="mt-2 mb-0">Zinc</h5>
                  <p class="text-muted mb-0">Zinc Electrode</p>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card cursor-pointer" :class="{ 'border-primary bg-light': selectedElectrode === 'AgAgSO4' }" @click="selectedElectrode = 'AgAgSO4'">
                <div class="card-body p-4 text-center">
                  <div class="form-check d-flex justify-content-center">
                    <input class="form-check-input me-2" type="radio" name="electrode" id="agagso4" value="AgAgSO4" v-model="selectedElectrode">
                  </div>
                  <i class="bi bi-diamond text-warning" style="font-size: 2rem"></i>
                  <h5 class="mt-2 mb-0">Ag,AgSO₄</h5>
                  <p class="text-muted mb-0">Silver Sulfate</p>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card cursor-pointer" :class="{ 'border-primary bg-light': selectedElectrode === 'Custom' }" @click="selectedElectrode = 'Custom'">
                <div class="card-body p-4 text-center">
                  <div class="form-check d-flex justify-content-center">
                    <input class="form-check-input me-2" type="radio" name="electrode" id="custom" value="Custom" v-model="selectedElectrode">
                  </div>
                  <i class="bi bi-gear text-info" style="font-size: 2rem"></i>
                  <h5 class="mt-2 mb-0">Custom</h5>
                  <p class="text-muted mb-0">Custom Configuration</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Selected Electrode Display -->
          <div v-if="selectedElectrode" class="mt-4">
            <div class="alert alert-info">
              <i class="bi bi-info-circle me-2"></i>
              <strong>Selected Electrode:</strong> {{ selectedElectrode }}
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeElectrodeModal">Cancel</button>
          <button type="button" class="btn btn-primary" @click="saveElectrodeConfiguration" :disabled="!selectedElectrode">Apply Configuration</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Normal Mode Modal -->
  <div class="modal fade" tabindex="-1" :class="{ show: showNormalModal, 'd-block': showNormalModal }" v-if="showNormalModal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <div class="d-flex align-items-center">
            <button type="button" class="btn btn-sm btn-light me-3" @click="backToModeModal">
              <i class="bi bi-arrow-left"></i> Back
            </button>
            <h5 class="modal-title mb-0">Normal Mode Configuration</h5>
          </div>
          <button type="button" class="btn-close" @click="closeNormalModal"></button>
        </div>
        <div class="modal-body">
          <p>Normal mode configuration options will be implemented here.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="backToModeModal">Back to Modes</button>
          <button type="button" class="btn btn-primary" @click="saveNormalModeConfiguration">Save Configuration</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Interrupt Mode Modal -->
  <div class="modal fade" tabindex="-1" :class="{ show: showAutoModal, 'd-block': showAutoModal }" v-if="showAutoModal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <div class="d-flex align-items-center">
            <button type="button" class="btn btn-sm btn-light me-3" @click="backToModeModal">
              <i class="bi bi-arrow-left"></i> Back
            </button>
            <h5 class="modal-title mb-0">Interrupt Mode Configuration</h5>
          </div>
          <button type="button" class="btn-close" @click="closeAutoModal"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <!-- Left Column -->
            <div class="col-md-6">
              <div class="mb-3">
                <label class="form-label">Start Date</label>
                <input type="date" class="form-control" v-model="autoForm.startDate">
              </div>
              <div class="mb-3">
                <label class="form-label">Start Time</label>
                <input type="time" class="form-control" v-model="autoForm.startTime">
              </div>
              <div class="mb-3">
                <label class="form-label">Stop Date</label>
                <input type="date" class="form-control" v-model="autoForm.stopDate">
              </div>
              <div class="mb-3">
                <label class="form-label">Stop Time</label>
                <input type="time" class="form-control" v-model="autoForm.stopTime">
              </div>
              
              <!-- Interrupt Mode Settings -->
              <div class="mb-3">
                <label class="form-label">On Time (seconds)</label>
                <input type="number" class="form-control" v-model="autoForm.onTime" min="1" placeholder="Enter on time in seconds">
                <small class="form-text text-muted">Duration for which the device stays ON (in seconds)</small>
              </div>
              <div class="mb-3">
                <label class="form-label">Off Time (seconds)</label>
                <input type="number" class="form-control" v-model="autoForm.offTime" min="1" placeholder="Enter off time in seconds">
                <small class="form-text text-muted">Duration for which the device stays OFF (in seconds)</small>
              </div>
            </div>
            
            <!-- Right Column - Date/Time Format -->
            <div class="col-md-6">
              <label class="form-label">Date & Time Format</label>
              <div class="row g-2 mb-2">
                <div class="col-4">
                  <input type="number" class="form-control" placeholder="dd" v-model="autoForm.dd" min="1" max="31">
                  <small class="form-text text-muted">DD</small>
                </div>
                <div class="col-4">
                  <input type="number" class="form-control" placeholder="mm" v-model="autoForm.mm" min="1" max="12">
                  <small class="form-text text-muted">MM</small>
                </div>
                <div class="col-4">
                  <input type="number" class="form-control" placeholder="yy" v-model="autoForm.yy" min="0" max="99">
                  <small class="form-text text-muted">YY</small>
                </div>
              </div>
              <div class="row g-2">
                <div class="col-4">
                  <input type="number" class="form-control" placeholder="HH" v-model="autoForm.HH" min="0" max="23">
                  <small class="form-text text-muted">HH</small>
                </div>
                <div class="col-4">
                  <input type="number" class="form-control" placeholder="mm" v-model="autoForm.MM" min="0" max="59">
                  <small class="form-text text-muted">MM</small>
                </div>
                <div class="col-4">
                  <input type="number" class="form-control" placeholder="ss" v-model="autoForm.ss" min="0" max="59">
                  <small class="form-text text-muted">SS</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="backToModeModal">Back to Modes</button>
          <button type="button" class="btn btn-primary" @click="saveInterruptModeConfiguration" :disabled="savingConfiguration">
            <span v-if="savingConfiguration" class="spinner-border spinner-border-sm me-2" role="status"></span>
            {{ savingConfiguration ? 'Sending to Device...' : 'Save Configuration' }}
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Manual Mode Modal -->
  <div class="modal fade" tabindex="-1" :class="{ show: showManualModal, 'd-block': showManualModal }" v-if="showManualModal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <div class="d-flex align-items-center">
            <button type="button" class="btn btn-sm btn-light me-3" @click="backToModeModal">
              <i class="bi bi-arrow-left"></i> Back
            </button>
            <h5 class="modal-title mb-0">Manual Mode Configuration</h5>
          </div>
          <button type="button" class="btn-close" @click="closeManualModal"></button>
        </div>
        <div class="modal-body">
          <div class="text-center">
            <div class="row justify-content-center">
              <div class="col-md-4">
                <div class="card bg-success cursor-pointer mb-3" @click="executeManualAction('start')">
                  <div class="card-body p-4 text-center">
                    <i class="bi bi-play-fill text-white" style="font-size: 3rem"></i>
                    <h4 class="mt-2 mb-0 text-white">Start</h4>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card bg-danger cursor-pointer mb-3" @click="executeManualAction('stop')">
                  <div class="card-body p-4 text-center">
                    <i class="bi bi-stop-fill text-white" style="font-size: 3rem"></i>
                    <h4 class="mt-2 mb-0 text-white">Stop</h4>
                  </div>
                </div>
              </div>
            </div>
            <p class="text-muted">Click Start to begin manual operation or Stop to halt the device.</p>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="backToModeModal">Back to Modes</button>
        </div>
      </div>
    </div>
  </div>

  <!-- DPOL Mode Modal -->
  <div class="modal fade" tabindex="-1" :class="{ show: showDpolModal, 'd-block': showDpolModal }" v-if="showDpolModal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <div class="d-flex align-items-center">
            <button type="button" class="btn btn-sm btn-light me-3" @click="backToModeModal">
              <i class="bi bi-arrow-left"></i> Back
            </button>
            <h5 class="modal-title mb-0">DPOL Mode Configuration</h5>
          </div>
          <button type="button" class="btn-close" @click="closeDpolModal"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <!-- Left Column -->
            <div class="col-md-6">
              <div class="mb-3">
                <label class="form-label">Start Date & Time</label>
                <div class="row g-2">
                  <div class="col-6">
                    <input type="date" class="form-control" v-model="dpolForm.startDate">
                  </div>
                  <div class="col-6">
                    <input type="time" class="form-control" v-model="dpolForm.startTime">
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">End Date & Time</label>
                <div class="row g-2">
                  <div class="col-6">
                    <input type="date" class="form-control" v-model="dpolForm.endDate">
                  </div>
                  <div class="col-6">
                    <input type="time" class="form-control" v-model="dpolForm.endTime">
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Right Column - Date/Time Format -->
            <div class="col-md-6">
              <label class="form-label">Date & Time Format</label>
              <div class="row g-2 mb-2">
                <div class="col-4">
                  <input type="number" class="form-control" placeholder="dd" v-model="dpolForm.dd" min="1" max="31">
                  <small class="form-text text-muted">DD</small>
                </div>
                <div class="col-4">
                  <input type="number" class="form-control" placeholder="mm" v-model="dpolForm.mm" min="1" max="12">
                  <small class="form-text text-muted">MM</small>
                </div>
                <div class="col-4">
                  <input type="number" class="form-control" placeholder="yy" v-model="dpolForm.yy" min="0" max="99">
                  <small class="form-text text-muted">YY</small>
                </div>
              </div>
              <div class="row g-2">
                <div class="col-6">
                  <input type="number" class="form-control" placeholder="HH" v-model="dpolForm.HH" min="0" max="23">
                  <small class="form-text text-muted">HH</small>
                </div>
                <div class="col-6">
                  <input type="number" class="form-control" placeholder="mm" v-model="dpolForm.MM" min="0" max="59">
                  <small class="form-text text-muted">MM</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="backToModeModal">Back to Modes</button>
          <button type="button" class="btn btn-primary" @click="saveDpolModeConfiguration">Save Configuration</button>
        </div>
      </div>
    </div>
  </div>

  <!-- INST Mode Modal -->
  <div class="modal fade" tabindex="-1" :class="{ show: showInstModal, 'd-block': showInstModal }" v-if="showInstModal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <div class="d-flex align-items-center">
            <button type="button" class="btn btn-sm btn-light me-3" @click="backToModeModal">
              <i class="bi bi-arrow-left"></i> Back
            </button>
            <h5 class="modal-title mb-0">INST Mode Configuration</h5>
          </div>
          <button type="button" class="btn-close" @click="closeInstModal"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <!-- Left Column -->
            <div class="col-md-6">
              <div class="mb-3">
                <label class="form-label">Start Date & Time</label>
                <div class="row g-2">
                  <div class="col-6">
                    <input type="date" class="form-control" v-model="instForm.startDate">
                  </div>
                  <div class="col-6">
                    <input type="time" class="form-control" v-model="instForm.startTime">
                  </div>
                </div>
              </div>
              
              <div class="mb-3">
                <label class="form-label">Duration Selection</label>
                <div class="d-flex gap-3">
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="duration" id="daily" value="daily" v-model="instForm.duration">
                    <label class="form-check-label" for="daily">Daily</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="duration" id="weekly" value="weekly" v-model="instForm.duration">
                    <label class="form-check-label" for="weekly">Weekly</label>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Right Column - Date/Time Format -->
            <div class="col-md-6">
              <label class="form-label">Date & Time Format</label>
              <div class="row g-2 mb-2">
                <div class="col-4">
                  <input type="number" class="form-control" placeholder="dd" v-model="instForm.dd" min="1" max="31">
                  <small class="form-text text-muted">DD</small>
                </div>
                <div class="col-4">
                  <input type="number" class="form-control" placeholder="mm" v-model="instForm.mm" min="1" max="12">
                  <small class="form-text text-muted">MM</small>
                </div>
                <div class="col-4">
                  <input type="number" class="form-control" placeholder="yy" v-model="instForm.yy" min="0" max="99">
                  <small class="form-text text-muted">YY</small>
                </div>
              </div>
              <div class="row g-2">
                <div class="col-6">
                  <input type="number" class="form-control" placeholder="HH" v-model="instForm.HH" min="0" max="23">
                  <small class="form-text text-muted">HH</small>
                </div>
                <div class="col-6">
                  <input type="number" class="form-control" placeholder="mm" v-model="instForm.MM" min="0" max="59">
                  <small class="form-text text-muted">MM</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="backToModeModal">Back to Modes</button>
          <button type="button" class="btn btn-primary" @click="saveInstModeConfiguration">Save Configuration</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Backdrop -->
  <div class="modal-backdrop fade show" v-if="showLogModal || showModeModal || showSetNoModal || showElectrodeModal || showNormalModal || showAutoModal || showManualModal || showDpolModal || showInstModal || showAlarmModal || showAlarmSetupModal || showAlarmSetopModal || showAlarmReffcalModal" @click="closeAllModals"></div>
</template>

<style scoped>
.cursor-pointer {
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.cursor-pointer:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.modal {
  background-color: rgba(0, 0, 0, 0.7);
}

.modal-content {
  border-radius: 10px;
  border: none;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  background-color: #f8f9fa;
}

.modal-header {
  background: linear-gradient(135deg, #6c757d 0%, #495057 100%);
  border-bottom: none;
  border-radius: 10px 10px 0 0;
  color: white;
}

.modal-header .modal-title {
  color: white;
  font-weight: 600;
}

.modal-header .btn-close {
  filter: invert(1);
}

.modal-header .btn-light {
  background-color: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
}

.modal-header .btn-light:hover {
  background-color: rgba(255, 255, 255, 0.3);
  color: white;
}

.modal-body {
  padding: 2rem;
  background-color: #ffffff;
  color: #333;
}

.modal-footer {
  background-color: #f8f9fa;
  border-top: 1px solid #dee2e6;
  border-radius: 0 0 10px 10px;
}

.form-control {
  border-radius: 6px;
  border: 1px solid #ced4da;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-control:focus {
  border-color: #80bdff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.form-label {
  font-weight: 500;
  color: #495057;
  margin-bottom: 0.5rem;
}

.electrode-card {
  transition: all 0.2s ease-in-out;
  border: 2px solid transparent;
}

.electrode-card:hover {
  border-color: #80bdff;
  transform: translateY(-2px);
}

.electrode-card.selected {
  border-color: #007bff;
  background-color: #f8f9ff;
}

.form-check-input:checked {
  background-color: #007bff;
  border-color: #007bff;
}

.alert-info {
  background-color: #d1ecf1;
  border-color: #bee5eb;
  color: #0c5460;
}

.timer-input {
  font-family: 'Courier New', monospace;
  font-weight: bold;
  font-size: 1.1rem;
  max-width: 50px;
  padding: 0.375rem 0.25rem;
}

.timer-separator {
  font-size: 1.5rem;
  font-weight: bold;
  color: #6c757d;
  line-height: 1;
}

.card-header {
  font-weight: 600;
}

.card-header .bi {
  font-size: 1.1rem;
}

.timer-input:focus {
  border-color: #80bdff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  background-color: #fff;
}

.border-success {
  border-color: #28a745 !important;
}

.border-danger {
  border-color: #dc3545 !important;
}
</style>
