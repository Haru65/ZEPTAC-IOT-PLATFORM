<template>
  <InstrumentExportModal></InstrumentExportModal>
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
            placeholder="Search instrument name"
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
            data-bs-target="#kt_instrument_export_modal"
          >
            <KTIcon icon-name="exit-up" icon-class="fs-2" />
            Export
          </button>
          <!--end::Export-->
          <!--begin::Add customer-->
          <router-link to="./add" class="btn btn-primary">
            <KTIcon icon-name="plus" icon-class="fs-2" />
            Add Instrument
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

        <template v-slot:id="{ row: instruments }">
          {{ instruments.id }}
        </template>
        <template v-slot:model_no="{ row: instruments }">
          {{ instruments.model_no }}
        </template>
        <template v-slot:serial_no="{ row: instruments }">
          {{ instruments.serial_no }}
        </template>
        <template v-slot:name="{ row: instruments }">
          {{ instruments.name }}
        </template>
        <!-- defualt data -->
        <template v-slot:make="{ row: instruments }">
          {{ instruments.make }}
        </template>
        <template v-slot:availability="{ row: instruments }">
          <span
            v-if="instruments.availability == 1"
            class="badge py-3 px-4 fs-7 badge-light-success"
            >Available</span
          >
          <span
            v-if="instruments.availability == 0"
            class="badge py-3 px-4 fs-7 badge-light-danger"
            >Not Available</span
          >
        </template>

        <template v-slot:calibration_certificate="{ row: instruments }">
          <!--begin::Menu Flex-->
          <div class="d-flex flex-lg-row">
            <a
              target="blank"
              v-bind:href="`https://api.zeptac.com/storage/company/${instruments.company_id}/instruments/${instruments.calibration_certificate}`"
              v-tooltip
              title="Download Calibration Certificate"
              class="btn btn-icon btn-active-light-primary w-30px h-30px me-3"
            >
              <KTIcon icon-name="file-down" icon-class="fs-2" />
            </a>
          </div>
          <!--end::Menu FLex-->
        </template>

        <template v-slot:datasheet="{ row: instruments }">
          <!--begin::Menu Flex-->
          <div class="d-flex flex-lg-row">
            <a
              target="blank"
              v-bind:href="`https://api.zeptac.com/storage/company/${instruments.company_id}/instruments/${instruments.datasheet}`"
              v-tooltip
              title="Download Datasheet"
              class="btn btn-icon btn-active-light-primary w-30px h-30px me-3"
            >
              <KTIcon icon-name="file-down" icon-class="fs-2" />
            </a>
          </div>
          <!--end::Menu FLex-->
        </template>

        <template v-slot:traceability="{ row: instruments }">
          <!--begin::Menu Flex-->
          <div class="d-flex flex-lg-row">
            <a
              target="blank"
              v-bind:href="`https://api.zeptac.com/storage/company/${instruments.company_id}/instruments/${instruments.traceability}`"
              class="btn btn-icon btn-active-light-primary w-30px h-30px me-3"
              v-tooltip
              title="Download Traceability"
            >
              <KTIcon icon-name="file-down" icon-class="fs-2" />
            </a>
          </div>
          <!--end::Menu FLex-->
        </template>
        <template v-slot:approval_status="{ row: instruments }">
          <span
            v-if="instruments.approval_status == 1"
            class="badge py-3 px-4 fs-7 badge-light-primary"
            >{{ GetApprovalStatus(instruments.approval_status) }}</span
          >
          <span
            v-if="instruments.approval_status == 2"
            class="badge py-3 px-4 fs-7 badge-light-danger"
            >{{ GetApprovalStatus(instruments.approval_status) }}</span
          >
          <span
            v-if="instruments.approval_status == 3"
            class="badge py-3 px-4 fs-7 badge-light-success"
            >{{ GetApprovalStatus(instruments.approval_status) }}</span
          >
        </template>

        <template v-slot:approval_button="{ row: instruments }">
          <button
            type="button"
            class="btn btn-sm btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_1"
            @click="fillItemData(instruments)"
          >
            Open
          </button>
        </template>
        <template v-slot:actions="{ row: instruments }">
          <!--begin::Menu Flex-->
          <div class="d-flex flex-lg-row">
            <span
              class="btn btn-icon btn-active-light-success w-30px h-30px me-3"
              v-tooltip
              title="Download Instrument"
              @click="downloadHistoryCard(instruments.id)"
            >
              <KTIcon icon-name="file-down" icon-class="fs-2" />
            </span>

            <!--begin::Edit-->
            <router-link :to="`/instruments/edit/${instruments.id}`">
              <span
                class="btn btn-icon btn-active-light-primary w-30px h-30px me-3"
                v-tooltip
                title="View Instrument"
              >
                <KTIcon icon-name="pencil" icon-class="fs-2" />
              </span>
            </router-link>
            <!--end::Edit-->

            <span
              class="btn btn-icon btn-active-light-danger w-30px h-30px me-3"
              v-tooltip
              title="Delete Instrument"
              @click="deleteItem(instruments.id, false)"
            >
              <KTIcon icon-name="trash" icon-class="fs-2" />
            </span>
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
import { computed, defineComponent, onMounted, ref } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable/table-partials/models";
import type { IInstrument } from "@/core/model/instruments";
import { instrumentGen } from "@/core/config/InstrumentHCard";
import {
  getAllInstrument,
  deleteInstrument,
  InstrumentSearch,
  getInstrumentInfo,
  getCompanyLogo,
} from "@/stores/api";
import { ApprovalStatus, GetApprovalStatus } from "@/core/model/global";
import { hideModal } from "@/core/helpers/dom";
import ApprovalModal from "./ApprovalModal.vue";
import InstrumentExportModal from "./InstrumentExportModal.vue";
import { useAuthStore } from "@/stores/auth";
import { Identifier } from "@/core/config/WhichUserConfig";
import arraySort from "array-sort";
import moment from "moment";
import Swal from "sweetalert2";
import { getAssetPath } from "@/core/helpers/assets";

