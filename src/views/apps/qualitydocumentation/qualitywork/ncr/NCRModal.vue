<template>
  <!--begin::Modal - New Address-->
  <div
    class="modal fade"
    ref="newAddressModalRef"
    id="kt_modal_ncr"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-1000px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Form-->
        <VForm
          class="form"
          id="kt_modal_new_address_form"
          :validation-schema="ncrValidator"
          @submit="submit"
        >
          <!--begin::Modal header-->
          <div class="modal-header" id="kt_modal_new_address_header">
            <!--begin::Modal title-->
            <h2>Add Non Conformance Record</h2>
            <!--end::Modal title-->

            <!--begin::Close-->
            <div
              class="btn btn-sm btn-icon btn-active-color-primary"
              data-bs-dismiss="modal"
            >
              <KTIcon icon-name="cross" icon-class="fs-1" />
            </div>
            <!--end::Close-->
          </div>
          <!--end::Modal header-->

          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-10">
            <!--begin::Scroll-->
            <div
              class="scroll-y me-n7 pe-7"
              id="kt_modal_new_address_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              style="max-height: 100% !important"
              data-kt-scroll-dependencies="#kt_modal_new_address_scroll"
              data-kt-scroll-wrappers="#kt_modal_new_address_scroll"
              data-kt-scroll-offset="auto"
            >
              <div class="row mb-6">
                <!--begin::Col-->
                <div class="col-md-12 fv-row">
                  <!--begin::Label-->
                  <label
                    class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                    >Non Conformance Details</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Field
                    type="text"
                    as="textarea"
                    rows="5"
                    v-model="ncrDetails.nc_details"
                    name="nc_details"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Enter details of non conformance..."
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="nc_details" />
                    </div>
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Col-->
              </div>

              <div class="row mb-6">
                <!--begin::Col-->
                <div class="col-md-12 fv-row">
                  <!--begin::Label-->
                  <label
                    class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                    >Action Required</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Field
                    type="text"
                    as="textarea"
                    rows="5"
                    v-model="ncrDetails.action_required"
                    name="action_required"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Specify action required..."
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="action_required" />
                    </div>
                  </div>
                  <!--end::Input-->
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
                    >Completion Date</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-date-picker
                    type="date"
                    name="completion_date"
                    id="completion_date"
                    v-model="ncrDetails.completion_date"
                    @change="setDates($event, 'completion_date')"
                    placeholder="Pick a day"
                    :editable="false"
                  />
                  <div
                    class="fv-plugins-message-container mt-3"
                    v-if="!ncrDetails.completion_date"
                  >
                    <div class="fv-help-block">
                      <ErrorMessage name="completion_date" />
                    </div>
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Col-->
                <!--begin::Col-->
                <div class="col-md-6 fv-row mb-8 mb-sd-8">
                  <!--begin::Label-->
                  <label
                    class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                    >Next Review Date</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-date-picker
                    type="date"
                    name="review_date"
                    id="review_date"
                    v-model="ncrDetails.review_date"
                    @change="setDates($event, 'review_date')"
                    placeholder="Pick a day"
                    :editable="false"
                  />
                  <div
                    class="fv-plugins-message-container mt-3"
                    v-if="!ncrDetails.review_date"
                  >
                    <div class="fv-help-block">
                      <ErrorMessage name="review_date" />
                    </div>
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Col-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="row mb-6">
                <!--begin::Col-->
                <div class="col-md-12 fv-row">
                  <!--begin::Label-->
                  <label
                    class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                    >Verification of Completion</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Field
                    type="text"
                    as="textarea"
                    rows="5"
                    v-model="ncrDetails.verification_details"
                    name="verification_details"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Enter verification of completion..."
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="verification_details" />
                    </div>
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Col-->
              </div>
              <!--end::Input group-->
            </div>
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->

          <!--begin::Modal footer-->
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <span
              @click="clear"
              id="kt_modal_new_address_cancel"
              class="btn btn-light me-3"
            >
              Discard
            </span>
            <!--end::Button-->

            <!--begin::Button-->
            <button
              ref="submitButtonRef"
              id="kt_modal_new_address_submit"
              class="btn btn-primary"
            >
              <span class="indicator-label"> Submit </span>
              <span class="indicator-progress">
                Please wait...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </button>
            <!--end::Button-->
          </div>
          <!--end::Modal footer-->
        </VForm>
        <!--end::Form-->
      </div>
    </div>
  </div>
  <!--end::Modal - New Address-->
