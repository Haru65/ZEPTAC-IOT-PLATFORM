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
              <!--begin::Col-->
              <div class="col-md-6 fv-row mb-8 mb-sd-8">
                <!--begin::Label-->
                <label
                  class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Responsible Person</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <Field
                  type="text"
                  name="responsible_person"
                  v-model="documentDetails.responsible_person"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter Responsible Person"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="responsible_person" />
                  </div>
                </div>
                <!--end::Input-->
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->

            <div class="row mb-6" v-if="documentDetails.document_file == ''">
              <div class="form-group col-md-12 mb-8 mb-sd-8">
                <label
                  class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap"
                >
                  Upload File
                </label>
                <div class="position-relative">
                  <label
                    class="w-100 min-h-100px btn btn-outline btn-outline-dashed btn-outline-default d-flex align-items-center position-relative"
                  >
                    <div
                      class="m-6 position-absolute fs-1 top-50 start-50 translate-middle"
                    >
                      <i class="bi bi-upload fs-1"></i>

                      <p class="fs-3 text-gray-700">Browse File to upload</p>
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
            </div>

            <div
              v-if="documentDetails.document_file != '' && data.file_name == ''"
              class="notice d-flex bg-light-primary rounded border-primary border border min-w-lg-600px flex-shrink-0 p-6"
            >
              <!--begin::Icon-->
              <KTIcon icon-name="file" icon-class="fs-2tx text-primary me-4" />
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
                      v-bind:href="`https://api.zeptac.com/storage/company/${documentDetails.company_id}/qms/${documentDetails.document_file}`"
                      data-toggle="tooltip"
                      title="preview file"
                      class="underline"
                      >{{ documentDetails.document_file }}
                    </a>
                  </h4>
                </div>
                <!--end::Content-->

                <!--begin::Action-->

                <KTIcon
                  data-toggle="tooltip"
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
              <KTIcon icon-name="file" icon-class="fs-2tx text-primary me-4" />
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
                      v-bind:href="`https://api.zeptac.com/storage/temporary/${documentDetails.document_file}`"
                      data-toggle="tooltip"
                      title="preview file"
                      class="underline"
                      >{{ documentDetails.document_file }}
                    </a>
                  </h4>

                  <div class="fs-6 text-gray-600 pe-7">
                    {{ data.file_size.toFixed(2) }} MB
                  </div>
                </div>
                <!--end::Content-->

                <!--begin::Action-->

                <KTIcon
                  data-toggle="tooltip"
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
  getQMSProcedure,
  removeImage,
  updateQMSProcedure,
  uploadImage,
} from "@/stores/api";
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
  responsible_person: string;
  approval_status: string;
  document_file: string;
  company_id: string;
  created_by: string;
  updated_by: string;
  is_active: string;
}

export default defineComponent({
  name: "qms-procedure-edit",
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
      responsible_person: Yup.string().required().label("Responsible Person"),
    });

    const data = ref({
      file_name: "",
      file_size: 0,
      file: "",
    });

    const documentDetails = ref<Document>({
      document_section: "",
      document_name: "",
      issue_date: "",
      amendment_date: "",
      storage_medium: "",
      responsible_person: "",
      document_file: "",
      approval_status: "",
      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
      is_active: "1",
    });

    onMounted(async () => {
      let response = await getQMSProcedure(itemId.toString());
      console.log(response);
      documentDetails.value = {
        document_section: response.document_section,
        document_name: response.document_name,
        issue_date: response.issue_date,
        amendment_date: response.amendment_date,
        storage_medium: response.storage_medium,
        responsible_person: response.responsible_person,
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
        documentDetails.value.document_file = response.modifiedFileName;
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
      if (documentDetails.value.document_file && data.value.file_name === "") {
        var confirmChange = confirm("Do you really want to change file?");
        if (!confirmChange) {
          return;
        }

        documentDetails.value.document_file = "";
        // Continue with the rest of your code here
        return;
      }

      if (
        documentDetails.value.document_file === "" &&
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
            documentDetails.value.document_file = "";
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

    function areAllPropertiesNull(array) {
      return array.some((detail) => {
        const {
          document_section,
          document_name,
          issue_date,
          amendment_date,
          storage_medium,
          responsible_person,
          document_file,
        } = detail;

        // Check if any property is null or empty

        return (
          document_section === "" ||
          document_name === "" ||
          issue_date === "" ||
          amendment_date === "" ||
          storage_medium === "" ||
          responsible_person === "" ||
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
          const response = await updateQMSProcedure(
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

            router.push({ name: "qms-procedures" });
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
      uploadProgress,
      data,
      removeFileFromTemp,
    };
  },
});
</script>
    