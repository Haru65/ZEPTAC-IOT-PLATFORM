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
          :validation-schema="itemDetailsValidator"
          @submit="submit"
        >
          <!--begin::Card body-->
          <div class="card-body border-top p-6">
            <!-- extra fields -->
            <div class="row mb-6">
              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fw-semobold fw-bold text-gray-700 fs-6 text-nowrap"
                  >Document Request Number</label
                >
                <Field
                  type="text"
                  name="request_no"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter request number"
                  v-model="itemDetails.request_no"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="request_no" />
                  </div>
                </div>
              </div>

              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6 text-nowrap"
                  >Date of Request</label
                >
                <div class="block">
                  <el-date-picker
                    type="date"
                    name="request_date"
                    id="request_date"
                    v-model="itemDetails.request_date"
                    @change="setDates($event, 'request_date')"
                    placeholder="Pick a day"
                    :editable="false"
                  />
                </div>
              </div>
            </div>
            <!--end::Input group-->

            <div class="row mb-6">
              <!--begin::Col-->
              <div class="col-md-6 fv-row">
                <!--begin::Label-->
                <label
                  class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >From (Department)</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <Field
                  type="text"
                  name="req_from"
                  v-model="itemDetails.req_from"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="From..."
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="req_from" />
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
                  >To</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <Field
                  type="text"
                  name="req_to"
                  v-model="itemDetails.req_to"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="To..."
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="req_to" />
                  </div>
                </div>
                <!--end::Input-->
              </div>
              <!--end::Col-->
            </div>

            <div class="row mb-6">
              <div class="form-group col-lg-12 col-md-12">
                <label
                  class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Document being Amended</label
                >
                <Field
                  type="text"
                  name="document_name"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter document name being amended"
                  v-model="itemDetails.document_name"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="document_name" />
                  </div>
                </div>
              </div>
            </div>

            <div class="row mb-6">
              <!--begin::Col-->
              <div class="col-md-6 fv-row">
                <!--begin::Label-->
                <label
                  class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Document Number</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <Field
                  type="text"
                  name="document_no"
                  v-model="itemDetails.document_no"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter Document Number"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="document_no" />
                  </div>
                </div>
                <!--end::Input-->
              </div>
              <!--end::Col-->

              <div class="col-md-6 fv-row mb-8 mb-sd-8">
                <!--begin::Label-->
                <label class="required fs-5 fw-bold text-gray-700 mb-2"
                  >Nature of Change</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <div>
                  <el-select
                    v-model="itemDetails.nature"
                    filterable
                    name="nature"
                    placeholder="--Select--"
                  >
                    <el-option
                      label="Amendment of existing"
                      value="Amendment of existing"
                    />
                    <el-option
                      label="Introduce new document"
                      value="Introduce new document"
                    />
                  </el-select>
                </div>
                <!--end::Col-->
                <div
                  class="fv-plugins-message-container mt-3"
                  v-if="!itemDetails.nature"
                >
                  <div class="fv-help-block">
                    <ErrorMessage name="nature" />
                  </div>
                </div>
              </div>
            </div>

            <!-- extra fields -->
            <div class="row mb-6">
              <div class="form-group col-12">
                <label
                  class="col-lg-4 col-form-label required fw-semobold fw-bold text-gray-700 fs-6 text-nowrap"
                  >Detail of Change</label
                >
                <Field
                  type="text"
                  as="textarea"
                  rows="5"
                  name="details"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter Details of change..."
                  v-model="itemDetails.details"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="details" />
                  </div>
                </div>
              </div>
            </div>
            <!--end::Input group-->
            <!-- extra fields -->
            <div class="row mb-6">
              <div class="form-group col-12">
                <label
                  class="col-lg-4 col-form-label required fw-semobold fw-bold text-gray-700 fs-6 text-nowrap"
                  >Reason for Change</label
                >
                <Field
                  type="text"
                  as="textarea"
                  rows="5"
                  name="reason"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter Reason for change..."
                  v-model="itemDetails.reason"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="reason" />
                  </div>
                </div>
              </div>
            </div>
            <!--end::Input group-->

            <div class="row mb-6">
              <div class="form-group col-12">
                <label
                  class="col-lg-4 col-form-label required fw-semobold fw-bold text-gray-700 fs-6 text-nowrap"
                  >User Department affected by this change</label
                >
                <Field
                  type="text"
                  name="department"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter the department affected..."
                  v-model="itemDetails.department"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="department" />
                  </div>
                </div>
              </div>
            </div>

            <!--begin::Input group-->
            <div class="row mb-6">
              <!--begin::Col-->
              <div class="col-md-6 fv-row mb-8 mb-sd-8">
                <!--begin::Label-->
                <label
                  class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Effective Date for Amendment</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <div class="block">
                  <el-date-picker
                    type="date"
                    name="effective_date"
                    id="effective_date"
                    v-model="itemDetails.effective_date"
                    @change="setDates($event, 'effective_date')"
                    placeholder="Pick a day"
                    :editable="false"
                  />
                </div>
                <!--end::Input-->
              </div>
              <!--end::Col-->

              <!--begin::Col-->
              <div class="col-md-6 fv-row mb-8 mb-sd-8">
                <!--end::Label-->
                <label
                  class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Comments for approving authority</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <div class="block">
                  <el-select
                    v-model="itemDetails.authority_comments"
                    filterable
                    name="authority_comments"
                    placeholder="--Select--"
                  >
                    <el-option label="Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                </div>
                <!--end::Input-->
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="authority_comments" />
                  </div>
                </div>
                <!--end::Input-->
              </div>
              <!--end::Col-->
            </div>

            <!-- extra fields -->
            <div class="row mb-6">
              <div class="form-group col-12">
                <label
                  class="col-lg-4 col-form-label required fw-semobold fw-bold text-gray-700 fs-6 text-nowrap"
                  >Comments (if any)</label
                >
                <Field
                  type="text"
                  as="textarea"
                  rows="5"
                  name="comments"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter the comment..."
                  v-model="itemDetails.comments"
                />
              </div>
            </div>
            <!--end::Input group-->
          </div>
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <button
              type="reset"
              @click="clear"
              id="kt_modal_new_address_cancel"
              class="btn btn-light w-sd-25 w-lg-25 me-3"
            >
              Discard
            </button>
            <!--end::Button-->

            <!--begin::Button-->
            <button
              id="kt_modal_new_address_submit"
              type="submit"
              ref="submitButtonRef"
              class="btn btn-primary w-sd-25 w-lg-25 me-2 px-6"
            >
              <span class="indicator-label"> Save </span>
              <span class="indicator-progress">
                Please wait...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </button>
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
import { defineComponent, onMounted, ref } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { addDocumentChange } from "@/stores/api";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import packages from "@/core/config/PackagesConfig";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import ApiService from "@/core/services/ApiService";
import moment from "moment";

