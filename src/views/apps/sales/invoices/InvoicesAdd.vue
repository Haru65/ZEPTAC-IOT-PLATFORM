<template>
  <div style="width: 99%" class="bg-body p-12 rounded">
    <!--begin::Modal dialog-->
    <div class="card-body p-12">
      <!--begin::Form-->
      <VForm id="kt_invoice_form" novalidate>
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
                v-model="date"
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
              class="form-control form-control-flush fw-bold text-muted fs-3 w-125px"
              value="2021***"
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
                v-model="duedate"
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
            <el-select v-model="itemDetails.user" filterable>
              <el-option value="0" label="Please Select Customer..." key="0"
                >Please Select Customer...</el-option
              >
              <el-option
                v-for="item in Customers"
                :key="item.id"
                :label="item.first_name"
                :value="item.first_name"
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
                  v-on:getval="itemDetailsAddFunc($event)"
                />
              </tbody>
              <!--end::Table body-->

              <!--begin::Table foot-->
              <tfoot>
                <tr
                  class="border-top border-top-dashed align-top fs-6 fw-bold text-gray-700"
                >
                  <th class="text-primary">
                    <span
                      class="btn btn-primary p-2 px-4"
                      @click="addNewItem()"
                    >
                      Add item
                    </span>
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
              placeholder="Thanks for your business"
            ></textarea>
          </div>
          <!--end::Notes-->
        </div>
        <!--end::Wrapper-->
      </VForm>
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
import { getCustomers } from "@/stores/api";
import CustomSelect from "./CustomComponents/PriceSelect.vue";
import moment from "moment";

interface itemDetails {
  user: string;
  desc: string;
  pric: string;
  items: Array<"">;
}

export default defineComponent({
  name: "company-add",
  components: {
    VForm,
    CustomSelect,
  },
  setup() {
    const loading = ref(false);
    const Total = ref(0);
    const duedate = ref("");
    const date = ref("");
    const Customers = ref([{ id: "", first_name: "", last_name: "" }]);
    // number of selects with id to identify
    const Selects = ref([
      {
        id: 0,
      },
    ]);

    const itemDetails = ref<itemDetails>({
      user: "",
      items: [],
      desc: "",
      pric: "",
    });

    // maitain index of eaah item add
    // precise
    let count = 1;
    const addNewItem = () => {
      let data = {
        id: count,
      };
      Selects.value.push(data);
      count++;
    };

    // on add model data push to the sub-json vlaue itemDetails
    const itemDetailsAddFunc = (data) => {
      // selects id not same don't push;
      if (Selects.value.length != itemDetails.value.items.length) {
        itemDetails.value.items.push(data);
      }
      console.log(itemDetails.value);
    };

    const RemoveItem = (index) => {
      console.log(index);
      console.log(Selects.value);
      Selects.value.splice(index, 1);
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
      try {
        // Call your API here with the form values
        const response = { error: 1 };
        console.log(response.error);
        if (!response.error) {
          // Handle successful API response
          console.log("API response:", response);
          showSuccessAlert(
            "Success",
            "Company details have been successfully inserted!"
          );

          clear();
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
      itemDetails,
      Customers,
      getAssetPath,
      submit,
      loading,
      date,
      duedate,
      shortcuts,
      disabledDate,
      Selects,
      addNewItem,
      RemoveItem,
      itemDetailsAddFunc,
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
