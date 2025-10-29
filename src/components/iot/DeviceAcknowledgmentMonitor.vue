<template>
  <div class="device-acknowledgment-monitor">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h4 class="mb-0">
        <i class="ki-outline ki-message-text fs-2 me-2"></i>
        Device Command Status
      </h4>
      <div class="d-flex gap-2">
        <button 
          class="btn btn-sm btn-light-primary"
          @click="refreshData"
          :disabled="loading"
        >
          <i class="ki-outline ki-arrows-circle fs-6 me-1"></i>
          Refresh
        </button>
        <div class="dropdown">
          <button 
            class="btn btn-sm btn-light-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
          >
            <i class="ki-outline ki-filter fs-6 me-1"></i>
            {{ selectedStatus || 'All Status' }}
          </button>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" @click="filterByStatus('')">All Status</a></li>
            <li><a class="dropdown-item" @click="filterByStatus('PENDING')">Pending</a></li>
            <li><a class="dropdown-item" @click="filterByStatus('SUCCESS')">Success</a></li>
            <li><a class="dropdown-item" @click="filterByStatus('FAILED')">Failed</a></li>
            <li><a class="dropdown-item" @click="filterByStatus('TIMEOUT')">Timeout</a></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="row g-3 mb-5" v-if="statistics">
      <div class="col-md-3">
        <div class="card bg-light-primary">
          <div class="card-body text-center">
            <i class="ki-outline ki-chart-simple fs-3x text-primary"></i>
            <h3 class="fw-bold text-primary mt-2 mb-1">{{ statistics.summary.total }}</h3>
            <div class="fw-semibold text-muted">Total Commands</div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card bg-light-success">
          <div class="card-body text-center">
            <i class="ki-outline ki-check-circle fs-3x text-success"></i>
            <h3 class="fw-bold text-success mt-2 mb-1">{{ statistics.summary.successRate }}%</h3>
            <div class="fw-semibold text-muted">Success Rate</div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card bg-light-warning">
          <div class="card-body text-center">
            <i class="ki-outline ki-clock fs-3x text-warning"></i>
            <h3 class="fw-bold text-warning mt-2 mb-1">{{ statistics.summary.pending }}</h3>
            <div class="fw-semibold text-muted">Pending</div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card bg-light-info">
          <div class="card-body text-center">
            <i class="ki-outline ki-timer fs-3x text-info"></i>
            <h3 class="fw-bold text-info mt-2 mb-1">{{ formatResponseTime(statistics.summary.avgResponseTime) }}</h3>
            <div class="fw-semibold text-muted">Avg Response</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pending Commands Alert -->
    <div v-if="pendingCommands.length > 0" class="alert alert-warning d-flex align-items-center mb-4">
      <i class="ki-outline ki-information-5 fs-2 me-3"></i>
      <div>
        <h6 class="mb-1">{{ pendingCommands.length }} Pending Command(s)</h6>
        <p class="mb-0 text-muted">Commands are waiting for device acknowledgment</p>
      </div>
    </div>

    <!-- Commands Table -->
    <div class="card">
      <div class="card-header">
        <h5 class="card-title mb-0">Recent Commands</h5>
      </div>
      <div class="card-body p-0">
        <div v-if="loading" class="d-flex justify-content-center align-items-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>

        <div v-else-if="acknowledgments.length === 0" class="text-center py-5">
          <i class="ki-outline ki-file-deleted fs-3x text-muted"></i>
          <h6 class="text-muted mt-3">No commands found</h6>
          <p class="text-muted">No device commands have been sent yet</p>
        </div>

        <div v-else class="table-responsive">
          <table class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
            <thead>
              <tr class="fw-bold text-muted">
                <th class="ps-4">Command</th>
                <th>Status</th>
                <th>Sent At</th>
                <th>Response Time</th>
                <th>Device Response</th>
                <th class="text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="ack in acknowledgments" :key="ack.commandId">
                <td class="ps-4">
                  <div class="d-flex flex-column">
                    <span class="text-dark fw-bold text-hover-primary fs-6">
                      {{ ack.command }}
                    </span>
                    <span class="text-muted fw-semibold text-muted d-block fs-7">
                      ID: {{ ack.commandId.substring(0, 8) }}...
                    </span>
                  </div>
                </td>
                <td>
                  <span :class="`badge ${getStatusBadgeClass(ack.status)}`">
                    <i :class="`ki-outline ki-${getStatusIcon(ack.status)} fs-8 me-1`"></i>
                    {{ getStatusText(ack.status) }}
                  </span>
                </td>
                <td>
                  <div class="d-flex flex-column">
                    <span class="text-dark fw-semibold">
                      {{ formatDateTime(ack.sentAt) }}
                    </span>
                    <span class="text-muted fw-semibold fs-7">
                      {{ formatTimeAgo(ack.sentAt) }}
                    </span>
                  </div>
                </td>
                <td>
                  <span :class="getResponseTimeClass(ack.responseTime)">
                    {{ formatResponseTime(ack.responseTime) }}
                  </span>
                </td>
                <td>
                  <div v-if="ack.deviceResponse" class="text-truncate" style="max-width: 200px;">
                    <span 
                      class="text-dark"
                      :title="JSON.stringify(ack.deviceResponse)"
                    >
                      {{ getDeviceResponseSummary(ack.deviceResponse) }}
                    </span>
                  </div>
                  <span v-else class="text-muted">-</span>
                </td>
                <td class="text-end pe-4">
                  <button
                    v-if="ack.status === 'FAILED' || ack.status === 'TIMEOUT'"
                    class="btn btn-sm btn-light-warning"
                    @click="retryCommand(ack.commandId)"
                    :disabled="retrying.includes(ack.commandId)"
                  >
                    <i class="ki-outline ki-arrows-circle fs-6 me-1"></i>
                    Retry
                  </button>
                  <button
                    v-else-if="ack.status === 'PENDING'"
                    class="btn btn-sm btn-light-secondary"
                    @click="checkCommandStatus(ack.commandId)"
                  >
                    <i class="ki-outline ki-refresh fs-6 me-1"></i>
                    Check
                  </button>
                  <span v-else class="text-muted">-</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div v-if="pagination && pagination.total > pagination.limit" class="d-flex justify-content-between align-items-center p-4">
          <div class="text-muted">
            Showing {{ pagination.offset + 1 }} to {{ Math.min(pagination.offset + pagination.limit, pagination.total) }} 
            of {{ pagination.total }} entries
          </div>
          <div class="d-flex gap-2">
            <button 
              class="btn btn-sm btn-light"
              @click="previousPage"
              :disabled="pagination.offset === 0"
            >
              Previous
            </button>
            <button 
              class="btn btn-sm btn-light"
              @click="nextPage"
              :disabled="!pagination.hasMore"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import DeviceAcknowledgmentService from '@/services/deviceAcknowledgment.service';
