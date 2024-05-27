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
                 <!-- YEAR WISE DATA -->

                 <h3 class="card-title align-items-start flex-column">
          <span class="card-label fw-semibold text-gray-400"
            >Financial Year</span
          >
        </h3>
        <div class="me-3">
          <el-select
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
            @click="deleteFewItem()"
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
        :header="filteredTableHeader"
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
        <template v-slot:customer_company="{ row: quotations }">
          <span class="text-gray-600 text-hover-primary mb-1">
            {{ quotations.customer_company }}
          </span>
        </template>
        <template v-slot:site_location="{ row: quotations }">
          <span class="text-gray-600 text-hover-primary mb-1">
            {{ quotations.site_location?.city }}
            {{ quotations.site_location?.states }}
          </span>
        </template>
        <!-- defualt data -->
        <template
          v-slot:company_name="{ row: quotations }"
          v-if="identifier == 'Admin'"
        >
          {{ quotations.company_name }}
        </template>
        <template v-slot:date="{ row: quotations }">
          {{ quotations.date }}
        </template>
        <template v-slot:total="{ row: quotations }">
          {{ formatPrice(quotations.total) }}
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
        <template v-slot:actions="{ row: quotations }">
          <!--begin::Menu Flex-->
          <div class="d-flex flex-lg-row">
            <span
              class="menu-link px-3"
              data-toggle="tooltip"
              title="Download Quotation"
            >
              <i
                @click="downloadQuotation(quotations.id)"
                class="las la-download text-gray-600 text-hover-success mb-1 fs-1"
              ></i>
            </span>
            <span
              class="menu-link px-3"
              data-toggle="tooltip"
              title="View Quotation"
            >
              <router-link :to="`./edit/${quotations.id}`">
                <i
                  class="las la-edit text-gray-600 text-hover-primary mb-1 fs-1"
                ></i>
              </router-link>
            </span>
            <span
              class="menu-link px-3"
              data-toggle="tooltip"
              title="Delete Quotation"
            >
              <i
                @click="deleteItem(quotations.id, false)"
                class="las la-minus-circle text-gray-600 text-hover-danger mb-1 fs-1"
              ></i>
            </span>
            <span
              class="menu-link px-3"
              data-toggle="tooltip"
              title="Duplicate Quotation"
            >
              <i
                @click="dupQuotation(quotations.id)"
                class="las la-copy text-gray-600 text-hover-warning mb-1 fs-1"
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
import { defineComponent, onMounted, ref, computed, watch } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import type { IQuotations } from "@/core/model/quotation";
import {
  getQuotationList,
  deleteQuotation,
  getQuotation,
  addQuotation,
  QuotationSearch,
  GetIncrQuotationId,
  DownloadQuotation,
} from "@/stores/api";
import arraySort from "array-sort";
import { useAuthStore } from "@/stores/auth";
import { formatPrice } from "@/core/config/DataFormatter";
import { GetQuotationStatus } from "@/core/config/QuotationStatusConfig";
import moment from "moment";
import Swal from "sweetalert2";
import { Identifier } from "@/core/config/WhichUserConfig";
import { Gen } from "@/core/config/PdfGenerator";

