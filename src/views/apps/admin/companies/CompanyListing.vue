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
            placeholder="Search Companies"
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
          <button
            type="button"
            class="btn btn-light-warning me-3"
            @click="more"
          >
            {{ total }} More Results
          </button>
          <!--end::Export-->
          <!--begin::Add customer-->
          <router-link to="./add" class="btn btn-primary">
            <KTIcon icon-name="plus" icon-class="fs-2" />
            Add Company
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
            @click="deleteFewCompany()"
          >
            Delete Selected
          </button>
        </div>
      </div>
      <!--end::Card toolbar-->
    </div>
    <div class="card-body pt-0">
      <Datatable
        @on-sort="sort"
        @on-items-select="onItemSelect"
        :data="tableData"
        :header="tableHeader"
        :enable-items-per-page-dropdown="true"
        :checkbox-enabled="true"
        :itemsPerPageDropdownEnabled="true"
        :items-per-page="25"
        checkbox-label="id"
        :loading="loading"
      >
        <template v-slot:company_name="{ row: company }">
          {{ company.company_name }}
        </template>
        <template v-slot:email="{ row: company }">
          <a
            v-bind:href="'mailto:' + company.email"
            class="text-gray-600 text-hover-primary mb-1"
          >
            {{ company.email }}
          </a>
        </template>
        <template v-slot:address="{ row: company }">
          {{ company.address }}
        </template>
        <template v-slot:created_at="{ row: company }">
          {{ company.created_at }}
        </template>
        <template v-slot:actions="{ row: company }">
          <!--begin::Menu Flex-->
          <div class="d-flex flex-lg-row">
            <span class="menu-link px-3">
              <router-link :to="`./edit/${company.id}`">
                <i
                  class="las la-edit text-gray-600 text-hover-primary mb-1 fs-1"
                ></i>
              </router-link>
            </span>
            <span>
              <i
                @click="deleteCompany(company.id, false)"
                class="las la-minus-circle text-gray-600 text-hover-danger mb-1 fs-2"
              ></i>
            </span>
          </div>
          <!--end::Menu FLex-->
          <!--end::Menu-->
        </template>
      </Datatable>
    </div>
  </div>

  <ExportCustomerModal></ExportCustomerModal>
  <AddCustomerModal></AddCustomerModal>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import ExportCustomerModal from "@/components/modals/forms/ExportCustomerModal.vue";
import AddCustomerModal from "@/components/modals/forms/AddCustomerModal.vue";
import type { ICompany } from "@/core/model/company";
import arraySort from "array-sort";
import ApiService from "@/core/services/ApiService";
import moment from "moment";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { deletecompany, getCompanies } from "@/stores/api";

export default defineComponent({
  name: "company-listing",
  components: {
    Datatable,
    ExportCustomerModal,
    AddCustomerModal,
  },
  setup() {
    const tableHeader = ref([
      {
        columnName: "Company Name",
        columnLabel: "company_name",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Compnay Email",
        columnLabel: "email",
        sortEnabled: true,
        columnWidth: 230,
      },
      {
        columnName: "Company Address",
        columnLabel: "address",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Created Date",
        columnLabel: "created_at",
        sortEnabled: true,
        columnWidth: 225,
      },
      {
        columnName: "Actions",
        columnLabel: "actions",
        sortEnabled: false,
        columnWidth: 75,
      },
    ]);

    const loading = ref(true);
    // staring from 2
    let page = ref(1);
    let limit = ref(20);
    const selectedIds = ref<Array<number>>([]);
    const tableData = ref<Array<ICompany>>([]);
    const initCompanies = ref<Array<ICompany>>([]);
    const total = ref(0);
    // functions

    // more
    const more = async () => {
      ApiService.setHeader();
      const response = await getCompanies(
        `page=${page.value}&limit=${limit.value}`
      );
      if (total.value > 0) {
        tableData.value.push(
          ...response.result.data.data.map(({ created_at, ...rest }) => ({
            ...rest,
            created_at: moment(created_at).format("MMMM Do YYYY"),
          }))
        );
        initCompanies.value
          .splice(
            tableData.value.length,
            0,
            ...tableData.value.filter(
              (value, index, self) => self.indexOf(value) === index
            )
          )
          .filter((value, index, self) => self.indexOf(value) === index);
      }
      page.value = page.value + 1;
      total.value = total.value - response.result.data.data.length;
    };

    const onpageChange = async () => {
      if (total.value > 0) {
        await more();
        total.value -= limit.value;
      }
    };

    // get_compaines
    const company_listing = async () => {
      try {
        ApiService.setHeader();
        const response = await getCompanies(`page=${page.value}`);
        page.value = page.value + 1;
        console.log(response.result.total_count);
        // first 20 displayed
        total.value =
          response.result.total_count - response.result.data.data.length;
        tableData.value = response.result.data.data.map(
          ({ created_at, ...rest }) => ({
            ...rest,
            created_at: moment(created_at).format("MMMM Do YYYY"),
          })
        );
        initCompanies.value.splice(
          0,
          tableData.value.length,
          ...tableData.value
        );
      } catch (error) {
        console.error(error);
      } finally {
        //console.log("done");
      }
    };

    onMounted(async () => {
      await company_listing();
      setTimeout(() => {
        loading.value = false;
      }, 250);
    });

    const deleteFewCompany = () => {
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
            deleteCompany(item, true);
          });
          selectedIds.value.length = 0;
        }
      });
    };

    const deleteCompany = (id: number, mul: boolean) => {
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
                deletecompany(id);
                tableData.value.splice(i, 1);
              }
            });
          }
        }
      } else {
        for (let i = 0; i < tableData.value.length; i++) {
          if (tableData.value[i].id === id) {
            // Put your function here
            deletecompany(id);
            tableData.value.splice(i, 1);
          }
        }
      }
    };

    const search = ref<string>("");
    const searchItems = () => {
      tableData.value.splice(0, tableData.value.length, ...initCompanies.value);
      if (search.value !== "") {
        let results: Array<ICompany> = [];
        for (let j = 0; j < tableData.value.length; j++) {
          if (searchingFunc(tableData.value[j], search.value)) {
            results.push(tableData.value[j]);
          }
        }
        tableData.value.splice(0, tableData.value.length, ...results);
      }
    };

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

    return {
      tableData,
      tableHeader,
      deleteCompany,
      search,
      searchItems,
      selectedIds,
      deleteFewCompany,
      sort,
      onItemSelect,
      getAssetPath,
      loading,
      onpageChange,
      total,
      more,
    };
  },
});
</script>
