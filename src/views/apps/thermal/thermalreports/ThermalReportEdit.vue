<template>
  <div
    v-if="thermalReportDetails.sensor_location_diagram === ''"
    class="container-fluid"
  >
    <div class="modal-content">
      <div class="row">
        <!-- First Grid - Shapes and Icons -->
        <div class="col-md-12">
          <div class="card mb-1">
            <div class="card-body">
              <h6 class="card-text">Menu Bar</h6>
              <!-- Nested Grid for Shapes and Icons -->
              <div class="row text-nowrap shapes">
                <div class="col-3 text-center mb-1">
                  <button class="btn btn-default border" @click="createDoor">
                    <i class="bi bi-door-closed fs-3"></i>
                    <div>Door</div>
                  </button>
                </div>
                <div class="col-3 text-center mb-1">
                  <button class="btn btn-default border" @click="createWindow">
                    <i class="bi bi-window fs-3"></i>
                    <div>Window</div>
                  </button>
                </div>
                <div class="col-3 text-center mb-1" @click="resetCanvas">
                  <button class="btn btn-primary border">
                    <i class="ki-duotone ki-chart fs-2x">
                      <i class="path1"></i>
                      <i class="path2"></i>
                    </i>
                    <div>Reset</div>
                  </button>
                </div>
                <div class="col-3 text-center mb-1">
                  <button
                    class="btn btn-danger border"
                    @click="deleteSelectedDoorOrWindow"
                  >
                    <i class="bi bi-trash fs-3"></i>
                    <div>Delete</div>
                  </button>
                </div>
                <!-- Add more shape buttons as needed -->
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="d-flex col gap-6 mt-3">
        <!--begin::Button-->
        <button
          @click="saveAsImage"
          class="btn btn-light-primary btn-outline me-3"
        >
          <i class="bi bi-images fs-3"></i>
          Save as Image
        </button>
        <!--end::Button-->

        <!--begin::Button-->
        <button
          @click="saveAsJSON"
          class="btn btn-light-primary btn-outline ms-2"
        >
          {} Save as JSON
        </button>
        <!--end::Button-->
      </div>
      <!-- Canvas -->
      <div class="row justify-content-center mt-6">
        <canvas id="canvas" class="container-fluid"> </canvas>
      </div>
    </div>
    <div class="modal-footer flex-center mt-6">
      <!--begin::Button-->
      <span
        :data-kt-indicator="loading ? 'on' : null"
        class="btn btn-lg btn-primary w-sd-25 w-lg-25"
        @click="submit"
      >
        <span v-if="!loading" class="indicator-label"> Submit </span>
        <span v-if="loading" class="indicator-progress">
          Please wait...
          <span
            class="spinner-border spinner-border-sm align-middle ms-2"
          ></span>
        </span>
      </span>
      <!--end::Button-->
    </div>
  </div>
  <div class="container-fluid card p-6" v-else>
    <div class="card-header">
      <h3 class="card-title fw-bold">Sensor Location Diagram</h3>
    </div>
    <div class="card-body p-6 w-lg-100 mx-auto w-md-100 w-sd-100 border">
      <img
        class="w-100 rounded"
        :src="`https://api.zeptac.com/storage/company/${thermalReportDetails.company_id}/thermal_report_diagram/${thermalReportDetails.sensor_location_diagram}`"
        alt="Sensor Location Diagram"
      />
    </div>
  </div>

  <hr />

  <!--begin::Row-->
  <div class="row">
    <div class="col-xl-12">
      <div class="card card-xl-stretch mb-xl-8">
        <!--begin::Header-->
        <div class="card-header border-0 pt-5">
          <h3 class="card-title align-items-start flex-column">
            <span class="card-label fw-bold fs-3 mb-1"
              >Graphical Representation</span
            >
          </h3>
          <div class="container-fluid">
            <div class="alert alert-warning">Do not modify the graph</div>
          </div>
        </div>
        <!--end::Header-->

        <!--begin::Body-->
        <div class="card-body">
          <!--begin::Chart-->
          <apexchart
            type="line"
            ref="chartRef"
            :options="options"
            :series="series"
          ></apexchart>
          <!--end::Chart-->
        </div>
        <!--end::Body-->
      </div>
    </div>
  </div>
  <!--end::Row-->
</template>

<script>
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { getThermalReport, updateThermalReport } from "@/stores/api";
import { fabric } from "fabric";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { getCSSVariableValue } from "@/assets/ts/_utils";
import ApiService from "@/core/services/ApiService";