import { useToast } from 'vue-toastification';

// Props
const props = defineProps<{
  deviceId: string;
  autoRefresh?: boolean;
  refreshInterval?: number;
}>();

// Data
const loading = ref(false);
const acknowledgments = ref([]);
const statistics = ref(null);
const pendingCommands = ref([]);
const selectedStatus = ref('');
const retrying = ref([]);
const pagination = ref(null);
const currentPage = ref(0);
const pageSize = ref(10);

// Auto refresh
let refreshTimer: ReturnType<typeof setInterval> | null = null;

// Toast
const toast = useToast();

// Computed
const pageOffset = computed(() => currentPage.value * pageSize.value);

// Methods
const loadData = async () => {
  loading.value = true;
  try {
    // Load acknowledgments
    const ackResult = await DeviceAcknowledgmentService.getDeviceAcknowledgments(
      props.deviceId,
      {
        status: selectedStatus.value || undefined,
        limit: pageSize.value,
        offset: pageOffset.value
      }
    );
    acknowledgments.value = ackResult.data.data;
    pagination.value = ackResult.data.meta;

    // Load statistics
    const statsResult = await DeviceAcknowledgmentService.getDeviceAckStats(props.deviceId);
    statistics.value = statsResult.data;

    // Load pending commands
    const pendingResult = await DeviceAcknowledgmentService.getPendingAcknowledgments(props.deviceId);
    pendingCommands.value = pendingResult.data.data;

  } catch (error) {
    console.error('Error loading acknowledgment data:', error);
    toast.error('Failed to load acknowledgment data');
  } finally {
    loading.value = false;
  }
};

