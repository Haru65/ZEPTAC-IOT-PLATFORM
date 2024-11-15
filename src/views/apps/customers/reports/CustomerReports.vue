<template>
  <!--begin::Row-->
  <div class="row g-5 g-xl-8">
    <div class="col-xl-6">
      <router-link to="/customer/validation-reports">
        <StatisticsWidget5
          widget-classes="card-xl-stretch mb-xl-8"
          icon-name="cheque"
          color="dark"
          icon-color="light"
          title="Validation Reports"
          description="click here to see your reports"
        ></StatisticsWidget5>
      </router-link>
    </div>

    <div class="col-xl-6">
      <router-link to="/customer/thermal-reports">
        <StatisticsWidget5
          widget-classes="card-xl-stretch mb-xl-8"
          icon-name="briefcase"
          color="warning"
          icon-color="white"
          title="Thermal Reports"
          description="click here to see your reports"
        ></StatisticsWidget5>
      </router-link>
    </div>
  </div>
  <!--end::Row-->
</template>
  
  <script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { useAuthStore } from "@/stores/auth";
import { getAssetPath } from "@/core/helpers/assets";
import StatisticsWidget5 from "@/components/widgets/statsistics/Widget5.vue";

export default defineComponent({
  name: "customer-reports-page",
  components: {
    StatisticsWidget5,
  },
  setup() {
    // Financial Year Logic
    const authStore = useAuthStore();

    const loading = ref(true);

    const financialYears = ref(authStore.financialYears); // Generate Financial years list using the auth store function
    const selectedYearCache = ref(
      localStorage.getItem("selectedFinancialYear") || ""
    );

    // Fallback to default value if localStorage data is invalid or missing
    if (!financialYears.value.includes(selectedYearCache.value)) {
      selectedYearCache.value = financialYears.value[0];
    }

    watch(selectedYearCache, (newValue) => {
      localStorage.setItem("selectedFinancialYear", newValue);
    });

    async function handleChange() {
      localStorage.setItem("selectedFinancialYear", selectedYearCache.value);
    }

    onMounted(async () => {
      // Save initial selected year to localStorage
      localStorage.setItem("selectedFinancialYear", selectedYearCache.value);
    });

    return {
      loading,

      selectedYearCache,
      financialYears,
      handleChange,
    };
  },
});
</script>