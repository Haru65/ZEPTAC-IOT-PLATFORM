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
          :validation-schema="itemDetailsValidator"
        >
          <!--begin::Card body-->
          <div
            class="card-body p-sd-2 p-lg-9"
            v-if="itemDetails.agenda_points.length !== 0"
          >
            <!--begin::Input group-->

            <div
              class="card-body mb-6"
              v-for="(item, index) in itemDetails.agenda_points"
              :key="index"
            >
              <div class="input-group p-2">
                <span class="input-group-text">{{ item.point_id }}</span>
                <div class="form-control">{{ item.point }}</div>
              </div>

              <div class="row mb-6">
                <div class="form-group col-md-6">
                  <label
                    class="col-lg-4 col-form-label text-nowrap required fw-bold text-gray-700 fw-semobold fs-6"
                    >Outcomes/Decision</label
                  >
                  <Field
                    type="text"
                    as="textarea"
                    rows="3"
                    :name="'outcomes_' + index"
                    v-model="itemDetails.agenda_points[index].outcomes"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Enter the outcomes..."
                  />
                </div>
                <div class="form-group col-md-6">
                  <label
                    class="col-lg-4 col-form-label text-nowrap required fw-bold text-gray-700 fw-semobold fs-6"
                    >Action Required</label
                  >
                  <Field
                    type="text"
                    as="textarea"
                    rows="3"
                    :name="'action_required_' + index"
                    v-model="itemDetails.agenda_points[index].action_required"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Action to be taken..."
                  />
                </div>
              </div>

              <div class="row mb-6">
                <div class="form-group col-lg-6 col-md-6">
                  <el-form-item>
                    <el-select
                      :name="'responsible_person_' + index"
                      filterable
                      v-model="
                        itemDetails.agenda_points[index].responsible_person
                      "
                      placeholder="Select person name..."
                    >
                      <el-option
                        v-for="(item, index) in Employees"
                        :key="index"
                        :label="`${item.first_name} ${item.last_name}`"
                        :value="item.id.toString()"
                      />
                    </el-select>
                  </el-form-item>
                </div>
              </div>

              <div class="card-footer d-flex justify-content-end py-6">
                <button
                  type="button"
                  ref="submitButton"
                  class="btn btn-md btn-success px-6"
                  @click="submit(item.id, item)"
                >
                  <span class="indicator-label"> Update </span>
                  <span class="indicator-progress">
                    Please wait...
                    <span
                      class="spinner-border spinner-border-sm align-middle ms-2"
                    ></span>
                  </span>
                </button>
              </div>

              <div class="separator separator-dashed mb-7"></div>
            </div>
          </div>

          <div v-else class="card-body p-sd-2 p-lg-9">
            <div class="mb-6 container">
              <div class="alert alert-success">
                "No Meeting Minutes added for this Management Review"
              </div>
            </div>
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
import { getEmployees, getMRMSchedule, updateMRMMinute } from "@/stores/api";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import packages from "@/core/config/PackagesConfig";
import { limit, Identifier } from "@/core/config/WhichUserConfig";
import { useAuthStore } from "@/stores/auth";
import { useRoute, useRouter } from "vue-router";
import ApiService from "@/core/services/ApiService";
import moment from "moment";

import { Agendas } from "@/core/model/mrm";

interface Data {
  id: string;
  management_review_meeting_id: string;
  point_id: string;
  point: string;
  outcomes: string;
  action_required: string;
  responsible_person: string;
  company_id: string;
  created_by: string;
  updated_by: string;
  is_active: string;
}

interface Item {
  meeting_date: string;
  agenda: string;
  approval_status: string;
  attendees: [];
  agenda_points: Data[];
  company_id: string;
  created_by: string;
  updated_by: string;
  is_active: string;
}

export default defineComponent({
  name: "mrm-minutes-add",
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
    const User = auth.GetUser();
    const route = useRoute();
    const itemId = route.params.id;
    let limit = ref(500);

    const Employees = ref([{ id: "", first_name: "", last_name: "" }]);

    const itemDetailsValidator = Yup.object().shape({
      meeting_date: Yup.string().required().label("Meeting Date"),
      agenda: Yup.string().required().label("Meeting Agenda"),
    });

    const itemDetails = ref<Item>({
      meeting_date: "",
      agenda: "",
      attendees: [],
      approval_status: "",
      agenda_points: [],
      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
      is_active: "1",
    });

    onMounted(async () => {
      try {
        let response = await getMRMSchedule(itemId.toString());

        if (response.success) {
          if (response.result != null && response.result) {
            itemDetails.value.agenda_points = response.result.meeting.map(
              ({ id, ...rest }) => ({
                id: id,
                ...rest,
              })
            );
          }
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

    const submit = async (itemID, data) => {
      loading.value = true;

      const result = validateForm(data);

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
        const response = await updateMRMMinute(itemID, data);

        if (response?.success) {
          // Handle successful API response
          showSuccessAlert(
            "Success",
            response.message ||
              "Meeting of Minutes has been successfully updated!"
          );
          loading.value = false;
          router.push({ name: "mrm-minutes-list" });
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
      packages,
      limit,
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