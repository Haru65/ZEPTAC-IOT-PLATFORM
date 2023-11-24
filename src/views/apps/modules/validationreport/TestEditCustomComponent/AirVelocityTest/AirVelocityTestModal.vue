<template>
  <!--begin::Modal - New Address-->
  <div
    class="modal fade"
    ref="newAddressModalRef"
    :id="'kt_modal_new_address_' + $props.id"
    tabindex="-6"
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
          @submit="submit($event)"
          :validation-schema="validationSchema"
        >
          <!--begin::Modal header-->
          <div class="modal-header" id="kt_modal_new_address_header">
            <!--begin::Modal title-->
            <h2>{{ $props.heading }}</h2>
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
          <div class="modal-body py-10 px-lg-17">
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
                <!--begin::Col-->
                <div class="col-md-6 fv-row mb-8 mb-sd-8">
                  <!--begin::Label-->
                  <label
                    class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                    >Acceptance Criteria</label
                  >
                  <!--end::Label-->

                  <div>
                    <el-select
                      filterable
                      placeholder="Please Select Acceptance Criteria"
                      name="acceptance_criteria"
                      v-model="airVelocityTestDetails.acceptance_criteria.id"
                      v-on:change="setAcceptanceCriteria"
                    >
                      <el-option
                        value=""
                        disabled="disabled"
                        label="Please Select Acceptance Criteria"
                        key=""
                      >
                        Please Select Acceptance Criteriar</el-option
                      >
                      <el-option
                        v-for="criteria in AcceptanceCriteria"
                        :key="criteria.id"
                        :value="criteria.id"
                        :label="criteria.certified"
                      />
                    </el-select>
                  </div>

                  <div class="fv-help-block">
                    <ErrorMessage
                      class="invalid-feedback"
                      name="acceptance_criteria"
                    />
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Col-->

                <!--begin::Col-->
                <div class="col-md-6 fv-row mb-8 mb-sd-8">
                  <!--end::Label-->
                  <label
                    class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                    >Test Carried By</label
                  >
                  <!--end::Label-->

                  <div>
                    <el-select
                      filterable
                      placeholder="Please Select Engineer"
                      name="test_carried_by"
                      v-model="airVelocityTestDetails.test_carried_by.id"
                      v-on:change="setEngineer"
                    >
                      <el-option
                        value=""
                        disabled="disabled"
                        label="Please Select Engineer"
                        key=""
                      >
                        Please Select Engineer</el-option
                      >
                      <el-option
                        v-for="engineer in $props.engineers"
                        :key="engineer.id"
                        :value="engineer.id"
                        :label="`${engineer.first_name} ${engineer.last_name}`"
                      />
                    </el-select>
                    <div class="fv-help-block">
                      <ErrorMessage
                        class="invalid-feedback"
                        name="test_carried_by"
                      />
                    </div>
                    <!--end::Input-->
                  </div>
                </div>
                <!--end::Col-->
              </div>
              <!--end::Input group-->

              <div class="row mb-2">
                <div class="form-group col-md-12 mb-8 mb-sd-8">
                  <label
                    class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap"
                    >Instrument Used
                  </label>
                  <div>
                    <el-select
                      filterable
                      placeholder="Please Select Instrument"
                      v-model="airVelocityTestDetails.instrument_used.id"
                      @change="setInstrument"
                    >
                      <el-option
                        value=""
                        disabled="disabled"
                        label="Please Select Instrument"
                        key=""
                      >
                        Please Select Instrument</el-option
                      >
                      <el-option
                        v-for="instrument in $props.instruments"
                        :key="instrument.id"
                        :value="instrument.id"
                        :label="instrument.name"
                      />
                    </el-select>
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage
                          class="invalid-feedback"
                          name="instrument_id"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <!--end::Input group-->
              </div>

              <!--begin::Input group-->
              <div class="row mb-6">
                <!--begin::Col-->
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label
                    class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                    >Equipment Name</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Field
                    type="text"
                    v-model="airVelocityTestDetails.equipment_name"
                    name="equipment_name"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Enter equipment name..."
                  />
                  <ErrorMessage
                    class="invalid-feedback"
                    name="equipment_name"
                  />
                  <!--end::Input-->
                </div>
                <!--end::Col-->

                <!--begin::Col-->
                <div class="col-md-6 fv-row">
                  <!--end::Label-->
                  <label
                    class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                    >Equipment ID</label
                  >
                  <!--end::Label-->

                  <!--end::Input-->
                  <Field
                    type="text"
                    v-model="airVelocityTestDetails.equipment_id"
                    name="equipment_id"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Enter equipment id..."
                  />
                  <ErrorMessage class="invalid-feedback" name="equipment_id" />
                  <!--end::Input-->
                </div>
                <!--end::Col-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="row mb-6">
                <!--begin::Col-->
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label
                    class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                    >Area Name</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Field
                    type="text"
                    v-model="airVelocityTestDetails.area_name"
                    name="area_name"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Enter area name..."
                  />
                  <ErrorMessage class="invalid-feedback" name="area_name" />
                  <!--end::Input-->
                </div>
                <!--end::Col-->

                <!--begin::Col-->
                <div class="col-md-6 fv-row">
                  <!--end::Label-->
                  <label
                    class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                    >Room Name</label
                  >
                  <!--end::Label-->

                  <!--end::Input-->
                  <Field
                    type="text"
                    v-model="airVelocityTestDetails.room_name"
                    @keyup="setReportName($event)"
                    name="room_name"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Enter room name..."
                  />
                  <ErrorMessage class="invalid-feedback" name="room_name" />
                  <!--end::Input-->
                </div>
                <!--end::Col-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="row mb-6">
                <!--begin::Col-->
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label
                    class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                    >AHU Number</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Field
                    type="text"
                    v-model="airVelocityTestDetails.ahu_no"
                    name="ahu_no"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Enter AHU Number"
                  />
                  <ErrorMessage class="invalid-feedback" name="ahu_no" />
                  <!--end::Input-->
                </div>
                <!--end::Col-->

                <!--begin::Col-->
                <div class="col-md-6 fv-row">
                  <!--end::Label-->
                  <label
                    class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                    >Report Name</label
                  >
                  <!--end::Label-->

                  <Field
                    type="text"
                    v-model="airVelocityTestDetails.report_name"
                    name="report_name"
                    disabled
                    class="form-control form-control-lg form-control-solid"
                    placeholder="code_room_rgp_"
                  />
                  <ErrorMessage class="invalid-feedback" name="report_name" />
                  <!--end::Input-->
                </div>
                <!--end::Col-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="row mb-6">
                <!--begin::Col-->
                <div class="col-md-6 fv-row mb-8 mb-sd-8">
                  <!--begin::Label-->
                  <label
                    class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                    >Validation Date</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-date-picker
                    type="date"
                    v-model="airVelocityTestDetails.validation_date"
                    name="validation_date"
                    id="date"
                    placeholder="Pick a day"
                    :editable="false"
                  />
                  <ErrorMessage
                    class="invalid-feedback"
                    name="validation_date"
                  />
                  <!--end::Input-->
                </div>
                <!--end::Col-->

                <!--begin::Col-->
                <div class="col-md-6 fv-row mb-8 mb-sd-8">
                  <!--end::Label-->
                  <label
                    class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                    >Due Date</label
                  >
                  <!--end::Label-->

                  <!--end::Input-->
                  <el-date-picker
                    type="date"
                    v-model="airVelocityTestDetails.due_date"
                    name="due_date"
                    id="date"
                    placeholder="Pick a day"
                    :editable="false"
                  />
                  <ErrorMessage class="invalid-feedback" name="due_date" />
                  <!--end::Input-->
                </div>
                <!--end::Col-->
              </div>
              <!--end::Input group-->
              <!-- Cutstom Component -->
              <AirVelocityTestCustomComponent
                v-bind:details="airVelocityTestDetails.details"
                v-bind:total_cfm="airVelocityTestDetails.total_cfm"
                v-bind:room_volume="airVelocityTestDetails.room_volume"
                v-bind:acph="airVelocityTestDetails.acph"
                v-on:removeRow="RemoveRow"
                v-on:addNewRow="addNewRow"
                v-on:setTheSupplyCode="SetSupplyCode"
                v-on:setTheReading1="SetReading1"
                v-on:setTheReading2="SetReading2"
                v-on:setTheReading3="SetReading3"
                v-on:setTheReading4="SetReading4"
                v-on:setTheReading5="SetReading5"
                v-on:setTheSupplyFilterSize="SetSupplyFilterSize"
                v-on:setTheRoomVolume="SetRoomVolume"
              ></AirVelocityTestCustomComponent>

              <div class="row mb-6">
                <!--begin::Col-->
                <div class="col-md-12 fv-row">
                  <!--begin::Label-->
                  <label
                    class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                    >Test Witnessed By</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Field
                    type="text"
                    v-model="airVelocityTestDetails.test_witnessed_by"
                    name="test_witnessed_by"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Enter the person namer"
                  />
                  <ErrorMessage
                    class="invalid-feedback"
                    name="test_witnessed_by"
                  />
                  <!--end::Input-->
                </div>
                <!--end::Col-->
              </div>
            </div>
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->

          <!--begin::Modal footer-->
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <button
              type="reset"
              id="kt_modal_new_address_cancel"
              class="btn btn-light me-3"
            >
              Discard
            </button>
            <!--end::Button-->

            <!--begin::Button-->
            <button
              ref="submitButtonRef"
              type="submit"
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
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";
import AirVelocityTestCustomComponent from "./AirVelocityTestCustomComponent.vue";
import { AcceptanceCriteria } from "@/core/model/testAcceptanceCriteria";
import moment from "moment";

