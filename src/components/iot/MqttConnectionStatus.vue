<template>
  <div class="mqtt-connection-status" :class="`status-${connectionStatus}`">
    <div class="status-header">
      <div class="status-indicator">
        <span class="status-dot" :class="`dot-${connectionStatus}`"></span>
        <span class="status-label">{{ statusText }}</span>
      </div>
      
      <button 
        v-if="connectionStatus === 'disconnected' && showReconnect"
        class="btn btn-sm btn-light-primary"
        @click="handleReconnect"
        :disabled="reconnecting"
      >
        <i class="ki-outline ki-arrows-circle fs-6"></i>
        {{ reconnecting ? 'Connecting...' : 'Reconnect' }}
      </button>
    </div>
    
    <div class="connection-details">
      <div class="detail-row">
        <span class="detail-label">
          <i class="ki-outline ki-cloud fs-6"></i>
          Broker:
        </span>
        <span class="detail-value">{{ brokerUrl || 'Not configured' }}</span>
      </div>
      
      <div v-if="topic" class="detail-row">
        <span class="detail-label">
          <i class="ki-outline ki-share fs-6"></i>
          Topic:
        </span>
        <span class="detail-value">{{ topic }}</span>
      </div>
      
      <div v-if="lastMessageTime" class="detail-row">
        <span class="detail-label">
          <i class="ki-outline ki-time fs-6"></i>
          Last Message:
        </span>
        <span class="detail-value">{{ formattedLastMessageTime }}</span>
      </div>
      
      <div v-if="messageCount !== undefined" class="detail-row">
        <span class="detail-label">
          <i class="ki-outline ki-messages fs-6"></i>
          Messages:
        </span>
        <span class="detail-value">
          <span class="badge badge-light-primary">{{ messageCount }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

interface Props {
  connectionStatus: 'connected' | 'disconnected' | 'connecting';
  brokerUrl?: string;
  topic?: string;
  lastMessageTime?: Date | string | null;
  messageCount?: number;
  showReconnect?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  brokerUrl: '',
  topic: '',
  lastMessageTime: null,
  messageCount: undefined,
  showReconnect: true,
});

const emit = defineEmits<{
  reconnect: [];
}>();

const reconnecting = ref(false);

/**
 * Get status text
 */
const statusText = computed(() => {
  switch (props.connectionStatus) {
    case 'connected':
      return 'Connected';
    case 'connecting':
      return 'Connecting...';
    case 'disconnected':
      return 'Disconnected';
    default:
      return 'Unknown';
  }
});

/**
 * Format last message time as relative time
 */
const formattedLastMessageTime = computed(() => {
  if (!props.lastMessageTime) return 'Never';
  
  const messageTime = typeof props.lastMessageTime === 'string' 
    ? new Date(props.lastMessageTime) 
    : props.lastMessageTime;
  
  const now = new Date();
  const diffMs = now.getTime() - messageTime.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  
  if (diffSec < 10) return 'Just now';
  if (diffSec < 60) return `${diffSec}s ago`;
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  if (diffDay === 1) return 'Yesterday';
  return `${diffDay} days ago`;
});

/**
 * Handle reconnect button click
 */
function handleReconnect() {
  reconnecting.value = true;
  emit('reconnect');
  
  // Reset reconnecting state after 3 seconds
  setTimeout(() => {
    reconnecting.value = false;
  }, 3000);
}
</script>

<style scoped lang="scss">
.mqtt-connection-status {
  background: var(--bs-card-bg);
  border-radius: var(--bs-border-radius-lg);
  border: 1px solid var(--bs-border-color);
  padding: 1rem;
  transition: all 0.3s ease;
  
  &.status-connected {
    border-left: 4px solid #50CD89;
  }
  
  &.status-disconnected {
    border-left: 4px solid #F1416C;
  }
  
  &.status-connecting {
    border-left: 4px solid #FFC700;
  }
}

.status-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--bs-border-color);
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.status-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
  
  &.dot-connected {
    background: #50CD89;
    box-shadow: 0 0 0 0 rgba(80, 205, 137, 0.7);
    animation: pulse-connected 2s infinite;
  }
  
  &.dot-disconnected {
    background: #F1416C;
  }
  
  &.dot-connecting {
    background: #FFC700;
    animation: pulse-connecting 1.5s infinite;
  }
}

.status-label {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--bs-gray-800);
}

.connection-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detail-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.detail-label {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: var(--bs-gray-600);
  font-weight: 500;
  min-width: 100px;
  
  i {
    color: var(--bs-gray-500);
  }
}

.detail-value {
  color: var(--bs-gray-800);
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  word-break: break-all;
  flex: 1;
}

// Animations
@keyframes pulse-connected {
  0% {
    box-shadow: 0 0 0 0 rgba(80, 205, 137, 0.7);
  }
  
  70% {
    box-shadow: 0 0 0 10px rgba(80, 205, 137, 0);
  }
  
  100% {
    box-shadow: 0 0 0 0 rgba(80, 205, 137, 0);
  }
}

@keyframes pulse-connecting {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  
  50% {
    opacity: 0.5;
    transform: scale(0.8);
  }
}

// Button styles
.btn {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    transform: scale(1.05);
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}

// Responsive
@media (max-width: 576px) {
  .status-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  
  .detail-label {
    min-width: auto;
    font-size: 0.8rem;
  }
  
  .detail-value {
    font-size: 0.75rem;
  }
}

// Dark mode
@media (prefers-color-scheme: dark) {
  .mqtt-connection-status {
    background: var(--bs-body-bg);
  }
  
  .status-label {
    color: var(--bs-gray-200);
  }
  
  .detail-value {
    color: var(--bs-gray-300);
  }
}
</style>
