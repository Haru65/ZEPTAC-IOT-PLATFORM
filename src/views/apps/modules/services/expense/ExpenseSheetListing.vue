<template>
  <div>
    <div class="card">
      <div class="card-header border-0 pt-6">
        <!--begin::Card title-->
        <div class="card-title">
          <!--begin::Search-->
          <div class="d-flex align-items-center position-relative my-1">
            <KTIcon
              icon-name="magnifier"
              icon-class="fs-1 position-absolute ms-6"
            />
            <input
              type="text"
              v-model="search"
              @input="searchItems()"
              class="form-control form-control-solid w-250px ps-15"
              placeholder="Search Service Engineer"
            />
          </div>
          <!--end::Search-->
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
          <!--begin::Toolbar-->
          <div
            v-if="selectedIds.length === 0"
            class="d-flex justify-content-end"
            data-kt-customer-table-toolbar="base"
          >
            <button
              type="button"
              class="btn btn-light-primary me-3"
              data-bs-toggle="modal"
              data-bs-target="#kt_customers_export_modal"
            >
              <KTIcon icon-name="exit-up" icon-class="fs-2" />
              Export
            </button>
            <!--end::Export-->
            <!--begin::Add customer-->
            <router-link to="/expensesheets/add" class="btn btn-primary">
              <KTIcon icon-name="plus" icon-class="fs-2" />
              Expense Sheet
            </router-link>
            <!--end::Add customer-->
          </div>
          <!--end::Toolbar-->
          <!--begin::Group actions-->
          <div
            v-else
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

          <div>
            <button
              type="button"
              id="kt-menu-filter-button"
              class="btn btn-sm btn-icon btn-color-primary btn-active-light-primary"
              data-kt-menu-target="#kt_menu_filter"
              data-kt-menu-trigger="{default:'click', lg: 'hover'}"
              data-kt-menu-attach="parent"
              data-kt-menu-placement="bottom-end"
              data-kt-menu-flip="top-end"
            >
              <KTIcon icon-name="filter" icon-class="fs-1" />
            </button>

            <!--begin::Menu 1-->
            <div
              id="kt_menu_filter"
              class="menu menu-sub menu-sub-dropdown w-250px w-md-300px"
              data-kt-menu="true"
              data-kt-menu-attach="#kt-menu-filter-button"
            >
              <!--begin::Header-->
              <div class="px-7 py-5">
                <div class="fs-5 text-dark fw-bold">Filter Options</div>
              </div>
              <!--end::Header-->

              <!--begin::Menu separator-->
              <div class="separator border-gray-200"></div>
              <!--end::Menu separator-->

              <!--begin::Form-->
              <div class="px-7 py-5">
                <!--begin::Input group-->
                <div class="mb-10">
                  <!--begin::Label-->
                  <label class="form-label fw-semobold">Expense status:</label>
                  <!--end::Label-->

                  <!--begin::Options-->
                  <div class="d-flex flex-wrap gap-6">
                    <!--begin::Options-->
                    <label
                      class="form-check form-check-sm form-check-custom form-check-solid me-5"
                      v-for="(expense, index) in ExpenseStatus"
                      :key="index"
                    >
                      <input
                        class="form-check-input"
                        type="checkbox"
                        :value="expense.id"
                        v-model="selectedStatus"
                      />
                      <span class="form-check-label user-select-none">{{
                        expense.status
                      }}</span>
                    </label>
                    <!--end::Options-->
                  </div>
                  <!--end::Options-->
                </div>
                <!--end::Input group-->

                <!--begin::Actions-->
                <div class="d-flex justify-content-end">
                  <button
                    type="button"
                    class="btn btn-sm btn-primary"
                    @click="applyFilters"
                    data-kt-menu-dismiss="true"
                  >
                    Apply
                  </button>
                </div>
                <!--end::Actions-->
              </div>
              <!--end::Form-->
            </div>
            <!--end::Menu 1-->
          </div>
        </div>
        <!--end::Card toolbar-->
      </div>
      <div class="card-body pt-0">
        <ApprovalModal
          @reloadData="reLoadData"
          v-bind:data="itemData"
        ></ApprovalModal>

        <Datatable
          checkbox-label="id"
          @on-sort="sort"
          @on-items-select="onItemSelect"
          :data="tableData"
          :header="filteredTableHeader"
          :checkbox-enabled="true"
          :items-per-page="limit"
          :items-per-page-dropdown-enabled="false"
          :loading="loading"
        >
          <template v-slot:id="{ row: expensesheets }">
            {{ expensesheets.id }}
          </template>
          <template v-slot:rgp="{ row: expensesheets }">
            <span class="text-gray-600 text-hover-primary mb-1">
              {{ expensesheets.rgp.rgp_no }}
            </span>
          </template>
          <template v-slot:customer="{ row: expensesheets }">
            <span class="text-gray-600 text-hover-primary mb-1">
              {{ expensesheets?.customer?.company_name || "" }}
            </span>
          </template>
          <template v-slot:engineer="{ row: expensesheets }">
            <span class="text-gray-600 text-hover-primary mb-1">
              {{ expensesheets?.engineer?.first_name || "" }}
              {{ expensesheets?.engineer?.last_name || "" }}
            </span>
          </template>
          <!-- defualt data -->
          <template v-slot:total_amount="{ row: expensesheets }">
            {{ formatPrice(expensesheets.total_amount) }}
          </template>
          <template v-slot:status="{ row: expensesheets }">
            <span
              v-if="expensesheets.status == 1"
              class="badge py-3 px-4 fs-7 badge-light-primary"
              >{{ GetExpenseStatus(expensesheets.status) }}</span
            >
            <span
              v-if="expensesheets.status == 2"
              class="badge py-3 px-4 fs-7 badge-light-danger"
              >{{ GetExpenseStatus(expensesheets.status) }}</span
            >
            <span
              v-if="expensesheets.status == 3"
              class="badge py-3 px-4 fs-7 badge-light-success"
              >{{ GetExpenseStatus(expensesheets.status) }}</span
            >
          </template>

          <template v-slot:approval_status="{ row: expensesheets }">
            <span
              v-if="expensesheets.approval_status == 1"
              class="badge py-3 px-4 fs-7 badge-light-primary"
              >{{ GetApprovalStatus(expensesheets.approval_status) }}</span
            >
            <span
              v-if="expensesheets.approval_status == 2"
              class="badge py-3 px-4 fs-7 badge-light-danger"
              >{{ GetApprovalStatus(expensesheets.approval_status) }}</span
            >
            <span
              v-if="expensesheets.approval_status == 3"
              class="badge py-3 px-4 fs-7 badge-light-success"
              >{{ GetApprovalStatus(expensesheets.approval_status) }}</span
            >
          </template>

          <template v-slot:approval_button="{ row: expensesheets }">
            <button
              type="button"
              class="btn btn-sm btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#kt_modal_1"
              @click="fillItemData(expensesheets)"
            >
              Open
            </button>
          </template>

          <template v-slot:actions="{ row: expensesheets }">
            <!--begin::Menu Flex-->
            <div class="d-flex flex-lg-row my-3">
              <!--begin::Edit-->
              <router-link :to="`/expensesheets/edit/${expensesheets.id}`">
                <span
                  class="btn btn-icon btn-active-light-primary w-30px h-30px me-3"
                  v-tooltip
                  title="View Expense Sheet"
                >
                  <KTIcon icon-name="pencil" icon-class="fs-2" />
                </span>
              </router-link>
              <!--end::Edit-->

              <!--begin::Delete-->
              <span
                @click="deleteItem(expensesheets.id, false)"
                class="btn btn-icon btn-active-light-danger w-30px h-30px me-3"
                v-tooltip
                title="Delete Expense Sheet"
              >
                <KTIcon icon-name="trash" icon-class="fs-2" />
              </span>
              <!--end::Delete-->
            </div>
            <!--end::Menu FLex-->
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
              <span class="paginate_button page-link"> Page - {{ page }} </span>
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
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import {
  ExpenseStatus,
  GetExpenseStatus,
  type IExpenseSheet,
} from "@/core/model/expensesheets";
import arraySort from "array-sort";
import moment from "moment";
import {
  deleteExpenseSheet,
  getExpenseSheets,
  ExpenseSheetSearch,
} from "@/stores/api";
import { ApprovalStatus, GetApprovalStatus } from "@/core/model/global";
import { hideModal } from "@/core/helpers/dom";
import ApprovalModal from "./ApprovalModal.vue";
import { useAuthStore } from "@/stores/auth";
import { Identifier } from "@/core/config/WhichUserConfig";
import Swal from "sweetalert2";
import { formatPrice } from "@/core/config/DataFormatter";

