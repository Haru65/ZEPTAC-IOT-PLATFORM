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

    <!--begin::Content-->
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
              <span class="required">Contact Person</span>
            </label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="text"
                name="name"
                class="form-control form-control-lg form-control-solid"
                placeholder="Contact Person Name"
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
                data-bs-toggle="tooltip"
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
          <!--end::Input group-->
          <div class="separator my-10"></div>
          <!--begin::Accordion-->
          <div class="accordion" id="kt_accordion_1">
            <div class="accordion-item">
              <h2 class="accordion-header" :id="'kt_accordion_1_header_'">
                <button
                  class="accordion-button fs-4 fw-semibold"
                  type="button"
                  :data-bs-toggle="'collapse'"
                  :data-bs-target="'#kt_accordion_1_body_'"
                  :aria-controls="'kt_accordion_1_body_'"
                >
                  Leads Information <i class="fs-6"> ( optional ) </i>
                </button>
              </h2>
              <div
                :id="'kt_accordion_1_body_'"
                class="accordion-collapse"
                :aria-labelledby="'kt_accordion_1_header_'"
                data-bs-parent="#kt_accordion_1"
              >
                <div class="accordion-body">
                  <div>
                    <!-- Add content for nested accordion here -->
                    <div class="table-responsive">
                      <table
                        class="table table-rounded table-striped border gy-7 gs-7 text-nowrap"
                      >
                        <thead>
                          <tr
                            class="fw-semibold fs-6 text-gray-800 border-bottom border-gray-200 text-align-center"
                          >
                            <th class="col-5">Full Name</th>
                            <th class="col-3">Email</th>
                            <th class="col-3">Phone</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(lead, index) in profileDetails.extra_leads"
                            :key="index"
                          >
                            <td class="align-middle">
                              <span
                                class="badge py-3 px-4 fs-7 badge-light-primary"
                                >{{ `${lead.name}` }}</span
                              >
                            </td>
                            <td class="align-middle">
                              <span
                                class="badge py-3 px-4 fs-7 badge-light-primary"
                                >{{ `${lead.email}` }}</span
                              >
                            </td>
                            <td class="align-middle">
                              <span
                                class="badge py-3 px-4 fs-7 badge-light-primary"
                                >{{ `${lead.phone}` }}</span
                              >
                            </td>
                            <td>
                              <div
                                class="btn-group"
                                role="group"
                                aria-label="View and Delete Buttons"
                              >
                                <button
                                  type="button"
                                  class="btn btn-primary btn-sm"
                                  data-bs-toggle="modal"
                                  :data-bs-target="
                                    '#kt_modal_new_address_' + index
                                  "
                                >
                                  <i class="bi bi-eye"></i> Edit
                                </button>

                                <LeadEditModal
                                  :key="index"
                                  :leadId="index"
                                  :heading="'Edit Lead Information'"
                                  :leadInfo="lead"
                                  @editData="editLeadData"
                                ></LeadEditModal>

                                <button
                                  type="button"
                                  class="btn btn-danger btn-sm"
                                  @click="deleteLeadData(index)"
                                >
                                  <i class="bi bi-trash"></i> Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                          <tr
                            class="text-center"
                            v-if="profileDetails.extra_leads.length === 0"
                          >
                            <td
                              colspan="3"
                              class="fw-semibold fs-6 text-gray-800 border-bottom border-gray-200 text-align-center"
                            >
                              secondary leads are not added.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div class="text-start mt-8">
                    <button
                      type="button"
                      data-toggle="tooltip"
                      title="lead information"
                      class="btn btn-primary btn-sm"
                      data-bs-toggle="modal"
                      :data-bs-target="'#kt_modal_new_address'"
                    >
                      Add more contact persons
                    </button>
                  </div>

                  <LeadModal
                    :heading="'Secondary Leads'"
                    @addData="addLeadData"
                  ></LeadModal>
                </div>
              </div>
            </div>
          </div>
          <!--end::Accordion-->
          <div class="separator my-10"></div>

          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6">
              <span>Enquiry Number</span>
            </label>
            <!--begin::Col-->
            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="text"
                disabled
                name="enquiry_no"
                class="form-control form-control-lg form-control-solid"
                placeholder="Enter enquiry number"
                v-model="profileDetails.enquiry_no"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="enquiry_no" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>

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
                      data-toggle="tooltip"
                      title="GST number is valid"
                    ></i>
                  </div>
                  <div
                    v-else
                    class="position-absolute end-0 top-50 translate-middle-y"
                  >
                    <i
                      class="fas fs-4 fa-times-circle text-danger me-6"
                      data-toggle="tooltip"
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
            ref="submitButton"
            type="submit"
            class="btn btn-primary w-sd-25 w-lg-25"
          >
            <span class="indicator-label"> Update </span>
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
    <!--end::Content-->
  </div>
  <!--end::Basic info-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref, watch } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";
