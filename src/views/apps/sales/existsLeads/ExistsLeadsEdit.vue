<template>
  <section class="h-100 m-lg-6 m-md-3 m-sm-1">
    <div class="row g-5 h-100">
      <div class="col-lg-6">
        <div class="card card-stretch shadow mb-5">
          <div class="card-header">
            <h3 class="card-title">Original Lead/Customer Data</h3>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table">
                <tbody class="fw-bold fs-6 text-gray-800">
                  <tr>
                    <td>Company Name :</td>
                    <td>{{ ogLeadDetails.company_name || "" }}</td>
                  </tr>
                  <tr>
                    <td>Contact Person :</td>
                    <td>{{ ogLeadDetails.name || "" }}</td>
                  </tr>
                  <tr>
                    <td>Email :</td>
                    <td>{{ ogLeadDetails.email || "" }}</td>
                  </tr>
                  <tr>
                    <td>Contact Phone :</td>
                    <td>{{ ogLeadDetails.mobile || "" }}</td>
                  </tr>
                  <tr>
                    <td>Address 1 :</td>
                    <td>{{ ogLeadDetails.address1 || "" }}</td>
                  </tr>
                  <tr>
                    <td>Address 2 :</td>
                    <td>{{ ogLeadDetails.address2 || "" }}</td>
                  </tr>
                  <tr>
                    <td>City :</td>
                    <td>{{ ogLeadDetails.city || "" }}</td>
                  </tr>
                  <tr>
                    <td>Pincode :</td>
                    <td>{{ ogLeadDetails.pincode || "" }}</td>
                  </tr>
                  <tr>
                    <td>State :</td>
                    <td>{{ ogLeadDetails.state || "" }}</td>
                  </tr>

                  <tr>
                    <td>Country :</td>
                    <td>{{ ogLeadDetails.country || "" }}</td>
                  </tr>
                  <tr>
                    <td>GST Number :</td>
                    <td>{{ ogLeadDetails.gst_number || "" }}</td>
                  </tr>

                  <tr>
                    <td>Is Converted to Customer :</td>
                    <td>{{ ogLeadDetails.is_converted ? "yes" : "no" }}</td>
                  </tr>
                  <tr>
                    <td>Extra Leads</td>
                    <td>
                      <div
                        v-for="(lead, index) in ogLeadDetails.extra_leads"
                        :key="index"
                      >
                        <p>
                          <span
                            class="badge py-3 px-4 fs-7 badge-light-primary"
                            >{{ `${lead.name}` }}</span
                          >
                        </p>
                        <p>
                          <span
                            class="badge py-3 px-4 fs-7 badge-light-primary"
                            >{{ `${lead.email}` }}</span
                          >
                        </p>
                        <p>
                          <span
                            class="badge py-3 px-4 fs-7 badge-light-primary"
                            >{{ `${lead.phone}` }}</span
                          >
                        </p>
                      </div>
                      <div v-if="tempLeadDetails.extra_leads.length === 0">
                        No secondary leads.
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="card card-stretch shadow mb-5">
          <div class="card-header">
            <h3 class="card-title">New Lead Data</h3>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table">
                <tbody class="fw-bold fs-6 text-gray-800">
                  <tr>
                    <td>Company Name :</td>
                    <td>{{ tempLeadDetails.company_name || "" }}</td>
                  </tr>
                  <tr>
                    <td>Contact Person :</td>
                    <td>{{ tempLeadDetails.name || "" }}</td>
                  </tr>
                  <tr>
                    <td>Email :</td>
                    <td>{{ tempLeadDetails.email || "" }}</td>
                  </tr>
                  <tr>
                    <td>Contact Phone :</td>
                    <td>{{ tempLeadDetails.mobile || "" }}</td>
                  </tr>
                  <tr>
                    <td>Address 1 :</td>
                    <td>{{ tempLeadDetails.address1 || "" }}</td>
                  </tr>
                  <tr>
                    <td>Address 2 :</td>
                    <td>{{ tempLeadDetails.address2 || "" }}</td>
                  </tr>
                  <tr>
                    <td>City :</td>
                    <td>{{ tempLeadDetails.city || "" }}</td>
                  </tr>
                  <tr>
                    <td>Pincode :</td>
                    <td>{{ tempLeadDetails.pincode || "" }}</td>
                  </tr>
                  <tr>
                    <td>State :</td>
                    <td>{{ tempLeadDetails.state || "" }}</td>
                  </tr>

                  <tr>
                    <td>Country :</td>
                    <td>{{ tempLeadDetails.country || "" }}</td>
                  </tr>
                  <tr>
                    <td>GST Number :</td>
                    <td>{{ tempLeadDetails.gst_number || "" }}</td>
                  </tr>
                  <tr>
                    <td>Is Converted to Customer :</td>
                    <td>{{ tempLeadDetails.is_converted ? "yes" : "no" }}</td>
                  </tr>
                  <tr>
                    <td>Extra Leads</td>
                    <td>
                      <div
                        v-for="(lead, index) in tempLeadDetails.extra_leads"
                        :key="index"
                      >
                        <p>
                          <span class="badge py-3 px-4 fs-7 badge-light-primary"
                            >{{ `${lead.name}` }} - {{ `${lead.email}` }}</span
                          >
                        </p>
                      </div>
                      <div v-if="tempLeadDetails.extra_leads.length === 0">
                        No secondary leads.
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-5">
      <div class="col-lg-12">
        <div class="card card-stretch shadow mb-5">
          <div class="card-footer text-end">
            <!--begin::Button-->
            <button
              type="button"
              ref="removeSubmitButton"
              class="btn btn-danger me-3"
              @click="ignoreLead"
            >
              <span class="indicator-label"> Ignore </span>
              <span class="indicator-progress">
                Please wait...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </button>
            <!--end::Button-->

            <!--begin::Button-->
            <button
              id="kt_modal_new_address_submit"
              type="button"
              ref="replaceSubmitButton"
              class="btn btn-primary me-2 px-6"
              @click="replaceLead"

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
        </div>
      </div>
    </div>
  </section>
