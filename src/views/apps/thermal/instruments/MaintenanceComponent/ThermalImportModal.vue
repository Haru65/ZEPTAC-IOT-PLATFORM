<template>
  <!--begin::Modal - New Address-->
  <div
    class="modal fade"
    ref="newAddressModalRef"
    id="kt_modal_thermal_instrument"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
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
            <h2>Import Thermal Instruments</h2>
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
                          v-model="instrumentData.calibration_date"
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
                    v-if="!instrumentData.calibration_date"
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
                          v-model="instrumentData.calibration_due_date"
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
                    v-if="!instrumentData.calibration_due_date"
                  >
                    <div class="fv-help-block">
                      <ErrorMessage name="calibration_due_date" />
                    </div>
                  </div>
                </div>
              </div>

              <div class="row mb-6">
                <div class="form-group col-md-12 mb-8 mb-sd-8">
                  <label
                    class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap"
                    >Upload Excel File
                  </label>
                  <label
                    class="btn btn-outline btn-outline-dashed btn-outline-default p-10 d-flex align-items-center position-relative"
                  >
                    <i
                      class="bi bi-upload position-absolute fs-1 top-50 start-50 translate-middle"
                    ></i>
                    <input
                      type="file"
                      :disabled="
                        instrumentData.calibration_date == '' ||
                        instrumentData.calibration_due_date == ''
                      "
                      accept="text/csv"
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
                                    <td>{{ r.ranges }}</td>
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
import {
  addThermalInstrument,
  GetIncrInstrumentId,
  getCompanies,
  process_json_data,
} from "@/stores/api";
import { User } from "@/core/services/JwtService";

interface NewAddressData {}

interface itemDetails {
  data: Array<readingsData>;
  calibration_date: string;
  calibration_due_date: string;
  company_id: string;
}

interface readingsData {
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
  name: "thermal-instrument-modal",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  emits: ["improvement-added"],

