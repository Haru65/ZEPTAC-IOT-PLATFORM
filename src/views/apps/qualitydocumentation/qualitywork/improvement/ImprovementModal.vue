<template>
  <!--begin::Modal - New Address-->
  <div
    class="modal fade"
    ref="newAddressModalRef"
    id="kt_modal_ncr"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-1000px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Form-->
        <VForm
          class="form"
          id="kt_modal_new_address_form"
          :validation-schema="improvementValidator"
          @submit="submit"
        >
          <!--begin::Modal header-->
          <div class="modal-header" id="kt_modal_new_address_header">
            <!--begin::Modal title-->
            <h2>Add Improvement Action</h2>
            <!--end::Modal title-->

            <!--begin::Close-->
            <div
              class="btn btn-sm btn-icon btn-active-color-primary"
              data-bs-dismiss="modal"
            >
              <KTIcon icon-name="cross" icon-class="fs-1" />
            </div>
            <!--end::Close-->
          </div>
          <!--end::Modal header-->

          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-10">
            <!--begin::Scroll-->
            <div
              class="scroll-y me-n7 pe-7"
              id="kt_modal_new_address_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              style="max-height: 100% !important"
              data-kt-scroll-dependencies="#kt_modal_new_address_scroll"
              data-kt-scroll-wrappers="#kt_modal_new_address_scroll"
              data-kt-scroll-offset="auto"
            >
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
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->

          <!--begin::Modal footer-->
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <span
              @click="clear"
              id="kt_modal_new_address_cancel"
              class="btn btn-light me-3"
            >
              Discard
            </span>
            <!--end::Button-->

            <!--begin::Button-->
            <button
              :data-kt-indicator="loading2 ? 'on' : null"
              ref="submitButtonRef"
              id="kt_modal_new_address_submit"
              class="btn btn-primary"
            >
              <span v-if="!loading2" class="indicator-label"> Submit </span>
              <span v-if="loading2" class="indicator-progress">
                Please wait...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </button>
            <!--end::Button-->
          </div>
          <!--end::Modal footer-->
        </VForm>
        <!--end::Form-->
      </div>
    </div>
  </div>
  <!--end::Modal - New Address-->
</template>
  
  <script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { hideModal } from "@/core/helpers/dom";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";
import moment from "moment";
import { addImprovementAction } from "@/stores/api";

interface NewAddressData {}

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
  name: "new-address-modal",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  emits: ["improvement-added"],
  setup(props, { emit }) {
    const loading = ref(false);
    const loading2 = ref(false);
    const auth = useAuthStore();
    const router = useRouter();
    const User = auth.GetUser();

    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const newAddressModalRef = ref<null | HTMLElement>(null);
    const newAddressData = ref<NewAddressData>({});

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
      responsible_person: Yup.string()
        .required()
        .label("Responsible Person Name"),
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

    const clear = () => {
      improvementDetails.value = {
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
      };
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

    const submit = async (e) => {
      console.log(improvementDetails.value);
      loading2.value = true;

      const result = areAllPropertiesNull([improvementDetails.value]);
      if (!result) {
        try {
          // Call your API here with the form values
          const response = await addImprovementAction(improvementDetails.value);
          // console.log(response.error);
          if (!response.error) {
            // Handle successful API response
            //   console.log("API response:", response);
            loading.value = false;
            showSuccessAlert(
              "Success",
              "Improvement Action Plan Added Successfully!"
            );
            clear();
            await emit("improvement-added");
            hideModal(newAddressModalRef.value);
            // clear();
          } else {
            // Handle API error response
            // const errorData = response.error;
            loading2.value = false;
            showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
          }
        } catch (error) {
          // Handle any other errors during API call
          // console.error("API call error:", error);
          showErrorAlert("Error", "An error occurred during the API call.");
        } finally {
          loading2.value = false;
        }
      } else {
        showErrorAlert("Warning", "Please fill all the details Correctly");
        loading2.value = false;
        return;
      }
    };

    return {
      loading2,
      newAddressData,
      improvementDetails,
      improvementValidator,
      submit,
      submitButtonRef,
      newAddressModalRef,
      clear,
    };
  },
});
</script>
  
  