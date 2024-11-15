<template>
  <div style="width: 99%" class="bg-body p-12 rounded">
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Form-->
        <VForm id="kt_account_profile_details_form" class="form" novalidate>
          <!--begin::Card body-->
          <div class="card-body p-sd-2 p-lg-9">
            <!--begin::Input group-->

            <!--begin::Input group-->
            <div class="row">
              <!--begin::Col-->
              <div class="col-md-6 fv-row mb-8 mb-sd-8">
                <!--begin::Label-->
                <label
                  class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Employee Name</label
                >
                <!--end::Label-->

                <div>
                  <el-select
                    v-model="skillMatrixDetails.user_id"
                    name="user_id"
                    filterable
                    placeholder="Please Select Employee"
                  >
                    <el-option
                      value=""
                      selected
                      disabled="disabled"
                      label="Please Select Employee"
                      key=""
                    >
                      Please Select Employee</el-option
                    >
                    <el-option
                      v-for="employee in Employees"
                      :key="employee.id"
                      :value="employee.id"
                      :label="`${employee.first_name} ${employee.last_name}`"
                    />
                  </el-select>
                </div>

                <div class="fv-help-block">
                  <ErrorMessage class="invalid-feedback" name="rgp_id" />
                </div>
                <!--end::Input-->
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->

            <div class="card-header">
              <div class="container-fluid">
                <!--begin::Header-->
                <h3 class="card-title align-items-start flex-column">
                  <span class="fs-3 fw-bold text-gray-700 text-nowrap mb-2"
                    >Skill Matrix of Employee</span
                  >
                </h3>
                <!--end::Header-->
                <div class="alert alert-primary font-bold mt-2">
                  <div class="d-flex flex-column">
                    <li class="d-flex align-items-center py-2">
                      <span class="bullet bullet-dot me-5"></span> Score 75-100
                      - Share the Knowledge to Other Personel
                    </li>
                    <li class="d-flex align-items-center py-2">
                      <span class="bullet bullet-dot me-5"></span>
                      Score above 50 - Need 100% Improvement
                    </li>
                    <li class="d-flex align-items-center py-2">
                      <span class="bullet bullet-dot me-5"></span>
                      Score 0-50 - Need Improvement
                    </li>
                  </div>
                </div>
              </div>
            </div>

            <div class="container mb-6">
              <div class="row g-5 g-xl-8">
                <div
                  v-for="(skill, index) in skills"
                  :key="index"
                  class="col-xl-4"
                >
                  <RangeSlider
                    :id="index"
                    :widgetClasses="widgetClasses"
                    :color="getColor(index)"
                    :title="skill.skill_name"
                    :progress="skill.score.toString()"
                    @setProgress="updateProgress"
                  ></RangeSlider>
                </div>
              </div>
            </div>
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
              @click.prevent="submit()"
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
import { defineComponent, onMounted, ref, reactive } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { addSkillMatrix, addTraining, getEmployees } from "@/stores/api";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import packages from "@/core/config/PackagesConfig";
import { limit, Identifier } from "@/core/config/WhichUserConfig";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import ApiService from "@/core/services/ApiService";
import moment from "moment";

import RangeSlider from "./RangeSlider.vue";

export default defineComponent({
  name: "skill-matrix-add",
  components: {
    ErrorMessage,
    Field,
    VForm,
    RangeSlider,
  },
  setup() {
    const identifier = Identifier;
    const loading = ref(false);
    const auth = useAuthStore();
    const router = useRouter();
    const User = auth.GetUser();
    let limit = ref(500);

    const Employees = ref([{ id: "", first_name: "", last_name: "" }]);

    const skillMatrixDetails = ref({
      user_id: "",
      skills: [{}],
      approval_status: "1",
      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
      is_active: "1",
    });

    const getDropEmployee = async () => {
      try {
        ApiService.setHeader();
        const response = await getEmployees(`fetchAll=true`);

        if (response.success) {
          if (response.result != null && response.result) {
            Employees.value.push(
              ...response.result?.map(({ id, first_name, last_name }) => ({
                id,
                first_name,
                last_name,
              }))
            );
          }
        } else {
          console.error(
            `Error Occured in getEmployees : ${
              response.message || "Error Occured in API"
            }`
          );
        }
      } catch (err) {
        console.error(`Error Occured in getEmployees : ${err}`);
      }
    };

    onMounted(async () => {
      Employees.value.pop();
      await getDropEmployee();
    });

    const skills = reactive([
      { skill_name: "Master handling / Maintain", score: 0 },
      { skill_name: "Testing Techniques Basic", score: 0 },
      { skill_name: "Site Calibration Procedure", score: 0 },
      { skill_name: "ISO 17025:2017 Awareness", score: 0 },
      { skill_name: "Certificate Preparation", score: 0 },
      { skill_name: "Uncertainty Calculation", score: 0 },
      { skill_name: "Documents Maintenance", score: 0 },
      { skill_name: "Filing / Accounts", score: 0 },
      { skill_name: "Customer Support", score: 0 },
      { skill_name: "Delivery & Collection", score: 0 },
    ]);

    const widgetClasses = "card-xl-stretch mb-xl-8";

    const progress = ref(
      skills.map((skill) => ({ name: skill.skill_name, score: skill.score }))
    );

    const getColor = (index) => {
      const colors = [
        "success",
        "warning",
        "primary",
        "info",
        "danger",
        "secondary",
        "dark",
        "info",
        "success",
        "warning",
      ];
      return colors[index % colors.length];
    };

    const getProgress = (index) => {
      return skills[index].score;
    };

    const updateProgress = (index, value) => {
      skills[index].score = value;
      console.log(...skills);
      console.log("--------------------------------");
    };

    const submit = async () => {
      loading.value = true;

      try {
        skillMatrixDetails.value.skills = skills;

        console.log(skillMatrixDetails.value);
        // return;
        if (skillMatrixDetails.value.user_id != "") {
          const response = await addSkillMatrix(skillMatrixDetails.value);
          // console.log(response.error);
          if (response.success) {
            // Handle successful API response
            //   console.log("API response:", response);
            showSuccessAlert(
              "Success",
              response.message || "Skill Matrix has been successfully inserted!"
            );
            loading.value = false;

            router.push({ name: "skill-matrix-list" });
          } else {
            // Handle API error response
            loading.value = false;
            showErrorAlert("Error", response.message || "An error occurred.");
          }
        } else {
          showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
          loading.value = false;
          return;
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
      Employees,
      skillMatrixDetails,
      getAssetPath,
      submit,
      loading,
      packages,
      limit,
      skills,
      widgetClasses,
      getColor,
      progress,
      updateProgress,
      getProgress,
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