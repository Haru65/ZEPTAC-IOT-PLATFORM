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
          :validation-schema="improvementValidator"
        >
          <!--begin::Card body-->
          <div class="card-body border-top p-sd-2 p-lg-9">
            <div class="row mb-6">
                <!--begin::Col-->
                <div class="col-md-12 fv-row">
                  <!--begin::Label-->
                  <label
                    class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                    >Areas To Be Improved</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Field
                    type="text"
                    as="textarea"
                    rows="5"
                    v-model="improvementDetails.areas_to_improve"
                    name="areas_to_improve"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Specify areas to be improved..."
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="areas_to_improve" />
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
                    >Action To Be Taken</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Field
                    type="text"
                    as="textarea"
                    rows="5"
                    v-model="improvementDetails.action_taken"
                    name="action_taken"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Specify action to be taken..."
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="action_taken" />
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
                    >TimeFrame</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Field
                    type="text"
                    v-model="improvementDetails.timeframe"
                    name="timeframe"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Timeframe for improvement..."
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="timeframe" />
                    </div>
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Col-->
              </div>

              <!--begin::Input group-->
              <div class="row mb-6">
                <!--begin::Col-->
                <div class="col-md-12 fv-row">
                  <!--begin::Label-->
                  <label
                    class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                    >Resources Required</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Field
                    type="text"
                    as="textarea"
                    rows="5"
                    v-model="improvementDetails.resources_required"
                    name="resources_required"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Specify resources required..."
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="resources_required" />
                    </div>
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Col-->
              </div>
              <!--end::Input group-->
              <!--begin::Input group-->
              <div class="row mb-6">
                <!--begin::Col-->
                <div class="col-md-12 fv-row">
                  <!--begin::Label-->
                  <label
                    class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                    >Evidence of Improvement Indicator Control</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Field
                    type="text"
                    as="textarea"
                    rows="5"
                    v-model="improvementDetails.evidence_indicator"
                    name="evidence_indicator"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Specify Evidence of Improvement Indicator Control..."
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="evidence_indicator" />
                    </div>
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Col-->
              </div>
              <!--end::Input group-->
              <!--begin::Input group-->
              <div class="row mb-6">
                <!--begin::Col-->
                <div class="col-md-12 fv-row">
                  <!--begin::Label-->
                  <label
                    class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                    >Responsible Person</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Field
                    type="text"
                    v-model="improvementDetails.responsible_person"
                    name="responsible_person"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Enter responsible person name..."
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="responsible_person" />
                    </div>
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Col-->
              </div>
              <!--end::Input group-->
              
              <div class="row mb-6">
                <div class="form-group col-md-6 mb-8 mb-sd-8">
                  <label
                    class="btn btn-outline btn-outline-dashed btn-outline-default p-5 d-flex align-items-center"
                  >
                    <!--begin::Info-->
                    <span class="d-block fw-semobold text-start">
                      <span class="text-dark fw-bold d-block fs-4 mb-2"
                        >Progress Achieved</span
                      >
                      <input
                        type="radio"
                        class="btn-check"
                        name="progress_achieved"
                        id="yes"
                        value="yes"
                        v-model="improvementDetails.progress_achieved"
                        autocomplete="off"
                      />
                      <label class="btn btn-outline-primary" for="yes"
                        >Yes</label
                      >
                      <input
                        type="radio"
                        class="btn-check"
                        name="progress_achieved"
                        id="no"
                        v-model="improvementDetails.progress_achieved"
                        value="no"
                        autocomplete="off"
                      />
                      <label class="btn btn-outline-primary" for="no">No</label>
                    </span>
                    <!--end::Info-->
                  </label>
                </div>
              </div>
          </div>

          <div class="modal-footer flex-center w-100">
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
import { getImprovementAction, updateImprovementAction } from "@/stores/api";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import { Identifier } from "@/core/config/WhichUserConfig";
import { useAuthStore } from "@/stores/auth";
import { useRouter, useRoute } from "vue-router";
import ApiService from "@/core/services/ApiService";
import moment from "moment";

interface IMPROVEMENT_PLAN {
  areas_to_improve: string;
  action_taken: string;
  timeframe: string;
  resources_required: string;
  evidence_indicator: string;
  responsible_person: string;
  progress_achieved: string;
  company_id: string;
  created_by: string;
  updated_by: string;
  is_active: string;
}

export default defineComponent({
  name: "improvement-edit",
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

    const improvementDetails = ref<IMPROVEMENT_PLAN>({
      areas_to_improve: "",
      action_taken: "",
      timeframe: "",
      resources_required: "",
      evidence_indicator: "",
      responsible_person: "",
      progress_achieved: "yes",
      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
      is_active: "1",
    });

    const improvementValidator = Yup.object().shape({
      areas_to_improve: Yup.string().required().label("Areas to improve"),
      action_taken: Yup.string().required().label("Action to be taken"),
      timeframe: Yup.string().required().label("TimeFrame for improvement"),
      resources_required: Yup.string().required().label("Resources"),
      evidence_indicator: Yup.string().required().label("Evidence Indicator"),
      responsible_person: Yup.string().required().label("Responsible Person Name"),
    });

    onMounted(async () => {
      let response = await getImprovementAction(itemId.toString());
      console.log(response);
      improvementDetails.value = {
        areas_to_improve: response.areas_to_improve,
        action_taken: response.action_taken,
        timeframe: response.timeframe,
        resources_required: response.resources_required,
        evidence_indicator: response.evidence_indicator,
        responsible_person: response.responsible_person,
        progress_achieved: response.progress_achieved,
        company_id: response.company_id ? response.company_id : "",
        created_by: response.created_by,
        updated_by: response.updated_by,
        is_active: response.is_active,
      };
    });

    function areAllPropertiesNull(array) {
      return array.some((detail) => {
        const {
          areas_to_improve,
          action_taken,
          timeframe,
          resources_required,
          evidence_indicator,
          responsible_person,
          progress_achieved,
        } = detail;

        // Check if any property is null or empty

        return (
          areas_to_improve === "" ||
          action_taken === "" ||
          timeframe === "" ||
          resources_required === "" ||
          evidence_indicator === "" ||
          responsible_person === "" ||
          progress_achieved === ""
        );
      });
    }

    const submit = async () => {
      try {
        loading.value = true;
        console.log(improvementDetails.value);

        const result = areAllPropertiesNull([improvementDetails.value]);

        if (!result) {
          const response = await updateImprovementAction(itemId, improvementDetails.value);
          // console.log(response.error);
          if (!response.error) {
            // Handle successful API response
            //   console.log("API response:", response);
            showSuccessAlert("Success", "Risk Regsiter has been successfully Updated!");

            router.push({ name: "improvements-list" });
            loading.value = false;
          } else {
            // Handle API error response
            //   console.log("API error:", errorData);
            // console.log("API error:", errorData.response.data.errors);
            showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
            loading.value = false;
          }
        } else {
          showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
          loading.value = false;
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
    return {
      improvementDetails,
      improvementValidator,
      getAssetPath,
      submit,
      loading,
    };
  },
});
</script>
  