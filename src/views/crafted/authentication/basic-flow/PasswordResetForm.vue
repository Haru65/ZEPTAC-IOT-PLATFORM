<template>
  <!--begin::Wrapper-->
  <div class="h-100 d-flex justify-content-center align-items-center">
    <div class="w-lg-500px p-10">
      <!--begin::Form-->
      <VForm
        class="form w-100"
        id="kt_login_signin_form"
        @submit="onSubmitLogin"
        :validation-schema="login"
        :initial-values="{
          email: resetFormDetails.email,
        }"
      >
        <!--begin::Heading-->
        <div class="text-center mb-10">
          <!--begin::Title-->
          <h1 class="text-white mb-3" style="font-size: 2.3rem">
            Reset Password
          </h1>
          <!--end::Title-->
        </div>
        <!--end::Heading-->

        <!--begin::Input group-->
        <div class="fv-row mb-10">
          <!--begin::Label-->
          <label class="form-label fs-6 fw-bold text-dark">Email</label>
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-lg form-control-solid"
            type="text"
            name="email"
            v-model="resetFormDetails.email"
            disabled
            placeholder="Enter your Email"
            autocomplete="off"
          />
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="email" />
            </div>
          </div>
        </div>

        <div class="fv-row mb-10">
          <!--begin::Label-->
          <label class="form-label fs-6 fw-bold text-dark">Password</label>
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-lg form-control-solid"
            type="password"
            name="password"
            v-model="resetFormDetails.password"
            placeholder="Enter your password"
            autocomplete="off"
          />
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="password" />
            </div>
          </div>
        </div>

        <div class="fv-row mb-10">
          <!--begin::Label-->
          <label class="form-label fs-6 fw-bold text-dark"
            >Confirm Password</label
          >
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-lg form-control-solid"
            type="password"
            name="password_confirmation"
            v-model="resetFormDetails.password_confirmation"
            placeholder="Retype your password"
            autocomplete="off"
          />
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="password_confirmation" />
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
            class="btn btn-lg btn-primary w-100 mb-5"
          >
            <span class="indicator-label"> Continue </span>

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
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref, onMounted } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { useAuthStore, type User } from "@/stores/auth";

import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";
import { useBodyStore } from "@/stores/body";
import { useRouter, useRoute } from "vue-router";
import LayoutService from "@/core/services/LayoutService";
import { resetPassword } from "@/stores/api";

export default defineComponent({
  name: "password-rest-form",
  components: {
    Field,
    VForm,
    ErrorMessage,
  },
  setup() {
    const store = useAuthStore();
    const bodyStore = useBodyStore();

    const router = useRouter();
    const route = useRoute();
    const token = route.params.token;
    const emailId = route.params.email;

    const bgImage = getAssetPath("media/patterns/layered-waves-haikei.svg");

    //Create form validation object
    const login = Yup.object().shape({
      email: Yup.string().email().required().label("Email"),
      password: Yup.string().min(8).required().label("Password"),
      password_confirmation: Yup.string()
        .min(8)
        .required()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .label("Password Confirmation"),
    });

    const resetFormDetails = ref({
      email: "",
      password: "",
      password_confirmation: "",
      token: "",
    });

    onMounted(() => {
      LayoutService.emptyElementClassesAndAttributes(document.body);

      bodyStore.addBodyClassname("bg-body");
      bodyStore.addBodyAttribute({
        qualifiedName: "style",
        value: `background-image: url("${bgImage}");background-repeat:no-repeat;background-size:cover`,
      });

      resetFormDetails.value.email = emailId.toString();
      resetFormDetails.value.token = token.toString();
    });

    const submitButton = ref<HTMLButtonElement | null>(null);

    //Form submit function
    const onSubmitLogin = async (values: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      values = values as User;
      // Clear existing errors
      console.warn("Clicked");

      if (submitButton.value) {
        // eslint-disable-next-line
        submitButton.value!.disabled = true;
        // Activate indicator
        submitButton.value.setAttribute("data-kt-indicator", "on");
      }

      try {
        // Send login request
        const response = await resetPassword(resetFormDetails.value);

        if (response?.success) {
          Swal.fire({
            text: response.message || `Password reset successfully.`,
            icon: "success",
            confirmButtonText: "Ok",
            buttonsStyling: false,
            heightAuto: false,
            customClass: {
              confirmButton: "btn btn-light-primary",
            },
          }).then(() => {
            submitButton.value?.removeAttribute("data-kt-indicator");
            // eslint-disable-next-line
            submitButton.value!.disabled = false;
            router.push({ name: "login" });

            return { success: true };
          });
        } else {
          throw new Error(response?.message || `Failed to reset password.`);
        }
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "An unknown error occurred";

        // Handle errors
        Swal.fire({
          text: errorMessage,
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Try again!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semobold btn-light-danger",
          },
        });

        submitButton.value?.removeAttribute("data-kt-indicator");
        // eslint-disable-next-line
        submitButton.value!.disabled = false;

        return { success: false, message: errorMessage };
      }
    };

    return {
      onSubmitLogin,
      resetFormDetails,
      login,
      submitButton,
      getAssetPath,
    };
  },
});
</script>
