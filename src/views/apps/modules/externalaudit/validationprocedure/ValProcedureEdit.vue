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
          novalidate
          :validation-schema="procedureDetailsValidator"
        >
          <!--begin::Card body-->
          <div class="card-body border-top p-sd-2 p-lg-9">
            <!--begin::Input group-->
            <div class="row mb-6">
              <!--begin::Label-->
              <label class="col-lg-2 col-form-label required fw-semobold fs-6"
                >Document Name</label
              >
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-10 fv-row">
                <Field
                  type="text"
                  name="document_name"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter document name"
                  v-model="procedureDetails.document_name"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="document_name" />
                  </div>
                </div>
              </div>
              <!--end::Col-->
            </div>

            <div class="row mb-6">
              <div class="form-group col-md-6 mb-8 mb-sd-8">
                <label
                  class="btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center"
                >
                  <!--begin::Info-->
                  <span class="d-block fw-semobold text-start">
                    <span class="text-dark fw-bold d-block fs-4 mb-2"
                      >Issue Date</span
                    >
                    <div class="block">
                      <el-date-picker
                        type="date"
                        name="issue_date"
                        id="issue_date"
                        v-model="procedureDetails.issue_date"
                        placeholder="Pick Issue Day"
                        :editable="false"
                      />
                    </div>
                  </span>
                  <!--end::Info-->
                </label>
                <div
                  class="fv-plugins-message-container"
                  v-if="!procedureDetails.issue_date"
                >
                  <div class="fv-help-block">
                    <ErrorMessage name="issue_date" />
                  </div>
                </div>
              </div>
              <div class="form-group col-md-6 mb-8 mb-sd-8">
                <label
                  class="btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center"
                >
                  <!--begin::Info-->
                  <span class="d-block fw-semobold text-start">
                    <span class="text-dark fw-bold d-block fs-4 mb-2"
                      >Revision Date</span
                    >
                    <div class="block">
                      <el-date-picker
                        type="date"
                        name="revision_date"
                        id="revision_date"
                        v-model="procedureDetails.revision_date"
                        placeholder="Pick Revision Day"
                        :editable="false"
                      />
                    </div>
                  </span>
                  <!--end::Info-->
                </label>
                <div
                  class="fv-plugins-message-container"
                  v-if="!procedureDetails.revision_date"
                >
                  <div class="fv-help-block">
                    <ErrorMessage name="revision_date" />
                  </div>
                </div>
              </div>
            </div>

            <!-- extra fields -->
            <div class="row mb-6">
              <div class="form-group col-md-6">
                <label class="col-lg-4 col-form-label required fw-semobold fs-6"
                  >Issue No.</label
                >
                <Field
                  type="text"
                  name="issue_no"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter Issue number"
                  v-model="procedureDetails.issue_no"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="issue_no" />
                  </div>
                </div>
              </div>
              <div class="form-group col-md-6">
                <label class="col-lg-4 col-form-label required fw-semobold fs-6"
                  >Revision No.</label
                >
                <Field
                  type="text"
                  name="revision_no"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter Revision number"
                  v-model="procedureDetails.revision_no"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="revision_no" />
                  </div>
                </div>
              </div>
            </div>
            <!--end::Input group-->

            <!-- extra fields -->
            <div class="row mb-6">
              <div class="form-group col-md-6">
                <label class="col-lg-4 col-form-label required fw-semobold fs-6"
                  >Prepared By</label
                >
                <Field
                  type="text"
                  name="prepared_by"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Prepared By..."
                  v-model="procedureDetails.prepared_by"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="prepared_by" />
                  </div>
                </div>
              </div>
              <div class="form-group col-md-6">
                <label class="col-lg-4 col-form-label required fw-semobold fs-6"
                  >Approved By</label
                >
                <Field
                  type="text"
                  name="approved_by"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Approved By..."
                  v-model="procedureDetails.approved_by"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="approved_by" />
                  </div>
                </div>
              </div>
            </div>
            <!--end::Input group-->

            <div class="row mb-6">
              <label
                for="pdfFile"
                class="col-lg-2 col-form-label required fw-semobold fs-6"
                >Upload PDF Document:</label
              >

              <!--begin::Col-->
              <div class="col-lg-10 fv-row position-relative">
                <Field
                  type="file"
                  id="pdfFile"
                  name="uploaded_pdf_name"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter document name"
                  @change="handleFileChange"
                  accept=".pdf"
                />
                <div
                  v-if="procedureDetails.uploaded_pdf_data"
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
                    <ErrorMessage name="uploaded_pdf_name" />
                  </div>
                </div>
              </div>
              <!--end::Col-->
            </div>

            <div class="row mb-6">
              <iframe
                v-if="procedureDetails.uploaded_pdf_data"
                :src="procedureDetails.uploaded_pdf_data"
                width="400"
                height="400"
                frameborder="0"
              ></iframe>
            </div>
          </div>

          <div class="modal-footer flex-center w-100">
            <!--begin::Button-->
            <button type="reset" class="btn btn-lg btn-danger w-sd-25 w-lg-25">
              Discard
            </button>
            <!--end::Button-->
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
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
  getValidationProcedure,
  updateValidationProcedure,
} from "@/stores/api";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import packages from "@/core/config/PackagesConfig";
import { limit, Identifier } from "@/core/config/WhichUserConfig";
import { useAuthStore } from "@/stores/auth";
import { useRouter, useRoute } from "vue-router";
import ApiService from "@/core/services/ApiService";
import moment from "moment";

