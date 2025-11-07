# Frontend Dependencies Installation Guide

## Install Chart.js for Device History Chart Component

The `DeviceHistoryChart.vue` component requires Chart.js and its date adapter.

### Installation Commands

**Navigate to frontend directory:**
```bash
cd d:\ASHECONTROL\frontend\ZEPTAC-IOT-PLATFORM
```

**Install Chart.js dependencies:**
```bash
npm install chart.js@4.4.0 chartjs-adapter-date-fns@3.0.0 date-fns@2.30.0
```

**Or install all missing dependencies:**
```bash
npm install
```

### Verify Installation

Check that these packages are in your `package.json`:

```json
{
  "dependencies": {
    "chart.js": "^4.4.0",
    "chartjs-adapter-date-fns": "^3.0.0",
    "date-fns": "^2.30.0"
  }
}
```

### Alternative: Use Existing ApexCharts

If you prefer to use the existing ApexCharts library (already installed), you can modify `DeviceHistoryChart.vue` to use ApexCharts instead of Chart.js.

The current package.json shows:
- `apexcharts: ^3.44.0` ✅ Already installed
- `vue3-apexcharts: ^1.4.4` ✅ Already installed

### Usage After Installation

```vue
<script setup>
import DeviceHistoryChart from '@/components/iot/DeviceHistoryChart.vue';

const historicalData = [
  {
    timestamp: '2024-01-01T10:00:00Z',
    battery: 85,
    signal: 90,
    temperature: 22.5,
  },
  // ... more data points
];
</script>

<template>
  <DeviceHistoryChart
    :data="historicalData"
    :showBattery="true"
    :showSignal="true"
    :showTemperature="true"
    :height="400"
  />
</template>
```

## All New Components

### 1. DeviceStatusBadge.vue
```bash
# No additional dependencies required
# Uses existing CSS variables
```

### 2. MqttConnectionStatus.vue
```bash
# No additional dependencies required
# Uses existing UI components
```

### 3. DeviceMetricCard.vue
```bash
# No additional dependencies required
# Uses design system CSS variables
```

### 4. DeviceHistoryChart.vue
```bash
# Requires Chart.js (see above)
npm install chart.js chartjs-adapter-date-fns date-fns
```

## Complete Installation Script

Run this to install all required dependencies:

```bash
# Navigate to frontend
cd d:\ASHECONTROL\frontend\ZEPTAC-IOT-PLATFORM

# Install Chart.js for historical charts
npm install chart.js@4.4.0 chartjs-adapter-date-fns@3.0.0 date-fns@2.30.0

# Install axios if not already installed (for device service)
npm install axios

# Verify installation
npm list chart.js chartjs-adapter-date-fns date-fns
```

## Quick Test

After installation, test that Chart.js is working:

```javascript
// test-chartjs.js
import { Chart } from 'chart.js';

console.log('Chart.js version:', Chart.version);
console.log('✅ Chart.js installed successfully');
```

## Troubleshooting

### Error: "Cannot find module 'chart.js'"

**Solution:**
```bash
npm install chart.js --save
```

### Error: "Cannot find module 'chartjs-adapter-date-fns'"

**Solution:**
```bash
npm install chartjs-adapter-date-fns date-fns --save
```

### Chart not rendering

**Checklist:**
1. ✅ Chart.js installed
2. ✅ Canvas element in template
3. ✅ Data prop passed correctly
4. ✅ Component mounted before chart init
5. ✅ Height prop set (default: 400px)

### TypeScript errors

If you see TypeScript errors, install type definitions:

```bash
npm install --save-dev @types/chart.js
```

## Alternative: ApexCharts Version

If you prefer to use ApexCharts (already installed), here's a modified version:

```vue
<template>
  <div class="device-history-chart">
    <apexchart
      type="line"
      :options="chartOptions"
      :series="chartSeries"
      :height="height"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

// Your existing data processing logic...
</script>
```

Let me know if you'd like me to create an ApexCharts version of the component!
