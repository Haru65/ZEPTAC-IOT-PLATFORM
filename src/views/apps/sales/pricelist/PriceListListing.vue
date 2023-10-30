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
            placeholder="Search Product"
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
            Add Item
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
          <button type="button" class="btn btn-danger" @click="deleteFewItem()">
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
        <template v-slot:id="{ row: pricelist }">
          {{ pricelist.id }}
        </template>
        <template v-slot:customer_type="{ row: pricelist }">
          {{ pricelist.customer_type }}
        </template>
        <!-- defualt data -->
        <template v-slot:site_location="{ row: pricelist }">
          {{ pricelist.site_location }}
        </template>
        <template v-slot:per_day_charge="{ row: pricelist }">
          {{ formatPrice(pricelist.per_day_charge) }}
        </template>
        <template v-slot:equipment_wise="{ row: pricelist }">
          <div>
            <el-select
              filterable
              placeholder="Equipment Wise Charges's"
            >
              <el-option
                disabled="disabled"
                v-for="(equip,index) in pricelist.equipment_wise"
                :key="index"
                :value="`${equip.name} --- ${formatPrice(equip.charge)}`"
                :label="`${equip.name} --- ${formatPrice(equip.charge)}`"
              />
            </el-select>
          </div>
        </template>
        <template v-slot:accommodation="{ row: pricelist }">
          {{ formatPrice(pricelist.accommodation) }}
        </template>
        <template v-slot:travelling="{ row: pricelist }">
          {{ formatPrice(pricelist.travelling) }}
        </template>
        <template v-slot:training="{ row: pricelist }">
          {{ formatPrice(pricelist.training) }}
        </template>
        <template v-slot:created_at="{ row: pricelist }">
          {{ pricelist.created_at }}
        </template>
        <template v-slot:actions="{ row: pricelist }">
          <!--begin::Menu Flex-->
          <div class="d-flex flex-lg-row">
            <span class="menu-link px-3">
              <router-link :to="`./edit/${pricelist.id}`">
                <i
                  class="las la-edit text-gray-600 text-hover-primary mb-1 fs-1"
                ></i>
              </router-link>
            </span>
            <span class="menu-link px-3">
              <i
                @click="deleteItem(pricelist.id, false)"
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

  <!-- <ExportCustomerModal></ExportCustomerModal> -->
  <!-- <AddCustomerModal></AddCustomerModal> -->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import type { IPriceList } from "@/core/model/pricelist";
import { formatPrice } from "@/core/config/DataFormatter";
import arraySort from "array-sort";
import {
  getPriceList,
  deletePriceListItem,
  PriceListSearch,
} from "@/stores/api";
import moment from "moment";
import Swal from "sweetalert2";

