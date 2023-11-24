<template>
  <div style="width: 99%" class="sm:p-4 md:p-8 lg:p-12 rounded">
    <!--begin::Modal dialog-->
    <div class="d-flex flex-column">
      <div class="flex-xl-row-fluid mb-10 mb-lg-0 me-lg-7 me-xl-10">
        <div class="card w-20">
          <div class="card-body sm:p-2 lg:p-12">
            <!--end::Form-->

            <VForm :validation-schema="validationReportDetailsValidator">
              <!--begin::Card body-->
              <div class="card-body border-top p-2">
                <!-- extra fields -->

                <!--begin::Card body-->
                <div class="card p-2 w-100">
                  <div class="shadow-lg p-2 m-auto fs-4 rounded w-100 border">
                    <div class="row mb-2">
                      <div class="form-group col-md-12 mb-8 mb-sd-8">
                        <label
                          class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap"
                          >Gate Pass
                        </label>
                        <div>
                          <el-select
                            v-model="validationReportDetails.rgp_id"
                            filterable
                            placeholder="Please Select GatePass"
                            name="rgp_id"
                            @change="SetDetails(validationReportDetails.rgp_id)"
                          >
                            <el-option
                              value=""
                              disabled="disabled"
                              label="Please Select GatePass"
                              key=""
                            >
                              Please Select GatePass</el-option
                            >
                            <el-option
                              v-for="item in RGPS"
                              :key="item.id"
                              :value="item.id"
                              :label="item.rgp_no"
                            />
                          </el-select>
                          <div
                            class="fv-plugins-message-container"
                            v-if="!validationReportDetails.rgp_id"
                          >
                            <div class="fv-help-block">
                              <ErrorMessage name="rgp_id" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <!--end::Input group-->
                    </div>

                    <div class="row mb-2" v-if="validationReportDetails.rgp_id">
                      <div class="form-group col-md-6 mb-8 mb-sd-8">
                        <label
                          class="col-lg-4 col-form-label fs-5 fw-bold text-gray-700 text-nowrap"
                          >Customer Name</label
                        >
                        <div class="form-control form-control-solid">
                          <span class="fs-5 fw-bold text-gray-700">
                            {{ CustomerData.company.company_name }}
                          </span>
                        </div>
                      </div>
                      <div class="form-group col-md-6 mb-8 mb-sd-8">
                        <label
                          class="col-lg-4 col-form-label fs-5 fw-bold text-gray-700 text-nowrap"
                          >Customer Address</label
                        >
                        <div class="form-control form-control-solid">
                          <span class="fs-5 fw-bold text-gray-700">
                            {{ CustomerAddress.company_name }}
                            {{ CustomerAddress.address1 }}
                            {{ CustomerAddress.address2 }}
                            {{ CustomerAddress.city }} -
                            {{ CustomerAddress.pincode }}
                            {{ CustomerAddress.states }}
                            {{ CustomerAddress.country }}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="row mb-2" v-if="validationReportDetails.rgp_id">
                      <div class="form-group col-md-6 mb-8 mb-sd-8">
                        <label
                          class="col-lg-4 col-form-label fs-5 fw-bold text-gray-700 text-nowrap"
                          >Client Name</label
                        >
                        <div class="form-control form-control-solid">
                          <span class="fs-5 fw-bold text-gray-700">
                            {{ ClientData.company.company_name }}
                          </span>
                        </div>
                      </div>
                      <div class="form-group col-md-6 mb-8 mb-sd-8">
                        <label
                          class="col-lg-4 col-form-label fs-5 fw-bold text-gray-700 text-nowrap"
                          >Client Address</label
                        >
                        <div class="form-control form-control-solid">
                          <span class="fs-5 fw-bold text-gray-700">
                            {{ ClientAddress.company_name }}
                            {{ ClientAddress.address1 }}
                            {{ ClientAddress.address2 }}
                            {{ ClientAddress.city }} -
                            {{ ClientAddress.pincode }}
                            {{ ClientAddress.states }}
                            {{ ClientAddress.country }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!--end::Card body-->

                <div
                  v-if="
                    validationReportDetails.worksheet_filled_count === 0 &&
                    validationReportDetails.rgp_id
                  "
                >
                  <div class="tab-content">
                    <div
                      class="tab-pane fade show active"
                      aria-labelledby="home-tab"
                    >
                      <div class="shadow-lg p-5 mb-7 fs-4 rounded">
                        <p>Sorry! You cannot fill the report.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!--begin::Accordion-->
                <div v-else class="accordion" id="kt_accordion_1">
                  <div
                    class="accordion-item"
                    v-for="test in ConductedTests"
                    :key="test.id"
                  >
                    <h2
                      class="accordion-header"
                      :id="'kt_accordion_1_header_' + test.id"
                    >
                      <button
                        class="accordion-button fs-4 fw-semibold"
                        type="button"
                        :data-bs-toggle="'collapse'"
                        :data-bs-target="'#kt_accordion_1_body_' + test.id"
                        :aria-expanded="test.id === 0 ? 'true' : 'false'"
                        :aria-controls="'kt_accordion_1_body_' + test.id"
                      >
                        {{ test.test }}
                        <span
                          class="badge m-3 py-3 px-4 fs-7 badge-light-primary rounded animate__animated animate__pulse animate__infinite"
                          >{{
                            Object.values(
                              validationReportDetails.tests[test.id]
                            )[0].length
                              ? Object.values(
                                  validationReportDetails.tests[test.id]
                                )[0].length
                              : "0"
                          }}</span
                        >
                      </button>
                    </h2>
                    <div
                      :id="'kt_accordion_1_body_' + test.id"
                      class="accordion-collapse collapse"
                      :class="test.id === 0 ? 'show' : ''"
                      :aria-labelledby="'kt_accordion_1_header_' + test.id"
                      data-bs-parent="#kt_accordion_1"
                    >
                      <div class="accordion-body">
                        <div>
                          <!-- Add content for nested accordion here -->
                          <div class="table-responsive">
                            <table
                              class="table table-rounded table-striped border gy-7 gs-7 text-nowrap"
                            >
                              <thead>
                                <tr
                                  class="fw-semibold fs-6 text-gray-800 border-bottom border-gray-200 text-align-center"
                                >
                                  <th class="col-10">TEST REPORTS</th>
                                  <th>ACTION</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr
                                  v-for="(report, index) in Object.values(
                                    validationReportDetails.tests[test.id]
                                  )[0]"
                                  :key="index"
                                >
                                  <td class="align-middle">
                                    <span
                                      class="badge py-3 px-4 fs-7 badge-light-primary"
                                      >{{
                                        `${report.report_name}_${index + 1}`
                                      }}</span
                                    >
                                  </td>
                                  <td>
                                    <div
                                      class="btn-group"
                                      role="group"
                                      aria-label="View and Delete Buttons"
                                    >
                                      <button
                                        type="button"
                                        class="btn btn-primary btn-sm"
                                        data-bs-toggle="modal"
                                        :data-bs-target="
                                          '#kt_modal_new_address_' +
                                          test.id +
                                          '_' +
                                          index
                                        "
                                      >
                                        <i class="bi bi-eye"></i> Edit
                                      </button>

                                      <component
                                        :is="getTestEditComponent(test.id)"
                                        v-bind:heading="test.test + ' Edit'"
                                        v-bind:id="test.id"
                                        v-bind:code="test.code"
                                        v-bind:rgp_no="
                                          validationReportDetails.rgp_no
                                        "
                                        v-bind:reportId="index"
                                        v-bind:reportData="report"
                                        v-bind:instruments="
                                          validationReportDetails.instruments
                                        "
                                        v-bind:engineers="
                                          validationReportDetails.engineers
                                        "
                                        :additionalprops="
                                          getAdditionalProps(test.id)
                                        "
                                        @updateReport="updateReportData"
                                      ></component>

                                      <button
                                        type="button"
                                        class="btn btn-danger btn-sm"
                                        @click="deleteReport(test.id, index)"
                                      >
                                        <i class="bi bi-trash"></i> Delete
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                                <tr
                                  class="text-center"
                                  v-if="
                                    Object.values(
                                      validationReportDetails.tests[test.id]
                                    )[0].length === 0
                                  "
                                >
                                  <td
                                    colspan="2"
                                    class="fw-semibold fs-6 text-gray-800 border-bottom border-gray-200 text-align-center"
                                  >
                                    No reports available.
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div class="text-start mt-8">
                          <button
                            type="button"
                            class="btn btn-primary btn-md"
                            data-bs-toggle="modal"
                            :data-bs-target="'#kt_modal_new_address_' + test.id"
                          >
                            Add a report
                          </button>
                        </div>

                        <component
                          :is="getTestComponent(test.id)"
                          v-bind:heading="test.test"
                          v-bind:id="test.id"
                          v-bind:code="test.code"
                          v-bind:rgp_no="validationReportDetails.rgp_no"
                          v-bind:instruments="
                            validationReportDetails.instruments
                          "
                          v-bind:engineers="validationReportDetails.engineers"
                          :additionalprops="getAdditionalProps(test.id)"
                          @childDataEmitted="handleTestData"
                        ></component>
                      </div>
                    </div>
                  </div>
                </div>
                <!--end::Accordion-->
                <div class="row mt-6 mb-2">
                  <div class="form-group col-md-6 mb-8 mb-sd-8">
                    <label
                      class="btn btn-lg btn-outline btn-outline-dashed btn-outline-default p-3 d-flex align-items-center"
                    >
                      <!--begin::Info-->
                      <span class="d-block fw-semobold text-start">
                        <span class="text-gray-700 fw-bold d-block fs-6 mb-2"
                          >Report Status</span
                        >
                        <div class="btn-group" role="group">
                          <div v-for="status in ReportStatus" :key="status.id">
                            <input
                              type="radio"
                              class="btn-check btn-sm"
                              name="report_status"
                              :id="`${status.id}`"
                              :value="status.id"
                              v-model="validationReportDetails.report_status"
                              autocomplete="off"
                            />
                            <label
                              :class="'btn btn-sm btn-outline-primary'"
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

                <div class="modal-footer flex-center w-100 mt-6">
                  <!--begin::Button-->
                  <button
                    type="reset"
                    class="btn btn-lg btn-danger w-sd-25 w-lg-25"
                  >
                    Discard
                  </button>
                  <!--end::Button-->
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  <!--begin::Button-->
                  <span
                    :data-kt-indicator="loading ? 'on' : null"
                    class="btn btn-lg btn-primary w-sd-25 w-lg-25"
                    @click="onsubmit()"
                  >
                    <span v-if="!loading" class="indicator-label">
                      Submit
                    </span>
                    <span v-if="loading" class="indicator-progress">
                      Please wait...
                      <span
                        class="spinner-border spinner-border-sm align-middle ms-2"
                      ></span>
                    </span>
                  </span>
                  <!--end::Button-->
                </div>
              </div>
            </VForm>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import ApiService from "@/core/services/ApiService";
