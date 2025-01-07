<template>
  <!--begin::Stepper-->
  <div
    class="stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid"
    id="kt_modal_create_app_stepper"
    ref="createAppStepperRef"
  >
    <!--begin::Aside-->
    <div
      class="card d-flex justify-content-center justify-content-xl-start flex-row-auto w-100 w-xl-300px w-xxl-400px me-9"
    >
      <!--begin::Wrapper-->
      <div class="card-body px-6 px-lg-10 px-xxl-15 py-20">
        <!--begin::Nav-->
        <div class="stepper-nav">
          <!--begin::Step 1-->
          <div class="stepper-item current" data-kt-stepper-element="nav">
            <div class="stepper-wrapper">
              <!--begin::Icon-->
              <div class="stepper-icon w-40px h-40px">
                <i class="stepper-check fas fa-check"></i>
                <span class="stepper-number">1</span>
              </div>
              <!--end::Icon-->

              <!--begin::Label-->
              <div class="stepper-label">
                <h3 class="stepper-title">Report Details</h3>

                <div class="stepper-desc fw-semobold">fill report details</div>
              </div>
              <!--end::Label-->
            </div>

            <!--begin::Line-->
            <div class="stepper-line h-40px"></div>
            <!--end::Line-->
          </div>
          <!--end::Step 1-->

          <!--begin::Step 2-->
          <div class="stepper-item" data-kt-stepper-element="nav">
            <div class="stepper-wrapper">
              <!--begin::Icon-->
              <div class="stepper-icon w-40px h-40px">
                <i class="stepper-check fas fa-check"></i>
                <span class="stepper-number">2</span>
              </div>
              <!--end::Icon-->

              <!--begin::Label-->
              <div class="stepper-label">
                <h3 class="stepper-title">Thermal Instrument Selection</h3>
                <div class="stepper-desc fw-semobold text-wrap">
                  pick unique instruments based on testo CSV files
                </div>
              </div>
              <!--end::Label-->
            </div>
            <!--begin::Line-->
            <div class="stepper-line h-40px"></div>
            <!--end::Line-->
          </div>
          <!--end::Step 2-->

          <!--begin::Step 3-->
          <div class="stepper-item" data-kt-stepper-element="nav">
            <div class="stepper-wrapper">
              <!--begin::Icon-->
              <div class="stepper-icon w-40px h-40px">
                <i class="stepper-check fas fa-check"></i>
                <span class="stepper-number">3</span>
              </div>
              <!--end::Icon-->

              <!--begin::Label-->
              <div class="stepper-label">
                <h3 class="stepper-title">Files</h3>
                <div class="stepper-desc fw-semobold">
                  provide testo CSV files based on instrument selected
                </div>
              </div>
              <!--end::Label-->
            </div>
          </div>
          <!--end::Step 3-->
        </div>
        <!--end::Nav-->
      </div>
      <!--end::Wrapper-->
    </div>
    <!--begin::Aside-->

    <!--begin::Content-->
    <div class="card d-flex flex-row-fluid flex-center">
      <!--begin::Form-->
      <form
        class="py-20 w-100 w-xl-100 px-9"
        novalidate
        id="kt_create_account_form"
        @submit="handleStep"
      >
        <!--begin::Step 1-->
        <div class="current" data-kt-stepper-element="content">
          <!--begin::Wrapper-->
          <div class="w-100">
            <!--begin::Heading-->
            <div class="pb-10 pb-lg-10">
              <!--begin::Title-->
              <h2 class="fw-bold d-flex align-items-center text-dark">
                <span class="badge-light-primary rounded p-3">
                  Thermal Mapping Report Details
                </span>
              </h2>
              <!--end::Title-->
            </div>
            <!--end::Heading-->

            <div class="row mb-6">
              <div class="form-group col-12">
                <label
                  class="d-flex align-items-center fs-5 fw-semobold mb-4 col-lg-4 col-form-label required text-gray-700 text-nowrap"
                >
                  <span>Returnable Gate Pass</span>
                  <i
                    class="fas fa-exclamation-circle ms-2 fs-7"
                    v-tooltip
                    title="Select at least one engineer"
                  ></i>
                </label>
                <div>
                  <el-select
                    v-model="itemDetails.rgp_id"
                    filterable
                    placeholder="Please Select GatePass"
                    @change="fetchRGP(itemDetails.rgp_id)"
                  >
                    <el-option
                      value=""
                      disabled="disabled"
                      label="Please Select GatePass"
                      key=""
                    >
                      Please Select GatePass</el-option
                    >
                    <el-option
                      v-for="item in RGatePasses"
                      :key="item.id"
                      :value="item.id"
                      :label="item.rgp_no"
                    />
                  </el-select>
                </div>
              </div>
            </div>

            <!--begin::Input group-->
            <div class="row mb-6" v-if="itemDetails.rgp_id">
              <!--begin::Col-->
              <div class="col-md-6 fv-row mb-8 mb-sd-8">
                <!--begin::Label-->
                <label class="fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Customer :</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <div class="form-control form-control-lg form-control-solid">
                  <div>
                    {{ RgpData?.quotation.customer.company_name || "" }}
                  </div>
                  <div class="mt-2 pt-4">
                    <h6 class="mt-5">Billing Address:</h6>
                    <div class="mt-2">
                      <div class="mb-1">
                        <br />
                        <span v-show="RgpData?.quotation.customer.company_name">
                          {{
                            `${RgpData?.quotation.customer.company_name || ""}`
                          }}
                        </span>
                        <br />
                        <span>
                          {{ `${RgpData?.quotation.customer.name || ""}` }}
                        </span>
                        <!-- v-if company_data present -->
                        <div v-show="RgpData?.quotation.customer.company_name">
                          <br />
                          <span>
                            {{
                              `${RgpData?.quotation.customer.address1 || ""}`
                            }}
                          </span>
                          <br />
                          <span>
                            {{
                              `${RgpData?.quotation.customer.address2 || ""}`
                            }}
                          </span>
                        </div>
                        <div v-show="RgpData?.quotation.customer.country">
                          <span>
                            {{
                              `${RgpData?.quotation.customer.city || ""} - ${
                                RgpData?.quotation.customer.pincode || ""
                              }`
                            }}
                          </span>
                          <br />
                          <span>
                            {{
                              `${RgpData?.quotation.customer.state || ""} ${
                                RgpData?.quotation.customer.country || ""
                              }`
                            }}
                          </span>
                          <br />
                        </div>
                      </div>
                      <br />
                    </div>
                  </div>
                </div>

                <!--end::Input-->
              </div>
              <!--end::Col-->
              <!--begin::Col-->
              <div class="col-md-6 fv-row mb-8 mb-sd-8">
                <!--begin::Label-->
                <label class="fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Client :</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <div class="form-control form-control-lg form-control-solid">
                  <div>{{ RgpData?.quotation.clientx.company_name || "" }}</div>
                  <div class="mt-2 pt-4">
                    <h6 class="mt-5">Site Address:</h6>
                    <div class="mt-2">
                      <div class="mb-1" v-show="RgpData?.quotation.clientx">
                        <br />
                        <span v-show="RgpData?.quotation.clientx.company_name">
                          {{
                            `${RgpData?.quotation.clientx.company_name || ""}`
                          }}
                        </span>
                        <br />
                        <span>
                          {{ `${RgpData?.quotation.clientx.name || ""}` }}
                        </span>
                        <!-- v-if company_data present -->
                        <div v-show="RgpData?.quotation.clientx.company_name">
                          <br />
                          <span>
                            {{ `${RgpData?.quotation.clientx.address1 || ""}` }}
                          </span>
                          <br />
                          <span>
                            {{ `${RgpData?.quotation.clientx.address2 || ""}` }}
                          </span>
                        </div>
                        <div v-show="RgpData?.quotation.clientx.country">
                          <span>
                            {{
                              `${RgpData?.quotation.clientx.city || ""} - ${
                                RgpData?.quotation.clientx.pincode || ""
                              }`
                            }}
                          </span>
                          <br />
                          <span>
                            {{
                              `${RgpData?.quotation.clientx.state || ""} ${
                                RgpData?.quotation.clientx.country || ""
                              }`
                            }}
                          </span>
                          <br />
                        </div>
                      </div>
                      <br />
                    </div>
                  </div>
                </div>

                <!--end::Input-->
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="row mb-6">
              <!--begin::Col-->
              <div class="col-md-6 fv-row mb-8 mb-sd-8">
                <!--begin::Label-->
                <label
                  class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Validation Start Date</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-date-picker
                  type="date"
                  name="val_start_date"
                  id="val_start_date"
                  placeholder="Pick a Day"
                  @change="setDates($event, 'val_start_date')"
                  v-model="itemDetails.val_start_date"
                  :editable="false"
                />
                <!--end::Input-->
              </div>
              <!--end::Col-->
              <!--begin::Col-->
              <div class="col-md-6 fv-row mb-8 mb-sd-8">
                <!--begin::Label-->
                <label
                  class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Start Time</label
                >
                <!--end::Label-->
                <!--begin::Input-->
                <el-time-picker
                  name="start_time"
                  id="start_time"
                  v-model="itemDetails.start_time"
                  placeholder="Pick a Day"
                  @change="setTimes($event)"
                />
                <!--end::Input-->
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->

            <!-- extra fields -->
            <div class="row mb-6">
              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fw-semobold fw-bold text-gray-700 fs-6 text-nowrap"
                  >Acceptance Criteria for Temperature</label
                >
                <Field
                  type="text"
                  name="acc_for_temp"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter Criteria for Temperature"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="acc_for_temp" />
                  </div>
                </div>
              </div>

              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6 text-nowrap"
                  >Acceptance Criteria for Humidity</label
                >
                <Field
                  type="text"
                  name="acc_for_rh"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter Criteria for Humidity"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="acc_for_rh" />
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
                  >Room Name</label
                >
                <Field
                  type="text"
                  name="room_name"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter Room Name"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="room_name" />
                  </div>
                </div>
              </div>

              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                  >Mapping Duration</label
                >
                <Field
                  type="number"
                  name="mapping_duration"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter Mapping Duraction (in hours)"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="mapping_duration" />
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
                  >Data Logging Interval</label
                >
                <Field
                  type="number"
                  name="logging_interval"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter logging interval (in minutes)"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="logging_interval" />
                  </div>
                </div>
              </div>

              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                  >Data Logger Used</label
                >
                <Field
                  type="text"
                  name="logger_used"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Number of data loggers used"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="logger_used" />
                  </div>
                </div>
              </div>
            </div>
            <!--end::Input group-->
          </div>
          <!--end::Wrapper-->
        </div>
        <!--end::Step 1-->

        <!--begin::Step 2-->
        <div data-kt-stepper-element="content">
          <!--begin::Wrapper-->
          <div class="w-100">
            <!--begin::Heading-->
            <div class="pb-10 pb-lg-10">
              <!--begin::Title-->
              <h2 class="fw-bold d-flex align-items-center text-dark">
                <span class="badge-light-primary rounded p-3">
                  Instrument Selection
                </span>
              </h2>
              <!--end::Title-->
            </div>
            <!--end::Heading-->

            <div class="card-header border-0 pt-6">
              <!--begin::Card title-->
              <div class="card-title flex-md-row flex-lg-row flex-column gap-6">
                <div class="d-flex align-items-center position-relative my-3">
                  <el-select
                    name="fromInstrumentId"
                    v-model="fromInstrumentId"
                    class="mw-250px"
                    placeholder="From Instrument ID"
                    @change="handleFrom"
                  >
                    <el-option
                      v-for="instrument in instrumentsFrom"
                      :key="instrument.id"
                      :value="instrument.id"
                      :label="instrument.instrument_id"
                    />
                  </el-select>
                </div>

                <div class="d-flex align-items-center position-relative my-3">
                  <el-select
                    name="toInstrumentId"
                    filterable
                    placeholder="To Instrument ID"
                    class="mw-250px"
                    v-model="toInstrumentId"
                    :disabled="disabelRef"
                    @change="handleTo"
                  >
                    <el-option
                      v-for="instrument in instrumentsTo"
                      :key="instrument.id"
                      :value="instrument.id"
                      :label="instrument.instrument_id"
                    />
                  </el-select>
                </div>
              </div>
              <!--begin::Card title-->
            </div>

            <div class="card-body pt-0">
              <TableContent
                :data="tableData"
                :header="tableHeader"
                :items-per-page-dropdown-enabled="false"
                :loading="loading"
              >
                <template v-slot:checked="{ row: thermal_instruments }">
                  <div
                    class="form-check form-switch form-check-custom form-check-success form-check-solid"
                  >
                    <input
                      class="form-check-input w-60px"
                      type="checkbox"
                      v-model="thermal_instruments.checked"
                      @click="
                        toggleInstrument(
                          $event,
                          thermal_instruments.id,
                          thermal_instruments.instrument_id,
                          thermal_instruments.name,
                          thermal_instruments.serial_no,
                          thermal_instruments.calibration_date,
                          thermal_instruments.calibration_due_date
                        )
                      "
                    />
                  </div>
                </template>
                <template v-slot:instrument_id="{ row: thermal_instruments }">
                  {{ thermal_instruments.instrument_id }}
                </template>
                <template v-slot:name="{ row: thermal_instruments }">
                  {{ thermal_instruments.name }}
                </template>
                <template v-slot:model_no="{ row: thermal_instruments }">
                  {{ thermal_instruments.model_no }}
                </template>
                <template v-slot:ranges="{ row: thermal_instruments }">
                  {{ thermal_instruments.ranges }}
                </template>
                <template v-slot:accuracy="{ row: thermal_instruments }">
                  {{ thermal_instruments.accuracy }}
                </template>
                <template v-slot:serial_no="{ row: thermal_instruments }">
                  {{ thermal_instruments.serial_no }}
                </template>
                <!-- defualt data -->
                <template v-slot:make="{ row: thermal_instruments }">
                  {{ thermal_instruments.make }}
                </template>
                <template
                  v-slot:calibration_date="{ row: thermal_instruments }"
                >
                  {{ thermal_instruments.calibration_date }}
                </template>
                <template
                  v-slot:calibration_due_date="{ row: thermal_instruments }"
                >
                  {{ thermal_instruments.calibration_due_date }}
                </template>
              </TableContent>
            </div>
          </div>
          <!--end::Wrapper-->
        </div>
        <!--end::Step 2-->

        <!--begin::Step 3-->
        <div data-kt-stepper-element="content">
          <!--begin::Wrapper-->
          <div class="w-100">
            <!--begin::Heading-->
            <div class="pb-10 pb-lg-15">
              <!--begin::Title-->
              <h2 class="fw-bold d-flex align-items-center text-dark">
                Import CSV File
              </h2>
              <!--end::Title-->
            </div>
            <!--end::Heading-->

            <div class="row mb-6">
              <div class="form-group col-md-12 mb-8 mb-sd-8">
                <label
                  class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap"
                  >Upload File
                </label>
                <label
                  class="btn btn-outline btn-outline-dashed btn-outline-default p-10 d-flex align-items-center position-relative"
                >
                  <i
                    class="bi bi-upload position-absolute fs-1 top-50 start-50 translate-middle"
                  ></i>
                  <input
                    type="file"
                    accept=".xls"
                    @change="handleChange"
                    class="position-absolute top-0 start-0 end-0 bottom-0 opacity-0 w-100 h-100"
                  />
                </label>
              </div>
            </div>
            <ExcelFiles
              v-bind:filesData="itemDetails.excel_data"
              v-on:deleteFile="deleteTheFile"
            />
          </div>
          <!--end::Wrapper-->
        </div>
        <!--end::Step 3-->

        <!--begin::Actions-->
        <div class="d-flex flex-stack pt-10">
          <!--begin::Wrapper-->
          <div class="mr-2">
            <button
              type="button"
              class="btn btn-lg btn-light-primary me-3"
              data-kt-stepper-action="previous"
              @click="previousStep"
            >
              <KTIcon icon-name="arrow-left" icon-class="fs-4 me-1" />
              Back
            </button>
          </div>
          <!--end::Wrapper-->

          <!--begin::Wrapper-->
          <div>
            <button
              type="button"
              class="btn btn-lg btn-primary me-3"
              data-kt-stepper-action="submit"
              v-if="currentStepIndex === totalSteps - 1"
              @click="formSubmit()"
            >
              <span class="indicator-label">
                Submit
                <KTIcon icon-name="arrow-right" icon-class="fs-3 ms-2 me-0" />
              </span>
              <span class="indicator-progress">
                Please wait...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </button>

            <button v-else type="submit" class="btn btn-lg btn-primary">
              Continue
              <KTIcon icon-name="arrow-right" icon-class="fs-4 ms-2 me-0" />
            </button>
          </div>
          <!--end::Wrapper-->
        </div>
        <!--end::Actions-->
      </form>
      <!--end::Form-->
    </div>
    <!--end::Content-->
  </div>
  <!--end::Stepper-->
