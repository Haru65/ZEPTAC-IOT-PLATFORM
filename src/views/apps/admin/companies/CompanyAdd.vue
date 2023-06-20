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
          :validation-schema="companyDetailsValidator"
        >
          <!--begin::Card body-->
          <div class="card-body border-top p-9">
            <!--begin::Input group-->
            <div class="row mb-6">
              <!--begin::Label-->
              <label class="col-lg-4 col-form-label required fw-semobold fs-6"
                >Company Name & company_Address</label
              >
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-8">
                <!--begin::Row-->
                <div class="row">
                  <!--begin::Col-->
                  <div class="col-lg-6 fv-row">
                    <Field
                      type="text"
                      name="company_name"
                      class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                      placeholder="Company name"
                      v-model="companyDetails.company_name"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="company_name" />
                      </div>
                    </div>
                  </div>
                  <!--end::Col-->

                  <!--begin::Col-->
                  <div class="col-lg-6 fv-row">
                    <Field
                      type="text"
                      name="company_address"
                      class="form-control form-control-lg form-control-solid"
                      placeholder="Company company_address"
                      v-model="companyDetails.address"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="company_address" />
                      </div>
                    </div>
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
              <label class="col-lg-4 col-form-label required fw-semobold fs-6"
                >Contact Person</label
              >
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-8 fv-row">
                <Field
                  type="text"
                  name="contact_person"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Contact Person"
                  v-model="companyDetails.contact_person"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="contact_person" />
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
                  data-bs-toggle="tooltip"
                  title="Phone number must be active"
                ></i>
              </label>
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-8 fv-row">
                <Field
                  type="tel"
                  name="contact"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Phone number"
                  v-model="companyDetails.mobile_number"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="contact" />
                  </div>
                </div>
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <!--end::Input group-->

            <div class="row">
              <!--begin::Input group-->
              <div class="row mb-6">
                <!--begin::Label-->
                <label class="col-lg-4 col-form-label fw-semobold fs-6">
                  <span class="required">Email</span>

                  <i
                    class="fas fa-exclamation-circle ms-1 fs-7"
                    data-bs-toggle="tooltip"
                    title="Phone number must be active"
                  ></i>
                </label>
                <!--end::Label-->

                <!--begin::Col-->
                <div class="col-lg-8 fv-row">
                  <Field
                    type="text"
                    name="email"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Email"
                    v-model="companyDetails.email"
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
                <label class="col-lg-4 col-form-label required fw-semobold fs-6"
                  >Country & State</label
                >
                <!--end::Label-->

                <!--begin::Col-->
                <div class="col-lg-8">
                  <!--begin::Row-->
                  <div class="row">
                    <!--begin::Col-->
                    <div class="col-lg-6 fv-row">
                      <Field
                        as="select"
                        name="role"
                        class="form-select form-select-solid form-select-lg"
                        v-model="companyDetails.country"
                      >
                        <option value="">Select Country ..</option>
                        <option
                          v-for="ele in countries"
                          :key="ele.name"
                          :value="ele.name"
                        >
                          {{ ele.name }}
                        </option>
                      </Field>
                    </div>
                    <!--end::Col-->

                    <!--begin::Col-->
                    <div v-if="state.length" class="col-lg-6 fv-row">
                      <div>
                        <Field
                          as="select"
                          name="state"
                          class="form-select form-select-solid form-select-lg"
                          v-model="companyDetails.state"
                        >
                          <option value="">Select State ...</option>
                          <option v-for="ele in state" :key="ele" :value="ele">
                            {{ ele }}
                          </option>
                        </Field>
                      </div>
                    </div>

                    <div v-if="!state.length" class="col-lg-6 fv-row">
                      <div>
                        <Field
                          type="tel"
                          name="state"
                          class="form-control form-control-lg form-control-solid"
                          placeholder="Please Type State."
                          v-model="companyDetails.state"
                        />
                        <div class="fv-plugins-message-container">
                          <div class="fv-help-block">
                            <ErrorMessage name="state" />
                          </div>
                        </div>
                      </div>
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
                <label class="col-lg-4 col-form-label required fw-semobold fs-6"
                  >City & Pincode</label
                >
                <!--end::Label-->
                <!--begin::Col-->
                <div class="col-lg-8">
                  <!--begin::Row-->
                  <div class="row">
                    <!--begin::Col-->
                    <div class="col-lg-6 fv-row">
                      <Field
                        type="text"
                        name="city"
                        class="form-control form-control-lg form-control-solid"
                        placeholder="City"
                        v-model="companyDetails.city"
                      />
                      <div class="fv-plugins-message-container">
                        <div class="fv-help-block">
                          <ErrorMessage name="city" />
                        </div>
                      </div>
                    </div>
                    <!--end::Col-->

                    <!--begin::Col-->
                    <div class="col-lg-6 fv-row">
                      <Field
                        type="text"
                        name="pincode"
                        class="form-control form-control-lg form-control-solid"
                        placeholder="Pincode"
                        v-model="companyDetails.pincode"
                      />
                      <div class="fv-plugins-message-container">
                        <div class="fv-help-block">
                          <ErrorMessage name="pincode" />
                        </div>
                      </div>
                    </div>
                    <!--end::Col-->
                  </div>
                  <!--end::Row-->
                </div>
                <!--end::Col-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="row mb-3">
                <!--begin::Label-->
                <label class="col-lg-4 col-form-label required fw-semobold fs-6"
                  >GST Detials</label
                >
                <!--end::Label-->
                <!--begin::Col-->
                <div class="col-lg-8">
                  <!--begin::Row-->
                  <!--begin::Col-->
                  <div class="col-lg fv-row">
                    <Field
                      type="text"
                      as="textarea"
                      name="gst_details"
                      class="form-control form-control-lg form-control-solid"
                      placeholder="GST"
                      v-model="companyDetails.gst_details"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="gst_details" />
                      </div>
                    </div>
                  </div>
                  <!--end::Col-->
                  <!--end::Row-->
                </div>
                <!--end::Col-->
              </div>
              <!--end::Input group-->
              <!--begin::Input group-->
              <div class="row mb-6">
                <!--begin::Label-->
                <label class="col-lg-4 col-form-label required fw-semobold fs-6"
                  >User Limit & Package</label
                >
                <!--end::Label-->

                <!--begin::Col-->
                <div class="col-lg-8">
                  <!--begin::Row-->
                  <div class="row">
                    <!--begin::Col-->
                    <div class="col-lg-6 fv-row">
                      <Field
                        as="select"
                        name="user_limit"
                        class="form-select form-select-solid form-select-lg"
                        v-model="companyDetails.user_limit"
                      >
                        <option v-for="ele in limit" :key="ele" :value="ele">
                          {{ ele }}
                        </option>
                      </Field>
                    </div>
                    <!--end::Col-->

                    <!--begin::Col-->
                    <div class="col-lg-6 fv-row">
                      <div>
                        <Field
                          as="select"
                          name="package"
                          class="form-select form-select-solid form-select-lg"
                          v-model="companyDetails.selected_package"
                        >
                          <option value="">Select a Package ...</option>
                          <option
                            v-for="ele in packages"
                            :key="ele"
                            :value="ele"
                          >
                            {{ ele }}
                          </option>
                        </Field>
                      </div>
                    </div>
                    <!--end::Col-->
                  </div>
                  <!--end::Row-->
                </div>
                <!--end::Col-->
              </div>
              <!--end::Input group-->
            </div>
          </div>
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <button type="reset" class="btn btn-lg btn-danger w-25">
              Discard
            </button>
            <!--end::Button-->
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <!--begin::Button-->
            <button
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-lg btn-primary w-25"
              type="submit"
              @click="submit()"
            >
              <span v-if="!loading" class="indicator-label"> Submit </span>
              <span v-if="loading" class="indicator-progress">
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
import { defineComponent, onMounted, ref, watch } from "vue";
import { countries, INstates } from "@/core/model/countries";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { addCompany } from "@/stores/api";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import packages from "@/core/config/PackagesConfig";
import { limit } from "@/core/config/WhichUserConfig";


