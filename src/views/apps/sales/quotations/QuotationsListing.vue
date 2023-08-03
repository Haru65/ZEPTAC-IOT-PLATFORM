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
            Add Quotation
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
            @click="deleteFewInvoice()"
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

        <template v-slot:id="{ row: quotations }">
          <span class="text-gray-600 text-hover-primary mb-1">
            {{ quotations.id }}
          </span>
        </template>
        <template v-slot:quotation_no="{ row: quotations }">
          <span class="text-gray-600 text-hover-primary mb-1">
            {{ quotations.quotation_no }}
          </span>
        </template>
        <template v-slot:customer_name="{ row: quotations }">
          <span class="text-gray-600 text-hover-primary mb-1">
            {{ quotations.customer_name }}
          </span>
        </template>
        <!-- defualt data -->
        <template v-slot:company="{ row: quotations }">
          {{ quotations.company }}
        </template>
        <template v-slot:date="{ row: quotations }">
          {{ quotations.date }}
        </template>
        <template v-slot:duedate="{ row: quotations }">
          {{ quotations.duedate }}
        </template>
        <template v-slot:status="{ row: quotations }">
          <!-- depending on status badge change -->
          <span
            v-if="quotations.status == 3"
            class="badge py-3 px-4 fs-7 badge-light-success"
            >{{ GetQuotationStatus(quotations.status) }}</span
          >
          <span
            v-if="quotations.status == 1"
            class="badge py-3 px-4 fs-7 badge-light-danger"
            >{{ GetQuotationStatus(quotations.status) }}</span
          >
          <span
            v-if="quotations.status == 4"
            class="badge py-3 px-4 fs-7 badge-light-success"
            >{{ GetQuotationStatus(quotations.status) }}</span
          >
          <span
            v-if="quotations.status == 2"
            class="badge py-3 px-4 fs-7 badge-light-warning"
            >{{ GetQuotationStatus(quotations.status) }}</span
          >
        </template>
        <template v-slot:total="{ row: quotations }">
          {{ formatPrice(quotations.total) }}
        </template>
        <template v-slot:actions="{ row: quotations }">
          <!--begin::Menu Flex-->
          <div class="d-flex flex-lg-row">
            <span class="menu-link px-3">
              <router-link :to="`./edit/${quotations.id}`">
                <i
                  class="las la-edit text-gray-600 text-hover-primary mb-1 fs-1"
                ></i>
              </router-link>
            </span>
            <span class="menu-link px-3">
              <i
                @click="deleteInvoice(quotations.id, false)"
                class="las la-minus-circle text-gray-600 text-hover-danger mb-1 fs-2"
              ></i>
            </span>
            <span class="menu-link px-3">
              <i
                @click="dupQuotation(quotations.id)"
                class="las la-copy text-gray-600 text-hover-warning mb-1 fs-2"
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
import type { IQuotations } from "@/core/model/quotation";
import {
  getQuotationList,
  deletequotation,
  getQuotation,
  addQuotation,
  QuotationSearch,
  GetIncrQuotationId,
} from "@/stores/api";
import arraySort from "array-sort";
import { useAuthStore } from "@/stores/auth";
import { formatPrice } from "@/core/config/DataFormatter";
import { GetQuotationStatus } from "@/core/config/QuotationStatusConfig";
import moment from "moment";
import Swal from "sweetalert2";

