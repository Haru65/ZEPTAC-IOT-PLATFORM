<template>
  <!--begin::Modal - New Address-->
  <div
    class="modal fade"
    ref="newAddressModalRef"
    :id="'kt_modal_new_address_' + $props.id"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
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
                      v-model="particleCountTestDetails.acceptance_criteria.id"
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
                      v-model="particleCountTestDetails.test_carried_by.id"
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
                      v-model="particleCountTestDetails.instrument_used.id"
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
                    >Area Name</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Field
                    type="text"
                    v-model="particleCountTestDetails.area_name"
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
                    v-model="particleCountTestDetails.room_name"
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
                    v-model="particleCountTestDetails.ahu_no"
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
                    v-model="particleCountTestDetails.report_name"
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
                    v-model="particleCountTestDetails.validation_date"
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
                    v-model="particleCountTestDetails.due_date"
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
              <ParticleCountTestCustomComponent
                v-bind:details="particleCountTestDetails.details"
                v-on:removeRow="RemoveRow"
                v-on:addNewRow="addNewRow"
                v-on:setTheLocationNo="SetLocationNo"
                v-on:setTheReading1="SetReading1"
                v-on:setTheReading2="SetReading2"
                v-on:setTheRemark="SetRemark"
              ></ParticleCountTestCustomComponent>

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
                    v-model="particleCountTestDetails.test_witnessed_by"
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
import ParticleCountTestCustomComponent from "./ParticleCountTestCustomComponent.vue";
import { AcceptanceCriteria } from "@/core/model/testAcceptanceCriteria";
import moment from "moment";

interface NewAddressData {}

interface ParticleCountTestReport {
  id: string;
  test_name: string;
  test_code: string;
  report_name: string;
  instrument_used: {
    id: string;
    name: string;
    model_no: string;
    serial_no: string;
    make: string;
  };
  area_name: string;
  room_name: string;
  ahu_no: string;
  validation_date: string;
  due_date: string;

