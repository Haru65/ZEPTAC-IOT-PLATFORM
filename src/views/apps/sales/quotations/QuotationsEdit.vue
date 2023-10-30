<template>
  <div style="width: 99%" class="bg-body p-12 rounded">
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Form-->
        <VForm id="kt_account_profile_details_form" class="form" novalidate>
          <!--begin::Card body-->
          <div class="card-body border-top p-sd-2 p-lg-9">
            <!--begin::Input group-->

            <div class="col-lg-12 col-md-12 col-sd-12 fv-row m-auto mb-6">
              <div class="card mb-3 p-6">
                <div class="row mb-6 text-center">
                  <span class="fs-3 fw-bold text-muted"
                    >Quotation # {{ QuotationDetails.quotation_no }}</span
                  >
                </div>
              </div>
            </div>

            <div class="row mb-6">
              <div class="form-group col-md-6 mb-8 mb-sd-8">
                <label
                  class="btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center"
                >
                  <!--begin::Info-->
                  <span class="d-block fw-semobold text-start">
                    <span class="fs-5 fw-bold text-gray-700 text-nowrap"
                      >Date</span
                    >
                    <div class="block">
                      <el-date-picker
                        v-model="QuotationDetails.date"
                        type="date"
                        placeholder="Pick a day"
                        :shortcuts="shortcuts"
                        :disabled-date="disabledDate"
                        :editable="false"
                      />
                    </div>
                  </span>
                  <!--end::Info-->
                </label>
              </div>

              <div class="form-group col-md-6 mb-8 mb-sd-8">
                <label
                  class="btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center"
                >
                  <!--begin::Info-->
                  <span class="d-block fw-semobold text-start">
                    <span class="fs-5 fw-bold text-gray-700 text-nowrap"
                      >Due Date</span
                    >
                    <div class="block">
                      <el-date-picker
                        v-model="QuotationDetails.duedate"
                        type="date"
                        placeholder="Pick a day"
                        :shortcuts="shortcuts"
                        :disabled-date="disabledDate"
                        :editable="false"
                      />
                    </div>
                  </span>
                  <!--end::Info-->
                </label>
              </div>
            </div>

            <div class="row mb-6">
              <div class="d-flex flex-grow-1 gap-lg-3 gap-sm-5 gap-5">
                <!--begin::Row-->
                <div class="w-50">
                  <div class="py-3">
                    <h6 class="fs-6">Customer :</h6>
                  </div>
                  <div id="customer " class="row gx-10">
                    <el-select
                      v-model="QuotationDetails.customer_id"
                      placeholder="Please Select Customer"
                      filterable
                      v-on:change="GetUserData(QuotationDetails.customer_id)"
                    >
                      <el-option
                        v-for="item in Customers"
                        :key="item.id"
                        :label="`${item.first_name} ${item.last_name}`"
                        :value="item.id"
                      />
                      <el-option
                        value=""
                        disabled="disabled"
                        label="Please Select Customer..."
                        key=""
                        >Please Select Customer...</el-option
                      >
                    </el-select>
                  </div>
                  <!--end::Row-->

                  <div class="mt-2 pt-4">
                    <h6 class="fw-bold mt-5">Billing Address:</h6>
                    <div class="mt-2">
                      <div class="mb-1" v-show="QuotationDetails.customer">
                        <br />
                        <span>
                          {{
                            `${QuotationDetails.customer.first_name} ${QuotationDetails.customer.last_name}`
                          }}
                        </span>
                        <br />
                        <span v-show="QuotationDetails.customer.company_name">
                          {{ `${QuotationDetails.customer.company_name}` }}
                        </span>
                        <!-- v-if company_data present -->
                        <div v-show="QuotationDetails.customer.company_name">
                          <br />
                          <span>
                            {{ `${QuotationDetails.customer.address1}` }}
                          </span>
                          <br />
                          <span>
                            {{ `${QuotationDetails.customer.address2}` }}
                          </span>
                        </div>
                        <div v-show="QuotationDetails.customer.country">
                          <span>
                            {{
                              `${QuotationDetails.customer.city} - ${QuotationDetails.customer.pincode}`
                            }}
                          </span>
                          <br />
                          <span>
                            {{
                              `${QuotationDetails.customer.states} ${QuotationDetails.customer.country}`
                            }}
                          </span>
                          <br />
                        </div>
                        <br />
                        <!-- firstname as a flag -->
                        <a
                          v-show="QuotationDetails.customer.first_name"
                          target="blank"
                          v-bind:href="`/customers/edit/${QuotationDetails.customer_id}`"
                        >
                          <span class="fs-5"> Edit</span>
                          <!-- <i
                          class="las la-edit text-gray-600 text-hover-primary mb-1 fs-1"
                          ></i> -->
                        </a>
                      </div>
                      <br />
                    </div>
                  </div>
                </div>

                <div class="w-50">
                  <div class="row gx-10">
                    <div class="py-3">
                      <h6 class="fs-6">Client :</h6>
                    </div>
                    <el-select
                      v-model="QuotationDetails.client.id"
                      filterable
                      :disabled="clientSelect"
                      v-on:change="GetClientData(QuotationDetails.client.id)"
                    >
                      <el-option
                        v-for="item in Clients"
                        :key="item.client_data.id"
                        :label="`${item.client_data.first_name} ${item.client_data.last_name}`"
                        :value="item.client_data.id"
                      />
                      <el-option
                        value=""
                        disabled="disabled"
                        label="Please Select Client..."
                        key=""
                        >Please Select Client...</el-option
                      >
                    </el-select>
                  </div>
                  <!--end::Row-->

                  <div class="mt-2 pt-4">
                    <h6 class="fw-bold mt-5">Site Address:</h6>
                    <div class="mt-2">
                      <div class="mb-1" v-show="QuotationDetails.client">
                        <br />
                        <span>
                          {{
                            `${QuotationDetails.client.first_name} ${QuotationDetails.client.last_name}`
                          }}
                        </span>
                        <br />
                        <span v-show="QuotationDetails.client.company_name">
                          {{ `${QuotationDetails.client.company_name}` }}
                        </span>
                        <!-- v-if company_data present -->
                        <div v-show="QuotationDetails.client.company_name">
                          <br />
                          <span>
                            {{ `${QuotationDetails.client.address1}` }}
                          </span>
                          <br />
                          <span>
                            {{ `${QuotationDetails.client.address2}` }}
                          </span>
                        </div>
                        <div v-show="QuotationDetails.client.country">
                          <span>
                            {{
                              `${QuotationDetails.client.city} - ${QuotationDetails.client.pincode}`
                            }}
                          </span>
                          <br />
                          <span>
                            {{
                              `${QuotationDetails.client.states} ${QuotationDetails.client.country}`
                            }}
                          </span>
                          <br />
                        </div>
                        <br />
                        <!-- firstname as a flag -->
                        <a
                          v-show="QuotationDetails.client.first_name"
                          target="blank"
                          v-bind:href="`/clients/edit/${QuotationDetails.customer_id}`"
                        >
                          <span class="fs-5"> Edit</span>
                          <!-- <i
                          class="las la-edit text-gray-600 text-hover-primary mb-1 fs-1"
                          ></i> -->
                        </a>
                      </div>
                      <br />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row mb-6">
              <!--begin::Label-->
              <label
                class="col-lg-3 col-form-label required fw-bold text-gray-700 fw-semobold fs-6 text-nowrap"
                >Select Site Location</label
              >
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-9 fv-row">
                <el-select
                  v-model="QuotationDetails.items.id"
                  filterable
                  v-on:change="SetLocation"
                  placeholder="Please Select Site Location..."
                  class="form-control"
                >
                  <el-option
                    value=""
                    label="Please Select Site Location..."
                    key=""
                    disabled
                    >Please Select Site Location...</el-option
                  >
                  <el-option
                    v-for="ele of locations"
                    :key="ele.id"
                    :label="ele.site_location"
                    :value="ele.id"
                  />
                </el-select>
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="site_location" />
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
                  >Per day Charge</label
                >
                <input
                  type="text"
                  v-on:input="SetPerDayCharge"
                  v-model="QuotationDetails.items.per_day_charge"
                  name="per_day_charge"
                  placeholder="Per Day Charge..."
                  class="form-control form-control-lg form-control-solid"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="per_day_charge" />
                  </div>
                </div>
              </div>

              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6 text-nowrap"
                  >Number of Days</label
                >
                <input
                  type="text"
                  name="number_of_days"
                  class="form-control form-control-lg form-control-solid"
                  v-on:input="SetDays"
                  v-model="QuotationDetails.items.number_of_days"
                  placeholder="Number of Days..."
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="number_of_days" />
                  </div>
                </div>
              </div>
            </div>
            <!--end::Input group-->

            <div class="row mb-6">
              <div class="col-lg-6 mb-md-6">
                <div class="d-flex flex-column align-items-start gap-3">
                  <label
                    for="accommodationRef"
                    class="form-label fw-bold text-primary fw-semibold fs-6"
                    >Accommodation</label
                  >
                  <div
                    class="d-flex align-items-center gap-6 col-lg-12 col-md-12 col-sm-12"
                  >
                    <label
                      class="form-check form-switch form-check-custom form-check-primary form-check-solid"
                    >
                      <input
                        class="form-check-input"
                        type="checkbox"
                        :value=false
                        name="accommodationRef"
                        id="accommodationRef"
                        v-on:change="ToggleAccommodation"
                        v-model="accommodationRef"
                      />
                    </label>
                    <div class="flex-grow-1">
                      <input
                        type="text"
                        name="accommodation"
                        class="form-control w-100"
                        :disabled="!accommodationRef"
                        v-on:input="SetAccommodation"
                        v-model="QuotationDetails.items.accommodation"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-6 mb-md-6">
                <div class="d-flex flex-column align-items-start gap-3">
                  <label
                    for="accommodationRef2"
                    class="form-label fw-bold text-primary fw-semibold fs-6"
                    >Travelling</label
                  >
                  <div
                    class="d-flex align-items-center gap-6 col-lg-12 col-md-12 col-sm-12"
                  >
                    <label
                      class="form-check form-switch form-check-custom form-check-primary form-check-solid"
                    >
                      <input
                        class="form-check-input"
                        type="checkbox"
                        :value=false
                        name="travellingRef"
                        id="travellingRef"
                        v-on:change="ToggleTravelling"
                        v-model="travellingRef"
                      />
                    </label>
                    <div class="flex-grow-1">
                      <input
                        type="text"
                        name="travelling"
                        class="form-control w-100"
                        :disabled="!travellingRef"
                        v-on:input="SetTravelling"
                        v-model="QuotationDetails.items.travelling"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row mb-6">
              <div class="col-lg-6 mb-md-6">
                <div class="d-flex flex-column align-items-start gap-3">
                  <label
                    for="trainingRef"
                    class="form-label fw-bold text-primary fw-semibold fs-6"
                    >Training</label
                  >
                  <div
                    class="d-flex align-items-center gap-6 col-lg-12 col-md-12 col-sm-12"
                  >
                    <label
                      class="form-check form-switch form-check-custom form-check-primary form-check-solid"
                    >
                      <input
                        class="form-check-input"
                        type="checkbox"
                        :value=false
                        name="trainingRef"
                        id="trainingRef"
                        v-on:change="ToggleTraining"
                        v-model="trainingRef"
                      />
                    </label>
                    <div class="flex-grow-1">
                      <input
                        type="text"
                        name="training"
                        class="form-control w-100"
                        v-on:input="SetTraining"
                        v-model="QuotationDetails.items.training"
                        :disabled="!trainingRef"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-6 mb-md-6">
                <div class="d-flex flex-column align-items-start gap-3">
                  <label
                    for="pickupRef"
                    class="form-label fw-bold text-primary fw-semibold fs-6"
                    >Pickup & Delivery</label
                  >
                  <div
                    class="d-flex align-items-center gap-6 col-lg-12 col-md-12 col-sm-12"
                  >
                    <label
                      class="form-check form-switch form-check-custom form-check-primary form-check-solid"
                    >
                      <input
                        class="form-check-input"
                        type="checkbox"
                        :value=false
                        name="pickupRef"
                        id="pickupRef"
                        v-on:change="TogglePickUp"
                        v-model="pickupRef"
                      />
                    </label>
                    <div class="flex-grow-1">
                      <input
                        type="text"
                        name="pickup"
                        :disabled="!pickupRef"
                        class="form-control w-100"
                        v-on:input="SetPickUp"
                        v-model="QuotationDetails.items.pickup"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row mb-6">
              <div class="col-lg-6 mb-md-6">
                <div class="d-flex flex-column align-items-start gap-3">
                  <label
                    for="boardingRef"
                    class="form-label fw-bold text-primary fw-semibold fs-6"
                    >Boarding & Lodging</label
                  >
                  <div
                    class="d-flex align-items-center gap-6 col-lg-12 col-md-12 col-sm-12"
                  >
                    <label
                      class="form-check form-switch form-check-custom form-check-primary form-check-solid"
                    >
                      <input
                        class="form-check-input"
                        type="checkbox"
                        :value=false
                        name="boardingRef"
                        id="boardingRef"
                        v-on:change="ToggleBoarding"
                        v-model="boardingRef"
                      />
                    </label>
                    <div class="flex-grow-1">
                      <input
                        type="text"
                        name="boarding"
                        class="form-control w-100"
                        v-on:input="SetBoarding"
                        v-model="QuotationDetails.items.boarding"
                        :disabled="!boardingRef"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!--begin::Input group-->
            <div class="row mb-6">
              <!--begin::Col-->
              <div class="col-md-12 fv-row mb-8 mb-sd-8">
                <!--end::Label-->
                <label class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Scope of Work</label
                >
                <!--end::Label-->
                <textarea
                  name="scope_of_work"
                  class="form-control form-control-solid"
                  rows="5"
                  v-model="QuotationDetails.scope_of_work"
                  placeholder="Specify scope of work"
                ></textarea>
                <!--end::Input-->
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="row mb-6">
              <!--begin::Col-->
              <div class="col-md-12 fv-row mb-8 mb-sd-8">
                <!--end::Label-->
                <label class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Terms & Conditions</label
                >
                <!--end::Label-->
                <textarea
                  name="terms_and_conditions"
                  class="form-control form-control-solid"
                  rows="5"
                  v-model="QuotationDetails.terms_and_conditions"
                  placeholder="Specify Terms and Conditions"
                ></textarea>
                <!--end::Input-->
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->

            <div class="row mb-6">
              <!--begin::Col-->

              <div class="col-lg-12 col-md-12 col-sd-12 fv-row m-auto">
                <div class="card bg-light mb-3 p-6">
                  <div
                    class="row mb-6"
                    v-if="parseInt(QuotationDetails.status) != 3"
                  >
                    <!--begin::Label-->
                    <label
                      class="col-lg-3 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                      >Quotation Status</label
                    >
                    <!--end::Label-->

                    <!--begin::Col-->
                    <div class="col-lg-9 fv-row">
                      <el-select
                        v-model="QuotationDetails.status"
                        filterable
                        :disabled="disabledselect"
                        placeholder="Please Select Status..."
                      >
                        <el-option
                          v-for="item in QuotationStatusArray"
                          :key="item.id"
                          :label="`${item.name}`"
                          :value="item.id"
                        />
                        <el-option
                          value=""
                          disabled="disabled"
                          label="Please Select Status..."
                          key=""
                          >Please Select Status...</el-option
                        >
                      </el-select>
                    </div>
                    <!--end::Col-->
                  </div>
                  <div class="card-body">
                    
                    <div class="items">
                      <p class="d-inline gap-2">
                        <span
                          v-if="QuotationDetails.items.id != ''"
                          class="badge badge-light-primary flex-shrink-0 align-self-center py-3 px-4 fs-7"
                          >+ {{ QuotationDetails.items.site_location }} ({{ QuotationDetails.items.per_day_charge }} x {{  QuotationDetails.items.number_of_days }})
                        </span>
                        <span
                          v-if="QuotationDetails.items.accomm"
                          class="badge badge-light-primary flex-shrink-0 align-self-center py-3 px-4 fs-7"
                          >+ Accomodation ({{ QuotationDetails.items.accommodation }})
                        </span>
                        <span
                          v-if="QuotationDetails.items.travel"
                          class="badge badge-light-primary flex-shrink-0 align-self-center py-3 px-4 fs-7"
                          >+ Travelling ({{ QuotationDetails.items.travelling }})
                        </span>
                        <span
                          v-if="QuotationDetails.items.train"
                          class="badge badge-light-primary flex-shrink-0 align-self-center py-3 px-4 fs-7"
                          >+ Training ({{ QuotationDetails.items.training }})
                        </span>
                        <span
                          v-if="QuotationDetails.items.board"
                          class="badge badge-light-primary flex-shrink-0 align-self-center py-3 px-4 fs-7"
                          >+ Boarding & Lodging ({{ QuotationDetails.items.boarding }})
                        </span>
                        <span
                          v-if="QuotationDetails.items.pick"
                          class="badge badge-light-primary flex-shrink-0 align-self-center py-3 px-4 fs-7"
                          >+ Pickup & Delivery ({{ QuotationDetails.items.pickup }})
                        </span>
                      </p>
                    </div>
                    <div class="total">
                      <div class="d-flex flex-lg-row justify-content-between">
                        <h6
                          class="text-start fs-4 text-nowrap badge badge-light flex-shrink-0 align-self-center py-3 px-4 fs-7"
                        >
                          {{
                            GetQuotationStatus(
                              parseInt(QuotationDetails.status)
                            )
                          }}
                        </h6>
                        <div
                          class="cursor-pointer"
                          v-on:click="
                            generatePdf(QuotationDetails.quotation_no)
                          "
                        >
                          <i
                            class="fa fa-download badge py-3 px-4 fs-7 text-gray-700 badge-light-success"
                            style="font-size: 1.6rem"
                            >&nbsp; Download</i
                          >
                        </div>
                      </div>
                      <div>
                        <h3 class="text-end fs-4 text-nowrap">Total</h3>
                        <h3 class="text-end fs-4 text-nowrap">
                          ₹<span data-kt-element="grand-total">{{
                            QuotationDetails.total.toFixed(2)
                          }}</span>
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!--end::Col-->
            </div>
          </div>

          <div class="modal-footer flex-center w-100">
            <!--begin::Button-->
            <button
              type="button"
              class="btn btn-light btn-light-danger w-sd-25 w-lg-25"
              v-on:click="deleteQuotation"
            >
              Delete
            </button>
            <!--end::Button-->
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <!--begin::Button-->
            <span
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-lg btn-primary w-sd-25 w-lg-25"
              v-on:click="submit"
            >
              <span v-if="!loading" class="indicator-label"> Update </span>
              <span v-if="loading" class="indicator-progress">
                Please wait...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </span>
            <!--end::Button-->
          </div>
          <!--end::Input group-->

          <div
            class="m-4 text-center"
            v-if="parseInt(QuotationDetails.status) != 3"
          >
            <!--begin::Row-->
            <span
              v-on:click="SendInvoice"
              href="#"
              class="btn btn-light-success w-50 mb-3"
              id="kt_invoice_submit_button"
            >
              <i class="ki-duotone ki-triangle fs-3"
                ><span class="path1"></span><span class="path2"></span
                ><span class="path3"></span
              ></i>
              Convert to Invoice
            </span>
            <!--end::Row-->
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
import { defineComponent, onMounted, ref } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import ApiService from "@/core/services/ApiService";
import {
  getCustomers,
  updateQuotation,
  addInvoice,
  getUser,
  getClient,
  GetCustomerClients,
  getQuotation,
  deletequotation,
  GetIncrInvoiceId,
  getPriceList,
} from "@/stores/api";
import { useAuthStore } from "@/stores/auth";
import moment from "moment";
import { useRouter, useRoute } from "vue-router";
import { formatPrice } from "@/core/config/DataFormatter";
import { Gen } from "@/core/config/PdfGenerator";
import {
  QuotationStatusArray,
  GetQuotationStatus,
} from "@/core/config/QuotationStatusConfig";

