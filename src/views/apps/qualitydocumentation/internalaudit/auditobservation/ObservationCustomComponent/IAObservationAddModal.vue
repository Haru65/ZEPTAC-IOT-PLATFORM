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
    data-bs-focus="false"
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

              <!--begin::Input group-->
              <div class="row mb-6">
                <!--begin::Label-->
                <label
                  class="col-lg-3 col-form-label fw-semobold required fs-6 fw-bold text-gray-700 text-nowrap"
                  >Upload Evidence</label
                >
                <!--end::Label-->

                <!--begin::Col-->
                <div class="col-lg-9">
                  <!--begin::Row-->
                  <div class="row">
                    <!--begin::Col-->
                    <div
                      v-if="clauseDetails.evidence == ''"
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
                      v-else-if="clauseDetails.evidence != ''"
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
                              v-bind:href="`https://api.zeptac.com/storage/temporary/${clauseDetails.evidence}`"
                              v-tooltip
                              title="preview file"
                              class="underline"
                              >{{ clauseDetails.evidence }}
                            </a>
                          </h4>

                          <div class="fs-6 text-gray-600 pe-7">
                            {{ Data.file_size.toFixed(2) }} MB
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
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->

          <!--begin::Modal footer-->
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <button
              type="reset"
              @click="clear"
              id="kt_modal_new_address_cancel"
              class="btn btn-light me-3"
            >
              Discard
            </button>
            <!--end::Button-->

            <!--begin::Button-->
            <button
              id="kt_modal_new_address_submit"
              type="submit"
              ref="submitButtonRef"
              class="btn btn-primary me-2 px-6"
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
import { addIAuditObservation, removeImage, uploadImage } from "@/stores/api";
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

    const Data = ref({
      file_name: "",
      file_size: 0,
      file: "",
    });

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

    const dataLoading = ref(false);

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

      Data.value.file_size = selectedFile.size / (1024 * 1024);

      if (selectedFile.type === "application/pdf") {
        await uploadPDF(selectedFile);
      } else {
        Data.value.file = "";
      }

      console.log(Data.value);
    };

    const uploadPDF = async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("file_name", Data.value.file_name);

      const onUploadProgress = (progressEvent) => {
        const { loaded, total } = progressEvent;
        const percentage = Math.floor((loaded / total) * 100);
        uploadProgress.value = percentage;
      };

      try {
        await simulateUploadProgress();
        const response = await uploadImage(formData, onUploadProgress);
        clauseDetails.value.evidence = response.modifiedFileName;
        Data.value.file_name = response.modifiedFileName;
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        finalizeProgress();
      }

      Data.value.file = file;
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
        clauseDetails.value.evidence &&
        Data.value.file_name === ""
      ) {
        var confirmChange = confirm("Do you really want to change file?");
        if (!confirmChange) {
          return;
        }

        clauseDetails.value.evidence = "";
        // Continue with the rest of your code here
        return;
      }

      if (
        clauseDetails.value.evidence === "" &&
        Data.value.file_name === ""
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
          const response = await removeImage(Data.value);

          if (response.success) {
            clauseDetails.value.evidence = "";
            Data.value = {
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
      dataLoading.value = true;
      const result = validateForm(clauseDetails);

      if (result == false) {
        dataLoading.value = false;
        showErrorAlert("Warning", "Please fill all the details correctly.");
        return;
      }

      try {
        if (submitButtonRef.value) {
          // Activate indicator
          submitButtonRef.value.setAttribute("data-kt-indicator", "on");
        }

        // Call your API here
        const response = await addIAuditObservation(clauseDetails.value);

        if (response?.success) {
          await emit("addData", clauseDetails.value);

          // Handle successful API response
          dataLoading.value = false;
          showSuccessAlert(
            "Success",
            response.message || "Sub-Clause Added Successfully!"
          );
          clear();
          hideModal(newAddressModalRef.value);
        } else {
          // Handle API error response
          dataLoading.value = false;
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

      Data.value = {
        file_name: "",
        file_size: 0,
        file: "",
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
      data: props.data,
      dataLoading,
      handleFileChange,
      uploadProgress,
      Data,
      removeFileFromTemp,
    };
  },
});
</script>
    
    