export default defineComponent({
  name: "pricelist-listing",
  components: {
    Datatable,
  },
  setup() {

    const tableHeader = ref([
      {
        columnName: "Id",
        columnLabel: "id",
        sortEnabled: true,
        columnWidth: 25,
      },
      {
        columnName: "Customer Type",
        columnLabel: "customer_type",
        sortEnabled: true,
        columnWidth: 75,
      },
      {
        columnName: "Site Location",
        columnLabel: "site_location",
        sortEnabled: true,
        columnWidth: 80,
      },
      {
        columnName: "Per Day Wise",
        columnLabel: "per_day_charge",
        sortEnabled: true,
        columnWidth: 75,
      },
      {
        columnName: "Equipment Wise",
        columnLabel: "equipment_wise",
        sortEnabled: true,
        columnWidth: 150,
      },
      {
        columnName: "Accommodation",
        columnLabel: "accommodation",
        sortEnabled: true,
        columnWidth: 75,
      },
      {
        columnName: "Travelling",
        columnLabel: "travelling",
        sortEnabled: true,
        columnWidth: 75,
      },
      {
        columnName: "Training",
        columnLabel: "training",
        sortEnabled: true,
        columnWidth: 75,
      },
      {
        columnName: "Created Date",
        columnLabel: "created_at",
        sortEnabled: true,
        columnWidth: 15,
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
    let limit = ref(50);
    // limit 10
    const more = ref(false);

    const selectedIds = ref<Array<number>>([]);
    const tableData = ref<Array<IPriceList>>([]);
    const initvalues = ref<Array<IPriceList>>([]);
    const total = ref(0);
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

        const response = await getPriceList(
          `page=${page}&limit=${limit.value}`
        );
        //console.log(response.result.total_count);
        // first 20 displayed
        total.value = response.result.total_count;
        more.value = response.result.data.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(
          ({
            id,
            customer_type,
            site_location,
            per_day_charge,
            equipment_wise,
            accommodation,
            travelling,
            training,
            created_at
           }) => ({
            id,
            customer_type: customer_type ? customer_type : "---",
            site_location: site_location,
            per_day_charge: per_day_charge,
            equipment_wise: JSON.parse(equipment_wise),
            accommodation: accommodation,
            travelling: travelling,
            training: training,
            created_at: moment(created_at).format("LL"),
          })
        );
        initvalues.value.splice(0, tableData.value.length, ...tableData.value);
        loading.value = false;
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

        const response = await getPriceList(
          `page=${page.value}&limit=${limit}`
        );
        //console.log(response.result.total_count);
        // first 20 displayed
        total.value = response.result.total_count;
        more.value = response.result.data.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(
          ({ 
            id,
            customer_type,
            site_location,
            per_day_charge,
            equipment_wise,
            accommodation,
            travelling,
            training,
            created_at
           }) => ({
            id,
            customer_type: customer_type ? customer_type : "---",
            site_location: site_location,
            per_day_charge: per_day_charge,
            equipment_wise: JSON.parse(equipment_wise),
            accommodation: accommodation,
            travelling: travelling,
            training: training,
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

    // functions
    // get users function
    async function pricelist_listing(): Promise<void> {
      try {
        const response = await getPriceList(
          `page=${page.value}&limit=${limit.value}`
        );
        console.log(response);
        tableData.value = response.result.data.map(
          ({ 
            id,
            customer_type,
            site_location,
            per_day_charge,
            equipment_wise,
            accommodation,
            travelling,
            training,
            created_at
           }) => ({
            id,
            customer_type: customer_type ? customer_type : "---",
            site_location: site_location,
            per_day_charge: per_day_charge,
            equipment_wise: JSON.parse(equipment_wise),
            accommodation: accommodation,
            travelling: travelling,
            training: training,
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
        }, 200);
      }
    }

    onMounted(async () => {
      await pricelist_listing();
    });

    const deleteFewItem = () => {
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
          if (tableData.value[i].id === id.toString()) {
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
                deletePriceListItem(id);
                tableData.value.splice(i, 1);
              }
            });
          }
        }
      } else {
        for (let i = 0; i < tableData.value.length; i++) {
          if (tableData.value[i].id === id.toString()) {
            // Put your function here
            deletePriceListItem(id);
            tableData.value.splice(i, 1);
          }
        }
      }
    };

    const search = ref<string>("");
    let debounceTimer;
    const searchItems = () => {
      tableData.value.splice(0, tableData.value.length, ...initvalues.value);
      if (search.value !== "") {
        let results: Array<IPriceList> = [];
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
    };

    async function SearchMore() {
      // Your API call logic here
      try {
        const response = await PriceListSearch(search.value);
        //console.log(response.result.total_count);
        // first 20 displayed
        total.value = response.result.total_count;
        more.value = response.result.data.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(
          ({ 
            id,
            customer_type,
            site_location,
            per_day_charge,
            equipment_wise,
            accommodation,
            travelling,
            training,
            created_at
           }) => ({
            id,
            customer_type: customer_type ? customer_type : "---",
            site_location: site_location,
            per_day_charge: per_day_charge,
            equipment_wise: JSON.parse(equipment_wise),
            accommodation: accommodation,
            travelling: travelling,
            training: training,
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
      deleteItem,
      deleteFewItem,
      search,
      searchItems,
      selectedIds,
      sort,
      onItemSelect,
      getAssetPath,
      formatPrice,
      loading,
      NextPage,
      PrevPage,
      total,
      page,
      limit,
      PageLimitPoiner,
      Limits,
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