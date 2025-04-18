<template>
  <div style="width: 99%" class="bg-body p-4 rounded">
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
          @submit="submit"
        >
          <!--begin::Card body-->
          <div class="card-body p-4">
            <!--begin::Input group-->
            <!-- Company Select (Admin Only) -->
            <div class="row g-6 mb-4" v-if="identifier == 'Admin'">
              <div class="col-lg-8 col-md-6">
                <label class="form-label required fw-semibold">Company</label>
                <el-select
                  v-model="itemDetails.company_id"
                  filterable
                  placeholder="Select Company"
                  class="w-100 form-control-solid"
                >
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
            </div>

            <!-- Instrument Details Row -->
            <div class="row g-6 mb-4">
              <div class="col-lg-4 col-md-6 col-12">
                <label class="form-label required fw-semibold"
                  >Instrument Id</label
                >
                <div class="form-control form-control-lg form-control-solid">
                  {{ itemDetails.instrument_id ?? "" }}
                </div>
              </div>

              <div class="col-lg-4 col-md-6 col-12">
                <label class="form-label required fw-semibold"
                  >Instrument Name</label
                >
                <Field
                  type="text"
                  name="name"
                  class="form-control form-control-solid"
                  placeholder="Enter Instrument Name"
                  v-model="itemDetails.name"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="name" />
                  </div>
                </div>
              </div>

              <div class="col-lg-4 col-md-6 col-12">
                <label class="form-label required fw-semibold">Make</label>
                <Field
                  type="text"
                  name="make"
                  class="form-control form-control-solid"
                  placeholder="Instrument made by..."
                  v-model="itemDetails.make"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="make" />
                  </div>
                </div>
              </div>

              <div class="col-lg-4 col-md-6 col-12">
                <label class="form-label required fw-semibold">Model No.</label>
                <Field
                  type="text"
                  name="model_no"
                  class="form-control form-control-solid"
                  placeholder="Enter Instrument Model No."
                  v-model="itemDetails.model_no"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="model_no" />
                  </div>
                </div>
              </div>

              <div class="col-lg-4 col-md-6 col-12">
                <label class="form-label required fw-semibold"
                  >Serial No.</label
                >
                <Field
                  type="text"
                  name="serial_no"
                  class="form-control form-control-solid"
                  placeholder="Enter Instrument Serial No."
                  v-model="itemDetails.serial_no"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="serial_no" />
                  </div>
                </div>
              </div>

              <div class="col-lg-4 col-md-6 col-12">
                <label class="form-label required fw-semibold">Range</label>
                <Field
                  type="text"
                  name="ranges"
                  class="form-control form-control-solid"
                  placeholder="Enter Instrument ranges"
                  v-model="itemDetails.ranges"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="ranges" />
                  </div>
                </div>
              </div>

              <div class="col-lg-4 col-md-6 col-12">
                <label class="form-label required fw-semibold">Accuracy</label>
                <Field
                  type="text"
                  name="accuracy"
                  class="form-control form-control-solid"
                  placeholder="Enter Instrument accuracy"
                  v-model="itemDetails.accuracy"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="accuracy" />
                  </div>
                </div>
              </div>

              <div class="col-lg-4 col-md-6 col-12">
                <label class="form-label required fw-semibold"
                  >Calibration Date</label
                >
                <el-date-picker
                  type="date"
                  name="calibration_date"
                  v-model="itemDetails.calibration_date"
                  placeholder="Select date"
                  @change="setDates($event, 'calibration_date')"
                  class="w-100 form-control-solid"
                  :editable="false"
                />
              </div>

              <div class="col-lg-4 col-md-6 col-12">
                <label class="form-label required fw-semibold"
                  >Calibration Due Date</label
                >
                <el-date-picker
                  type="date"
                  name="calibration_due_date"
                  v-model="itemDetails.calibration_due_date"
                  placeholder="Select date"
                  @change="setDates($event, 'calibration_due_date')"
                  class="w-100 form-control-solid"
                  :editable="false"
                />
              </div>
            </div>
          </div>
          <div class="modal-footer flex-center mt-6">
            <!--begin::Button-->
            <button
              type="button"
              @click="deleteItem"
              class="btn btn-lg btn-danger w-sd-25 w-lg-25"
            >
              Delete
            </button>
            <!--end::Button-->
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <!--begin::Button-->
            <button
              type="submit"
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-lg btn-primary w-sd-25 w-lg-25"
            >
              <span v-if="!loading" class="indicator-label"> Update</span>
              <span v-if="loading" class="indicator-progress">
                Please wait...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </button>
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
      name: Yup.string().required().label("Instrument Name"),
      model_no: Yup.string().required().label("Model No."),
      serial_no: Yup.string().required().label("Serial No."),
      make: Yup.string().required().label("Made by"),
      ranges: Yup.string().required().label("Range"),
      accuracy: Yup.string().required().label("Accuracy"),
    });

    const getdropcomp = async () => {
      try {
        ApiService.setHeader();
        const response = await getCompanies(`fetchAll=true`);

        if (response.success) {
          if (response.result != null && response.result) {
            Companies.value.push(
              ...response.result?.map(({ ...rest }) => ({
                ...rest,
              }))
            );
          }
        } else {
          console.error(
            `Error Occured in getCompanies : ${
              response.message || "Error Occured in API"
            }`
          );
        }
      } catch (err) {
        console.error(`Error Occured in getCompanies : ${err}`);
      }
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

      try {
        let response = await getThermalInstrument(itemId.toString());

        if (response.success) {
          itemDetails.value = {
            instrument_id: response.result.instrument_id,
            name: response.result.name,
            availability: response.result.availability,
            model_no: response.result.model_no,
            serial_no: response.result.serial_no,
            make: response.result.make,

            calibration_date: response.result.calibration_date,
            calibration_due_date: response.result.calibration_due_date,

            ranges: response.result.ranges,
            accuracy: response.result.accuracy,

            company_id: response.result.company_id
              ? response.result.company_id
              : "",
            created_by: response.result.created_by,
            updated_by: response.result.updated_by,
            is_active: response.result.is_active,
          };
        } else {
          console.error(
            `Error Occured in getThermalInstrument : ${
              response.message || "Error Occured in API"
            }`
          );
        }
      } catch (err) {
        console.error(`Error Occured in getThermalInstrument : ${err}`);
      }

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
          calibration_date === "" ||
          calibration_due_date === "" ||
          ranges === "" ||
          accuracy === ""
        );
      });
    }

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

      console.log(dateType, " ", itemDetails.value[dateType]);
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
        // Call your API here with the form values
        const response = await updateThermalInstrument(
          itemId,
          itemDetails.value
        );

        if (response.success) {
          // Handle successful API response
          showSuccessAlert(
            "Success",
            response.message || "Instrument has been successfully updated!"
          );
          router.push({ name: "thermal-instrument-list" });
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
      setDates,
    };
  },
});
</script>
