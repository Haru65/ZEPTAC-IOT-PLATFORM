<template>
  <!--begin::Card-->
  <div class="card">
    <!--begin::Card body-->
    <div class="card-body">
      <!--begin::Stepper-->
      <div
        class="stepper stepper-links d-flex flex-column"
        id="kt_create_account_stepper"
        ref="horizontalWizardRef"
      >
        <!--begin::Nav-->
        <div class="stepper-nav">
          <!--begin::Step 1-->
          <div class="stepper-item current" data-kt-stepper-element="nav">
            <h3 class="stepper-title">Quotation</h3>
          </div>
          <!--end::Step 1-->

          <!--begin::Step 2-->
          <div class="stepper-item" data-kt-stepper-element="nav">
            <h3 class="stepper-title">Engineers</h3>
          </div>
          <!--end::Step 2-->

          <!--begin::Step 3-->
          <div class="stepper-item" data-kt-stepper-element="nav">
            <h3 class="stepper-title">Instruments</h3>
          </div>
          <!--end::Step 3-->

          <!--begin::Step 4-->
          <div class="stepper-item" data-kt-stepper-element="nav">
            <h3 class="stepper-title">Summary</h3>
          </div>
          <!--end::Step 4-->
        </div>
        <!--end::Nav-->

        <!--begin::Form-->
        <form
          class="mx-auto w-100 p-2"
          novalidate
          id="kt_create_account_form"
          @submit="handleStep"
        >
          <!-- Step 1 -->
          <div
            class="current text-gray-800 fs-6"
            data-kt-stepper-element="content"
          >
            <div class="w-100">
              <!-- Date Row -->
              <div class="row g-6 mb-4">
                <div class="col-md-6">
                  <label class="form-label required font-semibold">Date</label>
                  <el-date-picker
                    type="date"
                    name="date"
                    v-model="itemDetails.date"
                    @change="setDates($event, 'date')"
                    placeholder="Select date"
                    :editable="false"
                    class="w-100"
                  />
                </div>
                <div class="col-md-6">
                  <label class="form-label required font-semibold"
                    >Due Date</label
                  >
                  <el-date-picker
                    type="date"
                    name="duedate"
                    v-model="itemDetails.duedate"
                    @change="setDates($event, 'duedate')"
                    placeholder="Select due date"
                    :editable="false"
                    class="w-100"
                  />
                </div>
              </div>

              <!-- Quotation Selection -->
              <div class="row g-6 mb-4 mt-2">
                <div class="col-12">
                  <label class="form-label required font-semibold"
                    >Select Quotation</label
                  >
                  <el-select
                    name="quotation_id"
                    v-model="itemDetails.quotation_id"
                    filterable
                    placeholder="Select quotation..."
                    @change="setQuotation"
                    class="w-100"
                  >
                    <el-option
                      v-for="item in Quotations"
                      :key="item.id"
                      :value="item.id"
                      :label="`${item.quotation_no} — ${item.customer?.company_name} (${item.customer?.name}) — ${item.client?.company_name} (${item.client?.name})`"
                    />
                    <el-option value="" label="Select quotation..." disabled />
                  </el-select>
                </div>
              </div>

              <!-- Customer/Client Info -->
              <div class="row g-6 mb-4" v-if="itemDetails.quotation_id">
                <div class="col-md-6">
                  <div class="border rounded p-3 h-100">
                    <label class="font-semibold mb-2">Customer</label>
                    <!-- Customer Info -->
                    <div class="small">
                      <div>{{ itemDetails.customer?.company_name ?? "" }}</div>
                      <div class="mt-2 font-semibold">Billing Address:</div>
                      <div>
                        {{ itemDetails.customer?.name ?? "" }}<br />
                        <template v-if="itemDetails.customer?.company_name">
                          {{ itemDetails.customer?.company_name ?? "" }}<br />
                          {{ itemDetails.customer?.address1 ?? "" }}<br />
                          {{ itemDetails.customer?.address2 ?? "" }}<br />
                        </template>
                        <template v-if="itemDetails.customer?.country">
                          {{ itemDetails.customer?.city ?? "" }} -
                          {{ itemDetails.customer?.pincode ?? "" }}<br />
                          {{ itemDetails.customer?.state ?? "" }}
                          {{ itemDetails.customer?.country ?? "" }}
                        </template>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="border rounded p-3 h-100">
                    <label class="font-semibold mb-2">Client</label>
                    <!-- Client Info -->
                    <div class="small">
                      <div>{{ itemDetails.client?.company_name ?? "" }}</div>
                      <div class="mt-2 font-semibold">Site Address:</div>
                      <div>
                        {{ itemDetails.client?.name ?? "" }}<br />
                        <template v-if="itemDetails.client?.company_name">
                          {{ itemDetails.client?.company_name ?? "" }}<br />
                          {{ itemDetails.client?.address1 ?? "" }}<br />
                          {{ itemDetails.client?.address2 ?? "" }}<br />
                        </template>
                        <template v-if="itemDetails.client?.country">
                          {{ itemDetails.client?.city ?? "" }} -
                          {{ itemDetails.client?.pincode ?? "" }}<br />
                          {{ itemDetails.client?.state ?? "" }}
                          {{ itemDetails.client?.country ?? "" }}
                        </template>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--end::Step 1-->

          <!--begin::Step 2-->
          <div class="text-gray-800 fs-6" data-kt-stepper-element="content">
            <div class="w-100">
              <!-- Engineer Selection Section -->
              <div class="card shadow-sm mb-6">
                <div class="card-body p-6">
                  <div class="row">
                    <div class="col-12">
                      <label
                        class="d-flex align-items-center fs-5 font-semibold mb-4 required"
                      >
                        <span>Assign Engineers</span>
                        <i
                          class="fas fa-exclamation-circle ms-2 fs-7 text-muted"
                          data-bs-toggle="tooltip"
                          title="Select at least one engineer"
                        ></i>
                      </label>

                      <el-select
                        v-model="itemDetails.engineers"
                        multiple
                        clearable
                        collapse-tags
                        placeholder="Select engineers..."
                        popper-class="custom-header"
                        :max-collapse-tags="1"
                        class="w-100"
                        :disabled="AvailableEngineers.length === 0"
                      >
                        <el-option
                          v-for="item in AvailableEngineers"
                          :key="item.id"
                          :label="`${item.first_name} ${item.last_name}`"
                          :value="item.id"
                        />
                      </el-select>
                    </div>
                  </div>

                  <!-- No Engineers Available Alert -->
                  <div
                    v-if="AvailableEngineers.length === 0"
                    class="alert alert-danger mt-4 p-4 fs-5 rounded text-start"
                  >
                    <i class="fas fa-exclamation-triangle me-2"></i>
                    All engineers are currently assigned. No available engineers
                    at this time.
                  </div>
                </div>
              </div>

              <!-- Assigned Engineers Section -->
              <div class="card shadow-sm" v-if="SelectedEngineers.length > 0">
                <div class="card-header border-0 pt-5 pb-3">
                  <div class="card-title d-flex flex-column">
                    Assigned Engineers
                    <span class="text-muted fs-6">
                      {{ SelectedEngineers.length }} engineer{{
                        SelectedEngineers.length !== 1 ? "s" : ""
                      }}
                      selected
                    </span>
                  </div>
                </div>

                <div class="card-body pt-0">
                  <div class="table-responsive">
                    <table
                      class="table align-middle table-row-dashed fs-6 gy-4"
                    >
                      <!-- Table Head -->
                      <thead>
                        <tr
                          class="text-start text-gray-500 font-semibold fs-7 text-uppercase"
                        >
                          <th class="w-50px">#</th>
                          <th class="min-w-200px">Engineer</th>
                          <th class="min-w-150px">Contact Number</th>
                        </tr>
                      </thead>

                      <!-- Table Body -->
                      <tbody>
                        <tr
                          v-for="(engineer, index) in SelectedEngineers"
                          :key="engineer.id"
                        >
                          <td>{{ index + 1 }}</td>
                          <td>
                            <div class="d-flex align-items-center">
                              <div
                                class="symbol symbol-40px symbol-circle me-3"
                              >
                                <span class="symbol-label bg-light-success">
                                  <span class="fs-5 text-success">
                                    {{ engineer.first_name.charAt(0)
                                    }}{{ engineer.last_name.charAt(0) }}
                                  </span>
                                </span>
                              </div>
                              <div>
                                {{ engineer.first_name }}
                                {{ engineer.last_name }}
                              </div>
                            </div>
                          </td>
                          <td>
                            {{ engineer.mobile }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <!-- Empty State -->
              <div
                v-if="SelectedEngineers.length === 0"
                class="text-center py-10 px-4"
              >
                <div class="symbol symbol-100px symbol-circle mb-5 mx-auto">
                  <span class="symbol-label bg-light-warning">
                    <i class="fas fa-users fs-2x text-warning"></i>
                  </span>
                </div>
                <h4 class="mb-2">No Engineers Assigned</h4>
                <p class="text-muted fs-5">
                  Select engineers from the dropdown above to assign them to
                  this task
                </p>
              </div>
            </div>
          </div>
          <!--end::Step 2-->

          <!--begin::Step 3-->
          <div data-kt-stepper-element="content">
            <div class="w-100">
              <!-- Instrument Selection Card -->
              <div class="card shadow-sm mb-6">
                <div class="card-body p-6">
                  <div class="row mb-6">
                    <div class="form-group col-12">
                      <label
                        class="d-flex align-items-center fs-5 font-semibold mb-4 required"
                      >
                        <span>Select Instrument</span>
                        <i
                          class="fas fa-exclamation-circle ms-2 fs-7 text-muted"
                          data-bs-toggle="tooltip"
                          title="Select at least one instrument"
                        ></i>
                      </label>
                      <div>
                        <el-select
                          v-model="itemDetails.instruments"
                          multiple
                          clearable
                          collapse-tags
                          placeholder="Select"
                          popper-class="custom-header"
                          :max-collapse-tags="1"
                          style="width: 100%"
                        >
                          <!-- Header slot with el-checkbox -->
                          <el-checkbox
                            class="form-control form-control-transparent"
                            v-model="checkAll"
                            :indeterminate="indeterminate"
                            @change="handleCheckAll"
                          >
                            All
                          </el-checkbox>
                          <el-option
                            v-for="item in AvailableInstruments"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                          />
                        </el-select>
                      </div>
                    </div>
                  </div>

                  <!-- No Instruments Available Alert -->
                  <div
                    v-if="AvailableInstruments.length === 0"
                    class="alert alert-danger mt-4 p-4 fs-5 rounded text-start"
                  >
                    <i class="fas fa-exclamation-triangle me-2"></i>
                    No instruments are currently available.
                  </div>
                </div>
              </div>

              <!-- Selected Instruments Section -->
              <div class="card shadow-sm" v-if="SelectedInstruments.length > 0">
                <div class="card-header border-0 pt-5 pb-3">
                  <div class="card-title d-flex flex-column">
                    <h3 class="text-gray-800 mb-1 fs-4">
                      Selected Instruments
                    </h3>
                    <span class="text-muted fs-6">
                      {{ SelectedInstruments.length }} instrument{{
                        SelectedInstruments.length !== 1 ? "s" : ""
                      }}
                      selected
                    </span>
                  </div>
                </div>

                <div class="card-body pt-0">
                  <div class="table-responsive">
                    <table
                      class="table align-middle table-row-dashed fs-6 gy-4"
                    >
                      <!-- Table Head -->
                      <thead>
                        <tr
                          class="text-start text-gray-500 fs-7 text-uppercase"
                        >
                          <th class="w-125px">Instrument ID</th>
                          <th class="min-w-200px">Name</th>
                          <th class="min-w-125px">Manufacturer</th>
                          <th class="min-w-125px">Model</th>
                          <th class="min-w-125px">Serial No</th>
                        </tr>
                      </thead>

                      <!-- Table Body -->
                      <tbody>
                        <tr
                          v-for="instrument in SelectedInstruments"
                          :key="instrument.id"
                        >
                          <td>
                            {{ instrument.instrument_id }}
                          </td>
                          <td>
                            {{ instrument.name }}
                          </td>
                          <td>{{ instrument.make }}</td>
                          <td>{{ instrument.model_no }}</td>
                          <td>{{ instrument.serial_no }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <!-- Empty State -->
              <div
                v-if="SelectedInstruments.length === 0"
                class="text-center py-10 px-4"
              >
                <div class="symbol symbol-100px symbol-circle mb-5 mx-auto">
                  <span class="symbol-label bg-light-info">
                    <i class="fas fa-microscope fs-2x text-info"></i>
                  </span>
                </div>
                <h4 class="text-gray-800 mb-2 fs-4">No Instruments Selected</h4>
                <p class="text-muted fs-5">
                  Select instruments from the dropdown above to include them
                </p>
              </div>
            </div>
          </div>
          <!--end::Step 3-->

          <!--begin::Step 4-->
          <div class="text-gray-800" data-kt-stepper-element="content">
            <div class="w-100">
              <h2 class="mb-6 font-semibold">Summary</h2>

              <div class="mb-6">
                <!--begin::Title-->
                <h5 class="mb-4 font-semibold">Quotation:</h5>
                <!--end::Title-->

                <div class="d-flex flex-wrap py-5">
                  <div class="flex-equal me-5">
                    <p>
                      <span class="text-muted">Date:</span>
                      <span>{{ itemDetails.date }}</span>
                    </p>
                  </div>

                  <div class="flex-equal">
                    <p>
                      <span class="text-muted">Due Date:</span>
                      <span>{{ itemDetails.duedate }}</span>
                    </p>
                  </div>
                </div>

                <div class="d-flex flex-wrap py-5">
                  <div class="flex-equal me-5">
                    <p>
                      <span class="text-muted">Customer Name:</span>
                      <span>{{ itemDetails.customer.company_name }}</span>
                    </p>
                    <p>
                      <span class="text-muted">Billing Address:</span>
                    </p>
                    <p>
                      <span>
                        {{ itemDetails.customer.address1 || "" }}
                        {{ itemDetails.customer.address2 || "" }}
                        {{ itemDetails.customer.city || "" }}
                        {{ itemDetails.customer.pincode || "" }}
                        {{ itemDetails.customer.state || "" }}
                        {{ itemDetails.customer.country || "" }}
                      </span>
                    </p>
                  </div>

                  <div class="flex-equal">
                    <p>
                      <span class="text-muted">Client Name:</span>
                      <span>{{ itemDetails.client.company_name }}</span>
                    </p>
                    <p>
                      <span class="text-muted">Site Address:</span>
                    </p>
                    <p>
                      <span>
                        {{ itemDetails.client.address1 || "" }}
                        {{ itemDetails.client.address2 || "" }}
                        {{ itemDetails.client.city || "" }}
                        {{ itemDetails.client.pincode || "" }}
                        {{ itemDetails.client.state || "" }}
                        {{ itemDetails.client.country || "" }}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div class="mb-6">
                <h5 class="mb-4 font-semibold">Engineers:</h5>

                <div class="table-responsive mh-300px">
                  <table
                    class="table table-striped table-bordered table-hover align-middle"
                  >
                    <thead class="sticky-top bg-light">
                      <tr
                        class="border-bottom border-gray-200 text-start text-muted font-semibold fs-7 text-uppercase gs-0"
                      >
                        <th class="min-w-50px">Sr.no</th>
                        <th class="min-w-250px">Engineer Name</th>
                        <th class="text-end">Mobile</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(engineer, index) in SelectedEngineers"
                        :key="engineer.id"
                      >
                        <td>{{ index + 1 }}</td>
                        <td>
                          {{ engineer.first_name }} {{ engineer.last_name }}
                        </td>
                        <td class="text-end">{{ engineer.mobile }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="mt-6">
                <h5 class="mb-4 font-semibold">Instruments:</h5>

                <div class="table-responsive mh-300px">
                  <table
                    class="table table-striped table-bordered table-hover align-middle"
                  >
                    <thead class="sticky-top bg-light">
                      <tr
                        class="border-bottom border-gray-200 text-start text-muted font-semibold fs-7 text-uppercase gs-0"
                      >
                        <th class="min-w-125px">Instrument ID</th>
                        <th class="min-w-150px">Name</th>
                        <th class="min-w-125px">Made By</th>
                        <th class="min-w-125px">Model No</th>
                        <th class="text-end min-w-125px">Serial No</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="instrument in SelectedInstruments"
                        :key="instrument.id"
                      >
                        <td>{{ instrument.instrument_id }}</td>
                        <td>{{ instrument.name }}</td>
                        <td>{{ instrument.make }}</td>
                        <td>{{ instrument.model_no }}</td>
                        <td class="text-end">{{ instrument.serial_no }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <!--end::Step 4-->

          <!-- Stepper Actions -->
          <div class="d-flex flex-stack pt-15">
            <!-- Back Button -->
            <div>
              <button
                type="button"
                class="btn btn-flex btn-outline btn-outline-primary border-primary bg-transparent bg-hover-light-primary"
                data-kt-stepper-action="previous"
                @click="previousStep"
              >
                <span class="svg-icon svg-icon-3 me-2">
                  <KTIcon icon-name="arrow-left" icon-class="text-primary" />
                </span>
                <span class="fw-semibold text-primary">Back</span>
              </button>
            </div>

            <!-- Next/Submit Buttons -->
            <div>
              <template v-if="currentStepIndex === totalSteps - 1">
                <!-- Submit Button (now matching Next style) -->
                <button
                  type="button"
                  class="btn btn-flex btn-primary px-6 py-3 shadow-sm"
                  data-kt-stepper-action="submit"
                  @click="formSubmit()"
                >
                  <span class="indicator-label">
                    <span class="fw-bold fs-5 text-white">Submit</span>
                    <span class="svg-icon svg-icon-2 ms-2">
                      <KTIcon icon-name="arrow-right" icon-class="text-white" />
                    </span>
                  </span>
                  <span class="indicator-progress">
                    <span class="fw-semibold fs-5 text-white">Processing</span>
                    <span
                      class="spinner-border spinner-border-sm align-middle ms-2 text-white"
                    ></span>
                  </span>
                </button>
              </template>
              <template v-else>
                <!-- Continue Button -->
                <button
                  type="submit"
                  class="btn btn-flex btn-primary px-6 py-3 shadow-sm"
                >
                  <span class="d-flex align-items-center">
                    <span class="fw-bold fs-5 text-white">Next</span>
                    <span class="svg-icon svg-icon-2 ms-2">
                      <KTIcon icon-name="arrow-right" icon-class="text-white" />
                    </span>
                  </span>
                </button>
              </template>
            </div>
          </div>
          <!--end::Actions-->
        </form>
        <!--end::Form-->
      </div>
      <!--end::Stepper-->
    </div>
    <!--end::Card body-->
  </div>
  <!--end::Card-->
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

import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import {
  GetAppovedQuotationsList,
  addRGatePass,
  checkEngineerAndInstrument,
  getAvailableEngineers,
  getAvailableInstruments,
} from "@/stores/api";
import ApiService from "@/core/services/ApiService";

interface Engineer {
  id: string;
  first_name: string;
  last_name: string;
  mobile: string;
}

interface Instrument {
  id: string;
  instrument_id: string;
  name: string;
  make: string;
  model_no: string;
  serial_no: string;
  calibration_date: string;
  calibration_due_date: string;
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

interface QuotationData {
  id: string;
  client_id: string;
  customer_id: string;
  quotation_no: string;
  customer: Data;
  client: Data;
}

interface IStep1 {}

interface IStep2 {}

interface IStep3 {}

interface IStep4 {}

interface ItemDetail {
  rgp_no: string;
  date: string;
  duedate: string;
  quotation_id: string;
  quotation_no: string;
  instruments: string[];
  engineers: string[];
  customer: Data;
  client: Data;
  status: number;
  approval_status: number;
  company_id: number;
  created_by: string;
  updated_by: string;
  is_active: number;
}

interface CreateAccount extends IStep1, IStep2, IStep3, IStep4 {}
import type { CheckboxValueType } from "element-plus";

export default defineComponent({
  name: "rgp-add-1",
  setup() {
    const _stepperObj = ref<StepperComponent | null>(null);
    const horizontalWizardRef = ref<HTMLElement | null>(null);
    const currentStepIndex = ref(0);
    const loading = ref(false);

    const auth = useAuthStore();
    const route = useRouter();
    const User = auth.GetUser();

    const itemDetails = ref<ItemDetail>({
      rgp_no: "",
      date: "",
      duedate: "",
      engineers: [],
      instruments: [],
      quotation_id: "",
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
      status: 1,
      approval_status: 1,
      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
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
      console.log(itemDetails.value[dateType]);
    }

    /* --------QUOTATION DATA LOGIC--------*/
    const Quotations = ref<QuotationData[]>([]);

    const GetApprovedQuotations = async () => {
      try {
        ApiService.setHeader();
        const company_ID = User.company_id;
        const response = await GetAppovedQuotationsList(company_ID);

        if (response.success) {
          if (response.result != null && response.result) {
            Quotations.value = response.result.map(
              ({ id, customer, client, ...rest }) => ({
                id: id,
                customer: customer,
                client: client,
                ...rest,
              })
            );
          }
        } else {
          console.error(
            `Error Occured in GetAppovedQuotationsList : ${
              response.message || "Error Occured in API"
            }`
          );
        }
      } catch (err) {
        console.error(`Error Occured in GetAppovedQuotationsList : ${err}`);
      }
    };

    /* --------SET QUOTATION DATA LOGIC--------*/
    const setQuotation = async (data: any) => {
      if (data != "") {
        const quotation = Quotations.value.find(
          (item) => item.id == itemDetails.value.quotation_id
        );

        if (quotation) {
          itemDetails.value.quotation_id = quotation.id ? quotation.id : "";
          itemDetails.value.quotation_no = quotation.quotation_no
            ? quotation.quotation_no
            : "";
          itemDetails.value.customer = { ...quotation.customer };
          itemDetails.value.client = { ...quotation.client };
        }
      }
    };

    /* ENGINEER DATA LOGIC */
    const AvailableEngineers = ref<Engineer[]>([]);
    async function engineer_listing(): Promise<void> {
      try {
        const company_id = User.company_id;
        const response = await getAvailableEngineers(company_id);

        if (response.success) {
          if (response.result != null && response.result) {
            AvailableEngineers.value = response.result.map(({ ...rest }) => ({
              ...rest,
            }));
          }
        } else {
          console.error(
            `Error Occured in getAvailableEngineers : ${
              response.message || "Error Occured in API"
            }`
          );
        }
      } catch (err) {
        console.error(`Error Occured in getAvailableEngineers : ${err}`);
      }
    }

    // Computed Property for Selected Instrument
    const SelectedEngineers = computed(() => {
      return AvailableEngineers.value.filter((eng) =>
        itemDetails.value.engineers.includes(eng.id)
      );
    });

    /* INSTRUMENT DATA LOGIC */
    const AvailableInstruments = ref<Instrument[]>([]);
    async function instrument_listing(): Promise<void> {
      try {
        const company_id = User.company_id;
        const response = await getAvailableInstruments(company_id);

        if (response.success) {
          if (response.result != null && response.result) {
            AvailableInstruments.value = response.result.map(({ ...rest }) => ({
              ...rest,
            }));
          }
        } else {
          console.error(
            `Error Occured in getAvailableInstruments : ${
              response.message || "Error Occured in API"
            }`
          );
        }
      } catch (err) {
        console.error(`Error Occured in getAvailableInstruments : ${err}`);
      }
    }
    // Computed Property for Selected Instrument
    const SelectedInstruments = computed(() => {
      return AvailableInstruments.value.filter((inst) =>
        itemDetails.value.instruments.includes(inst.id)
      );
    });

    onMounted(async () => {
      Quotations.value = [];
      AvailableEngineers.value = [];
      AvailableInstruments.value = [];

      // Get Approved Quotations
      await GetApprovedQuotations();
      // Get Available Engineers
      await engineer_listing();
      // Get Available Instruments
      await instrument_listing();

      _stepperObj.value = StepperComponent.createInsance(
        horizontalWizardRef.value as HTMLElement
      );
    });

    const createAccountSchema = [];

    const currentSchema = computed(() => {
      return createAccountSchema[currentStepIndex.value];
    });

    const { resetForm, handleSubmit } = useForm<
      IStep1 | IStep2 | IStep3 | IStep4
    >({
      // validationSchema: currentSchema,
    });

    const totalSteps = computed(() => {
      if (_stepperObj.value) {
        return _stepperObj.value.totalStepsNumber;
      } else {
        return 1;
      }
    });

    const handleStep = handleSubmit((values) => {
      if (currentStepIndex.value === 0) {
        if (
          itemDetails.value.date &&
          itemDetails.value.duedate &&
          itemDetails.value.quotation_id &&
          itemDetails.value.quotation_no
        ) {
          currentStepIndex.value++;

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
        if (
          itemDetails.value.engineers &&
          itemDetails.value.engineers.length > 0
        ) {
          currentStepIndex.value++;

          if (!_stepperObj.value) {
            return;
          }

          _stepperObj.value.goNext();
        } else {
          Swal.fire({
            icon: "info",
            title: "Please select at least one engineer",
          });
          return;
        }
      } else if (currentStepIndex.value === 2) {
        if (
          itemDetails.value.instruments &&
          itemDetails.value.instruments.length > 0
        ) {
          currentStepIndex.value++;

          if (!_stepperObj.value) {
            return;
          }

          _stepperObj.value.goNext();
        } else {
          Swal.fire({
            icon: "info",
            title: "Please select at least one instrument",
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

    const validateForm = (formData) => {
      for (const key in formData) {
        let value = formData[key];
        if (key !== "rgp_no") {
          if (Array.isArray(value)) {
            if (value.length === 0) {
              // Return false if the array is empty
              return false;
            }
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

    const formSubmit = async () => {
      loading.value = true;

      const result = validateForm(itemDetails.value);
      if (result == false) {
        loading.value = false;
        showErrorAlert(
          "Warning",
          "Please fill all the details correctly. And Try Again."
        );
        return;
      }

      try {
        // check whether if any instrument / engineer already selected by another user
        const resp = await checkEngineerAndInstrument(itemDetails.value);

        if (resp.success) {
          // Now add the RGP and update the status of engineers and instruments
          const response = await addRGatePass(itemDetails.value);

          if (response?.success) {
            // Handle successful API response
            loading.value = false;
            showSuccessAlert(
              "Success",
              response.message || "Returnable Gate pass successfully Added!"
            );

            route.push({ name: "rgp-list" });
          } else {
            // Handle API error response
            loading.value = false;
            showErrorAlert("Error", response.message || "An error occurred.");
          }
        } else {
          // Handle API error response
          loading.value = false;
          showErrorAlert("Error", resp.message || "An error occurred.");
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

    /* INSTRUMENT CHECK ALL CHECKBOX LOGIC */
    const checkAll = ref(false);
    const indeterminate = ref(false);

    watch(itemDetails.value.instruments, (val) => {
      if (val.length === 0) {
        checkAll.value = false;
        indeterminate.value = false;
      } else if (val.length === AvailableInstruments.value.length) {
        checkAll.value = true;
        indeterminate.value = false;
      } else {
        indeterminate.value = true;
      }
    });

    const handleCheckAll = (val: CheckboxValueType) => {
      indeterminate.value = false;
      if (val) {
        itemDetails.value.instruments = AvailableInstruments.value.map(
          (instrument) => instrument.id
        );
      } else {
        itemDetails.value.instruments = [];
      }
    };

    return {
      horizontalWizardRef,
      previousStep,
      handleStep,
      formSubmit,
      totalSteps,
      currentStepIndex,
      getAssetPath,
      itemDetails,
      Quotations,
      AvailableEngineers,
      SelectedEngineers,
      AvailableInstruments,
      SelectedInstruments,
      setDates,
      setQuotation,
      loading,
      checkAll,
      indeterminate,
      handleCheckAll,
    };
  },
});
</script>

<style lang="scss" scoped>
.custom-header {
  .el-checkbox {
    display: flex;
    height: unset;
  }
}
</style>