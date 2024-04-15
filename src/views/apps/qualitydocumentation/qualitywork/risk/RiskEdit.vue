<template>
  <VForm id="kt_account_profile_details_form" class="form">
    <!--begin::Basic info-->
    <div class="card mb-5 mb-xl-10 p-6 pb-12">
      <!--begin::Card header-->
      <div
        class="card-header border-0 cursor-pointer"
        role="button"
        data-bs-toggle="collapse"
        data-bs-target="#kt_risk_identification"
        aria-expanded="true"
        aria-controls="kt_risk_identification"
      >
        <!--begin::Card title-->
        <div class="card-title m-0">
          <h3 class="fw-bold m-0">Risk Identification</h3>
        </div>
        <!--end::Card title-->
      </div>
      <!--begin::Card header-->

      <!--begin::Content-->
      <div id="kt_risk_identification" class="collapse show">
        <!--begin::Form-->
        <!--begin::Card body-->
        <div class="card-body p-9">
          <div class="row mb-6">
            <!--begin::Col-->
            <div class="col-md-12 fv-row">
              <!--begin::Label-->
              <label
                class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                >Description</label
              >
              <!--end::Label-->

              <!--begin::Input-->
              <Field
                type="text"
                as="textarea"
                rows="5"
                name="description"
                v-model="itemDetails.risk_identification.description"
                class="form-control form-control-lg form-control-solid"
                placeholder="Enter description of the risk..."
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="description" />
                </div>
              </div>
              <!--end::Input-->
            </div>
            <!--end::Col-->
          </div>

          <div class="row mb-6">
            <!--begin::Col-->
            <div class="col-md-6 fv-row">
              <!--begin::Label-->
              <label
                class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                >Cause</label
              >
              <!--end::Label-->

              <!--begin::Input-->
              <Field
                type="text"
                as="textarea"
                rows="5"
                name="cause"
                v-model="itemDetails.risk_identification.cause"
                class="form-control form-control-lg form-control-solid"
                placeholder="Enter the cause..."
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="cause" />
                </div>
              </div>
              <!--end::Input-->
            </div>
            <!--end::Col-->
            <!--begin::Col-->
            <div class="col-md-6 fv-row">
              <!--begin::Label-->
              <label
                class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                >Effect</label
              >
              <!--end::Label-->

              <!--begin::Input-->
              <Field
                type="text"
                as="textarea"
                rows="5"
                name="effect"
                v-model="itemDetails.risk_identification.effect"
                class="form-control form-control-lg form-control-solid"
                placeholder="Enter the effect..."
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="effect" />
                </div>
              </div>
              <!--end::Input-->
            </div>
            <!--end::Col-->
          </div>
        </div>
        <!--begin::Card footer-->
        <div class="card-footer d-flex justify-content-end py-6 px-9">
          <button
            type="button"
            @click="submitRiskIdentification"
            :data-kt-indicator="loading ? 'on' : ''"
            class="btn btn-primary px-6"
          >
            <span v-if="!loading" class="indicator-label">Save</span>
            <span v-if="loading" class="indicator-progress">
              Please wait...
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span>
            </span>
          </button>
        </div>
        <!--end::Card footer-->
        <!--end::Input group-->
        <!--end::Form-->
      </div>
      <!--end::Content-->
    </div>

    <!--begin::Basic info-->
    <div class="card mb-5 mb-xl-10 p-6 pb-12">
      <!--begin::Card header-->
      <div
        class="card-header border-0 cursor-pointer"
        role="button"
        data-bs-toggle="collapse"
        data-bs-target="#kt_risk_evaluation"
        aria-expanded="true"
        aria-controls="kt_risk_evaluation"
      >
        <!--begin::Card title-->
        <div class="card-title m-0">
          <h3 class="fw-bold m-0">Risk Analysis & Evaluation</h3>
        </div>
        <!--end::Card title-->
      </div>
      <!--begin::Card header-->

      <!--begin::Content-->
      <div id="kt_risk_evaluation" class="collapse show">
        <!--begin::Form-->
        <!--begin::Card body-->
        <div class="card-body p-9">
          <div class="row mb-6">
            <!--begin::Col-->
            <div class="col-md-6 fv-row">
              <!--begin::Label-->
              <label
                class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                >Probability</label
              >
              <!--end::Label-->

              <!--begin::Input-->
              <Field
                type="text"
                name="e_probability"
                v-model="itemDetails.risk_evaluation.probability"
                class="form-control form-control-lg form-control-solid"
                placeholder="Enter probability..."
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="e_probability" />
                </div>
              </div>
              <!--end::Input-->
            </div>
            <!--end::Col-->
            <!--begin::Col-->
            <div class="col-md-6 fv-row">
              <!--begin::Label-->
              <label
                class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                >Severity</label
              >
              <!--end::Label-->

              <!--begin::Input-->
              <Field
                type="text"
                name="e_severity"
                v-model="itemDetails.risk_evaluation.severity"
                class="form-control form-control-lg form-control-solid"
                placeholder="Enter severity..."
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="e_severity" />
                </div>
              </div>
              <!--end::Input-->
            </div>
            <!--end::Col-->
          </div>

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Col-->
            <div class="col-md-6 fv-row mb-8 mb-sd-8">
              <!--begin::Label-->
              <label class="required fs-5 fw-bold text-gray-700 mb-2"
                >Risk Mode</label
              >
              <!--end::Label-->

              <!--begin::Input-->
              <div>
                <el-select
                  v-model="itemDetails.risk_evaluation.risk_mode"
                  filterable
                  placeholder="--Select--"
                >
                  <el-option label="Low" value="Low" />
                  <el-option label="Medium" value="Medium" />
                  <el-option label="High" value="High" />
                </el-select>
              </div>
              <!--end::Col-->
              <div
                class="fv-plugins-message-container mt-3"
                v-if="!itemDetails.risk_evaluation.risk_mode"
              >
                <div class="fv-help-block">
                  <ErrorMessage name="e_risk_mode" />
                </div>
              </div>
              <!--end::Input-->
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->
        </div>
        <!--begin::Card footer-->
        <div class="card-footer d-flex justify-content-end py-6 px-9">
          <button
            type="button"
            @click="submitRiskEvaluation"
            :data-kt-indicator="loading ? 'on' : ''"
            class="btn btn-primary px-6"
          >
            <span v-if="!loading" class="indicator-label"> Save</span>
            <span v-if="loading" class="indicator-progress">
              Please wait...
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span>
            </span>
          </button>
        </div>
        <!--end::Card footer-->
        <!--end::Input group-->
        <!--end::Form-->
      </div>
      <!--end::Content-->
    </div>

    <!--begin::Basic info-->
    <div class="card mb-5 mb-xl-10 p-6 pb-12">
      <!--begin::Card header-->
      <div
        class="card-header border-0 cursor-pointer"
        role="button"
        data-bs-toggle="collapse"
        data-bs-target="#kt_risk_counter"
        aria-expanded="true"
        aria-controls="kt_risk_counter"
      >
        <!--begin::Card title-->
        <div class="card-title m-0">
          <h3 class="fw-bold m-0">Controls Identified to Counter Risk</h3>
        </div>
        <!--end::Card title-->
      </div>
      <!--begin::Card header-->

      <!--begin::Content-->
      <div id="kt_risk_counter" class="collapse show">
        <!--begin::Form-->
        <!--begin::Card body-->
        <div class="card-body p-9">
          <div class="row mb-6">
            <!--begin::Col-->
            <div class="col-md-12 fv-row">
              <!--begin::Label-->
              <label
                class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                >Controls</label
              >
              <!--end::Label-->

              <!--begin::Input-->
              <Field
                type="text"
                as="textarea"
                rows="5"
                name="c_controls"
                v-model="itemDetails.risk_counter.controls"
                class="form-control form-control-lg form-control-solid"
                placeholder="Enter controls identified..."
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="c_controls" />
                </div>
              </div>
              <!--end::Input-->
            </div>
            <!--end::Col-->
          </div>

          <div class="row mb-6">
            <!--begin::Col-->
            <div class="col-md-6 fv-row">
              <!--begin::Label-->
              <label
                class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                >Probability</label
              >
              <!--end::Label-->

              <!--begin::Input-->
              <Field
                type="text"
                name="c_probability"
                v-model="itemDetails.risk_counter.probability"
                class="form-control form-control-lg form-control-solid"
                placeholder="Enter probability..."
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="c_probability" />
                </div>
              </div>
              <!--end::Input-->
            </div>
            <!--end::Col-->
            <!--begin::Col-->
            <div class="col-md-6 fv-row">
              <!--begin::Label-->
              <label
                class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                >Severity</label
              >
              <!--end::Label-->

              <!--begin::Input-->
              <Field
                type="text"
                name="c_severity"
                v-model="itemDetails.risk_counter.severity"
                class="form-control form-control-lg form-control-solid"
                placeholder="Enter severity..."
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="c_severity" />
                </div>
              </div>
              <!--end::Input-->
            </div>
            <!--end::Col-->
          </div>

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Col-->
            <div class="col-md-6 fv-row mb-8 mb-sd-8">
              <!--begin::Label-->
              <label class="required fs-5 fw-bold text-gray-700 mb-2"
                >Risk Mode</label
              >
              <!--end::Label-->

              <!--begin::Input-->
              <div>
                <el-select
                  v-model="itemDetails.risk_counter.risk_mode"
                  filterable
                  placeholder="--Select--"
                >
                  <el-option label="Low" value="Low" />
                  <el-option label="Medium" value="Medium" />
                  <el-option label="High" value="High" />
                </el-select>
              </div>
              <!--end::Col-->
              <div
                class="fv-plugins-message-container mt-3"
                v-if="!itemDetails.risk_counter.risk_mode"
              >
                <div class="fv-help-block">
                  <ErrorMessage name="c_risk_mode" />
                </div>
              </div>
              <!--end::Input-->
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->
        </div>
        <!--begin::Card footer-->
        <div class="card-footer d-flex justify-content-end py-6 px-9">
          <button
            type="button"
            @click="submitRiskCounter"
            :data-kt-indicator="loading ? 'on' : ''"
            class="btn btn-primary px-6"
          >
            <span v-if="!loading" class="indicator-label"> Save</span>
            <span v-if="loading" class="indicator-progress">
              Please wait...
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span>
            </span>
          </button>
        </div>
        <!--end::Card footer-->
        <!--end::Input group-->
        <!--end::Form-->
      </div>
      <!--end::Content-->
    </div>
  </VForm>
