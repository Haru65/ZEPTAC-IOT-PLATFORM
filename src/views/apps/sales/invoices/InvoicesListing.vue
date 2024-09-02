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
        <!-- YEAR WISE DATA -->

        <h3 class="card-title align-items-start flex-column">
          <span class="card-label fw-semibold text-gray-400"
            >Financial Year</span
          >
        </h3>
        <div class="me-3">
          <el-select
            class="w-150px"
            filterable
            placeholder="Select Year"
            v-model="selectedYearCache"
            id="financialYear"
            @change="handleChange"
          >
            <el-option
              v-for="year in financialYears"
              :key="year"
              :value="year"
              :label="year"
            />
          </el-select>
        </div>
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
          <button type="button" class="btn btn-danger" @click="deleteFewItem()">
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
        <template v-slot:customer="{ row: invoices }">
          <span
            v-if="invoices.customer != null"
            class="text-gray-600 text-hover-primary mb-1"
          >
            {{ invoices?.customer?.company_name || "" }}
          </span>
          <span v-else> </span>
        </template>
        <template v-slot:client="{ row: invoices }">
          <span
            v-if="invoices.client != null"
            class="text-gray-600 text-hover-primary mb-1"
          >
            {{ invoices.client?.city || "" }} {{ invoices.client?.state || "" }}
          </span>
          <span v-else> </span>
        </template>
        <!-- defualt data -->
        <template
          v-slot:company_details="{ row: invoices }"
          v-if="identifier == 'Admin'"
        >
          {{ invoices.company_details.company_name }}
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
              class="btn btn-icon btn-active-light-success w-30px h-30px me-3"
              data-bs-toggle="tooltip"
              title="Download Invoice"
              @click="downloadInvoice(invoices.id)"
            >
              <KTIcon icon-name="file-down" icon-class="fs-2" />
            </span>

            <span
              class="btn btn-icon btn-active-light-success w-30px h-30px me-3"
              data-bs-toggle="tooltip"
              title="Clone Invoice"
              @click="dupInvoice(invoices.id)"
            >
              <KTIcon icon-name="copy" icon-class="fs-2" />
            </span>

            <!--begin::Edit-->
            <router-link :to="`/invoices/edit/${invoices.id}`">
              <span
                class="btn btn-icon btn-active-light-primary w-30px h-30px me-3"
                data-bs-toggle="tooltip"
                title="View Invoice"
              >
                <KTIcon icon-name="pencil" icon-class="fs-2" />
              </span>
            </router-link>
            <!--end::Edit-->

            <span
              class="btn btn-icon btn-active-light-danger w-30px h-30px me-3"
              data-bs-toggle="tooltip"
              title="Delete Invoice"
              @click="deleteItem(invoices.id, false)"
            >
              <KTIcon icon-name="trash" icon-class="fs-2" />
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
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref, computed, watch } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable/table-partials/models";
import type { IInvoices } from "@/core/model/invoices";
import {
  getInvoiceList,
  deleteInvoice,
  getInvoice,
  addInvoice,
  GetIncrInvoiceId,
  InvoiceSearch,
  getInvoiceInfo,
  getCompanyLogo,
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
    // Financial Year Logic
    const authStore = useAuthStore();

    const tableHeader = ref([
      {
        columnName: "Invoice No",
        columnLabel: "invoice_no",
        sortEnabled: true,
        columnWidth: 35,
      },
      {
        columnName: "Customer Name",
        columnLabel: "customer",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Site Location",
        columnLabel: "client",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Main Company",
        columnLabel: "company_details",
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
      state: string;
      pincode: string;
      country: string;
    }

    interface invoiceDetails {
      invoice_no: string;
      customer_id: string;
      client_id: string;
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

      sub_total: number;

      tax_id: string;
      tax_type: string;
      tax_description: string;
      tax_rate: number;
      tax_amount: number;

      total: number;
      lead: Meta;
      client: Meta;
      is_active: number;
      company_id: string;
      created_by: string;
      updated_by: string;
    }

    const identifier = Identifier;

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

    const auth = useAuthStore();
    const User = auth.GetUser();
    const quotationDetail = ref<invoiceDetails>({
      invoice_no: "",
      customer_id: "",
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
        state: "",
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
        state: "",
        pincode: "",
        country: "",
      },

      sub_total: 0,
      tax_id: "",
      tax_type: "",
      tax_description: "",
      tax_rate: 0,
      tax_amount: 0,

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
          `page=${page}&limit=${limit.value}&year=${
            selectedYearCache.value
              ? selectedYearCache.value
              : financialYears.value[0]
          }`
        );

        more.value = response.result.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(
          ({ id, customer, client, company_details, ...rest }) => ({
            id: id,
            customer: { ...customer },
            client: { ...client },
            company_details: { ...company_details },
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

        const response = await getInvoiceList(
          `page=${page.value}&limit=${limit}&year=${
            selectedYearCache.value
              ? selectedYearCache.value
              : financialYears.value[0]
          }`
        );

        more.value = response.result.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(
          ({ id, customer, client, company_details, ...rest }) => ({
            id: id,
            customer: { ...customer },
            client: { ...client },
            company_details: { ...company_details },
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

    const selectedIds = ref<Array<number>>([]);

    const tableData = ref<Array<IInvoices>>([]);

    const initvalues = ref<Array<IInvoices>>([]);

    async function invoice_listing(): Promise<void> {
      try {
        const response = await getInvoiceList(
          `page=${page.value}&limit=${limit.value}&year=${
            selectedYearCache.value
              ? selectedYearCache.value
              : financialYears.value[0]
          }`
        );
        more.value = response.result.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(
          ({ id, customer, client, company_details, ...rest }) => ({
            id: id,
            customer: { ...customer },
            client: { ...client },
            company_details: { ...company_details },
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
      // If the identifier is 'Admin', include the 'Company Name' column; otherwise, exclude it
      return identifier.value === "Admin"
        ? tableHeader.value
        : tableHeader.value.filter(
            (column) => column.columnLabel !== "company_details"
          );
    });

    const financialYears = ref(authStore.financialYears); // Generate Financial years list using the auth store function
    const selectedYearCache = ref(
      localStorage.getItem("selectedFinancialYear") || ""
    );

    // Fallback to default value if localStorage data is invalid or missing
    if (!financialYears.value.includes(selectedYearCache.value)) {
      selectedYearCache.value = financialYears.value[0];
    }

    watch(selectedYearCache, (newValue) => {
      localStorage.setItem("selectedFinancialYear", newValue);
    });

    async function handleChange() {
      page.value = 1;
      localStorage.setItem("selectedFinancialYear", selectedYearCache.value);
      await invoice_listing();
    }

    onMounted(async () => {
      // Save initial selected year to localStorage
      localStorage.setItem("selectedFinancialYear", selectedYearCache.value);

      await invoice_listing();
    });

    const deleteFewItem = async () => {
      try {
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "You will not be able to recover from this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "red",
          confirmButtonText: "Yes, I am sure!",
          cancelButtonText: "No, cancel it!",
        });

        if (result.isConfirmed) {
          let allSuccess = true;
          let finalMessage = "Selected items deleted successfully.";

          for (const id of selectedIds.value) {
            const response = await deleteItem(id, true);
            if (!response.success) {
              allSuccess = false;
              finalMessage =
                response.message ||
                "An error occurred while deleting some items.";
              break;
            }
          }

          selectedIds.value.length = 0;

          if (allSuccess) {
            showSuccessAlert("Success", finalMessage);
          } else {
            showErrorAlert("Error", finalMessage);
          }
        }
      } catch (error: any) {
        const errorMessage = error.message || "An unknown error occurred";
        showErrorAlert("Error", errorMessage);
      }
    };

    const deleteItem = async (id: number, mul: boolean) => {
      const deleteConfirmation = async () => {
        try {
          const result = await Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover from this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "red",
            confirmButtonText: "Yes, I am sure!",
          });
          return result.isConfirmed;
        } catch (error: any) {
          const errorMessage = error.message || "An unknown error occurred";
          showErrorAlert("Error", errorMessage);
          return false;
        }
      };

      const deleteFromTable = async (id: number) => {
        try {
          const response = await deleteInvoice(id);
          if (response?.success) {
            const index = tableData.value.findIndex((item) => item.id === id);
            if (index !== -1) {
              tableData.value.splice(index, 1);
              // console.log(`Item with id ${id} deleted successfully`);
            }
            showSuccessAlert(
              "Success",
              response.message || `Item with id ${id} deleted successfully.`
            );
            return { success: true };
          } else {
            throw new Error(
              response?.message || `Failed to delete the item with id ${id}`
            );
          }
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "An unknown error occurred";
          showErrorAlert("Error", errorMessage);
          return { success: false, message: errorMessage };
        }
      };

      if (!mul) {
        const isConfirmed = await deleteConfirmation();
        if (isConfirmed) {
          return await deleteFromTable(id);
        } else {
          return { success: false };
        }
      } else {
        return await deleteFromTable(id);
      }
    };

    // Alert functions
    const showSuccessAlert = (title: string, message: string) => {
      Swal.fire({
        title,
        text: message,
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: "Ok, got it!",
        heightAuto: false,
        customClass: {
          confirmButton: "btn btn-primary",
        },
      });
    };

    const showErrorAlert = (title: string, message: string) => {
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

    const search = ref<string>("");
    // ? debounce timer
    let debounceTimer;

    const searchItems = async () => {
      // console.log(search.value);
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
        const response = await InvoiceSearch(
          search.value,
          selectedYearCache.value
            ? selectedYearCache.value
            : financialYears.value[0]
        );

        more.value = response.result.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(
          ({ id, customer, client, company_details, ...rest }) => ({
            id: id,
            customer: { ...customer },
            client: { ...client },
            company_details: { ...company_details },
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
      // console.log(obj);
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
      Swal.fire({
        title: "Are you sure?",
        text: "Clone the Invoice !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "red",
        confirmButtonText: "Yes, I am sure!",
        cancelButtonText: "No, cancel it!",
      }).then(async (result: { [x: string]: any }) => {
        if (result["isConfirmed"]) {
          const response = await getInvoice(id);

          quotationDetail.value = {
            invoice_no: "",
            customer_id: response.customer_id,
            client_id: response.client_id,
            items: JSON.parse(response.items),
            date: response.date,
            duedate: response.duedate,
            enquiry_no: response.enquiry_no,
            status: "1",
            scope_of_work: response.scope_of_work,
            terms_and_conditions: response.terms_and_conditions,

            sub_total: response.sub_total,
            tax_id: response.tax_id,
            tax_type: response.tax_type,
            tax_description: response.tax_description,
            tax_rate: response.tax_rate,
            tax_amount: response.tax_amount,
            total: response.total,

            lead: {
              id: response.customer_id,
              first_name: "",
              last_name: "",
              company_name: "",
              address1: "",
              address2: "",
              city: "",
              state: "",
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
              state: "",
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

    const companyInfo = ref({
      id: "",
      company_name: "",
      company_logo: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      logo_base64: "",
    });

    const InvoiceInfo = ref({
      id: "",
      invoice_no: "",
      customer_id: "",
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
      customer: {
        id: "",
        name: "",
        mobile: "",
        company_name: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
      },
      client: {
        id: "",
        name: "",
        mobile: "",
        company_name: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
      },
      clientx: {
        id: "",
        name: "",
        mobile: "",
        company_name: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
      },

      sub_total: 0,
      tax_id: 0,
      tax_type: "",
      tax_description: "",
      tax_rate: 0,
      tax_amount: 0,

      total: 0,
      company_id: "",
    });

    const downloadInvoice = async (id: any) => {
      let timerInterval;

      try {
        // Show initial loading Swal with generic progress messages
        Swal.fire({
          title: "Downloading Invoice",
          html: `<div class="swal-animation">
            <p class="swal-text">Please wait...</p>
            <div class="swal-progress">
              <div class="swal-progress-bar"></div>
            </div>
          </div>`,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        });

        // Fetch information
        const res = await getInvoiceInfo(id);

        if (res?.success != false) {
          InvoiceInfo.value.id = res.result.id;
          InvoiceInfo.value.company_id = res.result.company_id;
          InvoiceInfo.value.invoice_no = res.result.invoice_no;
          InvoiceInfo.value.customer_id = res.result.customer_id;
          InvoiceInfo.value.client_id = res.result.client_id;

          InvoiceInfo.value.items = JSON.parse(res.result.items);

          InvoiceInfo.value.customer = { ...res.result.customer };
          InvoiceInfo.value.client = { ...res.result.client };
          InvoiceInfo.value.clientx = { ...res.result.clientx };

          InvoiceInfo.value.date = res.result.date;
          InvoiceInfo.value.duedate = res.result.duedate;
          InvoiceInfo.value.enquiry_no = res.result.enquiry_no;
          InvoiceInfo.value.status = res.result.status;
          InvoiceInfo.value.scope_of_work = res.result.scope_of_work;

          InvoiceInfo.value.sub_total = res.result.sub_total
            ? res.result.sub_total
            : 0.0;
          InvoiceInfo.value.tax_id = res.result.tax_id ? res.result.tax_id : "";
          InvoiceInfo.value.tax_type = res.result.tax_type
            ? res.result.tax_type
            : "";
          InvoiceInfo.value.tax_description = res.result.tax_description
            ? res.result.tax_description
            : "";
          InvoiceInfo.value.tax_rate = res.result.tax_rate
            ? res.result.tax_rate
            : "";
          InvoiceInfo.value.tax_amount = res.result.tax_amount
            ? res.result.tax_amount
            : "";

          InvoiceInfo.value.total = res.result.total ? res.result.total : 0.0;
          InvoiceInfo.value.terms_and_conditions =
            res.result.terms_and_conditions;
        } else {
          showErrorAlert("Error", res.message || "Error Occured");
          return;
        }

        // Fetch company logo details
        const res2 = await getCompanyLogo(res.result.company_id);

        if (res2?.success != false) {
          // Update local reactive state (assuming Vue 3 Composition API syntax)
          companyInfo.value.id = res2.result.id;
          companyInfo.value.company_name = res2.result.company_name;
          companyInfo.value.company_logo = res2.result.company_logo
            ? res2.result.company_logo
            : "";
          companyInfo.value.logo_base64 = res2.result.logo_base64
            ? "data: image/png;base64," + res2.result.logo_base64
            : getAssetPath("media/avatars/default.png");

          companyInfo.value.address = res2.result.address || "";
          companyInfo.value.city = res2.result.city || "";
          companyInfo.value.pincode = res2.result.pincode || "";
          companyInfo.value.state = res2.result.state || "";
          companyInfo.value.country = res2.result.country || "";
        } else {
          showErrorAlert("Error", res2.message || "Error Occured");
          return;
        }
        // Update Swal message for PDF generation
        Swal.update({
          title: "Generating PDF",
          html: `<div class="swal-animation">
  <p class="swal-text">Please wait...</p>
  <div class="swal-progress">
    <div class="swal-progress-bar"></div>
  </div>
</div>`,
        });

        await Gen(
          "invoice",
          id,
          InvoiceInfo.value.invoice_no,
          InvoiceInfo,
          companyInfo
        );

        // Close Swal on success
        Swal.fire({
          title: "Download Complete",
          text: "Invoice PDF generated successfully",
          icon: "success",
          timer: 2000, // Show success message for 2 seconds
          timerProgressBar: true,
          allowOutsideClick: true,
        });
      } catch (error) {
        console.error("Error downloading Invoice:", error);

        // Close Swal on success
        Swal.fire({
          title: "Error Complete",
          text: "Failed to download Invoice",
          icon: "error",
          timer: 2000,
          timerProgressBar: true,
          allowOutsideClick: true,
        });
      } finally {
        // Clear interval if still running
        clearInterval(timerInterval);
      }
    };

    return {
      tableData,
      tableHeader,
      deleteItem,
      search,
      searchItems,
      selectedIds,
      deleteFewItem,
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

      selectedYearCache,
      financialYears,
      handleChange,
    };
  },
});
</script>
