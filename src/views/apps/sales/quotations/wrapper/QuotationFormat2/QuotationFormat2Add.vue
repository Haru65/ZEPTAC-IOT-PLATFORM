<template>
  <div style="width: 99%" class="bg-body p-12 rounded">
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Form-->
        <VForm class="form" novalidate @submit="onsubmit">
          <!--begin::Card body-->
          <div class="card-body border-top p-sd-2 p-lg-9">
            <!--begin::Input group-->

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
                      <!--begin::Input-->
                      <el-date-picker
                        type="date"
                        name="date"
                        id="date"
                        v-model="QuotationDetails.date"
                        @change="setDates($event, 'date')"
                        :shortcuts="shortcuts"
                        placeholder="Pick a day"
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
                        :shortcuts="shortcuts"
                        placeholder="Pick a day"
                        :editable="false"
                      />
                    </div>
                  </span>
                  <!--end::Info-->
                </label>
              </div>
            </div>

            <!--begin::Input group-->
            <div class="d-flex flex-stack">
              <!--begin::Label-->
              <div class="me-5">
                <label class="fw-semobold text-gray-700 fs-5 form-label"
                  >Want this service for you? Then kindly check it.</label
                >
                <div class="fw-semobold fs-5 text-gray-700">
                  <i class="text-gray-700"
                    >( site address same as billing address )</i
                  >
                </div>
              </div>
              <!--end::Label-->

              <!--begin::Switch-->
              <label
                class="form-check form-switch form-check-custom form-check-solid"
              >
                <input
                  class="form-check-input min-w-50px"
                  type="checkbox"
                  :value="false"
                  name="siteSameAsBilling"
                  id="siteSameAsBilling"
                  v-on:change="ToggleClient"
                  v-model="siteSameAsBilling"
                />
              </label>
              <!--end::Switch-->
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
                        :label="`${item.company_name} (${item.name})`"
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
                        <span v-show="QuotationDetails.customer.company_name">
                          {{ `${QuotationDetails.customer.company_name}` }}
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
                        :key="item.id"
                        :label="`${item.company_name} (${item.name})`"
                        :value="item.id"
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
                          {{ `${QuotationDetails.client.name}` }}
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
                            !siteSameAsBilling
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
              <div class="table-responsive">
                <table class="table table-rounded border gy-4 gs-7 text-nowrap">
                  <thead>
                    <tr
                      class="fw-semibold fs-6 text-gray-800 border-bottom border-gray-200 text-align-center"
                    >
                      <th class="col-4">Item</th>
                      <th class="col-3">UOM</th>
                      <th class="col-3">Unit Price</th>
                      <th class="col-3">Qty</th>
                      <th class="col-3">Amount</th>
                      <th class="col-1">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index) in QuotationDetails.items"
                      :key="index"
                    >
                      <td class="min-w-300px">
                        <Field
                          type="text"
                          as="textarea"
                          row="2"
                          v-model="item.item"
                          :name="'item' + index"
                          placeholder="Enter the item..."
                          class="form-control"
                        />
                      </td>

                      <td class="min-w-200px">
                        <select
                          :name="'uom' + index"
                          v-model="item.uom"
                          class="form-control"
                        >
                          <option value="">Select UOM</option>
                          <option
                            v-for="uom in uomOptions"
                            :key="uom.id"
                            :value="uom.id"
                            :label="uom.label"
                          >
                            {{ uom.label }}
                          </option>
                        </select>
                      </td>

                      <td class="min-w-100px">
                        <input
                          type="text"
                          :name="'price' + index"
                          v-model="item.price"
                          @keyup="setUnitPrice($event, index)"
                          placeholder="₹ 0.00"
                          class="form-control"
                        />
                      </td>
                      <td class="min-w-100px">
                        <input
                          type="text"
                          :name="'quantity' + index"
                          v-model="item.quantity"
                          @keyup="setQuantity($event, index)"
                          placeholder="Enter quantity"
                          class="form-control"
                        />
                      </td>
                      <td class="min-w-200px">
                        <input
                          type="text"
                          :name="'amount' + index"
                          disabled
                          v-model="item.amount"
                          placeholder="Amount is ₹ 0.00"
                          class="form-control"
                        />
                      </td>
                      <td>
                        <span
                          @click="RemoveRow(index)"
                          data-toggle="tooltip"
                          title="Delete Equipment"
                          class="border border-danger rounded-circle badge m-3 py-3 px-4 bg-light-danger fs-7 badge-light-danger text-danger text-hover-dark cursor-pointer"
                          >x
                        </span>
                      </td>
                    </tr>
                  </tbody>
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
                                class="btn btn-primary btn-sm"
                                @click="addNewRow"
                              >
                                <KTIcon icon-name="plus" icon-class="fs-2" />
                                Add
                              </span>
                            </div>
                            <div></div>
                          </div>
                        </div>
                      </th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

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
                <div class="card bg-light-info mb-3 p-6">
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
            <button
              type="submit"
              ref="submitButtonRef"
              class="btn btn-primary w-lg-50"
              id="kt_Quotation_submit_button"
            >
              <span class="indicator-label">
                <i class="ki-duotone ki-triangle fs-3"
                  ><span class="path1"></span><span class="path2"></span
                  ><span class="path3"></span
                ></i>
                Add Quotation
              </span>
              <span class="indicator-progress">
                Please wait...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </button>
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
  addQuotation,
  getClient,
  GetLeadClients,
  getLeadNCustomer,
  getCustomer,
} from "@/stores/api";
import { useAuthStore } from "@/stores/auth";
import moment from "moment";
import { useRouter } from "vue-router";
import { formatPrice } from "@/core/config/DataFormatter";
import {
  QuotationStatusArray,
  GetQuotationStatus,
  TaxArray,
} from "@/core/config/QuotationStatusConfig";

