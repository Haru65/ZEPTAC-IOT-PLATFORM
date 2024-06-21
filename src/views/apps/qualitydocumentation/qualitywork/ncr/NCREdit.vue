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
          :validation-schema="ncrValidator"
        >
          <!--begin::Card body-->
          <div class="card-body border-top p-sd-2 p-lg-9">
            <div class="row mb-6">
              <!--begin::Col-->
              <div class="col-md-12 fv-row">
                <!--begin::Label-->
                <label
                  class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Non Conformance Details</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <Field
                  type="text"
                  as="textarea"
                  rows="5"
                  v-model="ncrDetails.nc_details"
                  name="nc_details"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter details of non conformance..."
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="nc_details" />
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
                  >Action Required</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <Field
                  type="text"
                  as="textarea"
                  rows="5"
                  v-model="ncrDetails.action_required"
                  name="action_required"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Specify action required..."
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="action_required" />
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
                <label
                  class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Completion Date</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-date-picker
                  type="date"
                  name="completion_date"
                  id="completion_date"
                  v-model="ncrDetails.completion_date"
                  @change="setDates($event, 'completion_date')"
                  placeholder="Pick a day"
                  :editable="false"
                />
                <div
                  class="fv-plugins-message-container mt-3"
                  v-if="!ncrDetails.completion_date"
                >
                  <div class="fv-help-block">
                    <ErrorMessage name="completion_date" />
                  </div>
                </div>
                <!--end::Input-->
              </div>
              <!--end::Col-->
              <!--begin::Col-->
              <div class="col-md-6 fv-row mb-8 mb-sd-8">
                <!--begin::Label-->
                <label
                  class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Next Review Date</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-date-picker
                  type="date"
                  name="review_date"
                  id="review_date"
                  v-model="ncrDetails.review_date"
                  @change="setDates($event, 'review_date')"
                  placeholder="Pick a day"
                  :editable="false"
                />
                <div
                  class="fv-plugins-message-container mt-3"
                  v-if="!ncrDetails.review_date"
                >
                  <div class="fv-help-block">
                    <ErrorMessage name="review_date" />
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
                  >Verification of Completion</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <Field
                  type="text"
                  as="textarea"
                  rows="5"
                  v-model="ncrDetails.verification_details"
                  name="verification_details"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter verification of completion..."
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="verification_details" />
                  </div>
                </div>
                <!--end::Input-->
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->
          </div>

          <div class="modal-footer flex-center w-100">
            <!--begin::Button-->
            <button
              id="kt_modal_new_address_submit"
              type="button"
              @click.prevent="submit"
              ref="submitButton"
              class="btn btn-primary me-2 px-6"
            >
              <span class="indicator-label"> Update </span>
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
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import {
  getNonConformanceRecord,
  updateNonConformanceRecord,
} from "@/stores/api";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import { Identifier } from "@/core/config/WhichUserConfig";
import { useAuthStore } from "@/stores/auth";
import { useRouter, useRoute } from "vue-router";
import ApiService from "@/core/services/ApiService";
import moment from "moment";

interface NCR {
  nc_details: string;
  action_required: string;
  completion_date: string;
  review_date: string;
  verification_details: string;
  approval_status: string;
  company_id: string;
  created_by: string;
  updated_by: string;
  is_active: string;
}

export default defineComponent({
  name: "non-conformance-record-edit",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  setup() {
    const submitButton = ref<null | HTMLButtonElement>(null);
    const loading = ref(false);
    const auth = useAuthStore();
    const router = useRouter();
    const route = useRoute();
    const User = auth.GetUser();
    const itemId = route.params.id;

    const ncrValidator = Yup.object().shape({
      nc_details: Yup.string().required().label("Non Conformance"),
      action_required: Yup.string().required().label("Action"),
      verification_details: Yup.string()
        .required()
        .label("Verification details"),
    });

    const ncrDetails = ref<NCR>({
      nc_details: "",
      action_required: "",
      completion_date: "",
      review_date: "",
      verification_details: "",
      approval_status: "",
      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
      is_active: "1",
    });

    onMounted(async () => {
      let response = await getNonConformanceRecord(itemId.toString());
      console.log(response);
      ncrDetails.value = {
        nc_details: response.nc_details,
        action_required: response.action_required,
        completion_date: response.completion_date,
        review_date: response.review_date,
        verification_details: response.verification_details,
        approval_status: response.approval_status,
        company_id: response.company_id ? response.company_id : "",
        created_by: response.created_by,
        updated_by: response.updated_by,
        is_active: response.is_active,
      };
    });

    /* --------SET DATE LOGIC--------*/
    async function setDates(e, dateType) {
      try {
        if (e != null) {
          if (e != "" && e != null) {
            ncrDetails.value[dateType] = moment(e).format("YYYY-MM-DD");
          } else {
            ncrDetails.value[dateType] = "";
          }
        } else {
          ncrDetails.value[dateType] = "";
        }
      } catch (err) {
        ncrDetails.value[dateType] = "";
      }
      console.log(ncrDetails.value[dateType]);
    }

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
          value = value.trim();
          if (value === "") {
            return false;
          }
        } else {
        }
      }
      return true;
    };

    const submit = async () => {
      loading.value = true;
      const result = validateForm(ncrDetails.value);

      if (result == false) {
        loading.value = false;
        showErrorAlert("Warning", "Please fill all the details correctly.");
        return;
      }

      try {
        if (submitButton.value) {
          // Activate indicator
          submitButton.value.setAttribute("data-kt-indicator", "on");
        }

        // Call your API here
        const response = await updateNonConformanceRecord(
          itemId,
          ncrDetails.value
        );

        if (response?.success) {
          loading.value = false;
          showSuccessAlert(
            "Success",
            response.message || "NCR has been successfully updated!"
          );
          router.push({ name: "non-conformance-records" });
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
        if (submitButton.value) {
          submitButton.value.removeAttribute("data-kt-indicator");
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

    return {
      submitButton,
      ncrDetails,
      ncrValidator,
      getAssetPath,
      submit,
      loading,
      setDates,
    };
  },
});
</script>
  