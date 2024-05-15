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
}

export const useAuthStore = defineStore("auth", () => {
  const errors = ref({});
  const user = ref<User>({} as User);
  const isAuthenticated = ref(JwtService.getToken());

  const academicYearsCache = ref<string[]>([]); // Cache for academic years

  // Load selected academic year from localStorage on store initialization
  const selectedAcademicYear = ref<string>(
    localStorage.getItem('selectedAcademicYear') || ''
  );

  // Watch for changes in the selected academic year and update localStorage
  watch(selectedAcademicYear, (newValue) => {
    localStorage.setItem('selectedAcademicYear', newValue);
  });

  function setAuth(authUser: any) {
    //console.log(authUser);
    isAuthenticated.value = authUser.role_id;
    user.value = authUser;
    errors.value = {};
    JwtService.saveToken(user.value.api_token);
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
  }

  function login(credentials: User) {
    return ApiService.post("login", credentials)
      .then(({ data }) => {
        // //console.log(data);
        setAuth(data);
        saveUser(data);
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

  const academicYears = computed(() => {
    if (academicYearsCache.value.length === 0) {
      academicYearsCache.value = getAcademicYears(5); // Example: Get academic years for the next 5 years
    }
    return academicYearsCache.value;
  });

  function getAcademicYears(numYears: number): string[] {
    const date = new Date();
    const years: string[] = [];

    for (let i = 0; i < numYears; i++) {
        const year = date.getFullYear() - i;
        let academicYearStart: number;
        let academicYearEnd: number;

        if (date.getMonth() >= 3) {
            academicYearStart = year;
            academicYearEnd = year + 1;
        } else {
            academicYearStart = year - 1;
            academicYearEnd = year;
        }

        const academicYear = `${academicYearStart}-${academicYearEnd}`;
        years.push(academicYear);
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
    academicYears,
    selectedAcademicYear,
  };
});


