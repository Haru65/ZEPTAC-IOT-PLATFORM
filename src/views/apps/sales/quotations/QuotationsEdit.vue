<template>
  <div style="width: 99%" class="p-12 rounded">
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
                  <span class="fs-2 fw-bold text-gray-800">Quotation #</span>
                  <input
                    type="text"
                    maxlength="6"
                    class="form-control form-control-flush fw-bold text-muted fs-3 w-125px"
                    v-model="invoiceDetials.quotation_no"
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
                  >
                    <el-option
                      value=" "
                      label="Please Select Customer..."
                      key=" "
                      >Please Select Customer...</el-option
                    >
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
                            `${invoiceDetials.meta.state} ${invoiceDetials.meta.country}`
                          }}
                        </span>
                        <br />
                      </div>
                      <br />
                      <a
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

      <div class="flex-lg-auto min-w-lg-500px" id="invoice">
        <!--begin::Card-->
        <div
          class="card"
          data-kt-sticky="true"
          data-kt-sticky-name="invoice"
          data-kt-sticky-offset="{default: false, lg: '100px'}"
          data-kt-sticky-top="150px"
          data-kt-sticky-animation="false"
          data-kt-sticky-zindex="95"
          data-kt-sticky-width="500px"
          data-kt-sticky-enabled="true"
        >
          <!--begin::Card body-->
          <div class="card-body p-10">
            <!--begin::Input group-->
            <div class="mb-10">
              <h2>Quotation</h2>
              <br />
              <div class="row gx-10" v-if="invoiceDetials.status != 3">
                <el-select
                  v-model="invoiceDetials.status"
                  filterable
                  :disabled="status"
                >
                  <el-option value=" " label="Please Select Status..." key=" "
                    >Please Select Status...</el-option
                  >
                  <el-option
                    v-for="item in QuotationStatusArray"
                    :key="item.id"
                    :label="`${item.name}`"
                    :value="item.id"
                  />
                </el-select>
              </div>
              <div v-else>
                <h3
                  class="text-start fs-4 text-nowrap badge badge-light-success flex-shrink-0 align-self-center py-3 px-4 fs-7"
                >
                  {{ GetQuotationStatus(invoiceDetials.status) }}
                </h3>
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
              <div v-if="invoiceDetials.status != 3">
                <h6
                  class="text-start fs-4 text-nowrap badge badge-light flex-shrink-0 align-self-center py-3 px-4 fs-7"
                >
                  {{ GetQuotationStatus(invoiceDetials.status) }}
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
              <div class="row mb-5">
                <!--begin::Col-->
                <div class="col">
                  <span
                    class="btn btn-light btn-light-primary w-100"
                    v-on:click="submit"
                    >Update</span
                  >
                </div>
                <!--end::Col-->
                <!--begin::Col-->
                <div class="col">
                  <span
                    class="btn btn-light btn-light-danger w-100"
                    v-on:click="deleteInvoice"
                    >Delete</span
                  >
                </div>
                <!--end::Col-->
              </div>
              <!--end::Row-->
              <div class="mb-0">
                <!--begin::Row-->
                <!--end::Row-->
                <span
                  v-if="invoiceDetials.status != 3"
                  v-on:click="SendInvoice"
                  type="submit"
                  href="#"
                  class="btn btn-primary w-100"
                  id="kt_invoice_submit_button"
                >
                  <i class="ki-duotone ki-triangle fs-3"
                    ><span class="path1"></span><span class="path2"></span
                    ><span class="path3"></span
                  ></i>
                  Convert to Invoice
                </span>
              </div>
              <!--end::Actions-->
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
import { defineComponent, onMounted, onBeforeMount, ref } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import ApiService from "@/core/services/ApiService";
import {
  getCustomers,
  deleteinvoice,
  getUser,
  getQuotation,
  updateQuotation,
  addInvoice,
} from "@/stores/api";
import { useAuthStore } from "@/stores/auth";
import CustomSelect from "./CustomComponents/CustomQuotationItems.vue";
import moment from "moment";
import { formatPrice } from "@/core/config/DataFormatter";
import {
  QuotationStatusArray,
  GetQuotationStatus,
} from "@/core/config/QuotationStatusConfig";
import { useRouter, useRoute } from "vue-router";

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
  state: string;
  pincode: string;
  country: string;
}

interface invoiceDetials {
  quotation_no: string;
  invoice_no: string;
  customer_id: string;
  items: Array<itemsArr>;
  date: string;
  duedate: string;
  status: number;
  notes: string;
  total: number;
  meta: Meta;
  is_active: number;
  created_by: string;
  updated_by: string;
}

