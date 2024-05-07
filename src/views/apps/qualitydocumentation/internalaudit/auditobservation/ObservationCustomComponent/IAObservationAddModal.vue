<template>
  <!--begin::Modal - New Address-->
  <div
    class="modal fade"
    ref="newAddressModalRef"
    :id="'kt_modal_new_address'"
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
          @submit="submit"
          :validation-schema="validationSchema"
        >
          <!--begin::Modal header-->
          <div class="modal-header" id="kt_modal_new_address_header">
            <!--begin::Modal title-->
            <h2>Add Clause</h2>
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
                  <div class="form-control form-control-lg form-control-solid">
                    {{ clauseDetails.clause_number }}
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
                  <div class="form-control form-control-lg form-control-solid">
                    {{ clauseDetails.description }}
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
                  <div class="input-group gap-6">
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="radio"
                        value="compilance"
                        v-model="clauseDetails.compilance_type"
                        id="compilance"
                        name="compilance"
                      />
                      <label
                        for="compilance"
                        class="form-check-label fw-bold text-gray-700 text-nowrap"
                        >Compilance</label
                      >
                    </div>

                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="radio"
                        value="non_compilance"
                        v-model="clauseDetails.compilance_type"
                        id="non_compilance"
                        name="non_compilance"
                      />
                      <label
                        for="non_compilance"
                        class="form-check-label fw-bold text-gray-700 text-nowrap"
                        >Non Compilance</label
                      >
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
              @click="clear"
              id="kt_modal_new_address_cancel"
              class="btn btn-light me-3"
            >
              Discard
            </button>
            <!--end::Button-->

            <!--begin::Button-->
            <button
              ref="submitButtonRef"
              type="submit"
              :data-kt-indicator="dataLoading ? 'on' : ''"
              id="kt_modal_new_address_submit"
              class="btn btn-primary px-6"
            >
              <span v-if="!dataLoading" class="indicator-label"> Submit</span>
              <span v-if="dataLoading" class="indicator-progress">
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
import { defineComponent, onMounted, ref, watch } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";
import moment from "moment";
import { addIAuditObservation } from "@/stores/api";
import Loading from "@/components/kt-datatable/table-partials/Loading.vue";

interface NewAddressData {}

export default defineComponent({
  name: "new-address-modal",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },

  emits: ["addData"],
  props: ["data"],

  setup(props, { emit }) {
    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const newAddressModalRef = ref<null | HTMLElement>(null);
    const newAddressData = ref<NewAddressData>({});
    const validationSchema = Yup.object().shape({});

    const clauseDetails = ref({
      audit_schedule_id: "",
      clause_number: "",
      description: "",
      nc_observation: "",
      compilance_type: "",
      evidence: "",
      approval_status: "1",
      company_id: "",
      created_by: "",
      updated_by: "",
      is_active: "1",
    });

    onMounted(async () => {
      // Watch for changes in props.data and update clauseDetails accordingly
      watch(
        () => props.data,
        (newValue) => {
          clauseDetails.value = { ...newValue };
        }
      );
    });

    const isPdfInvalid = ref(false);
    const dataLoading = ref(false);

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

    const submit = async () => {
      console.log(clauseDetails.value);
      dataLoading.value = true;

      //   console.warn("Nice");
      try {
        if (validateForm(clauseDetails)) {
          const response = await addIAuditObservation(clauseDetails.value);
          if (!response.error) {
            await emit("addData", clauseDetails.value);

            showSuccessAlert("Success", "Sub-Clause Added Successfully!");
            await clear();
            console.log(clauseDetails.value);
            hideModal(newAddressModalRef.value);
          } else {
            showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
            dataLoading.value = false;
            return;
          }
        } else {
          showErrorAlert("Warning", "Please fill all the details Correctly");
          return;
        }
      } catch (error) {
        // Handle any other errors during API call
        // console.error("API call error:", error);
        showErrorAlert("Error", "An error occurred during the API call.");
        await clear();
        console.log(clauseDetails.value);
        hideModal(newAddressModalRef.value);
      } finally {
        dataLoading.value = false;
      }
    };

    const clear = () => {
      clauseDetails.value = {
        audit_schedule_id: "",
        clause_number: "",
        description: "",
        nc_observation: "",
        compilance_type: "",
        evidence: "",
        approval_status: "1",
        company_id: "",
        created_by: "",
        updated_by: "",
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

    return {
      clauseDetails,
      newAddressData,
      validationSchema,
      submit,
      submitButtonRef,
      newAddressModalRef,
      clear,
      handleFileChange,
      data: props.data,
      dataLoading,
    };
  },
});
</script>
    
    