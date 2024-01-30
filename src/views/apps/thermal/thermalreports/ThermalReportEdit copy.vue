<template>
  <div class="container-fluid draw-io-container">
    <div class="row">
      <!-- First Grid - Shapes and Icons -->
      <div class="col-md-8">
        <div class="card mb-1">
          <div class="card-body">
            <h6 class="card-text">Drag shapes</h6>
            <!-- Nested Grid for Shapes and Icons -->
            <div class="row text-nowrap shapes">
              <div class="col-3 text-center mb-1">
                <button
                  @click="selectShape('sqaure')"
                  class="btn btn-default border"
                >
                  <i class="bi bi-square fs-3"></i>
                  <div>Square</div>
                </button>
              </div>
              <div class="col-3 text-center mb-1">
                <button
                  @click="selectShape('rectangle')"
                  class="btn btn-default border"
                >
                  <i class="bi bi-square fs-3"></i>
                  <div>Rectangle</div>
                </button>
              </div>
              <div class="col-3 text-center mb-1">
                <button
                  @click="selectShape('door')"
                  class="btn btn-default border"
                >
                  <i class="bi bi-door-closed fs-3"></i>
                  <div>Door</div>
                </button>
              </div>
              <div class="col-3 text-center mb-1">
                <button
                  @click="selectShape('window')"
                  class="btn btn-default border"
                >
                  <i class="bi bi-window fs-3"></i>
                  <div>Window</div>
                </button>
              </div>
              <!-- Add more shape buttons as needed -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Canvas -->
    <div class="row">
      <div class="canvas-container col-md-12">
        <canvas ref="diagramCanvas" width="1000" height="600"></canvas>
      </div>
    </div>
  </div>



  <div class="card card-flush h-lg-100">
    <!--begin::Card body-->
    <div class="card-body d-flex align-items-center p-0">
      <!-- begin::Chart-->
      <!-- <apexchart
        class="min-h-auto w-100 ps-4 pe-6"
        :ref="chartRef"
        :options="chart"
        :series="series"
        :height="height"
      ></apexchart> -->
      <!--end::Chart -->
      <apexchart type="line" :options="chartOptions" :series="chartSeries"></apexchart>
    </div>
    <!--end::Card body-->
  </div>

</template>

<script lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { addThermalReport, getThermalReport } from "@/stores/api";
import ApiService from "@/core/services/ApiService";
import type VueApexCharts from "vue3-apexcharts";

