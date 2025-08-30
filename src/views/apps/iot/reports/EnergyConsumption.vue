<template>
  <div :class="widgetClasses" class="card h-auto">
    <!-- Chart Header -->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1 text-gray-800"
          >Energy Consumption & Solar Generation</span
        >
      </h3>

      <!-- Time Period Tabs -->
      <ul class="nav nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-6">
        <li
          class="nav-item"
          v-for="period in ['24h', '7d', '30d']"
          :key="period"
        >
          <a
            href="#"
            class="nav-link"
            :class="{ active: timePeriod === period }"
            @click.prevent="setTimePeriod(period)"
            >{{ period }}</a
          >
        </li>
      </ul>
    </div>

    <!-- Chart Body -->
    <div>
      <apexchart
        ref="chartRef"
        type="line"
        :height="height"
        :options="chartOptions"
        :series="chartSeries"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import type { ApexOptions } from "apexcharts";
import VueApexCharts from "vue3-apexcharts";
import { getCSSVariableValue } from "@/assets/ts/_utils";
import { getEnergyConsumGenDataByPeriod } from "@/core/data/chartData";

// Energy Data interface
export interface EnergyDataPoint {
  time: string;
  consumption: number;
  generation: number;
  actualDate?: Date;
}

export default defineComponent({
  name: "EnergyConsumptionChart",
  props: {
    widgetClasses: String,
    height: Number,
  },
  components: {
    apexchart: VueApexCharts,
  },
  setup() {
    const chartRef = ref<typeof VueApexCharts | null>(null);
    const timePeriod = ref<"24h" | "7d" | "30d">("24h");

    // Fetch energy data based on selected period
    const chartData = computed(() =>
      getEnergyConsumGenDataByPeriod(timePeriod.value)
    );

    // Prepare chart series
    const chartSeries = computed(() => [
      {
        name: "Consumption (kW)",
        data: chartData.value.map((item) => item.consumption),
      },
      {
        name: "Generation (kW)",
        data: chartData.value.map((item) => item.generation),
      },
    ]);

    // Chart options
    const chartOptions = computed<ApexOptions>(() => {
      const labelColor = "gray";
      const gridColor = getCSSVariableValue("--bs-gray-300");
      const consumptionColor = getCSSVariableValue("--bs-success");
      const generationColor = getCSSVariableValue("--bs-danger");

      const is30d = timePeriod.value === "30d";
      const categories = chartData.value.map((item) => item.time);

      const xaxisConfig: ApexXAxis = {
        type: is30d ? "datetime" : "category",
        labels: {
          style: { colors: labelColor },
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
      };

      if (is30d) {
        xaxisConfig.categories = undefined;
        xaxisConfig.tickAmount = 7;
        xaxisConfig.labels!.formatter = (value: string) => {
          const date = new Date(value);
          const diff = Math.floor(
            (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24)
          );
          if (diff === 0) return "Today";
          if (diff === 29) return "30d ago";
          return diff % 5 === 0 ? `${diff + 1}d` : "";
        };
      } else {
        xaxisConfig.categories = categories;
      }

      return {
        chart: {
          type: "line",
          fontFamily: "inherit",
          toolbar: { show: false },
          zoom: { enabled: false },
        },
        stroke: {
          curve: "smooth",
          width: 2,
        },
        markers: {
          size: 2,
        },
        xaxis: xaxisConfig,
        yaxis: [
          {
            seriesName: "Consumption (kW)",
            title: { text: "Consumption (kW)" },
            labels: {
              style: { colors: labelColor },
            },
          },
          {
            opposite: true,
            seriesName: "Generation (kW)",
            title: { text: "Generation (kW)" },
            labels: {
              style: { colors: labelColor },
            },
          },
        ],
        tooltip: {
          shared: true,
          x: {
            formatter: (val: any, opts: any) => {
              const point = chartData.value[opts.dataPointIndex];

              if (is30d && point?.actualDate) {
                // Show exact date like "Apr 7, 2025"
                return point.actualDate.toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                });
              }

              return point?.time ?? val;
            },
          },
          y: {
            formatter: (val: number) => `${val.toFixed(1)} kW`,
          },
        },

        colors: [consumptionColor, generationColor],
        grid: {
          borderColor: gridColor,
          strokeDashArray: 4,
        },
        legend: {
          position: "top",
          horizontalAlign: "right",
          labels: { colors: labelColor },
        },
      };
    });

    // Set the selected time period
    const setTimePeriod = (period: string) => {
      if (["24h", "7d", "30d"].includes(period)) {
        timePeriod.value = period as "24h" | "7d" | "30d";
      }
    };

    return {
      chartRef,
      chartSeries,
      chartOptions,
      setTimePeriod,
      timePeriod,
    };
  },
});
</script>
