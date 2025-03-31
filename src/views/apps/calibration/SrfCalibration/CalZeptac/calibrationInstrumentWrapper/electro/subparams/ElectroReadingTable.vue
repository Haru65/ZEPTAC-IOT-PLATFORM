<template>
  <div>
    <!-- Tabs for Electro Parameters -->
    <div class="mb-4">
      <ul class="nav nav-tabs">
        <li class="nav-item" v-for="param in parameters" :key="param.id">
          <a
            class="nav-link"
            :class="{ active: selectedParameter === param.id }"
            @click="selectParameter(param.id)"
          >
            {{ param.name }}
          </a>
        </li>
      </ul>
    </div>

    <!-- Validation Message -->
    <!-- Validation Message -->
    <div
      v-if="errorMessage"
      class="alert"
      :class="{
        'alert-danger': errorType === 'error',
        'alert-success': errorType === 'success',
      }"
    >
      {{ errorMessage }}
    </div>

    <!-- UUC Readings Input Table -->
    <!-- Show input table only if NO saved readings exist for this parameter -->
    <div
      class="table-responsive"
      v-if="selectedParameterData.savedReadings.length === 0"
    >
      <h4>{{ selectedParameterData.name }}</h4>
      <table class="table table-bordered">
        <thead>
          <tr class="text-center">
            <th rowspan="2">Sr. No.</th>
            <th rowspan="2">
              Standard Reading ({{ selectedParameterData.unit }})
            </th>
            <th colspan="5">UUC Readings ({{ selectedParameterData.unit }})</th>
            <th rowspan="2">Average</th>
            <th rowspan="2">Error</th>
          </tr>
        </thead>
        <tbody>
          <template
            v-for="(reading, index) in selectedParameterData.readings"
            :key="index"
          >
            <tr>
              <td :rowspan="2" class="text-center align-middle">
                {{ index + 1 }}
              </td>
              <td :rowspan="2" class="text-center align-middle">
                <input
                  v-model.number="reading.standard_reading"
                  type="number"
                  class="form-control"
                  @input="calculate(index)"
                />
              </td>
              <td
                v-for="(value, i) in (reading.values || []).slice(0, 5)"
                :key="'row1-' + i"
              >
                <input
                  v-model.number="reading.values[i]"
                  type="number"
                  class="form-control"
                  @input="calculate(index)"
                />
              </td>
              <td :rowspan="2" class="text-center align-middle">
                {{ reading.average_reading?.toFixed(5) ?? "-" }}
              </td>
              <td :rowspan="2" class="text-center align-middle">
                {{ reading.error_reading?.toFixed(5) ?? "-" }}
              </td>
            </tr>
            <tr>
              <td
                v-for="(value, i) in (reading.values || []).slice(5, 10)"
                :key="'row2-' + i"
              >
                <input
                  v-model.number="reading.values[i + 5]"
                  type="number"
                  class="form-control"
                  @input="calculate(index)"
                />
              </td>
            </tr>
          </template>
        </tbody>
      </table>

      <!-- Save Button (only show when in input mode) -->
      <button
        type="button"
        class="btn btn-info btn-sm mb-3"
        @click="saveReadings"
        v-if="selectedParameterData.readings.length > 0"
      >
        Save Readings
      </button>
    </div>

    <!-- Saved Readings Table -->
    <!-- Show only if saved readings exist for this parameter -->
    <div
      class="table-responsive"
      v-if="selectedParameterData.savedReadings.length > 0"
    >
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h4>Saved Readings for {{ selectedParameterData.name }}</h4>
        <button
          type="button"
          class="btn btn-info btn-md"
          @click="downloadPdf(selectedParameterData.id)"
        >
          Uncertainty
        </button>
      </div>
      <table class="table table-bordered">
        <thead>
          <tr class="text-center">
            <th rowspan="2">Sr. No.</th>
            <th rowspan="2">
              Standard Reading ({{ selectedParameterData.unit }})
            </th>
            <th colspan="5">UUC Readings ({{ selectedParameterData.unit }})</th>
            <th rowspan="2">Average</th>
            <th rowspan="2">Error</th>
          </tr>
        </thead>
        <tbody>
          <template
            v-for="(reading, index) in selectedParameterData.savedReadings"
            :key="'saved-' + index"
          >
            <tr>
              <td :rowspan="2" class="text-center align-middle">
                {{ index + 1 }}
              </td>
              <td :rowspan="2" class="text-center align-middle">
                {{
                  typeof reading.standard_reading === "number"
                    ? reading.standard_reading.toFixed(5)
                    : "-"
                }}
              </td>
              <td
                v-for="(value, i) in (reading.uuc_readings || []).slice(0, 5)"
                :key="'saved-row1-' + i"
              >
                {{ typeof value === "number" ? value.toFixed(5) : "-" }}
              </td>
              <td :rowspan="2" class="text-center align-middle">
                {{
                  typeof reading.average_reading === "number"
                    ? reading.average_reading.toFixed(5)
                    : "-"
                }}
              </td>
              <td :rowspan="2" class="text-center align-middle">
                {{
                  typeof reading.error_reading === "number"
                    ? reading.error_reading.toFixed(5)
                    : "-"
                }}
              </td>
            </tr>
            <tr>
              <td
                v-for="(value, i) in (reading.uuc_readings || []).slice(5, 10)"
                :key="'saved-row2-' + i"
              >
                {{ typeof value === "number" ? value.toFixed(5) : "-" }}
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted, inject } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import {
  addElectrocalibration,
  DownloadElectroUncertainty,
  getElectrocalibrations,
} from "@/stores/api";
import moment from "moment";

