<template>
  <div class="card card-flush">
    <div class="card-header pt-5">
      <!--begin::Title-->

      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold text-dark">Sales Report</span>
        <span class="text-gray-400 mt-1 fw-semibold fs-6"
          >overview as per {{ selectedYear }}</span
        >
      </h3>

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
    </div>
    <apexchart
      className="h-lg-100"
      height="400"
      type="bubble"
      :options="options"
      :series="series"
    ></apexchart>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { useThemeStore } from "@/stores/theme";
import { useAuthStore } from "@/stores/auth";
import { salesDone } from "@/stores/api";
import { getCSSVariableValue } from "@/assets/ts/_utils";

interface Data {
  year: number;
  sales_by_month: any[]; // Adjust the type based on the actual structure
  yearly_sale: number;
}

interface BubbleChartData {
  name: string;
  data: { x: string; y: number; z: number }[];
}

export default defineComponent({
  name: "default-dashboard-widget-14",
  components: {},
  setup() {
    const auth = useAuthStore();
    const User = auth.GetUser();
    const store = useThemeStore();
    const labelColor = getCSSVariableValue("--bs-gray-500");

    const months = [
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
    ];
    const options = ref({
      chart: {
        type: "bubble",
        height: 300,
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: "gradient",
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
        labels: {
          style: {
            colors: labelColor,
            fontSize: "12px",
          },
        },
      },
      yaxis: {
        max: 10000,
        min: 0,
        tickAmount: 5,
        labels: {
          style: {
            colors: labelColor,
            fontSize: "12px",
          },
        },
      },
      grid: {
        borderColor: labelColor,
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
      theme: {
        palette: "palette2",
      },
    });

    const series = ref<BubbleChartData[]>([
      {
        name: "Sale",
        data: [
          { x: "Jan", y: 3000, z: 36 },
          { x: "Feb", y: 5000, z: 10 },
          { x: "Mar", y: 7000, z: 20 },
          { x: "Apr", y: 1000, z: 34 },
          { x: "May", y: 1400, z: 17 },
          { x: "Jun", y: 3600, z: 38 },
          { x: "Jul", y: 5770, z: 46 },
          { x: "Aug", y: 3800, z: 33 },
          { x: "Sep", y: 7488, z: 22 },
          { x: "Oct", y: 3000, z: 44 },
          { x: "Nov", y: 8044, z: 55 },
          { x: "Dec", y: 4600, z: 11 },
        ],
      },
    ]);

    const currentYear = new Date().getFullYear();
    const selectedYear = ref(currentYear);

    // Generate an array of the last 5 years
    const yearOptions = Array.from(
      { length: 5 },
      (_, index) => currentYear - index
    );

    const data = ref<Data[]>([]);
    const saleYearWise = ref(0);

    function SetYearlyData(year) {
      // console.log(year);

      const yearData = data.value.find((entry) => entry.year === year);
      saleYearWise.value = yearData ? yearData.yearly_sale : 0;

      series.value = [
        {
          name: "Sale",
          data: yearData
            ? yearData.sales_by_month.map((entry) => ({
                x: months[entry.month - 1],
                y: entry.monthly_sale,
                z: entry.monthly_sale
                  ? Math.floor(Math.random() * (75 - 15 + 1)) + 15
                  : 10, // Adjust this based on your data structure
              }))
            : [],
        },
      ];

      // console.log(series.value);
    }

    onMounted(async () => {
      try {
        const company_id = User.company_id;

        // Pass both company_id and yearOptions to enquiryGen function
        const response = await salesDone(company_id, yearOptions);

        // Handle the response from the backend, e.g., update the UI or store the data
        // console.log(response);
        data.value = response.result;
        SetYearlyData(selectedYear.value);
        // console.log(data.value);
      } catch (error) {
        // Handle errors, e.g., show an error message
        console.error("Error fetching leads data:", error);
      }
    });

    return {
      options,
      series,
      getAssetPath,
      selectedYear,
      yearOptions,
      SetYearlyData,
      saleYearWise,
    };
  },
});
</script>
