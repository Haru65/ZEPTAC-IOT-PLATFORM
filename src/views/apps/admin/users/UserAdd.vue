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
      <Vform
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
                  class="image-input-wrapper"
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
                  <input max-size="1000" type="hidden" name="avatar_update" />
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
              <div class="form-text">
                Allowed file types: png, jpg, jpeg. <br />
                Note : Max Upload limit 1 MB.
                <br />
                <span class="text-danger" v-if="file_size"
                  >File Size Exceeded</span
                >
              </div>
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
                name="confpassword"
                class="form-control form-control-lg form-control-solid"
                placeholder="Confirm Password"
                v-model="profileDetails.confpassword"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="confpassword" />
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
              <el-select v-model="profileDetails.role_id" filterable>
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
          <div class="row mb-6" v-if="identifier == 'Admin'">
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
          <!-- extra fields -->
          <!--end::Input group-->
          <div class="separator my-10"></div>

          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6">
              <span class="required">Address 1</span>

              <i
                class="fas fa-exclamation-circle ms-1 fs-7"
                data-bs-toggle="tooltip"
                title="Address Required"
              ></i>
            </label>
            <!--begin::Col-->
            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="textarea"
                name="address1"
                as="textarea"
                class="form-control form-control-lg form-control-solid"
                placeholder="Address"
                v-model="profileDetails.address1"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="address1" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>

          <!-- address 2 -->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6">
              <span class="required">Address 2</span>

              <i
                class="fas fa-exclamation-circle ms-1 fs-7"
                data-bs-toggle="tooltip"
                title="Address Required"
              ></i>
            </label>
            <!--begin::Col-->
            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="textarea"
                name="address2"
                as="textarea"
                class="form-control form-control-lg form-control-solid"
                placeholder="Address"
                v-model="profileDetails.address2"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="address2" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-semobold fs-6"
              >Country</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8">
              <!--begin::Row-->
              <div class="row">
                <!--begin::Col-->
                <div class="col-lg fv-row">
                  <el-select v-model="profileDetails.country" filterable>
                    <el-option value="0" label="Please Select Role..." key="0"
                      >Please Select Role...</el-option
                    >
                    <el-option
                      v-for="item in countries"
                      :key="item.name"
                      :label="item.name"
                      :value="item.name"
                    />
                  </el-select>
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
              >State</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8">
              <!--begin::Row-->
              <div class="row">
                <!--begin::Col-->
                <!--begin::Col-->
                <div v-if="state.length" class="col-lg fv-row">
                  <div>
                    <el-select v-model="profileDetails.states" filterable>
                      <el-option
                        value="0"
                        label="Please Select Package..."
                        key="0"
                        >Please Select Role...</el-option
                      >
                      <el-option
                        v-for="item in state"
                        :key="item"
                        :label="item"
                        :value="item"
                      />
                    </el-select>
                  </div>
                </div>

                <div v-if="!state.length" class="col-lg fv-row">
                  <div>
                    <Field
                      type="text"
                      name="state"
                      class="form-control form-control-lg form-control-solid"
                      placeholder="Please Type State."
                      v-model="profileDetails.states"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="state" />
                      </div>
                    </div>
                  </div>
                </div>
                <!--end::Col-->
                <!--end::Col-->
              </div>
              <!--end::Row-->
            </div>
            <!--end::Col-->
          </div>
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-semobold fs-6"
              >Pincode</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg">
              <!--begin::Row-->
              <div class="row">
                <!--begin::Col-->
                <div class="col-lg fv-row">
                  <Field
                    type="text"
                    name="pincode"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Please Type Pincode."
                    v-model="profileDetails.pincode"
                  />
                </div>
                <!--end::Col-->
              </div>
              <!--end::Row-->
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-semobold fs-6"
              >DOB</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg">
              <!--begin::Row-->
              <div class="row">
                <!--begin::Col-->
                <div class="col-lg fv-row">
                  <el-date-picker
                    v-model="profileDetails.dob"
                    type="date"
                    placeholder="DOB"
                  />
                </div>
                <!--end::Col-->
              </div>
              <!--end::Row-->
            </div>
            <!--end::Col-->
          </div>
          <!--  -->
          <!--end::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-semobold fs-6"
              >Gender</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg">
              <!--begin::Row-->
              <div class="row">
                <div class="col-lg fv-row">
                  <div>
                    <el-select v-model="profileDetails.gender" filterable>
                      <el-option
                        value="0"
                        label="Please Select Gender..."
                        key="0"
                        >Please Select Gender...</el-option
                      >
                      <el-option label="Male" value="male" />
                      <el-option label="Female" value="female" />
                      <el-option label="Other" value="other" />
                    </el-select>
                  </div>
                </div>
              </div>
              <!--end::Row-->
            </div>
            <!--end::Col-->
          </div>
          <!--  -->
          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-semobold fs-6"
              >Adhar</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8">
              <!--begin::Row-->
              <div class="row">
                <!--begin::Col-->
                <div class="col-lg fv-row">
                  <Field
                    type="text"
                    name="adhar"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Adhar No."
                    v-model="profileDetails.adhar"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="adhar" />
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
              >Pan</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8">
              <!--begin::Row-->
              <div class="row">
                <!--begin::Col-->
                <div class="col-lg fv-row">
                  <div>
                    <Field
                      type="text"
                      name="pan"
                      class="form-control form-control-lg form-control-solid"
                      placeholder="Pan No."
                      v-model="profileDetails.pan"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="pan" />
                      </div>
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
      </Vform>
      <!--end::Form-->
    </div>
    <!--end::Content-->
  </div>
  <!--end::Basic info-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref, watch } from "vue";
