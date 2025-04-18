<template>
  <!--begin::Modal - New Address-->
  <div
    class="modal fade"
    ref="newAddressModalRef"
    :id="'kt_modal_new_address_' + $props.instrumentId"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    data-bs-focus="false"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Form-->
        <VForm
          class="form"
          id="kt_modal_new_address_form"
          @submit="submit($event)"
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
                    v-model="itemDetails.serial_no"
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
              ref="submitButtonRef"
              type="submit"
              id="kt_modal_new_address_submit"
              class="btn btn-primary"
            >
              <span v-if="loading === false" class="indicator-label">
                Submit
              </span>
              <span v-else class="indicator-label">
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
import { addThermalInstrument, getThermalInstrument } from "@/stores/api";

interface NewAddressData {}

interface itemDetails {
  instrument_id: string;
  name: string;
  availability: string;
  model_no: string;
  serial_no: string;
  make: string;

  calibration_date: string;
  calibration_due_date: string;

  ranges: string;
  accuracy: string;

  company_id: string;
  created_by: number;
  updated_by: number;
  is_active: number;
}

export default defineComponent({
  name: "new-address-modal",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },

  emit: ["HandleDuplicate"],

  props: ["instrumentId", "companyId", "heading"],

  setup(props, { emit }) {
    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const newAddressModalRef = ref<null | HTMLElement>(null);
    const newAddressData = ref<NewAddressData>({});
    const validationSchema = Yup.object().shape({});

    const loading = ref(false);

    const auth = useAuthStore();
    const User = auth.GetUser();
    const router = useRouter();

    const itemDetails = ref<itemDetails>({
      instrument_id: "",
      name: "",
      availability: "1",
      model_no: "",
      serial_no: "",
      make: "",
      calibration_date: "",
      calibration_due_date: "",

      ranges: "",
      accuracy: "",

      company_id: props.companyId,
      created_by: User.id,
      updated_by: User.id,
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

    const submit = async (e) => {
      loading.value = true;

      try {
        if (itemDetails.value.serial_no === "") {
          showErrorAlert("Warning", "Please Enter Serial Number");
          loading.value = false;
          return;
        }

        const response = await getThermalInstrument(props.instrumentId);
        console.log(response);

        if (response.success) {
          itemDetails.value.name = response.result.name;
          itemDetails.value.availability = response.result.availability;
          itemDetails.value.model_no = response.result.model_no;

          itemDetails.value.make = response.result.make;
          itemDetails.value.calibration_date = response.result.calibration_date;
          itemDetails.value.calibration_due_date =
            response.result.calibration_due_date;
          itemDetails.value.ranges = response.result.ranges;
          itemDetails.value.accuracy = response.result.accuracy;

          const result = areAllPropertiesNull([itemDetails.value]);

          if (result) {
            showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
            loading.value = false;
            return;
          }

          const res = await addThermalInstrument(itemDetails.value);

          if (res.success) {
            // Handle successful API response
            //   console.log("API response:", response);

            loading.value = false;
            showSuccessAlert(
              "Success",
              res.message || "Instrument has been successfully inserted!"
            );

            await emit("HandleDuplicate");
            hideModal(newAddressModalRef.value);
          } else {
            // Handle API error response
            loading.value = false;
            showErrorAlert("Error", res.message || "An error occurred.");
          }
        } else {
          // Handle API error response
          loading.value = false;
          showErrorAlert("Error", response.message || "An error occurred.");
        }
      } catch (error) {
        // Handle any other errors during API call
        // console.error("API call error:", error);
        showErrorAlert("Error", "An error occurred during the API call.");
      } finally {
        loading.value = false;
      }
    };

    return {
      newAddressData,
      loading,
      itemDetails,
      validationSchema,
      submit,
      submitButtonRef,
      newAddressModalRef,
      heading: props.heading,
      instrumentId: props.instrumentId,
      companyId: props.companyId,
      resetTheData,
    };
  },
});
</script>
    
    