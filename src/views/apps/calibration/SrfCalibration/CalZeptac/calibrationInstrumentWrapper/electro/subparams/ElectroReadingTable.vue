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
    <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>

    <!-- UUC Readings Input Table -->
    <div class="table-responsive">
      <h4>{{ selectedParameterData?.name }}</h4>
      <table class="table table-bordered">
        <thead>
          <tr class="text-center">
            <th rowspan="2">Sr. No.</th>
            <th rowspan="2">
              Standard Reading ({{ selectedParameterData?.unit }})
            </th>
            <th colspan="5">UUC Readings ({{ selectedParameterData?.unit }})</th>
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
                v-for="(value, i) in reading.values.slice(0, 5)"
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
                {{ reading.average.toFixed(4) }}
              </td>
              <td :rowspan="2" class="text-center align-middle">
                {{ reading.error.toFixed(4) }}
              </td>
            </tr>
            <tr>
              <td
                v-for="(value, i) in reading.values.slice(5, 10)"
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
    </div>

    <!-- Save Button -->
    <button class="btn btn-info btn-sm mb-3" @click="saveReadings">
      Save
    </button>

    <!-- Saved Readings Table -->
    <div class="table-responsive mt-6">
      <h4>Readings for {{ selectedParameterData?.name }}</h4>
      <table class="table table-bordered">
        <thead>
          <tr class="text-center">
            <th rowspan="2">Sr. No.</th>
            <th rowspan="2">
              Standard Reading ({{ selectedParameterData?.unit }})
            </th>
            <th colspan="5">UUC Readings ({{ selectedParameterData?.unit }})</th>
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
                {{ reading.standard_reading }}
              </td>
              <td
                v-for="(value, i) in reading.uuc_readings.slice(0, 5)"
                :key="'saved-row1-' + i"
              >
                {{ value }}
              </td>
              <td :rowspan="2" class="text-center align-middle">
                {{ reading.average_reading }}
              </td>
              <td :rowspan="2" class="text-center align-middle">
                {{ reading.error_reading }}
              </td>
            </tr>
            <tr>
              <td
                v-for="(value, i) in reading.uuc_readings.slice(5, 10)"
                :key="'saved-row2-' + i"
              >
                {{ value }}
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
import { addElectrocalibration, getElectrocalibrations } from "@/stores/api";

export default {
  setup() {
    const routeId = inject("routeId");
    const User = inject("User");

    // Parameters List
    const parameters = ref([
      { id: 1, name: "Low Voltage DC", unit: "mV" },
      { id: 2, name: "AC Voltage (50Hz)", unit: "V" },
      { id: 3, name: "DC Voltage", unit: "V" },
      { id: 4, name: "AC Current", unit: "A" },
      { id: 5, name: "DC Current", unit: "A" },
      { id: 6, name: "Resistance (Kohms)", unit: "Kohms" },
      { id: 7, name: "Resistance (Mohms)", unit: "Mohms" },
      { id: 8, name: "Resistance (ohms)", unit: "ohms" },
      { id: 9, name: "DC (mA)", unit: "mA" },
      { id: 10, name: "AC (mA) (50Hz)", unit: "mA" },
      { id: 11, name: "DC (µA)", unit: "µA" },
    ]);

    const selectedParameter = ref(parameters.value[0].id);
    const parameterData = reactive({});
    const errorMessage = ref("");

    // Function to select a parameter and initialize its data
    const selectParameter = (paramId) => {
      selectedParameter.value = paramId;
      if (!parameterData[paramId]) {
        parameterData[paramId] = {
          name: parameters.value.find((p) => p.id === paramId)?.name,
          unit: parameters.value.find((p) => p.id === paramId)?.unit,
          readings: [
            {
              standard_reading: null,
              values: Array(10).fill(null),
              average: 0,
              error: 0,
            },
          ],
          savedReadings: [],
        };
      }
    };

    // Compute current selected parameter's data
    const selectedParameterData = computed(
      () => parameterData[selectedParameter.value] || {}
    );

    // Calculate average and error
    const calculate = (index) => {
      const reading = selectedParameterData.value.readings[index];
      const validValues = reading.values.filter((val) => val !== null);
      const sum = validValues.reduce((acc, val) => acc + val, 0);
      reading.average = validValues.length ? sum / validValues.length : 0;
      reading.error = reading.average - reading.standard_reading;
    };

    const saveReadings = async () => {
      errorMessage.value = "";
      let reading = selectedParameterData.value.readings[0];

      if (
        !reading.standard_reading ||
        reading.values.some((val) => val === null || val === "")
      ) {
        errorMessage.value = "Please complete all fields before saving.";
        return;
      }

      try {
        const data = {
          parameter_id: selectedParameter.value,
          calibration_instrument_id: routeId.value,
          company_id: User.company_id,
          standard_reading: reading.standard_reading,
          uuc_readings: reading.values,
          average_reading: reading.average,
          error_reading: reading.error,
        };

        let response = await addElectrocalibration(data);

        if (response.success) {
          selectedParameterData.value.savedReadings.push(response.result);
          selectedParameterData.value.readings = [
            {
              standard_reading: null,
              values: Array(10).fill(null),
              average: 0,
              error: 0,
            },
          ];
        } else {
          errorMessage.value = response.message;
        }
      } catch (error) {
        errorMessage.value = "Error saving data. Please try again.";
      }
    };

    // Load saved readings on mount
    const loadSavedReadings = async () => {
      for (let param of parameters.value) {
        try {
          const response = await getElectrocalibrations(
            `parameterId=${param.id}`
          );

          if (response.success) {
            parameterData[param.id] = {
              name: param.name,
              unit: param.unit,
              readings: [
                {
                  standard_reading: null,
                  values: Array(10).fill(null),
                  average: 0,
                  error: 0,
                },
              ],
              savedReadings: response.result || [],
            };
          }
        } catch (error) {
          console.error("Error loading saved readings for", param.name);
        }
      }
    };

    onMounted(loadSavedReadings);

    return {
      parameters,
      selectedParameter,
      parameterData,
      errorMessage,
      selectedParameterData,
      selectParameter,
      calculate,
      saveReadings,
    };
  },
};
</script>