</template>
  
  <script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { hideModal } from "@/core/helpers/dom";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";
import moment from "moment";
import { addNonConformanceRecord } from "@/stores/api";

interface NewAddressData {}

interface NCR {
  nc_details: string;
  action_required: string;
  completion_date: string;
  review_date: string;
  verification_details: string;
  approval_status: string;
  company_id: string;
  created_by: string;
  updated_by: string;
  is_active: string;
}

export default defineComponent({
  name: "new-address-modal",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  emits: ["ncr-added"],
  setup(props, { emit }) {
    const loading = ref(false);
    const auth = useAuthStore();
    const router = useRouter();
    const User = auth.GetUser();

    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const newAddressModalRef = ref<null | HTMLElement>(null);
    const newAddressData = ref<NewAddressData>({});

    const ncrDetails = ref<NCR>({
      nc_details: "",
      action_required: "",
      completion_date: "",
      review_date: "",
      verification_details: "",
      approval_status: "1",
      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
      is_active: "1",
    });

    const ncrValidator = Yup.object().shape({
      nc_details: Yup.string().required().label("Non Conformance"),
      action_required: Yup.string().required().label("Action"),
      verification_details: Yup.string().required().label("Verification details"),
    });

    /* --------SET DATE LOGIC--------*/
    async function setDates(e, dateType) {
      try {
        if (e != null) {
          if (e != "" && e != null) {
            ncrDetails.value[dateType] = moment(e).format("YYYY-MM-DD");
          } else {
            ncrDetails.value[dateType] = "";
          }
        } else {
          ncrDetails.value[dateType] = "";
        }
      } catch (err) {
        ncrDetails.value[dateType] = "";
      }
      console.log(ncrDetails.value[dateType]);
    }

    function areAllPropertiesNull(array) {
      return array.some((detail) => {
        const {
          nc_details,
          action_required,
          completion_date,
          review_date,
          verification_details,
          prepared_by,
          approved_by,
        } = detail;

        // Check if any property is null or empty

        return (
          nc_details === "" ||
          action_required === "" ||
          completion_date === "" ||
          review_date === "" ||
          verification_details === "" ||
          prepared_by === "" ||
          approved_by === ""
        );
      });
    }

    const clear = () => {
      ncrDetails.value = {
        nc_details: "",
        action_required: "",
        completion_date: "",
        review_date: "",
        verification_details: "",
        approval_status: "1",
        company_id: User.company_id,
        created_by: User.id,
        updated_by: User.id,
        is_active: "1",
      };
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

    const submit = async (e) => {
      console.log(ncrDetails.value);

      const result = areAllPropertiesNull([ncrDetails.value]);
      if (!result) {
        try {
          // Call your API here with the form values
          const response = await addNonConformanceRecord(ncrDetails.value);
          // console.log(response.error);
          if (!response.error) {
            // Handle successful API response
            //   console.log("API response:", response);
            loading.value = false;
            showSuccessAlert("Success", "NCR Added Successfully!");
            clear();
            await emit("ncr-added");
            hideModal(newAddressModalRef.value);
            // clear();
          } else {
            // Handle API error response
            // const errorData = response.error;
            loading.value = false;
            showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
          }
        } catch (error) {
          // Handle any other errors during API call
          // console.error("API call error:", error);
          showErrorAlert("Error", "An error occurred during the API call.");
        } finally {
          loading.value = false;
        }
      } else {
        showErrorAlert("Warning", "Please fill all the details Correctly");
        return;
      }
    };

    return {
      newAddressData,
      ncrDetails,
      ncrValidator,
      submit,
      submitButtonRef,
      newAddressModalRef,
      setDates,
      clear,
    };
  },
});
</script>
  
  