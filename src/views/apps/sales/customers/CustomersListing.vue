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
            placeholder="Search Customers"
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
            Add Customer
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
            @click="deleteFewCustomers()"
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
        <!-- img data -->
        <template v-slot:name="{ row: customer }">
          <div class="d-flex justify-content-start align-items-center">
            <!-- <img :src="user.name" class="w-45px rounded-circle" alt="" /> -->
            <span style="margin-left: 5.5%">
              <span class="text-gray-600 text-hover-primary mb-1">
                {{ customer.first_name + " " + customer.last_name }}
              </span>
            </span>
          </div>
        </template>
        <!-- defualt data -->
        <template v-slot:email="{ row: customer }">
          <a
            v-bind:href="'mailto:' + customer.email"
            class="text-gray-600 text-hover-primary mb-1"
          >
            {{ customer.email }}
          </a>
        </template>
        <template v-slot:mobile="{ row: customer }">
          {{ customer.mobile }}
        </template>
        <template v-slot:company="{ row: customer }">
          {{ customer.meta.company_name }}
        </template>
        <template v-slot:date="{ row: customer }">
          {{ customer.created_at }}
        </template>
        <template v-slot:actions="{ row: customer }">
          <!--begin::Menu Flex-->
          <div class="d-flex flex-lg-row">
            <span class="menu-link px-3">
              <router-link :to="`./edit/${customer.id}`">
                <i
                  class="las la-edit text-gray-600 text-hover-primary mb-1 fs-1"
                ></i>
              </router-link>
            </span>
            <span>
              <i
                @click="deleteCustomer(customer.id, false)"
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
import { defineComponent, onMounted, ref } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import type { ICustomers } from "@/core/model/customers";
import arraySort from "array-sort";
import ApiService from "@/core/services/ApiService";
import { get_role } from "@/core/config/PermissionsRolesConfig";
import moment from "moment";
import Swal from "sweetalert2";
import { deletecustomer, CustomerSearch, getCustomers } from "@/stores/api";
export default defineComponent({
  name: "customers-list",
  components: {
    Datatable,
  },
  setup() {
    const loading = ref(true);
    const tableHeader = ref([
      {
        columnName: "Name",
        columnLabel: "name",
        sortEnabled: true,
        columnWidth: 155,
      },
      {
        columnName: "Email",
        columnLabel: "email",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Mobile",
        columnLabel: "mobile",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Company Name",
        columnLabel: "company",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Created Date",
        columnLabel: "date",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Actions",
        columnLabel: "actions",
        sortEnabled: false,
        columnWidth: 75,
      },
    ]);

    // functions
    // get users function
    async function customer_listing(): Promise<void> {
      try {
        ApiService.setHeader();
        const response = await getCustomers(
          `page=${page.value}&limit=${limit.value}`
        );
        // console.log(response);
        more.value = response.result.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(
          ({ created_at, role_id, ...rest }) => ({
            ...rest,
            created_at: moment(created_at).format("MMMM Do YYYY"),
            role_id: get_role(role_id),
          })
        );
        initvalues.value.splice(0, tableData.value.length, ...tableData.value);
      } catch (error) {
        console.error(error);
      } finally {
        //console.log("done");
      }
    }

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

    const selectedIds = ref<Array<number>>([]);
    const tableData = ref<Array<ICustomers>>([]);
    const initvalues = ref<Array<ICustomers>>([]);

    const PagePointer = async (page) => {
      // ? Truncate the tableData
      //console.log(limit.value);
      loading.value = true;
      try {
        while (tableData.value.length != 0) tableData.value.pop();
        while (initvalues.value.length != 0) initvalues.value.pop();

        const response = await getCustomers(
          `page=${page}&limit=${limit.value}`
        );
        
        more.value = response.result.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(
          ({ created_at, role_id, ...rest }) => ({
            ...rest,
            created_at: moment(created_at).format("MMMM Do YYYY"),
            role_id: get_role(role_id),
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

        const response = await getCustomers(
          `page=${page.value}&limit=${limit}`
        );
        
        more.value = response.result.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(
          ({ created_at, role_id, ...rest }) => ({
            ...rest,
            created_at: moment(created_at).format("MMMM Do YYYY"),
            role_id: get_role(role_id),
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

    onMounted(async () => {
      await customer_listing();
      setTimeout(() => {
        loading.value = false;
      }, 250);
    });

    const deleteFewCustomers = () => {
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
            deleteCustomer(item, true);
          });
          selectedIds.value.length = 0;
        }
      });
    };

    const deleteCustomer = (id: number, mul: boolean) => {
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
                deletecustomer(id);
                tableData.value.splice(i, 1);
              }
            });
          }
        }
      } else {
        for (let i = 0; i < tableData.value.length; i++) {
          if (tableData.value[i].id === id) {
            // Put your function here
            deletecustomer(id);
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
        let results: Array<ICustomers> = [];
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
          }, 1000);
        }
      }
       else {
        page.value = 1;
        while (tableData.value.length != 0) tableData.value.pop();
        while (initvalues.value.length != 0) initvalues.value.pop();
        await customer_listing();
      }
    };

    async function SearchMore() {
      // Your API call logic here
      try {
        const response = await CustomerSearch(search.value);
        
        more.value = response.result.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(
          ({ created_at, role_id, ...rest }) => ({
            ...rest,
            created_at: moment(created_at).format("MMMM Do YYYY"),
            role_id: get_role(role_id),
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

    return {
      tableData,
      tableHeader,
      deleteCustomer,
      search,
      searchItems,
      selectedIds,
      deleteFewCustomers,
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
    };
  },
});
</script>
