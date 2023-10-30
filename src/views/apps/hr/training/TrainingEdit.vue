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
          :validation-schema="trainingDetailsValidator"
        >
          <!--begin::Card body-->
          <div class="card-body border-top p-sd-2 p-lg-9">
            <!--begin::Input group-->

            <!--begin::Input group-->
            <div class="row mb-6">
              <!--begin::Col-->
              <div class="col-md-6 fv-row mb-8 mb-sd-8">
                <!--begin::Label-->
                <label
                  class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Training Schedule Date</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <div class="block">
                  <el-date-picker
                    type="date"
                    name="training_date"
                    id="training_date"
                    v-model="trainingDetails.training_date"
                    placeholder="Pick Training Day"
                    :editable="false"
                  />
                </div>
                <div
                  class="fv-plugins-message-container mt-5"
                  v-if="!trainingDetails.training_date"
                >
                  <div class="fv-help-block">
                    <ErrorMessage name="training_date" />
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
                  >Training Criteria</label
                >
                <!--end::Label-->

                <Field
                  type="text"
                  name="training_criteria"
                  class="form-control form-control-lg form-control-solid"
                  v-model="trainingDetails.training_criteria"
                  placeholder="Enter Training Criteria"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="training_criteria" />
                  </div>
                </div>
                <!--end::Input-->
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->

            <div class="row mb-6">
              <!--begin::Label-->
              <label
                class="col-lg-3 col-form-label text-gray-700 required fw-semobold fs-6 text-nowrap"
                >Training Topic</label
              >
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-9 fv-row">
                <Field
                  type="text"
                  name="training_topic"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter Training topic"
                  v-model="trainingDetails.training_topic"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="training_topic" />
                  </div>
                </div>
              </div>
              <!--end::Col-->
            </div>

            <div class="row mb-6">
              <div class="form-group col-md-6 mb-8 mb-sd-8">
                <label
                  class="btn btn-outline btn-outline-dashed btn-outline-default p-5 d-flex align-items-center"
                >
                  <!--begin::Info-->
                  <span class="d-block fw-semobold text-start">
                    <span class="text-gray-700 fw-bold d-block fs-6 mb-2"
                      >Training Mode</span
                    >
                    <div class="btn-group" role="group">
                      <div v-for="mode in TrainingMode" :key="mode.id">
                        <input
                          type="radio"
                          class="btn-check"
                          name="training_mode"
                          :id="`${mode.mode}`"
                          :value="mode.id"
                          v-model="trainingDetails.training_mode"
                          autocomplete="off"
                        />
                        <label
                          :class="'btn btn-outline-primary'"
                          :for="`${mode.mode}`"
                        >
                          {{ mode.mode }}
                        </label>
                      </div>
                    </div>
                  </span>
                  <!--end::Info-->
                </label>
              </div>

              <div class="form-group col-md-6 mb-8 mb-sd-8">
                <label
                  class="btn btn-outline btn-outline-dashed btn-outline-default p-5 d-flex align-items-center"
                >
                  <!--begin::Info-->
                  <span class="d-block fw-semobold text-start">
                    <span class="text-gray-700 fw-bold d-block fs-6 mb-2"
                      >Training Status</span
                    >
                    <div class="btn-group" role="group">
                      <div v-for="status in TrainingStatus" :key="status.id">
                        <input
                          type="radio"
                          class="btn-check"
                          name="training_status"
                          :id="`${status.status}`"
                          :value="status.id"
                          v-model="trainingDetails.training_status"
                          autocomplete="off"
                        />
                        <label
                          :class="'btn btn-outline-primary'"
                          :for="`${status.status}`"
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

            <!-- extra fields -->
            <div class="row mb-6">
              <div class="form-group col-lg-12 col-md-12">
                <label
                  class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Description of Training</label
                >
                <Field
                  type="text"
                  as="textarea"
                  name="training_desc"
                  rows="3"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter the description of the training..."
                  v-model="trainingDetails.training_desc"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="training_desc" />
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
                  >Trainer's Name</label
                >
                <el-form-item>
                <el-select
                  v-model="trainingDetails.trainers"
                  multiple
                  filterable
                  allow-create
                  placeholder="Enter trainer name and select it to add..."
                >
                  <el-option
                    v-for="(item, index) in trainingDetails.trainers"
                    :key="index"
                    :label="item"
                    :value="item"
                  />
                </el-select>
              </el-form-item>
              <div
                  class="fv-plugins-message-container mt-0"
                  v-if="!trainingDetails.trainers.length"
                >
                  <div class="fv-help-block">
                    <ErrorMessage name="trainers" />
                  </div>
                </div>
              </div>
            </div>

            <!-- extra fields -->
            <div class="row mb-6">
              <div class="form-group col-lg-12 col-md-12">
                <label
                  class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Trainee's Name</label
                >
                <el-form-item>
                <el-select
                  v-model="trainingDetails.trainees"
                  multiple
                  filterable
                  allow-create
                  placeholder="Enter trainee name and select it to add..."
                >
                  <el-option
                    v-for="(item, index) in trainingDetails.trainees"
                    :key="index"
                    :label="item"
                    :value="item"
                  />
                </el-select>
              </el-form-item>
              <div
                  class="fv-plugins-message-container mt-0"
                  v-if="!trainingDetails.trainees.length"
                >
                  <div class="fv-help-block">
                    <ErrorMessage name="trainees" />
                  </div>
                </div>
              </div>
            </div>
            <!--end::Input group-->
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
import { defineComponent, onMounted, ref } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { getTraining, updateTraining } from "@/stores/api";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import packages from "@/core/config/PackagesConfig";
import { limit, Identifier } from "@/core/config/WhichUserConfig";
import { useAuthStore } from "@/stores/auth";
import { useRouter, useRoute } from "vue-router";
import ApiService from "@/core/services/ApiService";
import moment from "moment";


