<template>
  <div>
    <!-- Search & Filters Row -->
    <div class="d-flex flex-wrap justify-content-between align-items-center mb-5 gap-3">
      <!-- Search Input -->
      <div class="position-relative w-100 w-sm-auto">
        <KTIcon
          icon-name="magnifier"
          icon-class="fs-1 position-absolute top-50 translate-middle-y ms-3"
        />
        <input
          type="text"
          v-model="searchQuery"
          @input="searchItems"
          class="form-control form-control ps-10 w-100 w-sm-250px text-gray-800"
          placeholder="Search devices by name..."
        />
      </div>

      <!-- Add Device Button -->
      <button 
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addDeviceModal"
      >
        <i class="bi bi-plus-circle me-2"></i>Add Device
      </button>
    </div>

    <!-- Nav Tabs (Filters) -->
    <ul class="nav nav-tabs mb-5 cursor-pointer">
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{ active: currentFilter === 'all' }"
          @click="applyFilter('all')"
        >
          All
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{ active: currentFilter === 'online' }"
          @click="applyFilter('online')"
        >
          Online
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{ active: currentFilter === 'offline' }"
          @click="applyFilter('offline')"
        >
          Offline
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{ active: currentFilter === 'warning' }"
          @click="applyFilter('warning')"
        >
          Warning
        </a>
      </li>
    </ul>

    <!-- Broadcast Message Button -->
    <button 
      type="button" 
      class="btn btn-info mb-5"
      @click="showBroadcast = !showBroadcast"
    >
      <i class="bi bi-broadcast me-2"></i>
      {{ showBroadcast ? 'Hide Broadcast' : 'Broadcast Message' }}
    </button>

    <!-- Broadcast Message Component -->
    <div v-if="showBroadcast" class="mb-6">
      <BroadcastMessage />
    </div>

    <!-- Devices Grid -->
    <div v-if="filteredDevices.length > 0" class="row g-4">
      <div
        class="col-lg-4 col-md-6 col-sm-12"
        v-for="device in filteredDevices"
        :key="device.id"
      >
        <DeviceCardWidget v-bind="device" @deviceRemoved="handleDeviceRemoved" />
      </div>
    </div>

    <!-- No Devices Found Message -->
    <div v-else class="text-center text-muted py-10">
      <i class="bi bi-search fs-1 mb-3"></i>
      <p class="fs-5 fw-semibold mb-1">No devices found</p>
      <p class="small">Try adjusting your search or filter criteria.</p>
    </div>

    <!-- Add Device Modal -->
    <AddDeviceModal @deviceCreated="handleDeviceCreated" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import DeviceCardWidget from "@/components/iot/component/dashboard/DeviceCardWidget.vue";
import BroadcastMessage from "@/components/iot/BroadcastMessage.vue";
import AddDeviceModal from "@/components/iot/AddDeviceModal.vue";
import KTIcon from "@/core/helpers/kt-icon/KTIcon.vue";

// Define the possible status values
type DeviceStatus = "online" | "offline" | "warning" | "critical";

// Interface for device metrics
interface Metric {
  type: string;
  value: number;
  icon: string;
}

// Interface for device data
interface Device {
  id: string;
  name: string;
  icon: string;
  type: string;
  location: string;
  status: DeviceStatus;
  lastSeen: string;
  metrics: Metric[];
}