interface procedures {
  document_name: string;
  issue_date: string;
  issue_no: string;
  revision_date: string;
  revision_no: string;
  prepared_by: string;
  approved_by: string;
  uploaded_pdf_name: string;
  uploaded_pdf_data: string;
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
    let limit = ref(500);
    const itemId = route.params.id;

    const procedureDetailsValidator = Yup.object().shape({
      document_name: Yup.string().required().label("Document Name"),
      issue_date: Yup.string().required().label("Issue Date"),
      issue_no: Yup.string().required().label("Issue No."),
      revision_date: Yup.string().required().label("Revision Date"),
      revision_no: Yup.string().required().label("Revision No."),
      prepared_by: Yup.string().required().label("Prepared By"),
      approved_by: Yup.string().required().label("Approved By"),
      uploaded_pdf_data: Yup.string().required().label("Pdf"),
    });

    const procedureDetails = ref<procedures>({
      document_name: "",
      issue_date: "",
      issue_no: "",
      revision_date: "",
      revision_no: "",
      prepared_by: "",
      approved_by: "",
      uploaded_pdf_name: "",
      uploaded_pdf_data: "",
      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
      is_active: "1",
    });

    onMounted(async () => {
      let response = await getValidationProcedure(itemId.toString());
      console.log(response);
      procedureDetails.value = {
        document_name: response.document_name,
        issue_date: response.issue_date,
        issue_no: response.issue_no,
        revision_date: response.revision_date,
        revision_no: response.revision_no,
        prepared_by: response.prepared_by,
        approved_by: response.approved_by,
        uploaded_pdf_name: response.uploaded_pdf_name,
        uploaded_pdf_data: response.uploaded_pdf_data,
        company_id: response.company_id ? response.company_id : "",
        created_by: response.created_by,
        updated_by: response.updated_by,
        is_active: response.is_active,
      };
    });

    const isPdfInvalid = ref(false);

    const handleFileChange = (event) => {
      // Get the selected file
      const selectedFile = event.target?.files?.[0];

      if (selectedFile) {
        // Check if the selected file is a PDF
        if (selectedFile.type === "application/pdf") {
          // Store the file name in procedureDetails
          procedureDetails.value.uploaded_pdf_name = selectedFile.name;

          // Read the file data using FileReader
          const reader = new FileReader();

          reader.onload = (e) => {
            // Store the entire PDF data (base64 encoded)
            if (e.target) {
              const result = e.target.result as string;
              procedureDetails.value.uploaded_pdf_data = result;
            }
          };

          // Read the file as data URL (base64)
          reader.readAsDataURL(selectedFile);

          // Reset the invalid flag
          isPdfInvalid.value = false;
        } else {
          // Clear the data and set the invalid flag
          procedureDetails.value.uploaded_pdf_name = "";
          procedureDetails.value.uploaded_pdf_data = "";
          isPdfInvalid.value = true;
        }
      } else {
        // Clear the selected file name and data if no file is selected
        procedureDetails.value.uploaded_pdf_name = "";
        procedureDetails.value.uploaded_pdf_data = "";
        isPdfInvalid.value = false;
      }
      console.log(procedureDetails.value);
    };

    function areAllPropertiesNotNull(array) {
      return array.some((data) => {
        const {
          document_name,
          issue_date,
          issue_no,
          revision_date,
          revision_no,
          prepared_by,
          approved_by,
          uploaded_pdf_name,
          uploaded_pdf_data,
        } = data;

        // Check if any property is null or empty

        return (
          document_name !== "" &&
          issue_date !== null &&
          issue_no !== "" &&
          revision_date !== null &&
          revision_no !== "" &&
          prepared_by !== "" &&
          approved_by !== "" &&
          uploaded_pdf_name !== "" &&
          uploaded_pdf_data !== ""
        );
      });
    }

    const submit = async () => {
      loading.value = true;

      try {
        procedureDetails.value.issue_date = moment(
          procedureDetails.value.issue_date
        ).format("YYYY-MM-DD");
        procedureDetails.value.revision_date = moment(
          procedureDetails.value.revision_date
        ).format("YYYY-MM-DD");

        const result = areAllPropertiesNotNull([procedureDetails.value]);

        if (result) {
          const response = await updateValidationProcedure(
            itemId,
            procedureDetails.value
          );
          // console.log(response.error);
          if (!response.error) {
            // Handle successful API response
            //   console.log("API response:", response);
            showSuccessAlert(
              "Success",
              "Document has been successfully Updated!"
            );

            // clear();
            router.push({ name: "validation-list" });
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
      procedureDetails,
      procedureDetailsValidator,
      getAssetPath,
      submit,
      loading,
      packages,
      limit,
      isPdfInvalid,
      handleFileChange,
    };
  },
});
</script>

<style>
.el-input__inner {
  font-weight: 500;
}
.el-input__wrapper {
  height: 3.5rem;
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
</style>