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
          <div class="card-body border-top p-9">
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
                      'media/avatars/default.png'
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

            <!--begin::Input group-->
            <div class="row mb-6">
              <!--begin::Label-->
              <label class="col-lg-4 col-form-label required fw-semobold fs-6"
                >Company Name</label
              >
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-8 fv-row">
                <div class="form-control form-control-lg form-control-solid text-muted">
                  {{ companyDetails.company_name }}
                </div>
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
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
                  name="company_address"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Company company_address"
                  v-model="companyDetails.address"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="company_address" />
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
                >Your Name</label
              >
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-8 fv-row">
                <Field
                  type="text"
                  name="contact_person"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter your name"
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
                <div
                  class="form-control form-control-lg form-control-solid text-muted"
                >
              {{ companyDetails.email }}</div>
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
                  <div class="col-lg-6 fv-row">
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
                  <div v-if="state.length" class="col-lg-6 fv-row">
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

                  <div v-if="!state.length" class="col-lg-6 fv-row">
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
                  <div class="col-lg-6 fv-row">
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
                  <div class="col-lg-6 fv-row">
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
                >GST Number</label
              >
              <!--end::Label-->
              <!--begin::Col-->
              <div class="col-lg-8">
                <!--begin::Row-->
                <!--begin::Col-->
                <div class="col-lg fv-row position-relative">
                  <Field
                    type="text"
                    name="gst_details"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Enter GST Number"
                    v-model="companyDetails.gst_details"
                    v-on:input="isValidGSTNo"
                  />
                  <div
                    v-if="validGSTRef === true"
                    class="position-absolute end-0 top-50 translate-middle-y"
                  >
                    <i
                      class="fas fs-4 fa-check-circle text-success me-6"
                      data-toggle="tooltip"
                      title="GST number is valid"
                    ></i>
                  </div>
                  <div
                    v-else
                    class="position-absolute end-0 top-50 translate-middle-y"
                  >
                    <i
                      class="fas fs-4 fa-times-circle text-danger me-6"
                      data-toggle="tooltip"
                      title="GST number is Invalid/Incorrect"
                    ></i>
                  </div>
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
                    <div class="form-control form-control-lg form-control-solid text-muted">
                      {{ companyDetails.user_limit }}
                    </div>
                  </div>
                  <!--end::Col-->
                  <!--begin::Col-->
                  <div class="col-lg-6 fv-row p-2">
                    <div class="form-control form-control-lg form-control-solid text-muted">
                      {{ companyDetails.selected_package }}
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
                  <div class="col-lg-6 fv-row">
                    <Field
                      type="text"
                      name="quotation_no_prefix"
                      class="form-control form-control-lg form-control-solid"
                      placeholder="Enter Quotation Prefix"
                      v-model="companyDetails.quotation_no_prefix"
                    />
                  </div>
                  <!--end::Col-->

                  <!--begin::Col-->
                  <div class="col-lg-6 fv-row">
                    <div>
                      <Field
                        type="text"
                        name="quotation_no_init"
                        class="form-control form-control-lg form-control-solid"
                        placeholder="Enter Quotation No"
                        v-model="companyDetails.quotation_no_init"
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
                  <div class="col-lg-6 fv-row">
                    <Field
                      type="text"
                      name="invoice_no_prefix"
                      class="form-control form-control-lg form-control-solid"
                      placeholder="Enter Invoice Prefix"
                      v-model="companyDetails.invoice_no_prefix"
                    />
                  </div>
                  <!--end::Col-->

                  <!--begin::Col-->
                  <div class="col-lg-6 fv-row">
                    <div>
                      <Field
                        type="text"
                        name="invoice_no_init"
                        class="form-control form-control-lg form-control-solid"
                        placeholder="Enter invoice No"
                        v-model="companyDetails.invoice_no_init"
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
                      name="rgp_no_prefix"
                      class="form-control form-control-lg form-control-solid"
                      placeholder="Enter RGP Prefix"
                      v-model="companyDetails.rgp_no_prefix"
                    />
                  </div>
                  <!--end::Col-->

                  <!--begin::Col-->
                  <div class="col-lg-6 fv-row p-2">
                    <div>
                      <Field
                        type="text"
                        name="rgp_no_init"
                        class="form-control form-control-lg form-control-solid"
                        placeholder="Enter RGP No"
                        v-model="companyDetails.rgp_no_init"
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

            <div class="row mb-6">
              <!--begin::Label-->
              <label class="col-lg-4 col-form-label required fw-semobold fs-6"
                >Instrument ID Prefix & No</label
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
                      name="instrument_id_prefix"
                      class="form-control form-control-lg form-control-solid"
                      placeholder="Enter Instrument Id Prefix"
                      v-model="companyDetails.instrument_id_prefix"
                    />
                  </div>
                  <!--end::Col-->

                  <!--begin::Col-->
                  <div class="col-lg-6 fv-row p-2">
                    <div>
                      <Field
                        type="text"
                        name="instrument_id_init"
                        class="form-control form-control-lg form-control-solid"
                        placeholder="Enter initial Instrument Id"
                        v-model="companyDetails.instrument_id_init"
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
                >Enquiry Prefix & No</label
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
                      name="enquiry_no_prefix"
                      class="form-control form-control-lg form-control-solid"
                      placeholder="Enter Enquiry Prefix"
                      v-model="companyDetails.enquiry_no_prefix"
                    />
                  </div>
                  <!--end::Col-->

                  <!--begin::Col-->
                  <div class="col-lg-6 fv-row p-2">
                    <div>
                      <Field
                        type="text"
                        name="enquiry_no_init"
                        class="form-control form-control-lg form-control-solid"
                        placeholder="Enter Enquiry No"
                        v-model="companyDetails.enquiry_no_init"
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
            <button
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-lg btn-primary w-25"
              type="submit"
              @click="submit()"
            >
              <span v-if="!loading" class="indicator-label"> Update </span>
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
import { updateCompany, getCompany, deletecompany } from "@/stores/api";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import packages from "@/core/config/PackagesConfig";
import { useRoute, useRouter } from "vue-router";
import { limit } from "@/core/config/WhichUserConfig";
const file_size = ref(false);

