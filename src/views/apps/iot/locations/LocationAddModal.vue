<template>
  <div
    class="modal fade"
    tabindex="-1"
    id="add_location_modal"
    ref="newAddressModalRef"
    aria-labelledby="addLocationModalLabel"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title" id="addLocationModalLabel">Add New Location</h3>
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
            @submit="saveLocation"
            :validation-schema="validationSchema"
            id="add_location_form"
          >
            <div class="row mb-6">
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
              <!-- Location Name -->
              <div class="col-md-6 form-group mb-6">
                <label class="form-label required fs-5 fw-bold text-gray-700 mb-2">
                  Location Name
                </label>
                <Field
                  name="location_name"
                  v-model="formData.location_name"
                  type="text"
                  class="form-control form-control-solid"
                  placeholder="Enter Location Name"
                  aria-label="Location Name"
                />
                <ErrorMessage name="location_name" class="text-danger mt-1" />
              </div>
            </div>

            <!-- Parent Location Name -->
            <div class="form-group mb-6">
              <label class="form-label fs-5 fw-bold text-gray-700 mb-2">
                Parent Location Name
              </label>
              <Field
                name="parent_location_name"
                v-model="formData.parent_location_name"
                type="text"
                class="form-control form-control-solid"
                placeholder="Enter Parent Location Name (optional)"
                aria-label="Parent Location Name"
              />
              <ErrorMessage name="parent_location_name" class="text-danger mt-1" />
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
            form="add_location_form"
            :data-kt-indicator="dataLoading ? 'on' : ''"
            class="btn btn-success px-6"
            aria-label="Save location"
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
import Swal from "sweetalert2";
import { hideModal } from "@/core/helpers/dom";

export default defineComponent({
  name: "add-location-modal",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  emits: ["add-location"],
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
      device_name: "",
      location_name: "",
      parent_location_name: "",
    });

    const validationSchema = Yup.object({
      device_name: Yup.string().required("Device Name is required").label("Device Name"),
      location_name: Yup.string().required("Location Name is required").label("Location Name"),
      parent_location_name: Yup.string().nullable().label("Parent Location Name"),
    });

    const saveLocation = async () => {
      dataLoading.value = true;
      try {
        const newLocation = {
          ...formData.value,
          id: Math.floor(Math.random() * 10000) + 8, // Generate unique ID for dummy data
        };
        emit("add-location", newLocation);
        Swal.fire({
          title: "Success",
          text: "Location added successfully!",
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
          text: "An error occurred while adding the location.",
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
        device_name: "",
        location_name: "",
        parent_location_name: "",
      };
    };

    return {
      formData,
      saveLocation,
      submitButtonRef,
      newAddressModalRef,
      clearFormData,
      dataLoading,
      validationSchema,
      devices,
    };
  },
});
</script>