</template>
    
    <script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, reactive, ref } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import {
  addUpdateRiskCounter,
  addUpdateRiskEvaluation,
  addUpdateRiskIdenfication,
  getRiskRegister,
  updateRiskRegister,
} from "@/stores/api";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import { Identifier } from "@/core/config/WhichUserConfig";
import { useAuthStore } from "@/stores/auth";
import { useRouter, useRoute } from "vue-router";
import ApiService from "@/core/services/ApiService";
import moment from "moment";
import { EntityList } from "@/core/model/risk";

export default defineComponent({
  name: "risk-edit",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  setup() {
    const loading = ref(false);
    const auth = useAuthStore();
    const router = useRouter();
    const route = useRoute();
    const User = auth.GetUser();
    const itemId = route.params.id;

    const itemDetails = ref({
      id: "",
      clause_no: "",
      risk_identification: reactive({
        description: "",
        cause: "",
        effect: "",
      }),
      risk_evaluation: reactive({
        probability: "",
        severity: "",
        risk_mode: "",
      }),
      risk_counter: reactive({
        controls: "",
        probability: "",
        severity: "",
        risk_mode: "",
      }),
      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
      is_active: "1",
    });

    onMounted(async () => {
      let response = await getRiskRegister(itemId.toString());
      console.log(response);
      itemDetails.value = {
        id: response.id,
        clause_no: response.clause_no,
        risk_identification: JSON.parse(response.risk_identification),
        risk_evaluation: JSON.parse(response.risk_evaluation),
        risk_counter: JSON.parse(response.risk_counter),
        company_id: response.company_id ? response.company_id : "",
        created_by: response.created_by,
        updated_by: response.updated_by,
        is_active: response.is_active,
      };
    });

    const validateForm = (formData) => {
      for (const key in formData) {
        let value = formData[key];
        if (Array.isArray(value)) {
          for (const item of value) {
            if (!validateForm(item)) {
              return false;
            }
          }
        } else if (typeof value === "object" && value !== null) {
          if (!validateForm(value)) {
            return false;
          }
        } else if (typeof value === "string") {
          // Trim the string before validation
          value = value.trim();
          if (value === "") {
            return false;
          }
        }
      }
      return true;
    };

    const submitRiskIdentification = async () => {
      loading.value = true;

      if (itemDetails.value.clause_no === "") {
        showErrorAlert("Warning", "Please fill in all fields.");
        loading.value = false;
        return;
      }

      try {
        if (validateForm(itemDetails.value.risk_identification)) {
          const response = await addUpdateRiskIdenfication(
            itemId,
            itemDetails.value
          );
          if (!response.error) {
            showSuccessAlert(
              "Success",
              "Risk Register has been successfully updated!"
            );
            loading.value = false;
            router.push({ name: "risk-list" });
          } else {
            showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
            loading.value = false;
            return;
          }
        } else {
          showErrorAlert("Warning", "Please fill in all fields.");
        }
      } catch (error) {
        showErrorAlert("Error", "An error occurred during the API call.");
        loading.value = false;
      } finally {
        loading.value = false;
      }
    };

    const submitRiskEvaluation = async () => {
      loading.value = true;

      if (itemDetails.value.clause_no === "") {
        showErrorAlert("Warning", "Please fill in all fields.");
        loading.value = false;
        return;
      }

      try {
        if (validateForm(itemDetails.value.risk_evaluation)) {
          const response = await addUpdateRiskEvaluation(
            itemId,
            itemDetails.value
          );
          if (!response.error) {
            showSuccessAlert(
              "Success",
              "Risk Register has been successfully updated!"
            );
            loading.value = false;
            router.push({ name: "risk-list" });
          } else {
            showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
            loading.value = false;
            return;
          }
        } else {
          showErrorAlert("Warning", "Please fill in all fields.");
        }
      } catch (error) {
        showErrorAlert("Error", "An error occurred during the API call.");
        loading.value = false;
      } finally {
        loading.value = false;
      }
    };

    const submitRiskCounter = async () => {
      loading.value = true;

      if (itemDetails.value.clause_no === "") {
        showErrorAlert("Warning", "Please fill in all fields.");
        loading.value = false;
        return;
      }

      try {
        if (validateForm(itemDetails.value.risk_counter)) {
          const response = await addUpdateRiskCounter(
            itemId,
            itemDetails.value
          );
          if (!response.error) {
            showSuccessAlert(
              "Success",
              "Risk Register has been successfully updated!"
            );
            loading.value = false;
            router.push({ name: "risk-list" });
          } else {
            showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
            loading.value = false;
            return;
          }
        } else {
          showErrorAlert("Warning", "Please fill in all fields.");
        }
      } catch (error) {
        showErrorAlert("Error", "An error occurred during the API call.");
        loading.value = false;
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
    return {
      itemDetails,
      getAssetPath,
      submitRiskIdentification,
      submitRiskEvaluation,
      submitRiskCounter,
      loading,
      EntityList,
    };
  },
});
</script>
  