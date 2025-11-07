<template>
  <div class="modal fade" id="addDeviceModal" tabindex="-1" aria-labelledby="addDeviceModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addDeviceModalLabel">
            <i class="bi bi-plus-circle me-2"></i>Add New Device
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        
        <div class="modal-body">
          <form @submit.prevent="handleSubmit">
            <!-- Device ID -->
            <div class="mb-4">
              <label for="deviceId" class="form-label required">Device ID</label>
              <input
                type="text"
                class="form-control"
                id="deviceId"
                v-model="formData.deviceId"
                placeholder="e.g., 456, 567, etc."
                required
                :disabled="loading"
              />
              <div class="form-text">Unique identifier for the device</div>
            </div>

            <!-- Device Name -->
            <div class="mb-4">
              <label for="deviceName" class="form-label required">Device Name</label>
              <input
                type="text"
                class="form-control"
                id="deviceName"
                v-model="formData.deviceName"
                placeholder="e.g., Sensor 4, Temperature Monitor"
                required
                :disabled="loading"
              />
            </div>

            <!-- MQTT Broker URL -->
            <div class="mb-4">
              <label for="mqttBroker" class="form-label required">MQTT Broker URL</label>
              <input
                type="text"
                class="form-control"
                id="mqttBroker"
                v-model="formData.mqttBroker"
                placeholder="e.g., mqtt://broker.zeptac.com:1883"
                required
                :disabled="loading"
              />
              <div class="form-text">MQTT broker address with port</div>
            </div>

            <!-- MQTT Username -->
            <div class="mb-4">
              <label for="mqttUsername" class="form-label required">MQTT Username</label>
              <input
                type="text"
                class="form-control"
                id="mqttUsername"
                v-model="formData.mqttUsername"
                placeholder="e.g., zeptac_iot"
                required
                :disabled="loading"
              />
            </div>

            <!-- MQTT Password -->
            <div class="mb-4">
              <label for="mqttPassword" class="form-label required">MQTT Password</label>
              <input
                type="password"
                class="form-control"
                id="mqttPassword"
                v-model="formData.mqttPassword"
                placeholder="Enter MQTT password"
                required
                :disabled="loading"
              />
            </div>

            <!-- MQTT Topic Prefix (Auto-generated) -->
            <div class="mb-4">
              <label for="topicPrefix" class="form-label">MQTT Topic Prefix</label>
              <input
                type="text"
                class="form-control"
                id="topicPrefix"
                :value="`devices/${formData.deviceId}`"
                disabled
              />
              <div class="form-text">Auto-generated from Device ID</div>
            </div>

            <!-- Data Topic (Auto-generated) -->
            <div class="mb-4">
              <label for="dataTopic" class="form-label">Data Topic</label>
              <input
                type="text"
                class="form-control"
                id="dataTopic"
                :value="`devices/${formData.deviceId}/data`"
                disabled
              />
              <div class="form-text">Device will publish data to this topic</div>
            </div>

            <!-- Command Topic (Auto-generated) -->
            <div class="mb-4">
              <label for="commandTopic" class="form-label">Command Topic</label>
              <input
                type="text"
                class="form-control"
                id="commandTopic"
                :value="`devices/${formData.deviceId}/commands`"
                disabled
              />
              <div class="form-text">Server will send commands to this topic</div>
            </div>

            <!-- Location -->
            <div class="mb-4">
              <label for="location" class="form-label">Location</label>
              <input
                type="text"
                class="form-control"
                id="location"
                v-model="formData.location"
                placeholder="e.g., 28.7041, 77.1025 or Building A - Floor 2"
                :disabled="loading"
              />
            </div>

            <!-- Device Type -->
            <div class="mb-4">
              <label for="deviceType" class="form-label">Device Type</label>
              <select
                class="form-select"
                id="deviceType"
                v-model="formData.deviceType"
                :disabled="loading"
              >
                <option value="IoT Sensor">IoT Sensor</option>
                <option value="Temperature Sensor">Temperature Sensor</option>
                <option value="Humidity Sensor">Humidity Sensor</option>
                <option value="Pressure Sensor">Pressure Sensor</option>
                <option value="Motion Sensor">Motion Sensor</option>
                <option value="Light Sensor">Light Sensor</option>
                <option value="Custom Device">Custom Device</option>
              </select>
            </div>

            <!-- Icon Selection -->
            <div class="mb-4">
              <label class="form-label">Icon</label>
              <div class="d-flex flex-wrap gap-2">
                <button
                  v-for="icon in availableIcons"
                  :key="icon.value"
                  type="button"
                  class="btn btn-sm btn-outline-primary"
                  :class="{ active: formData.icon === icon.value }"
                  @click="formData.icon = icon.value"
                  :disabled="loading"
                >
                  <i :class="icon.value"></i> {{ icon.label }}
                </button>
              </div>
            </div>

            <!-- Color Selection -->
            <div class="mb-4">
              <label class="form-label">Color</label>
              <div class="d-flex flex-wrap gap-2">
                <button
                  v-for="color in availableColors"
                  :key="color.value"
                  type="button"
                  class="btn btn-sm"
                  :style="{ backgroundColor: color.value, color: '#fff' }"
                  :class="{ 'border border-3 border-dark': formData.color === color.value }"
                  @click="formData.color = color.value"
                  :disabled="loading"
                >
                  {{ color.label }}
                </button>
              </div>
            </div>

            <!-- Description -->
            <div class="mb-4">
              <label for="description" class="form-label">Description</label>
              <textarea
                class="form-control"
                id="description"
                v-model="formData.description"
                rows="3"
                placeholder="Optional description of the device"
                :disabled="loading"
              ></textarea>
            </div>

            <!-- Error Message -->
            <div v-if="error" class="alert alert-danger">
              <i class="bi bi-exclamation-triangle me-2"></i>{{ error }}
            </div>

            <!-- Success Message -->
            <div v-if="success" class="alert alert-success">
              <i class="bi bi-check-circle me-2"></i>{{ success }}
            </div>
          </form>
        </div>
        
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" :disabled="loading">
            Cancel
          </button>
          <button type="button" class="btn btn-primary" @click="handleSubmit" :disabled="loading">
            <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status"></span>
            <i v-else class="bi bi-plus-circle me-2"></i>
            {{ loading ? 'Creating...' : 'Create Device' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import axios from 'axios';

const emit = defineEmits(['deviceCreated']);

const loading = ref(false);
const error = ref<string | null>(null);
const success = ref<string | null>(null);

const formData = reactive({
  deviceId: '',
  deviceName: '',
  mqttBroker: 'mqtt://broker.zeptac.com:1883',
  mqttUsername: 'zeptac_iot',
  mqttPassword: '',
  location: '',
  deviceType: 'IoT Sensor',
  icon: 'bi-device',
  color: '#007bff',
  description: ''
});

const availableIcons = [
  { label: 'Device', value: 'bi-device' },
  { label: 'Lightbulb', value: 'bi-lightbulb' },
  { label: 'Thermometer', value: 'bi-thermometer-half' },
  { label: 'Water', value: 'bi-water' },
  { label: 'CPU', value: 'bi-cpu' },
  { label: 'Speedometer', value: 'bi-speedometer2' },
];

const availableColors = [
  { label: 'Blue', value: '#007bff' },
  { label: 'Green', value: '#28a745' },
  { label: 'Orange', value: '#fd7e14' },
  { label: 'Red', value: '#dc3545' },
  { label: 'Purple', value: '#6f42c1' },
  { label: 'Teal', value: '#20c997' },
];

const handleSubmit = async () => {
  error.value = null;
  success.value = null;

  // Validation
  if (!formData.deviceId || !formData.deviceName || !formData.mqttBroker || !formData.mqttUsername || !formData.mqttPassword) {
    error.value = 'Device ID, Name, MQTT Broker, Username, and Password are required';
    return;
  }

  try {
    loading.value = true;
    
    const apiUrl = import.meta.env.VITE_APP_API_URL || 'http://localhost:3001/';
    
    // Prepare complete MQTT device data
    const deviceData = {
      deviceId: formData.deviceId,
      deviceName: formData.deviceName,
      location: formData.location || 'Unknown Location',
      deviceType: formData.deviceType,
      icon: formData.icon,
      color: formData.color,
      description: formData.description,
      mqttBroker: formData.mqttBroker,
      mqttUsername: formData.mqttUsername,
      mqttPassword: formData.mqttPassword,
      topicPrefix: `devices/${formData.deviceId}`,
      dataTopic: `devices/${formData.deviceId}/data`,
      statusTopic: `devices/${formData.deviceId}/status`,
      commandTopic: `devices/${formData.deviceId}/commands`
    };
    
    const response = await axios.post(`${apiUrl}api/devices`, deviceData);
    
    success.value = `MQTT Device "${formData.deviceName}" created successfully!\nRoute: ${response.data.device.route}\nData Topic: devices/${formData.deviceId}/data`;
    
    console.log('✅ MQTT Device created:', response.data);
    
    // Reset form
    setTimeout(() => {
      formData.deviceId = '';
      formData.deviceName = '';
      formData.mqttBroker = 'mqtt://broker.zeptac.com:1883';
      formData.mqttUsername = 'zeptac_iot';
      formData.mqttPassword = '';
      formData.location = '';
      formData.deviceType = 'IoT Sensor';
      formData.icon = 'bi-device';
      formData.color = '#007bff';
      formData.description = '';
      success.value = null;
      
      // Emit event to parent
      emit('deviceCreated', response.data.device);
      
      // Close modal
      const modal = document.getElementById('addDeviceModal');
      if (modal) {
        const bsModal = (window as any).bootstrap.Modal.getInstance(modal);
        bsModal?.hide();
      }
    }, 2000);
    
  } catch (err: any) {
    console.error('Error creating MQTT device:', err);
    error.value = err.response?.data?.error || 'Failed to create MQTT device';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.required::after {
  content: " *";
  color: red;
}

.btn.active {
  border: 2px solid #0d6efd;
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
}
</style>
