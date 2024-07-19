<template>
  <!--begin::Layout-->
  <div class="d-flex flex-column flex-lg-row">
    <!--begin::Content-->
    <div class="flex-lg-row-fluid me-lg-15 order-1 order-lg-1 mb-10 mb-lg-0">
      <!--begin::Card-->
      <div class="card card-flush pt-3 mb-5 mb-xl-10">
        <!--begin::Card body-->
        <div class="card-body pt-3">
          <!--begin::Section-->
          <div class="mb-10">
            <!--begin::Title-->
            <h5 class="mb-4">RGP Details:</h5>
            <!--end::Title-->

            <!--begin::Details-->
            <div class="d-flex flex-wrap py-5">
              <!--begin::Row-->
              <div class="flex-equal me-5">
                <!--begin::Details-->
                <table class="table fs-6 fw-semobold gs-0 gy-2 gx-2 m-0">
                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400 min-w-175px w-175px">RGP No:</td>
                    <td class="text-gray-800 min-w-200px">
                      {{ itemDetails?.rgp.rgp_no || "" }}
                    </td>
                  </tr>
                  <!--end::Row-->

                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400">Quotation No:</td>
                    <td class="text-gray-800">
                      {{ itemDetails?.rgp.quotation.quotation_no || "" }}
                    </td>
                  </tr>
                  <!--end::Row-->

                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400">Engineer Name:</td>
                    <td class="text-gray-800">
                      {{ itemDetails?.engineer.first_name || "" }}
                      {{ itemDetails?.engineer.last_name || "" }}
                    </td>
                  </tr>
                  <!--end::Row-->
                </table>
                <!--end::Details-->
              </div>
              <!--end::Row-->

              <!--begin::Row-->
              <div class="flex-equal">
                <!--begin::Details-->
                <table class="table fs-6 fw-semobold gs-0 gy-2 gx-2 m-0">
                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400 min-w-175px w-175px">
                      From Date:
                    </td>
                    <td class="text-gray-800 min-w-200px">
                      {{ itemDetails?.rgp.date || "" }}
                    </td>
                  </tr>
                  <!--end::Row-->

                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400">Till Date:</td>
                    <td class="text-gray-800">
                      {{ itemDetails?.rgp.duedate || "" }}
                    </td>
                  </tr>
                  <!--end::Row-->
                </table>
                <!--end::Details-->
              </div>
              <!--end::Row-->
            </div>
            <!--end::Row-->

            <!--begin::Details-->
            <div class="d-flex flex-wrap py-5">
              <!--begin::Row-->
              <div class="flex-equal me-5">
                <!--begin::Details-->
                <table class="table fs-6 fw-semobold gs-0 gy-2 gx-2 m-0">
                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400 min-w-175px w-175px">
                      Customer Name:
                    </td>
                    <td class="text-gray-800 min-w-200px">
                      {{
                        itemDetails?.rgp.quotation.customer.company_name || ""
                      }}
                    </td>
                  </tr>
                  <!--end::Row-->

                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400">Billing Address:</td>
                    <td class="text-gray-800">
                      {{ itemDetails?.rgp.quotation.customer.address1 || "" }}
                      {{ itemDetails?.rgp.quotation.customer.address2 || "" }}
                      {{ itemDetails?.rgp.quotation.customer.city || "" }}
                      {{ itemDetails?.rgp.quotation.customer.pincode || "" }}
                      {{ itemDetails?.rgp.quotation.customer.state || "" }}
                      {{ itemDetails?.rgp.quotation.customer.country || "" }}
                    </td>
                  </tr>
                  <!--end::Row-->
                </table>
                <!--end::Details-->
              </div>
              <!--end::Row-->

              <!--begin::Row-->
              <div class="flex-equal">
                <!--begin::Details-->
                <table class="table fs-6 fw-semobold gs-0 gy-2 gx-2 m-0">
                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400 min-w-175px w-175px">
                      Client Name:
                    </td>
                    <td class="text-gray-800 min-w-200px">
                      {{
                        itemDetails?.rgp.quotation.clientx.company_name || ""
                      }}
                    </td>
                  </tr>
                  <!--end::Row-->

                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400">Site Address:</td>
                    <td class="text-gray-800">
                      {{ itemDetails?.rgp.quotation.clientx.address1 || "" }}
                      {{ itemDetails?.rgp.quotation.clientx.address2 || "" }}
                      {{ itemDetails?.rgp.quotation.clientx.city || "" }}
                      {{ itemDetails?.rgp.quotation.clientx.pincode || "" }}
                      {{ itemDetails?.rgp.quotation.clientx.state || "" }}
                      {{ itemDetails?.rgp.quotation.clientx.country || "" }}
                    </td>
                  </tr>
                  <!--end::Row-->
                </table>
                <!--end::Details-->
              </div>
              <!--end::Row-->
            </div>
            <!--end::Row-->
          </div>
          <!--end::Section-->

          <!--begin::Section-->
          <div class="mb-0">
            <!--begin::Title-->
            <h5 class="mb-4">Your Expenses:</h5>
            <!--end::Title-->

            <!--begin::Product table-->
            <div class="table-responsive">
              <!--begin::Table-->
              <table class="table align-middle table-row-dashed fs-6 gy-4 mb-0">
                <!--begin::Table head-->
                <thead>
                  <!--begin::Table row-->
                  <tr
                    class="border-bottom border-gray-200 text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0"
                  >
                    <th class="min-w-150px">Type</th>
                    <th class="min-w-125px">Description</th>
                    <th class="min-w-125px">Date</th>
                    <th class="min-w-125px">Amount (Rs)</th>
                    <th class="text-end min-w-70px">Actions</th>
                  </tr>
                  <!--end::Table row-->
                </thead>
                <!--end::Table head-->

                <!--begin::Table body-->
                <tbody
                  class="fw-semobold text-gray-800"
                  v-for="(task, index) in itemDetails.expenses"
                  :key="index"
                >
                  <tr>
                    <td>{{ task.type }}</td>
                    <td>
                      {{ task.description }}
                    </td>
                    <td>
                      {{ task.date }}
                    </td>
                    <td>
                      {{ task.amount }}
                    </td>
                    <td class="text-end">
                      <!--begin::Menu item-->

                      <div
                        @click="showTheImage(index)"
                        class="btn btn-sm btn-icon btn-color-primary btn-active-light-primary"
                      >
                        <KTIcon icon-name="file" icon-class="fs-2" />
                      </div>
                      <div>
                        <vue-easy-lightbox
                          :visible="task.visible"
                          :imgs="task.imgData"
                          :index="index"
                          @hide="HideTheImage(index)"
                        ></vue-easy-lightbox>
                      </div>
                    </td>
                  </tr>
                </tbody>
                <!--end::Table body-->
              </table>
              <!--end::Table-->
            </div>
            <!--end::Product table-->
          </div>
          <!--end::Section-->
        </div>
        <!--end::Card body-->
      </div>

      <!--end::Card-->
    </div>
    <!--end::Content-->

    <!--begin::Sidebar-->
    <div
      class="flex-column flex-lg-row-auto w-lg-250px w-xl-300px mb-10 order-2 order-lg-2"
    >
      <!--begin::Card-->
      <div
        class="card card-flush mb-0"
        id="kt_view_summary"
        data-kt-sticky="true"
        data-kt-sticky-name="view-subscription-summary"
        data-kt-sticky-offset="{default: false, lg: '200px'}"
        data-kt-sticky-width="{lg: '250px', xl: '300px'}"
        data-kt-sticky-left="auto"
        data-kt-sticky-top="150px"
        data-kt-sticky-animation="false"
        data-kt-sticky-zindex="95"
      >
        <!--begin::Card header-->
        <div class="card-header">
          <!--begin::Card title-->
          <div class="card-title">
            <h2>Summary</h2>
          </div>
          <!--end::Card title-->
        </div>
        <!--end::Card header-->

        <!--begin::Card body-->
        <div class="card-body pt-0 fs-6">
          <!--begin::Section-->
          <div class="mb-7">
            <!--begin::Details-->
            <div class="d-flex align-items-center">
              <!--begin::Avatar-->
              <div class="symbol symbol-60px symbol-circle me-3">
                <span
                  :class="`bg-dark text-primary text-uppercase`"
                  class="symbol-label fs-2tx fw-bold"
                  >{{ itemDetails?.engineer.first_name.charAt(0) || "" }}</span
                >
              </div>
              <!--end::Avatar-->

              <!--begin::Info-->
              <div class="d-flex flex-column">
                <!--begin::Name-->
                <span class="fs-4 fw-bold text-gray-900 text-hover-primary me-2"
                  >{{ itemDetails?.engineer.first_name || "" }}
                  {{ itemDetails?.engineer.last_name || "" }}</span
                >
                <!--end::Name-->

                <!--begin::Email-->
                <a
                  :href="`mailto:${itemDetails?.engineer.email}`"
                  class="fw-semobold text-gray-600 text-hover-primary"
                  >{{ itemDetails?.engineer.email || "" }}</a
                >
                <!--end::Email-->
              </div>
              <!--end::Info-->
            </div>
            <!--end::Details-->
          </div>
          <!--end::Section-->

          <!--begin::Seperator-->
          <div class="separator separator-dashed mb-7"></div>
          <!--end::Seperator-->

          <!--begin::Section-->
          <div class="mb-7">
            <!--begin::Title-->
            <h5 class="mb-4">Total Expense</h5>
            <!--end::Title-->

            <!--begin::Details-->
            <div class="mb-0">
              <!--begin::Price-->
              <span class="fw-semobold text-gray-600"
                >Rs. {{ itemDetails?.total_amount || "" }}</span
              >
              <!--end::Price-->
            </div>
            <!--end::Details-->

            <div class="mt-2">
              <!--begin::Price-->
              <span class="text-gray-400">Status </span>
              <span
                v-if="itemDetails.status == '1'"
                class="badge py-3 px-4 fs-7 badge-light-primary"
                >{{ GetExpenseStatus(itemDetails.status) }}</span
              >
              <span
                v-if="itemDetails.status == '2'"
                class="badge py-3 px-4 fs-7 badge-light-danger"
                >{{ GetExpenseStatus(itemDetails.status) }}</span
              >
              <span
                v-if="itemDetails.status == '3'"
                class="badge py-3 px-4 fs-7 badge-light-success"
                >{{ GetExpenseStatus(itemDetails.status) }}</span
              >
              <span v-else></span>
              <!--end::Price-->
            </div>
          </div>
          <!--end::Section-->

          <!--begin::Seperator-->
          <div class="separator separator-dashed mb-7"></div>
          <!--end::Seperator-->

          <!--begin::Section-->
          <div class="mb-10">
            <el-select
              filterable
              placeholder="Select Status"
              v-model="itemDetails.status"
            >
              <el-option
                v-for="item in ExpenseStatus"
                :key="item.id"
                :value="item.id"
                :label="item.status"
              />
            </el-select>
          </div>
          <!--end::Section-->

          <!--begin::Actions-->
          <div class="mb-0">
            <button type="button" @click="formSubmit" class="btn btn-sm btn-primary">Update</button>
          </div>
          <!--end::Actions-->
        </div>
        <!--end::Card body-->
      </div>
      <!--end::Card-->
    </div>
    <!--end::Sidebar-->
  </div>
  <!--end::Layout-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent, onMounted, ref } from "vue";
