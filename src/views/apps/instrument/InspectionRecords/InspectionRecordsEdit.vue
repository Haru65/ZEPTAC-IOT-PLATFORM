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
          :validation-schema="itemValidator"
        >
          <!--begin::Card body-->
          <div class="card-body p-sd-2 p-lg-9">
            <!--begin::Input group-->

            <!-- extra fields -->
            <div class="row mb-6">
              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fw-semobold fw-bold text-gray-700 fs-6 text-nowrap"
                  >Instument Name</label
                >
                <div class="form-control form-control-lg form-control-solid">
                  {{ itemDetails.instrument.name }}
                </div>
              </div>

              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                  >Make</label
                >
                <div class="form-control form-control-lg form-control-solid">
                  {{ itemDetails.instrument.make }}
                </div>
              </div>
            </div>
            <!--end::Input group-->

            <!-- extra fields -->
            <div class="row mb-6">
              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                  >Model No.</label
                >
                <div class="form-control form-control-lg form-control-solid">
                  {{ itemDetails.instrument.model_no }}
                </div>
              </div>
              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                  >Serial No.</label
                >
                <div class="form-control form-control-lg form-control-solid">
                  {{ itemDetails.instrument.serial_no }}
                </div>
              </div>
            </div>

            <!--begin::Input group-->
            <div class="row mb-6">
              <!--begin::Col-->
              <div class="col-md-6 fv-row mb-8 mb-sd-8">
                <!--begin::Label-->
                <label
                  class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Installation Date</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-date-picker
                  type="date"
                  name="installation_date"
                  id="installation_date"
                  v-model="itemDetails.installation_date"
                  @change="setDates($event, 'installation_date')"
                  placeholder="Pick a day"
                  :editable="false"
                />
                <div
                  class="fv-plugins-message-container mt-3"
                  v-if="!itemDetails.installation_date"
                >
                  <div class="fv-help-block">
                    <ErrorMessage name="installation_date" />
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
                <label class="required fs-5 fw-bold text-gray-700 mb-2"
                  >Is the condition at the time of handover after installation
                  satisfactory? Yes/No</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <div>
                  <el-select
                    v-model="itemDetails.satisfactory"
                    filterable
                    placeholder="--Select--"
                  >
                    <el-option label="Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                </div>
                <!--end::Col-->
                <div
                  class="fv-plugins-message-container mt-3"
                  v-if="!itemDetails.satisfactory"
                >
                  <div class="fv-help-block">
                    <ErrorMessage name="satisfactory" />
                  </div>
                </div>
                <!--end::Input-->
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->

            <div class="row mb-6">
              <div class="form-group col-lg-12 col-md-12">
                <label
                  class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Installation Details</label
                >
                <Field
                  type="text"
                  as="textarea"
                  name="installation_details"
                  rows="5"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter the installation detail..."
                  v-model="itemDetails.installation_details"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="installation_details" />
                  </div>
                </div>
              </div>
            </div>

            <div class="row mb-6">
              <div class="form-group col-lg-12 col-md-12">
                <label
                  class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Training Details Commands</label
                >
                <Field
                  type="text"
                  as="textarea"
                  name="training_details"
                  rows="5"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter the training details..."
                  v-model="itemDetails.training_details"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="training_details" />
                  </div>
                </div>
              </div>
            </div>

            <div class="row mb-6">
              <div class="form-group col-lg-12 col-md-12">
                <label
                  class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Remarks</label
                >
                <Field
                  type="text"
                  as="textarea"
                  name="remarks"
                  rows="5"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Specify remark..."
                  v-model="itemDetails.remarks"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="remarks" />
                  </div>
                </div>
              </div>
            </div>

            <div
              class="row mb-6"
              v-if="
                Identifier == 'Admin' ||
                Identifier == 'Company-Admin' ||
                Identifier == 'Commercial-Executive'
              "
            >
              <div class="form-group col-md-12 mb-8 mb-sd-8">
                <label
                  class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap"
                  >Select Approval Status
                </label>
                <div class="input-group gap-6">
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      value="1"
                      v-model="itemDetails.approval_status"
                      id="pending"
                      name="approval_status"
                    />
                    <label
                      for="pending"
                      class="form-check-label fw-bold text-gray-700 text-nowrap"
                      >Pending</label
                    >
                  </div>

                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      value="2"
                      v-model="itemDetails.approval_status"
                      id="reject"
                      name="approval_status"
                    />
                    <label
                      for="reject"
                      class="form-check-label fw-bold text-gray-700 text-nowrap"
                      >Reject</label
                    >
                  </div>

                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      value="3"
                      v-model="itemDetails.approval_status"
                      id="approve"
                      name="approval_status"
                    />
                    <label
                      for="approve"
                      class="form-check-label fw-bold text-gray-700 text-nowrap"
                      >Approve</label
                    >
                  </div>
                </div>
              </div>
              <!--end::Input group-->
            </div>

            <!--end::Input group-->
          </div>

          <div class="modal-footer flex-center w-100">
            <!--begin::Button-->
            <span
              ref="submitButton"
              class="btn btn-primary w-sd-25 w-lg-25"
              @click.prevent="submit"
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
import { defineComponent, onMounted, ref, reactive } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { updateInspectionRecord, getInspectionRecord } from "@/stores/api";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import packages from "@/core/config/PackagesConfig";
import { limit, Identifier } from "@/core/config/WhichUserConfig";
import { useAuthStore } from "@/stores/auth";
import { useRoute, useRouter } from "vue-router";
import ApiService from "@/core/services/ApiService";
import moment from "moment";

