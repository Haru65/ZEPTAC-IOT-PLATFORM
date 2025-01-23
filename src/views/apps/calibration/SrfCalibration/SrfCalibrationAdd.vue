<template>
  <div class="m-6 rounded">
    <!--begin::Layout-->
    <!--begin::Heading-->
    <div class="text-center mb-6">
      <!--begin::Title-->
      <h1 class="text-dark mb-3" style="font-size: 2.3rem">
        Calibration Service Request Form
      </h1>
      <!--end::Title-->
    </div>

    <!--end::Heading-->
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

              <!--begin::Section-->
              <div class="mb-0">
                <div class="row mb-6 mt-6">
                  <div
                    class="form-check form-switch form-check-custom form-check-primary form-check-solid"
                  >
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      name="customerNameRef"
                      id="customerNameRef"
                      v-model="customerNameRef"
                      @change="handleToggle"
                    />
                    <label
                      class="form-check-label fw-bold text-primary fw-semobold fs-6"
                      for="customerNameRef"
                    >
                      Want Company Name Same as Above.
                    </label>
                  </div>
                </div>

                <!-- extra fields -->
                <div class="row mb-6">
                  <div class="form-group col-6" v-if="customerNameRef">
                    <label
                      class="col-lg-4 col-form-label required fw-semobold fw-bold text-gray-700 fs-6 text-nowrap"
                      >Company Name (Report)</label
                    >
                    <div
                      class="form-control form-control-lg form-control-solid"
                    >
                      {{ itemDetails.customer_name }}
                    </div>
                  </div>
                  <div class="form-group col-6" v-else>
                    <label
                      class="col-lg-4 col-form-label required fw-semobold fw-bold text-gray-700 fs-6 text-nowrap"
                      >Company Name (Report)</label
                    >
                    <Field
                      type="text"
                      name="customer_name"
                      class="form-control form-control-lg form-control-solid"
                      placeholder="M/S."
                      v-model="itemDetails.customer_name"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="customer_name" />
                      </div>
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
                        name="request_date"
                        id="request_date"
                        v-model="itemDetails.request_date"
                        @change="setDates($event, 'request_date')"
                        placeholder="Pick a day"
                        :editable="false"
                      />
                    </div>
                  </div>
                </div>
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
          data-kt-sticky="true"
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
                ref="draftSubmitButton"
                @click="SaveToDraft"
                class="btn btn-sm btn-primary"
                id="kt_subscriptions_create_button"
              >
                <!--begin::Indicator-->
                <span class="indicator-label">Save To Draft</span>
                <span class="indicator-progress"
                  >Please wait...
                  <span
                    class="spinner-border spinner-border-sm align-middle ms-2"
                  ></span
                ></span>
                <!--end::Indicator-->
              </button>

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
            <CalibrationImportModal v-bind:data="data"></CalibrationImportModal>

            <span
              class="btn btn-icon btn-light-primary  me-3"
              v-tooltip
              title="Refresh"
              @click="reLoadData"
            >
              <KTIcon icon-name="arrows-circle" icon-class="fs-2" />
            </span>


            <!--begin::Export-->
            <button
              type="button"
              class="btn btn-light-primary me-3"
              data-bs-toggle="modal"
              data-bs-target="#kt_modal_calibration_instrument_import"
            >
              <KTIcon icon-name="exit-up" icon-class="fs-2" />
              Import
            </button>
            <!--end::Export-->
            <!--begin::Add customer-->

            <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#kt_modal_internal_doc"
            >
              <KTIcon icon-name="plus" icon-class="fs-2" />
              Instrument
            </button>
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
              {{ `${calibration_instrument.ranges_from || ""} to ${calibration_instrument.ranges_to || ""}` }}
            </template>
            <template v-slot:location="{ row: calibration_instrument }">
              {{ calibration_instrument.location }}
            </template>
            <template v-slot:actions="{ row: calibration_instrument }">
              <!--begin::Menu Flex-->
              <div class="d-flex flex-lg-row my-3">
                <DuplicateCalibrationInstrument
                  :key="calibration_instrument.id"
                  :instrumentId="calibration_instrument.id"
                  :companyId="calibration_instrument.company_id"
                  :heading="calibration_instrument.name"
                  @handleDuplicate="reLoadData"
                ></DuplicateCalibrationInstrument>

                <!--begin::Clone-->
                <span
                  class="btn btn-icon btn-active-light-success w-30px h-30px me-3"
                  v-tooltip
                  title="Clone Instrument"
                  data-bs-toggle="modal"
                  :data-bs-target="
                    '#kt_modal_calibration_instrument_' +
                    calibration_instrument.id
                  "
                >
                  <KTIcon icon-name="copy" icon-class="fs-2" />
                </span>

                <!--end::Clone-->

                <!--begin::Delete-->
                <span
                  @click="deleteItem(calibration_instrument.id, false)"
                  class="btn btn-icon btn-active-light-danger w-30px h-30px me-3"
                  v-tooltip
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

    <CalibrationInstrumentAddModal
      @document-added="reLoadData"
      v-bind:data="data"
    ></CalibrationInstrumentAddModal>
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
} from "@/stores/api";
import ApiService from "@/core/services/ApiService";
import moment from "moment";