import { useForm } from "vee-validate";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";
import { ExpenseStatus, GetExpenseStatus } from "@/core/model/expensesheets";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { getExpenseSheet, updateExpenseSheet } from "@/stores/api";
import ApiService from "@/core/services/ApiService";
import { ExpenseTypes } from "@/core/model/expensetypes";
import VueEasyLightbox from "vue-easy-lightbox";

export default defineComponent({
  name: "expensesheet-edit",
  components: {
    VueEasyLightbox,
  },
  setup() {
    const loading = ref(false);

    const auth = useAuthStore();
    const route = useRoute();
    const router = useRouter();

    const User = auth.GetUser();
    const itemId = route.params.id;

    const itemDetails = ref({
      id: "",
      rgp_id: "",
      engineer_id: "",
      engineer: {
        id: "",
        first_name: "",
        last_name: "",
        email: "",
      },
      rgp: {
        id: "",
        rgp_no: "",
        date: "",
        duedate: "",
        quotation: {
          id: "",
          quotation_no: "",
          customer: {
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
          clientx: {
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
        },
      },
      expenses: [
        {
          id: "",
          date: "",
          type: "",
          description: "",
          amount: "",
          receipt: "",
          imgData: "",
          visible: false,
        },
      ],
      total_amount: "",
      status: "1",
      updated_by: User.id,
      company_id: "",
    });

    const lightBox = ref([]);

    async function showTheImage(index) {
      itemDetails.value.expenses[index].visible = true;
    }

    async function HideTheImage(index) {
      itemDetails.value.expenses[index].visible = false;
    }

    onMounted(async () => {
      try {
        ApiService.setHeader();
        const response = await getExpenseSheet(itemId.toString());
        if (response) {
          itemDetails.value = { ...response };
          itemDetails.value.expenses = JSON.parse(response.expenses);

          itemDetails.value.expenses.forEach((expense) => {
            // You can set the initial value for imgData here
            // expense.imgData = `http://localhost:8000/storage/company/${response.company_id}/expenses/${expense.receipt}`;
            expense.imgData = `https://api.zeptac.com/storage/company/${response.company_id}/expenses/${expense.receipt}`;
            expense.visible = false; // You can set the initial value for visible here
          });
        } else {
          console.error(`Error Occured in getExpenseSheet`);
        }
      } catch (err) {
        console.error(`Error Occured in getExpenseSheet : ${err}`);
      }
    });

    const formSubmit = async () => {
      loading.value = true;
      try {
        // Call your API here

        const response = await updateExpenseSheet(itemId, itemDetails.value);

        if (response?.success) {
          // Handle successful API response
          loading.value = false;
          showSuccessAlert(
            "Success",
            response.message ||
              "Expense Sheet Status have been successfully updated!"
          );

          router.push({ name: "expensesheet-list" });
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

    return {
      getAssetPath,
      itemDetails,
      formSubmit,
      showTheImage,
      HideTheImage,
      showErrorAlert,
      showSuccessAlert,
      loading,
      ExpenseStatus,
      GetExpenseStatus,
    };
  },
});
</script>