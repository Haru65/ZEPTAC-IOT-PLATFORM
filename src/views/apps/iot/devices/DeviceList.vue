<template>
  <div class="card">
    <div class="card-header border-0 pt-6">
      <div class="card-title">
        <div class="d-flex align-items-center position-relative my-1">
          <i class="bi bi-search position-absolute ms-3"></i>
          <input
            type="text"
            v-model="searchQuery"
            class="form-control form-control-solid w-250px ps-10"
            placeholder="Search devices..."
          />
        </div>
      </div>
      <div class="card-toolbar">
        <div class="d-flex justify-content-end gap-2">
          <button
            class="btn btn-sm"
            :class="statusFilter === 'all' ? 'btn-primary' : 'btn-light'"
            @click="statusFilter = 'all'"
          >
            All
          </button>
          <button
            class="btn btn-sm"
            :class="statusFilter === 'online' ? 'btn-success' : 'btn-light'"
            @click="statusFilter = 'online'"
          >
            Online
          </button>
          <button
            class="btn btn-sm"
            :class="statusFilter === 'offline' ? 'btn-danger' : 'btn-light'"
            @click="statusFilter = 'offline'"
          >
            Offline
          </button>
          <button
            class="btn btn-sm"
            :class="statusFilter === 'warning' ? 'btn-warning' : 'btn-light'"
            @click="statusFilter = 'warning'"
          >
            Warning
          </button>
        </div>
      </div>
    </div>
    <div class="card-body pt-0">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-10">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3 text-muted">Loading devices...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="alert alert-danger">
        <i class="bi bi-exclamation-triangle me-2"></i>
        {{ error }}
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredDevices.length === 0" class="text-center py-10">
        <i class="bi bi-inbox display-4 text-muted"></i>
        <p class="mt-3 text-muted">No devices found</p>
      </div>

      <!-- Device Grid -->
      <div v-else class="row g-6 g-xl-9">
        <div
          v-for="device in filteredDevices"
          :key="device.deviceId"
          class="col-md-6 col-xl-4"
        >
          <div class="card border border-2 border-gray-300 border-hover device-card h-100">
            <div class="card-header border-0 pt-9">
              <div class="d-flex align-items-center justify-content-between w-100">
                <div class="d-flex align-items-center">
                  <div class="symbol symbol-50px me-3">
                    <span class="symbol-label bg-light-primary">
                      <i :class="device.icon || 'bi bi-cpu'" class="fs-2x text-primary"></i>
                    </span>
                  </div>
                  <div>
                    <h3 class="card-title align-items-start flex-column mb-1">
                      <span class="fw-bold text-dark fs-5">{{ device.name }}</span>
                    </h3>
                    <span class="text-muted fw-semibold fs-7">
                      {{ device.location }}
                    </span>
                  </div>
                </div>
                <span
                  class="badge"
                  :class="getStatusClass(device.status)"
                >
                  {{ device.status }}
                </span>
              </div>
            </div>
            <div class="card-body pt-5">
              <!-- Metrics -->
              <div class="d-flex flex-column gap-3 mb-5">
                <div class="d-flex justify-content-between align-items-center">
                  <span class="text-muted fs-7">
                    <i class="bi bi-battery-charging text-success me-1"></i>
                    Battery
                  </span>
                  <span class="fw-bold fs-6">
                    {{ device.currentData?.battery || 'N/A' }}{{ device.currentData?.battery ? '%' : '' }}
                  </span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="text-muted fs-7">
                    <i class="bi bi-wifi text-primary me-1"></i>
                    Signal
                  </span>
                  <span class="fw-bold fs-6">
                    {{ device.currentData?.signal || 'N/A' }}{{ device.currentData?.signal ? '%' : '' }}
                  </span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="text-muted fs-7">
                    <i class="bi bi-thermometer-half text-danger me-1"></i>
                    Temperature
                  </span>
                  <span class="fw-bold fs-6">
                    {{ device.currentData?.temperature || 'N/A' }}{{ device.currentData?.temperature ? '°C' : '' }}
                  </span>
                </div>
              </div>

              <!-- Last Seen -->
              <div class="separator separator-dashed mb-4"></div>
              <div class="d-flex align-items-center justify-content-between mb-4">
                <span class="text-muted fs-7">Last Seen</span>
                <span class="fw-semibold fs-7">{{ formatLastSeen(device.lastSeen) }}</span>
              </div>

              <!-- View Details Button -->
              <router-link
                :to="{ name: 'device-details', params: { id: device.deviceId } }"
                class="btn btn-sm btn-primary w-100"
              >
                <i class="bi bi-eye me-1"></i>
                View Details
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onUnmounted } from 'vue';
import ApiService from '@/core/services/ApiService';

export default defineComponent({
  name: 'DeviceList',
  setup() {
    const devices = ref<any[]>([]);
    const loading = ref<boolean>(true);
    const error = ref<string | null>(null);
    const searchQuery = ref<string>('');
    const statusFilter = ref<string>('all');
    const refreshInterval = ref<NodeJS.Timeout | null>(null);

    // Fetch devices from API
    const fetchDevices = async () => {
      try {
        error.value = null;
        ApiService.setHeader();
        const response = await ApiService.query('/api/devices', {});
        
        if (response.data && response.data.success) {
          devices.value = response.data.devices || [];
        } else {
          throw new Error('Failed to fetch devices');
        }
      } catch (err: any) {
        console.error('Error fetching devices:', err);
        error.value = err.response?.data?.message || err.message || 'Failed to load devices';
      } finally {
        loading.value = false;
      }
    };

    // Filtered devices based on search and status
    const filteredDevices = computed(() => {
      let filtered = devices.value;

      // Filter by status
      if (statusFilter.value !== 'all') {
        filtered = filtered.filter(
          (device) => device.status?.toLowerCase() === statusFilter.value
        );
      }

      // Filter by search query
      if (searchQuery.value.trim()) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(
          (device) =>
            device.name?.toLowerCase().includes(query) ||
            device.location?.toLowerCase().includes(query) ||
            device.deviceId?.toLowerCase().includes(query)
        );
      }

      return filtered;
    });

    // Get status badge class
    const getStatusClass = (status: string) => {
      switch (status?.toLowerCase()) {
        case 'online':
          return 'badge-light-success';
        case 'offline':
          return 'badge-light-danger';
        case 'warning':
          return 'badge-light-warning';
        default:
          return 'badge-light-secondary';
      }
    };

    // Format last seen as relative time
    const formatLastSeen = (lastSeen: string | null) => {
      if (!lastSeen) return 'Never';

      const now = new Date().getTime();
      const lastSeenTime = new Date(lastSeen).getTime();
      const diffMs = now - lastSeenTime;
      const diffSecs = Math.floor(diffMs / 1000);
      const diffMins = Math.floor(diffSecs / 60);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffSecs < 60) return `${diffSecs} sec ago`;
      if (diffMins < 60) return `${diffMins} min ago`;
      if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    };

    onMounted(() => {
      fetchDevices();

      // Auto-refresh every 30 seconds
      refreshInterval.value = setInterval(() => {
        fetchDevices();
      }, 30000);
    });

    onUnmounted(() => {
      if (refreshInterval.value) {
        clearInterval(refreshInterval.value);
      }
    });

    return {
      devices,
      loading,
      error,
      searchQuery,
      statusFilter,
      filteredDevices,
      getStatusClass,
      formatLastSeen,
      fetchDevices
    };
  }
});
</script>

<style scoped>
.device-card {
  transition: all 0.3s ease;
}

.device-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.border-hover:hover {
  border-color: var(--bs-primary) !important;
}
</style>
