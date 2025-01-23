<template>
  <div class="card">
    <div class="card-header border-0 pt-6">
      <!--begin::Card title-->
      <div class="card-title">
        <!--begin::Search-->
        <div class="d-flex align-items-center position-relative my-1"></div>
        <!--end::Search-->
      </div>
      <!--begin::Card title-->
      <!--begin::Card toolbar-->
      <div class="card-toolbar mb-6">
        <div
          class="d-flex justify-content-end"
          data-kt-customer-table-toolbar="base"
        >
          <!--begin::Add customer-->
          <router-link
            :to="`/auditobservations/add/${itemId}`"
            class="btn btn-primary"
          >
            <KTIcon icon-name="link" icon-class="fs-2" />
            Navigate to Observations
          </router-link>
          <!--end::Add customer-->
        </div>
        <!--end::Toolbar-->
      </div>
      <!--end::Card toolbar-->
    </div>
    <div class="card-body pt-0">
      <CorrectiveActionAddModal
        @addData="reLoadData"
        v-bind:data="observationDetails"
      ></CorrectiveActionAddModal>

      <CorrectiveActionEditModal
        @addData="reLoadData"
        v-bind:data="correctiveActionDetails"
      ></CorrectiveActionEditModal>

      <ApprovalModal
        @reloadData="reLoadData"
        v-bind:data="itemData"
      ></ApprovalModal>

      <Datatable
        @on-sort="sort"
        @on-items-select="onItemSelect"
        :data="tableData"
        :header="filteredTableHeader"
        :checkbox-enabled="false"
        :items-per-page="limit"
        :items-per-page-dropdown-enabled="false"
        :loading="loading"
      >
        <!-- img data -->

        <template v-slot:id="{ row: audit_observation }">
          {{ audit_observation.id }}
        </template>
        <template v-slot:clause_number="{ row: audit_observation }">
          <span class="badge py-3 px-4 fs-7 badge-light-primary">
            {{ audit_observation.clause_number }}
          </span>
        </template>
        <template v-slot:description="{ row: audit_observation }">
          {{ audit_observation.description }}
        </template>
        <template v-slot:nc_observation="{ row: audit_observation }">
          {{ audit_observation.nc_observation }}
        </template>
        <template v-slot:corrective_action="{ row: audit_observation }">
          {{
            audit_observation.corrective_action
              ? audit_observation.corrective_action.corrective_action
              : ""
          }}
        </template>
        <template v-slot:root_cause="{ row: audit_observation }">
          {{
            audit_observation.corrective_action
              ? audit_observation.corrective_action.root_cause
              : ""
          }}
        </template>
        <template v-slot:evidence="{ row: audit_observation }">
          <!--begin::Menu Flex-->
          <div class="d-flex flex-lg-row">
            <a
              target="blank"
              v-bind:href="`https://api.zeptac.com/storage/company/${audit_observation.company_id}/audit_evidences/${audit_observation.evidence}`"
              v-tooltip
              title="Download File"
              class="border rounded badge py-3 px-4 fs-7 badge-light-primary text-hover-success cursor-pointer"
              >⤓ File
            </a>
          </div>
        </template>

        <template v-slot:approval_status="{ row: audit_observation }">
          <div v-if="audit_observation.corrective_action">
            <span
              v-if="audit_observation.corrective_action.approval_status == 1"
              class="badge py-3 px-4 fs-7 badge-light-primary"
              >{{
                GetApprovalStatus(
                  audit_observation.corrective_action.approval_status
                )
              }}</span
            >
            <span
              v-if="audit_observation.corrective_action.approval_status == 2"
              class="badge py-3 px-4 fs-7 badge-light-danger"
              >{{
                GetApprovalStatus(
                  audit_observation.corrective_action.approval_status
                )
              }}</span
            >
            <span
              v-if="audit_observation.corrective_action.approval_status == 3"
              class="badge py-3 px-4 fs-7 badge-light-success"
              >{{
                GetApprovalStatus(
                  audit_observation.corrective_action.approval_status
                )
              }}</span
            >
          </div>
          <div v-else>-</div>
        </template>

        <template v-slot:approval_button="{ row: audit_observation }">
          <div
            v-if="audit_observation.corrective_action"
            class="d-flex flex-lg-row"
          >
            <button
              type="button"
              class="btn btn-sm btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#kt_modal_1"
              @click="fillItemData(audit_observation.corrective_action)"
            >
              Open
            </button>
          </div>
          <div v-else></div>
        </template>
        <template v-slot:actions="{ row: audit_observation }">
          <!--begin::Menu Flex-->
          <div class="d-flex flex-lg-row">
            <span
              v-if="audit_observation.corrective_action == null"
              class="menu-link px-3"
              v-tooltip
              title="Add Corrective Action"
              data-bs-toggle="modal"
              :data-bs-target="'#kt_modal_new_address'"
              @click="AddCorrecticeAction(audit_observation)"
            >
              <span
                class="border rounded badge py-3 fs-7 text-hover-gray-700 cursor-pointer"
                >+ corrective action
              </span>
            </span>
            <span
              v-else
              class="menu-link px-3"
              v-tooltip
              title="Edit Corrective Action"
              data-bs-toggle="modal"
              :data-bs-target="'#kt_modal_new_address_edit'"
              @click="EditCorrecticeAction(audit_observation.corrective_action)"
            >
              <span
                class="border rounded badge py-3 fs-7 text-hover-gray-700 cursor-pointer"
                >view corrective action
              </span>
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
import { computed, defineComponent, onMounted, ref } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable/table-partials/models";
import type { IACorrectiveAction } from "@/core/model/audit_observation";
import { useAuthStore } from "@/stores/auth";
import { useRoute, useRouter } from "vue-router";
import CorrectiveActionAddModal from "./CorrectiveActionAddModal.vue";
import CorrectiveActionEditModal from "./CorrectiveActionEditModal.vue";

