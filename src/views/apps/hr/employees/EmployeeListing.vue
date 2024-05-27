<template>
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
            class="btn btn-light-primary me-3"
            data-bs-toggle="modal"
            data-bs-target="#kt_Employee_export_modal"
          >
            <KTIcon icon-name="exit-up" icon-class="fs-2" />
            Export
          </button>
          <!--end::Export-->
          <!--begin::Add customer-->
          <router-link to="./add" class="btn btn-primary">
            <KTIcon icon-name="plus" icon-class="fs-2" />
            Add Employee
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

        <template v-slot:h_id="{ row: employee }">
          <!--begin::Menu Flex-->
          <div class="d-flex flex-lg-row">
            <span
              data-toggle="tooltip"
              title="Download Employee History Card"
              class="border rounded badge py-3 px-4 fs-7 badge-light-primary text-hover-success cursor-pointer"
              @click="downloadHistoryCard(employee.id)"
              >⤓ History Card
            </span>
          </div>
          <!--end::Menu FLex-->
        </template>

        <template v-slot:a_id="{ row: employee }">
          <!--begin::Menu Flex-->
          <div class="d-flex flex-lg-row">
            <span
              data-toggle="tooltip"
              title="Download Aadhar Card"
              class="border rounded badge py-3 px-4 fs-7 badge-light-primary text-hover-success cursor-pointer"
              @click="downloadDocument(employee.id, 'aadhar_card')"
              >⤓ Aadhar Card
            </span>
          </div>
          <!--end::Menu FLex-->
        </template>

        <template v-slot:p_id="{ row: employee }">
          <!--begin::Menu Flex-->
          <div class="d-flex flex-lg-row">
            <span
              data-toggle="tooltip"
              title="Download Photo"
              class="border rounded badge py-3 px-4 fs-7 badge-light-primary text-hover-success cursor-pointer"
              @click="downloadPhoto(employee.id)"
              >⤓ Photo
            </span>
          </div>
          <!--end::Menu FLex-->
        </template>

        <template v-slot:actions="{ row: employee }">
          <!--begin::Menu Flex-->
          <div class="d-flex flex-lg-row">
            <span class="menu-link px-3">
              <router-link :to="`/employee/edit/${employee.id}`">
                <i
                  class="las la-edit text-gray-600 text-hover-primary mb-1 fs-1"
                ></i>
              </router-link>
            </span>
            <span>
              <i
                @click="deleteItem(employee.id, false)"
                class="las la-minus-circle text-gray-600 text-hover-danger mb-1 fs-2"
              ></i>
            </span>
          </div>
          <!--end::Menu FLex-->
          <!--end::Menu-->
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

export default defineComponent({
  name: "employee-list",
  components: {
    Datatable,
    // ExportCustomerModal,
    // AddCustomerModal,
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
        columnLabel: "h_id",
        sortEnabled: false,
        columnWidth: 75,
      },
      {
        columnName: "Aadhar Card",
        columnLabel: "a_id",
        sortEnabled: false,
        columnWidth: 75,
      },
      {
        columnName: "Photo",
        columnLabel: "p_id",
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

        more.value = response.result.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(
          ({ id, role_id, ...rest }) => ({
            id: id,
            role_id: get_role(role_id),
            h_id: id,
            a_id: id,
            p_id: id,
            ...rest,
          })
        );
        //console.log(tableData.value);
        initvalues.value.splice(0, tableData.value.length, ...tableData.value);
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

        more.value = response.result.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(
          ({ id, role_id, ...rest }) => ({
            id: id,
            role_id: get_role(role_id),
            h_id: id,
            a_id: id,
            p_id: id,
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
        const response = await getEmployees(
          `page=${page.value}&limit=${limit}`
        );

        more.value = response.result.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(
          ({ id, role_id, ...rest }) => ({
            id: id,
            role_id: get_role(role_id),
            h_id: id,
            a_id: id,
            p_id: id,
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

        more.value = response.result.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(
          ({ id, role_id, ...rest }) => ({
            id: id,
            role_id: get_role(role_id),
            h_id: id,
            a_id: id,
            p_id: id,
            ...rest,
          })
        );
        initvalues.value.splice(0, tableData.value.length, ...tableData.value);
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

    function downloadFileObject(base64String, nameOfFile, fExtension) {
      const linkSource = base64String;
      const downloadLink = document.createElement("a");
      const fileName = nameOfFile + fExtension;
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    }

    const downloadDocument = async (id: any, pdfName: string) => {
      try {
        const res = await getEmployee(id);

        const { first_name, last_name, meta } = res;

        const aadhar_card = meta?.adhar;
        if (!aadhar_card) {
          alert("User don't have this document.");
          return;
        }

        let base64String = "";
        if (pdfName === "aadhar_card") {
          base64String = aadhar_card.replace(
            /^data:application\/\pdf+;base64,/,
            ""
          );
        }

        // check whether data starts with JVB, JVB is a prefix for pdf files

        if (base64String.startsWith("JVB")) {
          base64String = "data:application/pdf;base64," + base64String;
          downloadFileObject(
            base64String,
            first_name + "_" + last_name + "_" + pdfName,
            ".pdf"
          );
        } else if (base64String.startsWith("data:application/pdf;base64")) {
          downloadFileObject(
            base64String,
            first_name + "_" + last_name + "_" + pdfName,
            ".pdf"
          );
        } else {
          alert("Not a valid Base64 PDF string. Please check");
        }
      } catch (error) {
        console.error("Error downloading Pdf:", error);
      }
    };

    const downloadPhoto = async (id: any) => {
      try {
        const res = await getEmployee(id);

        const { first_name, last_name, meta } = res;

        const userPhoto = res.meta?.profile_pic_data
          ? "data:image/png;base64," + res.meta?.profile_pic_data
          : "data:image/png;base64," + blank64;

        downloadFileObject(
          userPhoto,
          `${first_name}_${last_name}_photo`,
          ".png"
        );
      } catch (error) {
        console.error("Error downloading Photo:", error);
      }
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
      downloadDocument,
      downloadHistoryCard,
      downloadPhoto,
    };
  },
});
</script>
