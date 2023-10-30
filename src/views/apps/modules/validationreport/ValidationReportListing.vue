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
          <button
            type="button"
            class="btn btn-danger"
            @click="deleteFewReport()"
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

        <template v-slot:id="{ row: validationreports }">
          {{ validationreports.id }}
        </template>
        <template v-slot:customer_name="{ row: validationreports }">
          {{
            validationreports.customer_name.first_name +
            " " +
            validationreports.customer_name.last_name
          }}
        </template>
        <template v-slot:site_location="{ row: validationreports }">
          {{
            validationreports.site_location.address1 +
            " " +
            validationreports.site_location.address2 +
            " " +
            validationreports.site_location.city +
            " " +
            validationreports.site_location.pincode +
            " " +
            validationreports.site_location.states +
            " " +
            validationreports.site_location.country
          }}
        </template>
        <template v-slot:test_sizes="{ row: validationreports }">
          <div>
            <el-select
              filterable
              placeholder="Count of Reports"
              name="rgp_id"
            >
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
            class="badge py-3 px-4 fs-7 badge-light-danger"
            >{{ GetReportStatus(validationreports.report_status) }}</span
          >
          <span
            v-if="validationreports.report_status == 3"
            class="badge py-3 px-4 fs-7 badge-light-success"
            >{{ GetReportStatus(validationreports.report_status) }}</span
          >
        </template>
        <template v-slot:created_at="{ row: validationreports }">
          {{ validationreports.created_at }}
        </template>
        <template v-slot:actions="{ row: validationreports }">
          <!--begin::Menu Flex-->
          <div class="d-flex flex-lg-row">
            <span class="menu-link px-3">
              <i
                @click="downloadReport(validationreports.id)"
                class="cursor-pointer bi bi-download text-gray-600 text-hover-danger mb-1 fs-2"
              ></i>
            </span>
            <span class="menu-link px-3">
              <router-link :to="`./edit/${validationreports.id}`">
                <i
                  class="las la-edit text-gray-600 text-hover-primary mb-1 fs-1"
                ></i>
              </router-link>
            </span>
            <span class="menu-link px-3">
              <i
                @click="deleteReport(validationreports.id, false)"
                class="bi bi-trash text-gray-600 text-hover-danger mb-1 fs-2"
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
import { computed, defineComponent, onMounted, ref } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable/table-partials/models";
import type { IValidationReport } from "@/core/model/validationreports";
import { GetReportStatus } from "@/core/model/validationreports";
import {
  getAllValidationReport,
  deleteValidationReport,
  ValidationReportSearch,
getReportinfo,
} from "@/stores/api";
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
    states: string;
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
    const tableHeader = ref([
      {
        columnName: "Id",
        columnLabel: "id",
        sortEnabled: true,
        columnWidth: 35,
      },
      {
        columnName: "Customer Name",
        columnLabel: "customer_name",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Site Location",
        columnLabel: "site_location",
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

    const total = ref(0);
    // functions
    const Limits = ref({
      1: 10,
      2: 25,
      3: 50,
    });

    const allReports = ref<ValidationReport>({
      id: "",
      rgp_id: "",
      company_id: "",
      customer_name: {
        first_name: "",
        last_name: "",
      },
      site_location: {
        address1: "",
        address2: "",
        city: "",
        pincode: "",
        states: "",
        country: "",
      },
      tests: [
        {
          air_velocity_test_reports: [],
        },
        {
          filter_integrity_test_reports: [],
        },
        {
          particle_count_test_reports: [],
        },
        {
          recovery_test_reports: [],
        },
      ],
      report_status: "",
      created_at: "",
      updated_at: "",
      created_by: "",
      updated_by: "",
    });

    const loading = ref(true);
    // staring from 2
    let page = ref(1);
    let limit = ref(50);
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
          `page=${page}&limit=${limit.value}`
        );
        //console.log(response.result.total_count);
        // first 20 displayed
        total.value = response.result.total_count;
        more.value = response.result.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(
          ({
            id,
            customer_name,
            site_location,
            test_sizes,
            report_status,
            created_at,
          }) => ({
            id: id,
            customer_name: {
              first_name: customer_name.first_name,
              last_name: customer_name.last_name,
            },
            site_location: {
              address1: site_location.address1 ? site_location.address1 : "",
              address2: site_location.address2 ? site_location.address2 : "",
              city: site_location.city ? site_location.city : "",
              pincode: site_location.pincode ? site_location.pincode : "",
              states: site_location.states ? site_location.states : "",
              country: site_location.country ? site_location.country : "",
            },
            test_sizes: { ...test_sizes },

            report_status: report_status,
            created_at: moment(created_at).format("LL"),
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

        const response = await getAllValidationReport(
          `page=${page.value}&limit=${limit}`
        );
        //console.log(response.result.total_count);
        // first 20 displayed
        total.value = response.result.total_count;
        more.value = response.result.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(
          ({
            id,
            customer_name,
            site_location,
            test_sizes,
            report_status,
            created_at,
          }) => ({
            id: id,
            customer_name: {
              first_name: customer_name.first_name,
              last_name: customer_name.last_name,
            },
            site_location: {
              address1: site_location.address1 ? site_location.address1 : "",
              address2: site_location.address2 ? site_location.address2 : "",
              city: site_location.city ? site_location.city : "",
              pincode: site_location.pincode ? site_location.pincode : "",
              states: site_location.states ? site_location.states : "",
              country: site_location.country ? site_location.country : "",
            },
            test_sizes: { ...test_sizes },

            report_status: report_status,
            created_at: moment(created_at).format("LL"),
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
          `page=${page.value}&limit=${limit.value}`
        );
        tableData.value = response.result.data.map(
          ({
            id,
            customer_name,
            site_location,
            test_sizes,
            report_status,
            created_at,
          }) => ({
            id: id,
            customer_name: {
              first_name: customer_name.first_name,
              last_name: customer_name.last_name,
            },
            site_location: {
              address1: site_location.address1 ? site_location.address1 : "",
              address2: site_location.address2 ? site_location.address2 : "",
              city: site_location.city ? site_location.city : "",
              pincode: site_location.pincode ? site_location.pincode : "",
              states: site_location.states ? site_location.states : "",
              country: site_location.country ? site_location.country : "",
            },
            test_sizes: { ...test_sizes },
            report_status: report_status,
            created_at: moment(created_at).format("LL"),
          })
        );
        total.value = response.result.total_count;
        more.value = response.result.next_page_url != null ? true : false;
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

    onMounted(async () => {
      await report_listing();
    });

    const deleteFewReport = () => {
      Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover from this !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "red",
        confirmButtonText: "Yes, I am sure!",
        cancelButtonText: "No, cancel it!",
      }).then((result: { [x: string]: any }) => {
        if (result["isConfirmed"]) {
          // Put your function here
          selectedIds.value.forEach((item) => {
            deleteReport(item, true);
          });
          selectedIds.value.length = 0;
        }
      });
    };

    const deleteReport = (id: number, mul: boolean) => {
      if (!mul) {
        for (let i = 0; i < tableData.value.length; i++) {
          if (tableData.value[i].id === id) {
            Swal.fire({
              title: "Are you sure?",
              text: "You will not be able to recover from this !",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "red",
              confirmButtonText: "Yes, I am sure!",
            }).then((result: { [x: string]: any }) => {
              if (result["isConfirmed"]) {
                // Put your function here
                deleteValidationReport(id);
                tableData.value.splice(i, 1);
              }
            });
          }
        }
      } else {
        for (let i = 0; i < tableData.value.length; i++) {
          if (tableData.value[i].id === id) {
            // Put your function here
            deleteValidationReport(id);
            tableData.value.splice(i, 1);
          }
        }
      }
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
        const response = await ValidationReportSearch(search.value);
        //console.log(response.result.total_count);
        // first 20 displayed
        tableData.value = response.result.data.data.map(
          ({
            id,
            customer_name,
            site_location,
            test_sizes,
            report_status,
            created_at,
          }) => ({
            id: id,
            customer_name: {
              first_name: customer_name.first_name,
              last_name: customer_name.last_name,
            },
            site_location: {
              address1: site_location.address1 ? site_location.address1 : "",
              address2: site_location.address2 ? site_location.address2 : "",
              city: site_location.city ? site_location.city : "",
              pincode: site_location.pincode ? site_location.pincode : "",
              states: site_location.states ? site_location.states : "",
              country: site_location.country ? site_location.country : "",
            },
            test_sizes: { ...test_sizes },
            report_status: report_status,
            created_at: moment(created_at).format("LL"),
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

    const reportInfo = ref({
      id: "",
      rgp_id: "",
      rgp_no: "",
      tests: [],
      quotation_no: "",
      customer_data: {
        company_id: "",
        first_name : "",
        last_name: ""
      },
      client_data: {
        company_id: "",
        first_name : "",
        last_name: ""
      },
      customer_company:{
        company_name: ""
      },
      client_company:{
        company_name: ""
      },
      client_address:{
        address1: "",
        address2: "",
        city: "",
        pincode: "",
        states: "",
        country: ""
      },
      company_details:{
        company_name: "",
        company_logo: getAssetPath("media/avatars/default.png"),
      }
    })


    const downloadReport = async (id: any) => {
      // get all information of the rgp
      const res = await getReportinfo(id);
      reportInfo.value.id = res.result.id;
      reportInfo.value.rgp_id = res.result.rgp_id;
      reportInfo.value.rgp_no = res.result.rgp_Details.rgp_no;
      reportInfo.value.tests = JSON.parse(res.result.tests);
      reportInfo.value.customer_company.company_name = res.result.customer_company.company_name;
      reportInfo.value.client_company.company_name = res.result.client_company.company_name;
      reportInfo.value.client_address = res.result.client_address;
      reportInfo.value.customer_data = res.result.customer_data;
      reportInfo.value.client_data = res.result.client_data;
      reportInfo.value.quotation_no = res.result.quotationsDetails.quotation_no;
      reportInfo.value.company_details.company_name = res.result.company_details.company_name;
      reportInfo.value.company_details.company_logo = res.result.company_details.company_logo
            ? "data: image/png;base64," + res.result.company_details.company_logo
            : getAssetPath("media/avatars/default.png")
      
      console.log(reportInfo.value);

      const reportName =  `${reportInfo.value.quotation_no}_${reportInfo.value.rgp_no}`;

      await reportGen(id, reportName, reportInfo);

    }

    return {
      tableData,
      tableHeader,
      deleteReport,
      search,
      searchItems,
      selectedIds,
      deleteFewReport,
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
      
      
    };
  },
});
</script>
<style>
.el-input__inner {
  font-weight: 500;
}

.el-input__wrapper {
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
</style>
