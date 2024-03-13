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
          :validation-schema="riskValidator"
        >
          <!--begin::Card body-->
          <div class="card-body border-top p-sd-2 p-lg-9">
            <div class="row mb-6">
              <!--begin::Col-->
              <div class="col-md-6 fv-row mb-8 mb-sd-8">
                <!--end::Label-->
                <label
                  class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Entity</label
                >
                <!--end::Label-->

                <div>
                  <el-select
                    filterable
                    placeholder="Please Select Entity"
                    name="entity"
                    v-model="riskDetails.entity"
                  >
                    <el-option
                      value=""
                      disabled="disabled"
                      label="Please Select Entity"
                      key=""
                    >
                      Please Select Entity</el-option
                    >
                    <el-option
                      v-for="entity in EntityList"
                      :key="entity"
                      :value="entity"
                      :label="`${entity}`"
                    />
                  </el-select>
                  <div class="fv-help-block">
                    <ErrorMessage class="invalid-feedback" name="entity" />
                  </div>
                  <!--end::Input-->
                </div>
              </div>
              <!--end::Col-->
            </div>

            <div class="row mb-6">
              <!--begin::Col-->
              <div class="col-md-12 fv-row">
                <!--begin::Label-->
                <label
                  class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Threats</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <Field
                  type="text"
                  as="textarea"
                  rows="5"
                  v-model="riskDetails.threats"
                  name="threats"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter threats..."
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="threats" />
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
                  >Impacts</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <Field
                  type="text"
                  as="textarea"
                  rows="5"
                  v-model="riskDetails.impacts"
                  name="impacts"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter impacts..."
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="impacts" />
                  </div>
                </div>
                <!--end::Input-->
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
                    <span class="text-dark fw-bold d-block fs-4 mb-2"
                      >Control Adequacy</span
                    >
                    <input
                      type="radio"
                      class="btn-check"
                      name="control_adequacy"
                      id="yes"
                      value="yes"
                      v-model="riskDetails.control_adequacy"
                      autocomplete="off"
                    />
                    <label class="btn btn-outline-primary" for="yes">Yes</label>
                    <input
                      type="radio"
                      class="btn-check"
                      name="work_status"
                      id="no"
                      v-model="riskDetails.control_adequacy"
                      value="no"
                      autocomplete="off"
                    />
                    <label class="btn btn-outline-primary" for="no">No</label>
                  </span>
                  <!--end::Info-->
                </label>
              </div>
              <div class="form-group col-md-6 mb-8 mb-sd-8">
                <label
                  class="btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center"
                >
                  <!--begin::Info-->
                  <span class="d-block fw-semobold text-start">
                    <span class="text-dark fw-bold d-block fs-4 mb-2"
                      >Review Date</span
                    >
                    <div class="block">
                      <el-date-picker
                        type="date"
                        name="review_date"
                        id="review_date"
                        v-model="riskDetails.review_date"
                        @change="setDates($event, 'review_date')"
                        placeholder="Pick a day"
                        :editable="false"
                      />
                    </div>
                  </span>
                  <!--end::Info-->
                </label>
                <div
                  class="fv-plugins-message-container"
                  v-if="!riskDetails.review_date"
                >
                  <div class="fv-help-block">
                    <ErrorMessage name="review_date" />
                  </div>
                </div>
              </div>
            </div>

            <!--begin::Input group-->
            <div class="row mb-6">
              <!--begin::Col-->
              <div class="col-md-12 fv-row">
                <!--begin::Label-->
                <label
                  class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Present Control</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <Field
                  type="text"
                  as="textarea"
                  rows="5"
                  v-model="riskDetails.present_control"
                  name="present_control"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Specify present controls..."
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="present_control" />
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
              <div class="col-md-12 fv-row">
                <!--begin::Label-->
                <label
                  class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Additional Control</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <Field
                  type="text"
                  as="textarea"
                  rows="5"
                  v-model="riskDetails.additional_control"
                  name="additional_control"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Specify additonal controls..."
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="additional_control" />
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
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-lg btn-primary w-sd-25 w-lg-25"
              @click="submit()"
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
import { getRiskRegister, updateRiskRegister } from "@/stores/api";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import { Identifier } from "@/core/config/WhichUserConfig";
import { useAuthStore } from "@/stores/auth";
import { useRouter, useRoute } from "vue-router";
import ApiService from "@/core/services/ApiService";
import moment from "moment";
import { EntityList } from "@/core/model/risk";

interface RISK {
  entity: string;
  threats: string;
  impacts: string;
  present_control: string;
  control_adequacy: string;
  review_date: string;
  additional_control: string;
  company_id: string;
  created_by: string;
  updated_by: string;
  is_active: string;
}

export default defineComponent({
  name: "risk-edit",
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
    const itemId = route.params.id;

    const riskValidator = Yup.object().shape({
      threats: Yup.string().required().label("Threats"),
      impacts: Yup.string().required().label("Impacts"),
      present_control: Yup.string().required().label("Present Control"),
      additional_control: Yup.string().required().label("Addtional Control"),
    });

    const riskDetails = ref<RISK>({
      entity: "",
      threats: "",
      impacts: "",
      present_control: "",
      control_adequacy: "yes",
      review_date: "",
      additional_control: "",
      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
      is_active: "1",
    });

    onMounted(async () => {
      let response = await getRiskRegister(itemId.toString());
      console.log(response);
      riskDetails.value = {
        entity: response.entity,
        threats: response.threats,
        impacts: response.impacts,
        present_control: response.present_control,
        control_adequacy: response.control_adequacy,
        review_date: response.review_date,
        additional_control: response.additional_control,
        company_id: response.company_id ? response.company_id : "",
        created_by: response.created_by,
        updated_by: response.updated_by,
        is_active: response.is_active,
      };
    });

    async function setDates(e, dateType) {
      if (e != null) {
        riskDetails.value[dateType] = moment(e).format("YYYY-MM-DD");
      } else {
        riskDetails.value[dateType] = "";
      }
      console.log(dateType, " ", riskDetails.value[dateType]);
    }

    function areAllPropertiesNull(array) {
      return array.some((detail) => {
        const {
          entity,
          threats,
          impacts,
          present_control,
          control_adequacy,
          review_date,
          additional_control,
        } = detail;

        // Check if any property is null or empty

        return (
          entity === "" ||
          threats === "" ||
          impacts === "" ||
          present_control === "" ||
          control_adequacy === "" ||
          review_date === "" ||
          additional_control === ""
        );
      });
    }

    const submit = async () => {
      try {
        loading.value = true;
        console.log(riskDetails.value);

        const result = areAllPropertiesNull([riskDetails.value]);

        if (!result) {
          const response = await updateRiskRegister(itemId, riskDetails.value);
          // console.log(response.error);
          if (!response.error) {
            // Handle successful API response
            //   console.log("API response:", response);
            showSuccessAlert("Success", "Risk Regsiter has been successfully Updated!");

            router.push({ name: "risks-list" });
            loading.value = false;
          } else {
            // Handle API error response
            //   console.log("API error:", errorData);
            // console.log("API error:", errorData.response.data.errors);
            showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
            loading.value = false;
          }
        } else {
          showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
          loading.value = false;
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
      riskDetails,
      riskValidator,
      getAssetPath,
      submit,
      loading,
      setDates,
      EntityList,
    };
  },
});
</script>
  