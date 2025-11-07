<template>
  <div>
    <!-- Back Button -->
    <div class="mb-5">
      <router-link to="/devices" class="btn btn-sm btn-light">
        <i class="bi bi-arrow-left me-1"></i>
        Back to Devices
      </router-link>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="card">
      <div class="card-body text-center py-10">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3 text-muted">Loading device details...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="alert alert-danger">
      <i class="bi bi-exclamation-triangle me-2"></i>
      {{ error }}
    </div>

    <!-- Device Details -->
    <div v-else-if="device">
      <!-- Header Card -->
      <div class="card mb-5">
        <div class="card-body">
          <div class="d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center">
              <div class="symbol symbol-65px me-5">
                <span class="symbol-label bg-light-primary">
                  <i :class="device.metadata?.icon || 'bi bi-cpu'" class="fs-2x text-primary"></i>
                </span>
              </div>
              <div>
                <h1 class="fw-bold text-dark mb-2">{{ device.name }}</h1>
                <div class="text-muted fs-6">
                  <i class="bi bi-geo-alt me-1"></i>
                  {{ device.location }}
                </div>
                <div class="text-muted fs-7 mt-1">
                  Device ID: <span class="badge badge-light-info">{{ device.deviceId }}</span>
                </div>
              </div>
            </div>
            <div class="text-end">
              <span class="badge badge-lg" :class="getStatusClass(device.status)">
                {{ device.status }}
              </span>
              <div class="mt-2">
                <span
                  class="badge"
                  :class="mqttConnected ? 'badge-light-success' : 'badge-light-danger'"
                >
                  <i class="bi bi-circle-fill me-1" style="font-size: 8px"></i>
                  {{ mqttConnected ? 'MQTT Connected' : 'MQTT Disconnected' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row g-5">
        <!-- Left Column: Real-time Metrics -->
        <div class="col-lg-6">
          <!-- Real-time Metrics Card -->
          <div class="card mb-5">
            <div class="card-header">
              <h3 class="card-title">Real-time Metrics</h3>
              <div class="card-toolbar">
                <span class="badge badge-light-primary">Live</span>
              </div>
            </div>
            <div class="card-body">
              <div class="row g-4">
                <div class="col-6">
                  <div class="card bg-light-success border-0">
                    <div class="card-body text-center">
                      <i class="bi bi-battery-charging fs-2x text-success mb-2"></i>
                      <h2 class="fw-bold mb-1">{{ currentMetrics.battery || 'N/A' }}{{ currentMetrics.battery ? '%' : '' }}</h2>
                      <p class="text-muted mb-0">Battery</p>
                      <small v-if="trends.battery" :class="trends.battery > 0 ? 'text-success' : 'text-danger'">
                        <i :class="trends.battery > 0 ? 'bi bi-arrow-up' : 'bi bi-arrow-down'"></i>
                        {{ Math.abs(trends.battery).toFixed(1) }}%
                      </small>
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="card bg-light-primary border-0">
                    <div class="card-body text-center">
                      <i class="bi bi-wifi fs-2x text-primary mb-2"></i>
                      <h2 class="fw-bold mb-1">{{ currentMetrics.signal || 'N/A' }}{{ currentMetrics.signal ? '%' : '' }}</h2>
                      <p class="text-muted mb-0">Signal</p>
                      <small v-if="trends.signal" :class="trends.signal > 0 ? 'text-success' : 'text-danger'">
                        <i :class="trends.signal > 0 ? 'bi bi-arrow-up' : 'bi bi-arrow-down'"></i>
                        {{ Math.abs(trends.signal).toFixed(1) }}%
                      </small>
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="card bg-light-danger border-0">
                    <div class="card-body text-center">
                      <i class="bi bi-thermometer-half fs-2x text-danger mb-2"></i>
                      <h2 class="fw-bold mb-1">{{ currentMetrics.temperature || 'N/A' }}{{ currentMetrics.temperature ? '°C' : '' }}</h2>
                      <p class="text-muted mb-0">Temperature</p>
                      <small v-if="trends.temperature" :class="trends.temperature > 0 ? 'text-danger' : 'text-success'">
                        <i :class="trends.temperature > 0 ? 'bi bi-arrow-up' : 'bi bi-arrow-down'"></i>
                        {{ Math.abs(trends.temperature).toFixed(1) }}°C
                      </small>
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="card bg-light-info border-0">
                    <div class="card-body text-center">
                      <i class="bi bi-droplet fs-2x text-info mb-2"></i>
                      <h2 class="fw-bold mb-1">{{ currentMetrics.humidity || 'N/A' }}{{ currentMetrics.humidity ? '%' : '' }}</h2>
                      <p class="text-muted mb-0">Humidity</p>
                      <small v-if="trends.humidity" :class="trends.humidity > 0 ? 'text-primary' : 'text-muted'">
                        <i :class="trends.humidity > 0 ? 'bi bi-arrow-up' : 'bi bi-arrow-down'"></i>
                        {{ Math.abs(trends.humidity).toFixed(1) }}%
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- MQTT Configuration Card -->
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">MQTT Configuration</h3>
            </div>
            <div class="card-body">
              <div class="mb-3">
                <label class="form-label text-muted">Broker URL</label>
                <div class="fw-bold">{{ device.mqttConfig?.brokerUrl || 'Not configured' }}</div>
              </div>
              <div class="mb-3">
                <label class="form-label text-muted">Topic Prefix</label>
                <div class="fw-bold">{{ device.mqttConfig?.topicPrefix || 'N/A' }}</div>
              </div>
              <div class="mb-3">
                <label class="form-label text-muted">Data Topic</label>
                <div class="fw-bold">{{ device.mqttConfig?.topics?.data || 'N/A' }}</div>
              </div>
              <div class="mb-3">
                <label class="form-label text-muted">Status Topic</label>
                <div class="fw-bold">{{ device.mqttConfig?.topics?.status || 'N/A' }}</div>
              </div>
              <div>
                <label class="form-label text-muted">Control Topic</label>
                <div class="fw-bold">{{ device.mqttConfig?.topics?.control || 'N/A' }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Historical Data & Messages -->
        <div class="col-lg-6">
          <!-- Live Messages Card -->
          <div class="card mb-5">
            <div class="card-header">
              <h3 class="card-title">Live Message Stream</h3>
              <div class="card-toolbar">
                <span class="badge badge-light">{{ mqttMessages.length }} messages</span>
              </div>
            </div>
            <div class="card-body" style="max-height: 400px; overflow-y: auto">
              <div v-if="mqttMessages.length === 0" class="text-center text-muted py-5">
                <i class="bi bi-inbox fs-2x"></i>
                <p class="mt-2">No messages yet</p>
              </div>
              <div v-else>
                <div
                  v-for="(msg, index) in mqttMessages"
                  :key="index"
                  class="p-3 mb-2 bg-light rounded"
                >
                  <div class="d-flex justify-content-between align-items-start mb-1">
                    <small class="text-muted">{{ msg.topic }}</small>
                    <small class="text-muted">{{ formatTime(msg.timestamp) }}</small>
                  </div>
                  <pre class="mb-0 text-dark" style="font-size: 12px; white-space: pre-wrap">{{ formatMessage(msg.payload) }}</pre>
                </div>
              </div>
            </div>
          </div>

          <!-- Historical Data Table -->
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Historical Data (24h)</h3>
              <div class="card-toolbar">
                <span class="badge badge-light-info">{{ historicalData.length }} records</span>
              </div>
            </div>
            <div class="card-body" style="max-height: 400px; overflow-y: auto">
              <div v-if="historicalData.length === 0" class="text-center text-muted py-5">
                <i class="bi bi-bar-chart fs-2x"></i>
                <p class="mt-2">No historical data available</p>
              </div>
              <table v-else class="table table-sm table-row-bordered">
                <thead>
                  <tr class="fw-bold text-muted bg-light">
                    <th>Time</th>
                    <th>Battery</th>
                    <th>Signal</th>
                    <th>Temp</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(record, index) in historicalData.slice(0, 50)" :key="index">
                    <td class="text-muted">{{ formatHistoricalTime(record.timestamp) }}</td>
                    <td>{{ record.data?.battery || '-' }}</td>
                    <td>{{ record.data?.signal || '-' }}</td>
                    <td>{{ record.data?.temperature || '-' }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import ApiService from '@/core/services/ApiService';
import { useMqttClient } from '@/composables/useMqttClient';

interface MqttMessage {
  topic: string;
  payload: any;
  timestamp: Date;
}

export default defineComponent({
  name: 'DeviceDetailsPage',
  setup() {
    const route = useRoute();
    const deviceId = ref<string>(route.params.id as string);
    const device = ref<any>(null);
    const historicalData = ref<any[]>([]);
    const loading = ref<boolean>(true);
    const error = ref<string | null>(null);
    
    // MQTT composable (will be initialized after fetching device details)
    let mqttComposable: ReturnType<typeof useMqttClient> | null = null;
    const mqttConnected = ref<boolean>(false);
    const mqttMessages = ref<MqttMessage[]>([]);
    const currentMetrics = ref<any>({});
    const previousMetrics = ref<any>({});

    // Computed trends
    const trends = computed(() => {
      const t: any = {};
      if (previousMetrics.value.battery && currentMetrics.value.battery) {
        t.battery = currentMetrics.value.battery - previousMetrics.value.battery;
      }
      if (previousMetrics.value.signal && currentMetrics.value.signal) {
        t.signal = currentMetrics.value.signal - previousMetrics.value.signal;
      }
      if (previousMetrics.value.temperature && currentMetrics.value.temperature) {
        t.temperature = currentMetrics.value.temperature - previousMetrics.value.temperature;
      }
      if (previousMetrics.value.humidity && currentMetrics.value.humidity) {
        t.humidity = currentMetrics.value.humidity - previousMetrics.value.humidity;
      }
      return t;
    });

    // Fetch device details
    const fetchDeviceDetails = async () => {
      try {
        loading.value = true;
        error.value = null;
        ApiService.setHeader();
        
        const response = await ApiService.get('/api/devices', deviceId.value);
        
        if (response.data && response.data.success) {
          device.value = response.data.device;
          historicalData.value = response.data.historicalData?.data || [];
          currentMetrics.value = device.value.currentData || {};
          
          // Initialize MQTT connection
          if (device.value.mqttConfig?.brokerUrl && device.value.mqttConfig?.topics?.data) {
            connectToMqtt();
          }
        } else {
          throw new Error('Failed to fetch device details');
        }
      } catch (err: any) {
        console.error('Error fetching device details:', err);
        error.value = err.response?.data?.message || err.message || 'Failed to load device details';
      } finally {
        loading.value = false;
      }
    };

    // Connect to MQTT broker
    const connectToMqtt = () => {
      if (!device.value?.mqttConfig?.brokerUrl || !device.value?.mqttConfig?.topics?.data) {
        console.warn('MQTT configuration not available');
        return;
      }

      const brokerUrl = device.value.mqttConfig.brokerUrl;
      const topic = device.value.mqttConfig.topics.data;

      // Initialize MQTT composable with events
      mqttComposable = useMqttClient(brokerUrl, topic, deviceId.value);

      mqttComposable.connect({
        onConnect: () => {
          mqttConnected.value = true;
          console.log('MQTT Connected via composable');
        },
        onMessage: async (message) => {
          try {
            const payload = message.payload;
            
            // Add to message stream (keep last 20)
            mqttMessages.value.unshift({
              topic: message.topic,
              payload,
              timestamp: new Date()
            });
            if (mqttMessages.value.length > 20) {
              mqttMessages.value.pop();
            }

            // Update current metrics and calculate trends
            if (payload && typeof payload === 'object') {
              previousMetrics.value = { ...currentMetrics.value };
              currentMetrics.value = {
                battery: payload.battery !== undefined ? payload.battery : currentMetrics.value.battery,
                signal: payload.signal !== undefined ? payload.signal : currentMetrics.value.signal,
                temperature: payload.temperature !== undefined ? payload.temperature : currentMetrics.value.temperature,
                humidity: payload.humidity !== undefined ? payload.humidity : currentMetrics.value.humidity,
                pressure: payload.pressure !== undefined ? payload.pressure : currentMetrics.value.pressure
              };

              // Send data to backend API for storage
              try {
                ApiService.setHeader();
                await ApiService.post(`/api/devices/${deviceId.value}/data`, payload);
              } catch (apiErr) {
                console.error('Error sending data to backend:', apiErr);
              }
            }
          } catch (err) {
            console.error('Error processing MQTT message:', err);
          }
        },
        onError: (err) => {
          console.error('MQTT Error:', err);
          mqttConnected.value = false;
        },
        onDisconnect: () => {
          mqttConnected.value = false;
          console.log('MQTT Disconnected');
        },
        onReconnect: () => {
          console.log('MQTT Reconnecting...');
        }
      });
    };

    onMounted(() => {
      fetchDeviceDetails();
    });

    // Cleanup is automatic via useMqttClient composable's onUnmounted hook

    // Format time
    const formatTime = (timestamp: Date) => {
    const formatTime = (timestamp: Date) => {
      return new Date(timestamp).toLocaleTimeString();
    };

    // Format historical time
    const formatHistoricalTime = (timestamp: string) => {
      const date = new Date(timestamp);
      return date.toLocaleString();
    };

    // Format message payload
    const formatMessage = (payload: any) => {
      return typeof payload === 'string' ? payload : JSON.stringify(payload, null, 2);
    };

    // Get status badge class
    const getStatusClass = (status: string) => {
      switch (status?.toLowerCase()) {
        case 'online':
          return 'badge-light-success';
        case 'offline':
          return 'badge-light-danger';
        case 'warning':
          return 'badge-light-warning';
        default:
          return 'badge-light-secondary';
      }
    };

    onMounted(() => {
      fetchDeviceDetails();
    });

    return {
      device,
      historicalData,
      loading,
      error,
      mqttConnected,
      mqttMessages,
      currentMetrics,
      trends,
      formatTime,
      formatHistoricalTime,
      formatMessage,
      getStatusClass
    };
  }
});
</script>

<style scoped>
.card {
  box-shadow: 0 0.5rem 1.5rem 0.5rem rgba(0, 0, 0, 0.075);
}

pre {
  margin: 0;
  font-family: 'Courier New', monospace;
}
</style>
