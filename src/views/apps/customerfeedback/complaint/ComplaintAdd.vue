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
          :validation-schema="itemDetailsValidator"
          @submit="submit"
        >
          <!--begin::Card body-->
          <div class="card-body border-top p-sd-2 p-lg-9">
            <!--begin::Input group-->

            <div class="row mb-6">
              <!--begin::Label-->
              <label
                class="col-lg-3 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                >Customer Name</label
              >
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-9 fv-row">
                <Field
                  type="text"
                  name="customer_name"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter customer name"
                  v-model="itemDetails.customer_name"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="customer_name" />
                  </div>
                </div>
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
                  >Complaint Date</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <div class="block">
                  <el-date-picker
                    type="date"
                    name="complaint_date"
                    id="complaint_date"
                    v-model="itemDetails.complaint_date"
                    @change="setDates($event, 'complaint_date')"
                    placeholder="Pick Complaint Day"
                    :editable="false"
                  />
                </div>
                <div
                  class="fv-plugins-message-container mt-5"
                  v-if="!itemDetails.complaint_date"
                >
                  <div class="fv-help-block">
                    <ErrorMessage name="complaint_date" />
                  </div>
                </div>
                <!--end::Input-->
              </div>
              <!--end::Col-->

              <!--begin::Col-->
              <div class="col-md-6 fv-row mb-8 mb-sd-8">
                <!--end::Label-->
                <label
                  class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Complaint No.</label
                >
                <!--end::Label-->

                <Field
                  type="text"
                  name="complaint_no"
                  class="form-control form-control-lg form-control-solid"
                  v-model="itemDetails.complaint_no"
                  placeholder="Enter Complaint Number"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="complaint_no" />
                  </div>
                </div>
                <!--end::Input-->
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->

            <!-- extra fields -->
            <div class="row mb-6">
              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Details of Complaint</label
                >
                <Field
                  type="text"
                  as="textarea"
                  name="details_of_complaint"
                  rows="3"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Specify the complaint..."
                  v-model="itemDetails.details_of_complaint"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="details_of_complaint" />
                  </div>
                </div>
              </div>
              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Corrective Action</label
                >
                <Field
                  type="text"
                  as="textarea"
                  name="corrective_action"
                  rows="3"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Specify the action..."
                  v-model="itemDetails.corrective_action"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="corrective_action" />
                  </div>
                </div>
              </div>
            </div>
            <!--end::Input group-->

            <div class="row mb-6">
              <!--begin::Label-->
              <label
                class="col-lg-3 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                >Source of Complaint</label
              >
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-9 fv-row">
                <el-select
                  v-model="itemDetails.source_of_complaint"
                  filterable
                  placeholder="Select Source of Complaint..."
                >
                  <el-option
                    disabled="disabled"
                    value=""
                    label="Select Source of Complaint..."
                  >
                    Please Select Source
                  </el-option>
                  <el-option
                    v-for="item in SourceOfComplaint"
                    :key="item.id"
                    :label="item.source"
                    :value="item.id"
                  />
                </el-select>
                <div
                  class="fv-plugins-message-container"
                  v-if="!itemDetails.source_of_complaint"
                >
                  <div class="fv-help-block">
                    <ErrorMessage name="source_of_complaint" />
                  </div>
                </div>
              </div>
              <!--end::Col-->
            </div>

            <!-- extra fields -->
            <div class="row mb-6">
              <div class="form-group col-lg-12 col-md-12">
                <label
                  class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Comment by Customer</label
                >
                <Field
                  type="text"
                  as="textarea"
                  name="comment_by_customer"
                  rows="3"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Specify the action..."
                  v-model="itemDetails.comment_by_customer"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="comment_by_customer" />
                  </div>
                </div>
              </div>
            </div>
            <!--end::Input group-->

            <div class="row mb-6">
              <div class="form-group col-md-6 mb-8 mb-sd-8">
                <label
                  class="btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center"
                >
                  <!--begin::Info-->
                  <span class="d-block fw-semobold text-start">
                    <span class="fs-5 fw-bold text-gray-700 text-nowrap"
                      >Resolution Date</span
                    >
                    <div class="block">
                      <el-date-picker
                        type="date"
                        name="resolution_date"
                        id="resolution_date"
                        v-model="itemDetails.resolution_date"
                        @change="setDates($event, 'resolution_date')"
                        placeholder="Pick Resolution Day"
                        :editable="false"
                      />
                    </div>
                  </span>
                  <!--end::Info-->
                </label>
                <div
                  class="fv-plugins-message-container"
                  v-if="!itemDetails.resolution_date"
                >
                  <div class="fv-help-block">
                    <ErrorMessage name="resolution_date" />
                  </div>
                </div>
              </div>

              <div class="form-group col-md-6 mb-8 mb-sd-8">
                <label
                  class="btn btn-outline btn-outline-dashed btn-outline-default p-5 d-flex align-items-center"
                >
                  <!--begin::Info-->
                  <span class="d-block fw-semobold text-start">
                    <span class="text-gray-700 fw-bold d-block fs-6 mb-2"
                      >Complaint Status</span
                    >
                    <div class="btn-group" role="group">
                      <div v-for="status in ComplaintStatus" :key="status.id">
                        <input
                          type="radio"
                          class="btn-check"
                          name="complaint_status"
                          :id="`${status.id}`"
                          :value="status.id"
                          v-model="itemDetails.complaint_status"
                          autocomplete="off"
                        />
                        <label
                          :class="'btn btn-outline-primary'"
                          :for="`${status.id}`"
                        >
                          {{ status.status }}
                        </label>
                      </div>
                    </div>
                  </span>
                  <!--end::Info-->
                </label>
              </div>
            </div>
          </div>

          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <button
              type="reset"
              @click="clear"
              id="kt_modal_new_address_cancel"
              class="btn btn-light w-sd-25 w-lg-25 me-3"
            >
              Discard
            </button>
            <!--end::Button-->

            <!--begin::Button-->
            <button
              id="kt_modal_new_address_submit"
              type="submit"
              ref="submitButtonRef"
              class="btn btn-primary w-sd-25 w-lg-25 me-2 px-6"
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
            <!--end::Input group-->
          </div>
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
import { addComplaint } from "@/stores/api";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import packages from "@/core/config/PackagesConfig";
import { limit, Identifier } from "@/core/config/WhichUserConfig";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import ApiService from "@/core/services/ApiService";
import moment from "moment";

