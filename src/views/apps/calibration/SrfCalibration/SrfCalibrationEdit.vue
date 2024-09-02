<template>
  <div class="m-6 rounded">
    <!--begin::Layout-->
    <div class="d-flex flex-column flex-lg-row">
      <!--begin::Content-->
      <div class="flex-lg-row-fluid me-lg-15 order-2 order-lg-1 mb-10 mb-lg-0">
        <!--begin::Form-->
        <form class="form" action="#" id="kt_subscriptions_create_new">
          <!--begin::Customer-->
          <div class="card card-flush pt-3 mb-5 mb-lg-10">
            <!--begin::Card header-->
            <div class="card-header">
              <!--begin::Card title-->
              <div class="card-title">
                <h2 class="fw-bold">Customer</h2>
              </div>
              <!--begin::Card title-->
            </div>
            <!--end::Card header-->

            <!--begin::Card body-->
            <div class="card-body pt-3">
              <!--begin::Section-->
              <div class="mb-10">
                <!--begin::Details-->
                <div class="d-flex flex-wrap py-5">
                  <!--begin::Row-->
                  <div class="flex-equal me-5">
                    <!--begin::Details-->
                    <table class="table fs-6 fw-semobold gs-0 gy-2 gx-2 m-0">
                      <!--begin::Row-->
                      <tr>
                        <td class="text-gray-600 min-w-175px w-175px">
                          Company Name:
                        </td>
                        <td class="text-gray-800 min-w-175px">
                          {{ customerData.company_name || "" }}
                        </td>
                      </tr>
                      <!--end::Row-->

                      <!--begin::Row-->
                      <tr>
                        <td class="text-gray-600">Company Address:</td>
                        <td class="text-gray-800">
                          {{ customerData.address1 || "" }}
                          {{ customerData.address2 || "" }}
                          {{ customerData.city || "" }}
                          {{ customerData.pincode || "" }}
                          {{ customerData.state || "" }}
                          {{ customerData.country || "" }}
                        </td>
                      </tr>
                      <!--end::Row-->
                    </table>
                    <!--end::Details-->
                  </div>
                  <!--end::Row-->

                  <!--begin::Row-->
                  <div class="flex-equal">
                    <!--begin::Details-->
                    <table class="table fs-6 fw-semobold gs-0 gy-2 gx-2 m-0">
                      <!--begin::Row-->
                      <tr>
                        <td class="text-gray-600 min-w-175px w-175px">
                          Contact Person:
                        </td>
                        <td class="text-gray-800 min-w-175px">
                          {{ customerData.name || "" }}
                        </td>
                      </tr>
                      <!--end::Row-->

                      <!--begin::Row-->
                      <tr>
                        <td class="text-gray-600">Email:</td>
                        <td class="text-gray-800">
                          <a
                            :href="`mailto:${customerData.email}`"
                            class="text-gray-800 text-hover-primary"
                            >{{ customerData.email || "" }}</a
                          >
                        </td>
                      </tr>
                      <!--end::Row-->

                      <!--begin::Row-->
                      <tr>
                        <td class="text-gray-600">Mobile:</td>
                        <td class="text-gray-800">
                          {{ customerData.mobile || "" }}
                        </td>
                      </tr>
                      <!--end::Row-->
                    </table>
                    <!--end::Details-->
                  </div>
                  <!--end::Row-->
                </div>
                <!--end::Row-->
              </div>
              <!--end::Section-->
            </div>
            <!--end::Card body-->
          </div>
          <!--end::Customer-->
        </form>
        <!--end::Form-->
      </div>
      <!--end::Content-->

      <!--begin::Sidebar-->
      <div
        class="flex-column flex-lg-row-auto w-100 w-lg-250px w-xl-300px mb-10 order-1 order-lg-2"
      >
        <!--begin::Card-->
        <div
          class="card card-flush pt-3 mb-0"
          id="kt_add_summary"
          data-kt-sticky="false"
          data-kt-sticky-name="add-subscription-summary"
          data-kt-sticky-offset="{default: false, lg: '200px'}"
          data-kt-sticky-width="{lg: '250px', xl: '300px'}"
          data-kt-sticky-left="auto"
          data-kt-sticky-top="150px"
          data-kt-sticky-animation="false"
          data-kt-sticky-zindex="95"
        >
          <!--begin::Card header-->
          <div class="card-header">
            <!--begin::Card title-->
            <div class="card-title">
              <h2>Summary</h2>
            </div>
            <!--end::Card title-->
          </div>
          <!--end::Card header-->

          <!--begin::Card body-->
          <div class="card-body pt-0 fs-6">
            <!--begin::Section-->
            <div class="mb-7">
              <!--begin::Title-->

              <!--end::Title-->

              <h6 class="fw-semobold text-gray-800 text-hover-primary">
                {{ customerData.company_name || "" }}
              </h6>

              <!--begin::Details-->
              <div class="d-flex align-items-center mb-1">
                <!--begin::Name-->
                <span class="fw-bold text-gray-600 text-hover-primary me-2">
                  {{ customerData.name || "" }}
                </span>
                <!--end::Name-->
              </div>
              <!--end::Details-->

              <!--begin::Email-->
              <a
                href="#"
                class="fw-semobold text-gray-600 text-hover-primary"
                >{{ customerData.email || "" }}</a
              >
              <!--end::Email-->
            </div>
            <!--end::Section-->

            <!--begin::Seperator-->
            <div class="separator separator-dashed mb-7"></div>
            <!--end::Seperator-->

            <!--begin::Section-->
            <div class="mb-7">
              <!--begin::Title-->
              <h5 class="mb-3">Srf details</h5>
              <!--end::Title-->

              <!--begin::Details-->
              <div class="mb-2">
                <!--begin::Plan-->

                <span class="text-gray-600 me-2">SRF No. </span>
                <!--end::Plan-->

                <!--begin::Price-->
                <span
                  class="badge badge-light-info fs-6 fw-semobold text-gray-800"
                  >{{ itemDetails.srf_no ? itemDetails.srf_no : "" }}</span
                >
                <!--end::Price-->
              </div>
              <!--end::Details-->

              <!--begin::Details-->
              <div class="mb-2">
                <!--begin::Plan-->
                <span class="text-gray-600 me-2">PO No. </span>
                <!--end::Plan-->

                <!--begin::Price-->
                <span
                  class="badge badge-light-info fs-6 fw-semobold text-gray-800"
                  >{{
                    itemDetails.purchase_order_no
                      ? itemDetails.purchase_order_no
                      : ""
                  }}</span
                >
                <!--end::Price-->
              </div>
              <!--end::Details-->

              <!--begin::Details-->
              <div class="mb-2">
                <!--begin::Price-->
                <span class="text-gray-600 me-2">Status </span>
                <span
                  v-if="itemDetails.status == '1'"
                  class="badge py-3 px-4 fs-7 badge-light-warning"
                  >{{ GetCalSrfStatus(itemDetails.status) }}</span
                >
                <span
                  v-if="itemDetails.status == '2'"
                  class="badge py-3 px-4 fs-7 badge-light-primary"
                  >{{ GetCalSrfStatus(itemDetails.status) }}</span
                >
                <span
                  v-if="itemDetails.status == '3'"
                  class="badge py-3 px-4 fs-7 badge-light-success"
                  >{{ GetCalSrfStatus(itemDetails.status) }}</span
                >
                <span v-else></span>
                <!--end::Price-->
              </div>
              <!--end::Details-->
            </div>
            <!--end::Section-->

            <!--begin::Actions-->
            <div class="d-flex justify-content-start gap-2 mb-0">
              <button
                type="button"
                ref="saveSubmitButton"
                @click="onsubmit"
                class="btn btn-sm btn-success"
                id="kt_subscriptions_create_button"
              >
                <!--begin::Indicator-->
                <span class="indicator-label">Save</span>
                <span class="indicator-progress"
                  >Please wait...
                  <span
                    class="spinner-border spinner-border-sm align-middle ms-2"
                  ></span
                ></span>
                <!--end::Indicator-->
              </button>
            </div>
            <!--end::Actions-->
          </div>
          <!--end::Card body-->
        </div>
        <!--end::Card-->
      </div>
      <!--end::Sidebar-->
    </div>
    <!--end::Layout-->

    <!--begin::Customer-->
    <div class="card card-flush pt-3 mb-5 mb-lg-10">
      <!--begin::Card header-->
      <div class="card-header">
        <!--begin::Card title-->
        <div class="card-title">
          <h2 class="fw-bold">Approving Authority</h2>
        </div>
        <!--begin::Card title-->
      </div>
      <!--end::Card header-->

      <!--begin::Card body-->
      <div class="card-body pt-3">
        <!--begin::Section-->
        <div class="mb-0">
          <!-- extra fields -->
          <div class="row mb-6">
            <div class="form-group col-6">
              <label
                class="col-lg-4 col-form-label required fw-semobold fw-bold text-gray-700 fs-6 text-nowrap"
                >Company Name (Report)</label
              >
              <div class="form-control form-control-lg form-control-solid">
                {{ itemDetails.customer_name }}
              </div>
            </div>
            <div class="form-group col-md-6">
              <label
                class="col-form-label required fw-bold text-gray-700 fw-semobold fs-6 text-nowrap"
                >Request Date</label
              >
              <div class="block">
                <el-date-picker
                  class="w-100"
                  type="date"
                  disabled
                  v-model="itemDetails.request_date"
                  name="request_date"
                  id="request_date"
                  placeholder="Pick a day"
                  :editable="false"
                />
              </div>
            </div>
          </div>
        </div>
        <!--end::Section-->

        <!--begin::Section-->
        <div class="mb-0">
          <div class="row mb-6">
            <div class="form-group col-md-6 mb-8 mb-sd-8">
              <!--begin::Label-->
              <label class="required fs-5 fw-bold text-gray-700 mb-2"
                >Assigned To</label
              >
              <!--end::Label-->

              <!--begin::Input-->
              <div>
                <el-select
                  filterable
                  name="assigned_to"
                  v-model="itemDetails.assigned_to"
                  placeholder="--Select--"
                >
                  <el-option
                    v-for="item in CalibrationEngineers"
                    :key="item.id"
                    :label="`${item.first_name}  ${item.last_name}`"
                    :value="item.id"
                  />
                </el-select>
              </div>
              <!--end::Col-->
            </div>
            <div class="form-group col-md-6 mb-8 mb-sd-8">
              <!--begin::Label-->
              <label class="fs-5 fw-bold text-gray-700 mb-2">Approved By</label>
              <!--end::Label-->

              <div
                class="form-control form-control-lg form-control-transparent"
              >
                {{ itemDetails.approved_by.first_name || "" }}
                {{ itemDetails.approved_by.last_name || "" }}
              </div>
            </div>
          </div>
          <div class="row mb-6">
            <div class="form-group col-md-6 mb-8 mb-sd-8">
              <label
                class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap"
                >Status
              </label>
              <div class="input-group gap-6">
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    value="2"
                    v-model="itemDetails.status"
                    id="pending"
                    name="status"
                  />
                  <label
                    for="pending"
                    class="form-check-label fw-bold text-gray-700 text-nowrap"
                    >Pending</label
                  >
                </div>

                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    value="3"
                    v-model="itemDetails.status"
                    id="completed"
                    name="status"
                  />
                  <label
                    for="completed"
                    class="form-check-label fw-bold text-gray-700 text-nowrap"
                    >Completed</label
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--end::Section-->
      </div>
      <!--end::Card body-->
    </div>
    <!--end::Customer-->

    <!--begin::Pricing-->
    <div class="card card-flush pt-3 mb-5 mb-lg-10">
      <!--begin::Card header-->
      <div class="card-header">
        <!--begin::Card title-->
        <div class="card-title">
          <h2 class="fw-bold">Calibration Instruments</h2>
        </div>
        <!--begin::Card title-->
      </div>
      <!--end::Card header-->

      <div class="card-header border-0 pt-6">
        <!--begin::Card title-->
        <div class="card-title">
          <!--begin::Search-->
          <div class="d-flex align-items-center position-relative my-1">
            <KTIcon
              icon-name="magnifier"
              icon-class="fs-1 position-absolute ms-6"
            />
            <input
              type="text"
              v-model="search"
              @input="searchItems()"
              class="form-control form-control-solid w-250px ps-15"
              placeholder="Search instrument name"
            />
          </div>
          <!--end::Search-->
        </div>
        <!--begin::Card title-->
        <!--begin::Card toolbar-->
        <div class="card-toolbar">
          <!--begin::Toolbar-->
          <div
            v-if="selectedIds.length === 0"
            class="d-flex justify-content-end"
            data-kt-customer-table-toolbar="base"
          >
            <!--begin::Add customer-->
            <router-link :to="`/calibration-srf/list`" class="btn btn-primary">
              <KTIcon icon-name="link" icon-class="fs-2" />
              Calibration Records
            </router-link>
            <!--end::Add customer-->
            <!--end::Add customer-->
          </div>
          <!--end::Toolbar-->
          <!--begin::Group actions-->
          <div
            v-else
            class="d-flex justify-content-end align-items-center"
            data-kt-customer-table-toolbar="selected"
          >
            <div class="fw-bold me-5">
              <span class="me-2">{{ selectedIds.length }}</span
              >Selected
            </div>
            <button
              type="button"
              class="btn btn-danger"
              @click="deleteFewItem()"
            >
              Delete Selected
            </button>
          </div>
          <!--end::Group actions-->
          <!--begin::Group actions-->
          <div
            class="d-flex justify-content-end align-items-center d-none"
            data-kt-customer-table-toolbar="selected"
          >
            <div class="fw-bold me-5">
              <span
                class="me-2"
                data-kt-customer-table-select="selected_count"
              ></span
              >Selected
            </div>
            <button
              type="button"
              class="btn btn-danger"
              data-kt-customer-table-select="delete_selected"
            >
              Delete Selected
            </button>
          </div>
          <!--end::Group actions-->
        </div>
        <!--end::Card toolbar-->
      </div>

      <!--begin::Card body-->
      <div class="card-body pt-0">
        <!--begin::Table wrapper-->
        <div class="table-responsive">
          <Datatable
            checkbox-label="id"
            @on-sort="sort"
            @on-items-select="onItemSelect"
            :data="tableData"
            :header="tableHeader"
            :checkbox-enabled="true"
            :items-per-page="limit"
            :items-per-page-dropdown-enabled="false"
            :loading="loading"
          >
            <template v-slot:id="{ row: calibration_instrument }">
              {{ calibration_instrument.id }}
            </template>
            <template v-slot:name="{ row: calibration_instrument }">
              {{ calibration_instrument.name }}
            </template>
            <template v-slot:model_no="{ row: calibration_instrument }">
              {{ calibration_instrument.model_no }}
            </template>
            <template v-slot:serial_no="{ row: calibration_instrument }">
              {{ calibration_instrument.serial_no }}
            </template>
            <template v-slot:parameter="{ row: calibration_instrument }">
              {{ calibration_instrument.parameter }}
            </template>
            <template v-slot:ranges="{ row: calibration_instrument }">
              {{ calibration_instrument.ranges }}
            </template>
            <template v-slot:location="{ row: calibration_instrument }">
              {{ calibration_instrument.location }}
            </template>
            <template v-slot:actions="{ row: calibration_instrument }">
              <!--begin::Menu Flex-->
              <div class="d-flex flex-lg-row my-3">
                <!-- begin::download -->
                <span
                  class="btn btn-icon btn-active-light-success w-30px h-30px me-3"
                  data-bs-toggle="tooltip"
                  title="Download Calibration Certificate"
                  @click="downloadCalibrationRecord(calibration_instrument.id)"
                >
                  <KTIcon icon-name="file-down" icon-class="fs-2" />
                </span>
                <!-- end::download -->

                <!-- begin::Info -->
                <!-- <span
                  class="btn btn-icon btn-active-light-success w-30px h-30px me-3"
                  data-bs-toggle="modal"
                  data-bs-target="#kt_modal_uuc_reading"
                  data-toggle="tooltip"
                  title="View Instrumet Info"
                  @click="fillItemData(calibration_instrument)"
                >
                  <KTIcon icon-name="eye" icon-class="fs-2" />
                </span> -->
                <!--end::Info-->

                <!--begin::Edit-->
                <router-link
                  :to="`/calibration-instrument/edit/${calibration_instrument.id}`"
                >
                  <span
                    class="btn btn-icon btn-active-light-primary w-30px h-30px me-3"
                    data-bs-toggle="tooltip"
                    title="View Calibration Record"
                  >
                    <KTIcon icon-name="pencil" icon-class="fs-2" />
                  </span>
                </router-link>
                <!--end::Edit-->

                <!--begin::Delete-->
                <span
                  @click="deleteItem(calibration_instrument.id, false)"
                  class="btn btn-icon btn-active-light-danger w-30px h-30px me-3"
                  data-bs-toggle="tooltip"
                  title="Delete Calibration Instrument"
                >
                  <KTIcon icon-name="trash" icon-class="fs-2" />
                </span>
                <!--end::Delete-->
              </div>
              <!--end::Menu FLex-->
            </template>
          </Datatable>
          <div class="d-flex justify-content-between p-2">
            <div>
              <el-select
                class="w-100px rounded-2"
                v-model="limit"
                filterable
                @change="PageLimitPoiner(limit)"
              >
                <el-option
                  v-for="item in Limits"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </div>
            <ul class="pagination">
              <li class="paginate_button page-item" style="cursor: auto">
                <span @click="PrevPage" class="paginate_button page-link"
                  ><i class="ki-duotone ki-left fs-2"><!--v-if--></i></span
                >
              </li>
              <li class="paginate_button disabled">
                <span class="paginate_button page-link">
                  Page - {{ page }}
                </span>
              </li>
              <li class="paginate_button page-item" style="cursor: pointer">
                <span @click="NextPage" class="paginate_button page-link"
                  ><i class="ki-duotone ki-right fs-2"><!--v-if--></i></span
                >
              </li>
            </ul>
          </div>
        </div>
        <!--end::Table wrapper-->
      </div>
      <!--end::Card body-->
    </div>
    <!--end::Pricing-->

    <!--begin::Modals-->
    <!-- 
    <CalibrationInstrumentAddModal
      @document-added="reLoadData"
      v-bind:data="data"
    ></CalibrationInstrumentAddModal> -->
    <!--end::Modals-->
  </div>
