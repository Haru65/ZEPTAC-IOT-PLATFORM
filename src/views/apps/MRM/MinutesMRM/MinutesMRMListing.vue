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
            placeholder="Search by agenda"
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

        <template v-slot:id="{ row: mrm }">
          {{ mrm.id }}
        </template>
        <template v-slot:agenda="{ row: mrm }">
          {{ mrm.agenda }}
        </template>
        <template v-slot:meeting_date="{ row: mrm }">
          <span class="badge py-3 px-4 fs-7 badge-light-primary">{{
            mrm.meeting_date
          }}</span>
        </template>

        <template v-slot:attendees="{ row: mrm }">
          <div>
            <el-select filterable placeholder="Attendees Name">
              <el-option
                disabled="disabled"
                v-for="(item, index) in mrm.attendees_names"
                :key="index"
                :value="item"
                :label="item"
              />
            </el-select>
          </div>
        </template>
        <template v-slot:meetings_count="{ row: mrm }">
          <span
            v-if="mrm.meetings_count === 0"
            class="menu-link px-3"
            data-toggle="tooltip"
            title="Add Meetings of Minute"
          >
            <router-link :to="`/mrm_minutes/add/${mrm.id}`">
              <span
                class="border rounded badge py-3 fs-7 badge-light-primary text-hover-success cursor-pointer"
                >+ Meeting Minute
              </span>
            </router-link>
          </span>
          <span v-else> </span>
        </template>
        <template v-slot:actions="{ row: mrm }">
          <!--begin::Menu Flex-->
          <div class="d-flex flex-lg-row my-3">
            <!--begin::Edit-->
            <router-link :to="`/mrm_minutes/edit/${mrm.id}`">
              <span
                class="btn btn-icon btn-active-light-primary w-30px h-30px me-3"
                data-bs-toggle="tooltip"
                title="View MRM"
              >
                <KTIcon icon-name="pencil" icon-class="fs-2" />
              </span>
            </router-link>
            <!--end::Edit-->

            <!--begin::Delete-->
            <span
              @click="deleteItem(mrm.id, false)"
              class="btn btn-icon btn-active-light-danger w-30px h-30px me-3"
              data-bs-toggle="tooltip"
              title="Delete MRM"
            >
              <KTIcon icon-name="trash" icon-class="fs-2" />
            </span>
            <!--end::Delete-->
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
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable/table-partials/models";
import type { IMRM } from "@/core/model/mrm";
import { useAuthStore } from "@/stores/auth";
import {
  getMRMSchedules,
  deleteMRMSchedule,
  MRMScheduleSearch,
} from "@/stores/api";
import arraySort from "array-sort";
import moment from "moment";
import Swal from "sweetalert2";

export default defineComponent({
  name: "mrm-schedule-list",
  components: {
    Datatable,
  },
  setup() {
    // Financial Year Logic
    const authStore = useAuthStore();

    const tableHeader = ref([
      {
        columnName: "Meeting Agenda",
        columnLabel: "agenda",
        sortEnabled: true,
        columnWidth: 200,
      },
      {
        columnName: "Meeting Date",
        columnLabel: "meeting_date",
        sortEnabled: true,
        columnWidth: 100,
      },
      {
        columnName: "Attendees",
        columnLabel: "attendees",
        sortEnabled: true,
        columnWidth: 100,
      },
      {
        columnName: "Add Meeting Minute",
        columnLabel: "meetings_count",
        sortEnabled: true,
        columnWidth: 100,
      },
      {
        columnName: "Actions",
        columnLabel: "actions",
        sortEnabled: false,
        columnWidth: 75,
      },
    ]);

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

        const response = await getMRMSchedules(
          `page=${page}&limit=${limit.value}&year=${
            selectedYearCache.value
              ? selectedYearCache.value
              : financialYears.value[0]
          }`
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

        const response = await getMRMSchedules(
          `page=${page.value}&limit=${limit}&year=${
            selectedYearCache.value
              ? selectedYearCache.value
              : financialYears.value[0]
          }`
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

    const tableData = ref<Array<IMRM>>([]);

    const initvalues = ref<Array<IMRM>>([]);

    async function mrm_listing(): Promise<void> {
      try {
        const response = await getMRMSchedules(
          `page=${page.value}&limit=${limit.value}&year=${
            selectedYearCache.value
              ? selectedYearCache.value
              : financialYears.value[0]
          }`
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
      await mrm_listing();
    }

    onMounted(async () => {
      // Save initial selected year to localStorage
      localStorage.setItem("selectedFinancialYear", selectedYearCache.value);

      await mrm_listing();
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
          const response = await deleteMRMSchedule(id);
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
      if (search.value.length != 0) {
        let results: Array<IMRM> = [];
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
        await mrm_listing();
      }
    };

    async function SearchMore() {
      // Your API call logic here
      try {
        const response = await MRMScheduleSearch(
          search.value,
          selectedYearCache.value
            ? selectedYearCache.value
            : financialYears.value[0]
        );

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
      loading,
      limit,
      PrevPage,
      NextPage,
      page,
      Limits,
      PageLimitPoiner,

      selectedYearCache,
      financialYears,
      handleChange,
    };
  },
});
</script>
  
  