export default defineComponent({
  name: "quotation-list",
  components: {
    Datatable,
  },
  setup() {
    // Financial Year Logic
    const authStore = useAuthStore();

    const tableHeader = ref([
      {
        columnName: "Quotation No",
        columnLabel: "quotation_no",
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
        columnName: "Quotation Date",
        columnLabel: "date",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Quotation Amount",
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

    interface quotationDetails {
      quotation_no: string;
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

    const auth = useAuthStore();
    const User = auth.GetUser();
    const quotationDetail = ref<quotationDetails>({
      quotation_no: "",
      lead_id: "",
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

    const selectedIds = ref<Array<number>>([]);

    const tableData = ref<Array<IQuotations>>([]);

    const initvalues = ref<Array<IQuotations>>([]);

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

        const response = await getQuotationList(
          `page=${page}&limit=${limit.value}&year=${
            selectedYearCache.value
              ? selectedYearCache.value
              : financialYears.value[0]
          }`
        );

        more.value = response.result.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(
          ({
            date,
            total,
            customer_company,
            site_location,
            company_name,
            status,
            id,
            quotation_no,
          }) => ({
            status: status,
            id: id,
            quotation_no: quotation_no,
            customer_company: customer_company.company_name,
            company_name: company_name.company_name,
            site_location: site_location,
            date,
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
          `page=${page.value}&limit=${limit}&year=${
            selectedYearCache.value
              ? selectedYearCache.value
              : financialYears.value[0]
          }`
        );

        more.value = response.result.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(
          ({
            date,
            total,
            customer_company,
            site_location,
            company_name,
            status,
            id,
            quotation_no,
          }) => ({
            status: status,
            id: id,
            quotation_no: quotation_no,
            customer_company: customer_company.company_name,
            company_name: company_name.company_name,
            site_location: site_location,
            date,
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

    const filteredTableHeader = computed(() => {
      // If the identifier is 'Admin', include the 'Company Name' column; otherwise, exclude it
      return identifier.value === "Admin"
        ? tableHeader.value
        : tableHeader.value.filter(
            (column) => column.columnLabel !== "company_name"
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
      await quotation_listing();
    }

    onMounted(async () => {
      // Save initial selected year to localStorage
      localStorage.setItem("selectedFinancialYear", selectedYearCache.value);

      await quotation_listing();
    });

    async function quotation_listing(): Promise<void> {
      try {
        const response = await getQuotationList(
          `page=${page.value}&limit=${limit.value}&year=${
            selectedYearCache.value
              ? selectedYearCache.value
              : financialYears.value[0]
          }`
        );
        // console.log(response);

        more.value = response.result.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(
          ({
            date,
            total,
            customer_company,
            site_location,
            company_name,
            status,
            id,
            quotation_no,
          }) => ({
            status: status,
            id: id,
            quotation_no: quotation_no,
            customer_company: customer_company.company_name,
            company_name: company_name.company_name,
            site_location: site_location,
            date,
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
          const response = await deleteQuotation(id);
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
        let results: Array<IQuotations> = [];
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
        const response = await QuotationSearch(search.value, selectedYearCache.value ? selectedYearCache.value : financialYears.value[0]);

        more.value = response.result.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(
          ({
            date,
            total,
            customer_company,
            site_location,
            company_name,
            status,
            id,
            quotation_no,
          }) => ({
            status: status,
            id: id,
            quotation_no: quotation_no,
            customer_company: customer_company.company_name,
            company_name: company_name.company_name,
            site_location: site_location,
            date,
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
          // quotationDetail.value.date = moment(
          //   quotationDetail.value.date
          // ).format("YYYY-MM-DD HH:mm:ss");
          // quotationDetail.value.duedate = moment(
          //   quotationDetail.value.duedate
          // ).format("YYYY-MM-DD HH:mm:ss");
          quotationDetail.value = {
            quotation_no: latestquotation_no,
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
          const respons = await addQuotation(quotationDetail.value);
          // console.log(response.error);
          if (!respons.error) {
            // list fetch update
            await quotation_listing();
          }
        }
      });
    };

    const QuotationInfo = ref({
      id: "",
      quotation_no: "",
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


    const downloadQuotation = async (id: any) => {
      const res = await DownloadQuotation(id);
      // console.log(res);

      if (res.result) {
        QuotationInfo.value.id = res.result.id;
        QuotationInfo.value.quotation_no = res.result.quotation_no;
        QuotationInfo.value.lead_id = res.result.customer_id;
        QuotationInfo.value.client_id = res.result.client_id;
        QuotationInfo.value.customer_name = res.result.customer_data;
        QuotationInfo.value.client_name = res.result.client_data;
        QuotationInfo.value.items = JSON.parse(res.result.items);
        QuotationInfo.value.lead = res.result.lead;
        QuotationInfo.value.client = res.result.client;
        QuotationInfo.value.total = res.result.total;
        QuotationInfo.value.date = res.result.date;
        QuotationInfo.value.duedate = res.result.duedate;
        QuotationInfo.value.enquiry_no = res.result.enquiry_no;
        QuotationInfo.value.status = res.result.status;
        QuotationInfo.value.scope_of_work = res.result.scope_of_work;
        QuotationInfo.value.terms_and_conditions =
          res.result.terms_and_conditions;

        QuotationInfo.value.company_details.company_name =
          res.result.company_details.company_name;
        QuotationInfo.value.company_details.company_logo = res.result
          .company_details.company_logo
          ? "data: image/png;base64," + res.result.company_details.company_logo
          : getAssetPath("media/avatars/default.png");

        // console.log(QuotationInfo.value);

        await Gen(
          "quotation",
          id.toString(),
          QuotationInfo.value.quotation_no,
          QuotationInfo
        );
      } else {
        // console.log(res.message)
        showErrorAlert("information", res.message ?? "something went wrong");
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
      GetQuotationStatus,
      dupQuotation,
      loading,
      NextPage,
      PrevPage,
      page,
      limit,
      PageLimitPoiner,
      Limits,
      filteredTableHeader,
      identifier,
      downloadQuotation,
      
      selectedYearCache,
      financialYears,
      handleChange,
    };
  },
});
</script>