  details: [
    {
      location_no: string;
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
    ParticleCountTestCustomComponent,
  },

  emit: ["childDataEmitted"],

  props: [
    "heading",
    "instruments",
    "engineers",
    "id",
    "code",
    "rgp_no",
  ],

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

    const particleCountTestDetails = ref({
      id: "",
      test_name: "",
      test_code: "",
      report_name: "",
      instrument_used: {
        id: "",
        name: "",
        model_no: "",
        serial_no: "",
        make: "",
      },
      area_name: "",
      room_name: "",
      ahu_no: "",
      validation_date: "",
      due_date: "",

      details: [
        {
          location_no: "",
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
          particleCountTestDetails.value.instrument_used.id =
            foundInstrument.id;
          particleCountTestDetails.value.instrument_used.name =
            foundInstrument.name;
          particleCountTestDetails.value.instrument_used.model_no =
            foundInstrument.model_no;
          particleCountTestDetails.value.instrument_used.serial_no =
            foundInstrument.serial_no;
          particleCountTestDetails.value.instrument_used.make =
            foundInstrument.make;
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
          particleCountTestDetails.value.test_carried_by.id = foundEngineer.id;
          particleCountTestDetails.value.test_carried_by.first_name =
            foundEngineer.first_name;
          particleCountTestDetails.value.test_carried_by.last_name =
            foundEngineer.last_name;
        }
      }
    };
    const setAcceptanceCriteria = (id) => {
      const foundAcceptanceCriteria = AcceptanceCriteria.find(
        (criteria) => id == criteria.id
      );

      if (foundAcceptanceCriteria) {
        particleCountTestDetails.value.acceptance_criteria.id =
          foundAcceptanceCriteria.id.toString();
        particleCountTestDetails.value.acceptance_criteria.certified =
          foundAcceptanceCriteria.certified;
      }
    };

    async function SetLocationNo(e, index) {
      particleCountTestDetails.value.details[index].location_no = await e.target
        .value;
    }

    async function setReportName(e) {
      particleCountTestDetails.value.report_name = await `${props.code}_${particleCountTestDetails.value.room_name}_${props.rgp_no}`;
    }

    onMounted(function () {
      particleCountTestDetails.value.id = props.id;
      particleCountTestDetails.value.test_name = props.heading;
      particleCountTestDetails.value.test_code = props.code;
    });

    async function SetReading1(e, index) {
      particleCountTestDetails.value.details[
        index
      ].particle_readings.reading_1 = await e.target.value;
    }

    async function SetReading2(e, index) {
      particleCountTestDetails.value.details[
        index
      ].particle_readings.reading_2 = await e.target.value;
    }

    async function SetRemark(e, index) {
      particleCountTestDetails.value.details[index].remark = await e.target
        .value;
    }

    function areAllPropertiesNotNull(array) {
      return array.some((detail) => {
        const {
          location_no,
          particle_readings: { reading_1, reading_2 },
          remark,
        } = detail;

        // Check if any property is null or empty

        return (
          location_no === "" ||
          isNaN(parseFloat(reading_1)) ||
          isNaN(parseFloat(reading_2)) ||
          remark === ""
        );
      });
    }

    // add
    const addNewRow = () => {
      if (!particleCountTestDetails.value.details.length) {
        particleCountTestDetails.value.details.push({
          location_no: "",
          particle_readings: {
            reading_1: "",
            reading_2: "",
          },
          remark: "",
        });
      } else {
        const result = areAllPropertiesNotNull(
          particleCountTestDetails.value.details
        );
        if (!result) {
          particleCountTestDetails.value.details.push({
            location_no: "",
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
      particleCountTestDetails.value.details = removeObjectWithId(
        particleCountTestDetails.value.details,
        index
      );
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
      particleCountTestDetails.value.area_name = "";
      particleCountTestDetails.value.report_name = "";
      particleCountTestDetails.value.room_name = "";
      particleCountTestDetails.value.ahu_no = "";

      particleCountTestDetails.value.test_witnessed_by = "";

      particleCountTestDetails.value.validation_date = "";
      particleCountTestDetails.value.due_date = "";

      particleCountTestDetails.value.instrument_used = {
        id: "",
        name: "",
        model_no: "",
        serial_no: "",
        make: "",
      };
      particleCountTestDetails.value.acceptance_criteria = {
        id: "",
        certified: "",
      };

      particleCountTestDetails.value.test_carried_by = {
        id: "",
        first_name: "",
        last_name: "",
      };

      particleCountTestDetails.value.details = [
        {
          location_no: "",
          particle_readings: {
            reading_1: "",
            reading_2: "",
          },
          remark: "",
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
      console.log(particleCountTestDetails.value);
      if (
        !particleCountTestDetails.value.validation_date ||
        !particleCountTestDetails.value.due_date
      ) {
        showErrorAlert("Warning", "Please fill all the details Correctly");
        return;
      }
      particleCountTestDetails.value.validation_date = moment(
        particleCountTestDetails.value.validation_date
      ).format("YYYY-MM-DD HH:mm:ss");
      particleCountTestDetails.value.due_date = moment(
        particleCountTestDetails.value.due_date
      ).format("YYYY-MM-DD HH:mm:ss");

      const isEmpty = !isNotEmpty(particleCountTestDetails);

      if (!particleCountTestDetails.value.details.length) {
        showErrorAlert("Warning", "Please fill all the details Correctly");
        return;
      }

      const result = areAllPropertiesNotNull(
        particleCountTestDetails.value.details
      );

      if (!isEmpty && !result) {
        await emit(
          "childDataEmitted",
          particleCountTestDetails.value.id,
          particleCountTestDetails.value
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
      particleCountTestDetails,
      SetLocationNo,
      SetReading1,
      SetReading2,
      SetRemark,
      AcceptanceCriteria,
      setInstrument,
      setAcceptanceCriteria,
      setEngineer,
    };
  },
});
</script>

