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
          @submit="submit"
          :validation-schema="itemDetailsValidator"
        >
          <!--begin::Card body-->
          <div class="card-body border-top p-sd-2 p-lg-9">
            <!--begin::Input group-->

            <!--begin::Input group-->
            <div class="row mb-6">
              <!--begin::Col-->
              <div class="col-md-6 fv-row mb-8 mb-sd-8">
                <!--begin::Label-->
                <label
                  class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Meeting Date</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-date-picker
                  type="date"
                  name="meeting_date"
                  id="meeting_date"
                  v-model="itemDetails.meeting_date"
                  @change="setDates($event, 'meeting_date')"
                  placeholder="Pick a day"
                  :editable="false"
                />
                <!--end::Input-->
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->

            <!-- extra fields -->
            <div class="row mb-6">
              <div class="form-group col-lg-12 col-md-12">
                <label
                  class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Meeting Agenda</label
                >
                <Field
                  type="text"
                  as="textarea"
                  name="agenda"
                  rows="3"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter the description of the training..."
                  v-model="itemDetails.agenda"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="agenda" />
                  </div>
                </div>
              </div>
            </div>
            <!--end::Input group-->

            <!-- extra fields -->
            <div class="row mb-6">
              <div class="form-group col-lg-12 col-md-12">
                <label
                  class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Attendees's Name</label
                >
                <el-form-item>
                  <el-select
                    v-model="itemDetails.attendees"
                    multiple
                    filterable
                    placeholder="Enter name and select it to add..."
                  >
                    <el-option
                      v-for="(item, index) in Employees"
                      :key="index"
                      :label="`${item.first_name} ${item.last_name}`"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
                <div
                  class="fv-plugins-message-container mt-0"
                  v-if="!itemDetails.attendees.length"
                >
                  <div class="fv-help-block">
                    <ErrorMessage name="attendees" />
                  </div>
                </div>
              </div>
            </div>

            <!--begin::Accordion-->
            <div class="accordion mt-6" id="kt_accordion_4">
              <div class="accordion-item">
                <h2 class="accordion-header" :id="'kt_accordion_4_header_'">
                  <button
                    class="accordion-button fs-4 fw-semibold"
                    type="button"
                    :data-bs-toggle="'collapse'"
                    :data-bs-target="'#kt_accordion_4_body_'"
                    :aria-controls="'kt_accordion_4_body_'"
                  >
                    Meeting Agenda Points
                  </button>
                </h2>
                <div
                  :id="'kt_accordion_4_body_'"
                  class="accordion-collapse collapse"
                  :aria-labelledby="'kt_accordion_4_header_'"
                  data-bs-parent="#kt_accordion_4"
                >
                  <div class="accordion-body">
                    <div class="table-responsive">
                      <table
                        class="table table-rounded table-border border gy-7 gs-7 text-nowrap"
                      >
                        <thead>
                          <tr
                            class="fw-semibold fs-6 text-gray-800 border-bottom border-gray-200 text-align-left"
                          >
                            <th class="col-1">Sr.No</th>
                            <th class="col-3">Agenda Points</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item, index) in Agendas" :key="index">
                            <td>
                              <span
                                class="form-control form-control-lg form-control-solid"
                              >
                                {{ item.id }}
                              </span>
                            </td>
                            <td>
                              <span
                                class="form-control form-control-lg form-control-solid"
                              >
                                {{ item.point }}
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--end::Accordion-->
          </div>

          <div class="modal-footer flex-center mt-6">
            <!--begin::Button-->
            <button
              type="submit"
              ref="submitButton"
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
    </div>
  </div>
</template>
      
      <script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref, watch } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import {
  addMRMSchedule,
  getEmployees,
  getMRMSchedule,
  updateMRMSchedule,
} from "@/stores/api";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import { Identifier } from "@/core/config/WhichUserConfig";
import { useAuthStore } from "@/stores/auth";
import { useRouter, useRoute } from "vue-router";
import ApiService from "@/core/services/ApiService";
import moment from "moment";

import { Agendas } from "@/core/model/mrm";