interface itemsArr {
  id: string;
  site_location: string;
  per_day_charge: string;
  number_of_days: string;
  accommodation: number;
  travelling: number;
  training: number;
}

interface Meta {
  id: string;
  first_name: string;
  last_name: string;
  company_name: string;
  address1: string;
  address2: string;
  city: string;
  states: string;
  pincode: string;
  country: string;
}

interface QuotationDetails {
  quotation_no: string;
  invoice_no: string;
  customer_id: string;
  items: {
    id: string;
    site_location: string;
    per_day_charge: string;
    number_of_days: string;
    accommodation: number;
    travelling: number;
    training: number;
    boarding: number;
    pickup: number;
    accomm: boolean;
    travel: boolean;
    train: boolean;
    board: boolean;
    pick: boolean;
  };
  date: string;
  duedate: string;
  status: string;
  scope_of_work: string;
  terms_and_conditions: string;
  total: number;
  customer: Meta;
  client: Meta;
  company_details: {
    company_logo: string;
  };
  company_id: string;
  is_active: number;
  created_by: string;
  updated_by: string;
}

export default defineComponent({
  name: "company-add",
  components: {
  },
  setup() {
    const auth = useAuthStore();
    const disabledselect = ref(true);
    const clientSelect = ref(true);
    const Total = ref(0);
    const route = useRouter();
    const router = useRoute();
    const User = auth.GetUser();
    const QuotationId = router.params.id;
    const loading = ref(false);
    const Customers = ref([{ id: "", first_name: "", last_name: "" }]);
    const Clients = ref([
      { id: "", client_data: { id: "", first_name: "", last_name: "" } },
    ]);

    const locations = ref([
      {
        id: "",
        site_location: "",
        per_day_charge: "",
        accommodation: "",
        travelling: "",
        training: "",
      },
    ]);

    const getSelects = async () => {
      ApiService.setHeader();
      const response = await getPriceList(``);
      const data = response.result.data.map(
        ({
          id,
          site_location,
          per_day_charge,
          accommodation,
          travelling,
          training,
        }) => ({
          id,
          site_location,
          per_day_charge,
          accommodation,
          travelling,
          training,
        })
      );
      locations.value = data;
    };


    const QuotationDetails = ref<QuotationDetails>({
      quotation_no: "",
      invoice_no: "",
      customer_id: "",
      items: {
        id: "",
        site_location: "",
        per_day_charge: "",
        number_of_days: "1",
        accommodation: 0,
        travelling: 0,
        training: 0,
        boarding: 0,
        pickup: 0,
        accomm: true,
        travel: true,
        train: true,
        board: true,
        pick: true,
      },
      date: "",
      duedate: "",
      status: "",
      scope_of_work: "",
      terms_and_conditions: "",
      customer: {
        id: "",
        company_name: "",
        first_name: "",
        last_name: "",
        address1: "",
        address2: "",
        city: "",
        states: "",
        pincode: "",
        country: "",
      },
      client: {
        id: "",
        company_name: "",
        first_name: "",
        last_name: "",
        address1: "",
        address2: "",
        city: "",
        states: "",
        pincode: "",
        country: "",
      },
      company_details: {
        company_logo: getAssetPath("media/avatars/default.png"),
      },
      company_id: User.company_id,
      total: 0,
      is_active: 1,
      created_by: "",
      updated_by: User.id,
    });

    onMounted(async () => {
      // todo: quotation check if pres get last incr 1

      Customers.value.pop();
      Clients.value.pop();
      locations.value.pop();
      await GetCustomers();
      await getSelects();

      //? get the quotaion details from id
      const response = await getQuotation(QuotationId);
      console.log(response);
      QuotationDetails.value.quotation_no = response.quotation_no;
      QuotationDetails.value.date = response.date;
      QuotationDetails.value.duedate = response.duedate;
      QuotationDetails.value.items = JSON.parse(response.items);
      QuotationDetails.value.status = response.status;
      QuotationDetails.value.total = parseFloat(response.total);
      QuotationDetails.value.scope_of_work = response.scope_of_work;
      QuotationDetails.value.terms_and_conditions = response.terms_and_conditions;
      QuotationDetails.value.created_by = response.created_by;

      accommodationRef.value = QuotationDetails.value.items.accomm
      travellingRef.value = QuotationDetails.value.items.travel
      trainingRef.value = QuotationDetails.value.items.train
      pickupRef.value = QuotationDetails.value.items.pick
      boardingRef.value = QuotationDetails.value.items.board

      // Customer
      QuotationDetails.value.customer_id = response.customer_id;
      GetUserData(QuotationDetails.value.customer_id);
      // Client
      QuotationDetails.value.client.id = response.client_id;
      GetClientData(QuotationDetails.value.client.id);
      // logo
      QuotationDetails.value.company_details.company_logo = response
        .company_details.company_logo
        ? "data: image/png;base64," + response.company_details.company_logo
        : getAssetPath("media/avatars/default.png");
    });

    const GetClients = async (id: string) => {
      // ? empty clients
      console.log(Clients.value);
      Clients.value.length = 0;

      // * empty clents data
      QuotationDetails.value.client.id = "";
      QuotationDetails.value.client.company_name = "";
      QuotationDetails.value.client.address1 = "";
      QuotationDetails.value.client.address2 = "";
      QuotationDetails.value.client.city = "";
      QuotationDetails.value.client.pincode = "";
      QuotationDetails.value.client.states = "";
      QuotationDetails.value.client.country = "";
      QuotationDetails.value.client.first_name = "";
      QuotationDetails.value.client.last_name = "";

      ApiService.setHeader();
      const response = await GetCustomerClients(id);
      console.log(response);
      Clients.value.push(
        ...response.result.map(({ created_at, ...rest }) => ({
          ...rest,
          created_at: moment(created_at).format("MMMM Do YYYY"),
        }))
      );
      console.log(Clients.value);
    };

    const GetUserData = async (id) => {
      if (id != " ") {
        const customer_id = id;
        const response = await getUser(customer_id);
        console.log(response);
        QuotationDetails.value.customer = response.meta;
        QuotationDetails.value.customer.id = response.id;
        clientSelect.value = false;
        /* *
         TODO : get customer_id and from meta get client ids get customer_id and from meta get client ids and put into Ref object
         ? Problem of getting clients;
        */
        GetClients(customer_id);
      } else {
        QuotationDetails.value.customer = {
          id: "",
          company_name: "",
          first_name: "",
          last_name: "",
          address1: "",
          address2: "",
          city: "",
          states: "",
          pincode: "",
          country: "",
        };
      }
    };

    const GetClientData = async (id) => {
      if (id != " ") {
        const customer_id = id;
        const response = await getClient(customer_id);
        console.log(response);

        // ? set client details
        QuotationDetails.value.client.id = response.id;
        QuotationDetails.value.client.address1 = response.meta.address1;
        QuotationDetails.value.client.company_name = response.meta.company_name;
        QuotationDetails.value.client.address2 = response.meta.address2;
        QuotationDetails.value.client.city = response.meta.city;
        QuotationDetails.value.client.pincode = response.meta.pincode;
        QuotationDetails.value.client.states = response.meta.states;
        QuotationDetails.value.client.country = response.meta.country;
        QuotationDetails.value.client.first_name = response.first_name;
        QuotationDetails.value.client.last_name = response.last_name;
        disabledselect.value = false;
        /* *
         TODO : get customer_id and from meta get client ids get customer_id and from meta get client ids and put into Ref object
         ? Problem of getting clients;
        */
      } else {
        QuotationDetails.value.customer = {
          id: "",
          company_name: "",
          first_name: "",
          last_name: "",
          address1: "",
          address2: "",
          city: "",
          states: "",
          pincode: "",
          country: "",
        };
      }
    };

    /* --------NEW LOGIC--------*/

    const accommodationRef = ref(true);
    const travellingRef = ref(true);
    const trainingRef = ref(true);
    const pickupRef = ref(true);
    const boardingRef = ref(true);

    function areAllPropertiesNotNull(array) {
      return array.some((detail) => {
        const { site_location, per_day_charge, number_of_days } = detail;

        // Check if any property is null or empty

        return (
          site_location === "" ||
          isNaN(parseFloat(per_day_charge)) ||
          isNaN(parseFloat(number_of_days))
        );
      });
    }

    const calculateTotal = async () => {
      // const days = QuotationDetails.value.items.number_of_days;

      // const charge = QuotationDetails.value.items.per_day_charge ? QuotationDetails.value.items.per_day_charge.toString() : "";
      // const charge_per_day = Number(charge.replaceAll(",", "").substring(0));

      // const accommo = QuotationDetails.value.items.accommodation ? QuotationDetails.value.items.accommodation.toString() : "";
      // const travel = QuotationDetails.value.items.travelling ? QuotationDetails.value.items.travelling.toString() : "";
      // const train = QuotationDetails.value.items.training ? QuotationDetails.value.items.training.toString() : "";
      // const pick = QuotationDetails.value.items.pickup ? QuotationDetails.value.items.pickup.toString() : "";
      // const board = QuotationDetails.value.items.boarding ? QuotationDetails.value.items.boarding.toString() : "";

      // const accommodation = Number(accommo.replaceAll(",", "").substring(0));
      // const travelling = Number(travel.replaceAll(",", "").substring(0));
      // const training = Number(train.replaceAll(",", "").substring(0));
      // const pickup = Number(pick.replaceAll(",", "").substring(0));
      // const boarding = Number(board.replaceAll(",", "").substring(0));

      QuotationDetails.value.total =
        (Number(QuotationDetails.value.items.number_of_days) * Number(QuotationDetails.value.items.per_day_charge)) +
        Number(QuotationDetails.value.items.accommodation) +
        Number(QuotationDetails.value.items.travelling) +
        Number(QuotationDetails.value.items.training) +
        Number(QuotationDetails.value.items.pickup) +
        Number(QuotationDetails.value.items.boarding);
      
    };

    async function SetLocation(id) {
      const foundLocation = await locations.value.find((item) => {
        return item.id === id;
      });
      console.log(foundLocation);

      if (foundLocation) {
        const {
          id,
          site_location,
          per_day_charge,
          accommodation,
          travelling,
          training,
        } = foundLocation;

        QuotationDetails.value.items.id = id;
        QuotationDetails.value.items.site_location = site_location;
        QuotationDetails.value.items.per_day_charge = per_day_charge;
        QuotationDetails.value.items.accommodation = Number(accommodation);
        QuotationDetails.value.items.travelling = Number(travelling);
        QuotationDetails.value.items.training = Number(training);
        QuotationDetails.value.items.boarding = 0;
        QuotationDetails.value.items.pickup = 0;

        QuotationDetails.value.items.accomm = true;
        QuotationDetails.value.items.travel = true;
        QuotationDetails.value.items.train = true;
        QuotationDetails.value.items.board = true;
        QuotationDetails.value.items.pick = true;



        accommodationRef.value = true;
        travellingRef.value = true;
        trainingRef.value = true;
        pickupRef.value = true;
        boardingRef.value = true;

        await calculateTotal();
        console.log("Function runned")
      }
    }


    async function SetPerDayCharge() {

      await calculateTotal();
    }

    async function SetDays() {
      console.log(QuotationDetails.value.items.number_of_days)
      await calculateTotal();
    }

    async function SetAccommodation() {

      await calculateTotal();
    }

    async function SetTravelling() {

      await calculateTotal();
    }

    async function SetTraining() {

      await calculateTotal();
    }

    async function SetBoarding() {

      await calculateTotal();
    }

    async function SetPickUp() {

      await calculateTotal();
    }

    async function ToggleAccommodation() {
      // console.log(event);
      if (accommodationRef.value) {
        accommodationRef.value = true;
        QuotationDetails.value.items.accomm = true;

      } else {
        accommodationRef.value = false;
        QuotationDetails.value.items.accommodation = 0;
        QuotationDetails.value.items.accomm = false;
      }
      await calculateTotal();
    }

    async function ToggleTravelling() {
      // console.log(event);
      if (travellingRef.value) {
        travellingRef.value = true;
        QuotationDetails.value.items.travel = true;

      } else {
        travellingRef.value = false;
        QuotationDetails.value.items.travelling = 0;
        QuotationDetails.value.items.travel = false;
      }
      await calculateTotal();
    }

    async function ToggleTraining() {
      // console.log(event);
      if (trainingRef.value) {
        trainingRef.value = true;
        QuotationDetails.value.items.train = true;
      } else {
        trainingRef.value = false;
        QuotationDetails.value.items.training = 0;
        QuotationDetails.value.items.train = false;
      }
      await calculateTotal();
    }

    async function ToggleBoarding() {
      // console.log(event);
      if (boardingRef.value) {
        boardingRef.value = true;
        QuotationDetails.value.items.board = true;
      } else {
        boardingRef.value = false;
        QuotationDetails.value.items.boarding = 0;
        QuotationDetails.value.items.board = false;
      }
      await calculateTotal();
    }

    async function TogglePickUp() {
      // console.log(event);
      if (pickupRef.value) {
        pickupRef.value = true;
        QuotationDetails.value.items.pick = true;
      } else {
        pickupRef.value = false;
        QuotationDetails.value.items.pickup = 0;
        QuotationDetails.value.items.pick = false;
      }
      await calculateTotal();
    }

    const GetCustomers = async () => {
      ApiService.setHeader();
      const response = await getCustomers(``);
      Customers.value.push(
        ...response.result.data.map(({ created_at, ...rest }) => ({
          ...rest,
          created_at: moment(created_at).format("MMMM Do YYYY"),
        }))
      );
    };

    const generatePdf = async (pdfName: string) => {
      console.log(QuotationDetails.value);
      await Gen("quotation", QuotationId.toString(), pdfName, QuotationDetails);
    };

    // number formating remove
    const submit = async () => {
      disabledselect.value = true;
      console.log(QuotationDetails.value);
      QuotationDetails.value.date = moment(QuotationDetails.value.date).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      QuotationDetails.value.duedate = moment(
        QuotationDetails.value.duedate
      ).format("YYYY-MM-DD HH:mm:ss");
      // console.log(QuotationDetails.value);
      try {
        // Call your API here with the form values
        const response = await updateQuotation(
          QuotationDetails.value,
          QuotationId
        );
        // console.log(response.error);
        if (!response.error) {
          // Handle successful API response
          // console.log("API response:", response);
          showSuccessAlert(
            "Success",
            "Company details have been successfully inserted!"
          );
        } else {
          // Handle API error response
          const errorData = response.error;
          // console.log("API error:", errorData);
          console.log("API error:", errorData.response.data.errors);
          showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
        }
      } catch (error) {
        // Handle any other errors during API call
        console.error("API call error:", error);
        showErrorAlert("Error", "An error occurred during the API call.");
      } finally {
        disabledselect.value = false;
      }
    };

    const deleteQuotation = () => {
      Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover from this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "red",
        confirmButtonText: "Yes, I am sure!",
      }).then((result: { [x: string]: any }) => {
        if (result["isConfirmed"]) {
          // Put your function here
          deletequotation(QuotationId);
          route.push({ name: "quotation-list" });
        }
      });
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
      }).then(() => {
        console.log("Done");
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

    // date

    const shortcuts = [
      {
        text: "Today",
        value: new Date(),
      },
      {
        text: "Yesterday",
        value: () => {
          const date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24);
          return date;
        },
      },
      {
        text: "A week ago",
        value: () => {
          const date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
          return date;
        },
      },
    ];

    // * Send Inovoice

    const SendInvoice = async () => {
      console.warn("Nice");
      // console.log(quotationDetail.value);
      Swal.fire({
        title: "Are you sure?",
        text: "Send Quotation to Invoice!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#009ef7",
        confirmButtonText: "Yes, I am sure!",
      }).then(async (result: { [x: string]: any }) => {
        if (result["isConfirmed"]) {
          let invoice_no = QuotationDetails.value.quotation_no;
          QuotationDetails.value.invoice_no = invoice_no;

          // QuotationDetails.value.quotation_no = quotationid.toString();
          QuotationDetails.value.date = moment(
            QuotationDetails.value.date
          ).format("YYYY-MM-DD HH:mm:ss");
          QuotationDetails.value.duedate = moment(
            QuotationDetails.value.duedate
          ).format("YYYY-MM-DD HH:mm:ss");
          // console.log(QuotationDetails.value);
          try {
            // update the invoice
            // converted to invoice
            QuotationDetails.value.status = "3";
            const res = await updateQuotation(
              QuotationDetails.value,
              QuotationId
            );
            // Call your API here with the form values
            if (res.error) {
              // Handle successful API response
              const errorData = res.error;
              // console.log("API error:", errorData);
              console.log("API error:", errorData.response.data.errors);
              showErrorAlert(
                "Warning",
                "Please Fill the Form Fields Correctly"
              );
            }

            // sending to
            // set to invoice
            // draf status

            // * inrc invoice count
            const ress = await GetIncrInvoiceId(User.company_id);
            let latestinvoice_no = ress.result.split("_");
            latestinvoice_no =
              latestinvoice_no[0] +
              "_" +
              (parseInt(latestinvoice_no[1]) + 1).toString();

            QuotationDetails.value.invoice_no = latestinvoice_no;
            QuotationDetails.value.quotation_no = QuotationId.toString();
            QuotationDetails.value.status = "1";
            QuotationDetails.value.created_by = User.id;
            const response = await addInvoice(QuotationDetails.value);
            // console.log(response.error);
            if (!response.error) {
              // Handle successful API response
              // console.log("API response:", response);
              showSuccessAlert(
                "Success",
                "Quotation Successfully Converted to Invoice"
              );
              route.push({ name: "quotation-list" });
            } else {
              // Handle API error response
              const errorData = response.error;
              // console.log("API error:", errorData);
              console.log("API error:", errorData.response.data.errors);
              showErrorAlert(
                "Warning",
                "Invoice Already Exist For this Quotation"
              );
            }
          } catch (error) {
            // Handle any other errors during API call
            console.error("API call error:", error);
            showErrorAlert("Error", "An error occurred during the API call.");
          }
        }
      });
    };

    const disabledDate = (time: Date) => {
      return null;
    };

    return {
      Clients,
      QuotationDetails,
      Customers,
      getAssetPath,
      submit,
      deleteQuotation,
      disabledselect,
      clientSelect,
      shortcuts,
      disabledDate,
      GetUserData,
      GetClientData,
      QuotationStatusArray,
      GetQuotationStatus,
      Total,
      generatePdf,
      SendInvoice,
      SetLocation,
      SetPerDayCharge,
      SetDays,
      loading,
      locations,
      SetAccommodation,
      SetTravelling,
      SetTraining,
      SetBoarding,
      SetPickUp,
      accommodationRef,
      travellingRef,
      trainingRef,
      pickupRef,
      boardingRef,
      ToggleAccommodation,
      ToggleTraining,
      ToggleTravelling,
      TogglePickUp,
      ToggleBoarding,
    };
  },
});
</script>

<style>
.el-input__inner {
  font-weight: 500;
}

.el-input__wrapper {
  height: 3rem;
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

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  display: none;
}
</style>
