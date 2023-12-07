<template>
  <div class="card card-flush" :class="className">
    <!--begin::Header-->
    <div class="card-header pt-5">
      <!--begin::Title-->

      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold text-dark">Quotations</span>
        <span class="text-gray-400 mt-1 fw-semibold fs-6"
          >overview as per {{ selectedYear }}</span
        >
      </h3>
      <!--end::Title-->
      <!--begin::Toolbar-->
      <div class="card-toolbar">
        <el-select
          filterable
          v-model="selectedYear"
          placeholder="Select Year"
          v-on:change="SetYearlyData"
        >
          <el-option
            v-for="year in yearOptions"
            :key="year"
            :label="year"
            :value="year"
          ></el-option>
        </el-select>
      </div>
      <!--end::Toolbar-->
    </div>

    <div class="card-header pt-5">
      <div class="d-flex flex-stack mb-6">
        <!--begin::Title-->
        <div class="flex-shrink-0 me-5">
          <span class="badge badge-light-success rounded fs-2hx p-4 fw-bold text-success me-2 lh-1 ls-n2">{{
            QuotationYearWise
          }}</span>
          <span class="text-gray-400 fs-7 fw-bold m-2 d-block lh-1 pb-1"
            >Total Quotations Sent</span
          >
        </div>
        <!--end::Title-->
      </div>
    </div>
    <!--end::Header-->
    <!--begin::Card body-->
    <div class="card-body d-flex align-items-center p-0">
      <!--begin::Chart-->
      <apexchart
        class="min-h-auto w-100 ps-4 pe-6"
        :ref="chartRef"
        :options="chart"
        :series="series"
        :height="height"
      ></apexchart>
      <!--end::Chart-->
    </div>
    <!--end::Card body-->
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import type { ApexOptions } from "apexcharts";
import { getCSSVariableValue } from "@/assets/ts/_utils";
import type VueApexCharts from "vue3-apexcharts";
import { useThemeStore } from "@/stores/theme";
import { useAuthStore } from "@/stores/auth";
import { quotationSent } from "@/stores/api";

interface Data {
  year: number;
  quotations_by_month: any[]; // Adjust the type based on the actual structure
  total_quotations_count: number;
}

export default defineComponent({
  name: "default-dashboard-widget-12",
  components: {},
  props: {
    className: { type: String, required: false },
    height: { type: Number, required: true },
  },
  setup(props) {
    const auth = useAuthStore();
    const User = auth.GetUser();

    const chartRef = ref<typeof VueApexCharts | null>(null);
    let chart: ApexOptions = {};
    const store = useThemeStore();

    const series = ref([
      {
        name: "Quotations Sent",
        data: [65, 80, 80, 60, 60, 0, 45, 80, 80, 70, 0, 90],
        type: "area",
      },
    ]);

    const themeMode = computed(() => {
      return store.mode;
    });

    const chartOptions = (height: number): ApexOptions => {
      const labelColor = getCSSVariableValue("--bs-gray-500");
      const borderColor = getCSSVariableValue("--bs-border-dashed-color");
      const baseprimaryColor = getCSSVariableValue("--bs-success");
      const lightprimaryColor = getCSSVariableValue("--bs-warning");
      const basesuccessColor = getCSSVariableValue("--bs-success");
      const lightsuccessColor = getCSSVariableValue("--bs-success");

      return {
        chart: {
          fontFamily: "inherit",
          type: "area",
          height: height,
          toolbar: {
            show: true,
            tools: {
              download: true,
              selection: true,
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: true,
              reset: true,
            },
          },
        },
        plotOptions: {},
        legend: {
          show: true,
        },
        dataLabels: {
          enabled: false,
        },
        fill: {
          type: "normal",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.4,
            opacityTo: 0.2,
            stops: [15, 120, 100],
          },
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          tickPlacement: "on",
          axisTicks: {
            show: true,
          },
          labels: {
            rotate: 0,
            style: {
              colors: labelColor,
              fontSize: "12px",
            },
          },
        },
        yaxis: {
          max: 50,
          min: 0,
          tickAmount: 5,
          labels: {
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
          fillSeriesColor: false,
        },
        colors: [lightprimaryColor, lightsuccessColor],
        grid: {
          borderColor: borderColor,
          strokeDashArray: 4,
          yaxis: {
            lines: {
              show: true,
            },
          },
        },
        markers: {
          strokeWidth: 3,
        },
      };
    };

    const currentYear = new Date().getFullYear();
    const selectedYear = ref(currentYear);

    // Generate an array of the last 5 years
    const yearOptions = Array.from(
      { length: 5 },
      (_, index) => currentYear - index
    );

    const QuotationsData = ref<Data[]>([]);
    const QuotationYearWise = ref(0);

    function SetYearlyData(year) {
      console.log(year);

      const yearData = QuotationsData.value.find((entry) => entry.year === year);
      QuotationYearWise.value = yearData ? yearData.total_quotations_count : 0;
      const QuotationsByMonthArray = yearData
        ? yearData.quotations_by_month.map((entry) => entry.quotation_sent)
        : [];

      console.log(QuotationsByMonthArray);

      series.value = [
        {
          name: "Quotations Sent",
          data: QuotationsByMonthArray,
          type: "area",
        },
      ];
    }

    onMounted(async () => {
      Object.assign(chart, chartOptions(props.height));

      try {
        const company_id = User.company_id;

        // Pass both company_id and yearOptions to enquiryGen function
        const response = await quotationSent(company_id, yearOptions);

        // Handle the response from the backend, e.g., update the UI or store the data
        console.log(response);
        QuotationsData.value = response.result;
        SetYearlyData(selectedYear.value);
        console.log(QuotationsData.value);
      } catch (error) {
        // Handle errors, e.g., show an error message
        console.error("Error fetching leads data:", error);
      }

      setTimeout(() => {
        refreshChart();
      }, 200);
    });

    const refreshChart = () => {
      if (!chartRef.value) {
        return;
      }

      Object.assign(chart, chartOptions(props.height));

      chartRef.value.refresh();
    };

    watch(themeMode, () => {
      refreshChart();
    });

    return {
      chart,
      chartRef,
      series,
      getAssetPath,
      selectedYear,
      yearOptions,
      SetYearlyData,
      QuotationYearWise,
    };
  },
});
</script>
