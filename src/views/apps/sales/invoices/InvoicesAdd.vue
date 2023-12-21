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
                    >Invoice # {{ InvoiceDetails.invoice_no }}</span
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
                        v-model="InvoiceDetails.date"
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
                        v-model="InvoiceDetails.duedate"
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
              <div
                class="form-check form-switch form-check-custom form-check-primary form-check-solid"
              >
                <input
                  class="form-check-input"
                  type="checkbox"
                  :value="false"
                  name="siteSameAsBilling"
                  id="siteSameAsBilling"
                  v-on:change="ToggleClient"
                  v-model="siteSameAsBilling"
                />
                <label
                  class="form-check-label fw-bold text-primary fw-semobold fs-5"
                  for="maintenance_plan"
                >
                  Want this service for you then kindly check it.
                  <i class="text-gray-700"
                    >( site address same as billing address)</i
                  >
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
                  <div id="lead " class="row gx-10">
                    <el-select
                      v-model="InvoiceDetails.lead_id"
                      placeholder="Please Select Customer"
                      filterable
                      v-on:change="GetUserData(InvoiceDetails.lead_id)"
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
                      <div class="mb-1" v-show="InvoiceDetails.lead">
                        <br />
                        <span>
                          {{
                            `${InvoiceDetails.lead.first_name} ${InvoiceDetails.lead.last_name}`
                          }}
                        </span>
                        <br />
                        <span v-show="InvoiceDetails.lead.company_name">
                          {{ `${InvoiceDetails.lead.company_name}` }}
                        </span>
                        <!-- v-if company_data present -->
                        <div v-show="InvoiceDetails.lead.company_name">
                          <br />
                          <span>
                            {{ `${InvoiceDetails.lead.address1}` }}
                          </span>
                          <br />
                          <span>
                            {{ `${InvoiceDetails.lead.address2}` }}
                          </span>
                        </div>
                        <div v-show="InvoiceDetails.lead.country">
                          <span>
                            {{
                              `${InvoiceDetails.lead.city} - ${InvoiceDetails.lead.pincode}`
                            }}
                          </span>
                          <br />
                          <span>
                            {{
                              `${InvoiceDetails.lead.states} ${InvoiceDetails.lead.country}`
                            }}
                          </span>
                          <br />
                        </div>
                        <br />
                        <!-- firstname as a flag -->
                        <a
                          v-show="InvoiceDetails.lead.first_name"
                          target="blank"
                          v-bind:href="`/customers/edit/${InvoiceDetails.lead_id}`"
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
                      v-model="InvoiceDetails.client.id"
                      filterable
                      :disabled="clientSelect"
                      v-on:change="GetClientData(InvoiceDetails.client.id)"
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
                      <div class="mb-1" v-show="InvoiceDetails.client">
                        <br />
                        <span>
                          {{
                            `${InvoiceDetails.client.first_name} ${InvoiceDetails.client.last_name}`
                          }}
                        </span>
                        <br />
                        <span v-show="InvoiceDetails.client.company_name">
                          {{ `${InvoiceDetails.client.company_name}` }}
                        </span>
                        <!-- v-if company_data present -->
                        <div v-show="InvoiceDetails.client.company_name">
                          <br />
                          <span>
                            {{ `${InvoiceDetails.client.address1}` }}
                          </span>
                          <br />
                          <span>
                            {{ `${InvoiceDetails.client.address2}` }}
                          </span>
                        </div>
                        <div v-show="InvoiceDetails.client.country">
                          <span>
                            {{
                              `${InvoiceDetails.client.city} - ${InvoiceDetails.client.pincode}`
                            }}
                          </span>
                          <br />
                          <span>
                            {{
                              `${InvoiceDetails.client.states} ${InvoiceDetails.client.country}`
                            }}
                          </span>
                          <br />
                        </div>
                        <br />
                        <!-- firstname as a flag -->
                        <a
                          v-show="
                            InvoiceDetails.client.id &&
                            InvoiceDetails.client.first_name &&
                            !siteSameAsBilling
                          "
                          target="blank"
                          v-bind:href="`/clients/edit/${InvoiceDetails.client.id}`"
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
              <label
                class="btn btn-outline btn-outline-dashed btn-outline-default p-5 d-flex align-items-center"
              >
                <!--begin::Info-->
                <span class="d-block fw-semobold text-start">
                  <span class="text-dark fw-bold d-block fs-6 mb-2"
                    >Quotation based on Day-Wise or Equipment-Wise</span
                  >
                  <input
                    type="radio"
                    class="btn-check"
                    name="work_status"
                    id="day_wise"
                    value="1"
                    v-model="InvoiceDetails.day_or_equipment"
                    v-on:change="handleDayWiseChange(true)"
                    autocomplete="off"
                  />
                  <label class="btn btn-outline-primary" for="day_wise"
                    >Day Wise</label
                  >
                  <input
                    type="radio"
                    class="btn-check"
                    name="work_status"
                    id="equipment_wise"
                    v-model="InvoiceDetails.day_or_equipment"
                    v-on:change="handleDayWiseChange(false)"
                    value="2"
                    autocomplete="off"
                  />
                  <label class="btn btn-outline-primary" for="equipment_wise"
                    >Equiment Wise</label
                  >
                </span>
                <!--end::Info-->
              </label>
            </div>

            <div class="row mb-6">
              <!--begin::Label-->
              <label
                class="col-lg-3 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                >Select Site Location</label
              >
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-9 fv-row">
                <el-select
                  v-model="InvoiceDetails.items.id"
                  filterable
                  v-on:change="SetLocation"
                  placeholder="Please Select Site Location..."
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

            <!--begin::Input group-->
            <div class="row mb-6" v-show="dayWiseRef === false">
              <CustomInvoiceItems
                v-bind:equipment_wise="InvoiceDetails.items.equipment_wise"
                v-bind:equipments="equipments"
                v-on:removeRow="RemoveRow"
                v-on:addNewRow="addNewRow"
                v-on:setTheEquipment="SetEquipment"
                v-on:setTheEquipmentCharge="SetEquipmentCharge"
                v-on:setTheQuantity="SetQuantity"
              ></CustomInvoiceItems>
            </div>
            <!--end::Input group-->

            <div v-show="dayWiseRef === true">
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
                    v-model="InvoiceDetails.items.per_day_charge"
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
                    v-model="InvoiceDetails.items.number_of_days"
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
                          :value="false"
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
                          v-model="InvoiceDetails.items.accommodation"
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
                          :value="false"
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
                          v-model="InvoiceDetails.items.travelling"
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
                          :value="false"
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
                          v-model="InvoiceDetails.items.training"
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
                          :value="false"
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
                          v-model="InvoiceDetails.items.pickup"
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
                          :value="false"
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
                          v-model="InvoiceDetails.items.boarding"
                          :disabled="!boardingRef"
                          placeholder="0"
                        />
                      </div>
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
                <label
                  class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Scope of Work</label
                >
                <!--end::Label-->
                <textarea
                  name="scope_of_work"
                  class="form-control form-control-solid"
                  rows="5"
                  v-model="InvoiceDetails.scope_of_work"
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
                <label
                  class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Terms & Conditions</label
                >
                <!--end::Label-->
                <textarea
                  name="terms_and_conditions"
                  class="form-control form-control-solid"
                  rows="5"
                  v-model="InvoiceDetails.terms_and_conditions"
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
                  <div class="row mb-6">
                    <!--begin::Label-->
                    <label
                      class="col-lg-3 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                      >Invoice Status</label
                    >
                    <!--end::Label-->

                    <!--begin::Col-->
                    <div class="col-lg-9 fv-row">
                      <el-select
                        v-model="InvoiceDetails.status"
                        filterable
                        placeholder="Please Select Status..."
                      >
                        <el-option
                          v-for="item in InvoiceStatusArray"
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
                          v-if="InvoiceDetails.items.id != ''"
                          class="badge badge-light-primary flex-shrink-0 align-self-center py-3 px-4 fs-7"
                          >+ {{ InvoiceDetails.items.site_location }} ({{
                            InvoiceDetails.items.per_day_charge
                          }}
                          x {{ InvoiceDetails.items.number_of_days }})
                        </span>
                        <span
                          v-if="InvoiceDetails.items.accomm"
                          class="badge badge-light-primary flex-shrink-0 align-self-center py-3 px-4 fs-7"
                          >+ Accomodation ({{
                            InvoiceDetails.items.accommodation
                          }})
                        </span>
                        <span
                          v-if="InvoiceDetails.items.travel"
                          class="badge badge-light-primary flex-shrink-0 align-self-center py-3 px-4 fs-7"
                          >+ Travelling ({{ InvoiceDetails.items.travelling }})
                        </span>
                        <span
                          v-if="InvoiceDetails.items.train"
                          class="badge badge-light-primary flex-shrink-0 align-self-center py-3 px-4 fs-7"
                          >+ Training ({{ InvoiceDetails.items.training }})
                        </span>
                        <span
                          v-if="InvoiceDetails.items.board"
                          class="badge badge-light-primary flex-shrink-0 align-self-center py-3 px-4 fs-7"
                          >+ Boarding & Lodging ({{
                            InvoiceDetails.items.boarding
                          }})
                        </span>
                        <span
                          v-if="InvoiceDetails.items.pick"
                          class="badge badge-light-primary flex-shrink-0 align-self-center py-3 px-4 fs-7"
                          >+ Pickup & Delivery ({{
                            InvoiceDetails.items.pickup
                          }})
                        </span>
                      </p>
                    </div>
                    <div class="total">
                      <div>
                        <h6
                          class="text-start fs-4 text-nowrap badge badge-light flex-shrink-0 align-self-center py-3 px-4 fs-7"
                        >
                          {{
                            GetInvoiceStatus(parseInt(InvoiceDetails.status))
                          }}
                        </h6>
                      </div>
                      <div>
                        <h3 class="text-end fs-4 text-nowrap">Total</h3>
                        <h3 class="text-end fs-4 text-nowrap">
                          ₹<span data-kt-element="grand-total">{{
                            InvoiceDetails.total.toFixed(2)
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
            <span
              v-on:click="submit"
              type="submit"
              href="#"
              class="btn btn-primary w-lg-50"
              id="kt_Quotation_submit_button"
            >
              <i class="ki-duotone ki-triangle fs-3"
                ><span class="path1"></span><span class="path2"></span
                ><span class="path3"></span
              ></i>
              Add Invoice
            </span>
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
  addInvoice,
  getUser,
  getClient,
  GetCustomerClients,
  GetIncrInvoiceId,
  getPriceList,
} from "@/stores/api";
import { useAuthStore } from "@/stores/auth";
import moment from "moment";
import { useRouter } from "vue-router";
import { formatPrice } from "@/core/config/DataFormatter";
import {
  InvoiceStatusArray,
  GetInvoiceStatus,
} from "@/core/config/InvoiceStatusConfig";
import CustomInvoiceItems from "./CustomComponents/CustomInvoiceItems.vue";

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

interface EDetails {
  id: string;
  name: string;
  charge: number;
  quantity: number;
  amount: number;
}

interface InvoiceDetails {
  invoice_no: string;
  lead_id: string;
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
    equipment_wise: Array<EDetails>;
  };
  enquiry_no: string;
  date: string;
  duedate: string;
  status: string;
  scope_of_work: string;
  terms_and_conditions: string;
  total: number;
  day_or_equipment: string;
  lead: Meta;
  client: Meta;
  is_active: number;
  company_id: string;
  created_by: string;
  updated_by: string;
}

