<template>
  <div style="width: 99%" class="bg-body p-12 rounded">
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Form-->
        <VForm
          id="kt_account_profile_details_form"
          class="form"
          novalidate
          :validation-schema="itemValidator"
        >
          <div class="card mb-5 mb-xl-10 p-6 pb-12">
            <!--begin::Card header-->
            <div class="card-header border-0 cursor-pointer">
              <!--begin::Card title-->
              <div class="card-title m-0">
                <h3 class="fw-bold m-0">Add MRM</h3>
              </div>
              <div
                class="card-toolbar d-flex justify-content-end"
                data-kt-customer-table-toolbar="base"
              >
                <!--begin::Add customer-->
                <router-link to="/plan" class="btn btn-light">
                  <KTIcon icon-name="arrow-left" icon-class="fs-2" />
                  Back
                </router-link>
                <!--end::Add customer-->
              </div>
              <!--end::Card title-->
            </div>
            <!--begin::Card header-->

            <!--begin::Content-->
            <div>
              <!--begin::Form-->
              <!--begin::Card body-->
              <div class="card-body p-9">
                <!-- extra fields -->
                <div class="row mb-6">
                  <div class="form-group col-lg-12 col-md-12">
                    <label
                      class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                      >Select Month</label
                    >

                    <el-select
                      v-model="itemDetails.month_id"
                      filterable
                      placeholder="Choose Month"
                    >
                      <el-option
                        v-for="month in months"
                        :key="month.id"
                        :label="`${month.name} - ${month.year}`"
                        :value="month.id"
                      />
                    </el-select>

                    <div
                      class="fv-plugins-message-container mt-0"
                      v-if="!itemDetails.month_id"
                    >
                      <div class="fv-help-block">
                        <ErrorMessage name="month_id" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!--begin::Card footer-->
              <div class="card-footer d-flex justify-content-end py-6 px-9">
                <button
                  type="button"
                  :data-kt-indicator="dataLoading ? 'on' : ''"
                  class="btn btn-primary px-6"
                  @click="submit()"
                >
                  <span v-if="!dataLoading" class="indicator-label"> Save</span>
                  <span v-if="dataLoading" class="indicator-progress">
                    Please wait...
                    <span
                      class="spinner-border spinner-border-sm align-middle ms-2"
                    ></span>
                  </span>
                </button>
              </div>
              <!--end::Card footer-->
              <!--end::Input group-->
              <!--end::Form-->
            </div>
            <!--end::Content-->
          </div>
        </VForm>
        <!--end::Form-->

        <div class="card mb-5 mb-xl-10 pb-12">
          <div class="card-header border-0 pt-6">
            <!--begin::Card title-->
            <div class="card-title">
              <!--begin::Card title-->
              <div class="card-title m-0">
                <h3 class="fw-bold m-0">MRM Plan List</h3>
              </div>
              <!--end::Card title-->
            </div>
            <!--begin::Card title-->
            <!--begin::Card toolbar-->

            <div class="card-toolbar">
              <!-- YEAR WISE DATA -->

              <h3 class="card-title align-items-start flex-column">
                <span class="card-label fw-semibold text-gray-400"
                  >Financial Year</span
                >
              </h3>
              <div class="me-3">
                <el-select
          class="w-150px"
                  filterable
                  placeholder="Select Year"
                  v-model="selectedYearCache"
                  id="financialYear"
                  @change="handleChange"
                >
                  <el-option
                    v-for="year in financialYears"
                    :key="year"
                    :value="year"
                    :label="year"
                  />
                </el-select>
              </div>

              <!--begin::Group actions-->
              <div
                v-if="selectedIds.length !== 0"
                class="d-flex justify-content-end align-items-center"
                data-kt-customer-table-toolbar="selected"
              >
                <div class="fw-bold me-5">
                  <span class="me-2">{{ selectedIds.length }}</span
                  >Selected
                </div>
                <button
                  type="button"
                  class="btn btn-danger"
                  @click="deleteFewItem()"
                >
                  Delete Selected
                </button>
              </div>
              <!--end::Group actions-->
              <!--begin::Group actions-->
              <div
                class="d-flex justify-content-end align-items-center d-none"
                data-kt-customer-table-toolbar="selected"
              >
                <div class="fw-bold me-5">
                  <span
                    class="me-2"
                    data-kt-customer-table-select="selected_count"
                  ></span
                  >Selected
                </div>
                <button
                  type="button"
                  class="btn btn-danger"
                  data-kt-customer-table-select="delete_selected"
                >
                  Delete Selected
                </button>
              </div>
              <!--end::Group actions-->
            </div>
            <!--end::Card toolbar-->
          </div>

          <!--begin::Card body-->
          <div class="card-body pt-0">
            <div class="table-responsive">
              <Datatable
                checkbox-label="id"
                @on-sort="sort"
                @on-items-select="onItemSelect"
                :data="tableData"
                :header="tableHeader"
                :checkbox-enabled="true"
                :items-per-page="limit"
                :items-per-page-dropdown-enabled="false"
                :loading="loading"
              >
                <template v-slot:id="{ row: planner }">
                  {{ planner.id }}
                </template>
                <template v-slot:month_id="{ row: planner }">
                  <span class="badge py-3 px-4 fs-7 badge-light-primary">{{
                    getMonthName(planner.month_id)
                  }}</span>
                </template>
                <template v-slot:actions="{ row: planner }">
                  <!--begin::Menu Flex-->
                  <div class="d-flex flex-lg-row my-3">
                    <!--begin::Delete-->
                    <span
                      @click="deleteItem(planner.id, false)"
                      class="btn btn-icon btn-active-light-danger w-30px h-30px me-3"
                      data-bs-toggle="tooltip"
                      title="Delete Plan"
                    >
                      <KTIcon icon-name="trash" icon-class="fs-2" />
                    </span>
                    <!--end::Delete-->
                  </div>
                  <!--end::Menu Flex-->
                </template>
              </Datatable>
              <div class="d-flex justify-content-between p-2">
                <div>
                  <el-select
                    class="w-100px rounded-2"
                    v-model="limit"
                    filterable
                    @change="PageLimitPoiner(limit)"
                  >
                    <el-option
                      v-for="item in Limits"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </div>
                <ul class="pagination">
                  <li class="paginate_button page-item" style="cursor: auto">
                    <span @click="PrevPage" class="paginate_button page-link"
                      ><i class="ki-duotone ki-left fs-2"><!--v-if--></i></span
                    >
                  </li>
                  <li class="paginate_button disabled">
                    <span class="paginate_button page-link">
                      Page - {{ page }}
                    </span>
                  </li>
                  <li class="paginate_button page-item" style="cursor: pointer">
                    <span @click="NextPage" class="paginate_button page-link"
                      ><i class="ki-duotone ki-right fs-2"><!--v-if--></i></span
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
          
