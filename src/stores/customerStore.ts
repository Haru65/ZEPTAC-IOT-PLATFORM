import { defineStore } from "pinia";
import { ref, computed } from "vue";
import ApiService from "@/core/services/ApiService";

export interface CustomerCompany {
  company_id: string;
  company_name: string;
  company_logo: string;
  customer_id: string;
  customer_company_name: string;
  customer_email: string;
  customer_mobile: string;
  customer_name: string;
  customer_address1: string;
  customer_address2: string;
  customer_city: string;
  customer_pincode: string;
  customer_state: string;
  customer_country: string;
}

export const useCustomerStore = defineStore("customer", () => {
  const customerCompanyData = ref<CustomerCompany[] | null>(null);
  const isDataFetched = ref(false);
  const error = ref<string | null>(null);

  async function fetchCustomerCompanyData() {
    if (isDataFetched.value) {
      console.log("Customer-Company data already exists, skipping fetch...");
      return;
    }

    try {
      const response = await ApiService.get("get_customer_companies");
      customerCompanyData.value = response.data.result;
      isDataFetched.value = true;
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to fetch data";
      console.error("Error fetching customer-company data:", error.value);
    }
  }

  // ✅ Reset function to clear data on logout
  function resetStore() {
    customerCompanyData.value = null;
    isDataFetched.value = false;
    error.value = null;
  }

  return {
    customerCompanyData: computed(() => customerCompanyData.value),
    isDataFetched: computed(() => isDataFetched.value),
    error,
    fetchCustomerCompanyData,
    resetStore, // Expose reset function
  };
});
