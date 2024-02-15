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
          <div class="card-body border-top p-6">
            <!--begin::Input group-->
            <div class="row mb-6" v-if="identifier == 'Admin'">
              <!--begin::Label-->
              <label
                class="col-lg-3 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                >Company</label
              >
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-9 fv-row">
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
                <label
                  class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
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
                <label
                  class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
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
                  class="col-lg-4 col-form-label required fw-semobold fw-bold text-gray-700 fs-6 text-nowrap"
                  >Instument Name</label
                >
                <Field
                  type="text"
                  name="name"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter Instrument Model"
                  v-model="itemDetails.name"
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
                  class="col-lg-4 col-form-label required fw-semobold fs-6 fw-bold text-gray-700 text-nowrap"
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

            <div class="row mb-6">
              <label
                for="datasheet"
                class="col-lg-3 col-form-label required fw-semobold text-gray-700 fs-6 text-nowrap"
                >Datasheet</label
              >
              <!--begin::Col-->
              <div class="col-lg-9 fv-row position-relative">
                <Field
                  type="file"
                  id="datasheet"
                  name="datasheet"
                  class="form-control form-control-lg form-control-solid"
                  @change="handleFileChange"
                  accept=".pdf"
                />
                <div
                  v-if="itemDetails.datasheet"
                  class="position-absolute end-0 top-50 translate-middle-y"
                >
                  <i
                    class="fas fs-4 fa-check-circle text-success me-6"
                    data-toggle="tooltip"
                    title="File is selected"
                  ></i>
                </div>
                <div
                  v-else
                  class="position-absolute end-0 top-50 translate-middle-y"
                >
                  <i
                    class="fas fs-4 fa-times-circle text-danger me-6"
                    data-toggle="tooltip"
                    title="File is not selected"
                  ></i>
                </div>
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="datasheet" />
                  </div>
                </div>
              </div>
              <!--end::Col-->
            </div>

            <div class="row mb-6">
              <label
                for="calibration_certificate"
                class="col-lg-3 col-form-label required fw-semobold text-gray-700 fs-6 text-nowrap"
                >Calibration Certificate</label
              >
              <!--begin::Col-->
              <div class="col-lg-9 fv-row position-relative">
                <Field
                  type="file"
                  id="calibration_certificate"
                  name="calibration_certificate"
                  class="form-control form-control-lg form-control-solid"
                  @change="handleFileChange"
                  accept=".pdf"
                />
                <div
                  v-if="itemDetails.calibration_certificate"
                  class="position-absolute end-0 top-50 translate-middle-y"
                >
                  <i
                    class="fas fs-4 fa-check-circle text-success me-6"
                    data-toggle="tooltip"
                    title="File is selected"
                  ></i>
                </div>
                <div
                  v-else
                  class="position-absolute end-0 top-50 translate-middle-y"
                >
                  <i
                    class="fas fs-4 fa-times-circle text-danger me-6"
                    data-toggle="tooltip"
                    title="File is not selected"
                  ></i>
                </div>
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="calibration_certificate" />
                  </div>
                </div>
              </div>
              <!--end::Col-->
            </div>

            <div class="row mb-6">
              <label
                for="traceability"
                class="col-lg-3 col-form-label required fw-semobold text-gray-700 fs-6 text-nowrap"
                >Traceability</label
              >
              <!--begin::Col-->
              <div class="col-lg-9 fv-row position-relative">
                <Field
                  type="file"
                  id="traceability"
                  name="traceability"
                  class="form-control form-control-lg form-control-solid"
                  @change="handleFileChange"
                  accept=".pdf"
                />
                <div
                  v-if="itemDetails.traceability"
                  class="position-absolute end-0 top-50 translate-middle-y"
                >
                  <i
                    class="fas fs-4 fa-check-circle text-success me-6"
                    data-toggle="tooltip"
                    title="File is selected"
                  ></i>
                </div>
                <div
                  v-else
                  class="position-absolute end-0 top-50 translate-middle-y"
                >
                  <i
                    class="fas fs-4 fa-times-circle text-danger me-6"
                    data-toggle="tooltip"
                    title="File is not selected"
                  ></i>
                </div>
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="traceability" />
                  </div>
                </div>
              </div>
              <!--end::Col-->
            </div>

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
          </div>
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <button
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
              @click="submit()"
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
import { addInstrument, getCompanies } from "@/stores/api";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import packages from "@/core/config/PackagesConfig";
import { limit, Identifier } from "@/core/config/WhichUserConfig";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import ApiService from "@/core/services/ApiService";
import moment from "moment";
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

  company_id: string;
  created_by: number;
  updated_by: number;
  is_active: number;
}

