<template>
  <div class="row">
    <div class="row g-4">
      <div class="col-lg-3 col-md-6 col-sm-6">
        <StatCardWidget
          widget-classes="card-xl-stretch mb-xl-8"
          icon-name="hdd-network"
          color="light"
          icon-color="primary"
          title="6"
          description="All registered devices"
          heading="Total Devices"
        />
      </div>

      <div class="col-lg-3 col-md-6 col-sm-6">
        <StatCardWidget
          widget-classes="card-xl-stretch mb-xl-8"
          icon-name="wifi"
          color="light"
          icon-color="success"
          title="4"
          description="Currently online"
          :change-value="5"
          :is-positive="true"
          heading="Active Devices"
        />
      </div>

      <div class="col-lg-3 col-md-6 col-sm-6">
        <StatCardWidget
          widget-classes="card-xl-stretch mb-xl-8"
          icon-name="battery-charging"
          color="light"
          icon-color="danger"
          title="1"
          description="Needs attention"
          :change-value="2"
          :is-positive="false"
          heading="Low Battery"
        />
      </div>

      <div class="col-lg-3 col-md-6 col-sm-6">
        <StatCardWidget
          widget-classes="card-xl-stretch mb-xl-8"
          icon-name="exclamation-triangle"
          color="light"
          icon-color="warning"
          title="2"
          description="Issues detected"
          :change-value="1"
          :is-positive="false"
          heading="Warnings"
        />
      </div>
    </div>

    <!-- Devices Grid -->
    <div v-if="devices.length > 0" class="row g-4">
      <div
        class="col-lg-4 col-md-6 col-sm-12"
        v-for="device in devices"
        :key="device.id"
      >
        <DeviceCardWidget v-bind="device" />
      </div>
    </div>

    <div class="row g-4">
      <div class="col-12">
        <IndiaMap />
      </div>
    </div>

    <!-- Charts row -->
    <div class="row g-4">
      <div class="col-lg-6 col-12">
        <TemperatureChart
          widget-classes="card-xl-stretch mb-xl-8"
          :height="300"
        />
      </div>
      <div class="col-lg-6 col-sm-12">
        <EnergyConsumptionChart
          widget-classes="card-xl-stretch mb-xl-8"
          :height="300"
        />
      </div>
    </div>
    <div class="row g-4">
      <div class="col-lg-12">
        <ActiveDeviceChart
          widget-classes="card-xl-stretch mb-4"
          :height="300"
        />
      </div>
    </div>
  </div>
</template>
  
  <script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref, watch, computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import { generateStorageUrl } from "@/core/helpers/storageUrl";
import StatCardWidget from "@/components/iot/component/dashboard/StatCardWidget.vue";
import TemperatureChart from "@/components/iot/component/dashboard/TemperatureChart.vue";
import EnergyConsumptionChart from "@/components/iot/component/dashboard/EnergyConsumptionChart.vue";
import ActiveDeviceChart from "./ActiveDeviceChart.vue";
import DeviceCardWidget from "@/components/iot/component/dashboard/DeviceCardWidget.vue";
import IndiaMap from "@/components/iot/component/dashboard/IndiaMap.vue";

export default defineComponent({
  name: "main-dashboard",
  components: {
    StatCardWidget,
    TemperatureChart,
    EnergyConsumptionChart,
    ActiveDeviceChart,
    DeviceCardWidget,
    IndiaMap,
  },
  setup() {
    const authStore = useAuthStore();
    const User = authStore.GetUser();

    const devices: any = ref([
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
      },
      {
        id: "3",
        name: "Bedroom Humidity Sensor",
        icon: "bi-moisture",
        type: "sensor",
        location: "Bedroom",
        status: "warning",
        lastSeen: "15 min ago",
        metrics: [
          { type: "battery", value: 20, icon: "bi-battery" },
          { type: "signal", value: 45, icon: "bi-wifi" },
          { type: "temperature", value: 18.5, icon: "bi-thermometer" },
        ],
      },
      {
        id: "4",
        name: "Garage Door",
        icon: "bi-door-closed",
        type: "door",
        location: "Garage",
        status: "offline",
        lastSeen: "2 days ago",
        metrics: [
          { type: "battery", value: 10, icon: "bi-battery" },
          { type: "signal", value: 0, icon: "bi-wifi-off" },
          { type: "temperature", value: 10, icon: "bi-thermometer" },
        ],
      },
      {
        id: "5",
        name: "Front Porch Camera",
        icon: "bi-camera-video",
        type: "camera",
        location: "Front Porch",
        status: "online",
        lastSeen: "5 min ago",
        metrics: [
          { type: "battery", value: 85, icon: "bi-battery-half" },
          { type: "signal", value: 90, icon: "bi-wifi" },
          { type: "temperature", value: 22, icon: "bi-thermometer" },
        ],
      },
      {
        id: "6",
        name: "Backyard Motion Sensor",
        icon: "bi-door-open",
        type: "sensor",
        location: "Backyard",
        status: "online",
        lastSeen: "10 min ago",
        metrics: [
          { type: "battery", value: 65, icon: "bi-battery-half" },
          { type: "signal", value: 80, icon: "bi-wifi" },
          { type: "temperature", value: 18, icon: "bi-thermometer" },
        ],
      },
    ]);

    return {

      User,
      generateStorageUrl,
      devices,
      getAssetPath,
    };
  },
});
</script>