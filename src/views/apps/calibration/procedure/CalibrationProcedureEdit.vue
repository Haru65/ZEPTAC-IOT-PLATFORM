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
                          @change="setDates($event, 'issue_date')"
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
                          @change="setDates($event, 'revision_date')"
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
  
              <!--begin::Input group-->
              <div class="row mb-6">
                <!--begin::Label-->
                <label class="col-lg-3 col-form-label fw-semobold fs-6"
                  >PDF Document</label
                >
                <!--end::Label-->
  
                <!--begin::Col-->
                <div class="col-lg-9">
                  <!--begin::Row-->
                  <div class="row">
                    <!--begin::Col-->
                    <div
                      v-if="procedureDetails.audit_document == ''"
                      class="form-group col-md-12 mb-8 mb-sd-8"
                    >
                      <div class="position-relative">
                        <label
                          class="w-100 bg-gray-200 min-h-100px btn btn-outline btn-outline-dashed btn-outline-default d-flex align-items-center position-relative"
                        >
                          <div
                            class="m-6 position-absolute fs-1 top-50 start-50 translate-middle"
                          >
                            <i class="bi bi-upload fs-1"></i>
  
                            <p class="fs-3 text-gray-700">
                              Browse File to upload
                            </p>
                          </div>
                          <input
                            type="file"
                            @change="handleFileChange"
                            accept=".pdf"
                            class="position-absolute top-0 start-0 end-0 bottom-0 opacity-0 w-100 h-100"
                          />
                        </label>
                      </div>
                      <div
                        v-if="
                          uploadProgress &&
                          uploadProgress > 0 &&
                          uploadProgress <= 100
                        "
                        class="h-10px min-w-100 d-flex flex-stack py-4"
                      >
                        <div
                          class="progress progress-bar bg-primary d-flex align-items-center justify-content-center"
                          role="progressbar"
                          :style="`width: ${uploadProgress}%`"
                          :aria-valuenow="uploadProgress"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                        <div class="d-flex flex-column align-items-end ms-2">
                          {{ `${uploadProgress}%` }}
                        </div>
                      </div>
                    </div>
                    <div
                      v-if="
                        procedureDetails.audit_document != '' &&
                        data.file_name == ''
                      "
                      class="notice d-flex bg-light-primary rounded border-primary border min-w-lg-600px flex-shrink-0 p-6"
                    >
                      <!--begin::Icon-->
                      <KTIcon
                        icon-name="file"
                        icon-class="fs-2tx text-primary me-4"
                      />
                      <!--end::Icon-->
  
                      <!--begin::Wrapper-->
                      <div
                        class="d-flex flex-stack flex-grow-1 flex-wrap flex-md-nowrap"
                      >
                        <!--begin::Content-->
                        <div class="mb-3 mb-md-0 fw-semobold">
                          <h4 class="text-gray-800 fw-bold cursor-pointer">
                            <a
                              target="blank"
                              v-bind:href="`https://api.zeptac.com/storage/company/${procedureDetails.company_id}/calibrations/${procedureDetails.audit_document}`"
                              v-tooltip
                              title="preview file"
                              class="underline"
                              >{{ procedureDetails.audit_document }}
                            </a>
                          </h4>
                        </div>
                        <!--end::Content-->
  
                        <!--begin::Action-->
  
                        <KTIcon
                          v-tooltip
                          title="remove file"
                          icon-name="cross"
                          class="cursor-pointer fs-2tx text-danger rounded"
                          @click="removeFileFromTemp"
                          icon-class="fs-1"
                        />
                        <!--end::Action-->
                      </div>
                      <!--end::Wrapper-->
                    </div>
                    <div
                      v-else-if="data.file_name != ''"
                      class="notice d-flex bg-light-primary rounded border-primary border min-w-lg-600px flex-shrink-0 p-6"
                    >
                      <!--begin::Icon-->
                      <KTIcon
                        icon-name="file"
                        icon-class="fs-2tx text-primary me-4"
                      />
                      <!--end::Icon-->
  
                      <!--begin::Wrapper-->
                      <div
                        class="d-flex flex-stack flex-grow-1 flex-wrap flex-md-nowrap"
                      >
                        <!--begin::Content-->
                        <div class="mb-3 mb-md-0 fw-semobold">
                          <h4 class="text-gray-800 fw-bold cursor-pointer">
                            <a
                              target="blank"
                              v-bind:href="`https://api.zeptac.com/storage/temporary/${procedureDetails.audit_document}`"
                              v-tooltip
                              title="preview file"
                              class="underline"
                              >{{ procedureDetails.audit_document }}
                            </a>
                          </h4>
                          <div class="fs-6 text-gray-600 pe-7">
                            {{ data.file_size.toFixed(2) }} MB
                          </div>
                        </div>
                        <!--end::Content-->
  
                        <!--begin::Action-->
  
                        <KTIcon
                          v-tooltip
                          title="remove file"
                          icon-name="cross"
                          class="cursor-pointer fs-2tx text-danger rounded"
                          @click="removeFileFromTemp"
                          icon-class="fs-1"
                        />
                        <!--end::Action-->
                      </div>
                      <!--end::Wrapper-->
                    </div>
                    <!--end::Col-->
                  </div>
                  <!--end::Row-->
                </div>
                <!--end::Col-->
              </div>
              <!--end::Input group-->
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
    getCalibrationProcedure,
    updateCalibrationProcedure,
    removeImage,
    uploadImage,
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
    audit_document: string;
    company_id: string;
    created_by: string;
    updated_by: string;
    is_active: string;
  }
  
  export default defineComponent({
    name: "calibration-procedure-edit",
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
        audit_document: Yup.string().required().label("Pdf"),
      });
  
      const data = ref({
        file_name: "",
        file_size: 0,
        file: "",
      });
  
      const procedureDetails = ref<procedures>({
        document_name: "",
        issue_date: "",
        issue_no: "",
        revision_date: "",
        revision_no: "",
        prepared_by: "",
        approved_by: "",
        audit_document: "",
        company_id: User.company_id,
        created_by: User.id,
        updated_by: User.id,
        is_active: "1",
      });
  
      onMounted(async () => {
        try {
          let response = await getCalibrationProcedure(itemId.toString());
  
          if (response.success) {
            procedureDetails.value = {
              document_name: response.result.document_name,
              issue_date: response.result.issue_date,
              issue_no: response.result.issue_no,
              revision_date: response.result.revision_date,
              revision_no: response.result.revision_no,
              prepared_by: response.result.prepared_by,
              approved_by: response.result.approved_by,
              audit_document: response.result.audit_document
                ? response.result.audit_document
                : "",
              company_id: response.result.company_id
                ? response.result.company_id
                : "",
              created_by: response.result.created_by,
              updated_by: response.result.updated_by,
              is_active: response.result.is_active,
            };
          } else {
            console.error(
              `Error Occured in getCalibrationProcedure : ${
                response.message || "Error Occured in API"
              }`
            );
          }
        } catch (err) {
          console.error(`Error Occured in getCalibrationProcedure : ${err}`);
        }
      });
  
      const uploadProgress = ref<number>(0);
  
      const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB
  
      const handleFileChange = async (event) => {
        const selectedFile = event.target?.files?.[0];
  
        if (!selectedFile) {
          alert("Please Select a file");
          return;
        }
  
        if (selectedFile.size > MAX_FILE_SIZE) {
          alert("File size should be less than 2 MB");
          return;
        }
  
        data.value.file_size = selectedFile.size / (1024 * 1024);
  
        if (selectedFile.type === "application/pdf") {
          await uploadPDF(selectedFile);
        } else {
          data.value.file = "";
        }
  
        console.log(data.value);
      };
  
      const uploadPDF = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("file_name", data.value.file_name);
  
        const onUploadProgress = (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percentage = Math.floor((loaded / total) * 100);
          uploadProgress.value = percentage;
        };
  
        try {
          await simulateUploadProgress();
          const response = await uploadImage(formData, onUploadProgress);
          procedureDetails.value.audit_document = response.modifiedFileName;
          data.value.file_name = response.modifiedFileName;
        } catch (error) {
          console.error("Error uploading file:", error);
        } finally {
          finalizeProgress();
        }
  
        data.value.file = file;
      };
  
      const simulateUploadProgress = async () => {
        uploadProgress.value = 0;
        const interval = setInterval(() => {
          if (uploadProgress.value < 100) {
            uploadProgress.value += 10; // Adjust this value for smoother progress
          } else {
            clearInterval(interval);
          }
        }, 200); // Adjust the interval duration as needed
      };
  
      const finalizeProgress = () => {
        uploadProgress.value = 100; // Ensure progress bar is complete
        setTimeout(() => {
          uploadProgress.value = 0; // Reset progress bar after a short delay
        }, 100);
      };
  
      const removeFileFromTemp = async () => {
        if (
          procedureDetails.value.audit_document &&
          data.value.file_name === ""
        ) {
          var confirmChange = confirm("Do you really want to change file?");
          if (!confirmChange) {
            return;
          }
  
          procedureDetails.value.audit_document = "";
          // Continue with the rest of your code here
          return;
        }
  
        if (
          procedureDetails.value.audit_document === "" &&
          data.value.file_name === ""
        ) {
          alert("You already removed the file. Please select a new file.");
          return;
        }
  
        const deleteConfirmation = async () => {
          try {
            const result = await Swal.fire({
              title: "Are you sure?",
              text: "You want to change the file!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "red",
              confirmButtonText: "Yes, I am sure!",
            });
            return result.isConfirmed;
          } catch (error) {
            const errorMessage = "An unknown error occurred";
            showErrorAlert("Error", errorMessage);
            return false;
          }
        };
  
        const deleteFromServer = async () => {
          try {
            const response = await removeImage(data.value);
  
            if (response.success) {
              procedureDetails.value.audit_document = "";
              data.value = {
                file_name: "",
                file_size: 0,
                file: "",
              };
  
              showSuccessAlert(
                "Success",
                response.message || `File removed successfully.`
              );
              return { success: true };
            } else {
              throw new Error(response.message || "Failed to remove the file.");
            }
          } catch (error: any) {
            const errorMessage =
              error.response?.data?.message ||
              error.message ||
              "An unknown error occurred";
            showErrorAlert("Error", errorMessage);
            return { success: false, message: errorMessage };
          }
        };
  
        const isConfirmed = await deleteConfirmation();
        if (isConfirmed) {
          return await deleteFromServer();
        } else {
          return { success: false };
        }
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
            audit_document,
          } = data;
  
          // Check if any property is null or empty
  
          return (
            document_name !== "" &&
            issue_date !== "" &&
            issue_no !== "" &&
            revision_date !== "" &&
            revision_no !== "" &&
            prepared_by !== "" &&
            approved_by !== "" &&
            audit_document !== ""
          );
        });
      }
  
      /* --------SET DATE LOGIC--------*/
      async function setDates(e, dateType) {
        try {
          if (e != null) {
            if (e != "" && e != null) {
              procedureDetails.value[dateType] = moment(e).format("YYYY-MM-DD");
            } else {
              procedureDetails.value[dateType] = "";
            }
          } else {
            procedureDetails.value[dateType] = "";
          }
        } catch (err) {
          procedureDetails.value[dateType] = "";
        }
        console.log(procedureDetails.value[dateType]);
      }
  
      const submit = async () => {
        loading.value = true;
  
        try {
          const result = areAllPropertiesNotNull([procedureDetails.value]);
  
          if (result) {
            const response = await updateCalibrationProcedure(
              itemId,
              procedureDetails.value
            );
            if (response.success) {
              // Handle successful API response
              //   console.log("API response:", response);
              showSuccessAlert(
                "Success",
                response.message || "Document has been successfully Updated!"
              );
  
              // clear();
              router.push({ name: "calibration-procedure-list" });
              loading.value = false;
            } else {
              // Handle API error response
              loading.value = false;
              showErrorAlert("Error", response.message || "An error occurred.");
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
        setDates,
        handleFileChange,
  
        uploadProgress,
        data,
        removeFileFromTemp,
      };
    },
  });
  </script>
  