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
            placeholder="Search Procedure"
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
          <router-link to="/quality/add" class="btn btn-primary">
            <KTIcon icon-name="plus" icon-class="fs-2" />
            Add Document
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
            @click="deleteFewProcedure()"
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

        <template v-slot:id="{ row: qualprocedure }">
          {{ qualprocedure.id }}
        </template>
        <template v-slot:document_name="{ row: qualprocedure }">
          {{ qualprocedure.document_name }}
        </template>
        <template v-slot:issue_date="{ row: qualprocedure }">
          {{ qualprocedure.issue_date }}
        </template>
        <template v-slot:issue_no="{ row: qualprocedure }">
          {{ qualprocedure.issue_no }}
        </template>
        <template v-slot:revision_date="{ row: qualprocedure }">
          {{ qualprocedure.revision_date }}
        </template>
        <template v-slot:revision_no="{ row: qualprocedure }">
          {{ qualprocedure.revision_no }}
        </template>
        <template v-slot:prepared_by="{ row: qualprocedure }">
          {{ qualprocedure.prepared_by }}
        </template>
        <template v-slot:approved_by="{ row: qualprocedure }">
          {{ qualprocedure.approved_by }}
        </template>
        <template v-slot:created_at="{ row: qualprocedure }">
          {{ qualprocedure.created_at }}
        </template>
        <template v-slot:actions="{ row: qualprocedure }">
          <!--begin::Menu Flex-->
          <div class="d-flex flex-lg-row">
            <span class="menu-link px-3">
              <i
                @click="downloadDocument(qualprocedure.id)"
                class="cursor-pointer bi bi-download text-gray-600 text-hover-danger mb-1 fs-2"
              ></i>
            </span>
            <span class="menu-link px-3">
              <router-link :to="`/quality/edit/${qualprocedure.id}`">
                <i
                  class="las la-edit text-gray-600 text-hover-primary mb-1 fs-1"
                ></i>
              </router-link>
            </span>
            <span class="menu-link px-3">
              <i
                @click="deleteProcedure(qualprocedure.id, false)"
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
import { defineComponent, onMounted, ref } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable/table-partials/models";
import type { IQualProcedure } from "@/core/model/qualprocedure";
import {
  getQualityProcedures,
  deleteQualityProcedure,
  QualityProcedureSearch,
getQualityProcedure,
} from "@/stores/api";
import arraySort from "array-sort";
import moment from "moment";
import Swal from "sweetalert2";

