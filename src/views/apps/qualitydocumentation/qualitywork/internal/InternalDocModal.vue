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
          :validation-schema="DocumentValidator"
          @submit="submit"
        >
          <!--begin::Modal header-->
          <div class="modal-header" id="kt_modal_new_address_header">
            <!--begin::Modal title-->
            <h2>Add Internal Document</h2>
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
import { defineComponent, onMounted, ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { hideModal } from "@/core/helpers/dom";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";
import moment from "moment";
import { addInternalDoc } from "@/stores/api";

interface NewAddressData {}

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

    const DocumentValidator = Yup.object().shape({
      document_name: Yup.string().required().label("Document name"),
      format_no: Yup.string().required().label("Format number"),
      location: Yup.string().required().label("Location"),
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

    const clear = () => {
      documentDetails.value = {
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

    const submit = async () => {
      loading.value = true;
      const result = validateForm(documentDetails.value);

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

        const response = await addInternalDoc(documentDetails.value);
        if (response?.success) {
          await emit("document-added");
          hideModal(newAddressModalRef.value);

          loading.value = false;
          showSuccessAlert(
            "Success",
            response.message || "Document Added Successfully!"
          );
          clear();
          hideModal(newAddressModalRef.value);
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

    return {
      newAddressData,
      documentDetails,
      DocumentValidator,
      submit,
      submitButtonRef,
      newAddressModalRef,
      setDates,
      clear,
    };
  },
});
</script>
  
  