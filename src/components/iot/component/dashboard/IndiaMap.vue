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
import { defineComponent, ref, onMounted } from "vue";
import VChart from "vue-echarts";
import * as echarts from "echarts";
import { use } from "echarts/core";

// ECharts modules
import { MapChart } from "echarts/charts";
import { TooltipComponent, VisualMapComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { indiaGeo } from "@/core/helpers/indiaGeo";
// GeoJSON map of India

// Register modules locally
use([MapChart, TooltipComponent, VisualMapComponent, CanvasRenderer]);

export default defineComponent({
  name: "IndiaMap",
  components: {
    VChart,
  },
  setup() {
    const chartOptions = ref({});

    onMounted(() => {
      echarts.registerMap("india", indiaGeo as any);

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
              color: "#ff5722",
            },
            label: {
              show: true,
              formatter: "{b}",
              position: "right",
            },
            data: [
              { name: "Mumbai", value: [72.8777, 19.070, 1] },
              { name: "Mumbai", value: [72.8777, 19.033, 1] },
              { name: "Mumbai", value: [72.8777, 19.036, 1] },
            ],
          },
        ],
      };
    });

    return {
      chartOptions,
    };
  },
});
</script>
