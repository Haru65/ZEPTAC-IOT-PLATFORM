<template>
  <!--begin::Modal - New Address-->
  <div
    class="modal fade"
    ref="newAddressModalRef"
    id="kt_modal_internal_doc"
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
            <h2>Instrument Records</h2>
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
              <!-- extra fields -->
              <div class="row mb-6">
                <div class="form-group col-md-6">
                  <label
                    class="col-lg-4 col-form-label required fw-semobold fw-bold text-gray-700 fs-6 text-nowrap"
                    >Instrument ID.</label
                  >
                  <Field
                    type="text"
                    name="instrument_id"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Enter Instrument Id"
                    v-model="calibrationInstrumentDetails.instrument_id"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="instrument_id" />
                    </div>
                  </div>
                </div>
              </div>

              <!-- extra fields -->
              <div class="row mb-6">
                <div class="form-group col-md-6">
                  <label
                    class="col-lg-4 col-form-label required fw-semobold fw-bold text-gray-700 fs-6 text-nowrap"
                    >Instument Name</label
                  >
                  <Field
                    type="text"
                    name="name"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Enter Instrument Model"
                    v-model="calibrationInstrumentDetails.name"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="name" />
                    </div>
                  </div>
                </div>

                <div class="form-group col-md-6">
                  <label
                    class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                    >Make</label
                  >
                  <Field
                    type="text"
                    name="make"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Instrument made by... "
                    v-model="calibrationInstrumentDetails.make"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="make" />
                    </div>
                  </div>
                </div>
              </div>
              <!--end::Input group-->

              <!-- extra fields -->
              <div class="row mb-6">
                <div class="form-group col-md-6">
                  <label
                    class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                    >Model No.</label
                  >
                  <Field
                    type="text"
                    name="model_no"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Enter Instrument Model No."
                    v-model="calibrationInstrumentDetails.model_no"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="model_no" />
                    </div>
                  </div>
                </div>
                <div class="form-group col-md-6">
                  <label
                    class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                    >Serial No.</label
                  >
                  <Field
                    type="text"
                    name="serial_no"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Enter Instrument Serial No."
                    v-model="calibrationInstrumentDetails.serial_no"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="serial_no" />
                    </div>
                  </div>
                </div>
              </div>
              <!--end::Input group-->

              <!-- extra fields -->
              <div class="row mb-6">
                <div class="form-group col-md-6">
                  <label
                    class="col-lg-4 col-form-label required fw-semobold fw-bold text-gray-700 fs-6 text-nowrap"
                    >Parameter</label
                  >

                  <div class="row">
                    <el-select
                      filterable
                      placeholder="Please Select Parameter"
                      name="parameter"
                      v-model="calibrationInstrumentDetails.parameter"
                      v-on:change="setParameter"
                    >
                      <el-option
                        value=""
                        disabled
                        label="Please Select Parameter"
                        key=""
                      >
                        Please Select Parameter</el-option
                      >
                      <el-option
                        v-for="item in parameters"
                        :key="item.id"
                        :value="item.id"
                        :label="item.param_name"
                      />
                    </el-select>
                  </div>
                  <!--end::Input-->
                </div>

                <div class="form-group col-md-6">
                  <label
                    class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                    >Resolution</label
                  >
                  <Field
                    type="text"
                    name="resolution"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Enter Instrument resolution"
                    v-model="calibrationInstrumentDetails.resolution"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="resolution" />
                    </div>
                  </div>
                </div>
              </div>
              <!--end::Input group-->

              <!-- extra fields -->
              <div class="row mb-6">
                <div class="form-group col-md-6">
                  <label
                    class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                    >Accuracy</label
                  >
                  <Field
                    type="text"
                    name="accuracy"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Enter Instrument accuracy"
                    v-model="calibrationInstrumentDetails.accuracy"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="accuracy" />
                    </div>
                  </div>
                </div>
              </div>
              <!--end::Input group-->

                          <!-- extra fields -->
            <div class="row mb-6">
              <div class="form-group col-md-12">
                <label
                  class="col-lg-4 col-form-label required fw-semobold fw-bold text-gray-700 fs-6 text-nowrap"
                  >Range</label
                >
                <!--begin::Input group-->
                <div class="input-group gap-2">
                  <Field
                    type="text"
                    name="ranges_from"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="0"
                    v-model="calibrationInstrumentDetails.ranges_from"
                  />
                  <span class="input-group-text">To</span>
                  <Field
                    type="text"
                    name="ranges_to"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="1000"
                    v-model="calibrationInstrumentDetails.ranges_to"
                  />
                </div>
                <!--end::Input group-->
              </div>
            </div>
            <!--end::Input group-->

              <!--begin::Input group-->
              <div class="row mb-6">
                <div class="col-lg-6 mb-8 mb-sd-8">
                  <label
                    class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap"
                    >Location
                  </label>
                  <div class="input-group gap-6">
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="location"
                        value="Onsite"
                        v-model="calibrationInstrumentDetails.location"
                        id="Onsite"
                      />
                      <label
                        for="Onsite"
                        class="form-check-label fw-bold text-gray-700 text-nowrap"
                        >Onsite</label
                      >
                    </div>

                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="location"
                        value="Inhouse"
                        v-model="calibrationInstrumentDetails.location"
                        id="Inhouse"
                      />
                      <label
                        for="Inhouse"
                        class="form-check-label fw-bold text-gray-700 text-nowrap"
                        >Inhouse</label
                      >
                    </div>
                  </div>
                </div>

                <div class="col-lg-6 mb-8 mb-sd-8">
                  <label
                    class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap"
                    >Instrument Condition
                  </label>
                  <div class="input-group gap-6">
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="instrument_condition"
                        value="OK"
                        v-model="
                          calibrationInstrumentDetails.instrument_condition
                        "
                        id="OK"
                      />
                      <label
                        for="OK"
                        class="form-check-label fw-bold text-gray-700 text-nowrap"
                        >OK</label
                      >
                    </div>

                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="instrument_condition"
                        value="DAMAGED"
                        v-model="
                          calibrationInstrumentDetails.instrument_condition
                        "
                        id="DAMAGED"
                      />
                      <label
                        for="DAMAGED"
                        class="form-check-label fw-bold text-gray-700 text-nowrap"
                        >DAMAGED</label
                      >
                    </div>
                  </div>
                </div>
              </div>
              <!--end::Input group-->

              <!-- extra fields -->
              <div class="row mb-6">
                <div
                  class="form-group col-md-12"
                  v-if="
                    calibrationInstrumentDetails.instrument_condition ==
                    'DAMAGED'
                  "
                >
                  <label
                    class="col-lg-4 col-form-label required fw-semobold fw-bold text-gray-700 fs-6 text-nowrap"
                    >Remark</label
                  >
                  <Field
                    type="text"
                    as="textarea"
                    row="2"
                    name="remark"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Remark is..."
                    v-model="calibrationInstrumentDetails.remark"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="remark" />
                    </div>
                  </div>
                </div>
                <div class="form-group col-md-12" v-else>
                  <label
                    class="col-lg-4 col-form-label required fw-semobold fw-bold text-gray-700 fs-6 text-nowrap"
                    >Remark</label
                  >
                  <div class="form-control">
                    {{ (calibrationInstrumentDetails.remark = "OK") }}
                  </div>
                </div>
              </div>
              <!--end::Input group-->

              <!-- extra fields -->
              <div class="row mb-6">
                <div class="form-group col-md-6">
                  <label
                    class="col-lg-4 col-form-label required fw-semobold fw-bold text-gray-700 fs-6 text-nowrap"
                    >Periodicity</label
                  >

                  <div class="row">
                    <el-select
                      filterable
                      placeholder="Please Select periodicity"
                      name="periodicity"
                      v-model="calibrationInstrumentDetails.periodicity"
                    >
                      <el-option
                        value=""
                        disabled
                        label="Please Select periodicity"
                        key=""
                      >
                        Please Select periodicity</el-option
                      >
                      <el-option
                        v-for="item in months"
                        :key="item.id"
                        :value="item.id"
                        :label="`${item.id} months`"
                      />
                    </el-select>
                  </div>
                  <!--end::Input-->
                </div>

                <div class="form-group col-md-6">
                  <label
                    class="col-lg-4 col-form-label fw-bold text-gray-700 fw-semobold fs-6"
                    >Calibration Points</label
                  >
                  <Field
                    type="text"
                    name="calibration_points"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Enter calibration points"
                    v-model="calibrationInstrumentDetails.calibration_points"
                  />
                </div>
              </div>
              <!--end::Input group-->

              <!-- extra fields -->
              <div class="row mb-6">
                <div class="form-group col-md-6">
                  <label
                    class="col-lg-4 col-form-label fw-bold text-gray-700 fw-semobold fs-6"
                    >Temperature (&deg;C)</label
                  >
                  <Field
                    type="text"
                    name="temp"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Temperature in Deg Celcius"
                    v-model="calibrationInstrumentDetails.temp"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="temp" />
                    </div>
                  </div>
                </div>

                <div class="form-group col-md-6">
                  <label
                    class="col-lg-4 col-form-label fw-bold text-gray-700 fw-semobold fs-6"
                    >Humidity (%)</label
                  >
                  <Field
                    type="text"
                    name="rh"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Humidity in %"
                    v-model="calibrationInstrumentDetails.rh"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="rh" />
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
                        >Calibration Date</span
                      >
                      <div class="block">
                        <el-date-picker
                          type="date"
                          name="calibration_date"
                          id="calibration_date"
                          v-model="
                            calibrationInstrumentDetails.calibration_date
                          "
                          placeholder="Pick a Day"
                          @change="setDates($event, 'calibration_date')"
                          :editable="false"
                        />
                      </div>
                    </span>
                    <!--end::Info-->
                  </label>
                  <div
                    class="fv-plugins-message-container"
                    v-if="!calibrationInstrumentDetails.calibration_date"
                  >
                    <div class="fv-help-block">
                      <ErrorMessage name="calibration_date" />
                    </div>
                  </div>
                </div>

                <div class="form-group col-md-6 mb-8 mb-sd-8">
                  <label
                    class="btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center"
                  >
                    <!--begin::Info-->
                    <span class="d-block fw-semobold text-start">
                      <span class="fs-5 fw-bold text-gray-700 text-nowrap"
                        >Calibration Due Date</span
                      >
                      <div class="block">
                        <el-date-picker
                          type="date"
                          name="calibration_due_date"
                          id="calibration_due_date"
                          v-model="
                            calibrationInstrumentDetails.calibration_due_date
                          "
                          placeholder="Pick a Day"
                          @change="setDates($event, 'calibration_due_date')"
                          :editable="false"
                        />
                      </div>
                    </span>
                    <!--end::Info-->
                  </label>
                  <div
                    class="fv-plugins-message-container"
                    v-if="!calibrationInstrumentDetails.calibration_due_date"
                  >
                    <div class="fv-help-block">
                      <ErrorMessage name="calibration_due_date" />
                    </div>
                  </div>
                </div>
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

  ranges_from: string;
  ranges_to: string;
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
  name: "calibration-instrument-add-modal",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },

  emits: ["document-added"],

  props: ["data"],

  setup(props, { emit }) {
    const router = useRouter();

    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const newAddressModalRef = ref<null | HTMLElement>(null);

    const calibrationInstrumentDetails = ref<CalibrationInstrument>({
      instrument_id: "",
      name: "",
      parameter: "",

      model_no: "",
      serial_no: "",
      make: "",

      calibration_date: "",
      calibration_due_date: "",

      location: "",

      ranges_from: "",
      ranges_to: "",
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
      service_request_id: props.data.service_request_id,
      company_id: props.data.company_id,
      is_active: 1,
    });

    const itemDetailsValidator = Yup.object().shape({
      instrument_id: Yup.string().required().label("Instrument Id"),
      name: Yup.string().required().label("Instrument Name"),

      model_no: Yup.string().required().label("Model No."),
      serial_no: Yup.string().required().label("Serial No."),
      make: Yup.string().required().label("Made by"),

      ranges_from: Yup.string().required().label("Range from"),
      ranges_to: Yup.string().required().label("Range to"),
      accuracy: Yup.string().required().label("Accuracy"),
      resolution: Yup.string().required().label("Resolution"),

      temp: Yup.string().required().label("Temperature"),
      rh: Yup.string().required().label("Relative Humidity"),
    });

    /* --------SET PARAMETER LOGIC--------*/
    const setParameter = (id) => {
      if (id != null || id != "") {
        const foundParameter = parameters.find((item) => id == item.id);

        if (foundParameter) {
          calibrationInstrumentDetails.value.accuracy =
            foundParameter.accuracy || "";
          calibrationInstrumentDetails.value.resolution =
            foundParameter.resolution || "";
        } else {
          calibrationInstrumentDetails.value.parameter = "";
          calibrationInstrumentDetails.value.accuracy = "";
          calibrationInstrumentDetails.value.resolution = "";
        }
      } else {
        calibrationInstrumentDetails.value.parameter = "";
        calibrationInstrumentDetails.value.accuracy = "";
        calibrationInstrumentDetails.value.resolution = "";
      }
    };

    // Watch for changes in props.data and update itemData accordingly
    watch(
      () => props.data,
      (newValue) => {
        calibrationInstrumentDetails.value.service_request_id =
          newValue.service_request_id;
        calibrationInstrumentDetails.value.company_id = newValue.company_id;

        console.log(newValue);
      }
    );

    onMounted(async () => {
      console.log(props.data);
    });

    /* --------SET DATE LOGIC--------*/
    async function setDates(e, dateType) {
      try {
        if (e != null) {
          if (e != "" && e != null) {
            calibrationInstrumentDetails.value[dateType] =
              moment(e).format("YYYY-MM-DD");
          } else {
            calibrationInstrumentDetails.value[dateType] = "";
          }
        } else {
          calibrationInstrumentDetails.value[dateType] = "";
        }
      } catch (err) {
        calibrationInstrumentDetails.value[dateType] = "";
      }
      console.log(calibrationInstrumentDetails.value[dateType]);
    }

    const clear = () => {
      calibrationInstrumentDetails.value = {
        instrument_id: "",
        name: "",
        parameter: "",

        model_no: "",
        serial_no: "",
        make: "",

        calibration_date: "",
        calibration_due_date: "",

        location: "",

        ranges_from: "",
        ranges_to: "",
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

        service_request_id: props.data.service_request_id,
        company_id: props.data.company_id,
        is_active: 1,
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

    const validateForm = (formData) => {
      for (const key in formData) {
        let value = formData[key];
        if (
          key !== "reference_instrument_id" &&
          key != "calibration_points" &&
          key != "service_request_id"
        ) {
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
      }
      return true;
    };

    const submit = async (e) => {
      console.log(calibrationInstrumentDetails.value);

      const result = validateForm(calibrationInstrumentDetails.value);

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
          calibrationInstrumentDetails.value
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
      calibrationInstrumentDetails,
      itemDetailsValidator,
      submit,
      submitButtonRef,
      newAddressModalRef,
      setDates,
      clear,
      parameters,
      months,
      setParameter,
    };
  },
});
</script>