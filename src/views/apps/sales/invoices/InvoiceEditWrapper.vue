<template>
    <div>
      <div v-if="isLoading" class="loader">
        <p>Loading...</p>
      </div>
      <component v-else :is="InvoiceComponent" :id="routeId" />
    </div>
  </template>
    
    <script lang="ts">
  import { defineComponent, shallowRef, ref, watchEffect } from "vue";
  import { useAuthStore } from "@/stores/auth";
  import { useRoute } from "vue-router";
  import { markRaw } from "vue";
  
  export default defineComponent({
    name: "invoice-edit-wrapper",
    setup() {
      const auth = useAuthStore();
      const route = useRoute();
      const isLoading = ref(true);
      const InvoiceComponent = shallowRef(null); // Prevent reactivity issues
      const routeId = ref(route.params.id); // Make routeId reactive to handle changes
  
      // Watch route params for changes and update `routeId`
      watchEffect(() => {
        routeId.value = route.params.id;
      });
  
      // Function to dynamically import components
      const importComponent = (folderName: string, componentName: string) =>
        import(
          `@/views/apps/sales/invoices/wrapper/${folderName}/${componentName}.vue`
        )
          .then((module) => {
            isLoading.value = false;
            return markRaw(module.default); // Avoid making component reactive
          })
          .catch(() => {
            // Handle loading failure (e.g., fallback to an error component)
            isLoading.value = false;
            return importComponent("ErrorFormat", "ErrorComponent");
          });
  
      // Watch for changes in the user's billing format
      watchEffect(() => {
        isLoading.value = true;
        const billingFormat = auth.companyDetails["billing_format"];
  
        switch (billingFormat) {
          case "billing-format-1":
            importComponent("InvoiceFormat1", "InvoiceFormat1Edit").then(
              (component) => (InvoiceComponent.value = component)
            );
            break;
          case "billing-format-2":
            importComponent("InvoiceFormat2", "InvoiceFormat2Edit").then(
              (component) => (InvoiceComponent.value = component)
            );
            break;
          default:
            importComponent("InvoiceFormat1", "InvoiceFormat1Edit").then(
              (component) => (InvoiceComponent.value = component) // Fallback component
            );
        }
      });
  
      return { InvoiceComponent, isLoading, routeId };
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
    