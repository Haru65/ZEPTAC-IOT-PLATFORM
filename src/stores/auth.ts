import { computed, ref, watch } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import JwtService, { User } from "@/core/services/JwtService";


export interface User {
  name: string;
  surname: string;
  email: string;
  password: string;
  api_token: string;
  data: string;
  company_details:[];
}


export const useAuthStore = defineStore("auth", () => {
  const errors = ref({});
  const user = ref<User>({} as User);
  const isAuthenticated = ref(JwtService.getToken());

  const selectedFinancialYear = ref<string>(""); 
  const financialYearType = ref<string>("");

  const financialYearsCache = ref<string[]>([]); // Cache for financial years


  function getCurrentFinancialYear(ftype) {
    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth() + 1;

    console.log("ftype : ",ftype);
    console.log("month : ",currentMonth);

    let startYear, endYear;


    if (ftype == "1") { // January - December
      startYear = currentYear;
      endYear = startYear;
    } else if (ftype == "2") { // April - March
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
    isAuthenticated.value = authUser.role_id;
    user.value = authUser;
    errors.value = {};
    JwtService.saveToken(user.value.api_token);

    const localFinancialYear = localStorage.getItem("financialYearType");
    const actualFinancialYear = user.value.company_details["financial_year_type"];

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


  function purgeAuth() {
    isAuthenticated.value = null;
    user.value = {} as User;
    errors.value = [];
    JwtService.destroyToken();
    JwtService.destroyUser();
    JwtService.destroySelectedYear();
    JwtService.destroyFinancialType();
  }


  async function login(credentials: User) {
    return ApiService.post("login", credentials)
      .then(({ data }) => {
        // console.log(data);
        setAuth(data);
        saveUser(data);

        // If there is no local financial year type, initialize it with the actual value
        financialYearType.value = user.value.company_details["financial_year_type"];
        localStorage.setItem('financialYearType', user.value.company_details["financial_year_type"]);

        // Also initialize the selected academic year
        selectedFinancialYear.value = getCurrentFinancialYear(user.value.company_details["financial_year_type"]);
        localStorage.setItem('selectedFinancialYear', selectedFinancialYear.value);

      })
      .catch(({ response }) => {
        console.error(response.data.message);
        setAuthError(response.data.message);
      });
  }


  function logout() {
    purgeAuth();
  }


  function register(credentials: User) {
    return ApiService.post("register", credentials)
      .then(({ data }) => {
        setAuth(data);
      })
      .catch(({ response }) => {
        console.error(response.data.message);
        setError(response.data.errors);
      });
  }


  function forgotPassword(email: string) {


    return ApiService.post("forgot_password", email)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data
      });


  }


  // before every page a call is made with a JWT token to request user credentials
  function verifyAuth() {
    //console.log(isAuthenticated.value);
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.post("verify_token", { api_token: JwtService.getToken() })
        .then(({ data }) => {
          setAuth(data);
        })
        .catch(({ response }) => {
          if (response.data.error_code) {
            console.error(response.data.message);
            setError(response.data.message);
            purgeAuth();
          }
        });
    } else {
      purgeAuth();
    }
  }


  const financialYears = computed(() => {
    if (financialYearsCache.value.length === 0) {
      // Get academic years for the next 5 years based on the company financial year type
      financialYearsCache.value = getAcademicYears(5, localStorage.getItem('financialYearType') || user.value.company_details['financial_year_type']);
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
  };
});