<template>
  <div :class="widgetClasses" class="card h-auto">
    <!-- Chart Header -->
    <div class="card-header border-0 pt-5">
      <div class="d-flex justify-content-between align-items-start mb-3">
        <div class="flex-grow-1">
          <h3 class="card-title align-items-start flex-column">
            <span class="card-label fw-bold fs-3 mb-1 text-gray-800"
              >Device Parameters</span
            >
            <span class="text-muted mt-1 fw-semibold fs-7"
              >Real-time device measurements</span
            >
          </h3>
        </div>
        <!-- Device Filter -->
        <div class="ms-3" style="min-width: 250px;">
          <label class="form-label fw-semibold fs-7 mb-2">Filter by Device</label>
          <select 
            class="form-select form-select-sm" 
            v-model="selectedDeviceFilter"
            @change="onDeviceFilterChange"
          >
            <option value="">All Devices</option>
            <option 
              v-for="device in availableDevices" 
              :key="device" 
              :value="device"
            >
              {{ device }}
            </option>
          </select>
        </div>
      </div>
      <!-- Time Period Tabs -->
      <ul class="nav nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-6">
        <li class="nav-item">
          <a
            href="#"
            class="nav-link"
            :class="{ active: timePeriod === '24h' }"
            @click.prevent="setTimePeriod('24h')"
            >24h</a
          >
        </li>
        <li class="nav-item">
          <a
            href="#"
            class="nav-link"
            :class="{ active: timePeriod === '7d' }"
            @click.prevent="setTimePeriod('7d')"
            >7d</a
          >
        </li>
        <li class="nav-item">
          <a
            href="#"
            class="nav-link"
            :class="{ active: timePeriod === '30d' }"
            @click.prevent="setTimePeriod('30d')"
            >30d</a
          >
        </li>
      </ul>
    </div>

    <!-- Parameter Filter - Single Select -->
    <div class="card-body py-3 border-bottom">
      <div class="d-flex align-items-center gap-3 flex-wrap">
        <label class="text-muted fw-semibold fs-7 mb-0" style="min-width: 120px;">Select Parameter:</label>
        <select 
          v-model="selectedParameter" 
          class="form-select form-select-sm"
          style="max-width: 250px;"
        >
          <option value="">-- Select a Parameter --</option>
          <option 
            v-for="param in parameters" 
            :key="param.key" 
            :value="param.key"
          >
            {{ param.label }} ({{ param.unit }})
          </option>
        </select>
        <div v-if="selectedParameter" class="ms-auto">
          <span class="badge" :class="`bg-${getSelectedParameterColor()}`">
            <i class="bi bi-graph-up me-1"></i>
            {{ getSelectedParameterLabel() }}
          </span>
        </div>
      </div>
      <!-- Parameter Info Display -->
      <div v-if="selectedParameter" class="mt-3 p-2 bg-light rounded">
        <div class="row g-2">
          <div class="col-auto">
            <small class="text-muted">
              <i class="bi bi-rulers me-1"></i>
              <strong>Range:</strong> {{ getSelectedParameterRange() }}
            </small>
          </div>
          <div class="col-auto">
            <small class="text-muted">
              <i class="bi bi-diagram-3 me-1"></i>
              <strong>Unit:</strong> {{ getSelectedParameterUnit() }}
            </small>
          </div>
          <div class="col-auto">
            <small class="text-muted">
              <i class="bi bi-graph-up me-1"></i>
              <strong>Data Points:</strong> {{ dataPointsCount }}
            </small>
          </div>
        </div>
      </div>
    </div>

    <!-- Chart Body -->
    <div>
      <apexchart
        ref="deviceChartRef"
        type="line"
        :height="height"
        :options="chartOptions"
        :series="chartSeries"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, onMounted, watch } from "vue";
import type { ApexOptions } from "apexcharts";
import VueApexCharts from "vue3-apexcharts";
import { getCSSVariableValue } from "@/assets/ts/_utils";
import ApiService from "@/core/services/ApiService";