export default defineComponent({
  name: "company-add",
  components: {
    CustomInvoiceItems,
  },
  setup() {
    const auth = useAuthStore();
    const disabledselect = ref(true);
    const clientSelect = ref(true);
    const Total = ref(0);
    const route = useRouter();
    const User = auth.GetUser();
    const loading = ref(false);

    const Customers = ref([
      { id: "", first_name: "", last_name: "", meta: { company_name: "" } },
    ]);
    const Clients = ref([
      {
        id: "",
        client_data: {
          id: "",
          first_name: "",
          last_name: "",
          meta: { company_name: "" },
        },
      },
    ]);

    const locations = ref([
      {
        id: "",
        site_location: "",
        per_day_charge: "",
        accommodation: "",
        travelling: "",
        training: "",
        equipment_wise: [
          {
            id: "",
            name: "",
            charge: "",
          },
        ],
      },
    ]);

    const equipments = ref([
      {
        id: "",
        name: "",
        charge: "",
      },
    ]);

    const siteSameAsBilling = ref(false);

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
          equipment_wise,
        }) => ({
          id,
          site_location,
          per_day_charge,
          accommodation,
          travelling,
          training,
          equipment_wise: JSON.parse(equipment_wise),
        })
      );
      locations.value = data;
    };

    const InvoiceDetails = ref<InvoiceDetails>({
      invoice_no: "",
      lead_id: "",
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
        equipment_wise: [],
      },
      enquiry_no: "",
      date: "",
      duedate: "",
      status: "",
      scope_of_work: "",
      terms_and_conditions: "",
      lead: {
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
      total: 0,
      is_active: 1,
      day_or_equipment: "1",
      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
    });

    const ToggleClient = () => {
      if (siteSameAsBilling.value) {
        siteSameAsBilling.value = true;
        clientSelect.value = true;
        if (InvoiceDetails.value.lead_id) {
          InvoiceDetails.value.client = InvoiceDetails.value.lead;
          InvoiceDetails.value.client.id = "0";
        } else {
          InvoiceDetails.value.client = {
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
          InvoiceDetails.value.lead = {
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
      } else {
        siteSameAsBilling.value = false;
        clientSelect.value = true;

        InvoiceDetails.value.lead_id = "";
        InvoiceDetails.value.lead = {
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

        InvoiceDetails.value.client = {
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

    onMounted(async () => {
      // todo: quotation check if pres get last incr 1
      const res = await GetIncrInvoiceId(User.company_id);
      IncrInvoice(res);
      // * basic fetch
      Customers.value.pop();
      Clients.value.pop();
      locations.value.pop();
      await GetCustomers();
      await getSelects();
    });

    /* --------DAY WISE LOGIC--------*/

    const accommodationRef = ref(true);
    const travellingRef = ref(true);
    const trainingRef = ref(true);
    const pickupRef = ref(true);
    const boardingRef = ref(true);

    const calculateTotal = async () => {
      InvoiceDetails.value.total =
        Number(InvoiceDetails.value.items.number_of_days) *
          Number(InvoiceDetails.value.items.per_day_charge) +
        Number(InvoiceDetails.value.items.accommodation) +
        Number(InvoiceDetails.value.items.travelling) +
        Number(InvoiceDetails.value.items.training) +
        Number(InvoiceDetails.value.items.pickup) +
        Number(InvoiceDetails.value.items.boarding);
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
          equipment_wise,
        } = foundLocation;

        InvoiceDetails.value.items.id = id;
        InvoiceDetails.value.items.site_location = site_location;

        if (dayWiseRef.value) {
          InvoiceDetails.value.items.per_day_charge = per_day_charge;
          InvoiceDetails.value.items.number_of_days = "1";
          InvoiceDetails.value.items.accommodation = Number(accommodation);
          InvoiceDetails.value.items.travelling = Number(travelling);
          InvoiceDetails.value.items.training = Number(training);
          InvoiceDetails.value.items.boarding = 0;
          InvoiceDetails.value.items.pickup = 0;

          equipments.value.pop();
          equipments.value = [...equipment_wise];

          InvoiceDetails.value.items.equipment_wise = [];

          InvoiceDetails.value.items.accomm = true;
          InvoiceDetails.value.items.travel = true;
          InvoiceDetails.value.items.train = true;
          InvoiceDetails.value.items.board = true;
          InvoiceDetails.value.items.pick = true;

          accommodationRef.value = true;
          travellingRef.value = true;
          trainingRef.value = true;
          pickupRef.value = true;
          boardingRef.value = true;

          await calculateTotal();
        } else {
          InvoiceDetails.value.items.per_day_charge = "";
          InvoiceDetails.value.items.accommodation = 0;
          InvoiceDetails.value.items.travelling = 0;
          InvoiceDetails.value.items.training = 0;
          InvoiceDetails.value.items.boarding = 0;
          InvoiceDetails.value.items.pickup = 0;
          InvoiceDetails.value.items.number_of_days = "1";
          equipments.value.pop();
          equipments.value = [...equipment_wise];

          InvoiceDetails.value.items.equipment_wise = [];

          InvoiceDetails.value.total = 0;
        }
      }
    }

    async function SetPerDayCharge() {
      await calculateTotal();
    }

    async function SetDays() {
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
        InvoiceDetails.value.items.accomm = true;
      } else {
        accommodationRef.value = false;
        InvoiceDetails.value.items.accommodation = 0;
        InvoiceDetails.value.items.accomm = false;
      }
      await calculateTotal();
    }

    async function ToggleTravelling() {
      // console.log(event);
      if (travellingRef.value) {
        travellingRef.value = true;
        InvoiceDetails.value.items.travel = true;
      } else {
        travellingRef.value = false;
        InvoiceDetails.value.items.travelling = 0;
        InvoiceDetails.value.items.travel = false;
      }
      await calculateTotal();
    }

    async function ToggleTraining() {
      // console.log(event);
      if (trainingRef.value) {
        trainingRef.value = true;
        InvoiceDetails.value.items.train = true;
      } else {
        trainingRef.value = false;
        InvoiceDetails.value.items.training = 0;
        InvoiceDetails.value.items.train = false;
      }
      await calculateTotal();
    }

    async function ToggleBoarding() {
      // console.log(event);
      if (boardingRef.value) {
        boardingRef.value = true;
        InvoiceDetails.value.items.board = true;
      } else {
        boardingRef.value = false;
        InvoiceDetails.value.items.boarding = 0;
        InvoiceDetails.value.items.board = false;
      }
      await calculateTotal();
    }

    async function TogglePickUp() {
      // console.log(event);
      if (pickupRef.value) {
        pickupRef.value = true;
        InvoiceDetails.value.items.pick = true;
      } else {
        pickupRef.value = false;
        InvoiceDetails.value.items.pickup = 0;
        InvoiceDetails.value.items.pick = false;
      }
      await calculateTotal();
    }

    /* --------EQUIPMENT WISE LOGIC--------*/
    const dayWiseRef = ref(true);

    function areAllPropertiesEmpty(array) {
      return array.some((detail) => {
        const { name, charge, quantity } = detail;

        // Check if any property is null or empty

        return (
          name === "" ||
          isNaN(parseFloat(charge)) ||
          isNaN(parseFloat(quantity))
        );
      });
    }

    function calculateEquipmentCharge(index) {
      if (
        InvoiceDetails.value.items.equipment_wise[index].charge &&
        InvoiceDetails.value.items.equipment_wise[index].quantity
      ) {
        let equipValue =
          Number(InvoiceDetails.value.items.equipment_wise[index].charge) *
          Number(InvoiceDetails.value.items.equipment_wise[index].quantity);
        InvoiceDetails.value.items.equipment_wise[index].amount = Number(
          equipValue.toFixed(2)
        );
      } else {
        InvoiceDetails.value.items.equipment_wise[index].amount = 0;
      }
      calculateTotalEquipment();
    }

    const calculateTotalEquipment = () => {
      InvoiceDetails.value.total =
        InvoiceDetails.value.items.equipment_wise.reduce(
          (sum, item) => sum + item.amount,
          0
        );
    };

    const addNewRow = () => {
      if (!InvoiceDetails.value.items.equipment_wise.length) {
        InvoiceDetails.value.items.equipment_wise.push({
          id: "",
          name: "",
          charge: 0,
          quantity: 1,
          amount: 0,
        });
        calculateTotalEquipment();
      } else {
        const isEmpty = areAllPropertiesEmpty(
          InvoiceDetails.value.items.equipment_wise
        );
        if (!isEmpty) {
          InvoiceDetails.value.items.equipment_wise.push({
            id: "",
            name: "",
            charge: 0,
            quantity: 1,
            amount: 0,
          });
          calculateTotalEquipment();
        } else {
          Swal.fire({
            icon: "info",
            title: "Please fill all the details correctly",
          });
        }
      }
      console.log(InvoiceDetails.value.items.equipment_wise);
    };

    async function SetEquipment(foundItem, index) {
      console.log(foundItem);
      const { id, name, charge } = foundItem;
      InvoiceDetails.value.items.equipment_wise[index].id = await id;
      InvoiceDetails.value.items.equipment_wise[index].name = await name;
      InvoiceDetails.value.items.equipment_wise[index].charge = await charge;
      InvoiceDetails.value.items.equipment_wise[index].quantity = 1;
      InvoiceDetails.value.items.equipment_wise[index].amount = 0;
      calculateEquipmentCharge(index);
    }

    async function SetEquipmentCharge(data, index) {
      console.log(data);
      InvoiceDetails.value.items.equipment_wise[index].charge = await data;
      calculateEquipmentCharge(index);
    }

    async function SetQuantity(data, index) {
      console.log(data);
      InvoiceDetails.value.items.equipment_wise[index].quantity = await data;
      calculateEquipmentCharge(index);
    }

    const removeObjectWithId = (arr, id) => {
      if (id !== -1) {
        arr.splice(id, 1);
      }

      return arr;
    };

    const RemoveRow = (index) => {
      InvoiceDetails.value.items.equipment_wise = removeObjectWithId(
        InvoiceDetails.value.items.equipment_wise,
        index
      );

      calculateTotalEquipment();
    };

    /* --------LATEST INVOICE LOGIC--------*/

    const IncrInvoice = (data: any) => {
      console.log(data.result);
      const latestInvoice_no = data.result.split("_");
      if (parseInt(latestInvoice_no[1]) == 0) {
        // ? if no record
        InvoiceDetails.value.invoice_no =
          latestInvoice_no[0] + "_" + latestInvoice_no[1].toString();
      } else {
        // ? if record exisit inc 1
        InvoiceDetails.value.invoice_no =
          latestInvoice_no[0] + "_" + (1 + +latestInvoice_no[1]).toString();
      }
    };

    /* --------CUSTOMER-CLIENT LOGIC--------*/

    const GetClients = async (id: string) => {
      // ? empty clients
      console.log(Clients.value);
      Clients.value.length = 0;

      // * empty clents data
      InvoiceDetails.value.client.id = "";
      InvoiceDetails.value.client.company_name = "";
      InvoiceDetails.value.client.address1 = "";
      InvoiceDetails.value.client.address2 = "";
      InvoiceDetails.value.client.city = "";
      InvoiceDetails.value.client.pincode = "";
      InvoiceDetails.value.client.states = "";
      InvoiceDetails.value.client.country = "";
      InvoiceDetails.value.client.first_name = "";
      InvoiceDetails.value.client.last_name = "";

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
        InvoiceDetails.value.lead = response.meta;
        InvoiceDetails.value.lead.id = response.id;
        InvoiceDetails.value.enquiry_no = response.meta.enquiry_no;

        if (siteSameAsBilling.value) {
          ToggleClient();
        } else {
          clientSelect.value = false;
          GetClients(customer_id);
        }
      } else {
        InvoiceDetails.value.enquiry_no = "";
        InvoiceDetails.value.lead = {
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
        InvoiceDetails.value.client.address1 = response.meta.address1;
        InvoiceDetails.value.client.company_name = response.meta.company_name;
        InvoiceDetails.value.client.address2 = response.meta.address2;
        InvoiceDetails.value.client.city = response.meta.city;
        InvoiceDetails.value.client.pincode = response.meta.pincode;
        InvoiceDetails.value.client.states = response.meta.states;
        InvoiceDetails.value.client.country = response.meta.country;
        InvoiceDetails.value.client.first_name = response.first_name;
        InvoiceDetails.value.client.last_name = response.last_name;
        disabledselect.value = false;
        /* *
         TODO : get customer_id and from meta get client ids get customer_id and from meta get client ids and put into Ref object
         ? Problem of getting clients;
        */
      } else {
        InvoiceDetails.value.lead = {
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

    function areAllPropertiesNull(array) {
      return array.some((detail) => {
        const {
          invoice_no,
          lead_id,
          enquiry_no,
          lead,
          client,
          items,
          date,
          duedate,
          status,
          scope_of_work,
          terms_and_conditions,
          total,
        } = detail;

        // Check if any property is null or empty

        return (
          invoice_no === "" ||
          lead_id === "" ||
          enquiry_no === "" ||
          items.id === "" ||
          lead.id === "" ||
          client.id === "" ||
          date === null ||
          duedate === null ||
          status === "" ||
          scope_of_work === "" ||
          terms_and_conditions === "" ||
          isNaN(parseFloat(total))
        );
      });
    }

    const handleDayWiseChange = (value) => {
      InvoiceDetails.value.items.id = "";
      InvoiceDetails.value.items = {
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
        equipment_wise: [],
      };
      InvoiceDetails.value.total = 0;
      equipments.value = [];
      dayWiseRef.value = value;
    };

    // number formating remove
    const submit = async (e) => {
      e.preventDefault();

      // console.log(InvoiceDetails.value);
      try {
        const result = areAllPropertiesNull([InvoiceDetails.value]);

        if (result) {
          showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
          loading.value = false;
          return;
        }

        if (InvoiceDetails.value.date && InvoiceDetails.value.duedate) {
          InvoiceDetails.value.date = moment(InvoiceDetails.value.date).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          InvoiceDetails.value.duedate = moment(
            InvoiceDetails.value.duedate
          ).format("YYYY-MM-DD HH:mm:ss");
        } else {
          showErrorAlert(
            "Warning",
            "Dates cannot be empty, please fill all the required details"
          );
          loading.value = false;
          return;
        }

        if (
          dayWiseRef.value === true &&
          (InvoiceDetails.value.items.id === "" ||
            InvoiceDetails.value.items.per_day_charge === "")
        ) {
          showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
          loading.value = false;
          return;
        }

        const isEmpty = areAllPropertiesEmpty(
          InvoiceDetails.value.items.equipment_wise
        );

        if (
          dayWiseRef.value === false &&
          (InvoiceDetails.value.items.id === "" ||
            InvoiceDetails.value.items.equipment_wise.length === 0)
        ) {
          showErrorAlert(
            "Warning",
            "Please Fill at least one equipment correctly"
          );
          loading.value = false;
          return;
        }

        if (dayWiseRef.value === false && isEmpty) {
          showErrorAlert("Warning", "Please Fill equipment details correctly");
          loading.value = false;
          return;
        }

        // Call your API here with the form values
        const response = await addInvoice(InvoiceDetails.value);
        // console.log(response.error);
        if (!response.error) {
          // Handle successful API response
          // console.log("API response:", response);
          showSuccessAlert(
            "Success",
            "Invoice have been successfully created!"
          );
          route.push({ name: "invoices-list" });
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
      }).then(() => {
        clear();
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

    const disabledDate = (time: Date) => {
      return null;
    };

    const clear = () => {
      InvoiceDetails.value = {
        invoice_no: "",
        lead_id: " ",
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
          equipment_wise: [],
        },
        enquiry_no: "",
        date: "",
        duedate: "",
        status: "",
        scope_of_work: "",
        terms_and_conditions: "",
        total: 0,
        day_or_equipment: "1",
        lead: {
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
        is_active: 1,
        created_by: User.id,
        updated_by: User.id,
        company_id: User.company_id,
      };
    };

    return {
      Clients,
      InvoiceDetails,
      Customers,
      getAssetPath,
      submit,
      disabledselect,
      clientSelect,
      shortcuts,
      disabledDate,
      GetUserData,
      GetClientData,
      InvoiceStatusArray,
      GetInvoiceStatus,
      Total,
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
      siteSameAsBilling,
      ToggleClient,
      RemoveRow,
      addNewRow,
      SetEquipment,
      SetEquipmentCharge,
      SetQuantity,
      equipments,
      dayWiseRef,
      handleDayWiseChange,
    };
  },
});
</script>

<style>
.el-input__inner {
  font-weight: 500;
}

.el-input__wrapper {
  height: 3.5rem;
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
