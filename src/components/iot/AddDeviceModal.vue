<template>
  <teleport to="body">
    <!-- Modal Overlay -->
    <div v-if="isOpen" class="add-device-modal-overlay" @click.self="closeModal">
      <div class="add-device-modal-dialog">
        <div class="add-device-modal-content">
          <!-- Header -->
          <div class="add-device-modal-header">
            <h5>Add New Device</h5>
            <button type="button" class="close-btn" @click="closeModal">×</button>
          </div>

          <!-- Body -->
          <div class="add-device-modal-body">
            <div class="form-group">
              <label>Device ID *</label>
              <input v-model="form.deviceId" type="text" placeholder="456" />
            </div>

            <div class="form-group">
              <label>Device Name *</label>
              <input v-model="form.deviceName" type="text" placeholder="Sensor 1" />
            </div>

            <div class="form-group">
              <label>Location</label>
              <input v-model="form.location" type="text" placeholder="Building A" />
            </div>

            <div class="form-group">
              <label>Device Type</label>
              <select v-model="form.deviceType">
                <option>IoT Sensor</option>
                <option>Temperature Sensor</option>
                <option>Other</option>
              </select>
            </div>



            <!-- Collapsible MQTT Section -->
            <div class="mqtt-section">
              <button type="button" class="mqtt-toggle" @click="showMqtt = !showMqtt">
                {{ showMqtt ? '−' : '+' }} MQTT Configuration
              </button>

              <div v-if="showMqtt" class="mqtt-fields">
                <div class="form-group">
                  <label>Broker URL *</label>
                  <input v-model="form.mqttBroker" type="text" placeholder="mqtt://broker.zeptac.com:1883" />
                </div>

                <div class="form-group">
                  <label>Username *</label>
                  <input v-model="form.mqttUsername" type="text" placeholder="zeptac_iot" />
                </div>

                <div class="form-group">
                  <label>Password *</label>
                  <input v-model="form.mqttPassword" type="password" placeholder="••••••" />
                </div>
              </div>
            </div>

            <!-- Error Message -->
            <div v-if="error" class="error-box">{{ error }}</div>
          </div>

          <!-- Footer -->
          <div class="add-device-modal-footer">
            <button type="button" class="btn-cancel" @click="closeModal" :disabled="loading">
              Cancel
            </button>
            <button type="button" class="btn-submit" @click="handleSubmit" :disabled="loading">
              {{ loading ? 'Creating...' : 'Create Device' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ref, reactive, defineExpose, defineProps } from 'vue';
import axios from 'axios';

console.log('🟦 AddDeviceModal component loaded');

const props = defineProps({
  clusters: {
    type: Array,
    default: () => []
  },
  zones: {
    type: Array,
    default: () => []
  },
  selectedZoneId: {
    type: String,
    default: null
  }
});

const emit = defineEmits(['deviceCreated']);

const isOpen = ref(false);
const loading = ref(false);
const error = ref('');
const showMqtt = ref(false);

const form = reactive({
  deviceId: '',
  deviceName: '',
  location: '',
  deviceType: 'IoT Sensor',
  mqttBroker: 'mqtt://broker.zeptac.com:1883',
  mqttUsername: 'zeptac_iot',
  mqttPassword: ''
});

const openModal = () => {
  console.log('� MODAL: Opening...');
  console.time('modal-open');
  isOpen.value = true;
  console.log('🟢 MODAL: isOpen set to true');
  showMqtt.value = false;
  console.log('🟢 MODAL: showMqtt set to false');
  console.timeEnd('modal-open');
  console.log('🟢 MODAL: Fully opened');
};

const closeModal = () => {
  if (!loading.value) {
    console.log('🔴 MODAL: Closing...');
    isOpen.value = false;
    resetForm();
    console.log('🔴 MODAL: Closed');
  }
};

const resetForm = () => {
  form.deviceId = '';
  form.deviceName = '';
  form.location = '';
  form.deviceType = 'IoT Sensor';
  form.mqttBroker = 'mqtt://broker.zeptac.com:1883';
  form.mqttUsername = 'zeptac_iot';
  form.mqttPassword = '';
  error.value = '';
};

const handleSubmit = async () => {
  error.value = '';

  if (!form.deviceId) {
    error.value = 'Device ID is required';
    return;
  }
  if (!form.deviceName) {
    error.value = 'Device Name is required';
    return;
  }
  if (!form.mqttBroker) {
    error.value = 'MQTT Broker is required';
    return;
  }

  loading.value = true;

  try {
    const apiUrl = (import.meta.env.VITE_APP_API_URL || 'http://localhost:3001').replace(/\/$/, '');
    
    console.log('📤 Creating device...');
    const response = await axios.post(`${apiUrl}/api/devices`, {
      deviceId: form.deviceId,
      deviceName: form.deviceName,
      location: form.location || 'Unknown',
      deviceType: form.deviceType,
      icon: 'bi-device',
      color: '#6c757d',
      description: '',
      mqttBroker: form.mqttBroker,
      mqttUsername: form.mqttUsername,
      mqttPassword: form.mqttPassword,
      topicPrefix: `devices/${form.deviceId}`,
      dataTopic: `devices/${form.deviceId}/data`,
      statusTopic: `devices/${form.deviceId}/status`,
      commandTopic: `devices/${form.deviceId}/commands`
    });

    console.log('✅ Device created');
    emit('deviceCreated', response.data.device || response.data);
    closeModal();
  } catch (err: any) {
    console.error('❌ Error:', err);
    error.value = err.response?.data?.error || err.message || 'Failed to create device';
  } finally {
    loading.value = false;
  }
};

defineExpose({ openModal, closeModal });
</script>

<style scoped>
.add-device-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
}

.add-device-modal-dialog {
  width: 100%;
  max-width: 450px;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  overflow-y: auto;
}

.add-device-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e0e0e0;
  background: #f5f5f5;
  flex-shrink: 0;
}

.add-device-modal-header h5 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
}

.close-btn:hover {
  color: #000;
}

.add-device-modal-body {
  padding: 1.5rem;
  flex: 1;
  overflow-y: auto;
}

.add-device-modal-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #e0e0e0;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  background: #f5f5f5;
  flex-shrink: 0;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.35rem;
  color: #333;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-family: inherit;
}

.form-select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-family: inherit;
  background: white;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.form-group input[type="color"] {
  height: 2.5rem;
  padding: 0.25rem;
  cursor: pointer;
}

.mqtt-section {
  margin-top: 1.5rem;
  border-top: 1px solid #e0e0e0;
  padding-top: 1rem;
}

.mqtt-toggle {
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0;
  margin-bottom: 0.5rem;
}

.mqtt-toggle:hover {
  text-decoration: underline;
}

.mqtt-fields {
  margin-top: 1rem;
  padding: 1rem;
  background: #f9f9f9;
  border-left: 3px solid #007bff;
}

.error-box {
  background: #fee;
  color: #c33;
  padding: 0.75rem;
  border-radius: 0.25rem;
  margin-top: 1rem;
  font-size: 0.875rem;
}

.btn-cancel,
.btn-submit {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-cancel {
  background: #e0e0e0;
  color: #333;
}

.btn-cancel:hover:not(:disabled) {
  background: #d0d0d0;
}

.btn-submit {
  background: #007bff;
  color: white;
}

.btn-submit:hover:not(:disabled) {
  background: #0056b3;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.cluster-input-wrapper {
  position: relative;
}

.cluster-input {
  width: 100%;
}

.text-muted {
  color: #6c757d !important;
}

.d-block {
  display: block !important;
}

.mt-1 {
  margin-top: 0.25rem !important;
}
</style>



