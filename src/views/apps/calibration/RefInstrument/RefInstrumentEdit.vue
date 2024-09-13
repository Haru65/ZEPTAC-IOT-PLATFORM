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
          :validation-schema="itemDetailsValidator"
        >
          <!--begin::Card body-->
          <div class="card-body border-top p-6">
            <!--begin::Input group-->
            <div class="row mb-6" v-if="identifier == 'Admin'">
              <!--begin::Label-->
              <label
                class="col-lg-3 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                >Company</label
              >
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-9 fv-row">
                <el-select
                  v-model="itemDetails.company_id"
                  filterable
                  placeholder="Please Select Company..."
                >
                  <el-option
                    disabled="disabled"
                    value=""
                    label="Please Select Company..."
                  >
                    Please Select Company
                  </el-option>
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
            <div class="row mb-6">
              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fw-semobold fw-bold text-gray-700 fs-6 text-nowrap"
                  >Instument ID</label
                >
                <Field
                  type="text"
                  name="instrument_id"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter Instrument Id"
                  v-model="itemDetails.instrument_id"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="instrument_id" />
                  </div>
                </div>
              </div>

              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                  >Parameter</label
                >
                <Field
                  type="text"
                  name="parameter"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter Parameter... "
                  v-model="itemDetails.parameter"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="parameter" />
                  </div>
                </div>
              </div>
            </div>
            <!--end::Input group-->

            <!-- extra fields -->
            <div class="row mb-6">
              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fw-semobold fw-bold text-gray-700 fs-6 text-nowrap"
                  >Instument Name</label
                >
                <Field
                  type="text"
                  name="name"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter Instrument Model"
                  v-model="itemDetails.name"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="name" />
                  </div>
                </div>
              </div>

              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                  >Make</label
                >
                <Field
                  type="text"
                  name="make"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Instrument made by... "
                  v-model="itemDetails.make"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="make" />
                  </div>
                </div>
              </div>
            </div>
            <!--end::Input group-->

            <!-- extra fields -->
            <div class="row mb-6">
              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                  >Model No.</label
                >
                <Field
                  type="text"
                  name="model_no"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter Instrument Model No."
                  v-model="itemDetails.model_no"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="model_no" />
                  </div>
                </div>
              </div>
              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                  >Serial No.</label
                >
                <Field
                  type="text"
                  name="serial_no"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter Instrument Serial No."
                  v-model="itemDetails.serial_no"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="serial_no" />
                  </div>
                </div>
              </div>
            </div>
            <!--end::Input group-->

            <!-- extra fields -->
            <div class="row mb-6">
              <div class="form-group col-md-12">
                <label
                  class="col-lg-4 col-form-label required fw-semobold fw-bold text-gray-700 fs-6 text-nowrap"
                  >Range</label
                >
                <!--begin::Input group-->
                <div class="input-group gap-2">
                  <Field
                    type="text"
                    name="ranges_from"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="0"
                    v-model="itemDetails.ranges_from"
                  />
                  <span class="input-group-text">To</span>
                  <Field
                    type="text"
                    name="ranges_to"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="1000"
                    v-model="itemDetails.ranges_to"
                  />
                </div>
                <!--end::Input group-->
              </div>
            </div>
            <!--end::Input group-->
            <!-- extra fields -->
            <div class="row mb-6">
              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                  >Accuracy</label
                >
                <Field
                  type="text"
                  name="accuracy"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter Instrument accuracy"
                  v-model="itemDetails.accuracy"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="accuracy" />
                  </div>
                </div>
              </div>
              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fw-semobold fw-bold text-gray-700 fs-6 text-nowrap"
                  >Resolution</label
                >
                <Field
                  type="text"
                  name="resolution"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter resolution"
                  v-model="itemDetails.resolution"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="resolution" />
                  </div>
                </div>
              </div>

            </div>
            <!--end::Input group-->

            <!-- extra fields -->
            <div class="row mb-6">

              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                  >Uncertainity</label
                >
                <Field
                  type="text"
                  name="uncertainty"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter uncertainty"
                  v-model="itemDetails.uncertainty"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="uncertainty" />
                  </div>
                </div>
              </div>


              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                  >Certificate No.</label
                >
                <Field
                  type="text"
                  name="certificate_no"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Certificate Number"
                  v-model="itemDetails.certificate_no"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="certificate_no" />
                  </div>
                </div>
              </div>
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="row mb-6">
              <!--begin::Col-->
              <div class="col-md-6 fv-row mb-8 mb-sd-8">
                <!--begin::Label-->
                <label
                  class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Calibration Date</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-date-picker
                  type="date"
                  name="calibration_date"
                  id="calibration_date"
                  v-model="itemDetails.calibration_date"
                  @change="setDates($event, 'calibration_date')"
                  placeholder="Pick a day"
                  :editable="false"
                />
                <div
                  class="fv-plugins-message-container mt-3"
                  v-if="!itemDetails.calibration_date"
                >
                  <div class="fv-help-block">
                    <ErrorMessage name="calibration_date" />
                  </div>
                </div>
                <!--end::Input-->
              </div>
              <!--end::Col-->
              <!--begin::Col-->
              <div class="col-md-6 fv-row mb-8 mb-sd-8">
                <!--begin::Label-->
                <label
                  class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Calibration Due Date</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-date-picker
                  type="date"
                  name="calibration_due_date"
                  id="calibration_due_date"
                  v-model="itemDetails.calibration_due_date"
                  @change="setDates($event, 'calibration_due_date')"
                  placeholder="Pick a day"
                  :editable="false"
                />
                <div
                  class="fv-plugins-message-container mt-3"
                  v-if="!itemDetails.calibration_due_date"
                >
                  <div class="fv-help-block">
                    <ErrorMessage name="calibration_due_date" />
                  </div>
                </div>
                <!--end::Input-->
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->

            <!-- extra fields -->
            <div class="row mb-6">
              <!--begin::Label-->
              <label
                class="col-lg-3 col-form-label required fw-bold text-gray-700 fw-semobold fs-6 text-nowrap"
                >Vendor Name</label
              >
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-9 fv-row">
                <Field
                  type="text"
                  name="vendor_name"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter vendor name..."
                  v-model="itemDetails.vendor_name"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="vendor_name" />
                  </div>
                </div>
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->

            <div class="row mb-6">
              <div class="form-group col-lg-12 col-md-12">
                <label
                  class="col-lg-4 col-form-label required fs-6 fw-bold text-gray-700 text-nowrap mb-2"
                  >Accessories's List</label
                >
                <el-form-item class="d-flex flex-column mb-8 fv-row">
                  <el-select
                    v-model="itemDetails.accessories_list"
                    multiple
                    filterable
                    allow-create
                    :reserve-keyword="false"
                    placeholder="Enter accessories name and select it to add..."
                  >
                    <el-option
                      v-for="(item, index) in itemDetails.accessories_list"
                      :key="index"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </el-form-item>
              </div>
            </div>

            <!--begin::Input group-->
            <div class="row mb-6">
              <!--begin::Col-->
              <div class="col-md-6 fv-row mb-8 mb-sd-8">
                <!--begin::Label-->
                <label
                  class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Date of Instrument</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-date-picker
                  type="date"
                  name="doi"
                  id="doi"
                  v-model="itemDetails.doi"
                  @change="setDates($event, 'doi')"
                  placeholder="Pick a day"
                  :editable="false"
                />
                <div class="fv-plugins-message-container mt-3">
                  <div class="fv-help-block">
                    <ErrorMessage name="doi" />
                  </div>
                </div>
                <!--end::Input-->
              </div>
              <!--end::Col-->

              <div class="col-md-6 mb-8 mb-sd-8">
                <label
                  class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap"
                  >Is Manual Available?
                </label>
                <div class="input-group gap-6">
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      value="1"
                      v-model="itemDetails.manual_available"
                      @change="handleManualData"
                      id="yes"
                      name="manual_available"
                    />
                    <label
                      for="yes"
                      class="form-check-label fw-bold text-gray-700 text-nowrap"
                      >Yes</label
                    >
                  </div>

                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      value="0"
                      v-model="itemDetails.manual_available"
                      @change="handleManualData"
                      id="no"
                      name="manual_available"
                    />
                    <label
                      for="no"
                      class="form-check-label fw-bold text-gray-700 text-nowrap"
                      >No</label
                    >
                  </div>
                </div>
              </div>
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="row mb-6" v-if="itemDetails.manual_available == '1'">
              <!--begin::Label-->
              <label class="col-lg-3 col-form-label fw-semobold fs-6"
                >Upload Manual</label
              >
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-9">
                <!--begin::Row-->
                <div class="row">
                  <!--begin::Col-->
                  <div
                    v-if="itemDetails.manual_file == ''"
                    class="form-group col-md-12 mb-8 mb-sd-8"
                  >
                    <div class="position-relative">
                      <label
                        class="w-100 bg-gray-200 min-h-100px btn btn-outline btn-outline-dashed btn-outline-default d-flex align-items-center position-relative"
                      >
                        <div
                          class="m-6 position-absolute fs-1 top-50 start-50 translate-middle"
                        >
                          <i class="bi bi-upload fs-1"></i>

                          <p class="fs-3 text-gray-700">
                            Browse File to upload
                          </p>
                        </div>
                        <input
                          type="file"
                          @change="handleManualChange"
                          accept=".pdf"
                          class="position-absolute top-0 start-0 end-0 bottom-0 opacity-0 w-100 h-100"
                        />
                      </label>
                    </div>
                    <div
                      v-if="
                        uploadProgressForManual &&
                        uploadProgressForManual > 0 &&
                        uploadProgressForManual <= 100
                      "
                      class="h-10px min-w-100 d-flex flex-stack py-4"
                    >
                      <div
                        class="progress progress-bar bg-primary d-flex align-items-center justify-content-center"
                        role="progressbar"
                        :style="`width: ${uploadProgressForManual}%`"
                        :aria-valuenow="uploadProgressForManual"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                      <div class="d-flex flex-column align-items-end ms-2">
                        {{ `${uploadProgressForManual}%` }}
                      </div>
                    </div>
                  </div>
                  <div
                    v-if="
                      itemDetails.manual_file != '' &&
                      manualData.file_name == ''
                    "
                    class="notice d-flex bg-light-primary rounded border-primary border min-w-lg-600px flex-shrink-0 p-6"
                  >
                    <!--begin::Icon-->
                    <KTIcon
                      icon-name="file"
                      icon-class="fs-2tx text-primary me-4"
                    />
                    <!--end::Icon-->

                    <!--begin::Wrapper-->
                    <div
                      class="d-flex flex-stack flex-grow-1 flex-wrap flex-md-nowrap"
                    >
                      <!--begin::Content-->
                      <div class="mb-3 mb-md-0 fw-semobold">
                        <h4 class="text-gray-800 fw-bold cursor-pointer">
                          <a
                            target="blank"
                            v-bind:href="`https://api.zeptac.com/storage/company/${itemDetails.company_id}/instruments/${itemDetails.manual_file}`"
                            data-toggle="tooltip"
                            title="preview file"
                            class="underline"
                            >{{ itemDetails.manual_file }}
                          </a>
                        </h4>
                      </div>
                      <!--end::Content-->

                      <!--begin::Action-->

                      <KTIcon
                        data-toggle="tooltip"
                        title="remove file"
                        icon-name="cross"
                        class="cursor-pointer fs-2tx text-danger rounded"
                        @click="removeManualFromTemp"
                        icon-class="fs-1"
                      />
                      <!--end::Action-->
                    </div>
                    <!--end::Wrapper-->
                  </div>
                  <div
                    v-else-if="manualData.file_name != ''"
                    class="notice d-flex bg-light-primary rounded border-primary border min-w-lg-600px flex-shrink-0 p-6"
                  >
                    <!--begin::Icon-->
                    <KTIcon
                      icon-name="file"
                      icon-class="fs-2tx text-primary me-4"
                    />
                    <!--end::Icon-->

                    <!--begin::Wrapper-->
                    <div
                      class="d-flex flex-stack flex-grow-1 flex-wrap flex-md-nowrap"
                    >
                      <!--begin::Content-->
                      <div class="mb-3 mb-md-0 fw-semobold">
                        <h4 class="text-gray-800 fw-bold cursor-pointer">
                          <a
                            target="blank"
                            v-bind:href="`https://api.zeptac.com/storage/temporary/${itemDetails.manual_file}`"
                            data-toggle="tooltip"
                            title="preview file"
                            class="underline"
                            >{{ itemDetails.manual_file }}
                          </a>
                        </h4>
                        <div class="fs-6 text-gray-600 pe-7">
                          {{ manualData.file_size.toFixed(2) }} MB
                        </div>
                      </div>
                      <!--end::Content-->

                      <!--begin::Action-->

                      <KTIcon
                        data-toggle="tooltip"
                        title="remove file"
                        icon-name="cross"
                        class="cursor-pointer fs-2tx text-danger rounded"
                        @click="removeManualFromTemp"
                        icon-class="fs-1"
                      />
                      <!--end::Action-->
                    </div>
                    <!--end::Wrapper-->
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
              <!--begin::Col-->
              <div class="col-md-6 mb-8 mb-sd-8">
                <label
                  class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap"
                  >Is Software Available?
                </label>
                <div class="input-group gap-6">
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      value="1"
                      v-model="itemDetails.software_available"
                      id="yes"
                      name="software_available"
                    />
                    <label
                      for="yes"
                      class="form-check-label fw-bold text-gray-700 text-nowrap"
                      >Yes</label
                    >
                  </div>

                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      value="0"
                      v-model="itemDetails.software_available"
                      id="no"
                      name="software_available"
                    />
                    <label
                      for="no"
                      class="form-check-label fw-bold text-gray-700 text-nowrap"
                      >No</label
                    >
                  </div>
                </div>
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="row mb-6">
              <div class="form-group col-md-12">
                <label
                  class="col-lg-4 col-form-label required fw-semobold fs-6 fw-bold text-gray-700 text-nowrap"
                  >Location</label
                >
                <Field
                  type="text"
                  name="location"
                  v-model="itemDetails.location"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter location..."
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="location" />
                  </div>
                </div>
              </div>
            </div>
            <!--end::Input group-->
          </div>
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <span
              ref="submitButton"
              class="btn btn-primary w-sd-25 w-lg-25"
              @click="submit"
            >
              <span class="indicator-label"> Update </span>
              <span class="indicator-progress">
                Please wait...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </span>
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
import { defineComponent, onMounted, ref } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import {
  getReferenceInstrument,
  updateReferenceInstrument,
  getCompanies,
  removeImage,
  uploadImage,
} from "@/stores/api";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import packages from "@/core/config/PackagesConfig";
import { limit, Identifier } from "@/core/config/WhichUserConfig";
import { useAuthStore } from "@/stores/auth";
import { useRouter, useRoute } from "vue-router";
import ApiService from "@/core/services/ApiService";
import moment from "moment";

