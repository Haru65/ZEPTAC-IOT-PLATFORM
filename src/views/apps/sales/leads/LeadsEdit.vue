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
            <label class="col-lg-4 col-form-label required fw-semobold fs-6"
              >Contact Person</label
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
                    name="fname"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    placeholder="First name"
                    v-model="profileDetails.first_name"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="fname" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->

                <!--begin::Col-->
                <div class="col-lg-6 fv-row">
                  <Field
                    type="text"
                    name="lname"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Last name"
                    v-model="profileDetails.last_name"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="lname" />
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
                name="phone"
                class="form-control form-control-lg form-control-solid"
                placeholder="Phone number"
                v-model="profileDetails.phone"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="phone" />
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

              <i
                class="fas fa-exclamation-circle ms-1 fs-7"
                data-bs-toggle="tooltip"
                title="Enquiry Number Required"
              ></i>
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
                      v-model="profileDetails.states"
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
                      v-model="profileDetails.states"
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
            :data-kt-indicator="loading ? 'on' : null"
            class="btn btn-lg btn-primary w-sd-25 w-lg-25"
            type="submit"
          >
            <span v-if="!loading" class="indicator-label"> Update </span>
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
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  confpassword: string;
  role_id: string;
  extra_leads: Array<LDetails>;
  enquiry_no: string;
  address1: string;
  address2: string;
  country: string;
  states: string;
  pincode: string;
  city: string;
  gst_number: string;
  company_id: string;
  company_name: string;
  created_by: string;
  updated_by: string;
}

export default defineComponent({
  name: "account-settings",
  components: {
    ErrorMessage,
    Field,
    VForm,
    LeadModal,
    LeadEditModal,
  },
  setup() {
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
      ApiService.setHeader();
      const response = await getCompanies(`fetchAll=true`);
      if (response.result != null && response.result) {
        Companies.value.push(
          ...response.result?.map(({ created_at, ...rest }) => ({
            ...rest,
            created_at: moment(created_at).format("DD-MM-YYYY"),
          }))
        );
        // console.log(Companies);
      }
    };

    onMounted(async () => {
      state.value.pop();
      Companies.value.pop();
      // await getdropcomp();
      // add customer details
      const res = await getLead(LeadId);
      profileDetails.value = {
        first_name: res.first_name,
        last_name: res.last_name,
        email: res.email,
        phone: res.mobile,
        password: "",
        confpassword: "",
        role_id: res.role_id,
        enquiry_no: res.meta.enquiry_no,
        extra_leads: res.meta?.extra_leads
          ? JSON.parse(res.meta?.extra_leads)
          : [],
        address1: res.meta.address1,
        address2: res.meta.address2,
        country: res.meta.country,
        states: res.meta.states,
        city: res.meta.city,
        pincode: res.meta.pincode,
        gst_number: res.meta.gst_number,
        company_id: User.company_id,
        company_name: res.meta.company_name,
        created_by: User.id,
        updated_by: User.id,
      };
      
      await debounce(isValidGSTNo, 1000);
      
    });

    const emailFormDisplay = ref(false);
    const passwordFormDisplay = ref(false);

    const profileDetailsValidator = Yup.object().shape({
      fname: Yup.string().required().label("First name"),
      lname: Yup.string().required().label("Last name"),
      email: Yup.string().required().email().label("Email"),
      phone: Yup.string().required().label("Phone"),
      company_name: Yup.string().required().label("Company Name"),
    });

    const profileDetails = ref<ProfileDetails>({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      password: "",
      confpassword: "",
      role_id: "",
      extra_leads: [],
      enquiry_no: "",
      address1: "",
      address2: "",
      country: "",
      states: "",
      city: "",
      pincode: "",
      gst_number: "",
      company_id: User.company_id,
      company_name: "",
      created_by: User.id,
      updated_by: User.id,
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
      loading.value = true;
      // console.log(profileDetails.value);
      console.warn("Nice");
      try {
        // Call your API here with the form values
        const response = await updateLead(LeadId, profileDetails.value);
        // console.log(response.error);
        if (!response.error) {
          // Handle successful API response
          // console.log("API response:", response);
          showSuccessAlert("Success", "User have been successfully inserted!");
          route.push({ name: "leads-list" });
          clear();
        } else {
          // Handle API error response
          const errorData = response.error;
          console.log("API error:", errorData);
          // console.log("API error:", errorData.response.data.errors);
          showErrorAlert(
            "Warning",
            "Please Fill the Form Fields Correctly" + errorData
          );
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
          // profileDetails.value.states = "";
        }
      }
    );

    const clear = () => {
      profileDetails.value = {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "decodedemo",
        confpassword: "",
        role_id: "8",
        extra_leads: [],
        enquiry_no: "",
        address1: "",
        address2: "",
        country: "",
        states: "",
        city: "",
        pincode: "",
        gst_number: "",
        company_id: "",
        company_name: "",
        created_by: User.id,
        updated_by: User.id,
      };
    };

    return {
      profileDetails,
      emailFormDisplay,
      passwordFormDisplay,
      profileDetailsValidator,
      getAssetPath,
      onsubmit,
      loading,
      clear,
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
