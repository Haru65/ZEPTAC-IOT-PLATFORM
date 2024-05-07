<template>
  <!--begin::Modal - New Address-->
  <div
    class="modal fade"
    ref="newAddressModalRef"
    :id="'kt_modal_new_address_' + $props.id + '_' + $props.reportId"
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
              @click="resetTheData"
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
                      v-model="recoveryTestDetails.acceptance_criteria.id"
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
                      v-model="recoveryTestDetails.test_carried_by.id"
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
                      v-model="recoveryTestDetails.instrument_used.id"
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

              <div class="row mb-6">
                <div
                  class="form-check form-switch form-check-custom form-check-primary form-check-solid ms-4"
                >
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :value="false"
                    name="EquipmentRef"
                    id="EquipmentRef"
                    v-on:change="handleChange"
                    v-model="EquipmentRef"
                  />
                  <label
                    class="form-check-label fw-bold text-primary fw-semobold fs-5"
                    for="EquipmentRef"
                  >
                    Want to add report using Equipment.
                  </label>
                </div>
              </div>

              <!--begin::Input group-->
              <div class="row mb-6">
                <!--begin::Col-->
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                    >Equipment Name</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Field
                    type="text"
                    :disabled="EquipmentRef === false"
                    v-model="recoveryTestDetails.equipment_name"
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
                  <label class="fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                    >Equipment ID</label
                  >
                  <!--end::Label-->

                  <!--end::Input-->
                  <Field
                    type="text"
                    :disabled="EquipmentRef === false"
                    v-model="recoveryTestDetails.equipment_id"
                    @keyup="setReportName($event)"
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
                  <label class="fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                    >Area Name</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Field
                    type="text"
                    :disabled="EquipmentRef === true"
                    v-model="recoveryTestDetails.area_name"
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
                  <label class="fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                    >Room Name</label
                  >
                  <!--end::Label-->

                  <!--end::Input-->
                  <Field
                    type="text"
                    :disabled="EquipmentRef === true"
                    v-model="recoveryTestDetails.room_name"
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
                  <label class="fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                    >AHU Number</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Field
                    type="text"
                    :disabled="EquipmentRef === true"
                    v-model="recoveryTestDetails.ahu_no"
                    name="ahu_no"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Enter AHU Number"
                  />
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
                    v-model="recoveryTestDetails.report_name"
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
                  <div class="block">
                    <el-date-picker
                    type="date"
                    name="validation_date"
                    id="validation_date"
                    v-model="recoveryTestDetails.validation_date"
                    @change="setDates($event, 'validation_date')"
                    placeholder="Pick a day"
                    :editable="false"
                  />
                  </div>
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

                  <div class="block">
                    <el-date-picker
                    type="date"
                    name="due_date"
                    id="due_date"
                    v-model="recoveryTestDetails.due_date"
                    @change="setDates($event, 'due_date')"
                    placeholder="Pick a day"
                    :editable="false"
                  />
                  </div>
                  <!--end::Input-->
                  <ErrorMessage class="invalid-feedback" name="due_date" />
                  <!--end::Input-->
                </div>
                <!--end::Col-->
              </div>
              <!--end::Input group-->
              <!-- Cutstom Component -->
              <RecoveryTestCustomComponent
                v-bind:details="recoveryTestDetails.details"
                v-on:removeRow="RemoveRow"
                v-on:addNewRow="addNewRow"
                v-on:setTheAhuCondition="SetAhuCondition"
                v-on:setTheTime="SetTime"
                v-on:setTheReading1="SetReading1"
                v-on:setTheReading2="SetReading2"
                v-on:setTheRemark="SetRemark"
              ></RecoveryTestCustomComponent>

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
                    v-model="recoveryTestDetails.test_witnessed_by"
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
import { defineComponent, onMounted, ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";
import RecoveryTestCustomComponent from "./RecoveryTestCustomComponent.vue";
import { AcceptanceCriteria } from "@/core/model/testAcceptanceCriteria";
import moment from "moment";

interface NewAddressData {}

interface RecoveryTestReport {
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
      ahu_condition: string;
      time: string;
      particle_readings: {
        reading_1: string;
        reading_2: string;
      };
      remark: string;
    }
  ];

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
    RecoveryTestCustomComponent,
  },

  emit: ["updateReport"],

  props: [
    "heading",
    "instruments",
    "engineers",
    "id",
    "code",
    "rgp_no",
    "reportData",
    "reportId",
  ],

  setup(props, { emit }) {
    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const newAddressModalRef = ref<null | HTMLElement>(null);
    const newAddressData = ref<NewAddressData>({});

    const EquipmentRef = ref(false);

    const handleChange = () => {
      if (EquipmentRef.value === true) {
        // if it is true it means report has to be filled using equipment id
        EquipmentRef.value = true;

        // clear room_name,  area_name, ahu_no
        recoveryTestDetails.value.room_name = "";
        recoveryTestDetails.value.area_name = "";
        recoveryTestDetails.value.ahu_no = "";

        recoveryTestDetails.value.report_name = "";
      } else {
        // if it is false it means report has to be filled using room name
        EquipmentRef.value = false;

        // clear equipment_id,  equipment_name field
        recoveryTestDetails.value.equipment_id = "";
        recoveryTestDetails.value.equipment_name = "";

        recoveryTestDetails.value.report_name = "";
      }
    };

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

    const recoveryTestDetails = ref({
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
      ahu_no: "",
      validation_date: "",
      due_date: "",

      details: [
        {
          ahu_condition: "",
          time: "",
          particle_readings: {
            reading_1: "",
            reading_2: "",
          },
          remark: "",
        },
      ],

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
          recoveryTestDetails.value.instrument_used.id = foundInstrument.id;
          recoveryTestDetails.value.instrument_used.instrument_id =
            foundInstrument.instrument_id;
          recoveryTestDetails.value.instrument_used.name = foundInstrument.name;
          recoveryTestDetails.value.instrument_used.model_no =
            foundInstrument.model_no;
          recoveryTestDetails.value.instrument_used.serial_no =
            foundInstrument.serial_no;
          recoveryTestDetails.value.instrument_used.make = foundInstrument.make;
          recoveryTestDetails.value.instrument_used.calibration_date =
            foundInstrument.calibration_date;
          recoveryTestDetails.value.instrument_used.calibration_due_date =
            foundInstrument.calibration_due_date;
        }
      }
    };
    const setEngineer = (id) => {
      const engineerArray = Object.values([...props.engineers]);
      if (engineerArray) {
        const foundEngineer = engineerArray.find(
          (engineer) => id === engineer.id
        );
        if (foundEngineer) {
          recoveryTestDetails.value.test_carried_by.id = foundEngineer.id;
          recoveryTestDetails.value.test_carried_by.first_name =
            foundEngineer.first_name;
          recoveryTestDetails.value.test_carried_by.last_name =
            foundEngineer.last_name;
        }
      }
    };
    const setAcceptanceCriteria = (id) => {
      const foundAcceptanceCriteria = AcceptanceCriteria.find(
        (criteria) => id == criteria.id
      );

      if (foundAcceptanceCriteria) {
        recoveryTestDetails.value.acceptance_criteria.id =
          foundAcceptanceCriteria.id;
        recoveryTestDetails.value.acceptance_criteria.certified =
          foundAcceptanceCriteria.certified;
      }
    };

    async function SetAhuCondition(e, index) {
      console.log(e.target.checked);
      if (e.target.checked === true) {
        recoveryTestDetails.value.details[index].ahu_condition = await "ON";
      } else {
        recoveryTestDetails.value.details[index].ahu_condition = await "OFF";
      }
      console.log(recoveryTestDetails.value.details);
    }

    async function SetTime(e, index) {
      console.log(e);
      if (e != null) {
        recoveryTestDetails.value.details[index].time = await moment(e).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      } else {
        recoveryTestDetails.value.details[index].time = await "";
      }
    }

    // function that adds Recovery Data
    async function setRecoveryTestData(data) {
      const {
        id,
        test_name,
        test_code,
        report_name,
        instrument_used,
        equipment_name,
        equipment_id,
        area_name,
        room_name,
        ahu_no,
        validation_date,
        due_date,
        details,
        acceptance_criteria,
        test_carried_by,
        test_witnessed_by,
      } = data;

      const recoveryTestReport = {
        id,
        test_name,
        test_code,
        report_name,
        instrument_used: {
          id: instrument_used.id,
          instrument_id: instrument_used.instrument_id,
          name: instrument_used.name,
          model_no: instrument_used.model_no,
          serial_no: instrument_used.serial_no,
          make: instrument_used.make,
          calibration_date: instrument_used.calibration_date,
          calibration_due_date: instrument_used.calibration_due_date,
        },
        equipment_name,
        equipment_id,
        area_name,
        room_name,
        ahu_no,
        validation_date,
        due_date,
        details: details.map((detail) => ({
          ahu_condition: detail.ahu_condition,
          time: detail.time,
          particle_readings: {
            reading_1: detail.particle_readings.reading_1,
            reading_2: detail.particle_readings.reading_2,
          },
          remark: detail.remark,
        })),
        acceptance_criteria: {
          id: acceptance_criteria.id,
          certified: acceptance_criteria.certified,
        },
        test_carried_by: {
          id: test_carried_by.id,
          first_name: test_carried_by.first_name,
          last_name: test_carried_by.last_name,
        },
        test_witnessed_by,
      };

      recoveryTestDetails.value = recoveryTestReport;
      recoveryTestDetails.value.details = recoveryTestReport.details;

      EquipmentRef.value = recoveryTestDetails.value.equipment_id
        ? true
        : false;
    }

    async function resetTheData() {
      recoveryTestDetails.value = await { ...props.reportData };
      recoveryTestDetails.value.details = [];
      recoveryTestDetails.value.details.push(props.reportData.details);
      EquipmentRef.value = props.reportData.equipment_id ? true : false;
      await setRecoveryTestData(props.reportData);
    }

    async function setReportName(e) {
      if (recoveryTestDetails.value.equipment_id) {
        recoveryTestDetails.value.report_name =
          await `${props.code}_${recoveryTestDetails.value.equipment_id}_${props.rgp_no}`;
      } else if (recoveryTestDetails.value.room_name) {
        recoveryTestDetails.value.report_name =
          await `${props.code}_${recoveryTestDetails.value.room_name}_${props.rgp_no}`;
      } else {
        recoveryTestDetails.value.report_name = "";
      }
    }

    onMounted(function () {
      recoveryTestDetails.value.id = props.id;
      recoveryTestDetails.value.test_name = props.heading;
      recoveryTestDetails.value.test_code = props.code;

      setRecoveryTestData(props.reportData);

      recoveryTestDetails.value = { ...props.reportData };

      EquipmentRef.value = recoveryTestDetails.value.equipment_id
        ? true
        : false;

      resetTheData();
    });

    async function SetReading1(e, index) {
      recoveryTestDetails.value.details[index].particle_readings.reading_1 =
        await e.target.value;
    }

    async function SetReading2(e, index) {
      recoveryTestDetails.value.details[index].particle_readings.reading_2 =
        await e.target.value;
    }

    async function SetRemark(e, index) {
      recoveryTestDetails.value.details[index].remark = await e.target.value;
    }

    function areAllPropertiesNotNull(array) {
      return array.some((detail) => {
        const {
          ahu_condition,
          time,
          particle_readings: { reading_1, reading_2 },
          remark,
        } = detail;

        // Check if any property is null or empty

        return (
          ahu_condition === "" ||
          time === "" ||
          isNaN(parseFloat(reading_1)) ||
          isNaN(parseFloat(reading_2)) ||
          remark === ""
        );
      });
    }

    // add
    const addNewRow = () => {
      if (!recoveryTestDetails.value.details.length) {
        recoveryTestDetails.value.details.push({
          ahu_condition: "ON",
          time: "",
          particle_readings: {
            reading_1: "",
            reading_2: "",
          },
          remark: "",
        });
      } else {
        const result = areAllPropertiesNotNull(
          recoveryTestDetails.value.details
        );
        if (!result) {
          recoveryTestDetails.value.details.push({
            ahu_condition: "ON",
            time: "",
            particle_readings: {
              reading_1: "",
              reading_2: "",
            },
            remark: "",
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

    // Remove
    const RemoveRow = (index) => {
      recoveryTestDetails.value.details = removeObjectWithId(
        recoveryTestDetails.value.details,
        index
      );
    };

    function isNotEmpty(obj) {
      for (const key in obj) {
        if (
          key === "ahu_no" ||
          key === "area_name" ||
          key === "room_name" ||
          key === "equipment_id" ||
          key === "validation_date" ||
          key === "due_date" ||
          key === "equipment_name"
        ) {
          continue;
        }
        if (typeof obj[key] === "string" && obj[key].trim() === "") {
          return false;
        }
        if (typeof obj[key] === "object" && !isNotEmpty(obj[key])) {
          return false;
        }
      }
      return true;
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

        /* --------SET DATE LOGIC--------*/
        async function setDates(e, dateType) {
      try {
        if (e != null) {
          if (e != "" && e != null) {
            recoveryTestDetails.value[dateType] =
              moment(e).format("YYYY-MM-DD");
          } else {
            recoveryTestDetails.value[dateType] = "";
          }
        } else {
          recoveryTestDetails.value[dateType] = "";
        }
      } catch (err) {
        recoveryTestDetails.value[dateType] = "";
      }
      console.log(recoveryTestDetails.value[dateType]);
    }

    const submit = async (e) => {
      console.log(recoveryTestDetails.value);
      if (
        !recoveryTestDetails.value.validation_date ||
        !recoveryTestDetails.value.due_date
      ) {
        showErrorAlert("Warning", "Please fill all the details Correctly");
        return;
      }

      if (EquipmentRef.value === true) {
        if (
          !recoveryTestDetails.value.equipment_id ||
          !recoveryTestDetails.value.equipment_name
        ) {
          showErrorAlert("Warning", "Please fill all the details Correctly");
          return;
        }
      } else if (EquipmentRef.value === false) {
        if (
          !recoveryTestDetails.value.room_name ||
          !recoveryTestDetails.value.ahu_no ||
          !recoveryTestDetails.value.area_name
        ) {
          showErrorAlert("Warning", "Please fill all the details Correctly");
          return;
        }
      }

      const isEmpty = !isNotEmpty(recoveryTestDetails);
      if (recoveryTestDetails.value.details.length == 0) {
        showErrorAlert("Warning", "Please fill all the details Correctly");
        return;
      }
      const result = areAllPropertiesNotNull(recoveryTestDetails.value.details);

      if (!isEmpty && !result) {
        await emit(
          "updateReport",
          recoveryTestDetails.value.id,
          props.reportId,
          recoveryTestDetails.value
        );

        showSuccessAlert("Success", "Report Added Successfully!");

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
      heading: props.heading,
      instruments: props.instruments,
      engineers: props.engineers,
      id: props.id,
      code: props.code,
      rgp_no: props.rgp_no,
      setReportName,
      reportId: props.reportId,
      reportData: props.reportData,
      RemoveRow,
      addNewRow,
      recoveryTestDetails,
      SetAhuCondition,
      SetTime,
      SetReading1,
      SetReading2,
      SetRemark,
      AcceptanceCriteria,
      setInstrument,
      setAcceptanceCriteria,
      setEngineer,
      resetTheData,
      EquipmentRef,
      handleChange,
      setDates,
    };
  },
});
</script>

