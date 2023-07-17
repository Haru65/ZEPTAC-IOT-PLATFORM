<template>
  <!--begin::Basic info-->
  <div class="card mb-5 mb-xl-10 p-6 pb-12">
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
      <form
        id="kt_account_profile_details_form"
        class="form"
        novalidate
        :validation-schema="profileDetailsValidator"
        enctype="multipart/form-data"
      >
        <!--begin::Card body-->
        <div class="card-body border-top p-9">
          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6"
              >Avatar</label
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
                  :src="profileDetails.disp_avatar"
                  class="image-input-wrapper w-125px h-125px"
                  alt="profile"
                />
                <!--end::Preview existing avatar-->

                <!--begin::Label-->
                <label
                  class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                  data-kt-image-input-action="change"
                  data-bs-toggle="tooltip"
                  title="Change avatar"
                >
                  <i class="bi bi-pencil-fill fs-7"></i>

                  <!--begin::Inputs-->
                  <input
                    type="file"
                    name="avatar"
                    accept=".png, .jpg, .jpeg"
                    @change="updateImage($event)"
                  />
                  <input type="hidden" name="avatar_update" />
                  <!--end::Inputs-->
                </label>
                <!--end::Label-->

                <!--begin::Remove-->
                <span
                  class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                  data-kt-image-input-action="remove"
                  data-bs-toggle="tooltip"
                  @click="removeImage()"
                  title="Remove avatar"
                >
                  <i class="bi bi-x fs-2"></i>
                </span>
                <!--end::Remove-->
              </div>
              <!--end::Image input-->

              <!--begin::Hint-->
              <div class="form-text">Allowed file types: png, jpg, jpeg.</div>
              <!--end::Hint-->
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-semobold fs-6"
              >Full Name</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8">
              <!--begin::Row-->
              <div class="row">
                <!--begin::Col-->
                <div class="col-lg-6 fv-row">
                  <Field
                    type="text"
                    name="fname"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    placeholder="First name"
                    v-model="profileDetails.first_name"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="fname" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->

                <!--begin::Col-->
                <div class="col-lg-6 fv-row">
                  <Field
                    type="text"
                    name="lname"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Last name"
                    v-model="profileDetails.last_name"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="lname" />
                    </div>
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
            <label class="col-lg-4 col-form-label required fw-semobold fs-6"
              >Email</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="text"
                name="email"
                class="form-control form-control-lg form-control-solid"
                placeholder="Email"
                v-model="profileDetails.email"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="email" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6">
              <span class="required">Contact Phone</span>

              <i
                class="fas fa-exclamation-circle ms-1 fs-7"
                data-bs-toggle="tooltip"
                title="Phone number must be active"
              ></i>
            </label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="tel"
                name="phone"
                class="form-control form-control-lg form-control-solid"
                placeholder="Phone number"
                v-model="profileDetails.phone"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="phone" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <!--end::Input group-->

          <!--begin::Input group-->

          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6">
              <span class="required">Password</span>

              <i
                class="fas fa-exclamation-circle ms-1 fs-7"
                data-bs-toggle="tooltip"
                title="Phone number must be active"
              ></i>
            </label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="password"
                name="password"
                class="form-control form-control-lg form-control-solid"
                placeholder="Password"
                v-model="profileDetails.password"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="password" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>

          <!--begin::Input group-->
          <!--begin::Input group-->

          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6">
              <span class="required">Confirm Password</span>

              <i
                class="fas fa-exclamation-circle ms-1 fs-7"
                data-bs-toggle="tooltip"
                title="Phone number must be active"
              ></i>
            </label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="password"
                name="password"
                class="form-control form-control-lg form-control-solid"
                placeholder="Password"
                v-model="profileDetails.confpassword"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="password" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-semobold fs-6"
              >Role</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <el-select v-model="profileDetails.roles" filterable>
                <el-option value="0" label="Please Select Role..." key="0"
                  >Please Select Role...</el-option
                >
                <el-option
                  v-for="item in rolesArray"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="role" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-semobold fs-6"
              >Company</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <el-select v-model="profileDetails.company_id" filterable>
                <el-option value="0" label="Please Select Company..." key="0"
                  >Please Select Company...</el-option
                >
                <el-option
                  v-for="item in Companies"
                  :key="item.id"
                  :label="item.company_name"
                  :value="item.id"
                />
              </el-select>
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="company" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->
          <!--begin::Col-->
        </div>
        <div class="modal-footer flex-center">
          <!--begin::Button-->
          <button type="reset" class="btn btn-lg btn-danger w-25">Clear</button>
          <!--end::Button-->
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <!--begin::Button-->
          <span
            @click="onsubmit()"
            :data-kt-indicator="loading ? 'on' : null"
            class="btn btn-lg btn-primary w-25"
            type="submit"
          >
            <span v-if="!loading" class="indicator-label"> Submit </span>
            <span v-if="loading" class="indicator-progress">
              Please wait...
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span>
            </span>
          </span>
          <!--end::Button-->
        </div>
        <!--end::Input group-->
      </form>
      <!--end::Form-->
    </div>
    <!--end::Content-->
  </div>
  <!--end::Basic info-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import { ErrorMessage, Field } from "vee-validate";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";
import { rolesArray } from "@/core/config/PermissionsRolesConfig";
import { addUser, getCompanies } from "@/stores/api";
import ApiService from "@/core/services/ApiService";
import moment from "moment";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { CUSTOM_FORM } from "@/core/config/FormCustomConfig";