interface companyDetails {
  company_name: string;
  address: string;
  contact_person: string;
  mobile_number: string;
  email: string;
  country: string;
  state: string;
  pincode: string;
  city: string;
  gst_details: string;
  user_limit: number;
  selected_package: string;
}

export default defineComponent({
  name: "company-add",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  setup() {
    const updateEmailButton = ref<HTMLElement | null>(null);
    const updatePasswordButton = ref<HTMLElement | null>(null);

    const loading = ref(false);

    const emailFormDisplay = ref(false);
    const passwordFormDisplay = ref(false);

    const state = ref([""]);

    const companyDetailsValidator = Yup.object().shape({
      company_name: Yup.string().required().label("Compnay Name"),
      company_address: Yup.string().required().label("Company Address"),
      contact_person: Yup.string().required().label("Contact Person"),
      contact: Yup.string().required().label("Contact"),
      email: Yup.string().required().email().label("Email"),
      country: Yup.string().required().label("Country"),
      state: Yup.string().required().label("State"),
      city: Yup.string().required().label("City"),
      pincode: Yup.string().required().label("Pincode"),
      gst_details: Yup.string().required().label("GST Detials"),
    });

    const companyDetails = ref<companyDetails>({
      company_name: "",
      address: "",
      contact_person: "",
      mobile_number: "",
      email: "",
      country: "",
      state: "",
      pincode: "",
      city: "",
      gst_details: "",
      user_limit: 1,
      selected_package: "",
    });

    onMounted(() => {
      state.value.pop();
    });

    watch(
      () => companyDetails.value.country,
      (newVal) => {
        while (state.value.length) {
          state.value.pop();
        }
        if (newVal === "India") {
          companyDetails.value.state = "";
          INstates.forEach((ele) => {
            state.value.push(ele.name);
          });
          //console.log(state);
        } else {
          companyDetails.value.state = "";
        }
      }
    );

    const submit = async () => {
      loading.value = true;
      console.warn("Nice");
      try {
        // Call your API here with the form values
        const response = await addCompany(companyDetails.value);
        console.log(response.error);
        if (!response.error) {
          // Handle successful API response
          console.log("API response:", response);
          showSuccessAlert(
            "Success",
            "Company details have been successfully inserted!"
          );

          clear();
        } else {
          // Handle API error response
          const errorData = response.error;
          console.log("API error:", errorData);
          // console.log("API error:", errorData.response.data.errors);
          showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
        }
      } catch (error) {
        // Handle any other errors during API call
        console.error("API call error:", error);
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

    const clear = () => {
      companyDetails.value = {
        company_name: "...",
        address: "...",
        contact_person: "...",
        mobile_number: "...",
        email: "...",
        country: "",
        state: "",
        pincode: "...",
        city: "...",
        gst_details: "..",
        user_limit: 1,
        selected_package: " ",
      };
    };
    return {
      companyDetails,
      emailFormDisplay,
      passwordFormDisplay,
      companyDetailsValidator,
      updateEmailButton,
      updatePasswordButton,
      getAssetPath,
      submit,
      countries,
      loading,
      state,
      packages,
      limit,
    };
  },
});
</script>