</template>
    
      <script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref, onMounted } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable/table-partials/models";
import type { ICalibrationInstrument } from "@/core/model/calibration_instrument";
import { GetCalSrfStatus } from "@/core/model/calibration_srf";

import arraySort from "array-sort";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { useAuthStore, type User } from "@/stores/auth";

import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";
import { useBodyStore } from "@/stores/body";
import { useRouter, useRoute } from "vue-router";
import LayoutService from "@/core/services/LayoutService";
import {
  validateUserNSrf,
  saveCalibrationSrf,
  draftCalibrationSrf,
  getCalibrationInstruments,
  deleteCalibrationInstrument,
  CalibrationInstrumentSearch,
  getCalibrationSrf,
  getCalibrationEngineers,
  updateCalibrationSrf,
  getCalibrationInstrumentInfo,
  getCompanyLogo,
} from "@/stores/api";
import ApiService from "@/core/services/ApiService";
import moment from "moment";

import CalibrationInstrumentAddModal from "./CalibrationInstrument/CalibrationInstrumentAddModal.vue";
import ReadingModal from "./CustomComponents/ReadingModal.vue";
import { CalibrationRecordGen } from "@/core/config/CalibrationRecordGenerator";

interface Engineer {
  id: string;
  first_name: string;
  last_name: string;
  mobile: string;
}

