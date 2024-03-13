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

            <!--begin::Input group-->
            <div class="row mb-6">
              <!--begin::Col-->
              <div class="col-md-12 fv-row">
                <!--begin::Label-->
                <label
                  class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Prepared By</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <Field
                  type="text"
                  v-model="ncrDetails.prepared_by"
                  name="prepared_by"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Prepared by..."
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="prepared_by" />
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
                  >Approved By</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <Field
                  type="text"
                  v-model="ncrDetails.approved_by"
                  name="approved_by"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Approval authority..."
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="approved_by" />
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
  prepared_by: string;
  approved_by: string;
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
      prepared_by: Yup.string().required().label("Prepared by"),
      approved_by: Yup.string().required().label("Approved by"),
    });

    const ncrDetails = ref<NCR>({
      nc_details: "",
      action_required: "",
      completion_date: "",
      review_date: "",
      verification_details: "",
      prepared_by: "",
      approved_by: "",
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
        prepared_by: response.prepared_by,
        approved_by: response.approved_by,
        company_id: response.company_id ? response.company_id : "",
        created_by: response.created_by,
        updated_by: response.updated_by,
        is_active: response.is_active,
      };
    });

    async function setDates(e, dateType) {
      if (e != null) {
        ncrDetails.value[dateType] = moment(e).format("YYYY-MM-DD");
      } else {
        ncrDetails.value[dateType] = "";
      }
      console.log(dateType, " ", ncrDetails.value[dateType]);
    }

    function areAllPropertiesNull(array) {
      return array.some((detail) => {
        const {
          nc_details,
          action_required,
          completion_date,
          review_date,
          verification_details,
          prepared_by,
          approved_by,
        } = detail;

        // Check if any property is null or empty

        return (
          nc_details === "" ||
          action_required === "" ||
          completion_date === "" ||
          review_date === "" ||
          verification_details === "" ||
          prepared_by === "" ||
          approved_by === ""
        );
      });
    }

    const submit = async () => {
      try {
        loading.value = true;
        console.log(ncrDetails.value);

        const result = areAllPropertiesNull([ncrDetails.value]);

        if (!result) {
          const response = await updateNonConformanceRecord(
            itemId,
            ncrDetails.value
          );
          // console.log(response.error);
          if (!response.error) {
            // Handle successful API response
            //   console.log("API response:", response);
            showSuccessAlert("Success", "NCR has been successfully Updated!");

            router.push({ name: "non-conformance-records" });
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
  