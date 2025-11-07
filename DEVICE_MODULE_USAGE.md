# Device Module - Usage Guide

## Overview

This guide demonstrates how to use the device management module components, services, and routing.

## 1. Device API Service

### Basic Usage

```typescript
import { deviceService } from '@/services/device.service';

// Get all devices
const devices = await deviceService.getDevices();

// Get specific device
const device = await deviceService.getDeviceById('DEVICE_123');

// Update device data
await deviceService.updateDeviceData('DEVICE_123', {
  battery: 85,
  signal: 90,
  temperature: 22.5
});

// Get status summary
const summary = await deviceService.getDeviceStatusSummary();
console.log(summary); // { online: 5, warning: 2, offline: 1, total: 8 }

// Search devices
const results = await deviceService.searchDevices('Building A');
```

### Error Handling

The service automatically handles common errors:
- 401: Redirects to login
- 403: Logs forbidden access
- 404: Logs not found
- 500: Logs server error

```typescript
try {
  const device = await deviceService.getDeviceById('DEVICE_999');
} catch (error) {
  // Error already logged by interceptor
  // Handle UI feedback here
  console.log('Failed to load device');
}
```

## 2. Device Metric Card Component

### Import

```vue
<script setup lang="ts">
import DeviceMetricCard from '@/components/iot/DeviceMetricCard.vue';
</script>
```

### Basic Usage

```vue
<template>
  <div class="row g-4">
    <!-- Battery -->
    <div class="col-md-3">
      <DeviceMetricCard
        icon="ki-outline ki-battery"
        :value="85"
        label="Battery"
        unit="%"
        type="battery"
        :trend="5"
      />
    </div>

    <!-- Signal Strength -->
    <div class="col-md-3">
      <DeviceMetricCard
        icon="ki-outline ki-wifi"
        :value="92"
        label="Signal"
        unit="%"
        type="signal"
        :trend="-3"
      />
    </div>

    <!-- Temperature -->
    <div class="col-md-3">
      <DeviceMetricCard
        icon="ki-outline ki-temperature"
        :value="22.5"
        label="Temperature"
        unit="°C"
        type="temperature"
        :trend="1.2"
      />
    </div>

    <!-- Humidity -->
    <div class="col-md-3">
      <DeviceMetricCard
        icon="ki-outline ki-drop"
        :value="45"
        label="Humidity"
        unit="%"
        type="humidity"
      />
    </div>
  </div>
</template>
```

### Dynamic Metrics from API

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { deviceService } from '@/services/device.service';
import DeviceMetricCard from '@/components/iot/DeviceMetricCard.vue';

const deviceData = ref<any>(null);

onMounted(async () => {
  deviceData.value = await deviceService.getDeviceById('DEVICE_123');
});
</script>

<template>
  <div v-if="deviceData" class="row g-4">
    <div class="col-md-3">
      <DeviceMetricCard
        icon="ki-outline ki-battery"
        :value="deviceData.sensors.battery?.value || 0"
        label="Battery"
        :unit="deviceData.sensors.battery?.unit || '%'"
        type="battery"
      />
    </div>
    
    <div class="col-md-3">
      <DeviceMetricCard
        icon="ki-outline ki-wifi"
        :value="deviceData.sensors.signal?.value || 0"
        label="Signal"
        unit="%"
        type="signal"
      />
    </div>
    
    <div class="col-md-3">
      <DeviceMetricCard
        icon="ki-outline ki-temperature"
        :value="deviceData.sensors.temperature?.value || 0"
        label="Temperature"
        :unit="deviceData.sensors.temperature?.unit || '°C'"
        type="temperature"
      />
    </div>
  </div>
</template>
```

### Custom Colors

```vue
<DeviceMetricCard
  icon="ki-outline ki-rocket"
  :value="1234"
  label="Messages"
  type="default"
  color="#7239EA"
/>
```

### Responsive Grid

```vue
<div class="row g-3 g-md-4">
  <div class="col-6 col-md-4 col-lg-3 col-xl-2">
    <DeviceMetricCard ... />
  </div>
  <!-- More cards -->
</div>
```

## 3. Router Navigation

### Import Navigation Helpers

```typescript
import { deviceNavigation, DeviceRouteNames } from '@/router/device.routes';
import { useRouter } from 'vue-router';

