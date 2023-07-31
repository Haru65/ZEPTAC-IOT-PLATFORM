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
                  title="Change profile image"
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
                  title="Remove image"
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

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-semobold fs-6"
              >Role</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <el-select v-model="profileDetails.role_id" filterable  placeholder="Please Select Role...">
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
              <el-select v-model="profileDetails.company_id" filterable  placeholder="Please Select Company...">
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
              <span>Address 1</span>
            </label>
            <!--begin::Col-->
            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="textarea"
                name="address1"
                as="textarea"
                class="form-control form-control-lg form-control-solid"
                placeholder="eg. plot no, apartment name"
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
              <span>Address 2</span>
            </label>
            <!--begin::Col-->
            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="textarea"
                name="address2"
                as="textarea"
                class="form-control form-control-lg form-control-solid"
                placeholder="eg. street name, road name, area name"
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
            <label class="col-lg-4 col-form-label fw-semobold fs-6"
              >Country</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8">
              <!--begin::Row-->
              <div class="row">
                <!--begin::Col-->
                <div class="col-lg fv-row">
                  <el-select v-model="profileDetails.country" filterable placeholder="Select Your Country...">
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
            <label class="col-lg-4 col-form-label fw-semobold fs-6"
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
                    <el-select v-model="profileDetails.states" filterable placeholder="Select Your State...">
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
                      placeholder="Enter State Name"
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
            <label class="col-lg-4 col-form-label fw-semobold fs-6"
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
                    placeholder="Enter Pincode"
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
            <label class="col-lg-4 col-form-label fw-semobold fs-6"
              >Date of Birth</label
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
                    placeholder="Select Date of Birth"
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
            <label class="col-lg-4 col-form-label fw-semobold fs-6"
              >Gender</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg">
              <!--begin::Row-->
              <div class="row">
                <div class="col-lg fv-row">
                  <div>
                    <el-select v-model="profileDetails.gender" filterable placeholder="Select Your Gender...">
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
            <label class="col-lg-4 col-form-label fw-semobold fs-6"
              >Aadhar Card</label
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
                    placeholder="Enter Aadhar Number"
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
            <label class="col-lg-4 col-form-label fw-semobold fs-6"
              >Pan Card</label
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
                      placeholder="Enter Pan Number."
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
            <span v-if="!loading" class="indicator-label"> Update </span>
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
import { getCompanies, getUser, updateUser } from "@/stores/api";
import ApiService from "@/core/services/ApiService";
import { countries, INstates } from "@/core/model/countries";
import moment from "moment";
import { useAuthStore } from "@/stores/auth";
import { useRouter, useRoute } from "vue-router";
import { Identifier } from "@/core/config/WhichUserConfig";

interface ProfileDetails {
  id: string;
  disp_avatar: string;
  image: string | null;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  confpassword: string;
  role_id: string;
  roles: object;
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
    const auth = useAuthStore();
    const identifier = Identifier;
    const submitButton1 = ref<HTMLElement | null>(null);
    const submitButton2 = ref<HTMLElement | null>(null);
    const submitButton3 = ref<HTMLElement | null>(null);
    const submitButton4 = ref<HTMLElement | null>(null);
    const submitButton5 = ref<HTMLElement | null>(null);
    const updateEmailButton = ref<HTMLElement | null>(null);
    const updatePasswordButton = ref<HTMLElement | null>(null);
    const file_size = ref(false);
    let limit = ref(500);
    const router = useRouter();
    const User = auth.GetUser();
    const route = useRoute();
    const loading = ref(false);
    const Companies = ref([{ id: "", company_name: "" }]);
    const state = ref([""]);
    const userId = route.params.id;

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

    // get image as base64 and convert to img form larvel
    const loadUser = async () => {
      ApiService.setHeader();
      const response = await getUser(userId);
      console.log(response);
      profileDetails.value = {
        id: userId.toString(),
        disp_avatar:
          response.meta.profile_pic_data != ""
            ? "data: image/png;base64," + response.meta.profile_pic_data
            : getAssetPath("media/avatars/blank.png"),
        image: "",
        first_name: response.first_name,
        last_name: response.last_name,
        email: response.email,
        phone: response.mobile,
        password: " ",
        confpassword: " ",
        role_id: response.role_id,
        roles: response.roles,
        //  ? optional fields check for data
        address1: response.meta.address1 ? response.meta.address1 : "",
        address2: response.meta.address2 ? response.meta.address2 : "",
        country: response.meta.country ? response.meta.country : "",
        states: response.meta.states ? response.meta.states : "",
        city: response.meta.city ? response.meta.city : "",
        pincode: response.meta.pincode ? response.meta.pincode : "",
        dob: response.meta.dob ? response.meta.dob : "",
        gender: response.meta.gender ? response.meta.gender : "",
        adhar: response.meta.adhar ? response.meta.adhar : "",
        pan: response.meta.pan ? response.meta.pan : "",
        company_id: response.company_id ? response.company_id : "",
        created_by: User.id,
        updated_by: User.id,
      };
    };

    onMounted(async () => {
      state.value.pop();
      Companies.value.pop();
      await loadUser();
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
      id: userId.toString(),
      disp_avatar: getAssetPath("media/avatars/blank.png"),
      image: "",
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      password: "",
      confpassword: "",
      role_id: "",
      roles: {},
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
      company_id: "",
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
          // profileDetails.value.states = "";
          INstates.forEach((ele) => {
            state.value.push(ele.name);
          });
          //console.log(state);
        } else {
          // profileDetails.value.states = "";
        }
      }
    );

    const onsubmit = async () => {
      loading.value = true;
      console.log(profileDetails.value);
      console.warn("Nice");
      try {
        // form multipart form post
        // push form
        console.log(profileDetails.value);
        const response = await updateUser(profileDetails.value, userId);
        console.log(response.error);
        if (!response.error) {
          // Handle successful API response
          console.log("API response:", response);
          showSuccessAlert("Success", "User have been successfully inserted!");
          // router.push({ name: "users-list" });
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
        id: "",
        disp_avatar: getAssetPath("media/avatars/blank.png"),
        image: "",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
        confpassword: "",
        role_id: "",
        roles: {},
        address1: "",
        address2: "",
        states: "",
        city: "",
        country: "",
        pincode: "",
        dob: "",
        gender: "",
        adhar: "",
        pan: "",
        company_id: "",
        created_by: User.id,
        updated_by: User.id
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
      file_size,
      countries,
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
