<template>
  <div style="width: 99%" class="bg-body p-12 rounded">
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Form-->
        <VForm id="kt_account_profile_details_form" class="form" novalidate>
          <!--begin::Card body-->
          <div class="card-body p-sd-2 p-lg-9">
            <!--begin::Input group-->

            <!-- extra fields -->
            <div class="row mb-6">
              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fw-semobold fw-bold text-gray-700 fs-6 text-nowrap"
                  >Instument Name</label
                >
                <div class="form-control form-control-lg form-control-solid">
                  {{ itemDetails.instrument.name }}
                </div>
              </div>

              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                  >Make</label
                >
                <div class="form-control form-control-lg form-control-solid">
                  {{ itemDetails.instrument.make }}
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
                <div class="form-control form-control-lg form-control-solid">
                  {{ itemDetails.instrument.model_no }}
                </div>
              </div>
              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                  >Serial No.</label
                >
                <div class="form-control form-control-lg form-control-solid">
                  {{ itemDetails.instrument.serial_no }}
                </div>
              </div>
            </div>

            <!--begin::Input group-->
            <div class="row mb-6">
              <!--begin::Col-->
              <div class="col-md-6 fv-row mb-8 mb-sd-8">
                <!--begin::Label-->
                <label
                  class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Check Date</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-date-picker
                  type="date"
                  name="check_date"
                  id="check_date"
                  v-model="itemDetails.check_date"
                  @change="setDates($event, 'check_date')"
                  placeholder="Pick a day"
                  :editable="false"
                />
                <div
                  class="fv-plugins-message-container mt-3"
                  v-if="!itemDetails.check_date"
                >
                  <div class="fv-help-block">
                    <ErrorMessage name="check_date" />
                  </div>
                </div>
                <!--end::Input-->
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->

            <!--begin::Accordion-->
            <div class="accordion mt-6" id="kt_accordion_1">
              <div class="accordion-item">
                <h2 class="accordion-header" :id="'kt_accordion_1_header_'">
                  <button
                    class="accordion-button fs-4 fw-semibold"
                    type="button"
                    :data-bs-toggle="'collapse'"
                    :data-bs-target="'#kt_accordion_1_body_'"
                    :aria-controls="'kt_accordion_1_body_'"
                  >
                    UUC Details
                  </button>
                </h2>
                <div
                  :id="'kt_accordion_1_body_'"
                  class="accordion-collapse collapse"
                  :aria-labelledby="'kt_accordion_1_header_'"
                  data-bs-parent="#kt_accordion_1"
                >
                  <div class="accordion-body">
                    <!-- extra fields -->
                    <div class="row mb-6">
                      <div class="form-group col-md-6">
                        <label
                          class="col-lg-4 col-form-label required fw-semobold fw-bold text-gray-700 fs-6 text-nowrap"
                          >Make</label
                        >
                        <Field
                          type="text"
                          name="uuc_make"
                          class="form-control form-control-lg form-control-solid"
                          placeholder="Made by... "
                          v-model="itemDetails.uuc_details.make"
                        />
                        <div class="fv-plugins-message-container">
                          <div class="fv-help-block">
                            <ErrorMessage name="uuc_make" />
                          </div>
                        </div>
                      </div>

                      <div class="form-group col-md-6">
                        <label
                          class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                          >Model No.</label
                        >
                        <Field
                          type="text"
                          name="uuc_model_no"
                          class="form-control form-control-lg form-control-solid"
                          placeholder="Enter model number."
                          v-model="itemDetails.uuc_details.model_no"
                        />
                        <div class="fv-plugins-message-container">
                          <div class="fv-help-block">
                            <ErrorMessage name="uuc_model_no" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <!--end::Input group-->

                    <div class="row mb-6">
                      <div class="form-group col-md-6">
                        <label
                          class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                          >Instrument Id</label
                        >
                        <Field
                          type="text"
                          name="uuc_instrument_id"
                          class="form-control form-control-lg form-control-solid"
                          placeholder="Enter Instrument ID."
                          v-model="itemDetails.uuc_details.instrument_id"
                        />
                        <div class="fv-plugins-message-container">
                          <div class="fv-help-block">
                            <ErrorMessage name="uuc_instrument_id" />
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
                          name="uuc_serial_no"
                          class="form-control form-control-lg form-control-solid"
                          placeholder="Enter serial number"
                          v-model="itemDetails.uuc_details.serial_no"
                        />
                        <div class="fv-plugins-message-container">
                          <div class="fv-help-block">
                            <ErrorMessage name="uuc_serial_no" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="row mb-6">
                      <div class="form-group col-md-6">
                        <label
                          class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                          >Range</label
                        >
                        <Field
                          type="text"
                          name="uuc_ranges"
                          class="form-control form-control-lg form-control-solid"
                          placeholder="Enter the range..."
                          v-model="itemDetails.uuc_details.ranges"
                        />
                        <div class="fv-plugins-message-container">
                          <div class="fv-help-block">
                            <ErrorMessage name="uuc_ranges" />
                          </div>
                        </div>
                      </div>
                      <div class="form-group col-md-6">
                        <label
                          class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                          >Least Count</label
                        >
                        <Field
                          type="text"
                          name="uuc_least_count"
                          class="form-control form-control-lg form-control-solid"
                          placeholder="Enter least count..."
                          v-model="itemDetails.uuc_details.least_count"
                        />
                        <div class="fv-plugins-message-container">
                          <div class="fv-help-block">
                            <ErrorMessage name="uuc_least_count" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--end::Accordion-->

            <!--begin::Accordion-->
            <div class="accordion mt-6" id="kt_accordion_2">
              <div class="accordion-item">
                <h2 class="accordion-header" :id="'kt_accordion_2_header_'">
                  <button
                    class="accordion-button fs-4 fw-semibold"
                    type="button"
                    :data-bs-toggle="'collapse'"
                    :data-bs-target="'#kt_accordion_2_body_'"
                    :aria-controls="'kt_accordion_2_body_'"
                  >
                    Master Equipment 1
                  </button>
                </h2>
                <div
                  :id="'kt_accordion_2_body_'"
                  class="accordion-collapse collapse"
                  :aria-labelledby="'kt_accordion_2_header_'"
                  data-bs-parent="#kt_accordion_2"
                >
                  <div class="accordion-body">
                    <!-- extra fields -->
                    <div class="row mb-6">
                      <div class="form-group col-md-6">
                        <label
                          class="col-lg-4 col-form-label required fw-semobold fw-bold text-gray-700 fs-6 text-nowrap"
                          >Make</label
                        >
                        <Field
                          type="text"
                          name="master_equipment_1_make"
                          class="form-control form-control-lg form-control-solid"
                          placeholder="Made by... "
                          v-model="itemDetails.master_equipment_1.make"
                        />
                        <div class="fv-plugins-message-container">
                          <div class="fv-help-block">
                            <ErrorMessage name="master_equipment_1_make" />
                          </div>
                        </div>
                      </div>

                      <div class="form-group col-md-6">
                        <label
                          class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                          >Model No.</label
                        >
                        <Field
                          type="text"
                          name="master_equipment_1_model_no"
                          class="form-control form-control-lg form-control-solid"
                          placeholder="Enter model number."
                          v-model="itemDetails.master_equipment_1.model_no"
                        />
                        <div class="fv-plugins-message-container">
                          <div class="fv-help-block">
                            <ErrorMessage name="master_equipment_1_model_no" />
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
                          >Instrument Id</label
                        >
                        <Field
                          type="text"
                          name="master_equipment_1_instrument_id"
                          class="form-control form-control-lg form-control-solid"
                          placeholder="Enter Instrument ID."
                          v-model="itemDetails.master_equipment_1.instrument_id"
                        />
                        <div class="fv-plugins-message-container">
                          <div class="fv-help-block">
                            <ErrorMessage
                              name="master_equipment_1_instrument_id"
                            />
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
                          placeholder="Enter serial number"
                          v-model="itemDetails.master_equipment_1.serial_no"
                        />
                        <div class="fv-plugins-message-container">
                          <div class="fv-help-block">
                            <ErrorMessage name="serial_no" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="row mb-6">
                      <div class="form-group col-md-6">
                        <label
                          class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                          >Range</label
                        >
                        <Field
                          type="text"
                          name="master_equipment_1_ranges"
                          class="form-control form-control-lg form-control-solid"
                          placeholder="Enter the range..."
                          v-model="itemDetails.master_equipment_1.ranges"
                        />
                        <div class="fv-plugins-message-container">
                          <div class="fv-help-block">
                            <ErrorMessage name="master_equipment_1_ranges" />
                          </div>
                        </div>
                      </div>
                      <div class="form-group col-md-6">
                        <label
                          class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                          >Least Count</label
                        >
                        <Field
                          type="text"
                          name="lmaster_equipment_1_east_count"
                          class="form-control form-control-lg form-control-solid"
                          placeholder="Enter least count..."
                          v-model="itemDetails.master_equipment_1.least_count"
                        />
                        <div class="fv-plugins-message-container">
                          <div class="fv-help-block">
                            <ErrorMessage
                              name="master_equipment_1_least_count"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--end::Accordion-->

            <!--begin::Accordion-->
            <div class="accordion mt-6" id="kt_accordion_3">
              <div class="accordion-item">
                <h2 class="accordion-header" :id="'kt_accordion_3_header_'">
                  <button
                    class="accordion-button fs-4 fw-semibold"
                    type="button"
                    :data-bs-toggle="'collapse'"
                    :data-bs-target="'#kt_accordion_3_body_'"
                    :aria-controls="'kt_accordion_3_body_'"
                  >
                    Master Equipment 2
                  </button>
                </h2>
                <div
                  :id="'kt_accordion_3_body_'"
                  class="accordion-collapse collapse"
                  :aria-labelledby="'kt_accordion_3_header_'"
                  data-bs-parent="#kt_accordion_3"
                >
                  <div class="accordion-body">
                    <!-- extra fields -->
                    <div class="row mb-6">
                      <div class="form-group col-md-6">
                        <label
                          class="col-lg-4 col-form-label required fw-semobold fw-bold text-gray-700 fs-6 text-nowrap"
                          >Make</label
                        >
                        <Field
                          type="text"
                          name="master_equipment_2_make"
                          class="form-control form-control-lg form-control-solid"
                          placeholder="Made by... "
                          v-model="itemDetails.master_equipment_2.make"
                        />
                        <div class="fv-plugins-message-container">
                          <div class="fv-help-block">
                            <ErrorMessage name="master_equipment_2_make" />
                          </div>
                        </div>
                      </div>

                      <div class="form-group col-md-6">
                        <label
                          class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                          >Model No.</label
                        >
                        <Field
                          type="text"
                          name="master_equipment_2_model_no"
                          class="form-control form-control-lg form-control-solid"
                          placeholder="Enter model number."
                          v-model="itemDetails.master_equipment_2.model_no"
                        />
                        <div class="fv-plugins-message-container">
                          <div class="fv-help-block">
                            <ErrorMessage name="master_equipment_2_model_no" />
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
                          >Instrument Id</label
                        >
                        <Field
                          type="text"
                          name="master_equipment_2_instrument_id"
                          class="form-control form-control-lg form-control-solid"
                          placeholder="Enter Instrument ID."
                          v-model="itemDetails.master_equipment_2.instrument_id"
                        />
                        <div class="fv-plugins-message-container">
                          <div class="fv-help-block">
                            <ErrorMessage
                              name="master_equipment_2_instrument_id"
                            />
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
                          name="master_equipment_2_serial_no"
                          class="form-control form-control-lg form-control-solid"
                          placeholder="Enter serial number"
                          v-model="itemDetails.master_equipment_2.serial_no"
                        />
                        <div class="fv-plugins-message-container">
                          <div class="fv-help-block">
                            <ErrorMessage name="master_equipment_2_serial_no" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="row mb-6">
                      <div class="form-group col-md-6">
                        <label
                          class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                          >Range</label
                        >
                        <Field
                          type="text"
                          name="master_equipment_2_ranges"
                          class="form-control form-control-lg form-control-solid"
                          placeholder="Enter the range..."
                          v-model="itemDetails.master_equipment_2.ranges"
                        />
                        <div class="fv-plugins-message-container">
                          <div class="fv-help-block">
                            <ErrorMessage name="master_equipment_2_ranges" />
                          </div>
                        </div>
                      </div>
                      <div class="form-group col-md-6">
                        <label
                          class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                          >Least Count</label
                        >
                        <Field
                          type="text"
                          name="master_equipment_2_least_count"
                          class="form-control form-control-lg form-control-solid"
                          placeholder="Enter least count..."
                          v-model="itemDetails.master_equipment_2.least_count"
                        />
                        <div class="fv-plugins-message-container">
                          <div class="fv-help-block">
                            <ErrorMessage
                              name="master_equipment_2_least_count"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--end::Accordion-->

            <!-- extra fields -->
            <div class="row mb-6">
              <div class="form-group col-lg-12 col-md-12">
                <label
                  class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Review Commands</label
                >
                <Field
                  type="text"
                  as="textarea"
                  name="review_commands"
                  rows="5"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter the description of the training..."
                  v-model="itemDetails.review_commands"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="review_commands" />
                  </div>
                </div>
              </div>
            </div>

            <!--begin::Accordion-->
            <div class="accordion mt-6" id="kt_accordion_4">
              <div class="accordion-item">
                <h2 class="accordion-header" :id="'kt_accordion_4_header_'">
                  <button
                    class="accordion-button fs-4 fw-semibold"
                    type="button"
                    :data-bs-toggle="'collapse'"
                    :data-bs-target="'#kt_accordion_4_body_'"
                    :aria-controls="'kt_accordion_4_body_'"
                  >
                    Readings
                  </button>
                </h2>
                <div
                  :id="'kt_accordion_4_body_'"
                  class="accordion-collapse collapse"
                  :aria-labelledby="'kt_accordion_4_header_'"
                  data-bs-parent="#kt_accordion_4"
                >
                  <div class="accordion-body">
                    <div class="table-responsive">
                      <table
                        class="table table-rounded table-border border gy-7 gs-7 text-nowrap"
                      >
                        <thead>
                          <tr
                            class="fw-semibold fs-6 text-gray-800 border-bottom border-gray-200 text-align-left"
                          >
                            <th class="col-1">Sr.No</th>
                            <th class="col-3">Parameter</th>
                            <th class="col-3">Readding of Master 1</th>
                            <th class="col-3">Readding of Master 2</th>
                            <th class="col-3">Deviation of Master's</th>
                            <th class="col-3">Acceptance Criteria</th>
                            <th class="col-2">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(
                              reading, index
                            ) in itemDetails.intermediate_check_readings"
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
                                name="parameter"
                                class="form-control form-control-lg form-control-solid"
                                placeholder="parameter"
                                v-model="reading.parameter"
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                name="reading_master_1"
                                class="form-control form-control-lg form-control-solid"
                                placeholder="reading"
                                v-model="reading.reading_master_1"
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                name="reading_master_1"
                                class="form-control form-control-lg form-control-solid"
                                placeholder="reading"
                                v-model="reading.reading_master_2"
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                name="reading_master_1"
                                class="form-control form-control-lg form-control-solid"
                                placeholder="deviation"
                                v-model="reading.deviation"
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                name="acceptance_criteria"
                                class="form-control form-control-lg form-control-solid"
                                placeholder="criteria"
                                v-model="reading.acceptance_criteria"
                              />
                            </td>
                            <td>
                              <button
                                type="button"
                                class="btn btn-sm btn-danger"
                                @click="removeReading(index)"
                              >
                                X
                              </button>
                            </td>
                          </tr>
                          <tr
                            class="text-center"
                            v-if="
                              itemDetails.intermediate_check_readings.length ===
                              0
                            "
                          >
                            <td
                              colspan="7"
                              class="fw-semibold fs-6 text-gray-800 border-bottom border-gray-200 text-align-center"
                            >
                              No Readings.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div class="text-start mt-8">
                      <div class="input-group p-2 flex gap-6">
                        <div class="input-group-append">
                          <button
                            class="btn btn-md btn-primary"
                            type="button"
                            @click="addReading"
                          >
                            + Add Reading
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--end::Accordion-->

            <!--end::Input group-->
          </div>

          <div class="modal-footer flex-center w-100">
            <!--begin::Button-->
            <button type="button" class="btn btn-lg btn-danger w-sd-25 w-lg-25">
              Discard
            </button>
            <!--end::Button-->
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <!--begin::Button-->
            <span
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-lg btn-primary w-sd-25 w-lg-25"
              @click.prevent="submit()"
            >
              <span v-if="!loading" class="indicator-label"> Submit </span>
              <span v-if="loading" class="indicator-progress">
                Please wait...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </span>
            <!--end::Button-->
          </div>
          <!--end::Input group-->
        </VForm>
        <!--end::Form-->
      </div>
    </div>
  </div>
