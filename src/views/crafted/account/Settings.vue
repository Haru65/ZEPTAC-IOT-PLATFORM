<template>
  <!--begin::Basic info-->
  <div class="card mb-5 mb-xl-10">
    <!--begin::Card header-->
    <div
      class="card-header border-0 cursor-pointer"
      role="button"
      data-bs-toggle="collapse"
      data-bs-target="#kt_account_profile_details"
      aria-expanded="true"
      aria-controls="kt_account_profile_details"
    >
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bold m-0">Profile Details</h3>
      </div>
      <!--end::Card title-->
    </div>
    <!--begin::Card header-->

    <!--begin::Content-->
    <div id="kt_account_profile_details" class="collapse show">
      <!--begin::Form-->
      <VForm id="kt_account_profile_details_form" class="form" novalidate>
        <!--begin::Card body-->
        <div class="card-body border-top p-9">
          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6"
              >Profile Image</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8">
              <!--begin::Image input-->
              <div
                class="image-input image-input-outline"
                data-kt-image-input="true"
                :style="{
                  backgroundImage: `url(${getAssetPath(
                    'media/avatars/blank.png'
                  )})`,
                }"
              >
                <!--begin::Preview existing avatar-->
                <img
                  v-if="User.meta.profile_pic_data"
                  :src="`data:image/png;base64,` + User.meta.profile_pic_data"
                  class="image-input-wrapper rounded-circle"
                  alt="profile"
                />
                <img
                  v-else
                  :src="`https://api.zeptac.com/storage/user/default.jpg`"
                  class="image-input-wrapper rounded-circle"
                  alt="profile"
                />
                <!--end::Preview existing avatar-->
              </div>
              <!--end::Image input-->
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6"
              >Full Name</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8">
              <!--begin::Row-->
              <div class="row">
                <!--begin::Col-->
                <div class="col-lg-6 fv-row">
                  <div
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                  >
                    {{ profileDetails.first_name }}
                  </div>
                </div>
                <!--end::Col-->

                <!--begin::Col-->
                <div class="col-lg-6 fv-row">
                  <div class="form-control form-control-lg form-control-solid">
                    {{ profileDetails.last_name }}
                  </div>
                </div>
                <!--end::Col-->
              </div>
              <!--end::Row-->
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6"
              >Email</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <div class="form-control form-control-lg form-control-solid">
                {{ profileDetails.email }}
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6">
              <span>Contact Phone</span>
            </label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <div class="form-control form-control-lg form-control-solid">
                {{ profileDetails.phone }}
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->
        </div>
        <!--end::Card body-->
      </VForm>
      <!--end::Form-->
    </div>
    <!--end::Content-->
  </div>
  <!--end::Basic info-->

  <!--begin::Sign-in Method-->
  <div class="card mb-5 mb-xl-10">
    <!--begin::Card header-->
    <div
      class="card-header border-0 cursor-pointer"
      role="button"
      data-bs-toggle="collapse"
      data-bs-target="#kt_account_signin_method"
    >
      <div class="card-title m-0">
        <h3 class="fw-bolder m-0">Security</h3>
      </div>
    </div>
    <!--end::Card header-->

    <!--begin::Content-->
    <div id="kt_account_signin_method" class="collapse show">
      <!--begin::Card body-->
      <div class="card-body border-top p-9">
        <!--begin::Email Address-->
        <div class="d-flex flex-wrap align-items-center mb-8">
          <div id="kt_signin_email" :class="{ 'd-none': emailFormDisplay }">
            <div class="fs-4 fw-bolder mb-1">Email Address</div>
            <div class="fs-6 fw-semobold text-gray-600">
              {{ User.email }}
            </div>
          </div>
        </div>
        <!--end::Email Address-->

        <!--begin::Password-->
        <div class="d-flex flex-wrap align-items-center mb-8">
          <div
            id="kt_signin_password"
            :class="{ 'd-none': passwordFormDisplay }"
          >
            <div class="fs-4 fw-bolder mb-1">Password</div>
            <div class="fs-6 fw-semobold text-gray-600">************</div>
          </div>
          <div
            id="kt_signin_password_edit"
            class="flex-row-fluid"
            :class="{ 'd-none': !passwordFormDisplay }"
          >
            <div class="fs-6 fw-semobold text-gray-600 mb-4">
              Password must be at least 8 character and contain symbols
            </div>

            <!--begin::Form-->
            <VForm
              id="kt_signin_change_password"
              class="form"
              novalidate
              @submit="updatePassword()"
              :validation-schema="changePassword"
            >
              <div class="row mb-6">
                <div class="col-lg-4">
                  <div class="fv-row mb-0">
                    <label
                      for="old_password"
                      class="form-label fs-6 fw-bold mb-3"
                      >Current Password</label
                    >
                    <Field
                      type="password"
                      class="form-control form-control-lg form-control-solid fw-semobold fs-6"
                      name="old_password"
                      v-model="passwordDetails.old_password"
                      id="old_password"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="old_password" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="fv-row mb-0">
                    <label for="password" class="form-label fs-6 fw-bold mb-3"
                      >New Password</label
                    >
                    <Field
                      type="password"
                      class="form-control form-control-lg form-control-solid fw-semobold fs-6"
                      name="password"
                      v-model="passwordDetails.password"
                      id="password"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="password" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="fv-row mb-0">
                    <label
                      for="password_confirmation"
                      class="form-label fs-6 fw-bold mb-3"
                      >Confirm New Password</label
                    >
                    <Field
                      type="password"
                      class="form-control form-control-lg form-control-solid fw-semobold fs-6"
                      name="password_confirmation"
                      v-model="passwordDetails.password_confirmation"
                      id="password_confirmation"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="password_confirmation" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex">
                <button
                  id="kt_password_submit"
                  type="submit"
                  ref="updatePasswordButton"
                  class="btn btn-primary me-2 px-6"
                >
                  <span class="indicator-label"> Update Password </span>
                  <span class="indicator-progress">
                    Please wait...
                    <span
                      class="spinner-border spinner-border-sm align-middle ms-2"
                    ></span>
                  </span>
                </button>
                <button
                  id="kt_password_cancel"
                  type="button"
                  @click="passwordFormDisplay = !passwordFormDisplay"
                  class="btn btn-color-gray-400 btn-active-light-primary px-6"
                >
                  Cancel
                </button>
              </div>
            </VForm>
            <!--end::Form-->
          </div>
          <div
            id="kt_signin_password_button"
            class="ms-auto"
            :class="{ 'd-none': passwordFormDisplay }"
          >
            <button
              @click="passwordFormDisplay = !passwordFormDisplay"
              class="btn btn-light fw-bolder"
            >
              Reset Password
            </button>
          </div>
        </div>
        <!--end::Password-->
      </div>
      <!--end::Card body-->
    </div>
    <!--end::Content-->
  </div>
  <!--end::Sign-in Method-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";
