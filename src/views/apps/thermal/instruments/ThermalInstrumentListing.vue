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
            placeholder="Search by instrument serial number"
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
          <!--begin::Import-->
          <button
            type="button"
            id="kt-menu-filter-button"
            class="btn btn-md btn-icon btn-color-success btn-active-light-success me-3"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_thermal_instrument"
          >
            <KTIcon icon-name="add-item" icon-class="fs-1" />
          </button>

          <ThermalImportModal></ThermalImportModal>
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
          <router-link to="/thermalinstrument/add" class="btn btn-primary">
            <KTIcon icon-name="plus" icon-class="fs-2" />
            Thermal Instrument
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

        <template v-slot:instrument_id="{ row: thermal_instruments }">
          {{ thermal_instruments.instrument_id }}
        </template>
        <template v-slot:name="{ row: thermal_instruments }">
          {{ thermal_instruments.name }}
        </template>
        <template v-slot:model_no="{ row: thermal_instruments }">
          {{ thermal_instruments.model_no }}
        </template>
        <template v-slot:ranges="{ row: thermal_instruments }">
          {{ thermal_instruments.ranges }}
        </template>
        <template v-slot:accuracy="{ row: thermal_instruments }">
          {{ thermal_instruments.accuracy }}
        </template>
        <template v-slot:serial_no="{ row: thermal_instruments }">
          {{ thermal_instruments.serial_no }}
        </template>
        <!-- defualt data -->
        <template v-slot:make="{ row: thermal_instruments }">
          {{ thermal_instruments.make }}
        </template>
        <template v-slot:calibration_date="{ row: thermal_instruments }">
          {{ thermal_instruments.calibration_date }}
        </template>
        <template v-slot:calibration_due_date="{ row: thermal_instruments }">
          {{ thermal_instruments.calibration_due_date }}
        </template>
        <template v-slot:availability="{ row: thermal_instruments }">
          <span
            v-if="thermal_instruments.availability == 1"
            class="badge py-3 px-4 fs-7 badge-light-success"
            >Available</span
          >
          <span
            v-if="thermal_instruments.availability == 0"
            class="badge py-3 px-4 fs-7 badge-light-danger"
            >Not Available</span
          >
        </template>

        <template v-slot:actions="{ row: thermal_instruments }">
          <!--begin::Menu Flex-->
          <div class="d-flex flex-lg-row">
            <DuplicateInstrumentModal
              :key="thermal_instruments.id"
              :instrumentId="thermal_instruments.id"
              :companyId="thermal_instruments.company_id"
              :heading="thermal_instruments.name"
              @handleDuplicate="HandleDuplicate"
            ></DuplicateInstrumentModal>

            <!--begin::Clone-->
            <span
              class="btn btn-icon btn-active-light-success w-30px h-30px me-3"
              data-toggle="tooltip"
              title="Clone Instrument"
              data-bs-toggle="modal"
              :data-bs-target="
                '#kt_modal_new_address_' + thermal_instruments.id
              "
            >
              <KTIcon icon-name="copy" icon-class="fs-2" />
            </span>

            <!--end::Clone-->

            <!--begin::Clone-->
            <router-link :to="`/cloneinstrument/${thermal_instruments.id}`">
              <span
                class="btn btn-icon btn-active-light-primary w-30px h-30px me-3"
                data-bs-toggle="tooltip"
                title="Clone Instrument"
              >
                <KTIcon icon-name="copy" icon-class="fs-2" />
              </span>
            </router-link>
            <!--end::Clone-->

            <!--begin::Edit-->
            <router-link
              :to="`/thermalinstrument/edit/${thermal_instruments.id}`"
            >
              <span
                class="btn btn-icon btn-active-light-primary w-30px h-30px me-3"
                data-bs-toggle="tooltip"
                title="View Instrument"
              >
                <KTIcon icon-name="pencil" icon-class="fs-2" />
              </span>
            </router-link>
            <!--end::Edit-->

            <!--end::Delete-->
            <span
              class="btn btn-icon btn-active-light-danger w-30px h-30px me-3"
              data-bs-toggle="tooltip"
              title="Delete Instrument"
              @click="deleteItem(thermal_instruments.id, false)"
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
import { defineComponent, onMounted, ref, watch } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable/table-partials/models";
import type { ITInstrument } from "@/core/model/thermal_instruments";
import DuplicateInstrumentModal from "./MaintenanceComponent/DuplicateInstrumentModal.vue";
import ThermalImportModal from "./MaintenanceComponent/ThermalImportModal.vue";
import {
  getThermalInstruments,
  deleteThermalInstrument,
  ThermalInstrumentSearch,
} from "@/stores/api";

