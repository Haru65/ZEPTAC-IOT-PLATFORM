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
          @submit="submit"
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
                    v-if="companyDetails.company_logo && data.file_name == ''"
                    v-bind:src="`https://api.zeptac.com/storage/company/${companyDetails.id}/${companyDetails.company_logo}`"
                    class="image-input-wrapper"
                    alt="company logo"
                  />
                  <img
                    v-else-if="companyDetails.company_logo && data.file_name"
                    v-bind:src="`https://api.zeptac.com/storage/temporary/${data.file_name}`"
                    class="image-input-wrapper"
                    alt="company logo"
                  />
                  <img
                    v-else
                    v-bind:src="`${getAssetPath('media/avatars/default.png')}`"
                    class="image-input-wrapper"
                    alt="company logo"
                  />
                  <!--end::Preview existing avatar-->

                  <!--begin::Label-->
                  <label
                    class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                    data-kt-image-input-action="change"
                    data-bs-toggle="tooltip"
                    title="Change company Logo"
                  >
                    <i class="bi bi-pencil-fill fs-7"></i>

                    <!--begin::Inputs-->
                    <input
                      type="file"
                      name="company_logo"
                      accept=".png, .jpg, .jpeg"
                      @change="handleFileChange($event)"
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
                    @click="removeFileFromTemp"
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
                <div
                  class="form-control form-control-lg form-control-solid text-muted"
                >
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
                  name="address"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Company address"
                  v-model="companyDetails.address"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="address" />
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
                  name="mobile_number"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Phone number"
                  v-model="companyDetails.mobile_number"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="mobile_number" />
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
                  {{ companyDetails.email }}
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
                    <div
                      class="fv-plugins-message-container mt-0"
                      v-if="companyDetails.country == ''"
                    >
                      <div class="fv-help-block">
                        <ErrorMessage name="country" />
                      </div>
                    </div>
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
                      <div
                        class="fv-plugins-message-container mt-0"
                        v-if="companyDetails.state == ''"
                      >
                        <div class="fv-help-block">
                          <ErrorMessage name="state" />
                        </div>
                      </div>
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
                    v-on:keyup="debouncedValidateGST"
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
                    <div
                      class="form-control form-control-lg form-control-solid text-muted"
                    >
                      {{ companyDetails.user_limit }}
                    </div>
                  </div>
                  <!--end::Col-->
                  <!--begin::Col-->
                  <div class="col-lg-6 fv-row p-2">
                    <div
                      class="form-control form-control-lg form-control-solid text-muted"
                    >
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
              <label class="col-lg-4 col-form-label required fw-semobold fs-6">
                Choose Start Month of Financial Year
              </label>
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-8">
                <!--begin::Row-->
                <div class="row">
                  <!--begin::Col-->
                  <div class="col-lg-6 fv-row p-2">
                    <el-select
                      v-model="companyDetails.financial_year_type"
                      filterable
                      placeholder="Choose Start Month"
                    >
                      <el-option key="1" label="January - December" value="1" />
                      <el-option key="2" label="April - March" value="2" />
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
                      name="quotation_no_prefix"
                      class="form-control form-control-lg form-control-solid"
                      placeholder="Enter Quotation Prefix"
                      v-model="companyDetails.quotation_no_prefix"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="quotation_no_prefix" />
                      </div>
                    </div>
                  </div>
                  <!--end::Col-->

                  <!--begin::Col-->
                  <div class="col-lg-6 fv-row p-2">
                    <div>
                      <Field
                        type="text"
                        name="quotation_no_init"
                        class="form-control form-control-lg form-control-solid"
                        placeholder="Enter Quotation No"
                        v-model="companyDetails.quotation_no_init"
                      />
                      <div class="fv-plugins-message-container">
                        <div class="fv-help-block">
                          <ErrorMessage name="quotation_no_init" />
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
                      name="invoice_no_prefix"
                      class="form-control form-control-lg form-control-solid"
                      placeholder="Enter Invoice Prefix"
                      v-model="companyDetails.invoice_no_prefix"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="invoice_no_prefix" />
                      </div>
                    </div>
                  </div>
                  <!--end::Col-->

                  <!--begin::Col-->
                  <div class="col-lg-6 fv-row p-2">
                    <div>
                      <Field
                        type="text"
                        name="invoice_no_init"
                        class="form-control form-control-lg form-control-solid"
                        placeholder="Enter Inovice No"
                        v-model="companyDetails.invoice_no_init"
                      />
                      <div class="fv-plugins-message-container">
                        <div class="fv-help-block">
                          <ErrorMessage name="invoice_no_init" />
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
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="rgp_no_prefix" />
                      </div>
                    </div>
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
                      <div class="fv-plugins-message-container">
                        <div class="fv-help-block">
                          <ErrorMessage name="rgp_no_init" />
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
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="instrument_id_prefix" />
                      </div>
                    </div>
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
                      <div class="fv-plugins-message-container">
                        <div class="fv-help-block">
                          <ErrorMessage name="instrument_id_init" />
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
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="enquiry_no_prefix" />
                      </div>
                    </div>
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
                      <div class="fv-plugins-message-container">
                        <div class="fv-help-block">
                          <ErrorMessage name="enquiry_no_init" />
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
                >Service Request Prefix & No</label
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
                      name="srf_no_prefix"
                      class="form-control form-control-lg form-control-solid"
                      placeholder="Enter SRF Prefix"
                      v-model="companyDetails.srf_no_prefix"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="srf_no_prefix" />
                      </div>
                    </div>
                  </div>
                  <!--end::Col-->

                  <!--begin::Col-->
                  <div class="col-lg-6 fv-row p-2">
                    <div>
                      <Field
                        type="text"
                        name="srf_no_init"
                        class="form-control form-control-lg form-control-solid"
                        placeholder="Enter SRF No"
                        v-model="companyDetails.srf_no_init"
                      />
                      <div class="fv-plugins-message-container">
                        <div class="fv-help-block">
                          <ErrorMessage name="srf_no_init" />
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
            <button
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-lg btn-primary w-sd-25 w-lg-25"
              type="submit"
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
import {
  updateCompany,
  getCompany,
  removeImage,
  uploadImage,
} from "@/stores/api";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import packages from "@/core/config/PackagesConfig";
import { useRoute, useRouter } from "vue-router";
import { limit } from "@/core/config/WhichUserConfig";
import { debounce } from "@/core/helpers/debounce";
import { financialTypes } from "@/core/model/company";
const file_size = ref(false);

