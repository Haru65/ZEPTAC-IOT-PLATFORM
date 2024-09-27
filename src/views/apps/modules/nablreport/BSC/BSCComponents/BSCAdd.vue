<template>
  <div style="width: 99%" class="bg-body p-12 rounded">
    <div class="modal-dialog modal-dialog-centered">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Form-->
        <VForm
          id="kt_account_profile_details_form"
          class="form"
          novalidate
          :validation-schema="itemDetailsValidator"
        >
          <!--begin::Card body-->
          <div class="card-body border-top p-sd-2 p-lg-9">
            <!--begin::Input group-->

            <!--begin::Input group-->
            <div class="row mb-6">
              <!--begin::Col-->
              <div class="col-md-6 fv-row mb-8 mb-sd-8">
                <!--begin::Label-->
                <label
                  class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Date of Receipt</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-date-picker
                  type="date"
                  name="d_receipt"
                  id="d_receipt"
                  v-model="itemDetails.d_receipt"
                  @change="setDates($event, 'd_receipt')"
                  placeholder="Pick a day"
                  :editable="false"
                />
                <div
                  class="fv-plugins-message-container mt-3"
                  v-if="!itemDetails.d_receipt"
                >
                  <div class="fv-help-block">
                    <ErrorMessage name="d_receipt" />
                  </div>
                </div>
                <!--end::Input-->
              </div>
              <!--end::Col-->
              <!--begin::Col-->
              <div class="col-md-6 fv-row mb-8 mb-sd-8">
                <!--begin::Label-->
                <label
                  class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Date of Testing</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-date-picker
                  type="date"
                  name="d_testing"
                  id="d_testing"
                  v-model="itemDetails.d_testing"
                  @change="setDates($event, 'd_testing')"
                  placeholder="Pick a day"
                  :editable="false"
                />
                <div
                  class="fv-plugins-message-container mt-3"
                  v-if="!itemDetails.d_testing"
                >
                  <div class="fv-help-block">
                    <ErrorMessage name="d_testing" />
                  </div>
                </div>
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
                  >Date of Issue</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-date-picker
                  type="date"
                  name="d_issue"
                  id="d_issue"
                  v-model="itemDetails.d_issue"
                  @change="setDates($event, 'd_issue')"
                  placeholder="Pick a day"
                  :editable="false"
                />
                <div
                  class="fv-plugins-message-container mt-3"
                  v-if="!itemDetails.d_issue"
                >
                  <div class="fv-help-block">
                    <ErrorMessage name="d_issue" />
                  </div>
                </div>
                <!--end::Input-->
              </div>
              <!--end::Col-->
              <!--begin::Col-->
              <div class="col-md-6 fv-row mb-8 mb-sd-8">
                <!--begin::Label-->
                <label
                  class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Recommended Due Date</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-date-picker
                  type="date"
                  name="r_due_date"
                  id="r_due_date"
                  v-model="itemDetails.r_due_date"
                  @change="setDates($event, 'r_due_date')"
                  placeholder="Pick a day"
                  :editable="false"
                />
                <div
                  class="fv-plugins-message-container mt-3"
                  v-if="!itemDetails.r_due_date"
                >
                  <div class="fv-help-block">
                    <ErrorMessage name="r_due_date" />
                  </div>
                </div>
                <!--end::Input-->
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->

            <div class="row mb-6">
              <div class="container-fluid">
                <!--begin::Header-->
                <h4 class="card-title align-items-start flex-column">
                  <span class="fs-4 fw-bold text-gray-700 text-nowrap mb-2"
                    >Environmental Condition</span
                  >
                </h4>
                <!--end::Header-->
                <div class="alert alert-primary font-bold mt-2">
                  <div class="d-flex flex-column">
                    <li class="d-flex align-items-center py-2">
                      <h5>Temperature : {{ itemDetails.temperature }} °C</h5>
                    </li>
                    <li class="d-flex align-items-center py-2">
                      <h5>Humidity : {{ itemDetails.humidity }} %</h5>
                    </li>
                    <li class="d-flex align-items-center py-2">
                      <h5>
                        BSC Differential Pressure (ΔP) :
                        {{ itemDetails.differential_pressure }} mm of wg
                      </h5>
                    </li>
                  </div>
                </div>
              </div>
            </div>

            <!--begin::Accordion-->
            <div class="accordion mt-6 mb-6 py-6" id="kt_accordion_1">
              <div class="accordion-item">
                <h2 class="accordion-header" :id="'kt_accordion_1_header_'">
                  <button
                    class="accordion-button fs-4 fw-semibold"
                    type="button"
                    :data-bs-toggle="'collapse'"
                    :data-bs-target="'#kt_accordion_1_body_'"
                    :aria-controls="'kt_accordion_1_body_'"
                  >
                    Details of Unit Under Testing
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
                      <div class="form-group col-lg-12">
                        <label
                          class="col-lg-4 col-form-label required fw-semobold fw-bold text-gray-700 fs-6 text-nowrap"
                          >Description</label
                        >
                        <Field
                          type="text"
                          name="description"
                          class="form-control form-control-lg form-control-solid"
                          placeholder="Enter description"
                          v-model="itemDetails.description"
                        />
                        <div class="fv-plugins-message-container">
                          <div class="fv-help-block">
                            <ErrorMessage name="description" />
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
                          >Make</label
                        >
                        <Field
                          type="text"
                          name="uuc_make"
                          class="form-control form-control-lg form-control-solid"
                          placeholder="Made by... "
                          v-model="itemDetails.make"
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
                          v-model="itemDetails.model_no"
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
                          >Identification Number</label
                        >
                        <Field
                          type="text"
                          name="id_no"
                          class="form-control form-control-lg form-control-solid"
                          placeholder="Enter Identification number"
                          v-model="itemDetails.id_no"
                        />
                        <div class="fv-plugins-message-container">
                          <div class="fv-help-block">
                            <ErrorMessage name="id_no" />
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
                          v-model="itemDetails.serial_no"
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
                          >Room Name</label
                        >
                        <Field
                          type="text"
                          name="room_name"
                          class="form-control form-control-lg form-control-solid"
                          placeholder="Enter the room name..."
                          v-model="itemDetails.room_name"
                        />
                        <div class="fv-plugins-message-container">
                          <div class="fv-help-block">
                            <ErrorMessage name="room_name" />
                          </div>
                        </div>
                      </div>
                      <div class="form-group col-md-6">
                        <label
                          class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                          >Room ID</label
                        >
                        <Field
                          type="text"
                          name="room_id"
                          class="form-control form-control-lg form-control-solid"
                          placeholder="Enter room id..."
                          v-model="itemDetails.room_id"
                        />
                        <div class="fv-plugins-message-container">
                          <div class="fv-help-block">
                            <ErrorMessage name="room_id" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="row mb-6">
                      <div class="form-group col-lg-12">
                        <label
                          class="col-lg-4 col-form-label required fw-semobold fw-bold text-gray-700 fs-6 text-nowrap"
                          >Testing At</label
                        >
                        <Field
                          type="text"
                          name="testing_at"
                          class="form-control form-control-lg form-control-solid"
                          placeholder="testing at..."
                          v-model="itemDetails.testing_at"
                        />
                        <div class="fv-plugins-message-container">
                          <div class="fv-help-block">
                            <ErrorMessage name="testing_at" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--end::Accordion-->

            <!-- Tabs Navigation -->
            <ul class="nav nav-tabs mb-3 fs-4" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link active"
                  id="inflowVelocity-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#inflowVelocity"
                  type="button"
                  role="tab"
                  aria-controls="inflowVelocity"
                  aria-selected="true"
                >
                  Inflow Velocity
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="downFlowVelocity-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#downFlowVelocity"
                  type="button"
                  role="tab"
                  aria-controls="downFlowVelocity"
                  aria-selected="false"
                >
                  DownFlow Velocity
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="filterLeakage-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#filterLeakage"
                  type="button"
                  role="tab"
                  aria-controls="filterLeakage"
                  aria-selected="false"
                >
                  HEPA Filter Leakage
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="particleConcentration-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#particleConcentration"
                  type="button"
                  role="tab"
                  aria-controls="particleConcentration"
                  aria-selected="false"
                >
                  Particle Concentration
                </button>
              </li>
            </ul>

            <!-- Tabs Content -->
            <div class="tab-content" id="myTabContent">
              <!-- Inflow Velocity Tab -->
              <div
                class="tab-pane fade show active"
                id="inflowVelocity"
                role="tabpanel"
                aria-labelledby="inflowVelocity-tab"
              >
                <!-- Content for Inflow Velocity Tab -->
                <div class="row mb-6">
                  <div class="container-fluid">
                    <div class="alert alert-primary mt-2">
                      <h3>Inflow Air Velocity Measurement in m/sec</h3>
                      <h5 class="mt-6">
                        - Mean should not be more than 0.40 m/s
                      </h5>
                    </div>
                  </div>
                </div>

                <div class="table-responsive py-6 mb-6">
                  <table
                    class="table table-responsive table-bordered g-6 w-100 fw-bold text-gray-700"
                  >
                    <thead
                      class="fw-semibold fs-6 text-gray-700 text-center justify-content-center"
                    >
                      <tr>
                        <th class="col-1">Sr.</th>
                        <th class="col-2">Filter ID</th>
                        <th class="col-2">L 1</th>
                        <th class="col-2">L 2</th>
                        <th class="col-2">L 3</th>
                        <th class="col-2">L 4</th>
                        <th class="col-2">L 5</th>
                        <th class="col-2">Mean</th>
                        <th class="col-3">Complainance As per EN 12469:2000</th>
                        <th class="col-2">Action</th>
                      </tr>
                    </thead>
                    <tbody class="text-center justify-content-center">
                      <tr
                        v-for="(data, index) in itemDetails.inFlow"
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
                            :name="'inflow_filter_id' + index"
                            class="form-control form-control-lg form-control-solid min-w-100px"
                            placeholder="Row"
                            v-model="data.filter_id"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            :name="'l1_inflow' + index"
                            class="form-control form-control-lg form-control-solid min-w-100px"
                            placeholder="0"
                            v-model="data.l1"
                            @keyup="SetInFlowLs($event, index, 'l1')"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            :name="'l2_inflow' + index"
                            class="form-control form-control-lg form-control-solid min-w-100px"
                            placeholder="0"
                            v-model="data.l2"
                            @keyup="SetInFlowLs($event, index, 'l2')"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            :name="'l3_inflow' + index"
                            class="form-control form-control-lg form-control-solid min-w-100px"
                            placeholder="0"
                            v-model="data.l3"
                            @keyup="SetInFlowLs($event, index, 'l3')"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            :name="'l4_inflow' + index"
                            class="form-control form-control-lg form-control-solid min-w-100px"
                            placeholder="0"
                            v-model="data.l4"
                            @keyup="SetInFlowLs($event, index, 'l4')"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            :name="'l5_inflow' + index"
                            class="form-control form-control-lg form-control-solid min-w-100px"
                            placeholder="0"
                            v-model="data.l5"
                            @keyup="SetInFlowLs($event, index, 'l5')"
                          />
                        </td>
                        <td>
                          <div
                            class="form-control form-control-lg form-control-solid min-w-100px"
                          >
                            {{ data.mean ? data.mean : "0" }}
                          </div>
                        </td>
                        <td>
                          <div
                            class="form-control form-control-lg form-control-solid min-w-100px"
                          >
                            {{ data.output ? data.output : "" }}
                          </div>
                        </td>
                        <td>
                          <button
                            class="btn btn-sm btn-light-danger rounded-circle fs-6"
                            type="button"
                            @click="removeInFlowReading(index)"
                          >
                            <span class="text-center">x</span>
                          </button>
                        </td>
                      </tr>
                      <tr
                        class="text-center"
                        v-if="itemDetails.inFlow.length === 0"
                      >
                        <td
                          colspan="8"
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
                            class="btn btn-sm btn-light-primary rounded-circle fs-6"
                            type="button"
                            @click="addInFlowReading"
                          >
                            <span class="text-center">+</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </table>
                </div>
              </div>

              <div
                class="tab-pane fade"
                id="downFlowVelocity"
                role="tabpanel"
                aria-labelledby="downFlowVelocity-tab"
              >
                <div class="row mb-6">
                  <div class="container-fluid">
                    <div class="alert alert-primary mt-2">
                      <h3>DownFlow Air Velocity Measurement in m/sec</h3>
                      <h5 class="mt-6">- Acceptance limit (0.25 - 0.50 m/s)</h5>
                    </div>
                  </div>
                </div>

                <div class="table-responsive py-6 mb-6">
                  <table
                    class="table table-responsive table-bordered g-6 w-100 fw-bold text-gray-700"
                  >
                    <thead
                      class="fw-semibold fs-6 text-gray-700 text-center justify-content-center"
                    >
                      <tr>
                        <th class="col-1">Sr.</th>
                        <th class="col-2">Filter ID</th>
                        <th class="col-2">L 1</th>
                        <th class="col-2">L 2</th>
                        <th class="col-2">L 3</th>
                        <th class="col-2">L 4</th>
                        <th class="col-2">L 5</th>
                        <th class="col-2">Mean</th>
                        <th class="col-3">Complainance As per EN 12469:2000</th>
                        <th class="col-2">Action</th>
                      </tr>
                    </thead>
                    <tbody class="text-center justify-content-center">
                      <tr
                        v-for="(data, index) in itemDetails.downFlow"
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
                            :name="'downflow_filter_id' + index"
                            class="form-control form-control-lg form-control-solid min-w-100px"
                            placeholder="Row"
                            v-model="data.filter_id"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            :name="'l1_downflow' + index"
                            class="form-control form-control-lg form-control-solid min-w-100px"
                            placeholder="0"
                            v-model="data.l1"
                            @keyup="SetDownFlowLs($event, index, 'l1')"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            :name="'l2_downflow' + index"
                            class="form-control form-control-lg form-control-solid min-w-100px"
                            placeholder="0"
                            v-model="data.l2"
                            @keyup="SetDownFlowLs($event, index, 'l2')"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            :name="'l3_downflow' + index"
                            class="form-control form-control-lg form-control-solid min-w-100px"
                            placeholder="0"
                            v-model="data.l3"
                            @keyup="SetDownFlowLs($event, index, 'l3')"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            :name="'l4_downflow' + index"
                            class="form-control form-control-lg form-control-solid min-w-100px"
                            placeholder="0"
                            v-model="data.l4"
                            @keyup="SetDownFlowLs($event, index, 'l4')"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            :name="'l5_downflow' + index"
                            class="form-control form-control-lg form-control-solid min-w-100px"
                            placeholder="0"
                            v-model="data.l5"
                            @keyup="SetDownFlowLs($event, index, 'l5')"
                          />
                        </td>
                        <td>
                          <div
                            class="form-control form-control-lg form-control-solid min-w-100px"
                          >
                            {{ data.mean ? data.mean : "0" }}
                          </div>
                        </td>
                        <td>
                          <div
                            class="form-control form-control-lg form-control-solid min-w-100px"
                          >
                            {{ data.output ? data.output : "" }}
                          </div>
                        </td>
                        <td>
                          <button
                            class="btn btn-sm btn-light-danger rounded-circle fs-6"
                            type="button"
                            @click="removeDownFlowReading(index)"
                          >
                            <span class="text-center">x</span>
                          </button>
                        </td>
                      </tr>
                      <tr
                        class="text-center"
                        v-if="itemDetails.downFlow.length === 0"
                      >
                        <td
                          colspan="8"
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
                            class="btn btn-sm btn-light-primary rounded-circle fs-6"
                            type="button"
                            @click="addDownFlowReading"
                          >
                            <span class="text-center">+</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </table>
                </div>
              </div>

              <div
                class="tab-pane fade"
                id="filterLeakage"
                role="tabpanel"
                aria-labelledby="filterLeakage-tab"
              >
                <div class="row mb-6">
                  <div class="container-fluid">
                    <div class="alert alert-primary mt-2">
                      <h3>HEPA Filter Leakge Measurement in %</h3>
                      <h5 class="mt-6">
                        - Acceptance limit less than &lt; 0.01%
                      </h5>
                    </div>
                  </div>
                </div>
                <div class="table-responsive py-6 mb-6">
                  <table
                    class="table table-responsive table-bordered g-6 w-100 fw-bold text-gray-700"
                  >
                    <thead
                      class="fw-semibold fs-6 text-gray-700 text-center justify-content-center"
                    >
                      <tr>
                        <th class="col-1">Sr.</th>
                        <th class="col-2">Filter ID</th>
                        <th class="col-3">UpStream Concentration %</th>
                        <th class="col-3">DownStream Concentration %</th>
                        <th class="col-3">Complainance As per ISO 14644-3</th>
                        <th class="col-2">Action</th>
                      </tr>
                    </thead>
                    <tbody class="text-center justify-content-center">
                      <tr
                        v-for="(data, index) in itemDetails.filter"
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
                            :name="'filter_filter_id' + index"
                            class="form-control form-control-lg form-control-solid min-w-100px"
                            placeholder="Row"
                            v-model="data.filter_id"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            :name="'filter_upstream' + index"
                            class="form-control form-control-lg form-control-solid min-w-100px"
                            placeholder="0"
                            v-model="data.upstream"
                            @keyup="SetFilterStreams($event, index, 'upstream')"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            :name="'filter_downstream' + index"
                            class="form-control form-control-lg form-control-solid min-w-100px"
                            placeholder="0"
                            v-model="data.downstream"
                            @keyup="
                              SetFilterStreams($event, index, 'downstream')
                            "
                          />
                        </td>
                        <td>
                          <div
                            class="form-control form-control-lg form-control-solid min-w-100px"
                          >
                            {{ data.output ? data.output : "" }}
                          </div>
                        </td>
                        <td>
                          <button
                            class="btn btn-sm btn-light-danger rounded-circle fs-6"
                            type="button"
                            @click="removeFilterReading(index)"
                          >
                            <span class="text-center">x</span>
                          </button>
                        </td>
                      </tr>
                      <tr
                        class="text-center"
                        v-if="itemDetails.filter.length === 0"
                      >
                        <td
                          colspan="5"
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
                            class="btn btn-sm btn-light-primary rounded-circle fs-6"
                            type="button"
                            @click="addFilterReading"
                          >
                            <span class="text-center">+</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </table>
                </div>
              </div>

              <div
                class="tab-pane fade"
                id="particleConcentration"
                role="tabpanel"
                aria-labelledby="particleConcentration-tab"
              >
                <div class="row mb-6">
                  <div class="container-fluid">
                    <div class="alert alert-primary mt-2">
                      <h3>Particle Concentration / Cu.Meter (m³)</h3>
                      <h5 class="mt-6">
                        - Acceptance limit depend on Cu.Meter (m³)
                      </h5>
                    </div>
                  </div>
                </div>
                <div class="table-responsive py-6 mb-6">
                  <table
                    class="table table-responsive table-bordered g-6 w-100 fw-bold text-gray-700"
                  >
                    <thead
                      class="fw-semibold fs-6 text-gray-700 text-center justify-content-center"
                    >
                      <tr>
                        <th class="col-1">Sr.</th>
                        <th class="col-2">Particle Size</th>
                        <th class="col-2">L 1</th>
                        <th class="col-2">L 2</th>
                        <th class="col-2">L 3</th>
                        <th class="col-2">L 4</th>
                        <th class="col-2">L 5</th>
                        <th class="col-2">Mean</th>
                        <th class="col-3">Acceptance Limit</th>
                        <th class="col-3">Complainance As per ISO 14644-3</th>
                        <th class="col-2">Action</th>
                      </tr>
                    </thead>
                    <tbody class="text-center justify-content-center">
                      <tr
                        v-for="(data, index) in itemDetails.particle"
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
                            :name="'particle_particle_size' + index"
                            class="form-control form-control-lg form-control-solid min-w-100px"
                            placeholder="0.0 µ"
                            v-model="data.particle_size"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            :name="'l1_particle' + index"
                            class="form-control form-control-lg form-control-solid min-w-100px"
                            placeholder="0"
                            v-model="data.l1"
                            @keyup="SetParticleLs($event, index, 'l1')"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            :name="'l2_particle' + index"
                            class="form-control form-control-lg form-control-solid min-w-100px"
                            placeholder="0"
                            v-model="data.l2"
                            @keyup="SetParticleLs($event, index, 'l2')"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            :name="'l3_particle' + index"
                            class="form-control form-control-lg form-control-solid min-w-100px"
                            placeholder="0"
                            v-model="data.l3"
                            @keyup="SetParticleLs($event, index, 'l3')"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            :name="'l4_particle' + index"
                            class="form-control form-control-lg form-control-solid min-w-100px"
                            placeholder="0"
                            v-model="data.l4"
                            @keyup="SetParticleLs($event, index, 'l4')"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            :name="'l5_particle' + index"
                            class="form-control form-control-lg form-control-solid min-w-100px"
                            placeholder="0"
                            v-model="data.l5"
                            @keyup="SetParticleLs($event, index, 'l5')"
                          />
                        </td>
                        <td>
                          <div
                            class="form-control form-control-lg form-control-solid min-w-100px"
                          >
                            {{ data.mean ? data.mean : "0" }}
                          </div>
                        </td>
                        <td>
                          <input
                            type="text"
                            :name="'particle_acceptance_limit' + index"
                            class="form-control form-control-lg form-control-solid min-w-100px"
                            placeholder="0 m³"
                            v-model="data.acceptance_limit"
                            @keyup="
                              SetParticleLs($event, index, 'acceptance_limit')
                            "
                          />
                        </td>
                        <td>
                          <div
                            class="form-control form-control-lg form-control-solid min-w-100px"
                          >
                            {{ data.output ? data.output : "" }}
                          </div>
                        </td>
                        <td>
                          <button
                            class="btn btn-sm btn-light-danger rounded-circle fs-6"
                            type="button"
                            @click="removeParticleReading(index)"
                          >
                            <span class="text-center">x</span>
                          </button>
                        </td>
                      </tr>
                      <tr
                        class="text-center"
                        v-if="itemDetails.particle.length === 0"
                      >
                        <td
                          colspan="8"
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
                            class="btn btn-sm btn-light-primary rounded-circle fs-6"
                            type="button"
                            @click="addParticleReading"
                          >
                            <span class="text-center">+</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer flex-center w-100">
            <!--begin::Button-->
            <button
              type="button"
              @click="clear"
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
import { defineComponent, onMounted, ref } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { getBioSafetyCabinet, addBSCReport } from "@/stores/api";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import packages from "@/core/config/PackagesConfig";
import { limit, Identifier } from "@/core/config/WhichUserConfig";
import { useAuthStore } from "@/stores/auth";
import { useRouter, useRoute } from "vue-router";
import ApiService from "@/core/services/ApiService";
import moment from "moment";