const router = useRouter();
```

### Navigate to Device List

```typescript
// Method 1: Using navigation helper
router.push(deviceNavigation.toDeviceList());

// Method 2: Using route name
router.push({ name: DeviceRouteNames.DEVICES });

// Method 3: Direct path
router.push('/devices');
```

### Navigate to Device Details

```typescript
// Method 1: Using navigation helper (recommended)
router.push(deviceNavigation.toDeviceDetails('DEVICE_123'));

// Method 2: Using route name
router.push({ 
  name: DeviceRouteNames.DEVICE_DETAILS, 
  params: { deviceId: 'DEVICE_123' } 
});

// Method 3: Direct path
router.push('/devices/DEVICE_123');

// Also works with numeric IDs
router.push(deviceNavigation.toDeviceDetails(123));
```

### Get Device URL (for links)

```vue
<template>
  <a :href="deviceNavigation.getDeviceUrl('DEVICE_123')">
    View Device
  </a>
</template>
```

### In Template with router-link

```vue
<template>
  <router-link 
    :to="{ name: 'device-details', params: { deviceId: 'DEVICE_123' } }"
    class="btn btn-primary"
  >
    View Details
  </router-link>
</template>
```

## 4. Complete Example: Device List with Navigation

```vue
<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">Devices</h3>
    </div>
    
    <div class="card-body">
      <div class="row g-4">
        <div 
          v-for="device in devices" 
          :key="device.deviceId"
          class="col-md-6 col-lg-4"
        >
          <div class="card h-100 cursor-pointer" @click="viewDevice(device.deviceId)">
            <div class="card-body">
              <h5 class="card-title">{{ device.name }}</h5>
              <p class="text-muted">{{ device.location.building }}</p>
              
              <!-- Metrics Grid -->
              <div class="row g-2 mt-3">
                <div class="col-6">
                  <DeviceMetricCard
                    icon="ki-outline ki-battery"
                    :value="device.currentData.battery || 0"
                    label="Battery"
                    unit="%"
                    type="battery"
                  />
                </div>
                
                <div class="col-6">
                  <DeviceMetricCard
                    icon="ki-outline ki-wifi"
                    :value="device.currentData.signal || 0"
                    label="Signal"
                    unit="%"
                    type="signal"
                  />
                </div>
              </div>
              
              <!-- View Details Button -->
              <button 
                class="btn btn-primary btn-sm w-100 mt-3"
                @click.stop="viewDevice(device.deviceId)"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { deviceService } from '@/services/device.service';
import { deviceNavigation } from '@/router/device.routes';
import DeviceMetricCard from '@/components/iot/DeviceMetricCard.vue';

const router = useRouter();
const devices = ref<any[]>([]);

onMounted(async () => {
  devices.value = await deviceService.getDevices();
});

function viewDevice(deviceId: string) {
  router.push(deviceNavigation.toDeviceDetails(deviceId));
}
</script>
```

## 5. Complete Example: Device Details Page

```vue
<template>
  <div v-if="device" class="card">
    <div class="card-header d-flex justify-content-between align-items-center">
      <div>
        <h3 class="card-title mb-0">{{ device.name }}</h3>
        <p class="text-muted mb-0">{{ device.location.building }} - {{ device.location.room }}</p>
      </div>
      
      <button class="btn btn-light" @click="goBack">
        <i class="ki-outline ki-arrow-left"></i>
        Back
      </button>
    </div>
    
    <div class="card-body">
      <!-- Status Badge -->
      <div class="mb-4">
        <span 
          class="badge" 
          :class="{
            'badge-success': device.status.state === 'online',
            'badge-warning': device.status.state === 'warning',
            'badge-danger': device.status.state === 'offline'
          }"
        >
          {{ device.status.state.toUpperCase() }}
        </span>
        <span class="text-muted ms-2">
          Last seen: {{ formatDate(device.status.lastSeen) }}
        </span>
      </div>
      
      <!-- Metrics Grid -->
      <div class="row g-4 mb-4">
        <div class="col-md-3">
          <DeviceMetricCard
            icon="ki-outline ki-battery"
            :value="device.sensors.battery?.value || 0"
            label="Battery"
            unit="%"
            type="battery"
            :trend="calculateTrend('battery')"
          />
        </div>
        
        <div class="col-md-3">
          <DeviceMetricCard
            icon="ki-outline ki-wifi"
            :value="device.sensors.signal?.value || 0"
            label="Signal"
            unit="%"
            type="signal"
            :trend="calculateTrend('signal')"
          />
        </div>
        
        <div class="col-md-3">
          <DeviceMetricCard
            icon="ki-outline ki-temperature"
            :value="device.sensors.temperature?.value || 0"
            label="Temperature"
            :unit="device.sensors.temperature?.unit || '°C'"
            type="temperature"
            :trend="calculateTrend('temperature')"
          />
        </div>
        
        <div class="col-md-3">
          <DeviceMetricCard
            icon="ki-outline ki-drop"
            :value="device.sensors.humidity?.value || 0"
            label="Humidity"
            unit="%"
            type="humidity"
            :trend="calculateTrend('humidity')"
          />
        </div>
      </div>
      
      <!-- History Chart -->
      <div class="mt-5">
        <h4>Historical Data</h4>
        <!-- Add your chart component here -->
      </div>
    </div>
  </div>
  
  <div v-else class="text-center py-5">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { deviceService } from '@/services/device.service';