import { addValidationReport, getAllRGP } from "@/stores/api";
import { useAuthStore } from "@/stores/auth";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { useRouter } from "vue-router";
import { ConductedTests } from "@/core/model/conductedtests";
import Swal from "sweetalert2/dist/sweetalert2.js";
import moment from "moment";
import * as Yup from "yup";
import { ReportStatus } from "@/core/model/validationreports";

import AirVelocityTestModal from "./TestAddCustomComponent/AirVelocityTest/AirVelocityTestModal.vue";
import AirVelocityTestEditModal from "./TestAddCustomComponent/AirVelocityTest/AirVelocityTestEditModal.vue";
import FilterIntegrityTestModal from "./TestAddCustomComponent/FilterIntegrityTest/FilterIntegrityTestModal.vue";
import FilterIntegrityTestEditModal from "./TestAddCustomComponent/FilterIntegrityTest/FilterIntegrityTestEditModal.vue";
import ParticleCountTestModal from "./TestAddCustomComponent/ParticleCountTest/ParticleCountTestModal.vue";
import ParticleCountTestEditModal from "./TestAddCustomComponent/ParticleCountTest/ParticleCountTestEditModal.vue";
import RecoveryTestModal from "./TestAddCustomComponent/RecoveryTest/RecoveryTestModal.vue";
import RecoveryTestEditModal from "./TestAddCustomComponent/RecoveryTest/RecoveryTestEditModal.vue";
import DefaultTest from "./TestAddCustomComponent/DefaultTest.vue";