export default defineComponent({
  name: "instrument-add",
  components: {
    ErrorMessage,
    Field,
    VForm,
    MaintenanceModal,
    MaintenanceEditModal,
  },
  setup() {
    const identifier = Identifier;
    const loading = ref(false);
    const auth = useAuthStore();
    const router = useRouter();
    const User = auth.GetUser();
    const Companies = ref([{ id: "", company_name: "" }]);
    let limit = ref(500);

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

    const itemDetails = ref<itemDetails>({
      instrument_id: "",
      name: "",
      description: "",
      availability: "1",
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

      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
      is_active: 1,
    });

    onMounted(async () => {
      Companies.value.pop();
      if (User.role_id === 1) {
        await getdropcomp();
      }
    });

    const isPdfInvalid = ref(false);

    const handleFileChange = (event) => {
      // Get the selected file
      const selectedFile = event.target?.files?.[0];

      if (!selectedFile) {
        alert("Please Select a file");
      }

      if (selectedFile) {
        // Check if the selected file is a PDF
        if (selectedFile.type === "application/pdf") {
          const reader = new FileReader();

          reader.onload = () => {
            try {
              const base64Data = reader.result
                ?.toString()
                .replace(/^data:application\/pdf;base64,/, "");

              if (base64Data) {
                if (event.target.id === "datasheet") {
                  itemDetails.value.datasheet = base64Data;
                } else if (event.target.id === "calibration_certificate") {
                  itemDetails.value.calibration_certificate = base64Data;
                } else if (event.target.id === "traceability") {
                  itemDetails.value.traceability = base64Data;
                }
              } else {
                console.error("Error: Failed to read the image data.");
              }
            } catch (e) {
              console.error("Error:", e);
            }
          };

          // Read the file as data URL (base64)
          reader.readAsDataURL(selectedFile);
          // Reset the invalid flag
          isPdfInvalid.value = false;
        } else {
          // Clear the data and set the invalid flag

          if (event.target.id === "datasheet") {
            itemDetails.value.datasheet = "";

            isPdfInvalid.value = true;
          } else if (event.target.id === "calibration_certificate") {
            itemDetails.value.calibration_certificate = "";

            isPdfInvalid.value = true;
          } else if (event.target.id === "traceability") {
            itemDetails.value.traceability = "";

            isPdfInvalid.value = true;
          }
        }
      } else {
        if (event.target.id === "datasheet") {
          itemDetails.value.datasheet = "";

          isPdfInvalid.value = true;
        } else if (event.target.id === "calibration_certificate") {
          itemDetails.value.calibration_certificate = "";

          isPdfInvalid.value = true;
        } else if (event.target.id === "traceability") {
          itemDetails.value.traceability = "";

          isPdfInvalid.value = true;
        }
      }
      console.log(itemDetails.value);
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
          calibration_date === null ||
          calibration_due_date === null ||
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

      //   console.warn("Nice");
      try {
        itemDetails.value.calibration_date = moment(
          itemDetails.value.calibration_date
        ).format("YYYY-MM-DD");
        itemDetails.value.calibration_due_date = moment(
          itemDetails.value.calibration_due_date
        ).format("YYYY-MM-DD HH:mm:ss");

        // Call your API here with the form values
        const response = await addInstrument(itemDetails.value);
        // console.log(response.error);
        if (!response.error) {
          // Handle successful API response
          //   console.log("API response:", response);
          showSuccessAlert(
            "Success",
            "Instrument has been successfully inserted!"
          );

          clear();
          router.push({ name: "instrument-list" });
        } else {
          // Handle API error response
          //   console.log("API error:", errorData);
          // console.log("API error:", errorData.response.data.errors);
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

    const clear = () => {
      itemDetails.value = {
        instrument_id: "",
        name: "",
        description: "",
        availability: "1",
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

        company_id: User.company_id,
        created_by: User.id,
        updated_by: User.id,
        is_active: 1,
      };
    };
    return {
      itemDetails,
      itemDetailsValidator,
      getAssetPath,
      submit,
      loading,
      packages,
      limit,
      identifier,
      Companies,
      handleFileChange,
      addMaintenanceData,
      editMaintenanceData,
      deleteMaintenanceData,
      User,
      clear,
    };
  },
});
</script>

<style>
.el-input__inner, .el-select__inner {
  font-weight: 500;
}
.el-input__wrapper, .el-select__wrapper {
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
</style>