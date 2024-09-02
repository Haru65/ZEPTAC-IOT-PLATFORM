<template>
  <!--begin::Modal - New Address-->
  <div
    class="modal fade"
    ref="newAddressModalRef"
    id="kt_modal_uuc_reading"
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
          :validation-schema="itemDetailsValidator"
          @submit="submit"
        >
          <!--begin::Modal header-->
          <div class="modal-header" id="kt_modal_new_address_header">
            <!--begin::Modal title-->
            <h2>Readings</h2>
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
              <div class="table-responsive p-6 mb-6">
                <table
                  class="table table-responsive table-bordered g-6 m-4 w-100 fw-bold text-gray-700"
                >
                  <thead
                    class="fw-semibold fs-6 text-gray-700 text-center justify-content-center"
                  >
                    <tr>
                      <th class="col-1" rowspan="2">#</th>
                      <th class="col-2" rowspan="2">Range of UUC in psi</th>
                      <th class="col-2" rowspan="2">UUC Reading</th>
                      <th class="col-2" rowspan="1">I1</th>
                      <th class="col-2" rowspan="1">D1</th>
                      <th class="col-2" rowspan="1">I2</th>
                      <th class="col-2" rowspan="1">D2</th>
                      <th class="col-2" rowspan="2">Mean</th>
                      <th class="col-2" rowspan="2">Action</th>
                    </tr>
                    <tr
                      class="fs-6 fw-semibold text-gray-700 text-center justify-content-center"
                    >
                      <th>psi (&#8593;)</th>
                      <th>psi (&#8593;)</th>
                      <th>psi (&#8595;)</th>
                      <th>psi (&#8595;)</th>
                    </tr>
                  </thead>

                  <tbody
                    class="text-center justify-content-center"
                  >
                    <tr
                      v-for="(
                        data, index
                      ) in $props.readingData.reading_data"
                      :key="index"
                    >
                      <td>
                        <span
                          class="form-control form-control-lg form-control-solid"
                        >
                          {{ index + 1 }}
                        </span>
                      </td>
                      <td>
                        <input
                          type="text"
                          :name="'ranges_' + index"
                          class="form-control form-control-lg form-control-solid min-w-100px"
                          placeholder="0 to 1000"
                          v-model="data.ranges"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          :name="'uuc_reading_' + index"
                          class="form-control form-control-lg form-control-solid min-w-100px"
                          placeholder="0"
                          v-model="data.uuc_reading"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          :name="'i1_up_' + index"
                          class="form-control form-control-lg form-control-solid min-w-100px"
                          placeholder="0"
                          v-model="data.i1_up"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          :name="'d1_up_' + index"
                          class="form-control form-control-lg form-control-solid min-w-100px"
                          placeholder="0"
                          v-model="data.d1_up"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          :name="'i2_down_' + index"
                          class="form-control form-control-lg form-control-solid min-w-100px"
                          placeholder="0"
                          v-model="data.i2_down"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          :name="'d2_down_' + index"
                          class="form-control form-control-lg form-control-solid min-w-100px"
                          placeholder="0"
                          v-model="data.d2_down_"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          disabled
                          :name="'mean_value_' + index"
                          class="form-control form-control-lg form-control-solid min-w-100px"
                          placeholder="0"
                          v-model="data.mean_value"
                        />
                      </td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-sm rounded-circle btn-danger"
                          @click="removeReading(index)"
                        >
                          <span class="text-center">X</span>
                        </button>
                      </td>
                    </tr>
                    <tr
                      class="text-center"
                      v-if="CalibrationReadings.reading_data.length === 0"
                    >
                      <td
                        colspan="9"
                        class="fw-semibold fs-6 text-gray-800 border-bottom border-gray-200 text-align-center"
                      >
                        No Readings.
                      </td>
                    </tr>
                  </tbody>

                  <div class="text-start">
                    <div class="input-group p-2 flex gap-6">
                      <div class="input-group-append">
                        <button
                          class="btn btn-sm btn-success rounded-circle fs-6"
                          type="button"
                          @click="addReading"
                        >
                          <span class="text-center">+</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </table>
              </div>
            </div>
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->

          <!--begin::Modal footer-->
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <button
              id="kt_modal_new_address_submit"
              ref="submitButtonRef"
              class="btn btn-primary me-2 px-6"
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
import { defineComponent, onMounted, ref, watch } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import { hideModal } from "@/core/helpers/dom";
import { addCalibrationInstrument } from "@/stores/api";

import { useRouter } from "vue-router";
import ApiService from "@/core/services/ApiService";
import moment from "moment";
import { parameters, months } from "@/core/model/calibration_instrument";

interface CalibrationInstrument {
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

interface CalibrationReadings {
  id: string;
  reference_instrument_id: string;
  ranges: string;
  reading_data: {
    uuc_reading: number;
    i1_up: number;
    d1_down: number;
    i2_up: number;
    d2_down: number;
    mean_value: number;
  }[];
}

export default defineComponent({
  name: "uuc-reading-modal",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },

  emits: ["document-added"],

  props: ["readingData"],

  setup(props, { emit }) {
    const router = useRouter();

    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const newAddressModalRef = ref<null | HTMLElement>(null);

    const calibrationReadingDetail = ref<CalibrationReadings>({
      id: "",
      reference_instrument_id: "",
      ranges: "",
      reading_data: [
        {
          uuc_reading: 0,
          i1_up: 0,
          d1_down: 0,
          i2_up: 0,
          d2_down: 0,
          mean_value: 0,
        },
      ],
    });

    const itemDetailsValidator = Yup.object().shape({});

    onMounted(async () => {
      calibrationReadingDetail.value = { ...props.readingData };
    });

    console.log(props.readingData);
      // Watch for changes in props.data and update itemData accordingly
      watch(
        () => props.readingData,
        (newValue) => {
          calibrationReadingDetail.value = { ...newValue };
          console.log(newValue);
        }
      );

    const clear = () => {
      calibrationReadingDetail.value = {
        id: "",
        reference_instrument_id: "",
        ranges: "",
        reading_data: [
          {
            uuc_reading: 0,
            i1_up: 0,
            d1_down: 0,
            i2_up: 0,
            d2_down: 0,
            mean_value: 0,
          },
        ],
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

    const addReading = () => {
      calibrationReadingDetail.value.reading_data.push({
        uuc_reading: 0,
        i1_up: 0,
        d1_down: 0,
        i2_up: 0,
        d2_down: 0,
        mean_value: 0,
      });
    };

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
          value = value.trim();
          if (value === "") {
            return false;
          }
        } else {
        }
      }
      return true;
    };

    const submit = async (e) => {
      console.log(calibrationReadingDetail.value);

      const result = validateForm(calibrationReadingDetail.value);

      if (result == false) {
        showErrorAlert("Warning", "Please fill all the details correctly.");
        return;
      }

      try {
        if (submitButtonRef.value) {
          // Activate indicator
          submitButtonRef.value.setAttribute("data-kt-indicator", "on");
        }

        // Call your API here
        const response = await addCalibrationInstrument(
          calibrationReadingDetail.value
        );

        if (response?.success) {
          // Handle successful API response
          showSuccessAlert(
            "Success",
            response.message || "Calibration Instrument Added Successfully!"
          );
          clear();

          await emit("document-added");
          hideModal(newAddressModalRef.value);
        } else {
          // Handle API error response
          showErrorAlert("Error", response.message || "An error occurred.");
        }
      } catch (error) {
        // Handle any other errors during API call
        console.error("API call error:", error);
        showErrorAlert("Error", "An error occurred during the API call.");
      } finally {
        if (submitButtonRef.value) {
          submitButtonRef.value.removeAttribute("data-kt-indicator");
        }
      }
    };

    return {
      calibrationReadingDetail,
      itemDetailsValidator,
      submit,
      submitButtonRef,
      newAddressModalRef,
      clear,
      addReading,
      readingData: props.readingData,
    };
  },
});
</script>