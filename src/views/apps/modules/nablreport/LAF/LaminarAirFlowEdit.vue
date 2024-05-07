<template>
  <div class="card">
    <div class="card-header border-0 pt-6">
      <!--begin::Card title-->
      <div class="card-title"></div>
      <!--begin::Card title-->
      <!--begin::Card toolbar-->
      <div class="card-toolbar">
        <!--begin::Toolbar-->
        <div
          v-if="selectedIds.length === 0"
          class="d-flex justify-content-end"
          data-kt-customer-table-toolbar="base"
        >
          <!--begin::Add customer-->
          <router-link
            :to="`/laf_reports/add/${itemId}`"
            class="btn btn-primary"
          >
            <KTIcon icon-name="plus" icon-class="fs-2" />
            Laminar Air Flow Report
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
            @click="deleteFewItems()"
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
        :header="filteredTableHeader"
        :checkbox-enabled="true"
        :items-per-page="limit"
        :items-per-page-dropdown-enabled="false"
        :loading="loading"
      >
        <template v-slot:certificate_number="{ row: laf }">
          {{ laf.certificate_number }}
        </template>
        <template v-slot:ulr_number="{ row: laf }">
          {{ laf.ulr_number }}
        </template>
        <template v-slot:actions="{ row: laf }">
          <!--begin::Menu Flex-->
          <div class="d-flex flex-lg-row">
            <span
              class="menu-link px-3"
              data-toggle="tooltip"
              title="Download LAF Report"
            >
              <i
                @click="downloadLAFReport(laf.id)"
                class="las la-download text-gray-600 text-hover-success mb-1 fs-1"
              ></i>
            </span>
            <span class="menu-link px-3">
              <router-link :to="`/laf_reports/edit/${laf.id}`">
                <i
                  class="las la-edit text-gray-600 text-hover-primary mb-1 fs-1"
                ></i>
              </router-link>
            </span>
            <span>
              <i
                @click="deleteItem(laf.id, false)"
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
import type { ILafReport } from "@/core/model/laf";
import arraySort from "array-sort";
import ApiService from "@/core/services/ApiService";
import { useAuthStore } from "@/stores/auth";
import { useRoute, useRouter } from "vue-router";
import { get_role } from "@/core/config/PermissionsRolesConfig";
import moment from "moment";
import Swal from "sweetalert2";
import {
  deleteLAFReport,
  DownloadLAFReport,
  getLAFReports,
  LaminarAirFlowSearch,
} from "@/stores/api";
import { Identifier } from "@/core/config/WhichUserConfig";
import { LAFReportGen } from "@/core/config/LAFReportGenerator";

