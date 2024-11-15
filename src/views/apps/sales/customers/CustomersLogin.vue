<template>
  <!--begin::Layout-->
  <div class="d-flex flex-column flex-lg-row">
    <!--begin::Content-->
    <div class="flex-lg-row-fluid me-lg-15 order-2 order-lg-1 mb-10 mb-lg-0">
      <!--begin::Card-->
      <div class="card card-flush pt-3 mb-5 mb-xl-10">
        <!--begin::Card header-->
        <div class="card-header">
          <!--begin::Card title-->
          <div class="card-title">
            <h2 class="fw-bold">Customer Details</h2>
          </div>
          <!--begin::Card title-->
        </div>
        <!--end::Card header-->

        <!--begin::Card body-->
        <div class="card-body pt-3">
          <!--begin::Section-->
          <div class="mb-10">
            <div class="row mb-6">
              <!--begin::Col-->
              <div class="col-md-12 fv-row">
                <!--begin::Label-->
                <label class="fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Company Name</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <div class="form-control form-control-lg form-control">
                  {{ profileDetails.company_name }}
                </div>
                <!--end::Input-->
              </div>
              <!--end::Col-->
            </div>

            <div class="row mb-6">
              <!--begin::Col-->
              <div class="col-md-12 fv-row">
                <!--begin::Label-->
                <label class="fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Full Name</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <div class="form-control form-control-lg form-control">
                  {{ profileDetails.name }}
                </div>
                <!--end::Input-->
              </div>
              <!--end::Col-->
            </div>
            <div class="row mb-6">
              <!--begin::Col-->
              <div class="col-md-12 fv-row">
                <!--begin::Label-->
                <label class="fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Email</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <div class="form-control form-control-lg form-control">
                  {{ profileDetails.email }}
                </div>
                <!--end::Input-->
              </div>
              <!--end::Col-->
            </div>
            <div class="row mb-6">
              <!--begin::Col-->
              <div class="col-md-12 fv-row">
                <!--begin::Label-->
                <label class="fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Contact Phone</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <div class="form-control form-control-lg form-control">
                  {{ profileDetails.mobile }}
                </div>
                <!--end::Input-->
              </div>
              <!--end::Col-->
            </div>
            <div class="row mb-6">
              <!--begin::Col-->
              <div class="col-md-12 fv-row">
                <!--begin::Label-->
                <label class="fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Address</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <div class="form-control form-control-lg form-control">
                  {{ profileDetails.address1 || "" }}
                  {{ profileDetails.address2 || "" }}
                  {{ profileDetails.city || "" }}
                  {{ profileDetails.pincode || "" }}
                  {{ profileDetails.state || "" }}
                  {{ profileDetails.country || "" }}
                </div>
                <!--end::Input-->
              </div>
              <!--end::Col-->
            </div>
          </div>
          <!--end::Section-->
        </div>
        <!--end::Card body-->
      </div>
      <!--end::Card-->
    </div>
    <!--end::Content-->

    <!--begin::Sidebar-->
    <div
      class="flex-column flex-lg-row-auto w-100 w-lg-250px w-xl-300px mb-10 order-1 order-lg-2"
    >
      <!--begin::Card-->
      <div
        class="card card-flush pt-3 mb-0"
        id="kt_add_summary"
        data-kt-sticky="false"
        data-kt-sticky-name="add-subscription-summary"
        data-kt-sticky-offset="{default: false, lg: '200px'}"
        data-kt-sticky-width="{lg: '250px', xl: '300px'}"
        data-kt-sticky-left="auto"
        data-kt-sticky-top="150px"
        data-kt-sticky-animation="false"
        data-kt-sticky-zindex="95"
      >
        <!--begin::Card header-->
        <div class="card-header">
          <!--begin::Card title-->
          <div class="card-title">
            <h2>Summary</h2>
          </div>
          <!--end::Card title-->
        </div>
        <!--end::Card header-->

        <!--begin::Card body-->
        <div class="card-body pt-0 fs-6">
          <!--begin::Section-->
          <div class="mb-7">
            <!--begin::Title-->

            <!--end::Title-->

            <h6 class="fw-semobold text-gray-800 text-hover-primary">
              {{ profileDetails.company_name || "" }}
            </h6>

            <!--begin::Details-->
            <div class="d-flex align-items-center mb-1">
              <!--begin::Name-->
              <span class="fw-bold text-gray-600 text-hover-primary me-2">
                {{ profileDetails.name || "" }}
              </span>
              <!--end::Name-->
            </div>
            <!--end::Details-->

            <!--begin::Email-->
            <a href="#" class="fw-semobold text-gray-600 text-hover-primary">{{
              profileDetails.email || ""
            }}</a>
            <!--end::Email-->
          </div>
          <!--end::Section-->

          <!--begin::Seperator-->
          <div class="separator separator-dashed mb-7"></div>
          <!--end::Seperator-->

          <!--begin::Section-->
          <div class="mb-7">
            <!--begin::Title-->
            <h5 class="mb-3">Is Login Allowed ?</h5>
            <!--end::Title-->

            <!--begin::Details-->
            <div class="mb-2">
              <!--begin::Price-->
              <span
                v-if="profileDetails.grant_access == true"
                class="badge py-3 px-4 fs-7 badge-light-success"
                >Yes</span
              >
              <span
                v-if="profileDetails.grant_access == false"
                class="badge py-3 px-4 fs-7 badge-light-primary"
                >No</span
              >
              <span v-else></span>
              <!--end::Price-->
            </div>
            <!--end::Details-->
          </div>
          <!--end::Section-->

          <!--begin::Actions-->
          <div class="d-flex justify-content-start gap-2 mb-0">
            <button
              v-if="profileDetails.grant_access == true"
              type="button"
              ref="revokeSubmitButton"
              @click="revokeLogin"
              class="btn btn-sm btn-danger"
              id="kt_subscriptions_create_button"
            >
              <!--begin::Indicator-->
              <span class="indicator-label">Revoke Login</span>
              <span class="indicator-progress"
                >Please wait...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span
              ></span>
              <!--end::Indicator-->
            </button>
            <button
              v-if="profileDetails.grant_access == false"
              type="button"
              ref="grantSubmitButton"
              @click="grantLogin"
              class="btn btn-sm btn-success"
              id="kt_subscriptions_create_button"
            >
              <!--begin::Indicator-->
              <span class="indicator-label">Grant Login</span>
              <span class="indicator-progress"
                >Please wait...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span
              ></span>
              <!--end::Indicator-->
            </button>
          </div>
          <!--end::Actions-->
        </div>
        <!--end::Card body-->
      </div>
      <!--end::Card-->
    </div>
    <!--end::Sidebar-->
  </div>
  <!--end::Layout-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref, watch } from "vue";

