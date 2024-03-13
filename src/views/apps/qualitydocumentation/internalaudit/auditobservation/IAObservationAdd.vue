<template>
  <div style="width: 99%" class="bg-body p-12 rounded">
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Form-->
        <VForm
          id="kt_account_profile_details_form"
          class="form"
          novalidate
          :validation-schema="auditValidator"
        >
          <!--begin::Card body-->
          <div class="card-body p-6">
            <div class="row mb-6">
              <div class="fv-row container-fluid">
                <div class="alert alert-success">
                  <span class="fs-5 fw-bold text-gray-700">
                    Internal audit at
                    <span class="text-primary">{{
                      User?.company_details?.company_name ?? ""
                    }}</span>
                    as per ISO/IEC 17025 : 2017
                  </span>
                </div>
              </div>
            </div>

            <div class="row mb-6">
              <!--begin::Col-->
              <div class="col-md-12 fv-row">
                <!--begin::Label-->
                <label
                  class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Auditor Name</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <Field
                  type="text"
                  v-model="auditObservationDetails.auditor_name"
                  disabled
                  name="auditor_name"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter Auditor name"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="auditor_name" />
                  </div>
                </div>
                <!--end::Input-->
              </div>
              <!--end::Col-->
            </div>

            <div class="row mb-6">
              <!--begin::Col-->
              <div class="col-md-12 fv-row">
                <!--begin::Label-->
                <label
                  class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Clause Name</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <Field
                  type="text"
                  v-model="auditObservationDetails.clause_name"
                  name="clause_name"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter Clause name"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="clause_name" />
                  </div>
                </div>
                <!--end::Input-->
              </div>
              <!--end::Col-->
            </div>

            <!--begin::Accordion-->
            <div class="accordion" id="kt_accordion_1">
              <div class="accordion-item">
                <h2 class="accordion-header" :id="'kt_accordion_1_header_'">
                  <button
                    class="accordion-button fs-4 fw-semibold"
                    type="button"
                    :data-bs-toggle="'collapse'"
                    :data-bs-target="'#kt_accordion_1_body_'"
                    :aria-controls="'kt_accordion_1_body_'"
                  >
                    Rules / Clauses
                    <span
                      class="badge m-3 py-3 px-4 fs-7 badge-light-primary rounded animate__animated animate__pulse animate__infinite"
                      >{{
                        auditObservationDetails.clauses.length
                          ? auditObservationDetails.clauses.length
                          : "0"
                      }}
                      Clauses</span
                    >
                  </button>
                </h2>
                <div
                  :id="'kt_accordion_1_body_'"
                  class="accordion-collapse collapse"
                  :aria-labelledby="'kt_accordion_1_header_'"
                  data-bs-parent="#kt_accordion_1"
                >
                  <div class="accordion-body">
                    <div>
                      <!-- Add content for nested accordion here -->
                      <div class="table-responsive">
                        <table
                          class="table table-rounded table-striped border gy-7 gs-7 text-nowrap"
                        >
                          <thead>
                            <tr
                              class="fw-semibold fs-6 text-gray-800 border-bottom border-gray-200 text-align-center"
                            >
                              <th class="col-2">Clause No.</th>
                              <th class="col-4">Clause Details</th>
                              <th class="col-4">NC Observations</th>
                              <th class="col-2">Download Evidence</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(
                                item, index
                              ) in auditObservationDetails.clauses"
                              :key="index"
                            >
                              <td class="align-middle">
                                <span
                                  class="badge py-3 px-4 fs-7 badge-light-primary"
                                  >{{ `${item.clause_no}` }}</span
                                >
                              </td>
                              <td class="align-middle">
                                <span
                                  class="badge py-3 px-4 fs-7 badge-light-primary"
                                  >{{ `${item.clause_details}` }}</span
                                >
                              </td>
                              <td class="align-middle">
                                <span
                                  class="badge py-3 px-4 fs-7 badge-light-primary"
                                  >{{ `${item.nc_observation}` }}</span
                                >
                              </td>
                              <td class="align-middle">
                                <span
                                  class="badge py-3 px-4 fs-7 badge-light-primary"
                                  >asdasd</span
                                >
                              </td>
                              <td>
                                <div
                                  class="btn-group"
                                  role="group"
                                  aria-label="View and Delete Buttons"
                                >
                                  <span
                                    class="btn btn-primary btn-sm"
                                    data-bs-toggle="modal"
                                    :data-bs-target="
                                      '#kt_modal_new_address_' + index
                                    "
                                  >
                                    <i class="bi bi-eye"></i>
                              </span>

                                  <IAObservationEditModal
                                    :key="index"
                                    :clauseId="index"
                                    :clauseData="item"
                                    @editData="editClauseData"
                                  ></IAObservationEditModal>

                                  <span
                                    class="btn btn-danger btn-sm"
                                    @click="deleteClauseData(index)"
                                  >
                                    <i class="bi bi-trash"></i>
                            </span>
                                </div>
                              </td>
                            </tr>
                            <tr
                              class="text-center"
                              v-if="
                                auditObservationDetails.clauses.length === 0
                              "
                            >
                              <td
                                colspan="5"
                                class="fw-semibold fs-6 text-gray-800 border-bottom border-gray-200 text-align-center"
                              >
                                No Clause.
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div class="text-start mt-8">
                      <span
                        data-toggle="tooltip"
                        title="Add clause"
                        class="btn btn-primary btn-md rounded-circle fs-3"
                        data-bs-toggle="modal"
                        :data-bs-target="'#kt_modal_new_address'"
                      >
                        +
                    </span>
                    </div>

                    <IAObservationAddModal
                      @addData="addClauseData"
                    ></IAObservationAddModal>
                  </div>
                </div>
              </div>
            </div>
            <!--end::Accordion-->
          </div>
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <button
              @click="clear"
              class="btn btn-lg btn-danger w-sd-25 w-lg-25"
            >
              Discard
            </button>
            <!--end::Button-->
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <!--begin::Button-->
            <span
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-lg btn-primary w-sd-25 w-lg-25"
              @click="submit()"
            >
              <span v-if="!loading" class="indicator-label"> Submit </span>
              <span v-if="loading" class="indicator-progress">
                Please wait...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </span>
            <!--end::Button-->
          </div>
          <!--end::Input group-->
        </VForm>
        <!--end::Form-->
      </div>
    </div>
  </div>