export default {
  components: {},
  setup() {
    const chartRef = ref(null);
    let chartInstance = null;

    const labelColor = getCSSVariableValue("--bs-gray-900");
    const baseColor = getCSSVariableValue("--bs-info");

    const series = ref([]);

    const options = ref({
      chart: {
        fontFamily: "inherit",
        type: "line",
        height: "100%",
        width: "100%",
        toolbar: {
          show: false,
        },
        redrawOnParentResize: true,
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: true,
          },
          export: {
            png: {
              filename: "sensor_location_chart.png",
            },
          },
          autoSelected: "zoom",
        },
      },
      noData: {
        text: undefined,
        align: "center",
        verticalAlign: "middle",
        offsetX: 0,
        offsetY: 0,
        style: {
          color: undefined,
          fontSize: "14px",
          fontFamily: undefined,
        },
      },
      plotOptions: {},
      legend: {
        show: true,
        labels: {
          colors: undefined,
          useSeriesColors: true,
        },
        onItemClick: {
          toggleDataSeries: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        show: true,
        width: 3,
      },
      xaxis: {
        title: {
          text: "Reading for locations",
          style: {
            color: "#247BA0",
          },
        },
        categories: [],
        tickAmount: 20,
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          hideOverlappingLabels: true,
          rotate: -90,
          rotateAlways: true,
          style: {
            colors: labelColor,
            fontSize: "9px",
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      yaxis: {
        min: 0,
        max: 100,
        tickAmount: 5,
        title: {
          text: "Temperature & Humidity",
          style: {
            color: "#247BA0",
          },
        },
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
          fontSize: "9px",
        },
      },
      markers: {
        strokeColors: baseColor,
        strokeWidth: 1,
      },
    });

    const updateChartData = () => {
      options.value.xaxis.categories = thermalReportDetails.value.dates;
      series.value = [];

      thermalReportDetails.value.excel_data.forEach((data, i) => {
        const rec = {
          name: `L${i + 1} ${data.logger_id} Temp.`,
          data: data.data.map((entry) => entry.temp),
        };
        series.value.push(rec);
      });

      thermalReportDetails.value.excel_data.forEach((data, i) => {
        const rec = {
          name: `L${i + 1} ${data.logger_id} Hum.`,
          data: data.data.map((entry) => entry.rh),
        };
        series.value.push(rec);
      });
    };

    const loading = ref(false);
    const auth = useAuthStore();
    const router = useRouter();
    const route = useRoute();
    const User = auth.GetUser();
    const itemId = route.params.id;

    // Diagram Logic
    const canvas = ref(null);
    const currentShape = ref(null);

    const radius = 30;

    // for storing images
    const thermalReportImages = ref({
      sensor_location_diagram: "",
      sensor_location_chart: "",
    });

    // for storing thermal data when component loaded
    const thermalReportDetails = ref({
      instruments: [
        {
          id: "",
          instrument_name: "",
          instrument_id: "",
          serial_no: "",
          calibration_date: "",
          calibration_due_date: "",
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
          AVG_TEMP: 0,
          AVG_RH: 0,
        },
      ],

      dates: [],

      sensor_location_diagram: "",
      sensor_location_chart: "",

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
      company_id: "",
    });

    const selectShape = (shape) => {
      currentShape.value = shape;
    };

    // DOORS
    const createDoor = () => {
      const canvCenter = canvas.value.getCenter();
      const rect = new fabric.Rect({
        width: 60,
        height: 90,
        fill: "white",
        left: canvCenter.left,
        top: canvCenter.top,
        originX: "center",
        originY: "center",
        shadow: {
          color: "rgba(0, 0, 0, 0.5)",
          blur: 10,
          offsetX: 10,
          offsetY: 10,
        },
      });

      const rect2 = new fabric.Rect({
        width: 50,
        height: 80,
        fill: "#90caf9",
        left: canvCenter.left,
        top: canvCenter.top,
        originX: "center",
        originY: "center",
        shadow: {
          color: "rgba(0, 0, 0, 0.5)",
          blur: 10,
          offsetX: 10,
          offsetY: 10,
        },
      });

      const doorText = new fabric.Text(`Door`, {
        fontSize: 15,
        fill: "#5f0937",
        textAlign: "center",
        originX: "center",
        originY: "center",
        selectable: false,
        resizable: false,
      });

      doorText.set({ left: rect.left, top: rect.top });
      let doorObj = new fabric.Group([rect, rect2, doorText], {
        left: canvCenter.left,
        top: canvCenter.top,
      });

      canvas.value.add(doorObj);
    };

    // WINDOWS
    const createWindow = () => {
      const canvCenter = canvas.value.getCenter();
      const rect = new fabric.Rect({
        width: 70,
        height: 70,
        fill: "white",
        left: canvCenter.left,
        top: canvCenter.top,
        originX: "center",
        originY: "center",
        shadow: {
          color: "rgba(0, 0, 0, 0.5)",
          blur: 10,
          offsetX: 10,
          offsetY: 10,
        },
      });

      const rect2 = new fabric.Rect({
        width: 60,
        height: 60,
        fill: "#90caf9",
        left: canvCenter.left,
        top: canvCenter.top,
        originX: "center",
        originY: "center",
      });

      const windowText = new fabric.Text(`Window`, {
        fontSize: 15,
        fill: "#5f0937",
        textAlign: "center",
        originX: "center",
        originY: "center",
        selectable: false,
        resizable: false,
      });

      windowText.set({ left: rect.left, top: rect.top });
      let windowObj = new fabric.Group([rect, rect2, windowText], {
        left: canvCenter.left,
        top: canvCenter.top,
      });

      canvas.value.add(windowObj);
    };

    // LOCATIONS
    const createMultipleCircles = () => {
      for (let i = 0; i < thermalReportDetails.value.excel_data.length; i++) {
        const color =
          thermalReportDetails.value.min_temp.instrument_id ==
          thermalReportDetails.value.excel_data[i].instrument_id
            ? "#66bb6a"
            : thermalReportDetails.value.max_temp.instrument_id ==
              thermalReportDetails.value.excel_data[i].instrument_id
            ? "#f44336"
            : "white";

        const randomLeft =
          Math.random() * (canvas.value.width - 2 * radius) + radius;
        const randomTop =
          Math.random() * (canvas.value.height - 2 * radius) + radius;

        const circle = new fabric.Circle({
          radius: radius,
          fill: color,
          left: randomLeft,
          top: randomTop,
          originX: "center",
          originY: "center",
          shadow: {
            color: "rgba(0, 0, 0, 0.5)",
            blur: 10,
            offsetX: 10,
            offsetY: 10,
          },
        });

        const text = new fabric.Text(`L${i + 1}`, {
          fontSize: 12,
          fill: "black",
          textAlign: "center",
          originX: "center",
          originY: "center",
          selectable: false,
          resizable: false,
        });

        // Set initial text position based on the circle's position
        text.set({ left: circle.left, top: circle.top });

        let group = new fabric.Group([circle, text], {
          left: randomLeft,
          top: randomTop,
        });

        // Check for overlap with all previously created circles
        const overlapping = canvas.value.getObjects().some((obj) => {
          return group.intersectsWithObject(obj);
        });

        // If overlapping, skip this iteration and try again
        if (overlapping) {
          i--;
          continue;
        }

        canvas.value.add(group);
      }
    };

    // DELETE WINDOW / DOOR OBJECT
    const deleteSelectedDoorOrWindow = () => {
      const activeObject = canvas.value.getActiveObject();
      if (activeObject && activeObject.type === "group") {
        const objectsInGroup = activeObject.getObjects();

        // Filter out objects that are circles
        const objectsToDelete = objectsInGroup.filter(
          (obj) => obj.type !== "circle" && obj.type !== "text"
        );

        if (objectsToDelete.length > 0) {
          canvas.value.remove(activeObject);
          canvas.value.discardActiveObject();
          canvas.value.renderAll();
        }
      }
    };

    // COMPONENT MOUNTED
    onMounted(async () => {
      // creating instance of ApecChart
      chartInstance = new ApexCharts(chartRef.value, options.value);
      console.log(chartRef.value);

      ApiService.setHeader();
      // response from API
      let response = await getThermalReport(itemId.toString());
      console.log(response);

      thermalReportDetails.value.company_id = response.company_id;

      thermalReportDetails.value.instruments = JSON.parse(response.instruments);
      thermalReportDetails.value.excel_data = JSON.parse(response.excel_data);

      thermalReportDetails.value.min_temp = JSON.parse(response.min_temp);
      thermalReportDetails.value.max_temp = JSON.parse(response.max_temp);

      thermalReportDetails.value.min_rh = JSON.parse(response.min_rh);
      thermalReportDetails.value.max_rh = JSON.parse(response.max_rh);

      thermalReportDetails.value.avg_temp = response.avg_temp;
      thermalReportDetails.value.avg_rh = response.avg_rh;

      thermalReportDetails.value.sensor_location_diagram =
        response.sensor_location_diagram;
      thermalReportDetails.value.sensor_location_chart =
        response.sensor_location_chart;

      console.log(thermalReportDetails.value);

      // when all data gets loaded update the chart series and option
      updateChartData();

      // also create canvas
      canvas.value = new fabric.Canvas("canvas", {
        width: 1200,
        height: 800,
        backgroundColor: "white",
      });

      // border for canvas
      canvas.value.wrapperEl.style.border = "1px solid #000";

      // generate circles/locations for instruments
      createMultipleCircles();
      canvas.value.renderAll();
    });

    // SAVE DIAGRAM IMAGE
    const saveAsImage = async () => {
      const dataUrl = await canvas.value.toDataURL();

      const link = document.createElement("a");

      link.href = await dataUrl;
      link.download = "thermal_report_diagram.png";

      await link.click();
    };

    // SAVE DIAGRAM JSON OBJECT
    const saveAsJSON = () => {
      const jsonData = JSON.stringify(canvas.value.toJSON());

      console.log(jsonData);

      const blob = new Blob([jsonData], { type: "application/json" });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "thermal_report_json.json";

      link.click();
    };

    // RESET CANVAS -  (sensors/locations)
    const resetCanvas = () => {
      canvas.value.clear();
      canvas.value.set({
        backgroundColor: "white",
      });

      // again create circles/sensors/location
      createMultipleCircles();
    };

    // handle submit
    const submit = async () => {
      loading.value = true;

      if (thermalReportDetails.value.sensor_location_diagram !== "") {
        showErrorAlert("Warning", "Diagram already exists.");
        loading.value = false;
        return;
      }

      // url for diagram
      if (canvas.value) {
        try {
          const diagramUrl = await canvas.value.toDataURL();
          console.log(diagramUrl)

          const base64DiagramData = diagramUrl
            ?.toString()
            .replace(/^data:image\/\w+;base64,/, "");
          if (base64DiagramData) {
            thermalReportImages.value.sensor_location_diagram =
              base64DiagramData;
          } else {
            thermalReportImages.value.sensor_location_diagram = "";
            showErrorAlert(
              "Warning",
              "Unable to Create Diagram. Please try again later."
            );
            loading.value = false;
            return;
          }
        } catch (error) {
          showErrorAlert(
            "Warning",
            "Something went wrong. Please try again later"
          );
          return;
        }
      }

      // url for chart
      if (chartInstance) {
        try {
          const {imgURI} = await chartRef.value.dataURI();
          console.log(imgURI)
          const base64ChartData = imgURI
            ?.toString()
            .replace(/^data:image\/\w+;base64,/, "");
          if (base64ChartData) {
            thermalReportImages.value.sensor_location_chart = base64ChartData;
          } else {
            thermalReportImages.value.sensor_location_chart = "";
            showErrorAlert(
              "Warning",
              "Unable to Create Chart. Please try again later."
            );
            loading.value = false;
            return;
          }
        } catch (error) {
          showErrorAlert(
            "Warning",
            "Something went wrong. Please try again later"
          );
          return;
        }
      }

      console.warn(thermalReportImages.value);

      console.warn("Nice");
      try {
        // Call your API here with the form values
        const response = await updateThermalReport(
          itemId,
          thermalReportImages.value
        );
        console.log(response.result.error);
        if (!response.result.error) {
          // Handle successful API response
          console.log("API response:", response);
          showSuccessAlert("Success", "Diagram has been successfully added!");
          router.push({ name: "thermal-report-list" });
        } else {
          // Handle API error response
          const errorData = response.result.error;
          console.log("API error:", errorData);
          showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
        }
      } catch (error) {
        // Handle any other errors during API call
        console.error("API call error:", error);
        showErrorAlert("Error", "An error occurred during the API call.");
      } finally {
        loading.value = false;
      }
    };

    const showSuccessAlert = (title, message) => {
      Swal.fire({
        title,
        text: message,
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: "Ok, got it!",
        heightAuto: false,
        customClass: {
          confirmButton: "btn btn-primary",
        },
      });
    };

    const showErrorAlert = (title, message) => {
      Swal.fire({
        title,
        text: message,
        icon: "error",
        buttonsStyling: false,
        confirmButtonText: "Ok, got it!",
        heightAuto: false,
        customClass: {
          confirmButton: "btn btn-primary",
        },
      });
    };

    return {
      thermalReportDetails,
      submit,
      loading,
      selectShape,
      currentShape,
      canvas,
      createDoor,
      createWindow,
      createMultipleCircles,
      deleteSelectedDoorOrWindow,
      saveAsImage,
      saveAsJSON,
      resetCanvas,
      options,
      series,
      chartRef,
    };
  },
};
</script>

<style scoped>
.toolbar {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.canvas-container {
  margin-top: 20px;
}

canvas {
  cursor: crosshair;
}

.shapes button {
  cursor: pointer;
}

.chart-fixed-height {
  max-width: 760px;
  margin: 35px auto;
  opacity: 0.9;
}
</style>
responsive: [
    {
      breakpoint: 1000,
      options: {
        plotOptions: {
          bar: {
            horizontal: false
          }
        },
        legend: {
          position: "bottom"
        }
      }
    }
  ]