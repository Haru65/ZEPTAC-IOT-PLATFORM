<template>
  <div class="card">
    <div class="card-header border-0 pt-6">
      <div class="card-title">
        <div class="d-flex align-items-center position-relative">
          <h3 class="mb-0">Device Details</h3>
        </div>
      </div>
      <div class="card-toolbar">
        <router-link to="/devices" class="btn btn-light me-3">
          <KTIcon icon-name="arrow-left" icon-class="fs-2" />
          Back to Devices
        </router-link>
      </div>
    </div>

    <div class="card-body">
      <div class="row">
        <div class="col-lg-6">
          <!-- Basic Info -->
          <div class="mb-5">
            <h4 class="fs-1 text-gray-800 w-bolder mb-6">Basic Information</h4>
            <div class="d-flex flex-column">
              <div class="row mb-7">
                <label class="col-lg-4 fw-bold text-muted">Device Name</label>
                <div class="col-lg-8">
                  <span class="fw-bold fs-6 text-gray-800">{{ device?.name }}</span>
                </div>
              </div>
              <div class="row mb-7">
                <label class="col-lg-4 fw-bold text-muted">Location</label>
                <div class="col-lg-8">
                  <span class="fw-bold fs-6 text-gray-800">{{ device?.location }}</span>
                </div>
              </div>
              <div class="row mb-7">
                <label class="col-lg-4 fw-bold text-muted">Type</label>
                <div class="col-lg-8">
                  <span class="fw-bold fs-6 text-gray-800">{{ device?.type }}</span>
                </div>
              </div>
              <div class="row mb-7">
                <label class="col-lg-4 fw-bold text-muted">Status</label>
                <div class="col-lg-8">
                  <span class="badge" :class="statusClass">{{ device?.status }}</span>
                </div>
              </div>
              <div class="row mb-7">
                <label class="col-lg-4 fw-bold text-muted">Last Seen</label>
                <div class="col-lg-8">
                  <span class="fw-bold fs-6 text-gray-800">{{ device?.lastSeen }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Metrics -->
          <div class="mb-5">
            <h4 class="fs-1 text-gray-800 w-bolder mb-6">Device Metrics</h4>
            <div class="row g-4">
              <div class="col-md-4" v-for="metric in device?.metrics" :key="metric.type">
                <div class="card bg-light">
                  <div class="card-body p-4">
                    <div class="d-flex flex-column align-items-center">
                      <i :class="[metric.icon, metricClass(metric)]" style="font-size: 2rem"></i>
                      <h5 class="mt-2 mb-0">{{ metric.value }}{{ metric.type === 'temperature' ? '°C' : '%' }}</h5>
                      <p class="text-muted mb-0 text-capitalize">{{ metric.type }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-6">
          <!-- Historical Data -->
          <div class="mb-5">
            <h4 class="fs-1 text-gray-800 w-bolder mb-6">Historical Data</h4>
            <!-- Add charts or historical data here -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import KTIcon from "@/core/helpers/kt-icon/KTIcon.vue";

type DeviceStatus = "online" | "offline" | "warning" | "critical";

interface Metric {
  type: string;
  value: number;
  icon: string;
}

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
  name: 'DeviceDetails',
  components: {
    KTIcon,
  },
  setup() {
    const route = useRoute();
    const device = ref<Device | null>(null);

    onMounted(() => {
      // TODO: Replace with actual API call
      const deviceId = route.params.id as string;
      device.value = {
        id: deviceId,
        name: deviceId === "1" ? "Kitchen Smart Light" : "Living Room Thermostat",
        icon: deviceId === "1" ? "bi-lightbulb" : "bi-thermometer-half",
        type: deviceId === "1" ? "light" : "thermostat",
        location: deviceId === "1" ? "Kitchen" : "Living Room",
        status: "online",
        lastSeen: "Just now",
        metrics: deviceId === "1" 
          ? [
              { type: "battery", value: 85, icon: "bi-battery-full" },
              { type: "signal", value: 90, icon: "bi-wifi" },
              { type: "temperature", value: 22, icon: "bi-thermometer" },
            ]
          : [
              { type: "battery", value: 75, icon: "bi-battery-half" },
              { type: "signal", value: 85, icon: "bi-wifi" },
              { type: "temperature", value: 20, icon: "bi-thermometer-half" },
            ],
      };
      // For now, we'll use mock data for the two devices we have
      const mockDevices: Device[] = [
        {
          id: "1",
          name: "Living Room Thermostat",
          icon: "bi-thermometer-half",
          type: "sensor",
          location: "Living Room",
          status: "online",
          lastSeen: "2 min ago",
          metrics: [
            { type: "temperature", value: 22.5, icon: "bi-thermometer-half" },
            { type: "battery", value: 75, icon: "bi-battery-half" },
            { type: "signal", value: 90, icon: "bi-wifi" },
          ],
        },
        {
          id: "2",
          name: "Kitchen Smart Light",
          icon: "bi-lightbulb",
          type: "light",
          location: "Kitchen",
          status: "online",
          lastSeen: "Just now",
          metrics: [
            { type: "battery", value: 80, icon: "bi-battery-half" },
            { type: "signal", value: 85, icon: "bi-wifi" },
            { type: "temperature", value: 20, icon: "bi-thermometer-half" },
          ],
        }
      ];

      device.value = mockDevices.find(d => d.id === route.params.id) || null;
    });

    const statusClass = computed(() => {
      const status = device.value?.status;
      switch (status) {
        case 'online':
          return 'badge-light-success';
        case 'offline':
          return 'badge-light-danger';
        case 'warning':
          return 'badge-light-warning';
        default:
          return 'badge-light-primary';
      }
    });

    const metricClass = (metric: Metric) => {
      if (metric.type === 'battery' && metric.value <= 20) return 'text-danger';
      if (metric.type === 'signal' && metric.value <= 50) return 'text-warning';
      return 'text-primary';
    };

    return {
      device,
      statusClass,
      metricClass,
      statusClass,
      metricClass
    };
  }
});
</script>
