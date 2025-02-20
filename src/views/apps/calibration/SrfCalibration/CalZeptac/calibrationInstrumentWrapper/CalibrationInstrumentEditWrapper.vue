<template>
  <div>
    <div v-if="isLoading" class="loader">
      <p>Loading...</p>
    </div>
    <component v-else :is="InstrumentComponent" :id="routeId" />
  </div>
</template>
  
  <script lang="ts">
import { defineComponent, shallowRef, ref, provide, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { markRaw } from "vue";
import { useAuthStore } from "@/stores/auth";
export default defineComponent({
  name: "calibration-instrument-edit-wrapper",
  setup() {
    const route = useRoute();
    const isLoading = ref(true);
    const InstrumentComponent = shallowRef(null);
    const routeId = ref(route.params.id);
    
    const auth = useAuthStore();
    const User = auth.GetUser();

    provide("routeId", routeId);
    provide("User", User);
    // Use route.params instead of query
    const instrumentType = ref(route.params.type || "default");

    // Function to dynamically import components based on instrument type
    const importComponent = (folderName: string, componentName: string) =>
      import(
        `@/views/apps/calibration/SrfCalibration/CalZeptac/calibrationInstrumentWrapper/${folderName}/${componentName}.vue`
      )
        .then((module) => {
          isLoading.value = false;
          return markRaw(module.default);
        })
        .catch(() => {
          isLoading.value = false;
          return importComponent("default", "ErrorComponent");
        });

    // Load component dynamically
    watchEffect(() => {
      isLoading.value = true;
      switch (instrumentType.value) {
        case "Pressure":
          importComponent("pressure", "PressureInstrumentEdit").then(
            (component) => (InstrumentComponent.value = component)
          );
          break;
        case "Electro-technical":
          importComponent("electro", "ElectroInstrumentEdit").then(
            (component) => (InstrumentComponent.value = component)
          );
          break;
        default:
          importComponent("default", "ErrorComponent").then(
            (component) => (InstrumentComponent.value = component)
          );
      }
    });

    return { InstrumentComponent, isLoading, routeId };
  },
});
</script>
  
  <style scoped>
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  font-size: 1.5em;
  color: #333;
}

.loader::after {
  content: "";
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
  