<template>
  <div :class="widgetClasses" class="card h-auto">
    <!-- Chart Header -->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1 text-gray-800"
          >Energy Consumption (kWh)</span
        >
      </h3>
      <!-- Time Period Tabs -->
      <ul class="nav nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-6">
        <li class="nav-item">
          <a
            href="#"
            class="nav-link"
            :class="{ active: timePeriod === '24h' }"
            @click.prevent="setTimePeriod('24h')"
            >24h</a
          >
        </li>
        <li class="nav-item">
          <a
            href="#"
            class="nav-link"
            :class="{ active: timePeriod === '7d' }"
            @click.prevent="setTimePeriod('7d')"
            >7d</a
          >
        </li>
        <li class="nav-item">
          <a
            href="#"
            class="nav-link"
            :class="{ active: timePeriod === '30d' }"
            @click.prevent="setTimePeriod('30d')"
            >30d</a
          >
        </li>
      </ul>
    </div>

    <!-- Chart Body -->
    <div>
      <apexchart
        ref="energyChartRef"
        type="line"
        :height="height"
        :options="energyChartOptions"
        :series="energyChartSeries"
      />
    </div>
  </div>
</template>
  
  <script lang="ts">
import { computed, defineComponent, ref } from "vue";
import type { ApexOptions } from "apexcharts";
import VueApexCharts from "vue3-apexcharts";
import { getCSSVariableValue } from "@/assets/ts/_utils";
import { generateDailyEnergyData, generateHourlyEnergyData } from "@/core/data/chartData";

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
    const energyChartRef = ref<typeof VueApexCharts | null>(null);
    const timePeriod = ref("24h");

    // Sample energy data for different time periods (single series)
    const energyData = {
      "24h": generateHourlyEnergyData(),
      "7d": generateDailyEnergyData(7),
      "30d": generateDailyEnergyData(30),
    };

    const energyChartSeries = computed(() => {
      return [
        {
          name: "Energy Consumption",
          data: energyData[timePeriod.value].map((item) => item.value),
        },
      ];
    });

    const energyChartOptions = computed<ApexOptions>(() => {
      const labelColor = "gray";
      const borderColor = getCSSVariableValue("--bs-gray-200");
      const gridColor = getCSSVariableValue("--bs-gray-500");
      const primaryColor = getCSSVariableValue("--bs-success"); // Using success color for energy

      const is30dView = timePeriod.value === "30d";
      const categories = energyData[timePeriod.value].map((item) => item.time);

      const xaxisConfig: ApexXAxis = {
        type: is30dView ? "datetime" : "category",
        labels: {
          style: { colors: labelColor, fontSize: "12px" },
          formatter: is30dView
            ? (value: string) => {
                const date = new Date(value);
                const day = date.getDate();
                const showLabel = day % 5 === 0 || day === 1 || day === 30;
                return showLabel ? `${day}d` : "";
              }
            : undefined,
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
      };

      if (is30dView) {
        xaxisConfig.categories = undefined;
        xaxisConfig.tickAmount = 7;
        xaxisConfig.labels = {
          ...xaxisConfig.labels,
          formatter: (value: string) => {
            const date = new Date(value);
            const dayDiff = Math.floor(
              (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24)
            );
            if (dayDiff === 0) return "Today";
            if (dayDiff === 29) return "30d ago";
            if (dayDiff % 5 === 0) return `${dayDiff + 1}d`;
            return "";
          },
        };
      } else {
        xaxisConfig.categories = categories;
      }

      return {
        chart: {
          fontFamily: "inherit",
          type: "line",
          toolbar: { show: false },
          zoom: { enabled: false },
          animations: { enabled: false },
        },
        stroke: {
          curve: "smooth",
          width: 3,
          colors: [primaryColor],
        },
        markers: {
          size: 0,
          hover: { size: 0 },
        },
        xaxis: xaxisConfig,
        yaxis: {
          labels: {
            style: { colors: labelColor, fontSize: "12px" },
            formatter: (val: number) => `${val.toFixed(0)}`,
          },
        },
        tooltip: {
          enabled: true,
          shared: true,
          intersect: false,
          x: {
            formatter: (val: any) => {
              if (timePeriod.value === "30d") {
                const date = new Date(val);
                const dayDiff = Math.floor(
                  (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24)
                );
                return dayDiff === 0 ? "Today" : `${dayDiff + 1}d ago`;
              }
              return val;
            },
          },
          y: {
            formatter: (val: number) => val.toFixed(1) + " kWh",
          },
        },
        colors: [primaryColor],
        grid: {
          borderColor: gridColor,
          strokeDashArray: 4,
          yaxis: {
            lines: {
              show: true,
              opacity: 0.3,
            },
          },
          xaxis: {
            lines: {
              show: true,
              opacity: 0.3,
            },
          },
          padding: {
            top: 0,
            right: 10,
            bottom: 0,
            left: 10,
          },
        },
        legend: {
          show: false, // No legend needed for single series
        },
      };
    });

    const setTimePeriod = (period: string) => {
      timePeriod.value = period;
    };

    return {
      energyChartRef,
      energyChartOptions,
      energyChartSeries,
      setTimePeriod,
      timePeriod,
    };
  },
});
</script>