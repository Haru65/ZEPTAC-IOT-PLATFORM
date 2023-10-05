<template>
  <!--begin::Modal - New Address-->
  <div
    class="modal fade"
    ref="newAddressModalRef"
    :id="'kt_modal_new_address_' + $props.id + '_' + $props.reportId"
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
                      v-model="
                        filterIntegrityTestDetails.acceptance_criteria.id
                      "
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
                      v-model="filterIntegrityTestDetails.test_carried_by.id"
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
                      v-model="filterIntegrityTestDetails.instrument_used.id"
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
                    v-model="filterIntegrityTestDetails.area_name"
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
                    v-model="filterIntegrityTestDetails.room_name"
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
                    v-model="filterIntegrityTestDetails.ahu_no"
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
                    v-model="filterIntegrityTestDetails.report_name"
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
                    v-model="filterIntegrityTestDetails.validation_date"
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
                    v-model="filterIntegrityTestDetails.due_date"
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
              <FilterIntegrityTestCustomComponent
                v-bind:details="filterIntegrityTestDetails.details"
                v-on:removeRow="RemoveRow"
                v-on:addNewRow="addNewRow"
                v-on:setTheSupplyCode="SetSupplyCode"
                v-on:setTheUpstreamConc="SetUpstreamConc"
                v-on:setTheLeakage="SetLeakage"
                v-on:setTheResultOfPOV="SetResultOfPOV"
                v-on:setTheRemark="SetRemark"
              ></FilterIntegrityTestCustomComponent>

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
                    v-model="filterIntegrityTestDetails.test_witnessed_by"
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
import FilterIntegrityTestCustomComponent from "./FilterIntegrityTestCustomComponent.vue";
import { AcceptanceCriteria } from "@/core/model/testAcceptanceCriteria";
import moment from "moment";

interface NewAddressData {}

interface FilterIntegrityTestReport {
  id: string;
  test_name: string;
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
      supply_code: string;
      up_stream_conc: string;
      leakage: string;
      test_result_of_pov: string;
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
    FilterIntegrityTestCustomComponent,
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

