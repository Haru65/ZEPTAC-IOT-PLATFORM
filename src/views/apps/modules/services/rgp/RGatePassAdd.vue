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
                  <h3 class="stepper-title">Date & Quotation</h3>

                  <div class="stepper-desc">pick dates for gatepass</div>
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
                  <h3 class="stepper-title">Engineers</h3>

                  <div class="stepper-desc">select available engineers</div>
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
                  <h3 class="stepper-title">Instruments</h3>

                  <div class="stepper-desc">select available instruments</div>
                </div>
                <!--end::Label-->
              </div>
              <!--begin::Line-->
              <div class="stepper-line h-40px"></div>
              <!--end::Line-->
            </div>
            <!--end::Step 3-->

            <!--begin::Step 4-->
            <div class="stepper-item" data-kt-stepper-element="nav">
              <div class="stepper-wrapper">
                <!--begin::Icon-->
                <div class="stepper-icon w-40px h-40px">
                  <i class="stepper-check fas fa-check"></i>
                  <span class="stepper-number">4</span>
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
            <!--end::Step 4-->
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
                <!--begin::Input group-->
                <div class="row mb-6">
                  <!--begin::Col-->
                  <div class="col-md-6 fv-row mb-8 mb-sd-8">
                    <!--begin::Label-->
                    <label
                      class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                      >Date</label
                    >
                    <!--end::Label-->

                    <!--begin::Input-->
                    <el-date-picker
                      type="date"
                      name="date"
                      id="duedate"
                      v-model="itemDetails.date"
                      @change="setDates($event, 'date')"
                      placeholder="Pick a day"
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
                      >Due Date</label
                    >
                    <!--end::Label-->

                    <!--begin::Input-->
                    <el-date-picker
                      type="date"
                      name="duedate"
                      id="duedate"
                      v-model="itemDetails.duedate"
                      @change="setDates($event, 'duedate')"
                      placeholder="Pick a day"
                      :editable="false"
                    />
                    <!--end::Input-->
                  </div>
                  <!--end::Col-->
                </div>
                <!--end::Input group-->

                <div class="row mb-6">
                  <div class="form-group col-12">
                    <label
                      class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6 text-nowrap"
                      >Select Quotation</label
                    >
                    <div>
                      <el-select
                        name="quotation_id"
                        v-model="itemDetails.quotation_id"
                        filterable
                        placeholder="Please Select Quotation..."
                        v-on:change="setQuotation"
                      >
                        <el-option
                          v-for="item in Quotations"
                          :key="item.id"
                          :value="item.id"
                          :label="`${item.quotation_no} --- ${item.customer?.company_name} (${item.customer?.name}) --- ${item.client?.company_name} (${item.client?.name})`"
                        />
                        <el-option
                          value=""
                          label="Please Select Quotation..."
                          key=""
                          disabled="disabled"
                        >
                          Please Select Quotation...</el-option
                        >
                      </el-select>
                    </div>
                  </div>
                </div>

                <!--begin::Input group-->
                <div class="row mb-6" v-if="itemDetails.quotation_id">
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
                      <div>{{ itemDetails.customer.company_name }}</div>
                      <div class="mt-2 pt-4">
                        <h6 class="mt-5">Billing Address:</h6>
                        <div class="mt-2">
                          <div class="mb-1">
                            <br />
                            <span v-show="itemDetails.customer.company_name">
                              {{ `${itemDetails.customer.company_name || ""}` }}
                            </span>
                            <br />
                            <span>
                              {{ `${itemDetails.customer.name}` }}
                            </span>
                            <!-- v-if company_data present -->
                            <div v-show="itemDetails.customer.company_name">
                              <br />
                              <span>
                                {{ `${itemDetails.customer.address1 || ""}` }}
                              </span>
                              <br />
                              <span>
                                {{ `${itemDetails.customer.address2 || ""}` }}
                              </span>
                            </div>
                            <div v-show="itemDetails.customer.country">
                              <span>
                                {{
                                  `${itemDetails.customer.city || ""} - ${
                                    itemDetails.customer.pincode || ""
                                  }`
                                }}
                              </span>
                              <br />
                              <span>
                                {{
                                  `${itemDetails.customer.state || ""} ${
                                    itemDetails.customer.country || ""
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
                      <div>{{ itemDetails.client.company_name }}</div>
                      <div class="mt-2 pt-4">
                        <h6 class="mt-5">Site Address:</h6>
                        <div class="mt-2">
                          <div class="mb-1" v-show="itemDetails.client">
                            <br />
                            <span v-show="itemDetails.client.company_name">
                              {{ `${itemDetails.client.company_name || ""}` }}
                            </span>
                            <br />
                            <span>
                              {{ `${itemDetails.client.name || ""}` }}
                            </span>
                            <!-- v-if company_data present -->
                            <div v-show="itemDetails.client.company_name">
                              <br />
                              <span>
                                {{ `${itemDetails.client.address1 || ""}` }}
                              </span>
                              <br />
                              <span>
                                {{ `${itemDetails.client.address2 || ""}` }}
                              </span>
                            </div>
                            <div v-show="itemDetails.client.country">
                              <span>
                                {{
                                  `${itemDetails.client.city || ""} - ${
                                    itemDetails.client.pincode || ""
                                  }`
                                }}
                              </span>
                              <br />
                              <span>
                                {{
                                  `${itemDetails.client.state || ""} ${
                                    itemDetails.client.country || ""
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
              </div>
            </div>
            <!--end::Step 1-->

            <!--begin::Step 2-->
            <div data-kt-stepper-element="content">
              <div class="w-100">
                <div class="row mb-6">
                  <div class="form-group col-12">
                    <label
                      class="d-flex align-items-center fs-5 fw-semobold mb-4 col-lg-4 col-form-label required text-gray-700 text-nowrap"
                    >
                      <span>Select Engineers</span>
                      <i
                        class="fas fa-exclamation-circle ms-2 fs-7"
                        data-bs-toggle="tooltip"
                        title="Select at least one engineer"
                      ></i>
                    </label>
                    <div>
                      <el-select
                        v-model="itemDetails.engineers"
                        multiple
                        clearable
                        collapse-tags
                        placeholder="Select"
                        popper-class="custom-header"
                        :max-collapse-tags="1"
                        style="width: 100%"
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
                </div>

                <div
                  class="shadow-lg p-5 mb-7 fs-4 rounded"
                  v-if="AvailableEngineers.length == 0"
                >
                  <p>
                    Sorry! All engineers are on work. No engineers are available
                    at this moment.
                  </p>
                </div>

                <div class="mb-6 mt-6">
                  <!--begin::Title-->
                  <h5 class="mb-4">Engineers:</h5>
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
                          <th class="min-w-50px">Sr.no</th>
                          <th class="min-w-250px">Engineer Name</th>
                          <th class="text-end">Mobile</th>
                        </tr>
                        <!--end::Table row-->
                      </thead>
                      <!--end::Table head-->

                      <!--begin::Table body-->
                      <tbody class="fw-semobold text-gray-800">
                        <tr
                          v-for="(engineer, index) in SelectedEngineers"
                          :key="engineer.id"
                        >
                          <td>
                            {{ index + 1 }}
                          </td>
                          <td>
                            {{ engineer.first_name }}
                            {{ engineer.last_name }}
                          </td>
                          <td class="text-end">
                            {{ engineer.mobile }}
                          </td>
                        </tr>
                      </tbody>
                      <!--end::Table body-->
                    </table>
                    <!--end::Table-->
                  </div>
                  <!--end::Product table-->
                </div>
              </div>
            </div>
            <!--end::Step 2-->

            <!--begin::Step 3-->
            <div data-kt-stepper-element="content">
              <div class="w-100">
                <div class="row mb-6">
                  <div class="form-group col-12">
                    <label
                      class="d-flex align-items-center fs-5 fw-semobold mb-4 col-lg-4 col-form-label required text-gray-700 text-nowrap"
                    >
                      <span>Select Instrument</span>
                      <i
                        class="fas fa-exclamation-circle ms-2 fs-7"
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

                <div
                  class="shadow-lg p-5 mb-7 fs-4 rounded"
                  v-if="AvailableInstruments.length == 0"
                >
                  <p>Sorry! No Instruments are available at this moment.</p>
                </div>

                <div class="mb-6 mt-6">
                  <!--begin::Title-->
                  <h5 class="mb-4">Instruments:</h5>
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
                          <th class="min-w-125px">Instrument ID</th>
                          <th class="min-w-250px">Name</th>
                          <th class="min-w-125px">Made By</th>
                          <th class="min-w-125px">Model No</th>
                          <th class="text-end min-w-125px">Serial No</th>
                        </tr>
                        <!--end::Table row-->
                      </thead>
                      <!--end::Table head-->

                      <!--begin::Table body-->
                      <tbody class="fw-semobold text-gray-800">
                        <tr
                          v-for="instrument in SelectedInstruments"
                          :key="instrument.id"
                        >
                          <td>{{ instrument.instrument_id }}</td>
                          <td>{{ instrument.name }}</td>
                          <td>{{ instrument.make }}</td>
                          <td>{{ instrument.model_no }}</td>
                          <td class="text-end">
                            {{ instrument.serial_no }}
                          </td>
                        </tr>
                      </tbody>
                      <!--end::Table body-->
                    </table>
                    <!--end::Table-->
                  </div>
                  <!--end::Product table-->
                </div>
              </div>
            </div>
            <!--end::Step 3-->

            <!--begin::Step 4-->
            <div data-kt-stepper-element="content">
              <div class="w-100">
                <h2 class="fw-bold">Summary</h2>

                <div class="mb-6 mt-6">
                  <!--begin::Title-->
                  <h5 class="mb-4">Quotation:</h5>
                  <!--end::Title-->

                  <div class="d-flex flex-wrap py-5">
                    <!--begin::Row-->
                    <div class="flex-equal me-5">
                      <p>
                        <span class="text-gray-700"> Date: </span>
                        <span class="text-gray-800">
                          {{ itemDetails.date }}
                        </span>
                      </p>
                    </div>
                    <!--end::Row-->

                    <!--begin::Row-->
                    <div class="flex-equal">
                      <p>
                        <span class="text-gray-700"> Due Date: </span>
                        <span class="text-gray-800">
                          {{ itemDetails.duedate }}
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
                          {{ itemDetails.customer.company_name }}
                        </span>
                      </p>
                      <p>
                        <span class="text-gray-700"> Billing Address: </span>
                      </p>
                      <p>
                        <span class="text-gray-800">
                          {{ itemDetails.customer.address1 || "" }}
                          {{ itemDetails.customer.address2 || "" }}
                          {{ itemDetails.customer.city || "" }}
                          {{ itemDetails.customer.pincode || "" }}
                          {{ itemDetails.customer.state || "" }}
                          {{ itemDetails.customer.country || "" }}
                        </span>
                      </p>
                    </div>
                    <!--end::Row-->

                    <!--begin::Row-->
                    <div class="flex-equal">
                      <p>
                        <span class="text-gray-700"> Client Name: </span>
                        <span class="text-gray-800">
                          {{ itemDetails.client.company_name }}
                        </span>
                      </p>
                      <p>
                        <span class="text-gray-700"> Site Address: </span>
                      </p>
                      <p>
                        <span class="text-gray-800">
                          {{ itemDetails.client.address1 || "" }}
                          {{ itemDetails.client.address2 || "" }}
                          {{ itemDetails.client.city || "" }}
                          {{ itemDetails.client.pincode || "" }}
                          {{ itemDetails.client.state || "" }}
                          {{ itemDetails.client.country || "" }}
                        </span>
                      </p>
                    </div>
                    <!--end::Row-->
                  </div>
                </div>

                <div class="mb-6">
                  <!--begin::Title-->
                  <h5 class="mb-4">Engineers:</h5>
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
                          <th class="min-w-50px">Sr.no</th>
                          <th class="min-w-250px">Engineer Name</th>
                          <th class="text-end">Mobile</th>
                        </tr>
                        <!--end::Table row-->
                      </thead>
                      <!--end::Table head-->

                      <!--begin::Table body-->
                      <tbody class="fw-semobold text-gray-800">
                        <tr
                          v-for="(engineer, index) in SelectedEngineers"
                          :key="engineer.id"
                        >
                          <td>
                            {{ index + 1 }}
                          </td>
                          <td>
                            {{ engineer.first_name }}
                            {{ engineer.last_name }}
                          </td>
                          <td class="text-end">
                            {{ engineer.mobile }}
                          </td>
                        </tr>
                      </tbody>
                      <!--end::Table body-->
                    </table>
                    <!--end::Table-->
                  </div>
                  <!--end::Product table-->
                </div>

                <div class="mt-6">
                  <!--begin::Title-->
                  <h5 class="mb-4">Instruments:</h5>
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
                          <th class="min-w-125px">Instrument ID</th>
                          <th class="min-w-150px">Name</th>
                          <th class="min-w-125px">Made By</th>
                          <th class="min-w-125px">Model No</th>
                          <th class="text-end min-w-125px">Serial No</th>
                        </tr>
                        <!--end::Table row-->
                      </thead>
                      <!--end::Table head-->

                      <!--begin::Table body-->
                      <tbody class="fw-semobold text-gray-800">
                        <tr
                          v-for="instrument in SelectedInstruments"
                          :key="instrument.id"
                        >
                          <td>{{ instrument.instrument_id }}</td>
                          <td>{{ instrument.name }}</td>
                          <td>{{ instrument.make }}</td>
                          <td>{{ instrument.model_no }}</td>
                          <td class="text-end">
                            {{ instrument.serial_no }}
                          </td>
                        </tr>
                      </tbody>
                      <!--end::Table body-->
                    </table>
                    <!--end::Table-->
                  </div>
                  <!--end::Product table-->
                </div>
              </div>
            </div>
            <!--end::Step 4-->

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
  name: "rgp-add",
  setup() {
    const createAppStepperRef = ref<HTMLElement | null>(null);
    const stepperObj = ref<StepperComponent | null>(null);
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

      stepperObj.value = StepperComponent.createInsance(
        createAppStepperRef.value as HTMLElement
      );
    });

    const createAccountSchema = [];

    const currentSchema = computed(() => {
      return createAccountSchema[currentStepIndex.value];
    });

    const { resetForm, handleSubmit } = useForm<IStep2 | IStep3 | IStep4>({
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
        if (
          itemDetails.value.date &&
          itemDetails.value.duedate &&
          itemDetails.value.quotation_id &&
          itemDetails.value.quotation_no
        ) {
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
          return;
        }
      } else if (currentStepIndex.value === 1) {
        if (
          itemDetails.value.engineers &&
          itemDetails.value.engineers.length > 0
        ) {
          currentStepIndex.value++;

          if (!stepperObj.value) {
            return;
          }

          stepperObj.value.goNext();
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

          if (!stepperObj.value) {
            return;
          }

          stepperObj.value.goNext();
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
      if (!stepperObj.value) {
        return;
      }

      currentStepIndex.value--;

      stepperObj.value.goPrev();
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
      createAppStepperRef,
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