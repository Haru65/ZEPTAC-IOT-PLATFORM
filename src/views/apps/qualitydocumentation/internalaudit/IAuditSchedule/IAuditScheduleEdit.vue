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
        >
          <!--begin::Card body-->
          <div class="card-body border-top p-6">
            <!-- extra fields -->
            <div class="row mb-6">
              <div class="form-group col-lg-12 col-md-12">
                <label
                  class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Auditor Name</label
                >
                <Field
                  type="text"
                  name="auditor_name"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter the Auditor Name..."
                  v-model="itemDetails.auditor_name"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="auditor_name" />
                  </div>
                </div>
              </div>
            </div>
            <!--end::Input group-->

            <!-- extra fields -->
            <div class="row mb-6">
              <div class="form-group col-lg-12 col-md-12">
                <label
                  class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Address</label
                >
                <Field
                  type="text"
                  as="textarea"
                  name="address"
                  rows="3"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter the address..."
                  v-model="itemDetails.address"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="address" />
                  </div>
                </div>
              </div>
            </div>
            <!--end::Input group-->

            <!-- extra fields -->
            <div class="row mb-6">
              <div class="form-group col-lg-12 col-md-12">
                <label
                  class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Meeting Place</label
                >
                <Field
                  type="text"
                  name="meeting_place"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter the meeting place..."
                  v-model="itemDetails.meeting_place"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="meeting_place" />
                  </div>
                </div>
              </div>
            </div>
            <!--end::Input group-->

            <!-- extra fields -->
            <div class="row mb-6">
              <div class="form-group col-lg-12 col-md-12">
                <label
                  class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Auditee's Name</label
                >
                <el-form-item>
                  <el-select
                    v-model="itemDetails.auditees"
                    multiple
                    filterable
                    placeholder="Enter name and select it to add..."
                  >
                    <el-option
                      v-for="(item, index) in Employees"
                      :key="index"
                      :label="`${item.first_name} ${item.last_name}`"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
                <div
                  class="fv-plugins-message-container mt-0"
                  v-if="!itemDetails.auditees.length"
                >
                  <div class="fv-help-block">
                    <ErrorMessage name="auditees" />
                  </div>
                </div>
              </div>
            </div>

            <!-- extra fields -->
            <div class="row mb-6">
              <div class="form-group col-lg-12 col-md-12">
                <label
                  class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Audit Area</label
                >
                <Field
                  type="text"
                  as="textarea"
                  name="audit_area"
                  rows="3"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter the aduit area..."
                  v-model="itemDetails.audit_area"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="audit_area" />
                  </div>
                </div>
              </div>
            </div>
            <!--end::Input group-->

            <!-- extra fields -->
            <div class="row mb-6">
              <div class="form-group col-lg-12 col-md-12">
                <label
                  class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Scope of Audit</label
                >
                <Field
                  type="text"
                  as="textarea"
                  name="scope"
                  rows="3"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter the scope of audit..."
                  v-model="itemDetails.scope"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="scope" />
                  </div>
                </div>
              </div>
            </div>
            <!--end::Input group-->
          </div>
          <div class="modal-footer flex-center">
            <span
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-lg btn-primary w-sd-25 w-lg-25"
              @click="submit()"
            >
              <span v-if="!loading" class="indicator-label"> Update </span>
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
  getIAuditSchedule,
  updateIAuditSchedule,
  getEmployees,
} from "@/stores/api";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import packages from "@/core/config/PackagesConfig";
import { limit, Identifier } from "@/core/config/WhichUserConfig";
import { useAuthStore } from "@/stores/auth";
import { useRoute, useRouter } from "vue-router";
import ApiService from "@/core/services/ApiService";
import moment from "moment";

import { Agendas } from "@/core/model/mrm";

interface Item {
  id: string;
  auditor_name: string;
  address: string;
  meeting_place: string;
  auditees: [];
  audit_area: string;
  scope: string;
  company_id: string;
  created_by: string;
  updated_by: string;
  is_active: string;
}

export default defineComponent({
  name: "auditschedule-edit",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  setup() {
    const identifier = Identifier;
    const loading = ref(false);
    const auth = useAuthStore();
    const router = useRouter();
    const User = auth.GetUser();
    const route = useRoute();
    const itemId = route.params.id;

    const Employees = ref([{ id: "", first_name: "", last_name: "" }]);

    const itemDetailsValidator = Yup.object().shape({
      auditor_name: Yup.string().required().label("Audit Name"),
      address: Yup.string().required().label("Adreess"),
      meeting_place: Yup.string().required().label("Meeting place"),
      audit_area: Yup.string().required().label("Audit Area"),
      scope: Yup.string().required().label("Audit Scope"),
    });

    const itemDetails = ref<Item>({
      id: "",
      auditor_name: "",
      address: "",
      meeting_place: "",
      auditees: [],
      audit_area: "",
      scope: "",
      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
      is_active: "1",
    });

    onMounted(async () => {
      Employees.value.pop();

      try {
        ApiService.setHeader();
        const response = await getEmployees(`fetchAll=true`);
        if (response.result != null && response.result) {
          Employees.value.push(
            ...response.result?.map(({ id, first_name, last_name }) => ({
              id,
              first_name,
              last_name,
            }))
          );
        }
      } catch (error) {
        showErrorAlert("Error", "An error occurred during the API call.");
        loading.value = false;
      }

      try {
        let response = await getIAuditSchedule(itemId.toString());
        console.log(response);
        itemDetails.value = {
          id: response.id,
          auditor_name: response.auditor_name,
          address: response.address,
          meeting_place: response.meeting_place,
          auditees: JSON.parse(response.auditees),
          audit_area: response.audit_area,
          scope: response.scope,

          company_id: response.company_id ? response.company_id : "",
          created_by: response.created_by,
          updated_by: response.updated_by,
          is_active: response.is_active,
        };
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
      loading.value = true;

      console.log(itemDetails.value);
      try {
        if (itemDetails.value.auditees.length === 0) {
          showErrorAlert("Warning", "Please Select Atleast One Auditee");
          loading.value = false;
          return;
        }

        if (validateForm(itemDetails.value)) {
          const response = await updateIAuditSchedule(
            itemId,
            itemDetails.value
          );
          if (!response.error) {
            showSuccessAlert(
              "Success",
              "Internal Audit Schedule has been successfully updated!"
            );
            loading.value = false;
            router.push({ name: "auditschedule-list" });
          } else {
            showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
            loading.value = false;
            return;
          }
        } else {
          console.log(validateForm(itemDetails));
          showErrorAlert("Warning", "Please fill in all fields.");
          return;
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
      itemDetails,
      itemDetailsValidator,
      getAssetPath,
      submit,
      loading,
      packages,
      limit,
      setDates,
      Agendas,
      Employees,
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

.trainer-container {
  display: flex;
  align-items: center;
  margin-right: 10px; /* Adjust as needed */
  background-color: #000; /* Optional background color for each trainer container */
  padding: 5px 10px; /* Optional padding */
  border-radius: 5px; /* Optional border radius */
}
.tagify-remove {
  margin-left: 5px; /* Optional margin between the name and the 'X' button */
}
.override-styles {
  z-index: 99999 !important;
  pointer-events: initial;
}
</style>