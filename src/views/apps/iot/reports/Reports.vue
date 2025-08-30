<template>
  <div class="row g-4">
    <div class="col-lg-12">
      <TemperatureHumidityChart
        widget-classes="card-xl-stretch mb-4"
        :height="300"
      />
    </div>
    <div class="col-lg-12">
      <EnergyConsumption
        widget-classes="card-xl-stretch mb-4"
        :height="300"
      />
    </div>
  </div>
</template>
    
  <script lang="ts">
import { defineComponent, ref } from "vue";
import TemperatureHumidityChart from "./TemperatureHumidityChart.vue";
import EnergyConsumption from "./EnergyConsumption.vue";
export default defineComponent({
  name: "devices",
  components: {
    TemperatureHumidityChart,
    EnergyConsumption,
  },
  setup() {
    // Return all necessary data and methods to the template
    return {};
  },
});
</script>
  