import { ErrorMessage, Field, Form as Vform } from "vee-validate";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";
import { rolesArray } from "@/core/config/PermissionsRolesConfig";
import { addUser, getCompanies } from "@/stores/api";
import ApiService from "@/core/services/ApiService";
import { countries, INstates } from "@/core/model/countries";
import moment from "moment";
import { Identifier } from "@/core/config/WhichUserConfig";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { blank64 } from "./blank";

interface ProfileDetails {
  disp_avatar: string;
  image: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  confpassword: string;
  role_id: string;
  address1: string;
  address2: string;
  country: string;
  states: string;
  pincode: string;
  city: string;
  dob: string;
  gender: string;
  adhar: string;
  pan: string;
  company_id: string;
  created_by: string;
  updated_by: string;
}

export default defineComponent({
  name: "account-settings",
  components: {
    ErrorMessage,
    Field,
    Vform,
  },
  setup() {
    const identifier = Identifier;
    const auth = useAuthStore();
    const submitButton1 = ref<HTMLElement | null>(null);
    const submitButton2 = ref<HTMLElement | null>(null);
    const submitButton3 = ref<HTMLElement | null>(null);
    const submitButton4 = ref<HTMLElement | null>(null);
    const submitButton5 = ref<HTMLElement | null>(null);
    const updateEmailButton = ref<HTMLElement | null>(null);
    const updatePasswordButton = ref<HTMLElement | null>(null);
    const User = auth.GetUser();
    let limit = ref(500);
    const router = useRouter();
    const loading = ref(false);
    const Companies = ref([{ id: "", company_name: "" }]);
    const state = ref([""]);
    const file_size = ref(false);
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
      state.value.pop();
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
      confpassword: Yup.string().required().label("Confirm Password"),
      pincode: Yup.string().required().label("Pincode"),
      address1: Yup.string().required().label("Address"),
      address2: Yup.string().required().label("Address"),
      adhar: Yup.string().required().label("Adhar No"),
      pan: Yup.string().required().label("Pan No"),
    });

    const profileDetails = ref<ProfileDetails>({
      disp_avatar: "data: image/png;base64," + blank64,
      image: "",
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      password: "",
      confpassword: "",
      role_id: "0",
      address1: "",
      address2: "",
      country: "",
      states: "",
      city: "",
      pincode: "",
      dob: "",
      gender: "",
      adhar: "",
      pan: "",
      company_id: "0",
      created_by: User.id,
      updated_by: User.id,
    });

    watch(
      () => profileDetails.value.country,
      (newVal) => {
        while (state.value.length) {
          state.value.pop();
        }
        if (newVal === "India") {
          profileDetails.value.states = "";
          INstates.forEach((ele) => {
            state.value.push(ele.name);
          });
          //console.log(state);
        } else {
          profileDetails.value.states = "";
        }
      }
    );

    const onsubmit = async () => {
      // * company identification for companyid based on localstorage login

      // disp_image
      profileDetails.value.disp_avatar =
        profileDetails.value.disp_avatar.replace(
          /^data:image\/\w+;base64,/,
          ""
        );
      loading.value = true;
      console.log(profileDetails.value);
      console.warn("Nice");
      try {
        // ? form multipart form post
        // ? Call your API here with the form values
        // ? CUSTOMS
        // ? const form = await CUSTOM_FORM(profileDetails);
        // ? push form
        if (User.role_id == "2") {
          const company_id = User.company_id;
          profileDetails.value.company_id = company_id;
        }
        const response = await addUser(profileDetails.value);
        console.log(response.error);
        if (!response.error) {
          // Handle successful API response
          console.log("API response:", response);
          showSuccessAlert("Success", "User have been successfully inserted!");
          router.push({ name: "users-list" });
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
      const file = e.target.files[0];

      if (!file) {
        console.error("Error: No file selected.");
        return;
      }

      const fileSize = file.size;
      const fileMb = fileSize / 1024 ** 2;
      console.log(fileMb);

      if (fileMb <= 1) {
        file_size.value = false;
        profileDetails.value.disp_avatar = URL.createObjectURL(file);
        const reader = new FileReader();

        reader.onload = function () {
          try {
            const base64Data = reader.result
              ?.toString()
              .replace(/^data:image\/\w+;base64,/, "");
            if (base64Data) {
              profileDetails.value.image = base64Data;
              console.log(profileDetails.value.image);
            } else {
              console.error("Error: Failed to read the image data.");
            }
          } catch (e) {
            console.error("Error:", e);
          }
        };

        reader.readAsDataURL(file);
      } else {
        file_size.value = true;
        profileDetails.value.disp_avatar = getAssetPath(
          "media/avatars/blank.png"
        );
      }
    };

    const clear = () => {
      profileDetails.value = {
        disp_avatar: getAssetPath("media/avatars/blank.png"),
        image: "",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
        confpassword: "",
        role_id: "0",
        address1: "",
        address2: "",
        states: "",
        city: " ",
        country: "",
        pincode: "",
        dob: "",
        gender: "",
        adhar: "",
        pan: "",
        company_id: "0",
        created_by: User.id,
        updated_by: User.id,
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
      state,
      countries,
      file_size,
      identifier,
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
./blank
