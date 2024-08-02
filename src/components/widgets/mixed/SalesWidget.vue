<template>
  <!--begin::Mixed Widget 11-->
  <div :class="widgetClasses" class="card">
    <!--begin::Header-->
    <div :class="`bg-${widgetColor}`" class="card-header border-0 py-5">
      <h3 class="card-title fw-bold text-dark">Sales Done</h3>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body p-0">
      <!--begin::Chart-->
      <apexchart
        :ref="chartRef"
        :class="`bg-${widgetColor}`"
        class="mixed-widget-12-chart card-rounded-bottom"
        :options="chart"
        :series="series"
        height="200"
        type="line"
      ></apexchart>
      <!--end::Chart-->

      <!--begin::Stats-->
      <div class="card-p mt-n0 position-relative">
        <!--begin::Row-->
        <div class="row m-0">
          <div class="col bg-light-warning px-6 py-8 rounded-2 me-7 mb-7">
            <p class="fs-2x text-warning d-block my-2">
              {{ selectedYearCache || "" }}
            </p>
            <span class="text-warning fw-semobold fs-6"> Year </span>
          </div>
          <div class="col bg-light-primary px-6 py-8 rounded-2 me-7 mb-7">
            <p class="fs-2x text-primary d-block my-2">
              {{ totalCount || "0" }}
            </p>
            <span class="text-primary fw-semobold fs-6">
              Total Quotations
            </span>
          </div>
          <div class="col bg-light-success px-6 py-8 rounded-2 me-7 mb-7">
            <p class="fs-2x text-success d-block my-2">
              Rs.{{ totalAmount || "0" }}
            </p>
            <span class="text-success fw-semobold fs-6"> Total Amount </span>
          </div>
        </div>
        <!--end::Row-->
        <!--end::Row-->
      </div>
      <!--end::Stats-->
    </div>
    <!--end::Body-->
  </div>
  <!--end::Mixed Widget 11-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import {
  computed,
  defineComponent,
  onMounted,
  onBeforeMount,
  ref,
  watch,
} from "vue";
import { getCSSVariableValue } from "@/assets/ts/_utils";
import type VueApexCharts from "vue3-apexcharts";
import type { ApexOptions } from "apexcharts";
import { useThemeStore } from "@/stores/theme";
import { useAuthStore } from "@/stores/auth";
import { salesDone } from "@/stores/api";
import { useMonthUtilsDashboard } from "@/core/model/dashboard";

export default defineComponent({
  name: "conversions-widget",
  props: {
    widgetClasses: String,
    widgetColor: String,
    chartHeight: String,
  },
  components: {
  },
  setup(props) {
    const auth = useAuthStore();
    const User = auth.GetUser();

    const totalCount = ref(0);
    const totalAmount = ref(0);

    // Getting the Financial Year Type from the Local Storage
    // By default is 2
    const financialYearType = Number(
      localStorage.getItem("financialYearType") || 2
    );

    const financialYears = ref(auth.financialYears); // Generate Financial years list using the auth store function
    const selectedYearCache = ref(
      localStorage.getItem("selectedFinancialYear") || ""
    );

    // Fallback to default value if localStorage data is invalid or missing
    if (!financialYears.value.includes(selectedYearCache.value)) {
      selectedYearCache.value = financialYears.value[0];
    }

    const { months, currentYear, currentMonth, getMonthName } =
      useMonthUtilsDashboard(financialYearType);

    const chartRef = ref<typeof VueApexCharts | null>(null);
    let chart: ApexOptions = {};
    const store = useThemeStore();

    const series = ref([
      {
        name: "Quotations Count",
        type: "column",
        data: [30, 40, 220, 39, 27, 17, 30, 400, 31, 420, 320, 110],
      },
      {
        name: "Sales",
        type: "area",
        data: [
          1000, 2000, 3000, 2000, 1500, 50000, 60000, 28000, 10000, 20500,
          25600, 7000,
        ],
      },
    ]);

    const themeMode = computed(() => {
      return store.mode;
    });

    const chartOptions = (chartHeight: string = "auto"): ApexOptions => {
      const labelColor = getCSSVariableValue("--bs-gray-700");
      const borderColor = getCSSVariableValue("--bs-gray-200");

      const baseColor = getCSSVariableValue("--bs-primary");
      const secondaryColor = getCSSVariableValue("--bs-warning");

      return {
        chart: {
          fontFamily: "inherit",
          height: chartHeight,
          type: "line",
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
          selection: {
            enabled: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "30%",
            borderRadius: 5,
          },
        },
        legend: {
          show: true,
          labels: {
            colors: labelColor,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: [1, 2],
          colors: [baseColor, secondaryColor],
        },
        xaxis: {
          categories: months.map((item) => item.name) || [
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
            "Jan",
            "Feb",
            "Mar",
          ],
          axisBorder: {
            show: false,
            color: labelColor,
          },
          axisTicks: {
            show: false,
            color: labelColor,
          },
          labels: {
            show: true,
            style: {
              colors: labelColor,
              fontSize: "12px",
            },
          },
        },
        yaxis: {
          min: 0,
          max: 100000,
          labels: {
            show: false,
            style: {
              colors: labelColor,
              fontSize: "12px",
            },
          },
        },
        fill: {
          type: "solid",
          opacity: [1, 0.5],
        },
        states: {
          normal: {
            filter: {
              type: "none",
              value: 0,
            },
          },
          hover: {
            filter: {
              type: "none",
              value: 0,
            },
          },
          active: {
            allowMultipleDataPointsSelection: false,
            filter: {
              type: "none",
              value: 0,
            },
          },
        },
        tooltip: {
          style: {
            fontSize: "12px",
          },
          marker: {
            show: false,
          },
        },
        colors: [baseColor, secondaryColor],
        grid: {
          borderColor: borderColor,
          yaxis: {
            lines: {
              show: false,
            },
          },
          padding: {
            left: 20,
            right: 20,
          },
        },
      };
    };

    async function handleChange() {
      try {
        const response = await salesDone(
          User.company_id,
          selectedYearCache.value
            ? selectedYearCache.value
            : financialYears.value[0]
        );

        if (response?.success) {
          series.value = [
            {
              name: "Quotations Count",
              type: "column",
              data: [...response.result.quotationsByMonth],
            },
            {
              name: "Sales",
              type: "area",
              data: [...response.result.totalsByMonth],
            },
          ];

          totalCount.value = response.result.totalCount || 0;
          totalAmount.value = response.result.totalAmount || 0;
        } else {
          console.error(
            `Error Occured in salesDone : ${
              response.message || "Error Occured in API"
            }`
          );
        }
      } catch (err) {
        console.error(`Error Occured in salesDone : ${err}`);
      }
    }

    onBeforeMount(() => {
      Object.assign(chart, chartOptions(props.chartHeight));
    });

    const refreshChart = () => {
      if (!chartRef.value) {
        return;
      }

      Object.assign(chart, chartOptions(props.chartHeight));

      chartRef.value.refresh();
    };

    onMounted(async () => {
      try {
        await handleChange();
      } catch (error) {
        // Handle errors, e.g., show an error message
        console.error("Error fetching lead conversion data:", error);
      }

      setTimeout(() => {
        refreshChart();
      }, 200);
    });

    watch(themeMode, () => {
      refreshChart();
    });

    return {
      chart,
      series,
      chartRef,
      refreshChart,
      getAssetPath,
      selectedYearCache,
      financialYears,
      handleChange,
      totalCount,
      totalAmount,
    };
  },
});
</script>
