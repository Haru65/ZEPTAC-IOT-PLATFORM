<template>
  <div style="width: 99%" class="bg-body p-12 rounded">
    <!--begin::Modal dialog-->
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
          <div class="card-body border-top p-9">
            <!--begin::Input group-->
            <div class="row mb-6" v-if="identifier == 'Admin'">
              <!--begin::Label-->
              <label class="col-lg-2 col-form-label required fw-semobold fs-6"
                >Company</label
              >
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-10 fv-row">
                <el-select
                  v-model="itemDetails.company_id"
                  filterable
                  placeholder="Please Select Company..."
                >
                  <el-option
                    disabled="disabled"
                    value=""
                    label="Please Select Company..."
                  >
                    Please Select Company
                  </el-option>
                  <el-option
                    v-for="item in Companies"
                    :key="item.id"
                    :label="item.company_name"
                    :value="item.id"
                  />
                </el-select>
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="company" />
                  </div>
                </div>
              </div>
              <!--end::Col-->
            </div>

            <!-- extra fields -->
            <div class="row mb-6">
              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                  >Instrument ID.</label
                >
                <Field
                  type="text"
                  name="instrument_id"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter Instrument ID."
                  v-model="itemDetails.instrument_id"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="instrument_id" />
                  </div>
                </div>
              </div>
            </div>
            <!--end::Input group-->

            <!-- extra fields -->
            <div class="row mb-6">
              <div class="form-group col-md-6">
                <label class="col-lg-4 col-form-label required fw-semobold fs-6"
                  >Model No.</label
                >
                <Field
                  type="text"
                  name="model_no"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter Instrument Model No."
                  v-model="itemDetails.model_no"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="model_no" />
                  </div>
                </div>
              </div>
              <div class="form-group col-md-6">
                <label class="col-lg-4 col-form-label required fw-semobold fs-6"
                  >Serial No.</label
                >
                <Field
                  type="text"
                  name="serial_no"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter Instrument Serial No."
                  v-model="itemDetails.serial_no"
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
                  class="col-lg-4 col-form-label required fw-semobold fs-6 text-nowrap"
                  >Instument Name</label
                >
                <Field
                  type="text"
                  name="name"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter Instrument Name"
                  v-model="itemDetails.name"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="name" />
                  </div>
                </div>
              </div>

              <div class="form-group col-md-6">
                <label class="col-lg-4 col-form-label required fw-semobold fs-6"
                  >Make</label
                >
                <Field
                  type="text"
                  name="make"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Instrument made by... "
                  v-model="itemDetails.make"
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
              <div class="form-group col-md-12">
                <label
                  class="col-lg-4 col-form-label required fw-semobold fs-6 text-nowrap"
                  >Instrument Description</label
                >
                <Field
                  type="text"
                  as="textarea"
                  name="description"
                  rows="3"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Description of the instrument..."
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
                        v-model="itemDetails.calibration_date"
                        @change="setDates($event, 'calibration_date')"
                        placeholder="Pick a Day"
                        :editable="false"
                      />
                    </div>
                  </span>
                  <!--end::Info-->
                </label>
                <div
                  class="fv-plugins-message-container"
                  v-if="!itemDetails.calibration_date"
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
                        v-model="itemDetails.calibration_due_date"
                        @change="setDates($event, 'calibration_due_date')"
                        placeholder="Pick a Day"
                        :editable="false"
                      />
                    </div>
                  </span>
                  <!--end::Info-->
                </label>
                <div
                  class="fv-plugins-message-container"
                  v-if="!itemDetails.calibration_due_date"
                >
                  <div class="fv-help-block">
                    <ErrorMessage name="calibration_due_date" />
                  </div>
                </div>
              </div>
            </div>

            <!-- extra fields -->
            <div class="row mb-6">
              <!--begin::Label-->
              <label
                class="col-lg-3 col-form-label required fw-bold text-gray-700 fw-semobold fs-6 text-nowrap"
                >Vendor Name</label
              >
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-9 fv-row">
                <Field
                  type="text"
                  name="vendor_name"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter vendor name..."
                  v-model="itemDetails.vendor_name"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="vendor_name" />
                  </div>
                </div>
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->

            <!-- extra fields -->
            <div class="row mb-6">
              <div class="form-group col-lg-12 col-md-12">
                <label
                  class="col-lg-4 col-form-label required fs-6 fw-bold text-gray-700 text-nowrap mb-2"
                  >Accessories's List</label
                >
                <el-form-item class="d-flex flex-column mb-8 fv-row">
                  <el-select
                    v-model="itemDetails.accessories_list"
                    multiple
                    filterable
                    allow-create
                    placeholder="Enter accessories name and select it to add..."
                  >
                    <el-option
                      v-for="(item, index) in itemDetails.accessories_list"
                      :key="index"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </el-form-item>
                <div
                  class="fv-plugins-message-container mt-0"
                  v-if="!itemDetails.accessories_list.length"
                >
                  <div class="fv-help-block">
                    <ErrorMessage name="accessories_list" />
                  </div>
                </div>
              </div>
            </div>

            <!--begin::Input group-->
            <div class="row mb-6">
              <!--begin::Label-->
              <label class="col-lg-3 col-form-label fw-semobold fs-6"
                >Datasheet</label
              >
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-9">
                <!--begin::Row-->
                <div class="row">
                  <!--begin::Col-->
                  <div
                    v-if="itemDetails.datasheet == ''"
                    class="form-group col-md-12 mb-8 mb-sd-8"
                  >
                    <div class="position-relative">
                      <label
                        class="w-100 bg-gray-200 min-h-100px btn btn-outline btn-outline-dashed btn-outline-default d-flex align-items-center position-relative"
                      >
                        <div
                          class="m-6 position-absolute fs-1 top-50 start-50 translate-middle"
                        >
                          <i class="bi bi-upload fs-1"></i>

                          <p class="fs-3 text-gray-700">
                            Browse File to upload
                          </p>
                        </div>
                        <input
                          type="file"
                          @change="handleDatasheetChange"
                          accept=".pdf"
                          class="position-absolute top-0 start-0 end-0 bottom-0 opacity-0 w-100 h-100"
                        />
                      </label>
                    </div>
                    <div
                      v-if="
                        uploadProgressForDatasheet &&
                        uploadProgressForDatasheet > 0 &&
                        uploadProgressForDatasheet <= 100
                      "
                      class="h-10px min-w-100 d-flex flex-stack py-4"
                    >
                      <div
                        class="progress progress-bar bg-primary d-flex align-items-center justify-content-center"
                        role="progressbar"
                        :style="`width: ${uploadProgressForDatasheet}%`"
                        :aria-valuenow="uploadProgressForDatasheet"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                      <div class="d-flex flex-column align-items-end ms-2">
                        {{ `${uploadProgressForDatasheet}%` }}
                      </div>
                    </div>
                  </div>
                  <div
                    v-if="
                      itemDetails.datasheet != '' &&
                      datasheetData.file_name == ''
                    "
                    class="notice d-flex bg-light-primary rounded border-primary border min-w-lg-600px flex-shrink-0 p-6"
                  >
                    <!--begin::Icon-->
                    <KTIcon
                      icon-name="file"
                      icon-class="fs-2tx text-primary me-4"
                    />
                    <!--end::Icon-->

                    <!--begin::Wrapper-->
                    <div
                      class="d-flex flex-stack flex-grow-1 flex-wrap flex-md-nowrap"
                    >
                      <!--begin::Content-->
                      <div class="mb-3 mb-md-0 fw-semobold">
                        <h4 class="text-gray-800 fw-bold cursor-pointer">
                          <a
                            target="blank"
                            v-bind:href="`https://api.zeptac.com/storage/company/${itemDetails.company_id}/instruments/${itemDetails.datasheet}`"
                            data-toggle="tooltip"
                            title="preview file"
                            class="underline"
                            >{{ itemDetails.datasheet }}
                          </a>
                        </h4>
                      </div>
                      <!--end::Content-->

                      <!--begin::Action-->

                      <KTIcon
                        data-toggle="tooltip"
                        title="remove file"
                        icon-name="cross"
                        class="cursor-pointer fs-2tx text-danger rounded"
                        @click="removeDatasheetFromTemp"
                        icon-class="fs-1"
                      />
                      <!--end::Action-->
                    </div>
                    <!--end::Wrapper-->
                  </div>
                  <div
                    v-else-if="datasheetData.file_name != ''"
                    class="notice d-flex bg-light-primary rounded border-primary border min-w-lg-600px flex-shrink-0 p-6"
                  >
                    <!--begin::Icon-->
                    <KTIcon
                      icon-name="file"
                      icon-class="fs-2tx text-primary me-4"
                    />
                    <!--end::Icon-->

                    <!--begin::Wrapper-->
                    <div
                      class="d-flex flex-stack flex-grow-1 flex-wrap flex-md-nowrap"
                    >
                      <!--begin::Content-->
                      <div class="mb-3 mb-md-0 fw-semobold">
                        <h4 class="text-gray-800 fw-bold cursor-pointer">
                          <a
                            target="blank"
                            v-bind:href="`https://api.zeptac.com/storage/temporary/${itemDetails.datasheet}`"
                            data-toggle="tooltip"
                            title="preview file"
                            class="underline"
                            >{{ itemDetails.datasheet }}
                          </a>
                        </h4>
                        <div class="fs-6 text-gray-600 pe-7">
                          {{ datasheetData.file_size.toFixed(2) }} MB
                        </div>
                      </div>
                      <!--end::Content-->

                      <!--begin::Action-->

                      <KTIcon
                        data-toggle="tooltip"
                        title="remove file"
                        icon-name="cross"
                        class="cursor-pointer fs-2tx text-danger rounded"
                        @click="removeDatasheetFromTemp"
                        icon-class="fs-1"
                      />
                      <!--end::Action-->
                    </div>
                    <!--end::Wrapper-->
                  </div>
                  <!--end::Col-->
                </div>
                <!--end::Row-->
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="row mb-6">
              <!--begin::Label-->
              <label class="col-lg-3 col-form-label fw-semobold fs-6"
                >Traceability</label
              >
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-9">
                <!--begin::Row-->
                <div class="row">
                  <!--begin::Col-->
                  <div
                    v-if="itemDetails.traceability == ''"
                    class="form-group col-md-12 mb-8 mb-sd-8"
                  >
                    <div class="position-relative">
                      <label
                        class="w-100 bg-gray-200 min-h-100px btn btn-outline btn-outline-dashed btn-outline-default d-flex align-items-center position-relative"
                      >
                        <div
                          class="m-6 position-absolute fs-1 top-50 start-50 translate-middle"
                        >
                          <i class="bi bi-upload fs-1"></i>

                          <p class="fs-3 text-gray-700">
                            Browse File to upload
                          </p>
                        </div>
                        <input
                          type="file"
                          @change="handleTraceabilityChange"
                          accept=".pdf"
                          class="position-absolute top-0 start-0 end-0 bottom-0 opacity-0 w-100 h-100"
                        />
                      </label>
                    </div>
                    <div
                      v-if="
                        uploadProgressForTraceability &&
                        uploadProgressForTraceability > 0 &&
                        uploadProgressForTraceability <= 100
                      "
                      class="h-10px min-w-100 d-flex flex-stack py-4"
                    >
                      <div
                        class="progress progress-bar bg-primary d-flex align-items-center justify-content-center"
                        role="progressbar"
                        :style="`width: ${uploadProgressForTraceability}%`"
                        :aria-valuenow="uploadProgressForTraceability"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                      <div class="d-flex flex-column align-items-end ms-2">
                        {{ `${uploadProgressForTraceability}%` }}
                      </div>
                    </div>
                  </div>
                  <div
                    v-if="
                      itemDetails.traceability != '' &&
                      traceabilityData.file_name == ''
                    "
                    class="notice d-flex bg-light-primary rounded border-primary border min-w-lg-600px flex-shrink-0 p-6"
                  >
                    <!--begin::Icon-->
                    <KTIcon
                      icon-name="file"
                      icon-class="fs-2tx text-primary me-4"
                    />
                    <!--end::Icon-->

                    <!--begin::Wrapper-->
                    <div
                      class="d-flex flex-stack flex-grow-1 flex-wrap flex-md-nowrap"
                    >
                      <!--begin::Content-->
                      <div class="mb-3 mb-md-0 fw-semobold">
                        <h4 class="text-gray-800 fw-bold cursor-pointer">
                          <a
                            target="blank"
                            v-bind:href="`https://api.zeptac.com/storage/company/${itemDetails.company_id}/instruments/${itemDetails.traceability}`"
                            data-toggle="tooltip"
                            title="preview file"
                            class="underline"
                            >{{ itemDetails.traceability }}
                          </a>
                        </h4>
                      </div>
                      <!--end::Content-->

                      <!--begin::Action-->

                      <KTIcon
                        data-toggle="tooltip"
                        title="remove file"
                        icon-name="cross"
                        class="cursor-pointer fs-2tx text-danger rounded"
                        @click="removeTraceabilityFromTemp"
                        icon-class="fs-1"
                      />
                      <!--end::Action-->
                    </div>
                    <!--end::Wrapper-->
                  </div>
                  <div
                    v-else-if="traceabilityData.file_name != ''"
                    class="notice d-flex bg-light-primary rounded border-primary border min-w-lg-600px flex-shrink-0 p-6"
                  >
                    <!--begin::Icon-->
                    <KTIcon
                      icon-name="file"
                      icon-class="fs-2tx text-primary me-4"
                    />
                    <!--end::Icon-->

                    <!--begin::Wrapper-->
                    <div
                      class="d-flex flex-stack flex-grow-1 flex-wrap flex-md-nowrap"
                    >
                      <!--begin::Content-->
                      <div class="mb-3 mb-md-0 fw-semobold">
                        <h4 class="text-gray-800 fw-bold cursor-pointer">
                          <a
                            target="blank"
                            v-bind:href="`https://api.zeptac.com/storage/temporary/${itemDetails.traceability}`"
                            data-toggle="tooltip"
                            title="preview file"
                            class="underline"
                            >{{ itemDetails.traceability }}
                          </a>
                        </h4>
                        <div class="fs-6 text-gray-600 pe-7">
                          {{ traceabilityData.file_size.toFixed(2) }} MB
                        </div>
                      </div>
                      <!--end::Content-->

                      <!--begin::Action-->

                      <KTIcon
                        data-toggle="tooltip"
                        title="remove file"
                        icon-name="cross"
                        class="cursor-pointer fs-2tx text-danger rounded"
                        @click="removeTraceabilityFromTemp"
                        icon-class="fs-1"
                      />
                      <!--end::Action-->
                    </div>
                    <!--end::Wrapper-->
                  </div>
                  <!--end::Col-->
                </div>
                <!--end::Row-->
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="row mb-6">
              <!--begin::Label-->
              <label class="col-lg-3 col-form-label fw-semobold fs-6"
                >Calibration Certificate</label
              >
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-9">
                <!--begin::Row-->
                <div class="row">
                  <!--begin::Col-->
                  <div
                    v-if="itemDetails.calibration_certificate == ''"
                    class="form-group col-md-12 mb-8 mb-sd-8"
                  >
                    <div class="position-relative">
                      <label
                        class="w-100 bg-gray-200 min-h-100px btn btn-outline btn-outline-dashed btn-outline-default d-flex align-items-center position-relative"
                      >
                        <div
                          class="m-6 position-absolute fs-1 top-50 start-50 translate-middle"
                        >
                          <i class="bi bi-upload fs-1"></i>

                          <p class="fs-3 text-gray-700">
                            Browse File to upload
                          </p>
                        </div>
                        <input
                          type="file"
                          @change="handleCalibrationChange"
                          accept=".pdf"
                          class="position-absolute top-0 start-0 end-0 bottom-0 opacity-0 w-100 h-100"
                        />
                      </label>
                    </div>
                    <div
                      v-if="
                        uploadProgressForCalibration &&
                        uploadProgressForCalibration > 0 &&
                        uploadProgressForCalibration <= 100
                      "
                      class="h-10px min-w-100 d-flex flex-stack py-4"
                    >
                      <div
                        class="progress progress-bar bg-primary d-flex align-items-center justify-content-center"
                        role="progressbar"
                        :style="`width: ${uploadProgressForCalibration}%`"
                        :aria-valuenow="uploadProgressForCalibration"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                      <div class="d-flex flex-column align-items-end ms-2">
                        {{ `${uploadProgressForCalibration}%` }}
                      </div>
                    </div>
                  </div>
                  <div
                    v-if="
                      itemDetails.calibration_certificate != '' &&
                      calibrationData.file_name == ''
                    "
                    class="notice d-flex bg-light-primary rounded border-primary border min-w-lg-600px flex-shrink-0 p-6"
                  >
                    <!--begin::Icon-->
                    <KTIcon
                      icon-name="file"
                      icon-class="fs-2tx text-primary me-4"
                    />
                    <!--end::Icon-->

                    <!--begin::Wrapper-->
                    <div
                      class="d-flex flex-stack flex-grow-1 flex-wrap flex-md-nowrap"
                    >
                      <!--begin::Content-->
                      <div class="mb-3 mb-md-0 fw-semobold">
                        <h4 class="text-gray-800 fw-bold cursor-pointer">
                          <a
                            target="blank"
                            v-bind:href="`https://api.zeptac.com/storage/company/${itemDetails.company_id}/instruments/${itemDetails.calibration_certificate}`"
                            data-toggle="tooltip"
                            title="preview file"
                            class="underline"
                            >{{ itemDetails.calibration_certificate }}
                          </a>
                        </h4>
                      </div>
                      <!--end::Content-->

                      <!--begin::Action-->

                      <KTIcon
                        data-toggle="tooltip"
                        title="remove file"
                        icon-name="cross"
                        class="cursor-pointer fs-2tx text-danger rounded"
                        @click="removeCalibrationFromTemp"
                        icon-class="fs-1"
                      />
                      <!--end::Action-->
                    </div>
                    <!--end::Wrapper-->
                  </div>
                  <div
                    v-else-if="calibrationData.file_name != ''"
                    class="notice d-flex bg-light-primary rounded border-primary border min-w-lg-600px flex-shrink-0 p-6"
                  >
                    <!--begin::Icon-->
                    <KTIcon
                      icon-name="file"
                      icon-class="fs-2tx text-primary me-4"
                    />
                    <!--end::Icon-->

                    <!--begin::Wrapper-->
                    <div
                      class="d-flex flex-stack flex-grow-1 flex-wrap flex-md-nowrap"
                    >
                      <!--begin::Content-->
                      <div class="mb-3 mb-md-0 fw-semobold">
                        <h4 class="text-gray-800 fw-bold cursor-pointer">
                          <a
                            target="blank"
                            v-bind:href="`https://api.zeptac.com/storage/temporary/${itemDetails.calibration_certificate}`"
                            data-toggle="tooltip"
                            title="preview file"
                            class="underline"
                            >{{ itemDetails.calibration_certificate }}
                          </a>
                        </h4>
                        <div class="fs-6 text-gray-600 pe-7">
                          {{ calibrationData.file_size.toFixed(2) }} MB
                        </div>
                      </div>
                      <!--end::Content-->

                      <!--begin::Action-->

                      <KTIcon
                        data-toggle="tooltip"
                        title="remove file"
                        icon-name="cross"
                        class="cursor-pointer fs-2tx text-danger rounded"
                        @click="removeCalibrationFromTemp"
                        icon-class="fs-1"
                      />
                      <!--end::Action-->
                    </div>
                    <!--end::Wrapper-->
                  </div>
                  <!--end::Col-->
                </div>
                <!--end::Row-->
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->

            <div class="row mb-6 mt-6">
              <div
                class="form-check form-switch form-check-custom form-check-primary form-check-solid"
              >
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  name="maintenance_plan"
                  id="maintenance_plan"
                  v-model="itemDetails.maintenance_plan"
                />
                <label
                  class="form-check-label required fw-bold text-primary fw-semobold fs-6"
                  for="maintenance_plan"
                >
                  If you want maintenance for a particular instrument, then
                  kindly check it.
                </label>
              </div>
            </div>

            <!--begin::Accordion-->
            <div class="accordion" id="kt_accordion_1">
              <div class="accordion-item">
                <h2 class="accordion-header" :id="'kt_accordion_1_header_'">
                  <button
                    class="accordion-button fs-4 fw-semibold"
                    type="button"
                    :data-bs-toggle="'collapse'"
                    :data-bs-target="'#kt_accordion_1_body_'"
                    :aria-controls="'kt_accordion_1_body_'"
                  >
                    Maintenance History
                    <span
                      class="badge m-3 py-3 px-4 fs-7 badge-light-primary rounded animate__animated animate__pulse animate__infinite"
                      >{{
                        itemDetails.maintenance_history.length
                          ? itemDetails.maintenance_history.length
                          : "0"
                      }}
                      Times</span
                    >
                  </button>
                </h2>
                <div
                  :id="'kt_accordion_1_body_'"
                  class="accordion-collapse collapse"
                  :aria-labelledby="'kt_accordion_1_header_'"
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
                              <th class="col-5">Maintenance Date</th>
                              <th class="col-5">Next Maintenance Date</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(
                                plan, index
                              ) in itemDetails.maintenance_history"
                              :key="index"
                            >
                              <td class="align-middle">
                                <span
                                  class="badge py-3 px-4 fs-7 badge-light-primary"
                                  >{{ `${plan.m_date1}` }}</span
                                >
                              </td>
                              <td class="align-middle">
                                <span
                                  class="badge py-3 px-4 fs-7 badge-light-primary"
                                  >{{ `${plan.m_date2}` }}</span
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
                                      '#kt_modal_new_address_' + index
                                    "
                                  >
                                    <i class="bi bi-eye"></i> Edit
                                  </button>

                                  <MaintenanceEditModal
                                    :key="index"
                                    :planId="index"
                                    :heading="'Edit Maintenance Plan'"
                                    :maintenancePlan="plan"
                                    @editData="editMaintenanceData"
                                  ></MaintenanceEditModal>

                                  <button
                                    type="button"
                                    class="btn btn-danger btn-sm"
                                    @click="deleteMaintenanceData(index)"
                                  >
                                    <i class="bi bi-trash"></i> Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                            <tr
                              class="text-center"
                              v-if="
                                itemDetails.maintenance_history.length === 0
                              "
                            >
                              <td
                                colspan="3"
                                class="fw-semibold fs-6 text-gray-800 border-bottom border-gray-200 text-align-center"
                              >
                                No Maintenance Done Yet.
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div class="text-start mt-8">
                      <button
                        type="button"
                        data-toggle="tooltip"
                        title="maintenance plan"
                        class="btn btn-primary btn-sm"
                        data-bs-toggle="modal"
                        :data-bs-target="'#kt_modal_new_address'"
                      >
                        Add Maintenance
                      </button>
                    </div>

                    <MaintenanceModal
                      :heading="'Maintenance Plan'"
                      :username="User.first_name + ' ' + User.last_name"
                      @addData="addMaintenanceData"
                    ></MaintenanceModal>
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
                    Intermediate Check Plans
                  </button>
                </h2>
                <div
                  :id="'kt_accordion_2_body_'"
                  class="accordion-collapse collapse"
                  :aria-labelledby="'kt_accordion_2_header_'"
                  data-bs-parent="#kt_accordion_2"
                >
                  <div class="accordion-body">
                    <div class="table-responsive">
                      <table
                        class="table table-rounded table-border border gy-7 gs-7 text-nowrap"
                      >
                        <thead>
                          <tr
                            class="fw-semibold fs-6 text-gray-800 border-bottom border-gray-200 text-align-center"
                          >
                            <th class="col-3">Sr.No</th>
                            <th class="col-5">Plan Dates</th>
                            <th class="col-2">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(
                              date, index
                            ) in itemDetails.intermediate_check_plan"
                            :key="index"
                          >
                            <td class="align-middle">{{ index + 1 }}</td>
                            <td class="align-middle">
                              <template v-if="index !== editingIndex">
                                <span
                                  class="badge py-3 px-4 fs-7 badge-light-primary"
                                  >{{ date }}</span
                                >
                              </template>
                              <template v-else>
                                <el-date-picker
                                  type="date"
                                  v-model="editedDate"
                                  class="badge"
                                  @change="
                                    setPlanAndEditDates($event, 'editedDate')
                                  "
                                  placeholder="Pick a day"
                                ></el-date-picker>
                              </template>
                            </td>
                            <td class="align-middle">
                              <template v-if="index !== editingIndex">
                                <button
                                  class="btn btn-sm btn-primary"
                                  @click="editPlanDate(index)"
                                >
                                  Edit
                                </button>
                              </template>
                              <template v-else>
                                <button
                                  class="btn btn-sm btn-success"
                                  @click="savePlanDate(index)"
                                >
                                  Save
                                </button>
                              </template>
                              <button
                                class="btn btn-sm btn-danger"
                                @click="deletePlanDate(index)"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                          <tr
                            class="text-center"
                            v-if="
                              itemDetails.intermediate_check_plan.length === 0
                            "
                          >
                            <td
                              colspan="3"
                              class="fw-semibold fs-6 text-gray-800 border-bottom border-gray-200 text-align-center"
                            >
                              No Dates.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div class="text-start mt-8">
                      <div class="input-group p-2 flex gap-6">
                        <el-date-picker
                          type="date"
                          v-model="planDate"
                          @change="setPlanAndEditDates($event, 'planDate')"
                          placeholder="Pick a day"
                          style="flex: 1"
                        ></el-date-picker>

                        <div class="input-group-append">
                          <button
                            class="btn btn-md btn-primary"
                            type="button"
                            @click="addPlanDate"
                          >
                            + Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--end::Accordion-->
          </div>
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <span
              ref="submitButton"
              class="btn btn-primary w-sd-25 w-lg-25"
              @click="submit"
            >
              <span class="indicator-label"> Update </span>
              <span class="indicator-progress">
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
import {
  updateInstrument,
  getInstrument,
  getCompanies,
  removeImage,
  uploadImage,
} from "@/stores/api";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import { useAuthStore } from "@/stores/auth";
import { useRouter, useRoute } from "vue-router";
import ApiService from "@/core/services/ApiService";
import moment from "moment";
import { Identifier } from "@/core/config/WhichUserConfig";
import MaintenanceModal from "./MaintenanceComponent/MaintenanceModal.vue";
import MaintenanceEditModal from "./MaintenanceComponent/MaintenanceEditModal.vue";