import { SourceOfComplaint, ComplaintStatus } from "@/core/model/complaints";

interface Complaint {
  customer_name: string;
  complaint_date: string;
  complaint_no: string;
  details_of_complaint: string;
  corrective_action: string;
  source_of_complaint: string;
  comment_by_customer: string;
  resolution_date: string;
  complaint_status: string;
  approval_status: string;
  company_id: string;
  created_by: string;
  updated_by: string;
  is_active: string;
}

export default defineComponent({
  name: "complaint-add",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  setup() {
    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const identifier = Identifier;
    const loading = ref(false);
    const auth = useAuthStore();
    const router = useRouter();
    const User = auth.GetUser();
    let limit = ref(500);

    const itemDetailsValidator = Yup.object().shape({
      customer_name: Yup.string().required().label("Customer Name"),
      complaint_no: Yup.string().required().label("Complaint No."),
      details_of_complaint: Yup.string()
        .required()
        .label("Details of Complaint"),
      corrective_action: Yup.string().required().label("Corrective Action"),
      source_of_complaint: Yup.string().notRequired().label("Source of Complaint"),
      comment_by_customer: Yup.string().required().label("Comment"),
    });

    const itemDetails = ref<Complaint>({
      customer_name: "",
      complaint_date: "",
      complaint_no: "",
      details_of_complaint: "",
      corrective_action: "",
      source_of_complaint: "",
      comment_by_customer: "",
      resolution_date: "",
      complaint_status: "1",
      approval_status: "1",
      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
      is_active: "1",
    });

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

    const submit = async () => {
      loading.value = true;
      const result = validateForm(itemDetails.value);

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

        const response = await addComplaint(itemDetails.value);
        if (response?.success) {
          showSuccessAlert(
            "Success",
            response.message || "Complaint has been successfully added!"
          );
          loading.value = false;
          router.push({ name: "complaint-list" });
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

    const clear = () => {
      itemDetails.value = {
        customer_name: "",
        complaint_date: "",
        complaint_no: "",
        details_of_complaint: "",
        corrective_action: "",
        source_of_complaint: "",
        comment_by_customer: "",
        resolution_date: "",
        complaint_status: "1",
        approval_status: "1",
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

    return {
      clear,
      submitButtonRef,
      itemDetails,
      itemDetailsValidator,
      getAssetPath,
      submit,
      loading,
      packages,
      limit,
      SourceOfComplaint,
      ComplaintStatus,
      setDates,
    };
  },
});
</script>
