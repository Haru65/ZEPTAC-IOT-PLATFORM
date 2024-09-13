<template>
  <!--begin::Modal - New Address-->
  <div
    class="modal fade"
    ref="newAddressModalRef"
    id="kt_modal_calibration_instrument_import"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    data-bs-focus="false"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-1000px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Form-->
        <VForm class="form" id="kt_modal_new_address_form" @submit="submit">
          <!--begin::Modal header-->
          <div class="modal-header" id="kt_modal_new_address_header">
            <!--begin::Modal title-->
            <h2>Import Calibration Instruments</h2>
            <!--end::Modal title-->

            <!--begin::Close-->
            <div
              class="btn btn-sm btn-icon btn-active-color-primary"
              data-bs-dismiss="modal"
            >
              <KTIcon icon-name="cross" icon-class="fs-1" />
            </div>
            <!--end::Close-->
          </div>
          <!--end::Modal header-->

          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-10">
            <!--begin::Scroll-->
            <div
              class="scroll-y me-n7 pe-7"
              id="kt_modal_new_address_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              style="max-height: 100% !important"
              data-kt-scroll-dependencies="#kt_modal_new_address_scroll"
              data-kt-scroll-wrappers="#kt_modal_new_address_scroll"
              data-kt-scroll-offset="auto"
            >
              <div class="row mb-6">
                <a
                  target="blank"
                  :href="`https://api.zeptac.com/storage/SampleInstrumentData.xlsx`"
                >
                  <u class="fs-5">Click here to Download Sample File</u>
                </a>
              </div>
              <div class="row mb-6">
                <div class="form-group col-md-12 mb-8 mb-sd-8">
                  <label
                    class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap"
                    >Upload Excel File (.xlsx only)
                  </label>
                  <label
                    class="btn btn-outline btn-outline-dashed btn-outline-default p-10 d-flex align-items-center position-relative"
                  >
                    <i
                      class="bi bi-upload position-absolute fs-1 top-50 start-50 translate-middle"
                    ></i>
                    <input
                      type="file"
                      accept=".xlsx"
                      @change="handleChange"
                      class="position-absolute top-0 start-0 end-0 bottom-0 opacity-0 w-100 h-100"
                    />
                  </label>
                </div>
              </div>

              <div class="container" v-if="instrumentData.data.length != 0">
                <div class="row">
                  <div class="col-12">
                    <div class="card-box">
                      <div class="row">
                        <div class="col-lg-6 col-xl-6">
                          <h4 class="header-title m-b-30">Uploaded Data</h4>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-lg-12">
                          <div class="shadow overflow-auto">
                            <div
                              class="table-responsive mt-6"
                              style="max-height: 300px"
                            >
                              <table
                                class="table table-rounded table-bordered border gy-4 gs-4 position-relative"
                              >
                                <thead>
                                  <tr
                                    class="fw-semibold fs-6 text-gray-700 border-bottom border-gray-200"
                                  >
                                    <th>Sr.No</th>
                                    <th>Name</th>
                                    <th>Make</th>
                                    <th>Model no.</th>
                                    <th>Serial no.</th>
                                    <th>Range</th>
                                    <th>Accuracy</th>
                                    <th>Calibration Date</th>
                                    <th>Calibration Due Date</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr
                                    v-for="(r, index) in instrumentData.data"
                                    :key="index"
                                  >
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ r.name }}</td>
                                    <td>{{ r.make }}</td>
                                    <td>{{ r.model_no }}</td>
                                    <td>{{ r.serial_no }}</td>
                                    <td>{{ r.ranges_from }} to {{ r.ranges_to }}</td>
                                    <td>{{ r.accuracy }}</td>
                                    <td>{{ r.calibration_date }}</td>
                                    <td>{{ r.calibration_due_date }}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- end col -->
                </div>
                <!-- end row -->
              </div>
            </div>
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->

          <!--begin::Modal footer-->
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <button
              :data-kt-indicator="loading2 ? 'on' : null"
              ref="submitButtonRef"
              id="kt_modal_new_address_submit"
              class="btn btn-primary"
            >
              <span v-if="!loading2" class="indicator-label"> Submit </span>
              <span v-if="loading2" class="indicator-progress">
                Please wait...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </button>
            <!--end::Button-->
          </div>
          <!--end::Modal footer-->
        </VForm>
        <!--end::Form-->
      </div>
    </div>
  </div>
  <!--end::Modal - New Address-->
</template>
    
    <script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { hideModal } from "@/core/helpers/dom";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";
import * as xlsx from "xlsx";
import moment from "moment";
import { processCalibrationInstruments } from "@/stores/api";
import { User } from "@/core/services/JwtService";

