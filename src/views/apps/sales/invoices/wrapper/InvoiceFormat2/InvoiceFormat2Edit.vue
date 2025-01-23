<template>
  <div style="width: 99%" class="bg-body p-12 rounded">
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Form-->
        <VForm
          id="kt_account_profile_details_form"
          @submit="onsubmit"
          class="form"
          novalidate
        >
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
                        type="date"
                        name="date"
                        id="date"
                        v-model="InvoiceDetails.date"
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
                        v-model="InvoiceDetails.duedate"
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
                  <div>{{ InvoiceDetails.customer.company_name }}</div>
                  <div class="mt-2 pt-4">
                    <h6 class="mt-5">Billing Address:</h6>
                    <div class="mt-2">
                      <div class="mb-1">
                        <br />
                        <span v-show="InvoiceDetails.customer.company_name">
                          {{ `${InvoiceDetails.customer.company_name || ""}` }}
                        </span>
                        <br />
                        <span>
                          {{ `${InvoiceDetails.customer.name}` }}
                        </span>
                        <!-- v-if company_data present -->
                        <div v-show="InvoiceDetails.customer.company_name">
                          <br />
                          <span>
                            {{ `${InvoiceDetails.customer.address1 || ""}` }}
                          </span>
                          <br />
                          <span>
                            {{ `${InvoiceDetails.customer.address2 || ""}` }}
                          </span>
                        </div>
                        <div v-show="InvoiceDetails.customer.country">
                          <span>
                            {{
                              `${InvoiceDetails.customer.city || ""} - ${
                                InvoiceDetails.customer.pincode || ""
                              }`
                            }}
                          </span>
                          <br />
                          <span>
                            {{
                              `${InvoiceDetails.customer.state || ""} ${
                                InvoiceDetails.customer.country || ""
                              }`
                            }}
                          </span>
                          <br />
                        </div>
                        <br />
                        <!-- firstname as a flag -->
                        <a
                          v-show="InvoiceDetails.customer.name"
                          target="blank"
                          v-bind:href="`/leads/edit/${InvoiceDetails.customer_id}`"
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
                  <div>{{ InvoiceDetails.client.company_name }}</div>
                  <div class="mt-2 pt-4">
                    <h6 class="mt-5">Site Address:</h6>
                    <div class="mt-2">
                      <div class="mb-1" v-show="InvoiceDetails.client">
                        <br />
                        <span v-show="InvoiceDetails.client.company_name">
                          {{ `${InvoiceDetails.client.company_name || ""}` }}
                        </span>
                        <br />
                        <span>
                          {{ `${InvoiceDetails.client.name || ""}` }}
                        </span>
                        <!-- v-if company_data present -->
                        <div v-show="InvoiceDetails.client.company_name">
                          <br />
                          <span>
                            {{ `${InvoiceDetails.client.address1 || ""}` }}
                          </span>
                          <br />
                          <span>
                            {{ `${InvoiceDetails.client.address2 || ""}` }}
                          </span>
                        </div>
                        <div v-show="InvoiceDetails.client.country">
                          <span>
                            {{
                              `${InvoiceDetails.client.city || ""} - ${
                                InvoiceDetails.client.pincode || ""
                              }`
                            }}
                          </span>
                          <br />
                          <span>
                            {{
                              `${InvoiceDetails.client.state || ""} ${
                                InvoiceDetails.client.country || ""
                              }`
                            }}
                          </span>
                          <br />
                        </div>
                        <br />
                        <!-- firstname as a flag -->
                        <a
                          v-show="
                            InvoiceDetails.client.id &&
                            InvoiceDetails.client.name &&
                            !isSiteSameAsBilling
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
                      v-for="(item, index) in InvoiceDetails.items"
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
                          v-tooltip
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
                  v-model="InvoiceDetails.tax_id"
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
                    :key="tax.tax_id"
                    :label="`${tax.tax_type} ${tax.tax_rate} %`"
                    :value="tax.tax_id"
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
                      <p>
                        <span
                          class="badge badge-light-primary flex-shrink-0 align-self-center py-3 px-4 fs-6"
                          >Sub Total : {{ InvoiceDetails.sub_total }}
                        </span>
                      </p>
                      <p>
                        <span
                          class="badge badge-light-primary flex-shrink-0 align-self-center py-3 px-4 fs-6"
                          >Tax Rate :
                          {{
                            InvoiceDetails.tax_type == "(CGST + SGST)"
                              ? `CGST ${InvoiceDetails.tax_rate / 2} % + SGST ${
                                  InvoiceDetails.tax_rate / 2
                                } %`
                              : `${InvoiceDetails.tax_rate} %`
                          }}
                        </span>
                      </p>
                      <p>
                        <span
                          class="badge badge-light-primary flex-shrink-0 align-self-center py-3 px-4 fs-6"
                          >Tax amount : {{ InvoiceDetails.tax_amount }}
                        </span>
                      </p>
                    </div>
                    <div class="total">
                      <div class="d-flex flex-lg-row justify-content-between">
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
  getInvoice,
  updateInvoice,
  deleteInvoice,
  getCompanyTaxes,
} from "@/stores/api";
import { useAuthStore } from "@/stores/auth";
import moment from "moment";
import { useRouter, useRoute } from "vue-router";
import { formatPrice } from "@/core/config/DataFormatter";
import { Gen } from "@/core/config/PdfGenerator";
import {
  InvoiceStatusArray,
  GetInvoiceStatus,
} from "@/core/config/InvoiceStatusConfig";

