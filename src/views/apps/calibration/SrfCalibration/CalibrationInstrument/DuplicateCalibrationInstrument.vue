<template>
  <!--begin::Modal - New Address-->
  <div
    class="modal fade"
    ref="newAddressModalRef"
    :id="'kt_modal_calibration_instrument_' + $props.instrumentId"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    data-bs-focus="false"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-1000px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Form-->
        <VForm
          class="form"
          id="kt_modal_new_address_form"
          @submit="submitDuplicate($event)"
          :validation-schema="validationSchema"
        >
          <!--begin::Modal header-->
          <div class="modal-header" id="kt_modal_new_address_header">
            <!--begin::Modal title-->
            <h2>Make Similar Instrument like {{ $props.heading }}</h2>
            <!--end::Modal title-->

            <!--begin::Close-->
            <div
              class="btn btn-sm btn-icon btn-active-color-primary"
              data-bs-dismiss="modal"
              @click="resetTheData"
            >
              <KTIcon icon-name="cross" icon-class="fs-1" />
            </div>
            <!--end::Close-->
          </div>
          <!--end::Modal header-->

          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17 flex-center">
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
              <!--begin::Input group-->
              <div class="row mb-6">
                <!--begin::Label-->
                <label class="col-lg-4 col-form-label required fw-semobold fs-6"
                  >Enter Serial Number</label
                >
                <!--end::Label-->

                <!--begin::Col-->
                <div class="col-lg-8 fv-row">
                  <Field
                    type="text"
                    name="email"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Enter Serial Number"
                    v-model="duplicateItemDetails.serial_no"
                  />
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
            <button
              ref="duplicateSubmitButtonRef"
              type="submit"
              id="kt_modal_new_address_submit"
              class="btn btn-primary"
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
          <!--end::Modal footer-->
        </VForm>
        <!--end::Form-->
      </div>
    </div>
  </div>
  <!--end::Modal - New Address-->
</template>
      
      <script lang="ts">
import { defineComponent, onMounted, onUpdated, ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { hideModal } from "@/core/helpers/dom";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";
import moment from "moment";
import {
  addCalibrationInstrument,
  getCalibrationInstrument,
} from "@/stores/api";

interface NewAddressData {}

interface DuplicateItem {
  instrument_id: string;
  name: string;
  parameter: string;

  model_no: string;
  serial_no: string;
  make: string;

  calibration_date: string;
  calibration_due_date: string;

  location: string;

  ranges: string;
  accuracy: string;
  resolution: string;

  temp: string;
  rh: string;

  calibration_points: string; // optional
  periodicity: string;

  instrument_condition: string; // ok or damaged
  remark: string; // based on instrument_condition remark is given

  reading_data: [];
  reference_instrument_id: string;
  service_request_id: string;

  company_id: string;
  is_active: number;
}

export default defineComponent({
  name: "duplicate-calibration-modal",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },

  emit: ["HandleDuplicate"],

  props: ["instrumentId", "companyId", "heading"],

  setup(props, { emit }) {
    const duplicateSubmitButtonRef = ref<null | HTMLButtonElement>(null);
    const newAddressModalRef = ref<null | HTMLElement>(null);
    const newAddressData = ref<NewAddressData>({});
    const validationSchema = Yup.object().shape({});

    const router = useRouter();

    const duplicateItemDetails = ref<DuplicateItem>({
      instrument_id: "",
      name: "",
      parameter: "",

      model_no: "",
      serial_no: "",
      make: "",

      calibration_date: "",
      calibration_due_date: "",

      location: "",

      ranges: "",
      accuracy: "",
      resolution: "",

      calibration_points: "",
      periodicity: "",

      temp: "25",
      rh: "55",

      instrument_condition: "NOT_DAMAGED",
      remark: "OK",
      reading_data: [],

      reference_instrument_id: "",
      service_request_id: "",
      company_id: "",
      is_active: 1,
    });

    async function resetTheData() {}

    onMounted(async function () {});

    function areAllPropertiesNull(array) {
      return array.some((detail) => {
        const {
          name,
          model_no,
          serial_no,
          make,
          calibration_date,
          calibration_due_date,
          ranges,
          accuracy,
        } = detail;

        // Check if any property is null or empty

        return (
          name === "" ||
          model_no === "" ||
          serial_no === "" ||
          make === "" ||
          calibration_date === "" ||
          calibration_due_date === "" ||
          ranges === "" ||
          accuracy === ""
        );
      });
    }

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

    const submitDuplicate = async (e) => {
      try {
        if (duplicateItemDetails.value.serial_no === "") {
          showErrorAlert("Warning", "Please Enter Serial Number");
          return;
        }

        if (duplicateSubmitButtonRef.value) {
          // Activate indicator
          duplicateSubmitButtonRef.value.setAttribute(
            "data-kt-indicator",
            "on"
          );
        }

        const response = await getCalibrationInstrument(props.instrumentId);
        console.log(response);

        const serialNo = duplicateItemDetails.value.serial_no;

        if (response.success) {
          duplicateItemDetails.value = { ...response.result };
          duplicateItemDetails.value.serial_no = serialNo;

          const res = await addCalibrationInstrument(
            duplicateItemDetails.value
          );
          // console.log(response.error);
          if (res.success) {
            showSuccessAlert(
              "Success",
              `${res.message || "Instrument Added Successfully"}`
            );

            await emit("HandleDuplicate");
            hideModal(newAddressModalRef.value);
          } else {
            showErrorAlert(
              "Error",
              `${response.message || "An error occurred during the API call."}`
            );
          }
        } else {
          showErrorAlert(
            "Error",
            `${response.message || "An error occurred during the API call."}`
          );
        }
      } catch (error) {
        // Handle any other errors during API call
        // console.error("API call error:", error);
        showErrorAlert("Error", "An error occurred during the API call.");
      } finally {
        if (duplicateSubmitButtonRef.value) {
          duplicateSubmitButtonRef.value.removeAttribute("data-kt-indicator");
        }
      }
    };

    return {
      newAddressData,
      duplicateItemDetails,
      validationSchema,
      submitDuplicate,
      duplicateSubmitButtonRef,
      newAddressModalRef,
      heading: props.heading,
      instrumentId: props.instrumentId,
      companyId: props.companyId,
      resetTheData,
    };
  },
});
</script>
      
      