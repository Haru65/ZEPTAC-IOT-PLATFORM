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
                    >Document number with Section</label
                  >
                  <!--end::Label-->
  
                  <!--begin::Input-->
                  <Field
                    type="text"
                    v-model="documentDetails.document_section"
                    name="document_section"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Enter document number with section"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="document_section" />
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
                    @change="setDates($event, 'issue_date')"
                    placeholder="Pick a day"
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
                <!--begin::Col-->
                <div class="col-md-6 fv-row mb-8 mb-sd-8">
                  <!--begin::Label-->
                  <label
                    class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                    >Amendment Date</label
                  >
                  <!--end::Label-->
  
                  <!--begin::Input-->
                  <el-date-picker
                    type="date"
                    name="amendment_date"
                    id="amendment_date"
                    v-model="documentDetails.amendment_date"
                    @change="setDates($event, 'amendment_date')"
                    placeholder="Pick a day"
                    :editable="false"
                  />
                  <div
                    class="fv-plugins-message-container mt-3"
                    v-if="!documentDetails.amendment_date"
                  >
                    <div class="fv-help-block">
                      <ErrorMessage name="amendment_date" />
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
                    >Storage Medium</label
                  >
                  <!--end::Label-->
  
                  <!--begin::Input-->
                  <Field
                    type="text"
                    name="storage_medium"
                    v-model="documentDetails.storage_medium"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Enter storage medium"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="storage_medium" />
                    </div>
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Col-->
              </div>
              <!--end::Input group-->
  
              <div class="row mb-6">
                <label
                  for="document_file"
                  class="col-lg-3 col-form-label required fw-semobold text-gray-700 fs-6 text-nowrap"
                  >Upload File</label
                >
                <!--begin::Col-->
                <div class="col-lg-9 fv-row position-relative">
                  <Field
                    type="file"
                    id="document_file"
                    name="document_file"
                    class="form-control form-control-lg form-control-solid"
                    @change="handleFileChange"
                    accept=".pdf"
                  />
                  <div
                    v-if="documentDetails.document_file"
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
                      <ErrorMessage name="document_file" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
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
  import { getNIDoc, updateNIDoc } from "@/stores/api";
  import { ErrorMessage, Field, Form as VForm } from "vee-validate";
  import * as Yup from "yup";
  import { Identifier } from "@/core/config/WhichUserConfig";
  import { useAuthStore } from "@/stores/auth";
  import { useRouter, useRoute } from "vue-router";
  import ApiService from "@/core/services/ApiService";
  import moment from "moment";
  
  interface Document {
    document_section: string;
    document_name: string;
    issue_date: string;
    amendment_date: string;
    storage_medium: string;
    approval_status: string;
    document_file: string;
    company_id: string;
    created_by: string;
    updated_by: string;
    is_active: string;
  }
  
  export default defineComponent({
    name: "ni-document-edit",
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
        document_section: Yup.string()
          .required()
          .label("Document number with section"),
        document_name: Yup.string().required().label("Document name"),
        storage_medium: Yup.string().required().label("Storage Medium"),
      });
  
      const documentDetails = ref<Document>({
        document_section: "",
        document_name: "",
        issue_date: "",
        amendment_date: "",
        storage_medium: "",
        approval_status: "",
        document_file: "",
        company_id: User.company_id,
        created_by: User.id,
        updated_by: User.id,
        is_active: "1",
      });
  
      onMounted(async () => {
        let response = await getNIDoc(itemId.toString());
        console.log(response);
        documentDetails.value = {
          document_section: response.document_section,
          document_name: response.document_name,
          issue_date: response.issue_date,
          amendment_date: response.amendment_date,
          storage_medium: response.storage_medium,
          approval_status: response.approval_status,
          document_file: response.document_file ? response.document_file : "",
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
            documentDetails.value[dateType] = moment(e).format("YYYY-MM-DD");
          } else {
            documentDetails.value[dateType] = "";
          }
        } else {
          documentDetails.value[dateType] = "";
        }
      } catch (err) {
        documentDetails.value[dateType] = "";
      }
      console.log(documentDetails.value[dateType]);
    }
  
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
                  documentDetails.value.document_file = base64Data;
                } else {
                  console.error("Error: Failed to read the image data.");
                }
              } catch (e) {
                console.error("Error:", e);
              }
            };
  
            // Read the file as data URL (base64)
            reader.readAsDataURL(selectedFile);
          } else {
            // Clear the data and set the invalid flag
  
            documentDetails.value.document_file = "";
          }
        } else {
          documentDetails.value.document_file = "";
        }
        console.log(documentDetails.value);
      };
  
      function areAllPropertiesNull(array) {
        return array.some((detail) => {
          const {
            document_section,
            document_name,
            issue_date,
            amendment_date,
            storage_medium,
            document_file,
          } = detail;
  
          // Check if any property is null or empty
  
          return (
            document_section === "" ||
            document_name === "" ||
            issue_date === "" ||
            amendment_date === "" ||
            storage_medium === "" ||
            document_file === ""
          );
        });
      }
  
      const submit = async () => {
        try {
          loading.value = true;
          console.log(documentDetails.value);
  
          const result = areAllPropertiesNull([documentDetails.value]);
  
          if (!result) {
            const response = await updateNIDoc(
              itemId,
              documentDetails.value
            );
            // console.log(response.error);
            if (!response.error) {
              // Handle successful API response
              //   console.log("API response:", response);
              showSuccessAlert(
                "Success",
                "National-International Document has been successfully Updated!"
              );
  
              router.push({ name: "ni-documents" });
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
        handleFileChange,
      };
    },
  });
  </script>
      