export default defineComponent({
  name: "bsc-report-add",
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

    const itemDetailsValidator = Yup.object().shape({
      d_receipt: Yup.string().required().label("Date of Receipt"),
      d_testing: Yup.string().required().label("Date of Testing"),
      d_issue: Yup.string().required().label("Issue Date"),
      r_due_date: Yup.string().required().label("Recommended Date"),

      description: Yup.string().required().label("Description"),
      make: Yup.string().required().label("Make"),
      model_no: Yup.string().required().label("Model Number"),
      serial_no: Yup.string().required().label("Serial Number"),
      id_no: Yup.string().required().label("Identification Number"),
      testing_at: Yup.string().required().label("Testing at"),
      room_name: Yup.string().required().label("Room Name"),
      room_id: Yup.string().required().label("Room Id"),

      temperature: Yup.string().required().label("Temperature"),
      humidity: Yup.string().required().label("Humidity"),
      differential_pressure: Yup.string()
        .required()
        .label("Differential Pressure"),
    });

    const itemDetails = ref({
      bsc_id: "",
      certificate_number: "NB-001",
      ulr_number: "TC-0001",
      d_receipt: "",
      d_testing: "",
      d_issue: "",
      r_due_date: "",
      description: "",
      make: "",
      model_no: "",
      serial_no: "",
      id_no: "",
      testing_at: "",
      room_name: "",
      room_id: "",
      temperature: 20.3,
      humidity: 53.0,
      differential_pressure: 10,

      inFlow: [
        {
          filter_id: "Row 1",
          l1: "",
          l2: "",
          l3: "",
          l4: "",
          l5: "",
          mean: 0,
          acceptance_limit: "0.40",
          output: "",
        },
      ],
      downFlow: [
        {
          filter_id: "Row 1",
          l1: "",
          l2: "",
          l3: "",
          l4: "",
          l5: "",
          mean: 0,
          acceptance_limit: "0.25-0.50",
          output: "",
        },
      ],
      filter: [
        {
          filter_id: "SH",
          upstream: "100",
          downstream: "",
          acceptance_limit: "0.01",
          output: "",
        },
      ],
      particle: [
        {
          particle_size: "0.3",
          l1: "",
          l2: "",
          l3: "",
          l4: "",
          l5: "",
          mean: 0,
          acceptance_limit: "10200",
          output: "",
        },
        {
          particle_size: "0.5",
          l1: "",
          l2: "",
          l3: "",
          l4: "",
          l5: "",
          mean: 0,
          acceptance_limit: "3520",
          output: "",
        },
        {
          particle_size: "5.0",
          l1: "",
          l2: "",
          l3: "",
          l4: "",
          l5: "",
          mean: 0,
          acceptance_limit: "0",
          output: "",
        },
      ],

      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
      is_active: "1",
    });

    onMounted(async () => {

      try {
        let response = await getBioSafetyCabinet(itemId.toString());

        if (response.success) {
          itemDetails.value.bsc_id = response.result.id;
        } else {
          console.error(
            `Error Occured in getBioSafetyCabinet : ${
              response.message || "Error Occured in API"
            }`
          );
        }
      } catch (err) {
        console.error(`Error Occured in getBioSafetyCabinet : ${err}`);
      }
    });

    // Function to calculate the mean
    function calculateMean(data) {
      const { l1, l2, l3, l4, l5 } = data;
      const L1 = Number(l1);
      const L2 = Number(l2);
      const L3 = Number(l3);
      const L4 = Number(l4);
      const L5 = Number(l5);

      const average = (L1 + L2 + L3 + L4 + L5) / 5;
      return Number(average.toFixed(2));
    }

    /* InFlow Air Velocity  LOGIC*/

    // GLOBAL ACCEPTANCE VARIABLE FOR INFLOW
    const INFLOW_ACCEPTANCE = 0.4;
    // Set Readings data
    async function SetInFlowLs(e, index, l) {
      itemDetails.value.inFlow[index][l] = await e.target.value;
      const average = calculateMean(itemDetails.value.inFlow[index]);
      itemDetails.value.inFlow[index].mean = average;

      // Logic To PASS/FAIL
      if (itemDetails.value.inFlow[index].mean < INFLOW_ACCEPTANCE) {
        itemDetails.value.inFlow[index].output = "PASS";
      } else if (itemDetails.value.inFlow[index].mean >= INFLOW_ACCEPTANCE) {
        itemDetails.value.inFlow[index].output = "FAIL";
      } else {
        itemDetails.value.inFlow[index].output = "";
      }
    }

    // add Inflow
    const addInFlowReading = () => {
      itemDetails.value.inFlow.push({
        filter_id: "Row 1",
        l1: "",
        l2: "",
        l3: "",
        l4: "",
        l5: "",
        mean: 0,
        acceptance_limit: "0.40",
        output: "",
      });
    };

    // remove Inflow
    const removeInFlowReading = async (index) => {
      if (index != null) {
        itemDetails.value.inFlow.splice(index, 1);
      }
    };

    /* DownFlow Air Velocity LOGIC */
    // GLOBAL ACCEPTANCE VARIABLE FOR DOWNFLOW
    const DOWNFLOW_ACCEPTANCE_RANGE1 = 0.25;
    const DOWNFLOW_ACCEPTANCE_RANGE2 = 0.5;
    // Set Readings data
    async function SetDownFlowLs(e, index, l) {
      itemDetails.value.downFlow[index][l] = await e.target.value;
      const average = calculateMean(itemDetails.value.downFlow[index]);
      itemDetails.value.downFlow[index].mean = average;

      // Logic To PASS/FAIL
      if (
        itemDetails.value.downFlow[index].mean >= DOWNFLOW_ACCEPTANCE_RANGE1 &&
        itemDetails.value.downFlow[index].mean <= DOWNFLOW_ACCEPTANCE_RANGE2
      ) {
        itemDetails.value.downFlow[index].output = "PASS";
      } else if (
        itemDetails.value.downFlow[index].mean < DOWNFLOW_ACCEPTANCE_RANGE1 ||
        itemDetails.value.downFlow[index].mean > DOWNFLOW_ACCEPTANCE_RANGE2
      ) {
        itemDetails.value.downFlow[index].output = "FAIL";
      } else {
        itemDetails.value.downFlow[index].output = "";
      }
    }

    // add DownFlow
    const addDownFlowReading = () => {
      itemDetails.value.downFlow.push({
        filter_id: "Row 1",
        l1: "",
        l2: "",
        l3: "",
        l4: "",
        l5: "",
        mean: 0,
        acceptance_limit: "0.25-0.50",
        output: "",
      });
    };

    // remove DownFlow
    const removeDownFlowReading = async (index) => {
      if (index != null) {
        itemDetails.value.downFlow.splice(index, 1);
      }
    };

    /* Filter Leakage LOGIC */
    // GLOBAL ACCEPTANCE VARIABLE FOR DOWNFLOW
    const FILTER_ACCEPTANCE = 0.01;
    async function SetFilterStreams(e, index, stream) {
      itemDetails.value.filter[index][stream] = await e.target.value;

      const downStream = Number(itemDetails.value.filter[index].downstream);
      // Logic To PASS/FAIL
      if (downStream < FILTER_ACCEPTANCE) {
        itemDetails.value.filter[index].output = "PASS";
      } else if (downStream >= FILTER_ACCEPTANCE) {
        itemDetails.value.filter[index].output = "FAIL";
      } else {
        itemDetails.value.filter[index].output = "";
      }
    }

    // add DownFlow
    const addFilterReading = () => {
      itemDetails.value.filter.push({
        filter_id: "SH",
        upstream: "100",
        downstream: "",
        acceptance_limit: "0.01",
        output: "",
      });
    };

    // remove DownFlow
    const removeFilterReading = async (index) => {
      if (index != null) {
        itemDetails.value.filter.splice(index, 1);
      }
    };

    /* Particle Concentration LOGIC */
    async function SetParticleLs(e, index, l) {
      itemDetails.value.particle[index][l] = await e.target.value;
      const average = calculateMean(itemDetails.value.particle[index]);
      itemDetails.value.particle[index].mean = average;

      // Logic To PASS/FAIL

      const PARTICLE_ACCEPTANCE = Number(
        itemDetails.value.particle[index].acceptance_limit
      );
      const MEAN = Number(itemDetails.value.particle[index].mean);

      if (MEAN <= PARTICLE_ACCEPTANCE) {
        itemDetails.value.particle[index].output = "PASS";
      } else if (MEAN > PARTICLE_ACCEPTANCE) {
        itemDetails.value.particle[index].output = "FAIL";
      } else {
        itemDetails.value.particle[index].output = "";
      }
    }

    // add DownFlow
    const addParticleReading = () => {
      itemDetails.value.particle.push({
        particle_size: "0.3",
        l1: "",
        l2: "",
        l3: "",
        l4: "",
        l5: "",
        mean: 0,
        acceptance_limit: "3500",
        output: "",
      });
    };

    // remove DownFlow
    const removeParticleReading = async (index) => {
      if (index != null) {
        itemDetails.value.particle.splice(index, 1);
      }
    };

    /* --------SET DATE LOGIC--------*/
    async function setDates(e, dateType) {
      try {
        if (e != null) {
          if (e != "" && e != null) {
            itemDetails.value[dateType] = moment(e).format("YYYY-MM-DD");
          } else {
            itemDetails.value[dateType] = "";
          }
        } else {
          itemDetails.value[dateType] = "";
        }
      } catch (err) {
        itemDetails.value[dateType] = "";
      }
      console.log(itemDetails.value[dateType]);
    }

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
          // Trim the string before validation
          value = value.trim();
          if (value === "") {
            return false;
          }
        }
      }
      return true;
    };

    const submit = async () => {
      loading.value = true;

      console.log(itemDetails.value);
      try {
        if (validateForm(itemDetails.value)) {
          const response = await addBSCReport(itemDetails.value);
          if (response.success) {
            showSuccessAlert(
              "Success",
              response.message || "BSC Report has been successfully added!"
            );
            loading.value = false;
            router.push({ name: "bsc-list" });
          } else {
            // Handle API error response
            loading.value = false;
            showErrorAlert("Error", response.message || "An error occurred.");
            return;
          }
        } else {
          console.log(validateForm(itemDetails));
          showErrorAlert("Warning", "Please fill in all fields.");
          return;
        }
      } catch (error) {
        // Handle any other errors during API call
        // console.error("API call error:", error);
        showErrorAlert("Error", "An error occurred during the API call.");
      } finally {
        loading.value = false;
      }
    };

    const clear = () => {};
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
      itemDetailsValidator,
      getAssetPath,
      submit,
      loading,
      packages,
      limit,
      setDates,
      clear,
      addInFlowReading,
      removeInFlowReading,
      SetInFlowLs,

      addDownFlowReading,
      removeDownFlowReading,
      SetDownFlowLs,

      addFilterReading,
      removeFilterReading,
      SetFilterStreams,

      addParticleReading,
      removeParticleReading,
      SetParticleLs,
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

.trainer-container {
  display: flex;
  align-items: center;
  margin-right: 10px; /* Adjust as needed */
  background-color: #000; /* Optional background color for each trainer container */
  padding: 5px 10px; /* Optional padding */
  border-radius: 5px; /* Optional border radius */
}
.tagify-remove {
  margin-left: 5px; /* Optional margin between the name and the 'X' button */
}
.override-styles {
  z-index: 99999 !important;
  pointer-events: initial;
}

.tab-item {
  cursor: pointer;
}

.tab-item:hover {
  background-color: blue;
  color: #fff;
  cursor: pointer;
}

.active-tab {
  background-color: blue;
  color: #fff;
}
</style>