export default defineComponent({
  name: "company-edit",
  components: {
    CustomSelect,
  },
  setup() {
    const auth = useAuthStore();
    const loading = ref(false);
    const Total = ref(0);
    const status = ref(false);
    const route = useRoute();
    const router = useRouter();

    const quotationid = route.params.id;

    const Customers = ref([{ id: "", first_name: "", last_name: "" }]);

    const invoiceDetials = ref<invoiceDetials>({
      quotation_no: "21****",
      customer_id: " ",
      invoice_no: "",
      items: [],
      date: "",
      duedate: "",
      status: 0,
      notes: "",
      meta: {
        company_name: "",
        first_name: "",
        last_name: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
      },
      total: 0,
      is_active: 1,
      created_by: auth.getUserId(),
      updated_by: auth.getUserId(),
    });

    const GetUserData = async (id) => {
      const response = await getUser(id);
      console.log(response);
      invoiceDetials.value.meta = response.meta;
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

    const addNewItem = () => {
      // selects id not same don't push;
      invoiceDetials.value.items.push({
        id: "",
        name: "",
        price: "",
        description: "",
      });
    };

    const RemoveItem = (index) => {
      console.log(index);
      removeObjectWithId(invoiceDetials.value.items, index);
      calPrice();
    };

    const removeObjectWithId = (arr, id) => {
      const objWithIdIndex = arr.findIndex((obj) => obj.id === id);

      if (objWithIdIndex > -1) {
        arr.splice(objWithIdIndex, 1);
      }

      return arr;
    };

    const UpdateTotal = (data) => {
      console.log(data);
      calPrice();
    };

    const calPrice = () => {
      const prices = invoiceDetials.value.items.map((ele: any) =>
        Number(ele.price.substring(1))
      );
      invoiceDetials.value.total = prices.reduce((acc, curr) => acc + curr);
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

    onBeforeMount(() => {
      QuotationStatusArray.splice(2, 1);
    });

    onMounted(async () => {
      Customers.value.pop();

      await GetCustomers();

      const response = await getQuotation(quotationid);
      console.log(response);

      // check if dropdown set no
      if (response.status == 3) {
        status.value = true;
      }

      invoiceDetials.value = {
        quotation_no: response.quotation_no,
        invoice_no: "",
        customer_id: response.customer_id,
        items: JSON.parse(response.items),
        date: response.date,
        duedate: response.duedate,
        status: response.status,
        notes: response.notes,
        total: response.total,
        meta: {
          company_name: "",
          first_name: "",
          last_name: "",
          address1: "",
          address2: "",
          city: "",
          state: "",
          pincode: "",
          country: "",
        },
        is_active: response.is_active,
        created_by: auth.getUserId(),
        updated_by: auth.getUserId(),
      };

      const respons = await getUser(response.customer_id);
      invoiceDetials.value.meta = respons.meta;
    });

    // number formating remove
    const submit = async () => {
      loading.value = true;
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
        const response = await updateQuotation(
          invoiceDetials.value,
          quotationid
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
        loading.value = false;
      }
    };

    // number formating remove
    const SendInvoice = async () => {
      loading.value = true;
      console.warn("Nice");
      // console.log(invoiceDetials.value);
      let invoice_no = invoiceDetials.value.quotation_no;
      invoiceDetials.value.invoice_no = invoice_no;

      // invoiceDetials.value.quotation_no = quotationid.toString();
      invoiceDetials.value.date = moment(invoiceDetials.value.date).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      invoiceDetials.value.duedate = moment(
        invoiceDetials.value.duedate
      ).format("YYYY-MM-DD HH:mm:ss");
      // console.log(invoiceDetials.value);
      try {
        // update the invoice
        // converted to invoice
        invoiceDetials.value.status = 3;
        const res = await updateQuotation(invoiceDetials.value, quotationid);
        // Call your API here with the form values
        if (res.error) {
          // Handle successful API response
          const errorData = res.error;
          // console.log("API error:", errorData);
          console.log("API error:", errorData.response.data.errors);
          showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
        }

        // sending to
        // set to invoice
        // draf status
        invoiceDetials.value.quotation_no = quotationid.toString();
        invoiceDetials.value.status = 1;
        const response = await addInvoice(invoiceDetials.value);
        // console.log(response.error);
        if (!response.error) {
          // Handle successful API response
          // console.log("API response:", response);
          showSuccessAlert(
            "Success",
            "Quotation Successfully Converted  to Invoice"
          );
        } else {
          // Handle API error response
          const errorData = response.error;
          // console.log("API error:", errorData);
          console.log("API error:", errorData.response.data.errors);
          showErrorAlert("Warning", "Invoice Already Exist For this Quotation");
        }
      } catch (error) {
        // Handle any other errors during API call
        console.error("API call error:", error);
        showErrorAlert("Error", "An error occurred during the API call.");
      } finally {
        loading.value = false;
        router.push({ name: "quotation-list" });
      }
    };

    const deleteInvoice = () => {
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
          deleteinvoice(quotationid);
          router.push({ name: "invoices-list" });
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
      }).then(() => {});
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
      invoiceDetials,
      Customers,
      getAssetPath,
      submit,
      loading,
      shortcuts,
      disabledDate,
      RemoveItem,
      GetUserData,
      UpdateTotal,
      addNewItem,
      QuotationStatusArray,
      invoiceDetialsAddFunc,
      GetQuotationStatus,
      deleteInvoice,
      SendInvoice,
      Total,
      status,
    };
  },
});
</script>

<style>
.el-input__inner {
  font-weight: 500;
}

.el-input__wrapper {
  height: 3.1rem;
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