export default defineComponent({
  name: "inspection-records-edit",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  setup() {
    const submitButton = ref<null | HTMLButtonElement>(null);

    const loading = ref(false);
    const auth = useAuthStore();
    const router = useRouter();
    const route = useRoute();
    const User = auth.GetUser();
    let limit = ref(500);

    const itemId = route.params.id;

    const itemValidator = Yup.object().shape({
      installation_date: Yup.string().required().label("Installation Date"),
      installation_details: Yup.string()
        .required()
        .label("Installation detail"),
      training_details: Yup.string().required().label("Training detail"),
      remarks: Yup.string().required().label("Remark"),
    });

    const itemDetails = ref({
      instrument_id: "",
      satisfactory: "",
      instrument: ref({
        name: "",
        make: "",
        model_no: "",
        serial_no: "",
      }),

      installation_date: "",
      installation_details: "",
      training_details: "",
      remarks: "",
      approval_status: "",

      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
      is_active: "1",
    });

    onMounted(async () => {
      try {
        let response = await getInspectionRecord(itemId.toString());

        if (response.success) {
          itemDetails.value.instrument.name = response.result.instrument.name;
          itemDetails.value.instrument.make = response.result.instrument.make;
          itemDetails.value.instrument.model_no =
            response.result.instrument.model_no;
          itemDetails.value.instrument.serial_no =
            response.result.instrument.serial_no;

          itemDetails.value.instrument_id = response.result.instrument_id;
          itemDetails.value.satisfactory = response.result.satisfactory;
          itemDetails.value.installation_date =
            response.result.installation_date;
          itemDetails.value.installation_details =
            response.result.installation_details;
          itemDetails.value.training_details = response.result.training_details;
          itemDetails.value.remarks = response.result.remarks;
          itemDetails.value.approval_status = response.result.approval_status;
          itemDetails.value.company_id = response.result.company_id
            ? response.result.company_id
            : "";
          itemDetails.value.created_by = response.result.created_by;
          itemDetails.value.updated_by = response.result.updated_by;
          itemDetails.value.is_active = response.result.is_active;
        }
      } catch (error) {
        showErrorAlert("Error", "An error occurred during the API call.");
        loading.value = false;
      }
    });

    /* --------SET DATE LOGIC--------*/
    async function setDates(e, dateType) {
      try {
        if (e != null) {
          if (e != "" && e != null) {
            itemDetails.value[dateType] = moment(e).format("YYYY-MM-DD");
          } else {
            itemDetails.value[dateType] = "";
          }
        } else {
          itemDetails.value[dateType] = "";
        }
      } catch (err) {
        itemDetails.value[dateType] = "";
      }
      console.log(itemDetails.value[dateType]);
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

    const submit = async () => {
      loading.value = true;

      const result = validateForm(itemDetails.value);

      if (result == false) {
        showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
        loading.value = false;
        return;
      }

      try {
        if (submitButton.value) {
          // Activate indicator
          submitButton.value.setAttribute("data-kt-indicator", "on");
        }

        // Call your API here
        const response = await updateInspectionRecord(
          itemId,
          itemDetails.value
        );

        if (response?.success) {
          // Handle successful API response

          showSuccessAlert(
            "Success",
            response.message ||
              "Inspection Record has been successfully updated!"
          );
          loading.value = false;
          router.push({ name: "inspection-records-list" });
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
        if (submitButton.value) {
          submitButton.value.removeAttribute("data-kt-indicator");
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
      submitButton,
      Identifier,
      itemDetails,
      getAssetPath,
      submit,
      loading,
      packages,
      limit,
      setDates,
      itemValidator,
    };
  },
});
</script>
        
        <style>
.el-input__inner,
.el-select__inner {
  font-weight: 500;
}
.el-input__wrapper,
.el-select__wrapper {
  min-height: 3.5rem;
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