</template>
      
      <script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref, reactive } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import {
  addIntermediateCheckRecord,
  getCalibrationInstrumentForIntermediate,
} from "@/stores/api";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import packages from "@/core/config/PackagesConfig";
import { limit, Identifier } from "@/core/config/WhichUserConfig";
import { useAuthStore } from "@/stores/auth";
import { useRoute, useRouter } from "vue-router";
import ApiService from "@/core/services/ApiService";
import moment from "moment";

export default defineComponent({
  name: "intermediate-check-records-add",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  setup() {
    const identifier = Identifier;
    const loading = ref(false);
    const auth = useAuthStore();
    const router = useRouter();
    const route = useRoute();
    const User = auth.GetUser();
    let limit = ref(500);

    const itemId = route.params.id;

    const itemDetails = reactive({
      instrument_id: "",
      check_date: "",
      instrument: reactive({
        name: "",
        make: "",
        model_no: "",
        serial_no: "",
      }),
      uuc_details: reactive({
        instrument_id: "",
        make: "",
        model_no: "",
        serial_no: "",
        ranges: "",
        least_count: "",
      }),
      master_equipment_1: reactive({
        instrument_id: "",
        make: "",
        model_no: "",
        serial_no: "",
        ranges: "",
        least_count: "",
      }),
      master_equipment_2: reactive({
        instrument_id: "",
        make: "",
        model_no: "",
        serial_no: "",
        ranges: "",
        least_count: "",
      }),
      intermediate_check_readings: reactive([
        {
          parameter: "",
          reading_master_1: "",
          reading_master_2: "",
          deviation: "",
          acceptance_criteria: "",
        },
      ]),
      review_commands: "",
      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
      is_active: "1",
    });

    onMounted(async () => {
      try {
        let response = await getCalibrationInstrumentForIntermediate(
          itemId.toString()
        );
        console.log(response);
        itemDetails.instrument_id = response.result.id;
        itemDetails.instrument.name = response.result.name;
        itemDetails.instrument.make = response.result.make;
        itemDetails.instrument.model_no = response.result.model_no;
        itemDetails.instrument.serial_no = response.result.serial_no;
      } catch (error) {
        showErrorAlert("Error", "An error occurred during the API call.");
        loading.value = false;
      }
    });

    /* --------SET DATE LOGIC--------*/
    async function setDates(e, dateType) {
      try {
        if (e != null) {
          if (e != "" && e != null) {
            itemDetails[dateType] = moment(e).format("YYYY-MM-DD");
          } else {
            itemDetails[dateType] = "";
          }
        } else {
          itemDetails[dateType] = "";
        }
      } catch (err) {
        itemDetails[dateType] = "";
      }
    }

    const addReading = () => {
      itemDetails.intermediate_check_readings.push({
        parameter: "",
        reading_master_1: "",
        reading_master_2: "",
        deviation: "",
        acceptance_criteria: "",
      });
    };

    const removeReading = (index) => {
      itemDetails.intermediate_check_readings.splice(index, 1);
    };

    const validateForm = (formData) => {
      for (const key in formData) {
        const value = formData[key];
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
        } else if (value === "") {
          return false;
        }
      }
      return true;
    };

    const submit = async () => {
      loading.value = true;

      if (itemDetails.intermediate_check_readings.length === 0) {
        showErrorAlert("Warning", "Please Fill Atleast One Reading");
        loading.value = false;
        return;
      }

      try {
        if (itemDetails.instrument_id != "") {
          if (validateForm(itemDetails)) {
            const response = await addIntermediateCheckRecord(itemDetails);
            if (!response.error) {
              showSuccessAlert(
                "Success",
                "Check Record has been successfully inserted!"
              );
              loading.value = false;
              router.push({ name: "intermediate-check-records-list" });
            } else {
              showErrorAlert(
                "Warning",
                "Please Fill the Form Fields Correctly"
              );
              loading.value = false;
              return;
            }
          } else {
            showErrorAlert("Warning", "Please fill in all fields.");
          }
        } else {
          showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
          loading.value = false;
          return;
        }
      } catch (error) {
        showErrorAlert("Error", "An error occurred during the API call.");
        loading.value = false;
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
      itemDetails,
      getAssetPath,
      submit,
      loading,
      packages,
      limit,
      addReading,
      removeReading,
      setDates,
    };
  },
});
</script>
    
<style>
.el-input__inner,
.el-select__inner {
  font-weight: 500;
}
.el-input__wrapper,
.el-select__wrapper {
  min-height: 3.5rem;
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