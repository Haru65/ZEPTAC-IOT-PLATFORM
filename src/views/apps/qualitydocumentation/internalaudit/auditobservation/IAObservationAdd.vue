<template>
  <div style="width: 99%" class="bg-body p-4 rounded">
    <div class="container mt-6">
      <!-- extra fields -->
      <div class="row mb-6">
        <div class="form-group col-lg-12 col-md-12">
          <label
            class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
            >Auditor Name</label
          >
          <div class="form-control form-control-lg form-control-solid">
            {{ auditDetails.auditor_name }}
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <h3 class="fw-bold text-gray-700 fw-semobold fs-6">Clauses</h3>
      <!-- Horizontal tabs for clause numbers -->
      <div class="row row-cols-4">
        <div
          v-for="(clause, index) in clauses"
          :key="index"
          class="col text-center"
        >
          <div
            class="tab-item rounded border border-bottom-0 p-2"
            :class="{ 'active-tab': selectedClause === index }"
            @click="selectClause(index)"
          >
            {{ clause["clause_number"] }}
          </div>
        </div>
      </div>
    </div>

    <div class="table-responsive mb-10">
      <!--begin::Table-->

      <table
        class="table table-responsive g-5 m-2 w-100 fw-bold text-gray-700 table-bordered"
        data-kt-element="Selects"
      >
        <!--begin::Table body-->
        <tbody>
          <tr class="justifiy-content-start">
            <div class="min-w-500px">
              <!-- Accordions for respective clauses -->
              <div
                v-for="(clause, index) in clauses"
                :key="index"
                v-show="selectedClause === index"
                class="accordion mt-6"
                :id="`accordion_${index}`"
              >
                <div class="accordion-item">
                  <h2 class="accordion-header" :id="`heading_${index}`">
                    <button
                      class="accordion-button"
                      type="button"
                      :data-bs-toggle="'collapse'"
                      :data-bs-target="`#collapse_${index}`"
                      :aria-expanded="index === 0 ? 'true' : 'false'"
                      :aria-controls="`collapse_${index}`"
                    >
                      {{ clause["clause_number"] }}
                    </button>
                  </h2>
                  <div
                    :id="`collapse_${index}`"
                    class="accordion-collapse collapse"
                    :aria-labelledby="`heading_${index}`"
                    :data-bs-parent="`#accordion_${index}`"
                  >
                    <div class="accordion-body">
                      <div
                        class="form-control form-control-lg form-control-solid mb-6"
                      >
                        {{ clause["description"] }}
                      </div>

                      <div class="text-start mb-6">
                        <span
                          v-if="clause['has_nc']"
                          type="button"
                          data-toggle="tooltip"
                          title="View NC Observation"
                          class="btn btn-primary rounded btn-sm"
                          data-bs-toggle="modal"
                          :data-bs-target="'#kt_modal_new_address'"
                          @click="addNC(clause)"
                        >
                          <span class="text-center">+ Add NC</span>
                        </span>
                      </div>

                      <div class="accordion" :id="`nested_accordion_${index}`">
                        <div
                          class="accordion-item"
                          v-for="(nestedClause, nestedIndex) in clause[
                            'hierarchies'
                          ]"
                          :key="nestedIndex"
                        >
                          <h2
                            class="accordion-header"
                            :id="`nested_heading_${index}_${nestedIndex}`"
                          >
                            <button
                              class="accordion-button"
                              type="button"
                              :data-bs-toggle="'collapse'"
                              :data-bs-target="`#nested_collapse_${index}_${nestedIndex}`"
                              :aria-expanded="
                                nestedIndex === 0 ? 'true' : 'false'
                              "
                              :aria-controls="`nested_collapse_${index}_${nestedIndex}`"
                            >
                              {{ nestedClause["clause_number"] }}
                            </button>
                          </h2>
                          <div
                            :id="`nested_collapse_${index}_${nestedIndex}`"
                            class="accordion-collapse collapse"
                            :aria-labelledby="`nested_heading_${index}_${nestedIndex}`"
                            :data-bs-parent="`#nested_accordion_${index}`"
                          >
                            <div class="accordion-body">
                              <div
                                class="form-control form-control-lg form-control-solid mb-6"
                              >
                                {{ nestedClause["description"] }}
                              </div>

                              <div class="text-start mb-6">
                                <span
                                  v-if="nestedClause['has_nc']"
                                  type="button"
                                  data-toggle="tooltip"
                                  title="View NC Observation"
                                  class="btn btn-primary rounded btn-sm"
                                  data-bs-toggle="modal"
                                  :data-bs-target="'#kt_modal_new_address'"
                                  @click="addNC(nestedClause)"
                                >
                                  <span class="text-center">+ Add NC</span>
                                </span>
                              </div>

                              <!-- Additional nested accordions or content here -->
                              <div
                                class="accordion"
                                :id="`nested_nested_accordion_${index}_${nestedIndex}`"
                              >
                                <div
                                  class="accordion-item"
                                  v-for="(
                                    nestedNestedClause, nestedNestedIndex
                                  ) in nestedClause['hierarchies']"
                                  :key="nestedNestedIndex"
                                >
                                  <h2
                                    class="accordion-header"
                                    :id="`nested_nested_heading_${index}_${nestedIndex}_${nestedNestedIndex}`"
                                  >
                                    <button
                                      class="accordion-button"
                                      type="button"
                                      :data-bs-toggle="'collapse'"
                                      :data-bs-target="`#nested_nested_collapse_${index}_${nestedIndex}_${nestedNestedIndex}`"
                                      :aria-expanded="
                                        nestedNestedIndex === 0
                                          ? 'true'
                                          : 'false'
                                      "
                                      :aria-controls="`nested_nested_collapse_${index}_${nestedIndex}_${nestedNestedIndex}`"
                                    >
                                      {{ nestedNestedClause.clause_number }}
                                    </button>
                                  </h2>
                                  <div
                                    :id="`nested_nested_collapse_${index}_${nestedIndex}_${nestedNestedIndex}`"
                                    class="accordion-collapse collapse"
                                    :aria-labelledby="`nested_nested_heading_${index}_${nestedIndex}_${nestedNestedIndex}`"
                                    :data-bs-parent="`#nested_nested_accordion_${index}_${nestedIndex}`"
                                  >
                                    <div class="accordion-body">
                                      <div
                                        class="form-control form-control-lg form-control-solid mb-6"
                                      >
                                        {{ nestedNestedClause.description }}
                                      </div>

                                      <div class="text-start mb-6">
                                        <span
                                          v-if="nestedNestedClause.has_nc"
                                          type="button"
                                          data-toggle="tooltip"
                                          title="View NC Observation"
                                          class="btn btn-primary rounded btn-sm"
                                          data-bs-toggle="modal"
                                          :data-bs-target="'#kt_modal_new_address'"
                                          @click="addNC(nestedNestedClause)"
                                        >
                                          <span class="text-center"
                                            >+ Add NC</span
                                          >
                                        </span>
                                      </div>

                                      <!-- Additional nested accordions or content here -->
                                      <div
                                        class="accordion"
                                        :id="`nested_nested_nested_accordion_${index}_${nestedIndex}_${nestedNestedIndex}`"
                                      >
                                        <div
                                          class="accordion-item"
                                          v-for="(
                                            nestedNestedNestedClause,
                                            nestedNestedNestedIndex
                                          ) in nestedNestedClause.hierarchies"
                                          :key="nestedNestedNestedIndex"
                                        >
                                          <h2
                                            class="accordion-header"
                                            :id="`nested_nested_nested_heading_${index}_${nestedIndex}_${nestedNestedIndex}_${nestedNestedNestedIndex}`"
                                          >
                                            <button
                                              class="accordion-button"
                                              type="button"
                                              :data-bs-toggle="'collapse'"
                                              :data-bs-target="`#nested_nested_nested_collapse_${index}_${nestedIndex}_${nestedNestedIndex}_${nestedNestedNestedIndex}`"
                                              :aria-expanded="
                                                nestedNestedNestedIndex === 0
                                                  ? 'true'
                                                  : 'false'
                                              "
                                              :aria-controls="`nested_nested_nested_collapse_${index}_${nestedIndex}_${nestedNestedIndex}_${nestedNestedNestedIndex}`"
                                            >
                                              {{
                                                nestedNestedNestedClause.clause_number
                                              }}
                                            </button>
                                          </h2>
                                          <div
                                            :id="`nested_nested_nested_collapse_${index}_${nestedIndex}_${nestedNestedIndex}_${nestedNestedNestedIndex}`"
                                            class="accordion-collapse collapse"
                                            :aria-labelledby="`nested_nested_nested_heading_${index}_${nestedIndex}_${nestedNestedIndex}_${nestedNestedNestedIndex}`"
                                            :data-bs-parent="`#nested_nested_nested_accordion_${index}_${nestedIndex}_${nestedNestedIndex}`"
                                          >
                                            <div class="accordion-body">
                                              <div
                                                class="form-control form-control-lg form-control-solid mb-6"
                                              >
                                                {{
                                                  nestedNestedNestedClause.description
                                                }}
                                              </div>

                                              <div class="text-start mb-6">
                                                <span
                                                  v-if="
                                                    nestedNestedNestedClause.has_nc
                                                  "
                                                  type="button"
                                                  data-toggle="tooltip"
                                                  title="View NC Observation"
                                                  class="btn btn-primary rounded btn-sm"
                                                  data-bs-toggle="modal"
                                                  :data-bs-target="'#kt_modal_new_address'"
                                                  @click="
                                                    addNC(
                                                      nestedNestedNestedClause
                                                    )
                                                  "
                                                >
                                                  <span class="text-center"
                                                    >+ Add NC</span
                                                  >
                                                </span>
                                              </div>
                                              <!-- Additional nested accordions or content here -->
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </tr>
        </tbody>
        <!--end::Table body-->
        <!--begin::Table foot-->
        <!--end::Table foot-->
      </table>
    </div>

    <IAObservationAddModal
      @addData="reLoadData"
      v-bind:data="clauseDetails"
    ></IAObservationAddModal>

    <div class="card mb-5 mb-xl-10 pb-12">
      <div class="card-header border-0 pt-6">
        <!--begin::Card title-->
        <div class="card-title">
          <!--begin::Card title-->
          <div class="card-title m-0">
            <h3 class="fw-bold m-0">Audit Observation List</h3>
          </div>
          <!--end::Card title-->
        </div>
        <!--begin::Card title-->
        <!--begin::Card toolbar-->

        <div class="card-toolbar">
          <!--begin::Group actions-->
          <div
            v-if="selectedIds.length === 0"
            class="d-flex justify-content-end"
            data-kt-customer-table-toolbar="base"
          >
            <!--begin::Add customer-->
            <router-link
              :to="`/non_conformance/list/${itemId}`"
              class="btn btn-primary"
            >
              <KTIcon icon-name="link" icon-class="fs-2" />
              Non-Conformances
            </router-link>
            <!--end::Add customer-->
          </div>

          <div
            v-if="selectedIds.length !== 0"
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

      <!--begin::Card body-->
      <div class="card-body pt-0">
        <ApprovalModal
          @reloadData="reLoadData"
          v-bind:data="itemData"
        ></ApprovalModal>

        <div class="table-responsive">
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
            <template v-slot:compilance_type="{ row: audit_observation }">
              <span class="badge py-3 px-4 fs-7 badge-light-primary">
                {{ audit_observation.compilance_type }}
              </span>
            </template>
            <template v-slot:evidence="{ row: audit_observation }">
              <!--begin::Menu Flex-->
              <div class="d-flex flex-lg-row">
                <a
                  target="blank"
                  v-bind:href="`http://localhost:8000/storage/company/${audit_observation.company_id}/audit_evidences/${audit_observation.evidence}`"
                  data-toggle="tooltip"
                  title="Download File"
                  class="border rounded badge py-3 px-4 fs-7 badge-light-primary text-hover-success cursor-pointer"
                  >⤓ File
                </a>
              </div>
            </template>
            <template v-slot:approval_status="{ row: audit_observation }">
              <span
                v-if="audit_observation.approval_status == 1"
                class="badge py-3 px-4 fs-7 badge-light-primary"
                >{{
                  GetApprovalStatus(audit_observation.approval_status)
                }}</span
              >
              <span
                v-if="audit_observation.approval_status == 2"
                class="badge py-3 px-4 fs-7 badge-light-danger"
                >{{
                  GetApprovalStatus(audit_observation.approval_status)
                }}</span
              >
              <span
                v-if="audit_observation.approval_status == 3"
                class="badge py-3 px-4 fs-7 badge-light-success"
                >{{
                  GetApprovalStatus(audit_observation.approval_status)
                }}</span
              >
            </template>

            <template v-slot:approval_button="{ row: audit_observation }">
              <button
                type="button"
                class="btn btn-sm btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#kt_modal_1"
                @click="fillItemData(audit_observation)"
              >
                Open
              </button>
            </template>

            <template v-slot:actions="{ row: audit_observation }">
              <!--begin::Menu Flex-->
              <div class="d-flex flex-lg-row">
                <span>
                  <i
                    @click="deleteItem(audit_observation.id, false)"
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
                <span class="paginate_button page-link">
                  Page - {{ page }}
                </span>
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
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { getIAuditObservation, getISORule } from "@/stores/api";