<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref, watch } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import {
  getPlan,
  addPlanner,
  getPlanners,
  deletePlanner,
  PlannerSearch,
} from "@/stores/api";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import { Identifier } from "@/core/config/WhichUserConfig";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import ApiService from "@/core/services/ApiService";
import moment from "moment";
import { useMonthUtils } from "@/core/model/planner";
import type { IPlan } from "@/core/model/planner";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import arraySort from "array-sort";

interface Data {
  plan_id: string;
  month_id: string;
  data: {};
  company_id: string;
  created_by: number;
  updated_by: number;
  is_active: number;
}

export default defineComponent({
  name: "plan-mrm",
  components: { Datatable, ErrorMessage, Field, VForm },
  setup() {
    const identifier = Identifier;
    const dataLoading = ref(false);
    const auth = useAuthStore();
    const router = useRouter();
    const User = auth.GetUser();

    // Financial Year Logic
    const authStore = useAuthStore();

    const financialYearType = Number(localStorage.getItem("financialYearType"));
    const { months, currentYear, currentMonth, getMonthName } =
      useMonthUtils(financialYearType);
    const selectedMonthId = ref(currentMonth);

    const PLAN_ID = "7";

    const tableHeader = ref([
      {
        columnName: "Month Name",
        columnLabel: "month_id",
        sortEnabled: true,
        columnWidth: 600,
      },
      {
        columnName: "Actions",
        columnLabel: "actions",
        sortEnabled: false,
        columnWidth: 75,
      },
    ]);

    const selectedIds = ref<Array<number>>([]);
    const tableData = ref<Array<IPlan>>([]);
    const initvalues = ref<Array<IPlan>>([]);

    // functions
    const Limits = ref({
      1: 10,
      2: 25,
      3: 50,
    });

    const loading = ref(true);
    // staring from 1
    const page = ref(1);
    const limit = ref(10);
    // limit 10
    const more = ref(false);

    const PagePointer = async (page) => {
      // ? Truncate the tableData
      //console.log(limit.value);
      loading.value = true;
      try {
        while (tableData.value.length != 0) tableData.value.pop();
        while (initvalues.value.length != 0) initvalues.value.pop();

        ApiService.setHeader();
        const response = await getPlanners(
          `page=${page}&limit=${limit.value}&planId=${PLAN_ID}&year=${
            selectedYearCache.value
              ? selectedYearCache.value
              : financialYears.value[0]
          }`
        );

        more.value = response.result.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(
          ({ id, month_id, data, ...rest }) => ({
            id,
            month_id,
            data: JSON.parse(data),
            ...rest,
          })
        );
        initvalues.value.splice(0, tableData.value.length, ...tableData.value);
      } catch (error) {
        console.error(error);
      } finally {
        ////console.log("done");
        setTimeout(() => {
          loading.value = false;
        }, 250);
      }
    };

    const PageLimitPoiner = async (limit) => {
      // ? Truncate the tableData
      page.value = 1;
      //console.log(page.value, limit);
      loading.value = true;
      try {
        while (tableData.value.length != 0) tableData.value.pop();
        while (initvalues.value.length != 0) initvalues.value.pop();

        ApiService.setHeader();
        const response = await getPlanners(
          `page=${page.value}&limit=${limit}&planId=${PLAN_ID}&year=${
            selectedYearCache.value
              ? selectedYearCache.value
              : financialYears.value[0]
          }`
        );

        more.value = response.result.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(
          ({ id, month_id, data, ...rest }) => ({
            id,
            month_id,
            data: JSON.parse(data),
            ...rest,
          })
        );
        initvalues.value.splice(0, tableData.value.length, ...tableData.value);
      } catch (error) {
        console.error(error);
      } finally {
        ////console.log("done");
        setTimeout(() => {
          loading.value = false;
        }, 250);
      }
    };

    //console.log(initvalues.value);

    const NextPage = async () => {
      if (more.value != false) {
        page.value = page.value + 1;
        await PagePointer(page.value);
      }
    };

    const PrevPage = async () => {
      if (page.value > 1) {
        page.value = page.value - 1;
        await PagePointer(page.value);
      }
    };

    // get_compaines
    const planner_listing = async () => {
      try {
        ApiService.setHeader();
        const response = await getPlanners(
          `page=${page.value}&limit=${limit.value}&planId=${PLAN_ID}&year=${
            selectedYearCache.value
              ? selectedYearCache.value
              : financialYears.value[0]
          }`
        );

        more.value = response.result.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(
          ({ id, month_id, data, ...rest }) => ({
            id,
            month_id,
            data: JSON.parse(data),
            ...rest,
          })
        );
        initvalues.value.splice(0, tableData.value.length, ...tableData.value);
      } catch (error) {
        console.error(error);
      } finally {
        ////console.log("done");
        setTimeout(() => {
          loading.value = false;
        }, 250);
      }
    };

    const itemValidator = Yup.object().shape({});

    const itemDetails = ref<Data>({
      plan_id: PLAN_ID,
      month_id: "",
      data: {},
      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
      is_active: 1,
    });

    const financialYears = ref(authStore.financialYears); // Generate Financial years list using the auth store function
    const selectedYearCache = ref(
      localStorage.getItem("selectedFinancialYear") || ""
    );

    // Fallback to default value if localStorage data is invalid or missing
    if (!financialYears.value.includes(selectedYearCache.value)) {
      selectedYearCache.value = financialYears.value[0];
    }

    watch(selectedYearCache, (newValue) => {
      localStorage.setItem("selectedFinancialYear", newValue);
    });

    async function handleChange() {
      page.value = 1;
      localStorage.setItem("selectedFinancialYear", selectedYearCache.value);
      await planner_listing();
    }

    onMounted(async () => {
      // Save initial selected year to localStorage
      localStorage.setItem("selectedFinancialYear", selectedYearCache.value);

      try {
        await planner_listing();
        setTimeout(() => {
          loading.value = false;
        }, 250);
      } catch (error) {
        // Handle errors, e.g., show an error message
        console.error("Error fetching leads data:", error);
      }
    });

    const validateForm = (formData) => {
      for (const key in formData) {
        let value = formData[key];
        if (Array.isArray(value)) {
          for (const item of value) {
            if (!validateForm(item)) {
              return false;
            }
          }
        } else if (typeof value === "object" && value !== null) {
          if (!validateForm(value)) {
            return false;
          }
        } else if (typeof value === "string") {
          // Trim the string before validation
          value = value.trim();
          if (value === "") {
            return false;
          }
        }
      }
      return true;
    };

    const submit = async () => {
      dataLoading.value = true;

      //   console.warn("Nice");
      try {
        if (validateForm(itemDetails)) {
          const response = await addPlanner(itemDetails.value);
          if (!response.error) {
            showSuccessAlert(
              "Success",
              "MRM Plan has been successfully added!"
            );
            dataLoading.value = false;
            loading.value = true;
            clear();
            planner_listing();
            // router.push({ name: "plan-list" });
          } else {
            showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
            dataLoading.value = false;
            return;
          }
        } else {
          console.log(validateForm(itemDetails));
          showErrorAlert("Warning", "Please fill in all fields.");
          return;
        }
      } catch (error) {
        // Handle any other errors during API call
        // console.error("API call error:", error);
        showErrorAlert("Error", "An error occurred during the API call.");
      } finally {
        dataLoading.value = false;
        loading.value = false;
      }
    };


    
    const deleteFewItem = async () => {
      try {
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "You will not be able to recover from this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "red",
          confirmButtonText: "Yes, I am sure!",
          cancelButtonText: "No, cancel it!",
        });

        if (result.isConfirmed) {
          let allSuccess = true;
          let finalMessage = "Selected items deleted successfully.";

          for (const id of selectedIds.value) {
            const response = await deleteItem(id, true);
            if (!response.success) {
              allSuccess = false;
              finalMessage =
                response.message ||
                "An error occurred while deleting some items.";
              break;
            }
          }

          selectedIds.value.length = 0;

          if (allSuccess) {
            showSuccessAlert("Success", finalMessage);
          } else {
            showErrorAlert("Error", finalMessage);
          }
        }
      } catch (error: any) {
        const errorMessage = error.message || "An unknown error occurred";
        showErrorAlert("Error", errorMessage);
      }
    };

    const deleteItem = async (id: number, mul: boolean) => {
      const deleteConfirmation = async () => {
        try {
          const result = await Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover from this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "red",
            confirmButtonText: "Yes, I am sure!",
          });
          return result.isConfirmed;
        } catch (error: any) {
          const errorMessage = error.message || "An unknown error occurred";
          showErrorAlert("Error", errorMessage);
          return false;
        }
      };

      const deleteFromTable = async (id: number) => {
        try {
          const response = await deletePlanner(id);
          if (response?.success) {
            const index = tableData.value.findIndex((item) => item.id === id);
            if (index !== -1) {
              tableData.value.splice(index, 1);
              // console.log(`Item with id ${id} deleted successfully`);
            }
            showSuccessAlert(
              "Success",
              response.message || `Item with id ${id} deleted successfully.`
            );
            return { success: true };
          } else {
            throw new Error(
              response?.message || `Failed to delete the item with id ${id}`
            );
          }
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "An unknown error occurred";
          showErrorAlert("Error", errorMessage);
          return { success: false, message: errorMessage };
        }
      };

      if (!mul) {
        const isConfirmed = await deleteConfirmation();
        if (isConfirmed) {
          return await deleteFromTable(id);
        } else {
          return { success: false };
        }
      } else {
        return await deleteFromTable(id);
      }
    };

    // Alert functions
    const showSuccessAlert = (title: string, message: string) => {
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

    const showErrorAlert = (title: string, message: string) => {
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


    const sort = (sort: Sort) => {
      const reverse: boolean = sort.order === "asc";
      if (sort.label) {
        arraySort(tableData.value, sort.label, { reverse });
      }
    };
    const onItemSelect = (selectedItems: Array<number>) => {
      selectedIds.value = selectedItems;
    };

    const clear = () => {
      itemDetails.value = {
        plan_id: PLAN_ID,
        month_id: "",
        data: {},
        company_id: User.company_id,
        created_by: User.id,
        updated_by: User.id,
        is_active: 1,
      };
    };
    return {
      itemDetails,
      itemValidator,
      getAssetPath,
      submit,
      loading,
      identifier,
      User,
      clear,
      months,
      getMonthName,

      tableData,
      tableHeader,
      deleteItem,
      selectedIds,
      deleteFewItem,
      sort,
      onItemSelect,
      dataLoading,
      NextPage,
      PrevPage,
      page,
      limit,
      PageLimitPoiner,
      Limits,

      selectedYearCache,
      financialYears,
      handleChange,
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
  min-height: 3.5rem;
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

.trainer-container {
  display: flex;
  align-items: center;
  margin-right: 10px; /* Adjust as needed */
  background-color: #000; /* Optional background color for each trainer container */
  padding: 5px 10px; /* Optional padding */
  border-radius: 5px; /* Optional border radius */
}
.tagify-remove {
  margin-left: 5px; /* Optional margin between the name and the 'X' button */
}
.override-styles {
  z-index: 99999 !important;
  pointer-events: initial;
}
</style>