const refreshData = () => {
  loadData();
};

const filterByStatus = (status: string) => {
  selectedStatus.value = status;
  currentPage.value = 0;
  loadData();
};

const checkCommandStatus = async (commandId: string) => {
  try {
    const result = await DeviceAcknowledgmentService.getCommandStatus(commandId);
    
    // Update the acknowledgment in the list
    const index = acknowledgments.value.findIndex(ack => ack.commandId === commandId);
    if (index !== -1) {
      acknowledgments.value[index] = result.data;
    }

    if (result.data.status !== 'PENDING') {
      toast.success(`Command status updated: ${result.data.status}`);
    }
  } catch (error) {
    console.error('Error checking command status:', error);
    toast.error('Failed to check command status');
  }
};

const retryCommand = async (commandId: string) => {
  retrying.value.push(commandId);
  try {
    const result = await DeviceAcknowledgmentService.retryCommand(commandId);
    toast.success('Command retry initiated');
    
    // Refresh data to show the new command
    setTimeout(() => {
      loadData();
    }, 1000);
  } catch (error) {
    console.error('Error retrying command:', error);
    toast.error('Failed to retry command');
  } finally {
    retrying.value = retrying.value.filter(id => id !== commandId);
  }
};

const nextPage = () => {
  if (pagination.value?.hasMore) {
    currentPage.value++;
    loadData();
  }
};

const previousPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--;
    loadData();
  }
};

// Helper methods
const getStatusText = (status: string) => {
  return DeviceAcknowledgmentService.formatAckStatus(status).text;
};

const getStatusIcon = (status: string) => {
  return DeviceAcknowledgmentService.formatAckStatus(status).icon;
};

const getStatusBadgeClass = (status: string) => {
  return DeviceAcknowledgmentService.getStatusBadgeClass(status);
};

const formatResponseTime = (responseTime: number | null) => {
  return DeviceAcknowledgmentService.formatResponseTime(responseTime);
};

const getResponseTimeClass = (responseTime: number | null) => {
  if (!responseTime) return 'text-muted';
  if (responseTime < 1000) return 'text-success';
  if (responseTime < 5000) return 'text-warning';
  return 'text-danger';
};

const formatDateTime = (date: string) => {
  return new Date(date).toLocaleString();
};

const formatTimeAgo = (date: string) => {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
  return `${Math.floor(diffMins / 1440)}d ago`;
};

const getDeviceResponseSummary = (response: any) => {
  if (typeof response === 'string') return response;
  if (typeof response === 'object') {
    if (response.status) return response.status;
    if (response.message) return response.message;
    return Object.keys(response).join(', ');
  }
  return String(response);
};

// Lifecycle
onMounted(() => {
  loadData();
  
  if (props.autoRefresh) {
    const interval = props.refreshInterval || 30000; // Default 30 seconds
    refreshTimer = setInterval(loadData, interval);
  }
});

onUnmounted(() => {
  if (refreshTimer) {
    clearInterval(refreshTimer);
  }
});
</script>

<style scoped>
.device-acknowledgment-monitor {
  max-width: 100%;
}

.table-responsive {
  max-height: 600px;
  overflow-y: auto;
}

.text-truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>