import { uomOptions } from "@/core/model/invoices";

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

interface InvoiceDetails {
  invoice_no: string;
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
  enquiry_no: string;
  date: string;
  duedate: string;
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
  is_active: number;
  company_id: string;
  created_by: string;
  updated_by: string;
}
interface TaxInterface {
  tax_id: string;
  tax_type: string;
  tax_description: string;
  tax_rate: number;
  tax_amount: number;
}
export default defineComponent({
  name: "invoice-format-2-edit",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  setup() {
    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const auth = useAuthStore();
    const Total = ref(0);
    const route = useRouter();
    const router = useRoute();
    const User = auth.GetUser();
    const InvoiceId = router.params.id;
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

    const TaxArray = ref<TaxInterface[]>([]);

    const getTaxDropDown = async () => {
      try {
        ApiService.setHeader();
        const response = await getCompanyTaxes(`fetchAll=true`);

        if (response.success) {
          if (response.result != null && response.result) {
            TaxArray.value.push(
              ...response.result?.map(({ id, ...rest }) => ({
                tax_id: id.toString(),
                ...rest,
              }))
            );
          }
        } else {
          console.error(
            `Error Occured in getCompanyTaxes : ${
              response.message || "Error Occured in API"
            }`
          );
        }
      } catch (err) {
        console.error(`Error Occured in getCompanyTaxes : ${err}`);
      }
    };

    const InvoiceDetails = ref<InvoiceDetails>({
      invoice_no: "",
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
      enquiry_no: "",
      date: "",
      duedate: "",
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

      sub_total: 0,
      tax_id: "",
      tax_type: "",
      tax_description: "",
      tax_rate: 0,
      tax_amount: 0,

      total: 0,
      day_or_equipment: "1",
      is_active: 1,
      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
    });

    const isItemApproved = ref(false);
    const isSiteSameAsBilling = ref(false);

    onMounted(async () => {
      // clear all the dropdowns
      Customers.value.pop();
      Clients.value.pop();

      await getTaxDropDown();

      try {
        // get the invoice details
        const response = await getInvoice(InvoiceId);

        if (response.success) {
          const items = JSON.parse(response.result.items);
          InvoiceDetails.value.status = response.result.status;

          InvoiceDetails.value.invoice_no = response.result.invoice_no;
          InvoiceDetails.value.customer_id = response.result.customer_id;
          InvoiceDetails.value.client_id = response.result.client_id;
          InvoiceDetails.value.date = response.result.date;
          InvoiceDetails.value.duedate = response.result.duedate;
          InvoiceDetails.value.items = await items;
          InvoiceDetails.value.company_id = response.result.company_id;

          InvoiceDetails.value.customer = { ...response.result.customer };
          InvoiceDetails.value.client = { ...response.result.client };
          InvoiceDetails.value.enquiry_no = response.result.enquiry_no;

          InvoiceDetails.value.tax_id = response.result.tax_id
            ? response.result.tax_id.toString()
            : "";
          InvoiceDetails.value.tax_type = response.result.tax_type
            ? response.result.tax_type
            : "";
          InvoiceDetails.value.tax_description = response.result.tax_description
            ? response.result.tax_description
            : "";
          InvoiceDetails.value.tax_rate = response.result.tax_rate
            ? response.result.tax_rate
            : 0;
          InvoiceDetails.value.tax_amount = response.result.tax_amount
            ? response.result.tax_amount
            : 0;
          InvoiceDetails.value.sub_total = parseFloat(
            response.result.sub_total
          );

          InvoiceDetails.value.total = parseFloat(response.result.total);
          InvoiceDetails.value.scope_of_work = response.result.scope_of_work;
          InvoiceDetails.value.terms_and_conditions =
            response.result.terms_and_conditions;
          InvoiceDetails.value.created_by = response.result.created_by;
          InvoiceDetails.value.updated_by = User.id;

          // check approved or not
          isItemApproved.value =
            response.result.status === 3 || response.result.status === 4
              ? true
              : false;

          // check service want for itself
          isSiteSameAsBilling.value =
            response.result.client_id == null || response.result.client_id == ""
              ? true
              : false;
        } else {
          console.error(
            `Error Occured in getInvoice : ${
              response.message || "Error Occured in API"
            }`
          );
        }
      } catch (err) {
        console.error(`Error Occured in getInvoice : ${err}`);
      }
    });

    /* HANDLE TAX SELECTION LOGIC */
    async function SetTax(id) {
      const foundTax = await TaxArray.value?.find((item) => {
        return item.tax_id == id;
      });
      // console.log(foundTax);

      if (foundTax) {
        const { tax_id, tax_type, tax_description, tax_rate, tax_amount } =
          foundTax;

        InvoiceDetails.value.tax_id = tax_id;
        InvoiceDetails.value.tax_type = tax_type;
        InvoiceDetails.value.tax_description = tax_description;
        InvoiceDetails.value.tax_rate = tax_rate;
        InvoiceDetails.value.tax_amount = tax_amount;

        calculateSubTotal();
      }
    }

    async function setUnitPrice(event, index) {
      if (event.target != null) {
        InvoiceDetails.value.items[index].price = await event.target.value;
        await calculateSubTotal();
      } else {
        InvoiceDetails.value.items[index].price = 0;
      }
    }

    async function setQuantity(event, index) {
      if (event.target != null) {
        InvoiceDetails.value.items[index].quantity = await event.target.value;
        await calculateSubTotal();
      } else {
        InvoiceDetails.value.items[index].quantity = 0;
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
      InvoiceDetails.value.items.forEach((item) => {
        // Calculate amount for the item
        item.amount = Number(item.price || 0) * Number(item.quantity || 0);

        // Add the item's amount to the subtotal
        subTotal += item.amount;
      });

      // Update subtotal in InvoiceDetails
      InvoiceDetails.value.sub_total = subTotal;

      // Calculate tax and total
      calculateTaxAmount();
    };

    const calculateTaxAmount = () => {
      // Calculate tax amount based on tax rate and subtotal
      InvoiceDetails.value.tax_amount =
        (InvoiceDetails.value.tax_rate * InvoiceDetails.value.sub_total) /
          100 || 0;

      // Calculate total by adding tax to subtotal
      InvoiceDetails.value.total =
        InvoiceDetails.value.tax_amount + InvoiceDetails.value.sub_total || 0;
    };

    const addNewRow = () => {
      if (InvoiceDetails.value.items?.length < 1) {
        InvoiceDetails.value.items.push({
          item: "",
          uom: "",
          price: 0,
          quantity: 1,
          amount: 0,
        });
        calculateSubTotal();
      } else {
        const isEmpty = areAllPropertiesEmpty(InvoiceDetails.value.items);
        if (!isEmpty) {
          InvoiceDetails.value.items.push({
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
      // console.log(InvoiceDetails.value.items.equipment_wise);
    };

    const removeObjectWithId = (arr, id) => {
      if (id !== -1) {
        arr.splice(id, 1);
      }

      return arr;
    };

    const RemoveRow = (index) => {
      InvoiceDetails.value.items = removeObjectWithId(
        InvoiceDetails.value.items,
        index
      );

      calculateSubTotal();
    };

    /* -------- GENERATE PDF LOGIC --------*/

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

    /* --------SET DATE LOGIC--------*/
    async function setDates(e, dateType) {
      try {
        if (e != null) {
          if (e != "" && e != null) {
            InvoiceDetails.value[dateType] = moment(e).format("YYYY-MM-DD");
          } else {
            InvoiceDetails.value[dateType] = "";
          }
        } else {
          InvoiceDetails.value[dateType] = "";
        }
      } catch (err) {
        InvoiceDetails.value[dateType] = "";
      }
      console.log(InvoiceDetails.value[dateType]);
    }

    // number formating remove
    const onsubmit = async () => {
      try {
        loading.value = true;
        const result = areAllPropertiesNull([InvoiceDetails.value]);

        if (result) {
          showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
          loading.value = false;
          return;
        }

        const isEmpty = areAllPropertiesEmpty(InvoiceDetails.value.items);

        if (InvoiceDetails.value.items?.length < 1) {
          showErrorAlert("Warning", "Please add at least one item correctly");
          loading.value = false;
          return;
        }

        if (isEmpty) {
          showErrorAlert("Warning", "Please Fill items details correctly");
          loading.value = false;
          return;
        }

        if (submitButtonRef.value) {
          // Activate indicator
          submitButtonRef.value.setAttribute("data-kt-indicator", "on");
        }

        // Call your API here
        const response = await updateInvoice(InvoiceDetails.value, InvoiceId);

        if (response?.success) {
          // Handle successful API response
          loading.value = false;
          showSuccessAlert(
            "Success",
            response.message || "Invoice Updated Successfully!"
          );

          route.push({ name: "invoices-list" });
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
          deleteInvoice(InvoiceId);
          route.push({ name: "invoices-list" });
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

    const disabledDate = (time: Date) => {
      return null;
    };

    return {
      submitButtonRef,
      Clients,
      InvoiceDetails,
      Customers,
      getAssetPath,
      onsubmit,
      deleteItem,
      shortcuts,
      disabledDate,
      InvoiceStatusArray,
      GetInvoiceStatus,
      Total,
      SetTax,
      TaxArray,
      loading,
      RemoveRow,
      addNewRow,
      setQuantity,
      setUnitPrice,
      setDates,
      isSiteSameAsBilling,
      isItemApproved,
      uomOptions,
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
  