</template>
  
  <script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  ref,
  watch,
} from "vue";
import { StepperComponent } from "@/assets/ts/components";
import { useForm } from "vee-validate";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";
import moment from "moment";
import * as xlsx from "xlsx";
import ExcelFiles from "./steps/ExcelFiles.vue";

import TableContent from "@/components/kt-datatable/table-partials/table-content/TableContent.vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";

import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import {
  addThermalReport,
  getOnGoingCompletedRGPTherm,
  getRGatePass,
  getThermalInstruments,
} from "@/stores/api";
import ApiService from "@/core/services/ApiService";

interface IStep1 {}

interface IStep2 {}

interface IStep3 {}

interface CreateAccount extends IStep1, IStep2, IStep3 {}

interface Inst {
  id: number;
  instrument_id: string;
}

interface Instrument {
  id: number;
  instrument_id: string;
  name: string;
  model_no: string;
  ranges: string;
  accuracy: string;
  serial_no: string;
  make: string;
  calibration_date: string;
  calibration_due_date: string;
  checked: boolean;
}

interface readingsData {
  id: string;
  temp: number;
  rh: number;
}

interface Data {
  id: string;
  name: string;
  company_name: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

interface Quotation {
  id: string;
  quotation_no: string;
  customer: Data;
  client: Data;
  clientx: Data;
}

interface RGP {
  id: string;
  rgp_no: string;
  quotation_id: string;
}

interface Logger {
  id: string;
  file_name: string;
  file_size: number;
  instrument_name: string;
  logger_id: string;
  data: Array<readingsData>;
  instrument_id: string;
  MAX_TEMP: number;
  MIN_TEMP: number;
  MAX_RH: number;
  MIN_RH: number;
  AVG_TEMP: number;
  AVG_RH: number;
}

interface RGPInformation {
  id: string;
  rgp_no: string;
  quotation_id: string;
  quotation: Quotation;
}

export default defineComponent({
  name: "thermal-report-add",
  components: {
    ErrorMessage,
    Field,
    VForm,
    TableContent,
    ExcelFiles,
  },
  props: [],
  // emits: ["store-excel-file", "deleteExcel"],
  setup() {
    const createAppStepperRef = ref<HTMLElement | null>(null);
    const _stepperObj = ref<StepperComponent | null>(null);
    const currentStepIndex = ref(0);
    const loading = ref(false);

    const auth = useAuthStore();
    const route = useRouter();
    const User = auth.GetUser();

    const RGatePasses = ref<RGP[]>([]);
    const RgpData = ref<RGPInformation>({
      id: "",
      rgp_no: "",
      quotation_id: "",
      quotation: {
        id: "",
        quotation_no: "",
        customer: {
          id: "",
          name: "",
          company_name: "",
          address1: "",
          address2: "",
          city: "",
          pincode: "",
          state: "",
          country: "",
        },
        client: {
          id: "",
          name: "",
          company_name: "",
          address1: "",
          address2: "",
          city: "",
          pincode: "",
          state: "",
          country: "",
        },
        clientx: {
          id: "",
          name: "",
          company_name: "",
          address1: "",
          address2: "",
          city: "",
          pincode: "",
          state: "",
          country: "",
        },
      },
    });

    const itemDetails = ref({
      rgp_id: "",
      sensor_location_diagram: "",
      sensor_location_chart: "",

      instruments: [
        {
          id: "",
          instrument_name: "",
          instrument_id: "",
          serial_no: "",
          calibration_date: "",
          calibration_due_date: "",
        },
      ],
      excel_data: [
        {
          file_name: "",
          id: "",
          instrument_name: "",
          instrument_id: "",
          logger_id: "",
          file_size: 0,
          data: [],
          MAX_TEMP: 0,
          MIN_TEMP: 0,
          MAX_RH: 0,
          MIN_RH: 0,
          AVG_TEMP: 0,
          AVG_RH: 0,
        },
      ],
      room_name: "",
      acc_for_temp: "",
      acc_for_rh: "",
      val_start_date: "",
      start_time: "",
      mapping_duration: 0,
      logging_interval: 0,
      logger_used: 0,

      dates: ref<string[]>([]),

      min_temp: {
        instrument_id: "",
        logger_id: "",
        reading: Number.MAX_VALUE,
      },

      max_temp: {
        instrument_id: "",
        logger_id: "",
        reading: Number.MIN_VALUE,
      },

      min_rh: {
        instrument_id: "",
        logger_id: "",
        reading: Number.MAX_VALUE,
      },

      max_rh: {
        instrument_id: "",
        logger_id: "",
        reading: Number.MIN_VALUE,
      },

      avg_temp: 0,
      avg_rh: 0,

      status: "1",
      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
      is_active: 1,
    });

    /* --------STEP 1 DATA LOGIC--------*/

    // Ref to Store Date-Time
    const dates = ref<string[]>([]);

    // Number of reading === Number of records
    const NUMBER_OF_DATES = 432;

    // Generate dates by using specific interval
    function generateDatesWithInterval(
      startDate: string,
      startTime: string,
      intervalMinutes: number,
      NUMBER_OF_DATES: number
    ) {
      dates.value.splice(0);

      const timePart = moment(startTime).format("HH:mm:ss");
      let currentDateTime = new Date(startDate + " " + timePart);

      for (let i = 0; i < NUMBER_OF_DATES; i++) {
        const formattedDate = moment(currentDateTime).format(
          "YYYY-MM-DD HH:mm:ss"
        );

        dates.value.push(formattedDate);
        currentDateTime.setMinutes(
          currentDateTime.getMinutes() + intervalMinutes
        );
      }

      return dates.value;
    }

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
      console.log(itemDetails.value[dateType]);
    }

    /* --------SET TIME LOGIC--------*/
    async function setTimes(e) {
      try {
        if (e != null) {
          if (e != "" && e != null) {
            itemDetails.value.start_time = await moment(e).format(
              "YYYY-MM-DD HH:mm:ss"
            );
          } else {
            itemDetails.value.start_time = await "";
          }
        } else {
          itemDetails.value.start_time = await "";
        }
      } catch (err) {
        itemDetails.value.start_time = await "";
      }
      console.log(itemDetails.value.start_time);
    }

    /* STEP 2 DATA LOGIC */
    const instrumentsFrom = ref<Inst[]>([]);
    const instrumentsTo = ref<Inst[]>([]);

    const selectedIds = ref<Array<number>>([]);

    const tableHeader = ref([
      {
        columnName: "Add",
        columnLabel: "checked",
        sortEnabled: false,
        columnWidth: 80,
      },
      {
        columnName: "Instrument Id",
        columnLabel: "instrument_id",
        sortEnabled: false,
        columnWidth: 35,
      },
      {
        columnName: "Instrument Name",
        columnLabel: "name",
        sortEnabled: false,
        columnWidth: 75,
      },
      {
        columnName: "Model No",
        columnLabel: "model_no",
        sortEnabled: false,
        columnWidth: 80,
      },
      {
        columnName: "Range",
        columnLabel: "ranges",
        sortEnabled: false,
        columnWidth: 80,
      },
      {
        columnName: "Accuray",
        columnLabel: "accuracy",
        sortEnabled: false,
        columnWidth: 80,
      },
      {
        columnName: "Serial No",
        columnLabel: "serial_no",
        sortEnabled: false,
        columnWidth: 80,
      },
      {
        columnName: "Make",
        columnLabel: "make",
        sortEnabled: false,
        columnWidth: 125,
      },
      {
        columnName: "Calibration Date",
        columnLabel: "calibration_date",
        sortEnabled: false,
        columnWidth: 125,
      },
      {
        columnName: "Calibration Due Date",
        columnLabel: "calibration_due_date",
        sortEnabled: false,
        columnWidth: 125,
      },
    ]);

    const disabelRef = ref(true);

    const fromInstrumentId = ref();
    const toInstrumentId = ref();

    const mainData = ref<Instrument[]>([]);
    const tableData = ref<Instrument[]>([]);

    async function thermal_instrument_listing(): Promise<void> {
      try {
        const response = await getThermalInstruments(`fetchAll=true`);

        if (response.result != null && response.result) {
          mainData.value = response.result?.map(
            ({ id, calibration_date, calibration_due_date, ...rest }) => ({
              id: id,
              calibration_date,
              calibration_due_date,
              ...rest,
              checked: false,
            })
          );

          instrumentsFrom.value.splice(0);
          instrumentsFrom.value = mainData.value.map(
            ({ id, instrument_id }) => ({
              id,
              instrument_id,
            })
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        //console.log("done");
        setTimeout(() => {
          loading.value = false;
        }, 100);
      }
    }

    const toggleInstrument = (
      event,
      id,
      inst_id,
      inst_name,
      inst_srno,
      inst_calib_date,
      inst_calib_due
    ) => {
      console.log(event.target.checked);

      const data = {
        id: id,
        instrument_id: inst_id,
        instrument_name: inst_name,
        serial_no: inst_srno,
        calibration_date: inst_calib_date,
        calibration_due_date: inst_calib_due,
      };

      if (event.target.checked === true) {
        // store the instrument
        // emit("store-instrument", data);
        storeInstrument(data);
      } else {
        // remove the instrument
        // emit("remove-instrument", id);
        removeInstrument(id);
      }
    };

    const handleFrom = async (id: any) => {
      toInstrumentId.value = "";
      disabelRef.value = false;
      console.log(fromInstrumentId.value);

      const indexOfFrom = instrumentsFrom.value.findIndex(
        (item) => item.id == id
      );
      console.log(indexOfFrom);

      instrumentsTo.value = [];
      tableData.value = [];
      selectedIds.value = [];

      instrumentsTo.value = instrumentsFrom.value.slice(indexOfFrom + 1);

      console.log(instrumentsTo.value);

      await removeAllInstrument(selectedIds.value);
    };

    const handleTo = async (id: any) => {
      console.log(toInstrumentId.value);

      tableData.value = await [];
      selectedIds.value = [];

      const indexOfFrom = instrumentsFrom.value.findIndex(
        (item) => item.id == fromInstrumentId.value
      );

      const indexOfTo = instrumentsFrom.value.findIndex(
        (item) => item.id == toInstrumentId.value
      );

      console.log(indexOfFrom);
      console.log(indexOfTo);

      console.log(tableData.value);
      tableData.value = mainData.value
        .slice(indexOfFrom, indexOfTo + 1)
        .map((item) => ({ ...item, checked: false }));
      console.log(tableData.value);

      await removeAllInstrument(selectedIds.value);
      // await emit("remove-all-instrument", selectedIds.value);
    };

    // remove multiple instrument and excel file
    async function removeAllInstrument(selectedIds) {
      // remove the instrument
      itemDetails.value.instruments = selectedIds;
      itemDetails.value.excel_data = [];

      console.log(itemDetails.value.instruments);

      itemDetails.value.min_temp = {
        instrument_id: "",
        logger_id: "",
        reading: Number.MAX_VALUE,
      };

      itemDetails.value.max_temp = {
        instrument_id: "",
        logger_id: "",
        reading: Number.MIN_VALUE,
      };

      itemDetails.value.min_rh = {
        instrument_id: "",
        logger_id: "",
        reading: Number.MAX_VALUE,
      };

      itemDetails.value.max_rh = {
        instrument_id: "",
        logger_id: "",
        reading: Number.MIN_VALUE,
      };

      itemDetails.value.avg_temp = 0;
      itemDetails.value.avg_rh = 0;
    }

    // remove single instrument and excel file
    async function removeInstrument(id) {
      // remove the instrument
      itemDetails.value.instruments = itemDetails.value.instruments.filter(
        (instrument) => instrument.id != id
      );

      if (itemDetails.value.excel_data.length > 0) {
        itemDetails.value.excel_data = itemDetails.value.excel_data.filter(
          (data) => data.id !== id
        );
      }

      await calculateTemperatureAndHumidity;

      console.log(itemDetails.value.instruments);
      console.log(itemDetails.value.excel_data);
    }

    // add single instrument
    async function storeInstrument(data) {
      // store the instrument
      itemDetails.value.instruments.push(data);
    }

    /* STEP 3 DATA LOGIC */

    // Global attributes
    // 432 records are present in the excel
    const range = "A12:D455";
    const instrumentNameCell = "A1";
    const loggerIdCell = "A6";

    const exportToExcel = () => {
      // const worksheet = xlsx.utils.json_to_sheet(ReadingsData.value);
      // const workbook = xlsx.utils.book_new();
      // xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      // xlsx.writeFile(workbook, "exported_data.xlsx");
    };

    const handleChange = async (e) => {
      let fileInput = e.target;
      const file = e.target.files[0];

      try {
        if (file && file.type == "application/vnd.ms-excel") {
          const rows = ref([]);
          const ReadingsData = ref<readingsData[]>([]);

          const tempData = ref<Logger>({
            id: "",
            file_name: "",
            instrument_name: "",
            instrument_id: "",
            logger_id: "",
            file_size: 0,
            data: [],
            MAX_TEMP: 0,
            MIN_TEMP: 0,
            MAX_RH: 0,
            MIN_RH: 0,
            AVG_TEMP: 0,
            AVG_RH: 0,
          });

          // Read the file as an ArrayBuffer
          const arrayBuffer = await file.arrayBuffer();

          // Parse the workbook using xlsx.read
          const wb = xlsx.read(arrayBuffer, { type: "array" });

          console.log(wb);

          /* Update data with records from the specified range */
          rows.value = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {
            range,
          });

          // store instrument name
          const instrumentName =
            wb.Sheets[wb.SheetNames[0]][instrumentNameCell]?.v;
          console.log(instrumentName);

          // store Logger ID
          let loggerId = wb.Sheets[wb.SheetNames[0]][loggerIdCell]?.v;
          console.log(loggerId);

          // store file name
          const fileName = file.name;

          // store file size
          const fileSize = file.size;

          // maaping the data in particular format
          ReadingsData.value = rows.value.map(
            (item: { [key: string]: any }) => {
              return {
                id: item["id"],
                temp: parseFloat(item["CH 1[°C]"]),
                rh: parseFloat(item["CH 2[%rH]"]),
              };
            }
          );

          // finally push this data

          tempData.value.file_name = fileName;
          tempData.value.file_size = fileSize;
          tempData.value.instrument_name = instrumentName;
          tempData.value.logger_id = Number(loggerId).toString();
          tempData.value.data = ReadingsData.value;

          // calculate MAX, MIN of TEMP/RH
          const tempValues = ReadingsData.value.map((data) => data.temp);
          const rhValues = ReadingsData.value.map((data) => data.rh);

          tempData.value.MAX_TEMP = Math.max(...tempValues);
          tempData.value.MIN_TEMP = Math.min(...tempValues);

          tempData.value.MAX_RH = Math.max(...rhValues);
          tempData.value.MIN_RH = Math.min(...rhValues);

          // Calculate average temperature
          const sumTemp = tempValues.reduce(
            (acc, currentValue) => acc + currentValue,
            0
          );
          tempData.value.AVG_TEMP = Number(
            (sumTemp / tempValues.length).toFixed(2)
          );

          // Calculate average relative humidity
          const sumRH = rhValues.reduce(
            (acc, currentValue) => acc + currentValue,
            0
          );
          tempData.value.AVG_RH = Number((sumRH / rhValues.length).toFixed(2));

          console.log(tempData.value);

          storeExcelFile(tempData);
          // await emit("store-excel-file", tempData);

          fileInput.value = "";
        } else {
          alert("Please select .xls file");
        }
      } catch (error) {
        console.error("Error reading the file:", error);
        alert(
          "Error occured during api call. Please reload the page and try again."
        );
      }
    };

    const deleteTheFile = async (index) => {
      deleteExcelFile(index);
    };

    // store excel data if the serial number matches
    async function storeExcelFile(excelData) {
      if (excelData.value) {
        const foundInstrument = itemDetails.value.instruments.find(
          (item) => item.serial_no === excelData.value.logger_id
        );
        if (foundInstrument) {
          if (itemDetails.value.excel_data) {
            const alreadyExist = itemDetails.value.excel_data.find(
              (data) => data["logger_id"] === excelData.value.logger_id
            );
            if (!alreadyExist) {
              excelData.value.instrument_id = foundInstrument.instrument_id;
              excelData.value.instrument_name = foundInstrument.instrument_name;
              excelData.value.id = foundInstrument.id;

              itemDetails.value.excel_data.push(excelData.value);

              // calculate the MIN TEMP
              if (
                itemDetails.value.min_temp.reading > excelData.value.MIN_TEMP
              ) {
                itemDetails.value.min_temp.reading = excelData.value.MIN_TEMP;
                itemDetails.value.min_temp.instrument_id =
                  excelData.value.instrument_id;
                itemDetails.value.min_temp.logger_id =
                  excelData.value.logger_id;
              }

              // calculate the MAX TEMP
              if (
                itemDetails.value.max_temp.reading < excelData.value.MAX_TEMP
              ) {
                itemDetails.value.max_temp.reading = excelData.value.MAX_TEMP;
                itemDetails.value.max_temp.instrument_id =
                  excelData.value.instrument_id;
                itemDetails.value.max_temp.logger_id =
                  excelData.value.logger_id;
              }

              // calculate the MIN RH
              if (itemDetails.value.min_rh.reading > excelData.value.MIN_RH) {
                itemDetails.value.min_rh.reading = excelData.value.MIN_RH;
                itemDetails.value.min_rh.instrument_id =
                  excelData.value.instrument_id;
                itemDetails.value.min_rh.logger_id = excelData.value.logger_id;
              }

              // calculate the MAX RH
              if (itemDetails.value.max_rh.reading < excelData.value.MAX_RH) {
                itemDetails.value.max_rh.reading = excelData.value.MAX_RH;
                itemDetails.value.max_rh.instrument_id =
                  excelData.value.instrument_id;
                itemDetails.value.max_rh.logger_id = excelData.value.logger_id;
              }

              // calculate average temperature
              itemDetails.value.avg_temp =
                (itemDetails.value.min_temp.reading +
                  itemDetails.value.max_temp.reading) /
                2;

              // calculate average humidity
              itemDetails.value.avg_rh =
                (itemDetails.value.min_rh.reading +
                  itemDetails.value.max_rh.reading) /
                2;
            } else {
              Swal.fire({
                icon: "info",
                title: "File Already Uploaded",
                text: "The Excel file with this serial number has already been uploaded. Please ensure you are not uploading duplicate files.",
              });
            }
          }
        } else {
          Swal.fire({
            icon: "info",
            title: "Serial Number Mismatch",
            text: "The provided excel's serial number does not match with any of the selected instruments. Please check and try again.",
          });
        }
      }

      console.log(itemDetails.value.excel_data);
    }

    /* --------HANDLE RGP SELECTION LOGIC--------*/
    const fetchRGP = async (rgpId: any) => {
      if (rgpId !== "") {
        try {
          const response = await getRGatePass(rgpId);

          if (response.success) {
            itemDetails.value.rgp_id = rgpId;
            RgpData.value = { ...response.result };
          } else {
            console.error(
              `Error Occured in getRGatePass : ${
                response.message || "Error Occured in API"
              }`
            );
          }
        } catch (err) {
          console.error(`Error Occured in getRGatePass : ${err}`);
        }
      } else {
      }
    };

    onMounted(async () => {
      itemDetails.value.excel_data.pop();

      try {
        /* --------GET ALL IN PROCESS AND COMPLETED RGP LOGIC--------*/
        const response = await getOnGoingCompletedRGPTherm(User.company_id);

        if (response.success) {
          if (response.result != null && response.result) {
            RGatePasses.value = response.result.map(({ id, ...rest }) => ({
              id: id,
              ...rest,
            }));
          }
        } else {
          console.error(
            `Error Occured in getOnGoingCompletedRGPTherm : ${
              response.message || "Error Occured in API"
            }`
          );
        }
      } catch (err) {
        console.error(`Error Occured in getOnGoingCompletedRGPTherm : ${err}`);
        loading.value = false;
      }

      try {
        await thermal_instrument_listing();
      } catch (err) {
        console.error(`Error Occured in thermal_instrument_listing : ${err}`);
      }

      _stepperObj.value = StepperComponent.createInsance(
        createAppStepperRef.value as HTMLElement
      );
    });

    const createAccountSchema = [
      Yup.object({
        room_name: Yup.string().required().label("Room Name"),
        acc_for_temp: Yup.string()
          .required()
          .label("Acceptance Criteria for temperature"),
        acc_for_rh: Yup.string()
          .required()
          .label("Acceptance Criteria for humidity"),
        mapping_duration: Yup.number().required().label("Mapping duration"),
        logging_interval: Yup.number().required().label("Logging Interval"),
        logger_used: Yup.number().required().label("Number of logger used "),
      }),
    ];

    const currentSchema = computed(() => {
      return createAccountSchema[currentStepIndex.value];
    });

    const { handleSubmit } = useForm<IStep1 | IStep2 | IStep3>({
      // validationSchema: currentSchema,
    });

    const totalSteps = computed(() => {
      if (_stepperObj.value) {
        return _stepperObj.value.totalStepsNumber;
      } else {
        return 1;
      }
    });

    const handleStep = handleSubmit(async (values) => {
      // resetForm({});

      if (currentStepIndex.value === 0) {
        itemDetails.value.room_name = values["room_name"];
        itemDetails.value.acc_for_temp = values["acc_for_temp"];
        itemDetails.value.acc_for_rh = values["acc_for_rh"];
        itemDetails.value.mapping_duration = values["mapping_duration"];
        itemDetails.value.logging_interval = values["logging_interval"];
        itemDetails.value.logger_used = values["logger_used"];

        // generate the array of date-time
        if (
          itemDetails.value.val_start_date == "" ||
          itemDetails.value.start_time == ""
        ) {
          Swal.fire({
            icon: "info",
            title: "Please select Start Date and start Time",
          });
          return;
        }

        // check fields are numeric
        if (
          isNaN(itemDetails.value.logging_interval) ||
          isNaN(itemDetails.value.mapping_duration) ||
          isNaN(itemDetails.value.logger_used)
        ) {
          Swal.fire({
            icon: "info",
            title:
              "Logging Interval, Mapping Duration and Logger Used must be a number. Please check and try again",
          });
          return;
        }

        const generatedDates = await generateDatesWithInterval(
          itemDetails.value.val_start_date,
          itemDetails.value.start_time,
          itemDetails.value.logging_interval,
          NUMBER_OF_DATES
        );

        itemDetails.value.dates = generatedDates;

        if (itemDetails.value.rgp_id) {
          currentStepIndex.value++;

          console.log(_stepperObj.value);
          if (!_stepperObj.value) {
            return;
          }

          _stepperObj.value.goNext();
        } else {
          Swal.fire({
            icon: "info",
            title: "Please fill all the required fields",
          });
          return;
        }
      } else if (currentStepIndex.value === 1) {
        // Atleat 2 instruments needed (for analysis)
        if (itemDetails.value.instruments.length > 1) {
          currentStepIndex.value++;

          if (!_stepperObj.value) {
            return;
          }

          _stepperObj.value.goNext();
        } else {
          Swal.fire({
            icon: "info",
            title: "Please select at least two instrument.",
          });
          return;
        }
      }
    });

    const previousStep = () => {
      if (!_stepperObj.value) {
        return;
      }

      currentStepIndex.value--;

      _stepperObj.value.goPrev();
    };

    const formSubmit = async () => {
      loading.value = true;

      // check whether selected instruments length and excel files length are same
      if (
        itemDetails.value.excel_data.length !=
        itemDetails.value.instruments.length
      ) {
        Swal.fire({
          icon: "info",
          title: "Data Mismatch",
          text: "Number of files must match with Number of Number of selected instruments. Please check and try again.",
        });
        loading.value = false;
        return;
      }

      try {
        const response = await addThermalReport(itemDetails.value);
        if (response?.success) {
          showSuccessAlert(
            "Success",
            response.message || "Thermal Report have been successfully Added!"
          );

          loading.value = false;
          route.push({ name: "thermal-report-list" });
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
        loading.value = false;
      }
    };

    const removeObjectWithId = (arr, id) => {
      if (id !== -1) {
        arr.splice(id, 1);
      }

      return arr;
    };

    // function associated with calculating MIN, MAX, AVG values for Temperature and Humidity
    const calculateTemperatureAndHumidity = () => {
      const excelData = itemDetails.value.excel_data;

      if (excelData.length > 0) {
        const result = excelData.reduce(
          (acc, current) => {
            if (current["MIN_TEMP"] < acc.minTemp) {
              acc.minTemp = current["MIN_TEMP"];
              acc.minTempInstrumentId = current["instrument_id"];
              acc.minTempLoggerId = current["logger_id"];
            }

            if (current["MAX_TEMP"] > acc.maxTemp) {
              acc.maxTemp = current["MAX_TEMP"];
              acc.maxTempInstrumentId = current["instrument_id"];
              acc.maxTempLoggerId = current["logger_id"];
            }

            if (current["MIN_RH"] < acc.minRh) {
              acc.minRh = current["MIN_RH"];
              acc.minRhInstrumentId = current["instrument_id"];
              acc.minRhLoggerId = current["logger_id"];
            }

            if (current["MAX_RH"] > acc.maxRh) {
              acc.maxRh = current["MAX_RH"];
              acc.maxRhInstrumentId = current["instrument_id"];
              acc.maxRhLoggerId = current["logger_id"];
            }

            return acc;
          },
          {
            minTemp: excelData[0]["MIN_TEMP"],
            minTempInstrumentId: excelData[0]["instrument_id"],
            minTempLoggerId: excelData[0]["logger_id"],

            maxTemp: excelData[0]["MAX_TEMP"],
            maxTempInstrumentId: excelData[0]["instrument_id"],
            maxTempLoggerId: excelData[0]["logger_id"],

            minRh: excelData[0]["MIN_RH"],
            minRhInstrumentId: excelData[0]["instrument_id"],
            minRhLoggerId: excelData[0]["logger_id"],

            maxRh: excelData[0]["MAX_RH"],
            maxRhInstrumentId: excelData[0]["instrument_id"],
            maxRhLoggerId: excelData[0]["logger_id"],
          }
        );

        // MIN TEMP
        itemDetails.value.min_temp = {
          reading: result.minTemp,
          instrument_id: result.minTempInstrumentId,
          logger_id: result.minTempLoggerId,
        };

        // MAX TEMP
        itemDetails.value.max_temp = {
          reading: result.maxTemp,
          instrument_id: result.maxTempInstrumentId,
          logger_id: result.maxTempLoggerId,
        };

        // MIN RH
        itemDetails.value.min_rh = {
          reading: result.minRh,
          instrument_id: result.minRhInstrumentId,
          logger_id: result.minRhLoggerId,
        };

        // MAX RH
        itemDetails.value.max_rh = {
          reading: result.maxRh,
          instrument_id: result.maxRhInstrumentId,
          logger_id: result.maxRhLoggerId,
        };

        // Average Temperature
        itemDetails.value.avg_temp =
          (itemDetails.value.min_temp.reading +
            itemDetails.value.max_temp.reading) /
          2;

        // Average Humidity
        itemDetails.value.avg_rh =
          (itemDetails.value.min_rh.reading +
            itemDetails.value.max_rh.reading) /
          2;
      } else {
      }
    };

    /*
      if you want to add delete functionality, delete event is emmited from ( Step3 Component - ExcelFiles Component ) and listened to ThermalReportAdd Component

      NOTE : it require whole traversal of all files in order to calculate the MIN, MAX, AVG values for Temperature and Humidity
    */
    const deleteExcelFile = async (index) => {
      itemDetails.value.excel_data = await removeObjectWithId(
        itemDetails.value.excel_data,
        index
      );
      await calculateTemperatureAndHumidity;
      showSuccessAlert("Success", "Excel file removed successfully!");
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
      createAppStepperRef,
      previousStep,
      handleStep,
      formSubmit,
      totalSteps,
      currentStepIndex,
      getAssetPath,
      itemDetails,
      showErrorAlert,
      showSuccessAlert,
      RGatePasses,
      fetchRGP,
      RgpData,
      loading,
      setDates,
      setTimes,
      storeInstrument,
      removeInstrument,
      storeExcelFile,
      deleteExcelFile,
      removeAllInstrument,

      selectedIds,
      tableData,
      tableHeader,
      instrumentsFrom,
      instrumentsTo,
      handleFrom,
      handleTo,
      fromInstrumentId,
      toInstrumentId,
      disabelRef,
      toggleInstrument,

      handleChange,
      // allFilesData: props.allFilesData,
      exportToExcel,
      deleteTheFile,
    };
  },
});
</script>