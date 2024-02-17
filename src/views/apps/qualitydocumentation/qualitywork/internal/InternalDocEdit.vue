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
          :validation-schema="DocumentValidator"
        >
          <!--begin::Card body-->
          <div class="card-body border-top p-sd-2 p-lg-9">
            <div class="row mb-6">
              <!--begin::Col-->
              <div class="col-md-12 fv-row">
                <!--begin::Label-->
                <label
                  class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Document Name</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <Field
                  type="text"
                  v-model="documentDetails.document_name"
                  name="document_name"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter document name"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="document_name" />
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
                  >Format Number</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <Field
                  type="text"
                  v-model="documentDetails.format_no"
                  name="format_no"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter format..."
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="format_no" />
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
                  >Review Date</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-date-picker
                  type="date"
                  name="review_date"
                  id="review_date"
                  v-model="documentDetails.review_date"
                  @change="setDates($event, 'review_date')"
                  placeholder="Pick a day"
                  :editable="false"
                />
                <div
                  class="fv-plugins-message-container mt-3"
                  v-if="!documentDetails.review_date"
                >
                  <div class="fv-help-block">
                    <ErrorMessage name="review_date" />
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
                  >Revision Date</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-date-picker
                  type="date"
                  name="revision_date"
                  id="revision_date"
                  v-model="documentDetails.revision_date"
                  @change="setDates($event, 'revision_date')"
                  placeholder="Pick a day"
                  :editable="false"
                />
                <div
                  class="fv-plugins-message-container mt-3"
                  v-if="!documentDetails.revision_date"
                >
                  <div class="fv-help-block">
                    <ErrorMessage name="revision_date" />
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
              <div class="col-md-6 fv-row mb-8 mb-sd-8">
                <!--begin::Label-->
                <label
                  class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Issue Date</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-date-picker
                  type="date"
                  name="issue_date"
                  id="issue_date"
                  v-model="documentDetails.issue_date"
                  placeholder="Pick a day"
                  @change="setDates($event, 'issue_date')"
                  :editable="false"
                />
                <div
                  class="fv-plugins-message-container mt-3"
                  v-if="!documentDetails.issue_date"
                >
                  <div class="fv-help-block">
                    <ErrorMessage name="issue_date" />
                  </div>
                </div>
                <!--end::Input-->
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="row mb-6">
              <div class="form-group col-md-12">
                <label
                  class="col-lg-4 col-form-label required fw-semobold fs-6 fw-bold text-gray-700 text-nowrap"
                  >Location</label
                >
                <Field
                  type="text"
                  name="location"
                  v-model="documentDetails.location"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter location..."
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="location" />
                  </div>
                </div>
              </div>
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
import { getInternalDoc, updateInternalDoc } from "@/stores/api";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import { Identifier } from "@/core/config/WhichUserConfig";
import { useAuthStore } from "@/stores/auth";
import { useRouter, useRoute } from "vue-router";
import ApiService from "@/core/services/ApiService";
import moment from "moment";

interface Document {
  document_name: string;
  format_no: string;
  review_date: string;
  revision_date: string;
  issue_date: string;
  location: string;
  company_id: string;
  created_by: string;
  updated_by: string;
  is_active: string;
}

export default defineComponent({
  name: "validation-edit",
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

    const DocumentValidator = Yup.object().shape({
      document_name: Yup.string().required().label("Document name"),
      format_no: Yup.string().required().label("Format number"),
      location: Yup.string().required().label("Location"),
    });

    const documentDetails = ref<Document>({
      document_name: "",
      format_no: "",
      review_date: "",
      revision_date: "",
      issue_date: "",
      location: "",
      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
      is_active: "1",
    });

    onMounted(async () => {
      let response = await getInternalDoc(itemId.toString());
      console.log(response);
      documentDetails.value = {
        document_name: response.document_name,
        format_no: response.format_no,
        review_date: response.review_date,
        revision_date: response.revision_date,
        issue_date: response.issue_date,
        location: response.location,
        company_id: response.company_id ? response.company_id : "",
        created_by: response.created_by,
        updated_by: response.updated_by,
        is_active: response.is_active,
      };
    });

    async function setDates(e, dateType) {
      if (e != null) {
        documentDetails.value[dateType] = moment(e).format("YYYY-MM-DD");
      } else {
        documentDetails.value[dateType] = "";
      }
      console.log(dateType, " ", documentDetails.value[dateType]);
    }

    function areAllPropertiesNull(array) {
      return array.some((detail) => {
        const {
          document_name,
          format_no,
          review_date,
          revision_date,
          issue_date,
          location,
        } = detail;

        // Check if any property is null or empty

        return (
          document_name === "" ||
          format_no === "" ||
          review_date === "" ||
          revision_date === "" ||
          issue_date === "" ||
          location === ""
        );
      });
    }

    const submit = async () => {
      try {
        loading.value = true;
        console.log(documentDetails.value);

        const result = areAllPropertiesNull([documentDetails.value]);

        if (!result) {
          const response = await updateInternalDoc(
            itemId,
            documentDetails.value
          );
          // console.log(response.error);
          if (!response.error) {
            // Handle successful API response
            //   console.log("API response:", response);
            showSuccessAlert(
              "Success",
              "Document has been successfully Updated!"
            );

            router.push({ name: "internal-documents" });
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
      documentDetails,
      DocumentValidator,
      getAssetPath,
      submit,
      loading,
      setDates,
    };
  },
});
</script>
  