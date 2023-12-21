<template>
  <div>
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
              placeholder="Find with RGP"
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
            <router-link to="/dailyworksheets/add" class="btn btn-primary">
              <KTIcon icon-name="plus" icon-class="fs-2" />
              Add Daily Worksheet
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
              @click="deleteFewWorksheets()"
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
          <template v-slot:rgp_no="{ row: dailyworksheets }">
            <span class="text-gray-600 text-hover-primary mb-1">
              {{ dailyworksheets.rgp_no }}
            </span>
          </template>
          <template v-slot:customer_name="{ row: dailyworksheets }">
            <span class="text-gray-600 text-hover-primary mb-1">
              {{ dailyworksheets.customer_name.company_name }}
            </span>
          </template>
          <template v-slot:engineer_name="{ row: dailyworksheets }">
            <span class="text-gray-600 text-hover-primary mb-1">
              {{
                dailyworksheets.engineer_name.first_name +
                " " +
                dailyworksheets.engineer_name.last_name
              }}
            </span>
          </template>
          <!-- defualt data -->
          <template v-slot:start_time="{ row: dailyworksheets }">
            {{ dailyworksheets.start_time }}
          </template>
          <template v-slot:end_time="{ row: dailyworksheets }">
            {{ dailyworksheets.end_time }}
          </template>
          <template v-slot:work_status="{ row: dailyworksheets }">
            <span
              v-if="dailyworksheets.work_status == 1"
              class="badge py-3 px-4 fs-7 badge-light-primary"
              >Ongoing</span
            >
            <span
              v-if="dailyworksheets.work_status == 2"
              class="badge py-3 px-4 fs-7 badge-light-success"
              >Completed</span
            >
          </template>
          <template v-slot:actions="{ row: dailyworksheets }">
            <!--begin::Menu Flex-->

            <div class="d-flex flex-lg-row">
              <span
                class="menu-link px-3"
                data-toggle="tooltip"
                title="Download Worksheet"
              >
                <i
                  @click="downloadWorksheet(dailyworksheets.id)"
                  class="las la-download text-gray-600 text-hover-success mb-1 fs-1"
                ></i>
              </span>
              <span
                class="menu-link px-3"
                data-toggle="tooltip"
                title="Delete Worksheet"
              >
                <i
                  @click="deleteWorksheet(dailyworksheets.id, false)"
                  class="las la-minus-circle text-gray-600 text-hover-danger mb-1 fs-1"
                ></i>
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
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import type { IWorksheet } from "@/core/model/dailyworksheets";
import arraySort from "array-sort";
import moment from "moment";
import {
  deleteDailyWorksheet,
  getDailyWorksheets,
  getDailyWorksheet,
  WorksheetSearch,
} from "@/stores/api";
import Swal from "sweetalert2";
import { worksheetGen } from "@/core/config/WorksheetGenerator";