interface companyDetails {
  id: string;
  company_logo: string;
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
  financial_year_type: string;
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
  srf_no_init: string;
  srf_no_prefix: string;

  usage_type: string;
  is_trial: boolean;
  trial_subscription_start: string;
  trial_subscription_end: string;
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
    const route = useRoute();
    const router = useRouter();

    const CompanyId = route.params.id;
    const emailFormDisplay = ref(false);
    const passwordFormDisplay = ref(false);

    const state = ref([""]);

    const companyDetailsValidator = Yup.object().shape({
      company_name: Yup.string().required().label("Compnay Name"),
      address: Yup.string().required().label("Company Address"),
      contact_person: Yup.string().required().label("Contact Person"),
      mobile_number: Yup.string().required().label("Contact"),
      email: Yup.string().required().email().label("Email"),
      country: Yup.string().required().label("Country"),
      state: Yup.string().required().label("State"),
      city: Yup.string().required().label("City"),
      pincode: Yup.string().required().label("Pincode"),
      gst_details: Yup.string().required().label("GST Number"),

      quotation_no_init: Yup.string().required().label("Quotation Suffix"),
      quotation_no_prefix: Yup.string().required().label("Quotation Prefix"),

      invoice_no_init: Yup.string().required().label("Invoice Suffix"),
      invoice_no_prefix: Yup.string().required().label("Invoice Prefix"),

      rgp_no_init: Yup.string().required().label("Gate Pass Suffix"),
      rgp_no_prefix: Yup.string().required().label("Gate Pass Prefix"),

      enquiry_no_init: Yup.string().required().label("Enquiry No. Suffix"),
      enquiry_no_prefix: Yup.string().required().label("Enquiry No. Prefix"),

      instrument_id_init: Yup.string().required().label("Instrument Suffix"),
      instrument_id_prefix: Yup.string().required().label("Instrument Prefix"),

      srf_no_init: Yup.string().required().label("SRF No. Suffix"),
      srf_no_prefix: Yup.string().required().label("SRF No. Prefix"),
    });

