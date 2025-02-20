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
                    :to="`/calibration-srf/edit/${itemDetails.service_request_id}/${itemDetails.company_id}`"
                    class="btn btn-sm btn-dark btn-outline"
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
                          {{ itemDetails.ranges_from || "" }} to
                          {{ itemDetails.ranges_to || "" }}
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
                      :label="item.instrument_id"
                      :value="item.id"
                    />
                  </el-select>
                </div>
                <!--end::Col-->
              </div>

              <div class="modal-footer flex-start w-100 mb-6">
                <button
                  type="button"
                  ref="submitButtonRef"
                  @click="submit"
                  class="btn btn-sm btn-info"
                >
                  <span class="indicator-label"> Submit </span>
                  <span class="indicator-progress">
                    Please wait...
                    <span
                      class="spinner-border spinner-border-sm align-middle ms-2"
                    ></span>
                  </span>
                </button>
              </div>
            </div>
            <!--end::Card body-->

            <!--end::Input group-->
          </div>
          <!--end::Customer-->
        </form>
        <!--end::Form-->
      </div>
      <!--end::Content-->
    </div>

    <div class="d-flex flex-column flex-lg-row">
      <div
        class="flex-lg-row-fluid me-lg-6 order-2 order-lg-1 mb-10 mb-lg-0 bg-body rounded"
      >
        <div class="card-body border-top p-sd-2 p-lg-9">
          <div class="card-body pt-3">
            <!-- Tab Content -->
            <div class="tab-content mt-4">
              <component
                :is="ElectroReadingTable"
                :parameter="parameters[activeTab]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import ElectroReadingTable from "./subparams/ElectroReadingTable.vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import {
  getCalibrationInstrument,
  getReferenceInstruments,
  updateCalibrationInstrument,
} from "@/stores/api";
import { useRoute, useRouter } from "vue-router";
import ApiService from "@/core/services/ApiService";

interface Item {
  id: string;
  instrument_id: string;
  name: string;
  parameter: string;

  model_no: string;
  serial_no: string;
  make: string;

  calibration_date: string;
  calibration_due_date: string;

  location: string;

  ranges_from: string;
  ranges_to: string;
  accuracy: string;
  resolution: string;

  calibration_points: string;
  periodicity: string;

  temp: string;
  rh: string;

  instrument_condition: string;
  remark: string;

  reference_instrument_id: string;
  service_request_id: string;

  company_id: string;
  is_active: number;
}

export default defineComponent({
  name: "electro-instrument",
  components: { ElectroReadingTable },
  setup() {
    const loading = ref(false);
    const router = useRouter();
    const route = useRoute();
    const itemId = route.params.id;

    const submitButtonRef = ref<null | HTMLButtonElement>(null);

    const parameters = ref([
      { id: 1, name: "Low Voltage DC", unit: "mV" },
      { id: 2, name: "AC Voltage (50Hz)", unit: "V" },
      { id: 3, name: "DC Voltage", unit: "V" },
      { id: 4, name: "AC Current", unit: "A" },
      { id: 5, name: "DC Current", unit: "A" },
      { id: 6, name: "Resistance (Kohms)", unit: "Kohms" },
      { id: 7, name: "Resistance (Mohms)", unit: "Mohms" },
      { id: 8, name: "Resistance (ohms)", unit: "ohms" },
      { id: 9, name: "DC (mA)", unit: "mA" },
      { id: 10, name: "AC (mA) (50Hz)", unit: "mA" },
      { id: 11, name: "DC (µA)", unit: "µA" },
    ]);

    const activeTab = ref(0);

    const ReferenceInstruments = ref([{ id: "", name: "", instrument_id: "" }]);
    const itemDetails = ref<Item>({
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

      ranges_from: "",
      ranges_to: "",
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
      }
    });

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
        if (validateForm(itemDetails.value)) {
          const response = await updateCalibrationInstrument(
            itemId,
            itemDetails.value
          );

          if (response?.success) {
            console.log("im here");
            showSuccessAlert(
              "Success",
              response.message ||
                "Calibration Instrument Reading has been successfully updated!"
            );
            loading.value = false;

            router.push({
              name: "calibration-srf-edit",
              params: {
                id: itemDetails.value.service_request_id,
                company_id: itemDetails.value.company_id,
              },
            });
            console.log("not reached");
          } else {
            showErrorAlert("Error", response.message || "An error occurred.");
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
      submitButtonRef,
      itemDetails,
      submit,
      activeTab,
      parameters,
      ElectroReadingTable,
      ReferenceInstruments,
    };
  },
});
</script>
