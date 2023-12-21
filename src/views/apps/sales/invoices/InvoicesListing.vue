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
            placeholder="Search invoices"
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
            Add Invoice
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
        :header="filteredTableHeader"
        :checkbox-enabled="true"
        :items-per-page="limit"
        :items-per-page-dropdown-enabled="false"
        :loading="loading"
      >
        <!-- img data -->


        <template v-slot:id="{ row: invoices }">
          <span class="text-gray-600 text-hover-primary mb-1">
            {{ invoices.id }}
          </span>
        </template>
        <template v-slot:invoice_no="{ row: invoices }">
          <span class="text-gray-600 text-hover-primary mb-1">
            {{ invoices.invoice_no }}
          </span>
        </template>
        <template v-slot:customer_company="{ row: invoices }">
          <span class="text-gray-600 text-hover-primary mb-1">
            {{ invoices.customer_company }}
          </span>
        </template>
        <template v-slot:site_location="{ row: invoices }">
          <span class="text-gray-600 text-hover-primary mb-1">
            {{ invoices.site_location?.city }}
            {{ invoices.site_location?.states }}
          </span>
        </template>
        <!-- defualt data -->
        <template
          v-slot:company_name="{ row: invoices }"
          v-if="identifier == 'Admin'"
        >
          {{ invoices.company_name }}
        </template>
        <template v-slot:date="{ row: invoices }">
          {{ invoices.date }}
        </template>
        <template v-slot:total="{ row: invoices }">
          {{ formatPrice(invoices.total) }}
        </template>
        <template v-slot:status="{ row: invoices }">
          <!-- depending on status badge change -->
          <span
            v-if="invoices.status == 3"
            class="badge py-3 px-4 fs-7 badge-light-danger"
            >{{ GetInvoiceStatus(invoices.status) }}</span
          >
          <span
            v-if="invoices.status == 1"
            class="badge py-3 px-4 fs-7 badge-light"
            >{{ GetInvoiceStatus(invoices.status) }}</span
          >
          <span
            v-if="invoices.status == 4"
            class="badge py-3 px-4 fs-7 badge-light-warning"
            >{{ GetInvoiceStatus(invoices.status) }}</span
          >
          <span
            v-if="invoices.status == 5"
            class="badge py-3 px-4 fs-7 badge-light-success"
            >{{ GetInvoiceStatus(invoices.status) }}</span
          >
          <span
            v-if="invoices.status == 2"
            class="badge py-3 px-4 fs-7 badge-light-success"
            >{{ GetInvoiceStatus(invoices.status) }}</span
          >
        </template>
        <template v-slot:actions="{ row: invoices }">
          <!--begin::Menu Flex-->
          <div class="d-flex flex-lg-row">
            <span
              class="menu-link px-3"
              data-toggle="tooltip"
              title="Download Quotation"
            >
              <i
                @click="downloadInvoice(invoices.id)"
                class="las la-download text-gray-600 text-hover-success mb-1 fs-1"
              ></i>
            </span>
            <span
              class="menu-link px-3"
              data-toggle="tooltip"
              title="View Quotation"
            >
              <router-link :to="`./edit/${invoices.id}`">
                <i
                  class="las la-edit text-gray-600 text-hover-primary mb-1 fs-1"
                ></i>
              </router-link>
            </span>
            <span class="menu-link px-3">
              <i
                @click="deleteInvoice(invoices.id, false)"
                class="las la-minus-circle text-gray-600 text-hover-danger mb-1 fs-2"
              ></i>
            </span>
            <span class="menu-link px-3">
              <i
                @click="dupInvoice(invoices.id)"
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
import { defineComponent, onMounted, ref, computed } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable/table-partials/models";
import type { IInvoices } from "@/core/model/invoices";
import {
  getInvoiceList,
  deleteinvoice,
  getInvoice,
  addInvoice,
  GetIncrInvoiceId,
  InvoiceSearch,
  DownloadInvoice,
} from "@/stores/api";
import arraySort from "array-sort";
import { useAuthStore } from "@/stores/auth";
import { formatPrice } from "@/core/config/DataFormatter";
import { GetInvoiceStatus } from "@/core/config/InvoiceStatusConfig";
import moment from "moment";
import Swal from "sweetalert2";
import { Identifier } from "@/core/config/WhichUserConfig";
import { Gen } from "@/core/config/PdfGenerator";

