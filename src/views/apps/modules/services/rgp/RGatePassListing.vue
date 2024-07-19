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
            placeholder="Search Gate Pass"
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
          <router-link to="./returnablegatepasses/add" class="btn btn-primary">
            <KTIcon icon-name="plus" icon-class="fs-2" />
            Add RGP
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
        <!-- img data -->

        <template v-slot:id="{ row: rgps }">
          {{ rgps.id }}
        </template>
        <template v-slot:rgp_no="{ row: rgps }">
          <span class="text-gray-600 text-hover-primary mb-1">
            {{ rgps.rgp_no }}
          </span>
        </template>
        <template v-slot:customer="{ row: rgps }">
          <span class="text-gray-600 text-hover-primary mb-1">
            {{ rgps?.customer?.company_name || "" }}
          </span>
        </template>
        <!-- defualt data -->
        <template v-slot:engineers="{ row: rgps }">
          {{ rgps.engineers }}
        </template>
        <template v-slot:instruments="{ row: rgps }">
          {{ rgps.instruments }}
        </template>
        <template v-slot:status="{ row: rgps }">
          <span
            v-if="rgps.status == 1"
            class="badge py-3 px-4 fs-7 badge-light-primary"
            >In Process</span
          >
          <span
            v-if="rgps.status == 2"
            class="badge py-3 px-4 fs-7 badge-light-success"
            >Completed</span
          >
        </template>
        <template v-slot:date="{ row: rgps }">
          {{ rgps.date }}
        </template>
        <template v-slot:duedate="{ row: rgps }">
          {{ rgps.duedate }}
        </template>

        <template v-slot:approval_status="{ row: rgps }">
          <span
            v-if="rgps.approval_status == 1"
            class="badge py-3 px-4 fs-7 badge-light-primary"
            >{{ GetApprovalStatus(rgps.approval_status) }}</span
          >
          <span
            v-if="rgps.approval_status == 2"
            class="badge py-3 px-4 fs-7 badge-light-danger"
            >{{ GetApprovalStatus(rgps.approval_status) }}</span
          >
          <span
            v-if="rgps.approval_status == 3"
            class="badge py-3 px-4 fs-7 badge-light-success"
            >{{ GetApprovalStatus(rgps.approval_status) }}</span
          >
        </template>

        <template v-slot:approval_button="{ row: rgps }">
          <button
            type="button"
            class="btn btn-sm btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_1"
            @click="fillItemData(rgps)"
          >
            Open
          </button>
        </template>

        <template v-slot:actions="{ row: rgps }">
          <div class="d-flex flex-lg-row">
            <span
              class="btn btn-icon btn-active-light-danger w-30px h-30px me-3"
              data-bs-toggle="tooltip"
              title="Download RGP"
              @click="downloadRGP(rgps.id)"
            >
              <KTIcon icon-name="file-down" icon-class="fs-2" />
            </span>
            <span
              class="btn btn-icon btn-active-light-danger w-30px h-30px me-3"
              data-bs-toggle="tooltip"
              title="Free Up Resources Taken"
              @click="ReleaseResources(rgps.id)"
            >
              <KTIcon icon-name="arrows-circle" icon-class="fs-2" />
            </span>
            <span
              class="btn btn-icon btn-active-light-danger w-30px h-30px me-3"
              data-bs-toggle="tooltip"
              title="Delete RGP"
              @click="deleteItem(rgps.id, false)"
            >
              <KTIcon icon-name="trash" icon-class="fs-2" />
            </span>
          </div>
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
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import type { IRGP } from "@/core/model/rgps";
import {
  getAllRGatePass,
  deleteRGatePass,
  getRGPInfo,
  gatePassSearch,
  getCompanyLogo,
  UpdateStatus,
} from "@/stores/api";
import { ApprovalStatus, GetApprovalStatus } from "@/core/model/global";
import { hideModal } from "@/core/helpers/dom";
import ApprovalModal from "./ApprovalModal.vue";
import { useAuthStore } from "@/stores/auth";
import { Identifier } from "@/core/config/WhichUserConfig";
import arraySort from "array-sort";
import { formatPrice } from "@/core/config/DataFormatter";
import { rgpGen } from "@/core/config/GatePassGenerator";
import moment from "moment";
import Swal from "sweetalert2";

interface Engineer {
  id: string;
  first_name: string;
  last_name: string;
  mobile: string;
}

interface Instrument {
  id: string;
  instrument_id: string;
  name: string;
  make: string;
  model_no: string;
  serial_no: string;
  calibration_date: string;
  calibration_due_date: string;
  accessories_list: [];
}

