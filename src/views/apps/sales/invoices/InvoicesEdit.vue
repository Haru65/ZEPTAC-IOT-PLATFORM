<template>
  <div style="width: 99%" class="bg-body p-12 rounded">
    <!--begin::Modal dialog-->
    <div class="card-body p-12">
      <!--begin::Form-->
      <form id="kt_invoice_form" novalidate>
        <!--begin::Wrapper-->
        <div class="d-flex flex-column align-Selects-start flex-xxl-row">
          <!--begin::Input group-->
          <div
            class="d-flex align-Selects-center flex-equal fw-row me-4 order-2 p-2"
            data-bs-toggle="tooltip"
            data-bs-trigger="hover"
            data-bs-original-title="Specify invoice date"
            data-kt-initialized="1"
          >
            <!--begin::Date-->
            <div class="fs-6 fw-bold text-gray-700 text-nowrap m-2">Date:</div>
            <!--end::Date-->

            <div class="block">
              <el-date-picker
                v-model="invoiceDetials.invoice_date"
                type="date"
                placeholder="Pick a day"
                :shortcuts="shortcuts"
                :disabled-date="disabledDate"
              />
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
            <div class="fs-2 fw-bold text-gray-700 text-nowrap m-2">
              Invoice #
            </div>
            <input
              type="text"
              v-model="invoiceDetials.invoice_no"
              class="form-control form-control-flush fw-bold text-muted fs-3 w-125px"
              placehoder="..."
            />
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div
            class="d-flex align-Selects-center justify-content-end flex-equal order-3 fw-row"
            data-bs-toggle="tooltip"
            data-bs-trigger="hover"
            data-bs-original-title="Specify invoice due date"
            data-kt-initialized="1"
          >
            <!--begin::Date-->
            <div class="fs-6 fw-bold text-gray-700 text-nowrap m-2">
              Due Date:
            </div>
            <!--end::Date-->

            <div class="block">
              <el-date-picker
                v-model="invoiceDetials.invoice_duedate"
                type="date"
                placeholder="Pick a day"
                :shortcuts="shortcuts"
                :disabled-date="disabledDate"
              />
            </div>

            <!--end::Input-->
          </div>
          <!--end::Input-->
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
            <el-select v-model="invoiceDetials.customer_id" filterable>
              <el-option value=" " label="Please Select Customer..." key=" "
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
                  <th></th>

                  <th colspan="2" class="fs-4 ps-0">Total</th>
                  <th colspan="2" class="text-end fs-4 text-nowrap">
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
            <label class="form-label fs-6 fw-bold text-gray-700">Notes</label>

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
        <div class="modal-footer flex-center">
          <!--begin::Button-->
          <span
            v-on:click="deleteInvoice()"
            class="btn btn-lg btn-danger w-25"
            >Discard</span
          >
          <!--end::Button-->
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <!--begin::Button-->
          <span
            :data-kt-indicator="loading ? 'on' : null"
            class="btn btn-lg btn-primary w-25"
            v-on:click="submit"
            type="submit"
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
      </form>
      <!--end::Form-->
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
  updateInvoice,
  getInvoice,
  deleteinvoice,
} from "@/stores/api";
import { useAuthStore } from "@/stores/auth";
import CustomSelect from "./CustomComponents/PriceSelect.vue";
import moment from "moment";
import { useRoute } from "vue-router";
import { formatPrice } from "@/core/config/DataFormatter";

interface itemsArr {
  id: string;
  pric: string;
  desc: string;
  name: string;
}

interface invoiceDetials {
  invoice_no: string;
  customer_id: string;
  items: Array<itemsArr>;
  invoice_date: string;
  invoice_duedate: string;
  notes: string;
  total: number;
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
    const loading = ref(false);
    const Total = ref(0);
    const router = useRoute();

    const invoiceId = router.params.id;

    const Customers = ref([{ id: "", first_name: "", last_name: "" }]);

    const invoiceDetials = ref<invoiceDetials>({
      invoice_no: "21****",
      customer_id: " ",
      items: [],
      invoice_date: "",
      invoice_duedate: "",
      notes: "",
      total: 0,
      is_active: 1,
      created_by: auth.getUserId(),
      updated_by: auth.getUserId(),
    });

    const addNewItem = () => {
      // selects id not same don't push;
      invoiceDetials.value.items.push({ id: "", name: "", pric: "", desc: "" });
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

    onMounted(async () => {
      Customers.value.pop();
      await GetCustomers();

      const response = await getInvoice(invoiceId);
      console.log(response);
      invoiceDetials.value = {
        invoice_no: response.invoice_no,
        customer_id: response.customer_id,
        items: JSON.parse(response.items),
        invoice_date: response.invoice_date,
        invoice_duedate: response.invoice_duedate,
        notes: response.notes,
        total: response.total,
        is_active: response.is_active,
        created_by: auth.getUserId(),
        updated_by: auth.getUserId(),
      };
    });

    // number formating remove
    const submit = async () => {
      loading.value = true;
      console.warn("Nice");
      // console.log(invoiceDetials.value);
      invoiceDetials.value.invoice_date = moment(
        invoiceDetials.value.invoice_date
      ).format("YYYY-MM-DD HH:mm:ss");
      invoiceDetials.value.invoice_duedate = moment(
        invoiceDetials.value.invoice_duedate
      ).format("YYYY-MM-DD HH:mm:ss");
      // console.log(invoiceDetials.value);
      try {
        // Call your API here with the form values
        const response = await updateInvoice(invoiceDetials.value, invoiceId);
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

    const deleteInvoice = () => {
      Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this imaginary file!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "red",
        confirmButtonText: "Yes, I am sure!",
      }).then((result: { [x: string]: any }) => {
        if (result["isConfirmed"]) {
          // Put your function here
          deleteinvoice(invoiceId);
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
      UpdateTotal,
      addNewItem,
      invoiceDetialsAddFunc,
      deleteInvoice,
      Total,
      invoiceId,
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
