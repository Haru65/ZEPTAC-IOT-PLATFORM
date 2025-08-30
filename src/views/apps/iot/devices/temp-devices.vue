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

      <button type="button" class="btn btn-primary me-3">
        <KTIcon icon-name="plus" icon-class="fs-2" />
        Add Device
      </button>
    </div>

    <!-- Devices Grid -->
    <div v-if="filteredDevices.length > 0" class="row g-4">
      <div class="col-lg-4 col-md-6 col-sm-12" v-for="device in filteredDevices" :key="device.id">
        <DeviceCardWidget v-bind="device" />
      </div>
    </div>

    <!-- No Devices Found Message -->
    <div v-else class="text-center text-muted py-10">
      <i class="bi bi-search fs-1 mb-3"></i>
      <p class="fs-5 fw-semibold mb-1">No devices found</p>
      <p class="small">Try adjusting your search or filter criteria.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import DeviceCardWidget from "@/components/iot/component/dashboard/DeviceCardWidget.vue";
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
    KTIcon,
  },
  setup() {
    // Search and filter state
    const searchQuery = ref("");
    const currentFilter = ref("all");

    // Device data
    const devices = ref<Device[]>([
      {
        id: "1",
        name: "Kitchen Smart Light",
        icon: "bi-lightbulb",
        type: "light",
        location: "Kitchen",
        status: "online",
        lastSeen: "2 min ago",
        metrics: [
          { type: "battery", value: 85, icon: "bi-battery-full" },
          { type: "signal", value: 90, icon: "bi-wifi" },
          { type: "temperature", value: 22, icon: "bi-thermometer" },
        ],
      },
      {
        id: "2",
        name: "Living Room Thermostat",
        icon: "bi-thermometer-half",
        type: "thermostat",
        location: "Living Room",
        status: "online",
        lastSeen: "5 min ago",
        metrics: [
          { type: "battery", value: 75, icon: "bi-battery-half" },
          { type: "signal", value: 85, icon: "bi-wifi" },
          { type: "temperature", value: 20, icon: "bi-thermometer-half" },
        ],
      }
    ]);

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

    return {
      searchQuery,
      currentFilter,
      filteredDevices,
      searchItems,
      applyFilter,
    };
  },
});
</script>
