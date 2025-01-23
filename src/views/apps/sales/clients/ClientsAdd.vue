<template>
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
        <h3 class="fw-bold m-0">Profile Details</h3>
      </div>
      <!--end::Card title-->
    </div>
    <!--begin::Card header-->

    <div id="kt_account_profile_details" class="collapse show">
      <!--begin::Form-->
      <VForm
        id="kt_account_profile_details_form"
        class="form"
        novalidate
        @submit="onsubmit()"
        :validation-schema="profileDetailsValidator"
      >
        <!--begin::Card body-->
        <div class="card-body border-top p-9">
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-semobold fs-6"
              >Lead Name</label
            >
            <!--end::Label-->

            <div class="col-lg">
              <!--begin::Row-->
              <div class="col-lg fv-row">
                <div>
                  <el-select
                    v-model="profileDetails.customer_id"
                    filterable
                    placeholder="Please Select Lead..."
                  >
                    <el-option
                      disabled
                      key=""
                      label="Please Select Lead..."
                      value=""
                      >Please Select Customer...</el-option
                    >
                    <el-option
                      v-for="item in Leads"
                      :key="item.id"
                      :label="`${item.company_name}`"
                      :value="item.id"
                    />
                  </el-select>
                </div>
              </div>
              <!--end::Row-->
            </div>
          </div>

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6">
              <span class="required">Company Name</span>
            </label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="text"
                name="company_name"
                class="form-control form-control-lg form-control-solid"
                placeholder="Company Name"
                v-model="profileDetails.company_name"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="company_name" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6">
              <span class="required">Full Name</span>
            </label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="text"
                name="name"
                class="form-control form-control-lg form-control-solid"
                placeholder="Enter Person Name"
                v-model="profileDetails.name"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="name" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-semobold fs-6"
              >Email</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="text"
                name="email"
                class="form-control form-control-lg form-control-solid"
                placeholder="Email"
                v-model="profileDetails.email"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="email" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6">
              <span class="required">Contact Phone</span>

              <i
                class="fas fa-exclamation-circle ms-1 fs-7"
                v-tooltip
                title="Phone number must be active"
              ></i>
            </label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="tel"
                name="mobile"
                class="form-control form-control-lg form-control-solid"
                placeholder="Phone number"
                v-model="profileDetails.mobile"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="mobile" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <div class="separator my-10"></div>

          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6">
              <span>Address 1</span>
            </label>
            <!--begin::Col-->
            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="textarea"
                name="address1"
                as="textarea"
                class="form-control form-control-lg form-control-solid"
                placeholder="eg. plot no, apartment name"
                v-model="profileDetails.address1"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="address1" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>

          <!-- address 2 -->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6">
              <span>Address 2</span>
            </label>
            <!--begin::Col-->
            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="textarea"
                name="address2"
                as="textarea"
                class="form-control form-control-lg form-control-solid"
                placeholder="eg. street name, road name, area name"
                v-model="profileDetails.address2"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="address2" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6"
              >Country</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8">
              <!--begin::Row-->
              <div class="row">
                <!--begin::Col-->
                <div class="col-lg fv-row">
                  <el-select
                    v-model="profileDetails.country"
                    filterable
                    placeholder="Select Your Country..."
                  >
                    <el-option
                      v-for="item in countries"
                      :key="item.name"
                      :label="item.name"
                      :value="item.name"
                    />
                  </el-select>
                </div>
                <!--end::Col-->
              </div>
              <!--end::Row-->
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->
          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6"
              >State</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8">
              <!--begin::Row-->
              <div class="row">
                <!--begin::Col-->
                <!--begin::Col-->
                <div v-if="state.length" class="col-lg fv-row">
                  <div>
                    <el-select
                      v-model="profileDetails.state"
                      filterable
                      placeholder="Select Your State..."
                    >
                      <el-option
                        v-for="item in state"
                        :key="item"
                        :label="item"
                        :value="item"
                      />
                    </el-select>
                  </div>
                </div>

                <div v-if="!state.length" class="col-lg fv-row">
                  <div>
                    <Field
                      type="text"
                      name="state"
                      class="form-control form-control-lg form-control-solid"
                      placeholder="Enter State Name"
                      v-model="profileDetails.state"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="state" />
                      </div>
                    </div>
                  </div>
                </div>
                <!--end::Col-->
                <!--end::Col-->
              </div>
              <!--end::Row-->
            </div>
            <!--end::Col-->
          </div>
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6"
              >Pincode</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg">
              <!--begin::Row-->
              <div class="row">
                <!--begin::Col-->
                <div class="col-lg fv-row">
                  <Field
                    type="text"
                    name="pincode"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Enter Pincode"
                    v-model="profileDetails.pincode"
                  />
                </div>
                <!--end::Col-->
              </div>
              <!--end::Row-->
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6">City</label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg">
              <!--begin::Row-->
              <div class="row">
                <!--begin::Col-->
                <div class="col-lg fv-row">
                  <Field
                    type="text"
                    name="city"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Enter City Name"
                    v-model="profileDetails.city"
                  />
                </div>
                <!--end::Col-->
              </div>
              <!--end::Row-->
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6"
              >GST Number</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg">
              <!--begin::Row-->
              <div class="row">
                <!--begin::Col-->
                <div class="col-lg fv-row position-relative">
                  <Field
                    type="text"
                    name="gst_number"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Enter GST Number"
                    v-model="profileDetails.gst_number"
                    v-on:keyup="debouncedValidateGST"
                  />
                  <div
                    v-if="validGSTRef === true"
                    class="position-absolute end-0 top-50 translate-middle-y"
                  >
                    <i
                      class="fas fs-4 fa-check-circle text-success me-6"
                      v-tooltip
                      title="GST number is valid"
                    ></i>
                  </div>
                  <div
                    v-else
                    class="position-absolute end-0 top-50 translate-middle-y"
                  >
                    <i
                      class="fas fs-4 fa-times-circle text-danger me-6"
                      v-tooltip
                      title="GST number is Invalid/Incorrect"
                    ></i>
                  </div>
                </div>
                <!--end::Col-->
              </div>
              <!--end::Row-->
            </div>
            <!--end::Col-->
          </div>
        </div>
        <div class="modal-footer flex-center">
          <!--begin::Button-->
          <button
            type="button"
            @click="clear"
            class="btn btn-lg btn-danger w-sd-25 w-lg-25"
          >
            Clear
          </button>
          <!--end::Button-->
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <!--begin::Button-->

          <!--begin::Button-->
          <button
            ref="submitButton"
            type="submit"
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
  <!--end::Basic info-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref, watch } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";
