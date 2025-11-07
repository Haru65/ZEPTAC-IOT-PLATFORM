<template>
  <div class="device-history-chart">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount } from 'vue';
import {
  Chart,
  ChartConfiguration,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  type ChartData,
  type ChartOptions,
} from 'chart.js';
import 'chartjs-adapter-date-fns';

// Register Chart.js components
Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface HistoricalDataPoint {
  timestamp: string | Date;
  battery?: number;
  signal?: number;
  temperature?: number;
  humidity?: number;
  pressure?: number;
  [key: string]: any;
}

interface Props {
  data: HistoricalDataPoint[];
  showBattery?: boolean;
  showSignal?: boolean;
  showTemperature?: boolean;
  showHumidity?: boolean;
  showPressure?: boolean;
  height?: number;
}

const props = withDefaults(defineProps<Props>(), {
  showBattery: true,
  showSignal: true,
  showTemperature: true,
  showHumidity: false,
  showPressure: false,
  height: 400,
});

const chartCanvas = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;

/**
 * Prepare chart data from historical data
 */
function prepareChartData(): ChartData<'line'> {
  const sortedData = [...props.data].sort((a, b) => {
    const timeA = new Date(a.timestamp).getTime();
    const timeB = new Date(b.timestamp).getTime();
    return timeA - timeB;
  });

  const datasets: any[] = [];

  // Battery dataset
  if (props.showBattery) {
    datasets.push({
      label: 'Battery (%)',
      data: sortedData.map(point => ({
        x: new Date(point.timestamp),
        y: point.battery ?? null,
      })),
      borderColor: '#50CD89',
      backgroundColor: 'rgba(80, 205, 137, 0.1)',
      borderWidth: 2,
      pointRadius: 3,
      pointHoverRadius: 5,
      fill: false,
      tension: 0.4,
      yAxisID: 'y-percentage',
    });
  }

  // Signal dataset
  if (props.showSignal) {
    datasets.push({
      label: 'Signal (%)',
      data: sortedData.map(point => ({
        x: new Date(point.timestamp),
        y: point.signal ?? null,
      })),
      borderColor: '#009EF7',
      backgroundColor: 'rgba(0, 158, 247, 0.1)',
      borderWidth: 2,
      pointRadius: 3,
      pointHoverRadius: 5,
      fill: false,
      tension: 0.4,
      yAxisID: 'y-percentage',
    });
  }

  // Temperature dataset
  if (props.showTemperature) {
    datasets.push({
      label: 'Temperature (°C)',
      data: sortedData.map(point => ({
        x: new Date(point.timestamp),
        y: point.temperature ?? null,
      })),
      borderColor: '#F1416C',
      backgroundColor: 'rgba(241, 65, 108, 0.1)',
      borderWidth: 2,
      pointRadius: 3,
      pointHoverRadius: 5,
      fill: false,
      tension: 0.4,
      yAxisID: 'y-temperature',
    });
  }

  // Humidity dataset
  if (props.showHumidity) {
    datasets.push({
      label: 'Humidity (%)',
      data: sortedData.map(point => ({
        x: new Date(point.timestamp),
        y: point.humidity ?? null,
      })),
      borderColor: '#00A3FF',
      backgroundColor: 'rgba(0, 163, 255, 0.1)',
      borderWidth: 2,
      pointRadius: 3,
      pointHoverRadius: 5,
      fill: false,
      tension: 0.4,
      yAxisID: 'y-percentage',
    });
  }

  // Pressure dataset
  if (props.showPressure) {
    datasets.push({
      label: 'Pressure (hPa)',
      data: sortedData.map(point => ({
        x: new Date(point.timestamp),
        y: point.pressure ?? null,
      })),
      borderColor: '#FFC700',
      backgroundColor: 'rgba(255, 199, 0, 0.1)',
      borderWidth: 2,
      pointRadius: 3,
      pointHoverRadius: 5,
      fill: false,
      tension: 0.4,
      yAxisID: 'y-pressure',
    });
  }

  return { datasets };
}

/**
 * Chart options configuration
 */
function getChartOptions(): ChartOptions<'line'> {
  return {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 12,
            weight: '600',
          },
        },
        onClick: (e, legendItem, legend) => {
          // Toggle dataset visibility
          const index = legendItem.datasetIndex!;
          const chart = legend.chart;
          const meta = chart.getDatasetMeta(index);
          meta.hidden = meta.hidden === null ? !chart.data.datasets[index].hidden : null;
          chart.update();
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 13,
          weight: 'bold',
        },
        bodyFont: {
          size: 12,
        },
        bodySpacing: 6,
        usePointStyle: true,
        callbacks: {
          title: (tooltipItems) => {
            const date = new Date(tooltipItems[0].parsed.x);
            return date.toLocaleString();
          },
          label: (context) => {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            if (value === null) return `${label}: N/A`;
            return `${label}: ${value.toFixed(1)}`;
          },
        },
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'minute',
          displayFormats: {
            minute: 'HH:mm',
            hour: 'HH:mm',
            day: 'MMM dd',
          },
        },
        title: {
          display: true,
          text: 'Time',
          font: {
            size: 12,
            weight: 'bold',
          },
        },
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      'y-percentage': {
        type: 'linear',
        display: props.showBattery || props.showSignal || props.showHumidity,
        position: 'left',
        min: 0,
        max: 100,
        title: {
          display: true,
          text: 'Percentage (%)',
          font: {
            size: 12,
            weight: 'bold',
          },
        },
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      'y-temperature': {
        type: 'linear',
        display: props.showTemperature,
        position: 'right',
        title: {
          display: true,
          text: 'Temperature (°C)',
          font: {
            size: 12,
            weight: 'bold',
          },
        },
        grid: {
          display: false,
        },
      },
      'y-pressure': {
        type: 'linear',
        display: props.showPressure,
        position: 'right',
        title: {
          display: true,
          text: 'Pressure (hPa)',
          font: {
            size: 12,
            weight: 'bold',
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };
}

/**
 * Initialize chart
 */
function initChart() {
  if (!chartCanvas.value) return;

  const config: ChartConfiguration<'line'> = {
    type: 'line',
    data: prepareChartData(),
    options: getChartOptions(),
  };

  chartInstance = new Chart(chartCanvas.value, config);
}

/**
 * Update chart with new data
 */
function updateChart() {
  if (!chartInstance) return;

  chartInstance.data = prepareChartData();
  chartInstance.options = getChartOptions();
  chartInstance.update('none'); // Update without animation for smooth transitions
}

/**
 * Destroy chart
 */
function destroyChart() {
  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }
}

// Lifecycle hooks
onMounted(() => {
  initChart();
});

onBeforeUnmount(() => {
  destroyChart();
});

// Watch for data changes
watch(() => props.data, () => {
  updateChart();
}, { deep: true });

// Watch for visibility toggles
watch(
  () => [props.showBattery, props.showSignal, props.showTemperature, props.showHumidity, props.showPressure],
  () => {
    updateChart();
  }
);
</script>

<style scoped lang="scss">
.device-history-chart {
  width: 100%;
  height: v-bind('height + "px"');
  position: relative;
  background: var(--bs-card-bg);
  border-radius: var(--bs-border-radius);
  padding: 1rem;
  
  canvas {
    max-width: 100%;
    max-height: 100%;
  }
}

// Dark mode support
@media (prefers-color-scheme: dark) {
  .device-history-chart {
    background: var(--bs-body-bg);
  }
}
</style>
