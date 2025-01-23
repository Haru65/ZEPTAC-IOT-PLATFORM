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
              placeholder="Search by room name"
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
          <template v-slot:id="{ row: thermal_reports }">
            {{ thermal_reports.id }}
          </template>
          <template v-slot:room_name="{ row: thermal_reports }">
            {{ thermal_reports.room_name }}
          </template>
          <template v-slot:logger_used="{ row: thermal_reports }">
            {{ thermal_reports.logger_used }}
          </template>
          <template v-slot:mapping_duration="{ row: thermal_reports }">
            {{ thermal_reports.mapping_duration }}
          </template>
          <template v-slot:logging_interval="{ row: thermal_reports }">
            {{ thermal_reports.logging_interval }}
          </template>
          <template
            v-slot:company_name="{ row: thermal_reports }"
            v-if="identifier == 'Admin'"
          >
            {{ thermal_reports.company_name }}
          </template>
          <template v-slot:created_at="{ row: thermal_reports }">
            {{ thermal_reports.created_at }}
          </template>
          <template v-slot:actions="{ row: thermal_reports }">
            <!--begin::Menu Flex-->
            <div class="d-flex flex-lg-row">
              <span
                class="btn btn-icon btn-active-light-success w-30px h-30px me-3"
                v-tooltip
                title="Download Thermal Report"
                @click="downloadReport(thermal_reports.id)"
              >
                <KTIcon icon-name="file-down" icon-class="fs-2" />
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
  import { defineComponent, onMounted, ref, computed, watch } from "vue";
  import Datatable from "@/components/kt-datatable/KTDataTable.vue";
  import type { Sort } from "@/components/kt-datatable/table-partials/models";
  import type { ITReport } from "@/core/model/thermal_reports";
  import { Identifier } from "@/core/config/WhichUserConfig";
  import {
    getThermalReports,
    deleteThermalReport,
    ThermalReportSearch,
    DownloadThermalReport,
  } from "@/stores/api";
  import { useAuthStore } from "@/stores/auth";
  import arraySort from "array-sort";
  import moment from "moment";
  import Swal from "sweetalert2";
  import { getAssetPath } from "@/core/helpers/assets";
  import { thermalReportGen } from "@/core/config/ThermalReportGenerator";
  
  export default defineComponent({
    name: "customer-thermal-reports",
    components: {
      Datatable,
    },
    setup() {
      // Academic Year Logic
      const authStore = useAuthStore();
  
      const identifier = Identifier;
  
      const tableHeader = ref([
        {
          columnName: "Room Name",
          columnLabel: "room_name",
          sortEnabled: true,
          columnWidth: 80,
        },
        {
          columnName: "Logger Used",
          columnLabel: "logger_used",
          sortEnabled: true,
          columnWidth: 80,
        },
        {
          columnName: "Mapping Duration",
          columnLabel: "mapping_duration",
          sortEnabled: true,
          columnWidth: 80,
        },
        {
          columnName: "Logging Interval",
          columnLabel: "logging_interval",
          sortEnabled: true,
          columnWidth: 80,
        },
        {
          columnName: "Main Company",
          columnLabel: "company_name",
          sortEnabled: true,
          columnWidth: 175,
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
  
          const response = await getThermalReports(
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
                room_name,
                logger_used,
                mapping_duration,
                logging_interval,
                company_name,
                created_at,
                ...rest
              }) => ({
                id: id,
                room_name: room_name,
                logger_used: logger_used,
                mapping_duration: mapping_duration,
                logging_interval: logging_interval,
                company_name: company_name.company_name,
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
  
          const response = await getThermalReports(
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
                room_name,
                logger_used,
                mapping_duration,
                logging_interval,
                company_name,
                created_at,
                ...rest
              }) => ({
                id: id,
                room_name: room_name,
                logger_used: logger_used,
                mapping_duration: mapping_duration,
                logging_interval: logging_interval,
                company_name: company_name.company_name,
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
  
      const tableData = ref<Array<ITReport>>([]);
  
      const initvalues = ref<Array<ITReport>>([]);
  
      async function thermal_report_listing(): Promise<void> {
        try {
          const response = await getThermalReports(
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
                room_name,
                logger_used,
                mapping_duration,
                logging_interval,
                company_name,
                created_at,
                ...rest
              }) => ({
                id: id,
                room_name: room_name,
                logger_used: logger_used,
                mapping_duration: mapping_duration,
                logging_interval: logging_interval,
                company_name: company_name.company_name,
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
  
      const filteredTableHeader = computed(() => {
        return identifier.value === "Admin"
          ? tableHeader.value
          : tableHeader.value.filter(
              (column) => column.columnLabel !== "company_name"
            );
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
        await thermal_report_listing();
      }
  
      onMounted(async () => {
        // Save initial selected year to localStorage
        localStorage.setItem("selectedFinancialYear", selectedYearCache.value);
  
        await thermal_report_listing();
      });
  
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
          let results: Array<ITReport> = [];
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
          await thermal_report_listing();
        }
      };
  
      async function SearchMore() {
        // Your API call logic here
        try {
          const response = await ThermalReportSearch(
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
                room_name,
                logger_used,
                mapping_duration,
                logging_interval,
                company_name,
                created_at,
                ...rest
              }) => ({
                id: id,
                room_name: room_name,
                logger_used: logger_used,
                mapping_duration: mapping_duration,
                logging_interval: logging_interval,
                company_name: company_name.company_name,
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
  
      // Creating the Thermal Report PDF
  
      const thermalReportDetails = ref({
        id: "",
        rgp_id: "",
        instruments: [
          {
            id: "",
            instrument_name: "",
            instrument_id: "",
            serial_no: "",
            calibration_date: "",
            calibration_due_date: "",
          },
        ],
        excel_data: [
          {
            file_name: "",
            id: "",
            instrument_name: "",
            instrument_id: "",
            logger_id: "",
            file_size: 0,
            data: [],
            MAX_TEMP: 0,
            MIN_TEMP: 0,
            MAX_RH: 0,
            MIN_RH: 0,
          },
        ],
        room_name: "",
        acc_for_temp: "",
        acc_for_rh: "",
        val_start_date: "",
        start_time: "",
        mapping_duration: 0,
        logging_interval: 0,
        logger_used: 0,
  
        dates: ref<string[]>([]),
  
        min_temp: {
          instrument_id: "",
          logger_id: "",
          reading: Number.MAX_VALUE,
        },
  
        max_temp: {
          instrument_id: "",
          logger_id: "",
          reading: Number.MIN_VALUE,
        },
  
        min_rh: {
          instrument_id: "",
          logger_id: "",
          reading: Number.MAX_VALUE,
        },
  
        max_rh: {
          instrument_id: "",
          logger_id: "",
          reading: Number.MIN_VALUE,
        },
  
        avg_temp: 0,
        avg_rh: 0,
  
        sensor_location_diagram: "",
        sensor_location_diagram_data: "",
  
        sensor_location_chart: "",
        sensor_location_chart_data: "",
  
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
  
        company_id: "",
        created_by: "",
        updated_by: "",
        is_active: "",
      });
  
      const downloadReport = async (id) => {
        let timerInterval;
  
        try {
          // Show initial loading Swal with generic progress messages
          Swal.fire({
            title: "Downloading Thermal Report",
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
          const res = await DownloadThermalReport(id);
          if (res?.success != false) {
            const res = await DownloadThermalReport(id);
  
            thermalReportDetails.value.id = res.result.id;
            thermalReportDetails.value.rgp_id = res.result.rgp_id;
            thermalReportDetails.value.room_name = res.result.room_name;
            thermalReportDetails.value.acc_for_temp = res.result.acc_for_temp;
            thermalReportDetails.value.acc_for_rh = res.result.acc_for_rh;
            thermalReportDetails.value.val_start_date = res.result.val_start_date;
            thermalReportDetails.value.start_time = res.result.start_time;
            thermalReportDetails.value.mapping_duration =
              res.result.mapping_duration;
            thermalReportDetails.value.logging_interval =
              res.result.logging_interval;
            thermalReportDetails.value.logger_used = res.result.logger_used;
  
            thermalReportDetails.value.company_id = res.result.company_id;
            thermalReportDetails.value.created_by = res.result.created_by;
            thermalReportDetails.value.updated_by = res.result.updated_by;
            thermalReportDetails.value.is_active = res.result.is_active;
  
            thermalReportDetails.value.instruments = JSON.parse(
              res.result.instruments
            );
            thermalReportDetails.value.excel_data = JSON.parse(
              res.result.excel_data
            );
  
            thermalReportDetails.value.dates = JSON.parse(res.result.dates);
  
            thermalReportDetails.value.min_temp = JSON.parse(res.result.min_temp);
            thermalReportDetails.value.max_temp = JSON.parse(res.result.max_temp);
  
            thermalReportDetails.value.min_rh = JSON.parse(res.result.min_rh);
            thermalReportDetails.value.max_rh = JSON.parse(res.result.max_rh);
  
            thermalReportDetails.value.avg_temp = res.result.avg_temp;
            thermalReportDetails.value.avg_rh = res.result.avg_rh;
  
            thermalReportDetails.value.sensor_location_diagram = res.result
              .sensor_location_diagram
              ? res.result.sensor_location_diagram
              : "";
            thermalReportDetails.value.sensor_location_diagram_data = res.result
              .sensor_location_diagram_data
              ? "data: image/png;base64," +
                res.result.sensor_location_diagram_data
              : "";
  
            thermalReportDetails.value.sensor_location_chart = res.result
              .sensor_location_chart
              ? res.result.sensor_location_chart
              : "";
            thermalReportDetails.value.sensor_location_chart_data = res.result
              .sensor_location_chart_data
              ? "data: image/png;base64," + res.result.sensor_location_chart_data
              : "";
  
            thermalReportDetails.value.rgp = { ...res.result.rgp };
          } else {
            showErrorAlert("Error", res.message || "Error Occured");
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
  
          const reportName = `${thermalReportDetails.value.rgp.rgp_no}`;
          await thermalReportGen(id, reportName, thermalReportDetails);
  
          // Close Swal on success
          Swal.fire({
            title: "Download Complete",
            text: "Thermal Report PDF generated successfully",
            icon: "success",
            timer: 2000, // Show success message for 2 seconds
            timerProgressBar: true,
            allowOutsideClick: true,
          });
        } catch (error) {
          console.error("Error downloading Thermal Report:", error);
  
          // Close Swal on success
          Swal.fire({
            title: "Error Complete",
            text: "Failed to download Thermal Report",
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
        search,
        searchItems,
        selectedIds,
        sort,
        onItemSelect,
        loading,
        limit,
        PrevPage,
        NextPage,
        page,
        Limits,
        PageLimitPoiner,
        identifier,
        filteredTableHeader,
        downloadReport,
  
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
    
    