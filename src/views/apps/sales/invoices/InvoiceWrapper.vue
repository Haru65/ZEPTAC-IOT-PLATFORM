<template>
    <div>
      <div v-if="isLoading" class="loader">
        <p>Loading...</p>
      </div>
      <component v-else :is="InvoiceComponent" />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, shallowRef, watch, markRaw } from "vue";
  import { useAuthStore } from "@/stores/auth";
  
  export default defineComponent({
    name: "invoice-wrapper",
    setup() {
      const auth = useAuthStore();
      const User = auth.GetUser();
  
      const isLoading = ref(true); // Keep `isLoading` as `ref`, it doesn’t need changes
      const InvoiceComponent = shallowRef(null); // Use `shallowRef` for component reference
  
      // Function to dynamically import components
      const importComponent = (folderName: string, componentName: string) =>
        import(
          `@/views/apps/sales/invoices/wrapper/${folderName}/${componentName}.vue`
        ).then((module) => {
          isLoading.value = false; // Set loading to false after import
          return markRaw(module.default); // Ensure the imported component is marked as raw
        });
  
      // Watch for changes in the user's billing format
      watch(
        () => auth.companyDetails["billing_format"],
        (newFormat) => {
          isLoading.value = true; // Start loading again on format change
  
          // Switch statement to handle different billing formats
          switch (newFormat) {
            case "billing-format-1":
              importComponent("InvoiceFormat1", "InvoiceFormat1Add").then(
                (component) => {
                  InvoiceComponent.value = component; // Set the component to load
                }
              );
              break;
            case "billing-format-2":
              importComponent("InvoiceFormat2", "InvoiceFormat2Add").then(
                (component) => {
                  InvoiceComponent.value = component; // Set the component to load
                }
              );
              break;
            default:
              importComponent("InvoiceFormat1", "InvoiceFormat1Add").then(
                (component) => {
                    InvoiceComponent.value = component; // Fallback component
                }
              );
          }
        },
        { immediate: true } // Run the watcher immediately on setup
      );
  
      return { InvoiceComponent, isLoading };
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
    