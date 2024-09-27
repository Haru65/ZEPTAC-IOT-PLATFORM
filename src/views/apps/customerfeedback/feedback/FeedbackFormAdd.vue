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
          @submit="submit"
        >
          <!--begin::Card body-->
          <div class="card-body p-sd-2 p-lg-9">
            <!--begin::Input group-->
            <!--begin::Heading-->
            <div class="text-center mb-10">
              <!--begin::Title-->
              <h1 class="text-dark mb-3" style="font-size: 2.3rem">
                Feedback Form
              </h1>
              <!--end::Title-->
            </div>
            <!--end::Heading-->

            <!-- extra fields -->
            <div class="row mb-6">
              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fw-semobold fw-bold text-gray-700 fs-6 text-nowrap"
                  >Customer Name</label
                >
                <div class="form-control form-control-lg form-control-solid">
                  {{ informationData.company_name }}
                </div>
              </div>

              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                  >Address</label
                >
                <div class="form-control form-control-lg form-control-solid">
                  {{ informationData.address1 || "" }}
                  {{ informationData.address2 || "" }}
                  {{ informationData.city || "" }}
                  {{ informationData.pincode || "" }}
                  {{ informationData.state || "" }}
                  {{ informationData.country || "" }}
                </div>
              </div>
            </div>
            <!--end::Input group-->

            <!-- extra fields -->
            <div class="row mb-6">
              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                  >Contact person</label
                >
                <div class="form-control form-control-lg form-control-solid">
                  {{ informationData.name }}
                </div>
              </div>
              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                  >Mobile Number</label
                >
                <div class="form-control form-control-lg form-control-solid">
                  {{ informationData.mobile }}
                </div>
              </div>
            </div>

            <div class="row mt-6">
              <div class="mb-6 container-fluid">
                <div class="alert alert-primary">
                  <h4>Dear Sir/Madam,</h4>
                  <h5>
                    We request you to kindly put a "TICK" mark in the respective
                    boxes against each aspect described below and to assess your
                    feedback with respect to the service we have provided so
                    far. Any other suggestion or remarks please indicate the
                    same to improve further. Thank you for taking your time for
                    giving your valuable feedback to us.
                  </h5>
                </div>
              </div>
            </div>

            <div class="card p-1 w-100">
              <div class="table-responsive mb-10">
                <table
                  class="table table-responsive g-3 gs-0 w-100 fw-bold text-gray-700 table-bordered"
                >
                  <thead>
                    <tr class="fs-5 fw-bold text-gray-700 text-center">
                      <th rowspan="2">No.</th>
                      <th rowspan="2" class="text-start">Description</th>
                      <th colspan="5">Rating about our Services</th>
                    </tr>
                    <tr class="fs-5 fw-bold text-gray-700 text-center">
                      <th>Excellent (100%)</th>
                      <th>Very Good (80%)</th>
                      <th>Satisfactory (60%)</th>
                      <th>Non Satisfactory (40%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index) in itemDetails.feedback_data"
                      :key="index"
                    >
                      <td class="text-center">{{ item.id }}</td>
                      <td class="text-start">{{ item.service }}</td>
                      <td
                        v-for="value in [100, 80, 60, 40]"
                        :key="value"
                        class="text-center"
                      >
                        <div
                          class="form-check form-check-custom form-check-solid text-center justify-content-center"
                        >
                          <input
                            type="radio"
                            class="form-check-input"
                            :name="'rating_' + item.id"
                            :value="value"
                            v-model="item.percentage"
                            :id="'rating_input_' + item.id + '_' + value"
                            @change="updateRating(item.id, value)"
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- extra fields -->
            <div class="row mb-6">
              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fw-semobold fw-bold text-gray-700 fs-6 text-nowrap"
                  >Average Rating Percentage</label
                >
                <div class="form-control form-control-lg form-control-solid">
                  {{ itemDetails.avg_rating }} %
                </div>
              </div>
            </div>
            <!--end::Input group-->

            <!-- extra fields -->
            <div class="row mb-6">
              <div class="form-group col-12">
                <label
                  class="col-lg-4 col-form-label fw-semobold fw-bold text-gray-700 fs-6 text-nowrap"
                  >Suggestion & Remarks (if any)</label
                >
                <Field
                  type="text"
                  as="textarea"
                  rows="5"
                  name="suggestion_remark"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter Feedbacker Name"
                  v-model="itemDetails.suggestion_remark"
                />
              </div>
            </div>

            <!-- extra fields -->
            <div class="row mb-6">
              <div class="form-group col-12">
                <label
                  class="col-lg-4 col-form-label required fw-semobold fw-bold text-gray-700 fs-6 text-nowrap"
                  >Feedbacker Name</label
                >
                <Field
                  type="text"
                  name="feedbacker_name"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter Feedbacker Name"
                  v-model="itemDetails.feedbacker_name"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="feedbacker_name" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer flex-center w-100">
            <!--begin::Button-->
            <button
              type="submit"
              ref="submitButton"
              class="btn btn-primary w-sd-25 w-lg-25"
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
import { defineComponent, ref, onMounted } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { useAuthStore, type User } from "@/stores/auth";

