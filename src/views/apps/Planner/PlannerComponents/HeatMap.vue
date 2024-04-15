<template>
  <div class="card">
    <div class="table-responsive mb-10">
      <table
        class="table table-responsive g-5 gs-0 m-2 w-100 fw-bold text-gray-700 table-bordered"
      >
        <thead>
          <tr class="fs-5 fw-bold text-gray-700 text-center">
            <th>Year 2024-2025</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-center">
              <apexchart
                type="heatmap"
                height="450"
                style="min-width: 800px"
                :options="chartOptions"
                :series="series"
              ></apexchart>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
  
  <script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref, reactive } from "vue";
import { useThemeStore } from "@/stores/theme";
import { useAuthStore } from "@/stores/auth";
import { leadConversion } from "@/stores/api";
import { getCSSVariableValue } from "@/assets/ts/_utils";
import { getPlansWithPlanner } from "@/stores/api";

interface HeatmapSeries {
  options: any; // Define your options type appropriately
  series: HeatmapSeriesItem[]; // This should be an array of HeatmapSeriesItem
}

interface HeatmapSeriesItem {
  name: string;
  data: { name: string; data: number[] }[];
}

// Define the type for seriesData
interface SeriesDataItem {
  name: string;
  data: number[]; // Adjust this according to the type of data you have
}

export default defineComponent({
  name: "default-dashboard-widget-13",
  components: {},
  setup() {
    const labelColor = getCSSVariableValue("--bs-gray-500");
    const series = ref([
      {
        id: "1",
        name: "Training Plan",
        data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
      },
      {
        id: "2",
        name: "Intermediate Check Plan",
        data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
      },
      {
        id: "3",
        name: "Maintenance Plan",
        data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
      },
      {
        id: "4",
        name: "Replicate Plan",
        data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
      },
      {
        id: "5",
        name: "Interlaboratory Comparison Plan",
        data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
      },
      {
        id: "6",
        name: "Internal Audit Plan",
        data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
      },
      {
        id: "7",
        name: "MRM Plan",
        data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
      },
    ]);

    const chartOptions = ref({
      chart: {
        height: 450,
        type: "heatmap",
        toolbar: {
          show: false,
        },
        redrawOnParentResize: true,
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#001f3f"],
      xaxis: {
        categories: [
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
        labels: {
          style: {
            colors: "gray",
            fontSize: "12px",
          },
        },
      },
      yaxis: {
        categories: [
          "Training Plan",
          "Intermediate Check Plan",
          "Maintenance Plan",
          "Replicate Plan",
          "Interlaboratory Comparison Plan",
          "Internal Audit Plan",
          "MRM Plan",
        ],
        labels: {
          style: {
            colors: "gray",
            fontSize: "12px",
          },
        },
      },
      legend: {
        show: true,
      },
    });

    const data = ref([]);
    // // Initialize seriesData as an empty array of SeriesDataItem
    // const seriesData: SeriesDataItem[] = [];

    // Fetch data from the API and update series data
    onMounted(async () => {
      try {
        const response = await getPlansWithPlanner();

        if (response) {
          series.value = response.map((planData) => ({
            id: planData.plan_id.toString(),
            name: planData.plan_name,
            data: planData.counts_by_month,
          }));
        }
      } catch (error) {
        console.error("Error fetching plans data:", error);
      }
    });

    return {
      // heatmapData,
      series,
      chartOptions,
    };
  },
});
</script>
  