import { useAuthStore } from "@/stores/auth";
import arraySort from "array-sort";
import moment from "moment";
import Swal from "sweetalert2";
import { getAssetPath } from "@/core/helpers/assets";

export default defineComponent({
  name: "thermal-instrument-listing",
  components: {
    Datatable,
    DuplicateInstrumentModal,
    ThermalImportModal,
  },
  setup() {
    // Academic Year Logic
    const authStore = useAuthStore();

    const tableHeader = ref([
      {
        columnName: "Instrument Id",
        columnLabel: "instrument_id",
        sortEnabled: true,
        columnWidth: 35,
      },
      {
        columnName: "Instrument Name",
        columnLabel: "name",
        sortEnabled: true,
        columnWidth: 75,
      },
      {
        columnName: "Model No",
        columnLabel: "model_no",
        sortEnabled: true,
        columnWidth: 80,
      },
      {
        columnName: "Range",
        columnLabel: "ranges",
        sortEnabled: true,
        columnWidth: 80,
      },
      {
        columnName: "Accuray",
        columnLabel: "accuracy",
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
        columnName: "Make",
        columnLabel: "make",
        sortEnabled: true,
        columnWidth: 125,
      },
      {
        columnName: "Calibration Date",
        columnLabel: "calibration_date",
        sortEnabled: true,
        columnWidth: 125,
      },
      {
        columnName: "Calibration Due Date",
        columnLabel: "calibration_due_date",
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
        columnName: "Actions",
        columnLabel: "actions",
        sortEnabled: false,
        columnWidth: 75,
      },
    ]);

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

        const response = await getThermalInstruments(
          `page=${page}&limit=${limit.value}&year=${
            selectedYearCache.value
              ? selectedYearCache.value
              : financialYears.value[0]
          }`
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

        const response = await getThermalInstruments(
          `page=${page.value}&limit=${limit}&year=${
            selectedYearCache.value
              ? selectedYearCache.value
              : financialYears.value[0]
          }`
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

    async function HandleDuplicate(e) {
      await thermal_instrument_listing();
    }

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

    const tableData = ref<Array<ITInstrument>>([]);

    const initvalues = ref<Array<ITInstrument>>([]);

    async function thermal_instrument_listing(): Promise<void> {
      try {
        const response = await getThermalInstruments(
          `page=${page.value}&limit=${limit.value}&year=${
            selectedYearCache.value
              ? selectedYearCache.value
              : financialYears.value[0]
          }`
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
      await thermal_instrument_listing();
    }

    onMounted(async () => {
      // Save initial selected year to localStorage
      localStorage.setItem("selectedFinancialYear", selectedYearCache.value);

      await thermal_instrument_listing();
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
          const response = await deleteThermalInstrument(id);
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
        let results: Array<ITInstrument> = [];
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
        await thermal_instrument_listing();
      }
    };

    async function SearchMore() {
      // Your API call logic here
      try {
        const response = await ThermalInstrumentSearch(
          search.value,
          selectedYearCache.value
            ? selectedYearCache.value
            : financialYears.value[0]
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
      HandleDuplicate,

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
  height: 3.5rem;
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
.switchtoleft {
  text-align: left;
}
</style>