interface MDetails {
  periodicity: string;
  m_date1: string;
  m_date2: string;
  m_details: string;
  any_repair_detail: string;
  maintenance_done_by: string;
}

interface itemDetails {
  instrument_id: string;
  name: string;
  description: string;
  availability: string;
  model_no: string;
  serial_no: string;
  make: string;

  calibration_date: string;
  calibration_due_date: string;
  vendor_name: string;

  accessories_list: Array<string>;
  datasheet: string;
  calibration_certificate: string;
  traceability: string;

  maintenance_plan: boolean;

  maintenance_history: Array<MDetails>;
  intermediate_check_plan: string[];

  approval_status: string;

  company_id: string;
  created_by: number;
  updated_by: number;
  is_active: number;
}

export default defineComponent({
  name: "instrument-edit",
  components: {
    ErrorMessage,
    Field,
    VForm,
    MaintenanceModal,
    MaintenanceEditModal,
  },
  setup() {
    const submitButton = ref<null | HTMLButtonElement>(null);
    const identifier = Identifier;
    const loading = ref(false);
    const auth = useAuthStore();
    const router = useRouter();
    const route = useRoute();
    const User = auth.GetUser();
    const Companies = ref([{ id: "", company_name: "" }]);
    let limit = ref(500);
    const itemId = route.params.id;

    // INTERMEDIATE CHECK PLAN REF
    const editingIndex = ref(null);
    const editedDate = ref("");
    const planDate = ref("");

    // INTERMEDIATE CHECK PLAN LOGICAL FUNCTION
    const addPlanDate = () => {
      if (planDate.value) {
        itemDetails.value.intermediate_check_plan.push(planDate.value);
        planDate.value = "";
      }
    };

    const editPlanDate = (index) => {
      editingIndex.value = index;
      editedDate.value = itemDetails.value.intermediate_check_plan[index];
    };

    const savePlanDate = (index) => {
      if (editedDate.value) {
        itemDetails.value.intermediate_check_plan[index] = editedDate.value;
        editingIndex.value = null;
      }
    };

    const deletePlanDate = (index) => {
      itemDetails.value.intermediate_check_plan.splice(index, 1);
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

    async function setPlanAndEditDates(e, dateType) {
      if (dateType === "planDate") {
        try {
          if (e != null) {
            if (e != "" && e != null) {
              planDate.value = moment(e).format("YYYY-MM-DD");
            } else {
              planDate.value = "";
            }
          } else {
            planDate.value = "";
          }
        } catch (err) {
          planDate.value = "";
        }
        console.log(planDate.value);
      } else if (dateType === "editedDate") {
        try {
          if (e != null) {
            if (e != "" && e != null) {
              editedDate.value = moment(e).format("YYYY-MM-DD");
            } else {
              editedDate.value = "";
            }
          } else {
            editedDate.value = "";
          }
        } catch (err) {
          editedDate.value = "";
        }
        console.log(editedDate.value);
      }
    }

    const itemDetailsValidator = Yup.object().shape({
      instrument_id: Yup.string().required().label("Instrument ID"),
      name: Yup.string().required().label("Instrument Name"),
      description: Yup.string().required().label("Instrument Description"),
      model_no: Yup.string().required().label("Model No."),
      serial_no: Yup.string().required().label("Serial No."),
      make: Yup.string().required().label("Made by"),
      vendor_name: Yup.string().required().label("Vendor Name"),
      calibration_date: Yup.string().required().label("Calibration Date"),
      calibration_due_date: Yup.string()
        .required()
        .label("Calibration Due Date"),
      accessories_list: Yup.string().required().label("Accessories"),
    });

    const getdropcomp = async () => {
      ApiService.setHeader();
      const response = await getCompanies(`fetchAll=true`);
      if (response.result != null && response.result) {
        Companies.value.push(
          ...response.result?.map(({ created_at, ...rest }) => ({
            ...rest,
            created_at: moment(created_at).format("MMMM Do YYYY"),
          }))
        );
        console.log(Companies);
      }
    };

    const calibrationData = ref({
      file_name: "",
      file: "",
      file_size: 0,
    });

    const datasheetData = ref({
      file_name: "",
      file: "",
      file_size: 0,
    });

    const traceabilityData = ref({
      file_name: "",
      file: "",
      file_size: 0,
    });

    const itemDetails = ref<itemDetails>({
      instrument_id: "",
      name: "",
      description: "",
      availability: "",
      model_no: "",
      serial_no: "",
      make: "",
      calibration_date: "",
      calibration_due_date: "",
      vendor_name: "",
      accessories_list: [],
      datasheet: "",
      calibration_certificate: "",
      traceability: "",
      maintenance_plan: true,

      maintenance_history: [],
      intermediate_check_plan: [],

      approval_status: "",

      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
      is_active: 1,
    });

    onMounted(async () => {
      Companies.value.pop();
      let response = await getInstrument(itemId.toString());
      console.log(response);

      itemDetails.value = {
        instrument_id: response.instrument_id,
        name: response.name,
        description: response.description,
        availability: response.availability,
        model_no: response.model_no,
        serial_no: response.serial_no,
        make: response.make,

        calibration_date: response.calibration_date,
        calibration_due_date: response.calibration_due_date,
        vendor_name: response.vendor_name,
        accessories_list: JSON.parse(response.accessories_list),
        datasheet: response.datasheet ? response.datasheet : "",
        calibration_certificate: response.calibration_certificate
          ? response.calibration_certificate
          : "",
        traceability: response.traceability ? response.traceability : "",

        maintenance_plan: response.maintenance_plan ? true : false,
        maintenance_history: JSON.parse(response.maintenance_history),
        intermediate_check_plan: JSON.parse(response.intermediate_check_plan),

        approval_status: response.approval_status,

        company_id: response.company_id ? response.company_id : "",
        created_by: response.created_by,
        updated_by: response.updated_by,
        is_active: response.is_active,
      };
      if (User.role_id === 1) {
        await getdropcomp();
      }
    });

    // CONSTANT
    const MAX_FILE_SIZE = 1024 ** 2; // 1 MB

    // TODO :: optional make a single function that can handle all files
    /* Calibration Certificate Logic */

    const uploadProgressForDatasheet = ref<number>(0);

    const handleDatasheetChange = async (event: any) => {
      const selectedFile = event.target?.files?.[0];
      const allowedTypes = ["application/pdf"];

      if (!selectedFile) {
        alert("Please Select a file");
        return;
      }

      if (selectedFile.size > MAX_FILE_SIZE) {
        alert("File size should be less than 1 MB");
        return;
      }

      datasheetData.value.file_size = selectedFile.size / 1024 ** 2;

      if (allowedTypes.includes(selectedFile.type)) {
        await uploadDatasheetFile(selectedFile);
      } else {
        datasheetData.value.file = "";
        alert("Please select a valid file");
      }

      console.log(datasheetData.value);
    };

    const removeDatasheetFromTemp = async () => {
      if (itemDetails.value.datasheet && datasheetData.value.file_name === "") {
        var confirmChange = confirm(
          "Do you really want to change datasheet file?"
        );
        if (!confirmChange) {
          return;
        }

        itemDetails.value.datasheet = "";
        // Continue with the rest of your code here
        return;
      }

      if (
        itemDetails.value.datasheet === "" &&
        datasheetData.value.file_name === ""
      ) {
        alert("You already removed the file. Please select a new file.");
        return;
      }

      const deleteConfirmation = async () => {
        try {
          const result = await Swal.fire({
            title: "Are you sure?",
            text: "You want to change the file!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "red",
            confirmButtonText: "Yes, I am sure!",
          });
          return result.isConfirmed;
        } catch (error) {
          const errorMessage = "An unknown error occurred";
          showErrorAlert("Error", errorMessage);
          return false;
        }
      };

      const deleteFromServer = async () => {
        try {
          const response = await removeImage(datasheetData.value);

          if (response.success) {
            itemDetails.value.datasheet = "";
            datasheetData.value = {
              file_name: "",
              file_size: 0,
              file: "",
            };

            showSuccessAlert(
              "Success",
              response.message || `File removed successfully.`
            );
            return { success: true };
          } else {
            throw new Error(response.message || "Failed to remove the file.");
          }
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "An unknown error occurred";
          showErrorAlert("Error", errorMessage);
          return { success: false, message: errorMessage };
        }
      };

      const isConfirmed = await deleteConfirmation();
      if (isConfirmed) {
        return await deleteFromServer();
      } else {
        return { success: false };
      }
    };

    const uploadDatasheetFile = async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("file_name", datasheetData.value.file_name);

      const onUploadProgress = (progressEvent) => {
        const { loaded, total } = progressEvent;
        const percentage = Math.floor((loaded / total) * 100);
        uploadProgressForDatasheet.value = percentage;
      };

      try {
        await simulateDatasheetUploadProgress();
        const response = await uploadImage(formData, onUploadProgress);
        itemDetails.value.datasheet = response.modifiedFileName;
        datasheetData.value.file_name = response.modifiedFileName;
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        finalizeDatasheetProgress();
      }

      datasheetData.value.file = file;
    };

    const simulateDatasheetUploadProgress = async () => {
      uploadProgressForDatasheet.value = 0;
      const interval = setInterval(() => {
        if (uploadProgressForDatasheet.value < 100) {
          uploadProgressForDatasheet.value += 10; // Adjust this value for smoother progress
        } else {
          clearInterval(interval);
        }
      }, 200); // Adjust the interval duration as needed
    };

    const finalizeDatasheetProgress = () => {
      uploadProgressForDatasheet.value = 100; // Ensure progress bar is complete
      setTimeout(() => {
        uploadProgressForDatasheet.value = 0; // Reset progress bar after a short delay
      }, 100);
    };

    // TODO :: optional make a single function that can handle all files
    /* Calibration Certificate Logic */

    const uploadProgressForCalibration = ref<number>(0);

    const handleCalibrationChange = async (event: any) => {
      const selectedFile = event.target?.files?.[0];
      const allowedTypes = ["application/pdf"];

      if (!selectedFile) {
        alert("Please Select a file");
        return;
      }

      if (selectedFile.size > MAX_FILE_SIZE) {
        alert("File size should be less than 1 MB");
        return;
      }

      calibrationData.value.file_size = selectedFile.size / 1024 ** 2;

      if (allowedTypes.includes(selectedFile.type)) {
        await uploadCalibrationFile(selectedFile);
      } else {
        calibrationData.value.file = "";
        alert("Please select a valid file");
      }

      console.log(calibrationData.value);
    };

    const removeCalibrationFromTemp = async () => {
      if (
        itemDetails.value.calibration_certificate &&
        calibrationData.value.file_name === ""
      ) {
        var confirmChange = confirm(
          "Do you really want to change calibration file?"
        );
        if (!confirmChange) {
          return;
        }

        itemDetails.value.calibration_certificate = "";
        // Continue with the rest of your code here
        return;
      }

      if (
        itemDetails.value.calibration_certificate === "" &&
        calibrationData.value.file_name === ""
      ) {
        alert("You already removed the file. Please select a new file.");
        return;
      }

      const deleteConfirmation = async () => {
        try {
          const result = await Swal.fire({
            title: "Are you sure?",
            text: "You want to change the file!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "red",
            confirmButtonText: "Yes, I am sure!",
          });
          return result.isConfirmed;
        } catch (error) {
          const errorMessage = "An unknown error occurred";
          showErrorAlert("Error", errorMessage);
          return false;
        }
      };

      const deleteFromServer = async () => {
        try {
          const response = await removeImage(calibrationData.value);

          if (response.success) {
            itemDetails.value.calibration_certificate = "";
            calibrationData.value = {
              file_name: "",
              file_size: 0,
              file: "",
            };

            showSuccessAlert(
              "Success",
              response.message || `File removed successfully.`
            );
            return { success: true };
          } else {
            throw new Error(response.message || "Failed to remove the file.");
          }
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "An unknown error occurred";
          showErrorAlert("Error", errorMessage);
          return { success: false, message: errorMessage };
        }
      };

      const isConfirmed = await deleteConfirmation();
      if (isConfirmed) {
        return await deleteFromServer();
      } else {
        return { success: false };
      }
    };

    const uploadCalibrationFile = async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("file_name", calibrationData.value.file_name);

      const onUploadProgress = (progressEvent) => {
        const { loaded, total } = progressEvent;
        const percentage = Math.floor((loaded / total) * 100);
        uploadProgressForCalibration.value = percentage;
      };

      try {
        await simulateCalibrationUploadProgress();
        const response = await uploadImage(formData, onUploadProgress);
        itemDetails.value.calibration_certificate = response.modifiedFileName;
        calibrationData.value.file_name = response.modifiedFileName;
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        finalizeCalibrationProgress();
      }

      calibrationData.value.file = file;
    };

    const simulateCalibrationUploadProgress = async () => {
      uploadProgressForCalibration.value = 0;
      const interval = setInterval(() => {
        if (uploadProgressForCalibration.value < 100) {
          uploadProgressForCalibration.value += 10; // Adjust this value for smoother progress
        } else {
          clearInterval(interval);
        }
      }, 200); // Adjust the interval duration as needed
    };

    const finalizeCalibrationProgress = () => {
      uploadProgressForCalibration.value = 100; // Ensure progress bar is complete
      setTimeout(() => {
        uploadProgressForCalibration.value = 0; // Reset progress bar after a short delay
      }, 100);
    };

    // TODO :: optional make a single function that can handle all files
    /* Traceability Logic */

    const uploadProgressForTraceability = ref<number>(0);

    const handleTraceabilityChange = async (event: any) => {
      const selectedFile = event.target?.files?.[0];
      const allowedTypes = ["application/pdf"];

      if (!selectedFile) {
        alert("Please Select a file");
        return;
      }

      if (selectedFile.size > MAX_FILE_SIZE) {
        alert("File size should be less than 1 MB");
        return;
      }

      traceabilityData.value.file_size = selectedFile.size / 1024 ** 2;

      if (allowedTypes.includes(selectedFile.type)) {
        await uploadTraceabilityFile(selectedFile);
      } else {
        traceabilityData.value.file = "";
        alert("Please select a valid file");
      }

      console.log(traceabilityData.value);
    };

    const removeTraceabilityFromTemp = async () => {
      if (
        itemDetails.value.traceability &&
        traceabilityData.value.file_name === ""
      ) {
        var confirmChange = confirm(
          "Do you really want to change Traceability file?"
        );
        if (!confirmChange) {
          return;
        }

        itemDetails.value.traceability = "";
        // Continue with the rest of your code here
        return;
      }

      if (
        itemDetails.value.traceability === "" &&
        traceabilityData.value.file_name === ""
      ) {
        alert("You already removed the file. Please select a new file.");
        return;
      }

      const deleteConfirmation = async () => {
        try {
          const result = await Swal.fire({
            title: "Are you sure?",
            text: "You want to change the file!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "red",
            confirmButtonText: "Yes, I am sure!",
          });
          return result.isConfirmed;
        } catch (error) {
          const errorMessage = "An unknown error occurred";
          showErrorAlert("Error", errorMessage);
          return false;
        }
      };

      const deleteFromServer = async () => {
        try {
          const response = await removeImage(traceabilityData.value);

          if (response.success) {
            itemDetails.value.traceability = "";
            traceabilityData.value = {
              file_name: "",
              file_size: 0,
              file: "",
            };

            showSuccessAlert(
              "Success",
              response.message || `File removed successfully.`
            );
            return { success: true };
          } else {
            throw new Error(response.message || "Failed to remove the file.");
          }
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "An unknown error occurred";
          showErrorAlert("Error", errorMessage);
          return { success: false, message: errorMessage };
        }
      };

      const isConfirmed = await deleteConfirmation();
      if (isConfirmed) {
        return await deleteFromServer();
      } else {
        return { success: false };
      }
    };

    const uploadTraceabilityFile = async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("file_name", traceabilityData.value.file_name);

      const onUploadProgress = (progressEvent) => {
        const { loaded, total } = progressEvent;
        const percentage = Math.floor((loaded / total) * 100);
        uploadProgressForTraceability.value = percentage;
      };

      try {
        await simulateTraceabilityUploadProgress();
        const response = await uploadImage(formData, onUploadProgress);
        itemDetails.value.traceability = response.modifiedFileName;
        traceabilityData.value.file_name = response.modifiedFileName;
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        finalizeTraceabilityProgress();
      }

      traceabilityData.value.file = file;
    };

    const simulateTraceabilityUploadProgress = async () => {
      uploadProgressForTraceability.value = 0;
      const interval = setInterval(() => {
        if (uploadProgressForTraceability.value < 100) {
          uploadProgressForTraceability.value += 10; // Adjust this value for smoother progress
        } else {
          clearInterval(interval);
        }
      }, 200); // Adjust the interval duration as needed
    };

    const finalizeTraceabilityProgress = () => {
      uploadProgressForTraceability.value = 100; // Ensure progress bar is complete
      setTimeout(() => {
        uploadProgressForTraceability.value = 0; // Reset progress bar after a short delay
      }, 100);
    };

    async function addMaintenanceData(data) {
      await itemDetails.value.maintenance_history.push(data);
    }

    async function editMaintenanceData(index, data) {
      itemDetails.value.maintenance_history.push[index] = await data;
    }

    function areAllPropertiesNull(array) {
      return array.some((detail) => {
        const {
          name,
          description,
          model_no,
          serial_no,
          make,
          calibration_date,
          calibration_due_date,
          vendor_name,
          accessories_list,
          maintenance_plan,
        } = detail;

        // Check if any property is null or empty

        return (
          name === "" ||
          description === "" ||
          model_no === "" ||
          serial_no === "" ||
          make === "" ||
          calibration_date === "" ||
          calibration_due_date === "" ||
          vendor_name === "" ||
          accessories_list.length === 0 ||
          maintenance_plan === false
        );
      });
    }

    function isMaintenanceDataNull(array) {
      return array.some((detail) => {
        const {
          periodicity,
          m_date1,
          m_date2,
          m_details,
          maintenance_done_by,
        } = detail;

        // Check if any property is null or empty

        return (
          periodicity === "" ||
          m_date1 === "" ||
          m_date2 === "" ||
          m_details === "" ||
          maintenance_done_by === ""
        );
      });
    }

    const removeObjectWithId = (arr, id) => {
      if (id !== -1) {
        arr.splice(id, 1);
      }

      return arr;
    };

    async function deleteMaintenanceData(index) {
      //zero represent the testID
      itemDetails.value.maintenance_history = await removeObjectWithId(
        itemDetails.value.maintenance_history,
        index
      );
    }

    const submit = async () => {
      console.log(itemDetails.value);
      loading.value = true;

      const result = areAllPropertiesNull([itemDetails.value]);

      if (result) {
        showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
        loading.value = false;
        return;
      }

      if (itemDetails.value.maintenance_history.length === 0) {
        showErrorAlert(
          "Warning",
          "At least one maintenance plan is required, please fill the maintenance plan."
        );
        loading.value = false;
        return;
      }

      const maintenance = isMaintenanceDataNull([
        itemDetails.value.maintenance_history,
      ]);

      if (maintenance) {
        showErrorAlert(
          "Warning",
          "Please Fill the required details for Maintenance plan "
        );
        loading.value = false;
        return;
      }

      if (
        !itemDetails.value.datasheet ||
        !itemDetails.value.calibration_certificate ||
        !itemDetails.value.traceability
      ) {
        showErrorAlert("Warning", "Please Fill the Form Fields Correctly");

        loading.value = false;
        return;
      }

      try {
        if (submitButton.value) {
          // Activate indicator
          submitButton.value.setAttribute("data-kt-indicator", "on");
        }

        // Call your API here
        const response = await updateInstrument(itemId, itemDetails.value);

        if (response?.success) {
          // Handle successful API response

          showSuccessAlert(
            "Success",
            response.message || "Instrument has been successfully updated!"
          );

          router.push({ name: "instrument-list" });
        } else {
          // Handle API error response
          loading.value = false;
          showErrorAlert("Error", response.message || "An error occurred.");
        }
      } catch (error) {
        // Handle any other errors during API call
        console.error("API call error:", error);
        showErrorAlert("Error", "An error occurred during the API call.");
      } finally {
        if (submitButton.value) {
          submitButton.value.removeAttribute("data-kt-indicator");
        }
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

    const clear = () => {
      console.log("clear");
    };

    return {
      submitButton,
      itemDetails,
      itemDetailsValidator,
      getAssetPath,
      submit,
      loading,
      Companies,
      identifier,
      addMaintenanceData,
      editMaintenanceData,
      deleteMaintenanceData,
      User,
      setDates,
      setPlanAndEditDates,
      editingIndex,
      editedDate,
      planDate,
      addPlanDate,
      editPlanDate,
      savePlanDate,
      deletePlanDate,

      handleDatasheetChange,
      uploadProgressForDatasheet,
      datasheetData,
      removeDatasheetFromTemp,

      handleCalibrationChange,
      uploadProgressForCalibration,
      calibrationData,
      removeCalibrationFromTemp,

      handleTraceabilityChange,
      uploadProgressForTraceability,
      traceabilityData,
      removeTraceabilityFromTemp,
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
