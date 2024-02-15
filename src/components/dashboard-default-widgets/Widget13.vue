<template>
  <div class="card card-flush">
    <div class="card-header pt-5">
      <!--begin::Title-->

      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold text-dark">Leads Conversion</span>
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
      type="bar"
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
import { leadConversion } from "@/stores/api";
import { getCSSVariableValue } from "@/assets/ts/_utils";

interface Data {
  year: number;
  monthly_data: any[]; // Adjust the type based on the actual structure
  total_leads_count: number;
  total_customers_count: number;
  total_actual_leads_count: number;
}

export default defineComponent({
  name: "default-dashboard-widget-13",
  components: {},
  setup() {
    const auth = useAuthStore();
    const User = auth.GetUser();
    const store = useThemeStore();
    const labelColor = getCSSVariableValue("--bs-gray-500");

    const options = ref({
      chart: {
        id: "vuechart-example",
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
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: true,
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
    });

    const series = ref([
      {
        name: "Total Leads",
        data: [30, 40, 22, 39, 27, 17, 30, 40, 31, 42, 32, 11],
      },
      {
        name: "Leads to Customer",
        data: [10, 30, 25, 20, 30, 35, 44, 28, 10, 20, 25, 15],
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
    const leadYearWise = ref(0);

    function SetYearlyData(year) {
      // console.log(year);

      const yearData = data.value.find((entry) => entry.year === year);
      leadYearWise.value = yearData ? yearData.total_actual_leads_count : 0;

      const ActualLeadsByMonthArray = yearData
        ? yearData.monthly_data.map((entry) => entry.actual_leads)
        : [];

      // console.log(ActualLeadsByMonthArray);

      const ConvertedLeadsByMonthArray = yearData
        ? yearData.monthly_data.map((entry) => entry.customers_count)
        : [];

      // console.log(ConvertedLeadsByMonthArray);

      series.value = [
        {
          name: "Total Leads",
          data: ActualLeadsByMonthArray,
        },
        {
          name: "Leads to Customer",
          data: ConvertedLeadsByMonthArray,
        },
      ];
    }

    onMounted(async () => {
      try {
        const company_id = User.company_id;

        // Pass both company_id and yearOptions to enquiryGen function
        const response = await leadConversion(company_id, yearOptions);

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
      leadYearWise,
    };
  },
});
</script>
