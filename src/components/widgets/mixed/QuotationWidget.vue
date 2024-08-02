<template>
  <!--begin::Mixed Widget 1-->
  <div class="card card-xxl-stretch">
    <!--begin::Header-->
    <div :class="`bg-${widgetColor}`" class="card-header border-0 py-5">
      <h3 class="card-title fw-bold text-white">Quotation Sent</h3>
    </div>
    <!--end::Header-->
    <!--begin::Body-->
    <div class="card-body p-0">
      <!--begin::Chart-->
      <apexchart
        :ref="chartRef"
        :class="`bg-${widgetColor}`"
        class="mixed-widget-2-chart card-rounded-bottom"
        :options="chart"
        :series="series"
        height="200"
        type="area"
      ></apexchart>
      <!--end::Chart-->
      <!--begin::Stats-->
      <div class="card-p mt-n0 position-relative">
        <!--begin::Row-->
        <div class="row m-0">
          <div class="col bg-light-warning px-6 py-8 rounded-2 me-7 mb-7">
            <p class="fs-2x text-warning d-block my-2">{{ selectedYearCache || "" }}</p>
            <span class="text-warning fw-semobold fs-6"> Year </span>
          </div>
          <div class="col bg-light-primary px-6 py-8 rounded-2 mb-7">
            <p class="fs-2x text-primary d-block my-2">{{ quotationYearWise || "0" }}</p>
            <span class="text-primary fw-semobold fs-6"> Total Quotation Sent </span>
          </div>
        </div>
        <!--end::Row-->
      </div>
      <!--end::Stats-->
      <!--end::Body-->
    </div>
    <!--end::Mixed Widget 1-->
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent, onBeforeMount, onMounted, ref, watch } from "vue";
import { useThemeStore } from "@/stores/theme";
import type { ApexOptions } from "apexcharts";
import { getCSSVariableValue } from "@/assets/ts/_utils";
import type VueApexCharts from "vue3-apexcharts";
import { useAuthStore } from "@/stores/auth";
import { quotationSent } from "@/stores/api";
import { useMonthUtilsDashboard } from "@/core/model/dashboard";

export default defineComponent({
  name: "quotations-widget",
  components: {
  },
  props: {
    widgetClasses: String,
    widgetColor: String,
    strokeColor: String,
  },
  setup(props) {
    const auth = useAuthStore();
    const User = auth.GetUser();

    const quotationYearWise = ref(0);

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
        name: "Quotation Send",
        data: [65, 80, 80, 60, 60, 78, 45, 80, 80, 70, 50, 90],
      },
    ]);

    const themeMode = computed(() => {
      return store.mode;
    });

    const chartOptions = (
      widgetColor: string = "danger",
      strokeColor: string | undefined
    ): ApexOptions => {
      const labelColor = getCSSVariableValue("--bs-gray-500");
      const borderColor = getCSSVariableValue("--bs-gray-200");
      const color = getCSSVariableValue(`--bs-${widgetColor}`);

      return {
        chart: {
          fontFamily: "inherit",
          type: "area",
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
          sparkline: {
            enabled: true,
          },
          dropShadow: {
            enabled: true,
            enabledOnSeries: undefined,
            top: 5,
            left: 0,
            blur: 3,
            color: strokeColor,
            opacity: 0.5,
          },
        },
        plotOptions: {},
        legend: {
          show: false,
        },
        dataLabels: {
          enabled: false,
        },
        fill: {
          type: "solid",
          opacity: 1,
        },
        stroke: {
          curve: "smooth",
          show: true,
          width: 3,
          colors: [strokeColor as string],
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
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            style: {
              colors: labelColor,
              fontSize: "12px",
            },
          },
          crosshairs: {
            show: false,
            position: "front",
            stroke: {
              color: borderColor,
              width: 1,
              dashArray: 3,
            },
          },
        },
        yaxis: {
          min: 0,
          max: 100,
          labels: {
            show: false,
            style: {
              colors: labelColor,
              fontSize: "12px",
            },
          },
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
        markers: {
          colors: [color],
          strokeColors: [strokeColor as string],
          strokeWidth: 3,
        },
      };
    };

    async function handleChange() {
      try {
        const response = await quotationSent(
          User.company_id,
          selectedYearCache.value
            ? selectedYearCache.value
            : financialYears.value[0]
        );

        if (response?.success) {
          series.value = [
            {
              name: "Quotation Sent",
              data: [...response.result.quotationsByMonth]
            },
          ];

          quotationYearWise.value = response.result.totalCount || 0;

        } else {
          console.error(
            `Error Occured in quotationSent : ${
              response.message || "Error Occured in API"
            }`
          );
        }
      } catch (err) {
        console.error(`Error Occured in quotationSent : ${err}`);
      }
    }

    onBeforeMount(() => {
      Object.assign(chart, chartOptions(props.widgetColor, props.strokeColor));
    });

    const refreshChart = () => {
      if (!chartRef.value) {
        return;
      }

      Object.assign(chart, chartOptions(props.widgetColor, props.strokeColor));

      chartRef.value.refresh();
    };

    onMounted(async () => {
      
      try {
        await handleChange();
      } catch (error) {
        // Handle errors, e.g., show an error message
        console.error("Error fetching quotation sent data:", error);
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
      getAssetPath,
      selectedYearCache,
      financialYears,
      handleChange,
      quotationYearWise,
    };
  },
});
</script>
