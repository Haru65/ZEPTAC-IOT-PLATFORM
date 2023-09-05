<template>
  <div style="width: 99%" class="bg-body p-12 rounded">
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Form-->
        <VForm
          id="kt_account_profile_details_form"
          class="form"
          novalidate
          :validation-schema="companyDetailsValidator"
        >
          <!--begin::Card body-->
          <div class="card-body p-9">

            <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6"
              >Company Logo</label
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
                  :src="companyDetails.disp_avatar"
                  class="image-input-wrapper"
                  alt="company logo"
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

            <div class="row mb-6">
              <!--begin::Label-->
              <label class="col-lg-4 col-form-label required fw-semobold fs-6"
                >Company Name</label
              >
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-8 fv-row">
                <Field
                  type="text"
                  name="company_name"
                  class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                  placeholder="Company name"
                  v-model="companyDetails.company_name"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="company_name" />
                  </div>
                </div>
              </div>
            </div>

            <div class="row mb-6">
              <!--begin::Label-->
              <label class="col-lg-4 col-form-label required fw-semobold fs-6"
                >Company Address</label
              >
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-8 fv-row">
                <Field
                  type="text"
                  as="textarea"
                  name="company_address"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Company address"
                  v-model="companyDetails.address"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="company_address" />
                  </div>
                </div>
              </div>
            </div>

            <!--begin::Input group-->
            <div class="row mb-6">
              <!--begin::Label-->
              <label class="col-lg-4 col-form-label required fw-semobold fs-6"
                >Contact Person</label
              >
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-8 fv-row">
                <Field
                  type="text"
                  name="contact_person"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Contact Person Name"
                  v-model="companyDetails.contact_person"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="contact_person" />
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
                  name="contact"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Phone number"
                  v-model="companyDetails.mobile_number"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="contact" />
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
                <span class="required">Email</span>

                <i
                  class="fas fa-exclamation-circle ms-1 fs-7"
                  data-bs-toggle="tooltip"
                  title="Email must be unique"
                ></i>
              </label>
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-8 fv-row">
                <Field
                  type="text"
                  name="email"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Email"
                  v-model="companyDetails.email"
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
              <label class="col-lg-4 col-form-label required fw-semobold fs-6"
                >Country & State</label
              >
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-8">
                <!--begin::Row-->
                <div class="row">
                  <!--begin::Col-->
                  <div class="col-lg-6 fv-row p-2">
                    <el-select
                      v-model="companyDetails.country"
                      filterable
                      placeholder="Select Country"
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

                  <!--begin::Col-->
                  <div v-if="state.length" class="col-lg-6 fv-row p-2">
                    <div>
                      <el-select
                        v-model="companyDetails.state"
                        filterable
                        placeholder="Select State"
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

                  <div v-if="!state.length" class="col-lg-6 fv-row p-2">
                    <div>
                      <Field
                        type="tel"
                        name="state"
                        class="form-control form-control-lg form-control-solid"
                        placeholder="Enter State Name"
                        v-model="companyDetails.state"
                      />
                      <div class="fv-plugins-message-container">
                        <div class="fv-help-block">
                          <ErrorMessage name="state" />
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

            <!--begin::Input group-->
            <div class="row mb-6">
              <!--begin::Label-->
              <label class="col-lg-4 col-form-label required fw-semobold fs-6"
                >City & Pincode</label
              >
              <!--end::Label-->
              <!--begin::Col-->
              <div class="col-lg-8">
                <!--begin::Row-->
                <div class="row">
                  <!--begin::Col-->
                  <div class="col-lg-6 fv-row p-2">
                    <Field
                      type="text"
                      name="city"
                      class="form-control form-control-lg form-control-solid"
                      placeholder="Enter City Name"
                      v-model="companyDetails.city"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="city" />
                      </div>
                    </div>
                  </div>
                  <!--end::Col-->

                  <!--begin::Col-->
                  <div class="col-lg-6 fv-row p-2">
                    <Field
                      type="text"
                      name="pincode"
                      class="form-control form-control-lg form-control-solid"
                      placeholder="Enter Pincode"
                      v-model="companyDetails.pincode"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="pincode" />
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
            <div class="row mb-3">
              <!--begin::Label-->
              <label class="col-lg-4 col-form-label required fw-semobold fs-6"
                >GST Details</label
              >
              <!--end::Label-->
              <!--begin::Col-->
              <div class="col-lg-8">
                <!--begin::Row-->
                <!--begin::Col-->
                <div class="col-lg fv-row">
                  <Field
                    type="text"
                    as="textarea"
                    name="gst_details"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="GST"
                    v-model="companyDetails.gst_details"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="gst_details" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
                <!--end::Row-->
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->
            <!--begin::Input group-->
            <div class="row mb-6">
              <!--begin::Label-->
              <label class="col-lg-4 col-form-label required fw-semobold fs-6"
                >User Limit & Package</label
              >
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-8">
                <!--begin::Row-->
                <div class="row">
                  <!--begin::Col-->
                  <div class="col-lg-6 fv-row p-2">
                    <el-select
                      v-model="companyDetails.user_limit"
                      filterable
                      placeholder="select User Limit"
                    >
                      <el-option
                        v-for="item in limit"
                        :key="item"
                        :label="item"
                        :value="item"
                      />
                    </el-select>
                  </div>
                  <!--end::Col-->

                  <!--begin::Col-->
                  <div class="col-lg-6 fv-row p-2">
                    <div>
                      <el-select
                        v-model="companyDetails.selected_package"
                        filterable
                        placeholder="Select a Package..."
                      >
                        <el-option
                          v-for="item in packages"
                          :key="item"
                          :label="item"
                          :value="item"
                        />
                      </el-select>
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
                >Quotation Prefix & No</label
              >
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-8">
                <!--begin::Row-->
                <div class="row">
                  <!--begin::Col-->
                  <div class="col-lg-6 fv-row p-2">
                    <Field
                      type="text"
                      name="quotation_prefix"
                      class="form-control form-control-lg form-control-solid"
                      placeholder="Enter Quotation Prefix"
                      v-model="companyDetails.quotation_prefix"
                    />
                  </div>
                  <!--end::Col-->

                  <!--begin::Col-->
                  <div class="col-lg-6 fv-row p-2">
                    <div>
                      <Field
                        type="text"
                        name="quotation_no"
                        class="form-control form-control-lg form-control-solid"
                        placeholder="Enter Quotation No"
                        v-model="companyDetails.quotation_no"
                      />
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
                >Invoice Prefix & No</label
              >
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-8">
                <!--begin::Row-->
                <div class="row">
                  <!--begin::Col-->
                  <div class="col-lg-6 fv-row p-2">
                    <Field
                      type="text"
                      name="invoice_prefix"
                      class="form-control form-control-lg form-control-solid"
                      placeholder="Enter Invoice Prefix"
                      v-model="companyDetails.invoice_prefix"
                    />
                  </div>
                  <!--end::Col-->

                  <!--begin::Col-->
                  <div class="col-lg-6 fv-row p-2">
                    <div>
                      <Field
                        type="text"
                        name="invoice_no"
                        class="form-control form-control-lg form-control-solid"
                        placeholder="Enter Inovice No"
                        v-model="companyDetails.invoice_no"
                      />
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
                >RGP Prefix & No</label
              >
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-8">
                <!--begin::Row-->
                <div class="row">
                  <!--begin::Col-->
                  <div class="col-lg-6 fv-row p-2">
                    <Field
                      type="text"
                      name="rgp_prefix"
                      class="form-control form-control-lg form-control-solid"
                      placeholder="Enter RGP Prefix"
                      v-model="companyDetails.rgp_prefix"
                    />
                  </div>
                  <!--end::Col-->

                  <!--begin::Col-->
                  <div class="col-lg-6 fv-row p-2">
                    <div>
                      <Field
                        type="text"
                        name="rgp_no"
                        class="form-control form-control-lg form-control-solid"
                        placeholder="Enter RGP No"
                        v-model="companyDetails.rgp_no"
                      />
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
            <button type="reset" class="btn btn-lg btn-danger w-25">
              Discard
            </button>
            <!--end::Button-->
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <!--begin::Button-->
            <button
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-lg btn-primary w-25"
              type="submit"
              @click="submit()"
            >
              <span v-if="!loading" class="indicator-label"> Submit </span>
              <span v-if="loading" class="indicator-progress">
                Please wait...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </button>
            <!--end::Button-->
          </div>
          <!--end::Input group-->
        </VForm>
        <!--end::Form-->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref, watch } from "vue";