import { TrainingMode, TrainingStatus } from "@/core/model/training";

interface Training {
  training_date: string;
  training_topic: string;
  training_criteria: string;
  training_desc: string;
  trainers: Array<string>;
  trainees: Array<string>;
  training_mode: string;
  training_status: string;
  company_id: string;
  created_by: string;
  updated_by: string;
  is_active: string;
}
export default defineComponent({
  name: "training-edit",
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
    let limit = ref(500);
    const itemId = route.params.id;

    const trainingDetailsValidator = Yup.object().shape({
      training_date: Yup.string().required().label("Training Date"),
      training_topic: Yup.string().required().label("Traning Title"),
      training_criteria: Yup.string().required().label("Training Criteria"),
      training_desc: Yup.string().required().label("Training Details"),
      trainers: Yup.string().required().label("Trainer"),
      trainees: Yup.string().required().label("Trainees"),
    });


    const trainingDetails = ref<Training>({
      training_date: "",
      training_topic: "",
      training_criteria: "",
      training_desc: "",
      trainers: [],
      trainees: [],
      training_mode: "",
      training_status: "",
      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
      is_active: "1",
    });

    onMounted(async () => {
      let response = await getTraining(itemId.toString());
      console.log(response);
      trainingDetails.value = {
        training_date: response.training_date,
        training_topic: response.training_topic,
        training_criteria: response.training_criteria,
        training_desc: response.training_desc,
        trainers: JSON.parse(response.trainers),
        trainees: JSON.parse(response.trainees),
        training_mode: response.training_mode,
        training_status: response.training_status,
        company_id: response.company_id
          ? response.company_id
          : "",
        created_by: response.created_by,
        updated_by: response.updated_by,
        is_active: response.is_active,
      };
    });

    function areAllPropertiesNotNull(array) {
      return array.some((data) => {
        const {
          training_date,
          training_topic,
          training_criteria,
          training_desc,
          trainers,
          trainees,
          training_mode,
          training_status,
        } = data;

        // Check if any property is null or empty

        return (
          training_date !== null &&
          training_topic !== "" &&
          training_criteria !== "" &&
          training_desc !== "" &&
          trainers.lenght !== 0 &&
          trainees.lenght !== 0 &&
          training_mode !== "" &&
          training_status !== ""
        );
      });
    }

    const submit = async () => {
      loading.value = true;

      try {

        trainingDetails.value.training_date = moment(
          trainingDetails.value.training_date
        ).format("YYYY-MM-DD");
          
        const result = areAllPropertiesNotNull([trainingDetails.value]);

        if (result) {
          const response = await updateTraining(itemId, trainingDetails.value);
          // console.log(response.error);
          if (!response.error) {
            // Handle successful API response
            //   console.log("API response:", response);
            showSuccessAlert(
              "Success",
              "Training Plan has been successfully Updated!"
            );

            // clear();
            router.push({ name: "training-list" });
            loading.value = false;
          } else {
            // Handle API error response
            //   console.log("API error:", errorData);
            // console.log("API error:", errorData.response.data.errors);
            showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
            loading.value = false;
          }
        }
        else{
          showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
          loading.value = false;
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
      trainingDetails,
      trainingDetailsValidator,
      getAssetPath,
      submit,
      loading,
      packages,
      limit,
      TrainingMode,
      TrainingStatus,
    };
  },
});
</script>

<style>
.el-input__inner {
  font-weight: 500;
}
.el-input__wrapper {
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
.override-styles {
  z-index: 99999 !important;
  pointer-events: initial;
}
</style>