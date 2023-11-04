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
                      v-model="QuotationDetails.lead_id"
                      placeholder="Please Select Customer"
                      filterable
                      v-on:change="GetUserData(QuotationDetails.lead_id)"
                    >
                      <el-option
                        v-for="item in Leads"
                        :key="item.id"
                        :label="`${item.meta.company_name} (${item.first_name} ${item.last_name})`"
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
                      <div class="mb-1" v-show="QuotationDetails.lead">
                        <br />
                        <span v-show="QuotationDetails.lead.company_name">
                          {{ `${QuotationDetails.lead.company_name}` }}
                        </span>
                        <br />
                        <span>
                          {{
                            `${QuotationDetails.lead.first_name} ${QuotationDetails.lead.last_name}`
                          }}
                        </span>
                        <!-- v-if company_data present -->
                        <div v-show="QuotationDetails.lead.company_name">
                          <br />
                          <span>
                            {{ `${QuotationDetails.lead.address1}` }}
                          </span>
                          <br />
                          <span>
                            {{ `${QuotationDetails.lead.address2}` }}
                          </span>
                        </div>
                        <div v-show="QuotationDetails.lead.country">
                          <span>
                            {{
                              `${QuotationDetails.lead.city} - ${QuotationDetails.lead.pincode}`
                            }}
                          </span>
                          <br />
                          <span>
                            {{
                              `${QuotationDetails.lead.states} ${QuotationDetails.lead.country}`
                            }}
                          </span>
                          <br />
                        </div>
                        <br />
                        <!-- firstname as a flag -->
                        <a
                          v-show="QuotationDetails.lead.first_name"
                          target="blank"
                          v-bind:href="`/leads/edit/${QuotationDetails.lead_id}`"
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
                        :label="`${item.client_data.meta.company_name} (${item.client_data.first_name} ${item.client_data.last_name})`"
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
                        <span v-show="QuotationDetails.client.company_name">
                          {{ `${QuotationDetails.client.company_name}` }}
                        </span>
                        <br />
                        <span>
                          {{
                            `${QuotationDetails.client.first_name} ${QuotationDetails.client.last_name}`
                          }}
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
                          v-show="
                            !QuotationDetails.client.id &&
                            QuotationDetails.client.first_name
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
                  <div class="row mb-6">
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
                          >+ {{ QuotationDetails.items.site_location }} ({{
                            QuotationDetails.items.per_day_charge
                          }}
                          x {{ QuotationDetails.items.number_of_days }})
                        </span>
                        <span
                          v-if="QuotationDetails.items.accomm"
                          class="badge badge-light-primary flex-shrink-0 align-self-center py-3 px-4 fs-7"
                          >+ Accomodation ({{
                            QuotationDetails.items.accommodation
                          }})
                        </span>
                        <span
                          v-if="QuotationDetails.items.travel"
                          class="badge badge-light-primary flex-shrink-0 align-self-center py-3 px-4 fs-7"
                          >+ Travelling ({{
                            QuotationDetails.items.travelling
                          }})
                        </span>
                        <span
                          v-if="QuotationDetails.items.train"
                          class="badge badge-light-primary flex-shrink-0 align-self-center py-3 px-4 fs-7"
                          >+ Training ({{ QuotationDetails.items.training }})
                        </span>
                        <span
                          v-if="QuotationDetails.items.board"
                          class="badge badge-light-primary flex-shrink-0 align-self-center py-3 px-4 fs-7"
                          >+ Boarding & Lodging ({{
                            QuotationDetails.items.boarding
                          }})
                        </span>
                        <span
                          v-if="QuotationDetails.items.pick"
                          class="badge badge-light-primary flex-shrink-0 align-self-center py-3 px-4 fs-7"
                          >+ Pickup & Delivery ({{
                            QuotationDetails.items.pickup
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
              Add Quotation
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
  getLeads,
  addQuotation,
  getUser,
  getClient,
  GetLeadClients,
  GetIncrQuotationId,
  getPriceList,
} from "@/stores/api";
import { useAuthStore } from "@/stores/auth";
import moment from "moment";
import { useRouter } from "vue-router";
import { formatPrice } from "@/core/config/DataFormatter";
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
  };
  date: string;
  duedate: string;
  status: string;
  scope_of_work: string;
  terms_and_conditions: string;
  total: number;
  lead: Meta;
  client: Meta;
  is_active: number;
  company_id: string;
  created_by: string;
  updated_by: string;
}

