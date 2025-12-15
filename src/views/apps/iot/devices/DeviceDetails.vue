<script lang="ts">
import { defineComponent, ref, onMounted, computed, onUnmounted, watch, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import ApiService from '@/core/services/ApiService';
import { reverseGeocode } from '@/utils/reverseGeocode';
import { io, Socket } from 'socket.io-client';
import { mqttService, type InterruptModeConfig } from '@/services/mqtt.service';
import Swal from 'sweetalert2';

const FAILOVER_TIMEOUT_MS = 10_000; // 10 seconds timeout for main device

// Value mappings for device settings
const ELECTRODE_MAPPING: Record<string, number> = {
  'Cu/cuso4': 0,
  'CuCuSO4': 0,
  'Zinc': 1,
  'Ag/AgCl': 2,
  'AgAgSO4': 2
};

const MODE_MAPPING: Record<string, number> = {
  'Normal': 0,
  'Interrupt': 1,
  'Manual': 2,
  'DPOL': 3,
  'INST': 4
};

const MANUAL_ACTION_MAPPING: Record<string, number> = {
  'stop': 0,
  'start': 1
};

const INSTANT_MODE_MAPPING: Record<string, number> = {
  'daily': 0,
  'weekly': 1
};

export default defineComponent({
  setup() {
    const mainDevice = ref<any>(null);
    const simDevice = ref<any>(null);
  const deviceSettings = ref<any>(null);
  const deviceId = ref<string | null>(null);
    const lastMainUpdate = ref<number>(0);
    const now = ref(Date.now());
    const socket = ref<Socket | null>(null);
    const connectionStatus = ref<string>('disconnected');
    const updateInterval = ref<NodeJS.Timeout | null>(null);
    
    // Function to refresh device settings from backend
    const refreshDeviceSettings = async () => {
      if (!deviceId.value) return;
      
      try {
        ApiService.setHeader();
        const settingsResponse = await ApiService.query(`/api/device-management/${deviceId.value}/settings`, {});
        console.log('🔄 [API POLL] Refreshed device settings from API:', settingsResponse);
        // The response is { success: true, data: {...} }, so we need .data.data
        const newSettings = settingsResponse.data?.data || null;
        console.log('💾 [API POLL] Storing deviceSettings:', newSettings);
        deviceSettings.value = newSettings;
        
        // Force reactivity update
        await nextTick();
        console.log('🔄 [API POLL] Settings after update:', settingsParams.value);
      } catch (e) {
        console.warn('[API POLL] Could not refresh device settings:', e);
        deviceSettings.value = null;
      }
    };


    onMounted(() => {
      // Get device id from route params
      const route = useRoute();
      deviceId.value = (route.params.id as string) || null;

      // Fetch device settings and recent telemetry for this specific device
      (async () => {
        try {
          if (deviceId.value) {
            ApiService.setHeader();
            
            // 1. ALWAYS load device settings from database first (persisted data)
            console.log('📥 Loading device settings from database...');
            await refreshDeviceSettings();

            // 2. Load latest telemetry data for Device Controls display
            try {
              const telemetryResp = await ApiService.query('/api/telemetry', { params: { deviceId: deviceId.value, limit: 1, sort: '-timestamp' } });
              if (telemetryResp?.data?.data && telemetryResp.data.data.length > 0) {
                const telemetryData = telemetryResp.data.data[0];
                console.log('📊 Loaded telemetry from database:', telemetryData);
                mainDevice.value = telemetryData;
                
                // Convert timestamp to milliseconds for comparison
                const timestamp = telemetryData.timestamp;
                if (timestamp) {
                  const timestampMs = typeof timestamp === 'string' 
                    ? new Date(timestamp).getTime() 
                    : timestamp;
                  lastMainUpdate.value = timestampMs;
                } else {
                  lastMainUpdate.value = Date.now() - (FAILOVER_TIMEOUT_MS + 1000); // Mark as old
                }
                console.log('✅ Telemetry data loaded and device controls should show data');
              } else {
                console.log('ℹ️ No telemetry data available yet for device');
              }
            } catch (e) {
              console.warn('Could not load telemetry for device:', e);
            }
            
            // 3. Settings are now loaded from database and will update via Socket.IO when device sends new data
            // No continuous polling needed - device sends settings on startup and changes are tracked
            console.log('✅ Initial data loaded from database');
          }
        } catch (err) {
          console.error('Error during device-specific initialization', err);
        }
      })();
      // Initialize MQTT service
      mqttService.initialize();
      
      // Connect to backend Socket.io server - use environment variable
      const backendUrl = import.meta.env.VITE_APP_API_URL?.replace(/\/$/, '') || 'http://localhost:3001';
      console.log('🔌 Connecting to Socket.IO backend:', backendUrl);
      
      socket.value = io(backendUrl, {
        withCredentials: true,
        transports: ['websocket', 'polling']
      });

      // Connection status handling
      socket.value.on('connect', () => {
        connectionStatus.value = 'connected';
        console.log('✅ Socket.IO Connected to backend server');
        console.log('🔍 Current deviceId from route:', deviceId.value);
        // If viewing a specific device, subscribe to its updates
        try {
          if (deviceId.value) {
            // Subscribe using the provided id, and also try a prefixed form commonly used by the sim/backend
            console.log('📡 Subscribing to device updates:', deviceId.value);
            socket.value?.emit('subscribeDevice', deviceId.value);
            // If the route id is numeric (e.g. "123"), also subscribe to "DEVICE_123" room which the sim emits to
            if (/^\d+$/.test(deviceId.value)) {
              console.log('📡 Also subscribing to prefixed device room:', `DEVICE_${deviceId.value}`);
              socket.value?.emit('subscribeDevice', `DEVICE_${deviceId.value}`);
            }
          }
        } catch (e) {
          console.warn('subscribe emit failed', e);
        }
      });

      socket.value.on('disconnect', () => {
        connectionStatus.value = 'disconnected';
        console.log('Disconnected from backend server');
      });

      // Handle initial data when client first connects
      socket.value.on('initialData', (data) => {
        console.log('Received initial data:', data);
        
        // Update connection status from initial data
        if (data.connectionStatus && data.connectionStatus.device !== undefined) {
          connectionStatus.value = data.connectionStatus.device ? 'connected' : 'disconnected';
        }
        
        // If server sends device-specific initialData (subscribe flow), accept it only for our device
        if (deviceId.value) {
          if (data.main && data.main.id === deviceId.value) {
            mainDevice.value = data.main;
            lastMainUpdate.value = data.main.timestamp || Date.now();
          }
          if (data.sim && data.sim.id === deviceId.value) {
            simDevice.value = data.sim;
          }
        } else {
          if (data.main) {
            mainDevice.value = data.main;
            lastMainUpdate.value = data.main.timestamp || Date.now();
          }
          if (data.sim) {
            simDevice.value = data.sim;
          }
        }
      });

      // Handle real-time device updates
      socket.value.on('deviceUpdate', (update) => {
        console.log('🔄 Received deviceUpdate event:', update);
        try {
          // Determine the target device id from the incoming update.
          // Prefer a topic string like 'devices/123/data' if provided, else fall back to payload fields.
          let updatedId: string | null = null;
          try {
            if (update && typeof update.topic === 'string') {
              const parts = update.topic.split('/').filter(Boolean);
              if (parts.length >= 2) {
                // topic format expected: devices/{deviceId}/data
                updatedId = parts[1];
              }
            }
          } catch (e) {
            // ignore parsing errors
          }

          if (!updatedId) {
            updatedId = update?.data?.id || update?.deviceId || null;
          }

          // Normalization helper: extract comparable key (strip 'DEVICE_' prefix and non-digits)
          const norm = (id: string | null) => {
            if (!id) return null;
            try {
              // If id contains digits, return only the digit part to allow matching '123' and 'DEVICE_123'
              const digits = String(id).match(/\d+/);
              if (digits) return digits[0];
              // otherwise return the raw id
              return String(id);
            } catch (e) {
              return String(id);
            }
          };

          const updatedKey = norm(updatedId);
          const routeKey = norm(deviceId.value);

          // If we have a specific deviceId route, only apply updates for that device
          if (deviceId.value) {
            if (updatedKey && routeKey && updatedKey === routeKey) {
              console.log('✅ Device ID matches, updating data. Route:', routeKey, 'Update:', updatedKey);
              if (update.type === 'main' || update.type === 'device') {
                console.log('📊 Updating device telemetry data:', update.data);
                console.log('📊 Previous mainDevice:', mainDevice.value);
                mainDevice.value = update.data;
                lastMainUpdate.value = Date.now();
                console.log('📊 New mainDevice:', mainDevice.value);
                
                // Update connection status if provided
                if (update.connectionStatus && update.connectionStatus.device !== undefined) {
                  connectionStatus.value = update.connectionStatus.device ? 'connected' : 'disconnected';
                }
              } else if (update.type === 'sim') {
                simDevice.value = update.data;
              } else if (update.type === 'status') {
                // Handle status-only updates
                if (update.connectionStatus && update.connectionStatus.device !== undefined) {
                  connectionStatus.value = update.connectionStatus.device ? 'connected' : 'disconnected';
                }
              }
            }
          } else {
            // No specific device requested: apply broadcast updates
            if (update.type === 'main' || update.type === 'device') {
              mainDevice.value = update.data;
              lastMainUpdate.value = Date.now();
              
              // Update connection status if provided
              if (update.connectionStatus && update.connectionStatus.device !== undefined) {
                connectionStatus.value = update.connectionStatus.device ? 'connected' : 'disconnected';
              }
            } else if (update.type === 'sim') {
              simDevice.value = update.data;
            } else if (update.type === 'status') {
              // Handle status-only updates
              if (update.connectionStatus && update.connectionStatus.device !== undefined) {
                connectionStatus.value = update.connectionStatus.device ? 'connected' : 'disconnected';
              }
            }
          }
        } catch (err) {
          console.warn('Error handling deviceUpdate', err);
        }
      });

      // Listen for real-time device settings updates
      socket.value.on('deviceSettingsUpdate', (update) => {
        console.log('📡 Received real-time settings update from socket:', update);
        console.log('📡 Current device ID:', deviceId.value, 'Update device ID:', update.deviceId);
        
        if (update.deviceId === deviceId.value) {
          // Create the format expected by our deviceSettings ref
          const formattedSettings = {
            "Device ID": update.deviceId,
            "Message Type": "settings",
            "sender": "Server",
            "Parameters": update.settings
          };
          
          console.log('⚡ [SOCKET] Updating deviceSettings with real-time data:', formattedSettings);
          deviceSettings.value = formattedSettings;
          // Force reactivity update
          nextTick(() => {
            console.log('🔄 [SOCKET] Settings updated, current params:', settingsParams.value);
          });
          
          // Refresh from database to ensure persistence after real-time update
          console.log('🔄 Refreshing from database to confirm persistence');
          setTimeout(() => refreshDeviceSettings(), 1000);
        }
      });

      // Listen for dedicated connection status updates
      socket.value.on('connectionStatus', (status) => {
        try {
          if (status && status.device !== undefined) {
            connectionStatus.value = status.device ? 'connected' : 'disconnected';
          }
        } catch (err) {
          console.warn('Error handling connectionStatus', err);
        }
      });

      // Periodically update 'now' so computed property reacts to time
      updateInterval.value = setInterval(() => {
        now.value = Date.now();
      }, 1000);
    });

    onUnmounted(() => {
      if (socket.value) {
        // Unsubscribe from device room if needed
        try {
          if (deviceId.value) {
            socket.value.emit('unsubscribeDevice', deviceId.value);
            if (/^\d+$/.test(deviceId.value)) {
              socket.value.emit('unsubscribeDevice', `DEVICE_${deviceId.value}`);
            }
          }
        } catch (e) {}
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
      // If we have recent real-time data, use it
      if (mainDevice.value && now.value - lastMainUpdate.value <= FAILOVER_TIMEOUT_MS) {
        return mainDevice.value;
      }
      // If we have any mainDevice data (even if not recent), use it for display
      // This ensures stored telemetry data from DB is still used for device controls
      else if (mainDevice.value) {
        // For stored data, ensure metrics are properly formatted
        const deviceWithMetrics = {
          ...mainDevice.value,
          status: mainDevice.value._id ? 'Stored' : 'Offline', // Mark as stored if from DB
          metrics: mainDevice.value.metrics || getDeviceMetrics(mainDevice.value)
        };
        return deviceWithMetrics;
      }
      // Fallback to sim device
      else if (simDevice.value) {
        return simDevice.value;
      }
      return null;
    });


    // Helper function to create basic metrics from settings when no telemetry available
    const getBasicMetricsFromSettings = () => {
      const params = deviceSettings.value?.Parameters;
      if (!params) return [];
      
      return [
        { type: "EVENT", value: getEventLabel(params.Event || 0), icon: "bi-exclamation-circle" },
        { type: "ELECTRODE", value: getElectrodeLabel(params.Electrode || 0), icon: "bi-plug" },
        { type: "SHUNT_V", value: `${params['Shunt Voltage'] || 0} mV`, icon: "bi-lightning" },
        { type: "SHUNT_I", value: `${(params['Shunt Current'] || 0) / 1000} A`, icon: "bi-dash-circle" }
      ];
    };

    // Helper function to format REF values - show OPEN if above 5.00V
    const formatRefValue = (value: any) => {
      if (!value && value !== 0) return '0.00';
      const numValue = parseFloat(value.toString());
      if (isNaN(numValue)) return '0.00';
      return numValue > 5.00 ? 'OPEN' : numValue.toFixed(2);
    };

    // Helper function to extract metrics from device data (both live and stored)
    const getDeviceMetrics = (deviceData: any) => {
      if (!deviceData) return [];
      
      // If metrics already exist and are valid, use them
      if (deviceData.metrics && Array.isArray(deviceData.metrics) && deviceData.metrics.length > 0) {
        return deviceData.metrics;
      }
      
      // For stored telemetry data, extract from the 'data' field
      const data = deviceData.data || deviceData;
      
      // Provide robust extraction with proper defaults
      const metrics = [
        { type: 'LOG', value: data.LOG || data.log || 0, icon: 'bi-journal-text' },
        { type: 'EVENT', value: data.EVENT || data.event || 'UNKNOWN', icon: 'bi-exclamation-circle' },
        { type: 'REF1', value: formatRefValue(data.REF1 || data.ref1), icon: 'bi-graph-up' },
        { type: 'REF2', value: formatRefValue(data.REF2 || data.ref2), icon: 'bi-graph-up' },
        { type: 'REF3', value: formatRefValue(data.REF3 || data.ref3), icon: 'bi-graph-up' },
        { type: 'DCV', value: data.DCV || data.dcv || '0.00', icon: 'bi-battery-charging' },
        { type: 'DCI', value: data.DCI || data.dci || '0.00', icon: 'bi-lightning-charge' },
        { type: 'ACV', value: data.ACV || data.acv || '0.00', icon: 'bi-battery' },
        { type: 'ACI', value: data.ACI || data.aci || '0.00', icon: 'bi-lightning' },
        { type: 'DI1', value: data.DI1 || data.di1 || 0, icon: 'bi-toggle-on' },
        { type: 'DI2', value: data.DI2 || data.di2 || 0, icon: 'bi-toggle-on' },
        { type: 'DI3', value: data.DI3 || data.di3 || 0, icon: 'bi-toggle-on' },
        { type: 'DI4', value: data.DI4 || data.di4 || 0, icon: 'bi-toggle-on' }
      ];
      
      return metrics;
    };

    // Non-blocking safe device used by the template so the UI doesn't wait for live data
    const safeDevice = computed(() => {
      if (displayedDevice.value) {
        // Ensure metrics are properly set for device controls
        const device = {
          ...displayedDevice.value,
          metrics: displayedDevice.value.metrics || getDeviceMetrics(displayedDevice.value)
        };
        
        return device;
      }
      
      // If no telemetry data but we have device settings, create a basic device object
      const hasSettings = deviceSettings.value?.Parameters && Object.keys(deviceSettings.value.Parameters).length > 0;
      
      return {
        name: hasSettings ? `Device ${deviceId.value}` : 'Unknown Device',
        location: 'N/A',
        type: hasSettings ? 'IoT Sensor' : 'Unknown',
        status: hasSettings ? 'Configured' : 'offline',
        lastSeen: hasSettings ? 'Settings Available' : 'Never',
        metrics: hasSettings ? getBasicMetricsFromSettings() : []
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

    // Helper functions to convert codes to labels
    const getElectrodeLabel = (code: number) => {
      const labels: Record<number, string> = {
        0: 'Cu/cuso4',
        1: 'Zinc',
        2: 'Ag/AgCl'
      };
      return labels[code] || 'Unknown';
    };

    const getEventLabel = (code: number) => {
      const labels: Record<number, string> = {
        0: 'Normal',
        1: 'Interrupt',
        2: 'Manual',
        3: 'DEPOL',
        4: 'Instant'
      };
      return labels[code] || 'Unknown';
    };

    const getInstantModeLabel = (code: number) => {
      const labels: Record<number, string> = {
        0: 'Daily',
        1: 'Weekly'
      };
      return labels[code] || 'Unknown';
    };

    // Computed property for settings parameters
    const settingsParams = computed(() => {
      const settings = deviceSettings.value;
      if (!settings) return {};
      
      const params = settings.Parameters || settings.data?.Parameters || settings['Parameters'] || {};
      console.log('🔄 SettingsParams computed:', {
        'Shunt Voltage': params['Shunt Voltage'],
        'Shunt Current': params['Shunt Current'],
        fullParams: params
      });
      return params;
    });

    const hasSettings = computed(() => {
      return settingsParams.value !== null && settingsParams.value !== undefined;
    });

    // Modal/Popup functionality
    const showLogModal = ref<boolean>(false);
    const loggingInterval = ref<string>('00:01:00');
    const showModeModal = ref<boolean>(false);
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
    const showShuntVoltageModal = ref<boolean>(false);
    const showShuntCurrentModal = ref<boolean>(false);
    const savingConfiguration = ref<boolean>(false);

    // Interrupt mode form data
    const autoForm = ref({
      startDate: '',
      startTime: '',
      stopDate: '',
      stopTime: '',
      onTime: 86400, // On time in seconds (24 hours)
      offTime: 86400 // Off time in seconds (24 hours)
    });

    // DPOL mode form data
    const dpolForm = ref({
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: ''
    });

    // INST mode form data
    const instForm = ref({
      startTime: '',
      frequency: 'daily'
    });

    // Electrode selection data
    const selectedElectrode = ref<string>('');

    // Alarm item form data
    const alarmSetupForm = ref({
      value: '0.00',
      unit: '',
      enabled: false
    });

    // Manual mode timer refs - Hours, Minutes, Seconds (default: 24 hours)
    const onHours = ref<number>(24);
    const onMinutes = ref<number>(0);
    const onSeconds = ref<number>(0);
    const offHours = ref<number>(24);
    const offMinutes = ref<number>(0);
    const offSeconds = ref<number>(0);

    // Watch for changes and update autoForm.onTime and autoForm.offTime
    watch([onHours, onMinutes, onSeconds], () => {
      autoForm.value.onTime = (onHours.value * 3600) + (onMinutes.value * 60) + onSeconds.value;
    });

    watch([offHours, offMinutes, offSeconds], () => {
      autoForm.value.offTime = (offHours.value * 3600) + (offMinutes.value * 60) + offSeconds.value;
    });

    // Track last processed settings to prevent duplicate updates
    let lastProcessedSettings: string | null = null;

    // Watch deviceSettings to populate ALL form values from device data
    watch(deviceSettings, (newSettings) => {
      console.log('📡 Device settings changed:', newSettings);
      if (newSettings?.Parameters) {
        const params = newSettings.Parameters;
        
        // Create a stable hash by sorting keys to handle different property orders
        const createStableHash = (obj: any) => {
          const sortedKeys = Object.keys(obj).sort();
          const sortedObj: any = {};
          sortedKeys.forEach(key => {
            sortedObj[key] = obj[key];
          });
          return JSON.stringify(sortedObj);
        };
        
        const settingsHash = createStableHash(params);
        
        // Skip update if settings haven't actually changed
        if (settingsHash === lastProcessedSettings) {
          console.log('⏭️ Settings unchanged, skipping form update (hash match)');
          return;
        }
        
        lastProcessedSettings = settingsHash;
        
        const onTime = params['Interrupt ON Time'] || 0;
        const offTime = params['Interrupt OFF Time'] || 0;
        
        // Convert seconds to hours, minutes, seconds for ON time
        onHours.value = Math.floor(onTime / 3600);
        onMinutes.value = Math.floor((onTime % 3600) / 60);
        onSeconds.value = onTime % 60;
        
        // Convert seconds to hours, minutes, seconds for OFF time
        offHours.value = Math.floor(offTime / 3600);
        offMinutes.value = Math.floor((offTime % 3600) / 60);
        offSeconds.value = offTime % 60;
        
        // Update autoForm values
        autoForm.value.onTime = onTime;
        autoForm.value.offTime = offTime;
        
        // Update autoForm timestamps if available
        if (params['Interrupt Start TimeStamp']) {
          const [date, time] = params['Interrupt Start TimeStamp'].split(' ');
          if (date && time) {
            autoForm.value.startDate = date;
            autoForm.value.startTime = time;
          }
        }
        if (params['Interrupt Stop TimeStamp']) {
          const [date, time] = params['Interrupt Stop TimeStamp'].split(' ');
          if (date && time) {
            autoForm.value.stopDate = date;
            autoForm.value.stopTime = time;
          }
        }
        
        // Update dpolForm values
        if (params['Depolarization Start TimeStamp']) {
          const [date, time] = params['Depolarization Start TimeStamp'].split(' ');
          if (date && time) {
            dpolForm.value.startDate = date;
            dpolForm.value.startTime = time;
          }
        }
        if (params['Depolarization Stop TimeStamp']) {
          const [date, time] = params['Depolarization Stop TimeStamp'].split(' ');
          if (date && time) {
            dpolForm.value.endDate = date;
            dpolForm.value.endTime = time;
          }
        }
        
        // Update instForm values
        if (params['Instant Mode'] !== undefined) {
          instForm.value.frequency = params['Instant Mode'] === 0 ? 'daily' : 'weekly';
        }
        if (params['Instant Start TimeStamp']) {
          instForm.value.startTime = params['Instant Start TimeStamp'];
        }
        
        // All forms updated successfully
      } else {
        // No device parameters received
      }
    }, { immediate: true }); // Removed deep:true to prevent nested property triggers

    // Watch loggingInterval to auto-shift 00:00:00 to meaningful value
    watch(loggingInterval, (newValue) => {
      if (newValue === '00:00:00') {
        // Use nextTick to avoid infinite loop and allow the input to update first
        nextTick(() => {
          loggingInterval.value = '00:01:00';
        });
      }
    });

    // Helper functions for timer
    const formatTotalTime = (hours: number, minutes: number, seconds: number) => {
      const total = (hours * 3600) + (minutes * 60) + seconds;
      if (total === 0) return '0 seconds';
      
      const parts: string[] = [];
      if (hours > 0) parts.push(`${hours}h`);
      if (minutes > 0) parts.push(`${minutes}m`);
      if (seconds > 0) parts.push(`${seconds}s`);
      
      return parts.join(' ') + ` (${total}s total)`;
    };

    const setOnTime = (hours: number, minutes: number, seconds: number) => {
      onHours.value = hours;
      onMinutes.value = minutes;
      onSeconds.value = seconds;
    };

    const setOffTime = (hours: number, minutes: number, seconds: number) => {
      offHours.value = hours;
      offMinutes.value = minutes;
      offSeconds.value = seconds;
    };

    // Helper function to populate Auto/Interrupt form from device settings
    const populateAutoFormFromSettings = () => {
      console.log('🔍 DEBUG AUTO: populateAutoFormFromSettings called');
      
      if (deviceSettings.value?.Parameters) {
        const params = deviceSettings.value.Parameters;
        console.log('🔍 DEBUG AUTO: Available parameters:', Object.keys(params));
        
        // Populate timer values if available
        const onTime = params['Interrupt ON Time'] || 0;
        const offTime = params['Interrupt OFF Time'] || 0;
        console.log('🔍 DEBUG AUTO: Timer values - ON:', onTime, 'OFF:', offTime);
        
        autoForm.value.onTime = onTime;
        autoForm.value.offTime = offTime;
        
        // CRITICAL: Update timer component values for modal form inputs
        // Convert ON time seconds to hours, minutes, seconds
        onHours.value = Math.floor(onTime / 3600);
        onMinutes.value = Math.floor((onTime % 3600) / 60);
        onSeconds.value = onTime % 60;
        
        // Convert OFF time seconds to hours, minutes, seconds
        offHours.value = Math.floor(offTime / 3600);
        offMinutes.value = Math.floor((offTime % 3600) / 60);
        offSeconds.value = offTime % 60;
        
        console.log('🔍 DEBUG AUTO: Converted timer values:', {
          onHours: onHours.value, onMinutes: onMinutes.value, onSeconds: onSeconds.value,
          offHours: offHours.value, offMinutes: offMinutes.value, offSeconds: offSeconds.value
        });
        
        // Populate timestamps if available - try both display format and camelCase format
        const startTimestamp = params['Interrupt Start TimeStamp'] || params['interruptStartTimestamp'];
        const stopTimestamp = params['Interrupt Stop TimeStamp'] || params['interruptStopTimestamp'];
        
        if (startTimestamp) {
          const [date, time] = startTimestamp.split(' ');
          console.log('🔍 DEBUG AUTO: Start timestamp split:', { date, time, original: startTimestamp });
          if (date && time) {
            autoForm.value.startDate = date;
            autoForm.value.startTime = time;
          }
        }
        if (stopTimestamp) {
          const [date, time] = stopTimestamp.split(' ');
          console.log('🔍 DEBUG AUTO: Stop timestamp split:', { date, time, original: stopTimestamp });
          if (date && time) {
            autoForm.value.stopDate = date;
            autoForm.value.stopTime = time;
          }
        }
        
        console.log('🔍 DEBUG AUTO: Final autoForm values:', {
          startDate: autoForm.value.startDate,
          startTime: autoForm.value.startTime,
          stopDate: autoForm.value.stopDate,
          stopTime: autoForm.value.stopTime,
          onTime: autoForm.value.onTime,
          offTime: autoForm.value.offTime
        });
      } else {
        console.log('⚠️ DEBUG AUTO: No device settings available');
      }
    };

    // Helper function to populate DPOL form from device settings
    const populateDpolFormFromSettings = () => {
      if (deviceSettings.value?.Parameters) {
        const params = deviceSettings.value.Parameters;
        

        
        // Populate timestamps if available - try both display format and camelCase format
        const startTimestamp = params['Depolarization Start TimeStamp'] || params['depolarizationStartTimestamp'];
        const stopTimestamp = params['Depolarization Stop TimeStamp'] || params['depolarizationStopTimestamp'];
        
        if (startTimestamp) {
          const [date, time] = startTimestamp.split(' ');
          if (date && time) {
            dpolForm.value.startDate = date;
            dpolForm.value.startTime = time;
          }
        }
        if (stopTimestamp) {
          const [date, time] = stopTimestamp.split(' ');
          if (date && time) {
            dpolForm.value.endDate = date;
            dpolForm.value.endTime = time;
          }
        }
        
        // DPOL form populated successfully
      } else {
        // No device settings available
      }
    };

    // Helper function to populate INST form from device settings
    const populateInstFormFromSettings = () => {
      console.log('🔍 DEBUG: populateInstFormFromSettings called');
      console.log('🔍 DEBUG: deviceSettings.value:', deviceSettings.value);
      
      if (deviceSettings.value?.Parameters) {
        const params = deviceSettings.value.Parameters;
        console.log('🔍 DEBUG: Available parameters:', Object.keys(params));
        console.log('🔍 DEBUG: Instant Mode value:', params['Instant Mode']);
        // Try both display format and camelCase format for timestamps
        const startTime = params['Instant Start TimeStamp'] || params['instantStartTimestamp'];
        console.log('🔍 DEBUG: Start time value:', startTime);
        
        // Populate INST mode settings if available
        if (params['Instant Mode'] !== undefined) {
          instForm.value.frequency = params['Instant Mode'] === 0 ? 'daily' : 'weekly';
          console.log('🔍 DEBUG: Set frequency to:', instForm.value.frequency);
        }
        if (startTime) {
          instForm.value.startTime = startTime;
          console.log('🔍 DEBUG: Set startTime to:', instForm.value.startTime);
        }
        
        console.log('🔍 DEBUG: Final instForm values:', {
          frequency: instForm.value.frequency,
          startTime: instForm.value.startTime
        });
      } else {
        console.log('⚠️ DEBUG: No device settings available');
      }
    };

    const alarmSetopForm = ref({
      value: '0.00',
      unit: '',
      enabled: false
    });

    const alarmReffcalForm = ref({
      value: '0.00',
      unit: '',
      calibration: '',
      enabled: false
    });

    // Shunt configuration forms
    const shuntVoltageForm = ref({
      value: '25.00'
    });
    
    const shuntCurrentForm = ref({
      value: '99.99'
    });



    // Functions to open modals
    const openLogModal = () => {
      showLogModal.value = true;
    };

    const openModeModal = () => {
      showModeModal.value = true;
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
      
      // CRITICAL: Always populate form with current device settings when opening modal
      // This ensures data persists even after page refresh
      populateAutoFormFromSettings();
      
      // Show modal with a small delay to ensure reactivity updates
      nextTick(() => {
        showAutoModal.value = true;
        // Modal opened with populated values
      });
    };

    const openManualModal = () => {
      showModeModal.value = false;
      
      // Always populate form with current device settings when opening modal
      populateAutoFormFromSettings(); // Reuse same function as Manual uses same timer fields
      
      // Show modal with a small delay to ensure reactivity updates
      nextTick(() => {
        showManualModal.value = true;
        console.log('🔍 MANUAL modal opened with timer values:', {
          onHours: onHours.value,
          onMinutes: onMinutes.value,
          onSeconds: onSeconds.value,
          offHours: offHours.value,
          offMinutes: offMinutes.value,
          offSeconds: offSeconds.value
        });
      });
    };

    const openDpolModal = () => {
      showModeModal.value = false;
      
      // Always populate form with current device settings when opening modal
      populateDpolFormFromSettings();
      
      showDpolModal.value = true;
    };

    const openInstModal = () => {
      showModeModal.value = false;
      
      // Always populate form with current device settings when opening modal
      populateInstFormFromSettings();
      
      showInstModal.value = true;
    };

    // Functions to close modals
    const closeLogModal = () => {
      showLogModal.value = false;
    };

    // Logging interval functions
    const setLoggingInterval = (interval: string) => {
      // Auto-shift 00:00:00 to minimum meaningful interval
      if (interval === '00:00:00') {
        loggingInterval.value = '00:01:00';
      } else {
        loggingInterval.value = interval;
      }
    };

    const isValidTimeFormat = (time: string) => {
      const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
      if (!timeRegex.test(time)) return false;
      
      // Check if it's 00:00:00 (zero interval)
      const [hours, minutes, seconds] = time.split(':').map(Number);
      const totalSeconds = hours * 3600 + minutes * 60 + seconds;
      
      // Reject zero intervals as they disable logging
      return totalSeconds > 0;
    };

    const formatIntervalDescription = (interval: string) => {
      if (!isValidTimeFormat(interval)) return 'Invalid format';
      
      const [hours, minutes, seconds] = interval.split(':').map(Number);
      const totalSeconds = hours * 3600 + minutes * 60 + seconds;
      
      if (totalSeconds === 0) return 'No logging';
      if (totalSeconds < 60) return `Every ${totalSeconds} second${totalSeconds !== 1 ? 's' : ''}`;
      if (totalSeconds < 3600) {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return secs > 0 ? `Every ${mins}m ${secs}s` : `Every ${mins} minute${mins !== 1 ? 's' : ''}`;
      }
      
      const hrs = Math.floor(totalSeconds / 3600);
      const mins = Math.floor((totalSeconds % 3600) / 60);
      const secs = totalSeconds % 60;
      
      let desc = `Every ${hrs} hour${hrs !== 1 ? 's' : ''}`;
      if (mins > 0) desc += ` ${mins}m`;
      if (secs > 0) desc += ` ${secs}s`;
      
      return desc;
    };

    const saveLoggingInterval = async () => {
      // Auto-shift 00:00:00 to minimum interval
      if (loggingInterval.value === '00:00:00') {
        loggingInterval.value = '00:01:00';
        Swal.fire({
          title: 'Interval Adjusted',
          text: 'Logging interval cannot be 00:00:00 (no logging). Automatically adjusted to 00:01:00 (1 minute).',
          icon: 'info',
          confirmButtonText: 'Continue'
        });
        return;
      }

      if (!isValidTimeFormat(loggingInterval.value)) {
        const [hours, minutes, seconds] = loggingInterval.value.split(':').map(Number);
        const totalSeconds = hours * 3600 + minutes * 60 + seconds;
        
        if (totalSeconds === 0) {
          Swal.fire({
            title: 'Invalid Interval',
            text: 'Logging interval cannot be 00:00:00 as it disables data logging. Please set a minimum interval of 00:00:01.',
            icon: 'warning',
            confirmButtonText: 'OK'
          });
        } else {
          Swal.fire({
            title: 'Invalid Format',
            text: 'Please enter a valid time format (HH:MM:SS)',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
        return;
      }

      try {
        // Show loading
        Swal.fire({
          title: 'Applying Logging Interval',
          html: `Setting logging interval to <strong>${loggingInterval.value}</strong><br><small>Sending command to device...</small>`,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

        // Convert time to seconds for device
        const [hours, minutes, seconds] = loggingInterval.value.split(':').map(Number);
        const intervalInSeconds = hours * 3600 + minutes * 60 + seconds;

        // Prepare logging interval settings for device
        const loggingSettings = {
          loggingInterval: intervalInSeconds,
          loggingIntervalFormatted: loggingInterval.value,
          description: formatIntervalDescription(loggingInterval.value),
          lastUpdated: new Date().toISOString()
        };

        // Save logging interval settings to database and send to device
        if (deviceId.value) {
          try {
            // Save to database using the MQTT service method
            await mqttService.saveSettingsToDatabase(deviceId.value, {
              logging: loggingSettings
            });
            console.log('💾 [API] Saved logging interval to backend');

            // Send device command via API (this will send MQTT message to device)
            ApiService.setHeader();
            const deviceCommand = {
              commandType: 'set_logging_interval',
              deviceId: deviceId.value,
              parameters: {
                interval: intervalInSeconds,
                intervalFormatted: loggingInterval.value,
                description: formatIntervalDescription(loggingInterval.value)
              },
              timestamp: new Date().toISOString()
            };
            
            await ApiService.post(`/api/devices/${deviceId.value}/commands/logging`, deviceCommand);
            console.log('📤 [MQTT] Sent logging interval command via API');
            
          } catch (apiError) {
            console.warn('⚠️ [API] Could not save/send logging interval:', apiError);
            throw apiError;
          }
        }

        // Success message
        Swal.fire({
          title: 'Success!',
          html: `
            <div class="text-start">
              <p><strong>Logging interval updated successfully!</strong></p>
              <hr>
              <p><i class="bi bi-clock me-2"></i><strong>Interval:</strong> ${loggingInterval.value}</p>
              <p><i class="bi bi-info-circle me-2"></i><strong>Frequency:</strong> ${formatIntervalDescription(loggingInterval.value)}</p>
              <p><i class="bi bi-broadcast me-2"></i><strong>Command sent to device</strong> via MQTT</p>
            </div>
          `,
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#198754'
        });

        closeLogModal();
        
      } catch (error) {
        console.error('❌ [LOG INTERVAL] Error:', error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to set logging interval. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    };

    const closeModeModal = () => {
      showModeModal.value = false;
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
      showAlarmModal.value = true; // Return to main alarm modal
    };

    const saveAlarmSetupModal = () => {
      // Close setup modal and return to main alarm modal
      showAlarmSetupModal.value = false;
      showAlarmModal.value = true;
    };

    const closeAlarmSetopModal = () => {
      showAlarmSetopModal.value = false;
      showAlarmModal.value = true; // Return to main alarm modal
    };

    const saveAlarmSetopModal = () => {
      // Close setop modal and return to main alarm modal
      showAlarmSetopModal.value = false;
      showAlarmModal.value = true;
    };

    const closeAlarmReffcalModal = () => {
      showAlarmReffcalModal.value = false;
      showAlarmModal.value = true; // Return to main alarm modal
    };

    const saveAlarmReffcalModal = () => {
      // Close reffcal modal and return to main alarm modal
      showAlarmReffcalModal.value = false;
      showAlarmModal.value = true;
    };

    // Functions for shunt configuration modals
    const openShuntVoltageModal = () => {
      const currentValue = settingsParams.value?.['Shunt Voltage'];
      if (currentValue) {
        // If it's already formatted string, use it; otherwise format it
        shuntVoltageForm.value.value = typeof currentValue === 'string' ? currentValue : parseFloat(currentValue).toFixed(2).padStart(5, '0');
      } else {
        shuntVoltageForm.value.value = '25.00';
      }
      showShuntVoltageModal.value = true;
    };

    const closeShuntVoltageModal = () => {
      showShuntVoltageModal.value = false;
    };

    const openShuntCurrentModal = () => {
      const currentValue = settingsParams.value?.['Shunt Current'];
      if (currentValue) {
        // If it's already formatted string, use it; otherwise format it
        shuntCurrentForm.value.value = typeof currentValue === 'string' ? currentValue : parseFloat(currentValue).toFixed(2).padStart(5, '0');
      } else {
        shuntCurrentForm.value.value = '99.99';
      }
      showShuntCurrentModal.value = true;
    };

    const closeShuntCurrentModal = () => {
      showShuntCurrentModal.value = false;
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
          offTime: parseInt(autoForm.value.offTime.toString())
        };

        console.log('Sending interrupt mode configuration:', config);

        // ✅ Use API-based method that sends COMPLETE settings frame
        const response = await mqttService.configureInterruptMode(deviceId.value || '123', config);

        if (response.success) {
          // Save settings to database after successful send
          try {
            await mqttService.saveSettingsToDatabase(deviceId.value || '123', {
              event: 1, // Interrupt mode
              interruptStartTimestamp: `${config.startDate} ${config.startTime}`,
              interruptStopTimestamp: `${config.stopDate} ${config.stopTime}`,
              interruptOnTime: config.onTime,
              interruptOffTime: config.offTime
            });
            console.log('✅ Interrupt mode settings saved to database');
          } catch (dbError) {
            console.warn('⚠️ Database save failed (non-critical):', dbError);
          }

          await Swal.fire({
            title: 'Configuration Sent!',
            text: 'Interrupt mode configuration has been sent to the device successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          
          await refreshDeviceSettings();
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

    // Save shunt configuration functions
    const saveShuntVoltageConfiguration = async () => {
      try {
        if (!deviceId.value) {
          throw new Error('Device ID is required');
        }

        const voltage = parseFloat(shuntVoltageForm.value.value);
        if (voltage < 0.00 || voltage > 99.99) {
          throw new Error('Voltage must be between 00.00 and 99.99');
        }

        // Send the formatted string value to preserve leading zeros
        const formattedVoltage = voltage.toFixed(2).padStart(5, '0');
        const payload = { shuntVoltage: formattedVoltage };

        console.log('💾 Saving Shunt Voltage configuration:', payload);
        ApiService.setHeader();
        const response = await ApiService.post(`/api/devices/${deviceId.value}/configure/shunt-voltage`, payload);
        
        if (response.data.success) {
          await Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: `Shunt voltage set to ${formattedVoltage}`,
            showConfirmButton: false,
            timer: 2000
          });
          
          // Force refresh device settings and UI update
          console.log('🔄 Forcing device settings refresh after voltage update...');
          await refreshDeviceSettings();
          
          // Also update local settings immediately for instant feedback
          if (deviceSettings.value?.Parameters) {
            deviceSettings.value.Parameters['Shunt Voltage'] = formattedVoltage;
          }
          
          await nextTick();
          console.log('🔄 Voltage updated, current settings:', settingsParams.value);
          closeShuntVoltageModal();
        }
      } catch (error: any) {
        console.error('❌ Error saving Shunt Voltage:', error);
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response?.data?.message || error.message || 'Failed to save voltage configuration'
        });
      }
    };

    const saveShuntCurrentConfiguration = async () => {
      try {
        if (!deviceId.value) {
          throw new Error('Device ID is required');
        }

        const current = parseFloat(shuntCurrentForm.value.value);
        if (current < 0.00 || current > 99.99) {
          throw new Error('Current must be between 00.00 and 99.99');
        }

        // Send the formatted string value to preserve leading zeros
        const formattedCurrent = current.toFixed(2).padStart(5, '0');
        const payload = { shuntCurrent: formattedCurrent };

        console.log('💾 Saving Shunt Current configuration:', payload);
        ApiService.setHeader();
        const response = await ApiService.post(`/api/devices/${deviceId.value}/configure/shunt-current`, payload);
        
        if (response.data.success) {
          await Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: `Shunt current set to ${formattedCurrent}`,
            showConfirmButton: false,
            timer: 2000
          });
          
          // Force refresh device settings and UI update
          console.log('🔄 Forcing device settings refresh after current update...');
          await refreshDeviceSettings();
          
          // Also update local settings immediately for instant feedback
          if (deviceSettings.value?.Parameters) {
            deviceSettings.value.Parameters['Shunt Current'] = formattedCurrent;
          }
          
          await nextTick();
          console.log('🔄 Current updated, current settings:', settingsParams.value);
          closeShuntCurrentModal();
        }
      } catch (error: any) {
        console.error('❌ Error saving Shunt Current:', error);
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response?.data?.message || error.message || 'Failed to save current configuration'
        });
      }
    };

    // Function to close all modals
    // Input validation methods
    const validateVoltageInput = (event: any) => {
      const value = event.target.value;
      // Remove any characters that aren't digits or decimal point
      const cleaned = value.replace(/[^0-9.]/g, '');
      // Ensure only one decimal point
      const parts = cleaned.split('.');
      if (parts.length > 2) {
        event.target.value = parts[0] + '.' + parts.slice(1).join('');
      }
      // Limit to 2 decimal places
      if (parts[1] && parts[1].length > 2) {
        event.target.value = parts[0] + '.' + parts[1].substring(0, 2);
      }
      shuntVoltageForm.value.value = event.target.value;
    };

    const formatVoltageInput = (event: any) => {
      const value = parseFloat(event.target.value);
      if (!isNaN(value)) {
        const clamped = Math.min(Math.max(value, 0), 99.99);
        const formatted = clamped.toFixed(2).padStart(5, '0');
        event.target.value = formatted;
        shuntVoltageForm.value.value = formatted;
      }
    };

    const validateCurrentInput = (event: any) => {
      const value = event.target.value;
      // Remove any characters that aren't digits or decimal point
      const cleaned = value.replace(/[^0-9.]/g, '');
      // Ensure only one decimal point
      const parts = cleaned.split('.');
      if (parts.length > 2) {
        event.target.value = parts[0] + '.' + parts.slice(1).join('');
      }
      // Limit to 2 decimal places
      if (parts[1] && parts[1].length > 2) {
        event.target.value = parts[0] + '.' + parts[1].substring(0, 2);
      }
      shuntCurrentForm.value.value = event.target.value;
    };

    const formatCurrentInput = (event: any) => {
      const value = parseFloat(event.target.value);
      if (!isNaN(value)) {
        const clamped = Math.min(Math.max(value, 0), 99.99);
        const formatted = clamped.toFixed(2).padStart(5, '0');
        event.target.value = formatted;
        shuntCurrentForm.value.value = formatted;
      }
    };

    // Display formatting functions for device settings matrix
    const formatShuntVoltageDisplay = (voltage: any) => {
      if (!voltage && voltage !== 0) return '25.00 V';
      if (typeof voltage === 'string') {
        return `${voltage} V`;
      }
      return `${parseFloat(voltage).toFixed(2).padStart(5, '0')} V`;
    };

    const formatShuntCurrentDisplay = (current: any) => {
      if (!current && current !== 0) return '99.99 mA';
      if (typeof current === 'string') {
        return `${current} mA`;
      }
      return `${parseFloat(current).toFixed(2).padStart(5, '0')} mA`;
    };

    const closeAllModals = () => {
      showLogModal.value = false;
      showModeModal.value = false;

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
      showShuntVoltageModal.value = false;
      showShuntCurrentModal.value = false;
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
  const response = await mqttService.setElectrodeConfiguration(deviceId.value || '123', selectedElectrode.value);
        
        if (response.success) {
          // Save settings to database after successful send
          try {
            const electrodeCode = ELECTRODE_MAPPING[selectedElectrode.value] || 0;
            await mqttService.saveSettingsToDatabase(deviceId.value || '123', {
              electrode: electrodeCode
            });
            console.log('✅ Electrode setting saved to database');
          } catch (dbError) {
            console.warn('⚠️ Database save failed (non-critical):', dbError);
          }

          await Swal.fire({
            title: 'Electrode Configuration Sent!',
            text: `${selectedElectrode.value} electrode configuration has been sent to the device.`,
            icon: 'success',
            confirmButtonText: 'OK'
          });
          await refreshDeviceSettings();
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
        console.log('🔧 Manual Mode Action:', action);
        console.log('📊 Current Timer Values - ON:', autoForm.value.onTime, 'OFF:', autoForm.value.offTime);
        
        // First save the timer settings to database and memory
        const actionCode = MANUAL_ACTION_MAPPING[action] || 0;
        await mqttService.saveSettingsToDatabase(deviceId.value || '123', {
          manualModeAction: actionCode,
          interruptOnTime: autoForm.value.onTime,
          interruptOffTime: autoForm.value.offTime
        });
        console.log('✅ Timer settings saved to database first');
        
        // Then send the manual action command
        const response = await mqttService.setManualMode(deviceId.value || '123', action);
        
        if (response.success) {
          await Swal.fire({
            title: 'Command Sent!',
            text: `Manual ${action} command has been sent to the device with updated timers.`,
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          });
          
          // Refresh settings to show updated values
          await refreshDeviceSettings();
        } else {
          throw new Error(response.message || 'Command failed');
        }
      } catch (error: any) {
        console.error('❌ Error executing manual action:', error);
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
  const response = await mqttService.setNormalMode(deviceId.value || '123', {});
        
        if (response.success) {
          await Swal.fire({
            title: 'Normal Mode Activated!',
            text: 'Normal mode configuration has been sent to the device.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          await refreshDeviceSettings();
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
          endTime: dpolForm.value.endTime
        };

  console.log('Sending DPOL mode configuration:', config);
  const response = await mqttService.setDpolMode(deviceId.value || '123', config);
        
        if (response.success) {
          // Save settings to database after successful send
          try {
            await mqttService.saveSettingsToDatabase(deviceId.value || '123', {
              event: 3, // DPOL mode
              depolarizationStartTimestamp: `${config.startDate} ${config.startTime}`,
              depolarizationStopTimestamp: `${config.endDate} ${config.endTime}`
            });
            console.log('✅ DPOL mode settings saved to database');
          } catch (dbError) {
            console.warn('⚠️ Database save failed (non-critical):', dbError);
          }

          await Swal.fire({
            title: 'DPOL Mode Configuration Sent!',
            text: 'DPOL mode settings have been sent to the device.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          await refreshDeviceSettings();
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
          startTime: instForm.value.startTime,
          frequency: instForm.value.frequency
        };

  console.log('Sending INST mode configuration:', config);
  const response = await mqttService.setInstMode(deviceId.value || '123', config);
        
        if (response.success) {
          // Save settings to database
          try {
            const frequencyCode = INSTANT_MODE_MAPPING[instForm.value.frequency] || 0;
            await mqttService.saveSettingsToDatabase(deviceId.value || '123', {
              instantMode: frequencyCode,
              instantStartTimestamp: instForm.value.startTime
            });
            console.log('✅ INST mode settings saved to database');
          } catch (dbError) {
            console.warn('⚠️ Database save failed (non-critical):', dbError);
          }

          await Swal.fire({
            title: 'INST Mode Configuration Sent!',
            text: 'INST mode settings have been sent to the device.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          await refreshDeviceSettings();
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

    // Save set value configuration
    const saveAlarmConfiguration = async () => {
      try {
        // Validate UP and OP values are between -4.00 to 4.00
        const validateRange = (value: string, name: string) => {
          const num = parseFloat(value);
          if (num < -4.00 || num > 4.00) {
            throw new Error(`${name} value must be between -4.00 and 4.00V`);
          }
          return num;
        };

        let setupValue, setopValue, reffcalValue;
        
        if (alarmSetupForm.value.enabled) {
          setupValue = validateRange(alarmSetupForm.value.value, 'SET UP');
        }
        
        if (alarmSetopForm.value.enabled) {
          setopValue = validateRange(alarmSetopForm.value.value, 'SET OP');
        }
        
        if (alarmReffcalForm.value.enabled) {
          reffcalValue = parseFloat(alarmReffcalForm.value.value); // No range limit for FCAL
        }

        const config = {
          setup: alarmSetupForm.value.enabled ? {
            value: setupValue,
            enabled: alarmSetupForm.value.enabled
          } : undefined,
          setop: alarmSetopForm.value.enabled ? {
            value: setopValue,
            enabled: alarmSetopForm.value.enabled
          } : undefined,
          reffcal: alarmReffcalForm.value.enabled ? {
            value: reffcalValue,
            calibration: alarmReffcalForm.value.calibration,
            enabled: alarmReffcalForm.value.enabled
          } : undefined
        };

  console.log('Sending set value configuration:', config);
  const response = await mqttService.setAlarmConfiguration(deviceId.value || '123', config);
        
        if (response.success) {
          await Swal.fire({
            title: 'Set Value Configuration Sent!',
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
      getElectrodeLabel,
      getEventLabel,
      getInstantModeLabel,
      deviceSettings,
      settingsParams,
      hasSettings,
      showLogModal,
      loggingInterval,
      setLoggingInterval,
      isValidTimeFormat,
      formatIntervalDescription,
      saveLoggingInterval,
      showModeModal,

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

      closeElectrodeModal,
      closeAlarmModal,
      closeAlarmSetupModal,
      saveAlarmSetupModal,
      closeAlarmSetopModal,
      saveAlarmSetopModal,
      closeAlarmReffcalModal,
      saveAlarmReffcalModal,
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

      alarmSetupForm,
      alarmSetopForm,
      alarmReffcalForm,
      // Shunt configuration
      shuntVoltageForm,
      shuntCurrentForm,
      showShuntVoltageModal,
      showShuntCurrentModal,
      openShuntVoltageModal,
      closeShuntVoltageModal,
      openShuntCurrentModal,
      closeShuntCurrentModal,
      saveShuntVoltageConfiguration,
      saveShuntCurrentConfiguration,
      validateVoltageInput,
      formatVoltageInput,
      validateCurrentInput,
      formatCurrentInput,
      formatShuntVoltageDisplay,
      formatShuntCurrentDisplay,
      // Manual mode timer
      onHours,
      onMinutes,
      onSeconds,
      offHours,
      offMinutes,
      offSeconds,
      formatTotalTime,
      setOnTime,
      setOffTime,
      // New configuration functions

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
                      <p class="text-muted mb-1 text-capitalize">{{ metric.type }}</p>
                      <h5 class="mt-0 mb-0">{{ metric.value }}</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mb-5">
            <h4 class="fs-1 text-gray-800 w-bolder mb-6">Device Settings</h4>
            <div v-if="hasSettings">
              <div class="row g-4">
                <div class="col-md-4">
                  <div class="card bg-light">
                    <div class="card-body p-4">
                      <div class="d-flex flex-column align-items-center">
                        <i class="bi bi-plug text-primary" style="font-size: 2rem"></i>
                        <p class="text-muted mb-1">Electrode</p>
                        <h6 class="mt-0 mb-0">{{ getElectrodeLabel(settingsParams.Electrode) }}</h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="card bg-light">
                    <div class="card-body p-4">
                      <div class="d-flex flex-column align-items-center">
                        <i class="bi bi-activity text-success" style="font-size: 2rem"></i>
                        <p class="text-muted mb-1">Event Mode</p>
                        <h6 class="mt-0 mb-0">{{ getEventLabel(settingsParams.Event) }}</h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="card bg-light">
                    <div class="card-body p-4">
                      <div class="d-flex flex-column align-items-center">
                        <i class="bi bi-lightning text-success" style="font-size: 2rem"></i>
                        <p class="text-muted mb-1">Shunt Voltage</p>
                        <h6 class="mt-0 mb-0 cursor-pointer text-primary" @click="openShuntVoltageModal">
                          {{ settingsParams?.['Shunt Voltage'] || '25.00' }} V
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="card bg-light">
                    <div class="card-body p-4">
                      <div class="d-flex flex-column align-items-center">
                        <i class="bi bi-flash text-primary" style="font-size: 2rem"></i>
                        <p class="text-muted mb-1">Shunt Current</p>
                        <h6 class="mt-0 mb-0 cursor-pointer text-primary" @click="openShuntCurrentModal">
                          {{ settingsParams?.['Shunt Current'] || '99.99' }} mA
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="card bg-light">
                    <div class="card-body p-4">
                      <div class="d-flex flex-column align-items-center">
                        <i class="bi bi-clock text-primary" style="font-size: 2rem"></i>
                        <p class="text-muted mb-1">Interrupt ON</p>
                        <h6 class="mt-0 mb-0">{{ settingsParams['Interrupt ON Time'] || 0 }} s</h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="card bg-light">
                    <div class="card-body p-4">
                      <div class="d-flex flex-column align-items-center">
                        <i class="bi bi-clock-history text-secondary" style="font-size: 2rem"></i>
                        <p class="text-muted mb-1">Interrupt OFF</p>
                        <h6 class="mt-0 mb-0">{{ settingsParams['Interrupt OFF Time'] || 0 }} s</h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="card bg-light">
                    <div class="card-body p-4">
                      <div class="d-flex flex-column align-items-center">
                        <i class="bi bi-speedometer text-danger" style="font-size: 2rem"></i>
                        <p class="text-muted mb-1">Instant Mode</p>
                        <h6 class="mt-0 mb-0">{{ getInstantModeLabel(settingsParams['Instant Mode']) }}</h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="card bg-light">
                    <div class="card-body p-4">
                      <div class="d-flex flex-column align-items-center">
                        <i class="bi bi-exclamation-triangle text-warning" style="font-size: 2rem"></i>
                        <p class="text-muted mb-1">Reference Fail</p>
                        <h6 class="mt-0 mb-0">{{ settingsParams['Reference Fail'] || 0 }} mV</h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="card bg-light">
                    <div class="card-body p-4">
                      <div class="d-flex flex-column align-items-center">
                        <i class="bi bi-arrow-up-circle text-success" style="font-size: 2rem"></i>
                        <p class="text-muted mb-1">Reference UP</p>
                        <h6 class="mt-0 mb-0">{{ settingsParams['Reference UP'] || 0 }} mV</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="card p-3">
                <p class="text-muted mb-0">No settings available for this device.</p>
              </div>
            </div>
          </div>
          

        </div>
        <div class="col-lg-6">
          <!-- Device Control Boxes -->
          <div class="mb-5">
            <h4 class="fs-1 text-gray-800 w-bolder mb-6">Device Controls</h4>
            <div class="row g-3">
              <!-- 1. Electrode (first according to CSV sequence) -->
              <div class="col-md-6">
                <div class="card bg-info cursor-pointer" @click="openElectrodeModal">
                  <div class="card-body p-4 text-center">
                    <i class="bi bi-lightning text-white" style="font-size: 2rem"></i>
                    <h5 class="mt-2 mb-0 text-white">Electrode</h5>
                    <p class="text-white-50 mb-0">Electrode Config</p>
                  </div>
                </div>
              </div>
              <!-- 2. Set Value (renamed from Alarm, second in sequence) -->
              <div class="col-md-6">
                <div class="card bg-danger cursor-pointer" @click="openAlarmModal">
                  <div class="card-body p-4 text-center">
                    <i class="bi bi-exclamation-triangle text-white" style="font-size: 2rem"></i>
                    <h5 class="mt-2 mb-0 text-white">Set Value</h5>
                    <p class="text-white-50 mb-0">Value Settings</p>
                  </div>
                </div>
              </div>
              <!-- 3. Set Log (renamed from Log No, third in sequence) -->
              <div class="col-md-6">
                <div class="card bg-primary cursor-pointer" @click="openLogModal">
                  <div class="card-body p-4 text-center">
                    <i class="bi bi-journal-text text-white" style="font-size: 2rem"></i>
                    <h5 class="mt-2 mb-0 text-white">Set Log</h5>
                    <p class="text-white-50 mb-0">Logging Settings</p>
                  </div>
                </div>
              </div>
              <!-- 4. Set Mode (renamed from Mode, fourth in sequence) -->
              <div class="col-md-6">
                <div class="card bg-success cursor-pointer" @click="openModeModal">
                  <div class="card-body p-4 text-center">
                    <i class="bi bi-gear text-white" style="font-size: 2rem"></i>
                    <h5 class="mt-2 mb-0 text-white">Set Mode</h5>
                    <p class="text-white-50 mb-0">Mode Configuration</p>
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
            Set Value Configuration
          </h5>
          <button type="button" class="btn-close btn-close-white" @click="closeAlarmModal"></button>
        </div>
        <div class="modal-body p-4">
          <!-- Set Value Configuration Items -->
          <div class="row">
            <div class="col-md-6">
              <h6 class="fw-bold mb-4">Set Value Parameters</h6>
              
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

              <!-- Set Voltage -->
              <div class="card border mb-3 cursor-pointer" @click="openShuntVoltageModal()">
                <div class="card-body p-4 text-center">
                  <i class="bi bi-lightning text-success" style="font-size: 2rem"></i>
                  <h6 class="mt-2 mb-1">Set Voltage</h6>
                  <small class="text-muted">{{ settingsParams?.['Shunt Voltage'] || '25.00' }}</small>
                </div>
              </div>

              <!-- Set Shunt -->
              <div class="card border mb-3 cursor-pointer" @click="openShuntCurrentModal()">
                <div class="card-body p-4 text-center">
                  <i class="bi bi-flash text-primary" style="font-size: 2rem"></i>
                  <h6 class="mt-2 mb-1">Set Shunt</h6>
                  <small class="text-muted">{{ settingsParams?.['Shunt Current'] || '99.99' }}</small>
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
              <input type="number" class="form-control" v-model="alarmSetupForm.value" step="0.01" min="-4.00" max="4.00">
              <span class="input-group-text">V</span>
            </div>
            <small class="text-muted">Range: -4.00V to +4.00V</small>
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
          <button type="button" class="btn btn-danger" @click="saveAlarmSetupModal">Save</button>
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
              <input type="number" class="form-control" v-model="alarmSetopForm.value" step="0.01" min="-4.00" max="4.00">
              <span class="input-group-text">V</span>
            </div>
            <small class="text-muted">Range: -4.00V to +4.00V</small>
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
          <button type="button" class="btn btn-warning" @click="saveAlarmSetopModal">Save</button>
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
          <button type="button" class="btn btn-info" @click="saveAlarmReffcalModal">Save</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Log Modal -->
  <div class="modal fade" tabindex="-1" :class="{ show: showLogModal, 'd-block': showLogModal }" v-if="showLogModal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header bg-primary">
          <h5 class="modal-title text-white">
            <i class="bi bi-journal-text me-2"></i>
            Set Log - Logging Interval Configuration
          </h5>
          <button type="button" class="btn-close btn-close-white" @click="closeLogModal"></button>
        </div>
        <div class="modal-body p-4">
          <div class="alert alert-info mb-4">
            <i class="bi bi-info-circle me-2"></i>
            Configure how frequently the device should log and transmit data over MQTT.
          </div>
          
          <div class="row">
            <div class="col-md-12">
              <div class="card border-primary">
                <div class="card-header bg-light">
                  <h6 class="mb-0">
                    <i class="bi bi-clock me-2"></i>
                    Logging Interval
                  </h6>
                </div>
                <div class="card-body">
                  <div class="row align-items-center">
                    <div class="col-md-6">
                      <label class="form-label fw-bold">Logging Interval (HH:MM:SS)</label>
                      <div class="input-group">
                        <span class="input-group-text">
                          <i class="bi bi-stopwatch"></i>
                        </span>
                        <input 
                          type="text" 
                          class="form-control" 
                          v-model="loggingInterval"
                          placeholder="00:01:00"
                          pattern="^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$"
                          title="Format: HH:MM:SS (e.g., 00:01:30 for 1 minute 30 seconds). Cannot be 00:00:00."
                        />
                      </div>
                      <small class="text-muted">
                        Format: Hours:Minutes:Seconds (e.g., 00:01:00 = 1 minute)
                        <span class="text-danger fw-bold">⚠️ Cannot be 00:00:00 (disables logging)</span>
                      </small>
                    </div>
                    <div class="col-md-6">
                      <div class="bg-light p-3 rounded">
                        <h6 class="mb-2">Current Setting:</h6>
                        <div class="d-flex align-items-center">
                          <span class="badge bg-primary fs-6 me-2">{{ loggingInterval }}</span>
                          <small class="text-muted">{{ formatIntervalDescription(loggingInterval) }}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <hr class="my-4">
                  
                  <div class="row">
                    <div class="col-md-12">
                      <h6 class="mb-3">Quick Presets:</h6>
                      <div class="d-flex flex-wrap gap-2">
                        <button class="btn btn-outline-primary btn-sm" @click="setLoggingInterval('00:00:30')">
                          30 seconds
                        </button>
                        <button class="btn btn-outline-primary btn-sm" @click="setLoggingInterval('00:01:00')">
                          1 minute
                        </button>
                        <button class="btn btn-outline-primary btn-sm" @click="setLoggingInterval('00:05:00')">
                          5 minutes
                        </button>
                        <button class="btn btn-outline-primary btn-sm" @click="setLoggingInterval('00:10:00')">
                          10 minutes
                        </button>
                        <button class="btn btn-outline-primary btn-sm" @click="setLoggingInterval('00:30:00')">
                          30 minutes
                        </button>
                        <button class="btn btn-outline-primary btn-sm" @click="setLoggingInterval('01:00:00')">
                          1 hour
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeLogModal">Cancel</button>
          <button type="button" class="btn btn-primary" @click="saveLoggingInterval" :disabled="!isValidTimeFormat(loggingInterval)">
            <i class="bi bi-check-circle me-2"></i>
            Apply Logging Interval
          </button>
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
              <div class="card cursor-pointer" :class="{ 'border-primary bg-light': selectedElectrode === 'Cu/cuso4' }" @click="selectedElectrode = 'Cu/cuso4'">
                <div class="card-body p-4 text-center">
                  <div class="form-check d-flex justify-content-center">
                    <input class="form-check-input me-2" type="radio" name="electrode" id="cucuso4" value="Cu/cuso4" v-model="selectedElectrode">
                  </div>
                  <i class="bi bi-circle text-primary" style="font-size: 2rem"></i>
                  <h5 class="mt-2 mb-0">Cu/cuso4</h5>
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
              <div class="card cursor-pointer" :class="{ 'border-primary bg-light': selectedElectrode === 'Ag/AgCl' }" @click="selectedElectrode = 'Ag/AgCl'">
                <div class="card-body p-4 text-center">
                  <div class="form-check d-flex justify-content-center">
                    <input class="form-check-input me-2" type="radio" name="electrode" id="agagcl" value="Ag/AgCl" v-model="selectedElectrode">
                  </div>
                  <i class="bi bi-diamond text-warning" style="font-size: 2rem"></i>
                  <h5 class="mt-2 mb-0">Ag/AgCl</h5>
                  <p class="text-muted mb-0">Silver Chloride</p>
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
            <!-- Left Column - Dates and Times -->
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
            </div>
            

          </div>

          <!-- Timer Configuration Section (Shared with Manual Mode) -->
          <hr class="my-4">
          <h6 class="mb-3"><i class="bi bi-clock-fill me-2"></i>Interrupt Timer Settings</h6>
          <div class="timer-config-section">
            <div class="row g-4">
              <!-- ON Timer Card -->
              <div class="col-md-6">
                <div class="timer-card on-timer">
                  <div class="timer-card-header">
                    <i class="bi bi-play-circle-fill"></i>
                    <span>ON Timer</span>
                  </div>
                  <div class="timer-card-body">
                    <!-- Hours, Minutes, Seconds Inputs -->
                    <div class="time-input-group">
                      <div class="time-input-box">
                        <input type="number" class="time-digit" v-model.number="onHours" min="0" max="23" placeholder="00">
                        <label>Hours</label>
                      </div>
                      <span class="time-separator">:</span>
                      <div class="time-input-box">
                        <input type="number" class="time-digit" v-model.number="onMinutes" min="0" max="59" placeholder="00">
                        <label>Minutes</label>
                      </div>
                      <span class="time-separator">:</span>
                      <div class="time-input-box">
                        <input type="number" class="time-digit" v-model.number="onSeconds" min="0" max="59" placeholder="00">
                        <label>Seconds</label>
                      </div>
                    </div>
                    
                    <!-- Total Seconds Display -->
                    <div class="total-display on-total">
                      <i class="bi bi-clock"></i>
                      <span>{{ formatTotalTime(onHours, onMinutes, onSeconds) }}</span>
                    </div>

                    <!-- Quick Presets -->
                    <div class="preset-buttons">
                      <button @click="setOnTime(24, 0, 0)" class="preset-btn on-preset">1m</button>
                      <button @click="setOnTime(24, 0, 0)" class="preset-btn on-preset">5m</button>
                      <button @click="setOnTime(24, 0, 0)" class="preset-btn on-preset">10m</button>
                      <button @click="setOnTime(24, 0, 0)" class="preset-btn on-preset">30m</button>
                      <button @click="setOnTime(24, 0, 0)" class="preset-btn on-preset">1h</button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- OFF Timer Card -->
              <div class="col-md-6">
                <div class="timer-card off-timer">
                  <div class="timer-card-header">
                    <i class="bi bi-stop-circle-fill"></i>
                    <span>OFF Timer</span>
                  </div>
                  <div class="timer-card-body">
                    <!-- Hours, Minutes, Seconds Inputs -->
                    <div class="time-input-group">
                      <div class="time-input-box">
                        <input type="number" class="time-digit" v-model.number="offHours" min="0" max="23" placeholder="00">
                        <label>Hours</label>
                      </div>
                      <span class="time-separator">:</span>
                      <div class="time-input-box">
                        <input type="number" class="time-digit" v-model.number="offMinutes" min="0" max="59" placeholder="00">
                        <label>Minutes</label>
                      </div>
                      <span class="time-separator">:</span>
                      <div class="time-input-box">
                        <input type="number" class="time-digit" v-model.number="offSeconds" min="0" max="59" placeholder="00">
                        <label>Seconds</label>
                      </div>
                    </div>
                    
                    <!-- Total Seconds Display -->
                    <div class="total-display off-total">
                      <i class="bi bi-clock"></i>
                      <span>{{ formatTotalTime(offHours, offMinutes, offSeconds) }}</span>
                    </div>

                    <!-- Quick Presets -->
                    <div class="preset-buttons">
                      <button @click="setOffTime(0, 1, 0)" class="preset-btn off-preset">1m</button>
                      <button @click="setOffTime(0, 5, 0)" class="preset-btn off-preset">5m</button>
                      <button @click="setOffTime(0, 10, 0)" class="preset-btn off-preset">10m</button>
                      <button @click="setOffTime(0, 30, 0)" class="preset-btn off-preset">30m</button>
                      <button @click="setOffTime(1, 0, 0)" class="preset-btn off-preset">1h</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Cycle Summary -->
          <div class="cycle-summary mt-3">
            <div class="cycle-info">
              <i class="bi bi-arrow-repeat"></i>
              <span class="cycle-text">
                Cycle: <strong class="on-highlight">ON {{ formatTotalTime(onHours, onMinutes, onSeconds) }}</strong>
                <i class="bi bi-arrow-right mx-2"></i>
                <strong class="off-highlight">OFF {{ formatTotalTime(offHours, offMinutes, offSeconds) }}</strong>
              </span>
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
          <!-- Timer Configuration Section -->
          <div class="timer-config-section mb-4">
            <div class="row g-4">
              <!-- ON Timer Card -->
              <div class="col-md-6">
                <div class="timer-card on-timer">
                  <div class="timer-card-header">
                    <i class="bi bi-play-circle-fill"></i>
                    <span>ON Timer</span>
                  </div>
                  <div class="timer-card-body">
                    <!-- Hours, Minutes, Seconds Inputs -->
                    <div class="time-input-group">
                      <div class="time-input-box">
                        <input type="number" class="time-digit" v-model.number="onHours" min="0" max="23" placeholder="00">
                        <label>Hours</label>
                      </div>
                      <span class="time-separator">:</span>
                      <div class="time-input-box">
                        <input type="number" class="time-digit" v-model.number="onMinutes" min="0" max="59" placeholder="00">
                        <label>Minutes</label>
                      </div>
                      <span class="time-separator">:</span>
                      <div class="time-input-box">
                        <input type="number" class="time-digit" v-model.number="onSeconds" min="0" max="59" placeholder="00">
                        <label>Seconds</label>
                      </div>
                    </div>
                    
                    <!-- Total Seconds Display -->
                    <div class="total-display on-total">
                      <i class="bi bi-clock"></i>
                      <span>{{ formatTotalTime(onHours, onMinutes, onSeconds) }}</span>
                    </div>

                    <!-- Quick Presets -->
                    <div class="preset-buttons">
                      <button @click="setOnTime(24, 0, 0)" class="preset-btn on-preset">1m</button>
                      <button @click="setOnTime(24, 0, 0)" class="preset-btn on-preset">5m</button>
                      <button @click="setOnTime(24, 0, 0)" class="preset-btn on-preset">10m</button>
                      <button @click="setOnTime(24, 0, 0)" class="preset-btn on-preset">30m</button>
                      <button @click="setOnTime(24, 0, 0)" class="preset-btn on-preset">1h</button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- OFF Timer Card -->
              <div class="col-md-6">
                <div class="timer-card off-timer">
                  <div class="timer-card-header">
                    <i class="bi bi-stop-circle-fill"></i>
                    <span>OFF Timer</span>
                  </div>
                  <div class="timer-card-body">
                    <!-- Hours, Minutes, Seconds Inputs -->
                    <div class="time-input-group">
                      <div class="time-input-box">
                        <input type="number" class="time-digit" v-model.number="offHours" min="0" max="23" placeholder="00">
                        <label>Hours</label>
                      </div>
                      <span class="time-separator">:</span>
                      <div class="time-input-box">
                        <input type="number" class="time-digit" v-model.number="offMinutes" min="0" max="59" placeholder="00">
                        <label>Minutes</label>
                      </div>
                      <span class="time-separator">:</span>
                      <div class="time-input-box">
                        <input type="number" class="time-digit" v-model.number="offSeconds" min="0" max="59" placeholder="00">
                        <label>Seconds</label>
                      </div>
                    </div>
                    
                    <!-- Total Seconds Display -->
                    <div class="total-display off-total">
                      <i class="bi bi-clock"></i>
                      <span>{{ formatTotalTime(offHours, offMinutes, offSeconds) }}</span>
                    </div>

                    <!-- Quick Presets -->
                    <div class="preset-buttons">
                      <button @click="setOffTime(0, 1, 0)" class="preset-btn off-preset">1m</button>
                      <button @click="setOffTime(0, 5, 0)" class="preset-btn off-preset">5m</button>
                      <button @click="setOffTime(0, 10, 0)" class="preset-btn off-preset">10m</button>
                      <button @click="setOffTime(0, 30, 0)" class="preset-btn off-preset">30m</button>
                      <button @click="setOffTime(1, 0, 0)" class="preset-btn off-preset">1h</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Cycle Summary -->
          <div class="cycle-summary">
            <div class="cycle-info">
              <i class="bi bi-arrow-repeat"></i>
              <span class="cycle-text">
                Cycle: <strong class="on-highlight">ON {{ formatTotalTime(onHours, onMinutes, onSeconds) }}</strong>
                <i class="bi bi-arrow-right mx-2"></i>
                <strong class="off-highlight">OFF {{ formatTotalTime(offHours, offMinutes, offSeconds) }}</strong>
              </span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="action-section mt-4">
            <div class="row g-3">
              <div class="col-md-6">
                <button class="action-btn start-btn" @click="executeManualAction('start')">
                  <i class="bi bi-play-fill"></i>
                  <div class="btn-content">
                    <span class="btn-title">START</span>
                    <span class="btn-subtitle">Begin operation cycle</span>
                  </div>
                </button>
              </div>
              <div class="col-md-6">
                <button class="action-btn stop-btn" @click="executeManualAction('stop')">
                  <i class="bi bi-stop-fill"></i>
                  <div class="btn-content">
                    <span class="btn-title">STOP</span>
                    <span class="btn-subtitle">Halt device immediately</span>
                  </div>
                </button>
              </div>
            </div>
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
                <label class="form-label">Start Time (HH:MM:SS)</label>
                <input type="time" step="1" class="form-control" v-model="instForm.startTime" placeholder="00:00:00">
                <small class="form-text text-muted">Format: Hours:Minutes:Seconds</small>
              </div>
              
              <div class="mb-3">
                <label class="form-label">Frequency</label>
                <div class="d-flex gap-3">
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="instFrequency" id="instDaily" value="daily" v-model="instForm.frequency">
                    <label class="form-check-label" for="instDaily">Daily</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="instFrequency" id="instWeekly" value="weekly" v-model="instForm.frequency">
                    <label class="form-check-label" for="instWeekly">Weekly</label>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Right Column - Empty for now -->
            <div class="col-md-6">
              <!-- Reserved for future use -->
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

  <!-- Shunt Voltage Modal -->
  <div class="modal fade" tabindex="-1" :class="{ show: showShuntVoltageModal, 'd-block': showShuntVoltageModal }" v-if="showShuntVoltageModal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-success">
          <h5 class="modal-title text-white">
            <i class="bi bi-lightning me-2"></i>
            Set Voltage Configuration
          </h5>
          <button type="button" class="btn-close btn-close-white" @click="closeShuntVoltageModal"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label">Shunt Voltage Value (00.00 - 99.99)</label>
            <input 
              type="number" 
              class="form-control" 
              v-model="shuntVoltageForm.value"
              step="0.01"
              min="0.00"
              max="99.99"
              placeholder="Enter voltage value (e.g., 25.00)"
              @input="validateVoltageInput"
              @blur="formatVoltageInput"
            >
            <small class="text-muted">Enter values with exactly 2 decimal places (e.g., 25.00, 50.25)</small>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeShuntVoltageModal">Cancel</button>
          <button type="button" class="btn btn-success" @click="saveShuntVoltageConfiguration">Save</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Shunt Current Modal -->
  <div class="modal fade" tabindex="-1" :class="{ show: showShuntCurrentModal, 'd-block': showShuntCurrentModal }" v-if="showShuntCurrentModal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-primary">
          <h5 class="modal-title text-white">
            <i class="bi bi-flash me-2"></i>
            Set Shunt Configuration
          </h5>
          <button type="button" class="btn-close btn-close-white" @click="closeShuntCurrentModal"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label">Shunt Current Value (00.00 - 99.99)</label>
            <input 
              type="number" 
              class="form-control" 
              v-model="shuntCurrentForm.value"
              step="0.01"
              min="0.00"
              max="99.99"
              placeholder="Enter current value (e.g., 999.00)"
              @input="validateCurrentInput"
              @blur="formatCurrentInput"
            >
            <small class="text-muted">Enter values with exactly 2 decimal places (e.g., 999.00, 12.50)</small>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeShuntCurrentModal">Cancel</button>
          <button type="button" class="btn btn-primary" @click="saveShuntCurrentConfiguration">Save</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Backdrop -->
  <div class="modal-backdrop fade show" v-if="showLogModal || showModeModal || showElectrodeModal || showNormalModal || showAutoModal || showManualModal || showDpolModal || showInstModal || showAlarmModal || showAlarmSetupModal || showAlarmSetopModal || showAlarmReffcalModal || showShuntVoltageModal || showShuntCurrentModal" @click="closeAllModals"></div>
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

.timer-input-large {
  font-family: 'Courier New', monospace;
  font-weight: bold;
  border: 2px solid #dee2e6;
  transition: all 0.3s ease;
}

.timer-input-large:focus {
  border-color: #80bdff;
  box-shadow: 0 0 0 0.3rem rgba(0, 123, 255, 0.15);
  background-color: #fff;
}

.timer-display {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border: 2px solid #dee2e6;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
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

/* Manual Mode Timer Styling */
.timer-config-section {
  padding: 1rem 0;
}

.timer-card {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.timer-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.15);
}

.timer-card-header {
  padding: 1rem 1.5rem;
  font-weight: 600;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.on-timer .timer-card-header {
  background: #28a745;
  color: white;
}

.off-timer .timer-card-header {
  background: #dc3545;
  color: white;
}

.timer-card-body {
  padding: 2rem 1.5rem;
  background: #f8f9fa;
}

.time-input-group {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.time-input-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.time-digit {
  width: 70px;
  height: 70px;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  border: 3px solid #dee2e6;
  border-radius: 10px;
  background: white;
  font-family: 'Courier New', monospace;
  transition: all 0.3s ease;
}

.time-digit:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 0.25rem rgba(0, 123, 255, 0.25);
  transform: scale(1.05);
}

.time-input-box label {
  margin-top: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #6c757d;
  text-transform: uppercase;
}

.time-separator {
  font-size: 2.5rem;
  font-weight: bold;
  color: #6c757d;
  margin: 10px 0;
}

.total-display {
  padding: 0.75rem 1rem;
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.on-total {
  background: #d4edda;
  border: 2px solid #28a745;
  color: #155724;
}

.off-total {
  background: #f8d7da;
  border: 2px solid #dc3545;
  color: #721c24;
}

.preset-buttons {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.preset-btn {
  padding: 0.5rem 1rem;
  border: 2px solid;
  border-radius: 20px;
  font-weight: 600;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
}

.on-preset {
  border-color: #28a745;
  color: #28a745;
}

.on-preset:hover {
  background: #28a745;
  color: white;
  transform: scale(1.05);
}

.off-preset {
  border-color: #dc3545;
  color: #dc3545;
}

.off-preset:hover {
  background: #dc3545;
  color: white;
  transform: scale(1.05);
}

.cycle-summary {
  background: #e3f2fd;
  border: 2px solid #2196f3;
  border-radius: 10px;
  padding: 1rem 1.5rem;
  margin-bottom: 1rem;
}

.cycle-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-size: 1rem;
}

.cycle-info i {
  font-size: 1.5rem;
  color: #2196f3;
}

.on-highlight {
  color: #28a745;
  padding: 0.25rem 0.5rem;
  background: rgba(40, 167, 69, 0.1);
  border-radius: 4px;
}

.off-highlight {
  color: #dc3545;
  padding: 0.25rem 0.5rem;
  background: rgba(220, 53, 69, 0.1);
  border-radius: 4px;
}

.action-section {
  padding-top: 1rem;
}

.action-btn {
  width: 100%;
  padding: 1.5rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-weight: 700;
  font-size: 1rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.action-btn i {
  font-size: 2.5rem;
}

.btn-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.btn-title {
  font-size: 1.5rem;
  letter-spacing: 1px;
}

.btn-subtitle {
  font-size: 0.75rem;
  font-weight: 400;
  opacity: 0.9;
}

.start-btn {
  background: #28a745;
  color: white;
}

.start-btn:hover {
  background: #218838;
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(40, 167, 69, 0.4);
}

.stop-btn {
  background: #dc3545;
  color: white;
}

.stop-btn:hover {
  background: #c82333;
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(220, 53, 69, 0.4);
}
</style>