export default defineComponent({
  name: "Devices",
  components: {
    DeviceCardWidget,
    BroadcastMessage,
    AddDeviceModal,
    KTIcon,
  },
  setup() {
    // Search and filter state
    const searchQuery = ref("");
    const currentFilter = ref("all");
    const showBroadcast = ref(false);
    const loading = ref(true);
    const error = ref<string | null>(null);

    // Device data - now loaded dynamically from backend
    const devices = ref<Device[]>([]);
    
    // Fetch devices from backend
    const fetchDevices = async () => {
      try {
        loading.value = true;
        error.value = null;
        console.log('🔍 Fetching devices from API...');
        
        const apiUrl = (import.meta.env.VITE_APP_API_URL || 'http://localhost:3001').replace(/\/$/, '');
        console.log('📡 API URL:', apiUrl);
        const response = await fetch(`${apiUrl}/api/devices`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('📦 Received from API:', result);
        
        // API returns { success, count, devices: [...] }
        // Transform to match frontend format
        const transformedDevices = result.devices?.map((device: any) => ({
          id: device.deviceId,
          name: device.name,
          icon: device.icon || 'bi-device',
          type: 'IoT Sensor',
          location: device.location,
          status: device.status,
          lastSeen: device.lastSeen ? new Date(device.lastSeen).toLocaleString() : 'Never',
          metrics: [
            { type: 'battery', value: device.currentData?.battery || 0, icon: 'bi-battery-full' },
            { type: 'signal', value: device.currentData?.signal || 0, icon: 'bi-wifi' },
            { type: 'temperature', value: device.currentData?.temperature || 0, icon: 'bi-thermometer' },
          ]
        })) || [];
        
        devices.value = transformedDevices;
        console.log('✅ Updated devices.value:', devices.value.length, 'devices');
      } catch (err: any) {
        console.error('❌ Error fetching devices:', err);
        error.value = err.message || 'Failed to load devices from backend';
        
        // Fallback to static devices if API fails
        devices.value = [
          {
            id: "123",
            name: "Sensor 1",
            icon: "bi-lightbulb",
            type: "light",
            location: "Location 1",
            status: "offline",
            lastSeen: "Never",
            metrics: [
              { type: "battery", value: 0, icon: "bi-battery-full" },
              { type: "signal", value: 0, icon: "bi-wifi" },
              { type: "temperature", value: 0, icon: "bi-thermometer" },
            ],
          },
          {
            id: "234",
            name: "Sensor 2",
            icon: "bi-thermometer-half",
            type: "thermostat",
            location: "Location 2",
            status: "offline",
            lastSeen: "Never",
            metrics: [
              { type: "battery", value: 0, icon: "bi-battery-half" },
              { type: "signal", value: 0, icon: "bi-wifi" },
              { type: "temperature", value: 0, icon: "bi-thermometer-half" },
            ],
          }
        ];
      } finally {
        loading.value = false;
      }
    };
    
    // Load devices on mount
    onMounted(() => {
      fetchDevices();
    });

    // Computed property for filtered devices
    const filteredDevices = computed(() => {
      const query = searchQuery.value.toLowerCase().trim();
      const filter = currentFilter.value;
      
      return devices.value.filter((device) => {
        const matchesSearch = 
          device.name.toLowerCase().includes(query) ||
          device.type.toLowerCase().includes(query) ||
          device.location.toLowerCase().includes(query);
          
        const matchesFilter = 
          filter === "all" || device.status === filter;
          
        return matchesSearch && matchesFilter;
      });
    });

    // Methods
    const searchItems = () => {
      // No need to do anything here since we're using a computed property
    };

    const applyFilter = (filter: string) => {
      currentFilter.value = filter;
    };

    const handleDeviceCreated = async (newDevice: any) => {
      console.log('✅ New device created:', newDevice);
      // Refresh device list
      await fetchDevices();
      console.log('🔄 Device list refreshed');
    };
    
    const handleDeviceRemoved = async (removedDevice: { id: string; name: string }) => {
      console.log('✅ Device removed:', removedDevice);
      
      // Remove device from local state immediately for better UX
      devices.value = devices.value.filter(device => device.id !== removedDevice.id);
      
      // Optional: Show success message
      console.log(`🔄 Device "${removedDevice.name}" removed from list`);
    };

    return {
      devices,
      searchQuery,
      currentFilter,
      showBroadcast,
      loading,
      error,
      filteredDevices,
      searchItems,
      applyFilter,
      handleDeviceCreated,
      handleDeviceRemoved,
      fetchDevices,
    };
  },
});
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>