export default {
    components: {
  },
  setup() {

    const chartOptions = ref({
      chart: {
        height: 350,
        type: 'line',
      },
      xaxis: {
        categories: [],
      },
    });

    const chartSeries = ref([]);

    const excelData = thermalReportDetails.value.excel_data

    const dates = thermalReportDetails.value.dates

    const updateChartData = () => {
      chartOptions.value.xaxis.categories = dates;
      chartSeries.value = [];

      excelData.forEach((data) => {
        const series = {
          name: data.instrument_name,
          data: data.data.map((entry) => entry.temp),
        };
        chartSeries.value.push(series);
      });
    };





    const diagramCanvas = ref(null);
    const context = ref(null);
    const drawing = ref(false);
    const currentShape = ref(null);
    const shapes = ref([]);
    const circles = ref([]);

    const auth = useAuthStore();
    const router = useRouter();
    const route = useRoute();
    const User = auth.GetUser();
    const itemId = route.params.id;

    const thermalReportDetails = ref({
      instruments: [
        {
          id: "",
          instrument_name: "",
          instrument_id: "",
          serial_no: "",
        },
      ],
      excel_data: [
        {
          file_name: "",
          id: "",
          instrument_name: "",
          instrument_id: "",
          logger_id: "",
          file_size: 0,
          data: [],
          MAX_TEMP: 0,
          MIN_TEMP: 0,
          MAX_RH: 0,
          MIN_RH: 0,
        },
      ],

      dates: ref<string>([]),

      min_temp: {
        instrument_id: "",
        logger_id: "",
        reading: Number.MAX_VALUE,
      },

      max_temp: {
        instrument_id: "",
        logger_id: "",
        reading: Number.MIN_VALUE,
      },

      min_rh: {
        instrument_id: "",
        logger_id: "",
        reading: Number.MAX_VALUE,
      },

      max_rh: {
        instrument_id: "",
        logger_id: "",
        reading: Number.MIN_VALUE,
      },

      avg_temp: 0,
      avg_rh: 0,
    });

    const selectShape = (shape) => {
      currentShape.value = shape;
    };

    const clearCanvas = () => {
      // Clear canvas logic
      context.value.clearRect(
        0,
        0,
        diagramCanvas.value.width,
        diagramCanvas.value.height
      );
    };

    onMounted(async () => {

      

      const canvas = diagramCanvas.value;
      context.value = canvas.getContext("2d");

      let response = await getThermalReport(itemId.toString());
      console.log(response);

      thermalReportDetails.value.instruments = JSON.parse(response.instruments);
      thermalReportDetails.value.excel_data = JSON.parse(response.excel_data);

      thermalReportDetails.value.min_temp = JSON.parse(response.min_temp);
      thermalReportDetails.value.max_temp = JSON.parse(response.max_temp);

      thermalReportDetails.value.min_rh = JSON.parse(response.min_rh);
      thermalReportDetails.value.max_rh = JSON.parse(response.max_rh);

      thermalReportDetails.value.avg_temp = response.avg_temp;
      thermalReportDetails.value.avg_rh = response.avg_rh;

      console.log(thermalReportDetails.value)

      
      await updateChartData();

      const radius = 30;

      // Function to check if a new circle collides with existing circles
      const doesCollide = (x, y, r, existingCircles) => {
        for (const circle of existingCircles) {
          const distance = Math.hypot(x - circle.x, y - circle.y);
          if (distance < r + circle.radius) {
            return true; // Collision detected
          }
        }
        return false; // No collision
      };

      // Draw 25 circles without overlapping
      for (let i = 0; i < thermalReportDetails.value.instruments.length; i++) {
        let x, y;
        do {
          // Generate random coordinates until a non-overlapping position is found
          x = Math.random() * (canvas.width - 2 * radius) + radius;
          y = Math.random() * (canvas.height - 2 * radius) + radius;
        } while (doesCollide(x, y, radius, circles.value));

        const color = thermalReportDetails.value.min_temp.instrument_id == thermalReportDetails.value.instruments[i].instrument_id ? "green" : thermalReportDetails.value.max_temp.instrument_id == thermalReportDetails.value.instruments[i].instrument_id ? "red" : "white";

        // const redColor = thermalReportDetails.value.min_temp.instrument_id == thermalReportDetails.value.excel_data[i].instrument_id ? "red" : "";

        // Draw the circle
        context.value.beginPath();
        context.value.arc(x, y, radius, 0, 2 * Math.PI);
        context.value.fillStyle = color;
        context.value.fill();
        context.value.stroke();

        // Add text to the circle
        const text = `L ${i + 1}`;
        context.value.fillStyle = "black";
        context.value.font = "12px Arial";
        context.value.textAlign = "center";
        context.value.fillText(text, x, y);

        // Store circle information
        circles.value.push({ x, y, radius });
      }
    });

    // Function to generate a random color
    function getRandomColor() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    return {
      diagramCanvas,
      selectShape,
      clearCanvas,
      currentShape,
      chartOptions,
      chartSeries,
    };
  },
};
</script>

<style scoped>
.draw-io-container {
  height: 100vh;
}

.toolbar {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.separator {
  width: 1px;
  height: 20px;
  background-color: #ccc;
  margin: 0 10px;
}

.canvas-container {
  border: 1px solid #ccc;
  margin-top: 20px;
}

canvas {
  cursor: crosshair;
}

.shapes button {
  cursor: grab;
}
</style>
