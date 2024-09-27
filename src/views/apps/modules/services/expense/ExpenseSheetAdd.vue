<template>
  <!--begin::Card-->
  <div class="card">
    <!--begin::Card body-->
    <div class="card-body">
      <!--begin::Stepper-->
      <!--begin::Stepper-->
      <div
        class="stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid"
        id="kt_modal_create_app_stepper"
        ref="createAppStepperRef"
      >
        <!--begin::Aside-->
        <div
          class="d-flex justify-content-center justify-content-xl-start flex-row-auto w-100 w-xl-300px"
        >
          <!--begin::Nav-->
          <div class="stepper-nav ps-lg-10">
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
                  <h3 class="stepper-title">Gate Pass</h3>

                  <div class="stepper-desc">pick rgp you have worked on</div>
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
                <!--begin::Icon-->

                <!--begin::Label-->
                <div class="stepper-label">
                  <h3 class="stepper-title">Expenses</h3>

                  <div class="stepper-desc">provide expense proof</div>
                </div>
                <!--begin::Label-->
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
                  <h3 class="stepper-title">Summary</h3>

                  <div class="stepper-desc">review and submit</div>
                </div>
                <!--end::Label-->
              </div>
            </div>
            <!--end::Step 3-->
          </div>
          <!--end::Nav-->
        </div>
        <!--begin::Aside-->

        <!--begin::Content-->
        <div class="flex-row-fluid py-lg-5 px-lg-15">
          <!--begin::Form-->
          <form class="form" id="kt_modal_create_app_form" @submit="handleStep">
            <!--begin::Step 1-->
            <div class="current" data-kt-stepper-element="content">
              <div class="w-100">
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
                    <div
                      class="form-control form-control-lg form-control-solid"
                    >
                      <div>
                        {{ RgpData?.quotation.customer.company_name || "" }}
                      </div>
                      <div class="mt-2 pt-4">
                        <h6 class="mt-5">Billing Address:</h6>
                        <div class="mt-2">
                          <div class="mb-1">
                            <br />
                            <span
                              v-show="RgpData?.quotation.customer.company_name"
                            >
                              {{
                                `${
                                  RgpData?.quotation.customer.company_name || ""
                                }`
                              }}
                            </span>
                            <br />
                            <span>
                              {{ `${RgpData?.quotation.customer.name || ""}` }}
                            </span>
                            <!-- v-if company_data present -->
                            <div
                              v-show="RgpData?.quotation.customer.company_name"
                            >
                              <br />
                              <span>
                                {{
                                  `${
                                    RgpData?.quotation.customer.address1 || ""
                                  }`
                                }}
                              </span>
                              <br />
                              <span>
                                {{
                                  `${
                                    RgpData?.quotation.customer.address2 || ""
                                  }`
                                }}
                              </span>
                            </div>
                            <div v-show="RgpData?.quotation.customer.country">
                              <span>
                                {{
                                  `${
                                    RgpData?.quotation.customer.city || ""
                                  } - ${
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
                    <div
                      class="form-control form-control-lg form-control-solid"
                    >
                      <div>
                        {{ RgpData?.quotation.client.company_name || "" }}
                      </div>
                      <div class="mt-2 pt-4">
                        <h6 class="mt-5">Site Address:</h6>
                        <div class="mt-2">
                          <div class="mb-1" v-show="RgpData?.quotation.client">
                            <br />
                            <span
                              v-show="RgpData?.quotation.client.company_name"
                            >
                              {{
                                `${
                                  RgpData?.quotation.client.company_name || ""
                                }`
                              }}
                            </span>
                            <br />
                            <span>
                              {{ `${RgpData?.quotation.client.name || ""}` }}
                            </span>
                            <!-- v-if company_data present -->
                            <div
                              v-show="RgpData?.quotation.client.company_name"
                            >
                              <br />
                              <span>
                                {{
                                  `${RgpData?.quotation.client.address1 || ""}`
                                }}
                              </span>
                              <br />
                              <span>
                                {{
                                  `${RgpData?.quotation.client.address2 || ""}`
                                }}
                              </span>
                            </div>
                            <div v-show="RgpData?.quotation.client.country">
                              <span>
                                {{
                                  `${RgpData?.quotation.client.city || ""} - ${
                                    RgpData?.quotation.client.pincode || ""
                                  }`
                                }}
                              </span>
                              <br />
                              <span>
                                {{
                                  `${RgpData?.quotation.client.state || ""} ${
                                    RgpData?.quotation.client.country || ""
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

                <div class="row mb-6">
                  <div class="form-group col-12">
                    <label
                      class="d-flex align-items-center fs-5 fw-semobold mb-4 col-lg-4 col-form-label required text-gray-700 text-nowrap"
                    >
                      <span>Engineers</span>
                      <i
                        class="fas fa-exclamation-circle ms-2 fs-7"
                        v-tooltip
                        title="Select at least one engineer"
                      ></i>
                    </label>
                    <div>
                      <el-select
                        filterable
                        placeholder="Select Service Engineer..."
                        name="engineer_id"
                        v-model="itemDetails.engineer_id"
                        @change="setEngineer"
                      >
                        <el-option
                          value="Select Service Engineer..."
                          disabled="disabled"
                          label="Select Service Engineer..."
                          key=""
                        >
                          Select Service Engineer...</el-option
                        >
                        <el-option
                          v-for="engineer in Engineers"
                          :key="engineer.id"
                          :value="engineer.id"
                          :label="`${engineer.first_name} ${engineer.last_name}`"
                        />
                      </el-select>
                    </div>
                  </div>
                </div>

                <!--begin::Input group-->
                <div class="row mb-6">
                  <!--begin::Col-->
                  <div class="col-md-6 fv-row mb-8 mb-sd-8">
                    <!--begin::Label-->
                    <label
                      class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                      >From Date</label
                    >
                    <!--end::Label-->

                    <!--begin::Input-->
                    <div class="form-control form-control-solid">
                      {{ RgpData?.date || "" }}
                    </div>
                    <!--end::Input-->
                  </div>
                  <!--end::Col-->
                  <!--begin::Col-->
                  <div class="col-md-6 fv-row mb-8 mb-sd-8">
                    <!--begin::Label-->
                    <label
                      class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                      >Till Date</label
                    >
                    <!--end::Label-->
                    <!--begin::Input-->
                    <div class="form-control form-control-solid">
                      {{ RgpData?.duedate || "" }}
                    </div>
                    <!--end::Input-->
                  </div>
                  <!--end::Col-->
                </div>
                <!--end::Input group-->
              </div>
            </div>
            <!--end::Step 1-->

            <!--begin::Step 2-->
            <div data-kt-stepper-element="content">
              <div class="w-100">
                <div class="table-responsive mb-10">
                  <!--begin::Table-->
                  <table
                    class="table g-5 gs-0 mb-0 w-100 fw-bold text-gray-700"
                    data-kt-element="Selects"
                  >
                    <!--begin::Table head-->
                    <thead>
                      <tr
                        class="fs-3 fw-bold text-gray-700 text-uppercase text-center"
                      >
                        <th class="">Your Expenses</th>
                      </tr>
                    </thead>
                    <!--end::Table head-->

                    <!--begin::Table body-->
                    <tbody>
                      <tr
                        v-for="(task, index) in itemDetails.expenses"
                        :key="task.id"
                        class="w-100"
                      >
                        <td class="pt-8 text-nowrap" :key="index">
                          <div
                            class="shadow-lg p-5 m-3 fs-4 rounded w-100 border"
                          >
                            <div class="row mb-2">
                              <div
                                class="form-group col-lg-4 col-sm-6 col-md-6 mb-2 mb-sd-2"
                              >
                                <el-date-picker
                                  type="date"
                                  :name="'date_' + index"
                                  class="mb-3 mb-lg-0 min-w-150px"
                                  v-model="task.date"
                                  @change="setExpenseDate($event, index)"
                                  placeholder="Pick a day"
                                />
                              </div>

                              <div
                                class="form-group col-lg-8 col-sm-6 col-md-6 mb-2 mb-sd-2"
                              >
                                <el-select
                                  :name="'type_' + index"
                                  filterable
                                  v-model="task.id"
                                  @change="setExpenseType($event, index)"
                                  placeholder="Please Select Expense Type"
                                >
                                  <el-option
                                    value=""
                                    label="Please Select Item..."
                                    disabled="disabled"
                                    key=""
                                    >Please Select Expense Type</el-option
                                  >
                                  <el-option
                                    v-for="ele in ExpenseTypes"
                                    :key="ele.id"
                                    :label="ele.type"
                                    :value="ele.id"
                                  />
                                </el-select>
                              </div>
                            </div>
                            <div class="row mb-2">
                              <div
                                class="form-group col-lg-4 col-sm-6 col-md-6 mb-2 mb-sd-2"
                              >
                                <input
                                  type="text"
                                  :name="'amount_' + index"
                                  v-model="task.amount"
                                  @keyup="setExpenseAmount($event, index)"
                                  class="form-control form-control-lg form-control-solid mb-3 mb-lg-0 min-w-150px"
                                  placeholder="Enter Amount (₹ 0.00)"
                                />
                              </div>
                              <div
                                class="form-group col-lg-8 col-sm-6 col-md-6 mb-2 mb-sd-2"
                              >
                                <input
                                  type="textarea"
                                  :name="'description_' + index"
                                  v-model="task.description"
                                  rows="2"
                                  class="form-control form-control-lg form-control-solid"
                                  placeholder="write more about expense..."
                                />
                              </div>
                            </div>
                            <div class="row mb-2">
                              <div class="form-group col-lg-12 mb-2 mb-sd-2">
                                <input
                                  type="file"
                                  class="form-control form-control-file form-control-lg form-control-solid"
                                  :name="'receipt_' + index"
                                  accept="image/png,jpg,jpeg"
                                  @change="setExpenseImage($event, index)"
                                />
                              </div>
                            </div>
                            <div class="row mb-2">
                              <div class="form-group col-lg-12 mb-2 mb-sd-2">
                                <div class="border p-2 mt-3">
                                  <template v-if="task.receipt">
                                    <img
                                      :src="
                                        'data:image/png;base64,' + task.receipt
                                      "
                                      class="rounded mx-auto d-block w-200px h-200px"
                                    />
                                  </template>
                                </div>
                              </div>
                            </div>

                            <div class="row mb-2">
                              <div
                                class="form-group d-flex flex-end col-lg-12 mb-2 mb-sd-2"
                              >
                                <div>
                                  <span>
                                    <i
                                      @click="RemoveExpense(index)"
                                      class="bi bi-trash btn btn-light text-gray-700 text-hover-danger mb-1 fs-1"
                                    ></i>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                    <!--end::Table body-->
                    <!--begin::Table foot-->
                    <tfoot>
                      <tr
                        class="border-top border-top-dashed align-top fs-6 fw-bold text-gray-700"
                      >
                        <th class="text-primary">
                          <div class="row m-2">
                            <div
                              class="form-group d-flex justify-content-between col-lg-12 mb-2 mb-sd-2"
                            >
                              <div>
                                <span
                                  class="btn btn-primary"
                                  @click="addNewItem"
                                >
                                  <KTIcon icon-name="plus" icon-class="fs-2" />
                                  Expense
                                </span>
                              </div>
                              <div>
                                <h2 class="fw-bold fs-4 text-dark">
                                  Total Expense ₹<span
                                    class="text-primary"
                                    data-kt-element="grand-total"
                                    >{{
                                      itemDetails.total_amount
                                        ? itemDetails.total_amount
                                        : "0.0"
                                    }}</span
                                  >
                                </h2>
                              </div>
                            </div>
                          </div>
                        </th>
                      </tr>
                    </tfoot>
                    <!--end::Table foot-->
                  </table>
                </div>
              </div>
            </div>
            <!--end::Step 2-->

            <!--begin::Step 3-->
            <div data-kt-stepper-element="content">
              <div class="w-100">
                <h2 class="fw-bold">Summary</h2>

                <div class="mb-6 mt-6">
                  <!--begin::Title-->
                  <h5 class="mb-4">Gate Pass:</h5>
                  <!--end::Title-->

                  <div class="d-flex flex-wrap py-5">
                    <!--begin::Row-->
                    <div class="flex-equal me-5">
                      <p>
                        <span class="text-gray-700"> Date: </span>
                        <span class="text-gray-800">
                          {{ RgpData?.date || "" }}
                        </span>
                      </p>
                      <p>
                        <span class="text-gray-700"> RGP No : </span>
                        <span class="text-gray-800">
                          {{ RgpData?.rgp_no || "" }}
                        </span>
                      </p>
                    </div>
                    <!--end::Row-->

                    <!--begin::Row-->
                    <div class="flex-equal">
                      <p>
                        <span class="text-gray-700"> Due Date: </span>
                        <span class="text-gray-800">
                          {{ RgpData?.duedate || "" }}
                        </span>
                      </p>
                      <p>
                        <span class="text-gray-700"> Quotation No : </span>
                        <span class="text-gray-800">
                          {{ RgpData?.quotation.quotation_no || "" }}
                        </span>
                      </p>
                    </div>
                    <!--end::Row-->
                  </div>

                  <div class="d-flex flex-wrap py-5">
                    <!--begin::Row-->
                    <div class="flex-equal me-5">
                      <p>
                        <span class="text-gray-700"> Customer Name: </span>
                        <span class="text-gray-800">
                          {{ RgpData?.quotation.customer.company_name }}
                        </span>
                      </p>
                      <p>
                        <span class="text-gray-700"> Billing Address: </span>
                      </p>
                      <p>
                        <span class="text-gray-800">
                          {{ RgpData?.quotation.customer.address1 || "" }}
                          {{ RgpData?.quotation.customer.address2 || "" }}
                          {{ RgpData?.quotation.customer.city || "" }}
                          {{ RgpData?.quotation.customer.pincode || "" }}
                          {{ RgpData?.quotation.customer.state || "" }}
                          {{ RgpData?.quotation.customer.country || "" }}
                        </span>
                      </p>
                    </div>
                    <!--end::Row-->

                    <!--begin::Row-->
                    <div class="flex-equal">
                      <p>
                        <span class="text-gray-700"> Client Name: </span>
                        <span class="text-gray-800">
                          {{ RgpData?.quotation.client.company_name }}
                        </span>
                      </p>
                      <p>
                        <span class="text-gray-700"> Site Address: </span>
                      </p>
                      <p>
                        <span class="text-gray-800">
                          {{ RgpData?.quotation.client.address1 || "" }}
                          {{ RgpData?.quotation.client.address2 || "" }}
                          {{ RgpData?.quotation.client.city || "" }}
                          {{ RgpData?.quotation.client.pincode || "" }}
                          {{ RgpData?.quotation.client.state || "" }}
                          {{ RgpData?.quotation.client.country || "" }}
                        </span>
                      </p>
                    </div>
                    <!--end::Row-->
                  </div>
                </div>

                <div class="mt-6">
                  <!--begin::Title-->
                  <h5 class="mb-4">Expenses :</h5>
                  <!--end::Title-->

                  <!--begin::Product table-->
                  <div class="table-responsive mh-300px">
                    <!--begin::Table-->
                    <table
                      class="table table-striped table-bordered table-hover align-middle"
                    >
                      <!--begin::Table head-->
                      <thead class="sticky-top bg-light">
                        <!--begin::Table row-->
                        <tr
                          class="border-bottom border-gray-200 text-start text-gray-700 fw-bold fs-7 text-uppercase gs-0"
                        >
                          <th class="min-w-50px">#</th>
                          <th class="min-w-150px">Type</th>
                          <th class="min-w-125px">Amount</th>
                          <th class="text-end min-w-125px">Date</th>
                        </tr>
                        <!--end::Table row-->
                      </thead>
                      <!--end::Table head-->

                      <!--begin::Table body-->
                      <tbody class="fw-semobold text-gray-800">
                        <tr
                          v-for="(expense, index) in itemDetails.expenses"
                          :key="index"
                        >
                          <td>{{ index + 1 }}</td>
                          <td>{{ expense.type }}</td>
                          <td>{{ expense.amount }}</td>
                          <td class="text-end">
                            {{ expense.date }}
                          </td>
                        </tr>
                      </tbody>
                      <!--end::Table body-->
                      <tfoot class="fw-semobold text-gray-800">
                        <tr>
                          <td class="text-end" colspan="2">Total</td>
                          <td class="text-center">
                            ₹ {{ itemDetails.total_amount }}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                    <!--end::Table-->
                  </div>
                  <!--end::Product table-->
                </div>
              </div>
            </div>
            <!--end::Step 3-->

            <!--begin::Actions-->
            <div class="d-flex flex-stack pt-10">
              <!--begin::Wrapper-->
              <div class="me-2">
                <button
                  type="button"
                  class="btn btn-lg btn-light-primary me-3"
                  data-kt-stepper-action="previous"
                  @click="previousStep()"
                >
                  <KTIcon icon-name="arrow-left" icon-class="fs-3 me-1" />
                  Back
                </button>
              </div>
              <!--end::Wrapper-->

              <!--begin::Wrapper-->
              <div>
                <button
                  type="submit"
                  class="btn btn-lg btn-primary"
                  v-if="currentStepIndex === totalSteps - 1"
                  @click="formSubmit()"
                >
                  <span class="indicator-label">
                    Submit
                    <KTIcon
                      icon-name="arrow-right"
                      icon-class="fs-3 ms-2 me-0"
                    />
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
                  <KTIcon icon-name="arrow-right" icon-class="fs-3 ms-1 me-0" />
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
  components: {},
  setup() {
    const createAppStepperRef = ref<HTMLElement | null>(null);
    const stepperObj = ref<StepperComponent | null>(null);
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
            console.log("in");
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

      stepperObj.value = StepperComponent.createInsance(
        createAppStepperRef.value as HTMLElement
      );
    });

    const createAccountSchema = [];

    const currentSchema = computed(() => {
      return createAccountSchema[currentStepIndex.value];
    });

    const { resetForm, handleSubmit } = useForm<IStep2 | IStep3>({
      // validationSchema: currentSchema,
    });

    const totalSteps = computed(() => {
      if (stepperObj.value) {
        return stepperObj.value.totalStepsNumber;
      } else {
        return 1;
      }
    });

    const handleStep = handleSubmit((values) => {
      if (currentStepIndex.value === 0) {
        if (itemDetails.value.rgp_id && itemDetails.value.engineer_id) {
          currentStepIndex.value++;

          if (!stepperObj.value) {
            return;
          }

          stepperObj.value.goNext();
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

            if (!stepperObj.value) {
              return;
            }

            stepperObj.value.goNext();
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
      if (!stepperObj.value) {
        return;
      }

      currentStepIndex.value--;

      stepperObj.value.goPrev();
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
      createAppStepperRef,
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