interface Data {
  id: string;
  name: string;
  company_name: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

interface Quotation {
  id: string;
  quotation_no: string;
  customer: Data;
  client: Data;
  clientx: Data;
}

interface DownloadData {
  id: string;
  rgp_no: string;
  date: string;
  duedate: string;
  quotation_id: string;
  instruments: string[];
  engineers: string[];
  Engineers: Array<Engineer>;
  Instruments: Array<Instrument>;
  quotation: Quotation;
  status: string;
  approval_status: string;
  company_id: string;
  created_by: string;
  updated_by: string;
  is_active: string;
}

export default defineComponent({
  name: "rgp_listing",
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
    const tableHeader = ref([
      {
        columnName: "RGP No.",
        columnLabel: "rgp_no",
        sortEnabled: true,
        columnWidth: 75,
      },
      {
        columnName: "Customer Name",
        columnLabel: "customer",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "No. of Engineers",
        columnLabel: "engineers",
        sortEnabled: true,
        columnWidth: 45,
      },
      {
        columnName: "No. of Instruments",
        columnLabel: "instruments",
        sortEnabled: true,
        columnWidth: 45,
      },
      {
        columnName: "Status",
        columnLabel: "status",
        sortEnabled: true,
        columnWidth: 80,
      },
      {
        columnName: "RGP Date",
        columnLabel: "date",
        sortEnabled: true,
        columnWidth: 125,
      },
      {
        columnName: "RGP Due Date",
        columnLabel: "duedate",
        sortEnabled: true,
        columnWidth: 125,
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
        columnWidth: 75,
      },
    ]);

    const itemData = ref({
      id: "",
      approval_status: "",
      new_status: "",
      company_id: "",
      updated_by: "",
    });

    interface RGP {
      rgp_no: string;
      quotation_id: string;
      company_id: string;
      date: string;
      duedate: string;
      engineers: string;
      instruments: string;
      status: string;
      created_by: string;
      updated_by: string;
      is_active: 1;
    }

    const loading = ref(true);

    // RGP Ref
    // const returnableGatePassDetails = ref<>

    const rgpDetails = ref<RGP>({
      rgp_no: "",
      date: "",
      duedate: "",
      engineers: "",
      instruments: "",
      status: "",
      quotation_id: "",
      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
      is_active: 1,
    });

    const selectedIds = ref<Array<number>>([]);

    const tableData = ref<Array<IRGP>>([]);

    const initvalues = ref<Array<IRGP>>([]);

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

    const PagePointer = async (page) => {
      // ? Truncate the tableData
      //console.log(limit.value);
      loading.value = true;
      try {
        while (tableData.value.length != 0) tableData.value.pop();
        while (initvalues.value.length != 0) initvalues.value.pop();

        const response = await getAllRGatePass(
          `page=${page}&limit=${limit.value}&year=${
            selectedYearCache.value
              ? selectedYearCache.value
              : financialYears.value[0]
          }`
        );

        more.value = response.result.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(
          ({
            id,
            rgp_no,
            customer,
            quotation_id,
            engineers,
            instruments,
            status,
            date,
            duedate,
            ...rest
          }) => ({
            id: id,
            rgp_no: rgp_no,
            customer: { ...customer },
            quotation_id: quotation_id,
            engineers: JSON.parse(engineers).length,
            instruments: JSON.parse(instruments).length,
            status: status,
            date,
            duedate,
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

        const response = await getAllRGatePass(
          `page=${page.value}&limit=${limit}&year=${
            selectedYearCache.value
              ? selectedYearCache.value
              : financialYears.value[0]
          }`
        );

        more.value = response.result.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(
          ({
            id,
            rgp_no,
            customer,
            quotation_id,
            engineers,
            instruments,
            status,
            date,
            duedate,
            ...rest
          }) => ({
            id: id,
            rgp_no: rgp_no,
            customer: { ...customer },
            quotation_id: quotation_id,
            engineers: JSON.parse(engineers).length,
            instruments: JSON.parse(instruments).length,
            status: status,
            date,
            duedate,
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

    // TODO::LISTING
    async function rgp_listing(): Promise<void> {
      try {
        const response = await getAllRGatePass(
          `page=${page.value}&limit=${limit.value}&year=${
            selectedYearCache.value
              ? selectedYearCache.value
              : financialYears.value[0]
          }`
        );
        console.log(response);
        tableData.value = response.result.data.map(
          ({
            id,
            rgp_no,
            customer,
            quotation_id,
            engineers,
            instruments,
            status,
            date,
            duedate,
            ...rest
          }) => ({
            id: id,
            rgp_no: rgp_no,
            customer: { ...customer },
            quotation_id: quotation_id,
            engineers: JSON.parse(engineers).length,
            instruments: JSON.parse(instruments).length,
            status: status,
            date,
            duedate,
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
        }, 100);
      }
    }

    const filteredTableHeader = computed(() => {
      const isAdmin = identifier.value === "Admin";
      const isCompanyAdmin = identifier.value === "Company-Admin";

      if (isAdmin || isCompanyAdmin) {
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
      await rgp_listing();
    }

    onMounted(async () => {
      // Save initial selected year to localStorage
      localStorage.setItem("selectedFinancialYear", selectedYearCache.value);

      await rgp_listing();
    });

    const companyInfo = ref({
      id: "",
      company_name: "",
      company_logo: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      logo_base64: "",
    });

    const rgpInfo = ref<DownloadData>({
      id: "",
      rgp_no: "",
      date: "",
      duedate: "",
      quotation_id: "",
      engineers: [],
      Engineers: [],
      instruments: [],
      Instruments: [],
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
        client: {
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
      status: "",
      approval_status: "",
      company_id: "",
      created_by: "",
      updated_by: "",
      is_active: "",
    });

    const downloadRGP = async (id) => {
      let timerInterval;

      try {
        // Show initial loading Swal with generic progress messages
        Swal.fire({
          title: "Downloading RGP...",
          html: `<div class="swal-animation">
        <p class="swal-text">Downloading RGP...</p>
        <div class="swal-progress">
          <div class="swal-progress-bar"></div>
        </div>
      </div>`,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        });

        // Fetch RGP information
        const res = await getRGPInfo(id);
        if (res?.success != false) {
          rgpInfo.value = { ...res.result };
        } else {
          showErrorAlert("Error", res.message || "Error Occured");
          return;
        }

        // Fetch company logo details
        const res2 = await getCompanyLogo(res.result.company_id);

        if (res2?.success != false) {
          // Update local reactive state (assuming Vue 3 Composition API syntax)
          companyInfo.value.id = res2.result.id;
          companyInfo.value.company_name = res2.result.company_name;
          companyInfo.value.company_logo = res2.result.company_logo
            ? res2.result.company_logo
            : "";
          companyInfo.value.logo_base64 = res2.result.logo_base64
            ? "data: image/png;base64," + res2.result.logo_base64
            : getAssetPath("media/avatars/default.png");
        } else {
          showErrorAlert("Error", res2.message || "Error Occured");
          return;
        }
        // Update Swal message for PDF generation
        Swal.update({
          title: "Generating PDF",
          html: `<div class="swal-animation">
        <p class="swal-text">Generating PDF...</p>
        <div class="swal-progress">
          <div class="swal-progress-bar"></div>
        </div>
      </div>`,
        });

        // Simulate delay for PDF generation (replace with actual function)
        await rgpGen(id, rgpInfo.value.rgp_no, rgpInfo, companyInfo);

        // Close Swal on success
        Swal.fire({
          title: "Download Complete",
          text: "RGP PDF generated successfully",
          icon: "success",
          timer: 2000, // Show success message for 2 seconds
          timerProgressBar: true,
          allowOutsideClick: true,
        });
      } catch (error) {
        console.error("Error downloading RGP:", error);

        // Close Swal on success
        Swal.fire({
          title: "Error Complete",
          text: "Failed to download RGP",
          icon: "error",
          timer: 2000,
          timerProgressBar: true,
          allowOutsideClick: true,
        });
      } finally {
        // Clear interval if still running
        clearInterval(timerInterval);
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

    const ReleaseResources = async (id: number) => {
      const releaseConfirmation = async () => {
        try {
          const result = await Swal.fire({
            title: "Are you sure?",
            text: "You want to free all engineers & cleanroom instruments which are included in the RGP.",
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

      const relaseResource = async (id: number) => {
        try {
          const response = await UpdateStatus(id);
          if (response?.success) {
            showSuccessAlert(
              "Success",
              response.message || `Resources are free`
            );
            return { success: true };
          } else {
            throw new Error(
              response?.message || `Failed to release the resources`
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

      const isConfirmed = await releaseConfirmation();
      if (isConfirmed) {
        return await relaseResource(id);
      } else {
        return { success: false };
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
          const response = await deleteRGatePass(id);
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
        let results: Array<IRGP> = [];
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
        await rgp_listing();
      }
    };

    async function SearchMore() {
      // Your API call logic here
      try {
        const response = await gatePassSearch(
          search.value,
          selectedYearCache.value
            ? selectedYearCache.value
            : financialYears.value[0]
        );

        more.value = response.result.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(
          ({
            id,
            rgp_no,
            customer,
            quotation_id,
            engineers,
            instruments,
            status,
            date,
            duedate,
            ...rest
          }) => ({
            id: id,
            rgp_no: rgp_no,
            customer: { ...customer },
            quotation_id: quotation_id,
            engineers: JSON.parse(engineers).length,
            instruments: JSON.parse(instruments).length,
            status: status,
            date,
            duedate,
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

    async function reLoadData() {
      await rgp_listing();
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
      formatPrice,
      loading,
      NextPage,
      PrevPage,
      page,
      limit,
      PageLimitPoiner,
      Limits,
      downloadRGP,
      rgpInfo,
      filteredTableHeader,
      ApprovalStatus,
      GetApprovalStatus,
      itemData,
      fillItemData,
      identifier,
      reLoadData,
      ReleaseResources,

      selectedYearCache,
      financialYears,
      handleChange,
    };
  },
});
</script>
  