export default defineComponent({
  name: "expensesheet-list",
  components: {
    Datatable,
    ApprovalModal,
  },
  setup() {
    // Academic Year Logic
    const authStore = useAuthStore();

    const auth = useAuthStore();
    const User = auth.GetUser();
    const identifier = Identifier;

    const loading = ref(true);
    const tableHeader = ref([
      {
        columnName: "RGP No.",
        columnLabel: "rgp",
        sortEnabled: true,
        columnWidth: 125,
      },
      {
        columnName: "Customer Name",
        columnLabel: "customer",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Engineer Name",
        columnLabel: "engineer",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Total Expense",
        columnLabel: "total_amount",
        sortEnabled: true,
        columnWidth: 125,
      },
      {
        columnName: "Status",
        columnLabel: "status",
        sortEnabled: true,
        columnWidth: 100,
      },
      {
        columnName: "Approval Status",
        columnLabel: "approval_status",
        sortEnabled: false,
        columnWidth: 75,
      },
      {
        columnName: "Reject/Approve",
        columnLabel: "approval_button",
        sortEnabled: false,
        columnWidth: 75,
      },
      {
        columnName: "Actions",
        columnLabel: "actions",
        sortEnabled: false,
        columnWidth: 70,
      },
    ]);

    const itemData = ref({
      id: "",
      approval_status: "",
      new_status: "",
      company_id: "",
      updated_by: "",
    });

    // functions
    const Limits = ref({
      1: 10,
      2: 25,
      3: 50,
    });

    // staring from 1
    const page = ref(1);
    const limit = ref(10);
    // limit 10
    const more = ref(false);

    // Filters Logic

    const selectedStatus = ref([]);

    const applyFilters = async () => {
      try {
        page.value = 1;
        await expensesheets_listing();
      } catch (error) {
        console.error("Error fetching expensesheets:", error);
        // Handle error
      }
    };

    const selectedIds = ref<Array<number>>([]);
    const tableData = ref<Array<IExpenseSheet>>([]);
    const initvalues = ref<Array<IExpenseSheet>>([]);

    // get users function
    async function expensesheets_listing(): Promise<void> {
      try {
        const statusString = selectedStatus.value.join(",");

        const response = await getExpenseSheets(
          `page=${page.value}&limit=${limit.value}&year=${
            selectedYearCache.value
              ? selectedYearCache.value
              : financialYears.value[0]
          }&status=${statusString}`
        );

        if (response.success) {
          more.value = response.result.next_page_url != null ? true : false;
          tableData.value = response.result.data.map(
            ({ id, engineer, rgp, ...rest }) => ({
              id,
              rgp: { ...rgp },
              engineer: { ...engineer },
              customer: { ...rgp.quotation.customer },
              ...rest,
            })
          );
          initvalues.value.splice(
            0,
            tableData.value.length,
            ...tableData.value
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        //console.log("done");
        setTimeout(() => {
          loading.value = false;
        }, 250);
      }
    }

    const PagePointer = async (page) => {
      // ? Truncate the tableData
      //console.log(limit.value);
      loading.value = true;
      try {
        while (tableData.value.length != 0) tableData.value.pop();
        while (initvalues.value.length != 0) initvalues.value.pop();

        const statusString = selectedStatus.value.join(",");
        const response = await getExpenseSheets(
          `page=${page}&limit=${limit.value}&year=${
            selectedYearCache.value
              ? selectedYearCache.value
              : financialYears.value[0]
          }&status=${statusString}`
        );

        if (response.success) {
          more.value = response.result.next_page_url != null ? true : false;
          tableData.value = response.result.data.map(
            ({ id, engineer, rgp, ...rest }) => ({
              id,
              rgp: { ...rgp },
              engineer: { ...engineer },
              customer: { ...rgp.quotation.customer },
              ...rest,
            })
          );
          initvalues.value.splice(
            0,
            tableData.value.length,
            ...tableData.value
          );
        }
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

        const statusString = selectedStatus.value.join(",");
        const response = await getExpenseSheets(
          `page=${page.value}&limit=${limit}&year=${
            selectedYearCache.value
              ? selectedYearCache.value
              : financialYears.value[0]
          }&status=${statusString}`
        );

        if (response.success) {
          more.value = response.result.next_page_url != null ? true : false;
          tableData.value = response.result.data.map(
            ({ id, engineer, rgp, ...rest }) => ({
              id,
              rgp: { ...rgp },
              engineer: { ...engineer },
              customer: { ...rgp.quotation.customer },
              ...rest,
            })
          );
          initvalues.value.splice(
            0,
            tableData.value.length,
            ...tableData.value
          );
        }
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

    const NextPage = () => {
      console.log(more.value);
      if (more.value != false) {
        page.value = page.value + 1;
        PagePointer(page.value);
      }
    };

    const PrevPage = () => {
      if (page.value > 1) {
        page.value = page.value - 1;
        PagePointer(page.value);
      }
    };

    const filteredTableHeader = computed(() => {
      const isAdmin = identifier.value === "Admin";
      const isCompanyAdmin = identifier.value === "Company-Admin";
      const isSiteIncharge = identifier.value === "Site-Incharge";

      if (isAdmin || isCompanyAdmin || isSiteIncharge) {
        // If the identifier is 'Admin' or 'Company-Admin', include the 'approval_button' column
        return tableHeader.value;
      } else {
        // Otherwise, exclude the 'approval_button' column
        return tableHeader.value.filter(
          (column) => column.columnLabel !== "approval_button"
        );
      }
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
      await expensesheets_listing();
    }

    onMounted(async () => {
      // Save initial selected year to localStorage
      localStorage.setItem("selectedFinancialYear", selectedYearCache.value);

      await expensesheets_listing();
    });

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
          const response = await deleteExpenseSheet(id);
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

    const search = ref<string>("");
    let debounceTimer;
    const searchItems = async () => {
      tableData.value.splice(0, tableData.value.length, ...initvalues.value);
      if (search.value !== "") {
        let results: Array<IExpenseSheet> = [];
        for (let j = 0; j < tableData.value.length; j++) {
          if (searchingFunc(tableData.value[j], search.value)) {
            results.push(tableData.value[j]);
          }
        }
        tableData.value.splice(0, tableData.value.length, ...results);

        if (tableData.value.length == 0) {
          loading.value = true;
          clearTimeout(debounceTimer); // Clear any existing debounce timer
          debounceTimer = setTimeout(async () => {
            await SearchMore();
          }, 1000);
        }
      } else {
        page.value = 1;
        while (tableData.value.length != 0) tableData.value.pop();
        while (initvalues.value.length != 0) initvalues.value.pop();
        await expensesheets_listing();
      }
    };

    async function SearchMore() {
      // Your API call logic here
      try {
        const statusString = selectedStatus.value.join(",");
        const response = await ExpenseSheetSearch(
          search.value,
          selectedYearCache.value
            ? selectedYearCache.value
            : financialYears.value[0],
          statusString
        );

        if (response.success) {
          more.value = response.result.next_page_url != null ? true : false;
          tableData.value = response.result.data.map(
            ({ id, engineer, rgp, ...rest }) => ({
              id,
              rgp: { ...rgp },
              engineer: { ...engineer },
              customer: { ...rgp.quotation.customer },
              ...rest,
            })
          );
          initvalues.value.splice(
            0,
            tableData.value.length,
            ...tableData.value
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        //console.log("done");
        setTimeout(() => {
          loading.value = false;
        }, 250);
      }
    }

    const searchingFunc = (obj: any, value: string): boolean => {
      for (let key in obj) {
        if (!Number.isInteger(obj[key]) && !(typeof obj[key] === "object")) {
          if (obj[key].indexOf(value) != -1) {
            return true;
          }
        }
      }
      return false;
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

    async function reLoadData() {
      await expensesheets_listing();
    }

    // Function
    const fillItemData = (ncr) => {
      const { id, approval_status, company_id } = ncr;

      itemData.value = {
        id: id,
        approval_status: approval_status,
        new_status: "",
        company_id: company_id,
        updated_by: User.id,
      };
      console.log("itemData are:", itemData.value);
    };

    return {
      tableData,
      tableHeader,
      deleteItem,
      search,
      searchItems,
      selectedIds,
      deleteFewItem,
      sort,
      onItemSelect,
      getAssetPath,
      expensesheets_listing,
      loading,
      NextPage,
      PrevPage,
      page,
      limit,
      PageLimitPoiner,
      Limits,
      formatPrice,
      GetExpenseStatus,
      filteredTableHeader,
      ApprovalStatus,
      GetApprovalStatus,
      itemData,
      fillItemData,
      Identifier,
      identifier,
      reLoadData,

      selectedYearCache,
      financialYears,
      handleChange,

      selectedStatus,
      ExpenseStatus,
      applyFilters,
    };
  },
});
</script>