interface Item {
  meeting_date: string;
  agenda: string;
  attendees: [];
  approval_status: string;
  company_id: string;
  created_by: string;
  updated_by: string;
  is_active: string;
}

export default defineComponent({
  name: "mrm-schedule-add",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  setup() {
    const submitButton = ref<null | HTMLButtonElement>(null);
    const identifier = Identifier;
    const loading = ref(false);
    const auth = useAuthStore();
    const router = useRouter();
    const route = useRoute();
    const User = auth.GetUser();
    const itemId = route.params.id;

    const Employees = ref([{ id: "", first_name: "", last_name: "" }]);

    const itemDetailsValidator = Yup.object().shape({
      agenda: Yup.string().required().label("Meeting Agenda"),
    });

    const itemDetails = ref<Item>({
      meeting_date: "",
      agenda: "",
      attendees: [],
      approval_status: "",
      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
      is_active: "1",
    });

    onMounted(async () => {
      Employees.value.pop();
      try {
        ApiService.setHeader();
        const response = await getEmployees(`fetchAll=true`);

        if (response.success) {
          if (response.result != null && response.result) {
            Employees.value.push(
              ...response.result?.map(({ id, first_name, last_name }) => ({
                id,
                first_name,
                last_name,
              }))
            );
          }
        } else {
          console.error(
            `Error Occured in getEmployees : ${
              response.message || "Error Occured in API"
            }`
          );
        }
      } catch (err) {
        console.error(`Error Occured in getEmployees : ${err}`);
      }

      try {
        let response = await getMRMSchedule(itemId.toString());

        if (response.success) {
          itemDetails.value = {
            meeting_date: response.result.meeting_date,
            agenda: response.result.agenda,
            attendees: JSON.parse(response.result.attendees),
            approval_status: response.result.approval_status,

            company_id: response.result.company_id
              ? response.result.company_id
              : "",
            created_by: response.result.created_by,
            updated_by: response.result.updated_by,
            is_active: response.result.is_active,
          };
        } else {
          console.error(
            `Error Occured in getMRMSchedule : ${
              response.message || "Error Occured in API"
            }`
          );
        }
      } catch (err) {
        console.error(`Error Occured in getMRMSchedule : ${err}`);
      }
    });

    /* --------SET DATE LOGIC--------*/
    async function setDates(e, dateType) {
      try {
        if (e != null) {
          if (e != "" && e != null) {
            itemDetails.value[dateType] = moment(e).format("YYYY-MM-DD");
          } else {
            itemDetails.value[dateType] = "";
          }
        } else {
          itemDetails.value[dateType] = "";
        }
      } catch (err) {
        itemDetails.value[dateType] = "";
      }
      console.log(itemDetails.value[dateType]);
    }

    const validateForm = (formData) => {
      for (const key in formData) {
        let value = formData[key];
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
          // Trim the string before validation
          value = value.trim();
          if (value === "") {
            return false;
          }
        }
      }
      return true;
    };

    const submit = async () => {
      loading.value = true;

      if (itemDetails.value.attendees.length === 0) {
        showErrorAlert("Warning", "Please Select Atleast One Attendee");
        loading.value = false;
        return;
      }

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
        const response = await updateMRMSchedule(itemId, itemDetails.value);

        if (response?.success) {
          // Handle successful API response
          showSuccessAlert(
            "Success",
            response.message || "Management Review Meeting Added Successfully!"
          );
          loading.value = false;
          router.push({ name: "mrm-schedule-list" });
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
      itemDetails,
      itemDetailsValidator,
      getAssetPath,
      submit,
      loading,
      setDates,
      Agendas,
      Employees,
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

.trainer-container {
  display: flex;
  align-items: center;
  margin-right: 10px; /* Adjust as needed */
  background-color: #000; /* Optional background color for each trainer container */
  padding: 5px 10px; /* Optional padding */
  border-radius: 5px; /* Optional border radius */
}
.tagify-remove {
  margin-left: 5px; /* Optional margin between the name and the 'X' button */
}
.override-styles {
  z-index: 99999 !important;
  pointer-events: initial;
}
</style>