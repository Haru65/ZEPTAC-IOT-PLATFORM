<template>
  <div class="card shadow">
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1 text-gray-800"
          >Device Locations</span
        >
      </h3>
    </div>
    <VChart
      :option="chartOptions"
      autoresize
      style="height: 300px; width: 100%"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from "vue";
import VChart from "vue-echarts";
import * as echarts from "echarts";
import { use } from "echarts/core";
import { io } from "socket.io-client";

// ECharts modules
import { MapChart } from "echarts/charts";
import { TooltipComponent, VisualMapComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { indiaGeo } from "@/core/helpers/indiaGeo";
// GeoJSON map of India

// Register modules locally
use([MapChart, TooltipComponent, VisualMapComponent, CanvasRenderer]);

interface DeviceLocation {
  deviceId: string;
  name: string;
  latitude: number;
  longitude: number;
  lastSeen: number;
  isActive: boolean;
}

export default defineComponent({
  name: "IndiaMap",
  components: {
    VChart,
  },
  setup() {
    const chartOptions = ref({});
    const activeDevices = ref<DeviceLocation[]>([]);
    let socket: any = null;

    // Function to update map with active device locations
    const updateMapWithActiveDevices = () => {
      if (activeDevices.value.length === 0) {
        // Show default static locations if no active devices
        chartOptions.value = {
          ...chartOptions.value,
          series: [
            {
              name: "Devices",
              type: "scatter",
              coordinateSystem: "geo",
              symbolSize: 15,
              itemStyle: {
                color: "#cccccc",
              },
              label: {
                show: true,
                formatter: "{b}",
                position: "right",
              },
              data: [
                { name: "No Active Devices", value: [77.2090, 28.6139, 0] },
              ],
            },
          ],
        };
        return;
      }

      // Convert active devices to map data format
      const mapData = activeDevices.value.map((device) => ({
        name: device.name || `Device ${device.deviceId}`,
        value: [device.longitude, device.latitude, 1],
        deviceId: device.deviceId,
        isActive: device.isActive,
        lastSeen: device.lastSeen,
      }));

      chartOptions.value = {
        ...chartOptions.value,
        tooltip: {
          trigger: "item",
          formatter: (params: any) => {
            const data = params.data;
            const lastSeenTime = data.lastSeen ? new Date(data.lastSeen).toLocaleString() : 'Unknown';
            return `
              <div>
                <strong>${data.name}</strong><br/>
                Device ID: ${data.deviceId}<br/>
                Status: ${data.isActive ? '<span style="color: #28a745;">Active</span>' : '<span style="color: #dc3545;">Inactive</span>'}<br/>
                Location: ${params.value[1].toFixed(4)}, ${params.value[0].toFixed(4)}<br/>
                Last Seen: ${lastSeenTime}
              </div>
            `;
          },
        },
        series: [
          {
            name: "Active Devices",
            type: "scatter",
            coordinateSystem: "geo",
            symbolSize: 20,
            itemStyle: {
              color: "#28a745", // Green for active devices
              borderColor: "#ffffff",
              borderWidth: 2,
            },
            label: {
              show: true,
              formatter: "{b}",
              position: "right",
              color: "#333333",
              fontSize: 12,
            },
            emphasis: {
              itemStyle: {
                color: "#ffc107",
                shadowBlur: 10,
                shadowColor: "#ffc107",
              },
            },
            data: mapData,
          },
        ],
      };
    };

    onMounted(() => {
      echarts.registerMap("india", indiaGeo as any);

      // Initialize base chart configuration
      chartOptions.value = {
        tooltip: {
          trigger: "item",
          formatter: (params: any) =>
            `${params.name}: ${params.value[2] ?? 0} devices`,
        },
        geo: {
          map: "india",
          roam: true,
          label: {
            emphasis: {
              show: false,
            },
          },
          itemStyle: {
            normal: {
              areaColor: "#e0f7fa",
              borderColor: "#111",
            },
            emphasis: {
              areaColor: "#a5d6a7",
            },
          },
        },
        series: [
          {
            name: "Devices",
            type: "scatter",
            coordinateSystem: "geo",
            symbolSize: 15,
            itemStyle: {
              color: "#cccccc",
            },
            label: {
              show: true,
              formatter: "{b}",
              position: "right",
            },
            data: [
              { name: "No Active Devices", value: [77.2090, 28.6139, 0] },
            ],
          },
        ],
      };

      // Initialize Socket.IO connection
      socket = io(import.meta.env.VITE_APP_API_URL || "http://localhost:3001");
      
      // Listen for active devices locations updates
      socket.on("activeDevicesLocations", (data: any) => {
        console.log("📍 Received active devices locations:", data);
        activeDevices.value = data.devices || [];
        updateMapWithActiveDevices();
      });

      // Listen for individual device location updates
      socket.on("deviceLocationUpdate", (data: DeviceLocation) => {
        console.log("📍 Received device location update:", data);
        
        // Update or add device in the active devices list
        const existingIndex = activeDevices.value.findIndex(
          (device) => device.deviceId === data.deviceId
        );
        
        if (existingIndex >= 0) {
          activeDevices.value[existingIndex] = data;
        } else {
          activeDevices.value.push(data);
        }
        
        updateMapWithActiveDevices();
      });

      socket.on("connect", () => {
        console.log("🔌 Connected to Socket.IO for device locations");
      });

      socket.on("disconnect", () => {
        console.log("🔌 Disconnected from Socket.IO");
      });
    });

    onUnmounted(() => {
      if (socket) {
        socket.disconnect();
      }
    });

    return {
      chartOptions,
      activeDevices,
    };
  },
});
</script>
