<template>
  <!--begin::Modal - New Address-->
  <div
    class="modal fade"
    ref="newAddressModalRef"
    :id="'kt_modal_new_address_' + $props.clauseId"
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
          @submit ="submit"
          :validation-schema="validationSchema"
        >
          <!--begin::Modal header-->
          <div class="modal-header" id="kt_modal_new_address_header">
            <!--begin::Modal title-->
            <h2>Edit Clause</h2>
            <!--end::Modal title-->

            <!--begin::Close-->
            <div
              class="btn btn-sm btn-icon btn-active-color-primary"
              data-bs-dismiss="modal"
              @click="resetTheData"
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
              <!--begin::Input group-->
              <div class="row mb-6">
                <!--begin::Col-->
                <div class="col-md-6 fv-row mb-8 mb-sd-8">
                  <!--begin::Label-->
                  <label
                    class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                    >Clause No.</label
                  >
                  <!--end::Label-->
                  <Field
                    type="text"
                    name="clause_no"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Enter clause no."
                    v-model="clauseDetails.clause_no"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="clause_no" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="row mb-6">
                <div class="form-group col-md-12">
                  <label
                    class="col-lg-4 col-form-label required fw-semobold fs-6 fw-bold text-gray-700 text-nowrap"
                    >Clause Details</label
                  >
                  <Field
                    type="text"
                    as="textarea"
                    name="clause_details"
                    rows="5"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Enter clause details..."
                    v-model="clauseDetails.clause_details"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="clause_details" />
                    </div>
                  </div>
                </div>
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="row mb-6">
                <div class="form-group col-md-12">
                  <label
                    class="col-lg-4 col-form-label required fw-semobold fs-6 fw-bold text-gray-700 text-nowrap"
                    >NC Observation</label
                  >
                  <Field
                    type="text"
                    as="textarea"
                    name="nc_observation"
                    rows="5"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Enter NC Observation..."
                    v-model="clauseDetails.nc_observation"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="nc_observation" />
                    </div>
                  </div>
                </div>
              </div>
              <!--end::Input group-->


              <div class="row mb-6">
                <div class="form-group col-md-12 mb-8 mb-sd-8">
                  <label
                    class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap"
                    >Compilance Type
                  </label>
                  <div>
                    <el-select
                      filterable
                      name="compilance_type"
                      placeholder="Please Select Type"
                      v-model="clauseDetails.compilance_type"
                    >
                      <el-option
                        value=""
                        disabled="disabled"
                        label="Please Select Type"
                        key=""
                      >
                        Please Select Instrument</el-option
                      >
                      <el-option
                        id="compilance"
                        value="compilance"
                        label="Compilance"
                      />
                      <el-option
                        id="non_compilance"
                        value="non_compilance"
                        label="Non-Compilance"
                      />
                    </el-select>
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage
                          class="invalid-feedback"
                          name="compilance_type"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <!--end::Input group-->
              </div>


              <div class="row mb-6">
                <label
                  for="datasheet"
                  class="col-lg-3 col-form-label required fw-semobold text-gray-700 fs-6 text-nowrap"
                  >Upload Evidence</label
                >
                <!--begin::Col-->
                <div class="col-lg-9 fv-row position-relative">
                  <Field
                    type="file"
                    id="evidence"
                    name="evidence"
                    class="form-control form-control-lg form-control-solid"
                    @change="handleFileChange"
                    accept=".pdf"
                  />
                  <div
                    v-if="clauseDetails.evidence"
                    class="position-absolute end-0 top-50 translate-middle-y"
                  >
                    <i
                      class="fas fs-4 fa-check-circle text-success me-6"
                      data-toggle="tooltip"
                      title="File is selected"
                    ></i>
                  </div>
                  <div
                    v-else
                    class="position-absolute end-0 top-50 translate-middle-y"
                  >
                    <i
                      class="fas fs-4 fa-times-circle text-danger me-6"
                      data-toggle="tooltip"
                      title="File is not selected"
                    ></i>
                  </div>
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="evidence" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
              </div>
            </div>
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->

          <!--begin::Modal footer-->
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <button
              ref="submitButtonRef"
              type="submit"
              id="kt_modal_new_address_submit"
              class="btn btn-primary"
            >
              <span class="indicator-label"> Submit </span>
              <span class="indicator-progress">
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
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";
import moment from "moment";

interface NewAddressData {}

interface ClauseDetail {
  clause_no: string;
  clause_details: string;
  nc_observation: string;
  compilance_type: string;
  evidence: string;
}

export default defineComponent({
  name: "new-address-modal",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },

  emits: ["editData"],

  props: ["clauseId", "clauseData"],

  setup(props, { emit }) {
    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const newAddressModalRef = ref<null | HTMLElement>(null);
    const newAddressData = ref<NewAddressData>({});
    const validationSchema = Yup.object().shape({});

    const clauseDetails = ref<ClauseDetail>({
      clause_no: "",
      clause_details: "",
      nc_observation: "",
      compilance_type: "",
      evidence: "",
    });

    const isPdfInvalid = ref(false);

    const handleFileChange = (event) => {
      // Get the selected file
      const selectedFile = event.target?.files?.[0];

      if (!selectedFile) {
        alert("Please Select a file");
      }

      if (selectedFile) {
        // Check if the selected file is a PDF
        if (selectedFile.type === "application/pdf") {
          const reader = new FileReader();

          reader.onload = () => {
            try {
              const base64Data = reader.result
                ?.toString()
                .replace(/^data:application\/pdf;base64,/, "");

              if (base64Data) {
                clauseDetails.value.evidence = base64Data;
              } else {
                console.error("Error: Failed to read the image data.");
              }
            } catch (e) {
              console.error("Error:", e);
            }
          };

          // Read the file as data URL (base64)
          reader.readAsDataURL(selectedFile);
          // Reset the invalid flag
          isPdfInvalid.value = false;
        } else {
          // Clear the data and set the invalid flag

          clauseDetails.value.evidence = "";
          isPdfInvalid.value = true;
        }
      } else {
        clauseDetails.value.evidence = "";
        isPdfInvalid.value = true;
      }
      console.log(clauseDetails.value);
    };

    function areAllPropertiesNull(array) {
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

    async function resetTheData() {
      clauseDetails.value = await { ...props.clauseData };
    }

    onMounted(async function () {
      clauseDetails.value = await { ...props.clauseData };
    });

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

    const submit = async () => {
      console.log(clauseDetails.value);

      const result = areAllPropertiesNull([clauseDetails.value]);

      if (!result) {
        await emit("editData", props.clauseId, clauseDetails.value);

        showSuccessAlert("Success", "Sub-Clause Updated Successfully!");

        hideModal(newAddressModalRef.value);
      } else {
        showErrorAlert("Warning", "Please fill all the details Correctly");
        return;
      }
    };

    return {
      newAddressData,
      clauseDetails,
      validationSchema,
      submit,
      submitButtonRef,
      newAddressModalRef,
      handleFileChange,
      clauseId: props.clauseId,
      clauseData: props.clauseData,
      resetTheData,
    };
  },
});
</script>
      
      