import { getCorrectiveActions, deleteCorrectiveAction } from "@/stores/api";

import { ApprovalStatus, GetApprovalStatus } from "@/core/model/global";
import { hideModal } from "@/core/helpers/dom";
import ApprovalModal from "./ApprovalModal.vue";
import { Identifier } from "@/core/config/WhichUserConfig";
import arraySort from "array-sort";
import moment from "moment";
import Swal from "sweetalert2";
import { getAssetPath } from "@/core/helpers/assets";

export default defineComponent({
  name: "non-conformance-list",
  components: {
    Datatable,
    CorrectiveActionAddModal,
    CorrectiveActionEditModal,
    ApprovalModal,
  },
  setup() {
    const identifier = Identifier;

    const auth = useAuthStore();
    const router = useRouter();
    const route = useRoute();
    const User = auth.GetUser();
    const itemId = route.params.id;

    const tableHeader = ref([
      {
        columnName: "Clause No.",
        columnLabel: "clause_number",
        sortEnabled: true,
        columnWidth: 75,
      },
      {
        columnName: "Standard Details ",
        columnLabel: "description",
        sortEnabled: true,
        columnWidth: 125,
      },
      {
        columnName: "NC Observed",
        columnLabel: "nc_observation",
        sortEnabled: true,
        columnWidth: 200,
      },
      {
        columnName: "Corrective Action",
        columnLabel: "corrective_action",
        sortEnabled: true,
        columnWidth: 100,
      },
      {
        columnName: "Root Cause Analaysis",
        columnLabel: "root_cause",
        sortEnabled: true,
        columnWidth: 100,
      },
      {
        columnName: "Uploaded Document",
        columnLabel: "evidence",
        sortEnabled: true,
        columnWidth: 100,
      },
      {
        columnName: "Approval Status",
        columnLabel: "approval_status",
        sortEnabled: false,
        columnWidth: 75,
      },
      {
        columnName: "Reject/Approve",
        columnLabel: "approval_button",
        sortEnabled: false,
        columnWidth: 75,
      },
      {
        columnName: "Actions",
        columnLabel: "actions",
        sortEnabled: false,
        columnWidth: 75,
      },
    ]);

    const itemData = ref({
      id: "",
      approval_status: "",
      new_status: "",
      company_id: "",
      updated_by: "",
    });

    const observationDetails = ref({
      audit_schedule_id: "",
      audit_observation_id: "",
      corrective_action: "",
      root_cause: "",
      audit_remark: "",
      approval_status: "",
      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
      is_active: "1",
    });

    const correctiveActionDetails = ref({
      id: "",
      audit_observation_id: "",
      corrective_action: "",
      root_cause: "",
      audit_remark: "",
      approval_status: "1",
      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
      is_active: "1",
    });

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

        const response = await getCorrectiveActions(
          `page=${page}&limit=${limit.value}&itemId=${itemId}`
        );

        if (response.success) {
          more.value = response.result.next_page_url != null ? true : false;
          tableData.value = response.result.data.map(
            ({ id, corrective_action, ...rest }) => ({
              id: id,
              corrective_action: corrective_action,
              ...rest,
            })
          );
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
      loading.value = true;
      try {
        while (tableData.value.length != 0) tableData.value.pop();
        while (initvalues.value.length != 0) initvalues.value.pop();

        const response = await getCorrectiveActions(
          `page=${page.value}&limit=${limit}&itemId=${itemId}`
        );

        if (response.success) {
          more.value = response.result.next_page_url != null ? true : false;
          tableData.value = response.result.data.map(
            ({ id, corrective_action, ...rest }) => ({
              id: id,
              corrective_action: corrective_action,
              ...rest,
            })
          );
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

    const tableData = ref<Array<IACorrectiveAction>>([]);

    const initvalues = ref<Array<IACorrectiveAction>>([]);

    async function corrective_listing(): Promise<void> {
      try {
        const response = await getCorrectiveActions(
          `page=${page.value}&limit=${limit.value}&itemId=${itemId}`
        );

        if (response.success) {
          tableData.value = response.result.data.map(
            ({ id, corrective_action, ...rest }) => ({
              id: id,
              corrective_action: corrective_action,
              ...rest,
            })
          );

          more.value = response.result.next_page_url != null ? true : false;
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

    const filteredTableHeader = computed(() => {
      const isAdmin = identifier.value === "Admin";
      const isCompanyAdmin = identifier.value === "Company-Admin";

      if (isAdmin || isCompanyAdmin) {
        // If the identifier is 'Admin' or 'Company-Admin', include the 'approval_button' column
        return tableHeader.value;
      } else {
        // Otherwise, exclude the 'approval_button' column
        return tableHeader.value.filter(
          (column) => column.columnLabel !== "approval_button"
        );
      }
    });

    onMounted(async () => {
      await corrective_listing();
    });

    const sort = (sort: Sort) => {
      const reverse: boolean = sort.order === "asc";
      if (sort.label) {
        arraySort(tableData.value, sort.label, { reverse });
      }
    };
    const onItemSelect = (selectedItems: Array<number>) => {
      selectedIds.value = selectedItems;
    };

    // Function to add NC
    const AddCorrecticeAction = (observation) => {
      observationDetails.value = {
        audit_observation_id: observation.id,
        audit_schedule_id: observation.audit_schedule_id,
        corrective_action: "",
        root_cause: "",
        audit_remark: "",
        approval_status: "1",
        company_id: observation.company_id,
        created_by: User.id,
        updated_by: User.id,
        is_active: "1",
      };
      console.log("observationDetails are:", observationDetails.value);
    };

    // Function to add NC
    const EditCorrecticeAction = (correctiveAction) => {
      const {
        id,
        audit_observation_id,
        corrective_action,
        root_cause,
        audit_remark,
        approval_status,
        company_id,
        created_by,
        updated_by,
        is_active,
      } = correctiveAction;

      correctiveActionDetails.value = {
        id: id,
        audit_observation_id: audit_observation_id,
        corrective_action: corrective_action,
        root_cause: root_cause,
        audit_remark: audit_remark,
        approval_status: approval_status,
        company_id: company_id,
        created_by: created_by,
        updated_by: User.id,
        is_active: "1",
      };
      console.log(
        "correctiveActionDetails are:",
        correctiveActionDetails.value
      );
    };

    async function reLoadData() {
      await corrective_listing();
    }

    // Function
    const fillItemData = (ncr) => {
      const { id, approval_status, company_id } = ncr;

      itemData.value = {
        id: id,
        approval_status: approval_status,
        new_status: "",
        company_id: company_id,
        updated_by: User.id,
      };
      console.log("itemData are:", itemData.value);
    };

    return {
      tableData,
      tableHeader,
      selectedIds,
      observationDetails,
      correctiveActionDetails,
      reLoadData,
      sort,
      onItemSelect,
      loading,
      limit,
      PrevPage,
      NextPage,
      page,
      Limits,
      PageLimitPoiner,
      AddCorrecticeAction,
      EditCorrecticeAction,
      itemId,
      filteredTableHeader,
      ApprovalStatus,
      GetApprovalStatus,
      itemData,
      fillItemData,
      identifier,
    };
  },
});
</script>
    
    