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
          <button type="button" class="btn btn-danger" @click="deleteFewRGP()">
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
          <span class="text-gray-600 text-hover-primary mb-1">
            {{ rgps.id }}
          </span>
        </template>
        <template v-slot:rgp_no="{ row: rgps }">
          <span class="text-gray-600 text-hover-primary mb-1">
            {{ rgps.rgp_no }}
          </span>
        </template>
        <template v-slot:customer_name="{ row: rgps }">
          <span class="text-gray-600 text-hover-primary mb-1">
            {{ rgps.customer_name }}
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
          <!--begin::Menu Flex-->
          <div class="d-flex flex-lg-row">
            <span class="menu-link px-3">
              <i
                @click="downloadRGP(rgps.id)"
                class="cursor-pointer bi bi-download text-gray-600 text-hover-danger mb-1 fs-2"
              ></i>
            </span>
            <span class="menu-link px-3">
              <i
                @click="deleteRGP(rgps.id, false)"
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
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent, onMounted, ref } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import type { IRGP } from "@/core/model/rgps";
import {
  getAllRGatePass,
  deleteRGatePass,
  getRGPInfo,
  gatePassSearch,
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

export default defineComponent({
  name: "rgp_listing",
  components: {
    Datatable,
    ApprovalModal,
  },
  setup() {
    const auth = useAuthStore();
    const User = auth.GetUser();
    const identifier = Identifier;
    const tableHeader = ref([
      {
        columnName: "Id",
        columnLabel: "id",
        sortEnabled: true,
        columnWidth: 35,
      },
      {
        columnName: "RGP No.",
        columnLabel: "rgp_no",
        sortEnabled: true,
        columnWidth: 75,
      },
      {
        columnName: "Customer Name",
        columnLabel: "customer_name",
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
          `page=${page}&limit=${limit.value}`
        );

        more.value = response.result.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(
          ({
            id,
            rgp_no,
            customer_name,
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
            customer_name: customer_name.company_name,
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
          `page=${page.value}&limit=${limit}`
        );

        more.value = response.result.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(
          ({
            id,
            rgp_no,
            customer_name,
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
            customer_name: customer_name.company_name,
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

    async function rgp_listing(): Promise<void> {
      try {
        const response = await getAllRGatePass(
          `page=${page.value}&limit=${limit.value}`
        );
        console.log(response);
        tableData.value = response.result.data.map(
          ({
            id,
            rgp_no,
            customer_name,
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
            customer_name: customer_name.company_name,
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

    onMounted(async () => {
      await rgp_listing();
    });

    const rgpInfo = ref({
      id: "",
      rgp_no: "",
      date: "",
      duedate: "",
      engineers: [],
      instruments: [],
      status: "",
      quotation_no: "",
      customer_data: {
        company_id: "",
        first_name: "",
        last_name: "",
      },
      client_data: {
        company_id: "",
        first_name: "",
        last_name: "",
      },
      customer_company: {
        company_name: "",
      },
      client_company: {
        company_name: "",
      },
      customer_address: {
        address1: "",
        address2: "",
        city: "",
        pincode: "",
        states: "",
        country: "",
      },
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
    });

    const downloadRGP = async (id: any) => {
      // get all information of the rgp
      const res = await getRGPInfo(id);
      rgpInfo.value.id = res.result.id;
      rgpInfo.value.rgp_no = res.result.rgp_no;
      rgpInfo.value.date = res.result.date;
      rgpInfo.value.duedate = res.result.duedate;
      rgpInfo.value.engineers = await res.result.engData;
      rgpInfo.value.instruments = await res.result.instData;
      rgpInfo.value.customer_company.company_name =
        res.result.customer_company.company_name;
      rgpInfo.value.client_company.company_name =
        res.result.client_company.company_name;
      rgpInfo.value.customer_address = res.result.customer_address;
      rgpInfo.value.client_address = res.result.client_address;
      rgpInfo.value.customer_data = res.result.customer_data;
      rgpInfo.value.client_data = res.result.client_data;
      rgpInfo.value.quotation_no = res.result.quotationsDetails.quotation_no;
      rgpInfo.value.company_details.company_name =
        res.result.company_details.company_name;
      rgpInfo.value.company_details.company_logo = res.result.company_details
        .company_logo
        ? "data: image/png;base64," + res.result.company_details.company_logo
        : getAssetPath("media/avatars/default.png");

      console.log(rgpInfo.value);

      await rgpGen(id, rgpInfo.value.rgp_no, rgpInfo);
    };

    const deleteFewRGP = () => {
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
            deleteRGP(item, true);
          });
          selectedIds.value.length = 0;
        }
      });
    };

    const deleteRGP = (id: number, mul: boolean) => {
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
                deleteRGatePass(id);
                tableData.value.splice(i, 1);
              }
            });
          }
        }
      } else {
        for (let i = 0; i < tableData.value.length; i++) {
          if (tableData.value[i].id === id) {
            // Put your function here
            deleteRGatePass(id);
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
        const response = await gatePassSearch(search.value);

        more.value = response.result.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(
          ({
            id,
            rgp_no,
            customer_name,
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
            customer_name: customer_name.company_name,
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
      deleteRGP,
      search,
      searchItems,
      selectedIds,
      deleteFewRGP,
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
    };
  },
});
</script>
  