interface Instrument {
  id: string;
  instrument_id: string;
  name: string;
  model_no: string;
  serial_no: string;
  make: string;
  calibration_date: string;
  calibration_due_date: string;
}
interface Engineer {
  id: string;
  first_name: string;
  last_name: string;
}

interface airVelocityTestReport {
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
  ahu_no: string;
  validation_date: string;
  due_date: string;
  room_name: string;

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
      average_reading: string;

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

interface filterIntegrityTestReport {
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
  ahu_no: string;
  validation_date: string;
  due_date: string;

  room_name: string;

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

interface particleCountTestReport {
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
  ahu_no: string;
  validation_date: string;
  due_date: string;

  room_name: string;

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

interface recoveryTestReport {
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
  ahu_no: string;
  validation_date: string;
  due_date: string;

  room_name: string;

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

interface ValidationReport {
  rgp_id: string;
  rgp_no: string;
  company_id: string;
  instruments: Array<Instrument>;
  engineers: Array<Engineer>;
  tests: [
    {
      air_velocity_test_reports: Array<airVelocityTestReport>;
    },
    {
      filter_integrity_test_reports: Array<filterIntegrityTestReport>;
    },
    {
      particle_count_test_reports: Array<particleCountTestReport>;
    },
    {
      recovery_test_reports: Array<recoveryTestReport>;
    }
  ];
  report_status: string;
  is_active: number;
  created_by: string;
  updated_by: string;

