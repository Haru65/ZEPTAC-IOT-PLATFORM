<template>
  <!--begin::Sign-in Method-->
  <div class="card mb-5 mb-xl-10">
    <!--begin::Card header-->
    <div
      class="card-header border-0 cursor-pointer"
      role="button"
      data-bs-toggle="collapse"
      data-bs-target="#kt_account_signin_method"
    >
      <div class="card-title m-0">
        <h3 class="fw-bolder m-0">API Setting</h3>
      </div>
    </div>
    <!--end::Card header-->

    <!--begin::Content-->
    <div id="kt_account_signin_method" class="collapse show">
      <!--begin::Card body-->
      <div class="card-body border-top p-9">
        <!--begin::Password-->
        <div class="d-flex flex-wrap align-items-center mb-8">
          <div
            id="kt_signin_password"
            :class="{ 'd-none': apiSettingFormDisplay }"
          >
            <div class="fs-4 fw-bolder mb-1">IndiaMart API Key</div>
            <div class="fs-6 fw-semobold text-gray-600">************</div>
          </div>
          <div
            id="kt_signin_password_edit"
            class="flex-row-fluid"
            :class="{ 'd-none': !apiSettingFormDisplay }"
          >
            <div class="fs-6 fw-semobold text-gray-600 mb-4">Your API Key</div>

            <!--begin::Form-->
            <VForm
              id="kt_signin_change_password"
              class="form"
              novalidate
              @submit="updateApiSetting()"
              :validation-schema="apiValidator"
            >
              <div class="row mb-6">
                <div class="input-group mb-5">
                  <span class="input-group-text" id="basic-addon3"
                    >Api Key</span
                  >
                  <Field
                    type="text"
                    class="form-control"
                    id="indiamart_key"
                    name="indiamart_key"
                    v-model="apiDetails.indiamart_key"
                    aria-describedby="basic-addon3"
                  />
                </div>
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="indiamart_key" />
                  </div>
                </div>
              </div>
              <div class="d-flex">
                <button
                  id="kt_password_submit"
                  type="submit"
                  ref="updateKeyButton"
                  class="btn btn-success me-2 px-6"
                >
                  <span class="indicator-label"> Save </span>
                  <span class="indicator-progress">
                    Please wait...
                    <span
                      class="spinner-border spinner-border-sm align-middle ms-2"
                    ></span>
                  </span>
                </button>
                <button
                  id="kt_password_cancel"
                  type="button"
                  @click="resetApiData"
                  class="btn btn-color-gray-400 btn-active-light-primary px-6"
                >
                  Cancel
                </button>
              </div>
            </VForm>
            <!--end::Form-->
          </div>
          <div
            id="kt_signin_password_button"
            class="ms-auto"
            :class="{ 'd-none': apiSettingFormDisplay }"
          >
            <button
              @click="apiSettingFormDisplay = !apiSettingFormDisplay"
              class="btn btn-light fw-bolder"
            >
              Edit
            </button>
          </div>
        </div>
        <!--end::Password-->
      </div>
      <!--end::Card body-->
    </div>
    <!--end::Content-->
  </div>
  <!--end::Sign-in Method-->
</template>
  
  <script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { countries, INstates } from "@/core/model/countries";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { addIndiaMartApi, getIndiaMartApi } from "@/stores/api";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import packages from "@/core/config/PackagesConfig";
import { useRoute, useRouter } from "vue-router";
import { limit } from "@/core/config/WhichUserConfig";
import { debounce } from "@/core/helpers/debounce";
import { financialTypes } from "@/core/model/company";
import ApiService from "@/core/services/ApiService";

export default defineComponent({
  name: "company-apisetting",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const CompanyId = route.params.id;

    const updateKeyButton = ref<HTMLElement | null>(null);

    const apiSettingFormDisplay = ref(false);

    const apiValidator = Yup.object().shape({
      indiamart_key: Yup.string().required().label("Api Key"),
    });

    const apiDetails = ref({
      indiamart_key: "",
      last_fetch_time: "",
      company_id: CompanyId,
    });

    const itemDetails = ref({
      indiamart_key: "",
      last_fetch_time: "",
      company_id: CompanyId,
    });

    onMounted(async () => {

      try {
        let response = await getIndiaMartApi(CompanyId.toString());

        if (response.success) {
          apiDetails.value.indiamart_key = response.result.indiamart_key;
          apiDetails.value.last_fetch_time = response.result.last_fetch_time;
          apiDetails.value.company_id = response.result.company_id;

          itemDetails.value.indiamart_key = response.result.indiamart_key;
          itemDetails.value.last_fetch_time = response.result.last_fetch_time;
          itemDetails.value.company_id = response.result.company_id;
        } else {
          console.error(
            `Error Occured in getIndiaMartApi : ${
              response.message || "Error Occured in API"
            }`
          );
        }
      } catch (err) {
        console.error(`Error Occured in getIndiaMartApi : ${err}`);
      }
    });

    const updateApiSetting = async () => {
      try {
        if (updateKeyButton.value) {
          // Activate indicator
          updateKeyButton.value.setAttribute("data-kt-indicator", "on");

          ApiService.setHeader();

          console.log(apiDetails.value);

          const response = await addIndiaMartApi(apiDetails.value);

          if (response?.success) {
            setTimeout(() => {
              updateKeyButton.value?.removeAttribute("data-kt-indicator");

              Swal.fire({
                text: response.message || `Api Key Saved successfully.`,
                icon: "success",
                confirmButtonText: "Ok",
                buttonsStyling: false,
                heightAuto: false,
                customClass: {
                  confirmButton: "btn btn-light-primary",
                },
              }).then(() => {
                apiSettingFormDisplay.value = false;
                itemDetails.value.indiamart_key =
                  apiDetails.value.indiamart_key;
                itemDetails.value.last_fetch_time =
                  apiDetails.value.last_fetch_time;
                itemDetails.value.company_id = CompanyId;
              });
            }, 2000);

            return { success: true };
          } else {
            throw new Error(response?.message || `Failed to save api key.`);
          }
        }
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "An unknown error occurred";

        setTimeout(() => {
          updateKeyButton.value?.removeAttribute("data-kt-indicator");

          Swal.fire({
            text: errorMessage,
            icon: "error",
            confirmButtonText: "Ok",
            buttonsStyling: false,
            heightAuto: false,
            customClass: {
              confirmButton: "btn btn-light-danger",
            },
          }).then(() => {
            apiSettingFormDisplay.value = false;
          });
        }, 2000);

        return { success: false, message: errorMessage };
      }
    };

    const resetApiData = () => {
      apiSettingFormDisplay.value = !apiSettingFormDisplay.value;
      apiDetails.value.indiamart_key = itemDetails.value.indiamart_key;
      apiDetails.value.last_fetch_time = itemDetails.value.last_fetch_time;
      apiDetails.value.company_id = CompanyId;
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
      resetApiData,
      apiDetails,
      itemDetails,
      apiSettingFormDisplay,
      apiValidator,
      updateKeyButton,
      updateApiSetting,
    };
  },
});
</script>