import CalibrationInstrumentAddModal from "./CalibrationInstrument/CalibrationInstrumentAddModal.vue";
import DuplicateCalibrationInstrument from "./CalibrationInstrument/DuplicateCalibrationInstrument.vue";
import CalibrationImportModal from "./CalibrationInstrument/CalibrationImportModal.vue";

export default defineComponent({
  name: "srf-calibration-add",
  components: {
    Field,
    VForm,
    ErrorMessage,
    Datatable,
    CalibrationInstrumentAddModal,
    DuplicateCalibrationInstrument,
    CalibrationImportModal,
  },
  setup() {
    const draftSubmitButton = ref<null | HTMLButtonElement>(null);
    const saveSubmitButton = ref<null | HTMLButtonElement>(null);

    // Toggle Conformity Based on yes/no
    const conformityRef = ref(false);
    const customerNameRef = ref(false);

    const handleToggle = (e) => {
      if (e.target.checked === true) {
        customerNameRef.value = true;

        itemDetails.value.customer_name = customerData.value.company_name;
      } else {
        customerNameRef.value = false;

        itemDetails.value.customer_name = "";
      }
    };

    const store = useAuthStore();
    const bodyStore = useBodyStore();

    const router = useRouter();
    const route = useRoute();
    const companyID = route.params.company;
    const customerID = route.params.customer;
    const srfID = route.params.srf;
    const token = route.params.token;

    //Create form validation object
    const itemValidator = Yup.object().shape({});

    const data = ref({
      company_id: companyID,
      customer_id: customerID,
      service_request_id: srfID,
      token: token,
    });

    const customerData = ref({
      id: customerID,
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
      status: "",
      comments: '',
      approval_status: "1",
      company_id: "",
      is_active: 1,
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
          `page=${page}&limit=${limit.value}&companyID=${companyID}&srfID=${srfID}`
        );

        if (response.success) {
          more.value = response.result.next_page_url != null ? true : false;
          tableData.value = response.result.data.map(({ id, ...rest }) => ({
            id: id,
            ...rest,
          }));
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
          `page=${page.value}&limit=${limit}&companyID=${companyID}&srfID=${srfID}`
        );

        if (response.success) {
          more.value = response.result.next_page_url != null ? true : false;
          tableData.value = response.result.data.map(({ id, ...rest }) => ({
            id: id,
            ...rest,
          }));
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
          `page=${page.value}&limit=${limit.value}&companyID=${companyID}&srfID=${srfID}`
        );
        if (response.success) {
          tableData.value = response.result.data.map(({ id, ...rest }) => ({
            id: id,
            ...rest,
          }));

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
          companyID,
          srfID
        );

        if (response.success) {
          more.value = response.result.next_page_url != null ? true : false;
          tableData.value = response.result.data.map(({ id, ...rest }) => ({
            id: id,
            ...rest,
          }));
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

    onMounted(async () => {
      try {
        data.value.company_id = companyID;
        data.value.customer_id = customerID;
        data.value.service_request_id = srfID;
        data.value.token = token;

        let response = await validateUserNSrf(data.value);
        console.log(response);

        if (response.success) {
          customerData.value.name = response.result.name
            ? response.result.name
            : "";
          customerData.value.company_name = response.result.company_name
            ? response.result.company_name
            : "";
          customerData.value.email = response.result.email
            ? response.result.email
            : "";
          customerData.value.mobile = response.result.mobile
            ? response.result.mobile
            : "";
          customerData.value.address1 = response.result.address1
            ? response.result.address1
            : "";
          customerData.value.address2 = response.result.address2
            ? response.result.address2
            : "";
          customerData.value.city = response.result.city
            ? response.result.city
            : "";
          customerData.value.pincode = response.result.pincode
            ? response.result.pincode
            : "";
          customerData.value.state = response.result.state
            ? response.result.state
            : "";
          customerData.value.country = response.result.country
            ? response.result.country
            : "";

          itemDetails.value.id = response.result.srf.id || "";
          itemDetails.value.customer_id = response.result.srf.customer_id || "";
          itemDetails.value.srf_no = response.result.srf.srf_no || "";
          itemDetails.value.purchase_order_no =
            response.result.srf.purchase_order_no || "";
          itemDetails.value.request_date =
            response.result.srf.request_date || "";
          itemDetails.value.customer_name =
            response.result.srf.customer_name || "";
          itemDetails.value.status = response.result.srf.status || "";
          itemDetails.value.approval_status = response.result.srf.approval_status || "1";
          // itemDetails.value.comments = response.result.srf.comments || "";
          itemDetails.value.company_id = response.result.srf.company_id || "";
        }

        // call calibration instrument listing
        await calibration_instrument_listing();
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
        if (key !== "customer_name" && key !== "comments") {
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

    const SaveToDraft = async () => {
      try {
        const result = validateForm(itemDetails.value);

        if (result == false) {
          showErrorAlert("Warning", "Please fill all the details correctly.");
          return;
        }

        if (draftSubmitButton.value) {
          // Activate indicator
          draftSubmitButton.value.setAttribute("data-kt-indicator", "on");
        }

        // Call your API here
        const response = await draftCalibrationSrf(itemDetails.value);

        if (response?.success) {
          // Handle successful API response
          showSuccessAlert(
            "Success",
            response.message ||
              "Service Request Form  has been successfully added!"
          );
          // window.location.href = "https://www.google.com";
          router.push({ name: "thankyou" });
        } else {
          // Handle API error response
          showErrorAlert("Error", response.message || "An error occurred.");
        }
      } catch (error) {
        // Handle any other errors during API call
        console.error("API call error:", error);
        showErrorAlert("Error", "An error occurred during the API call.");
      } finally {
        if (draftSubmitButton.value) {
          draftSubmitButton.value.removeAttribute("data-kt-indicator");
        }
      }
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
        const response = await saveCalibrationSrf(itemDetails.value);

        if (response?.success) {
          // Handle successful API response
          showSuccessAlert(
            "Success",
            response.message ||
              "Service Request Form  has been successfully added!"
          );
          // window.location.href = "https://www.google.com";
          router.push({ name: "thankyou" });
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

    async function reLoadData() {
      page.value = 1;
      await calibration_instrument_listing();
    }

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

      customerNameRef,
      conformityRef,

      handleToggle,

      data,
      reLoadData,
      GetCalSrfStatus,

      SaveToDraft,
      onsubmit,
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