<template>
  <div style="width: 99%" class="sm:p-4 md:p-8 lg:p-12 rounded">
    <!--begin::Modal dialog-->
    <div class="d-flex flex-column flex-lg-row">
      <div class="flex-lg-row-fluid mb-10 mb-lg-0 me-lg-7 me-xl-10">
        <div class="card">
          <div class="card-body p-12">
            <!--begin::Form-->
            <form id="kt_invoice_form" novalidate>
              <!--begin::Wrapper-->
              <div
                class="d-flex gap-5 flex-column align-items-start flex-xxl-row"
              >
                <!--begin::Input group-->
                <div
                  class="d-flex align-items-center flex-equal fw-row me-4 order-2"
                  data-bs-toggle="tooltip"
                  data-bs-trigger="hover"
                  data-bs-original-title="Specify invoice date"
                  data-kt-initialized="1"
                >
                  <!--begin::Date-->
                  <div class="m-2 fs-6 fw-bold text-gray-700 text-nowrap">
                    Date:
                  </div>
                  <!--end::Date-->
                  &nbsp;&nbsp;
                  <!--begin::Input-->
                  <div
                    class="position-relative d-flex align-items-center w-150px"
                  >
                    <!--begin::Datepicker-->
                    <div class="block">
                      <el-date-picker
                        v-model="invoiceDetials.date"
                        type="date"
                        placeholder="Pick a day"
                        :shortcuts="shortcuts"
                        :disabled-date="disabledDate"
                      />
                    </div>
                    <!--end::Datepicker-->
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div
                  class="d-flex flex-center flex-equal fw-row text-nowrap order-1 order-xxl-2 me-4"
                  data-bs-toggle="tooltip"
                  data-bs-trigger="hover"
                  data-bs-original-title="Enter invoice number"
                  data-kt-initialized="1"
                >
                  <span class="fs-2 fw-bold text-gray-800">Invoice #</span>
                  <input
                    type="text"
                    class="form-control form-control-flush fw-bold text-muted fs-3 w-125px"
                    v-model="invoiceDetials.invoice_no"
                    maxlength="6"
                    placehoder="..."
                  />
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div
                  class="d-flex align-items-center justify-content-end flex-equal order-3 fw-row"
                  data-bs-toggle="tooltip"
                  data-bs-trigger="hover"
                  data-bs-original-title="Specify invoice due date"
                  data-kt-initialized="1"
                >
                  <!--begin::Date-->
                  <div class="fs-6 fw-bold text-gray-700 text-nowrap">
                    Due Date:
                  </div>
                  <!--end::Date-->
                  &nbsp; &nbsp;
                  <!--begin::Input-->
                  <div
                    class="position-relative d-flex align-items-center w-150px"
                  >
                    <!--begin::Datepicker-->
                    <div class="block">
                      <el-date-picker
                        v-model="invoiceDetials.duedate"
                        type="date"
                        placeholder="Pick a day"
                        :shortcuts="shortcuts"
                        :disabled-date="disabledDate"
                      />
                    </div>
                    <!--end::Datepicker-->
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->
              </div>
              <!--end::Input group-->
              <!--end::Top-->

              <!--begin::Separator-->
              <div class="separator separator-dashed my-10"></div>
              <!--end::Separator-->

              <!--begin::Wrapper-->
              <div class="mb-0">
                <!--begin::Row-->
                <div class="row gx-10">
                  <el-select
                    v-model="invoiceDetials.customer_id"
                    filterable
                    v-on:change="GetUserData(invoiceDetials.customer_id)"
                    placeholder="Please Select Customer..."
                  >
                    <!-- <el-option
                      value=" "
                      label="Please Select Customer..."
                      key=" "
                      >Please Select Customer...</el-option
                    > -->
                    <el-option
                      v-for="item in Customers"
                      :key="item.id"
                      :label="`${item.first_name} ${item.last_name}`"
                      :value="item.id"
                    />
                  </el-select>
                </div>
                <!--end::Row-->

                <div class="mt-2 pt-4">
                  <h6 class="fw-bold mt-5">Billing Address:</h6>
                  <div class="mt-2">
                    <div class="mb-1" v-show="invoiceDetials.meta">
                      <br />
                      <span>
                        {{
                          `${invoiceDetials.meta.first_name} ${invoiceDetials.meta.last_name}`
                        }}
                      </span>
                      <br />
                      <span v-show="invoiceDetials.meta.company_name">
                        {{ `${invoiceDetials.meta.company_name}` }}
                      </span>
                      <!-- v-if company_data present -->
                      <div v-show="invoiceDetials.meta.company_name">
                        <br />
                        <span>
                          {{ `${invoiceDetials.meta.address1}` }}
                        </span>
                        <br />
                        <span>
                          {{ `${invoiceDetials.meta.address2}` }}
                        </span>
                      </div>
                      <div v-show="invoiceDetials.meta.city">
                        <span>
                          {{
                            `${invoiceDetials.meta.city} - ${invoiceDetials.meta.pincode}`
                          }}
                        </span>
                        <br />
                        <span>
                          {{
                            `${invoiceDetials.meta.states} ${invoiceDetials.meta.country}`
                          }}
                        </span>
                        <br />
                      </div>
                      <br />
                      <!-- firstname as a flag -->
                      <a
                        v-show="invoiceDetials.meta.first_name"
                        target="blank"
                        v-bind:href="`/users/edit/${invoiceDetials.customer_id}`"
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

                <!--begin::Table wrapper-->
                <div class="table-responsive mb-10">
                  <!--begin::Table-->
                  <table
                    class="table g-5 gs-0 mb-0 fw-bold text-gray-700"
                    data-kt-element="Selects"
                  >
                    <!--begin::Table head-->
                    <thead>
                      <tr
                        class="border-bottom fs-7 fw-bold text-gray-700 text-uppercase"
                      >
                        <th class="min-w-300px w-475px">Item</th>
                        <th class="min-w-75px w-75px text-end">Action</th>
                      </tr>
                    </thead>
                    <!--end::Table head-->

                    <!--begin::Table body-->
                    <tbody>
                      <CustomSelect
                        v-bind:tasks="invoiceDetials.items"
                        v-on:removeitem="RemoveItem($event)"
                        v-on:getval="invoiceDetialsAddFunc($event)"
                        v-on:UpdateTotal="UpdateTotal($event)"
                      />
                    </tbody>
                    <!--end::Table body-->

                    <!--begin::Table foot-->
                    <tfoot>
                      <tr
                        class="border-top border-top-dashed align-top fs-6 fw-bold text-gray-700"
                      >
                        <th class="text-primary">
                          <span class="btn btn-primary" @click="addNewItem()">
                            <KTIcon icon-name="plus" icon-class="fs-2" />
                            Add item
                          </span>
                        </th>
                      </tr>
                      <tr class="align-top fw-bold text-gray-700">
                        <th colspan="1" class="fs-4 ps-0">Total</th>
                        <th colspan="1" class="text-end fs-4 text-nowrap">
                          ₹<span data-kt-element="grand-total">{{
                            invoiceDetials.total.toFixed(2)
                          }}</span>
                        </th>
                      </tr>
                    </tfoot>
                    <!--end::Table foot-->
                  </table>
                </div>
                <div class="mb-0">
                  <label class="form-label fs-6 fw-bold text-gray-700"
                    >Notes</label
                  >

                  <textarea
                    name="notes"
                    class="form-control form-control-solid"
                    rows="3"
                    v-model="invoiceDetials.notes"
                    placeholder="Thanks for your business"
                  ></textarea>
                </div>
                <!--end::Notes-->
              </div>
              <br />
              <br />
            </form>
            <!--end::Form-->
          </div>
        </div>
      </div>

      <div class="flex-lg-auto min-w-lg-300px">
        <!--begin::Card-->
        <div
          class="card"
          data-kt-sticky="true"
          data-kt-sticky-name="invoice"
          data-kt-sticky-offset="{default: false, lg: '100px'}"
          data-kt-sticky-top="150px"
          data-kt-sticky-animation="false"
          data-kt-sticky-zindex="95"
          data-kt-sticky-width="300px"
          data-kt-sticky-enabled="true"
        >
          <!--begin::Card body-->
          <div class="card-body p-10">
            <!--begin::Input group-->
            <div class="mb-10">
              <h2>Invoice</h2>
              <br />
              <div class="row gx-10">
                <el-select
                  v-model="invoiceDetials.status"
                  filterable
                  :disabled="disabledselect"
                  placeholder="Please Select Status..."
                >
                  <!-- <el-option value=" " label="Please Select Status..." key=" "
                    >Please Select Status...</el-option
                  > -->
                  <el-option
                    v-for="item in InvoiceStatusArray"
                    :key="item.id"
                    :label="`${item.name}`"
                    :value="item.id"
                  />
                </el-select>
              </div>
              <br />
              <div class="items">
                <p v-for="item in invoiceDetials.items" :key="item.id">
                  <span
                    class="badge badge-light-primary flex-shrink-0 align-self-center py-3 px-4 fs-7"
                    >+ {{ item.name }}</span
                  >
                </p>
              </div>
            </div>
            <!--end::Input group-->
            <div class="total">
              <div>
                <h6
                  class="text-start fs-4 text-nowrap badge badge-light flex-shrink-0 align-self-center py-3 px-4 fs-7"
                >
                  {{ GetInvoiceStatus(parseInt(invoiceDetials.status)) }}
                </h6>
              </div>
              <div>
                <h3 class="text-end fs-4 text-nowrap">Total</h3>
                <h3 class="text-end fs-4 text-nowrap">
                  ₹<span data-kt-element="grand-total">{{
                    invoiceDetials.total.toFixed(2)
                  }}</span>
                </h3>
              </div>
            </div>
            <!--begin::Separator-->
            <div class="separator separator-dashed mb-8"></div>
            <!--end::Separator-->

            <!--begin::Actions-->
            <div class="mb-0">
              <!--begin::Row-->
              <!--end::Row-->
              <span
                v-on:click="submit"
                type="submit"
                href="#"
                class="btn btn-primary w-100"
                id="kt_invoice_submit_button"
              >
                <i class="ki-duotone ki-triangle fs-3"
                  ><span class="path1"></span><span class="path2"></span
                  ><span class="path3"></span
                ></i>
                Add Invoice
              </span>
            </div>
            <!--end::Actions-->
          </div>
          <!--end::Card body-->
        </div>
        <!--end::Card-->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import ApiService from "@/core/services/ApiService";
