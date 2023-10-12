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
              placeholder="Search Service Engineer"
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
              @click="deleteFewExpenseSheets()"
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
          <template v-slot:rgp_no="{ row: expensesheets }">
            <span class="text-gray-600 text-hover-primary mb-1">
              {{ expensesheets.rgp_no.rgp_no }}
            </span>
          </template>
          <template v-slot:customer_name="{ row: expensesheets }">
            <span class="text-gray-600 text-hover-primary mb-1">
                  {{ expensesheets.customer_name.first_name + " " + expensesheets.customer_name.last_name }}
            </span>
          </template>
          <template v-slot:engineer_name="{ row: expensesheets }">
            <span class="text-gray-600 text-hover-primary mb-1">
                  {{ expensesheets.engineer_name.first_name + " " + expensesheets.engineer_name.last_name }}
            </span>
          </template>
          <!-- defualt data -->
          <template v-slot:total_amount="{ row: expensesheets }">
          {{ formatPrice(expensesheets.total_amount) }}
          </template>
          <template v-slot:status="{ row: expensesheets }">
            <span
            v-if="expensesheets.status == 1"
            class="badge py-3 px-4 fs-7 badge-light-primary"
            >Pending</span
          >
          <span
            v-if="expensesheets.status == 2"
            class="badge py-3 px-4 fs-7 badge-light-danger"
            >Rejected</span
          >
          <span
            v-if="expensesheets.status == 3"
            class="badge py-3 px-4 fs-7 badge-light-success"
            >Approved</span
          >
          </template>
          <template v-slot:actions="{ row: expensesheets }">
            <!--begin::Menu Flex-->
            <div class="d-flex flex-lg-row">
              <span class="menu-link px-3">
                <router-link :to="`/expensesheets/edit/${expensesheets.id}`">
                  <i
                    class="las la-edit text-gray-600 text-hover-primary mb-1 fs-1"
                  ></i>
                </router-link>
              </span>
              <span>
                <i
                  @click="deleteSheets(expensesheets.id, false)"
                  class="bi bi-trash text-gray-600 text-hover-danger mb-1 fs-2"
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
import type { IExpenseSheet } from "@/core/model/expensesheets";
import arraySort from "array-sort";
import moment from "moment";
import { deleteExpenseSheet, getPendingExpenseSheets, ExpenseSheetSearch } from "@/stores/api";
import Swal from "sweetalert2";
import { formatPrice } from "@/core/config/DataFormatter";

export default defineComponent({
  name: "expensesheets_listing",
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
        columnName: "Total Expense",
        columnLabel: "total_amount",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Status",
        columnLabel: "status",
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

    // staring from 2
    let page = ref(1);
    let limit = ref(50);
    // limit 10
    const more = ref(false);

    const selectedIds = ref<Array<number>>([]);
    const tableData = ref<Array<IExpenseSheet>>([]);
    const initvalues = ref<Array<IExpenseSheet>>([]);
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
    async function expensesheets_listing(): Promise<void> {
      try {
        const response = await getPendingExpenseSheets(
          `page=${page.value}&limit=${limit.value}`
        );
        console.log(response);
        total.value = response.result.total_count;
        more.value = response.result.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(
          ({ ...rest }) => ({
            ...rest
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

        const response = await getPendingExpenseSheets(`page=${page}&limit=${limit.value}`);
        //console.log(response.result.total_count);
        // first 20 displayed
        total.value = response.result.total_count;
        more.value = response.result.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(
          ({ ...rest }) => ({
            ...rest
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

        const response = await getPendingExpenseSheets(`page=${page.value}&limit=${limit}`);
        //console.log(response.result.total_count);
        // first 20 displayed
        total.value = response.result.total_count;
        more.value = response.result.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(
          ({ ...rest }) => ({
            ...rest
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
      await expensesheets_listing();
    });

    const deleteFewExpenseSheets = () => {
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
            deleteSheets(item, true);
          });
          selectedIds.value.length = 0;
        }
      });
    };

    const deleteSheets = (id: number, mul: boolean) => {
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
                deleteExpenseSheet(id);
                tableData.value.splice(i, 1);
              }
            });
          }
        }
      } else {
        for (let i = 0; i < tableData.value.length; i++) {
          if (tableData.value[i].id === id) {
            // Put your function here
            deleteExpenseSheet(id);
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
        let results: Array<IExpenseSheet> = [];
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
        await expensesheets_listing();
      }
    };

    async function SearchMore() {
      // Your API call logic here
      try {
        const response = await ExpenseSheetSearch(search.value);
        //console.log(response.result.total_count);
        // first 20 displayed
        total.value = response.result.total_count;
        more.value = response.result.data.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(
          ({...rest }) => ({
            ...rest
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
      deleteSheets,
      search,
      searchItems,
      selectedIds,
      deleteFewExpenseSheets,
      sort,
      onItemSelect,
      getAssetPath,
      expensesheets_listing,
      loading,
      NextPage,
      PrevPage,
      total,
      page,
      limit,
      PageLimitPoiner,
      Limits,
      formatPrice,
    };
  },
});
</script>
