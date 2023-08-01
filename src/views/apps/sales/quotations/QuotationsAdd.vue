<template>
  <div style="width: 99%" class="sm:p-4 md:p-8 lg:p-12 rounded">
    <!--begin::Modal dialog-->
    <div class="d-flex flex-column flex-lg-row">
      <div class="flex-xl-row-fluid mb-10 mb-lg-0 me-lg-7 me-xl-10">
        <div class="card w-20">
          <div class="card-body sm:p-2 lg:p-12">
            <!--begin::Form-->
            <form id="kt_Quotation_form" novalidate>
              <!--begin::Wrapper-->
              <div
                class="d-flex gap-5 flex-column align-items-start flex-xxl-row"
              >
                <!--begin::Input group-->
                <div
                  class="d-flex align-items-center flex-equal fw-row me-4 order-2"
                  data-bs-toggle="tooltip"
                  data-bs-trigger="hover"
                  data-bs-original-title="Specify Quotation date"
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
                        v-model="QuotationDetials.date"
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
                  data-bs-original-title="Enter Quotation number"
                  data-kt-initialized="1"
                >
                  <span class="fs-2 fw-bold text-gray-800">Quotation #</span>
                  <input
                    type="text"
                    class="form-control form-control-flush fw-bold text-muted fs-3 w-auto"
                    v-model="QuotationDetials.quotation_no"
                    placehoder="..."
                    disabled="true"
                  />
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div
                  class="d-flex align-items-center justify-content-end flex-equal order-3 fw-row"
                  data-bs-toggle="tooltip"
                  data-bs-trigger="hover"
                  data-bs-original-title="Specify Quotation due date"
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
                        v-model="QuotationDetials.duedate"
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
                <div class="d-flex flex-grow-1 gap-lg-3 gap-sm-5 gap-5">
                  <!--begin::Row-->
                  <div class="w-50">
                    <div class="py-3">
                      <h6 class="fs-6">Customer :</h6>
                    </div>
                    <div id="customer " class="row gx-10">
                      <el-select
                        v-model="QuotationDetials.customer_id"
                        placeholder="Please Select Customer"
                        filterable
                        v-on:change="GetUserData(QuotationDetials.customer_id)"
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
                        <div class="mb-1" v-show="QuotationDetials.customer">
                          <br />
                          <span>
                            {{
                              `${QuotationDetials.customer.first_name} ${QuotationDetials.customer.last_name}`
                            }}
                          </span>
                          <br />
                          <span v-show="QuotationDetials.customer.company_name">
                            {{ `${QuotationDetials.customer.company_name}` }}
                          </span>
                          <!-- v-if company_data present -->
                          <div v-show="QuotationDetials.customer.company_name">
                            <br />
                            <span>
                              {{ `${QuotationDetials.customer.address1}` }}
                            </span>
                            <br />
                            <span>
                              {{ `${QuotationDetials.customer.address2}` }}
                            </span>
                          </div>
                          <div v-show="QuotationDetials.customer.country">
                            <span>
                              {{
                                `${QuotationDetials.customer.city} - ${QuotationDetials.customer.pincode}`
                              }}
                            </span>
                            <br />
                            <span>
                              {{
                                `${QuotationDetials.customer.states} ${QuotationDetials.customer.country}`
                              }}
                            </span>
                            <br />
                          </div>
                          <br />
                          <!-- firstname as a flag -->
                          <a
                            v-show="QuotationDetials.customer.first_name"
                            target="blank"
                            v-bind:href="`/customers/edit/${QuotationDetials.customer_id}`"
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
                        v-model="QuotationDetials.client.id"
                        filterable
                        :disabled="clientSelect"
                        v-on:change="GetClientData(QuotationDetials.client.id)"
                        aria-label="Please Select Client..."
                      >
                        <!-- <el-option
                      value=" "
                      label="Please Select Customer..."
                      key=" "
                      >Please Select Customer...</el-option
                      > -->
                        <el-option
                          v-for="item in Clients"
                          :key="item.client_data.id"
                          :label="`${item.client_data.first_name} ${item.client_data.last_name}`"
                          :value="item.client_data.id"
                        />
                      </el-select>
                    </div>
                    <!--end::Row-->

                    <div class="mt-2 pt-4">
                      <h6 class="fw-bold mt-5">Billing Address:</h6>
                      <div class="mt-2">
                        <div class="mb-1" v-show="QuotationDetials.client">
                          <br />
                          <span>
                            {{
                              `${QuotationDetials.client.first_name} ${QuotationDetials.client.last_name}`
                            }}
                          </span>
                          <br />
                          <span v-show="QuotationDetials.client.company_name">
                            {{ `${QuotationDetials.client.company_name}` }}
                          </span>
                          <!-- v-if company_data present -->
                          <div v-show="QuotationDetials.client.company_name">
                            <br />
                            <span>
                              {{ `${QuotationDetials.client.address1}` }}
                            </span>
                            <br />
                            <span>
                              {{ `${QuotationDetials.client.address2}` }}
                            </span>
                          </div>
                          <div v-show="QuotationDetials.client.country">
                            <span>
                              {{
                                `${QuotationDetials.client.city} - ${QuotationDetials.client.pincode}`
                              }}
                            </span>
                            <br />
                            <span>
                              {{
                                `${QuotationDetials.client.states} ${QuotationDetials.client.country}`
                              }}
                            </span>
                            <br />
                          </div>
                          <br />
                          <!-- firstname as a flag -->
                          <a
                            v-show="QuotationDetials.client.first_name"
                            target="blank"
                            v-bind:href="`/clients/edit/${QuotationDetials.customer_id}`"
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
                        <th class="min-w-300px w-475px">Item Price</th>
                        <th class="min-w-75px w-75px text-end">Action</th>
                      </tr>
                    </thead>
                    <!--end::Table head-->

                    <!--begin::Table body-->
                    <tbody>
                      <CustomSelect
                        v-bind:tasks="QuotationDetials.items"
                        v-on:removeitem="RemoveItem($event)"
                        v-on:getval="QuotationDetialsAddFunc($event)"
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
                            QuotationDetials.total.toFixed(2)
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
                    v-model="QuotationDetials.notes"
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
          data-kt-sticky-name="Quotation"
          data-kt-sticky-offset="{default: false, lg: '100px'}"
          data-kt-sticky-top="150px"
          data-kt-sticky-animation="false"
          data-kt-sticky-zindex="95"
          data-kt-sticky-width="300px"
          data-kt-sticky-min-height="400px"
          data-kt-sticky-enabled="true"
        >
          <!--begin::Card body-->
          <div class="card-body">
            <!--begin::Input group-->
            <div class="mb-10">
              <h2>Quotation</h2>
              <br />
              <div class="row gx-10">
                <el-select
                  v-model="QuotationDetials.status"
                  filterable
                  :disabled="disabledselect"
                  placeholder="Please Select Status..."
                >
                  <!-- <el-option value=" " label="Please Select Status..." key=" "
                    >Please Select Status...</el-option
                  > -->
                  <el-option
                    v-for="item in QuotationStatusArray"
                    :key="item.id"
                    :label="`${item.name}`"
                    :value="item.id"
                  />
                </el-select>
              </div>
              <br />
              <div class="items">
                <p v-for="item in QuotationDetials.items" :key="item.id">
                  <span
                    v-if="item.id != ''"
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
                  {{ GetQuotationStatus(parseInt(QuotationDetials.status)) }}
                </h6>
              </div>
              <div>
                <h3 class="text-end fs-4 text-nowrap">Total</h3>
                <h3 class="text-end fs-4 text-nowrap">
                  ₹<span data-kt-element="grand-total">{{
                    QuotationDetials.total.toFixed(2)
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
                id="kt_Quotation_submit_button"
              >
                <i class="ki-duotone ki-triangle fs-3"
                  ><span class="path1"></span><span class="path2"></span
                  ><span class="path3"></span
                ></i>
                Add Quotation
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
import {
  getCustomers,
  addQuotation,
  getUser,
  getClient,
  GetCustomerClients,
  GetIncrQuotationId,
} from "@/stores/api";
import { useAuthStore } from "@/stores/auth";
import CustomSelect from "./CustomComponents/CustomQuotationItems.vue";
import moment from "moment";
import { useRouter } from "vue-router";
import { formatPrice } from "@/core/config/DataFormatter";
import {
  QuotationStatusArray,
  GetQuotationStatus,
} from "@/core/config/QuotationStatusConfig";

interface itemsArr {
  id: string;
  price: string;
  description: string;
  name: string;
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

interface QuotationDetials {
  quotation_no: string;
  customer_id: string;
  items: Array<itemsArr>;
  date: string;
  duedate: string;
  status: string;
  notes: string;
  total: number;
  customer: Meta;
  client: Meta;
  is_active: number;
  company_id: string;
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
    const clientSelect = ref(true);
    const Total = ref(0);
    const route = useRouter();
    const User = auth.GetUser();
    const Customers = ref([{ id: "", first_name: "", last_name: "" }]);
    const Clients = ref([
      { id: "", client_data: { id: "", first_name: "", last_name: "" } },
    ]);
    const QuotationDetials = ref<QuotationDetials>({
      quotation_no: "21****",
      customer_id: " ",
      items: [],
      date: "",
      duedate: "",
      status: "",
      notes: "",
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
      total: 0,
      is_active: 1,
      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
    });

    onMounted(async () => {
      // todo: quotation check if pres get last incr 1
      const res = await GetIncrQuotationId(User.company_id);
      IncrQuotation(res);
      // * basic fetch
      Customers.value.pop();
      Clients.value.pop();
      await GetCustomers();
    });

    const IncrQuotation = (data: any) => {
      console.log(data.result);
      const latestquotation_no = data.result.split("_");
      if (parseInt(latestquotation_no[1]) == 0) {
        // ? if no record
        QuotationDetials.value.quotation_no =
          latestquotation_no[0] + "_" + latestquotation_no[1].toString();
      } else {
        // ? if record exisit inc 1
        QuotationDetials.value.quotation_no =
          latestquotation_no[0] + "_" + (1 + +latestquotation_no[1]).toString();
      }
    };

    const GetClients = async (id: string) => {
      // ? empty clients
      console.log(Clients.value);
      Clients.value.length = 0;

      // * empty clents data
      QuotationDetials.value.client.id = "";
      QuotationDetials.value.client.company_name = "";
      QuotationDetials.value.client.address1 = "";
      QuotationDetials.value.client.address2 = "";
      QuotationDetials.value.client.city = "";
      QuotationDetials.value.client.pincode = "";
      QuotationDetials.value.client.states = "";
      QuotationDetials.value.client.country = "";
      QuotationDetials.value.client.first_name = "";
      QuotationDetials.value.client.last_name = "";

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
        QuotationDetials.value.customer = response.meta;
        QuotationDetials.value.customer.id = response.id;
        clientSelect.value = false;
        /* *
         TODO : get customer_id and from meta get client ids get customer_id and from meta get client ids and put into Ref object
         ? Problem of getting clients;
        */
        GetClients(customer_id);
      } else {
        QuotationDetials.value.customer = {
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
        QuotationDetials.value.client.address1 = response.meta.address1;
        QuotationDetials.value.client.company_name = response.meta.company_name;
        QuotationDetials.value.client.address2 = response.meta.address2;
        QuotationDetials.value.client.city = response.meta.city;
        QuotationDetials.value.client.pincode = response.meta.pincode;
        QuotationDetials.value.client.states = response.meta.states;
        QuotationDetials.value.client.country = response.meta.country;
        QuotationDetials.value.client.first_name = response.first_name;
        QuotationDetials.value.client.last_name = response.last_name;
        disabledselect.value = false;
        /* *
         TODO : get customer_id and from meta get client ids get customer_id and from meta get client ids and put into Ref object
         ? Problem of getting clients;
        */
      } else {
        QuotationDetials.value.customer = {
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
      console.log(QuotationDetials.value);
    };

    const addNewItem = () => {
      QuotationDetials.value.items.push({
        id: "",
        name: "",
        price: "",
        description: "",
      });
    };
    // on add model data push to the sub-json vlaue QuotationDetials
    const QuotationDetialsAddFunc = (data) => {
      // selects id not same don't push;
      // console.log(QuotationDetials.value);
      // console.log(data);
      // console.log(QuotationDetials.value);
      QuotationDetials.value.items.forEach((ele) => {
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
      removeObjectWithId(QuotationDetials.value.items, index);
      calPrice();
    };

    const UpdateTotal = (data) => {
      console.log(data);
      removeNulls();
      calPrice();
    };

    const calPrice = () => {
      const prices = QuotationDetials.value.items.map((ele: any) =>
        Number(ele.price.replaceAll(",", "").substring(1))
      );
      QuotationDetials.value.total =
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

    const removeNulls = () => {
      QuotationDetials.value.items = QuotationDetials.value.items.filter(
        (ele: any) => ele.id !== ""
      );
    };

    // number formating remove
    const submit = async () => {
      disabledselect.value = true;
      removeNulls();
      console.log(QuotationDetials.value);
      QuotationDetials.value.date = moment(QuotationDetials.value.date).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      QuotationDetials.value.duedate = moment(
        QuotationDetials.value.duedate
      ).format("YYYY-MM-DD HH:mm:ss");
      // console.log(QuotationDetials.value);
      try {
        // Call your API here with the form values
        const response = await addQuotation(QuotationDetials.value);
        // console.log(response.error);
        if (!response.error) {
          // Handle successful API response
          // console.log("API response:", response);
          showSuccessAlert(
            "Success",
            "Company details have been successfully inserted!"
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
      QuotationDetials.value = {
        quotation_no: "******",
        customer_id: " ",
        items: [],
        date: "",
        duedate: "",
        status: "",
        notes: "",
        total: 0,
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
        is_active: 1,
        created_by: User.id,
        updated_by: User.id,
        company_id: User.company_id,
      };
      route.push({ name: "quotation-list" });
    };

    return {
      Clients,
      QuotationDetials,
      Customers,
      getAssetPath,
      submit,
      disabledselect,
      clientSelect,
      shortcuts,
      disabledDate,
      RemoveItem,
      GetUserData,
      GetClientData,
      UpdateTotal,
      addNewItem,
      QuotationStatusArray,
      QuotationDetialsAddFunc,
      GetQuotationStatus,
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
