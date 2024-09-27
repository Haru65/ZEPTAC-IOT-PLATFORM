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
            placeholder="Search quotations"
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
          <router-link to="./add" class="btn btn-primary">
            <KTIcon icon-name="plus" icon-class="fs-2" />
            Add Validation Report
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
        :header="tableHeader"
        :checkbox-enabled="true"
        :items-per-page="limit"
        :items-per-page-dropdown-enabled="false"
        :loading="loading"
      >
        <!-- img data -->

        <template v-slot:id="{ row: validationreports }">
          {{ validationreports.id }}
        </template>

        <template v-slot:customer="{ row: validationreports }">
          <span v-if="validationreports.customer != null">
            {{ validationreports.customer?.company_name || "" }}
          </span>
          <span v-else> </span>
        </template>

        <template v-slot:clientx="{ row: validationreports }">
          <span v-if="validationreports.clientx != null">
            {{ validationreports.clientx.address1 || "" }}
            {{ validationreports.clientx.address2 || "" }}
            {{ validationreports.clientx.city || "" }}
            {{ validationreports.clientx.pincode || "" }}
            {{ validationreports.clientx.state || "" }}
            {{ validationreports.clientx.country || "" }}
          </span>
          <span v-else> </span>
        </template>
        <template v-slot:test_sizes="{ row: validationreports }">
          <div>
            <el-select filterable placeholder="Count of Reports" name="rgp_id">
              <el-option
                disabled="disabled"
                v-for="test in ConductedTests"
                :key="test.id"
                :value="test.id"
                :label="`${test.test} (${
                  Object.values(validationreports.test_sizes)[test.id]
                })`"
              />
            </el-select>
          </div>
        </template>
        <template v-slot:report_status="{ row: validationreports }">
          <span
            v-if="validationreports.report_status == 1"
            class="badge py-3 px-4 fs-7 badge-light-primary"
            >{{ GetReportStatus(validationreports.report_status) }}</span
          >
          <span
            v-if="validationreports.report_status == 2"
            class="badge py-3 px-4 fs-7 badge-light-success"
            >{{ GetReportStatus(validationreports.report_status) }}</span
          >
        </template>
        <template v-slot:created_at="{ row: validationreports }">
          {{ validationreports.created_at }}
        </template>

        <template v-slot:actions="{ row: validationreports }">
          <div class="d-flex flex-lg-row">
            <span
              class="btn btn-icon btn-active-light-danger w-30px h-30px me-3"
              data-bs-toggle="tooltip"
              title="Download Non-NABL Report"
              @click="downloadReport(validationreports.id)"
            >
              <KTIcon icon-name="file-down" icon-class="fs-2" />
            </span>
            <!--begin::Edit-->
            <router-link
              :to="`/validationreports/edit/${validationreports.id}`"
            >
              <span
                class="btn btn-icon btn-active-light-primary w-30px h-30px me-3"
                data-bs-toggle="tooltip"
                title="Edit Non-NABL Report"
              >
                <KTIcon icon-name="pencil" icon-class="fs-2" />
              </span>
            </router-link>
            <!--end::Edit-->
            <span
              class="btn btn-icon btn-active-light-danger w-30px h-30px me-3"
              data-bs-toggle="tooltip"
              title="Delete Non-NABL Report"
              @click="deleteItem(validationreports.id, false)"
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
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable/table-partials/models";
import type { IValidationReport } from "@/core/model/validationreports";
import { GetReportStatus } from "@/core/model/validationreports";
import {
  getAllValidationReport,
  deleteValidationReport,
  ValidationReportSearch,
  getCompanyLogo,
  getValidationReportInfo,
} from "@/stores/api";
import { useAuthStore } from "@/stores/auth";
import arraySort from "array-sort";
import moment from "moment";
import Swal from "sweetalert2";
import { ConductedTests } from "@/core/model/conductedtests";
import { getAssetPath } from "@/core/helpers/assets";
import { reportGen } from "@/core/config/ReportGenerator";

interface airVelocityTestReport {
  id: string;
  test_name: string;
  test_code: string;
  report_name: string;
  instrument_used: {
    id: string;
    instrument_id: string;
    name: string;
    model_no: string;
    serial_no: string;
    make: string;
    calibration_date: string;
    calibration_due_date: string;
  };
  equipment_name: string;
  equipment_id: string;
  area_name: string;
  ahu_no: string;
  validation_date: string;
  due_date: string;
  room_name: string;

  details: [
    {
      supply_code: string;

      velocity_readings: {
        reading_1: string;
        reading_2: string;
        reading_3: string;
        reading_4: string;
        reading_5: string;
      };
      average_reading: string;

      supply_filter_size: string;
      cfm: string;
    }
  ];
  room_volume: string;
  total_cfm: string;
  acph: string;

  acceptance_criteria: {
    id: string;
    certified: string;
  };
  test_carried_by: {
    id: string;
    first_name: string;
    last_name: string;
  };
  test_witnessed_by: string;
}

interface filterIntegrityTestReport {
  id: string;
  test_name: string;
  test_code: string;
  report_name: string;
  instrument_used: {
    id: string;
    instrument_id: string;
    name: string;
    model_no: string;
    serial_no: string;
    make: string;
    calibration_date: string;
    calibration_due_date: string;
  };
  equipment_name: string;
  equipment_id: string;
  area_name: string;
  ahu_no: string;
  validation_date: string;
  due_date: string;

  room_name: string;

  details: [
    {
      supply_code: string;
      up_stream_conc: string;
      leakage: string;
      test_result_of_pov: string;
      remark: string;
    }
  ];

  acceptance_criteria: {
    id: string;
    certified: string;
  };
  test_carried_by: {
    id: string;
    first_name: string;
    last_name: string;
  };
  test_witnessed_by: string;
}

interface particleCountTestReport {
  id: string;
  test_name: string;
  test_code: string;
  report_name: string;
  instrument_used: {
    id: string;
    instrument_id: string;
    name: string;
    model_no: string;
    serial_no: string;
    make: string;
    calibration_date: string;
    calibration_due_date: string;
  };
  equipment_name: string;
  equipment_id: string;
  area_name: string;
  ahu_no: string;
  validation_date: string;
  due_date: string;

  room_name: string;

  details: [
    {
      location_no: string;
      particle_readings: {
        reading_1: string;
        reading_2: string;
      };
      remark: string;
    }
  ];

  acceptance_criteria: {
    id: string;
    certified: string;
  };
  test_carried_by: {
    id: string;
    first_name: string;
    last_name: string;
  };
  test_witnessed_by: string;
}

interface recoveryTestReport {
  id: string;
  test_name: string;
  test_code: string;
  report_name: string;
  instrument_used: {
    id: string;
    instrument_id: string;
    name: string;
    model_no: string;
    serial_no: string;
    make: string;
    calibration_date: string;
    calibration_due_date: string;
  };
  equipment_name: string;
  equipment_id: string;
  area_name: string;
  ahu_no: string;
  validation_date: string;
  due_date: string;

  room_name: string;

  details: [
    {
      ahu_condition: string;
      time: string;
      particle_readings: {
        reading_1: string;
        reading_2: string;
      };
      remark: string;
    }
  ];

  acceptance_criteria: {
    id: string;
    certified: string;
  };
  test_carried_by: {
    id: string;
    first_name: string;
    last_name: string;
  };
  test_witnessed_by: string;
}

interface ValidationReport {
  id: string;
  rgp_id: string;
  company_id: string;
  customer_name: {
    first_name: string;
    last_name: string;
  };
  site_location: {
    address1: string;
    address2: string;
    city: string;
    pincode: string;
    state: string;
    country: string;
  };
  tests: [
    {
      air_velocity_test_reports: Array<airVelocityTestReport>;
    },
    {
      filter_integrity_test_reports: Array<filterIntegrityTestReport>;
    },
    {
      particle_count_test_reports: Array<particleCountTestReport>;
    },
    {
      recovery_test_reports: Array<recoveryTestReport>;
    }
  ];
  report_status: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
}

interface SelectedTestItem {
  id: string;
  selectedTest: string;
}

export default defineComponent({
  name: "validationreport-list",
  components: {
    Datatable,
  },
  setup() {
    // Financial Year Logic
    const authStore = useAuthStore();

    const tableHeader = ref([
      {
        columnName: "Customer Name",
        columnLabel: "customer",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Site Location",
        columnLabel: "clientx",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Total Tests",
        columnLabel: "test_sizes",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Report Status",
        columnLabel: "report_status",
        sortEnabled: true,
        columnWidth: 85,
      },
      {
        columnName: "Created At",
        columnLabel: "created_at",
        sortEnabled: true,
        columnWidth: 75,
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

        const response = await getAllValidationReport(
          `page=${page}&limit=${limit.value}&year=${
            selectedYearCache.value
              ? selectedYearCache.value
              : financialYears.value[0]
          }`
        );

        if (response.success) {
          more.value = response.result.next_page_url != null ? true : false;
          tableData.value = response.result.data.map(
            ({ id, rgp, test_sizes, report_status, created_at, ...rest }) => ({
              id: id,
              customer: { ...rgp.quotation.customer },
              clientx: { ...rgp.quotation.clientx },
              test_sizes: { ...test_sizes },
              report_status: report_status,
              created_at: moment(created_at).format("DD-MM-YYYY"),
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

        const response = await getAllValidationReport(
          `page=${page.value}&limit=${limit}&year=${
            selectedYearCache.value
              ? selectedYearCache.value
              : financialYears.value[0]
          }`
        );

        if (response.success) {
          more.value = response.result.next_page_url != null ? true : false;
          tableData.value = response.result.data.map(
            ({ id, rgp, test_sizes, report_status, created_at, ...rest }) => ({
              id: id,
              customer: { ...rgp.quotation.customer },
              clientx: { ...rgp.quotation.clientx },
              test_sizes: { ...test_sizes },
              report_status: report_status,
              created_at: moment(created_at).format("DD-MM-YYYY"),
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

    const selectedIds = ref<Array<number>>([]);

    const tableData = ref<Array<IValidationReport>>([]);

    const initvalues = ref<Array<IValidationReport>>([]);

    async function report_listing(): Promise<void> {
      try {
        const response = await getAllValidationReport(
          `page=${page.value}&limit=${limit.value}&year=${
            selectedYearCache.value
              ? selectedYearCache.value
              : financialYears.value[0]
          }`
        );
        if (response.success) {
          tableData.value = response.result.data.map(
            ({ id, rgp, test_sizes, report_status, created_at, ...rest }) => ({
              id: id,
              customer: { ...rgp.quotation.customer },
              clientx: { ...rgp.quotation.clientx },
              test_sizes: { ...test_sizes },
              report_status: report_status,
              created_at: moment(created_at).format("DD-MM-YYYY"),
              ...rest,
            })
          );

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
      await report_listing();
    }

    onMounted(async () => {
      // Save initial selected year to localStorage
      localStorage.setItem("selectedFinancialYear", selectedYearCache.value);

      await report_listing();
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
          const response = await deleteValidationReport(id);
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
        let results: Array<IValidationReport> = [];
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
        await report_listing();
      }
    };

    async function SearchMore() {
      // Your API call logic here
      try {
        const response = await ValidationReportSearch(
          search.value,
          selectedYearCache.value
            ? selectedYearCache.value
            : financialYears.value[0]
        );

        if (response.success) {
        tableData.value = response.result.data.map(
          ({ id, rgp, test_sizes, report_status, created_at, ...rest }) => ({
            id: id,
            customer: { ...rgp.quotation.customer },
            clientx: { ...rgp.quotation.clientx },
            test_sizes: { ...test_sizes },
            report_status: report_status,
            created_at: moment(created_at).format("DD-MM-YYYY"),
            ...rest,
          })
        );
        initvalues.value.splice(0, tableData.value.length, ...tableData.value);
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

    const reportInfo = ref({
      id: "",
      rgp_id: "",
      tests: [],
      company_id: "",
      report_status: "",
      created_by: "",
      updated_by: "",
      is_active: "",

      rgp: {
        id: "",
        rgp_no: "",
        quotation_id: "",
        quotation: {
          id: "",
          quotation_no: "",
          customer: {
            id: "",
            name: "",
            mobile: "",
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
            mobile: "",
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
            mobile: "",
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
    });

    const downloadReport = async (id: any) => {
      let timerInterval;

      try {
        // Show initial loading Swal with generic progress messages
        Swal.fire({
          title: "Downloading Non-NABL Report",
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
        const res = await getValidationReportInfo(id);

        if (res?.success != false) {
          reportInfo.value.id = res.result.id;
          reportInfo.value.rgp_id = res.result.rgp_id;
          reportInfo.value.tests = JSON.parse(res.result.tests);
          reportInfo.value.report_status = res.result.report_status;
          reportInfo.value.company_id = res.result.company_id;
          reportInfo.value.created_by = res.result.created_by;
          reportInfo.value.updated_by = res.result.updated_by;
          reportInfo.value.is_active = res.result.is_active;

          reportInfo.value.rgp = { ...res.result.rgp };
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
  <p class="swal-text">Please wait...</p>
  <div class="swal-progress">
    <div class="swal-progress-bar"></div>
  </div>
</div>`,
        });

        // Simulate delay for PDF generation (replace with actual function)
        const pdfName = `${reportInfo.value.rgp.quotation.quotation_no}_${reportInfo.value.rgp.rgp_no}`;

        await reportGen(id, pdfName, reportInfo, companyInfo);

        // Close Swal on success
        Swal.fire({
          title: "Download Complete",
          text: "Non-NABL Report PDF generated successfully",
          icon: "success",
          timer: 2000, // Show success message for 2 seconds
          timerProgressBar: true,
          allowOutsideClick: true,
        });
      } catch (error) {
        console.error("Error downloading Non-NABL Report:", error);

        // Close Swal on success
        Swal.fire({
          title: "Error Complete",
          text: "Failed to download Non-NABL Report",
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
      ConductedTests,
      downloadReport,
      GetReportStatus,

      selectedYearCache,
      financialYears,
      handleChange,
    };
  },
});
</script>