interface MDetails {
  periodicity: string;
  m_date1: string;
  m_date2: string;
  m_details: string;
  any_repair_detail: string;
  maintenance_done_by: string;
}

interface DownloadData {
  id: string;
  instrument_id: string;
  name: string;
  description: string;
  availability: string;
  model_no: string;
  serial_no: string;
  make: string;

  calibration_date: string;
  calibration_due_date: string;
  vendor_name: string;

  accessories_list: Array<string>;
  datasheet: string;
  calibration_certificate: string;
  traceability: string;

  maintenance_plan: boolean;

  maintenance_history: Array<MDetails>;
  intermediate_check_plan: string[];

  approval_status: string;

  company_id: string;
  created_by: string;
  updated_by: string;
  is_active: string;
}

export default defineComponent({
  name: "instrument-listing",
  components: {
    Datatable,
    ApprovalModal,
    InstrumentExportModal,
  },
  setup() {
    const auth = useAuthStore();
    const User = auth.GetUser();
    const identifier = Identifier;

    const tableHeader = ref([
      {
        columnName: "Model No",
        columnLabel: "model_no",
        sortEnabled: true,
        columnWidth: 80,
      },
      {
        columnName: "Serial No",
        columnLabel: "serial_no",
        sortEnabled: true,
        columnWidth: 80,
      },
      {
        columnName: "Instrument Name",
        columnLabel: "name",
        sortEnabled: true,
        columnWidth: 75,
      },
      {
        columnName: "Make",
        columnLabel: "make",
        sortEnabled: true,
        columnWidth: 125,
      },
      {
        columnName: "Availability",
        columnLabel: "availability",
        sortEnabled: true,
        columnWidth: 80,
      },
      {
        columnName: "Calibration Validity",
        columnLabel: "calibration_certificate",
        sortEnabled: false,
        columnWidth: 85,
      },
      {
        columnName: "Datasheet",
        columnLabel: "datasheet",
        sortEnabled: false,
        columnWidth: 75,
      },
      {
        columnName: "Traceability",
        columnLabel: "traceability",
        sortEnabled: false,
        columnWidth: 75,
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

        const response = await getAllInstrument(
          `page=${page}&limit=${limit.value}`
        );

        if (response.success) {
          more.value = response.result.next_page_url != null ? true : false;
          tableData.value = response.result.data.map(({ id, ...rest }) => ({
            id: id,
            ...rest,
          }));
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
      loading.value = true;
      try {
        while (tableData.value.length != 0) tableData.value.pop();
        while (initvalues.value.length != 0) initvalues.value.pop();

        const response = await getAllInstrument(
          `page=${page.value}&limit=${limit}`
        );
        if (response.success) {
          more.value = response.result.next_page_url != null ? true : false;
          tableData.value = response.result.data.map(({ id, ...rest }) => ({
            id: id,
            ...rest,
          }));
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

    const selectedIds = ref<Array<number>>([]);

    const tableData = ref<Array<IInstrument>>([]);

    const initvalues = ref<Array<IInstrument>>([]);

    async function instrument_listing(): Promise<void> {
      try {
        const response = await getAllInstrument(
          `page=${page.value}&limit=${limit.value}`
        );
        if (response.success) {
          tableData.value = response.result.data.map(({ id, ...rest }) => ({
            id: id,
            ...rest,
          }));

          more.value = response.result.next_page_url != null ? true : false;
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

    const filteredTableHeader = computed(() => {
      const isAdmin = identifier.value === "Admin";
      const isCompanyAdmin = identifier.value === "Company-Admin";
      const isComExec = identifier.value === "Commercial-Executive";

      if (isAdmin || isCompanyAdmin || isComExec) {
        // If the identifier is 'Admin' or 'Company-Admin', include the 'approval_button' column
        return tableHeader.value;
      } else {
        // Otherwise, exclude the 'approval_button' column
        return tableHeader.value.filter(
          (column) => column.columnLabel !== "approval_button"
        );
      }
    });

    onMounted(async () => {
      await instrument_listing();
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
          const response = await deleteInstrument(id);
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
    // ? debounce timer
    let debounceTimer;

    const searchItems = async () => {
      console.log(search.value);
      tableData.value.splice(0, tableData.value.length, ...initvalues.value);
      if (search.value.length != 0) {
        let results: Array<IInstrument> = [];
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
          }, 1500);
        }
      } else {
        page.value = 1;
        while (tableData.value.length != 0) tableData.value.pop();
        while (initvalues.value.length != 0) initvalues.value.pop();
        await instrument_listing();
      }
    };

    async function SearchMore() {
      // Your API call logic here
      try {
        const response = await InstrumentSearch(search.value);

        if (response.success) {
          more.value = response.result.next_page_url != null ? true : false;
          tableData.value = response.result.data.map(({ id, ...rest }) => ({
            id: id,
            ...rest,
          }));
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
      console.log(obj);
      for (let key in obj) {
        if (
          !Number.isInteger(obj[key]) &&
          !(typeof obj[key] === "object") &&
          typeof obj[key] === "string" // Add type check here
        ) {
          if (obj[key].indexOf(value) !== -1) {
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

    function downloadFileObject(base64String, pdfName) {
      const linkSource = base64String;
      const downloadLink = document.createElement("a");
      const fileName = pdfName + ".pdf";
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    }

    // NEED TO COMPLETE
    const downloadDocument = async (
      companyId: any,
      file: string,
      pdfName: string
    ) => {
      try {
        if (file != "") {
          const linkSource = `https://api.zeptac.com/storage/company/${companyId}/instruments/${file}`;
          const downloadLink = document.createElement("a");
          downloadLink.href = linkSource;
          downloadLink.download = `https://api.zeptac.com/storage/company/${companyId}/instruments/${file}`;
          downloadLink.click();
        } else {
          alert("Empty File");
        }
      } catch (error) {
        console.error("Error downloading PDF:", error);
      }
    };

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

    const instrumentInfo = ref<DownloadData>({
      id: "",
      instrument_id: "",
      name: "",
      description: "",
      availability: "",
      model_no: "",
      serial_no: "",
      make: "",
      calibration_date: "",
      calibration_due_date: "",
      vendor_name: "",
      accessories_list: [],
      datasheet: "",
      calibration_certificate: "",
      traceability: "",
      maintenance_plan: false,

      maintenance_history: [],
      intermediate_check_plan: [],

      approval_status: "",
      company_id: "",
      created_by: "",
      updated_by: "",
      is_active: "",
    });

    const downloadHistoryCard = async (id) => {
      let timerInterval;

      try {
        // Show initial loading Swal with generic progress messages
        Swal.fire({
          title: "Downloading History Card",
          html: `<div class="swal-animation">
        <p class="swal-text">Please wait...</p>
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
        const res = await getInstrumentInfo(id);
        if (res?.success != false) {
          instrumentInfo.value = { ...res.result };
          instrumentInfo.value.accessories_list =
            JSON.parse(res.result.accessories_list) || [];
          instrumentInfo.value.maintenance_history =
            JSON.parse(res.result.maintenance_history) || [];
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

          companyInfo.value.address = res2.result.address || "";
          companyInfo.value.city = res2.result.city || "";
          companyInfo.value.pincode = res2.result.pincode || "";
          companyInfo.value.state = res2.result.state || "";
          companyInfo.value.country = res2.result.country || "";
        } else {
          showErrorAlert("Error", res2.message || "Error Occured");
          return;
        }
        // Update Swal message for PDF generation
        Swal.update({
          title: "Generating PDF",
          html: `<div class="swal-animation">
        <p class="swal-text">Please wait...</p>
        <div class="swal-progress">
          <div class="swal-progress-bar"></div>
        </div>
      </div>`,
        });

        // Simulate delay for PDF generation (replace with actual function)
        const pdfName = `instrument`;

        await instrumentGen(id, pdfName, instrumentInfo, companyInfo);

        // Close Swal on success
        Swal.fire({
          title: "Download Complete",
          text: "Instrument History Card PDF generated successfully",
          icon: "success",
          timer: 2000, // Show success message for 2 seconds
          timerProgressBar: true,
          allowOutsideClick: true,
        });
      } catch (error) {
        console.error("Error downloading History Card:", error);

        // Close Swal on success
        Swal.fire({
          title: "Error Complete",
          text: "Failed to download Worksheet",
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

    async function reLoadData() {
      await instrument_listing();
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
      loading,
      limit,
      PrevPage,
      NextPage,
      page,
      Limits,
      PageLimitPoiner,
      downloadDocument,
      downloadHistoryCard,
      filteredTableHeader,
      ApprovalStatus,
      GetApprovalStatus,
      itemData,
      fillItemData,
      identifier,
      reLoadData,
    };
  },
});
</script>

