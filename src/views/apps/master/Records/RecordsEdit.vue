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
          </div>

          <div class="modal-footer flex-center w-100">
            <!--begin::Button-->
            <span
              id="kt_modal_new_address_submit"
              ref="submitButtonRef"
              @click="submit()"
              class="btn btn-lg btn-primary w-sd-25 w-lg-25"
            >
              <span class="indicator-label"> Update </span>
              <span class="indicator-progress">
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
import { getRecord, updateRecord } from "@/stores/api";
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
  company_id: string;
  created_by: string;
  updated_by: string;
  is_active: string;
}

export default defineComponent({
  name: "record-edit",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  setup() {
    const submitButtonRef = ref<null | HTMLButtonElement>(null);

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

    const documentDetails = ref<Document>({
      document_section: "",
      document_name: "",
      issue_date: "",
      amendment_date: "",
      storage_medium: "",
      responsible_person: "",
      approval_status: "",
      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
      is_active: "1",
    });

    onMounted(async () => {
      try {
        let response = await getRecord(itemId.toString());
        if (response?.success) {
          documentDetails.value = {
            document_section: response.result.document_section,
            document_name: response.result.document_name,
            issue_date: response.result.issue_date,
            amendment_date: response.result.amendment_date,
            storage_medium: response.result.storage_medium,
            responsible_person: response.result.responsible_person,
            approval_status: response.result.approval_status,
            company_id: response.result.company_id
              ? response.result.company_id
              : "",
            created_by: response.result.created_by,
            updated_by: response.result.updated_by,
            is_active: response.is_active,
          };
        } else {
          console.error(
            `Error Occured in getRecord : ${
              response.message || "Error Occured in API"
            }`
          );
        }
      } catch (err) {
        console.error(`Error Occured in getRecord : ${err}`);
      }
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

    function areAllPropertiesNull(array) {
      return array.some((detail) => {
        const {
          document_section,
          document_name,
          issue_date,
          amendment_date,
          storage_medium,
          responsible_person,
        } = detail;

        // Check if any property is null or empty

        return (
          document_section === "" ||
          document_name === "" ||
          issue_date === "" ||
          amendment_date === "" ||
          storage_medium === "" ||
          responsible_person === ""
        );
      });
    }

    const submit = async () => {
      const result = areAllPropertiesNull([documentDetails.value]);

      if (result) {
        showErrorAlert("Warning", "Please fill all the details correctly.");
        return;
      }

      try {
        loading.value = true;

        if (submitButtonRef.value) {
          // Activate indicator
          submitButtonRef.value.setAttribute("data-kt-indicator", "on");
        }

        // Call your API here
        const response = await updateRecord(itemId, documentDetails.value);

        if (response?.success) {
          // Handle successful API response
          loading.value = false;
          showSuccessAlert(
            "Success",
            response.message || "Record has been successfully Updated!"
          );

          router.push({ name: "records" });
          loading.value = false;
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
      submitButtonRef,
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
      