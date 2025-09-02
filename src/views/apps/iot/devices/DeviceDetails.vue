<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import mqtt from 'mqtt';

const MAIN_TOPIC = 'devices/234/data';        // Replace this with your actual device topic
const SIM_TOPIC  = 'devices/123/data';        // Simulated device topic
const FAILOVER_TIMEOUT_MS = 10_000;           // 10 seconds timeout for main device

export default defineComponent({
  setup() {
    const mainDevice = ref<any>(null);
    const simDevice = ref<any>(null);
    const lastMainUpdate = ref<number>(0);
    const now = ref(Date.now());

    // Fallback: Use simulated data if main device is "offline"
    const displayedDevice = computed(() => {
      const timedOut = now.value - lastMainUpdate.value > FAILOVER_TIMEOUT_MS;
      return (!timedOut && mainDevice.value) ? mainDevice.value : simDevice.value;
    });

    // Periodically update 'now' so computed property reacts to time
    setInterval(() => { now.value = Date.now(); }, 1000);

    onMounted(() => {
      const client = mqtt.connect('wss://test.mosquitto.org:8081');
      client.on('connect', () => {
        client.subscribe(MAIN_TOPIC);
        client.subscribe(SIM_TOPIC);
      });

      client.on('message', (topic, message) => {
        try {
          const payload = JSON.parse(message.toString());
          const deviceData = {
            id: payload.SN?.toString() ?? "N/A",
            name: payload.API ?? "",
            icon: 'bi-device',
            type: 'sensor',
            location:
              payload.LATITUDE && payload.LONGITUDE
                ? `${payload.LATITUDE}, ${payload.LONGITUDE}` : "",
            status: payload.EVENT ?? "",
            lastSeen: payload.TimeStamp ?? "",
            metrics: Object.keys(payload)
              .filter(k => !['API', 'EVENT', 'TimeStamp', 'LATITUDE', 'LONGITUDE', 'SN'].includes(k))
              .map(k => ({
                type: k,
                value: parseFloat(payload[k]),
                icon:
                  k === 'DCV' || k === 'ACV'
                    ? 'bi-battery'
                    : k === 'DCI' || k === 'ACI'
                    ? 'bi-lightning-charge'
                    : 'bi-graph-up'
              })),
          };
          if (topic === MAIN_TOPIC) {
            mainDevice.value = deviceData;
            lastMainUpdate.value = Date.now();
          } else if (topic === SIM_TOPIC) {
            simDevice.value = deviceData;
          }
        } catch (e) {
          console.error('Error parsing MQTT message:', e);
        }
      });
    });

    // status and metricClass for badge styling (reuse from previous code if needed)
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

    return {
      displayedDevice,
      statusClass,
      metricClass,
    };
  }
});
</script>

<template>
  <div class="card" v-if="displayedDevice">
    <div class="card-header border-0 pt-6">
      <div class="card-title">
        <div class="d-flex align-items-center position-relative">
          <h3 class="mb-0">Device Details</h3>
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
                  <span class="fw-bold fs-6 text-gray-800">{{ displayedDevice.name }}</span>
                </div>
              </div>
              <div class="row mb-7">
                <label class="col-lg-4 fw-bold text-muted">Location</label>
                <div class="col-lg-8">
                  <span class="fw-bold fs-6 text-gray-800">{{ displayedDevice.location }}</span>
                </div>
              </div>
              <div class="row mb-7">
                <label class="col-lg-4 fw-bold text-muted">Type</label>
                <div class="col-lg-8">
                  <span class="fw-bold fs-6 text-gray-800">{{ displayedDevice.type }}</span>
                </div>
              </div>
              <div class="row mb-7">
                <label class="col-lg-4 fw-bold text-muted">Status</label>
                <div class="col-lg-8">
                  <span class="badge" :class="statusClass">{{ displayedDevice.status }}</span>
                </div>
              </div>
              <div class="row mb-7">
                <label class="col-lg-4 fw-bold text-muted">Last Seen</label>
                <div class="col-lg-8">
                  <span class="fw-bold fs-6 text-gray-800">{{ displayedDevice.lastSeen }}</span>
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