import { uomOptions } from "@/core/model/quotation";


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
  customer_id: string;
  client_id: string;
  items: [
    {
      item: string;
      uom: string;
      price: number;
      quantity: number;
      amount: number;
    }
  ];
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
  is_active: number;
  company_id: string;
  created_by: string;
  updated_by: string;
}

export default defineComponent({
  name: "quotation-format-2",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  setup() {
    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const auth = useAuthStore();
    const disabledselect = ref(true);
    const clientSelect = ref(true);
    const Total = ref(0);
    const route = useRouter();
    const User = auth.GetUser();
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

    const siteSameAsBilling = ref(false);

    const QuotationDetails = ref<QuotationDetails>({
      quotation_no: "",
      customer_id: "",
      client_id: "",
      items: [
        {
          item: "",
          uom: "",
          price: 0,
          quantity: 1,
          amount: 0,
        },
      ],
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

      sub_total: 0,
      tax_id: "",
      tax_type: "",
      tax_description: "",
      tax_rate: 0,
      tax_amount: 0,

      total: 0,
      is_active: 1,
      day_or_equipment: "1",
      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
    });

    const ToggleClient = () => {
      // if site address is same as billing address
      if (siteSameAsBilling.value) {
        siteSameAsBilling.value = true;
        clientSelect.value = true;
        if (QuotationDetails.value.customer_id) {
          QuotationDetails.value.client = QuotationDetails.value.customer;
          QuotationDetails.value.client_id = "";
          QuotationDetails.value.client.id = "";
        } else {
          QuotationDetails.value.client = {
            id: "",
            company_name: "",
            name: "",
            address1: "",
            address2: "",
            city: "",
            state: "",
            pincode: "",
            country: "",
          };
          QuotationDetails.value.customer = {
            id: "",
            company_name: "",
            name: "",
            address1: "",
            address2: "",
            city: "",
            state: "",
            pincode: "",
            country: "",
          };
          QuotationDetails.value.client_id = "";
        }
      } else {
        // if site address is not as billing address
        siteSameAsBilling.value = false;
        clientSelect.value = true;

        QuotationDetails.value.customer_id = "";
        QuotationDetails.value.customer = {
          id: "",
          company_name: "",
          name: "",
          address1: "",
          address2: "",
          city: "",
          state: "",
          pincode: "",
          country: "",
        };

        QuotationDetails.value.client_id = "";
        QuotationDetails.value.client = {
          id: "",
          company_name: "",
          name: "",
          address1: "",
          address2: "",
          city: "",
          state: "",
          pincode: "",
          country: "",
        };
      }
    };

    onMounted(async () => {
      Customers.value.pop();
      Clients.value.pop();
      await GetLeads();
    });

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

        calculateSubTotal();
      }
    }

    async function setUnitPrice(event, index) {
      if (event.target != null) {
        QuotationDetails.value.items[index].price = await event.target.value;
        await calculateSubTotal();
      } else {
        QuotationDetails.value.items[index].price = 0;
      }
    }

    async function setQuantity(event, index) {
      if (event.target != null) {
        QuotationDetails.value.items[index].quantity = await event.target.value;
        await calculateSubTotal();
      } else {
        QuotationDetails.value.items[index].quantity = 0;
      }
    }

    function areAllPropertiesEmpty(array) {
      return array.some((detail) => {
        const { item, uom, price, quantity, amount } = detail;

        // Check if any property is null or empty

        return (
          item === "" ||
          uom === "" ||
          isNaN(parseFloat(price)) ||
          isNaN(parseFloat(quantity)) ||
          isNaN(parseFloat(amount))
        );
      });
    }

    const calculateSubTotal = async () => {
      let subTotal = 0; // Initialize subtotal

      // Loop through each item and calculate amount for each row
      QuotationDetails.value.items.forEach((item) => {
        // Calculate amount for the item
        item.amount = Number(item.price || 0) * Number(item.quantity || 0);

        // Add the item's amount to the subtotal
        subTotal += item.amount;
      });

      // Update subtotal in QuotationDetails
      QuotationDetails.value.sub_total = subTotal;

      // Calculate tax and total
      calculateTaxAmount();
    };

    const calculateTaxAmount = () => {
      // Calculate tax amount based on tax rate and subtotal
      QuotationDetails.value.tax_amount =
        (QuotationDetails.value.tax_rate * QuotationDetails.value.sub_total) /
          100 || 0;

      // Calculate total by adding tax to subtotal
      QuotationDetails.value.total =
        QuotationDetails.value.tax_amount + QuotationDetails.value.sub_total ||
        0;
    };

    const addNewRow = () => {
      if (QuotationDetails.value.items?.length < 1) {
        QuotationDetails.value.items.push({
          item: "",
          uom: "",
          price: 0,
          quantity: 1,
          amount: 0,
        });
        calculateSubTotal();
      } else {
        const isEmpty = areAllPropertiesEmpty(QuotationDetails.value.items);
        if (!isEmpty) {
          QuotationDetails.value.items.push({
            item: "",
            uom: "",
            price: 0,
            quantity: 1,
            amount: 0,
          });
          calculateSubTotal();
        } else {
          Swal.fire({
            icon: "info",
            title: "Please fill all the details correctly",
          });
        }
      }
      // console.log(QuotationDetails.value.items.equipment_wise);
    };

    const removeObjectWithId = (arr, id) => {
      if (id !== -1) {
        arr.splice(id, 1);
      }

      return arr;
    };

    const RemoveRow = (index) => {
      QuotationDetails.value.items = removeObjectWithId(
        QuotationDetails.value.items,
        index
      );

      calculateSubTotal();
    };

    /* --------CUSTOMER-CLIENT LOGIC--------*/

    const GetClients = async (id: string) => {
      // ? empty clients
      // console.log(Clients.value);
      Clients.value.length = 0;

      // * empty clents data
      QuotationDetails.value.client.id = "";
      QuotationDetails.value.client.company_name = "";
      QuotationDetails.value.client.name = "";
      QuotationDetails.value.client.address1 = "";
      QuotationDetails.value.client.address2 = "";
      QuotationDetails.value.client.city = "";
      QuotationDetails.value.client.pincode = "";
      QuotationDetails.value.client.state = "";
      QuotationDetails.value.client.country = "";

      try {
        ApiService.setHeader();
        const response = await GetLeadClients(id);

        if (response.success) {
          if (response.result != null && response.result) {
            Clients.value.push(
              ...response.result?.map(({ ...rest }) => ({
                ...rest,
              }))
            );
          }
        } else {
          console.error(
            `Error Occured in GetLeadClients : ${
              response.message || "Error Occured in API"
            }`
          );
        }
      } catch (err) {
        console.error(`Error Occured in GetLeadClients : ${err}`);
      }
    };

    const GetUserData = async (id) => {
      if (id != "") {
        const customer_id = id;

        try {
          const response = await getCustomer(customer_id);

          if (response.success) {
            QuotationDetails.value.customer = { ...response.result };
            QuotationDetails.value.customer_id = response.result.id;
            QuotationDetails.value.customer.id = response.result.id;
            QuotationDetails.value.enquiry_no = response.result.enquiry_no;
          } else {
            console.error(
              `Error Occured in getCustomer : ${
                response.message || "Error Occured in API"
              }`
            );
          }
        } catch (err) {
          console.error(`Error Occured in getCustomer : ${err}`);
        }

        if (siteSameAsBilling.value) {
          ToggleClient();
        } else {
          clientSelect.value = false;
          await GetClients(customer_id);
        }
      } else {
        QuotationDetails.value.enquiry_no = "";
        QuotationDetails.value.customer = {
          id: "",
          company_name: "",
          name: "",
          address1: "",
          address2: "",
          city: "",
          state: "",
          pincode: "",
          country: "",
        };
      }
    };

    const GetClientData = async (id) => {
      if (id != "") {
        const customer_id = id;

        try {
          const response = await getClient(customer_id);

          if (response.success) {
            QuotationDetails.value.client_id = response.result.id;
            QuotationDetails.value.client.id = response.result.id;
            QuotationDetails.value.client.name = response.result.name;
            QuotationDetails.value.client.company_name =
              response.result.company_name;
            QuotationDetails.value.client.address1 = response.result.address1;
            QuotationDetails.value.client.address2 = response.result.address2;
            QuotationDetails.value.client.city = response.result.city;
            QuotationDetails.value.client.pincode = response.result.pincode;
            QuotationDetails.value.client.state = response.result.state;
            QuotationDetails.value.client.country = response.result.country;
          } else {
            console.error(
              `Error Occured in getClient : ${
                response.message || "Error Occured in API"
              }`
            );
          }
        } catch (err) {
          console.error(`Error Occured in getClient : ${err}`);
        }

        disabledselect.value = false;
      } else {
        QuotationDetails.value.customer = {
          id: "",
          company_name: "",
          name: "",
          address1: "",
          address2: "",
          city: "",
          state: "",
          pincode: "",
          country: "",
        };
      }
      // console.log(QuotationDetails.value);
    };

    const GetLeads = async () => {
      const companyId = User.company_id;

      try {
        ApiService.setHeader();
        const response = await getLeadNCustomer(companyId);

        if (response.success) {
          if (response.result != null && response.result) {
            Customers.value.push(
              ...response.result?.map(({ ...rest }) => ({
                ...rest,
              }))
            );
          }
        } else {
          console.error(
            `Error Occured in getLeadNCustomer : ${
              response.message || "Error Occured in API"
            }`
          );
        }
      } catch (err) {
        console.error(`Error Occured in getLeadNCustomer : ${err}`);
      }
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

    function areAllPropertiesNull(array) {
      return array.some((detail) => {
        const {
          customer_id,
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

    const onsubmit = async () => {
      try {
        loading.value = true;

        const result = areAllPropertiesNull([QuotationDetails.value]);

        if (result) {
          showErrorAlert("Warning", "Please fill all the details correctly.");
          loading.value = false;
          return;
        }

        const isEmpty = areAllPropertiesEmpty(QuotationDetails.value.items);

        if (QuotationDetails.value.items?.length < 1) {
          showErrorAlert("Warning", "Please add at least one item correctly");
          loading.value = false;
          return;
        }

        if (isEmpty) {
          showErrorAlert("Warning", "Please Fill items details correctly");
          loading.value = false;
          return;
        }

        if (siteSameAsBilling.value == false) {
          if (
            QuotationDetails.value.client_id == "" ||
            QuotationDetails.value.client_id == null
          ) {
            showErrorAlert("Warning", "Please Fill form fields correctly");
            loading.value = false;
            return;
          }
        }

        if (submitButtonRef.value) {
          // Activate indicator
          submitButtonRef.value.setAttribute("data-kt-indicator", "on");
        }

        // Call your API here
        const response = await addQuotation(QuotationDetails.value);

        if (response?.success) {
          // Handle successful API response
          loading.value = false;
          showSuccessAlert(
            "Success",
            response.message || "Quotation Added Successfully!"
          );

          loading.value = false;
          route.push({ name: "quotation-list" });
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
        quotation_no: "",
        customer_id: "",
        client_id: "",
        items: [
          {
            item: "",
            uom: "",
            price: 0,
            quantity: 1,
            amount: 1,
          },
        ],
        enquiry_no: "",
        date: "",
        duedate: "",
        status: "",
        scope_of_work: "",
        terms_and_conditions: "",

        sub_total: 0,
        tax_id: "",
        tax_type: "",
        tax_description: "",
        tax_rate: 0,
        tax_amount: 0,

        total: 0,
        day_or_equipment: "1",
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
        is_active: 1,
        created_by: User.id,
        updated_by: User.id,
        company_id: User.company_id,
      };
    };

    return {
      submitButtonRef,
      Clients,
      QuotationDetails,
      Customers,
      getAssetPath,
      onsubmit,
      disabledselect,
      clientSelect,
      shortcuts,
      disabledDate,
      GetUserData,
      GetClientData,
      QuotationStatusArray,
      GetQuotationStatus,
      Total,
      SetTax,
      TaxArray,
      loading,
      siteSameAsBilling,
      ToggleClient,
      RemoveRow,
      addNewRow,
      setQuantity,
      setUnitPrice,
      setDates,
      uomOptions
    };
  },
});
</script>