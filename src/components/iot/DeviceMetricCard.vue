<template>
  <div 
    class="device-metric-card" 
    :class="[`metric-${type}`, statusClass]"
    :style="cardStyle"
  >
    <!-- Icon -->
    <div class="metric-icon" :class="`icon-${type}`">
      <i :class="icon" class="fs-2x"></i>
    </div>

    <!-- Content -->
    <div class="metric-content">
      <!-- Value with animation -->
      <div class="metric-value-wrapper">
        <span class="metric-value" :key="value">
          {{ formattedValue }}
        </span>
        <span v-if="unit" class="metric-unit">{{ unit }}</span>
      </div>

      <!-- Label -->
      <div class="metric-label">{{ label }}</div>

      <!-- Trend Indicator -->
      <div v-if="trend !== undefined && trend !== null" class="metric-trend" :class="trendClass">
        <i :class="trendIcon" class="fs-7"></i>
        <span class="trend-value">{{ Math.abs(trend) }}%</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  icon: string;
  value: number | string;
  label: string;
  unit?: string;
  trend?: number; // Percentage change (positive = up, negative = down)
  type?: 'battery' | 'signal' | 'temperature' | 'humidity' | 'pressure' | 'default';
  color?: string; // Custom color override
}

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  trend: undefined,
  unit: '',
  color: undefined
});

/**
 * Format value with proper decimal places
 */
const formattedValue = computed(() => {
  if (typeof props.value === 'number') {
    // Show 1 decimal for temperature, 0 for others
    if (props.type === 'temperature' || props.type === 'humidity' || props.type === 'pressure') {
      return props.value.toFixed(1);
    }
    return Math.round(props.value);
  }
  return props.value;
});

/**
 * Determine status class based on metric type and value
 */
const statusClass = computed(() => {
  const numValue = typeof props.value === 'number' ? props.value : parseFloat(props.value as string);
  
  if (isNaN(numValue)) return '';

  switch (props.type) {
    case 'battery':
      if (numValue <= 20) return 'status-critical';
      if (numValue <= 40) return 'status-warning';
      return 'status-good';
    
    case 'signal':
      if (numValue <= 30) return 'status-critical';
      if (numValue <= 60) return 'status-warning';
      return 'status-good';
    
    case 'temperature':
      if (numValue <= 10 || numValue >= 35) return 'status-critical';
      if (numValue <= 15 || numValue >= 30) return 'status-warning';
      return 'status-good';
    
    case 'humidity':
      if (numValue <= 20 || numValue >= 80) return 'status-critical';
      if (numValue <= 30 || numValue >= 70) return 'status-warning';
      return 'status-good';
    
    default:
      return 'status-good';
  }
});

/**
 * Trend icon based on direction
 */
const trendIcon = computed(() => {
  if (props.trend === undefined || props.trend === null) return '';
  if (props.trend > 0) return 'ki-outline ki-arrow-up';
  if (props.trend < 0) return 'ki-outline ki-arrow-down';
  return 'ki-outline ki-minus';
});

/**
 * Trend class for color coding
 */
const trendClass = computed(() => {
  if (props.trend === undefined || props.trend === null) return '';
  if (props.trend > 0) return 'trend-up';
  if (props.trend < 0) return 'trend-down';
  return 'trend-neutral';
});

/**
 * Custom card styling
 */
const cardStyle = computed(() => {
  if (props.color) {
    return {
      '--metric-color': props.color
    };
  }
  return {};
});
</script>

<style scoped lang="scss">
.device-metric-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--bs-card-bg);
  border-radius: var(--bs-border-radius-lg);
  border: 1px solid var(--bs-border-color);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    box-shadow: var(--bs-box-shadow-sm);
    transform: translateY(-2px);
  }

  // Status-based border colors
  &.status-critical {
    border-left: 4px solid var(--bs-danger);
  }

  &.status-warning {
    border-left: 4px solid var(--bs-warning);
  }

  &.status-good {
    border-left: 4px solid var(--bs-success);
  }
}

.metric-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: var(--bs-border-radius);
  flex-shrink: 0;
  transition: all 0.3s ease;

  // Type-specific colors
  &.icon-battery {
    background: rgba(var(--bs-success-rgb), 0.1);
    color: var(--bs-success);
  }

  &.icon-signal {
    background: rgba(var(--bs-primary-rgb), 0.1);
    color: var(--bs-primary);
  }

  &.icon-temperature {
    background: rgba(var(--bs-danger-rgb), 0.1);
    color: var(--bs-danger);
  }

  &.icon-humidity {
    background: rgba(var(--bs-info-rgb), 0.1);
    color: var(--bs-info);
  }

  &.icon-pressure {
    background: rgba(var(--bs-warning-rgb), 0.1);
    color: var(--bs-warning);
  }

  &.icon-default {
    background: rgba(var(--bs-gray-500-rgb), 0.1);
    color: var(--bs-gray-600);
  }

  // Custom color override
  .device-metric-card[style*="--metric-color"] & {
    background: rgba(var(--metric-color), 0.1);
    color: var(--metric-color);
  }

  i {
    transition: transform 0.3s ease;
  }

  .device-metric-card:hover & i {
    transform: scale(1.1);
  }
}

.metric-content {
  flex: 1;
  min-width: 0; // Allow text truncation
}

.metric-value-wrapper {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
  margin-bottom: 0.25rem;
}

.metric-value {
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--bs-gray-900);
  line-height: 1;
  animation: fadeInScale 0.3s ease;

  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
}

.metric-unit {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--bs-gray-600);
}

.metric-label {
  font-size: 0.875rem;
  color: var(--bs-gray-600);
  font-weight: 500;
  margin-bottom: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.metric-trend {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: var(--bs-border-radius-sm);
  font-size: 0.75rem;
  font-weight: 600;
  margin-top: 0.5rem;

  &.trend-up {
    background: rgba(var(--bs-success-rgb), 0.1);
    color: var(--bs-success);
  }

  &.trend-down {
    background: rgba(var(--bs-danger-rgb), 0.1);
    color: var(--bs-danger);
  }

  &.trend-neutral {
    background: rgba(var(--bs-gray-500-rgb), 0.1);
    color: var(--bs-gray-600);
  }

  i {
    font-size: 0.625rem;
  }

  .trend-value {
    line-height: 1;
  }
}

// Responsive adjustments
@media (max-width: 576px) {
  .device-metric-card {
    padding: 1rem;
    gap: 0.75rem;
  }

  .metric-icon {
    width: 48px;
    height: 48px;

    i {
      font-size: 1.5rem !important;
    }
  }

  .metric-value {
    font-size: 1.5rem;
  }
}

// Dark mode support
@media (prefers-color-scheme: dark) {
  .device-metric-card {
    background: var(--bs-body-bg);
    border-color: var(--bs-border-color);
  }

  .metric-value {
    color: var(--bs-gray-100);
  }
}
</style>