import { addClient, getLeads, getLead, getCompanies } from "@/stores/api";
import ApiService from "@/core/services/ApiService";
import moment from "moment";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { countries, INstates } from "@/core/model/countries";
import { debounce } from "@/core/helpers/debounce";
import { Identifier } from "@/core/config/WhichUserConfig";

interface ProfileDetails {
  customer_id: string;
  name: string;
  email: string;
  mobile: string;
  address1: string;
  address2: string;
  city: string;
  pincode: string;
  state: string;
  country: string;
  gst_number: string;
  is_active: number;
  company_id: string;
  company_name: string;
  created_by: string;
  updated_by: string;
}

export default defineComponent({
  name: "clients-add",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  setup() {
    const submitButton = ref<null | HTMLButtonElement>(null);
    const identifier = Identifier;
    const auth = useAuthStore();
    const User = auth.GetUser();
    const router = useRouter();
    const loading = ref(false);

    const Companies = ref([{ id: "", company_name: "" }]);
    const Leads = ref([{ id: "", company_name: "" }]);

    const state = ref([""]);

    const getdropcomp = async () => {
      try {
        ApiService.setHeader();
        const response = await getCompanies(`fetchAll=true`);

        if (response.success) {
          if (response.result != null && response.result) {
            Companies.value.push(
              ...response.result?.map(({ ...rest }) => ({
                ...rest,
              }))
            );
          }
        } else {
          console.error(
            `Error Occured in getCompanies : ${
              response.message || "Error Occured in API"
            }`
          );
        }
      } catch (err) {
        console.error(`Error Occured in getCompanies : ${err}`);
      }
    };

    const GetLeads = async () => {
      try {
        ApiService.setHeader();
        const response = await getLeads(`fetchAll=true`);

        if (response.success) {
          if (response.result != null && response.result) {
            Leads.value.push(
              ...response.result?.map(({ id, ...rest }) => ({
                id,
                ...rest,
              }))
            );
          }
        } else {
          console.error(
            `Error Occured in getLeads : ${
              response.message || "Error Occured in API"
            }`
          );
        }
      } catch (err) {
        console.error(`Error Occured in getLeads : ${err}`);
      }
    };

    const profileDetailsValidator = Yup.object().shape({
      name: Yup.string().required().label("Person Name"),
      email: Yup.string().required().email().label("Email"),
      mobile: Yup.string().required().label("Phone"),
      company_name: Yup.string().required().label("Company Name"),
    });

    const profileDetails = ref<ProfileDetails>({
      customer_id: "",
      name: "",
      email: "",
      mobile: "",
      address1: "",
      address2: "",
      country: "",
      state: "",
      city: "",
      pincode: "",
      gst_number: "",
      company_name: "",
      is_active: 1,
      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
    });

    onMounted(async () => {
      state.value.pop();
      Leads.value.pop();
      await GetLeads();
    });

    const validGSTRef = ref(false);

    async function isValidGSTNo() {
      // Regex to check valid GST CODE
      const regex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

      // Retrieve GST number from company details
      const str = profileDetails.value.gst_number;

      // Check if GST number is null or not 15 characters long
      if (str == null || str.length !== 15) {
        validGSTRef.value = false;
        return false;
      }

      // Check if the GST number matches the regex pattern
      if (regex.test(str)) {
        validGSTRef.value = true;
        return true;
      } else {
        validGSTRef.value = false;
        return false;
      }
    }

    const debouncedValidateGST = debounce(isValidGSTNo, 1000);

    const onsubmit = async () => {
      if (
        profileDetails.value.customer_id == "" ||
        profileDetails.value.customer_id == null
      ) {
        showErrorAlert("Error", "Please Select Lead.");
        return;
      }

      try {
        if (submitButton.value) {
          // Activate indicator
          submitButton.value.setAttribute("data-kt-indicator", "on");
        }
        loading.value = true;

        // Call your API here
        const response = await addClient(profileDetails.value);

        if (response?.success) {
          // Handle successful API response
          loading.value = false;
          showSuccessAlert(
            "Success",
            response.message || "Client Added Successfully!"
          );
          router.push({ name: "clients-list" });
          clear();
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

    watch(
      () => profileDetails.value.country,
      (newVal) => {
        while (state.value.length) {
          state.value.pop();
        }
        if (newVal === "India") {
          profileDetails.value.state = "";
          INstates.forEach((ele) => {
            state.value.push(ele.name);
          });
          //console.log(state);
        } else {
          profileDetails.value.state = "";
        }
      }
    );

    const clear = () => {
      profileDetails.value = {
        customer_id: "",
        name: "",
        email: "",
        mobile: "",
        address1: "",
        address2: "",
        city: "",
        pincode: "",
        state: "",
        country: "",
        gst_number: "",
        company_id: User.company_id,
        company_name: "",
        created_by: User.id,
        updated_by: User.id,
        is_active: 1,
      };
    };

    return {
      submitButton,
      Companies,
      identifier,
      profileDetails,
      profileDetailsValidator,
      getAssetPath,
      onsubmit,
      loading,
      clear,
      countries,
      state,
      Leads,
      validGSTRef,
      debouncedValidateGST,
    };
  },
});
</script>