  setup(props, { emit }) {
    const loading = ref(false);
    const loading2 = ref(false);
    const auth = useAuthStore();
    const router = useRouter();
    const User = auth.GetUser();

    // GLOBAL ATTRIBUTES FOR THERMAL INSTRUMENTS (EXCEL DATA)
    const range = "A1:H100";

    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const newAddressModalRef = ref<null | HTMLElement>(null);
    const newAddressData = ref<NewAddressData>({});

    const instrumentData = ref<itemDetails>({
      data: [],
      calibration_date: "",
      calibration_due_date: "",
      company_id: User.company_id,
    });

    /* --------SET DATE LOGIC--------*/
    async function setDates(e, dateType) {
      try {
        if (e != null) {
          if (e != "" && e != null) {
            instrumentData.value[dateType] = moment(e).format("YYYY-MM-DD");
          } else {
            instrumentData.value[dateType] = "";
          }
        } else {
          instrumentData.value[dateType] = "";
        }
      } catch (err) {
        instrumentData.value[dateType] = "";
      }

      console.log(dateType, " ", instrumentData.value[dateType]);
      instrumentData.value.data = [];
    }

    const handleChange = async (e) => {
      console.log(User);
      let fileInput = e.target;
      const file = e.target.files[0];
      console.log(file.type);
      try {
        if (file && file.type == "text/csv") {
          const rows = ref([]);
          const ReadingsData = ref<readingsData[]>([]);

          // Read the file as an ArrayBuffer
          const arrayBuffer = await file.arrayBuffer();

          // Parse the workbook using xlsx.read
          const wb = xlsx.read(arrayBuffer, { type: "array" });

          console.log(wb);

          /* Update data with records from the specified range */
          rows.value = xlsx.utils.sheet_to_json(
            wb.Sheets[wb.SheetNames[0]],
            {}
          );

          // maaping the data in particular format
          ReadingsData.value = rows.value.map(
            (item: { [key: string]: any }, index) => {
              return {
                id: index,
                instrument_id: "",
                name: item["name"],
                make: item["make"],
                model_no: item["model_no"],
                serial_no: item["serial_no"],
                ranges: item["ranges"],
                accuracy: item["accuracy"],
                calibration_date: instrumentData.value.calibration_date,
                calibration_due_date: instrumentData.value.calibration_due_date,
                availability: "1",
                company_id: User.company_id,
                created_by: User.id,
                updated_by: User.id,
                is_active: 1,
              };
            }
          );

          // finally push this data
          instrumentData.value.data = ReadingsData.value;

          console.log(instrumentData.value);

          fileInput.value = "";
        } else {
          alert("Please select .xls file");
          fileInput.value = "";
        }
      } catch (error) {
        console.error("Error reading the file:", error);
        alert(
          "Error occured during api call. Please reload the page and try again."
        );
      }
    };

    //     const handleChange = async (e) => {
    //       let fileInput = e.target;
    //       const file = e.target.files[0];
    // console.log(file.type)
    //       try {
    //         if (
    //           file &&
    //           file.type ==
    //             "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    //         ) {
    //           const rows = ref([]);
    //           const ReadingsData = ref<readingsData[]>([]);

    //           // Read the file as an ArrayBuffer
    //           const arrayBuffer = await file.arrayBuffer();

    //           // Parse the workbook using xlsx.read
    //           const wb = xlsx.read(arrayBuffer, { type: "array" });

    //           console.log(wb);

    //           /* Update data with records from the specified range */
    //           rows.value = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {
    //             range,
    //           });

    //           // maaping the data in particular format
    //           ReadingsData.value = rows.value.map(
    //             (item: { [key: string]: any }, index) => {
    //               return {
    //                 id: index,
    //                 instrument_id: "",
    //                 name: item["Instrument name"],
    //                 make: item["Make"],
    //                 model_no: item["Model no."],
    //                 serial_no: item["Serial no."],
    //                 ranges: item["Range"],
    //                 accuracy: item["Accuracy"],
    //                 calibration_date: instrumentData.value.calibration_date,
    //                 calibration_due_date: instrumentData.value.calibration_due_date,
    //                 availability: "1",
    //                 company_id: User.company_id,
    //                 created_by: User.id,
    //                 updated_by: User.id,
    //                 is_active: 1,
    //               };
    //             }
    //           );

    //           // finally push this data
    //           instrumentData.value.data = ReadingsData.value;

    //           console.log(instrumentData.value);

    //           fileInput.value = "";
    //         } else {
    //           alert("Please select .xls file");
    //           fileInput.value = "";
    //         }
    //       } catch (error) {
    //         console.error("Error reading the file:", error);
    //         alert(
    //           "Error occured during api call. Please reload the page and try again."
    //         );
    //       }
    //     };

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

    /* --------LATEST INSTRUMENT ID LOGIC--------*/

    const IncrInstrument = (data: any, index) => {
      console.log(data.result);
      const latestInstrument_id = data.result.split("_");
      if (parseInt(latestInstrument_id[1]) == 0) {
        // ? if no record
        instrumentData.value.data[index].instrument_id =
          latestInstrument_id[0] + "_" + latestInstrument_id[1].toString();
      } else {
        // ? if record exisit inc 1
        instrumentData.value.data[index].instrument_id =
          latestInstrument_id[0] +
          "_" +
          (1 + +latestInstrument_id[1]).toString();
      }
    };

    // async function addDataToDatabase() {
    //   const totalInstruments = instrumentData.value.data.length;
    //   let instrumentsAdded = 0;

    //   try {
    //     for (const [index, obj] of instrumentData.value.data.entries()) {
    //       const res = await GetIncrInstrumentId(User.company_id);
    //       IncrInstrument(res, index);
    //       await addThermalInstrument(obj);

    //       // Increment the number of instruments added
    //       instrumentsAdded++;

    //       // Calculate progress
    //       const progress = Math.round(
    //         (instrumentsAdded / totalInstruments) * 100
    //       );

    //       // Update progress bar
    //       updateProgressBar(progress);
    //     }
    //   } catch (error) {
    //     // Handle any errors during API call
    //     showErrorAlert("Error", "An error occurred during the API call.");
    //   } finally {
    //     // Hide loading indicator when process completes or encounters an error
    //     loading2.value = false;
    //   }
    // }

    // const submit = async (e) => {
    //   if (instrumentData.value.data.length <= 0) {
    //     showErrorAlert(
    //       "Warning",
    //       "You must upload an Excel file. Please try again later."
    //     );
    //     return;
    //   }

    //   Swal.fire({
    //     title: "Adding Instruments",
    //     html: '<div class="progress"><div id="progressBar" class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div></div>',
    //     allowOutsideClick: false,
    //     showCancelButton: false,
    //     showConfirmButton: false,
    //     willOpen: () => {
    //       Swal.showLoading();
    //       addDataToDatabase(); // Start adding instruments
    //     },
    //   });

    //   try {
    //     await addDataToDatabase();
    //     Swal.fire({
    //       icon: "success",
    //       title: "Instruments Successfully Added",
    //     });
    //   } catch (error) {
    //     Swal.fire({
    //       icon: "error",
    //       title: "Failed to Add Instruments",
    //       text: "An error occurred while adding instruments.",
    //     });
    //   } finally {
    //     Swal.close(); // Close the SweetAlert loading indicator
    //     // Reset instrument data and hide modal
    //     instrumentData.value = {
    //       data: [],
    //       calibration_date: "",
    //       calibration_due_date: "",
    //     };
    //     hideModal(newAddressModalRef.value);
    //   }
    // };

    // function updateProgressBar(progress) {
    //   const progressBar = document.getElementById("progressBar");
    //   if (progressBar) {
    //     progressBar.style.width = progress + "%";
    //     progressBar.setAttribute("aria-valuenow", progress);
    //   } else {
    //     console.error("Progress bar element not found.");
    //   }
    // }

    async function addDataToDatabase() {
      try {
        await process_json_data(instrumentData.value);

        // If the processing is successful, show success message
        Swal.fire({
          icon: "success",
          title: "Instruments Successfully Added",
        });
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
          calibration_date: "",
          calibration_due_date: "",
          company_id: User.company_id,
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
      setDates,
    };
  },
});
</script>
    
    