export default defineComponent({
  name: "company-add",
  components: {},
  setup() {
    const auth = useAuthStore();
    const disabledselect = ref(true);
    const clientSelect = ref(true);
    const Total = ref(0);
    const route = useRouter();
    const User = auth.GetUser();
    const loading = ref(false);
    const Leads = ref([
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

    const siteSameAsBilling = ref(false);
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
      },
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
      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
    });

    const ToggleClient = () => {
      if (siteSameAsBilling.value) {
        siteSameAsBilling.value = true;
        clientSelect.value = true;
        if (QuotationDetails.value.lead_id) {
          QuotationDetails.value.client = QuotationDetails.value.lead;
          QuotationDetails.value.client.id = "0";
        } else {
          QuotationDetails.value.client = {
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
          QuotationDetails.value.lead = {
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

        QuotationDetails.value.lead_id = "";
        QuotationDetails.value.lead = {
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

        QuotationDetails.value.client = {
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
      const res = await GetIncrQuotationId(User.company_id);
      IncrQuotation(res);
      // * basic fetch
      Leads.value.pop();
      Clients.value.pop();
      locations.value.pop();
      await GetLeads();
      await getSelects();
    });

    /* --------NEW LOGIC--------*/

    const accommodationRef = ref(true);
    const travellingRef = ref(true);
    const trainingRef = ref(true);
    const pickupRef = ref(true);
    const boardingRef = ref(true);

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
        Number(QuotationDetails.value.items.number_of_days) *
          Number(QuotationDetails.value.items.per_day_charge) +
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
        console.log("Function runned");
      }
    }

    async function SetPerDayCharge() {
      await calculateTotal();
    }

    async function SetDays() {
      console.log(QuotationDetails.value.items.number_of_days);
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

    const IncrQuotation = (data: any) => {
      console.log(data.result);
      const latestquotation_no = data.result.split("_");
      if (parseInt(latestquotation_no[1]) == 0) {
        // ? if no record
        QuotationDetails.value.quotation_no =
          latestquotation_no[0] + "_" + latestquotation_no[1].toString();
      } else {
        // ? if record exisit inc 1
        QuotationDetails.value.quotation_no =
          latestquotation_no[0] + "_" + (1 + +latestquotation_no[1]).toString();
      }
    };

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
      const response = await GetLeadClients(id);
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
        const lead_id = id;
        const response = await getUser(lead_id);
        console.log(response);
        QuotationDetails.value.lead = response.meta;
        QuotationDetails.value.lead.id = response.id;

        if (siteSameAsBilling.value) {
          ToggleClient();
        } else {
          clientSelect.value = false;
          GetClients(lead_id);
        }
      } else {
        QuotationDetails.value.lead = {
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
        const lead_id = id;
        const response = await getClient(lead_id);
        console.log(response);
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
         TODO : get lead_id and from meta get client ids get lead_id and from meta get client ids and put into Ref object
         ? Problem of getting clients;
        */
      } else {
        QuotationDetails.value.lead = {
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
      console.log(QuotationDetails.value);
    };

    const GetLeads = async () => {
      ApiService.setHeader();
      const response = await getLeads(``);

      Leads.value.push(
        ...response.result.data.map(({ created_at, ...rest }) => ({
          ...rest,
          created_at: moment(created_at).format("MMMM Do YYYY"),
        }))
      );
    };

    function areAllPropertiesNull(array) {
      return array.some((detail) => {
        const {
          quotation_no,
          lead_id,
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
          quotation_no === "" ||
          lead_id === "" ||
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

    // number formating remove
    const submit = async (e) => {
      e.preventDefault();

      // console.log(QuotationDetails.value);
      try {
        const result = areAllPropertiesNull([QuotationDetails.value]);

        if (result) {
          showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
          loading.value = false;
          return;
        }

        if (QuotationDetails.value.date && QuotationDetails.value.duedate) {
          QuotationDetails.value.date = moment(
            QuotationDetails.value.date
          ).format("YYYY-MM-DD HH:mm:ss");
          QuotationDetails.value.duedate = moment(
            QuotationDetails.value.duedate
          ).format("YYYY-MM-DD HH:mm:ss");
        } else {
          showErrorAlert(
            "Warning",
            "Dates cannot be empty, please fill all the required details"
          );
        }

        // Call your API here with the form values
        const response = await addQuotation(QuotationDetails.value);
        // console.log(response.error);
        if (!response.error) {
          // Handle successful API response
          // console.log("API response:", response);
          showSuccessAlert(
            "Success",
            "Quotation have been successfully inserted!"
          );
          route.push({ name: "quotation-list" });
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
      QuotationDetails.value = {
        quotation_no: "******",
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
        },
        date: "",
        duedate: "",
        status: "",
        scope_of_work: "",
        terms_and_conditions: "",
        total: 0,
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
      route.push({ name: "quotation-list" });
    };

    return {
      Clients,
      QuotationDetails,
      Leads,
      getAssetPath,
      submit,
      disabledselect,
      clientSelect,
      shortcuts,
      disabledDate,
      GetUserData,
      GetClientData,
      QuotationStatusArray,
      GetQuotationStatus,
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