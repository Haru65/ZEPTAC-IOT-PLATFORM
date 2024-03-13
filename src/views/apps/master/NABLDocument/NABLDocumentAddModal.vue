<template>
    <!--begin::Modal - New Address-->
    <div
      class="modal fade"
      ref="newAddressModalRef"
      id="kt_modal_internal_doc"
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
            :validation-schema="DocumentValidator"
            @submit="submit"
          >
            <!--begin::Modal header-->
            <div class="modal-header" id="kt_modal_new_address_header">
              <!--begin::Modal title-->
              <h2>Add NABL Document</h2>
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
              <!--end::Scroll-->
            </div>
            <!--end::Modal body-->
  
            <!--begin::Modal footer-->
            <div class="modal-footer flex-center">
              <!--begin::Button-->
              <span
                @click="clear"
                id="kt_modal_new_address_cancel"
                class="btn btn-light me-3"
              >
                Discard
              </span>
              <!--end::Button-->
  
              <!--begin::Button-->
              <button
                ref="submitButtonRef"
                id="kt_modal_new_address_submit"
                class="btn btn-primary"
              >
                <span class="indicator-label"> Submit </span>
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
  import { defineComponent, onMounted, ref } from "vue";
  import { ErrorMessage, Field, Form as VForm } from "vee-validate";
  import { hideModal } from "@/core/helpers/dom";
  import { useRouter } from "vue-router";
  import { useAuthStore } from "@/stores/auth";
  import Swal from "sweetalert2/dist/sweetalert2.js";
  import * as Yup from "yup";
  import moment from "moment";
  import { addNABLDoc } from "@/stores/api";
  
  interface NewAddressData {}
  
  interface Document {
    document_section: string;
    document_name: string;
    issue_date: string;
    amendment_date: string;
    storage_medium: string;
    document_file: string;
    company_id: string;
    created_by: string;
    updated_by: string;
    is_active: string;
  }
  
  export default defineComponent({
    name: "new-address-modal",
    components: {
      ErrorMessage,
      Field,
      VForm,
    },
  
    emits: ["document-added"],
    setup(props, { emit }) {
      const loading = ref(false);
      const auth = useAuthStore();
      const router = useRouter();
      const User = auth.GetUser();
  
      const submitButtonRef = ref<null | HTMLButtonElement>(null);
      const newAddressModalRef = ref<null | HTMLElement>(null);
      const newAddressData = ref<NewAddressData>({});
  
      const documentDetails = ref<Document>({
        document_section: "",
        document_name: "",
        issue_date: "",
        amendment_date: "",
        storage_medium: "",
        document_file: "",
        company_id: User.company_id,
        created_by: User.id,
        updated_by: User.id,
        is_active: "1",
      });
  
      const DocumentValidator = Yup.object().shape({
        document_section: Yup.string().required().label("Document number with section"),
        document_name: Yup.string().required().label("Document name"),
        storage_medium: Yup.string().required().label("Storage Medium"),
      });
  
      async function setDates(e, dateType) {
        if (e != null) {
          documentDetails.value[dateType] = moment(e).format("YYYY-MM-DD");
        } else {
          documentDetails.value[dateType] = "";
        }
        console.log(dateType, " ", documentDetails.value[dateType]);
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
  
      const clear = () => {
        documentDetails.value = {
          document_section: "",
          document_name: "",
          issue_date: "",
          amendment_date: "",
          storage_medium: "",
          document_file: "",
          company_id: User.company_id,
          created_by: User.id,
          updated_by: User.id,
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
  
      const submit = async (e) => {
        console.log(documentDetails.value);
  
        const result = areAllPropertiesNull([documentDetails.value]);
        if (!result) {
          try {
            // Call your API here with the form values
            const response = await addNABLDoc(documentDetails.value);
            // console.log(response.error);
            if (!response.error) {
              // Handle successful API response
              //   console.log("API response:", response);
              loading.value = false;
  
              showSuccessAlert("Success", "NABL Document Added Successfully!");
              clear();
  
              await emit("document-added");
              hideModal(newAddressModalRef.value);
              // clear();
            } else {
              // Handle API error response
              // const errorData = response.error;
              loading.value = false;
              showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
            }
          } catch (error) {
            // Handle any other errors during API call
            // console.error("API call error:", error);
            showErrorAlert("Error", "An error occurred during the API call.");
          } finally {
            loading.value = false;
          }
        } else {
          showErrorAlert("Warning", "Please fill all the details Correctly");
          return;
        }
      };
  
      return {
        newAddressData,
        documentDetails,
        DocumentValidator,
        submit,
        submitButtonRef,
        newAddressModalRef,
        setDates,
        handleFileChange,
        clear,
      };
    },
  });
  </script>
      
      