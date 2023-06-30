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
                  v-bind:tasks="Selects"
                  v-for="(task, index) in Selects"
                  :key="task.id"
                  @remove="RemoveItem(index)"
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
          <button type="reset" class="btn btn-lg btn-danger w-25">Clear</button>
          <!--end::Button-->
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <!--begin::Button-->
          <span
            :data-kt-indicator="loading ? 'on' : null"
            class="btn btn-lg btn-primary w-25"
            v-on:click="submit"
            type="submit"
          >
            <span v-if="!loading" class="indicator-label"> Submit </span>
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
import { Form as VForm } from "vee-validate";
import ApiService from "@/core/services/ApiService";
import { getCustomers, addInvoice } from "@/stores/api";
import { useAuthStore } from "@/stores/auth";
import CustomSelect from "./CustomComponents/PriceSelect.vue";
import moment from "moment";
import { useRouter } from "vue-router";

interface invoiceDetials {
  invoice_no: string;
  customer_id: string;
  items: Array<"">;
  invoice_date: string;
  invoice_duedate: string;
  notes: string;
  total: number;
  created_by: string;
  updated_by: string;
}

export default defineComponent({
  name: "company-add",
  components: {
    VForm,
    CustomSelect,
  },
  setup() {
    const auth = useAuthStore();
    const loading = ref(false);
    const Total = ref(0);
    const router = useRouter();
    const Customers = ref([{ id: "", first_name: "", last_name: "" }]);
    // number of selects with id to identify
    // {id:1,id,:2,...}
    const Selects = ref([
      {
        id: 0,
      },
      {
        id: 1,
      },
    ]);

    const invoiceDetials = ref<invoiceDetials>({
      invoice_no: "21****",
      customer_id: " ",
      items: [],
      invoice_date: "",
      invoice_duedate: "",
      notes: "",
      total: 0,
      created_by: auth.getUserId(),
      updated_by: auth.getUserId(),
    });

    // maitain index of eaah item add
    // precise
    let count = Selects.value.length;

    const addNewItem = () => {
      let data = {
        id: count,
      };
      Selects.value.push(data);
      count++;
    };

    // on add model data push to the sub-json vlaue invoiceDetials
    const invoiceDetialsAddFunc = (data) => {
      // selects id not same don't push;
      if (Selects.value.length != invoiceDetials.value.items.length) {
        invoiceDetials.value.items.push(data);
      }
      calPrice();
      console.log(invoiceDetials.value);
    };

    const RemoveItem = (index) => {
      console.log(index);
      console.log(Selects.value);
      Selects.value.splice(index, 1);
      invoiceDetials.value.items.splice(index, 1);
      calPrice();
    };

    const UpdateTotal = (data) => {
      console.log(data);
      calPrice();
    };

    const calPrice = () => {
      const prices = invoiceDetials.value.items.map((ele) =>
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
    });

    // number formating remove
    const submit = async () => {
      loading.value = true;
      console.warn("Nice");
      console.log(invoiceDetials.value);
      invoiceDetials.value.invoice_date = moment(
        invoiceDetials.value.invoice_date
      ).format("YYYY-MM-DD HH:mm:ss");
      invoiceDetials.value.invoice_duedate = moment(
        invoiceDetials.value.invoice_duedate
      ).format("YYYY-MM-DD HH:mm:ss");
      console.log(invoiceDetials.value);
      try {
        // Call your API here with the form values
        const response = await addInvoice(invoiceDetials.value);
        console.log(response.error);
        if (!response.error) {
          // Handle successful API response
          console.log("API response:", response);
          showSuccessAlert(
            "Success",
            "Company details have been successfully inserted!"
          );
        } else {
          // Handle API error response
          const errorData = response.error;
          console.log("API error:", errorData);
          // console.log("API error:", errorData.response.data.errors);
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
        invoice_date: "",
        invoice_duedate: "",
        notes: "",
        total: 0,
        created_by: auth.getUserId(),
        updated_by: auth.getUserId(),
      };
      router.push({ name: "invoices-list" });
    };

    return {
      invoiceDetials,
      Customers,
      getAssetPath,
      submit,
      loading,
      shortcuts,
      disabledDate,
      Selects,
      addNewItem,
      RemoveItem,
      UpdateTotal,
      invoiceDetialsAddFunc,
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