import { useAuthStore } from "@/stores/auth";
import { changeUserPassword } from "@/stores/api";

import ApiService from "@/core/services/ApiService";

interface ProfileDetails {
  disp_avatar: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

interface PasswordDetails {
  old_password: string;
  password: string;
  password_confirmation: string;
}

export default defineComponent({
  name: "account-settings",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  setup() {
    const store = useAuthStore();
    const User = store.GetUser();

    const updatePasswordButton = ref<HTMLElement | null>(null);

    const emailFormDisplay = ref(false);
    const passwordFormDisplay = ref(false);

    const changeEmail = Yup.object().shape({
      emailaddress: Yup.string().required().email().label("Email"),
      confirmemailpassword: Yup.string().required().label("Password"),
    });

    const changePassword = Yup.object().shape({
      old_password: Yup.string().required().label("Current password"),
      password: Yup.string().min(8).required().label("Password"),
      password_confirmation: Yup.string()
        .min(8)
        .required()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .label("Password Confirmation"),
    });

    const profileDetails = ref<ProfileDetails>({
      disp_avatar: User
        ? User.profile_pic
        : getAssetPath("media/avatars/blank.png"),
      first_name: User ? User.first_name : "",
      last_name: User ? User.last_name : "",
      email: User ? User.email : "",
      phone: User ? User.mobile : "",
    });

    const passwordDetails = ref<PasswordDetails>({
      old_password: "",
      password: "",
      password_confirmation: "",
    });

    const updatePassword = async () => {
      try {
        if (updatePasswordButton.value) {
          // Activate indicator
          updatePasswordButton.value.setAttribute("data-kt-indicator", "on");

          ApiService.setHeader();

          console.log(passwordDetails.value);

          const response = await changeUserPassword(passwordDetails.value);
          console.log(response);

          if (!response.error) {
            setTimeout(() => {
              updatePasswordButton.value?.removeAttribute("data-kt-indicator");

              Swal.fire({
                text: "Password changesd successfully",
                icon: "success",
                confirmButtonText: "Ok",
                buttonsStyling: false,
                heightAuto: false,
                customClass: {
                  confirmButton: "btn btn-light-primary",
                },
              }).then(() => {
                passwordFormDisplay.value = false;
              });
            }, 2000);
          } else {
            setTimeout(() => {
              updatePasswordButton.value?.removeAttribute("data-kt-indicator");

              Swal.fire({
                text: "Please enter correct password",
                icon: "error",
                confirmButtonText: "Ok",
                buttonsStyling: false,
                heightAuto: false,
                customClass: {
                  confirmButton: "btn btn-light-danger",
                },
              }).then(() => {
                passwordFormDisplay.value = false;
              });
            }, 2000);
          }
        }
      } catch (error) {
        Swal.fire({
          text: "Something went wrong during API call",
          icon: "error",
          confirmButtonText: "Ok",
          buttonsStyling: false,
          heightAuto: false,
          customClass: {
            confirmButton: "btn btn-light-primary",
          },
        });

        passwordFormDisplay.value = false;
      }
    };

    return {
      profileDetails,
      passwordDetails,
      emailFormDisplay,
      passwordFormDisplay,
      changeEmail,
      changePassword,
      updatePasswordButton,
      updatePassword,
      getAssetPath,
      User,
    };
  },
});
</script>
