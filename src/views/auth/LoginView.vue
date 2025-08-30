<template>
  <div class="min-vh-100 d-flex flex-column root-no-scroll">
    <!-- Top Blue Banner -->
    <div class="bg-primary text-white text-center py-3 banner-compact">
      <h1 class="fw-bold display-5 m-0">ZEPTAC IOT</h1>
      <p class="lead mb-0">Smarter monitoring. Better control. Seamless experience.</p>
    </div>

    <!-- Main Content -->
    <!-- NOTE: login-full-height ensures the central area fits the remaining viewport and won't create vertical scroll -->
    <div class="flex-grow-1 d-flex align-items-center justify-content-center bg-light login-full-height">
      <div class="w-100 px-3 px-md-5">
        <!-- Increased width to make login bigger, .login-card keeps content vertically arranged -->
        <div class="mx-auto login-card" style="max-width: 600px;">
          <!-- Header -->
          <div class="mb-4 text-center">
            <h2 class="fw-bold display-6">Welcome Back</h2>
            <p class="text-muted fs-6">Sign in to access your ZEPTAC IOT dashboard</p>
          </div>

          <!-- Login Form -->
          <VForm class="form" @submit="onSubmit" :validation-schema="schema">
            <!-- Email -->
            <div class="form-group mb-3">
              <label class="form-label fw-semibold">Email</label>
              <Field
                type="email"
                v-model="email"
                name="email"
                class="form-control form-control-lg rounded-3"
                placeholder="Enter your email"
              />
              <ErrorMessage name="email" class="text-danger small" />
            </div>

            <!-- Password -->
            <div class="form-group mb-3">
              <label class="form-label fw-semibold">Password</label>
              <Field
                type="password"
                v-model="password"
                name="password"
                class="form-control form-control-lg rounded-3"
                placeholder="Enter your password"
              />
              <ErrorMessage name="password" class="text-danger small" />
            </div>

            <!-- Options -->
            <div class="d-flex justify-content-between align-items-center mb-3">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="remember" />
                <label class="form-check-label small" for="remember">Remember me</label>
              </div>
              <router-link to="/forgot-password" class="text-primary fw-semibold small">
                Forgot Password?
              </router-link>
            </div>

            <!-- Submit -->
            <button
              type="submit"
              class="btn btn-primary w-100 py-3 rounded-3 fw-semibold fs-5"
              :disabled="loading"
            >
              <span v-if="!loading">Sign In</span>
              <span v-else>
                <span class="spinner-border spinner-border-sm me-2"></span>
                Signing in...
              </span>
            </button>

            <!-- Footer -->
            <div class="text-center mt-3">
              <span class="text-muted small">Don’t have an account?</span>
              <router-link to="/register" class="text-primary fw-semibold ms-1">
                Create one
              </router-link>
            </div>
          </VForm>

          <!-- Contact Us Section
               NOTE: margin-top is handled by .contact-spot with margin-top:auto so it sits at bottom of the card
          -->
          <div class="text-center contact-spot">
            <hr class="my-2" />
            <p class="mb-1 fw-semibold">Need help?</p>
            <router-link to="/contact" class="text-primary fw-semibold">
              Contact Us
            </router-link>
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
          text: "Sorry, login failed. Please check your credentials.",
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

<style scoped>
/* Keep the root exactly filling viewport and prevent the page from forcing global scroll
   (this only affects this component container; it does not change your script/logic) */
.root-no-scroll {
  height: 100vh;
  overflow: hidden;
}

/* Banner compact to free more vertical space */
.banner-compact {
  padding-top: 0.9rem;
  padding-bottom: 0.9rem;
}

/* The central area takes the remaining height and is vertically aligned */
.login-full-height {
  /* subtract banner height approximate to ensure no vertical overflow */
  min-height: calc(100vh - 64px);
  /* allow internal scrolling only if absolutely necessary on tiny screens */
  overflow: auto;
}

/* The card groups header, form and contact; contact pushed to the bottom using margin-top:auto */
.login-card {
  display: flex;
  flex-direction: column;
  min-height: 360px; /* keeps a reasonable card height on very small screens */
  height: 100%;
}

/* push contact area to bottom of the card, keep it visible */
.contact-spot {
  margin-top: auto;
  padding-top: 8px;
  padding-bottom: 6px;
}

/* Slightly tighter spacing for form groups to reduce height */
.form-group {
  margin-bottom: 0.75rem;
}

/* Make sure hr is compact */
hr {
  margin: 0.5rem 0;
  opacity: 0.08;
}

/* Small responsive tweak: slightly reduce max-width on small screens */
@media (max-width: 420px) {
  .login-card {
    max-width: 92vw !important;
    min-height: 420px;
  }
  .banner-compact h1 {
    font-size: 1.25rem;
  }
}
</style>
