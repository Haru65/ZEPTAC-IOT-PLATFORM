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
                <div class="form-group col-md-12">
                  <label
                    class="col-lg-4 col-form-label required fw-semobold fs-6 fw-bold text-gray-700 text-nowrap"
                    >Corrective Action</label
                  >
                  <Field
                    type="text"
                    as="textarea"
                    name="corrective_action"
                    rows="5"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Enter Corrective Action..."
                    v-model="correctiveActionDetails.corrective_action"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="corrective_action" />
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
                    >Root Cause Analysis</label
                  >
                  <Field
                    type="text"
                    as="textarea"
                    name="root_cause"
                    rows="5"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Enter Root the cause..."
                    v-model="correctiveActionDetails.root_cause"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="root_cause" />
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
                    >Audit Remark</label
                  >
                  <Field
                    type="text"
                    as="textarea"
                    name="audit_remark"
                    rows="5"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Audit Remark is..."
                    v-model="correctiveActionDetails.audit_remark"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="audit_remark" />
                    </div>
                  </div>
                </div>
              </div>
              <!--end::Input group-->
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
import { addCorrectiveAction } from "@/stores/api";
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

    const correctiveActionDetails = ref({
      audit_observation_id: "",
      audit_schedule_id: "",
      corrective_action: "",
      root_cause: "",
      audit_remark: "",
      approval_status: "1",
      company_id: "",
      created_by: "",
      updated_by: "",
      is_active: "1",
    });

    onMounted(async () => {
      // Watch for changes in props.data and update correctiveActionDetails accordingly
      watch(
        () => props.data,
        (newValue) => {
          correctiveActionDetails.value = { ...newValue };
        }
      );
    });

    const dataLoading = ref(false);

    const validateForm = (formData) => {
      for (const key in formData) {
        let value = formData[key];
        if (key !== "audit_remark") {
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
            value = value.trim();
            if (value === "") {
              return false;
            }
          } else {
          }
        }
      }
      return true;
    };

    const submit = async () => {
      console.log(correctiveActionDetails.value);
      dataLoading.value = true;

      //   console.warn("Nice");
      try {
        if (validateForm(correctiveActionDetails)) {
          const response = await addCorrectiveAction(
            correctiveActionDetails.value
          );
          if (!response.error) {
            await emit("addData", correctiveActionDetails.value);

            showSuccessAlert(
              "Success",
              "Corrective Action Added Successfully!"
            );
            await clear();
            console.log(correctiveActionDetails.value);
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
        console.log(correctiveActionDetails.value);
        hideModal(newAddressModalRef.value);
      } finally {
        dataLoading.value = false;
      }
    };

    const clear = () => {
      correctiveActionDetails.value = {
        audit_observation_id: "",
        audit_schedule_id: "",
        corrective_action: "",
        root_cause: "",
        audit_remark: "",
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
      correctiveActionDetails,
      newAddressData,
      validationSchema,
      submit,
      submitButtonRef,
      newAddressModalRef,
      clear,
      data: props.data,
      dataLoading,
    };
  },
});
</script>
    
    