export default defineComponent({
  name: "worksheets_listing",
  components: {
    Datatable,
  },
  setup() {
    const loading = ref(true);
    const tableHeader = ref([
      {
        columnName: "RGP No.",
        columnLabel: "rgp_no",
        sortEnabled: true,
        columnWidth: 155,
      },
      {
        columnName: "Customer Name",
        columnLabel: "customer_name",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Engineer Name",
        columnLabel: "engineer_name",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Work Start Date",
        columnLabel: "start_time",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Work End Date",
        columnLabel: "end_time",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Work Status",
        columnLabel: "work_status",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Actions",
        columnLabel: "actions",
        sortEnabled: false,
        columnWidth: 70,
      },
    ]);

    // staring from 2
    let page = ref(1);
    let limit = ref(50);
    // limit 10
    const more = ref(false);

    const selectedIds = ref<Array<number>>([]);
    const tableData = ref<Array<IWorksheet>>([]);
    const initvalues = ref<Array<IWorksheet>>([]);
    const total = ref(0);
    // functions
    const Limits = ref({
      1: 10,
      2: 25,
      3: 50,
    });
    // more
    // functions
    // get users function
    async function worksheets_listing(): Promise<void> {
      try {
        const response = await getDailyWorksheets(
          `page=${page.value}&limit=${limit.value}`
        );
        console.log(response);
        total.value = response.result.total_count;
        more.value = response.result.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(
          ({ start_time, end_time, ...rest }) => ({
            start_time: moment(start_time).format("MMMM Do YYYY"),
            end_time: moment(end_time).format("MMMM Do YYYY"),
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

    const PagePointer = async (page) => {
      // ? Truncate the tableData
      //console.log(limit.value);
      loading.value = true;
      try {
        while (tableData.value.length != 0) tableData.value.pop();
        while (initvalues.value.length != 0) initvalues.value.pop();

        const response = await getDailyWorksheets(
          `page=${page}&limit=${limit.value}`
        );
        //console.log(response.result.total_count);
        // first 20 displayed
        total.value = response.result.total_count;
        more.value = response.result.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(
          ({ start_time, end_time, ...rest }) => ({
            start_time: moment(start_time).format("MMMM Do YYYY"),
            end_time: moment(end_time).format("MMMM Do YYYY"),
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

        const response = await getDailyWorksheets(
          `page=${page.value}&limit=${limit}`
        );
        //console.log(response.result.total_count);
        // first 20 displayed
        total.value = response.result.total_count;
        more.value = response.result.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(
          ({ start_time, end_time, ...rest }) => ({
            start_time: moment(start_time).format("MMMM Do YYYY"),
            end_time: moment(end_time).format("MMMM Do YYYY"),
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

    onMounted(async () => {
      //console.log("done");
      await worksheets_listing();
    });

    const deleteFewWorksheets = () => {
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
            deleteWorksheet(item, true);
          });
          selectedIds.value.length = 0;
        }
      });
    };

    const deleteWorksheet = (id: number, mul: boolean) => {
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
              cancelButtonText: "No, cancel it!",
            }).then((result: { [x: string]: any }) => {
              if (result["isConfirmed"]) {
                // Put your function here
                deleteDailyWorksheet(id);
                tableData.value.splice(i, 1);
              }
            });
          }
        }
      } else {
        for (let i = 0; i < tableData.value.length; i++) {
          if (tableData.value[i].id === id) {
            // Put your function here
            deleteDailyWorksheet(id);
            tableData.value.splice(i, 1);
          }
        }
      }
    };

    const search = ref<string>("");
    let debounceTimer;
    const searchItems = async () => {
      tableData.value.splice(0, tableData.value.length, ...initvalues.value);
      if (search.value !== "") {
        let results: Array<IWorksheet> = [];
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
        await worksheets_listing();
      }
    };

    async function SearchMore() {
      // Your API call logic here
      try {
        const response = await WorksheetSearch(search.value);
        //console.log(response.result.total_count);
        // first 20 displayed
        total.value = response.result.total_count;
        more.value = response.result.data.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(
          ({ start_time, end_time, ...rest }) => ({
            start_time: moment(start_time).format("MMMM Do YYYY"),
            end_time: moment(end_time).format("MMMM Do YYYY"),
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

    const worksheetInfo = ref({
      id: "",
      rgp_id: "",
      rgp_no: "",
      engineer_id: "",
      company_id: "",
      scope_of_work: "",
      problem: "",
      work_date: "",
      tests: [],
      other_test: "",
      start_time: "",
      end_time: "",
      work_status: "",
      standard_used: "",
      witnessed_by: "",

      client_address: {
        address1: "",
        address2: "",
        city: "",
        pincode: "",
        states: "",
        country: "",
      },

      company_details: {
        company_name: "",
        company_logo: getAssetPath("media/avatars/default.png"),
      },

      customer_data: {
        id: "",
        first_name: "",
        last_name: "",
      },

      client_data: {
        id: "",
        first_name: "",
        last_name: "",
        mobile: "",
        company: {
          company_name: "",
        },
      },

      quotation_details: {
        id: "",
        customer_id: "",
        quotation_no: "",
      },
    });

    const downloadWorksheet = async (id: any) => {
      const res = await getDailyWorksheet(id);

      worksheetInfo.value.id = res.result.id;
      worksheetInfo.value.rgp_id = res.result.rgp_id;
      worksheetInfo.value.rgp_no = res.result.rgp_no;
      worksheetInfo.value.engineer_id = res.result.engineer_id;
      worksheetInfo.value.company_id = res.result.company_id;
      worksheetInfo.value.scope_of_work = res.result.scope_of_work;
      worksheetInfo.value.problem = res.result.problem
        ? res.result.problem
        : "NA";
      worksheetInfo.value.work_date = res.result.work_date;
      worksheetInfo.value.tests = JSON.parse(res.result.tests);
      worksheetInfo.value.other_test = res.result.other_test
        ? res.result.other_test
        : "NA";
      worksheetInfo.value.start_time = res.result.start_time;
      worksheetInfo.value.end_time = res.result.end_time;
      worksheetInfo.value.work_status = res.result.work_status;
      worksheetInfo.value.standard_used = res.result.standard_used;
      worksheetInfo.value.witnessed_by = res.result.witnessed_by;

      worksheetInfo.value.client_address.address1 = res.result.client_address
        .address1
        ? res.result.client_address.address1
        : "";
      worksheetInfo.value.client_address.address2 = res.result.client_address
        .address2
        ? res.result.client_address.address2
        : "";
      worksheetInfo.value.client_address.city = res.result.client_address.city
        ? res.result.client_address.city
        : "";
      worksheetInfo.value.client_address.pincode = res.result.client_address
        .pincode
        ? res.result.client_address.pincode
        : "";
      worksheetInfo.value.client_address.states = res.result.client_address
        .states
        ? res.result.client_address.states
        : "";
      worksheetInfo.value.client_address.country = res.result.client_address
        .country
        ? res.result.client_address.country
        : "";

      worksheetInfo.value.customer_data.id = res.result.customer_data.id;
      worksheetInfo.value.customer_data.first_name =
        res.result.customer_data.first_name;
      worksheetInfo.value.customer_data.last_name =
        res.result.customer_data.last_name;

      worksheetInfo.value.client_data.id = res.result.client_data.id;
      worksheetInfo.value.client_data.first_name =
        res.result.client_data.first_name;
      worksheetInfo.value.client_data.last_name =
        res.result.client_data.last_name;
      worksheetInfo.value.client_data.mobile = res.result.client_data.mobile
        ? res.result.client_data.mobile
        : "";
      worksheetInfo.value.client_data.company.company_name =
        res.result.client_data.company.company_name;

      worksheetInfo.value.quotation_details = res.result.quotation_details;

      worksheetInfo.value.company_details.company_name =
        res.result.company_details.company_name;
      worksheetInfo.value.company_details.company_logo = res.result
        .company_details.company_logo
        ? "data: image/png;base64," + res.result.company_details.company_logo
        : getAssetPath("media/avatars/default.png");

      console.log(worksheetInfo.value);

      const worksheetName = `${worksheetInfo.value.quotation_details.quotation_no}_${worksheetInfo.value.rgp_no}`;

      await worksheetGen(id, worksheetName, worksheetInfo);
    };

    return {
      tableData,
      tableHeader,
      deleteWorksheet,
      search,
      searchItems,
      selectedIds,
      deleteFewWorksheets,
      sort,
      onItemSelect,
      getAssetPath,
      worksheets_listing,
      loading,
      NextPage,
      PrevPage,
      total,
      page,
      limit,
      PageLimitPoiner,
      Limits,
      downloadWorksheet,
    };
  },
});
</script>