import { countries, INstates } from "@/core/model/countries";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { addCompany } from "@/stores/api";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import packages from "@/core/config/PackagesConfig";
import { limit } from "@/core/config/WhichUserConfig";
import { useRouter } from "vue-router";

import { blank64 } from "./blank";

interface companyDetails {
  disp_avatar: string;
  image: string;
  company_name: string;
  address: string;
  contact_person: string;
  mobile_number: string;
  email: string;
  country: string;
  state: string;
  pincode: string;
  city: string;
  gst_details: string;
  user_limit: number;
  selected_package: string;
  quotation_no: string;
  quotation_prefix: string;
  invoice_no: string;
  invoice_prefix: string;
  rgp_no: string;
  rgp_prefix: string;
}

export default defineComponent({
  name: "company-add",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  setup() {
    const updateEmailButton = ref<HTMLElement | null>(null);
    const updatePasswordButton = ref<HTMLElement | null>(null);
    const route = useRouter();
    const loading = ref(false);
    const emailFormDisplay = ref(false);
    const passwordFormDisplay = ref(false);
    const state = ref([""]);
    const file_size = ref(false);

    const companyDetailsValidator = Yup.object().shape({
      company_name: Yup.string().required().label("Company Name"),
      company_address: Yup.string().required().label("Company Address"),
      contact_person: Yup.string().required().label("Contact Person"),
      contact: Yup.string().required().label("Contact"),
      email: Yup.string().required().email().label("Email"),
      country: Yup.string().required().label("Country"),
      state: Yup.string().required().label("State"),
      city: Yup.string().required().label("City"),
      pincode: Yup.string().required().label("Pincode"),
      gst_details: Yup.string().required().label("GST Detials"),
    });

    const companyDetails = ref<companyDetails>({
      disp_avatar: "data: image/png;base64," + blank64,
      image: "",
      company_name: "",
      address: "",
      contact_person: "",
      mobile_number: "",
      email: "",
      country: "",
      state: "",
      pincode: "",
      city: "",
      gst_details: "",
      user_limit: 1,
      selected_package: "",
      quotation_no: "",
      quotation_prefix: "",
      invoice_no: "",
      invoice_prefix: "",
      rgp_no: "",
      rgp_prefix: "",
    });

    onMounted(() => {
      state.value.pop();
    });

    watch(
      () => companyDetails.value.country,
      (newVal) => {
        while (state.value.length) {
          state.value.pop();
        }
        if (newVal === "India") {
          companyDetails.value.state = "";
          INstates.forEach((ele) => {
            state.value.push(ele.name);
          });
          //console.log(state);
        } else {
          companyDetails.value.state = "";
        }
      }
    );

    const submit = async () => {
      // * company identification for companyid based on localstorage login

      // disp_image
      companyDetails.value.disp_avatar =
      companyDetails.value.disp_avatar.replace(
          /^data:image\/\w+;base64,/,
          ""
        );
      loading.value = true;
      console.warn("Nice");
      try {
        // Call your API here with the form values
        const response = await addCompany(companyDetails.value);
        console.log(response.error);
        if (!response.error) {
          // Handle successful API response
          console.log("API response:", response);
          showSuccessAlert(
            "Success",
            "Company details have been successfully inserted!"
          );
          route.push({ name: "company-list" });
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

     // remove file or update
     const removeImage = () => {
      companyDetails.value.disp_avatar = getAssetPath(
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
        companyDetails.value.disp_avatar = URL.createObjectURL(file);
        const reader = new FileReader();

        reader.onload = function () {
          try {
            const base64Data = reader.result
              ?.toString()
              .replace(/^data:image\/\w+;base64,/, "");
            if (base64Data) {
              companyDetails.value.image = base64Data;
              console.log(companyDetails.value.image);
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
        companyDetails.value.disp_avatar = getAssetPath(
          "media/avatars/blank.png"
        );
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

    return {
      companyDetails,
      emailFormDisplay,
      passwordFormDisplay,
      companyDetailsValidator,
      updateEmailButton,
      updatePasswordButton,
      getAssetPath,
      submit,
      countries,
      loading,
      state,
      packages,
      limit,
      removeImage,
      updateImage,
      file_size,
    };
  },
});
</script>
<style>
.el-input__inner {
  font-weight: 500;
}

.el-input__wrapper {
  
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
