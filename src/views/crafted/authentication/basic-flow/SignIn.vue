<template>
  <!--begin::Wrapper-->
  <div class="w-lg-400px p-10">
    <!--begin::Form-->
    <VForm
      class="form w-100"
      id="kt_login_signin_form"
      @submit="onSubmitLogin"
      :validation-schema="login"
    >
      <!--begin::Heading-->
      <div class="text-center mb-10">
        <!--begin::Title-->
        <h1 class="text-dark mb-3">Login</h1>
        <!--end::Title-->
      </div>
      <!--end::Heading-->

      <!--begin::Error Alert-->
      <div v-if="authError" class="alert alert-dismissible bg-light-danger d-flex flex-column flex-sm-row p-5 mb-10">
        <i class="ki-duotone ki-information fs-2hx text-danger me-4 mb-5 mb-sm-0">
          <span class="path1"></span>
          <span class="path2"></span>
          <span class="path3"></span>
        </i>
        <div class="d-flex flex-column pe-0 pe-sm-10">
          <h4 class="fw-semibold text-danger">Authentication Error</h4>
          <span class="text-danger">{{ authError }}</span>
        </div>
        <button 
          @click="clearAuthError" 
          type="button" 
          class="position-absolute position-sm-relative m-2 m-sm-0 top-0 end-0 btn btn-icon ms-sm-auto"
        >
          <i class="ki-duotone ki-cross fs-1 text-danger">
            <span class="path1"></span>
            <span class="path2"></span>
          </i>
        </button>
      </div>
      <!--end::Error Alert-->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Label-->
        <label class="form-label fs-6 fw-bold text-dark">Email or Username</label>
        <!--end::Label-->

        <!--begin::Input-->
        <Field
          tabindex="1"
          class="form-control form-control-lg form-control-solid"
          type="text"
          name="email"
          placeholder="Enter your email or username"
          autocomplete="username"
        />
        <!--end::Input-->
        
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="email" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Wrapper-->
        <div class="d-flex flex-stack mb-2">
          <!--begin::Label-->
          <label class="form-label fw-bold text-dark fs-6 mb-0">Password</label>
          <!--end::Label-->

          <!--begin::Link-->
          <router-link to="/password-reset" class="link-primary fs-6 fw-bold">
            Forgot Password?
          </router-link>
          <!--end::Link-->
        </div>
        <!--end::Wrapper-->

        <!--begin::Input-->
        <div class="position-relative">
          <Field
            tabindex="2"
            class="form-control form-control-lg form-control-solid pe-12"
            :type="showPassword ? 'text' : 'password'"
            name="password"
            placeholder="Please enter your password"
            autocomplete="off"
          />
          <button
            type="button"
            @click="togglePassword"
            class="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2"
            tabindex="-1"
          >
            <i v-if="showPassword" class="ki-duotone ki-eye-slash fs-2">
              <span class="path1"></span>
              <span class="path2"></span>
              <span class="path3"></span>
              <span class="path4"></span>
            </i>
            <i v-else class="ki-duotone ki-eye fs-2">
              <span class="path1"></span>
              <span class="path2"></span>
              <span class="path3"></span>
            </i>
          </button>
        </div>
        <!--end::Input-->
        
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="password" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Actions-->
      <div class="text-center">
        <!--begin::Submit button-->
        <button
          tabindex="3"
          type="submit"
          ref="submitButton"
          id="kt_sign_in_submit"
          class="btn btn-lg w-100 mb-5 text-white"
          style="background-color: #0e91a5;"
        >
          <span class="indicator-label">Sign In</span>

          <span class="indicator-progress">
            Please wait...
            <span
              class="spinner-border spinner-border-sm align-middle ms-2"
            ></span>
          </span>
        </button>
        <!--end::Submit button-->

      </div>
      <!--end::Actions-->
    </VForm>
    <!--end::Form-->
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref, computed } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { useAuthStore, type User } from "@/stores/auth";
import { useRouter } from "vue-router";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";