interface NewAddressData {}

interface itemDetails {
  data: Array<readingsData>;
  service_request_id: string;
  company_id: string;
}

interface readingsData {
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

  temp: string;
  rh: string;

  calibration_points: string; // optional
  periodicity: string;

  instrument_condition: string; // ok or damaged
  remark: string; // based on instrument_condition remark is given

  reference_instrument_id: string;
  service_request_id: string;

  company_id: string;
  is_active: number;
}

export default defineComponent({
  name: "calibration-instrument-import-modal",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  emits: [],

  props: ["data"],

  setup(props, { emit }) {
    const loading2 = ref(false);
    const router = useRouter();

    // GLOBAL ATTRIBUTES FOR THERMAL INSTRUMENTS (EXCEL DATA)
    const range = "A1:H100";

    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const newAddressModalRef = ref<null | HTMLElement>(null);
    const newAddressData = ref<NewAddressData>({});

    const instrumentData = ref<itemDetails>({
      data: [],
      company_id: props.data.company_id,
      service_request_id: props.data.service_request_id,
    });

    const handleChange = async (e) => {
      console.log(e);
      let fileInput = e.target;
      const file = e.target.files[0];

      // Validate file type (stricter check for .xlsx)
      if (
        !file ||
        !file.type.endsWith(
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        )
      ) {
        alert("Please select an XLSX (.xlsx) file.");
        fileInput.value = "";
        return;
      }

      try {
        const rows = ref([]);
        const ReadingsData = ref<readingsData[]>([]);

        // Read the file as ArrayBuffer
        const arrayBuffer = await file.arrayBuffer();

        // Use `XLSX` library to parse the workbook
        const wb = xlsx.read(arrayBuffer, { type: "array" });

        console.log(wb);

        /* Update data with records from the specified range */
        rows.value = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {});

        // Mapping with error handling (without filtering)

        // maaping the data in particular format
        ReadingsData.value = rows.value.map(
          (item: { [key: string]: any }, index) => {
            return {
              id: index,
              instrument_id: item["instrument_id"],
              parameter: item["parameter"],
              name: item["name"],
              make: item["make"],
              model_no: item["model_no"],
              serial_no: item["serial_no"],

              location: item["location"],
              temp: item["temp"],
              rh: item["rh"],

              ranges_from: item["ranges_from"],
              ranges_to: item["ranges_to"],
              accuracy: item["accuracy"],
              resolution: item["resolution"],

              calibration_date: item["calibration_date"],
              calibration_due_date: item["calibration_due_date"],

              calibration_points: item["calibration_points"],
              periodicity: item["periodicity"],
              instrument_condition: item["instrument_condition"],
              remark: item["remark"],
              reference_instrument_id: "",
              service_request_id: props.data.service_request_id,

              company_id: props.data.company_id,
              is_active: 1,
            };
          }
        );

        // Finally, push the data (consider validation before usage)
        instrumentData.value.data = ReadingsData.value;
        console.log(instrumentData.value);

        fileInput.value = "";
      } catch (error) {
        console.error("Error reading the file:", error);
        alert(
          "An error occurred while processing the file. Please check the file format or try again."
        );
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

    /* --------ADD INSTRUMENT TO DATABASE LOGIC--------*/
    async function addDataToDatabase() {
      try {
        const response = await processCalibrationInstruments(
          instrumentData.value
        );

        if (response.success) {
          Swal.fire({
            icon: "success",
            title: "Data Imported Successfully",
          });
        } else {
          showErrorAlert("Error", "An error occurred during the API call.");
        }
      } catch (error) {
        // If an error occurs during processing, show error message
        showErrorAlert("Error", "An error occurred during the API call.");
      } finally {
        // Hide loading indicator when process completes or encounters an error
        loading2.value = false;

        // Close the SweetAlert loading indicator
        Swal.close();

        // Reset instrument data and hide modal
        instrumentData.value = {
          data: [],
          service_request_id: props.data.service_request_id,
          company_id: props.data.company_id,
        };
        hideModal(newAddressModalRef.value);
      }
    }

    const submit = async (e) => {
      if (instrumentData.value.data.length <= 0) {
        showErrorAlert(
          "Warning",
          "You must upload an Excel file. Please try again later."
        );
        return;
      }

      Swal.fire({
        title: "Adding Instruments",
        html: '<div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 100%"></div></div>',
        allowOutsideClick: false,
        showCancelButton: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
          addDataToDatabase(); // Start adding instruments
        },
      });
    };

    return {
      loading2,
      newAddressData,
      submit,
      submitButtonRef,
      newAddressModalRef,
      handleChange,
      instrumentData,
    };
  },
});
</script>
    
    