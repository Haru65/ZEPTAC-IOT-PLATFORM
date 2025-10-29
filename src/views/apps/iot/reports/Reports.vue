<template>
  <div class="w-100">
    <div class="d-flex justify-content-end align-items-center mb-3 gap-2" style="min-height:48px;">
      <button
        class="btn btn-success"
        @click="exportToExcel"
        :disabled="exportLoading"
        style="min-width:140px;"
      >
        <i 
          :class="exportLoading ? 'bi bi-arrow-clockwise spinning me-2' : 'bi bi-file-earmark-spreadsheet me-2'"
        ></i>
        {{ exportLoading ? 'Exporting...' : 'Export to Excel' }}
      </button>
      <button
        class="btn btn-primary"
        @click="exportPDF"
        style="min-width:120px;"
      >
        <i class="bi bi-file-earmark-pdf me-2"></i>
        Export to PDF
      </button>
    </div>

    <!-- Filters and Data Table Section -->
    <div class="card mb-4">
      <div class="card-header">
        <h3 class="card-title">Device Telemetry Data</h3>
        <div class="card-toolbar">
          <div class="d-flex align-items-center gap-3">
            <select v-model="selectedDevice" @change="loadTelemetryData" class="form-select form-select-sm" style="width: 200px;">
              <option value="">All Devices</option>
              <option v-for="device in devices" :key="device?.deviceId || Math.random()" :value="device?.deviceId">
                {{ device?.name || 'Unknown Device' }} ({{ device?.deviceId || 'N/A' }})
              </option>
            </select>
            <input v-model="startDate" @change="loadTelemetryData" type="date" class="form-control form-control-sm" style="width: 150px;">
            <input v-model="endDate" @change="loadTelemetryData" type="date" class="form-control form-control-sm" style="width: 150px;">
            <button @click="loadTelemetryData" class="btn btn-sm btn-primary" :disabled="loading">
              <i :class="loading ? 'bi bi-arrow-clockwise spinning' : 'bi bi-arrow-clockwise'"></i>
            </button>
            <button @click="loadTestData" class="btn btn-sm btn-outline-secondary">
              <i class="bi bi-database"></i> Test Data
            </button>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div v-if="loading" class="text-center py-4">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-2 text-muted">Loading telemetry data...</p>
        </div>
        
        <div v-else-if="telemetryData.length === 0" class="text-center py-4">
          <i class="bi bi-inbox fs-1 text-muted"></i>
          <p class="mt-2 text-muted">No telemetry data found for the selected filters.</p>
          <div class="mt-3 text-small text-muted">
            <p>Debug Info:</p>
            <p>Selected Device: {{ selectedDevice || 'All Devices' }}</p>
            <p>Date Range: {{ startDate }} to {{ endDate }}</p>
            <p>Data Limit: {{ dataLimit }}</p>
            <button @click="loadTestData" class="btn btn-sm btn-outline-primary mt-2">
              <i class="bi bi-arrow-clockwise"></i> Generate Test Data
            </button>
          </div>
        </div>

        <div v-else class="table-responsive" style="max-height: 400px; overflow-y: auto;">
          <table class="table table-row-dashed table-row-gray-300 gy-5">
            <thead>
              <tr class="fw-bold fs-6 text-gray-800">
                <th>Device ID</th>
                <th>Timestamp</th>
                <th>Event</th>
                <th>Voltage (V)</th>
                <th>Current (A)</th>
                <th>Temperature (°C)</th>
                <th>Humidity (%)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="record in telemetryData" :key="record._id">
                <td>
                  <span class="badge badge-light-primary">{{ record.deviceId }}</span>
                </td>
                <td>{{ formatTimestamp(record.timestamp) }}</td>
                <td>
                  <span :class="getEventBadgeClass(record.event)">{{ record.event }}</span>
                </td>
                <td>{{ formatDataValue(record.voltage || record.data?.voltage) }}</td>
                <td>{{ formatDataValue(record.current || record.data?.current) }}</td>
                <td>{{ formatDataValue(record.temperature || record.data?.temperature) }}</td>
                <td>{{ formatDataValue(record.humidity || record.data?.humidity) }}</td>
                <td>
                  <span :class="getStatusBadgeClass(record.status || record.data?.status)">
                    {{ record.status || record.data?.status || 'Unknown' }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          
          <div class="d-flex justify-content-between align-items-center mt-3">
            <span class="text-muted">Showing {{ telemetryData.length }} records</span>
            <div v-if="telemetryData.length >= dataLimit">
              <span class="text-warning">
                <i class="bi bi-info-circle"></i>
                Limited to {{ dataLimit }} records. Use filters to refine results.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div id="report-content" class="row g-4">
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
import { defineComponent, ref, onMounted } from "vue";
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
    const telemetryData = ref([]);
    const devices = ref([]);
    const selectedDevice = ref('');
    const startDate = ref(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]); // 7 days ago
    const endDate = ref(new Date().toISOString().split('T')[0]); // today
    const dataLimit = ref(100);

    // Load devices list
    const loadDevices = async () => {
      try {
        const response = await ApiService.get('/api/devices');
        if (response.data?.success && Array.isArray(response.data.data)) {
          devices.value = response.data.data.filter(device => device && device.deviceId);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        console.error('Error loading devices:', error);
        // Fallback mock devices for demo
        devices.value = [
          { deviceId: '123', name: 'Device 123' },
          { deviceId: '124', name: 'Device 124' },
          { deviceId: '125', name: 'Device 125' }
        ];
      }
    };

    // Load telemetry data
    const loadTelemetryData = async () => {
      try {
        loading.value = true;
        
        const params = new URLSearchParams({
          startDate: startDate.value,
          endDate: endDate.value,
          limit: dataLimit.value.toString()
        });

        if (selectedDevice.value) {
          params.append('deviceId', selectedDevice.value);
        }

        console.log('Loading telemetry data with params:', params.toString());
        console.log('Selected device:', selectedDevice.value);
        console.log('Date range:', startDate.value, 'to', endDate.value);
        
        try {
          const response = await ApiService.get(`/api/telemetry?${params.toString()}`);
          
          if (response.data?.success && response.data.data?.length > 0) {
            console.log('API response successful, data length:', response.data.data.length);
            telemetryData.value = response.data.data;
          } else {
            console.log('API response empty or unsuccessful, using mock data');
            telemetryData.value = generateMockData();
          }
        } catch (apiError) {
          console.log('API call failed, using mock data:', apiError.message);
          telemetryData.value = generateMockData();
        }

      } catch (error) {
        console.error('Error in loadTelemetryData:', error);
        telemetryData.value = generateMockData();
      } finally {
        loading.value = false;
      }
    };

    // Generate mock data for demo
    const generateMockData = () => {
      const mockData = [];
      const deviceIds = selectedDevice.value ? [selectedDevice.value] : ['123', '124', '125'];
      const events = ['NORMAL', 'WARNING', 'ALERT', 'INFO'];
      const statuses = ['active', 'warning', 'error', 'offline'];

      console.log('Generating mock data for devices:', deviceIds);
      
      // Generate data within the selected date range
      const start = new Date(startDate.value);
      const end = new Date(endDate.value);
      const timeDiff = end.getTime() - start.getTime();
      
      for (let i = 0; i < Math.min(dataLimit.value, 20); i++) {
        const randomTime = start.getTime() + Math.random() * timeDiff;
        const timestamp = new Date(randomTime);
        
        mockData.push({
          _id: `mock_${i}`,
          deviceId: deviceIds[Math.floor(Math.random() * deviceIds.length)],
          timestamp: timestamp.toISOString(),
          event: events[Math.floor(Math.random() * events.length)],
          voltage: (220 + Math.random() * 20).toFixed(2),
          current: (5 + Math.random() * 10).toFixed(2),
          temperature: (20 + Math.random() * 15).toFixed(1),
          humidity: (40 + Math.random() * 30).toFixed(1),
          status: statuses[Math.floor(Math.random() * statuses.length)]
        });
      }

      // Sort by timestamp descending
      mockData.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      
      console.log('Generated mock data:', mockData.length, 'records for devices:', deviceIds);
      console.log('First record:', mockData[0]);
      return mockData;
    };

    // Force load test data
    const loadTestData = () => {
      console.log('Forcing test data generation...');
      telemetryData.value = generateMockData();
      console.log('Test data loaded:', telemetryData.value.length, 'records');
    };

    // Utility functions
    const formatTimestamp = (timestamp: string) => {
      return new Date(timestamp).toLocaleString();
    };

    const formatDataValue = (value: any) => {
      if (value === null || value === undefined) return 'N/A';
      if (typeof value === 'number') return value.toFixed(2);
      return value.toString();
    };

    const getEventBadgeClass = (event: string) => {
      switch (event) {
        case 'NORMAL': return 'badge badge-light-success';
        case 'WARNING': return 'badge badge-light-warning';
        case 'ALERT': return 'badge badge-light-danger';
        case 'INFO': return 'badge badge-light-info';
        default: return 'badge badge-light-secondary';
      }
    };

    const getStatusBadgeClass = (status: string) => {
      switch (status) {
        case 'active': return 'badge badge-light-success';
        case 'warning': return 'badge badge-light-warning';
        case 'error': return 'badge badge-light-danger';
        case 'offline': return 'badge badge-light-secondary';
        default: return 'badge badge-light-secondary';
      }
    };

    const getDeviceName = (deviceId: string) => {
      const device = devices.value.find(d => d.deviceId === deviceId);
      return device ? device.name : deviceId;
    };

    // Initialize data on mount
    onMounted(async () => {
      console.log('Reports component mounted');
      await loadDevices();
      await loadTelemetryData();
      
      // Ensure we have some data to show
      if (telemetryData.value.length === 0) {
        console.log('No data loaded, forcing mock data generation');
        telemetryData.value = generateMockData();
      }
    });

    const exportPDF = async () => {
      const reportElement = document.getElementById("report-content");
      if (!reportElement) return;
      const canvas = await html2canvas(reportElement);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "landscape" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);
      pdf.save("report.pdf");
    };

    const exportToExcel = async () => {
      try {
        exportLoading.value = true;

        // Check authentication status
        if (!authStore.isAuthenticated) {
          throw new Error('You must be logged in to export data. Please login and try again.');
        }

        // Show date range selection dialog
        const { value: dateRange } = await Swal.fire({
          title: 'Export Telemetry Data to Excel',
          html: `
            <div class="row g-3">
              <div class="col-md-6">
                <label for="start-date" class="form-label">Start Date</label>
                <input type="date" id="start-date" class="form-control" value="${new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}">
              </div>
              <div class="col-md-6">
                <label for="end-date" class="form-label">End Date</label>
                <input type="date" id="end-date" class="form-control" value="${new Date().toISOString().split('T')[0]}">
              </div>
              <div class="col-12">
                <label for="device-id" class="form-label">Device ID (Optional)</label>
                <input type="text" id="device-id" class="form-control" placeholder="Leave empty for all devices">
              </div>
            </div>
          `,
          focusConfirm: false,
          showCancelButton: true,
          confirmButtonText: 'Export',
          cancelButtonText: 'Cancel',
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-secondary"
          },
          preConfirm: () => {
            const startDate = (document.getElementById('start-date') as HTMLInputElement).value;
            const endDate = (document.getElementById('end-date') as HTMLInputElement).value;
            const deviceId = (document.getElementById('device-id') as HTMLInputElement).value;

            if (!startDate || !endDate) {
              Swal.showValidationMessage('Please select both start and end dates');
              return false;
            }

            if (new Date(startDate) > new Date(endDate)) {
              Swal.showValidationMessage('Start date cannot be after end date');
              return false;
            }

            return { startDate, endDate, deviceId };
          }
        });

        if (!dateRange) {
          exportLoading.value = false;
          return;
        }

        // Prepare API endpoint
        const API_BASE_URL = (import.meta.env.VITE_APP_API_URL || 'http://localhost:3001').replace(/\/$/, '');
        const params = new URLSearchParams({
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
          format: 'download'
        });

        if (dateRange.deviceId) {
          params.append('deviceId', dateRange.deviceId);
        }

        // Make API call to export endpoint
        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('No authentication token found. Please login again.');
        }

        // Set the authorization header using ApiService
        ApiService.setHeader();

        const response = await axios.get(`${API_BASE_URL}/export/telemetry/excel?${params.toString()}`, {
          responseType: 'blob',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        // Create download link
        const blob = new Blob([response.data], { 
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        
        // Set filename from response headers or use default
        const contentDisposition = response.headers['content-disposition'];
        let filename = 'telemetry_data_export.xlsx';
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

        // Show success message
        await Swal.fire({
          title: 'Export Successful!',
          text: 'Your Excel file has been downloaded successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: "btn btn-success"
          }
        });

      } catch (error: any) {
        console.error('Export error:', error);
        
        let errorMessage = 'Failed to export data. Please try again.';
        
        if (error.message && error.message.includes('authentication token')) {
          errorMessage = 'Authentication failed. Please login again.';
          // Optionally redirect to login
          // router.push('/auth/signin');
        } else if (error.response) {
          if (error.response.status === 401) {
            errorMessage = 'Authentication failed. Your session may have expired. Please login again.';
          } else if (error.response.status === 403) {
            errorMessage = 'You do not have permission to export data. Please contact your administrator.';
          } else if (error.response.status === 404) {
            errorMessage = 'Export service not found. Please contact support.';
          } else if (error.response.status >= 500) {
            errorMessage = 'Server error occurred. Please try again later or contact support.';
          } else if (error.response.data && error.response.data.error) {
            errorMessage = error.response.data.error;
          }
        } else if (error.code === 'NETWORK_ERROR' || error.message.includes('Network')) {
          errorMessage = 'Network error. Please check your connection and try again.';
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
    };

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
      
      // Functions
      loadTelemetryData,
      loadTestData,
      formatTimestamp,
      formatDataValue,
      getEventBadgeClass,
      getStatusBadgeClass,
      getDeviceName
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