interface ItemDetails {
  instrument_id: string;
  parameter: string;
  name: string;
  model_no: string;
  serial_no: string;
  make: string;

  calibration_date: string;
  calibration_due_date: string;

  ranges_from: string;
  ranges_to: string;
  accuracy: string;
  uncertainty: string;

  resolution: string;
  vendor_name: "";
  accessories_list: [];

  doi: string;
  manual_available: string;
  manual_file: string;
  software_available: string;
  location: string;
  certificate_no: string;

  company_id: string;
  created_by: string;
  updated_by: string;
  is_active: number;
}

export default defineComponent({
  name: "reference-instrument-add",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  setup() {
    const submitButton = ref<null | HTMLButtonElement>(null);

    const identifier = Identifier;
    const loading = ref(false);
    const auth = useAuthStore();
    const router = useRouter();
    const route = useRoute();
    const User = auth.GetUser();
    const Companies = ref([{ id: "", company_name: "" }]);
    let limit = ref(500);
    const itemId = route.params.id;

    const itemDetailsValidator = Yup.object().shape({
      instrument_id: Yup.string().required().label("Instrument Id"),
      parameter: Yup.string().required().label("Parameter"),
      name: Yup.string().required().label("Instrument Name"),
      model_no: Yup.string().required().label("Model No."),
      serial_no: Yup.string().required().label("Serial No."),
      make: Yup.string().required().label("Made by"),

      ranges_from: Yup.string().required().label("Range from"),
      ranges_to: Yup.string().required().label("Range to"),
      accuracy: Yup.string().required().label("Accuracy"),
      uncertainty: Yup.string().required().label("Uncertainity"),

      resolution: Yup.string().required().label("resolution"),
      location: Yup.string().required().label("Location"),
      manual_available: Yup.string().required(),
      software_available: Yup.string().required(),
      vendor_name: Yup.string().required().label("Accuracy"),
      certificate_no: Yup.string().required().label("Certificate Number"),
    });

    const getdropcomp = async () => {
      try {
        ApiService.setHeader();
        const response = await getCompanies(`fetchAll=true`);

        if (response.success) {
          if (response.result != null && response.result) {
            Companies.value.push(
              ...response.result?.map(({ created_at, ...rest }) => ({
                ...rest,
                created_at: moment(created_at).format("DD-MM-YYYY"),
              }))
            );
          }
        } else {
          console.error(
            `Error Occured in getCompanies : ${
              response.message || "Error Occured in API"
            }`
          );
        }
      } catch (err) {
        console.error(`Error Occured in getCompanies : ${err}`);
      }
    };

    const manualData = ref({
      file_name: "",
      file: "",
      file_size: 0,
    });

    // CONSTANT
    const MAX_FILE_SIZE = 1024 ** 2; // 1 MB

    const itemDetails = ref<ItemDetails>({
      instrument_id: "",
      parameter: "",
      name: "",
      model_no: "",
      serial_no: "",
      make: "",
      calibration_date: "",
      calibration_due_date: "",

      ranges_from: "",
      ranges_to: "",
      accuracy: "",
      uncertainty: "",

      resolution: "",
      vendor_name: "",
      accessories_list: [],

      doi: "",
      manual_available: "",
      manual_file: "",
      software_available: "",
      location: "",
      certificate_no: "",

      company_id: "",
      created_by: "",
      updated_by: "",
      is_active: 1,
    });

    /* --------SET DATE LOGIC--------*/
    async function setDates(e, dateType) {
      try {
        if (e != null) {
          if (e != "" && e != null) {
            itemDetails.value[dateType] = moment(e).format("YYYY-MM-DD");
          } else {
            itemDetails.value[dateType] = "";
          }
        } else {
          itemDetails.value[dateType] = "";
        }
      } catch (err) {
        itemDetails.value[dateType] = "";
      }

      console.log(dateType, " ", itemDetails.value[dateType]);
    }

    onMounted(async () => {
      Companies.value.pop();

      try {
        let response = await getReferenceInstrument(itemId.toString());
        if (response?.success) {
          itemDetails.value = {
            instrument_id: response.result.instrument_id,
            name: response.result.name,
            parameter: response.result.parameter,
            model_no: response.result.model_no,
            serial_no: response.result.serial_no,
            make: response.result.make,

            ranges_from: response.result.ranges_from,
            ranges_to: response.result.ranges_to,
            accuracy: response.result.accuracy,
            uncertainty: response.result.uncertainty,
            resolution: response.result.resolution,

            calibration_date: response.result.calibration_date,
            calibration_due_date: response.result.calibration_due_date,

            doi: response.result.doi,
            vendor_name: response.result.vendor_name,
            accessories_list: JSON.parse(response.result.accessories_list),
            location: response.result.location,
            certificate_no: response.result.certificate_no,

            manual_available: response.result.manual_available,
            manual_file: response.result.manual_file
              ? response.result.manual_file
              : "",
            software_available: response.result.software_available,

            company_id: response.result.company_id
              ? response.result.company_id
              : "",
            created_by: response.result.created_by,
            updated_by: response.result.updated_by,
            is_active: response.result.is_active,
          };
        } else {
          console.error(
            `Error Occured in getReferenceInstrument : ${
              response.message || "Error Occured in API"
            }`
          );
        }
      } catch (err) {
        console.error(`Error Occured in getReferenceInstrument : ${err}`);
      }

      if (User.role_id === 1) {
        await getdropcomp();
      }
    });

    const handleManualData = async (e) => {
      if (e.target.value == 0) {
        if (manualData.value.file_name != "") {
          const deleteFromServer = async () => {
            try {
              const response = await removeImage(manualData.value);

              if (response.success) {
                itemDetails.value.manual_file = "";
                manualData.value = {
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
                throw new Error(
                  response.message || "Failed to remove the file."
                );
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

          return await deleteFromServer();
        }
        itemDetails.value.manual_file = "";
        manualData.value = {
          file_name: "",
          file_size: 0,
          file: "",
        };
      } else if (e.target.value == 1) {
        itemDetails.value.manual_file = "";
        manualData.value = {
          file_name: "",
          file_size: 0,
          file: "",
        };
      }
    };

    /* Manual Logic */

    const uploadProgressForManual = ref<number>(0);

    const handleManualChange = async (event: any) => {
      const selectedFile = event.target?.files?.[0];
      const allowedTypes = ["application/pdf"];

      if (!selectedFile) {
        alert("Please Select a file");
        return;
      }

      if (selectedFile.size > MAX_FILE_SIZE) {
        alert("File size should be less than 1 MB");
        return;
      }

      manualData.value.file_size = selectedFile.size / 1024 ** 2;

      if (allowedTypes.includes(selectedFile.type)) {
        await uploadTraceabilityFile(selectedFile);
      } else {
        manualData.value.file = "";
        alert("Please select a valid file");
      }

      console.log(manualData.value);
    };

    const removeManualFromTemp = async () => {
      if (itemDetails.value.manual_file && manualData.value.file_name === "") {
        var confirmChange = confirm(
          "Do you really want to change Traceability file?"
        );
        if (!confirmChange) {
          return;
        }

        itemDetails.value.manual_file = "";
        // Continue with the rest of your code here
        return;
      }

      if (
        itemDetails.value.manual_file === "" &&
        manualData.value.file_name === ""
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
          const response = await removeImage(manualData.value);

          if (response.success) {
            itemDetails.value.manual_file = "";
            manualData.value = {
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

    const uploadTraceabilityFile = async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("file_name", manualData.value.file_name);

      const onUploadProgress = (progressEvent) => {
        const { loaded, total } = progressEvent;
        const percentage = Math.floor((loaded / total) * 100);
        uploadProgressForManual.value = percentage;
      };

      try {
        await simulateTraceabilityUploadProgress();
        const response = await uploadImage(formData, onUploadProgress);
        itemDetails.value.manual_file = response.modifiedFileName;
        manualData.value.file_name = response.modifiedFileName;
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        finalizeTraceabilityProgress();
      }

      manualData.value.file = file;
    };

    const simulateTraceabilityUploadProgress = async () => {
      uploadProgressForManual.value = 0;
      const interval = setInterval(() => {
        if (uploadProgressForManual.value < 100) {
          uploadProgressForManual.value += 10; // Adjust this value for smoother progress
        } else {
          clearInterval(interval);
        }
      }, 200); // Adjust the interval duration as needed
    };

    const finalizeTraceabilityProgress = () => {
      uploadProgressForManual.value = 100; // Ensure progress bar is complete
      setTimeout(() => {
        uploadProgressForManual.value = 0; // Reset progress bar after a short delay
      }, 100);
    };

    const validateForm = (formData) => {
      for (const key in formData) {
        let value = formData[key];
        if (key !== "manual_file" && key !== "updated_by") {
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
      loading.value = true;

      const result = validateForm(itemDetails);
      console.log(itemDetails.value, result);
      if (result == false) {
        showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
        loading.value = false;
        return;
      }

      try {
        if (submitButton.value) {
          // Activate indicator
          submitButton.value.setAttribute("data-kt-indicator", "on");
        }

        // Call your API here

        const response = await updateReferenceInstrument(
          itemId,
          itemDetails.value
        );

        if (response?.success) {
          // Handle successful API response

          showSuccessAlert(
            "Success",
            response.message || "Instrument has been successfully inserted!"
          );

          router.push({ name: "reference-instrument-list" });
        } else {
          // Handle API error response
          loading.value = false;
          showErrorAlert("Error", response.message || "An error occurred.");
        }
      } catch (error) {
        // Handle any other errors during API call
        console.error("API call error:", error);
        showErrorAlert("Error", "An error occurred during the API call.");
      } finally {
        if (submitButton.value) {
          submitButton.value.removeAttribute("data-kt-indicator");
        }
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
      submitButton,
      itemDetails,
      itemDetailsValidator,
      submit,
      loading,
      packages,
      limit,
      identifier,
      Companies,
      User,
      setDates,

      handleManualChange,
      uploadProgressForManual,
      manualData,
      removeManualFromTemp,
      handleManualData,
    };
  },
});
</script>