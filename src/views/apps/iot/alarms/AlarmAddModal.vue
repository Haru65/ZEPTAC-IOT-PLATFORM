<template>
  <div
    class="modal fade"
    tabindex="-1"
    id="add_alarm_modal"
    ref="newAddressModalRef"
    aria-labelledby="addAlarmModalLabel"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title" id="addAlarmModalLabel">Add New Alarm</h3>
          <div
            class="btn btn-icon btn-sm btn-active-light-primary ms-2"
            data-bs-dismiss="modal"
            aria-label="Close modal"
          >
            <i class="ki-duotone ki-cross fs-1">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
          </div>
        </div>

        <div class="modal-body">
          <VForm
            @submit="saveAlarm"
            :validation-schema="validationSchema"
            id="add_alarm_form"
          >
            <div class="row mb-6">
              <!-- Alarm Name -->
              <div class="col-md-6 form-group mb-6">
                <label class="form-label required fs-5 fw-bold text-gray-700 mb-2">
                  Alarm Name
                </label>
                <Field
                  name="name"
                  v-model="formData.name"
                  type="text"
                  class="form-control form-control-solid"
                  placeholder="Enter Alarm Name"
                  aria-label="Alarm Name"
                />
                <ErrorMessage name="name" class="text-danger mt-1" />
              </div>
              <!-- Device Name -->
              <div class="col-md-6 form-group mb-6">
                <label class="form-label required fs-5 fw-bold text-gray-700 mb-2">
                  Device Name
                </label>
                <Field
                  name="device_name"
                  as="select"
                  v-model="formData.device_name"
                  class="form-control form-control-solid"
                  aria-label="Device Name"
                >
                  <option value="" disabled>Select Device</option>
                  <option v-for="device in devices" :key="device" :value="device">
                    {{ device }}
                  </option>
                </Field>
                <ErrorMessage name="device_name" class="text-danger mt-1" />
              </div>
            </div>

            <div class="row mb-6">
              <!-- Location -->
              <div class="col-md-6 form-group mb-6">
                <label class="form-label required fs-5 fw-bold text-gray-700 mb-2">
                  Location
                </label>
                <Field
                  name="location"
                  v-model="formData.location"
                  type="text"
                  class="form-control form-control-solid"
                  placeholder="Enter Location"
                  aria-label="Location"
                />
                <ErrorMessage name="location" class="text-danger mt-1" />
              </div>
              <!-- Parameter -->
              <div class="col-md-6 form-group mb-6">
                <label class="form-label required fs-5 fw-bold text-gray-700 mb-2">
                  Parameter
                </label>
                <Field
                  name="parameter"
                  v-model="formData.parameter"
                  type="text"
                  class="form-control form-control-solid"
                  placeholder="Enter Parameter"
                  aria-label="Parameter"
                />
                <ErrorMessage name="parameter" class="text-danger mt-1" />
              </div>
            </div>

            <div class="row mb-6">
              <!-- Unit No -->
              <div class="col-md-6 form-group mb-6">
                <label class="form-label required fs-5 fw-bold text-gray-700 mb-2">
                  Unit Number
                </label>
                <Field
                  name="unit_no"
                  v-model="formData.unit_no"
                  type="text"
                  class="form-control form-control-solid"
                  placeholder="Enter Unit Number (e.g., U001)"
                  aria-label="Unit Number"
                />
                <ErrorMessage name="unit_no" class="text-danger mt-1" />
              </div>
              <!-- Alarm Type -->
              <div class="col-md-6 form-group mb-6">
                <label class="form-label required fs-5 fw-bold text-gray-700 mb-2">
                  Alarm Type
                </label>
                <Field
                  name="alarm_type"
                  v-model="formData.alarm_type"
                  type="text"
                  class="form-control form-control-solid"
                  placeholder="Enter Alarm Type"
                  aria-label="Alarm Type"
                />
                <ErrorMessage name="alarm_type" class="text-danger mt-1" />
              </div>
            </div>

            <div class="row mb-6">
              <!-- Severity -->
              <div class="col-md-6 form-group mb-6">
                <label class="form-label required fs-5 fw-bold text-gray-700 mb-2">
                  Severity Level
                </label>
                <Field
                  name="severity"
                  as="select"
                  v-model="formData.severity"
                  class="form-control form-control-solid"
                  aria-label="Severity"
                >
                  <option value="critical">Critical</option>
                  <option value="warning">Warning</option>
                  <option value="info">Info</option>
                  <option value="ok">OK</option>
                  <option value="battery">Battery</option>
                </Field>
                <ErrorMessage name="severity" class="text-danger mt-1" />
              </div>
              <!-- Link -->
              <div class="col-md-6 form-group mb-6">
                <label class="form-label fs-5 fw-bold text-gray-700 mb-2">
                  Device Link
                </label>
                <Field
                  name="link"
                  v-model="formData.link"
                  type="text"
                  class="form-control form-control-solid"
                  placeholder="Enter device link (e.g., /devices/1)"
                  aria-label="Device Link"
                />
                <ErrorMessage name="link" class="text-danger mt-1" />
              </div>
            </div>

            <!-- PV Values Section -->
            <div class="row mb-6">
              <div class="col-12">
                <label class="form-label fs-5 fw-bold text-gray-700 mb-3">
                  PV Values (Process Variables)
                </label>
                <div class="row">
                  <div class="col-md-2" v-for="i in 6" :key="`pv${i}`">
                    <label class="form-label text-gray-600 mb-1">PV{{ i }}</label>
                    <Field
                      :name="`pv_values.pv${i}`"
                      v-model="formData.pv_values[`pv${i}`]"
                      type="number"
                      step="0.1"
                      class="form-control form-control-solid"
                      :placeholder="`PV${i} Value`"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Notification Configuration -->
            <div class="row mb-6">
              <div class="col-md-6 form-group mb-6">
                <label class="form-label fs-5 fw-bold text-gray-700 mb-2">
                  SMS Numbers (comma-separated)
                </label>
                <Field
                  name="sms_numbers"
                  v-model="smsNumbersString"
                  type="text"
                  class="form-control form-control-solid"
                  placeholder="e.g., +1234567890, +0987654321"
                  aria-label="SMS Numbers"
                />
                <small class="form-text text-muted">Enter phone numbers separated by commas</small>
              </div>
              <div class="col-md-6 form-group mb-6">
                <label class="form-label fs-5 fw-bold text-gray-700 mb-2">
                  Email IDs (comma-separated)
                </label>
                <Field
                  name="email_ids"
                  v-model="emailIdsString"
                  type="text"
                  class="form-control form-control-solid"
                  placeholder="e.g., admin@company.com, tech@company.com"
                  aria-label="Email IDs"
                />
                <small class="form-text text-muted">Enter email addresses separated by commas</small>
              </div>
            </div>

            <div class="row mb-6">
              <!-- Status -->
              <div class="col-md-6 form-group mb-6">
                <label class="form-label required fs-5 fw-bold text-gray-700 mb-2">
                  Status
                </label>
                <Field
                  name="status"
                  as="select"
                  v-model="formData.status"
                  class="form-control form-control-solid"
                  aria-label="Status"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </Field>
                <ErrorMessage name="status" class="text-danger mt-1" />
              </div>
              <!-- Created At -->
              <div class="col-md-6 form-group mb-6">
                <label class="form-label required fs-5 fw-bold text-gray-700 mb-2">
                  Created At
                </label>
                <input
                  type="text"
                  v-model="formData.created_at"
                  class="form-control form-control-solid"
                  readonly
                  aria-label="Created At"
                />
              </div>
            </div>

            <!-- Last Modified -->
            <div class="form-group mb-6">
              <label class="form-label required fs-5 fw-bold text-gray-700 mb-2">
                Last Modified
              </label>
              <input
                type="text"
                v-model="formData.last_modified"
                class="form-control form-control-solid"
                readonly
                aria-label="Last Modified"
              />
            </div>
          </VForm>
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-light"
            data-bs-dismiss="modal"
            aria-label="Close modal"
          >
            Close
          </button>
          <button
            ref="submitButtonRef"
            type="submit"
            form="add_alarm_form"
            :data-kt-indicator="dataLoading ? 'on' : ''"
            class="btn btn-success px-6"
            aria-label="Save alarm"
          >
            <span v-if="!dataLoading" class="indicator-label">Save</span>
            <span v-if="dataLoading" class="indicator-progress">
              Please wait...
              <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import moment from "moment";