import DeviceMetricCard from '@/components/iot/DeviceMetricCard.vue';
import { navigationHelpers } from '@/router/guards';

const route = useRoute();
const router = useRouter();
const device = ref<any>(null);

onMounted(async () => {
  const deviceId = route.params.deviceId as string;
  device.value = await deviceService.getDeviceById(deviceId);
});

function goBack() {
  navigationHelpers.goBackOrFallback(router, '/devices');
}

function formatDate(date: string) {
  return new Date(date).toLocaleString();
}

function calculateTrend(metric: string): number {
  // Calculate trend from history
  // This is a placeholder - implement based on your history data
  return Math.random() * 10 - 5;
}
</script>
```

## 6. Environment Configuration

Add to `.env`:

```env
VITE_APP_API_URL=http://localhost:3001/
VITE_APP_NAME=Zeptac IOT Platform
VITE_ENABLE_ANALYTICS=false
```

## 7. TypeScript Support

All services and components are fully typed:

```typescript
import type { DeviceData, DeviceDetail, UpdateDeviceDataPayload } from '@/services/device.service';

const device: DeviceDetail = await deviceService.getDeviceById('DEVICE_123');
```

## 8. Permission-Based Access

Routes automatically check permissions defined in meta:

```typescript
// In router configuration
meta: {
  permissions: ['read_devices'] // User must have this permission
}
```

## Icon Reference

Available icons (from KTIcons):
- `ki-outline ki-battery` - Battery
- `ki-outline ki-wifi` - Signal/WiFi
- `ki-outline ki-temperature` - Temperature
- `ki-outline ki-drop` - Humidity/Water
- `ki-outline ki-gauge` - Pressure/Speed
- `ki-outline ki-location` - Location
- `ki-outline ki-rocket` - Custom metrics
- `ki-outline ki-arrow-up` - Trend up
- `ki-outline ki-arrow-down` - Trend down

## Best Practices

1. **Always handle errors**: The service does global error handling, but provide user feedback
2. **Use type-safe navigation**: Use `deviceNavigation` helpers instead of string paths
3. **Validate device IDs**: The router guard validates format automatically
4. **Use responsive grids**: Bootstrap grid classes for mobile support
5. **Implement loading states**: Show spinners while fetching data
6. **Calculate trends**: Compare current vs previous values for trend indicators
7. **Cache data**: Consider using Pinia store for device data caching

## Troubleshooting

**"401 Unauthorized" errors**
- Check that `accessToken` is in localStorage
- Verify token hasn't expired

**Device not found**
- Ensure device exists in MongoDB
- Check deviceId format (numeric or DEVICE_XXX)

**Metrics not updating**
- Verify MQTT connection
- Check browser console for WebSocket errors
- Ensure backend services are running

## Next Steps

1. Add real-time updates with Socket.IO or MQTT composable
2. Implement data visualization with charts
3. Add device control actions
4. Create export/report functionality
5. Add notification system for alerts
