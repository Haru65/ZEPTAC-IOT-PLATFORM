<template>
  <EmployeeExportModal></EmployeeExportModal>
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
            placeholder="Search Employee"
          />
        </div>
        <!--end::Search-->
      </div>
      <!--begin::Card title-->
      <!--begin::Card toolbar-->
      <div class="card-toolbar">
        <!--begin::Toolbar-->
        <div
          v-if="selectedIds.length === 0"
          class="d-flex justify-content-end"
          data-kt-customer-table-toolbar="base"
        >
          <!--begin::Export-->
          <button
            type="button"
            class="btn btn-light-info me-3"
            data-bs-toggle="modal"
            data-bs-target="#kt_employee_export_modal"
          >
            <KTIcon icon-name="exit-up" icon-class="fs-2" />
            Export
          </button>
          <!--end::Export-->
          <!--begin::Add customer-->
          <router-link to="./add" class="btn btn-primary">
            <KTIcon icon-name="plus" icon-class="fs-2" />
            Employee
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
          <button type="button" class="btn btn-danger" @click="deleteFewItem()">
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
    <div class="card-body pt-0">
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
        <!-- img data -->
        <template v-slot:profile="{ row: employee }">
          <div class="d-flex justify-content-start align-items-center">
            <span style="margin-left: 5.5%">
              <span class="text-gray-600 text-hover-primary mb-1">
                {{ employee.first_name + " " + employee.last_name }}
              </span>
            </span>
          </div>
        </template>
        <template v-slot:mobile="{ row: employee }">
          {{ employee.mobile }}
        </template>
        <template v-slot:role="{ row: employee }">
          {{ employee.role_id }}
        </template>
        <template
          v-slot:company_name="{ row: employee }"
          v-if="identifier == 'Admin'"
        >
          {{ employee.company_name[0].company_name }}
        </template>

        <template v-slot:history_card="{ row: employee }">
          <!--begin::Menu Flex-->
          <div class="d-flex flex-lg-row">
            <span
              class="btn btn-icon btn-active-light-success w-30px h-30px me-3"
              data-bs-toggle="tooltip"
              title="Download Employee History Card"
              @click="downloadHistoryCard(employee.id)"
            >
              <KTIcon icon-name="file-down" icon-class="fs-2" />
            </span>
          </div>
          <!--end::Menu FLex-->
        </template>

        <template v-slot:profile_pic="{ row: employee }">
          <!--begin::Menu Flex-->
          <div class="d-flex flex-lg-row" v-if="employee.meta.profile_pic">
            <a
              target="blank"
              v-bind:href="`https://api.zeptac.com/storage/company/${employee.company_id}/profile_images/${employee.meta.profile_pic}`"
              class="btn btn-icon btn-active-light-primary w-30px h-30px me-3"
              data-bs-toggle="tooltip"
              title="Download Photo"
            >
              <KTIcon icon-name="profile-circle" icon-class="fs-1" />
            </a>
          </div>
          <div v-else class="d-flex flex-lg-row"></div>
          <!--end::Menu FLex-->
        </template>

        <template v-slot:adhar="{ row: employee }">
          <!--begin::Menu Flex-->
          <div class="d-flex flex-lg-row" v-if="employee.meta.adhar">
            <a
              target="blank"
              v-bind:href="`https://api.zeptac.com/storage/company/${employee.company_id}/aadhar_cards/${employee.meta.adhar}`"
              class="btn btn-icon btn-active-light-primary w-30px h-30px me-3"
              data-bs-toggle="tooltip"
              title="Download Aadhar Card"
            >
              <KTIcon icon-name="fingerprint-scanning" icon-class="fs-1" />
            </a>
          </div>
          <div v-else class="d-flex flex-lg-row"></div>
          <!--end::Menu FLex-->
        </template>

        <template v-slot:pan="{ row: employee }">
          <!--begin::Menu Flex-->
          <div class="d-flex flex-lg-row" v-if="employee.meta.pan">
            <a
              target="blank"
              v-bind:href="`https://api.zeptac.com/storage/company/${employee.company_id}/pan_cards/${employee.meta.pan}`"
              class="btn btn-icon btn-active-light-primary w-30px h-30px me-3"
              data-bs-toggle="tooltip"
              title="Download Pan Card"
            >
              <KTIcon icon-name="badge" icon-class="fs-1" />
            </a>
          </div>
          <div v-else class="d-flex flex-lg-row"></div>
          <!--end::Menu FLex-->
        </template>

        <template v-slot:actions="{ row: employee }">
          <!--begin::Menu Flex-->
          <div class="d-flex flex-lg-row my-3">
            <!--begin::Edit-->
            <router-link :to="`/employee/edit/${employee.id}`">
              <span
                class="btn btn-icon btn-active-light-primary w-30px h-30px me-3"
                data-bs-toggle="tooltip"
                title="View Employee"
              >
                <KTIcon icon-name="pencil" icon-class="fs-2" />
              </span>
            </router-link>
            <!--end::Edit-->

            <!--begin::Delete-->
            <span
              @click="deleteItem(employee.id, false)"
              class="btn btn-icon btn-active-light-danger w-30px h-30px me-3"
              data-bs-toggle="tooltip"
              title="Delete Employee"
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
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref, computed } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
// import ExportCustomerModal from "@/components/modals/forms/ExportCustomerModal.vue";
// import AddCustomerModal from "@/components/modals/forms/AddCustomerModal.vue";
import type { IEmployee } from "@/core/model/employee";
import arraySort from "array-sort";
import ApiService from "@/core/services/ApiService";
import { get_role } from "@/core/config/PermissionsRolesConfig";
import moment from "moment";
import {
  deleteEmployee,
  getEmployees,
  getEmployee,
  EmployeeSearch,
} from "@/stores/api";
import { blank64 } from "../../admin/users/blank";
import Swal from "sweetalert2";
import { Identifier } from "@/core/config/WhichUserConfig";
import EmployeeExportModal from "./EmployeeExportModal.vue";

