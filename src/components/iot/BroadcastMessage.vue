<template>
  <div class="card">
    <div class="card-header border-0 pt-6">
      <div class="card-title">
        <h3 class="mb-0">
          <i class="bi bi-broadcast me-2"></i>
          Broadcast Message to All Devices
        </h3>
      </div>
      <div class="card-toolbar">
        <span class="badge" :class="connectionStatusClass">
          <i class="bi bi-circle-fill me-1"></i>
          {{ connectionStatus }}
        </span>
      </div>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-lg-8">
          <div class="mb-4">
            <label class="form-label">Broadcast Message</label>
            <div class="input-group">
              <textarea 
                v-model="messageText" 
                class="form-control" 
                rows="4" 
                placeholder="Enter your broadcast message..."
                :disabled="sendingMessage || connectionStatus !== 'connected'"
                @keydown.ctrl.enter="sendBroadcastMessage"
              ></textarea>
            </div>
            <div class="form-text">
              <i class="bi bi-info-circle me-1"></i>
              This message will be sent to all connected MQTT devices
            </div>
          </div>
          
          <!-- Quick Message Templates -->
          <div class="mb-4">
            <label class="form-label">Quick Templates</label>
            <div class="d-flex flex-wrap gap-2">
              <button 
                v-for="template in messageTemplates" 
                :key="template.id"
                @click="messageText = template.text"
                class="btn btn-sm btn-light"
                :disabled="sendingMessage"
              >
                {{ template.label }}
              </button>
            </div>
          </div>

          <div class="d-flex gap-2 align-items-center">
            <button 
              @click="sendBroadcastMessage" 
              class="btn btn-primary"
              :disabled="!messageText.trim() || sendingMessage || connectionStatus !== 'connected'"
            >
              <span v-if="sendingMessage" class="spinner-border spinner-border-sm me-2"></span>
              <i v-else class="bi bi-broadcast me-2"></i>
              {{ sendingMessage ? 'Broadcasting...' : 'Broadcast to All Devices' }}
            </button>
            
            <button 
              @click="messageText = ''" 
              class="btn btn-light"
              :disabled="sendingMessage"
            >
              Clear
            </button>

            <div v-if="lastBroadcastResult" class="ms-3">
              <span 
                class="badge"
                :class="{
                  'badge-success': lastBroadcastResult.success,
                  'badge-danger': !lastBroadcastResult.success
                }"
              >
                {{ lastBroadcastResult.success ? 'Sent Successfully' : 'Failed to Send' }}
              </span>
            </div>
          </div>
          
          <div v-if="connectionStatus !== 'connected'" class="alert alert-warning mt-3">
            <i class="bi bi-exclamation-triangle me-2"></i>
            Cannot send messages: Not connected to server
          </div>
        </div>
        
        <div class="col-lg-4">
          <div class="mb-4">
            <h5>Broadcast History</h5>
            <div class="card bg-light" style="max-height: 350px; overflow-y: auto;">
              <div class="card-body p-3">
                <div v-if="broadcastHistory.length === 0" class="text-muted text-center">
                  No broadcasts sent yet
                </div>
                <div v-else>
                  <div 
                    v-for="(broadcast, index) in broadcastHistory.slice(0, 15)" 
                    :key="index"
                    class="mb-3 pb-3"
                    :class="{ 'border-bottom': index < Math.min(broadcastHistory.length, 15) - 1 }"
                  >
                    <div class="d-flex justify-content-between align-items-start mb-2">
                      <small class="text-muted">{{ formatTimestamp(broadcast.timestamp) }}</small>
                      <span 
                        class="badge"
                        :class="{
                          'badge-success': broadcast.status === 'sent',
                          'badge-danger': broadcast.status === 'failed',
                          'badge-warning': broadcast.status === 'sending'
                        }"
                      >
                        {{ broadcast.status }}
                      </span>
                    </div>
                    <div class="text-dark fw-bold mb-1">{{ broadcast.message }}</div>
                    <small class="text-muted">
                      <i class="bi bi-broadcast me-1"></i>
                      Broadcast
                      <span v-if="broadcast.details" class="ms-2">{{ broadcast.details }}</span>
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onUnmounted } from 'vue';
import { io, Socket } from 'socket.io-client';

