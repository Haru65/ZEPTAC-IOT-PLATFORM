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
            placeholder="Search document no. section"
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
          <button
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_internal_doc"
          >
            <KTIcon icon-name="plus" icon-class="fs-2" />
            Add Document
          </button>
          <!--end::Add customer-->

          <FormsAndFormatsAddModal
            @document-added="reLoadData"
          ></FormsAndFormatsAddModal>
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
            @click="deleteFewDocument()"
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
      <ApprovalModal
        @reloadData="reLoadData"
        v-bind:data="itemData"
      ></ApprovalModal>

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
        <!-- img data -->
        <template v-slot:id="{ row: formformat }">
          {{ formformat.id }}
        </template>
        <template v-slot:document_section="{ row: formformat }">
          {{ formformat.document_section }}
        </template>
        <template v-slot:document_name="{ row: formformat }">
          {{ formformat.document_name }}
        </template>
        <template v-slot:issue_date="{ row: formformat }">
          <span class="badge py-3 px-4 fs-7 badge-light-primary">{{
            formformat.issue_date
          }}</span>
        </template>
        <template v-slot:amendment_date="{ row: formformat }">
          <span class="badge py-3 px-4 fs-7 badge-light-primary">{{
            formformat.amendment_date
          }}</span>
        </template>
        <template v-slot:storage_medium="{ row: formformat }">
          {{ formformat.storage_medium }}
        </template>
        <template v-slot:responsible_person="{ row: formformat }">
          {{ formformat.responsible_person }}
        </template>
        <template v-slot:document_file="{ row: formformat }">
          <!--begin::Menu Flex-->
          <div class="d-flex flex-lg-row">
            <a
              target="blank"
              v-bind:href="`http://localhost:8000/storage/company/${formformat.company_id}/form_format/${formformat.document_file}`"
              data-toggle="tooltip"
              title="Download File"
              class="border rounded badge py-3 px-4 fs-7 badge-light-primary text-hover-success cursor-pointer"
              >⤓ File
            </a>
          </div>
          <!--end::Menu FLex-->
        </template>

        <template v-slot:approval_status="{ row: formformat }">
          <span
            v-if="formformat.approval_status == 1"
            class="badge py-3 px-4 fs-7 badge-light-primary"
            >{{ GetApprovalStatus(formformat.approval_status) }}</span
          >
          <span
            v-if="formformat.approval_status == 2"
            class="badge py-3 px-4 fs-7 badge-light-danger"
            >{{ GetApprovalStatus(formformat.approval_status) }}</span
          >
          <span
            v-if="formformat.approval_status == 3"
            class="badge py-3 px-4 fs-7 badge-light-success"
            >{{ GetApprovalStatus(formformat.approval_status) }}</span
          >
        </template>

        <template v-slot:approval_button="{ row: formformat }">
          <button
            type="button"
            class="btn btn-sm btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_1"
            @click="fillItemData(formformat)"
          >
            Open
          </button>
        </template>

        <template v-slot:actions="{ row: formformat }">
          <!--begin::Menu Flex-->
          <div class="d-flex flex-lg-row">
            <span class="menu-link px-3">
              <router-link :to="`/forms_and_formats/edit/${formformat.id}`">
                <i
                  class="las la-edit text-gray-600 text-hover-primary mb-1 fs-1"
                ></i>
              </router-link>
            </span>
            <span class="menu-link px-3">
              <i
                @click="deleteDocument(formformat.id, false)"
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
import type { IDocument } from "@/core/model/formformat";
import { ApprovalStatus, GetApprovalStatus } from "@/core/model/global";
import { hideModal } from "@/core/helpers/dom";
import ApprovalModal from "./ApprovalModal.vue";
import { useAuthStore } from "@/stores/auth";
import { Identifier } from "@/core/config/WhichUserConfig";
import {
  getFormAndFormats,
  deleteFormAndFormat,
  FormAndFormatSearch,
} from "@/stores/api";
import arraySort from "array-sort";
import moment from "moment";
import Swal from "sweetalert2";

import FormsAndFormatsAddModal from "./FormsAndFormatsAddModal.vue";

export default defineComponent({
  name: "forms-formats",
  components: {
    Datatable,
    FormsAndFormatsAddModal,
    ApprovalModal,
  },
  setup() {
    const auth = useAuthStore();
    const User = auth.GetUser();
    const identifier = Identifier;

    const tableHeader = ref([
      {
        columnName: "Document Number with Section",
        columnLabel: "document_section",
        sortEnabled: true,
        columnWidth: 100,
      },
      {
        columnName: "Document Name",
        columnLabel: "document_name",
        sortEnabled: true,
        columnWidth: 100,
      },
      {
        columnName: "Issue Date",
        columnLabel: "issue_date",
        sortEnabled: true,
        columnWidth: 75,
      },
      {
        columnName: "Amendment Date",
        columnLabel: "amendment_date",
        sortEnabled: true,
        columnWidth: 75,
      },
      {
        columnName: "Storage Medium",
        columnLabel: "storage_medium",
        sortEnabled: true,
        columnWidth: 75,
      },
      {
        columnName: "Responsible Person",
        columnLabel: "responsible_person",
        sortEnabled: true,
        columnWidth: 75,
      },
      {
        columnName: "File",
        columnLabel: "document_file",
        sortEnabled: true,
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

        const response = await getFormAndFormats(
          `page=${page}&limit=${limit.value}`
        );

        more.value = response.result.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(({ ...rest }) => ({
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

        const response = await getFormAndFormats(
          `page=${page.value}&limit=${limit}`
        );

        more.value = response.result.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(({ ...rest }) => ({
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

    const tableData = ref<Array<IDocument>>([]);

    const initvalues = ref<Array<IDocument>>([]);

    async function formformat_listing(): Promise<void> {
      try {
        const response = await getFormAndFormats(
          `page=${page.value}&limit=${limit.value}`
        );
        tableData.value = response.result.data.map(({ ...rest }) => ({
          ...rest,
        }));

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
      await formformat_listing();
    });

    const deleteFewDocument = () => {
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
            deleteDocument(item, true);
          });
          selectedIds.value.length = 0;
        }
      });
    };

    const deleteDocument = (id: number, mul: boolean) => {
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
                deleteFormAndFormat(id);
                tableData.value.splice(i, 1);
              }
            });
          }
        }
      } else {
        for (let i = 0; i < tableData.value.length; i++) {
          if (tableData.value[i].id === id) {
            // Put your function here
            deleteFormAndFormat(id);
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
        let results: Array<IDocument> = [];
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
        await formformat_listing();
      }
    };

    async function SearchMore() {
      // Your API call logic here
      try {
        const response = await FormAndFormatSearch(search.value);

        tableData.value = response.result.data.map(({ ...rest }) => ({
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

    async function reLoadData() {
      await formformat_listing();
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
      reLoadData,
      deleteDocument,
      search,
      searchItems,
      selectedIds,
      deleteFewDocument,
      sort,
      onItemSelect,
      loading,
      limit,
      PrevPage,
      NextPage,
      page,
      Limits,
      PageLimitPoiner,
      filteredTableHeader,
      ApprovalStatus,
      GetApprovalStatus,
      itemData,
      fillItemData,
      identifier,
    };
  },
});
</script>
      
      