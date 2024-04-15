<template>
  <VForm id="kt_account_profile_details_form" class="form" 
    novalidate
    :validation-schema="itemDetailsValidator">
    <!--begin::Basic info-->
    <div class="card mb-5 mb-xl-10 p-6 pb-12">
      <!--begin::Card header-->
      <div
        class="card-header border-0 cursor-pointer"
        role="button"
        data-bs-toggle="collapse"
        data-bs-target="#kt_account_profile_details"
        aria-expanded="true"
        aria-controls="kt_account_profile_details"
      >
        <!--begin::Card title-->
        <div class="card-title m-0">
          <h3 class="fw-bold m-0">Risk Identification</h3>
        </div>
        <!--end::Card title-->
      </div>
      <!--begin::Card header-->

      <!--begin::Content-->
      <div id="kt_account_profile_details" class="collapse show">
        <!--begin::Form-->
        <!--begin::Card body-->
        <div class="card-body p-9">
          <div class="row mb-6">
            <!--begin::Col-->
            <div class="col-md-6 fv-row">
              <!--begin::Label-->
              <label
                class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                >Clause No.</label
              >
              <!--end::Label-->

              <!--begin::Input-->
              <Field
                type="text"
                name="clause_no"
                v-model="itemDetails.clause_no"
                class="form-control form-control-lg form-control-solid"
                placeholder="Clause no."
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="clause_no" />
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
                >Description</label
              >
              <!--end::Label-->

              <!--begin::Input-->
              <Field
                type="text"
                as="textarea"
                rows="5"
                name="description"
                v-model="itemDetails.risk_identification.description"
                class="form-control form-control-lg form-control-solid"
                placeholder="Enter description of the risk..."
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="description" />
                </div>
              </div>
              <!--end::Input-->
            </div>
            <!--end::Col-->
          </div>

          <div class="row mb-6">
            <!--begin::Col-->
            <div class="col-md-6 fv-row">
              <!--begin::Label-->
              <label
                class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                >Cause</label
              >
              <!--end::Label-->

              <!--begin::Input-->
              <Field
                type="text"
                as="textarea"
                rows="5"
                name="cause"
                v-model="itemDetails.risk_identification.cause"
                class="form-control form-control-lg form-control-solid"
                placeholder="Enter the cause..."
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="cause" />
                </div>
              </div>
              <!--end::Input-->
            </div>
            <!--end::Col-->
            <!--begin::Col-->
            <div class="col-md-6 fv-row">
              <!--begin::Label-->
              <label
                class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                >Effect</label
              >
              <!--end::Label-->

              <!--begin::Input-->
              <Field
                type="text"
                as="textarea"
                rows="5"
                name="effect"
                v-model="itemDetails.risk_identification.effect"
                class="form-control form-control-lg form-control-solid"
                placeholder="Enter the effect..."
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="effect" />
                </div>
              </div>
              <!--end::Input-->
            </div>
            <!--end::Col-->
          </div>
        </div>
        <!--begin::Card footer-->
        <div class="card-footer d-flex justify-content-end py-6 px-9">
          <button
            type="button"
            @click="onsubmit"
            :data-kt-indicator="loading ? 'on' : ''"
            class="btn btn-primary px-6"
          >
            <span v-if="!loading" class="indicator-label"> Save Risk</span>
            <span v-if="loading" class="indicator-progress">
              Please wait...
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span>
            </span>
          </button>
        </div>
        <!--end::Card footer-->
        <!--end::Input group-->
        <!--end::Form-->
      </div>
      <!--end::Content-->
    </div>
  </VForm>
</template>
        
        <script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref, reactive } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { addRiskRegister } from "@/stores/api";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import packages from "@/core/config/PackagesConfig";
import { limit, Identifier } from "@/core/config/WhichUserConfig";
import { useAuthStore } from "@/stores/auth";
import { useRoute, useRouter } from "vue-router";
import ApiService from "@/core/services/ApiService";
import moment from "moment";

export default defineComponent({
  name: "risks-add",
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
    const route = useRoute();
    const User = auth.GetUser();
    let limit = ref(500);

    const itemDetails = ref({
      clause_no: "",
      risk_identification: reactive({
        description: "",
        cause: "",
        effect: "",
      }),
      risk_evaluation: reactive({
        probability: "",
        severity: "",
        risk_mode: "",
      }),
      risk_counter: reactive({
        controls: "",
        probability: "",
        severity: "",
        risk_mode: "",
      }),
      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
      is_active: "1",
    });

    const itemDetailsValidator = Yup.object().shape({
      clause_no: Yup.string().required().label("Clause No."),
      description: Yup.string().required().label("Description"),
      cause: Yup.string().required().email().label("Cause"),
      effect: Yup.string().required().label("Effect"),
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
          // Trim the string before validation
          value = value.trim();
          if (value === "") {
            return false;
          }
        }
      }
      return true;
    };

    const onsubmit = async () => {
      loading.value = true;

      if (itemDetails.value.clause_no.trim() === "") {
        showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
        loading.value = false;
        return;
      }

      try {
        if (validateForm(itemDetails.value.risk_identification)) {
          const response = await addRiskRegister(itemDetails.value);
          if (!response.error) {
            showSuccessAlert(
              "Success",
              "Risk Identification has been successfully inserted!"
            );
            loading.value = false;
            router.push({ name: "risk-list" });
          } else {
            showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
            loading.value = false;
            return;
          }
        } else {
          showErrorAlert("Warning", "Please fill in all fields.");
        }
      } catch (error) {
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
      itemDetails,
      itemDetailsValidator,
      getAssetPath,
      onsubmit,
      loading,
      packages,
      limit,
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