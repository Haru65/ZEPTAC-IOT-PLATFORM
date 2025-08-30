import { computed, ref, watch } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import JwtService, { User } from "@/core/services/JwtService";
import { useCustomerStore } from "@/stores/customerStore";
import router from "@/router";

export interface User {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  api_token: string;
  data: string;
  company_details: CompanyDetails;
  role_id: string;
  meta?: {
    profile_pic?: string;
  };
}

export interface CompanyDetails {
  company_id: number;
  company_name: string;
  financial_year_type: string;
  is_active: number;
  is_trial: boolean;
  trial_subscription_start: string;
  trial_subscription_end: string;
  billing_format: string;
}

export const useAuthStore = defineStore("auth", () => {
  const errors = ref({});
  const user = ref<User>({
    first_name: "Demo",
    last_name: "User",
    email: "demo@example.com",
    password: "",
    api_token: "demo-token",
    data: "",
    role_id: "1", // Admin role
    meta: {
      profile_pic: ""
    },
    company_details: {
      company_id: 1,
      company_name: "Demo Company",
      financial_year_type: "1",
      is_active: 1,
      is_trial: false,
      trial_subscription_start: "",
      trial_subscription_end: "",
      billing_format: "standard"
    }
  });
  
  const isAuthenticated = ref(!!localStorage.getItem('isAuthenticated'));

  const companyDetails = ref<CompanyDetails>(user.value.company_details);

  const selectedFinancialYear = ref<string>(getCurrentFinancialYear("1")); 
  const financialYearType = ref<string>("1");

  const financialYearsCache = ref<string[]>([]); // Cache for financial years

  // Get customer store instance
  const customerStore = useCustomerStore();

  function getCurrentFinancialYear(ftype) {
    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth() + 1;

    let startYear, endYear;

    if (ftype == 1) { // January - December
      startYear = currentYear;
      endYear = startYear;
    } else if (ftype == 2) { // April - March
      if (currentMonth >= 4) {
        startYear = currentYear;
        endYear = currentYear + 1;
      } else {
        startYear = currentYear - 1;
        endYear = currentYear;
      }
    }
    else{
      if (currentMonth >= 4) {
        startYear = currentYear;
        endYear = currentYear + 1;
      } else {
        startYear = currentYear - 1;
        endYear = currentYear;
      }
    }

    return `${startYear}-${endYear}`;
  }

  async function setAuth(authUser: any) {
    isAuthenticated.value = true; // Always set to true in development
    user.value = {
      ...authUser,
      role_id: "1", // Always set as admin in development
      api_token: "demo-token",
      company_details: {
        company_id: 1,
        company_name: "Demo Company",
        financial_year_type: "1",
        is_active: 1,
        is_trial: false,
        trial_subscription_start: "",
        trial_subscription_end: "",
        billing_format: "standard"
      }
    };
    companyDetails.value = user.value.company_details;
    errors.value = {};
    localStorage.setItem('user', JSON.stringify(user.value));
    localStorage.setItem('isAuthenticated', 'true');

    const localFinancialYear = localStorage.getItem("financialYearType");
    const actualFinancialYear = "1"; // Always use type 1 in development

    if(localFinancialYear != actualFinancialYear){
      financialYearType.value = user.value.company_details["financial_year_type"];
      localStorage.setItem('financialYearType', user.value.company_details["financial_year_type"]);

      selectedFinancialYear.value = getCurrentFinancialYear(user.value.company_details["financial_year_type"]);
      localStorage.setItem('selectedFinancialYear', selectedFinancialYear.value);
    }

    if(!localStorage.getItem('selectedFinancialYear')){
      financialYearType.value = user.value.company_details["financial_year_type"];
      localStorage.setItem('financialYearType', user.value.company_details["financial_year_type"]);

      selectedFinancialYear.value = getCurrentFinancialYear(user.value.company_details["financial_year_type"]);
      localStorage.setItem('selectedFinancialYear', selectedFinancialYear.value);
    }
  }

  function get_auth() {
    return isAuthenticated.value;
  }

  function saveUser(user: User) {
    JwtService.saveUser(JSON.stringify(user));
  }

  function setError(error: any) {
    errors.value = { ...error };
    console.error(error.value);
  }

  function setAuthError(error: any) {
    errors.value = { error };
  }

  // ✅ FIXED GetUser
  function GetUser() {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        return JSON.parse(stored);
      }
      return user.value; // fallback to state
    } catch (e) {
      console.error("Error parsing user from storage:", e);
      return user.value;
    }
  }

  function purgeAuth() {
    console.log('Logout attempted - disabled in development mode');
  }

  async function login(credentials: { email: string; password: string; remember?: boolean }) {
    try {
      // For demo/development
      if (credentials.email === 'demo@example.com' && credentials.password === 'demo12345') {
        const demoUser = {
          first_name: "Demo",
          last_name: "User",
          email: credentials.email,
          role_id: "1",
          api_token: "demo-token",
          company_details: {
            company_id: 1,
            company_name: "Demo Company",
            financial_year_type: "1",
            is_active: 1,
            is_trial: false,
            trial_subscription_start: "",
            trial_subscription_end: "",
            billing_format: "standard"
          }
        };
        await setAuth(demoUser);
        return true;
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
    
    await setAuth(demoUser);
    
    financialYearType.value = "1";
    localStorage.setItem('financialYearType', "1");
    
    financialYearsCache.value = getAcademicYears(5, "1");
    
    selectedFinancialYear.value = getCurrentFinancialYear("1");
    localStorage.setItem('selectedFinancialYear', selectedFinancialYear.value);

    return {
      data: {
        success: true,
        data: demoUser
      }
    };
  }

  function logout() {
    // Clear all auth related data
    user.value = {} as User;
    isAuthenticated.value = false;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    
    // Clear API token if you're using it
    if (ApiService.vueInstance?.axios) {
      delete ApiService.vueInstance.axios.defaults.headers.common["Authorization"];
    }
    
    // Redirect to login page using router
    router.push('/login');
  }

  function register(credentials: User) {
    console.log('Registration attempted - disabled in development mode');
    return Promise.resolve({
      success: true,
      data: user.value
    });
  }

  function forgotPassword(email: string) {
    console.log('Password reset attempted - disabled in development mode');
    return Promise.resolve({
      success: true,
      message: 'Password reset functionality is disabled in development mode'
    });
  }

  function verifyAuth() {
    console.log('Auth verification - always authenticated in development mode');
    return true;
  }

  const financialYears = computed(() => {
    if (financialYearsCache.value.length === 0) {
      financialYearsCache.value = getAcademicYears(
        5,
        localStorage.getItem('financialYearType') || user.value.company_details['financial_year_type'] || 2
      );
    }
    return financialYearsCache.value;
  });

  function getAcademicYears(numYears, financialYearType) {
    const date = new Date();
    const years :string[] = [];
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth() + 1;

    for (let i = 0; i < numYears; i++) {
      let startYear, endYear;

      if (financialYearType == "1") { // Jan-Dec
        startYear = currentYear - i;
        endYear = currentYear - i;
      } else if (financialYearType == "2") { // Apr-Mar
        if (currentMonth >= 4) {
          startYear = currentYear - i;
          endYear = startYear + 1;
        } else {
          startYear = currentYear - i - 1;
          endYear = startYear + 1;
        }
      }
      const financialYear = `${startYear}-${endYear}`;
      years.push(financialYear);
    }

    return years;
  }

  const isCustomer = computed(() => user.value?.role_id == "7");
  
  return {
    errors,
    user,
    isAuthenticated,
    login,
    logout,
    register,
    forgotPassword,
    verifyAuth,
    purgeAuth,
    get_auth,
    GetUser,
    financialYears,
    selectedFinancialYear,
    financialYearType,
    companyDetails,
    isCustomer,
  };
});