</template>
    
    <script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { addIAuditObservation, getCompanies } from "@/stores/api";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import { Identifier } from "@/core/config/WhichUserConfig";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import ApiService from "@/core/services/ApiService";
import moment from "moment";
import IAObservationAddModal from "./ObservationCustomComponent/IAObservationAddModal.vue";
import IAObservationEditModal from "./ObservationCustomComponent/IAObservationEditModal.vue";

interface ClauseDetail {
  clause_no: string;
  clause_details: string;
  nc_observation: string;
  compilance_type: string;
  evidence: string;
}

interface IAO {
  auditor_name: string;
  clause_name: string;
  clauses: Array<ClauseDetail>;
  company_id: string;
  created_by: number;
  updated_by: number;
  is_active: number;
}

export default defineComponent({
  name: "auditobservation-add",
  components: {
    ErrorMessage,
    Field,
    VForm,
    IAObservationAddModal,
    IAObservationEditModal,
  },
  setup() {
    const identifier = Identifier;
    const loading = ref(false);
    const auth = useAuthStore();
    const router = useRouter();
    const User = auth.GetUser();
    const Companies = ref([{ id: "", company_name: "" }]);

    const auditValidator = Yup.object().shape({
      auditor_name: Yup.string().required().label("Auditor Name"),
      clause_name: Yup.string().required().label("Clause Name"),
    });

    const getdropcomp = async () => {
      ApiService.setHeader();
      const response = await getCompanies(`fetchAll=true`);
      if (response.result != null && response.result) {
        Companies.value.push(
          ...response.result?.map(({ created_at, ...rest }) => ({
            ...rest,
            created_at: moment(created_at).format("MMMM Do YYYY"),
          }))
        );
        console.log(Companies);
      }
    };

    const auditObservationDetails = ref<IAO>({
      auditor_name: `${User.first_name} ${User.last_name}`,
      clause_name: "",
      clauses: [],

      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
      is_active: 1,
    });

    onMounted(async () => {
      Companies.value.pop();
      if (User.role_id === 1) {
        await getdropcomp();
      }
    });

    async function addClauseData(data) {
      await auditObservationDetails.value.clauses.push(data);
    }

    async function editClauseData(index, data) {
        auditObservationDetails.value.clauses.push[index] = await data;
    }

    function areAllPropertiesNull(array) {
      return array.some((detail) => {
        const { auditor_name, clause_name, clauses } = detail;

        // Check if any property is null or empty

        return (
          auditor_name === "" || clause_name === "" || clauses.length === 0
        );
      });
    }

    function isClauseDataNull(array) {
      return array.some((detail) => {
        const {
          clause_no,
          clause_details,
          nc_observation,
          compilance_type,
          evidence,
        } = detail;

        // Check if any property is null or empty

        return (
          clause_no === "" ||
          clause_details === "" ||
          nc_observation === "" ||
          compilance_type === "" ||
          evidence === ""
        );
      });
    }

    const removeObjectWithId = (arr, id) => {
      if (id !== -1) {
        arr.splice(id, 1);
      }

      return arr;
    };

    async function deleteClauseData(index) {
      //zero represent the testID
      auditObservationDetails.value.clauses = await removeObjectWithId(
        auditObservationDetails.value.clauses,
        index
      );
    }

    const submit = async () => {
      loading.value = true;

      const result = areAllPropertiesNull([auditObservationDetails.value]);

      if (result) {
        showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
        loading.value = false;
        return;
      }

      if (auditObservationDetails.value.clauses.length === 0) {
        showErrorAlert(
          "Warning",
          "At least one clause is required, please fill the clause details."
        );
        loading.value = false;
        return;
      }

      const clause = isClauseDataNull([auditObservationDetails.value.clauses]);

      if (clause) {
        showErrorAlert(
          "Warning",
          "Please Fill the required details for Clauses "
        );
        loading.value = false;
        return;
      }

      //   console.warn("Nice");
      try {
        // Call your API here with the form values
        const response = await addIAuditObservation(auditObservationDetails.value);
        // console.log(response.error);
        if (!response.error) {
          // Handle successful API response
          //   console.log("API response:", response);
          showSuccessAlert(
            "Success",
            "Internal Audit Observation has been successfully inserted!"
          );

          clear();
          router.push({ name: "auditobservations-list" });
        } else {
          // Handle API error response
          //   console.log("API error:", errorData);
          // console.log("API error:", errorData.response.data.errors);
          showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
        }
      } catch (error) {
        // Handle any other errors during API call
        // console.error("API call error:", error);
        showErrorAlert("Error", "An error occurred during the API call.");
      } finally {
        loading.value = false;
      }
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

    const clear = () => {
      auditObservationDetails.value = {
        auditor_name: "",
        clause_name: "",
        clauses: [],
        company_id: User.company_id,
        created_by: User.id,
        updated_by: User.id,
        is_active: 1,
      };
    };
    return {
      auditObservationDetails,
      auditValidator,
      getAssetPath,
      submit,
      loading,
      identifier,
      Companies,
      //   handleFileChange,
      addClauseData,
      editClauseData,
      deleteClauseData,
      User,
      clear,
    };
  },
});
</script>
  
  <style>
.el-input__inner,
.el-select__inner {
  font-weight: 500;
}
.el-input__wrapper,
.el-select__wrapper {
  min-height: 3.5rem;
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

.trainer-container {
  display: flex;
  align-items: center;
  margin-right: 10px; /* Adjust as needed */
  background-color: #000; /* Optional background color for each trainer container */
  padding: 5px 10px; /* Optional padding */
  border-radius: 5px; /* Optional border radius */
}
.tagify-remove {
  margin-left: 5px; /* Optional margin between the name and the 'X' button */
}
.override-styles {
  z-index: 99999 !important;
  pointer-events: initial;
}
</style>