interface itemDetails {
  request_date: string;
  request_no: string;
  document_name: string;
  document_no: string;
  req_from: string;
  req_to: string;
  nature: string;
  details: string;
  reason: string;
  department: string;
  effective_date: string;
  authority_comments: string;
  comments: string;
  approval_status: string;

  company_id: string;
  created_by: number;
  updated_by: number;
  is_active: number;
}

export default defineComponent({
  name: "document-change-add",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  setup() {
    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const loading = ref(false);
    const auth = useAuthStore();
    const router = useRouter();
    const User = auth.GetUser();

    const itemDetailsValidator = Yup.object().shape({
      request_no: Yup.string().required().label("request No."),
      document_name: Yup.string().required().label("Document Name"),
      document_no: Yup.string().required().label("Document No."),
      req_from: Yup.string().required().label("From"),
      req_to: Yup.string().required().label("To"),
      details: Yup.string().required().label("Details of change"),
      reason: Yup.string().required().label("Reason for change"),
      department: Yup.string().required().label("User Department affected"),
    });

    const itemDetails = ref<itemDetails>({
      request_date: "",
      request_no: "",
      document_name: "",
      document_no: "",
      req_from: "",
      req_to: "",
      nature: "",
      details: "",
      reason: "",
      department: "",
      effective_date: "",
      authority_comments: "",
      comments: "",
      approval_status: "1",

      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
      is_active: 1,
    });

    /* --------SET DATE LOGIC--------*/
    async function setDates(e, dateType) {
      try {
        if (e != null) {
          if (e != "" && e != null) {
            itemDetails.value[dateType] = moment(e).format("YYYY-MM-DD");
          } else {
            itemDetails.value[dateType] = "";
          }
        } else {
          itemDetails.value[dateType] = "";
        }
      } catch (err) {
        itemDetails.value[dateType] = "";
      }

      console.log(itemDetails.value[dateType]);
    }

    const validateForm = (formData) => {
      for (const key in formData) {
        let value = formData[key];
        if (key !== "comments") {
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
      loading.value = true;
      const result = validateForm(itemDetails.value);

      if (result == false) {
        loading.value = false;
        showErrorAlert("Warning", "Please fill all the details correctly.");
        return;
      }

      try {
        if (submitButtonRef.value) {
          // Activate indicator
          submitButtonRef.value.setAttribute("data-kt-indicator", "on");
        }

        // Call your API here

        const response = await addDocumentChange(itemDetails.value);
        if (response?.success) {
          showSuccessAlert(
            "Success",
            response.message ||
              "Document Change Request has been successfully submitted!"
          );
          loading.value = false;
          router.push({ name: "document-change-list" });
        } else {
          // Handle API error response
          loading.value = false;
          showErrorAlert("Error", response.message || "An error occurred.");
        }
      } catch (error) {
        // Handle any other errors during API call
        console.error("API call error:", error);
        showErrorAlert("Error", "An error occurred during the API call.");
      } finally {
        if (submitButtonRef.value) {
          submitButtonRef.value.removeAttribute("data-kt-indicator");
        }
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
      itemDetails.value = {
        request_date: "",
        request_no: "",
        document_name: "",
        document_no: "",
        req_from: "",
        req_to: "",
        nature: "",
        details: "",
        reason: "",
        department: "",
        effective_date: "",
        authority_comments: "",
        comments: "",
        approval_status: "1",

        company_id: User.company_id,
        created_by: User.id,
        updated_by: User.id,
        is_active: 1,
      };
    };
    return {
      submitButtonRef,
      itemDetails,
      itemDetailsValidator,
      submit,
      loading,
      packages,
      User,
      clear,
      setDates,
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