export default defineComponent({
  name: "DeviceParametersChart",
  props: {
    widgetClasses: String,
    height: Number,
    deviceFilter: String,
    telemetryData: {
      type: Array,
      default: () => []
    },
    dateRange: {
      type: Object,
      default: () => ({ startDate: '', endDate: '' })
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  components: {
    apexchart: VueApexCharts,
  },
  emits: ['deviceFilterChange'],
  setup(props, { emit }) {
    const deviceChartRef = ref<typeof VueApexCharts | null>(null);
    const timePeriod = ref("7d");
    const deviceData = ref<any[]>([]);
    const selectedDeviceFilter = ref(props.deviceFilter || "");
    const allDevicesList = ref<any[]>([]); // Store all available devices from API
    
    // Available devices for filtering - from both telemetry data and device list
    const availableDevices = computed(() => {
      const devices = new Set<string>();
      
      // Add devices from telemetry data
      deviceData.value.forEach(item => {
        if (item.deviceId) {
          devices.add(item.deviceId);
        }
      });
      
      // Add devices from devices list API (fallback/supplement)
      allDevicesList.value.forEach(device => {
        if (device.deviceId) {
          devices.add(device.deviceId);
        }
      });
      
      return Array.from(devices).sort();
    });
    
    const onDeviceFilterChange = () => {
      emit('deviceFilterChange', selectedDeviceFilter.value);
    };
    
    // Watch for prop changes and update local state
    watch(() => props.deviceFilter, (newValue) => {
      if (newValue !== undefined && newValue !== null) {
        selectedDeviceFilter.value = newValue;
      }
    });
    
    // Fetch all devices from API for filter dropdown
    const loadDevicesList = async () => {
      try {
        ApiService.setHeader();
        const response = await ApiService.get('/api/devices');
        
        const deviceList = response.data?.devices || response.data?.data || [];
        if (Array.isArray(deviceList)) {
          allDevicesList.value = deviceList;
          console.log('📱 Loaded', deviceList.length, 'devices for filter');
        }
      } catch (error) {
        console.warn('⚠️ Could not load devices list:', error);
        allDevicesList.value = [];
      }
    };
    
    // Parameter toggle states
    const parameters = ref([
      { key: "ref1", label: "REF1", unit: "V", enabled: false, color: "primary", min: -5, max: 5 },
      { key: "ref2", label: "REF2", unit: "V", enabled: false, color: "success", min: -5, max: 5 },
      { key: "ref3", label: "REF3", unit: "V", enabled: false, color: "info", min: -5, max: 5 },
      { key: "dcv", label: "DCV", unit: "VDC", enabled: false, color: "warning", min: 0, max: 101 },
      { key: "dci", label: "DCI", unit: "A", enabled: false, color: "danger", min: 0, max: 1000 },
      { key: "acv", label: "ACV", unit: "VAC", enabled: false, color: "purple", min: 0, max: 400 },
    ]);

    const selectedParameter = ref("");

    const fetchDeviceData = async () => {
      try {
        // Check if telemetry data is provided from parent (Reports page)
        if (props.telemetryData && Array.isArray(props.telemetryData) && props.telemetryData.length > 0) {
          console.log('📊 Using telemetry data from parent (Reports page):', props.telemetryData.length, 'records');
          
          // Transform the provided telemetry data
          deviceData.value = props.telemetryData.map((item: any) => {
            // Data fields are already flattened at the top level
            return {
              timestamp: item.timestamp,
              deviceId: item.deviceId,
              ref1: item.ref1 || item.REF1 || 0,
              ref2: item.ref2 || item.REF2 || 0,
              ref3: item.ref3 || item.REF3 || 0,
              dcv: item.dcv || item.DCV || 0,
              dci: item.dci || item.DCI || 0,
              acv: item.acv || item.ACV || 0
            };
          });
          console.log('✅ Processed', deviceData.value.length, 'telemetry records for chart');
          return;
        }
        
        // Fallback: Fetch data from API if no telemetry data provided
        console.log('⚠️ No telemetry data provided, fetching from API...');
        
        // Calculate date range based on time period
        const now = new Date();
        const startDate = new Date();
        
        switch (timePeriod.value) {
          case '24h':
            startDate.setHours(now.getHours() - 24);
            break;
          case '7d':
            startDate.setDate(now.getDate() - 7);
            break;
          case '30d':
            startDate.setDate(now.getDate() - 30);
            break;
          default:
            startDate.setHours(now.getHours() - 24);
        }

        const params = new URLSearchParams({
          startDate: startDate.toISOString().split('T')[0],
          endDate: now.toISOString().split('T')[0],
          limit: '100',
          sort: 'timestamp'
        });

        ApiService.setHeader();
        const response = await ApiService.get(`/api/telemetry?${params.toString()}`);
        
        if (response.data?.success && Array.isArray(response.data.data)) {
          // Extract ref1, ref2, ref3, dcv, dci, acv from the data Map
          deviceData.value = response.data.data.map((item: any) => {
            const dataMap = item.data || {};
            return {
              timestamp: item.timestamp,
              deviceId: item.deviceId,
              ref1: dataMap.ref1 || dataMap.REF1 || 0,
              ref2: dataMap.ref2 || dataMap.REF2 || 0,
              ref3: dataMap.ref3 || dataMap.REF3 || 0,
              dcv: dataMap.dcv || dataMap.DCV || 0,
              dci: dataMap.dci || dataMap.DCI || 0,
              acv: dataMap.acv || dataMap.ACV || 0
            };
          });
          console.log('📊 Device Parameters Data:', deviceData.value.length, 'records');
          console.log('📊 Available Devices:', availableDevices.value);
        } else {
          console.warn('⚠️ No telemetry data received or invalid response format');
          deviceData.value = [];
        }
      } catch (error) {
        console.error("❌ Error fetching device data:", error);
        deviceData.value = [];
      }
    };

    const toggleParameter = (key: string) => {
      const param = parameters.value.find(p => p.key === key);
      if (param) {
        param.enabled = !param.enabled;
      }
    };

    const allEnabled = computed(() => {
      return parameters.value.every(p => p.enabled);
    });

    const toggleAll = () => {
      const shouldEnable = !allEnabled.value;
      parameters.value.forEach(p => {
        p.enabled = shouldEnable;
      });
    };

    // Get selected parameter info
    const getSelectedParameterInfo = () => {
      return parameters.value.find(p => p.key === selectedParameter.value);
    };

    const getSelectedParameterLabel = () => {
      const param = getSelectedParameterInfo();
      return param ? param.label : "";
    };

    const getSelectedParameterUnit = () => {
      const param = getSelectedParameterInfo();
      return param ? param.unit : "";
    };

    const getSelectedParameterColor = () => {
      const param = getSelectedParameterInfo();
      return param ? param.color : "primary";
    };

    const getSelectedParameterRange = () => {
      const param = getSelectedParameterInfo();
      if (!param) return "";
      return `${param.min} to ${param.max} ${param.unit}`;
    };

    const dataPointsCount = computed(() => {
      if (!selectedParameter.value) return 0;
      const filteredData = selectedDeviceFilter.value
        ? deviceData.value.filter(item => String(item.deviceId) === String(selectedDeviceFilter.value))
        : deviceData.value;
      return filteredData.length;
    });

    onMounted(() => {
      loadDevicesList();
      fetchDeviceData();
    });

    // Watch for telemetry data changes from parent
    watch(() => props.telemetryData, (newData) => {
      if (newData && Array.isArray(newData) && newData.length > 0) {
        console.log('🔄 Telemetry data updated from parent, refreshing chart...');
        fetchDeviceData();
      }
    }, { deep: true });

    const chartSeries = computed(() => {
      // If no parameter is selected, return empty series
      if (!selectedParameter.value) {
        return [];
      }

      // Filter data based on selected device
      const filteredData = selectedDeviceFilter.value
        ? deviceData.value.filter(item => String(item.deviceId) === String(selectedDeviceFilter.value))
        : deviceData.value;
      
      const dataArray: number[] = [];

      // Get data for the selected parameter only
      filteredData.forEach((item) => {
        const value = parseFloat(item[selectedParameter.value as keyof typeof item]) || 0;
        dataArray.push(value);
      });

      // Get the parameter info for the label
      const paramInfo = getSelectedParameterInfo();
      const label = paramInfo ? `${paramInfo.label} (${paramInfo.unit})` : selectedParameter.value;

      // Return single series with the selected parameter
      return [{
        name: label,
        data: dataArray
      }];
    });

    const chartOptions = computed<ApexOptions>(() => {
      const labelColor = "gray";
      const gridColor = getCSSVariableValue("--bs-gray-500");
      
      // Get the selected parameter info for Y-axis configuration
      const selectedParamInfo = getSelectedParameterInfo();
      
      // Generate colors based on selected parameter
      let colors: string[] = [];
      if (selectedParameter.value && selectedParamInfo) {
        const colorMap: Record<string, string> = {
          primary: getCSSVariableValue("--bs-primary"),
          success: getCSSVariableValue("--bs-success"),
          info: getCSSVariableValue("--bs-info"),
          warning: getCSSVariableValue("--bs-warning"),
          danger: getCSSVariableValue("--bs-danger"),
          purple: getCSSVariableValue("--bs-purple"),
        };
        colors = [colorMap[selectedParamInfo.color] || getCSSVariableValue("--bs-primary")];
      }

      return {
        chart: {
          fontFamily: "inherit",
          type: "line",
          height: 350,
          toolbar: {
            show: true,
            offsetY: -5,
            tools: {
              download: true,
              selection: true,
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: true,
              reset: true,
            },
          },
          zoom: {
            enabled: true,
          },
        },
        colors: colors,
        stroke: {
          curve: "smooth",
          width: 3,
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 4,
          strokeWidth: 2,
          hover: {
            size: 6,
          },
        },
        legend: {
          show: true,
          position: "top",
          horizontalAlign: "left",
          offsetX: 0,
          offsetY: 0,
          labels: {
            colors: labelColor,
          },
          markers: {
            width: 8,
            height: 8,
          },
          itemMargin: {
            horizontal: 10,
            vertical: 5,
          },
        },
        xaxis: {
          categories: deviceData.value.map((item) => {
            const date = new Date(item.timestamp);
            return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
          }),
          labels: {
            style: {
              colors: labelColor,
              fontSize: "12px",
            },
            rotate: -45,
            rotateAlways: false,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          min: selectedParamInfo?.min || undefined,
          max: selectedParamInfo?.max || undefined,
          tickAmount: 5,
          labels: {
            style: {
              colors: labelColor,
              fontSize: "12px",
            },
            formatter: (value) => {
              return value?.toFixed(2) || "0.00";
            },
          },
          title: {
            text: selectedParamInfo ? `${selectedParamInfo.label} (${selectedParamInfo.unit})` : "",
            style: {
              color: labelColor,
              fontSize: "12px",
              fontWeight: 600,
            },
          },
        },
        grid: {
          borderColor: gridColor,
          strokeDashArray: 4,
          yaxis: {
            lines: {
              show: true,
            },
          },
        },
        tooltip: {
          style: {
            fontSize: "12px",
          },
          y: {
            formatter: (value) => {
              return value?.toFixed(2) || "0.00";
            },
            title: {
              formatter: () => selectedParamInfo?.label || "Value",
            },
          },
          marker: {
            show: true,
          },
        },
        noData: {
          text: selectedParameter.value ? "No data available for selected parameter" : "Please select a parameter to view",
          align: "center",
          verticalAlign: "middle",
          offsetY: 0,
          style: {
            color: labelColor,
            fontSize: "14px",
          },
        },
      };
    });

    const setTimePeriod = (period: string) => {
      timePeriod.value = period;
      fetchDeviceData();
    };

    return {
      deviceChartRef,
      timePeriod,
      parameters,
      chartSeries,
      chartOptions,
      setTimePeriod,
      toggleParameter,
      allEnabled,
      toggleAll,
      selectedDeviceFilter,
      availableDevices,
      onDeviceFilterChange,
      selectedParameter,
      getSelectedParameterLabel,
      getSelectedParameterColor,
      getSelectedParameterRange,
      getSelectedParameterUnit,
      dataPointsCount,
    };
  },
});
</script>

<style scoped>
.parameter-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
  gap: 8px;
  width: 100%;
}

.parameter-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border: 1.5px solid transparent;
  border-radius: 6px;
  background: #f8f9fa;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  box-sizing: border-box;
}

.parameter-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.parameter-btn-inactive {
  background: #f8f9fa;
  border-color: #e4e6ef;
  opacity: 0.6;
}

.parameter-btn-inactive:hover {
  opacity: 0.8;
  border-color: #d1d3e0;
}

.parameter-btn-active {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.parameter-btn-active.parameter-btn-primary {
  border-color: var(--bs-primary);
}

.parameter-btn-active.parameter-btn-success {
  border-color: var(--bs-success);
}

.parameter-btn-active.parameter-btn-info {
  border-color: var(--bs-info);
}

.parameter-btn-active.parameter-btn-warning {
  border-color: var(--bs-warning);
}

.parameter-btn-active.parameter-btn-danger {
  border-color: var(--bs-danger);
}

.parameter-btn-active.parameter-btn-purple {
  border-color: #6f42c1;
}

.parameter-icon {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 11px;
  flex-shrink: 0;
}

.bg-primary {
  background-color: var(--bs-primary) !important;
}

.bg-success {
  background-color: var(--bs-success) !important;
}

.bg-info {
  background-color: var(--bs-info) !important;
}

.bg-warning {
  background-color: var(--bs-warning) !important;
}

.bg-danger {
  background-color: var(--bs-danger) !important;
}

.bg-purple {
  background-color: #6f42c1 !important;
}

.parameter-label {
  display: flex;
  flex-direction: column;
  gap: 1px;
  flex: 1;
}

.parameter-name {
  font-weight: 600;
  font-size: 11px;
  color: #181c32;
}

.parameter-status {
  font-size: 9px;
  color: #a1a5b7;
}

.parameter-status i {
  font-size: 11px;
}

.btn-light-primary {
  background-color: rgba(var(--bs-primary-rgb), 0.1);
  color: var(--bs-primary);
  border: 1px solid transparent;
  font-size: 12px;
  padding: 6px 12px;
}

.btn-light-primary:hover {
  background-color: rgba(var(--bs-primary-rgb), 0.2);
  color: var(--bs-primary);
}

/* Styles for parameter filter section */
.form-select-sm {
  font-size: 0.875rem;
  padding: 0.375rem 2.25rem 0.375rem 0.75rem;
}

.badge {
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.bg-light {
  background-color: #f8f9fa !important;
}

.rounded {
  border-radius: 0.375rem !important;
}

small {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

@media (max-width: 992px) {
  .parameter-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 12px;
  }
}

@media (max-width: 768px) {
  .parameter-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  
  .parameter-btn {
    padding: 10px 12px;
    gap: 10px;
  }
  
  .parameter-icon {
    width: 32px;
    height: 32px;
    font-size: 14px;
  }
  
  .parameter-name {
    font-size: 13px;
  }
  
  .d-flex.align-items-center.gap-3.flex-wrap {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .form-select-sm {
    width: 100% !important;
    max-width: 100% !important;
  }
}

@media (max-width: 480px) {
  .parameter-grid {
    grid-template-columns: 1fr;
  }
}
</style>
