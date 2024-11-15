<template>
  <div class="card">
    <div class="card-header border-0 pt-6">
      <!--begin::Card title-->
      <div class="card-title"></div>
      <!--begin::Card title-->
      <!--begin::Card toolbar-->
      <div class="card-toolbar">
        <!--begin::Toolbar-->
        <div
          v-if="selectedIds.length === 0"
          class="d-flex justify-content-end"
          data-kt-customer-table-toolbar="base"
        >
          <!--begin::Add customer-->
          <router-link
            :to="`/bsc_reports/add/${itemId}`"
            class="btn btn-primary"
          >
            <KTIcon icon-name="plus" icon-class="fs-2" />
            BioSafety Cabinet Report
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
        @on-sort="sort"
        @on-items-select="onItemSelect"
        :data="tableData"
        :header="filteredTableHeader"
        :checkbox-enabled="true"
        :items-per-page="limit"
        :items-per-page-dropdown-enabled="false"
        :loading="loading"
      >
        <template v-slot:certificate_number="{ row: bsc }">
          {{ bsc.certificate_number }}
        </template>
        <template v-slot:ulr_number="{ row: bsc }">
          {{ bsc.ulr_number }}
        </template>
        <template v-slot:actions="{ row: bsc }">
          <!--begin::Menu Flex-->
          <div class="d-flex flex-lg-row my-3">
            <!-- begin::Download -->

            <span
              class="btn btn-icon btn-active-light-success w-30px h-30px me-3"
            >
              <i
                @click="downloadLAFReport(bsc.id)"
                class="las la-download fs-2"
              ></i>
            </span>
            <!-- end::Download -->

            <!--begin::Edit-->
            <router-link :to="`/bsc_reports/edit/${bsc.id}`">
              <span
                class="btn btn-icon btn-active-light-primary w-30px h-30px me-3"
              >
                <KTIcon icon-name="pencil" icon-class="fs-2" />
              </span>
            </router-link>
            <!--end::Edit-->

            <!--begin::Delete-->
            <span
              @click="deleteItem(bsc.id, false)"
              class="btn btn-icon btn-active-light-danger w-30px h-30px me-3"
            >
              <KTIcon icon-name="trash" icon-class="fs-2" />
            </span>
            <!--end::Delete-->
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
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import type { IBscReport } from "@/core/model/bsc";
import arraySort from "array-sort";
import ApiService from "@/core/services/ApiService";
import { useAuthStore } from "@/stores/auth";
import { useRoute, useRouter } from "vue-router";
import { get_role } from "@/core/config/PermissionsRolesConfig";
import moment from "moment";
import Swal from "sweetalert2";
import {
  deleteBSCReport,
  DownloadBSCReport,
  getBSCReports,
} from "@/stores/api";
import { Identifier } from "@/core/config/WhichUserConfig";
import { BSCReportGen } from "@/core/config/BSCReportGenerator";