import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";
import { revokeCustomerLogin, grantCustomerLogin, getCustomer } from "@/stores/api";
import ApiService from "@/core/services/ApiService";
import moment from "moment";
import { useAuthStore } from "@/stores/auth";
import { useRoute, useRouter } from "vue-router";

interface LDetails {
  name: string;
  email: string;
  phone: string;
}

interface ProfileDetails {
  name: string;
  email: string;
  mobile: string;
  extra_leads: Array<LDetails>;
  enquiry_no: string;
  address1: string;
  address2: string;
  city: string;
  pincode: string;
  state: string;
  country: string;
  gst_number: string;
  source: string;
  is_converted: boolean;
  grant_access: boolean;
  is_active: number;
  company_id: string;
  company_name: string;
  created_by: string;
  updated_by: string;
}

export default defineComponent({
  name: "customers-login",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  setup() {
    const revokeSubmitButton = ref<null | HTMLButtonElement>(null);
    const grantSubmitButton = ref<null | HTMLButtonElement>(null);
    const auth = useAuthStore();
    const router = useRouter();
    const route = useRoute();

    const loading = ref(false);
    const User = auth.GetUser();
    const customerId = route.params.id;

    onMounted(async () => {
      try {
        const response = await getCustomer(customerId);

        if (response.success) {
          if (response.result.is_converted == 0) {
            router.push({ name: "customers-list" });
            return;
          }

          profileDetails.value = {
            name: response.result.name,
            email: response.result.email,
            mobile: response.result.mobile,
            enquiry_no: response.result.enquiry_no,
            extra_leads: response.result.extra_leads
              ? JSON.parse(response.result.extra_leads)
              : [],
            address1: response.result.address1,
            address2: response.result.address2,
            country: response.result.country,
            state: response.result.state,
            city: response.result.city,
            pincode: response.result.pincode,
            gst_number: response.result.gst_number,
            source: response.result.source,
            is_converted: response.result.is_converted,
            grant_access: response.result.grant_access || false,
            company_name: response.result.company_name,
            is_active: response.result.is_active,
            company_id: response.result.company_id,
            created_by: response.result.created_by,
            updated_by: User.id,
          };
        } else {
          console.error(
            `Error Occured in getCustomer : ${
              response.message || "Error Occured in API"
            }`
          );
        }
      } catch (err) {
        console.error(`Error Occured in getCustomer : ${err}`);
      }
    });

    const profileDetails = ref<ProfileDetails>({
      name: "",
      email: "",
      mobile: "",
      extra_leads: [],
      enquiry_no: "",
      address1: "",
      address2: "",
      country: "",
      state: "",
      city: "",
      pincode: "",
      gst_number: "",
      source: "",
      is_converted: true,
      grant_access: false,
      company_name: "",
      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
      is_active: 1,
    });

    const revokeLogin = async () => {
      try {
        if (revokeSubmitButton.value) {
          // Activate indicator
          revokeSubmitButton.value.setAttribute("data-kt-indicator", "on");
        }
        loading.value = true;

        // Call your API here
        const response = await revokeCustomerLogin(customerId, profileDetails.value);

        if (response?.success) {
          // Handle successful API response
          loading.value = false;
          showSuccessAlert(
            "Success",
            response.message || "Customer Updated Successfully!"
          );
          router.push({ name: "customers-list" });
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
        if (revokeSubmitButton.value) {
          revokeSubmitButton.value.removeAttribute("data-kt-indicator");
        }
        loading.value = false;
      }
    };

    const grantLogin = async () => {
      try {
        if (grantSubmitButton.value) {
          // Activate indicator
          grantSubmitButton.value.setAttribute("data-kt-indicator", "on");
        }
        loading.value = true;

        // Call your API here
        const response = await grantCustomerLogin(customerId, profileDetails.value);

        if (response?.success) {
          // Handle successful API response
          loading.value = false;
          showSuccessAlert(
            "Success",
            response.message || "Customer Updated Successfully!"
          );
          router.push({ name: "customers-list" });
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
        if (grantSubmitButton.value) {
          grantSubmitButton.value.removeAttribute("data-kt-indicator");
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
      grantSubmitButton,
      revokeSubmitButton,
      profileDetails,
      getAssetPath,
      revokeLogin,
      grantLogin,
      loading,
    };
  },
});
</script>