export default defineComponent({
  name: "laf-edit",
  components: {
    Datatable,
  },
  setup() {
    const loading = ref(true);
    const identifier = Identifier;

    const auth = useAuthStore();
    const router = useRouter();
    const User = auth.GetUser();
    const route = useRoute();
    const itemId = route.params.id;

    const tableHeader = ref([
      {
        columnName: "Certificate Number",
        columnLabel: "certificate_number",
        sortEnabled: true,
        columnWidth: 155,
      },
      {
        columnName: "ULR Number",
        columnLabel: "ulr_number",
        sortEnabled: true,
        columnWidth: 155,
      },
      {
        columnName: "Actions",
        columnLabel: "actions",
        sortEnabled: false,
        columnWidth: 75,
      },
    ]);

    const selectedIds = ref<Array<number>>([]);
    const tableData = ref<Array<ILafReport>>([]);
    const initvalues = ref<Array<ILafReport>>([]);

    // staring from 1
    const page = ref(1);
    const limit = ref(10);
    // limit 10
    const more = ref(false);
    // functions
    const Limits = ref({
      1: 10,
      2: 25,
      3: 50,
    });
    // more
    const PagePointer = async (page) => {
      // ? Truncate the tableData
      //console.log(limit.value);
      loading.value = true;
      try {
        while (tableData.value.length != 0) tableData.value.pop();
        while (initvalues.value.length != 0) initvalues.value.pop();

        const response = await getLAFReports(
          `page=${page}&limit=${limit.value}&itemId=${itemId}`
        );

        more.value = response.result.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(({ id, ...rest }) => ({
          id,
          ...rest,
        }));
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

        const response = await getLAFReports(
          `page=${page.value}&limit=${limit}&itemId=${itemId}`
        );

        more.value = response.result.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(({ id, ...rest }) => ({
          id,
          ...rest,
        }));
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

    const filteredTableHeader = computed(() => {
      return identifier.value === "Admin"
        ? tableHeader.value
        : tableHeader.value.filter(
            (column) => column.columnLabel !== "company_name"
          );
    });

    // functions
    // get users function
    async function laf_listing(): Promise<void> {
      try {
        ApiService.setHeader();
        const response = await getLAFReports(
          `page=${page.value}&limit=${limit.value}&itemId=${itemId}`
        );
        // console.log(response);

        more.value = response.result.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(({ id, ...rest }) => ({
          id,
          ...rest,
        }));
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
      await laf_listing();
    });

    const deleteFewItems = () => {
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
            deleteItem(item, true);
          });
          selectedIds.value.length = 0;
        }
      });
    };

    const deleteItem = (id: number, mul: boolean) => {
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
                deleteLAFReport(id);
                tableData.value.splice(i, 1);
              }
            });
          }
        }
      } else {
        for (let i = 0; i < tableData.value.length; i++) {
          if (tableData.value[i].id === id) {
            // Put your function here
            deleteLAFReport(id);
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
        let results: Array<ILafReport> = [];
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
        await laf_listing();
      }
    };

    async function SearchMore() {
      // Your API call logic here
      try {
        const response = await LaminarAirFlowSearch(search.value);

        more.value = response.result.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(({ id, ...rest }) => ({
          id,
          ...rest,
        }));
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

    const itemDetails = ref({
        id: "",
        laf_id: "",
        certificate_number: "NB-001",
        ulr_number: "TC-0001",
        d_receipt: "",
        d_testing: "",
        d_issue: "",
        r_due_date: "",
        description: "",
        make: "",
        model_no: "",
        serial_no: "",
        id_no: "",
        testing_at: "",
        room_name: "",
        room_id: "",
        temperature: 20.3,
        humidity: 53.0,
        differential_pressure: 10,
  
        inFlow: [
          {
            filter_id: "Row 1",
            l1: "",
            l2: "",
            l3: "",
            l4: "",
            l5: "",
            mean: 0,
            acceptance_limit: "0.40",
            output: "",
          },
        ],
        downFlow: [
          {
            filter_id: "Row 1",
            l1: "",
            l2: "",
            l3: "",
            l4: "",
            l5: "",
            mean: 0,
            acceptance_limit: "0.25-0.50",
            output: "",
          },
        ],
        filter: [
          {
            filter_id: "SH",
            upstream: "100",
            downstream: "",
            acceptance_limit: "0.01",
            output: "",
          },
        ],
        particle: [
          {
            particle_size: "0.3",
            l1: "",
            l2: "",
            l3: "",
            l4: "",
            l5: "",
            mean: 0,
            acceptance_limit: "10200",
            output: "",
          },
          {
            particle_size: "0.5",
            l1: "",
            l2: "",
            l3: "",
            l4: "",
            l5: "",
            mean: 0,
            acceptance_limit: "3520",
            output: "",
          },
          {
            particle_size: "5.0",
            l1: "",
            l2: "",
            l3: "",
            l4: "",
            l5: "",
            mean: 0,
            acceptance_limit: "0",
            output: "",
          },

        ],
        
        laminar : {
          id: "",
          service_request_id: "",
          cleanroom_instruments: [],
        },

        cleanroom_instruments : [
          {
            id: "",
            name: "",
            make: "",
            description: "",
            model_no: "",
            serial_no: "",
            calibration_date: "",
            calibration_due_date: "",
          }
        ],

        meta: {
          company_name: "",
          address1: "",
          address2: "",
          city: "",
          pincode: "",
          states: "",
          country: "",
        },

        service: {
          id: "",
          srf_no: "",
          customer_id: "",
          customer_name: "",
        },

        company_id: "",
        created_by: "",
        updated_by: "",

        createdByUser: {
          id: "",
          first_name: "",
          last_name: "",
        },
        updatedByUser: {
          id: "",
          first_name: "",
          last_name: "",
        },
      });


    // Download Laminar Air Flow Report
    const downloadLAFReport = async (id: any) => {
      // get all information of the rgp

      try {
        const res = await DownloadLAFReport(id);

        itemDetails.value.id = res.result.id;
        itemDetails.value.laf_id = res.result.room_name;
        itemDetails.value.certificate_number = res.result.certificate_number;
        itemDetails.value.ulr_number = res.result.ulr_number;
        itemDetails.value.d_receipt = res.result.d_receipt;
        itemDetails.value.d_testing = res.result.d_testing;
        itemDetails.value.d_issue = res.result.d_issue;
        itemDetails.value.r_due_date = res.result.r_due_date;
        itemDetails.value.description = res.result.description;
        itemDetails.value.make = res.result.make;
        itemDetails.value.model_no = res.result.model_no;
        itemDetails.value.serial_no = res.result.serial_no;
        itemDetails.value.id_no = res.result.id_no;
        itemDetails.value.testing_at = res.result.testing_at;
        itemDetails.value.room_name = res.result.room_name;
        itemDetails.value.room_id = res.result.room_id;

        itemDetails.value.temperature = res.result.temperature;
        itemDetails.value.humidity = res.result.humidity;
        itemDetails.value.differential_pressure = res.result.differential_pressure;

        itemDetails.value.inFlow = JSON.parse(res.result.inFlow);
        itemDetails.value.downFlow = JSON.parse(res.result.downFlow);
        itemDetails.value.filter = JSON.parse(res.result.filter);
        itemDetails.value.particle = JSON.parse(res.result.particle);

        itemDetails.value.company_id = res.result.company_id;
        itemDetails.value.created_by = res.result.created_by;
        itemDetails.value.updated_by = res.result.updated_by;

        
        itemDetails.value.meta = res.result.meta;
        itemDetails.value.service = res.result.service;
        itemDetails.value.cleanroom_instruments = res.result.cleanroom_instruments;

        const reportName = `${itemDetails.value.service.srf_no}`;

        await LAFReportGen(id, reportName, itemDetails);
        console.log(itemDetails.value)
      } catch (error) {
        console.log(error);
        alert("Unable to download the report. Please try again.");
      }
    };



    return {
      tableData,
      tableHeader,
      deleteItem,
      search,
      searchItems,
      selectedIds,
      deleteFewItems,
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
      identifier,
      filteredTableHeader,
      itemId,
      downloadLAFReport,
    };
  },
});
</script>
  