export default defineComponent({
  name: "bsc-edit",
  components: {
    Datatable,
  },
  setup() {
    const loading = ref(true);
    const identifier = Identifier;

    const auth = useAuthStore();
    const router = useRouter();
    const User = auth.GetUser();
    const route = useRoute();
    const itemId = route.params.id;

    const tableHeader = ref([
      {
        columnName: "Certificate Number",
        columnLabel: "certificate_number",
        sortEnabled: true,
        columnWidth: 155,
      },
      {
        columnName: "ULR Number",
        columnLabel: "ulr_number",
        sortEnabled: true,
        columnWidth: 155,
      },
      {
        columnName: "Actions",
        columnLabel: "actions",
        sortEnabled: false,
        columnWidth: 75,
      },
    ]);

    const selectedIds = ref<Array<number>>([]);
    const tableData = ref<Array<IBscReport>>([]);
    const initvalues = ref<Array<IBscReport>>([]);

    // staring from 1
    const page = ref(1);
    const limit = ref(10);
    // limit 10
    const more = ref(false);
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

        const response = await getBSCReports(
          `page=${page}&limit=${limit.value}&itemId=${itemId}`
        );

        if (response.success) {
          more.value = response.result.next_page_url != null ? true : false;
          tableData.value = response.result.data.map(({ id, ...rest }) => ({
            id,
            ...rest,
          }));
          initvalues.value.splice(
            0,
            tableData.value.length,
            ...tableData.value
          );
        }
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

        const response = await getBSCReports(
          `page=${page.value}&limit=${limit}&itemId=${itemId}`
        );

        if (response.success) {
          more.value = response.result.next_page_url != null ? true : false;
          tableData.value = response.result.data.map(({ id, ...rest }) => ({
            id,
            ...rest,
          }));
          initvalues.value.splice(
            0,
            tableData.value.length,
            ...tableData.value
          );
        }
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
      return identifier.value === "Admin"
        ? tableHeader.value
        : tableHeader.value.filter(
            (column) => column.columnLabel !== "company_name"
          );
    });

    // functions
    // get users function
    async function laf_listing(): Promise<void> {
      try {
        ApiService.setHeader();
        const response = await getBSCReports(
          `page=${page.value}&limit=${limit.value}&itemId=${itemId}`
        );
        // console.log(response);

        if (response.success) {
          more.value = response.result.next_page_url != null ? true : false;
          tableData.value = response.result.data.map(({ id, ...rest }) => ({
            id,
            ...rest,
          }));
          initvalues.value.splice(
            0,
            tableData.value.length,
            ...tableData.value
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        //console.log("done");
        setTimeout(() => {
          loading.value = false;
        }, 100);
      }
    }

    onMounted(async () => {
      await laf_listing();
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
          const response = await deleteBSCReport(id);
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

    const sort = (sort: Sort) => {
      const reverse: boolean = sort.order === "asc";
      if (sort.label) {
        arraySort(tableData.value, sort.label, { reverse });
      }
    };
    const onItemSelect = (selectedItems: Array<number>) => {
      selectedIds.value = selectedItems;
    };

    const itemDetails = ref({
      id: "",
      bsc_id: "",
      certificate_number: "NB-001",
      ulr_number: "TC-0001",
      d_receipt: "",
      d_testing: "",
      d_issue: "",
      r_due_date: "",
      description: "",
      make: "",
      model_no: "",
      serial_no: "",
      id_no: "",
      testing_at: "",
      room_name: "",
      room_id: "",
      temperature: 20.3,
      humidity: 53.0,
      differential_pressure: 10,

      inFlow: [
        {
          filter_id: "Row 1",
          l1: "",
          l2: "",
          l3: "",
          l4: "",
          l5: "",
          mean: 0,
          acceptance_limit: "0.40",
          output: "",
        },
      ],
      downFlow: [
        {
          filter_id: "Row 1",
          l1: "",
          l2: "",
          l3: "",
          l4: "",
          l5: "",
          mean: 0,
          acceptance_limit: "0.25-0.50",
          output: "",
        },
      ],
      filter: [
        {
          filter_id: "SH",
          upstream: "100",
          downstream: "",
          acceptance_limit: "0.01",
          output: "",
        },
      ],
      particle: [
        {
          particle_size: "0.3",
          l1: "",
          l2: "",
          l3: "",
          l4: "",
          l5: "",
          mean: 0,
          acceptance_limit: "10200",
          output: "",
        },
        {
          particle_size: "0.5",
          l1: "",
          l2: "",
          l3: "",
          l4: "",
          l5: "",
          mean: 0,
          acceptance_limit: "3520",
          output: "",
        },
        {
          particle_size: "5.0",
          l1: "",
          l2: "",
          l3: "",
          l4: "",
          l5: "",
          mean: 0,
          acceptance_limit: "0",
          output: "",
        },
      ],

      laminar: {
        id: "",
        service_request_id: "",
        cleanroom_instruments: [],
      },

      cleanroom_instruments: [
        {
          id: "",
          name: "",
          make: "",
          description: "",
          model_no: "",
          serial_no: "",
          calibration_date: "",
          calibration_due_date: "",
        },
      ],

      customer: {
          id: "",
          name: "",
          company_name: "",
          address1: "",
          address2: "",
          city: "",
          pincode: "",
          state: "",
          country: "",
      },

      service: {
        id: "",
        srf_no: "",
        customer_id: "",
        customer_name: "",
      },

      company_id: "",
      created_by: "",
      updated_by: "",

      createdByUser: {
        id: "",
        first_name: "",
        last_name: "",
      },
      updatedByUser: {
        id: "",
        first_name: "",
        last_name: "",
      },
    });

    // Download BioSafety Cabinet Report
    const downloadLAFReport = async (id: any) => {
      try {
        const res = await DownloadBSCReport(id);

        itemDetails.value.id = res.result.id;
        itemDetails.value.bsc_id = res.result.bsc_id;
        itemDetails.value.certificate_number = res.result.certificate_number;
        itemDetails.value.ulr_number = res.result.ulr_number;
        itemDetails.value.d_receipt = res.result.d_receipt;
        itemDetails.value.d_testing = res.result.d_testing;
        itemDetails.value.d_issue = res.result.d_issue;
        itemDetails.value.r_due_date = res.result.r_due_date;
        itemDetails.value.description = res.result.description;
        itemDetails.value.make = res.result.make;
        itemDetails.value.model_no = res.result.model_no;
        itemDetails.value.serial_no = res.result.serial_no;
        itemDetails.value.id_no = res.result.id_no;
        itemDetails.value.testing_at = res.result.testing_at;
        itemDetails.value.room_name = res.result.room_name;
        itemDetails.value.room_id = res.result.room_id;

        itemDetails.value.temperature = res.result.temperature;
        itemDetails.value.humidity = res.result.humidity;
        itemDetails.value.differential_pressure =
          res.result.differential_pressure;

        itemDetails.value.inFlow = JSON.parse(res.result.inFlow);
        itemDetails.value.downFlow = JSON.parse(res.result.downFlow);
        itemDetails.value.filter = JSON.parse(res.result.filter);
        itemDetails.value.particle = JSON.parse(res.result.particle);

        itemDetails.value.company_id = res.result.company_id;
        itemDetails.value.created_by = res.result.created_by;
        itemDetails.value.updated_by = res.result.updated_by;

        itemDetails.value.customer = res.result.customer;
        itemDetails.value.service = res.result.service;
        itemDetails.value.cleanroom_instruments =
          res.result.cleanroom_instruments;

        const reportName = `${itemDetails.value.service.srf_no}`;

        await BSCReportGen(id, reportName, itemDetails);
        console.log(itemDetails.value);
      } catch (error) {
        console.log(error);
        alert("Unable to download the report. Please try again.");
      }
    };

    return {
      tableData,
      tableHeader,
      deleteItem,
      selectedIds,
      deleteFewItem,
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
      identifier,
      filteredTableHeader,
      itemId,
      downloadLAFReport,
    };
  },
});
</script>
    