export default defineComponent({
  name: "quotations-listing",
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
        columnName: "Quotation No",
        columnLabel: "quotation_no",
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
        columnName: "Invoice Date",
        columnLabel: "date",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Invoice Due Date",
        columnLabel: "duedate",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Status",
        columnLabel: "status",
        sortEnabled: true,
        columnWidth: 75,
      },
      {
        columnName: "Total",
        columnLabel: "total",
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

    interface itemsArr {
      id: string;
      price: string;
      description: string;
      name: string;
    }

    interface Meta {
      id: string;
      first_name: string;
      last_name: string;
      company_name: string;
      address1: string;
      address2: string;
      city: string;
      states: string;
      pincode: string;
      country: string;
    }

    interface quotationDetails {
      quotation_no: string;
      customer_id: string;
      items: Array<itemsArr>;
      date: string;
      duedate: string;
      status: string;
      notes: string;
      total: number;
      customer: Meta;
      client: Meta;
      is_active: number;
      company_id: string;
      created_by: string;
      updated_by: string;
    }

    const loading = ref(true);
    const auth = useAuthStore();
    const User = auth.GetUser();
    const quotationDetail = ref<quotationDetails>({
      quotation_no: "21****",
      customer_id: " ",
      items: [],
      date: "",
      duedate: "",
      status: "",
      notes: "",
      customer: {
        id: "",
        company_name: "",
        first_name: "",
        last_name: "",
        address1: "",
        address2: "",
        city: "",
        states: "",
        pincode: "",
        country: "",
      },
      client: {
        id: "",
        company_name: "",
        first_name: "",
        last_name: "",
        address1: "",
        address2: "",
        city: "",
        states: "",
        pincode: "",
        country: "",
      },
      total: 0,
      is_active: 1,
      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
    });

    const selectedIds = ref<Array<number>>([]);

    const tableData = ref<Array<IQuotations>>([]);

    const initvalues = ref<Array<IQuotations>>([]);

    // staring from 2
    let page = ref(1);
    let limit = ref(50);
    // limit 10
    const more = ref(false);

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

        const response = await getQuotationList(
          `page=${page.value}&limit=${limit.value}`
        );
        //console.log(response.result.total_count);
        // first 20 displayed
        total.value = response.result.total_count;
        more.value = response.result.data.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(
          ({
            created_at,
            invoice_date,
            invoice_duedate,
            total,
            customer_name,
            status,
            id,
            quotation_no,
          }) => ({
            status: status,
            id: id,
            quotation_no: quotation_no,
            customer_name:
              customer_name[0].first_name + " " + customer_name[0].last_name,
            created_at: moment(created_at).format("LL"),
            date: moment(invoice_date).format("LL"),
            duedate: moment(invoice_duedate).format("LL"),
            total: total,
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

        const response = await getQuotationList(
          `page=${page.value}&limit=${limit.value}`
        );
        //console.log(response.result.total_count);
        // first 20 displayed
        total.value = response.result.total_count;
        more.value = response.result.data.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(
          ({
            created_at,
            invoice_date,
            invoice_duedate,
            total,
            customer_name,
            status,
            id,
            quotation_no,
          }) => ({
            status: status,
            id: id,
            quotation_no: quotation_no,
            customer_name:
              customer_name[0].first_name + " " + customer_name[0].last_name,
            created_at: moment(created_at).format("LL"),
            date: moment(invoice_date).format("LL"),
            duedate: moment(invoice_duedate).format("LL"),
            total: total,
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
      //console.log("done");
      await quotation_listing();
    });

    async function quotation_listing(): Promise<void> {
      try {
        const response = await getQuotationList(
          `page=${page.value}&limit=${limit.value}`
        );
        console.log(response);
        tableData.value = response.result.data.map(
          ({
            created_at,
            invoice_date,
            invoice_duedate,
            total,
            customer_name,
            status,
            id,
            quotation_no,
          }) => ({
            status: status,
            id: id,
            quotation_no: quotation_no,
            customer_name:
              customer_name[0].first_name + " " + customer_name[0].last_name,
            created_at: moment(created_at).format("LL"),
            date: moment(invoice_date).format("LL"),
            duedate: moment(invoice_duedate).format("LL"),
            total: total,
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


    const deleteFewInvoice = () => {
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
            deleteInvoice(item, true);
          });
          selectedIds.value.length = 0;
        }
      });
    };

    const deleteInvoice = (id: number, mul: boolean) => {
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
                deletequotation(id);
                tableData.value.splice(i, 1);
              }
            });
          }
        }
      } else {
        for (let i = 0; i < tableData.value.length; i++) {
          if (tableData.value[i].id === id) {
            // Put your function here
            deletequotation(id);
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
      if (search.value !== "") {
        let results: Array<IQuotations> = [];
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
        loading.value = true;
        page.value = 1;
        while (tableData.value.length != 0) tableData.value.pop();
        while (initvalues.value.length != 0) initvalues.value.pop();
        await quotation_listing();
      }
    };

    async function SearchMore() {
      // Your API call logic here
      try {
        const response = await QuotationSearch(search.value);
        //console.log(response.result.total_count);
        // first 20 displayed
        total.value = response.result.total_count;
        more.value = response.result.data.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(
          ({
            created_at,
            invoice_date,
            invoice_duedate,
            total,
            customer_name,
            status,
            id,
            quotation_no,
          }) => ({
            status: status,
            id: id,
            quotation_no: quotation_no,
            customer_name:
              customer_name[0].first_name + " " + customer_name[0].last_name,
            created_at: moment(created_at).format("LL"),
            date: moment(invoice_date).format("LL"),
            duedate: moment(invoice_duedate).format("LL"),
            total: total,
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

    const dupQuotation = async (id) => {
      // ? incr quotation no
      const res = await GetIncrQuotationId(User.company_id);
      let latestquotation_no = res.result.split("_");
      latestquotation_no =
        latestquotation_no[0] +
        "_" +
        (parseInt(latestquotation_no[1]) + 1).toString();

      // * option
      Swal.fire({
        title: "Are you sure?",
        text: "Clone the Quotation !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "red",
        confirmButtonText: "Yes, I am sure!",
        cancelButtonText: "No, cancel it!",
      }).then(async (result: { [x: string]: any }) => {
        if (result["isConfirmed"]) {
          const response = await getQuotation(id);
          // update date
          quotationDetail.value.date = moment(
            quotationDetail.value.date
          ).format("YYYY-MM-DD HH:mm:ss");
          quotationDetail.value.duedate = moment(
            quotationDetail.value.duedate
          ).format("YYYY-MM-DD HH:mm:ss");
          quotationDetail.value = {
            quotation_no: latestquotation_no,
            customer_id: response.customer_id,
            items: JSON.parse(response.items),
            date: response.date,
            duedate: response.duedate,
            status: "1",
            notes: response.notes,
            total: response.total,
            customer: {
              id: response.customer_id,
              first_name: "",
              last_name: "",
              company_name: "",
              address1: "",
              address2: "",
              city: "",
              states: "",
              pincode: "",
              country: "",
            },
            client: {
              id: response.client_id,
              first_name: "",
              last_name: "",
              company_name: "",
              address1: "",
              address2: "",
              city: "",
              states: "",
              pincode: "",
              country: "",
            },
            is_active: response.is_active,
            company_id: User.company_id,
            created_by: User.id,
            updated_by: User.id,
          };
          // add
          const respons = await addQuotation(quotationDetail.value);
          // console.log(response.error);
          if (!respons.error) {
            // list fetch update
            await quotation_listing();
          }
        }
      });
    };

    return {
      tableData,
      tableHeader,
      deleteInvoice,
      search,
      searchItems,
      selectedIds,
      deleteFewInvoice,
      sort,
      onItemSelect,
      getAssetPath,
      formatPrice,
      GetQuotationStatus,
      dupQuotation,
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