import { getCustomers, addInvoice, getUser } from "@/stores/api";
import { useAuthStore } from "@/stores/auth";
import CustomSelect from "./CustomComponents/CustomInvoiceItems.vue";
import moment from "moment";
import { useRouter } from "vue-router";
import { formatPrice } from "@/core/config/DataFormatter";
import {
  InvoiceStatusArray,
  GetInvoiceStatus,
} from "@/core/config/InvoiceStatusConfig";

interface itemsArr {
  id: string;
  price: string;
  description: string;
  name: string;
}

interface Meta {
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

interface invoiceDetials {
  invoice_no: string;
  customer_id: string;
  items: Array<itemsArr>;
  date: string;
  duedate: string;
  status: string;
  notes: string;
  total: number;
  meta: Meta;
  is_active: number;
  created_by: string;
  updated_by: string;
}

export default defineComponent({
  name: "company-add",
  components: {
    CustomSelect,
  },
  setup() {
    const auth = useAuthStore();
    const disabledselect = ref(true);
    const Total = ref(0);
    const route = useRouter();

    const Customers = ref([{ id: "", first_name: "", last_name: "" }]);

    const invoiceDetials = ref<invoiceDetials>({
      invoice_no: "21****",
      customer_id: " ",
      items: [],
      date: "",
      duedate: "",
      status: "",
      notes: "",
      meta: {
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
      created_by: auth.getUserId(),
      updated_by: auth.getUserId(),
    });

    onMounted(async () => {
      Customers.value.pop();
      await GetCustomers();
    });

    const GetUserData = async (id) => {
      if (id != " ") {
        const response = await getUser(id);
        invoiceDetials.value.meta = response.meta;
        disabledselect.value = false;
      } else {
        invoiceDetials.value.meta = {
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

    const addNewItem = () => {
      invoiceDetials.value.items.push({
        id: "",
        name: "",
        price: "",
        description: "",
      });
    };
    // on add model data push to the sub-json vlaue invoiceDetials
    const invoiceDetialsAddFunc = (data) => {
      // selects id not same don't push;
      // console.log(invoiceDetials.value);
      console.log(data);
      console.log(invoiceDetials.value);
      invoiceDetials.value.items.forEach((ele) => {
        console.log(ele);
        if (ele.id == data.id) {
          ele["name"] = data.name;
          ele["desc"] = data.description;
          ele["price"] = formatPrice(data.price);
        }
      });
      calPrice();
    };

    const removeObjectWithId = (arr, id) => {
      const objWithIdIndex = arr.findIndex((obj) => obj.id === id);

      if (objWithIdIndex > -1) {
        arr.splice(objWithIdIndex, 1);
      }

      return arr;
    };

    const RemoveItem = (index) => {
      console.log(index);
      removeObjectWithId(invoiceDetials.value.items, index);
      calPrice();
    };

    const UpdateTotal = (data) => {
      console.log(data);
      calPrice();
    };

    const calPrice = () => {
      const prices = invoiceDetials.value.items.map((ele: any) =>
        Number(ele.price.replaceAll(",", "").substring(1))
      );
      invoiceDetials.value.total =
        prices.length != 0 ? prices.reduce((acc, curr) => acc + curr) : 0.0;
    };

    const GetCustomers = async () => {
      ApiService.setHeader();
      const response = await getCustomers();
      Customers.value.push(
        ...response.result.data.map(({ created_at, ...rest }) => ({
          ...rest,
          created_at: moment(created_at).format("MMMM Do YYYY"),
        }))
      );
    };

    // number formating remove
    const submit = async () => {
      disabledselect.value = true;
      console.warn("Nice");
      // console.log(invoiceDetials.value);
      invoiceDetials.value.date = moment(invoiceDetials.value.date).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      invoiceDetials.value.duedate = moment(
        invoiceDetials.value.duedate
      ).format("YYYY-MM-DD HH:mm:ss");
      // console.log(invoiceDetials.value);
      try {
        // Call your API here with the form values
        const response = await addInvoice(invoiceDetials.value);
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
      invoiceDetials.value = {
        invoice_no: "******",
        customer_id: " ",
        items: [],
        date: "",
        duedate: "",
        status: "",
        notes: "",
        total: 0,
        meta: {
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
        created_by: auth.getUserId(),
        updated_by: auth.getUserId(),
      };
      route.push({ name: "invoices-list" });
    };

    return {
      invoiceDetials,
      Customers,
      getAssetPath,
      submit,
      disabledselect,
      shortcuts,
      disabledDate,
      RemoveItem,
      GetUserData,
      UpdateTotal,
      addNewItem,
      InvoiceStatusArray,
      invoiceDetialsAddFunc,
      GetInvoiceStatus,
      Total,
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
