<template>
  <span 
    class="device-status-badge" 
    :class="[
      `status-${status}`,
      { 'status-small': small },
      { 'status-pulsing': status === 'online' && !small }
    ]"
  >
    <span class="status-dot" :class="`dot-${status}`"></span>
    <span v-if="!dotOnly" class="status-text">{{ statusText }}</span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  status: 'online' | 'offline' | 'warning';
  small?: boolean;
  dotOnly?: boolean; // Only show dot, no text
}

const props = withDefaults(defineProps<Props>(), {
  small: false,
  dotOnly: false,
});

/**
 * Get status text with proper capitalization
 */
const statusText = computed(() => {
  return props.status.charAt(0).toUpperCase() + props.status.slice(1);
});
</script>

<style scoped lang="scss">
.device-status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.75rem;
  border-radius: var(--bs-border-radius-pill);
  font-size: 0.875rem;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &.status-small {
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    gap: 0.35rem;
    
    .status-dot {
      width: 6px;
      height: 6px;
    }
  }
  
  // Online status - green
  &.status-online {
    background: rgba(80, 205, 137, 0.1);
    color: #50CD89;
    border: 1px solid rgba(80, 205, 137, 0.3);
    
    .status-dot {
      background: #50CD89;
      box-shadow: 0 0 0 0 rgba(80, 205, 137, 0.7);
    }
    
    &.status-pulsing .status-dot {
      animation: pulse-green 2s infinite;
    }
  }
  
  // Offline status - red
  &.status-offline {
    background: rgba(241, 65, 108, 0.1);
    color: #F1416C;
    border: 1px solid rgba(241, 65, 108, 0.3);
    
    .status-dot {
      background: #F1416C;
    }
  }
  
  // Warning status - yellow/orange
  &.status-warning {
    background: rgba(255, 199, 0, 0.1);
    color: #FFC700;
    border: 1px solid rgba(255, 199, 0, 0.3);
    
    .status-dot {
      background: #FFC700;
      animation: pulse-warning 2s infinite;
    }
  }
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.status-text {
  line-height: 1;
  white-space: nowrap;
}

// Pulsing animation for online status
@keyframes pulse-green {
  0% {
    box-shadow: 0 0 0 0 rgba(80, 205, 137, 0.7);
  }
  
  70% {
    box-shadow: 0 0 0 8px rgba(80, 205, 137, 0);
  }
  
  100% {
    box-shadow: 0 0 0 0 rgba(80, 205, 137, 0);
  }
}

// Pulsing animation for warning status
@keyframes pulse-warning {
  0%, 100% {
    opacity: 1;
  }
  
  50% {
    opacity: 0.5;
  }
}

// Dark mode support
@media (prefers-color-scheme: dark) {
  .device-status-badge {
    &.status-online {
      background: rgba(80, 205, 137, 0.15);
      border-color: rgba(80, 205, 137, 0.4);
    }
    
    &.status-offline {
      background: rgba(241, 65, 108, 0.15);
      border-color: rgba(241, 65, 108, 0.4);
    }
    
    &.status-warning {
      background: rgba(255, 199, 0, 0.15);
      border-color: rgba(255, 199, 0, 0.4);
    }
  }
}

// Hover effect
.device-status-badge:not(.status-small) {
  cursor: default;
  
  &:hover {
    transform: scale(1.05);
  }
}
</style>