import { updateLead, getCompanies, getLead } from "@/stores/api";
import ApiService from "@/core/services/ApiService";
import moment from "moment";
import { useAuthStore } from "@/stores/auth";
import { useRoute, useRouter } from "vue-router";
import { countries, INstates } from "@/core/model/countries";
import LeadModal from "./CustomComponent/LeadModal.vue";
import LeadEditModal from "./CustomComponent/LeadEditModal.vue";
import { debounce } from "@/core/helpers/debounce";

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
  is_active: number;
  company_id: string;
  company_name: string;
  created_by: string;
  updated_by: string;
}

export default defineComponent({
  name: "leads-edit",
  components: {
    ErrorMessage,
    Field,
    VForm,
    LeadModal,
    LeadEditModal,
  },
  setup() {
    const submitButton = ref<null | HTMLButtonElement>(null);
    const auth = useAuthStore();
    const router = useRoute();
    const route = useRouter();
    let limit = ref(500);
    const loading = ref(false);
    const Companies = ref([{ id: "", company_name: "" }]);
    const state = ref([""]);
    const LeadId = router.params.id;
    const User = auth.GetUser();

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

    onMounted(async () => {
      state.value.pop();
      Companies.value.pop();

      try {
        const response = await getLead(LeadId);

        if (response.success) {
          if (response.result.is_converted) {
            route.push({ name: "leads-list" });
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
            company_name: response.result.company_name,
            is_active: response.result.is_active,
            company_id: response.result.company_id,
            created_by: response.result.created_by,
            updated_by: User.id,
          };
        } else {
          console.error(
            `Error Occured in getLead : ${
              response.message || "Error Occured in API"
            }`
          );
        }
      } catch (err) {
        console.error(`Error Occured in getLead : ${err}`);
      }

      await isValidGSTNo();
    });

    const profileDetailsValidator = Yup.object().shape({
      name: Yup.string().required().label("Contact Person Name"),
      email: Yup.string().required().email().label("Email"),
      mobile: Yup.string().required().label("Phone"),
      company_name: Yup.string().required().label("Company Name"),
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
      is_converted: false,
      company_name: "",
      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
      is_active: 1,
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

    async function addLeadData(data) {
      await profileDetails.value.extra_leads.push(data);
    }

    async function editLeadData(index, data) {
      profileDetails.value.extra_leads.push[index] = await data;
    }

    const removeObjectWithId = (arr, id) => {
      if (id !== -1) {
        arr.splice(id, 1);
      }

      return arr;
    };

    async function deleteLeadData(index) {
      //zero represent the testID
      profileDetails.value.extra_leads = await removeObjectWithId(
        profileDetails.value.extra_leads,
        index
      );
    }

    const onsubmit = async () => {
      try {
        if (submitButton.value) {
          // Activate indicator
          submitButton.value.setAttribute("data-kt-indicator", "on");
        }

        loading.value = true;

        // Call your API here
        const response = await updateLead(LeadId, profileDetails.value);

        if (response?.success) {
          // Handle successful API response
          loading.value = false;
          showSuccessAlert(
            "Success",
            response.message || "Lead updated Successfully!"
          );
          route.push({ name: "leads-list" });
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
          INstates.forEach((ele) => {
            state.value.push(ele.name);
          });
          //console.log(state);
        } else {
          // profileDetails.value.state = "";
        }
      }
    );

    return {
      submitButton,
      profileDetails,
      profileDetailsValidator,
      getAssetPath,
      onsubmit,
      loading,
      countries,
      state,
      addLeadData,
      editLeadData,
      deleteLeadData,
      debouncedValidateGST,
      validGSTRef,
    };
  },
});
</script>
