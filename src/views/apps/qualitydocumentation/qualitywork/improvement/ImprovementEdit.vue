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
          <div class="card-body border-top p-sd-2 p-lg-9">
            <div class="row mb-6">
                <div class="col-md-12 fv-row mb-8 mb-sd-8">
                  <!--begin::Label-->
                  <label class="required fs-5 fw-bold text-gray-700 mb-2"
                    >Area of Improvement</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <div>
                    <el-select
                      v-model="itemDetails.area"
                      filterable
                      name="area"
                      @change="setTarget($event)"
                      placeholder="--Select--"
                    >
                      <el-option
                        v-for="item in AreaOfImprovement"
                        :key="item.id"
                        :label="item.area"
                        :value="item.id"
                      />
                    </el-select>
                  </div>
                  <!--end::Col-->
                  <div
                    class="fv-plugins-message-container mt-3"
                    v-if="!itemDetails.area"
                  >
                    <div class="fv-help-block">
                      <ErrorMessage name="area" />
                    </div>
                  </div>
                </div>
              </div>

              <div class="row mb-6">
                <!--begin::Col-->
                <div class="col-md-12 fv-row">
                  <!--begin::Label-->
                  <label
                    class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                    >Target Rating</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <div class="form-control form-control-lg form-control-solid">
                    {{ itemDetails.target }}
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
                    >Select Quarter</label
                  >
                  <!--end::Label-->

                  <div>
                    <el-select
                      v-model="itemDetails.quarter"
                      filterable
                      name="quarter"
                      placeholder="--Select--"
                    >
                      <el-option
                        v-for="item in Quarters"
                        :key="item.quarter"
                        :label="item.quarter"
                        :value="item.quarter"
                      />
                    </el-select>
                  </div>
                  <!--end::Col-->
                  <div
                    class="fv-plugins-message-container mt-3"
                    v-if="!itemDetails.quarter"
                  >
                    <div class="fv-help-block">
                      <ErrorMessage name="quarter" />
                    </div>
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
                    >OutCome of Improvement</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Field
                    type="text"
                    as="textarea"
                    rows="3"
                    v-model="itemDetails.outcome"
                    name="outcome"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Specify the outcome achieved..."
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="outcome" />
                    </div>
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Col-->
              </div>
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
import { getImprovementPlan, updateImprovementPlan } from "@/stores/api";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import { Identifier } from "@/core/config/WhichUserConfig";
import { useAuthStore } from "@/stores/auth";
import { useRouter, useRoute } from "vue-router";
import ApiService from "@/core/services/ApiService";
import moment from "moment";
import { AreaOfImprovement, GetAreaTarget, Quarters } from "@/core/model/improvement";

interface Item {
  area: string;
  target: string;
  outcome: string;
  quarter: string;
  approval_status: string;
  company_id: string;
  created_by: string;
  updated_by: string;
  is_active: string;
}

export default defineComponent({
  name: "improvement-edit",
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

    const itemDetails = ref<Item>({
      area: "",
      target: "",
      outcome: "",
      quarter: "",
      approval_status: "",
      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
      is_active: "1",
    });

    const itemDetailsValidator = Yup.object().shape({
      outcome: Yup.string().required().label("OutCome"),
    });

    async function setTarget(id) {
      if(id !== ""){
        itemDetails.value.target = await GetAreaTarget(id);
      }
    }

    onMounted(async () => {
      let response = await getImprovementPlan(itemId.toString());
      console.log(response);
      itemDetails.value = {
        area: response.area,
        target: response.target,
        outcome: response.outcome,
        quarter: response.quarter,
        approval_status: response.approval_status,
        company_id: response.company_id ? response.company_id : "",
        created_by: response.created_by,
        updated_by: response.updated_by,
        is_active: response.is_active,
      };
    });

    function areAllPropertiesNull(array) {
      return array.some((detail) => {
        const { area, target, outcome, quarter } = detail;

        // Check if any property is null or empty

        return area === "" || target === "" || outcome === "" || quarter === "";
      });
    }

    const submit = async () => {
      try {
        loading.value = true;
        console.log(itemDetails.value);

        const result = areAllPropertiesNull([itemDetails.value]);

        if (!result) {
          const response = await updateImprovementPlan(itemId, itemDetails.value);
          // console.log(response.error);
          if (!response.error) {
            // Handle successful API response
            //   console.log("API response:", response);
            showSuccessAlert("Success", "Risk Regsiter has been successfully Updated!");

            router.push({ name: "improvements-list" });
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
      itemDetails,
      itemDetailsValidator,
      getAssetPath,
      submit,
      loading,
      AreaOfImprovement,
      Quarters,
      setTarget,
    };
  },
});
</script>
  