interface NewAddressData {}

interface AirVelocityTestReport {
  id: string;
  test_name: string;
  test_code: string;
  report_name: string;
  instrument_used: {
    id: string;
    instrument_id: string;
    name: string;
    model_no: string;
    serial_no: string;
    make: string;
    calibration_date: string;
    calibration_due_date: string;
  };
  equipment_name: string;
  equipment_id: string;
  area_name: string;
  room_name: string;
  ahu_no: string;
  validation_date: string;
  due_date: string;

  details: [
    {
      supply_code: string;
      velocity_readings: {
        reading_1: string;
        reading_2: string;
        reading_3: string;
        reading_4: string;
        reading_5: string;
      };
      average_reading: number;
      supply_filter_size: string;
      cfm: string;
    }
  ];

  room_volume: string;
  total_cfm: string;
  acph: string;

  acceptance_criteria: {
    id: string;
    certified: string;
  };
  test_carried_by: {
    id: string;
    first_name: string;
    last_name: string;
  };
  test_witnessed_by: string;
}

export default defineComponent({
  name: "new-address-modal",
  components: {
    ErrorMessage,
    Field,
    VForm,
    AirVelocityTestCustomComponent,
  },

  emit: ["childDataEmitted"],

  props: ["heading", "instruments", "engineers", "id", "code", "rgp_no"],

  setup(props, { emit }) {
    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const newAddressModalRef = ref<null | HTMLElement>(null);
    const newAddressData = ref<NewAddressData>({});
    const validationSchema = Yup.object().shape({
      // firstName: Yup.string().required().label("First name"),
      // lastName: Yup.string().required().label("Last name"),
      // country: Yup.string().required().label("Country"),
      // address1: Yup.string().required().label("Address Line 1"),
      // address2: Yup.string().required().label("Address Line 2"),
      // town: Yup.string().required().label("Town"),
      // state: Yup.string().required().label("State/Province"),
      // postCode: Yup.string().required().label("Post code"),
    });

    // report_id = ""
    const airVelocityTestDetails = ref({
      id: "",
      test_name: "",
      test_code: "",
      report_name: "",
      instrument_used: {
        id: "",
        instrument_id: "",
        name: "",
        model_no: "",
        serial_no: "",
        make: "",
        calibration_date: "",
        calibration_due_date: "",
      },
      equipment_name: "",
      equipment_id: "",
      area_name: "",
      room_name: "",
      ahu_no: "asd",
      validation_date: "",
      due_date: "",

      details: [
        {
          supply_code: "",
          velocity_readings: {
            reading_1: "",
            reading_2: "",
            reading_3: "",
            reading_4: "",
            reading_5: "",
          },
          average_reading: 0,
          supply_filter_size: "",
          cfm: "",
        },
      ],
      room_volume: "",
      total_cfm: "",
      acph: "",

      acceptance_criteria: {
        id: "",
        certified: "",
      },
      test_carried_by: {
        id: "",
        first_name: "",
        last_name: "",
      },
      test_witnessed_by: "",
    });

    const setInstrument = (id) => {
      const instrumentUsedArray = Object.values([...props.instruments]);
      if (instrumentUsedArray) {
        const foundInstrument = instrumentUsedArray.find(
          (instrument) => id === instrument.id
        );
        if (foundInstrument) {
          airVelocityTestDetails.value.instrument_used.id = foundInstrument.id;
          airVelocityTestDetails.value.instrument_used.instrument_id =
            foundInstrument.instrument_id;
          airVelocityTestDetails.value.instrument_used.name =
            foundInstrument.name;
          airVelocityTestDetails.value.instrument_used.model_no =
            foundInstrument.model_no;
          airVelocityTestDetails.value.instrument_used.serial_no =
            foundInstrument.serial_no;
          airVelocityTestDetails.value.instrument_used.make =
            foundInstrument.make;
          airVelocityTestDetails.value.instrument_used.calibration_date =
            foundInstrument.calibration_date;
          airVelocityTestDetails.value.instrument_used.calibration_due_date =
            foundInstrument.calibration_due_date;
        }
      }
    };

    const setEngineer = (id) => {
      console.log(id);
      const engineerArray = Object.values([...props.engineers]);
      if (engineerArray) {
        const foundEngineer = engineerArray.find(
          (engineer) => id === engineer.id
        );
        if (foundEngineer) {
          airVelocityTestDetails.value.test_carried_by.id = foundEngineer.id;
          airVelocityTestDetails.value.test_carried_by.first_name =
            foundEngineer.first_name;
          airVelocityTestDetails.value.test_carried_by.last_name =
            foundEngineer.last_name;
        }
      }
    };
    const setAcceptanceCriteria = (id) => {
      const foundAcceptanceCriteria = AcceptanceCriteria.find(
        (criteria) => id == criteria.id
      );

      if (foundAcceptanceCriteria) {
        airVelocityTestDetails.value.acceptance_criteria.id =
          foundAcceptanceCriteria.id.toString();
        airVelocityTestDetails.value.acceptance_criteria.certified =
          foundAcceptanceCriteria.certified;
      }
    };

    async function SetSupplyCode(e, index) {
      airVelocityTestDetails.value.details[index].supply_code = await e.target
        .value;
    }

    async function setReportName(e) {
      airVelocityTestDetails.value.report_name =
        await `${props.code}_${airVelocityTestDetails.value.room_name}_${props.rgp_no}`;
    }

    onMounted(function () {
      airVelocityTestDetails.value.id = props.id;
      airVelocityTestDetails.value.test_name = props.heading;
      airVelocityTestDetails.value.test_code = props.code;
    });

    // Function to calculate the average from the velocity readings
    function calculateAverageFromReadings(readings) {
      const values = Object.values(readings).map((value) => Number(value));

      const sum = values.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      const average = sum / values.length;
      return Number(average.toFixed(1));
    }

    async function SetReading1(e, index) {
      airVelocityTestDetails.value.details[index].velocity_readings.reading_1 =
        await e.target.value;
      const average = calculateAverageFromReadings(
        airVelocityTestDetails.value.details[index].velocity_readings
      );
      airVelocityTestDetails.value.details[index].average_reading = average;
      calculateCFM(index);
    }

    async function SetReading2(e, index) {
      airVelocityTestDetails.value.details[index].velocity_readings.reading_2 =
        await e.target.value;
      const average = calculateAverageFromReadings(
        airVelocityTestDetails.value.details[index].velocity_readings
      );
      airVelocityTestDetails.value.details[index].average_reading = average;

      calculateCFM(index);
    }

    async function SetReading3(e, index) {
      airVelocityTestDetails.value.details[index].velocity_readings.reading_3 =
        await e.target.value;
      const average = calculateAverageFromReadings(
        airVelocityTestDetails.value.details[index].velocity_readings
      );
      airVelocityTestDetails.value.details[index].average_reading = average;

      calculateCFM(index);
    }

    async function SetReading4(e, index) {
      airVelocityTestDetails.value.details[index].velocity_readings.reading_4 =
        await e.target.value;
      const average = calculateAverageFromReadings(
        airVelocityTestDetails.value.details[index].velocity_readings
      );
      airVelocityTestDetails.value.details[index].average_reading = average;

      calculateCFM(index);
    }

    async function SetReading5(e, index) {
      airVelocityTestDetails.value.details[index].velocity_readings.reading_5 =
        await e.target.value;
      const average = calculateAverageFromReadings(
        airVelocityTestDetails.value.details[index].velocity_readings
      );
      airVelocityTestDetails.value.details[index].average_reading = average;

      calculateCFM(index);
    }

    async function SetSupplyFilterSize(e, index) {
      airVelocityTestDetails.value.details[index].supply_filter_size = await e
        .target.value;
      calculateCFM(index);
    }

    async function SetRoomVolume(e) {
      airVelocityTestDetails.value.room_volume = await e.target.value;
      calculateACPH();
    }

    function calculateCFM(index) {
      if (
        airVelocityTestDetails.value.details[index].average_reading &&
        airVelocityTestDetails.value.details[index].supply_filter_size
      ) {
        let cfmValue =
          airVelocityTestDetails.value.details[index].average_reading *
          Number(
            airVelocityTestDetails.value.details[index].supply_filter_size
          );

        airVelocityTestDetails.value.details[index].cfm = cfmValue.toFixed(1);
      } else {
        airVelocityTestDetails.value.details[index].cfm = "";
      }
      calculateTotalCFM();
    }

    function areAllPropertiesNotNull(array) {
      return array.some((detail) => {
        const {
          supply_code,
          velocity_readings: {
            reading_1,
            reading_2,
            reading_3,
            reading_4,
            reading_5,
          },
          average_reading,
          supply_filter_size,
          cfm,
        } = detail;

        // Check if any property is null or empty

        return (
          supply_code === "" ||
          isNaN(average_reading) ||
          isNaN(parseFloat(reading_1)) ||
          isNaN(parseFloat(reading_2)) ||
          isNaN(parseFloat(reading_3)) ||
          isNaN(parseFloat(reading_4)) ||
          isNaN(parseFloat(reading_5)) ||
          isNaN(parseFloat(supply_filter_size)) ||
          isNaN(parseFloat(cfm))
        );
      });
    }

    // add
    const addNewRow = () => {
      if (!airVelocityTestDetails.value.details.length) {
        airVelocityTestDetails.value.details.push({
          supply_code: "",
          velocity_readings: {
            reading_1: "",
            reading_2: "",
            reading_3: "",
            reading_4: "",
            reading_5: "",
          },
          average_reading: 0,
          supply_filter_size: "",
          cfm: "",
        });
      } else {
        const result = areAllPropertiesNotNull(
          airVelocityTestDetails.value.details
        );
        if (!result) {
          airVelocityTestDetails.value.details.push({
            supply_code: "",
            velocity_readings: {
              reading_1: "",
              reading_2: "",
              reading_3: "",
              reading_4: "",
              reading_5: "",
            },
            average_reading: 0,
            supply_filter_size: "",
            cfm: "",
          });
        } else {
          Swal.fire({
            icon: "info",
            title: "Please fill all the details correctly",
          });
        }
      }
    };

    const removeObjectWithId = (arr, id) => {
      if (id !== -1) {
        arr.splice(id, 1);
      }

      return arr;
    };

    function calculateTotalCFM() {
      const totalCFM = airVelocityTestDetails.value.details.reduce(
        (sum, detail) => {
          const cfmValue = Number(detail.cfm);
          if (cfmValue) {
            sum += cfmValue;
          }
          return sum;
        },
        0
      );
      // total cfm
      airVelocityTestDetails.value.total_cfm = totalCFM.toString();

      // recalculate acph
      calculateACPH();
    }

    function calculateACPH() {
      const roomValue = Number(airVelocityTestDetails.value.room_volume);
      let acphValue = 0;
      if (roomValue !== 0) {
        acphValue =
          (Number(airVelocityTestDetails.value.total_cfm) /
            Number(airVelocityTestDetails.value.room_volume)) *
          60;
      }
      airVelocityTestDetails.value.acph = acphValue.toString();
    }
    // Remove
    const RemoveRow = (index) => {
      airVelocityTestDetails.value.details = removeObjectWithId(
        airVelocityTestDetails.value.details,
        index
      );
      // TODO: calculating the total_cfm, room_volume, acph
      calculateTotalCFM();
    };

    function isNotEmpty(obj) {
      for (const key in obj) {
        if (typeof obj[key] === "string" && obj[key].trim() === "") {
          return false;
        }
        if (typeof obj[key] === "object" && !isNotEmpty(obj[key])) {
          return false;
        }
      }
      return true;
    }

    const clear = () => {
      airVelocityTestDetails.value.equipment_name = "";
      airVelocityTestDetails.value.equipment_id = "";
      airVelocityTestDetails.value.area_name = "";
      airVelocityTestDetails.value.report_name = "";
      airVelocityTestDetails.value.room_name = "";
      airVelocityTestDetails.value.acph = "";
      airVelocityTestDetails.value.ahu_no = "";

      airVelocityTestDetails.value.room_volume = "";
      airVelocityTestDetails.value.total_cfm = "";

      airVelocityTestDetails.value.test_witnessed_by = "";

      airVelocityTestDetails.value.validation_date = "";
      airVelocityTestDetails.value.due_date = "";

      airVelocityTestDetails.value.instrument_used = {
        id: "",
        instrument_id: "",
        name: "",
        model_no: "",
        serial_no: "",
        make: "",
        calibration_date: "",
        calibration_due_date: "",
      };
      airVelocityTestDetails.value.acceptance_criteria = {
        id: "",
        certified: "",
      };

      airVelocityTestDetails.value.test_carried_by = {
        id: "",
        first_name: "",
        last_name: "",
      };

      airVelocityTestDetails.value.test_carried_by = {
        id: "",
        first_name: "",
        last_name: "",
      };

      airVelocityTestDetails.value.details = [
        {
          supply_code: "",
          velocity_readings: {
            reading_1: "",
            reading_2: "",
            reading_3: "",
            reading_4: "",
            reading_5: "",
          },
          average_reading: 0,
          supply_filter_size: "",
          cfm: "",
        },
      ];
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
      console.log(airVelocityTestDetails.value);

      if (
        !airVelocityTestDetails.value.validation_date ||
        !airVelocityTestDetails.value.due_date
      ) {
        showErrorAlert("Warning", "Please fill all the details Correctly");
        return;
      }

      airVelocityTestDetails.value.validation_date = moment(
        airVelocityTestDetails.value.validation_date
      ).format("YYYY-MM-DD HH:mm:ss");
      airVelocityTestDetails.value.due_date = moment(
        airVelocityTestDetails.value.due_date
      ).format("YYYY-MM-DD HH:mm:ss");

      const isEmpty = !isNotEmpty(airVelocityTestDetails);

      if (!airVelocityTestDetails.value.details.length) {
        showErrorAlert("Warning", "Please fill all the details Correctly");
        return;
      }

      const result = areAllPropertiesNotNull(
        airVelocityTestDetails.value.details
      );

      const room_volume = airVelocityTestDetails.value.room_volume;
      const total_cfm = airVelocityTestDetails.value.total_cfm;
      const acph = airVelocityTestDetails.value.acph;

      const numericRegex = /^[0-9]+(\.[0-9]+)?$/;

      if (
        !isEmpty &&
        !result &&
        numericRegex.test(room_volume) &&
        numericRegex.test(total_cfm) &&
        numericRegex.test(acph)
      ) {
        await emit(
          "childDataEmitted",
          airVelocityTestDetails.value.id,
          airVelocityTestDetails.value
        );

        showSuccessAlert("Success", "Report Added Successfully!");

        clear();

        hideModal(newAddressModalRef.value);

        console.log("not empty");
      } else {
        showErrorAlert("Warning", "Please fill all the details Correctly");
        return;
      }
    };

    return {
      newAddressData,
      validationSchema,
      submit,
      submitButtonRef,
      newAddressModalRef,
      getAssetPath,
      heading: props.heading,
      instruments: props.instruments,
      engineers: props.engineers,
      id: props.id,
      code: props.code,
      rgp_no: props.rgp_no,
      setReportName,
      RemoveRow,
      addNewRow,
      airVelocityTestDetails,
      SetSupplyCode,
      SetReading1,
      SetReading2,
      SetReading3,
      SetReading4,
      SetReading5,
      SetSupplyFilterSize,
      SetRoomVolume,
      AcceptanceCriteria,
      setInstrument,
      setAcceptanceCriteria,
      setEngineer,
    };
  },
});
</script>

