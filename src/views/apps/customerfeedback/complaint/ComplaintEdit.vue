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
          :validation-schema="complaintDetailsValidator"
        >
          <!--begin::Card body-->
          <div class="card-body border-top p-sd-2 p-lg-9">
            <!--begin::Input group-->

            <div class="row mb-6">
              <!--begin::Label-->
              <label
                class="col-lg-3 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                >Customer Name</label
              >
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-9 fv-row">
                <Field
                  type="text"
                  name="customer_name"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter customer name"
                  v-model="complaintDetails.customer_name"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="customer_name" />
                  </div>
                </div>
              </div>
              <!--end::Col-->
            </div>

            <!--begin::Input group-->
            <div class="row mb-6">
              <!--begin::Col-->
              <div class="col-md-6 fv-row mb-8 mb-sd-8">
                <!--begin::Label-->
                <label
                  class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Complaint Date</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <div class="block">
                  <el-date-picker
                    type="date"
                    name="complaint_date"
                    id="complaint_date"
                    v-model="complaintDetails.complaint_date"
                    @change="setDates($event, 'complaint_date')"
                    placeholder="Pick Complaint Day"
                    :editable="false"
                  />
                </div>
                <div
                  class="fv-plugins-message-container mt-5"
                  v-if="!complaintDetails.complaint_date"
                >
                  <div class="fv-help-block">
                    <ErrorMessage name="complaint_date" />
                  </div>
                </div>
                <!--end::Input-->
              </div>
              <!--end::Col-->

              <!--begin::Col-->
              <div class="col-md-6 fv-row mb-8 mb-sd-8">
                <!--end::Label-->
                <label
                  class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Complaint No.</label
                >
                <!--end::Label-->

                <Field
                  type="text"
                  name="complaint_no"
                  class="form-control form-control-lg form-control-solid"
                  v-model="complaintDetails.complaint_no"
                  placeholder="Enter Complaint Number"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="complaint_no" />
                  </div>
                </div>
                <!--end::Input-->
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->

            <!-- extra fields -->
            <div class="row mb-6">
              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Details of Complaint</label
                >
                <Field
                  type="text"
                  as="textarea"
                  name="details_of_complaint"
                  rows="3"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Specify the complaint..."
                  v-model="complaintDetails.details_of_complaint"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="details_of_complaint" />
                  </div>
                </div>
              </div>
              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Corrective Action</label
                >
                <Field
                  type="text"
                  as="textarea"
                  name="corrective_action"
                  rows="3"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Specify the action..."
                  v-model="complaintDetails.corrective_action"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="corrective_action" />
                  </div>
                </div>
              </div>
            </div>
            <!--end::Input group-->

            <div class="row mb-6">
              <!--begin::Label-->
              <label
                class="col-lg-3 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                >Source of Complaint</label
              >
              <!--end::Label-->
              <!--begin::Col-->
              <div class="col-lg-9 fv-row">
                <el-select
                  v-model="complaintDetails.source_of_complaint"
                  filterable
                  placeholder="Select Source of Complaint..."
                >
                  <el-option
                    disabled="disabled"
                    value=""
                    label="Select Source of Complaint..."
                  >
                    Please Select Source
                  </el-option>
                  <el-option
                    v-for="item in SourceOfComplaint"
                    :key="item.id"
                    :value="item.id"
                    :label="item.source"
                  />
                </el-select>
                <div
                  class="fv-plugins-message-container"
                  v-if="!complaintDetails.source_of_complaint"
                >
                  <div class="fv-help-block">
                    <ErrorMessage name="source_of_complaint" />
                  </div>
                </div>
              </div>
              <!--end::Col-->
            </div>

            <!-- extra fields -->
            <div class="row mb-6">
              <div class="form-group col-lg-12 col-md-12">
                <label
                  class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Comment by Customer</label
                >
                <Field
                  type="text"
                  as="textarea"
                  name="comment_by_customer"
                  rows="3"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Specify the action..."
                  v-model="complaintDetails.comment_by_customer"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="comment_by_customer" />
                  </div>
                </div>
              </div>
            </div>
            <!--end::Input group-->

            <div class="row mb-6">
              <div class="form-group col-md-6 mb-8 mb-sd-8">
                <label
                  class="btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center"
                >
                  <!--begin::Info-->
                  <span class="d-block fw-semobold text-start">
                    <span class="fs-5 fw-bold text-gray-700 text-nowrap"
                      >Resolution Date</span
                    >
                    <div class="block">
                      <el-date-picker
                        type="date"
                        name="resolution_date"
                        id="resolution_date"
                        v-model="complaintDetails.resolution_date"
                        @change="setDates($event, 'resolution_date')"
                        placeholder="Pick Resolution Day"
                        :editable="false"
                      />
                    </div>
                  </span>
                  <!--end::Info-->
                </label>
                <div
                  class="fv-plugins-message-container"
                  v-if="!complaintDetails.resolution_date"
                >
                  <div class="fv-help-block">
                    <ErrorMessage name="resolution_date" />
                  </div>
                </div>
              </div>

              <div class="form-group col-md-6 mb-8 mb-sd-8">
                <label
                  class="btn btn-outline btn-outline-dashed btn-outline-default p-5 d-flex align-items-center"
                >
                  <!--begin::Info-->
                  <span class="d-block fw-semobold text-start">
                    <span class="text-gray-700 fw-bold d-block fs-6 mb-2"
                      >Complaint Status</span
                    >
                    <div class="btn-group" role="group">
                      <div v-for="status in ComplaintStatus" :key="status.id">
                        <input
                          type="radio"
                          class="btn-check"
                          name="complaint_status"
                          :id="`${status.id}`"
                          :value="status.id"
                          v-model="complaintDetails.complaint_status"
                          autocomplete="off"
                        />
                        <label
                          :class="'btn btn-outline-primary'"
                          :for="`${status.id}`"
                        >
                          {{ status.status }}
                        </label>
                      </div>
                    </div>
                  </span>
                  <!--end::Info-->
                </label>
              </div>
            </div>
          </div>

          <div class="modal-footer flex-center w-100">
            <!--begin::Button-->
            <button type="reset" class="btn btn-lg btn-danger w-sd-25 w-lg-25">
              Discard
            </button>
            <!--end::Button-->
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <!--begin::Button-->
            <span
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-lg btn-primary w-sd-25 w-lg-25"
              @click="submit()"
            >
              <span v-if="!loading" class="indicator-label"> Submit </span>
              <span v-if="loading" class="indicator-progress">
                Please wait...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </span>
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
import { defineComponent, onMounted, ref } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { getComplaint, updateComplaint } from "@/stores/api";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import packages from "@/core/config/PackagesConfig";
import { limit, Identifier } from "@/core/config/WhichUserConfig";
import { useAuthStore } from "@/stores/auth";
import { useRouter, useRoute } from "vue-router";
import ApiService from "@/core/services/ApiService";
import moment from "moment";
import { SourceOfComplaint, ComplaintStatus } from "@/core/model/complaints";