  worksheet_filled_count: number;
}

export default defineComponent({
  name: "validationreport-add",
  components: {
    ErrorMessage,
    Field,
    VForm,
    DefaultTest,
    AirVelocityTestModal,
    AirVelocityTestEditModal,
    FilterIntegrityTestModal,
    FilterIntegrityTestEditModal,
    ParticleCountTestModal,
    ParticleCountTestEditModal,
    RecoveryTestModal,
    RecoveryTestEditModal,
  },
  setup() {
    const auth = useAuthStore();
    const route = useRouter();
    const User = auth.GetUser();

    const selectedTests = ref([]);
    const loading = ref(false);

    const validationReportDetails = ref<ValidationReport>({
      rgp_id: "",
      rgp_no: "",
      company_id: User.company_id,
      instruments: [],
      engineers: [],
      tests: [
        {
          air_velocity_test_reports: [],
        },
        {
          filter_integrity_test_reports: [],
        },
        {
          particle_count_test_reports: [],
        },
        {
          recovery_test_reports: [],
        },
      ],
      report_status: "1",
      created_by: User.id,
      updated_by: User.id,
      is_active: 1,

      worksheet_filled_count: 0,
    });

    const validationReportDetailsValidator = Yup.object().shape({
      rgp_id: Yup.string().required().label("RGP"),
    });

    /* ========= ADD FUNCTIONS ========*/
    // function that adds air velocity data
    async function addAirVelocityTestData(testId, data) {
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
        room_volume,
        total_cfm,
        acph,
        acceptance_criteria,
        test_carried_by,
        test_witnessed_by,
      } = data;

      const airVelocityTestReport = {
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
        ahu_no,
        validation_date,
        due_date,
        room_name,
        details: details.map((detail) => ({
          supply_code: detail.supply_code,
          velocity_readings: {
            reading_1: detail.velocity_readings.reading_1,
            reading_2: detail.velocity_readings.reading_2,
            reading_3: detail.velocity_readings.reading_3,
            reading_4: detail.velocity_readings.reading_4,
            reading_5: detail.velocity_readings.reading_5,
          },
          average_reading: detail.average_reading,
          supply_filter_size: detail.supply_filter_size,
          cfm: detail.cfm,
        })),
        room_volume,
        total_cfm,
        acph,
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

      await validationReportDetails.value.tests[0].air_velocity_test_reports.push(
        airVelocityTestReport
      );
    }

    // function that adds Filter Integrity Data
    async function addFilterIntegrityTestData(testId, data) {
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

      const filterIntegrityTestReport = {
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

      await validationReportDetails.value.tests[1].filter_integrity_test_reports.push(
        filterIntegrityTestReport
      );
    }

    // function that adds Paricle Count Data
    async function addParticleCountTestData(testId, data) {
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

      const particleCountTestReport = {
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
          location_no: detail.location_no,
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

      await validationReportDetails.value.tests[2].particle_count_test_reports.push(
        particleCountTestReport
      );
    }

    // function that adds Recovery Data
    async function addRecoveryTestData(testId, data) {
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

      await validationReportDetails.value.tests[3].recovery_test_reports.push(
        recoveryTestReport
      );
    }

    // function that handles the testData event for each test
    function handleTestData(testId, data) {
      switch (testId) {
        case 0:
          addAirVelocityTestData(testId, data);
          return;
        case 1:
          addFilterIntegrityTestData(testId, data);
          return;
        case 2:
          addParticleCountTestData(testId, data);
          return;
        case 3:
          addRecoveryTestData(testId, data);
          return;
        default:
          // edge case
          console.log("Unknown Test");
          return;
      }
    }

    // send props to the component
    function getAdditionalProps(testId) {
      // Define different attributes based on the test
      switch (testId) {
        case 0:
          return {
            heading: ConductedTests[testId].test,
            id: testId,
          };
        case 1:
          return {
            heading: ConductedTests[testId].test,
            id: testId,
          };
        case 2:
          return {
            heading: ConductedTests[testId].test,
            id: testId,
          };
        case 3:
          return {
            heading: ConductedTests[testId].test,
            id: testId,
          };
        default:
          // For Unknown Test
          return {
            heading: "Unknown Test",
            id: 99999,
          };
      }
    }

    // Render The Add Custom Modal
    function getTestComponent(testId) {
      // Map test IDs to component names
      switch (testId) {
        case 0:
          return "AirVelocityTestModal";
        case 1:
          return "FilterIntegrityTestModal";
        case 2:
          return "ParticleCountTestModal";
        case 3:
          return "RecoveryTestModal";
        default:
          // default unknown test
          return "DefaultTest";
      }
    }

    // Render The Edit Custom Modal
    function getTestEditComponent(testId) {
      // Map test IDs to component names
      switch (testId) {
        case 0:
          return "AirVelocityTestEditModal";
        case 1:
          return "FilterIntegrityTestEditModal";
        case 2:
          return "ParticleCountTestEditModal";
        case 3:
          return "RecoveryTestEditModal";
        default:
          // default unknown test
          return "DefaultTest";
      }
    }

    /* ========= UPDATE FUNCTIONS ========*/
    // function that update air velocity data
    async function updateAirVelocityTestData(testId, reportId, data) {
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
        room_volume,
        total_cfm,
        acph,
        acceptance_criteria,
        test_carried_by,
        test_witnessed_by,
      } = data;

      const airVelocityTestReport = {
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
        ahu_no,
        validation_date,
        due_date,
        room_name,
        details: details.map((detail) => ({
          supply_code: detail.supply_code,
          velocity_readings: {
            reading_1: detail.velocity_readings.reading_1,
            reading_2: detail.velocity_readings.reading_2,
            reading_3: detail.velocity_readings.reading_3,
            reading_4: detail.velocity_readings.reading_4,
            reading_5: detail.velocity_readings.reading_5,
          },
          average_reading: detail.average_reading,
          supply_filter_size: detail.supply_filter_size,
          cfm: detail.cfm,
        })),
        room_volume,
        total_cfm,
        acph,
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

      await validationReportDetails.value.tests[0].air_velocity_test_reports.splice(
        reportId,
        1,
        airVelocityTestReport
      );
    }

    // function that update Filter Integrity Data
    async function updateFilterIntegrityTestData(testId, reportId, data) {
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

      const filterIntegrityTestReport = {
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

      await validationReportDetails.value.tests[1].filter_integrity_test_reports.splice(
        reportId,
        1,
        filterIntegrityTestReport
      );
      console.log(validationReportDetails.value);
    }

    // function that update Paricle Count Data
    async function updateParticleCountTestData(testId, reportId, data) {
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

      const particleCountTestReport = {
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
          location_no: detail.location_no,
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

      await validationReportDetails.value.tests[2].particle_count_test_reports.splice(
        reportId,
        1,
        particleCountTestReport
      );
      console.log(validationReportDetails.value);
    }

    // function that update Recovery Data
    async function updateRecoveryTestData(testId, reportId, data) {
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

      await validationReportDetails.value.tests[3].recovery_test_reports.splice(
        reportId,
        1,
        recoveryTestReport
      );
      console.log(validationReportDetails.value);
    }

    // function that handles the testData event for each test
    function updateReportData(testId, reportId, data) {
      switch (testId) {
        case 0:
          updateAirVelocityTestData(testId, reportId, data);
          return;
        case 1:
          updateFilterIntegrityTestData(testId, reportId, data);
          return;
        case 2:
          updateParticleCountTestData(testId, reportId, data);
          return;
        case 3:
          updateRecoveryTestData(testId, reportId, data);
          return;
        default:
          // edge case
          console.log("Unknown Test");
          return;
      }
    }

    const RGPS = ref([
      {
        id: "",
        rgp_no: "",
        quotation_id: "",
        quotation_no: "",
        instruments: [],
        engineers: [],
        client_id: "",
        customer_id: "",
        date: "",
        duedate: "",
        status: "",
        customer_address: {
          company_name: "",
          address1: "",
          address2: "",
          country: "",
          city: "",
          pincode: "",
          states: "",
        },
        client_address: {
          company_name: "",
          address1: "",
          address2: "",
          country: "",
          city: "",
          pincode: "",
          states: "",
        },
        customer_data: {
          id: "",
          first_name: "",
          last_name: "",
          company: {
            company_name: "",
          }
        },
        client_data: {
          id: "",
          first_name: "",
          last_name: "",
          company: {
            company_name: "",
          }
        },
        worksheet_filled_count: 0,
      },
    ]);

    const CustomerAddress = ref({
      company_name: "",
      address1: "",
      address2: "",
      country: "",
      city: "",
      pincode: "",
      states: "",
    });

    const ClientAddress = ref({
      company_name: "",
      address1: "",
      address2: "",
      country: "",
      city: "",
      pincode: "",
      states: "",
    });

    const CustomerData = ref({
      id: "",
      first_name: "",
      last_name: "",
      company: {
        company_name: "",
      }
    });

    const ClientData = ref({
      id: "",
      first_name: "",
      last_name: "",
      company: {
        company_name: "",
      }
    });

    // set the details when rgp is selected
    const SetDetails = async (id) => {
      if (id) {
        try {
          // console.log("Before",validationReportDetails.value.rgp_no);

          if (validationReportDetails.value.rgp_no == "") {
            // Find the rgp
            const foundRGP = RGPS.value.find((rgp) => rgp.id === id);

            // If not found, return early
            if (!foundRGP) {
              return;
            }

            // Destructure and assign rgp details
            const {
              rgp_no,
              worksheet_filled_count,
              instruments,
              engineers,
              client_address,
              customer_address,
              customer_data,
              client_data,
            } = await foundRGP;
            validationReportDetails.value.rgp_id = id;
            validationReportDetails.value.rgp_no = rgp_no;
            validationReportDetails.value.worksheet_filled_count =
              worksheet_filled_count;

            validationReportDetails.value.engineers = [];
            validationReportDetails.value.instruments = [];
            validationReportDetails.value.instruments = [...instruments];
            validationReportDetails.value.engineers = [...engineers];
            ClientAddress.value = client_address;
            CustomerAddress.value = customer_address;
            CustomerData.value = customer_data;
            ClientData.value = client_data;

            return;
          }

          if (validationReportDetails.value.rgp_no) {
            const rgpNumber = validationReportDetails.value.rgp_no;

            console.log("rgp_no", rgpNumber);
            // Find the previous rgp
            const prevRGP = await RGPS.value.find(
              (rgp) => rgp.rgp_no === rgpNumber
            );

            // If not found, return early
            if (!prevRGP) {
              return;
            }

            Swal.fire({
              title: "Are you sure?",
              text: "This Action will reset all your Test Reports!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "red",
              confirmButtonText: "Yes, I am sure!",
            }).then((result: { [x: string]: any }) => {
              if (result["isConfirmed"]) {
                // Put your function here
                // validationReportDetails.value.engineers = [];
                // validationReportDetails.value.instruments = [];

                validationReportDetails.value.tests = [
                  {
                    air_velocity_test_reports: [],
                  },
                  {
                    filter_integrity_test_reports: [],
                  },
                  {
                    particle_count_test_reports: [],
                  },
                  {
                    recovery_test_reports: [],
                  },
                ];

                // Find the rgp
                const foundRGP = RGPS.value.find((rgp) => rgp.id === id);

                // If not found, return early
                if (!foundRGP) {
                  return;
                }

                // Destructure and assign rgp details
                const {
                  rgp_no,
                  worksheet_filled_count,
                  instruments,
                  engineers,
                  client_address,
                  customer_address,
                  customer_data,
                  client_data,
                } = foundRGP;
                validationReportDetails.value.rgp_id = id;
                validationReportDetails.value.rgp_no = rgp_no;
                validationReportDetails.value.worksheet_filled_count =
                  worksheet_filled_count;

                validationReportDetails.value.engineers = [];
                validationReportDetails.value.instruments = [];
                validationReportDetails.value.instruments = [...instruments];
                validationReportDetails.value.engineers = [...engineers];
                ClientAddress.value = client_address;
                CustomerAddress.value = customer_address;
                CustomerData.value = customer_data;
                ClientData.value = client_data;
              } else {
                validationReportDetails.value.rgp_id = prevRGP.id;
                validationReportDetails.value.rgp_no = prevRGP.rgp_no;
                validationReportDetails.value.worksheet_filled_count =
                  prevRGP.worksheet_filled_count;
              }
            });
          }
        } catch (error) {
          console.error("An error occurred:", error);
        }
      }
    };

    // fill the details when response is received
    const fillDetails = (response) => {
      if (Array.isArray(response.result)) {
        RGPS.value.push(
          ...response.result.map((result) => {
            return {
              id: result.id,
              rgp_no: result.rgp_no,
              worksheet_filled_count: result.worksheet_filled_count,
              quotation_id: result.quotation_id,
              quotation_no: result.quotation_no,
              instruments: JSON.parse(result.instruments),
              engineers: JSON.parse(result.engineers),
              client_id: result.client_id,
              customer_id: result.customer_id,
              client_address: {
                company_name: result.client_address.company_name,
                address1: result.client_address.address1,
                address2: result.client_address.address2,
                country: result.client_address.country,
                city: result.client_address.city,
                pincode: result.client_address.pincode,
                states: result.client_address.states,
              },
              customer_address: {
                company_name: result.customer_address.company_name,
                address1: result.customer_address.address1,
                address2: result.customer_address.address2,
                country: result.customer_address.country,
                city: result.customer_address.city,
                pincode: result.customer_address.pincode,
                states: result.customer_address.states,
              },
              customer_data: {
                id: result.customer_data.id,
                first_name: result.customer_data.first_name,
                last_name: result.customer_data.last_name,
                company: {
                  company_name : result.customer_data.company.company_name,
                }
              },
              client_data: {
                id: result.client_data.id,
                first_name: result.client_data.first_name,
                last_name: result.client_data.last_name,
                company: {
                  company_name : result.client_data.company.company_name,
                }
              },
              // Add other properties like 'date' and 'duedate' here if needed
            };
          })
        );
      } else {
      }
    };

    const removeObjectWithId = (arr, id) => {
      if (id !== -1) {
        arr.splice(id, 1);
      }

      return arr;
    };

    /* ========= DELETE FUNCTIONS ========*/
    // function that delete air velocity data
    async function deleteAirVelocityTestData(testId, index) {
      //zero represent the testID
      validationReportDetails.value.tests[0].air_velocity_test_reports =
        await removeObjectWithId(
          validationReportDetails.value.tests[0].air_velocity_test_reports,
          index
        );
    }

    // function that delete filter integrity data
    async function deleteFilterIntegrityTestData(testId, index) {
      //zero represent the testID
      validationReportDetails.value.tests[1].filter_integrity_test_reports =
        await removeObjectWithId(
          validationReportDetails.value.tests[1].filter_integrity_test_reports,
          index
        );
    }

    // function that delete particle count data
    async function deleteParticleCountTestData(testId, index) {
      //zero represent the testID
      validationReportDetails.value.tests[2].particle_count_test_reports =
        await removeObjectWithId(
          validationReportDetails.value.tests[2].particle_count_test_reports,
          index
        );
    }

    // function that delete recovery data
    async function deleteRecoveryTestData(testId, index) {
      //zero represent the testID
      validationReportDetails.value.tests[3].recovery_test_reports =
        await removeObjectWithId(
          validationReportDetails.value.tests[3].recovery_test_reports,
          index
        );
    }

    // function that will delete testData
    function deleteReport(testId, index) {
      switch (testId) {
        case 0:
          deleteAirVelocityTestData(testId, index);
          return;
        case 1:
          deleteFilterIntegrityTestData(testId, index);
          return;
        case 2:
          deleteParticleCountTestData(testId, index);
          return;
        case 3:
          deleteRecoveryTestData(testId, index);
          return;
        default:
          // edge case
          console.log("Unknown Test");
          return;
      }
    }

    onMounted(async () => {
      // get all the rgp
      const response = await getAllRGP(User.company_id);

      validationReportDetails.value.engineers = [];
      validationReportDetails.value.instruments = [];
      RGPS.value.pop();

      if (response) {
        await fillDetails(response);
      }

      console.log(validationReportDetails.value);
    });

    const onsubmit = async () => {
      console.log(validationReportDetails.value);
      loading.value = true;
      const isNull = validationReportDetails.value.tests.some(
        (testReport) => Object.values(testReport)[0].length > 0
      );

      if (!isNull) {
        showErrorAlert("Warning", "Please fill at least one test report");
        loading.value = false;
        return;
      }
      try {
        // Call your API here with the form values
        const response = await addValidationReport(
          validationReportDetails.value
        );
        // console.log(response.error);
        if (!response.error) {
          // Handle successful API response
          //   console.log("API response:", response);
          loading.value = false;
          showSuccessAlert(
            "Success",
            "Validation Report has been successfully submitted!"
          );
          // clear();
          route.push({ name: "validationreport-list" });
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
      RGPS,
      validationReportDetails,
      fillDetails,
      SetDetails,
      CustomerData,
      ClientData,
      ConductedTests,
      selectedTests,
      validationReportDetailsValidator,
      loading,
      onsubmit,
      CustomerAddress,
      ClientAddress,
      deleteReport,
      getAdditionalProps,
      getTestComponent,
      handleTestData,
      getTestEditComponent,
      updateReportData,
      ReportStatus,
    };
  },
});
</script>

<style>
.el-input__inner {
  font-weight: 500;
}

.el-input__wrapper {
  height: 3.5rem;
  border-radius: 0.5rem;
  background-color: var(--bs-gray-100);
  border-color: var(--bs-gray-100);
  color: var(--bs-gray-700);
  transition: color 0.2s ease;
  appearance: none;
  line-height: 1.5;
  border: none !important;
  padding-top: 0.825rem;
  padding-bottom: 0.825rem;
  padding-left: 1.5rem;
  font-size: 1.15rem;
  border-radius: 0.625rem;
  box-shadow: none !important;
}
</style>