export default defineComponent({
  name: "quality-list",
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
        columnName: "Document Name",
        columnLabel: "document_name",
        sortEnabled: true,
        columnWidth: 80,
      },
      {
        columnName: "Issue Date",
        columnLabel: "issue_date",
        sortEnabled: true,
        columnWidth: 75,
      },
      {
        columnName: "Issue No",
        columnLabel: "issue_no",
        sortEnabled: true,
        columnWidth: 75,
      },
      {
        columnName: "Revision Date",
        columnLabel: "revision_date",
        sortEnabled: true,
        columnWidth: 75,
      },
      {
        columnName: "Revision No",
        columnLabel: "revision_no",
        sortEnabled: true,
        columnWidth: 75,
      },
      {
        columnName: "Prepared By",
        columnLabel: "prepared_by",
        sortEnabled: true,
        columnWidth: 75,
      },
      {
        columnName: "Approved By",
        columnLabel: "approved_by",
        sortEnabled: true,
        columnWidth: 75,
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

        const response = await getQualityProcedures(
          `page=${page}&limit=${limit.value}`
        );
        //console.log(response.result.total_count);
        // first 20 displayed
        total.value = response.result.total_count;
        more.value = response.result.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(
          ({
            id,
            document_name,
            issue_date,
            issue_no,
            revision_date,
            revision_no,
            prepared_by,
            approved_by,
            created_at,
          }) => ({
            id,
            document_name,
            issue_date: moment(issue_date).format("MMM Do YY"),
            issue_no,
            revision_date: moment(revision_date).format("MMM Do YY"),
            revision_no,
            prepared_by,
            approved_by,
            created_at: moment(created_at).format("MMM Do YY"),
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

        const response = await getQualityProcedures(
          `page=${page.value}&limit=${limit}`
        );
        //console.log(response.result.total_count);
        // first 20 displayed
        total.value = response.result.total_count;
        more.value = response.result.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(
          ({
            id,
            document_name,
            issue_date,
            issue_no,
            revision_date,
            revision_no,
            prepared_by,
            approved_by,
            created_at,
          }) => ({
            id,
            document_name,
            issue_date: moment(issue_date).format("MMM Do YY"),
            issue_no,
            revision_date: moment(revision_date).format("MMM Do YY"),
            revision_no,
            prepared_by,
            approved_by,
            created_at: moment(created_at).format("MMM Do YY"),
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

    const tableData = ref<Array<IQualProcedure>>([]);

    const initvalues = ref<Array<IQualProcedure>>([]);

    async function quality_listing(): Promise<void> {
      try {
        const response = await getQualityProcedures(
          `page=${page.value}&limit=${limit.value}`
        );
        tableData.value = response.result.data.map(
          ({
            id,
            document_name,
            issue_date,
            issue_no,
            revision_date,
            revision_no,
            prepared_by,
            approved_by,
            created_at,
          }) => ({
            id,
            document_name,
            issue_date: moment(issue_date).format("MMM Do YY"),
            issue_no,
            revision_date: moment(revision_date).format("MMM Do YY"),
            revision_no,
            prepared_by,
            approved_by,
            created_at: moment(created_at).format("MMM Do YY"),
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
      await quality_listing();
    });

    const deleteFewProcedure = () => {
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
            deleteProcedure(item, true);
          });
          selectedIds.value.length = 0;
        }
      });
    };

    const deleteProcedure = (id: number, mul: boolean) => {
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
                deleteQualityProcedure(id);
                tableData.value.splice(i, 1);
              }
            });
          }
        }
      } else {
        for (let i = 0; i < tableData.value.length; i++) {
          if (tableData.value[i].id === id) {
            // Put your function here
            deleteQualityProcedure(id);
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
        let results: Array<IQualProcedure> = [];
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
        await quality_listing();
      }
    };

    async function SearchMore() {
      // Your API call logic here
      try {
        const response = await QualityProcedureSearch(search.value);
        //console.log(response.result.total_count);
        // first 20 displayed
        tableData.value = response.result.data.data.map(
          ({
            id,
            document_name,
            issue_date,
            issue_no,
            revision_date,
            revision_no,
            prepared_by,
            approved_by,
            created_at,
          }) => ({
            id,
            document_name,
            issue_date: moment(issue_date).format("MMM Do YY"),
            issue_no,
            revision_date: moment(revision_date).format("MMM Do YY"),
            revision_no,
            prepared_by,
            approved_by,
            created_at: moment(created_at).format("MMM Do YY"),
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

    function downloadFileObject(base64String) {
      const linkSource = base64String;
      const downloadLink = document.createElement("a");
      const fileName = "Document.pdf";
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    }

    const downloadDocument = async (id: any) => {
      try {
        const res = await getQualityProcedure(id);

        const { uploaded_pdf_name, uploaded_pdf_data } = res;

        // get base64Data
        let base64String = uploaded_pdf_data.replace(
          /^data:application\/\pdf+;base64,/,
          ""
        );

        // check whether data starts with JVB, JVB is a prefix for pdf files 

        if (base64String.startsWith("JVB")) {
          base64String = "data:application/pdf;base64," + base64String;
          downloadFileObject(base64String);
        } else if (base64String.startsWith("data:application/pdf;base64")) {
          downloadFileObject(base64String);
        } else {
          alert("Not a valid Base64 PDF string. Please check");
        }
        
      } catch (error) {
        console.error("Error downloading PDF:", error);
      }
    };

    return {
      tableData,
      tableHeader,
      deleteProcedure,
      search,
      searchItems,
      selectedIds,
      deleteFewProcedure,
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
