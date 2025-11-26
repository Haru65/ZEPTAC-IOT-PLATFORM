<template>
  <div class="w-100">
    <!-- Header with Export Actions -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 class="page-heading">Device Reports</h1>
        <p class="text-muted">Generate and export telemetry data reports</p>
      </div>
      <div class="d-flex gap-2">
        <button
          class="btn btn-success"
          @click="exportToExcel"
          :disabled="exportLoading || telemetryData.length === 0"
        >
          <i :class="exportLoading ? 'bi bi-arrow-clockwise spinning me-2' : 'bi bi-file-earmark-spreadsheet me-2'"></i>
          {{ exportLoading ? 'Exporting...' : 'Export to Excel' }}
        </button>
        <button
          class="btn btn-primary"
          @click="exportPDF"
          :disabled="telemetryData.length === 0"
        >
          <i class="bi bi-file-earmark-pdf me-2"></i>
          Export PDF
        </button>
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="row g-4 mb-4">
      <div class="col-lg-3 col-md-6">
        <div class="card">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <div class="symbol symbol-50px me-3">
                <span class="symbol-label bg-light-primary">
                  <i class="bi bi-file-text fs-2x text-primary"></i>
                </span>
              </div>
              <div>
                <div class="fs-7 text-muted">Total Records</div>
                <div class="fs-2 fw-bold">{{ totalRecords.toLocaleString() }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-6">
        <div class="card">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <div class="symbol symbol-50px me-3">
                <span class="symbol-label bg-light-success">
                  <i class="bi bi-hdd-network fs-2x text-success"></i>
                </span>
              </div>
              <div>
                <div class="fs-7 text-muted">Active Devices</div>
                <div class="fs-2 fw-bold">{{ uniqueDevices }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-6">
        <div class="card">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <div class="symbol symbol-50px me-3">
                <span class="symbol-label bg-light-warning">
                  <i class="bi bi-calendar-range fs-2x text-warning"></i>
                </span>
              </div>
              <div>
                <div class="fs-7 text-muted">Date Range</div>
                <div class="fs-6 fw-bold">{{ dateRangeDisplay }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-6">
        <div class="card">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <div class="symbol symbol-50px me-3">
                <span class="symbol-label bg-light-info">
                  <i class="bi bi-clock-history fs-2x text-info"></i>
                </span>
              </div>
              <div>
                <div class="fs-7 text-muted">Last Updated</div>
                <div class="fs-7 fw-bold">{{ lastUpdated }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters and Data Table Section -->
    <div class="card mb-4">
      <div class="card-header">
        <h3 class="card-title">Telemetry Data</h3>
        <div class="card-toolbar">
          <div class="d-flex align-items-center gap-3 flex-wrap">
            <select 
              v-model="selectedDevice" 
              @change="loadTelemetryData" 
              class="form-select form-select-sm" 
              style="width: 200px;"
            >
              <option value="">All Devices</option>
              <option v-for="device in devices" :key="device.deviceId" :value="device.deviceId">
                {{ device.name }} ({{ device.deviceId }})
              </option>
            </select>
            <input 
              v-model="startDate" 
              @change="loadTelemetryData" 
              type="date" 
              class="form-control form-control-sm" 
              style="width: 150px;"
            >
            <input 
              v-model="endDate" 
              @change="loadTelemetryData" 
              type="date" 
              class="form-control form-control-sm" 
              style="width: 150px;"
            >
            <select 
              v-model="dataLimit" 
              @change="loadTelemetryData" 
              class="form-select form-select-sm" 
              style="width: 120px;"
            >
              <option :value="50">50 records</option>
              <option :value="100">100 records</option>
              <option :value="500">500 records</option>
              <option :value="1000">1000 records</option>
            </select>
            <button 
              @click="loadTelemetryData" 
              class="btn btn-sm btn-primary" 
              :disabled="loading"
            >
              <i :class="loading ? 'bi bi-arrow-clockwise spinning' : 'bi bi-arrow-clockwise'"></i>
              Refresh
            </button>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-3 text-muted">Loading telemetry data...</p>
        </div>
        
        <div v-else-if="telemetryData.length === 0" class="text-center py-5">
          <i class="bi bi-inbox fs-1 text-muted"></i>
          <p class="mt-3 text-muted fs-5">No telemetry data found</p>
          <p class="text-muted">Try adjusting your filters or date range</p>
        </div>

        <div v-else>
          <!-- Data Table with Horizontal Scroll Container -->
          <div style="max-width: 100%; overflow-x: auto;">
            <table class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4" style="min-width: 800px;">
              <thead>
                <tr class="fw-bold text-muted bg-light">
                  <th class="ps-4" style="min-width: 120px; position: sticky; left: 0; background: #f3f6f9; z-index: 1;">Device ID</th>
                  <th style="min-width: 150px;">Timestamp</th>
                  <th style="min-width: 100px;">Event</th>
                  <th style="min-width: 120px;" v-for="field in dataFields" :key="field">
                    {{ formatFieldName(field) }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="record in displayedData" :key="record._id">
                  <td class="ps-4" style="position: sticky; left: 0; background: white; z-index: 1;">
                    <span class="badge badge-light-primary">{{ record.deviceId }}</span>
                  </td>
                  <td>
                    <div class="d-flex flex-column">
                      <span class="fw-bold">{{ formatDate(record.timestamp) }}</span>
                      <span class="text-muted fs-7">{{ formatTime(record.timestamp) }}</span>
                    </div>
                  </td>
                  <td>
                    <span :class="getEventBadgeClass(record.event)">{{ record.event }}</span>
                  </td>
                  <td v-for="field in dataFields" :key="field">
                    {{ formatDataValue(getDataField(record, field)) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div class="d-flex justify-content-between align-items-center mt-4 flex-wrap gap-2">
            <span class="text-muted">
              Showing {{ displayedData.length }} of {{ telemetryData.length }} records
            </span>
            <div v-if="telemetryData.length >= dataLimit" class="text-warning">
              <i class="bi bi-info-circle"></i>
              Limited to {{ dataLimit }} records. Use filters or export for complete data.
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="row g-4">
      <div class="col-lg-12">
        <TemperatureHumidityChart
          widget-classes="card-xl-stretch mb-4"
          :height="300"
        />
      </div>
      <div class="col-lg-12">
        <EnergyConsumption
          widget-classes="card-xl-stretch mb-4"
          :height="300"
        />
      </div>
    </div>
  </div>
</template>
    
<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuthStore } from "@/stores/auth";
import ApiService from "@/core/services/ApiService";
import TemperatureHumidityChart from "./TemperatureHumidityChart.vue";
import EnergyConsumption from "./EnergyConsumption.vue";

export default defineComponent({
  name: "reports",
  components: {
    TemperatureHumidityChart,
    EnergyConsumption,
  },
  setup() {
    const exportLoading = ref(false);
    const loading = ref(false);
    const authStore = useAuthStore();
    
    // Data and filters
    const telemetryData = ref<any[]>([]);
    const devices = ref<any[]>([]);
    const selectedDevice = ref('');
    const startDate = ref(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
    const endDate = ref(new Date().toISOString().split('T')[0]);
    const dataLimit = ref(100);

    // Computed properties
    const totalRecords = computed(() => telemetryData.value.length);
    const uniqueDevices = computed(() => {
      const deviceIds = new Set(telemetryData.value.map(r => r.deviceId));
      return deviceIds.size;
    });
    const dateRangeDisplay = computed(() => {
      if (!startDate.value || !endDate.value) return 'Not set';
      const days = Math.ceil((new Date(endDate.value).getTime() - new Date(startDate.value).getTime()) / (1000 * 60 * 60 * 24));
      return `${days} days`;
    });
    const lastUpdated = computed(() => {
      if (telemetryData.value.length === 0) return 'No data';
      return new Date().toLocaleTimeString();
    });

    // Get all unique data fields from telemetry records
    const dataFields = computed(() => {
      const fields = new Set<string>();
      telemetryData.value.forEach(record => {
        if (record.data) {
          const dataObj = record.data instanceof Map ? Object.fromEntries(record.data) : record.data;
          Object.keys(dataObj).forEach(key => fields.add(key));
        }
      });
      return Array.from(fields).sort();
    });

    const displayedData = computed(() => telemetryData.value.slice(0, dataLimit.value));

    // Load devices list
    const loadDevices = async () => {
      try {
        ApiService.setHeader();
        const response = await ApiService.get('/api/devices');
        
        // Handle both response formats: {devices: []} or {data: []}
        const deviceList = response.data?.devices || response.data?.data || [];
        
        if (Array.isArray(deviceList) && deviceList.length > 0) {
          devices.value = deviceList.filter(device => device && device.deviceId);
          console.log('✅ Loaded', devices.value.length, 'devices');
        } else {
          throw new Error('No devices found');
        }
      } catch (error) {
        console.error('❌ Error loading devices:', error);
        Swal.fire({
          title: 'Warning',
          text: 'Could not load devices list. You can still view all data.',
          icon: 'warning',
          confirmButtonText: 'OK'
        });
      }
    };

    // Load telemetry data from API
    const loadTelemetryData = async () => {
      try {
        loading.value = true;
        
        // Validate dates
        const start = new Date(startDate.value);
        const end = new Date(endDate.value);
        
        if (start > end) {
          Swal.fire({
            title: 'Invalid Date Range',
            text: 'Start date cannot be after end date.',
            icon: 'warning',
            confirmButtonText: 'OK'
          });
          loading.value = false;
          return;
        }

        const params = new URLSearchParams({
          startDate: startDate.value,
          endDate: endDate.value,
          limit: dataLimit.value.toString(),
          sort: '-timestamp'
        });

        if (selectedDevice.value && selectedDevice.value.trim() !== '') {
          params.append('deviceId', selectedDevice.value);
        }

        console.log('📊 Loading telemetry data:', params.toString());
        
        ApiService.setHeader();
        const response = await ApiService.get(`/api/telemetry?${params.toString()}`);
        
        if (response.data?.success && Array.isArray(response.data.data)) {
          telemetryData.value = response.data.data;
          console.log('✅ Loaded', telemetryData.value.length, 'records');
          
          if (telemetryData.value.length === 0) {
            Swal.fire({
              title: 'No Data Found',
              text: 'No telemetry data found for the selected filters. Try adjusting the date range or device filter.',
              icon: 'info',
              confirmButtonText: 'OK',
              timer: 3000
            });
          }
        } else {
          throw new Error('Invalid response format');
        }

      } catch (error: any) {
        console.error('❌ Error loading telemetry data:', error);
        telemetryData.value = [];
        
        Swal.fire({
          title: 'Error Loading Data',
          text: error.message || 'Failed to load telemetry data. Please check your connection and try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      } finally {
        loading.value = false;
      }
    };

    // Utility functions
    const formatDate = (timestamp: string) => {
      return new Date(timestamp).toLocaleDateString();
    };

    const formatTime = (timestamp: string) => {
      return new Date(timestamp).toLocaleTimeString();
    };

    const formatDataValue = (value: any) => {
      if (value === null || value === undefined) return '-';
      if (typeof value === 'number') return value.toFixed(2);
      return value.toString();
    };

    const formatFieldName = (field: string) => {
      return field.toUpperCase().replace(/_/g, ' ');
    };

    const getDataField = (record: any, field: string) => {
      if (!record.data) return null;
      const dataObj = record.data instanceof Map ? Object.fromEntries(record.data) : record.data;
      return dataObj[field];
    };

    const getEventBadgeClass = (event: string) => {
      const eventMap: Record<string, string> = {
        'NORMAL': 'badge badge-light-success',
        'WARNING': 'badge badge-light-warning',
        'ALERT': 'badge badge-light-danger',
        'ERROR': 'badge badge-light-danger',
        'INFO': 'badge badge-light-info'
      };
      return eventMap[event] || 'badge badge-light-secondary';
    };

    // Export to PDF
    const exportPDF = async () => {
      try {
        const chartsElement = document.querySelector('.row.g-4');
        if (!chartsElement) {
          throw new Error('Charts not found');
        }

        const canvas = await html2canvas(chartsElement as HTMLElement);
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({ orientation: "landscape" });
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);
        pdf.save(`telemetry_report_${new Date().toISOString().split('T')[0]}.pdf`);

        await Swal.fire({
          title: 'PDF Downloaded',
    // Export to Excel - Production Grade
    const exportToExcel = async () => {
      try {
        exportLoading.value = true;

        if (!authStore.isAuthenticated) {
          throw new Error('You must be logged in to export data.');
        }

        // Ensure devices are loaded
        if (devices.value.length === 0) {
          await loadDevices();
        }

        // Show configuration dialog
        const { value: exportConfig } = await Swal.fire({
          title: 'Export Telemetry Data',
          html: `
            <div class="text-start">
              <div class="mb-3">
                <label for="export-start-date" class="form-label fw-bold">Start Date</label>
                <input type="date" id="export-start-date" class="form-control" value="${startDate.value}">
              </div>
              <div class="mb-3">
                <label for="export-end-date" class="form-label fw-bold">End Date</label>
                <input type="date" id="export-end-date" class="form-control" value="${endDate.value}">
              </div>
              <div class="mb-3">
                <label for="export-device-id" class="form-label fw-bold">Device Filter</label>
                <select id="export-device-id" class="form-select">
                  <option value="">All Devices</option>
                  ${devices.value.map(d => `<option value="${d.deviceId}" ${selectedDevice.value === d.deviceId ? 'selected' : ''}>${d.name || d.deviceId} (${d.deviceId})</option>`).join('')}
                </select>
              </div>
              <div class="alert alert-info d-flex align-items-center">
                <i class="bi bi-info-circle me-2"></i>
                <small>Export will include all telemetry data for the selected period in Excel format.</small>
              </div>
            </div>
          `,
          focusConfirm: false,
          showCancelButton: true,
          confirmButtonText: '<i class="bi bi-download me-2"></i>Export',
          cancelButtonText: 'Cancel',
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-secondary"
          },
          width: '500px',
          preConfirm: () => {
            const exportStartDate = (document.getElementById('export-start-date') as HTMLInputElement).value;
            const exportEndDate = (document.getElementById('export-end-date') as HTMLInputElement).value;
            const exportDeviceId = (document.getElementById('export-device-id') as HTMLSelectElement).value;

            if (!exportStartDate || !exportEndDate) {
              Swal.showValidationMessage('Please select both start and end dates');
              return false;
            }

            if (new Date(exportStartDate) > new Date(exportEndDate)) {
              Swal.showValidationMessage('Start date cannot be after end date');
              return false;
            }

            return { startDate: exportStartDate, endDate: exportEndDate, deviceId: exportDeviceId };
          }
        });

        if (!exportConfig) {
          exportLoading.value = false;
          return;
        }

        // Show progress
        Swal.fire({
          title: 'Exporting Data',
          html: 'Please wait while we generate your Excel file...',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

        // Prepare API call
        const API_BASE_URL = (import.meta.env.VITE_APP_API_URL || 'http://localhost:3001').replace(/\/$/, '');
        const params = new URLSearchParams({
          startDate: exportConfig.startDate,
          endDate: exportConfig.endDate,
          format: 'download'
        });

        if (exportConfig.deviceId && exportConfig.deviceId.trim() !== '') {
          params.append('deviceId', exportConfig.deviceId);
        }

        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('Authentication token not found. Please login again.');
        }

        console.log('📤 Export URL:', `${API_BASE_URL}/export/telemetry/excel?${params.toString()}`);

        // Make API call
        const response = await axios.get(`${API_BASE_URL}/export/telemetry/excel?${params.toString()}`, {
          responseType: 'blob',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          timeout: 120000 // 2 minute timeout for large exports
        });

        // Check if response is actually an error message
        if (response.data.type === 'application/json') {
          const text = await response.data.text();
          const errorData = JSON.parse(text);
          throw new Error(errorData.error || 'Export failed');
        }

        // Create download
        const blob = new Blob([response.data], { 
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        
        // Extract filename from headers or use default
        const contentDisposition = response.headers['content-disposition'];
        let filename = `telemetry_export_${exportConfig.startDate}_to_${exportConfig.endDate}.xlsx`;
        if (contentDisposition) {
          const filenameMatch = contentDisposition.match(/filename="(.+)"/);
          if (filenameMatch) {
            filename = filenameMatch[1];
          }
        }
        
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        // Success message
        await Swal.fire({
          title: 'Export Successful!',
          html: `
            <div class="text-center">
              <i class="bi bi-check-circle text-success" style="font-size: 3rem;"></i>
              <p class="mt-3">Your Excel file has been downloaded successfully.</p>
              <p class="text-muted small">File: ${filename}</p>
            </div>
          `,
          icon: 'success',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: "btn btn-success"
          },
          timer: 5000
        });

      } catch (error: any) {
        console.error('❌ Export error:', error);
        
        let errorMessage = 'Failed to export data. Please try again.';
        
        if (error.message && error.message.includes('Authentication token')) {
          errorMessage = 'Session expired. Please login again.';
        } else if (error.response) {
          if (error.response.status === 401) {
            errorMessage = 'Authentication failed. Please login again.';
          } else if (error.response.status === 403) {
            errorMessage = 'You do not have permission to export data.';
          } else if (error.response.status === 404) {
            errorMessage = 'Export service not found. Please contact support.';
          } else if (error.response.status >= 500) {
            errorMessage = 'Server error. Please try again later.';
          } else if (error.response.data && error.response.data.error) {
            errorMessage = error.response.data.error;
          }
        } else if (error.code === 'ECONNABORTED') {
          errorMessage = 'Export timeout. Try exporting a smaller date range.';
        } else if (error.message) {
          errorMessage = error.message;
        }

        await Swal.fire({
          title: 'Export Failed',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: "btn btn-danger"
          }
        });
      } finally {
        exportLoading.value = false;
      }
    };  } else if (error.message) {
          errorMessage = error.message;
        }

        await Swal.fire({
          title: 'Export Failed',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: "btn btn-danger"
          }
        });
      } finally {
        exportLoading.value = false;
      }
    };

    // Initialize
    onMounted(async () => {
      console.log('📊 Reports module initialized');
      await loadDevices();
      await loadTelemetryData();
    });

    return {
      // Export functions
      exportPDF,
      exportToExcel,
      exportLoading,
      
      // Data and state
      telemetryData,
      devices,
      selectedDevice,
      startDate,
      endDate,
      dataLimit,
      loading,
      
      // Computed
      totalRecords,
      uniqueDevices,
      dateRangeDisplay,
      lastUpdated,
      dataFields,
      displayedData,
      
      // Functions
      loadTelemetryData,
      formatDate,
      formatTime,
      formatDataValue,
      formatFieldName,
      getDataField,
      getEventBadgeClass
    };
  },
});
</script>

<style scoped>
.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>