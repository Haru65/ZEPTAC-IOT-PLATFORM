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
        <div class="stepper-nav py-5 mt-5">
          <!--begin::Step 1-->
          <div class="stepper-item current" data-kt-stepper-element="nav">
            <h3 class="stepper-title">Gate Pass</h3>
          </div>
          <!--end::Step 1-->

          <!--begin::Step 2-->
          <div class="stepper-item" data-kt-stepper-element="nav">
            <h3 class="stepper-title">Expenses</h3>
          </div>
          <!--end::Step 2-->

          <!--begin::Step 3-->
          <div class="stepper-item" data-kt-stepper-element="nav">
            <h3 class="stepper-title">Summary</h3>
          </div>
          <!--end::Step 3-->
        </div>
        <!--end::Nav-->

        <!--begin::Form-->
        <form
          class="mx-auto w-100 p-2"
          novalidate
          id="kt_create_account_form"
          @submit="handleStep"
        >
          <!--begin::Step 1-->
          <div
            class="current text-gray-800 fs-6"
            data-kt-stepper-element="content"
          >
            <div class="w-100">
              <!-- Returnable Gate Pass Selection -->
              <div class="row g-6 mb-4">
                <div class="col-12">
                  <label class="form-label required font-semibold"
                    >Returnable Gate Pass</label
                  >
                  <el-select
                    v-model="itemDetails.rgp_id"
                    filterable
                    placeholder="Please Select GatePass"
                    @change="fetchRGP(itemDetails.rgp_id)"
                    class="w-100"
                  >
                    <el-option
                      v-for="item in RGatePasses"
                      :key="item.id"
                      :value="item.id"
                      :label="item.rgp_no"
                    />
                    <el-option
                      value=""
                      disabled
                      label="Please Select GatePass"
                    />
                  </el-select>
                </div>
              </div>

              <!-- Customer/Client Info -->
              <div class="row g-6 mb-4" v-if="itemDetails.rgp_id">
                <div class="col-md-6">
                  <div class="border rounded p-3 h-100">
                    <label class="font-semibold mb-2">Customer</label>
                    <div class="small">
                      <div>
                        {{ RgpData?.quotation.customer.company_name || "" }}
                      </div>
                      <div class="mt-2 font-semibold">Billing Address:</div>
                      <div>
                        {{ RgpData?.quotation.customer.name || "" }}<br />
                        <template
                          v-if="RgpData?.quotation.customer.company_name"
                        >
                          {{ RgpData?.quotation.customer.company_name }}<br />
                          {{ RgpData?.quotation.customer.address1 || "" }}<br />
                          {{ RgpData?.quotation.customer.address2 || "" }}<br />
                        </template>
                        <template v-if="RgpData?.quotation.customer.country">
                          {{ RgpData?.quotation.customer.city || "" }} -
                          {{ RgpData?.quotation.customer.pincode || "" }}<br />
                          {{ RgpData?.quotation.customer.state || "" }}
                          {{ RgpData?.quotation.customer.country || "" }}
                        </template>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="border rounded p-3 h-100">
                    <label class="font-semibold mb-2">Client</label>
                    <div class="small">
                      <div>
                        {{ RgpData?.quotation.clientx.company_name || "" }}
                      </div>
                      <div class="mt-2 font-semibold">Site Address:</div>
                      <div>
                        {{ RgpData?.quotation.clientx.name || "" }}<br />
                        <template
                          v-if="RgpData?.quotation.clientx.company_name"
                        >
                          {{ RgpData?.quotation.clientx.company_name }}<br />
                          {{ RgpData?.quotation.clientx.address1 || "" }}<br />
                          {{ RgpData?.quotation.clientx.address2 || "" }}<br />
                        </template>
                        <template v-if="RgpData?.quotation.clientx.country">
                          {{ RgpData?.quotation.clientx.city || "" }} -
                          {{ RgpData?.quotation.clientx.pincode || "" }}<br />
                          {{ RgpData?.quotation.clientx.state || "" }}
                          {{ RgpData?.quotation.clientx.country || "" }}
                        </template>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Engineers Selection -->
              <div class="row g-6 mb-4">
                <div class="col-12">
                  <label class="form-label required font-semibold"
                    >Engineers</label
                  >
                  <el-select
                    filterable
                    placeholder="Select Service Engineer..."
                    name="engineer_id"
                    v-model="itemDetails.engineer_id"
                    @change="setEngineer"
                    class="w-100"
                  >
                    <el-option
                      v-for="engineer in Engineers"
                      :key="engineer.id"
                      :value="engineer.id"
                      :label="`${engineer.first_name} ${engineer.last_name}`"
                    />
                    <el-option
                      value=""
                      disabled
                      label="Select Service Engineer..."
                    />
                  </el-select>
                </div>
              </div>

              <!-- Date Information -->
              <div class="row g-6 mb-4">
                <div class="col-md-6">
                  <label class="form-label required font-semibold"
                    >From Date</label
                  >
                  <div class="form-control form-control-transparent">
                    {{ RgpData?.date || "" }}
                  </div>
                </div>
                <div class="col-md-6">
                  <label class="form-label required font-semibold"
                    >Till Date</label
                  >
                  <div class="form-control form-control-transparent">
                    {{ RgpData?.duedate || "" }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--end::Step 1-->

          <!--begin::Step 2-->
          <div class="text-gray-800 fs-6" data-kt-stepper-element="content">
            <div class="w-100">
              <div class="table-responsive mb-10">
                <!--begin::Table-->
                <table class="table align-middle g-5 gs-0 mb-0 w-100">
                  <!--begin::Table head-->
                  <thead>
                    <tr
                      class="fs-4 fw-bold text-gray-700 text-uppercase text-center"
                    >
                      <th class="min-w-300px">Your Expenses</th>
                    </tr>
                  </thead>
                  <!--end::Table head-->

                  <!--begin::Table body-->
                  <tbody>
                    <tr
                      v-for="(task, index) in itemDetails.expenses"
                      :key="task.id"
                    >
                      <td class="pt-8">
                        <div
                          class="shadow-sm p-6 mb-6 rounded bg-light bg-opacity-10 position-relative"
                        >
                          <!-- Numbering Badge -->
                          <div
                            class="position-absolute top-0 start-0 translate-middle-y ms-4"
                          >
                            <span
                              class="badge badge-circle bg-primary text-white fs-5"
                              >#{{ index + 1 }}</span
                            >
                          </div>

                          <!-- Date, Expense Type and Amount in single row -->
                          <div class="row g-4 mb-4">
                            <!-- Date -->
                            <div class="col-12 col-md-4">
                              <label
                                class="form-label font-semibold d-block d-md-none"
                                >Date</label
                              >
                              <el-date-picker
                                type="date"
                                :name="'date_' + index"
                                v-model="task.date"
                                @change="setExpenseDate($event, index)"
                                placeholder="Date"
                                class="w-100"
                                :editable="false"
                              />
                            </div>

                            <!-- Expense Type -->
                            <div class="col-12 col-md-4">
                              <label
                                class="form-label font-semibold d-block d-md-none"
                                >Expense Type</label
                              >
                              <el-select
                                :name="'type_' + index"
                                filterable
                                v-model="task.id"
                                @change="setExpenseType($event, index)"
                                placeholder="Type"
                                class="w-100"
                              >
                                <el-option
                                  v-for="ele in ExpenseTypes"
                                  :key="ele.id"
                                  :label="ele.type"
                                  :value="ele.id"
                                />
                              </el-select>
                            </div>

                            <!-- Amount -->
                            <div class="col-12 col-md-4">
                              <label
                                class="form-label font-semibold d-block d-md-none"
                                >Amount</label
                              >
                              <div class="input-group">
                                <span class="input-group-text">₹</span>
                                <input
                                  type="text"
                                  :name="'amount_' + index"
                                  v-model="task.amount"
                                  @keyup="setExpenseAmount($event, index)"
                                  class="form-control form-control-solid"
                                  placeholder="0.00"
                                />
                              </div>
                            </div>
                          </div>

                          <!-- Description -->
                          <div class="row g-4 mb-4">
                            <div class="col-12">
                              <label class="form-label font-semibold"
                                >Description</label
                              >
                              <textarea
                                :name="'description_' + index"
                                v-model="task.description"
                                rows="2"
                                class="form-control form-control-solid"
                                placeholder="Expense details..."
                              ></textarea>
                            </div>
                          </div>

                          <!-- Receipt Upload and Preview -->
                          <div class="row g-4">
                            <!-- Receipt Upload -->
                            <div class="col-12 col-md-6">
                              <label class="form-label font-semibold"
                                >Receipt</label
                              >
                              <input
                                type="file"
                                class="form-control form-control-solid"
                                :name="'receipt_' + index"
                                accept="image/png,jpg,jpeg"
                                @change="setExpenseImage($event, index)"
                              />
                            </div>

                            <!-- Receipt Preview -->
                            <div class="col-12 col-md-6" v-if="task.receipt">
                              <label class="form-label font-semibold"
                                >Preview</label
                              >
                              <div class="rounded p-2 text-center bg-white">
                                <img
                                  :src="'data:image/png;base64,' + task.receipt"
                                  class="img-fluid rounded max-h-150px border"
                                  alt="Receipt"
                                />
                              </div>
                            </div>
                          </div>

                          <!-- Delete Button -->
                          <div class="row mt-4">
                            <div class="col-12 text-end">
                              <button
                                @click="RemoveExpense(index)"
                                class="btn btn-icon btn-light-danger"
                                type="button"
                                title="Remove expense"
                              >
                                <i class="bi bi-trash fs-2"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                  <!--end::Table body-->

                  <!-- Table Footer with Add and Total -->
                  <tfoot>
                    <tr>
                      <td class="pt-6">
                        <div
                          class="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3"
                        >
                          <button
                            @click="addNewItem"
                            class="btn btn-primary w-100 w-md-auto"
                            type="button"
                          >
                            <i class="bi bi-plus fs-2 me-2"></i>
                            Add Expense
                          </button>
                          <div
                            class="d-flex align-items-center w-100 w-md-auto justify-content-center justify-content-md-end"
                          >
                            <span class="fs-4 fw-semibold text-gray-700 me-3"
                              >Total:</span
                            >
                            <span class="fs-3 fw-bold text-primary">
                              ₹{{ itemDetails.total_amount || "0.00" }}
                            </span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
          <!--end::Step 2-->

          <!--begin::Step 3-->
          <div class="text-gray-800 fs-6" data-kt-stepper-element="content">
            <div class="w-100">
              <h2 class="fw-bold text-gray-800 mb-6">Summary</h2>

              <!-- Gate Pass Section -->
              <div class="card card-flush shadow-sm mb-6">
                <div class="card-header">
                  <h3 class="card-title fw-bold">Gate Pass Details</h3>
                </div>
                <div class="card-body pt-0">
                  <div class="row g-6 mb-4">
                    <!-- Left Column -->
                    <div class="col-md-6">
                      <div class="d-flex flex-column gap-4">
                        <div>
                          <span class="text-gray-600 fw-semibold d-block mb-1"
                            >Date:</span
                          >
                          <span class="text-gray-800">{{
                            RgpData?.date || "-"
                          }}</span>
                        </div>
                        <div>
                          <span class="text-gray-600 fw-semibold d-block mb-1"
                            >RGP No:</span
                          >
                          <span class="text-gray-800">{{
                            RgpData?.rgp_no || "-"
                          }}</span>
                        </div>
                      </div>
                    </div>

                    <!-- Right Column -->
                    <div class="col-md-6">
                      <div class="d-flex flex-column gap-4">
                        <div>
                          <span class="text-gray-600 fw-semibold d-block mb-1"
                            >Due Date:</span
                          >
                          <span class="text-gray-800">{{
                            RgpData?.duedate || "-"
                          }}</span>
                        </div>
                        <div>
                          <span class="text-gray-600 fw-semibold d-block mb-1"
                            >Quotation No:</span
                          >
                          <span class="text-gray-800">{{
                            RgpData?.quotation.quotation_no || "-"
                          }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Customer/Client Section -->
              <div class="row g-6 mb-6">
                <!-- Customer Card -->
                <div class="col-md-6">
                  <div class="card card-flush shadow-sm h-100">
                    <div class="card-header">
                      <h3 class="card-title fw-bold">Customer Information</h3>
                    </div>
                    <div class="card-body pt-0">
                      <div class="mb-4">
                        <span class="text-gray-600 fw-semibold d-block mb-1"
                          >Name:</span
                        >
                        <span class="text-gray-800">{{
                          RgpData?.quotation.customer.company_name || "-"
                        }}</span>
                      </div>
                      <div>
                        <span class="text-gray-600 fw-semibold d-block mb-1"
                          >Billing Address:</span
                        >
                        <div class="text-gray-800">
                          <div>
                            {{ RgpData?.quotation.customer.name || "" }}
                          </div>
                          <template
                            v-if="RgpData?.quotation.customer.company_name"
                          >
                            <div>
                              {{ RgpData?.quotation.customer.company_name }}
                            </div>
                          </template>
                          <div>
                            {{ RgpData?.quotation.customer.address1 || "" }}
                          </div>
                          <div>
                            {{ RgpData?.quotation.customer.address2 || "" }}
                          </div>
                          <div>
                            {{ RgpData?.quotation.customer.city || "" }}
                            <template
                              v-if="RgpData?.quotation.customer.pincode"
                            >
                              - {{ RgpData?.quotation.customer.pincode }}
                            </template>
                          </div>
                          <div>
                            {{ RgpData?.quotation.customer.state || "" }}
                            {{ RgpData?.quotation.customer.country || "" }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Client Card -->
                <div class="col-md-6">
                  <div class="card card-flush shadow-sm h-100">
                    <div class="card-header">
                      <h3 class="card-title fw-bold">Client Information</h3>
                    </div>
                    <div class="card-body pt-0">
                      <div class="mb-4">
                        <span class="text-gray-600 fw-semibold d-block mb-1"
                          >Name:</span
                        >
                        <span class="text-gray-800">{{
                          RgpData?.quotation.clientx.company_name || "-"
                        }}</span>
                      </div>
                      <div>
                        <span class="text-gray-600 fw-semibold d-block mb-1"
                          >Site Address:</span
                        >
                        <div class="text-gray-800">
                          <div>{{ RgpData?.quotation.clientx.name || "" }}</div>
                          <template
                            v-if="RgpData?.quotation.clientx.company_name"
                          >
                            <div>
                              {{ RgpData?.quotation.clientx.company_name }}
                            </div>
                          </template>
                          <div>
                            {{ RgpData?.quotation.clientx.address1 || "" }}
                          </div>
                          <div>
                            {{ RgpData?.quotation.clientx.address2 || "" }}
                          </div>
                          <div>
                            {{ RgpData?.quotation.clientx.city || "" }}
                            <template v-if="RgpData?.quotation.clientx.pincode">
                              - {{ RgpData?.quotation.clientx.pincode }}
                            </template>
                          </div>
                          <div>
                            {{ RgpData?.quotation.clientx.state || "" }}
                            {{ RgpData?.quotation.clientx.country || "" }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Expenses Section -->
              <div class="card card-flush shadow-sm">
                <div class="card-header">
                  <h3 class="card-title fw-bold">Expenses Summary</h3>
                </div>
                <div class="card-body pt-0">
                  <div class="table-responsive">
                    <table
                      class="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3"
                    >
                      <!-- Table Head -->
                      <thead>
                        <tr class="fw-bold text-gray-600 border-bottom-1">
                          <th class="min-w-50px">#</th>
                          <th class="min-w-200px">Type</th>
                          <th class="min-w-150px text-end">Amount</th>
                          <th class="min-w-150px text-end">Date</th>
                        </tr>
                      </thead>

                      <!-- Table Body -->
                      <tbody>
                        <tr
                          v-for="(expense, index) in itemDetails.expenses"
                          :key="index"
                        >
                          <td>{{ index + 1 }}</td>
                          <td>{{ expense.type || "-" }}</td>
                          <td class="text-end">
                            ₹{{ expense.amount || "0.00" }}
                          </td>
                          <td class="text-end">{{ expense.date || "-" }}</td>
                        </tr>
                      </tbody>

                      <!-- Table Footer -->
                      <tfoot class="fw-bold bg-light">
                        <tr>
                          <td colspan="2" class="text-end">Total</td>
                          <td class="text-end">
                            ₹{{ itemDetails.total_amount || "0.00" }}
                          </td>
                          <td></td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--end::Step 3-->

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
import { computed, defineComponent, onMounted, ref } from "vue";
import { StepperComponent } from "@/assets/ts/components";
import { useForm } from "vee-validate";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";
import moment from "moment";

import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import {
  addExpenseSheet,
  getOnGoingCompletedRGP,
  getRGatePass,
} from "@/stores/api";
import ApiService from "@/core/services/ApiService";
import { ExpenseTypes } from "@/core/model/expensetypes";

interface IStep1 {}

interface IStep2 {}

interface IStep3 {}

interface Expense {
  id: string;
  date: string;
  type: string;
  description: string;
  amount: string;
  receipt: string;
}

interface Engineer {
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

interface RGPInformation {
  id: string;
  rgp_no: string;
  quotation_id: string;
  date: string;
  duedate: string;
  engineers: string[];
  Engineers: Array<Engineer>;
  quotation: Quotation;
}

interface ItemDetail {
  rgp_id: string;
  expenses: Array<Expense>;
  engineer_id: string;
  engineer_first_name: string;
  engineer_last_name: string;
  total_amount: number;
  status: string;
  company_id: number;
  created_by: string;
  updated_by: string;
  is_active: number;
}

interface CreateAccount extends IStep1, IStep2, IStep3 {}

export default defineComponent({
  name: "expensesheet-add",
  setup() {
    const _stepperObj = ref<StepperComponent | null>(null);
    const horizontalWizardRef = ref<HTMLElement | null>(null);
    const currentStepIndex = ref(0);
    const loading = ref(false);

    const auth = useAuthStore();
    const route = useRouter();
    const User = auth.GetUser();

    const RGatePasses = ref<RGP[]>([]);
    const Engineers = ref<Engineer[]>([]);

    const RgpData = ref<RGPInformation>();

    const itemDetails = ref<ItemDetail>({
      rgp_id: "",
      expenses: [],
      total_amount: 0,
      engineer_id: "",
      engineer_first_name: "",
      engineer_last_name: "",
      status: "1",
      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
      is_active: 1,
    });

    /* --------HANDLE RGP SELECTION LOGIC--------*/
    const fetchRGP = async (rgpId: any) => {
      itemDetails.value.engineer_id = "";
      itemDetails.value.engineer_first_name = "";
      itemDetails.value.engineer_last_name = "";
      Engineers.value = [];
      if (rgpId !== "") {
        try {
          const response = await getRGatePass(rgpId);

          if (response.success) {
            itemDetails.value.rgp_id = rgpId;
            RgpData.value = { ...response.result };
            Engineers.value = { ...response?.result.Engineers };
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

    /* --------HANDLE ENGINEER SELECTION LOGIC--------*/
    const setEngineer = async (engineerId: string | number) => {
      try {
        if (engineerId !== "") {
          const engineerDetails = await RgpData.value?.Engineers.find(
            (item) => item.id == engineerId
          );

          if (engineerDetails) {
            itemDetails.value.engineer_id = engineerDetails.id;
            itemDetails.value.engineer_first_name = engineerDetails.first_name;
            itemDetails.value.engineer_last_name = engineerDetails.last_name;
          } else {
            itemDetails.value.engineer_id = "";
            itemDetails.value.engineer_first_name = "";
            itemDetails.value.engineer_last_name = "";
          }
        }
      } catch (error) {
        console.error("Error setting engineer:", error);
      }
    };

    /* EXPENSE DATE LOGIC */
    async function setExpenseDate(e, index) {
      try {
        if (e != null) {
          if (e != "" && e != null) {
            itemDetails.value.expenses[index].date = await moment(e).format(
              "YYYY-MM-DD"
            );
          } else {
            itemDetails.value.expenses[index].date = await "";
          }
        } else {
          itemDetails.value.expenses[index].date = await "";
        }
      } catch (err) {
        itemDetails.value.expenses[index].date = await "";
      }
      console.log(itemDetails.value.expenses[index].date);
    }

    /* EXPENSE TYPE LOGIC */
    async function setExpenseType(typeId, index) {
      const findExpenseType = (await ExpenseTypes.find(
        (x) => x.id == typeId
      )) || { id: "", type: "" };
      itemDetails.value.expenses[index].id = typeId;
      itemDetails.value.expenses[index].type = findExpenseType.type;
    }

    async function setExpenseDescription(desc, index) {
      itemDetails.value.expenses[index].description = await desc.target.value;
    }

    /* EXPENSE AMOUNT LOGIC */
    async function setExpenseAmount(amount, index) {
      itemDetails.value.expenses[index].amount = await amount.target.value;
      calTotalAmount();
    }

    /* CALCULATE TOTAL EXPENSE LOGIC */
    const calTotalAmount = () => {
      const amounts = itemDetails.value.expenses.map((ele: any) =>
        Number(ele.amount.replaceAll(",", ""))
      );
      itemDetails.value.total_amount =
        amounts.length != 0 ? amounts.reduce((acc, curr) => acc + curr) : 0.0;
    };

    /* EXPENSE IMAGE LOGIC */
    async function setExpenseImage(event, index) {
      const input = event.target;

      if (input.files && input.files.length > 0) {
        const reader = new FileReader();

        reader.onload = function () {
          try {
            const base64Data = reader.result
              ?.toString()
              .replace(/^data:image\/\w+;base64,/, "");
            if (base64Data) {
              itemDetails.value.expenses[index].receipt = base64Data;
            } else {
              console.error("Error: Failed to read the image data.");
            }
          } catch (e) {
            console.error("Error:", e);
          }
        };

        // itemDetails.value.expenses[index].receipt = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    }

    const removeObjectWithId = (arr, id) => {
      console.log("remove", id);

      if (id !== -1) {
        arr.splice(id, 1);
      }

      return arr;
    };

    /* EXPENSE REMOVAL LOGIC */
    const RemoveExpense = (index) => {
      itemDetails.value.expenses = removeObjectWithId(
        itemDetails.value.expenses,
        index
      );
      calTotalAmount();
    };

    const validateForm = (formData) => {
      for (const key in formData) {
        let value = formData[key];
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
      return true;
    };

    function areAllPropertiesNotNull(array) {
      return array.every((obj) => {
        return Object.values(obj).every((prop) => prop !== "");
      });
    }

    const addNewItem = () => {
      if (itemDetails.value.expenses.length == 0) {
        itemDetails.value.expenses.push({
          id: "",
          date: "",
          type: "",
          description: "",
          amount: "",
          receipt: "",
        });
      } else {
        const result = areAllPropertiesNotNull(itemDetails.value.expenses);
        if (result) {
          itemDetails.value.expenses.push({
            id: "",
            date: "",
            type: "",
            description: "",
            amount: "",
            receipt: "",
          });
        } else {
          Swal.fire({
            icon: "info",
            title: "Please fill all the details",
          });
        }
      }
    };

    /* --------GET ALL INPROCESS AND COMPLETED RGP LOGIC--------*/
    const GetOnGoingRGP = async () => {
      try {
        ApiService.setHeader();

        const response = await getOnGoingCompletedRGP(User.company_id);

        if (response.success) {
          if (response.result != null && response.result) {
            RGatePasses.value = response.result.map(({ id, ...rest }) => ({
              id: id,
              ...rest,
            }));
          }
        } else {
          console.error(
            `Error Occured in getOnGoingCompletedRGP : ${
              response.message || "Error Occured in API"
            }`
          );
        }
      } catch (err) {
        console.error(`Error Occured in getOnGoingCompletedRGP : ${err}`);
      }
    };

    onMounted(async () => {
      // Calling
      await GetOnGoingRGP();

      _stepperObj.value = StepperComponent.createInsance(
        horizontalWizardRef.value as HTMLElement
      );
    });

    const createAccountSchema = [];

    const currentSchema = computed(() => {
      return createAccountSchema[currentStepIndex.value];
    });

    const { resetForm, handleSubmit } = useForm<IStep1 | IStep2 | IStep3>({
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
        if (itemDetails.value.rgp_id && itemDetails.value.engineer_id) {
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
        }
      } else if (currentStepIndex.value === 1) {
        if (
          itemDetails.value.expenses &&
          itemDetails.value.expenses.length > 0
        ) {
          const result = validateForm(itemDetails.value.expenses);

          if (result == false) {
            Swal.fire({
              icon: "info",
              title: "Please fill all the details",
            });
          } else {
            currentStepIndex.value++;

            if (!_stepperObj.value) {
              return;
            }

            _stepperObj.value.goNext();
          }
        } else {
          Swal.fire({
            icon: "info",
            title: "Please fill at least one expense",
          });
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
      console.log(itemDetails.value);
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
        const response = await addExpenseSheet(itemDetails.value);

        if (response?.success) {
          // Handle successful API response
          loading.value = false;
          showSuccessAlert(
            "Success",
            response.message || "Expense Sheet successfully Added!"
          );

          route.push({ name: "expensesheet-list" });
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
      horizontalWizardRef,
      previousStep,
      handleStep,
      formSubmit,
      totalSteps,
      currentStepIndex,
      getAssetPath,
      RGatePasses,
      fetchRGP,
      Engineers,
      RgpData,
      setEngineer,
      itemDetails,
      showErrorAlert,
      showSuccessAlert,
      loading,
      RemoveExpense,
      addNewItem,
      setExpenseAmount,
      setExpenseDescription,
      setExpenseType,
      setExpenseDate,
      setExpenseImage,
      calTotalAmount,
      ExpenseTypes,
    };
  },
});
</script>