import { ApprovalStatus, GetApprovalStatus } from "@/core/model/global";
import { hideModal } from "@/core/helpers/dom";
import ApprovalModal from "./ApprovalModal.vue";

import * as Yup from "yup";
import { Identifier } from "@/core/config/WhichUserConfig";
import { useAuthStore } from "@/stores/auth";
import { useRoute, useRouter } from "vue-router";
import ApiService from "@/core/services/ApiService";
import moment from "moment";
import IAObservationAddModal from "./ObservationCustomComponent/IAObservationAddModal.vue";

import {
  getIAuditSchedule,
  getIAuditObservations,
  deleteIAuditObservation,
} from "@/stores/api";
import type { IClause } from "@/core/model/audit_observation";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import arraySort from "array-sort";

export default defineComponent({
  name: "auditobservation-add",
  components: {
    IAObservationAddModal,
    Datatable,
    ApprovalModal,
  },
  setup() {
    const identifier = Identifier;

    const auth = useAuthStore();
    const router = useRouter();
    const User = auth.GetUser();
    const selectedClause = ref(0);
    const route = useRoute();
    const itemId = route.params.id;

    const tableHeader = ref([
      {
        columnName: "Clause No.",
        columnLabel: "clause_number",
        sortEnabled: true,
        columnWidth: 75,
      },
      {
        columnName: "Description",
        columnLabel: "description",
        sortEnabled: true,
        columnWidth: 125,
      },
      {
        columnName: "Nc Observation",
        columnLabel: "nc_observation",
        sortEnabled: true,
        columnWidth: 125,
      },
      {
        columnName: "Compilance Type",
        columnLabel: "compilance_type",
        sortEnabled: true,
        columnWidth: 100,
      },
      {
        columnName: "Download Evidence",
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

    const selectedIds = ref<Array<number>>([]);
    const tableData = ref<Array<IClause>>([]);
    const initvalues = ref<Array<IClause>>([]);

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

        ApiService.setHeader();
        const response = await getIAuditObservations(
          `page=${page}&limit=${limit.value}&itemId=${itemId}`
        );

        more.value = response.result.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(({ id, ...rest }) => ({
          id,
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

        ApiService.setHeader();
        const response = await getIAuditObservations(
          `page=${page.value}&limit=${limit}&itemId=${itemId}`
        );

        more.value = response.result.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(({ id, ...rest }) => ({
          id,
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

    const NextPage = async () => {
      if (more.value != false) {
        page.value = page.value + 1;
        await PagePointer(page.value);
      }
    };

    const PrevPage = async () => {
      if (page.value > 1) {
        page.value = page.value - 1;
        await PagePointer(page.value);
      }
    };

    // get_compaines
    const observation_listing = async () => {
      try {
        ApiService.setHeader();
        const response = await getIAuditObservations(
          `page=${page.value}&limit=${limit.value}&itemId=${itemId}`
        );

        more.value = response.result.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(({ id, ...rest }) => ({
          id,
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

    const auditDetails = ref({
      id: "",
      auditor_name: "",
      address: "",
      meeting_place: "",
      auditees: [],
      audit_area: "",
      scope: "",
      approval_status: "",
      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
      is_active: "1",
    });

    const clauses = reactive([]);

    const clauseDetails = ref({
      audit_schedule_id: "",
      clause_number: "",
      description: "",
      nc_observation: "",
      compilance_type: "",
      evidence: "",
      approval_status: "1",
      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
      is_active: "1",
    });

    const ISO = ref({
      id: "",
      clauses: [],
      company_id: User.company_id,
      is_active: 1,
    });

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
      try {
        let response = await getIAuditSchedule(itemId.toString());
        console.log(response);
        auditDetails.value = {
          id: response.id,
          auditor_name: response.auditor_name,
          address: response.address,
          meeting_place: response.meeting_place,
          auditees: JSON.parse(response.auditees),
          audit_area: response.audit_area,
          scope: response.scope,
          approval_status: response.approval_status,

          company_id: response.company_id ? response.company_id : "",
          created_by: response.created_by,
          updated_by: response.updated_by,
          is_active: response.is_active,
        };
        clauseDetails.value.audit_schedule_id = response.id;
      } catch (error) {
        // Handle errors, e.g., show an error message
        console.error("Error fetching leads data:", error);
      }

      try {
        let response = await getISORule(User.company_id);
        console.log(response);
        ISO.value = {
          id: response.id,
          clauses: JSON.parse(response.clauses),
          company_id: response.company_id ? response.company_id : "",
          is_active: response.is_active,
        };

        Object.assign(clauses, ISO.value.clauses);
      } catch (error) {
        console.log(error);
        showErrorAlert("Error", "An error occurred during the API call.");
        loading.value = false;
      }

      try {
        await observation_listing();
        setTimeout(() => {
          loading.value = false;
        }, 250);
      } catch (error) {
        // Handle errors, e.g., show an error message
        console.error("Error fetching leads data:", error);
      }
    });

    // Function to handle tab click
    const selectClause = (index) => {
      console.log(index);
      selectedClause.value = index;
    };

    // Function to add NC
    const addNC = (clause) => {
      clauseDetails.value = {
        audit_schedule_id: clauseDetails.value.audit_schedule_id,
        clause_number: clause.clause_number,
        description: clause.description,
        nc_observation: "",
        compilance_type: "",
        evidence: "",
        approval_status: "1",
        company_id: User.company_id,
        created_by: User.id,
        updated_by: User.id,
        is_active: "1",
      };
      console.log("Clause Details are:", clauseDetails.value);
    };

    // Table Data
    const deleteItem = async (id: number, mul: boolean) => {
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
                deleteIAuditObservation(id);
                tableData.value.splice(i, 1);
                observation_listing();
              }
            });
          }
        }
      } else {
        for (let i = 0; i < tableData.value.length; i++) {
          if (tableData.value[i].id === id) {
            // Put your function here
            deleteIAuditObservation(id);
            tableData.value.splice(i, 1);
          }
        }
      }
    };

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
          observation_listing();
        }
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

    const showSuccessAlert = (title, message) => {
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

    async function reLoadData() {
      await observation_listing();
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
      clauses,
      selectedClause,
      selectClause,
      addNC,
      auditDetails,
      clauseDetails,
      loading,
      reLoadData,
      tableData,
      tableHeader,
      deleteItem,
      selectedIds,
      deleteFewItem,
      sort,
      onItemSelect,
      NextPage,
      PrevPage,
      page,
      limit,
      PageLimitPoiner,
      Limits,
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

<style>
.tab-item {
  cursor: pointer;
}

.tab-item:hover {
  background-color: blue;
  color: #fff;
  cursor: pointer;
}

.active-tab {
  background-color: blue;
  color: #fff;
}
</style>