interface PersonalInfo {
  id: string;
  first_name: string;
  last_name: string;
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
  mobile: string;
}

interface UUCReading {
  ranges: string;
  uuc_reading: string;
  l1_up: string;
  l2_up: string;
  d1_down: string;
  d2_down: string;
  mean_value: number;
}

interface SrfData {
  id: string;
  company_id: string;
  customer_id: string;
  srf_no: string;
  purchase_order_no: string;
  request_date: string;
  customer_name: string;

  status: string;
  comments: string;
  approval_status: string;

  assigned_to: string;
  created_by: string;
  updated_by: string;

  customer: Data;
  engineer: Engineer;
  made_by: PersonalInfo;
  approved_by: PersonalInfo;
}

interface ReferenceInstrumentData {
  id: string;
  instrument_id: string;
  parameter: string;
  name: string;
  model_no: string;
  serial_no: string;
  make: string;

  calibration_date: string;
  calibration_due_date: string;

  ranges: string;
  accuracy: string;

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
  is_active: string;
}

interface DownloadData {
  id: string;
  instrument_id: string;
  name: string;
  parameter: string;

  model_no: string;
  serial_no: string;
  make: string;

  calibration_date: string;
  calibration_due_date: string;

  location: string;

  ranges: string;
  accuracy: string;
  resolution: string;

