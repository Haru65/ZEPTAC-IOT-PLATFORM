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
          @submit="onsubmit"
          novalidate
        >
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
                        type="date"
                        name="date"
                        id="date"
                        v-model="QuotationDetails.date"
                        @change="setDates($event, 'date')"
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
                        type="date"
                        name="duedate"
                        id="duedate"
                        v-model="QuotationDetails.duedate"
                        @change="setDates($event, 'duedate')"
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

            <!--begin::Input group-->
            <div class="row mb-6">
              <!--begin::Col-->
              <div class="col-md-6 fv-row mb-8 mb-sd-8">
                <!--begin::Label-->
                <label class="fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Customer :</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <div class="form-control form-control-lg form-control-solid">
                  <div>{{ QuotationDetails.customer.company_name }}</div>
                  <div class="mt-2 pt-4">
                    <h6 class="mt-5">Billing Address:</h6>
                    <div class="mt-2">
                      <div class="mb-1">
                        <br />
                        <span v-show="QuotationDetails.customer.company_name">
                          {{
                            `${QuotationDetails.customer.company_name || ""}`
                          }}
                        </span>
                        <br />
                        <span>
                          {{ `${QuotationDetails.customer.name}` }}
                        </span>
                        <!-- v-if company_data present -->
                        <div v-show="QuotationDetails.customer.company_name">
                          <br />
                          <span>
                            {{ `${QuotationDetails.customer.address1 || ""}` }}
                          </span>
                          <br />
                          <span>
                            {{ `${QuotationDetails.customer.address2 || ""}` }}
                          </span>
                        </div>
                        <div v-show="QuotationDetails.customer.country">
                          <span>
                            {{
                              `${QuotationDetails.customer.city || ""} - ${
                                QuotationDetails.customer.pincode || ""
                              }`
                            }}
                          </span>
                          <br />
                          <span>
                            {{
                              `${QuotationDetails.customer.state || ""} ${
                                QuotationDetails.customer.country || ""
                              }`
                            }}
                          </span>
                          <br />
                        </div>
                        <br />
                        <!-- firstname as a flag -->
                        <a
                          v-show="QuotationDetails.customer.name"
                          target="blank"
                          v-bind:href="`/leads/edit/${QuotationDetails.customer_id}`"
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
                  <div>{{ QuotationDetails.client.company_name }}</div>
                  <div class="mt-2 pt-4">
                    <h6 class="mt-5">Site Address:</h6>
                    <div class="mt-2">
                      <div class="mb-1" v-show="QuotationDetails.client">
                        <br />
                        <span v-show="QuotationDetails.client.company_name">
                          {{ `${QuotationDetails.client.company_name || ""}` }}
                        </span>
                        <br />
                        <span>
                          {{ `${QuotationDetails.client.name || ""}` }}
                        </span>
                        <!-- v-if company_data present -->
                        <div v-show="QuotationDetails.client.company_name">
                          <br />
                          <span>
                            {{ `${QuotationDetails.client.address1 || ""}` }}
                          </span>
                          <br />
                          <span>
                            {{ `${QuotationDetails.client.address2 || ""}` }}
                          </span>
                        </div>
                        <div v-show="QuotationDetails.client.country">
                          <span>
                            {{
                              `${QuotationDetails.client.city || ""} - ${
                                QuotationDetails.client.pincode || ""
                              }`
                            }}
                          </span>
                          <br />
                          <span>
                            {{
                              `${QuotationDetails.client.state || ""} ${
                                QuotationDetails.client.country || ""
                              }`
                            }}
                          </span>
                          <br />
                        </div>
                        <br />
                        <!-- firstname as a flag -->
                        <a
                          v-show="
                            QuotationDetails.client.id &&
                            QuotationDetails.client.name &&
                            !isSiteSameAsBilling
                          "
                          target="blank"
                          v-bind:href="`/clients/edit/${QuotationDetails.client.id}`"
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

                <!--end::Input-->
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->

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
                    v-model="QuotationDetails.day_or_equipment"
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
                    v-model="QuotationDetails.day_or_equipment"
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
              <CustomQuotationItems
                v-bind:equipments="equipments"
                v-bind:equipment_wise="QuotationDetails.items.equipment_wise"
                v-on:removeRow="RemoveRow"
                v-on:addNewRow="addNewRow"
                v-on:setTheEquipment="SetEquipment"
                v-on:setTheEquipmentCharge="SetEquipmentCharge"
                v-on:setTheQuantity="SetQuantity"
              ></CustomQuotationItems>
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
                          v-model="QuotationDetails.items.boarding"
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
                  v-model="QuotationDetails.scope_of_work"
                  placeholder="Specify scope of work"
                ></textarea>
                <!--end::Input-->
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->

            <div class="row mb-6">
              <!--begin::Label-->
              <label
                class="col-lg-3 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                >Select Tax/GST</label
              >
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-9 fv-row">
                <el-select
                  v-model="QuotationDetails.tax_id"
                  filterable
                  v-on:change="SetTax"
                  placeholder="Please Select Tax..."
                >
                  <el-option
                    value=""
                    label="Please Select Tax..."
                    key=""
                    disabled
                    >Please Select Tax...</el-option
                  >
                  <el-option
                    v-for="tax of TaxArray"
                    :key="tax.id"
                    :label="`${tax.tax_type} ${tax.tax_rate} %`"
                    :value="tax.id"
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
                        :disabled="isItemApproved"
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
                      <p>
                        <span
                          class="badge badge-light-primary flex-shrink-0 align-self-center py-3 px-4 fs-6"
                          >Sub Total : {{ QuotationDetails.sub_total }}
                        </span>
                      </p>
                      <p>
                        <span
                          class="badge badge-light-primary flex-shrink-0 align-self-center py-3 px-4 fs-6"
                          >Tax Rate :
                          {{
                            QuotationDetails.tax_type == "(CGST + SGST)"
                              ? `CGST ${
                                  QuotationDetails.tax_rate / 2
                                } % + CGST ${QuotationDetails.tax_rate / 2} %`
                              : `${QuotationDetails.tax_rate} %`
                          }}
                        </span>
                      </p>
                      <p>
                        <span
                          class="badge badge-light-primary flex-shrink-0 align-self-center py-3 px-4 fs-6"
                          >Tax amount : {{ QuotationDetails.tax_amount }}
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
              v-on:click="deleteItem"
            >
              Delete
            </button>
            <!--end::Button-->
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <!--begin::Button-->
            <button
              type="submit"
              ref="submitButtonRef"
              class="btn btn-lg btn-primary w-sd-25 w-lg-25"
            >
              <span class="indicator-label"> Update </span>
              <span class="indicator-progress">
                Please wait...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </button>
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
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import Swal from "sweetalert2/dist/sweetalert2.js";
import ApiService from "@/core/services/ApiService";
import {
  getLeads,
  updateQuotation,
  addInvoice,
  getUser,
  getClient,
  GetLeadClients,
  getQuotation,
  deleteQuotation,
  GetIncrInvoiceId,
  getPriceList,
  getLeadNCustomer,
  getCompanyLogo,
} from "@/stores/api";
import { useAuthStore } from "@/stores/auth";
import moment from "moment";
import { useRouter, useRoute } from "vue-router";
import { formatPrice } from "@/core/config/DataFormatter";
import { Gen } from "@/core/config/PdfGenerator";
import {
  QuotationStatusArray,
  GetQuotationStatus,
  TaxArray,
} from "@/core/config/QuotationStatusConfig";