export default defineComponent({
  name: "invoices-list",
  components: {
    Datatable,
  },
  setup() {
    const tableHeader = ref([
      {
        columnName: "Invoice No",
        columnLabel: "invoice_no",
        sortEnabled: true,
        columnWidth: 35,
      },
      {
        columnName: "Customer Name",
        columnLabel: "customer_company",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Site Location",
        columnLabel: "site_location",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Company Name",
        columnLabel: "company_name",
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
        columnName: "Invoice Amount",
        columnLabel: "total",
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
        columnName: "Actions",
        columnLabel: "actions",
        sortEnabled: false,
        columnWidth: 75,
      },
    ]);

    interface EDetails {
      id: string;
      name: string;
      charge: number;
      quantity: number;
      amount: number;
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

    interface invoiceDetails {
      invoice_no: string;
      lead_id: string;
      items: {
        id: string;
        site_location: string;
        per_day_charge: string;
        number_of_days: string;
        accommodation: number;
        travelling: number;
        training: number;
        boarding: number;
        pickup: number;
        accomm: boolean;
        travel: boolean;
        train: boolean;
        board: boolean;
        pick: boolean;
        equipment_wise: Array<EDetails>;
      };
      enquiry_no: string;
      date: string;
      duedate: string;
      status: string;
      scope_of_work: string;
      terms_and_conditions: string;
      total: number;
      lead: Meta;
      client: Meta;
      is_active: number;
      company_id: string;
      created_by: string;
      updated_by: string;
    }

    const identifier = Identifier;

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

    const auth = useAuthStore();
    const User = auth.GetUser();
    const quotationDetail = ref<invoiceDetails>({
      invoice_no: "",
      lead_id: " ",
      items: {
        id: "",
        site_location: "",
        per_day_charge: "",
        number_of_days: "1",
        accommodation: 0,
        travelling: 0,
        training: 0,
        boarding: 0,
        pickup: 0,
        accomm: true,
        travel: true,
        train: true,
        board: true,
        pick: true,
        equipment_wise: [],
      },
      enquiry_no: "",
      date: "",
      duedate: "",
      status: "",
      scope_of_work: "",
      terms_and_conditions: "",
      lead: {
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

    const PagePointer = async (page) => {
      // ? Truncate the tableData
      //console.log(limit.value);
      loading.value = true;
      try {
        while (tableData.value.length != 0) tableData.value.pop();
        while (initvalues.value.length != 0) initvalues.value.pop();

        const response = await getInvoiceList(
          `page=${page}&limit=${limit.value}`
        );
        //console.log(response.result.total_count);
        // first 20 displayed
        total.value = response.result.total_count;
        more.value = response.result.data.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(
          ({
            date,
            total,
            customer_company,
            site_location,
            company_name,
            status,
            id,
            invoice_no,
          }) => ({
            status: status,
            id: id,
            invoice_no: invoice_no,
            customer_company: customer_company.company_name,
            company_name: company_name.company_name,
            site_location: site_location,
            date: moment(date).format("LL"),
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

        const response = await getInvoiceList(
          `page=${page.value}&limit=${limit}`
        );
        //console.log(response.result.total_count);
        // first 20 displayed
        total.value = response.result.total_count;
        more.value = response.result.data.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(
          ({
            date,
            total,
            customer_company,
            site_location,
            company_name,
            status,
            id,
            invoice_no,
          }) => ({
            status: status,
            id: id,
            invoice_no: invoice_no,
            customer_company: customer_company.company_name,
            company_name: company_name.company_name,
            site_location: site_location,
            date: moment(date).format("LL"),
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

    const selectedIds = ref<Array<number>>([]);

    const tableData = ref<Array<IInvoices>>([]);

    const initvalues = ref<Array<IInvoices>>([]);

    async function invoice_listing(): Promise<void> {
      try {
        const response = await getInvoiceList(
          `page=${page.value}&limit=${limit.value}`
        );
        tableData.value = response.result.data.map(
          ({
            date,
            total,
            customer_company,
            site_location,
            company_name,
            status,
            id,
            invoice_no,
          }) => ({
            status: status,
            id: id,
            invoice_no: invoice_no,
            customer_company: customer_company.company_name,
            company_name: company_name.company_name,
            site_location: site_location,
            date: moment(date).format("LL"),
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

    const filteredTableHeader = computed(() => {
      // If the identifier is 'Admin', include the 'Company Name' column; otherwise, exclude it
      return identifier.value === "Admin"
        ? tableHeader.value
        : tableHeader.value.filter(
            (column) => column.columnLabel !== "company_name"
          );
    });

    onMounted(async () => {
      await invoice_listing();
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
                deleteinvoice(id);
                tableData.value.splice(i, 1);
              }
            });
          }
        }
      } else {
        for (let i = 0; i < tableData.value.length; i++) {
          if (tableData.value[i].id === id) {
            // Put your function here
            deleteinvoice(id);
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
        let results: Array<IInvoices> = [];
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
      } else {
        page.value = 1;
        while (tableData.value.length != 0) tableData.value.pop();
        while (initvalues.value.length != 0) initvalues.value.pop();
        await invoice_listing();
      }
    };

    async function SearchMore() {
      // Your API call logic here
      try {
        const response = await InvoiceSearch(search.value);
        //console.log(response.result.total_count);
        // first 20 displayed
        total.value = response.result.total_count;
        more.value = response.result.data.next_page_url != null ? true : false;
        tableData.value = response.result.data.data.map(
          ({
            date,
            total,
            customer_company,
            site_location,
            company_name,
            status,
            id,
            invoice_no,
          }) => ({
            status: status,
            id: id,
            invoice_no: invoice_no,
            customer_company: customer_company.company_name,
            company_name: company_name.company_name,
            site_location: site_location,
            date: moment(date).format("LL"),
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

    const dupInvoice = async (id) => {
      // ? incr quotation no
      const res = await GetIncrInvoiceId(User.company_id);
      let latestinvoice_no = res.result.split("_");
      latestinvoice_no =
        latestinvoice_no[0] +
        "_" +
        (parseInt(latestinvoice_no[1]) + 1).toString();

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
          const response = await getInvoice(id);
          // update date
          quotationDetail.value.date = moment(
            quotationDetail.value.date
          ).format("YYYY-MM-DD HH:mm:ss");
          quotationDetail.value.duedate = moment(
            quotationDetail.value.duedate
          ).format("YYYY-MM-DD HH:mm:ss");
          quotationDetail.value = {
            invoice_no: latestinvoice_no,
            lead_id: response.customer_id,
            items: JSON.parse(response.items),
            date: response.date,
            duedate: response.duedate,
            enquiry_no: response.enquiry_no,
            status: "1",
            scope_of_work: response.scope_of_work,
            terms_and_conditions: response.terms_and_conditions,
            total: response.total,
            lead: {
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
          const respons = await addInvoice(quotationDetail.value);
          // console.log(response.error);
          if (!respons.error) {
            // list fetch update
            await invoice_listing();
          }
        }
      });
    };

    
    const InvoiceInfo = ref({
      id: "",
      invoice_no: "",
      lead_id: "",
      client_id: "",
      items: {
        id: "",
        site_location: "",
        per_day_charge: "",
        number_of_days: "1",
        accommodation: 0,
        travelling: 0,
        training: 0,
        boarding: 0,
        pickup: 0,
        accomm: true,
        travel: true,
        train: true,
        board: true,
        pick: true,
        equipment_wise: [],
      },
      date: "",
      duedate: "",
      enquiry_no: "",
      status: "",
      scope_of_work: "",
      terms_and_conditions: "",
      lead: {
        company_name: "",
        address1: "",
        address2: "",
        city: "",
        states: "",
        pincode: "",
        country: "",
      },
      client: {
        company_name: "",
        address1: "",
        address2: "",
        city: "",
        states: "",
        pincode: "",
        country: "",
      },
      customer_name: {
        first_name: "",
        last_name: "",
      },
      client_name: {
        first_name: "",
        last_name: "",
      },
      company_details: {
        company_name: "",
        company_logo: getAssetPath("media/avatars/default.png"),
      },
      company_id: User.company_id,
      total: 0,
    });

    const showErrorAlert = (title, message) => {
      Swal.fire({
        title,
        text: message,
        icon: "error",
        buttonsStyling: false,
        confirmButtonText: "Ok, got it!",
        heightAuto: false,
        customClass: {
          confirmButton: "btn btn-primary",
        },
      });
    };

    const downloadInvoice = async (id: any) => {
      const res = await DownloadInvoice(id);
      console.log(res);

      if (res.result) {
        InvoiceInfo.value.id = res.result.id;
        InvoiceInfo.value.invoice_no = res.result.invoice_no;
        InvoiceInfo.value.lead_id = res.result.customer_id;
        InvoiceInfo.value.client_id = res.result.client_id;
        InvoiceInfo.value.customer_name = res.result.customer_data;
        InvoiceInfo.value.client_name = res.result.client_data;
        InvoiceInfo.value.items = JSON.parse(res.result.items);
        InvoiceInfo.value.lead = res.result.lead;
        InvoiceInfo.value.client = res.result.client;
        InvoiceInfo.value.total = res.result.total;
        InvoiceInfo.value.date = res.result.date;
        InvoiceInfo.value.duedate = res.result.duedate;
        InvoiceInfo.value.enquiry_no = res.result.enquiry_no;
        InvoiceInfo.value.status = res.result.status;
        InvoiceInfo.value.scope_of_work = res.result.scope_of_work;
        InvoiceInfo.value.terms_and_conditions =
          res.result.terms_and_conditions;

        InvoiceInfo.value.company_details.company_name =
          res.result.company_details.company_name;
        InvoiceInfo.value.company_details.company_logo = res.result
          .company_details.company_logo
          ? "data: image/png;base64," + res.result.company_details.company_logo
          : getAssetPath("media/avatars/default.png");

        console.log(InvoiceInfo.value);

        await Gen(
          "invoice",
          id.toString(),
          InvoiceInfo.value.invoice_no,
          InvoiceInfo
        );
      }
      else{
        console.log(res.message)
        showErrorAlert(
          "information",
          res.message ?? "something went wrong"
        );
      }
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
      GetInvoiceStatus,
      dupInvoice,
      loading,
      limit,
      PrevPage,
      NextPage,
      page,
      Limits,
      PageLimitPoiner,
      filteredTableHeader,
      identifier,
      downloadInvoice,
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