interface Complaint {
  customer_name: string;
  complaint_date: string;
  complaint_no: string;
  details_of_complaint: string;
  corrective_action: string;
  source_of_complaint: string;
  comment_by_customer: string;
  resolution_date: string;
  complaint_status: string;
  approval_status: string;
  company_id: string;
  created_by: string;
  updated_by: string;
  is_active: string;
}

export default defineComponent({
  name: "complaint-edit",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  setup() {
    const loading = ref(false);
    const auth = useAuthStore();
    const router = useRouter();
    const route = useRoute();
    const User = auth.GetUser();
    let limit = ref(500);
    const itemId = route.params.id;

    const complaintDetailsValidator = Yup.object().shape({
      customer_name: Yup.string().required().label("Customer Name"),
      complaint_date: Yup.string().required().label("Complaint Date"),
      complaint_no: Yup.string().required().label("Complaint No."),
      details_of_complaint: Yup.string()
        .required()
        .label("Details of Complaint"),
      corrective_action: Yup.string().required().label("Corrective Action"),
      source_of_complaint: Yup.string().required().label("Source of Complaint"),
      comment_by_customer: Yup.string().required().label("Comment"),
      resolution_date: Yup.string().required().label("Resolution Date"),
    });

    const complaintDetails = ref<Complaint>({
      customer_name: "",
      complaint_date: "",
      complaint_no: "",
      details_of_complaint: "",
      corrective_action: "",
      source_of_complaint: "",
      comment_by_customer: "",
      resolution_date: "",
      complaint_status: "",
      approval_status: "",
      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
      is_active: "1",
    });

    onMounted(async () => {
      let response = await getComplaint(itemId.toString());
      // console.log(response);
      complaintDetails.value = {
        customer_name: response.customer_name,
        complaint_date: response.complaint_date,
        complaint_no: response.complaint_no,
        details_of_complaint: response.details_of_complaint,
        corrective_action: response.corrective_action,
        source_of_complaint: response.source_of_complaint,
        comment_by_customer: response.comment_by_customer,
        resolution_date: response.resolution_date,
        complaint_status: response.complaint_status,
        approval_status: response.approval_status,
        company_id: response.company_id ? response.company_id : "",
        created_by: response.created_by,
        updated_by: response.updated_by,
        is_active: response.is_active,
      };
    });

    function areAllPropertiesNotNull(array) {
      return array.some((data) => {
        const {
          customer_name,
          complaint_date,
          complaint_no,
          details_of_complaint,
          corrective_action,
          source_of_complaint,
          comment_by_customer,
          resolution_date,
          complaint_status,
        } = data;

        // Check if any property is null or empty

        return (
          customer_name !== "" &&
          complaint_date !== "" &&
          complaint_no !== "" &&
          details_of_complaint !== "" &&
          corrective_action !== "" &&
          source_of_complaint !== "" &&
          comment_by_customer !== "" &&
          resolution_date !== "" &&
          complaint_status !== ""
        );
      });
    }

    /* --------SET DATE LOGIC--------*/
    async function setDates(e, dateType) {
      try {
        if (e != null) {
          if (e != "" && e != null) {
            complaintDetails.value[dateType] = moment(e).format("YYYY-MM-DD");
          } else {
            complaintDetails.value[dateType] = "";
          }
        } else {
          complaintDetails.value[dateType] = "";
        }
      } catch (err) {
        complaintDetails.value[dateType] = "";
      }
      console.log(complaintDetails.value[dateType]);
    }

    const submit = async () => {
      loading.value = true;

      try {
        complaintDetails.value.complaint_date = moment(
          complaintDetails.value.complaint_date
        ).format("YYYY-MM-DD");
        complaintDetails.value.resolution_date = moment(
          complaintDetails.value.resolution_date
        ).format("YYYY-MM-DD");

        // console.log(complaintDetails.value);
        const result = areAllPropertiesNotNull([complaintDetails.value]);

        if (result) {
          const response = await updateComplaint(
            itemId,
            complaintDetails.value
          );
          // console.log(response)
          // console.log(response.error);
          if (!response.error) {
            // Handle successful API response
            //   console.log("API response:", response);
            showSuccessAlert(
              "Success",
              "Complaint has been successfully Updated!"
            );

            router.push({ name: "complaint-list" });
            loading.value = false;
          } else {
            // Handle API error response
            //   console.log("API error:", errorData);
            // console.log("API error:", errorData.response.data.errors);
            showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
            loading.value = false;
          }
        } else {
          showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
          loading.value = false;
        }
      } catch (error) {
        // Handle any other errors during API call
        // console.error("API call error:", error);
        showErrorAlert("Error", "An error occurred during the API call.");
        loading.value = false;
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

    return {
      complaintDetails,
      complaintDetailsValidator,
      getAssetPath,
      submit,
      loading,
      packages,
      limit,
      SourceOfComplaint,
      ComplaintStatus,
      setDates,
    };
  },
});
</script>