</template>
  
  <script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref, watch } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";
import {
  updateTempLead,
  getTempLead,
  getLead,
  deleteTempLead,
} from "@/stores/api";
import ApiService from "@/core/services/ApiService";
import moment from "moment";
import { useAuthStore } from "@/stores/auth";
import { useRoute, useRouter } from "vue-router";
import { countries, INstates } from "@/core/model/countries";
import { debounce } from "@/core/helpers/debounce";

interface LDetails {
  name: string;
  email: string;
  phone: string;
}

interface OgDetails {
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

interface TempDetails {
  id: string;
  og_lead_id: string;
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
  temp_to_lead: boolean;
  message_reason: string;
  grant_access: boolean;
  is_active: number;
  company_id: string;
  company_name: string;
  created_by: string;
  updated_by: string;
}

export default defineComponent({
  name: "temp-leads-edit",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  setup() {
    const replaceSubmitButton = ref<null | HTMLButtonElement>(null);
    const removeSubmitButton = ref<null | HTMLButtonElement>(null);
    const auth = useAuthStore();
    const router = useRoute();
    const route = useRouter();
    let limit = ref(500);
    const loading = ref(false);
    const Companies = ref([{ id: "", company_name: "" }]);
    const state = ref([""]);
    const OgLeadId = router.params.ogLeadId;
    const TempLeadId = router.params.tempLeadId;
    const User = auth.GetUser();

    onMounted(async () => {
      state.value.pop();
      Companies.value.pop();

      try {
        const response1 = await getLead(OgLeadId);

        if (response1.success) {
          ogLeadDetails.value = {
            name: response1.result.name,
            email: response1.result.email,
            mobile: response1.result.mobile,
            enquiry_no: response1.result.enquiry_no,
            extra_leads: response1.result.extra_leads
              ? JSON.parse(response1.result.extra_leads)
              : [],
            address1: response1.result.address1,
            address2: response1.result.address2,
            country: response1.result.country,
            state: response1.result.state,
            city: response1.result.city,
            pincode: response1.result.pincode,
            gst_number: response1.result.gst_number,
            source: response1.result.source,
            is_converted: response1.result.is_converted,
            grant_access: response1.result.grant_access,
            company_name: response1.result.company_name,
            is_active: response1.result.is_active,
            company_id: response1.result.company_id,
            created_by: response1.result.created_by,
            updated_by: response1.result.updated_by,
          };
        } else {
          console.error(
            `Error Occured in getLead : ${
              response1.message || "Error Occured in API"
            }`
          );
        }
      } catch (err) {
        console.error(`Error Occured in getLead : ${err}`);
      }

      try {
        const response2 = await getTempLead(TempLeadId);

        if (response2.success) {
          tempLeadDetails.value = {
            id: response2.result.id || TempLeadId,
            og_lead_id: response2.result.og_lead_id || OgLeadId,
            name: response2.result.name,
            email: response2.result.email,
            mobile: response2.result.mobile,
            enquiry_no: response2.result.enquiry_no,
            extra_leads: response2.result.extra_leads
              ? JSON.parse(response2.result.extra_leads)
              : [],
            address1: response2.result.address1,
            address2: response2.result.address2,
            country: response2.result.country,
            state: response2.result.state,
            city: response2.result.city,
            pincode: response2.result.pincode,
            gst_number: response2.result.gst_number,
            source: response2.result.source,
            is_converted: response2.result.is_converted,
            temp_to_lead: response2.result.temp_to_lead,
            message_reason: response2.result.message_reason,
            grant_access: response2.result.grant_access,
            company_name: response2.result.company_name,
            is_active: response2.result.is_active,
            company_id: response2.result.company_id,
            created_by: response2.result.created_by,
            updated_by: User.id,
          };
        } else {
          console.error(
            `Error Occured in getTempLead : ${
              response2.message || "Error Occured in API"
            }`
          );
        }
      } catch (err) {
        console.error(`Error Occured in getTempLead : ${err}`);
      }
    });

    const profileDetailsValidator = Yup.object().shape({});

    const ogLeadDetails = ref<OgDetails>({
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
      grant_access: false,

      company_name: "",
      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
      is_active: 1,
    });

    const tempLeadDetails = ref<TempDetails>({
      id: "",
      og_lead_id: "",
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
      grant_access: false,
      temp_to_lead: false,
      message_reason: "",

      company_name: "",
      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
      is_active: 1,
    });

    const replaceLead = async () => {
      try {
        if (replaceSubmitButton.value) {
          // Activate indicator
          replaceSubmitButton.value.setAttribute("data-kt-indicator", "on");
        }

        loading.value = true;

        // Call your API here
        // here im sending the actual lead id
        const response = await updateTempLead(OgLeadId, tempLeadDetails.value);

        if (response?.success) {
          // Handle successful API response
          loading.value = false;
          showSuccessAlert(
            "Success",
            response.message || "Actual Lead updated Successfully!"
          );
          route.push({ name: "temp-leads-list" });
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
        if (replaceSubmitButton.value) {
          replaceSubmitButton.value.removeAttribute("data-kt-indicator");
        }
        loading.value = false;
      }
    };

    const ignoreLead = async () => {
      try {
        if (removeSubmitButton.value) {
          // Activate indicator
          removeSubmitButton.value.setAttribute("data-kt-indicator", "on");
        }

        loading.value = true;

        // Call your API here
        // here im sending the actual lead id
        const response = await deleteTempLead(TempLeadId);

        if (response?.success) {
          // Handle successful API response
          loading.value = false;
          showSuccessAlert(
            "Success",
            response.message || "Temp Lead updated Successfully!"
          );
          route.push({ name: "temp-leads-list" });
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
        if (removeSubmitButton.value) {
          removeSubmitButton.value.removeAttribute("data-kt-indicator");
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
      () => tempLeadDetails.value.country,
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
          // tempLeadDetails.value.state = "";
        }
      }
    );

    return {
      replaceSubmitButton,
      tempLeadDetails,
      ogLeadDetails,
      profileDetailsValidator,
      getAssetPath,
      replaceLead,
      ignoreLead,
      loading,
      countries,
      state,
    };
  },
});
</script>
  