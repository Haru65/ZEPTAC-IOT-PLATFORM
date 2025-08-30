import { computed, ref, watch } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import JwtService, { User } from "@/core/services/JwtService";
import { useCustomerStore } from "@/stores/customerStore";

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
  
  const isAuthenticated = ref(true); // Always authenticated

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

    console.log("ftype : ",ftype);
    console.log("month : ",currentMonth);

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
    //console.log(authUser);
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

    // check whether actual vs local financial year
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
    // //console.log(user);
    JwtService.saveUser(JSON.stringify(user));
  }


  function setError(error: any) {
    errors.value = { ...error };
    console.error(error.value);
  }


  // for login auth only custom error
  function setAuthError(error: any) {
    errors.value = { error };
    // //console.log(errors);
  }


  function GetUser() {
    const data = JSON.parse(User() || "");
    return data;
  }


  // Simplified auth functions for development
  function purgeAuth() {
    // Do nothing in development mode - we're always authenticated
    console.log('Logout attempted - disabled in development mode');
  }

  async function login(credentials: User) {
    // Auto-login with demo user in development mode
    console.log('Auto-login with demo user');
    
    // Create demo user data
    const demoUser = {
      first_name: credentials.email.split('@')[0] || "Demo",
      last_name: "User",
      email: credentials.email,
      role_id: "1", // Admin role
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
    
    // Set auth state with demo user
    await setAuth(demoUser);
    
    // Initialize financial year settings
    financialYearType.value = "1";
    localStorage.setItem('financialYearType', "1");
    
    financialYearsCache.value = getAcademicYears(5, "1");
    
    selectedFinancialYear.value = getCurrentFinancialYear("1");
    localStorage.setItem('selectedFinancialYear', selectedFinancialYear.value);

    // Return success response
    return {
      data: {
        success: true,
        data: demoUser
      }
    };
  }


  function logout() {
    purgeAuth();
  }


  // Simplified auth functions for development
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

  // Simplified auth verification for development
  function verifyAuth() {
    // Always authenticated in development mode
    console.log('Auth verification - always authenticated in development mode');
    return true;
  }


  const financialYears = computed(() => {
    if (financialYearsCache.value.length === 0) {
      // Get academic years for the next 5 years based on the company financial year type
      financialYearsCache.value = getAcademicYears(5, localStorage.getItem('financialYearType') || user.value.company_details['financial_year_type'] || 2);
    }
    return financialYearsCache.value;
  });


  function getAcademicYears(numYears, financialYearType) {

    console.log(numYears,financialYearType )
    const date = new Date();
    const years :string[] = [];
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth() + 1; // JavaScript months are 0-11


    for (let i = 0; i < numYears; i++) {
      let startYear, endYear;

      if (financialYearType == "1") { // January - December
        startYear = currentYear - i;
        endYear = currentYear - i;
      } else if (financialYearType == "2") { // April - March
        if (currentMonth >= 4) {
          startYear = currentYear - i;
          endYear = startYear + 1;
        } else {
          startYear = currentYear - i - 1;
          endYear = startYear + 1;
        }
      }

      console.log(`${startYear}-${endYear}`)
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