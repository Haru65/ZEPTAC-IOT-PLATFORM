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
            placeholder="Search Customers"
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
            data-bs-target="#kt_customers_export_modal"
          >
            <KTIcon icon-name="exit-up" icon-class="fs-2" />
            Export
          </button>
          <!--end::Export-->
          <!--begin::Add customer-->
          <router-link to="/customers/add" class="btn btn-primary">
            <KTIcon icon-name="plus" icon-class="fs-2" />
            Add Customer
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
        <template v-slot:id="{ row: customer }">
          {{ customer.id }}
        </template>
        <template v-slot:name="{ row: customer }">
          {{ customer.name }}
        </template>
        <!-- defualt data -->
        <template v-slot:email="{ row: customer }">
          <a
            v-bind:href="'mailto:' + customer.email"
            class="text-gray-600 text-hover-primary mb-1"
          >
            {{ customer.email }}
          </a>
        </template>
        <template v-slot:mobile="{ row: customer }">
          {{ customer.mobile }}
        </template>
        <template v-slot:company_name="{ row: customer }">
          {{ customer.company_name }}
        </template>
        <template
          v-slot:grant_access="{ row: customer }"
          v-if="identifier == 'Admin' || identifier == 'Company-Admin'"
        >
        <span
            v-if="customer.grant_access == true"
            class="badge py-3 px-4 fs-7 badge-light-success"
            >Yes</span
          >
          <span
            v-if="customer.grant_access == false"
            class="badge py-3 px-4 fs-7 badge-light-primary"
            >No</span
          >
          <span v-else></span>
        </template>
        <template v-slot:created_at="{ row: customer }">
          {{ customer.created_at }}
        </template>
        <template
          v-slot:company_details="{ row: customer }"
          v-if="identifier == 'Admin'"
        >
          {{ customer.company_details.company_name }}
        </template>
        <template v-slot:actions="{ row: customer }">
          <!--begin::Menu Flex-->
          <div class="d-flex flex-lg-row my-3">
            <div class="dropdown">
              <button
                type="button"
                class="btn btn-sm btn-secondary btn-icon-gray-900 btn-text-gray-900"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Action
              </button>
              <ul
                class="dropdown-menu dropdown-menu-start"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <router-link
                    class="dropdown-item btn"
                    data-toggle="tooltip"
                    title="Provide Login Access"
                    :to="`/customers/login/${customer.id}`"
                  >
                    <KTIcon icon-name="user-tick" icon-class="fs-2" />
                    Login Access</router-link
                  >
                </li>
                <li>
                  <span
                    class="dropdown-item btn"
                    data-toggle="tooltip"
                    title="Copy Service Request Link For Calibration"
                    @click="generateLink(customer.company_id, customer.id)"
                  >
                    <KTIcon icon-name="paper-clip" icon-class="fs-2" />
                    Calibration SRF
                  </span>
                </li>
                <li>
                  <span
                    class="dropdown-item btn"
                    data-toggle="tooltip"
                    title="Copy Service Request Link For Cleanroom"
                    @click="copySrfUrl(customer.company_id, customer.id)"
                  >
                    <KTIcon icon-name="paper-clip" icon-class="fs-2" />
                    Cleanroom SRF
                  </span>
                </li>
                <li>
                  <span
                    class="dropdown-item btn"
                    data-toggle="tooltip"
                    title="Copy Feedback Link"
                    @click="copyFeedbackUrl(customer.company_id, customer.id)"
                  >
                    <KTIcon icon-name="paper-clip" icon-class="fs-2" />
                    Feedback
                  </span>
                </li>
              </ul>
            </div>

            <!--begin::Edit-->
            <router-link :to="`/customers/edit/${customer.id}`">
              <span
                class="btn btn-icon btn-active-light-primary w-30px h-30px me-3"
                data-bs-toggle="tooltip"
                title="View Customer"
              >
                <KTIcon icon-name="pencil" icon-class="fs-2" />
              </span>
            </router-link>
            <!--end::Edit-->

            <!--begin::Delete-->
            <span
              @click="deleteItem(customer.id, false)"
              class="btn btn-icon btn-active-light-danger w-30px h-30px me-3"
              data-bs-toggle="tooltip"
              title="Delete Customer"
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
import { computed, defineComponent, onMounted, ref } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import type { ICustomers } from "@/core/model/customers";
import arraySort from "array-sort";
import ApiService from "@/core/services/ApiService";
import { get_role } from "@/core/config/PermissionsRolesConfig";
import moment from "moment";
import Swal from "sweetalert2";
import { Identifier } from "@/core/config/WhichUserConfig";
import {
  deleteCustomer,
  CustomerSearch,
  getCustomers,
  generateSrfLink,
} from "@/stores/api";
export default defineComponent({
  name: "customers-list",
  components: {
    Datatable,
  },
  setup() {
    const loading = ref(true);
    const identifier = Identifier;
    const tableHeader = ref([
      {
        columnName: "Name",
        columnLabel: "name",
        sortEnabled: true,
        columnWidth: 155,
      },
      {
        columnName: "Email",
        columnLabel: "email",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Mobile",
        columnLabel: "mobile",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Company Name",
        columnLabel: "company_name",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Login Access",
        columnLabel: "grant_access",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Created Date",
        columnLabel: "created_at",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Main Company",
        columnLabel: "company_details",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Actions",
        columnLabel: "actions",
        sortEnabled: false,
        columnWidth: 100,
      },
    ]);

    // functions
    // get users function
    async function customer_listing(): Promise<void> {
      try {
        ApiService.setHeader();
        const response = await getCustomers(
          `page=${page.value}&limit=${limit.value}`
        );
        // console.log(response);
        if (response.success) {
          more.value = response.result.next_page_url != null ? true : false;
          tableData.value = response.result.data.map(
            ({ id, created_at, company_details, ...rest }) => ({
              id,
              created_at: moment(created_at).format("DD-MM-YYYY"),
              company_details: { ...company_details },
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
      }
    }

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

    const selectedIds = ref<Array<number>>([]);
    const tableData = ref<Array<ICustomers>>([]);
    const initvalues = ref<Array<ICustomers>>([]);

    const PagePointer = async (page) => {
      // ? Truncate the tableData
      //console.log(limit.value);
      loading.value = true;
      try {
        while (tableData.value.length != 0) tableData.value.pop();
        while (initvalues.value.length != 0) initvalues.value.pop();

        const response = await getCustomers(
          `page=${page}&limit=${limit.value}`
        );

        if (response.success) {
          more.value = response.result.next_page_url != null ? true : false;
          tableData.value = response.result.data.map(
            ({ id, created_at, company_details, ...rest }) => ({
              id,
              created_at: moment(created_at).format("DD-MM-YYYY"),
              company_details: { ...company_details },
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

        const response = await getCustomers(
          `page=${page.value}&limit=${limit}`
        );

        if (response.success) {
          more.value = response.result.next_page_url != null ? true : false;
          tableData.value = response.result.data.map(
            ({ id, created_at, company_details, ...rest }) => ({
              id,
              created_at: moment(created_at).format("DD-MM-YYYY"),
              company_details: { ...company_details },
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
      return identifier.value === "Admin"
        ? tableHeader.value
        : tableHeader.value.filter(
            (column) => column.columnLabel !== "company_details"
          );
    });

    onMounted(async () => {
      await customer_listing();
      setTimeout(() => {
        loading.value = false;
      }, 250);
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
          const response = await deleteCustomer(id);
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
        let results: Array<ICustomers> = [];
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
        await customer_listing();
      }
    };

    async function SearchMore() {
      // Your API call logic here
      try {
        const response = await CustomerSearch(search.value);

        if (response.success) {
          more.value = response.result.next_page_url != null ? true : false;
          tableData.value = response.result.data.map(
            ({ id, created_at, company_details, ...rest }) => ({
              id,
              created_at: moment(created_at).format("DD-MM-YYYY"),
              company_details: { ...company_details },
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

    /** LOGIC TO HANDLE LINK GENERATION::START*/

    const generateLink = async (companyId, customerId) => {
      try {
        const response = await generateSrfLink({
          customer_id: customerId,
          company_id: companyId,
          slug_name: "srf-calibration",
        });

        if (response.success == true) {
          alert("Service Request Link generated successfully!");
          await copySrfCalibrationUrl(
            response.result.company_id,
            response.result.customer_id,
            response.result.service_request_id,
            response.result.token
          );
        }
      } catch (error) {
        console.error("Error generating link:", error);
      }
    };

    // This SRF is for NON-NABL Report (LAF, BSF)
    const copySrfCalibrationUrl = async (
      companyId,
      customerId,
      srfId,
      tokenId
    ) => {
      const srf_calibration_url = `https://app.zeptac.com/srf_calibration/${companyId}/${customerId}/${srfId}/${tokenId}`;
      // const srf_calibration_url = `http://localhost:5173/srf_calibration/${companyId}/${customerId}/${srfId}/${tokenId}`;

      navigator.clipboard
        .writeText(srf_calibration_url)
        .then(() => {
          console.log(
            "SRF URL for calibration copied to clipboard:",
            srf_calibration_url
          );
          alert(
            `SRF URL for calibration copied to clipboard: ${srf_calibration_url}`
          );
          // You can show a success message or perform any other action here
        })
        .catch((error) => {
          console.error("Error copying URL to clipboard:", error);
          // Handle error if copying fails
        });
    };

    /** LOGIC TO HANDLE LINK GENERATION::END*/

    // This SRF is for NON-NABL Report (LAF, BSF)
    const copySrfUrl = (companyId, customerId) => {
      const srf_url = `https://app.zeptac.com/srf/${companyId}/${customerId}`;
      // const url = `http://localhost:5173/srf/${companyId}/${customerId}`;
      navigator.clipboard
        .writeText(srf_url)
        .then(() => {
          console.log("SRF URL copied to clipboard:", srf_url);
          alert(`SRF URL copied to clipboard: ${srf_url}`);
          // You can show a success message or perform any other action here
        })
        .catch((error) => {
          console.error("Error copying URL to clipboard:", error);
          // Handle error if copying fails
        });
    };

    const copyFeedbackUrl = (companyId, customerId) => {
      const feedback_url = `https://app.zeptac.com/feedbacks/${companyId}/${customerId}`;
      // const url = `http://localhost:5173/feedbacks/${companyId}/${customerId}`;
      navigator.clipboard
        .writeText(feedback_url)
        .then(() => {
          console.log("Feedback URL copied to clipboard:", feedback_url);
          alert(`SRF URL copied to clipboard: ${feedback_url}`);
          // You can show a success message or perform any other action here
        })
        .catch((error) => {
          console.error("Error copying URL to clipboard:", error);
          // Handle error if copying fails
        });
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
      NextPage,
      PrevPage,
      page,
      limit,
      PageLimitPoiner,
      Limits,
      copySrfUrl,
      copyFeedbackUrl,
      copySrfCalibrationUrl,
      identifier,
      filteredTableHeader,

      generateLink,
    };
  },
});
</script>
