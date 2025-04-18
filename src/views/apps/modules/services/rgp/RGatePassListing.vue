<template>
  <div class="card">
    <div
      class="card-header border-0 pt-4 pb-4 d-flex flex-column flex-md-row flex-wrap align-items-start align-items-md-center justify-content-between gap-3"
    >
      <!-- Left: Search and Year Filter -->
      <div
        class="d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-3 w-100 w-md-auto"
      >
        <!-- Search -->
        <div class="position-relative w-100 w-sm-auto">
          <KTIcon
            icon-name="magnifier"
            icon-class="fs-1 position-absolute top-50 translate-middle-y ms-3"
          />
          <input
            type="text"
            v-model="search"
            @input="searchItems()"
            class="form-control form-control-solid ps-10 w-100 w-sm-250px"
            placeholder="Search Gate Pass"
          />
        </div>

        <!-- Year Selector -->
        <div class="d-flex align-items-center w-100 w-sm-auto">
          <label class="me-2 fw-semibold text-gray-700">FY:</label>
          <el-select
            class="w-100 w-sm-150px"
            filterable
            size="small"
            placeholder="Select"
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
      </div>

      <!-- Right: Actions -->
      <div class="w-100 w-md-auto">
        <!-- No selection -->
        <div v-if="selectedIds.length === 0" class="d-flex gap-2 w-100">
          <button
            type="button"
            class="btn btn-sm btn-light-primary w-100 w-sm-auto"
            data-bs-toggle="modal"
            data-bs-target="#kt_customers_export_modal"
          >
            <KTIcon icon-name="exit-up" icon-class="fs-4" />
            Export
          </button>
          <router-link
            to="./returnablegatepasses/add"
            class="btn btn-sm btn-primary w-100 w-sm-auto"
          >
            <KTIcon icon-name="plus" icon-class="fs-4" />
            Add RGP
          </router-link>
        </div>

        <!-- With selection -->
        <div
          v-else
          class="d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-2 w-100"
        >
          <div class="fw-semibold small">{{ selectedIds.length }} Selected</div>
          <button
            type="button"
            class="btn btn-sm btn-danger w-100 w-sm-auto"
            @click="deleteFewItem()"
          >
            Delete Selected
          </button>
        </div>
      </div>
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
        :header="tableHeader"
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
          {{ rgps.rgp_no }}
        </template>
        <template v-slot:customer="{ row: rgps }">
          {{ rgps?.customer?.company_name || "" }}
        </template>
        <!-- defualt data -->
        <template v-slot:engineers="{ row: rgps }">
          <p class="text-center">
            {{ rgps.engineers }}
          </p>
        </template>
        <template v-slot:instruments="{ row: rgps }">
          <p class="text-center">
            {{ rgps.instruments }}
          </p>
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
          <!-- Status Badge Only -->
          <span
            class="badge py-3 px-4 fs-7"
            :class="{
              'badge-light-primary': rgps.approval_status == 1,
              'badge-light-danger': rgps.approval_status == 2,
              'badge-light-success': rgps.approval_status == 3,
            }"
          >
            {{ GetApprovalStatus(rgps.approval_status) }}
          </span>
        </template>

        <template v-slot:actions="{ row: rgps }">
          <!--begin::Menu Flex-->
          <div class="dropdown">
            <a
              href="#"
              class="text-gray-700 hover:text-gray-700 cursor-pointer transition-colors"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              @click.prevent
            >
              <KTIcon icon-name="dots-circle-vertical" icon-class="fs-2x" />
            </a>

            <!-- Action dropdown menu -->
            <ul
              class="dropdown-menu dropdown-menu-end min-w-150px py-2 shadow-sm"
            >
              <template
                v-if="identifier === 'Admin' || identifier === 'Company-Admin'"
              >
                <li>
                  <a
                    class="dropdown-item d-flex align-items-center gap-3 px-4 py-3 hover-bg-light-primary cursor-pointer"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_1"
                    @click="fillItemData(rgps)"
                  >
                    <KTIcon
                      icon-name="check-circle"
                      icon-class="fs-3 text-primary"
                    />
                    <span class="text-gray-700">Approve/Reject</span>
                  </a>
                </li>
              </template>

              <!-- Download Action -->
              <li>
                <a
                  class="dropdown-item d-flex align-items-center gap-3 px-4 py-3 hover-bg-light-primary cursor-pointer"
                  data-bs-toggle="tooltip"
                  title="Download Gate Pass"
                  @click.prevent="downloadRGP(rgps.id)"
                >
                  <KTIcon
                    icon-name="file-down"
                    icon-class="fs-3 text-primary"
                  />
                  <span class="text-gray-700">Download</span>
                </a>
              </li>

              <!-- Free Up Action -->
              <li>
                <a
                  class="dropdown-item d-flex align-items-center gap-3 px-4 py-3 hover-bg-light-warning cursor-pointer"
                  data-bs-toggle="tooltip"
                  title="Free Up Resources"
                  @click.prevent="ReleaseResources(rgps.id)"
                >
                  <KTIcon
                    icon-name="arrows-circle"
                    icon-class="fs-3 text-warning"
                  />
                  <span class="text-gray-700">Free Up</span>
                </a>
              </li>

              <!-- Delete RGP -->
              <li>
                <a
                  class="dropdown-item d-flex align-items-center gap-3 px-4 py-3 hover-bg-light-danger cursor-pointer"
                  data-bs-toggle="tooltip"
                  title="Delete Gate Pass"
                  @click.prevent="deleteItem(rgps.id, false)"
                >
                  <KTIcon icon-name="trash" icon-class="fs-3 text-danger" />
                  <span class="text-danger">Delete</span>
                </a>
              </li>
            </ul>
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
        columnWidth: 100,
      },
      {
        columnName: "Customer Name",
        columnLabel: "customer",
        sortEnabled: true,
        columnWidth: 125,
      },
      {
        columnName: "Engineers",
        columnLabel: "engineers",
        sortEnabled: true,
        columnWidth: 45,
      },
      {
        columnName: "Instruments",
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
        columnWidth: 90,
      },
      {
        columnName: "RGP Due Date",
        columnLabel: "duedate",
        sortEnabled: true,
        columnWidth: 90,
      },
      {
        columnName: "Approval",
        columnLabel: "approval_status",
        sortEnabled: false,
        columnWidth: 80,
      },
      {
        columnName: "Action",
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

        if (response.success) {
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
              date: moment(date).format("DD-MM-YY"),
              duedate: moment(duedate).format("DD-MM-YY"),
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

        const response = await getAllRGatePass(
          `page=${page.value}&limit=${limit}&year=${
            selectedYearCache.value
              ? selectedYearCache.value
              : financialYears.value[0]
          }`
        );

        if (response.success) {
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
              date: moment(date).format("DD-MM-YY"),
              duedate: moment(duedate).format("DD-MM-YY"),
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

        if (response.success) {
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
              date: moment(date).format("DD-MM-YY"),
              duedate: moment(duedate).format("DD-MM-YY"),
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
        }, 100);
      }
    }

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

        if (response.success) {
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
              date: moment(date).format("DD-MM-YY"),
              duedate: moment(duedate).format("DD-MM-YY"),
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
  