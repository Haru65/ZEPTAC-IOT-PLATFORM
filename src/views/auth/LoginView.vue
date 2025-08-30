<template>
  <div class="min-vh-100 d-flex align-items-center bg-light">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card shadow-lg border-0 rounded-lg">
            <div class="card-body p-4 p-md-5">
              <div class="text-center mb-4">
                <h3 class="fw-bold">Sign In to ZEPTAC IOT</h3>
                <p class="text-muted">Enter your credentials to continue</p>
              </div>

              <VForm class="form" @submit="onSubmit" :validation-schema="schema">
                <!-- Email Input -->
                <div class="form-group mb-3">
                  <label class="form-label">Email</label>
                  <Field
                    type="text"
                    v-model="email"
                    name="email"
                    class="form-control"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage name="email" class="text-danger small" />
                </div>

                <!-- Password Input -->
                <div class="form-group mb-3">
                  <label class="form-label">Password</label>
                  <Field
                    type="password"
                    v-model="password"
                    name="password"
                    class="form-control"
                    placeholder="Enter your password"
                  />
                  <ErrorMessage name="password" class="text-danger small" />
                </div>

                <div class="d-flex justify-content-between align-items-center mb-4">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="remember" />
                    <label class="form-check-label" for="remember">Remember me</label>
                  </div>
                  <router-link to="/forgot-password" class="text-primary small">
                    Forgot Password?
                  </router-link>
                </div>

                <!-- Submit Button -->
                <button
                  type="submit"
                  class="btn btn-primary w-100 mb-3"
                  :disabled="loading"
                >
                  <span v-if="!loading">Sign In</span>
                  <span v-else>
                    <span class="spinner-border spinner-border-sm me-2"></span>
                    Signing in...
                  </span>
                </button>

                <div class="text-center">
                  <span class="text-muted">Don't have an account? </span>
                  <router-link to="/register" class="text-primary">
                    Create Account
                  </router-link>
                </div>
              </VForm>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import Swal from "sweetalert2";

export default defineComponent({
  name: "login-view",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  setup() {
    const router = useRouter();
    const auth = useAuthStore();
    const loading = ref(false);
    const email = ref("");
    const password = ref("");

    const schema = Yup.object().shape({
      email: Yup.string()
        .required("Email is required")
        .email("Please enter a valid email"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
    });

    const onSubmit = async () => {
      loading.value = true;
      try {
        await auth.login({
          email: email.value,
          password: password.value,
        });
        router.push({ name: "dashboard" });
      } catch (error) {
        Swal.fire({
          text: "Sorry, looks like there are some errors detected, please try again.",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
      } finally {
        loading.value = false;
      }
    };

    return {
      email,
      password,
      loading,
      schema,
      onSubmit,
    };
  },
});
</script>