export default {
  setup() {
    const routeId = inject("routeId");
    const User = inject("User");

    // Reactive state
    // Parameters List
    0.00025;
    0.0001;
    0.00036;

    const parameters = ref([
      {
        id: 1,
        name: "Low Voltage DC",
        unit: "mV",
        standardReadings: [
          {
            value: 1,
            master_accuracy: 0.00306,
            master_uncertainty: 0.00055,
            master_resolution: 0.01,
          },
          {
            value: 10,
            master_accuracy: 0.00306,
            master_uncertainty: 0.001,
            master_resolution: 0.01,
          },
          {
            value: 100,
            master_accuracy: 0.009,
            master_uncertainty: 0.0015,
            master_resolution: 0.1,
          },
          {
            value: 200,
            master_accuracy: 0.015,
            master_uncertainty: 0.003,
            master_resolution: 0.1,
          },
          {
            value: 300,
            master_accuracy: 0.02274,
            master_uncertainty: 0.0045,
            master_resolution: 0.1,
          },
        ],
      },
      {
        id: 2,
        name: "AC Voltage (50Hz)",
        unit: "V",
        standardReadings: [
          {
            value: 1,
            master_accuracy: 0.00036,
            master_uncertainty: 0.00025,
            master_resolution: 0.0001,
          },
          {
            value: 10,
            master_accuracy: 0.0036,
            master_uncertainty: 0.0025,
            master_resolution: 0.001,
          },
          {
            value: 100,
            master_accuracy: 0.036,
            master_uncertainty: 0.025,
            master_resolution: 0.01,
          },
          {
            value: 500,
            master_accuracy: 0.18,
            master_uncertainty: 0.125,
            master_resolution: 0.05,
          },
          {
            value: 1000,
            master_accuracy: 0.52,
            master_uncertainty: 0.18,
            master_resolution: 0.1,
          },
        ],
      },
      {
        id: 3,
        name: "DC Voltage",
        unit: "V",
        standardReadings: [
          {
            value: 1,
            master_accuracy: 0.00036,
            master_uncertainty: 0.00025,
            master_resolution: 0.0001,
          },
          {
            value: 10,
            master_accuracy: 0.0036,
            master_uncertainty: 0.0025,
            master_resolution: 0.001,
          },
          {
            value: 100,
            master_accuracy: 0.036,
            master_uncertainty: 0.025,
            master_resolution: 0.01,
          },
          {
            value: 500,
            master_accuracy: 0.18,
            master_uncertainty: 0.125,
            master_resolution: 0.05,
          },
          {
            value: 1000,
            master_accuracy: 0.52,
            master_uncertainty: 0.18,
            master_resolution: 0.1,
          },
        ],
      },
      {
        id: 4,
        name: "AC Current (50Hz)",
        unit: "A",
        standardReadings: [
          {
            value: 1,
            master_accuracy: 0.002,
            master_uncertainty: 0.0005,
            master_resolution: 0.001,
          },
          {
            value: 2.5,
            master_accuracy: 0.01,
            master_uncertainty: 0.003,
            master_resolution: 0.01,
          },
          {
            value: 5,
            master_accuracy: 0.005,
            master_uncertainty: 0.002,
            master_resolution: 0.01,
          },
          {
            value: 7.5,
            master_accuracy: 0.007,
            master_uncertainty: 0.003,
            master_resolution: 0.01,
          },
          {
            value: 10,
            master_accuracy: 0.008,
            master_uncertainty: 0.007,
            master_resolution: 0.001,
          },
        ],
      },
      {
        id: 5,
        name: "DC Current",
        unit: "A",
        standardReadings: [
          {
            value: 1,
            master_accuracy: 0.000424,
            master_uncertainty: 0.0002,
            master_resolution: 0.001,
          },
          {
            value: 2.5,
            master_accuracy: 0.00106,
            master_uncertainty: 0.0005,
            master_resolution: 0.0025,
          },
          {
            value: 5,
            master_accuracy: 0.00212,
            master_uncertainty: 0.001,
            master_resolution: 0.005,
          },
          {
            value: 7.5,
            master_accuracy: 0.00318,
            master_uncertainty: 0.0015,
            master_resolution: 0.0075,
          },
          {
            value: 10,
            master_accuracy: 0.0065,
            master_uncertainty: 0.003,
            master_resolution: 0.01,
          },
        ],
      },
      {
        id: 6,
        name: "Resistance (ohms)",
        unit: "ohms",
        standardReadings: [
          {
            value: 1,
            master_accuracy: 0.00012,
            master_uncertainty: 0.00012,
            master_resolution: 0.01,
          },
          {
            value: 10,
            master_accuracy: 0.0009,
            master_uncertainty: 0.0004,
            master_resolution: 0.03,
          },
          {
            value: 100,
            master_accuracy: 0.009,
            master_uncertainty: 0.004,
            master_resolution: 0.1,
          },
          {
            value: 200,
            master_accuracy: 0.018,
            master_uncertainty: 0.008,
            master_resolution: 0.2,
          },
          {
            value: 300,
            master_accuracy: 0.027,
            master_uncertainty: 0.009,
            master_resolution: 0.001,
          },
        ],
      },
      {
        id: 7,
        name: "Resistance (Kohms)",
        unit: "Kohms",
        standardReadings: [
          {
            value: 1,
            master_accuracy: 0.00012,
            master_uncertainty: 0.00005,
            master_resolution: 0.001,
          },
          {
            value: 10,
            master_accuracy: 0.0012,
            master_uncertainty: 0.0005,
            master_resolution: 0.01,
          },
          {
            value: 100,
            master_accuracy: 0.012,
            master_uncertainty: 0.005,
            master_resolution: 0.1,
          },
          {
            value: 200,
            master_accuracy: 0.024,
            master_uncertainty: 0.01,
            master_resolution: 0.2,
          },
          {
            value: 300,
            master_accuracy: 0.036,
            master_uncertainty: 0.015,
            master_resolution: 0.01,
          },
        ],
      },
      {
        id: 8,
        name: "Resistance (Mohms)",
        unit: "Mohms",
        standardReadings: [
          {
            value: 1,
            master_accuracy: 0.015,
            master_uncertainty: 0.005,
            master_resolution: 0.1,
          },
          {
            value: 10,
            master_accuracy: 0.15,
            master_uncertainty: 0.05,
            master_resolution: 0.1,
          },
          {
            value: 15,
            master_accuracy: 0.225,
            master_uncertainty: 0.075,
            master_resolution: 0.1,
          },
          {
            value: 20,
            master_accuracy: 0.3,
            master_uncertainty: 0.1,
            master_resolution: 0.1,
          },
          {
            value: 30,
            master_accuracy: 0.45,
            master_uncertainty: 0.15,
            master_resolution: 0.1,
          },
        ],
      },
      {
        id: 9,
        name: "AC (mA) (50Hz)",
        unit: "mA",
        standardReadings: [
          {
            value: 1,
            master_accuracy: 0.00115,
            master_uncertainty: 0.0003,
            master_resolution: 0.0001,
          },
          {
            value: 10,
            master_accuracy: 0.0048,
            master_uncertainty: 0.0014,
            master_resolution: 0.001,
          },
          {
            value: 100,
            master_accuracy: 0.046,
            master_uncertainty: 0.012,
            master_resolution: 0.01,
          },
          {
            value: 200,
            master_accuracy: 0.089,
            master_uncertainty: 0.065,
            master_resolution: 0.1,
          },
          {
            value: 300,
            master_accuracy: 0.152,
            master_uncertainty: 0.132,
            master_resolution: 1.0,
          },
        ],
      },
      {
        id: 10,
        name: "DC (mA)",
        unit: "mA",
        standardReadings: [
          {
            value: 1,
            master_accuracy: 0.00015,
            master_uncertainty: 0.00008,
            master_resolution: 0.0001,
          },
          {
            value: 10,
            master_accuracy: 0.0005,
            master_uncertainty: 0.00026,
            master_resolution: 0.001,
          },
          {
            value: 100,
            master_accuracy: 0.005,
            master_uncertainty: 0.0026,
            master_resolution: 0.01,
          },
          {
            value: 200,
            master_accuracy: 0.017,
            master_uncertainty: 0.013,
            master_resolution: 0.1,
          },
          {
            value: 300,
            master_accuracy: 0.0355,
            master_uncertainty: 0.0264,
            master_resolution: 1.0,
          },
        ],
      },
    ]);

    const selectedParameter = ref(parameters.value[0]?.id || null);
    const errorMessage = ref("");
    const errorType = ref("error");

    // Data stores
    const defaultReadingsMap = reactive({});
    const unsavedInputsMap = reactive({});
    const savedReadingsMap = reactive({});

    // Initialize default readings
    parameters.value.forEach((param) => {
      defaultReadingsMap[param.id] = param.standardReadings.map((std) => ({
        standard_reading: std.value,
        values: new Array(10).fill(null),
        average_reading: null,
        error_reading: null,
        master_accuracy: std.master_accuracy,
        master_uncertainty: std.master_uncertainty,
        master_resolution: std.master_resolution,
      }));
    });

    // Computed properties
    const selectedParameterData = computed(() => {
      const paramId = selectedParameter.value;
      if (!paramId) return { readings: [], savedReadings: [] };

      const hasSavedData = savedReadingsMap[paramId]?.length > 0;

      return {
        id: paramId,
        name: parameters.value.find((p) => p.id === paramId)?.name || "",
        unit: parameters.value.find((p) => p.id === paramId)?.unit || "",
        readings: hasSavedData
          ? []
          : unsavedInputsMap[paramId] || defaultReadingsMap[paramId] || [],
        savedReadings: hasSavedData ? savedReadingsMap[paramId] : [],
      };
    });

    const showInputTable = computed(
      () => selectedParameterData.value.savedReadings.length === 0
    );

    const showSavedTable = computed(
      () => selectedParameterData.value.savedReadings.length > 0
    );

    // Methods
    const selectParameter = (paramId) => {
      // Save current unsaved inputs before switching
      if (
        selectedParameter.value &&
        selectedParameterData.value.readings.length > 0
      ) {
        unsavedInputsMap[selectedParameter.value] = [
          ...selectedParameterData.value.readings,
        ];
      }
      selectedParameter.value = paramId;
    };

    const calculate = (index) => {
      const reading = selectedParameterData.value.readings[index];
      if (!reading) return;

      // Calculate average_reading of valid values
      const validValues = reading.values.filter((v) => v !== null && v !== "");
      if (validValues.length === 0) {
        reading.average_reading = null;
        reading.error_reading = null;
        return;
      }

      const sum = validValues.reduce((acc, val) => acc + Number(val), 0);
      reading.average_reading = sum / validValues.length;

      // Calculate error if standard reading exists
      if (reading.standard_reading != null) {
        reading.error_reading =
          reading.average_reading - reading.standard_reading;
      }
    };

    const saveReadings = async () => {
      errorMessage.value = "";
      errorType.value = "error";
      const paramId = selectedParameter.value;
      const readings = selectedParameterData.value.readings;

      // Validate all rows
      const emptyRows = [];
      readings.forEach((reading, index) => {
        const hasEmptyStandard =
          reading.standard_reading == null || reading.standard_reading === "";
        const hasEmptyValues =
          !reading.values || reading.values.some((v) => v == null || v === "");
        if (hasEmptyStandard || hasEmptyValues) {
          emptyRows.push(index + 1);
        }
      });

      if (emptyRows.length > 0) {
        errorMessage.value = `Please complete data in row(s): ${emptyRows.join(
          ", "
        )}`;
        return;
      }

      // Prepare data for API
      const data = {
        readings: readings.map((reading) => ({
          parameter_id: paramId,
          calibration_instrument_id: routeId.value,
          company_id: User.company_id,
          standard_reading: reading.standard_reading,
          uuc_readings: reading.values,
          average_reading: reading.average_reading,
          error_reading: reading.error_reading,
          master_accuracy: reading.master_accuracy,
          master_uncertainty: reading.master_uncertainty,
          master_resolution: reading.master_resolution,
        })),
      };

      try {
        const response = await addElectrocalibration(data);

        if (response.success) {
          // Transform and store the saved data
          const savedData = response.result.map((r) => ({
            standard_reading: parseFloat(r.standard_reading),
            uuc_readings: Array.isArray(r.uuc_readings)
              ? r.uuc_readings
              : JSON.parse(r.uuc_readings || "[]"),
            average_reading: parseFloat(r.average_reading),
            error_reading: parseFloat(r.error_reading),
            master_accuracy: parseFloat(r.master_accuracy),
            master_uncertainty: parseFloat(r.master_uncertainty),
            master_resolution: parseFloat(r.master_resolution),
          }));

          // Update state
          savedReadingsMap[paramId] = savedData;
          unsavedInputsMap[paramId] = [];

          // Show success
          errorMessage.value = "Data saved successfully!";
          errorType.value = "success";
          setTimeout(() => (errorMessage.value = ""), 3000);
        } else {
          errorMessage.value = response.message || "Failed to save data";
        }
      } catch (error) {
        errorMessage.value = "Error saving data";
        console.error("Save error:", error);
      }
    };

    const loadSavedReadings = async () => {
      try {
        const response = await getElectrocalibrations();

        if (response.success) {
          // Initialize with empty arrays
          parameters.value.forEach((param) => {
            savedReadingsMap[param.id] = [];
          });

          // Fill with API data
          Object.entries(response.result).forEach(([paramId, readings]) => {
            const numericId = Number(paramId);
            savedReadingsMap[numericId] = readings.map((r) => ({
              standard_reading: parseFloat(r.standard_reading),
              uuc_readings: Array.isArray(r.uuc_readings)
                ? r.uuc_readings
                : JSON.parse(r.uuc_readings || "[]"),
              average_reading: parseFloat(r.average_reading),
              error_reading: parseFloat(r.error_reading),
              master_accuracy: parseFloat(r.master_accuracy),
              master_uncertainty: parseFloat(r.master_uncertainty),
              master_resolution: parseFloat(r.master_resolution),
            }));
          });
        }
      } catch (error) {
        console.error("Error loading saved readings:", error);
      }
    };

    // Initialize
    onMounted(loadSavedReadings);

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

    const downloadPdf = async (id) => {
      try {
        // Show initial loading Swal with a generic progress message
        Swal.fire({
          title: "Downloading Calculation",
          html: `<div class="swal-animation">
        <p class="swal-text">Please wait...</p>
        <div class="swal-progress">
          <div class="swal-progress-bar"></div>
        </div>
      </div>`,
          allowOutsideClick: false, // Prevent closing the Swal while downloading
          didOpen: () => {
            Swal.showLoading(); // Show loading animation
          },
        });

        // Define the data to send in the request
        const data = {
          parameter_id: id,
          calibration_instrument_id: routeId.value,
        };

        // Make the API call using the custom function
        const response = await DownloadElectroUncertainty(data); // This will await the response from the server

        if (response?.success == false) {
          const errorMessage =
            response?.message || "Export failed due to server error.";
          showErrorAlert("Error", errorMessage); // Show specific error
          console.error("Export Error:", errorMessage);
          return; // Exit the function if no valid response
        }

        // Check if the response is successful (non-empty Blob data)
        if (!response || response.size === 0) {
          const errorMessage =
            response?.message || "Download failed due to server error.";
          showErrorAlert("Error", errorMessage); // Show specific error
          console.error("Export Error:", errorMessage);
          return;
        }

        // Update Swal message for PDF generation progress
        Swal.update({
          title: "Generating PDF",
          html: `<div class="swal-animation">
        <p class="swal-text">Please wait...</p>
        <div class="swal-progress">
          <div class="swal-progress-bar"></div>
        </div>
      </div>`,
        });

        // Trigger the download if the response is valid
        const fileType = "pdf";
        const fileName = `uncertainty_calculation_report_${moment().format(
          "YYYYMMDD_HHmmss"
        )}.${fileType}`;

        const link = document.createElement("a");
        link.href = URL.createObjectURL(response); // Use the Blob response here
        link.download = fileName; // Set the filename for download
        link.click(); // Trigger the download

        // Show success message after the download is triggered
        Swal.fire({
          title: "Download Complete",
          text: "Report generated successfully",
          icon: "success",
          timer: 2000, // Show success message for 2 seconds
          timerProgressBar: true,
          allowOutsideClick: true,
        });
      } catch (error) {
        // Handle errors if the download fails
        console.error("API call error:", error);
        alert("An error occurred while downloading.");
        showErrorAlert("Error", "An error occurred while downloading."); // Show specific error
      } finally {
        // Ensure the loading animation is stopped if still running
        // Swal.close();
      }
    };

    return {
      downloadPdf,
      parameters,
      selectedParameter,
      selectedParameterData,
      errorMessage,
      errorType,
      showInputTable,
      showSavedTable,
      selectParameter,
      calculate,
      saveReadings,
      formatNumber: (value) =>
        typeof value === "number" ? value.toFixed(5) : "-",
    };
  },
};
</script>

<style scoped>
.alert-danger {
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
}
.alert-success {
  color: #155724;
  background-color: #d4edda;
  border-color: #c3e6cb;
}
.bg-danger-light {
  background-color: rgba(220, 53, 69, 0.1);
}
</style>