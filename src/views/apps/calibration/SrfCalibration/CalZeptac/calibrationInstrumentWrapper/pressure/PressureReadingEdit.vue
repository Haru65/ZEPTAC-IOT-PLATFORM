<template>
  <section class="h-100 m-lg-6 m-md-3 m-sm-1">
    <!-- Two divs side by side -->
    <div class="row g-5">
      <div class="col-lg-6">
        <div class="card card-stretch shadow mb-5">
          <div class="card-header">
            <h3 class="card-title">Master Instrument</h3>
          </div>
          <div class="card-body">
            <table class="table">
              <tbody>
                <tr>
                  <td>Range</td>
                  <td>
                    {{ reading?.calibration_instrument.ranges_from || "" }} to
                    {{ reading?.calibration_instrument.ranges_to || "" }}
                  </td>
                </tr>
                <tr>
                  <td>Least Count</td>
                  <td>
                    {{
                      reading?.calibration_instrument?.reference_instrument
                        ?.resolution || ""
                    }}
                  </td>
                </tr>
                <tr>
                  <td>Serial No.</td>
                  <td>
                    {{
                      reading?.calibration_instrument?.reference_instrument
                        ?.serial_no || ""
                    }}
                  </td>
                </tr>
                <tr>
                  <td>Uncertainty</td>
                  <td>
                    {{
                      reading?.calibration_instrument?.reference_instrument
                        ?.uncertainty || ""
                    }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="col-lg-6">
        <div class="card card-stretch shadow mb-5">
          <div class="card-header">
            <h3 class="card-title">Calibration Instrument</h3>
          </div>
          <div class="card-body">
            <table class="table">
              <tbody>
                <tr>
                  <td>Range</td>
                  <td>
                    {{ reading?.calibration_instrument.ranges_from || "" }} to
                    {{ reading?.calibration_instrument.ranges_to || "" }}
                  </td>
                </tr>
                <tr>
                  <td>Least Count</td>
                  <td>
                    {{ reading?.calibration_instrument.resolution || "" }}
                  </td>
                </tr>
                <tr>
                  <td>Serial No.</td>
                  <td>{{ reading?.calibration_instrument.serial_no || "" }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Full width div below -->
    <div class="row g-5">
      <div class="col-lg-12">
        <div class="card card-stretch shadow mb-5">
          <div class="card-header">
            <h3 class="card-title">Temperature During calibration</h3>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-bordered">
                <thead>
                  <tr class="fw-bold fs-6 text-gray-800">
                    <th>Temperature &deg; C</th>
                    <th>Beginning</th>
                    <th>25.6</th>
                    <th>End</th>
                    <th>25.8</th>
                    <th>Mean</th>
                    <th>25.7</th>
                  </tr>
                  <tr class="fw-bold fs-6 text-gray-800">
                    <th>Humidity (% R.H)</th>
                    <th>Beginning</th>
                    <th>51</th>
                    <th>End</th>
                    <th>49</th>
                    <th>Mean</th>
                    <th>50</th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Another full width div below -->
    <div class="row g-5">
      <div class="col-lg-12">
        <div class="card shadow mb-5">
          <div class="card-header">
            <h3 class="card-title">Calculation</h3>
          </div>
          <div class="card-body">
            <div v-if="reading">
              <div class="table-responsive">
                <table class="table table-bordered">
                  <thead>
                    <tr class="fw-bold fs-6 text-gray-800">
                      <th>Range of UUC (psi)</th>
                      <th>UUC Reading</th>
                      <th>I1 up (psi)</th>
                      <th>D1 down (psi)</th>
                      <th>I2 up (psi)</th>
                      <th>D2 down (psi)</th>
                      <th>Mean</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        {{ reading?.calibration_instrument?.ranges_from || "" }}
                        to
                        {{ reading?.calibration_instrument?.ranges_to || "" }}
                      </td>
                      <td>
                        {{ reading.uuc_reading || "" }}
                      </td>
                      <td>
                        {{ reading.i1_up || "" }}
                      </td>
                      <td>
                        {{ reading.d1_down || "" }}
                      </td>
                      <td>
                        {{ reading.i2_up || "" }}
                      </td>
                      <td>
                        {{ reading.d2_down || "" }}
                      </td>
                      <td>
                        {{ reading.mean_value || "" }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Display the calculation steps -->
              <div v-if="steps.length > 0" class="mb-4">
                <div
                  v-for="(step, index) in steps"
                  :key="index"
                  class="card mb-3"
                >
                  <div class="card-body">
                    <!-- Display step description -->
                    <h4 class="card-title mb-3">
                      {{ step.description }}
                    </h4>

                    <!-- Display formula if present -->
                    <div v-if="step.formula" class="mb-3">
                      <h5 class="card-subtitle mb-2 text-dark">Formula:</h5>
                      <pre><code class="bg-light text-dark p-2 border rounded fs-4">{{ step.formula }}</code></pre>
                    </div>

                    <!-- Display sub-steps if present -->
                    <div v-if="step.steps && step.steps.length" class="mt-3">
                      <h5 class="card-subtitle mb-2 text-dark">Sub-steps:</h5>
                      <ul class="list-unstyled">
                        <li
                          v-for="(subStep, subIndex) in step.steps"
                          :key="subIndex"
                          class="mb-2"
                        >
                          <pre><code class="bg-light text-dark p-2 border rounded fs-4">{{ subStep }}</code></pre>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Message when no steps are available -->
              <div v-else class="alert alert-info fs-4 mb-6">
                No calculation steps available.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Full width div below -->
    <div class="row g-5">
      <div class="col-lg-12">
        <div class="card card-stretch shadow mb-5">
          <div class="card-header">
            <h3 class="card-title">Uncertainity Budget</h3>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-bordered">
                <thead>
                  <tr class="fw-bold fs-6 text-gray-800">
                    <th>Sources</th>
                    <th>Type</th>
                    <th>Estimates</th>
                    <th>Probality Distrubtion</th>
                    <th>Divisor</th>
                    <th>Senstivity</th>
                    <th>Standard Uncertainity</th>
                    <th>Degree of Freedom</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Due to Process</th>
                    <th>Type A</th>
                    <th>
                      {{ reading?.uncertainty?.standard_deviation || "" }}
                    </th>
                    <th>Normal</th>
                    <th>&Sqrt;4</th>
                    <th>1</th>
                    <th>
                      {{ reading?.uncertainty?.uncertainty_due_process || "" }}
                    </th>

                    <td>3</td>
                  </tr>

                  <tr>
                    <th>Standard Uncertainity</th>
                    <th>Type B</th>
                    <th>
                      {{
                        reading?.calibration_instrument?.reference_instrument
                          ?.uncertainty || ""
                      }}
                    </th>
                    <th>Normal</th>
                    <th>2</th>
                    <th>1</th>
                    <th>
                      {{ reading?.uncertainty?.standard_uncertainty || "" }}
                    </th>

                    <td>&infin;</td>
                  </tr>

                  <tr>
                    <th>Resolution</th>
                    <th>Type B</th>
                    <th>
                      {{ reading?.calibration_instrument?.resolution || "" }}
                    </th>
                    <th>Rectangular</th>
                    <th>2&Sqrt;3</th>

                    <th>1</th>
                    <th>
                      {{ reading?.uncertainty?.uncertainty_resolution || "" }}
                    </th>

                    <td>&infin;</td>
                  </tr>

                  <tr>
                    <th>Hystersis</th>
                    <th>Type B</th>
                    <th>
                      {{ reading?.uncertainty?.hysteresis || "" }}
                    </th>
                    <th>Rectangular</th>
                    <th>&Sqrt;3</th>

                    <th>1</th>
                    <th>
                      {{
                        reading?.uncertainty?.uncertainty_due_hysteresis || ""
                      }}
                    </th>
                    <td>&infin;</td>
                  </tr>

                  <tr>
                    <th>Zero Deviation</th>
                    <th>Type B</th>
                    <th>
                      {{ reading?.uncertainty?.max_zero_reading || "" }}
                    </th>
                    <th>Rectangular</th>
                    <th>&Sqrt;3</th>

                    <th>1</th>
                    <th>
                      {{ reading?.uncertainty?.zero_deviation || "" }}
                    </th>
                    <td>&infin;</td>
                  </tr>

                  <tr>
                    <th class="text-end" colspan="6">Uncertainity</th>
                    <th colspan="2">
                      {{ reading?.uncertainty?.total_uncertainty || "" }}
                    </th>
                  </tr>

                  <tr>
                    <th class="text-end" colspan="6">Combined Uncertainity</th>
                    <th colspan="2">
                      {{ reading?.uncertainty?.combined_uncertainty || "" }}
                    </th>
                  </tr>

                  <tr>
                    <th class="text-end" colspan="6">k</th>
                    <th colspan="2">2</th>
                  </tr>

                  <tr>
                    <th class="text-end" colspan="6">Expanded Uncertainity</th>
                    <th colspan="2">
                      {{ reading?.uncertainty?.expanded_uncertainty || "" }}
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
    
    <script lang="ts">
// basic imports
import { getAssetPath, getIllustrationsPath } from "@/core/helpers/assets";
import { getPressureReading } from "@/stores/api";
import { defineComponent, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
// OR if using custom default options

// Define the interface for the ReferenceInstrument
interface ReferenceInstrument {
  id: string;
  company_id: string;
  instrument_id: string;
  parameter: string;
  name: string;
  model_no: string;
  serial_no: string;
  make: string;
  ranges_from: string;
  ranges_to: string;
  accuracy: string;
  uncertainty: string;
  calibration_date: string;
  calibration_due_date: string;
  resolution: string;
}

// Define the interface for the CalibrationInstrument
interface CalibrationInstrument {
  id: string;
  company_id: string;
  reference_instrument_id: string;
  service_request_id: string;
  instrument_id: string;
  parameter: string;
  name: string;
  model_no: string;
  serial_no: string;
  make: string;
  location: string;
  ranges_from: string;
  ranges_to: string;
  accuracy: string;
  resolution: string;
  calibration_date: string;
  calibration_due_date: string;
  calibration_points: string;
  periodicity: string;
  temp: string;
  rh: string;
  instrument_condition: string;
  remark: string;
  reference_instrument: ReferenceInstrument; // Nested ReferenceInstrument
}

interface Step {
  description: string;
  formula?: string;
  steps?: string[];
}

// Define the interface for the UncertaintyValue
interface UncertaintyValue {
  id: string;
  company_id: string;
  reading_id: string;
  standard_deviation: number;
  uncertainty_due_process: number;
  standard_uncertainty: number;
  uncertainty_resolution: number;
  hysteresis: number;
  uncertainty_due_hysteresis: number;
  max_zero_reading: number;
  zero_deviation: number;
  total_uncertainty: number;
  effective_deg_freedom: number;
  is_infinite: boolean;
  combined_uncertainty: string;
  expanded_uncertainty: string;
  steps: Step[];
}

// Define the interface for the Reading
interface PressureReading {
  id: string;
  company_id: string;
  calibration_instrument_id: string;
  uuc_reading: string;
  i1_up: string;
  d1_down: string;
  i2_up: string;
  d2_down: string;
  mean_value: string;
  is_active: string;
  created_at: string;
  updated_at: string;
  calibration_instrument: CalibrationInstrument; // Nested CalibrationInstrument
  uncertainty: UncertaintyValue; // Nested UncertaintyValue
}

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "pressure-calibration-edit",
  components: {},
  setup() {
    const route = useRoute();
    const itemId = route.params.id;
    const reading = ref<PressureReading | null>(null);
    const steps = ref<Step[]>([]);

    onMounted(async () => {
      try {
        const response = await getPressureReading(itemId.toString());
        if (response?.success) {
          reading.value = response.result as PressureReading;
          steps.value = JSON.parse(response.result.uncertainty.steps) as Step[];
        } else {
          console.error(
            `Error Occured in getPressureReading : ${
              response.message || "Error Occured in API"
            }`
          );
        }
      } catch (err) {
        console.error(`Error Occured in getPressureReading : ${err}`);
      }
    });
    return {
      getAssetPath,
      getIllustrationsPath,
      reading,
      steps,
    };
  },
});
</script>
    