interface companyDetails {
  disp_avatar: string;
  image: string | null;
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
  quotation_no_init: string;
  quotation_no_prefix: string;
  invoice_no_init: string;
  invoice_no_prefix: string;
  rgp_no_init: string;
  rgp_no_prefix: string;
  enquiry_no_init: string;
  enquiry_no_prefix: string;
  instrument_id_init: string;
  instrument_id_prefix: string;
}

export default defineComponent({
  name: "company-settings",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  setup() {
    const updateEmailButton = ref<HTMLElement | null>(null);
    const updatePasswordButton = ref<HTMLElement | null>(null);

    const loading = ref(false);
    const router = useRoute();
    const route = useRouter();

    const CompanyId = router.params.id;
    const emailFormDisplay = ref(false);
    const passwordFormDisplay = ref(false);

    const state = ref([""]);

    const companyDetailsValidator = Yup.object().shape({
      company_name: Yup.string().required().label("Compnay Name"),
      company_address: Yup.string().required().label("Company Address"),
      contact_person: Yup.string().required().label("Contact Person"),
      contact: Yup.string().required().label("Contact"),
      email: Yup.string().required().email().label("Email"),
      country: Yup.string().required().label("Country"),
      state: Yup.string().required().label("State"),
      city: Yup.string().required().label("City"),
      pincode: Yup.string().required().label("Pincode"),
      gst_details: Yup.string().required().label("GST Number"),
    });

    const companyDetails = ref<companyDetails>({
      disp_avatar: getAssetPath("media/avatars/default.png"),
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
      quotation_no_init: "",
      quotation_no_prefix: "",
      invoice_no_init: "",
      invoice_no_prefix: "",
      rgp_no_init: "",
      rgp_no_prefix: "",
      enquiry_no_init: "",
      enquiry_no_prefix: "",
      instrument_id_init: "",
      instrument_id_prefix: "",
    });

    const validGSTRef = ref(false);

    function isValidGSTNo() {
      // Regex to check valid
      // GST CODE
      let regex = new RegExp(
        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
      );

      let str = companyDetails.value.gst_details;

      // GST CODE
      // is empty return false
      if (str == null) {
        validGSTRef.value = false;
        return false;
      }

      // Return true if the GST_CODE
      // matched the ReGex
      if (regex.test(str) == true) {
        validGSTRef.value = true;
        return true;
      } else {
        validGSTRef.value = false;
        return false;
      }
    }

    onMounted(async () => {
      const response = await getCompany(CompanyId);
      console.log(CompanyId);
      companyDetails.value = {
        disp_avatar:
          response.company_logo != ""
            ? "data: image/png;base64," + response.company_logo
            : getAssetPath("media/avatars/default.png"),

        image: response.company_logo ?? "",
        company_name: response.company_name,
        address: response.address,
        contact_person: response.contact_person,
        mobile_number: response.mobile_number,
        email: response.email,
        country: response.country,
        state: response.state,
        pincode: response.pincode,
        city: response.city,
        gst_details: response.gst_details,
        user_limit: response.user_limit,
        selected_package: response.selected_package,
        quotation_no_prefix: response.quotation_no_prefix,
        quotation_no_init: response.quotation_no_init,
        invoice_no_prefix: response.invoice_no_prefix,
        invoice_no_init: response.invoice_no_init,
        rgp_no_prefix: response.rgp_no_prefix,
        rgp_no_init: response.rgp_no_init,
        enquiry_no_prefix: response.enquiry_no_prefix,
        enquiry_no_init: response.enquiry_no_init,
        instrument_id_prefix: response.instrument_id_prefix,
        instrument_id_init: response.instrument_id_init,
      };

      isValidGSTNo();
    }),
      watch(
        () => companyDetails.value.country,
        (newVal) => {
          while (state.value.length) {
            state.value.pop();
          }
          if (newVal === "India") {
            INstates.forEach((ele) => {
              state.value.push(ele.name);
            });
          }
        }
      );

    // remove file or update
    const removeImage = () => {
      companyDetails.value.disp_avatar = getAssetPath(
        "media/avatars/default.png"
      );
      companyDetails.value.image = "";
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
          "media/avatars/default.png"
        );
      }
    };

    const submit = async () => {
      loading.value = true;
      console.warn("Nice");
      try {
        // Call your API here with the form values
        const response = await updateCompany(companyDetails.value, CompanyId);
        console.log(response.error);
        if (!response.error) {
          // Handle successful API response
          console.log("API response:", response);
          showSuccessAlert(
            "Success",
            "Company details have been successfully updated!"
          );
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
      isValidGSTNo,
      validGSTRef,
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
