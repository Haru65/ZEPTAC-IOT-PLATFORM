<script lang="ts">
import { defineComponent, ref, onMounted, computed, onUnmounted } from 'vue';
import { io, Socket } from 'socket.io-client';

const FAILOVER_TIMEOUT_MS = 10_000; // 10 seconds timeout for main device

export default defineComponent({
  setup() {
    const mainDevice = ref<any>(null);
    const simDevice = ref<any>(null);
    const lastMainUpdate = ref<number>(0);
    const now = ref(Date.now());
    const socket = ref<Socket | null>(null);
    const connectionStatus = ref<string>('disconnected');
    const updateInterval = ref<number | null>(null);

    // Fallback: Use simulated data if main device is "offline"
    const displayedDevice = computed(() => {
      const timedOut = now.value - lastMainUpdate.value > FAILOVER_TIMEOUT_MS;
      return (!timedOut && mainDevice.value) ? mainDevice.value : simDevice.value;
    });

    onMounted(() => {
      // Connect to backend Socket.io server
      socket.value = io('https://zeptac-demo-backend.onrender.com', {
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
        
        if (update.type === 'main') {
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
    });

    // Status and metric class computations
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

    return {
      displayedDevice,
      statusClass,
      metricClass,
      connectionStatus,
      connectionStatusClass,
    };
  }
});
</script>

<template>
  <div class="card" v-if="displayedDevice">
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
                  <span class="fw-bold fs-6 text-gray-800">
                    {{ displayedDevice.name === 'Kitchen Smart Light' ? 'Kitchen Smart Light' : (displayedDevice.name === 'Living Room Thermostat' ? 'Living Room Thermostat' : displayedDevice.name) }}
                  </span>
                </div>
              </div>
              <div class="row mb-7">
                <label class="col-lg-4 fw-bold text-muted">Location</label>
                <div class="col-lg-8">
                  <span class="fw-bold fs-6 text-gray-800">
                    {{ displayedDevice.name === 'Kitchen Smart Light' ? 'Kitchen' : (displayedDevice.name === 'Living Room Thermostat' ? 'Living Room' : displayedDevice.location) }}
                  </span>
                </div>
              </div>
              <div class="row mb-7">
                <label class="col-lg-4 fw-bold text-muted">Type</label>
                <div class="col-lg-8">
                  <span class="fw-bold fs-6 text-gray-800">
                    {{ displayedDevice.name === 'Kitchen Smart Light' ? 'light' : (displayedDevice.name === 'Living Room Thermostat' ? 'thermostat' : displayedDevice.type) }}
                  </span>
                </div>
              </div>
              <div class="row mb-7">
                <label class="col-lg-4 fw-bold text-muted">Status</label>
                <div class="col-lg-8">
                  <span class="badge" :class="statusClass">
                    {{ displayedDevice.name === 'Kitchen Smart Light' ? 'online' : (displayedDevice.name === 'Living Room Thermostat' ? 'online' : displayedDevice.status) }}
                  </span>
                </div>
              </div>
              <div class="row mb-7">
                <label class="col-lg-4 fw-bold text-muted">Last Seen</label>
                <div class="col-lg-8">
                  <span class="fw-bold fs-6 text-gray-800">
                    {{ displayedDevice.name === 'Kitchen Smart Light' ? '2 min ago' : (displayedDevice.name === 'Living Room Thermostat' ? '5 min ago' : displayedDevice.lastSeen) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="mb-5">
            <h4 class="fs-1 text-gray-800 w-bolder mb-6">Device Metrics</h4>
            <div class="row g-4">
              <div class="col-md-4" v-for="metric in displayedDevice.metrics" :key="metric.type">
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
        </div>
        <div class="col-lg-6">
          <div class="mb-5">
            <h4 class="fs-1 text-gray-800 w-bolder mb-6">Historical Data</h4>
            <div class="alert alert-info">
              <i class="bi bi-info-circle me-2"></i>
              Real-time data from MQTT broker via backend server
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div v-else class="card">
    <div class="card-body text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-3">Waiting for device data...</p>
    </div>
  </div>
</template>