interface ProfileDetails {
  disp_avatar: string;
  image: any;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  confpassword: string;
  roles: string;
  company_id: string;
  created_by: string;
  updated_by: string;
}

export default defineComponent({
  name: "account-settings",
  components: {
    ErrorMessage,
    Field,
  },
  setup() {
    const auth = useAuthStore();
    const submitButton1 = ref<HTMLElement | null>(null);
    const submitButton2 = ref<HTMLElement | null>(null);
    const submitButton3 = ref<HTMLElement | null>(null);
    const submitButton4 = ref<HTMLElement | null>(null);
    const submitButton5 = ref<HTMLElement | null>(null);
    const updateEmailButton = ref<HTMLElement | null>(null);
    const updatePasswordButton = ref<HTMLElement | null>(null);

    let limit = ref(500);
    const router = useRouter();
    const loading = ref(false);
    const Companies = ref([{ id: "", company_name: "" }]);

    const getdropcomp = async () => {
      ApiService.setHeader();
      const response = await getCompanies(`limit=${limit.value}`);
      Companies.value.push(
        ...response.result.data.data.map(({ created_at, ...rest }) => ({
          ...rest,
          created_at: moment(created_at).format("MMMM Do YYYY"),
        }))
      );
      console.log(Companies);
    };

    onMounted(async () => {
      Companies.value.pop();
      await getdropcomp();
    });

    const emailFormDisplay = ref(false);
    const passwordFormDisplay = ref(false);

    const profileDetailsValidator = Yup.object().shape({
      fname: Yup.string().required().label("First name"),
      lname: Yup.string().required().label("Last name"),
      email: Yup.string().required().email().label("Email"),
      phone: Yup.string().required().label("Phone"),
      password: Yup.string().required().label("Password"),
    });

    const profileDetails = ref<ProfileDetails>({
      disp_avatar: getAssetPath("media/avatars/blank.png"),
      image: getAssetPath("media/avatars/blank.png"),
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      password: "",
      confpassword: "",
      roles: "0",
      company_id: "0",
      created_by: auth.getUserId(),
      updated_by: auth.getUserId(),
    });

    const onsubmit = async () => {
      loading.value = true;
      console.log(profileDetails.value);
      console.warn("Nice");
      try {
        // form multipart form post
        // Call your API here with the form values
        // CUSTOMS
        const form = CUSTOM_FORM(profileDetails);
        // push form
        const response = await addUser(form);
        console.log(response.error);
        if (!response.error) {
          // Handle successful API response
          console.log("API response:", response);
          showSuccessAlert("Success", "User have been successfully inserted!");
        } else {
          // Handle API error response
          const errorData = response.error;
          console.log("API error:", errorData);
          // console.log("API error:", errorData.response.data.errors);
          showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
        }
      } catch (error) {
        // Handle any other errors during API call
        console.error("API call error:", error);
        showErrorAlert("Error", "An error occurred during the API call.");
      } finally {
        loading.value = false;
        router.push({ name: "users-list" });
      }
    };

    const showSuccessAlert = (title, message) => {
      Swal.fire({
        title,
        text: message,
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: "Ok, got it!",
        heightAuto: false,
        customClass: {
          confirmButton: "btn btn-primary",
        },
      });
    };

    const showErrorAlert = (title, message) => {
      Swal.fire({
        title,
        text: message,
        icon: "error",
        buttonsStyling: false,
        confirmButtonText: "Ok, got it!",
        heightAuto: false,
        customClass: {
          confirmButton: "btn btn-primary",
        },
      });
    };

    // remove file or update
    const removeImage = () => {
      profileDetails.value.disp_avatar = getAssetPath(
        "media/avatars/blank.png"
      );
    };

    const updateImage = (e: any) => {
      profileDetails.value.disp_avatar = URL.createObjectURL(e.target.files[0]);
      profileDetails.value.image = e.target.files[0];
    };

    const clear = () => {
      profileDetails.value = {
        disp_avatar: getAssetPath("media/avatars/blank.png"),
        image: getAssetPath("media/avatars/blank.png"),
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
        confpassword: "",
        roles: "0",
        company_id: "0",
        created_by: auth.getUserId(),
        updated_by: auth.getUserId(),
      };
    };

    return {
      submitButton1,
      submitButton2,
      submitButton3,
      submitButton4,
      submitButton5,
      profileDetails,
      emailFormDisplay,
      passwordFormDisplay,
      removeImage,
      updateImage,
      profileDetailsValidator,
      updateEmailButton,
      updatePasswordButton,
      getAssetPath,
      Companies,
      rolesArray,
      onsubmit,
      loading,
      clear,
    };
  },
});
</script>
<style>
.el-input__inner {
  font-weight: 500;
}
.el-input__wrapper {
  color: red !important;
  height: 3.5rem;
  border-radius: 0.5rem;
  background-color: var(--bs-gray-100);
  border-color: var(--bs-gray-100);
  color: var(--bs-gray-700);
  transition: color 0.2s ease;
  appearance: none;
  line-height: 1.5;
  border: none !important;
  padding-top: 0.825rem;
  padding-bottom: 0.825rem;
  padding-left: 1.5rem;
  font-size: 1.15rem;
  border-radius: 0.625rem;
  box-shadow: none !important;
}
</style>
