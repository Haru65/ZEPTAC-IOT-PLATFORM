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
                  disabled
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
                  disabled
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
              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fw-semobold fw-bold text-gray-700 fs-6 text-nowrap"
                  >Range</label
                >
                <Field
                  type="text"
                  name="ranges"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter Instrument ranges"
                  v-model="itemDetails.ranges"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="ranges" />
                  </div>
                </div>
              </div>

              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                  >Accuracy</label
                >
                <Field
                  type="text"
                  name="accuracy"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter Instrument accuracy"
                  v-model="itemDetails.accuracy"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="accuracy" />
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
          </div>
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <span
              @click="deleteItem"
              class="btn btn-lg btn-danger w-sd-25 w-lg-25"
            >
              Delete
            </span>
            <!--end::Button-->
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <!--begin::Button-->
            <span
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-lg btn-primary w-sd-25 w-lg-25"
              @click="submit()"
            >
              <span v-if="!loading" class="indicator-label"> Update</span>
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
import { defineComponent, onMounted, ref } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import {
  updateThermalInstrument,
  getThermalInstrument,
  deleteThermalInstrument,
  getCompanies,
} from "@/stores/api";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import { useAuthStore } from "@/stores/auth";
import { useRouter, useRoute } from "vue-router";
import ApiService from "@/core/services/ApiService";
import moment from "moment";
import { Identifier } from "@/core/config/WhichUserConfig";


interface itemDetails {
  instrument_id: string;
  name: string;
  availability: string;
  model_no: string;
  serial_no: string;
  make: string;

  calibration_date: string;
  calibration_due_date: string;

  ranges: string;
  accuracy: string;

  company_id: string;
  created_by: number;
  updated_by: number;
  is_active: number;
}

export default defineComponent({
  name: "thermal-instrument-edit",
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
    const Companies = ref([{ id: "", company_name: "" }]);
    let limit = ref(500);
    const itemId = route.params.id;

    const itemDetailsValidator = Yup.object().shape({
      instrument_id: Yup.string().required().label("Instrument ID"),
      name: Yup.string().required().label("Instrument Name"),
      model_no: Yup.string().required().label("Model No."),
      serial_no: Yup.string().required().label("Serial No."),
      make: Yup.string().required().label("Made by"),
      calibration_date: Yup.string().required().label("Calibration Date"),
      calibration_due_date: Yup.string()
        .required()
        .label("Calibration Due Date"),
      ranges: Yup.string().required().label("Range"),
      accuracy: Yup.string().required().label("Accuracy"),
    });

    const getdropcomp = async () => {
      ApiService.setHeader();
      const response = await getCompanies(`limit=${limit.value}`);
      Companies.value.push(
        ...response.result.data.data.map(({ created_at, ...rest }) => ({
          ...rest,
          created_at: moment(created_at).format("MMMM Do YYYY"),
        }))
      );
    };

    const itemDetails = ref<itemDetails>({
      instrument_id: "",
      name: "",
      availability: "",
      model_no: "",
      serial_no: "",
      make: "",
      calibration_date: "",
      calibration_due_date: "",

      ranges: "",
      accuracy: "",

      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
      is_active: 1,
    });

    onMounted(async () => {
      Companies.value.pop();
      let response = await getThermalInstrument(itemId.toString());
      console.log(response);

      itemDetails.value = {
        instrument_id: response.instrument_id,
        name: response.name,
        availability: response.availability,
        model_no: response.model_no,
        serial_no: response.serial_no,
        make: response.make,

        calibration_date: response.calibration_date,
        calibration_due_date: response.calibration_due_date,

        ranges: response.ranges,
        accuracy: response.accuracy,

        company_id: response.company_id ? response.company_id : "",
        created_by: response.created_by,
        updated_by: response.updated_by,
        is_active: response.is_active,
      };
      if (User.role_id === 1) {
        await getdropcomp();
      }
    });

    function areAllPropertiesNull(array) {
      return array.some((detail) => {
        const {
          name,
          model_no,
          serial_no,
          make,
          calibration_date,
          calibration_due_date,
          ranges,
          accuracy,
        } = detail;

        // Check if any property is null or empty

        return (
          name === "" ||
          model_no === "" ||
          serial_no === "" ||
          make === "" ||
          calibration_date === null ||
          calibration_due_date === null ||
          ranges === "" ||
          accuracy === ""
        );
      });
    }

    const submit = async () => {
      loading.value = true;
      const result = areAllPropertiesNull([itemDetails.value]);

      if (result) {
        showErrorAlert("Warning", "Please Fill the Form Fields Correctly");

        loading.value = false;
        return;
      }

      console.warn("Nice");
      try {
        itemDetails.value.calibration_date = moment(
          itemDetails.value.calibration_date
        ).format("YYYY-MM-DD");
        itemDetails.value.calibration_due_date = moment(
          itemDetails.value.calibration_due_date
        ).format("YYYY-MM-DD HH:mm:ss");
        // Call your API here with the form values
        const response = await updateThermalInstrument(
          itemId,
          itemDetails.value
        );
        console.log(response.result.error);
        if (!response.result.error) {
          // Handle successful API response
          console.log("API response:", response);
          showSuccessAlert(
            "Success",
            "Instrument has been successfully updated!"
          );
          router.push({ name: "thermal-instrument-list" });
        } else {
          // Handle API error response
          const errorData = response.result.error;
          console.log("API error:", errorData);
          // console.log("API error:", errorData.response.result.data.errors);
          showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
        }
      } catch (error) {
        // Handle any other errors during API call
        console.error("API call error:", error);
        showErrorAlert("Error", "An error occurred during the API call.");
      } finally {
        loading.value = false;
      }
    };

    const deleteItem = () => {
      Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover from this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "red",
        confirmButtonText: "Yes, I am sure!",
      }).then((result: { [x: string]: any }) => {
        if (result["isConfirmed"]) {
          // Put your function here
          deleteThermalInstrument(itemId);
          router.push({ name: "thermal-instrument-list" });
        }
      });
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
      itemDetailsValidator,
      submit,
      loading,
      Companies,
      deleteItem,
      identifier,
      User,
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
