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

// Environment detection
const isDevelopment = import.meta.env.DEV 
const isProduction = !isDevelopment;

export const useAuthStore = defineStore("auth", () => {
  const errors = ref({});
  
  // Default user structure
  const defaultUser: User = {
    first_name: "Demo",
    last_name: "User",
    email: "demo@example.com",
    password: "",
    api_token: "demo-token",
    data: "",
    role_id: "1",
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
  };
  
  const user = ref<User>(defaultUser);
  
  // Authentication state - only auto-authenticated in development
  const isAuthenticated = ref(isDevelopment ? true : false);
  const companyDetails = ref<CompanyDetails>(user.value.company_details);
  const selectedFinancialYear = ref<string>(getCurrentFinancialYear("1")); 
  const financialYearType = ref<string>("1");
  const financialYearsCache = ref<string[]>([]);

  // Initialize from stored data if available
  function initializeFromStorage() {
    try {
      const storedUser = localStorage.getItem('user');
      const storedAuth = localStorage.getItem('isAuthenticated');
      const storedFinancialYear = localStorage.getItem('selectedFinancialYear');
      const storedFinancialYearType = localStorage.getItem('financialYearType');

      if (storedUser && storedAuth === 'true') {
        const parsedUser = JSON.parse(storedUser);
        user.value = { ...defaultUser, ...parsedUser };
        companyDetails.value = user.value.company_details;
        isAuthenticated.value = true;
      }

      if (storedFinancialYear) {
        selectedFinancialYear.value = storedFinancialYear;
      }

      if (storedFinancialYearType) {
        financialYearType.value = storedFinancialYearType;
      }
    } catch (error) {
      console.error('Error initializing from storage:', error);
      // Reset to defaults if there's an error
      user.value = defaultUser;
      isAuthenticated.value = isDevelopment;
    }
  }

  // Initialize on store creation
  initializeFromStorage();

  // Get customer store instance with error handling
  let customerStore;
  try {
    customerStore = useCustomerStore();
  } catch (error) {
    console.warn('Customer store not available:', error);
  }

  function getCurrentFinancialYear(ftype) {
    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth() + 1;

    console.log("ftype : ", ftype);
    console.log("month : ", currentMonth);

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
    } else {
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
    try {
      isAuthenticated.value = true;
      
      user.value = {
        ...defaultUser,
        ...authUser,
        company_details: {
          ...defaultUser.company_details,
          ...(authUser.company_details || {})
        }
      };

      // In development, override with demo data
      if (isDevelopment) {
        user.value.role_id = "1";
        user.value.api_token = "demo-token";
      }

      companyDetails.value = user.value.company_details;
      errors.value = {};
      
      // Safe localStorage operations
      try {
        localStorage.setItem('user', JSON.stringify(user.value));
        localStorage.setItem('isAuthenticated', 'true');
      } catch (storageError) {
        console.warn('Could not save to localStorage:', storageError);
      }

      const localFinancialYear = localStorage.getItem("financialYearType");
      const actualFinancialYear = user.value.company_details.financial_year_type || "1";

      // Check whether actual vs local financial year
      if (localFinancialYear != actualFinancialYear) {
        financialYearType.value = actualFinancialYear;
        try {
          localStorage.setItem('financialYearType', actualFinancialYear);
        } catch (error) {
          console.warn('Could not save financial year type:', error);
        }

        selectedFinancialYear.value = getCurrentFinancialYear(actualFinancialYear);
        try {
          localStorage.setItem('selectedFinancialYear', selectedFinancialYear.value);
        } catch (error) {
          console.warn('Could not save selected financial year:', error);
        }
      }

      if (!localStorage.getItem('selectedFinancialYear')) {
        financialYearType.value = actualFinancialYear;
        selectedFinancialYear.value = getCurrentFinancialYear(actualFinancialYear);
        
        try {
          localStorage.setItem('financialYearType', actualFinancialYear);
          localStorage.setItem('selectedFinancialYear', selectedFinancialYear.value);
        } catch (error) {
          console.warn('Could not save to localStorage:', error);
        }
      }
    } catch (error) {
      console.error('Error in setAuth:', error);
      setError(error);
    }
  }

  function get_auth() {
    return isAuthenticated.value;
  }

  function saveUser(userData: User) {
    try {
      JwtService.saveUser(JSON.stringify(userData));
    } catch (error) {
      console.error('Error saving user:', error);
    }
  }

  function setError(error: any) {
    errors.value = { ...error };
    console.error(error);
  }

  // For login auth only custom error
  function setAuthError(error: any) {
    errors.value = { error };
  }

  // FIXED: This was the main source of your JSON parsing error
// FIXED: Updated to use the correct JwtService method names
function GetUser() {
  try {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      return JSON.parse(storedUser);
    }
    
    // Try to get from JwtService using the correct method name
    try {
      const jwtUser = JwtService.User?.(); // Using User() instead of getUser()
      if (jwtUser) {
        return typeof jwtUser === 'string' ? JSON.parse(jwtUser) : jwtUser;
      }
    } catch (jwtError) {
      console.warn('Could not get user from JwtService:', jwtError);
    }
    
    // Return current user state as fallback
    return user.value;
  } catch (error) {
    console.error('Error getting user data:', error);
    return user.value; // Return current user state as safe fallback
  }
}

    function purgeAuth() {
  if (isDevelopment) {
    console.log('Logout attempted - disabled in development mode');
    return;
  }
  
  isAuthenticated.value = false;
  user.value = defaultUser;
  errors.value = {};
  
  try {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('financialYearType');
    localStorage.removeItem('selectedFinancialYear');
  } catch (error) {
    console.warn('Could not clear localStorage:', error);
  }
  
  try {
    JwtService.destroyToken?.(); // This method exists
    JwtService.destroyUser?.();  // This method exists
  } catch (error) {
    console.warn('Could not destroy JWT token/user:', error);
  }
}


  async function login(credentials: User) {
    try {
      if (isDevelopment) {
        // Auto-login with demo user in development mode
        console.log('Auto-login with demo user');
        
        const demoUser = {
          first_name: credentials.email?.split('@')[0] || "Demo",
          last_name: "User",
          email: credentials.email || "demo@example.com",
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
        
        financialYearType.value = "1";
        try {
          localStorage.setItem('financialYearType', "1");
        } catch (error) {
          console.warn('Could not save to localStorage:', error);
        }
        
        financialYearsCache.value = getAcademicYears(5, "1");
        selectedFinancialYear.value = getCurrentFinancialYear("1");
        
        try {
          localStorage.setItem('selectedFinancialYear', selectedFinancialYear.value);
        } catch (error) {
          console.warn('Could not save to localStorage:', error);
        }

        return {
          data: {
            success: true,
            data: demoUser
          }
        };
      } else {
        // Production login logic
        const response = await ApiService.post('/login', credentials);
        
        if (response?.data) {
          await setAuth(response.data);
          
          // Set up financial year data
          const fyType = response.data.company_details?.financial_year_type || "1";
          financialYearType.value = fyType;
          financialYearsCache.value = getAcademicYears(5, fyType);
          selectedFinancialYear.value = getCurrentFinancialYear(fyType);
          
          try {
            localStorage.setItem('financialYearType', fyType);
            localStorage.setItem('selectedFinancialYear', selectedFinancialYear.value);
          } catch (error) {
            console.warn('Could not save to localStorage:', error);
          }
          
          return response;
        } else {
          throw new Error('Invalid response from server');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error);
      throw error;
    }
  }

  function logout() {
    purgeAuth();
  }

  async function register(credentials: User) {
    try {
      if (isDevelopment) {
        console.log('Registration attempted - using demo mode');
        return {
          success: true,
          data: user.value
        };
      } else {
        const response = await ApiService.post('/register', credentials);
        if (response?.data) {
          await setAuth(response.data);
          return response;
        } else {
          throw new Error('Invalid response from server');
        }
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError(error);
      throw error;
    }
  }

  async function forgotPassword(email: string) {
    try {
      if (isDevelopment) {
        console.log('Password reset attempted - disabled in development mode');
        return {
          success: true,
          message: 'Password reset functionality is disabled in development mode'
        };
      } else {
        const response = await ApiService.post('/forgot-password', { email });
        return response;
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      setError(error);
      throw error;
    }
  }

  function verifyAuth() {
    if (isDevelopment) {
      console.log('Auth verification - always authenticated in development mode');
      return true;
    }
    
    try {
      const storedAuth = localStorage.getItem('isAuthenticated');
      const storedUser = localStorage.getItem('user');
      
      if (storedAuth === 'true' && storedUser) {
        const userData = JSON.parse(storedUser);
        if (userData && userData.api_token) {
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error('Error verifying auth:', error);
      return false;
    }
  }

  const financialYears = computed(() => {
    if (financialYearsCache.value.length === 0) {
      const fyType = localStorage.getItem('financialYearType') || 
                     user.value.company_details?.financial_year_type || 
                     "2";
      financialYearsCache.value = getAcademicYears(5, fyType);
    }
    return financialYearsCache.value;
  });

  function getAcademicYears(numYears, financialYearType) {
    console.log(numYears, financialYearType);
    const date = new Date();
    const years: string[] = [];
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth() + 1;

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

      console.log(`${startYear}-${endYear}`);
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
