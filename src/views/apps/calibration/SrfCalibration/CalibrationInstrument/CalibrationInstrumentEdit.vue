<template>
  <div class="m-6 rounded">
    <div class="d-flex flex-column flex-lg-row">
      <!--begin::Content-->
      <div class="flex-lg-row-fluid me-lg-6 order-2 order-lg-1 mb-10 mb-lg-0">
        <!--begin::Form-->
        <form class="form" action="#" id="kt_subscriptions_create_new">
          <!--begin::Customer-->
          <div class="card card-flush pt-3 mb-5 mb-lg-10">
            <!--begin::Card header-->
            <div class="card-header">
              <!--begin::Card title-->
              <div class="card-title">
                <h2 class="fw-bold">Instrument</h2>
              </div>
              <!--begin::Card title-->

              <!--begin::Card toolbar-->
              <div class="card-toolbar">
                <!--begin::Toolbar-->
                <div
                  class="d-flex justify-content-end"
                  data-kt-customer-table-toolbar="base"
                >
                  <!--begin::Add customer-->
                  <router-link
                    :to="`/calibration-srf/edit/${itemDetails.service_request_id}`"
                    class="btn btn-primary"
                  >
                    <KTIcon icon-name="arrow-left" icon-class="fs-2" />
                    Back
                  </router-link>
                  <!--end::Add customer-->
                  <!--end::Add customer-->
                </div>
                <!--end::Toolbar-->
              </div>
              <!--end::Card toolbar-->
            </div>
            <!--end::Card header-->

            <!--begin::Card body-->
            <div class="card-body pt-3">
              <!--begin::Section-->
              <div class="mb-10">
                <!--begin::Details-->
                <div class="d-flex flex-wrap py-5">
                  <!--begin::Row-->
                  <div class="flex-equal me-5">
                    <!--begin::Details-->
                    <table class="table fs-6 fw-semobold gs-0 gy-2 gx-2 m-0">
                      <!--begin::Row-->
                      <tr>
                        <td class="text-gray-600 min-w-175px w-175px">
                          Instrument Name:
                        </td>
                        <td class="text-gray-800 min-w-175px">
                          {{ itemDetails.name || "" }}
                        </td>
                      </tr>
                      <!--end::Row-->

                      <!--begin::Row-->
                      <tr>
                        <td class="text-gray-600">Instrument Id:</td>
                        <td class="text-gray-800">
                          {{ itemDetails.instrument_id || "" }}
                        </td>
                      </tr>
                      <!--end::Row-->

                      <!--begin::Row-->
                      <tr>
                        <td class="text-gray-600">Model No:</td>
                        <td class="text-gray-800">
                          {{ itemDetails.model_no || "" }}
                        </td>
                      </tr>
                      <!--end::Row-->

                      <!--begin::Row-->
                      <tr>
                        <td class="text-gray-600">Serial No:</td>
                        <td class="text-gray-800">
                          {{ itemDetails.serial_no || "" }}
                        </td>
                      </tr>
                      <!--end::Row-->

                      <!--begin::Row-->
                      <tr>
                        <td class="text-gray-600">Make By:</td>
                        <td class="text-gray-800">
                          {{ itemDetails.make || "" }}
                        </td>
                      </tr>
                      <!--end::Row-->
                      <!--begin::Row-->
                      <tr>
                        <td class="text-gray-600">Calibration Date:</td>
                        <td class="text-gray-800">
                          {{ itemDetails.calibration_date || "" }}
                        </td>
                      </tr>
                      <!--end::Row-->
                      <!--begin::Row-->
                      <tr>
                        <td class="text-gray-600">Calibration Due:</td>
                        <td class="text-gray-800">
                          {{ itemDetails.calibration_due_date || "" }}
                        </td>
                      </tr>
                      <!--end::Row-->
                    </table>
                    <!--end::Details-->
                  </div>
                  <!--end::Row-->

                  <!--begin::Row-->
                  <div class="flex-equal">
                    <!--begin::Details-->
                    <table class="table fs-6 fw-semobold gs-0 gy-2 gx-2 m-0">
                      <!--begin::Row-->
                      <tr>
                        <td class="text-gray-600 min-w-175px w-175px">
                          Parameter:
                        </td>
                        <td class="text-gray-800 min-w-175px">
                          {{ itemDetails.parameter || "" }}
                        </td>
                      </tr>
                      <!--end::Row-->

                      <!--begin::Row-->
                      <tr>
                        <td class="text-gray-600">Range:</td>
                        <td class="text-gray-800">
                          {{ itemDetails.ranges || "" }}
                        </td>
                      </tr>
                      <!--end::Row-->
                      <!--begin::Row-->
                      <tr>
                        <td class="text-gray-600">Accuracy:</td>
                        <td class="text-gray-800">
                          {{ itemDetails.accuracy || "" }}
                        </td>
                      </tr>
                      <!--end::Row-->
                      <!--begin::Row-->
                      <tr>
                        <td class="text-gray-600">Resolution:</td>
                        <td class="text-gray-800">
                          {{ itemDetails.resolution || "" }}
                        </td>
                      </tr>
                      <!--end::Row-->

                      <!--begin::Row-->
                      <tr>
                        <td class="text-gray-600">Location:</td>
                        <td class="text-gray-800">
                          {{ itemDetails.location || "" }}
                        </td>
                      </tr>
                      <!--end::Row-->
                      <!--begin::Row-->
                      <tr>
                        <td class="text-gray-600">Temperature:</td>
                        <td class="text-gray-800">
                          {{ itemDetails.temp || "" }} &deg; C
                        </td>
                      </tr>
                      <!--end::Row-->
                      <!--begin::Row-->
                      <tr>
                        <td class="text-gray-600">Humidity:</td>
                        <td class="text-gray-800">
                          {{ itemDetails.rh || "" }} % RH
                        </td>
                      </tr>
                      <!--end::Row-->
                    </table>
                    <!--end::Details-->
                  </div>
                  <!--end::Row-->
                </div>
                <!--end::Row-->
              </div>
              <!--end::Section-->

              <!--begin::Card title-->
              <div class="card-title">
                <h2 class="fw-bold">Master Instrument</h2>
              </div>
              <!--begin::Card title-->

              <div class="row mb-6">
                <!--begin::Label-->
                <label
                  class="col-lg-3 col-form-label required fs-5 fw-bold text-gray-700 text-wrap mb-2"
                  >Attach Reference Instrument</label
                >
                <!--end::Label-->

                <!--begin::Col-->
                <div class="col-lg-9 fv-row">
                  <el-select
                    v-model="itemDetails.reference_instrument_id"
                    filterable
                    placeholder="Select Master Instrument..."
                  >
                    <el-option
                      key=""
                      disabled="disabled"
                      value=""
                      label="Select Master Instrument..."
                    >
                    Select Master Instrument
                    </el-option>
                    <el-option
                      v-for="item in ReferenceInstruments"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </div>
                <!--end::Col-->
              </div>
            </div>
            <!--end::Card body-->
          </div>
          <!--end::Customer-->
        </form>
        <!--end::Form-->
      </div>
      <!--end::Content-->
    </div>

    <div class="d-flex flex-column flex-lg-row">
      <!--begin::Content-->
      <div
        class="flex-lg-row-fluid me-lg-6 order-2 order-lg-1 mb-10 mb-lg-0 bg-body rounded"
      >
        <VForm
          id="kt_account_profile_details_form"
          class="form"
          novalidate
          :validation-schema="itemDetailsValidator"
        >
          <!--begin::Card body-->
          <div class="card-body border-top p-sd-2 p-lg-9">
            <!--begin::Input group-->

            <!-- Tabs Navigation -->
            <ul class="nav nav-tabs mb-3 fs-4" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link active"
                  id="downFlowVelocity-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#downFlowVelocity"
                  type="button"
                  role="tab"
                  aria-controls="downFlowVelocity"
                  aria-selected="true"
                >
                  UUC Readings
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
                  Uncertainity Readings
                </button>
              </li>
            </ul>

            <!-- Tabs Content -->
            <div class="tab-content" id="myTabContent">
              <div
                class="tab-pane fade show active"
                id="downFlowVelocity"
                role="tabpanel"
                aria-labelledby="downFlowVelocity-tab"
              >
                <div class="row mb-6">
                  <div class="container-fluid">
                    <div class="alert alert-primary mt-2">
                      <h3>UUC Readings in psi</h3>
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
                        <th class="col-1">#</th>
                        <th class="col-2">Range of UUC in psi</th>
                        <th class="col-2">UUC Reading</th>
                        <th class="col-2">I1 psi (&#8593;)</th>
                        <th class="col-2">D1 psi (&#8595;)</th>
                        <th class="col-2">I2 psi (&#8593;)</th>
                        <th class="col-2">D2 psi (&#8595;)</th>
                        <th class="col-2">Mean</th>
                        <th class="col-2">Action</th>
                      </tr>
                    </thead>
                    <tbody class="text-center justify-content-center">
                      <tr
                        v-for="(data, index) in itemDetails.reading_data"
                        :key="index"
                      >
                        <td>
                          <span
                            class="form-control form-control-lg form-control-transparent"
                          >
                            {{ index + 1 }}
                          </span>
                        </td>
                        <td>
                          <input
                            type="text"
                            :name="'ranges' + index"
                            class="form-control form-control-lg form-control-solid min-w-100px"
                            placeholder="0 to 100..."
                            v-model="data.ranges"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            :name="'uuc_reading' + index"
                            class="form-control form-control-lg form-control-solid min-w-100px"
                            placeholder="0"
                            v-model="data.uuc_reading"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            :name="'l1_up' + index"
                            class="form-control form-control-lg form-control-solid min-w-100px"
                            placeholder="0"
                            v-model="data.l1_up"
                            @keyup="setUUCReadings($event, index, 'l1_up')"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            :name="'d1_down' + index"
                            class="form-control form-control-lg form-control-solid min-w-100px"
                            placeholder="0"
                            v-model="data.d1_down"
                            @keyup="setUUCReadings($event, index, 'd1_down')"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            :name="'l2_up' + index"
                            class="form-control form-control-lg form-control-solid min-w-100px"
                            placeholder="0"
                            v-model="data.l2_up"
                            @keyup="setUUCReadings($event, index, 'l2_up')"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            :name="'d2_down' + index"
                            class="form-control form-control-lg form-control-solid min-w-100px"
                            placeholder="0"
                            v-model="data.d2_down"
                            @keyup="setUUCReadings($event, index, 'd2_down')"
                          />
                        </td>
                        <td>
                          <div
                            class="form-control form-control-lg form-control-transparent min-w-100px"
                          >
                            {{ data.mean_value ? data.mean_value : "" }}
                          </div>
                        </td>
                        <td>
                          <div class="d-flex flex-lg-row my-3">
                            <!--begin::Delete-->
                            <span
                              @click="removeReading(index)"
                              class="btn btn-icon btn-active-light-danger w-30px h-30px me-3"
                              data-bs-toggle="tooltip"
                              title="Delete Row"
                            >
                              <KTIcon icon-name="trash" icon-class="fs-2" />
                            </span>
                            <!--end::Delete-->
                          </div>
                        </td>
                      </tr>
                      <tr
                        class="text-center"
                        v-if="itemDetails.reading_data.length === 0"
                      >
                        <td
                          colspan="9"
                          class="fw-semibold fs-6 text-gray-800 border-bottom border-gray-200 text-align-center"
                        >
                          No Readings.
                        </td>
                      </tr>
                    </tbody>
                    <div class="text-start">
                      <div class="d-flex flex-lg-row mt-6">
                        <!--begin::Add-->
                        <span
                          @click="addReading"
                          class="btn btn-icon btn-primary rounded-circle w-40px h-40px me-3"
                          data-bs-toggle="tooltip"
                          title="Add Row"
                        >
                          <KTIcon icon-name="plus" icon-class="fs-2" />
                        </span>
                        <!--end::Add-->
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
                      <h3>Uncertanity Calculation (COMMING SOON)</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer flex-center w-100 mb-6">
            <!--begin::Button-->
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
      </div>

      <!--end::Content-->
    </div>
  </div>
</template>
            
<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import {
  getCalibrationInstrument,
  getReferenceInstruments,
  updateCalibrationInstrument,
  updateLAFReport,
} from "@/stores/api";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import { Identifier } from "@/core/config/WhichUserConfig";
import { useAuthStore } from "@/stores/auth";
import { useRouter, useRoute } from "vue-router";
import ApiService from "@/core/services/ApiService";
import moment from "moment";

export default defineComponent({
  name: "calibration-instrument-edit",
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

    const itemId = route.params.id;

    const ReferenceInstruments = ref([{ id: "", name: "" }]);

    const itemDetailsValidator = Yup.object().shape({});

    const itemDetails = ref({
      id: "",
      instrument_id: "",
      name: "",
      parameter: "",

      model_no: "",
      serial_no: "",
      make: "",

      calibration_date: "",
      calibration_due_date: "",

      location: "",

      ranges: "",
      accuracy: "",
      resolution: "",

      calibration_points: "",
      periodicity: "",

      temp: "",
      rh: "",

      instrument_condition: "",
      remark: "",
      reference_instrument_id: "",

      service_request_id: "",

      reading_data: [
        {
          ranges: "",
          uuc_reading: "",
          l1_up: "",
          l2_up: "",
          d1_down: "",
          d2_down: "",
          mean_value: 0,
        },
      ],

      company_id: "",
      is_active: 1,
    });

    const GetMasterInstruments = async () => {
      ApiService.setHeader();
      const response = await getReferenceInstruments(`fetchAll=true`);
      if (response.result != null && response.result) {
        ReferenceInstruments.value.push(
          ...response.result?.map(({ ...rest }) => ({
            ...rest,
          }))
        );
        // console.log(Companies);
      }
    };

    onMounted(async () => {

      ReferenceInstruments.value = [];

      await GetMasterInstruments();

      let response = await getCalibrationInstrument(itemId.toString());
      console.log(response);

      if (response.success) {
        itemDetails.value = { ...response.result };
        itemDetails.value.reading_data = response.result.reading_data
          ? JSON.parse(response.result.reading_data)
          : [];
      }
    });

    // Function to calculate the mean
    function calculateMean(data) {
      const { l1_up, l2_up, d1_down, d2_down } = data;
      const L1_UP = Number(l1_up);
      const L2_UP = Number(l2_up);
      const D1_DOWN = Number(d1_down);
      const D2_DOWN = Number(d2_down);

      const average = (L1_UP + L2_UP + D1_DOWN + D2_DOWN) / 4;
      return Number(average.toFixed(5));
    }

    /* UUC READING LOGIC */

    // Set Readings data
    async function setUUCReadings(e, index, l) {
      itemDetails.value.reading_data[index][l] = await e.target.value;
      const average = calculateMean(itemDetails.value.reading_data[index]);
      itemDetails.value.reading_data[index].mean_value = average;
    }

    // add DownFlow
    const addReading = () => {
      itemDetails.value.reading_data.push({
        ranges: "",
        uuc_reading: "",
        l1_up: "",
        l2_up: "",
        d1_down: "",
        d2_down: "",
        mean_value: 0,
      });
    };

    // remove DownFlow
    const removeReading = async (index) => {
      if (index != null) {
        itemDetails.value.reading_data.splice(index, 1);
      }
    };

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
      if (
        itemDetails.value.reference_instrument_id == "" ||
        itemDetails.value.reference_instrument_id == null
      ) {
        showErrorAlert("Error", "Please Select Reference Instrument.");
        return;
      }

      loading.value = true;

      console.log(itemDetails.value);
      try {
        if (validateForm(itemDetails.value.reading_data)) {
          const response = await updateCalibrationInstrument(
            itemId,
            itemDetails.value
          );

          if (response.success) {
            showSuccessAlert(
              "Success",
              "Calibration Instrument Reading has been successfully updated!"
            );
            loading.value = false;
            router.push({
              name: "calibration-srf-edit",
              params: {
                id: itemDetails.value.service_request_id,
              },
            });
          } else {
            showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
            loading.value = false;
            return;
          }
        } else {
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
      ReferenceInstruments,
      itemDetailsValidator,
      getAssetPath,
      submit,
      loading,

      addReading,
      removeReading,
      setUUCReadings,
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