export default defineComponent({
  name: 'BroadcastMessage',
  setup() {
    const socket = ref<Socket | null>(null);
    const connectionStatus = ref<string>('disconnected');
    const messageText = ref<string>('');
    const sendingMessage = ref<boolean>(false);
    const lastBroadcastResult = ref<{success: boolean, details?: string} | null>(null);
    const broadcastHistory = ref<Array<{
      timestamp: string, 
      message: string, 
      status: string,
      details?: string
    }>>([]);

    const messageTemplates = ref([
      { id: 1, label: 'System Maintenance', text: 'System maintenance scheduled. Please ensure all critical operations are completed.' },
      { id: 2, label: 'Emergency Alert', text: 'EMERGENCY: Please check your device status immediately.' },
      { id: 3, label: 'Status Check', text: 'Please report your current status and location.' },
      { id: 4, label: 'Test Message', text: 'This is a test broadcast message.' },
      { id: 5, label: 'Power Conservation', text: 'Please switch to power conservation mode to extend battery life.' }
    ]);

    onMounted(() => {
      // Connect to backend Socket.io server
      socket.value = io('http://localhost:3001', {
        withCredentials: true,
        transports: ['websocket', 'polling']
      });

      socket.value.on('connect', () => {
        connectionStatus.value = 'connected';
        console.log('Broadcast component connected to backend server');
      });

      socket.value.on('disconnect', () => {
        connectionStatus.value = 'disconnected';
        console.log('Broadcast component disconnected from backend server');
      });

      socket.value.on('messageNotification', (data) => {
        console.log('Message notification received:', data);
      });
    });

    onUnmounted(() => {
      if (socket.value) {
        socket.value.disconnect();
      }
    });

    const connectionStatusClass = computed(() => {
      return connectionStatus.value === 'connected' ? 'text-success' : 'text-danger';
    });

    const sendBroadcastMessage = () => {
      if (!messageText.value.trim() || !socket.value || sendingMessage.value) {
        return;
      }

      sendingMessage.value = true;
      lastBroadcastResult.value = null;

      const messageData = {
        text: messageText.value.trim(),
        type: 'broadcast',
        targetDevice: 'all',
        timestamp: new Date().toISOString()
      };

      // Add to broadcast history
      broadcastHistory.value.unshift({
        timestamp: messageData.timestamp,
        message: messageData.text,
        status: 'sending'
      });

      socket.value.emit('sendMessage', messageData, (response: any) => {
        sendingMessage.value = false;
        lastBroadcastResult.value = {
          success: response.success,
          details: response.details
        };

        if (response.success) {
          messageText.value = '';
          // Update status in history
          if (broadcastHistory.value.length > 0) {
            broadcastHistory.value[0].status = 'sent';
            broadcastHistory.value[0].details = response.details;
          }
        } else {
          // Update status in history
          if (broadcastHistory.value.length > 0) {
            broadcastHistory.value[0].status = 'failed';
            broadcastHistory.value[0].details = response.error;
          }
          console.error('Failed to send broadcast message:', response.error);
        }

        // Clear the result status after 5 seconds
        setTimeout(() => {
          lastBroadcastResult.value = null;
        }, 5000);
      });
    };

    const formatTimestamp = (timestamp: string) => {
      const date = new Date(timestamp);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffMinutes < 1) return 'Just now';
      if (diffMinutes < 60) return `${diffMinutes}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays < 7) return `${diffDays}d ago`;
      return date.toLocaleDateString();
    };

    return {
      messageText,
      sendingMessage,
      connectionStatus,
      connectionStatusClass,
      lastBroadcastResult,
      broadcastHistory,
      messageTemplates,
      sendBroadcastMessage,
      formatTimestamp,
    };
  }
});
</script>

<style scoped>
.card {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}
</style>