    const filterIntegrityTestDetails = ref({
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
          supply_code: "",
          up_stream_conc: "",
          leakage: "",
          test_result_of_pov: "",
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
          filterIntegrityTestDetails.value.instrument_used.id =
            foundInstrument.id;
          filterIntegrityTestDetails.value.instrument_used.name =
            foundInstrument.name;
          filterIntegrityTestDetails.value.instrument_used.model_no =
            foundInstrument.model_no;
          filterIntegrityTestDetails.value.instrument_used.serial_no =
            foundInstrument.serial_no;
          filterIntegrityTestDetails.value.instrument_used.make =
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
          filterIntegrityTestDetails.value.test_carried_by.id =
            foundEngineer.id;
          filterIntegrityTestDetails.value.test_carried_by.first_name =
            foundEngineer.first_name;
          filterIntegrityTestDetails.value.test_carried_by.last_name =
            foundEngineer.last_name;
        }
      }
    };
    const setAcceptanceCriteria = (id) => {
      const foundAcceptanceCriteria = AcceptanceCriteria.find(
        (criteria) => id == criteria.id
      );

      if (foundAcceptanceCriteria) {
        filterIntegrityTestDetails.value.acceptance_criteria.id =
          foundAcceptanceCriteria.id.toString();
        filterIntegrityTestDetails.value.acceptance_criteria.certified =
          foundAcceptanceCriteria.certified;
      }
    };

    async function SetSupplyCode(e, index) {
      filterIntegrityTestDetails.value.details[index].supply_code = await e
        .target.value;
    }

    async function setFilterIntegrityTestData(data) {
      const {
        id,
        test_name,
        test_code,
        report_name,
        instrument_used,
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

      const filterIntegrityTestReport = {
        id,
        test_name,
        test_code,
        report_name,
        instrument_used: {
          id: instrument_used.id,
          name: instrument_used.name,
          model_no: instrument_used.model_no,
          serial_no: instrument_used.serial_no,
          make: instrument_used.make,
        },
        area_name,
        room_name,
        ahu_no,
        validation_date,
        due_date,
        details: details.map((detail) => ({
          supply_code: detail.supply_code,
          up_stream_conc: detail.up_stream_conc,
          leakage: detail.leakage,
          test_result_of_pov: detail.test_result_of_pov,
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

      filterIntegrityTestDetails.value = filterIntegrityTestReport;
      filterIntegrityTestDetails.value.details = filterIntegrityTestReport.details;

    }

    async function resetTheData() {
      filterIntegrityTestDetails.value = await {...props.reportData};
      filterIntegrityTestDetails.value.details = [];
      filterIntegrityTestDetails.value.details.push(props.reportData.details);
      await setFilterIntegrityTestData(props.reportData);
    }

        async function setReportName(e) {
          filterIntegrityTestDetails.value.report_name = await `${props.code}_${filterIntegrityTestDetails.value.room_name}_${props.rgp_no}`;
    }

    onMounted(function () {
      filterIntegrityTestDetails.value.id = props.id;
      filterIntegrityTestDetails.value.test_name = props.heading;
      filterIntegrityTestDetails.value.test_code = props.code;

      setFilterIntegrityTestData(props.reportData);

      filterIntegrityTestDetails.value = { ...props.reportData };

      resetTheData();

    });

    async function SetUpstreamConc(e, index) {
      filterIntegrityTestDetails.value.details[index].up_stream_conc = await e
        .target.value;
    }

    async function SetLeakage(e, index) {
      filterIntegrityTestDetails.value.details[index].leakage = await e.target
        .value;
    }
    async function SetResultOfPOV(e, index) {
      filterIntegrityTestDetails.value.details[index].test_result_of_pov =
        await e.target.value;
    }
    async function SetRemark(e, index) {
      filterIntegrityTestDetails.value.details[index].remark = await e.target
        .value;
    }

    function areAllPropertiesNotNull(array) {
      return array.some((detail) => {
        const {
          supply_code,
          up_stream_conc,
          leakage,
          test_result_of_pov,
          remark,
        } = detail;

        // Check if any property is null or empty

        return (
          supply_code === "" ||
          isNaN(parseFloat(up_stream_conc)) ||
          isNaN(parseFloat(leakage)) ||
          test_result_of_pov === "" ||
          remark === ""
        );
      });
    }

    // add
    const addNewRow = () => {
      if (!filterIntegrityTestDetails.value.details.length) {
        filterIntegrityTestDetails.value.details.push({
          supply_code: "",
          up_stream_conc: "",
          leakage: "",
          test_result_of_pov: "",
          remark: "",
        });
      } else {
        const result = areAllPropertiesNotNull(
          filterIntegrityTestDetails.value.details
        );
        if (!result) {
          filterIntegrityTestDetails.value.details.push({
            supply_code: "",
            up_stream_conc: "",
            leakage: "",
            test_result_of_pov: "",
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
      filterIntegrityTestDetails.value.details = removeObjectWithId(
        filterIntegrityTestDetails.value.details,
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
      console.log(filterIntegrityTestDetails.value);

      if(!filterIntegrityTestDetails.value.validation_date || !filterIntegrityTestDetails.value.due_date){
        showErrorAlert("Warning", "Please fill all the details Correctly");
        return;
      }

      filterIntegrityTestDetails.value.validation_date = moment(
        filterIntegrityTestDetails.value.validation_date
      ).format("YYYY-MM-DD HH:mm:ss");
      filterIntegrityTestDetails.value.due_date = moment(
        filterIntegrityTestDetails.value.due_date
      ).format("YYYY-MM-DD HH:mm:ss");

      const isEmpty = !isNotEmpty(filterIntegrityTestDetails);

      if(filterIntegrityTestDetails.value.details.length == 0){
        showErrorAlert("Warning", "Please fill all the details Correctly");
        return;
      }

      const result = areAllPropertiesNotNull(
        filterIntegrityTestDetails.value.details
      );

      if (!isEmpty && !result) {
        await emit(
          "updateReport",
          filterIntegrityTestDetails.value.id,
          props.reportId,
          filterIntegrityTestDetails.value
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
      getAssetPath,
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
      filterIntegrityTestDetails,
      SetSupplyCode,
      SetUpstreamConc,
      SetLeakage,
      SetResultOfPOV,
      SetRemark,
      AcceptanceCriteria,
      setInstrument,
      setAcceptanceCriteria,
      setEngineer,
      resetTheData,
    };
  },
});
</script>