export default defineComponent({
  name: "employee-list",
  components: {
    Datatable,
    EmployeeExportModal,
  },
  setup() {
    const loading = ref(true);
    const identifier = Identifier;

    const tableHeader = ref([
      {
        columnName: "Name",
        columnLabel: "profile",
        sortEnabled: true,
        columnWidth: 155,
      },
      {
        columnName: "Mobile",
        columnLabel: "mobile",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Role",
        columnLabel: "role",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Main Company",
        columnLabel: "company_name",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "History Card",
        columnLabel: "history_card",
        sortEnabled: false,
        columnWidth: 75,
      },
      {
        columnName: "Photo",
        columnLabel: "profile_pic",
        sortEnabled: false,
        columnWidth: 75,
      },
      {
        columnName: "Aadhar",
        columnLabel: "adhar",
        sortEnabled: false,
        columnWidth: 75,
      },
      {
        columnName: "Pan",
        columnLabel: "pan",
        sortEnabled: false,
        columnWidth: 75,
      },
      {
        columnName: "Actions",
        columnLabel: "actions",
        sortEnabled: false,
        columnWidth: 75,
      },
    ]);

    const selectedIds = ref<Array<number>>([]);
    const tableData = ref<Array<IEmployee>>([]);
    const initvalues = ref<Array<IEmployee>>([]);

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

    // functions
    // get_employees
    const employee_listing = async () => {
      try {
        ApiService.setHeader();
        const response = await getEmployees(
          `page=${page.value}&limit=${limit.value}`
        );
        if (response.success) {
          more.value = response.result.next_page_url != null ? true : false;
          tableData.value = response.result.data.map(
            ({ id, role_id, meta, ...rest }) => ({
              id: id,
              role_id: get_role(role_id),
              meta: { ...meta },
              ...rest,
            })
          );
          //console.log(tableData.value);
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
    };

    // more
    const PagePointer = async (page) => {
      // ? Truncate the tableData
      //console.log(limit.value);
      loading.value = true;
      try {
        while (tableData.value.length != 0) tableData.value.pop();
        while (initvalues.value.length != 0) initvalues.value.pop();

        ApiService.setHeader();
        const response = await getEmployees(
          `page=${page}&limit=${limit.value}`
        );

        if (response.success) {
          more.value = response.result.next_page_url != null ? true : false;
          tableData.value = response.result.data.map(
            ({ id, role_id, meta, ...rest }) => ({
              id: id,
              role_id: get_role(role_id),
              meta: { ...meta },
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

        ApiService.setHeader();
        const response = await getEmployees(
          `page=${page.value}&limit=${limit}`
        );

        if (response.success) {
          more.value = response.result.next_page_url != null ? true : false;
          tableData.value = response.result.data.map(
            ({ id, role_id, meta, ...rest }) => ({
              id: id,
              role_id: get_role(role_id),
              meta: { ...meta },
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
      // console.log(more.value);
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
      // If the identifier is 'Admin', include the 'Company Name' column; otherwise, exclude it
      return identifier.value === "Admin"
        ? tableHeader.value
        : tableHeader.value.filter(
            (column) => column.columnLabel !== "company_name"
          );
    });

    onMounted(async () => {
      //console.log("done");
      await employee_listing();
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
          const response = await deleteEmployee(id);
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
        let results: Array<IEmployee> = [];
        for (let j = 0; j < tableData.value.length; j++) {
          if (searchingFunc(tableData.value[j], search.value)) {
            results.push(tableData.value[j]);
          }
        }
        tableData.value.splice(0, tableData.value.length, ...results);
        if (tableData.value.length == 0 && search.value.length != 0) {
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
        await employee_listing();
      }
    };

    async function SearchMore() {
      // Your API call logic here
      try {
        ApiService.setHeader();
        const response = await EmployeeSearch(search.value);

        if (response.success) {
          more.value = response.result.next_page_url != null ? true : false;
          tableData.value = response.result.data.map(
            ({ id, role_id, meta, ...rest }) => ({
              id: id,
              role_id: get_role(role_id),
              meta: { ...meta },
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

    const downloadHistoryCard = async (id: any) => {
      alert("Employee History Card");
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
      loading,
      blank64,
      NextPage,
      PrevPage,
      page,
      limit,
      PageLimitPoiner,
      Limits,
      identifier,
      filteredTableHeader,
      downloadHistoryCard,
    };
  },
});
</script>