export default defineComponent({
  name: "login-page",
  components: {
    Field,
    VForm,
    ErrorMessage,
  },
  setup() {
    const store = useAuthStore();
    const router = useRouter();

    // Clear existing errors
    store.logout();

    const submitButton = ref<HTMLButtonElement | null>(null);
    const authError = ref<string | null>(null);
    const showPassword = ref(false);

    // Computed property to get error from store
    const storeError = computed(() => {
      const errors = store.errors;
      return errors?.general || null;
    });

    // Function to clear auth error
    const clearAuthError = () => {
      authError.value = null;
      store.errors = {};
    };

    // Function to toggle password visibility
    const togglePassword = () => {
      showPassword.value = !showPassword.value;
    };

    //Create form validation object
    const login = Yup.object().shape({
      email: Yup.string()
        .required("Email or username is required")
        .min(3, "Must be at least 3 characters")
        .label("Email/Username"),
      password: Yup.string()
        .required("Password is required")
        .min(4, "Must be at least 4 characters")
        .label("Password"),
    });

    //Form submit function
    const onSubmitLogin = async (values: any) => {
      values = values as User;
      
      // Clear existing errors
      authError.value = null;
      store.errors = {};

      if (submitButton.value) {
        // eslint-disable-next-line
        submitButton.value!.disabled = true;
        // Activate indicator
        submitButton.value.setAttribute("data-kt-indicator", "on");
      }

      try {
        // Send login request
        await store.login(values);
        
        // Check for success
        Swal.fire({
          text: "Login successful!",
          icon: "success",
          showConfirmButton: false,
          heightAuto: true,
          timer: 1000,
        }).then(() => {
          // Go to page after successfully login
          router.push({ name: "dashboard" });
        });
        
      } catch (err: any) {
        // Handle login errors
        console.error('Login failed:', err);
        
        // Display the actual error message from the store or from the error directly
        let errorMessage = 'Login failed. Please try again.';
        
        // Try to get error from store first
        if (store.errors && store.errors.general) {
          errorMessage = store.errors.general;
        } 
        // If no error in store, try to extract from error response
        else if (err.response && err.response.data) {
          const responseData = err.response.data;
          if (responseData.error) {
            errorMessage = responseData.error;
          } else if (responseData.message) {
            errorMessage = responseData.message;
          }
        }
        // Use error message if available
        else if (err.message) {
          errorMessage = err.message;
        }
        
        authError.value = errorMessage;
      } finally {
        //Deactivate indicator
        submitButton.value?.removeAttribute("data-kt-indicator");
        // eslint-disable-next-line
        submitButton.value!.disabled = false;
      }
    };

    return {
      onSubmitLogin,
      login,
      submitButton,
      getAssetPath,
      authError,
      storeError,
      clearAuthError,
      showPassword,
      togglePassword,
    };
  },
});
</script>

<style scoped>

.form-control {
  background-color: var(--bs-gray-300);
  border-color: var(--bs-gray-300);
  color: var(--bs-gray-900);
  transition: color 0.2s ease, border-color 0.2s ease;
}

.form-control:focus {
  background-color: var(--bs-white);
  border-color: #0e91a5;
  box-shadow: 0 0 0 0.2rem rgba(14, 145, 165, 0.25);
}

.form-control.is-invalid {
  border-color: var(--bs-danger);
  background-color: var(--bs-light-danger);
}

.alert {
  border-radius: 0.475rem;
  border: 1px solid transparent;
}

.btn-icon {
  width: 35px;
  height: 35px;
  border-radius: 0.425rem;
  background-color: transparent;
  border: none;
  color: var(--bs-gray-500);
  transition: all 0.15s ease;
}

.btn-icon:hover {
  color: var(--bs-gray-700);
  background-color: var(--bs-gray-200);
}

.position-relative .btn-icon {
  z-index: 5;
}

/* Loading state improvements */
.btn[data-kt-indicator="on"] {
  pointer-events: none;
  opacity: 0.65;
}

.btn[data-kt-indicator="on"] .indicator-label {
  display: none;
}

.btn[data-kt-indicator="on"] .indicator-progress {
  display: inline-block;
}

.indicator-progress {
  display: none;
}

/* Error message styling */
.fv-help-block {
  font-size: 0.875rem;
  color: var(--bs-danger);
  margin-top: 0.25rem;
  line-height: 1.4;
}

/* Tooltip and help text styling */
.form-text {
  font-size: 0.8rem;
  line-height: 1.3;
}

/* Enhanced button styles */
.btn[data-kt-indicator="on"] .indicator-label {
  opacity: 0;
  transform: translateY(-5px);
  transition: all 0.2s ease;
}

.btn[data-kt-indicator="on"] .indicator-progress {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.2s ease;
}

/* Keyboard shortcut styling */
kbd {
  background-color: var(--bs-gray-200);
  color: var(--bs-gray-800);
  border: 1px solid var(--bs-gray-300);
  border-radius: 3px;
  padding: 2px 6px;
  font-size: 0.75rem;
  font-family: 'Courier New', monospace;
  box-shadow: 0 1px 1px rgba(0,0,0,0.2);
}

/* Info box styling */
.bg-light-info {
  background-color: rgba(14, 145, 165, 0.1) !important;
  border: 1px solid rgba(14, 145, 165, 0.2);
}

/* Tooltip icon styling */
.ki-information-5 {
  cursor: help;
  transition: color 0.2s ease;
}

.ki-information-5:hover {
  color: var(--bs-primary) !important;
}

/* Alert animation */
.alert {
  animation: slideInDown 0.3s ease-out;
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Enhanced focus states */
.form-control:focus {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(14, 145, 165, 0.15), 0 0 0 0.2rem rgba(14, 145, 165, 0.25);
}

/* Password field specific styling */
.position-relative .form-control {
  padding-right: 3rem;
}

/* Loading spinner enhancement */
.spinner-border-sm {
  width: 1rem;
  height: 1rem;
}

</style>