  calibration_points: string;
  periodicity: string;

  temp: string;
  rh: string;

  instrument_condition: string;
  remark: string;

  reference_instrument_id: string;
  service_request_id: string;

  reading_data: Array<UUCReading>;

  company_id: string;
  is_active: string;

  srf: SrfData;
  reference_instrument: ReferenceInstrumentData;
}

export default defineComponent({
  name: "srf-calibration-edit",
  components: {
    Field,
    VForm,
    ErrorMessage,
    Datatable,
    CalibrationInstrumentAddModal,
    ReadingModal,
  },
  setup() {
    const draftSubmitButton = ref<null | HTMLButtonElement>(null);
    const saveSubmitButton = ref<null | HTMLButtonElement>(null);

    const store = useAuthStore();
    const bodyStore = useBodyStore();

    const auth = useAuthStore();
    const User = auth.GetUser();
    const router = useRouter();
    const route = useRoute();
    const srfID = route.params.id;

    //Create form validation object
    const itemValidator = Yup.object().shape({});

    const customerData = ref({
      id: "",
      name: "",
      company_name: "",
      address1: "",
      address2: "",
      country: "",
      state: "",
      city: "",
      pincode: "",
      email: "",
      mobile: "",
    });

    const itemDetails = ref({
      id: "",
      customer_id: "",
      srf_no: "",
      purchase_order_no: "",
      request_date: "",
      customer_name: "",
      approval_status: "",
      comments: "",
      status: "",
      company_id: "",
      is_active: 1,
      assigned_to: "",
      created_by: "",
      updated_by: "",
      approved_by: {
        id: "",
        first_name: "",
        last_name: "",
      },
    });

    const readingDetails = ref({
      id: "",
      reference_instrument_id: "",
      ranges: "",
      reading_data: [],
    });

    /* Calibration Instrument Listing Logic::Begin */

    const tableHeader = ref([
      {
        columnName: "Name",
        columnLabel: "name",
        sortEnabled: true,
        columnWidth: 125,
      },
      {
        columnName: "Model No",
        columnLabel: "model_no",
        sortEnabled: true,
        columnWidth: 125,
      },
      {
        columnName: "Serial No",
        columnLabel: "serial_no",
        sortEnabled: true,
        columnWidth: 125,
      },
      {
        columnName: "Parameter",
        columnLabel: "parameter",
        sortEnabled: true,
        columnWidth: 125,
      },
      {
        columnName: "Range",
        columnLabel: "ranges",
        sortEnabled: true,
        columnWidth: 125,
      },
      {
        columnName: "Location",
        columnLabel: "location",
        sortEnabled: true,
        columnWidth: 125,
      },
      {
        columnName: "Actions",
        columnLabel: "actions",
        sortEnabled: false,
        columnWidth: 75,
      },
    ]);

    // functions
    const Limits = ref({
      1: 10,
      2: 25,
      3: 50,
    });

    const loading = ref(true);
    // staring from 1
    const page = ref(1);
    const limit = ref(10);
    // limit 10
    const more = ref(false);

    const PagePointer = async (page) => {
      // ? Truncate the tableData
      //console.log(limit.value);
      loading.value = true;
      try {
        while (tableData.value.length != 0) tableData.value.pop();
        while (initvalues.value.length != 0) initvalues.value.pop();

        const response = await getCalibrationInstruments(
          `page=${page}&limit=${limit.value}&companyID=${User.company_id}&srfID=${srfID}`
        );

        if (response.success) {
          more.value = response.result.next_page_url != null ? true : false;
          tableData.value = response.result.data.map(
            ({ id, reading_data, ...rest }) => ({
              id: id,
              reading_data: JSON.parse(reading_data),
              ...rest,
            })
          );
          initvalues.value.splice(
            0,
            tableData.value.length,
            ...tableData.value
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        ////console.log("done");
        setTimeout(() => {
          loading.value = false;
        }, 250);
      }
    };

    const PageLimitPoiner = async (limit) => {
      // ? Truncate the tableData
      page.value = 1;
      loading.value = true;
      try {
        while (tableData.value.length != 0) tableData.value.pop();
        while (initvalues.value.length != 0) initvalues.value.pop();

        const response = await getCalibrationInstruments(
          `page=${page.value}&limit=${limit}&companyID=${User.company_id}&srfID=${srfID}`
        );

        if (response.success) {
          more.value = response.result.next_page_url != null ? true : false;
          tableData.value = response.result.data.map(
            ({ id, reading_data, ...rest }) => ({
              id: id,
              reading_data: JSON.parse(reading_data),
              ...rest,
            })
          );
          initvalues.value.splice(
            0,
            tableData.value.length,
            ...tableData.value
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        ////console.log("done");
        setTimeout(() => {
          loading.value = false;
        }, 250);
      }
    };

    //console.log(initvalues.value);

    const NextPage = () => {
      console.log(more.value);
      if (more.value != false) {
        page.value = page.value + 1;
        PagePointer(page.value);
      }
    };

    const PrevPage = () => {
      if (page.value > 1) {
        page.value = page.value - 1;
        PagePointer(page.value);
      }
    };

    const selectedIds = ref<Array<number>>([]);

    const tableData = ref<Array<ICalibrationInstrument>>([]);

    const initvalues = ref<Array<ICalibrationInstrument>>([]);

    async function calibration_instrument_listing(): Promise<void> {
      try {
        const response = await getCalibrationInstruments(
          `page=${page.value}&limit=${limit.value}&companyID=${User.company_id}&srfID=${srfID}`
        );
        if (response.success) {
          tableData.value = response.result.data.map(
            ({ id, reading_data, ...rest }) => ({
              id: id,
              reading_data: JSON.parse(reading_data),
              ...rest,
            })
          );

          more.value = response.result.next_page_url != null ? true : false;
          initvalues.value.splice(
            0,
            tableData.value.length,
            ...tableData.value
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

    const deleteFewItem = async () => {
      try {
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "You will not be able to recover from this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "red",
          confirmButtonText: "Yes, I am sure!",
          cancelButtonText: "No, cancel it!",
        });

        if (result.isConfirmed) {
          let allSuccess = true;
          let finalMessage = "Selected items deleted successfully.";

          for (const id of selectedIds.value) {
            const response = await deleteItem(id, true);
            if (!response.success) {
              allSuccess = false;
              finalMessage =
                response.message ||
                "An error occurred while deleting some items.";
              break;
            }
          }

          selectedIds.value.length = 0;

          if (allSuccess) {
            showSuccessAlert("Success", finalMessage);
          } else {
            showErrorAlert("Error", finalMessage);
          }
        }
      } catch (error: any) {
        const errorMessage = error.message || "An unknown error occurred";
        showErrorAlert("Error", errorMessage);
      }
    };

    const deleteItem = async (id: number, mul: boolean) => {
      const deleteConfirmation = async () => {
        try {
          const result = await Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover from this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "red",
            confirmButtonText: "Yes, I am sure!",
          });
          return result.isConfirmed;
        } catch (error: any) {
          const errorMessage = error.message || "An unknown error occurred";
          showErrorAlert("Error", errorMessage);
          return false;
        }
      };

      const deleteFromTable = async (id: number) => {
        try {
          const response = await deleteCalibrationInstrument(id);
          if (response?.success) {
            const index = tableData.value.findIndex((item) => item.id === id);
            if (index !== -1) {
              tableData.value.splice(index, 1);
              // console.log(`Item with id ${id} deleted successfully`);
            }
            showSuccessAlert(
              "Success",
              response.message || `Item with id ${id} deleted successfully.`
            );
            return { success: true };
          } else {
            throw new Error(
              response?.message || `Failed to delete the item with id ${id}`
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

      if (!mul) {
        const isConfirmed = await deleteConfirmation();
        if (isConfirmed) {
          return await deleteFromTable(id);
        } else {
          return { success: false };
        }
      } else {
        return await deleteFromTable(id);
      }
    };

    // Alert functions
    const showSuccessAlert = (title: string, message: string) => {
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

    const showErrorAlert = (title: string, message: string) => {
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

    const search = ref<string>("");
    // ? debounce timer
    let debounceTimer;

    const searchItems = async () => {
      console.log(search.value);
      tableData.value.splice(0, tableData.value.length, ...initvalues.value);
      if (search.value.length != 0) {
        let results: Array<ICalibrationInstrument> = [];
        for (let j = 0; j < tableData.value.length; j++) {
          if (searchingFunc(tableData.value[j], search.value)) {
            results.push(tableData.value[j]);
          }
        }
        tableData.value.splice(0, tableData.value.length, ...results);
        if (tableData.value.length == 0 && search.value.length != 0) {
          loading.value = true;
          clearTimeout(debounceTimer); // Clear any existing debounce timer
          debounceTimer = setTimeout(async () => {
            await SearchMore();
          }, 1500);
        }
      } else {
        page.value = 1;
        while (tableData.value.length != 0) tableData.value.pop();
        while (initvalues.value.length != 0) initvalues.value.pop();
        await calibration_instrument_listing();
      }
    };

    async function SearchMore() {
      // Your API call logic here
      try {
        const response = await CalibrationInstrumentSearch(
          search.value,
          itemDetails.value.company_id,
          srfID
        );

        if (response.success) {
          more.value = response.result.next_page_url != null ? true : false;
          tableData.value = response.result.data.map(
            ({ id, reading_data, ...rest }) => ({
              id: id,
              reading_data: JSON.parse(reading_data),
              ...rest,
            })
          );
          initvalues.value.splice(
            0,
            tableData.value.length,
            ...tableData.value
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        //console.log("done");
        setTimeout(() => {
          loading.value = false;
        }, 250);
      }
    }

    const searchingFunc = (obj: any, value: string): boolean => {
      console.log(obj);
      for (let key in obj) {
        if (
          !Number.isInteger(obj[key]) &&
          !(typeof obj[key] === "object") &&
          typeof obj[key] === "string" // Add type check here
        ) {
          if (obj[key].indexOf(value) !== -1) {
            return true;
          }
        }
      }
      return false;
    };

    const sort = (sort: Sort) => {
      const reverse: boolean = sort.order === "asc";
      if (sort.label) {
        arraySort(tableData.value, sort.label, { reverse });
      }
    };
    const onItemSelect = (selectedItems: Array<number>) => {
      selectedIds.value = selectedItems;
    };

    /* Calibration Instrument Listing Logic::End */

    /* ENGINEER DATA LOGIC */
    const CalibrationEngineers = ref<Engineer[]>([]);
    async function engineer_listing(): Promise<void> {
      try {
        const company_id = User.company_id;
        const response = await getCalibrationEngineers(company_id);
        // console.log(response.result);
        if (response.result) {
          CalibrationEngineers.value = response.result.map(({ ...rest }) => ({
            ...rest,
          }));
        }
      } catch (error) {
        console.error(error);
      }
    }

    onMounted(async () => {
      try {
        CalibrationEngineers.value = [];

        try {
          let response = await getCalibrationSrf(srfID.toString());
          if (response?.success) {
            itemDetails.value = {
              id: response.result.id,
              customer_id: response.result.customer_id || "",
              srf_no: response.result.srf_no || "",
              purchase_order_no: response.result.purchase_order_no || "",
              request_date: response.result.request_date || "",
              customer_name: response.result.customer_name || "",
              approval_status: response.result.approval_status || "",
              comments: response.result.comments || "",
              status: response.result.status || "",
              company_id: response.result.company_id || "",
              assigned_to: response.result.assigned_to || "",
              created_by: response.result.created_by || "",
              updated_by: response.result.updated_by || "",
              is_active: response.result.is_active || "",
              approved_by: response.result.approved_by
                ? response.result.approved_by
                : {
                    id: "",
                    first_name: "",
                    last_name: "",
                  },
            };

            customerData.value = { ...response.result.customer };
          } else {
            console.error(
              `Error Occured in getCalibrationSrf : ${
                response.message || "Error Occured in API"
              }`
            );
          }
        } catch (err) {
          console.error(`Error Occured in getCalibrationSrf : ${err}`);
        }

        // call calibration instrument listing
        await calibration_instrument_listing();

        // Get Available Engineers
        await engineer_listing();
      } catch (error) {
        showErrorAlert(
          "Error",
          "An error occurred during the validateUserNSrf API call."
        );
        loading.value = false;
        console.log(error);
      }

      console.log(route.params);
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
      console.log(itemDetails.value[dateType]);
    }

    const validateForm = (formData) => {
      for (const key in formData) {
        let value = formData[key];
        if (
          key !== "customer_name" &&
          key !== "created_by" &&
          key !== "updated_by" &&
          key !== "approved_by" &&
          key !== "comments"
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

    const onsubmit = async () => {
      try {
        const result = validateForm(itemDetails.value);

        if (result == false) {
          showErrorAlert("Warning", "Please fill all the details correctly.");
          return;
        }

        if (saveSubmitButton.value) {
          // Activate indicator
          saveSubmitButton.value.setAttribute("data-kt-indicator", "on");
        }

        // Call your API here
        const response = await updateCalibrationSrf(srfID, itemDetails.value);

        if (response?.success) {
          // Handle successful API response
          showSuccessAlert(
            "Success",
            response.message ||
              "Service Request Form  has been successfully updated!"
          );
          // window.location.href = "https://www.google.com";
          router.push({
            name: "calibration-srf-list",
          });
        } else {
          // Handle API error response
          showErrorAlert("Error", response.message || "An error occurred.");
        }
      } catch (error) {
        // Handle any other errors during API call
        console.error("API call error:", error);
        showErrorAlert("Error", "An error occurred during the API call.");
      } finally {
        if (saveSubmitButton.value) {
          saveSubmitButton.value.removeAttribute("data-kt-indicator");
        }
      }
    };

    const companyInfo = ref({
      id: "",
      company_name: "",
      company_logo: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      logo_base64: "",
    });

    const instrumentInfo = ref<DownloadData>({
      id: "",
      instrument_id: "",
      name: "",
      parameter: "",

      model_no: "",
      serial_no: "",
      make: "",

      calibration_date: "",
      calibration_due_date: "",

      location: "",

      ranges: "",
      accuracy: "",
      resolution: "",

      calibration_points: "",
      periodicity: "",

      temp: "",
      rh: "",

      instrument_condition: "",
      remark: "",

      reference_instrument_id: "",
      service_request_id: "",

      reading_data: [
        {
          ranges: "",
          uuc_reading: "",
          l1_up: "",
          l2_up: "",
          d1_down: "",
          d2_down: "",
          mean_value: 0,
        },
      ],

      company_id: "",
      is_active: "",

      srf: {
        id: "",
        company_id: "",
        customer_id: "",
        srf_no: "",
        purchase_order_no: "",
        request_date: "",
        customer_name: "",

        status: "",
        comments: "",
        approval_status: "",

        assigned_to: "",
        created_by: "",
        updated_by: "",

        customer: {
          id: "",
          name: "",
          company_name: "",
          address1: "",
          address2: "",
          city: "",
          state: "",
          pincode: "",
          country: "",
          mobile: "",
        },

        engineer: {
          id: "",
          first_name: "",
          last_name: "",
          mobile: "",
        },
        made_by: {
          id: "",
          first_name: "",
          last_name: "",
        },
        approved_by: {
          id: "",
          first_name: "",
          last_name: "",
        },
      },

      reference_instrument: {
        id: "",
        instrument_id: "",
        parameter: "",
        name: "",
        model_no: "",
        serial_no: "",
        make: "",
        calibration_date: "",
        calibration_due_date: "",

        ranges: "",
        accuracy: "",

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
        is_active: "",
      },
    });

    const downloadCalibrationRecord = async (id) => {
      let timerInterval;

      try {
        // Show initial loading Swal with generic progress messages
        Swal.fire({
          title: "Downloading Calibration Certificate",
          html: `<div class="swal-animation">
        <p class="swal-text">Please wait...</p>
        <div class="swal-progress">
          <div class="swal-progress-bar"></div>
        </div>
      </div>`,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        });

        // Fetch RGP information
        const res = await getCalibrationInstrumentInfo(id);
        if (res?.success != false) {
          instrumentInfo.value = { ...res.result };
          instrumentInfo.value.reading_data =
            JSON.parse(res.result.reading_data) || [];

          instrumentInfo.value.srf = { ...res.result.srf };
        } else {
          showErrorAlert("Error", res.message || "Error Occured");
          return;
        }

        // Fetch company logo details
        const res2 = await getCompanyLogo(res.result.company_id);

        if (res2?.success != false) {
          // Update local reactive state (assuming Vue 3 Composition API syntax)
          companyInfo.value.id = res2.result.id;
          companyInfo.value.company_name = res2.result.company_name;
          companyInfo.value.company_logo = res2.result.company_logo
            ? res2.result.company_logo
            : "";
          companyInfo.value.logo_base64 = res2.result.logo_base64
            ? "data: image/png;base64," + res2.result.logo_base64
            : getAssetPath("media/avatars/default.png");

          companyInfo.value.address = res2.result.address || "";
          companyInfo.value.city = res2.result.city || "";
          companyInfo.value.pincode = res2.result.pincode || "";
          companyInfo.value.state = res2.result.state || "";
          companyInfo.value.country = res2.result.country || "";
        } else {
          showErrorAlert("Error", res2.message || "Error Occured");
          return;
        }
        // Update Swal message for PDF generation
        Swal.update({
          title: "Generating PDF",
          html: `<div class="swal-animation">
        <p class="swal-text">Please wait...</p>
        <div class="swal-progress">
          <div class="swal-progress-bar"></div>
        </div>
      </div>`,
        });

        // Simulate delay for PDF generation (replace with actual function)
        const pdfName = `calibration_instrument_record_${instrumentInfo.value.srf.srf_no || "_"}_${instrumentInfo.value.srf.purchase_order_no || "_"}`;

        await CalibrationRecordGen(id, pdfName, instrumentInfo, companyInfo);

        // Close Swal on success
        Swal.fire({
          title: "Download Complete",
          text: "Calibration Certificate generated successfully",
          icon: "success",
          timer: 2000, // Show success message for 2 seconds
          timerProgressBar: true,
          allowOutsideClick: true,
        });
      } catch (error) {
        console.error("Error downloading Calibration Certificate:", error);

        // Close Swal on success
        Swal.fire({
          title: "Error Complete",
          text: "Failed to Calibration Certificate",
          icon: "error",
          timer: 2000,
          timerProgressBar: true,
          allowOutsideClick: true,
        });
      } finally {
        // Clear interval if still running
        clearInterval(timerInterval);
      }
    };

    async function reLoadData() {
      page.value = 1;
      await calibration_instrument_listing();
    }

    const fillItemData = async (data) => {
      const { id, reference_instrument_id, ranges, reading_data } = data;

      readingDetails.value = {
        id: id,
        reference_instrument_id: reference_instrument_id,
        ranges: ranges,
        reading_data: JSON.parse(reading_data),
      };
      console.log("readingDetails are:", readingDetails.value);
    };

    return {
      tableData,
      tableHeader,
      deleteItem,
      deleteFewItem,
      search,
      searchItems,
      selectedIds,
      sort,
      onItemSelect,
      getAssetPath,
      NextPage,
      PrevPage,
      page,
      limit,
      PageLimitPoiner,
      Limits,

      draftSubmitButton,
      saveSubmitButton,
      customerData,
      itemDetails,
      itemValidator,
      setDates,
      loading,

      CalibrationEngineers,

      reLoadData,
      GetCalSrfStatus,
      onsubmit,
      fillItemData,
      downloadCalibrationRecord,
    };
  },
});
</script>
      
    
    <style>
.el-input__inner,
.el-select__inner {
  font-weight: 500;
}
.el-input__wrapper,
.el-select__wrapper {
  min-height: 3.5rem;
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