import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";
import { useBodyStore } from "@/stores/body";
import { useRouter, useRoute } from "vue-router";
import LayoutService from "@/core/services/LayoutService";
import { validateFeedback, addFeedback } from "@/stores/api";
import ApiService from "@/core/services/ApiService";
import moment from "moment";
import { FeedbackServices } from "@/core/model/feedbackform";

interface srf {
  testId: string;
  itemId: string;
  selected: boolean;
}

export default defineComponent({
  name: "feedbacks-add",
  components: {
    Field,
    VForm,
    ErrorMessage,
  },
  setup() {
    const submitButton = ref<null | HTMLButtonElement>(null);
    const loading = ref(false);

    const store = useAuthStore();
    const bodyStore = useBodyStore();

    const router = useRouter();
    const route = useRoute();
    const companyID = route.params.company;
    const customerID = route.params.customer;

    const bgImage = getAssetPath("media/patterns/layered-waves-haikei.svg");

    //Create form validation object
    const itemValidator = Yup.object().shape({
      feedbacker_name: Yup.string().required().label("Feedbacker Name"),
    });

    const data = ref({
      company_id: customerID,
      customer_id: customerID,
    });

    const informationData = ref({
      id: customerID,
      name: "",
      mobile: "",
      company_name: "",
      address1: "",
      address2: "",
      country: "",
      state: "",
      city: "",
      pincode: "",
    });

    const itemDetails = ref({
      customer_id: customerID,
      feedback_data: [...FeedbackServices],
      suggestion_remark: "",
      avg_rating: "",
      feedbacker_name: "",
      company_id: companyID,
      created_by: customerID,
      updated_by: customerID,
      is_active: 1,
    });

    const updateRating = async (itemId, value) => {
      const questionIndex = itemDetails.value.feedback_data.findIndex(
        (item) => item.id === itemId
      );
      if (questionIndex !== -1) {
        itemDetails.value.feedback_data[questionIndex].percentage = value;
      }

      const avgPercentage = await calculateAvgPercentage();
      itemDetails.value.avg_rating = avgPercentage.toFixed(2);

      console.log(itemDetails.value);
    };

    // LOGIC TO CALCULATE AVERAGE RATING PERCENTAGE

    const calculateAvgPercentage = async () => {
      const totalPercentage = itemDetails.value.feedback_data.reduce(
        (sum, item) => sum + item.percentage,
        0
      );
      const avgPercentage =
        totalPercentage / itemDetails.value.feedback_data.length;
      return avgPercentage;
    };

    onMounted(async () => {
      try {
        data.value.company_id = companyID;
        data.value.customer_id = customerID;

        let response = await validateFeedback(data.value);
        console.log(response);
        if (response.success && response.result != null) {
          informationData.value.name = response.result.name
            ? response.result.name
            : "";
          informationData.value.mobile = response.result.mobile
            ? response.result.mobile
            : "";
          informationData.value.company_name = response.result.company_name
            ? response.result.company_name
            : "";
          informationData.value.address1 = response.result.address1
            ? response.result.address1
            : "";
          informationData.value.address2 = response.result.address2
            ? response.result.address2
            : "";
          informationData.value.city = response.result.city
            ? response.result.city
            : "";
          informationData.value.pincode = response.result.pincode
            ? response.result.pincode
            : "";
          informationData.value.state = response.result.state
            ? response.result.state
            : "";
          informationData.value.country = response.result.country
            ? response.result.country
            : "";
        } else {
          console.error(
            `Error Occured in validateFeedback : ${
              response.message || "Error Occured in API"
            }`
          );
        }
      } catch (error) {
        showErrorAlert(
          "Error",
          "An error occurred during the validateFeedback API call."
        );
        loading.value = false;
        console.log(error);
      }

      console.log(route.params);
    });

    const validateForm = (formData) => {
      for (const key in formData) {
        let value = formData[key];
        if (key !== "suggestion_remark") {
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
        const response = await addFeedback(itemDetails.value);

        if (response?.success) {
          // Handle successful API response
          showSuccessAlert(
            "Success",
            response.message ||
              "FeedBack Form Form  has been successfully submitted!"
          );
          loading.value = false;
          // window.location.href = "https://www.google.com";
          router.push({ name: "thankyou" });
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
      submit,
      itemDetails,
      itemValidator,
      getAssetPath,
      loading,
      FeedbackServices,
      updateRating,
      informationData,
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