import Swal from "sweetalert2";
import { hideModal } from "@/core/helpers/dom";

export default defineComponent({
  name: "add-alarm-modal",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  emits: ["add-alarm"],
  setup(props, { emit }) {
    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const newAddressModalRef = ref<null | HTMLElement>(null);
    const dataLoading = ref(false);

    const devices = ref<string[]>([
      "Sensor A",
      "Sensor B",
      "Sensor C",
      "Sensor D",
      "Motor X",
      "Pump Y",
      "UPS 1",
    ]);

    const formData = ref({
      name: "",
      device_name: "",
      unit_no: "",
      location: "",
      parameter: "",
      alarm_type: "",
      status: "Active",
      severity: "info",
      pv_values: {
        pv1: 0,
        pv2: 0,
        pv3: 0,
        pv4: 0,
        pv5: 0,
        pv6: 0,
      },
      notification_config: {
        sms_numbers: [],
        email_ids: [],
      },
      link: "",
      created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
      last_modified: moment().format("YYYY-MM-DD HH:mm:ss"),
    });

    // String representations for comma-separated inputs
    const smsNumbersString = ref("");
    const emailIdsString = ref("");

    const validationSchema = Yup.object({
      name: Yup.string().required("Alarm Name is required").label("Alarm Name"),
      device_name: Yup.string().required("Device Name is required").label("Device Name"),
      unit_no: Yup.string().required("Unit Number is required").label("Unit Number"),
      location: Yup.string().required("Location is required").label("Location"),
      parameter: Yup.string().required("Parameter is required").label("Parameter"),
      alarm_type: Yup.string().required("Alarm Type is required").label("Alarm Type"),
      severity: Yup.string().required("Severity is required").label("Severity"),
      status: Yup.string().required("Status is required").label("Status"),
    });

    const saveAlarm = async () => {
      dataLoading.value = true;
      try {
        // Process notification strings into arrays
        const smsNumbers = smsNumbersString.value
          .split(',')
          .map(num => num.trim())
          .filter(num => num.length > 0);
        
        const emailIds = emailIdsString.value
          .split(',')
          .map(email => email.trim())
          .filter(email => email.length > 0);

        const newAlarm = {
          ...formData.value,
          notification_config: {
            sms_numbers: smsNumbers,
            email_ids: emailIds,
          },
          id: Math.floor(Math.random() * 10000) + 8, // Generate unique ID for dummy data
        };
        emit("add-alarm", newAlarm);
        Swal.fire({
          title: "Success",
          text: "Alarm added successfully!",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          customClass: { confirmButton: "btn btn-primary" },
        });
        clearFormData();
        hideModal(newAddressModalRef.value);
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "An error occurred while adding the alarm.",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          customClass: { confirmButton: "btn btn-primary" },
        });
      } finally {
        dataLoading.value = false;
      }
    };

    const clearFormData = () => {
      formData.value = {
        name: "",
        device_name: "",
        unit_no: "",
        location: "",
        parameter: "",
        alarm_type: "",
        status: "Active",
        severity: "info",
        pv_values: {
          pv1: 0,
          pv2: 0,
          pv3: 0,
          pv4: 0,
          pv5: 0,
          pv6: 0,
        },
        notification_config: {
          sms_numbers: [],
          email_ids: [],
        },
        link: "",
        created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        last_modified: moment().format("YYYY-MM-DD HH:mm:ss"),
      };
      // Clear string inputs
      smsNumbersString.value = "";
      emailIdsString.value = "";
    };

    return {
      formData,
      saveAlarm,
      submitButtonRef,
      newAddressModalRef,
      clearFormData,
      dataLoading,
      validationSchema,
      devices,
      smsNumbersString,
      emailIdsString,
    };
  },
});
</script>