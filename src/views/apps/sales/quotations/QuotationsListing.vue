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
        @on-sort="sort"
        @on-items-select="onItemSelect"
        :data="tableData"
        :header="tableHeader"
        :enable-items-per-page-dropdown="true"
        :checkbox-enabled="true"
        checkbox-label="id"
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
      first_name: string;
      last_name: string;
      company_name: string;
      address1: string;
      address2: string;
      city: string;
      state: string;
      pincode: string;
      country: string;
    }

    interface quotationDetails {
      quotation_no: string;
      invoice_no: string;
      customer_id: string;
      items: Array<itemsArr>;
      date: string;
      duedate: string;
      status: number;
      notes: string;
      total: number;
      meta: Meta;
      is_active: number;
      created_by: string;
      updated_by: string;
    }

    const auth = useAuthStore();

    const quotationDetail = ref<quotationDetails>({
      quotation_no: "21****",
      customer_id: " ",
      invoice_no: "",
      items: [],
      date: "",
      duedate: "",
      status: 0,
      notes: "",
      meta: {
        company_name: "",
        first_name: "",
        last_name: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
      },
      total: 0,
      is_active: 1,
      created_by: auth.getUserId(),
      updated_by: auth.getUserId(),
    });

    const selectedIds = ref<Array<number>>([]);

    const tableData = ref<Array<IQuotations>>([]);

    const initquotations = ref<Array<IQuotations>>([]);

    async function quotation_listing(): Promise<void> {
      try {
        const response = await getQuotationList();
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
            created_at: moment(created_at).format("DD/MM/YYYY"),
            date: moment(invoice_date).format("DD/MM/YYYY"),
            duedate: moment(invoice_duedate).format("DD/MM/YYYY"),
            total: total,
          })
        );
        initquotations.value.splice(
          0,
          tableData.value.length,
          ...tableData.value
        );
      } catch (error) {
        console.error(error);
      } finally {
        //console.log("done");
      }
    }

    onMounted(async () => {
      await quotation_listing();
    });

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
    const searchItems = () => {
      console.log(search.value);
      tableData.value.splice(
        0,
        tableData.value.length,
        ...initquotations.value
      );
      if (search.value !== "") {
        let results: Array<IQuotations> = [];
        for (let j = 0; j < tableData.value.length; j++) {
          if (searchingFunc(tableData.value[j], search.value)) {
            results.push(tableData.value[j]);
          }
        }
        tableData.value.splice(0, tableData.value.length, ...results);
      }
    };

    const searchingFunc = (obj: any, value: string): boolean => {
      console.log(obj);
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

    const dupQuotation = (id) => {
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
            quotation_no: "000000",
            invoice_no: "",
            customer_id: response.customer_id,
            items: JSON.parse(response.items),
            date: response.date,
            duedate: response.duedate,
            status: 1,
            notes: response.notes,
            total: response.total,
            meta: {
              company_name: "",
              first_name: "",
              last_name: "",
              address1: "",
              address2: "",
              city: "",
              state: "",
              pincode: "",
              country: "",
            },
            is_active: response.is_active,
            created_by: auth.getUserId(),
            updated_by: auth.getUserId(),
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
    };
  },
});
</script>