    const data = ref({
      file_name: "",
      file: "",
      file_size: 0,
    });

    const companyDetails = ref<companyDetails>({
      id: "",
      company_logo: "",
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
      financial_year_type: "",
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
      srf_no_init: "",
      srf_no_prefix: "",

      usage_type: "",
      is_trial: true,
      trial_subscription_start: "",
      trial_subscription_end: "",
    });

    const validGSTRef = ref(false);

    async function isValidGSTNo() {
      // Regex to check valid GST CODE
      const regex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

      // Retrieve GST number from company details
      const str = companyDetails.value.gst_details;

      // Check if GST number is null or not 15 characters long
      if (str == null || str.length !== 15) {
        validGSTRef.value = false;
        return false;
      }

      // Check if the GST number matches the regex pattern
      if (regex.test(str)) {
        validGSTRef.value = true;
        return true;
      } else {
        validGSTRef.value = false;
        return false;
      }
    }

    const debouncedValidateGST = debounce(isValidGSTNo, 1000);

    onMounted(async () => {
      try {
        const response = await getCompany(CompanyId);

        if (response.success) {
          companyDetails.value = {
            id: response.result.id,
            company_logo: response.result.company_logo || "",
            company_name: response.result.company_name,
            address: response.result.address,
            contact_person: response.result.contact_person,
            mobile_number: response.result.mobile_number,
            email: response.result.email,
            country: response.result.country,
            state: response.result.state,
            pincode: response.result.pincode,
            city: response.result.city,
            gst_details: response.result.gst_details,
            user_limit: response.result.user_limit,
            selected_package: response.result.selected_package,
            financial_year_type: response.result.financial_year_type,
            quotation_no_prefix: response.result.quotation_no_prefix,
            quotation_no_init: response.result.quotation_no_init,
            invoice_no_prefix: response.result.invoice_no_prefix,
            invoice_no_init: response.result.invoice_no_init,
            rgp_no_prefix: response.result.rgp_no_prefix,
            rgp_no_init: response.result.rgp_no_init,
            enquiry_no_prefix: response.result.enquiry_no_prefix,
            enquiry_no_init: response.result.enquiry_no_init,
            instrument_id_prefix: response.result.instrument_id_prefix,
            instrument_id_init: response.result.instrument_id_init,
            srf_no_prefix: response.result.srf_no_prefix,
            srf_no_init: response.result.srf_no_init,

            usage_type: response.result.usage_type,
            is_trial: response.result.is_trial,
            trial_subscription_start:
              response.result.trial_subscription_start || "",
            trial_subscription_end:
              response.result.trial_subscription_end || "",
          };
        } else {
          console.error(
            `Error Occured in getCompany : ${
              response.message || "Error Occured in API"
            }`
          );
        }
      } catch (err) {
        console.error(`Error Occured in getCompany : ${err}`);
      }

      await isValidGSTNo();
    });

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

    const removeFileFromTemp = async () => {
      if (companyDetails.value.company_logo && data.value.file_name === "") {
        var confirmChange = confirm(
          "Do you really want to change the company logo?"
        );
        if (!confirmChange) {
          return;
        }

        companyDetails.value.company_logo = "";
        // Continue with the rest of your code here
        return;
      }

      if (
        companyDetails.value.company_logo === "" &&
        data.value.file_name === ""
      ) {
        alert("You already removed the file. Please select a new file.");
        return;
      }

      const deleteConfirmation = async () => {
        try {
          const result = await Swal.fire({
            title: "Are you sure?",
            text: "You want to change the file!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "red",
            confirmButtonText: "Yes, I am sure!",
          });
          return result.isConfirmed;
        } catch (error) {
          const errorMessage = "An unknown error occurred";
          showErrorAlert("Error", errorMessage);
          return false;
        }
      };

      const deleteFromServer = async () => {
        try {
          const response = await removeImage(data.value);

          if (response.success) {
            companyDetails.value.company_logo = "";
            data.value = {
              file_name: "",
              file_size: 0,
              file: "",
            };

            showSuccessAlert(
              "Success",
              response.message || `File removed successfully.`
            );
            return { success: true };
          } else {
            throw new Error(response.message || "Failed to remove the file.");
          }
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "An unknown error occurred";
          showErrorAlert("Error", errorMessage);
          return { success: false, message: errorMessage };
        }
      };

      const isConfirmed = await deleteConfirmation();
      if (isConfirmed) {
        return await deleteFromServer();
      } else {
        return { success: false };
      }
    };