import CustomQuotationItems from "./CustomComponents/CustomQuotationItems.vue";

interface itemsArr {
  id: string;
  site_location: string;
  per_day_charge: string;
  number_of_days: string;
  accommodation: number;
  travelling: number;
  training: number;
}

interface EDetails {
  id: string;
  name: string;
  charge: number;
  quantity: number;
  amount: number;
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

interface QuotationDetails {
  quotation_no: string;
  invoice_no: string;
  customer_id: string;
  client_id: string;
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
  date: string;
  duedate: string;
  enquiry_no: string;
  status: string;
  scope_of_work: string;
  terms_and_conditions: string;

  sub_total: number;

  tax_id: string;
  tax_type: string;
  tax_description: string;
  tax_rate: number;
  tax_amount: number;

  total: number;
  day_or_equipment: string;
  customer: Data;
  client: Data;
  company_details: {
    id: string;
    company_name: string;
    company_logo: string;
    address: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    logo_base64: string;
  };
  company_id: string;
  is_active: number;
  created_by: string;
  updated_by: string;
}

export default defineComponent({
  name: "quotation-edit",
  components: {
    ErrorMessage,
    Field,
    VForm,
    CustomQuotationItems,
  },
  setup() {
    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const auth = useAuthStore();
    const Total = ref(0);
    const route = useRouter();
    const router = useRoute();
    const User = auth.GetUser();
    const QuotationId = router.params.id;
    const loading = ref(false);

    const Customers = ref([
      {
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
    ]);
    const Clients = ref([
      {
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

    const getSelects = async () => {
      ApiService.setHeader();
      const response = await getPriceList(`fetchAll=true`);

      if (response.result != null && response.result) {
        const data = response?.result?.map(
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
      }
    };

    const QuotationDetails = ref<QuotationDetails>({
      quotation_no: "",
      invoice_no: "",
      customer_id: "",
      client_id: "",
      items: {
        id: "",
        site_location: "",
        per_day_charge: "",
        number_of_days: "",
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
      date: "",
      duedate: "",
      enquiry_no: "",
      status: "",
      scope_of_work: "",
      terms_and_conditions: "",
      customer: {
        id: "",
        company_name: "",
        name: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
      },
      client: {
        id: "",
        company_name: "",
        name: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
      },
      company_details: {
        id: "",
        company_name: "",
        company_logo: "",
        address: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
        logo_base64: "",
      },
      company_id: "",

      sub_total: 0,
      tax_id: "",
      tax_type: "",
      tax_description: "",
      tax_rate: 0,
      tax_amount: 0,

      total: 0,
      day_or_equipment: "1",
      is_active: 1,
      created_by: "",
      updated_by: User.id,
    });

    const isItemApproved = ref(false);
    const isSiteSameAsBilling = ref(false);

    onMounted(async () => {
      // clear all the dropdowns
      Customers.value.pop();
      Clients.value.pop();
      locations.value.pop();
      equipments.value.pop();

      // Function that get all PriceLists
      await getSelects();

      // get the quotaion details
      const response = await getQuotation(QuotationId);

      if (response) {
        const items = JSON.parse(response.items);
        QuotationDetails.value.status = response.status;

        QuotationDetails.value.quotation_no = response.quotation_no;
        QuotationDetails.value.customer_id = response.customer_id;
        QuotationDetails.value.client_id = response.client_id;
        QuotationDetails.value.date = response.date;
        QuotationDetails.value.duedate = response.duedate;
        QuotationDetails.value.items = await items;
        QuotationDetails.value.company_id = response.company_id;

        QuotationDetails.value.customer = { ...response.customer };
        QuotationDetails.value.client = { ...response.client };
        QuotationDetails.value.enquiry_no = response.enquiry_no;

        // check whether daywise or equipment
        dayWiseRef.value =
          QuotationDetails.value.items.equipment_wise.length === 0
            ? true
            : false;
        QuotationDetails.value.day_or_equipment =
          QuotationDetails.value.items.equipment_wise.length === 0 ? "1" : "2";

        QuotationDetails.value.tax_id = response.tax_id
          ? response.tax_id.toString()
          : "";
        QuotationDetails.value.tax_type = response.tax_type
          ? response.tax_type
          : "";
        QuotationDetails.value.tax_description = response.tax_description
          ? response.tax_description
          : "";
        QuotationDetails.value.tax_rate = response.tax_rate
          ? response.tax_rate
          : 0;
        QuotationDetails.value.tax_amount = response.tax_amount
          ? response.tax_amount
          : 0;
        QuotationDetails.value.sub_total = parseFloat(response.sub_total);

        QuotationDetails.value.total = parseFloat(response.total);
        QuotationDetails.value.scope_of_work = response.scope_of_work;
        QuotationDetails.value.terms_and_conditions =
          response.terms_and_conditions;
        QuotationDetails.value.created_by = response.created_by;
        QuotationDetails.value.updated_by = User.id;

        // check approved or not
        isItemApproved.value =
          response.status === 3 || response.status === 4 ? true : false;

        // check service want for itself
        isSiteSameAsBilling.value =
          response.client_id == null || response.client_id == "" ? true : false;

        const foundLocation = await locations.value.find((item) => {
          return item.id === QuotationDetails.value.items.id;
        });

        if (foundLocation) {
          const { equipment_wise } = foundLocation;

          equipments.value = [...equipment_wise];
        }

        accommodationRef.value = QuotationDetails.value.items.accomm;
        travellingRef.value = QuotationDetails.value.items.travel;
        trainingRef.value = QuotationDetails.value.items.train;
        pickupRef.value = QuotationDetails.value.items.pick;
        boardingRef.value = QuotationDetails.value.items.board;
      }
    });

    /* --------DAY WISE LOGIC--------*/

    const accommodationRef = ref(true);
    const travellingRef = ref(true);
    const trainingRef = ref(true);
    const pickupRef = ref(true);
    const boardingRef = ref(true);

    const calculateSubTotal = async () => {
      QuotationDetails.value.sub_total =
        Number(QuotationDetails.value.items.number_of_days) *
          Number(QuotationDetails.value.items.per_day_charge) +
        Number(QuotationDetails.value.items.accommodation) +
        Number(QuotationDetails.value.items.travelling) +
        Number(QuotationDetails.value.items.training) +
        Number(QuotationDetails.value.items.pickup) +
        Number(QuotationDetails.value.items.boarding);

      calculateTaxAmount();
    };

    /* HANDLE TAX SELECTION LOGIC */
    async function SetTax(id) {
      const foundTax = await TaxArray.find((item) => {
        return item.id === id;
      });
      // console.log(foundTax);

      if (foundTax) {
        const { id, tax_type, tax_description, tax_rate, tax_amount } =
          foundTax;

        QuotationDetails.value.tax_id = id;
        QuotationDetails.value.tax_type = tax_type;
        QuotationDetails.value.tax_description = tax_description;
        QuotationDetails.value.tax_rate = tax_rate;
        QuotationDetails.value.tax_amount = tax_amount;

        if (dayWiseRef.value) {
          calculateSubTotal();
        } else {
          calculateTotalEquipment();
        }
      }
    }

    async function SetLocation(id) {
      const foundLocation = await locations.value.find((item) => {
        return item.id === id;
      });

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

        QuotationDetails.value.items.id = id;
        QuotationDetails.value.items.site_location = site_location;

        // when day-wise quotation and location is selected
        if (dayWiseRef.value === true) {
          QuotationDetails.value.items.per_day_charge = per_day_charge;
          QuotationDetails.value.items.number_of_days = "1";
          QuotationDetails.value.items.accommodation = Number(accommodation);
          QuotationDetails.value.items.travelling = Number(travelling);
          QuotationDetails.value.items.training = Number(training);
          QuotationDetails.value.items.boarding = 0;
          QuotationDetails.value.items.pickup = 0;

          equipments.value.pop();
          equipments.value = [...equipment_wise];

          QuotationDetails.value.items.equipment_wise = [];

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

          await calculateSubTotal();
        } else {
          // when equipment-wise quotation and location is selected
          QuotationDetails.value.items.per_day_charge = "";
          QuotationDetails.value.items.accommodation = 0;
          QuotationDetails.value.items.travelling = 0;
          QuotationDetails.value.items.training = 0;
          QuotationDetails.value.items.boarding = 0;
          QuotationDetails.value.items.pickup = 0;
          QuotationDetails.value.items.number_of_days = "0";
          equipments.value.pop();
          equipments.value = [...equipment_wise];

          QuotationDetails.value.items.equipment_wise = [];

          QuotationDetails.value.sub_total = 0;
          QuotationDetails.value.total = 0;

          calculateTaxAmount();
        }
      }
    }

    async function SetPerDayCharge() {
      await calculateSubTotal();
    }

    async function SetDays() {
      // console.log(QuotationDetails.value.items.number_of_days);
      await calculateSubTotal();
    }

    async function SetAccommodation() {
      await calculateSubTotal();
    }

    async function SetTravelling() {
      await calculateSubTotal();
    }

    async function SetTraining() {
      await calculateSubTotal();
    }

    async function SetBoarding() {
      await calculateSubTotal();
    }

    async function SetPickUp() {
      await calculateSubTotal();
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
      await calculateSubTotal();
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
      await calculateSubTotal();
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
      await calculateSubTotal();
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
      await calculateSubTotal();
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
      await calculateSubTotal();
    }

    /* --------EQUIPMENT WISE LOGIC--------*/
    const dayWiseRef = ref(false);

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
        QuotationDetails.value.items.equipment_wise[index].charge &&
        QuotationDetails.value.items.equipment_wise[index].quantity
      ) {
        let equipValue =
          Number(QuotationDetails.value.items.equipment_wise[index].charge) *
          Number(QuotationDetails.value.items.equipment_wise[index].quantity);
        QuotationDetails.value.items.equipment_wise[index].amount = Number(
          equipValue.toFixed(2)
        );
      } else {
        QuotationDetails.value.items.equipment_wise[index].amount = 0;
      }
      calculateTotalEquipment();
    }

    const calculateTaxAmount = () => {
      QuotationDetails.value.tax_amount =
        (QuotationDetails.value.tax_rate * QuotationDetails.value.sub_total) /
          100 || 0;
      QuotationDetails.value.total =
        QuotationDetails.value.tax_amount + QuotationDetails.value.sub_total ||
        0;
    };

    const calculateTotalEquipment = () => {
      QuotationDetails.value.sub_total =
        QuotationDetails.value.items.equipment_wise.reduce(
          (sum, item) => sum + item.amount,
          0
        );

      calculateTaxAmount();
    };

    const addNewRow = () => {
      if (QuotationDetails.value.items.equipment_wise.length === 0) {
        QuotationDetails.value.items.equipment_wise.push({
          id: "",
          name: "",
          charge: 0,
          quantity: 1,
          amount: 0,
        });
        calculateTotalEquipment();
      } else {
        const isEmpty = areAllPropertiesEmpty(
          QuotationDetails.value.items.equipment_wise
        );
        if (!isEmpty) {
          QuotationDetails.value.items.equipment_wise.push({
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
      // console.log(QuotationDetails.value.items.equipment_wise);
    };

    async function SetEquipment(foundItem, index) {
      if (foundItem) {
        const { id, name, charge } = foundItem;
        QuotationDetails.value.items.equipment_wise[index].id = await id;
        QuotationDetails.value.items.equipment_wise[index].name = await name;
        QuotationDetails.value.items.equipment_wise[index].charge =
          await charge;
        QuotationDetails.value.items.equipment_wise[index].quantity = 1;
        QuotationDetails.value.items.equipment_wise[index].amount = 0;
        calculateEquipmentCharge(index);
      }
    }

    async function SetEquipmentCharge(data, index) {
      QuotationDetails.value.items.equipment_wise[index].charge = await data;
      calculateEquipmentCharge(index);
    }

    async function SetQuantity(data, index) {
      QuotationDetails.value.items.equipment_wise[index].quantity = await data;
      calculateEquipmentCharge(index);
    }

    const removeObjectWithId = (arr, id) => {
      if (id !== -1) {
        arr.splice(id, 1);
      }

      return arr;
    };

    const RemoveRow = (index) => {
      QuotationDetails.value.items.equipment_wise = removeObjectWithId(
        QuotationDetails.value.items.equipment_wise,
        index
      );

      calculateTotalEquipment();
    };

    /* -------- GENERATE PDF LOGIC --------*/

    function areAllPropertiesNull(array) {
      return array.some((detail) => {
        const {
          customer_id,
          items,
          date,
          duedate,
          status,
          scope_of_work,
          terms_and_conditions,
          tax_id,
          tax_type,
          tax_amount,
          sub_total,
          total,
        } = detail;

        // Check if any property is null or empty

        return (
          customer_id === "" ||
          items.id === "" ||
          date === "" ||
          duedate === "" ||
          status === "" ||
          scope_of_work === "" ||
          terms_and_conditions === "" ||
          tax_id === "" ||
          tax_type === "" ||
          isNaN(parseFloat(tax_amount)) ||
          isNaN(parseFloat(sub_total)) ||
          isNaN(parseFloat(total))
        );
      });
    }

    const handleDayWiseChange = async (value) => {
      QuotationDetails.value.items.id = "";
      QuotationDetails.value.items = await {
        id: "",
        site_location: "",
        per_day_charge: "",
        number_of_days: "",
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
      QuotationDetails.value.sub_total = 0;
      QuotationDetails.value.total = 0;
      calculateTaxAmount();
      equipments.value = [];
      dayWiseRef.value = value;
    };

    /* --------SET DATE LOGIC--------*/
    async function setDates(e, dateType) {
      try {
        if (e != null) {
          if (e != "" && e != null) {
            QuotationDetails.value[dateType] = moment(e).format("YYYY-MM-DD");
          } else {
            QuotationDetails.value[dateType] = "";
          }
        } else {
          QuotationDetails.value[dateType] = "";
        }
      } catch (err) {
        QuotationDetails.value[dateType] = "";
      }
      console.log(QuotationDetails.value[dateType]);
    }

    const onsubmit = async () => {
      try {
        loading.value = true;

        const result = areAllPropertiesNull([QuotationDetails.value]);

        if (result) {
          showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
          loading.value = false;
          return;
        }

        if (
          dayWiseRef.value === true &&
          (QuotationDetails.value.items.id === "" ||
            QuotationDetails.value.items.per_day_charge === "")
        ) {
          showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
          loading.value = false;
          return;
        }

        const isEmpty = areAllPropertiesEmpty(
          QuotationDetails.value.items.equipment_wise
        );

        if (
          dayWiseRef.value === false &&
          (QuotationDetails.value.items.id === "" ||
            QuotationDetails.value.items.equipment_wise.length === 0)
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

        if (submitButtonRef.value) {
          // Activate indicator
          submitButtonRef.value.setAttribute("data-kt-indicator", "on");
        }

        // Call your API here
        const response = await updateQuotation(
          QuotationDetails.value,
          QuotationId
        );

        if (response?.success) {
          // Handle successful API response
          loading.value = false;
          showSuccessAlert(
            "Success",
            response.message || "Quotation Updated Successfully!"
          );

          route.push({ name: "quotation-list" });
          loading.value = false;
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
        if (submitButtonRef.value) {
          submitButtonRef.value.removeAttribute("data-kt-indicator");
        }
        loading.value = false;
      }
    };

    const deleteItem = () => {
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
          deleteQuotation(QuotationId);
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
        // console.log("Done");
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

          try {
            const result = areAllPropertiesNull([QuotationDetails.value]);

            if (result) {
              showErrorAlert(
                "Warning",
                "Please Fill the Form Fields Correctly"
              );
              loading.value = false;
              return;
            }

            if (
              dayWiseRef.value === true &&
              (QuotationDetails.value.items.id === "" ||
                QuotationDetails.value.items.per_day_charge === "")
            ) {
              showErrorAlert(
                "Warning",
                "Please Fill the Form Fields Correctly"
              );
              loading.value = false;
              return;
            }

            const isEmpty = areAllPropertiesEmpty(
              QuotationDetails.value.items.equipment_wise
            );

            if (
              dayWiseRef.value === false &&
              (QuotationDetails.value.items.id === "" ||
                QuotationDetails.value.items.equipment_wise.length === 0)
            ) {
              showErrorAlert(
                "Warning",
                "Please Fill at least one equipment correctly"
              );
              loading.value = false;
              return;
            }

            if (dayWiseRef.value === false && isEmpty) {
              showErrorAlert(
                "Warning",
                "Please Fill equipment details correctly"
              );
              loading.value = false;
              return;
            }

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
              console.log("API error:", errorData);
              // console.log("API error:", errorData.response.data.errors);
              showErrorAlert(
                "Warning",
                "Please Fill the Form Fields Correctly"
              );
              return;
            }

            // sending to
            // set to invoice
            // draf status

            // * inrc invoice count
            // const ress = await GetIncrInvoiceId(User.company_id);
            // let latestinvoice_no = ress.result.split("_");
            // latestinvoice_no =
            //   latestinvoice_no[0] +
            //   "_" +
            //   (parseInt(latestinvoice_no[1]) + 1).toString();

            // generate from backend

            QuotationDetails.value.invoice_no = "";
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
      submitButtonRef,
      Clients,
      QuotationDetails,
      Customers,
      getAssetPath,
      onsubmit,
      deleteItem,
      shortcuts,
      disabledDate,
      QuotationStatusArray,
      GetQuotationStatus,
      SendInvoice,
      Total,
      SetTax,
      SetLocation,
      TaxArray,
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
      RemoveRow,
      addNewRow,
      SetEquipment,
      SetEquipmentCharge,
      SetQuantity,
      equipments,
      dayWiseRef,
      handleDayWiseChange,
      setDates,
      isSiteSameAsBilling,
      isItemApproved,
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