    const uploadProgress = ref<number>(0);

    const MAX_FILE_SIZE = 1024 ** 2; // 1 MB

    const handleFileChange = async (event: any) => {
      const selectedFile = event.target?.files?.[0];
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

      if (!selectedFile) {
        alert("Please Select a file");
        return;
      }

      if (selectedFile.size > MAX_FILE_SIZE) {
        alert("File size should be less than 1 MB");
        return;
      }

      data.value.file_size = selectedFile.size / 1024 ** 2;

      if (allowedTypes.includes(selectedFile.type)) {
        await uploadFile(selectedFile);
      } else {
        data.value.file = "";
        alert("Please a valid file");
      }

      console.log(data.value);
    };

    const uploadFile = async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("file_name", data.value.file_name);

      const onUploadProgress = (progressEvent) => {
        const { loaded, total } = progressEvent;
        const percentage = Math.floor((loaded / total) * 100);
        uploadProgress.value = percentage;
      };

      try {
        await simulateUploadProgress();
        const response = await uploadImage(formData, onUploadProgress);
        companyDetails.value.company_logo = response.modifiedFileName;
        data.value.file_name = response.modifiedFileName;
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        finalizeProgress();
      }

      data.value.file = file;
    };

    const simulateUploadProgress = async () => {
      uploadProgress.value = 0;
      const interval = setInterval(() => {
        if (uploadProgress.value < 100) {
          uploadProgress.value += 10; // Adjust this value for smoother progress
        } else {
          clearInterval(interval);
        }
      }, 200); // Adjust the interval duration as needed
    };

    const finalizeProgress = () => {
      uploadProgress.value = 100; // Ensure progress bar is complete
      setTimeout(() => {
        uploadProgress.value = 0; // Reset progress bar after a short delay
      }, 100);
    };

    const validateForm = (formData) => {
      for (const key in formData) {
        let value = formData[key];
        if (
          key !== "trial_subscription_start" &&
          key !== "trial_subscription_end" &&
          key !== "subscription_date" &&
          key !== "company_logo"
        ) {
          if (Array.isArray(value)) {
            for (const item of value) {
              if (!validateForm(item)) {
                return false;
              }
            }
          } else if (typeof value === "object" && value !== null) {
            if (!validateForm(value)) {
              return false;
            }
          } else if (typeof value === "string") {
            value = value.trim();
            if (value === "") {
              return false;
            }
          } else {
          }
        }
      }
      return true;
    };

    const submit = async () => {
      if (validGSTRef.value === false) {
        showErrorAlert("Warning", "Please enter valid GST Number");
        return;
      }

      try {
        loading.value = true;

        if (validateForm(companyDetails.value)) {
          // Call your API here with the form values
          const response = await updateCompany(companyDetails.value, CompanyId);
          // console.log(response.error);
          if (response.success) {
            // Handle successful API response
            // console.log("API response:", response);
            showSuccessAlert(
              "Success",
              response.message ||
                "Company details have been successfully updated!"
            );
            router.push({ name: "company-list" });
          } else {
            // Handle API error response
            loading.value = false;
            showErrorAlert("Error", response.message || "An error occurred.");
          }
        } else {
          showErrorAlert("Warning", "Please fill in all fields.");
        }
      } catch (error) {
        showErrorAlert("Error", "An error occurred during the API call.");
        loading.value = false;
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
      file_size,
      debouncedValidateGST,
      validGSTRef,
      financialTypes,
      handleFileChange,
      uploadProgress,
      data,
      removeFileFromTemp,
    };
  },
});
</script>