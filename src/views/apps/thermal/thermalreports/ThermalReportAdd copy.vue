<template>
  <!--begin::Card-->
  <div class="card">
    <!--begin::Card body-->
    <div class="card-body">
      <!--begin::Stepper-->
      <div
        class="stepper stepper-links d-flex flex-column"
        id="kt_create_account_stepper"
        ref="horizontalWizardRef"
      >
        <!--begin::Nav-->
        <div class="stepper-nav py-5 mt-5">
          <!--begin::Step 1-->
          <div class="stepper-item current" data-kt-stepper-element="nav">
            <h3 class="stepper-title">Report Details</h3>
          </div>
          <!--end::Step 1-->

          <!--begin::Step 2-->
          <div class="stepper-item" data-kt-stepper-element="nav">
            <h3 class="stepper-title">Instrument Selection</h3>
          </div>
          <!--end::Step 2-->

          <!--begin::Step 3-->
          <div class="stepper-item" data-kt-stepper-element="nav">
            <h3 class="stepper-title">Summary</h3>
          </div>
          <!--end::Step 3-->
        </div>
        <!--end::Nav-->

        <!--begin::Form-->
        <form
          class="mx-auto w-100 p-10"
          novalidate
          id="kt_create_account_form"
          @submit="handleStep"
        >
          <!--begin::Step 1-->
          <div class="current" data-kt-stepper-element="content">
            <Step1
              v-bind:ongoingRGPS="RGPS"
              @rgp-Selected="setRGPDetails"
              v-on:setStartDate="setTheStartDate"
              v-on:setStartTime="setTheStartTime"
            ></Step1>
          </div>
          <!--end::Step 1-->

          <!--begin::Step 2-->
          <div data-kt-stepper-element="content">
            <Step2
              v-bind:instruments="thermalReportDetails.instruments"
              v-on:store-ids="setInstruments"
            ></Step2>
          </div>
          <!--end::Step 2-->

          <!--begin::Step 3-->
          <div data-kt-stepper-element="content">
            <Step3
              v-bind:allFilesData="thermalReportDetails.excel_data"
              v-on:store-excel-file="storeExcelFile"
              v-on:deleteExcel="deleteExcelFile"
            ></Step3>
          </div>
          <!--end::Step 3-->

          <!--begin::Actions-->
          <div class="d-flex flex-stack pt-15">
            <!--begin::Wrapper-->
            <div class="mr-2">
              <button
                type="button"
                class="btn btn-lg btn-light-primary me-3"
                data-kt-stepper-action="previous"
                @click="previousStep"
              >
                <KTIcon icon-name="arrow-left" icon-class="fs-4 me-1" />
                Back
              </button>
            </div>
            <!--end::Wrapper-->

            <!--begin::Wrapper-->
            <div>
              <button
                type="button"
                class="btn btn-lg btn-primary me-3"
                data-kt-stepper-action="submit"
                :data-kt-indicator="loading ? 'on' : null"
                v-if="currentStepIndex === totalSteps - 1"
                @click="formSubmit()"
              >
                <span v-if="!loading" class="indicator-label"> Submit </span>
                <span v-if="loading" class="indicator-progress">
                  Please wait...
                  <span
                    class="spinner-border spinner-border-sm align-middle ms-2"
                  ></span>
                </span>
              </button>

              <button v-else type="submit" class="btn btn-lg btn-primary">
                Continue
                <KTIcon icon-name="arrow-right" icon-class="fs-4 ms-2 me-0" />
              </button>
            </div>
            <!--end::Wrapper-->
          </div>
          <!--end::Actions-->
        </form>
        <!--end::Form-->
      </div>
      <!--end::Stepper-->
    </div>
    <!--end::Card body-->
  </div>
  <!--end::Card-->
</template>
  
  <script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent, onMounted, ref } from "vue";
import { StepperComponent } from "@/assets/ts/components";
import { useForm } from "vee-validate";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";
import Step1 from "./steps/Step1.vue";
import Step2 from "./steps/Step2.vue";
import Step3 from "./steps/Step3.vue";
import moment from "moment";

import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import {
  addExpenseSheet,
  getOnGoingCompletedRGP,
  getThermalInstruments,
} from "@/stores/api";
import ApiService from "@/core/services/ApiService";
import { ExpenseTypes } from "@/core/model/expensetypes";

interface IStep1 {}

interface IStep2 {}

interface IStep3 {}

interface CreateAccount extends IStep1, IStep2, IStep3 {}

interface readingsData {
  id: string;
  temp: string;
  rh: string;
}

interface Logger {
  file_name: string;
  file_size: number;
  instrument_name: string;
  logger_id: string;
  data: Array<readingsData>;
  instrument_id: string;
  MAX_TEMP: number;
  MIN_TEMP: number;
  MAX_RH: number;
  MIN_RH: number;
}

export default defineComponent({
  name: "kt-horizontal-wizard",
  components: {
    Step1,
    Step2,
    Step3,
  },
  setup() {
    const _stepperObj = ref<StepperComponent | null>(null);
    const horizontalWizardRef = ref<HTMLElement | null>(null);
    const currentStepIndex = ref(0);
    const loading = ref(false);

    const auth = useAuthStore();
    const route = useRouter();
    const User = auth.GetUser();

    const thermalInstruments = ref([
      {
        id: "",
        instrument_name: "",
        instrument_id: "",
        serial_no: "",
      },
    ]);
    const selectedInstruments = ref([
      {
        id: "",
        instrument_name: "",
        instrument_id: "",
        serial_no: "",
      },
    ]);

    const thermalReportDetails = ref({
      rgp_id: "",
      rgp_no: "",
      site_address: {
        company_name: "",
        address1: "",
        address2: "",
        city: "",
        pincode: "",
        states: "",
        country: "",
      },
      customer_name: "",

      instruments: [],
      excel_data: [
        {
          file_name: "",
          instrument_name: "",
          instrument_id: "",
          logger_id: "",
          file_size: 0,
          data: [],
          MAX_TEMP: 0,
          MIN_TEMP: 0,
          MAX_RH: 0,
          MIN_RH: 0,
        }
      ],
      room_name: "",
      acc_for_temp: "",
      acc_for_rh: "",
      val_start_date: "",
      start_time: "",
      mapping_duration: "",
      logging_interval: "",
      logger_used: "",

      min_temp: {
        instrument_id: "",
        logger_id: "",
        reading: Number.MAX_VALUE,
      },

      max_temp: {
        instrument_id: "",
        logger_id: "",
        reading: Number.MIN_VALUE,
      },

      min_rh: {
        instrument_id: "",
        logger_id: "",
        reading: Number.MAX_VALUE,
      },

      max_rh: {
        instrument_id: "",
        logger_id: "",
        reading: Number.MIN_VALUE,
      },

      avg_temp: 0,
      avg_rh: 0,

      status: "1",
      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
      is_active: 1,
    });

    // Expenses Emits

    async function setTheStartDate(e) {
      console.log(e);
      if (e != null) {
        thermalReportDetails.value.val_start_date = await moment(e).format(
          "YYYY-MM-DD"
        );
      } else {
        thermalReportDetails.value.val_start_date = await "";
      }
    }

    async function setTheStartTime(e) {
      console.log(e);
      if (e != null) {
        thermalReportDetails.value.start_time = await moment(e).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      } else {
        thermalReportDetails.value.start_time = await "";
      }
    }

    async function setInstruments(selectedIds) {
      // store selected Ids
      thermalReportDetails.value.instruments = selectedIds.value;

      // Store along with serial_no for matching with excel file
      selectedInstruments.value = thermalInstruments.value;
      selectedInstruments.value = selectedInstruments.value.filter((item) =>
        thermalReportDetails.value.instruments.includes(item.id)
      );

      console.log(selectedInstruments.value);
    }

    // store excel data if the serial number matches
    async function storeExcelFile(excelData) {
      
      if (excelData.value) {
        const foundInstrument = selectedInstruments.value.find(
          (item) => item.serial_no === excelData.value.logger_id
        );
        if (foundInstrument) {
          if (thermalReportDetails.value.excel_data) {
            const alreadyExist = thermalReportDetails.value.excel_data.find(
              (data) => data["logger_id"] === excelData.value.logger_id
            );
            if (!alreadyExist) {
              excelData.value.instrument_id = foundInstrument.instrument_id;

              thermalReportDetails.value.excel_data.push(excelData.value);

              // calculate the MIN TEMP
              if (
                thermalReportDetails.value.min_temp.reading > excelData.value.MIN_TEMP
              ) {
                thermalReportDetails.value.min_temp.reading =
                  excelData.value.MIN_TEMP;
                thermalReportDetails.value.min_temp.instrument_id =
                  excelData.value.instrument_id;
                thermalReportDetails.value.min_temp.logger_id =
                  excelData.value.logger_id;
              }

              // calculate the MAX TEMP
              if (
                thermalReportDetails.value.max_temp.reading < excelData.value.MAX_TEMP
              ) {
                thermalReportDetails.value.max_temp.reading =
                  excelData.value.MAX_TEMP;
                thermalReportDetails.value.max_temp.instrument_id =
                  excelData.value.instrument_id;
                thermalReportDetails.value.max_temp.logger_id =
                  excelData.value.logger_id;
              }

              // calculate the MIN RH
              if (thermalReportDetails.value.min_rh.reading > excelData.value.MIN_RH) {
                thermalReportDetails.value.min_rh.reading =
                  excelData.value.MIN_RH;
                thermalReportDetails.value.min_rh.instrument_id =
                  excelData.value.instrument_id;
                thermalReportDetails.value.min_rh.logger_id =
                  excelData.value.logger_id;
              }

              // calculate the MAX RH
              if (thermalReportDetails.value.max_rh.reading < excelData.value.MAX_RH) {
                thermalReportDetails.value.max_rh.reading =
                  excelData.value.MAX_RH;
                thermalReportDetails.value.max_rh.instrument_id =
                  excelData.value.instrument_id;
                thermalReportDetails.value.max_rh.logger_id =
                  excelData.value.logger_id;
              }

              // calculate average temperature
              thermalReportDetails.value.avg_temp =
                (thermalReportDetails.value.min_temp.reading +
                  thermalReportDetails.value.max_temp.reading) /
                2;

              // calculate average humidity
              thermalReportDetails.value.avg_rh =
                (thermalReportDetails.value.min_rh.reading +
                  thermalReportDetails.value.max_rh.reading) /
                2;
            } else {
              Swal.fire({
                icon: "info",
                title: "File Already Uploaded",
                text: "The Excel file with this serial number has already been uploaded. Please ensure you are not uploading duplicate files.",
              });
            }
          }
        } else {
          Swal.fire({
            icon: "info",
            title: "Serial Number Mismatch",
            text: "The provided excel's serial number does not match with any of the selected instruments. Please check and try again.",
          });
        }
      }

      console.log(thermalReportDetails.value.excel_data);
    }

    function setRGPDetails(rgp_id, rgp_no, address, customer_name) {
      thermalReportDetails.value.rgp_id = rgp_id ? rgp_id : "";
      thermalReportDetails.value.rgp_no = rgp_no ? rgp_no : "";
      thermalReportDetails.value.site_address.company_name =
        address.company_name ? address.company_name : "";
      thermalReportDetails.value.site_address.address1 = address.address1
        ? address.address1
        : "";
      thermalReportDetails.value.site_address.address2 = address.address2
        ? address.address2
        : "";
      thermalReportDetails.value.site_address.city = address.city
        ? address.city
        : "";
      thermalReportDetails.value.site_address.pincode = address.pincode
        ? address.pincode
        : "";
      thermalReportDetails.value.site_address.states = address.states
        ? address.states
        : "";
      thermalReportDetails.value.site_address.country = address.country
        ? address.country
        : "";
      thermalReportDetails.value.customer_name = customer_name
        ? customer_name
        : "";
    }

    const RGPS = ref([
      {
        id: "",
        rgp_no: "",
        site_address: {
          company_name: "",
          address1: "",
          address2: "",
          country: "",
          city: "",
          pincode: "",
          states: "",
        },
        customer_data: {
          id: "",
          first_name: "",
          last_name: "",
          company: {
            company_name: "",
          },
        },
      },
    ]);

    const formData = ref<CreateAccount>({});

    const fillDetails = (response) => {
      if (Array.isArray(response.result)) {
        RGPS.value.push(
          ...response.result.map((result) => {
            return {
              id: result.id,
              rgp_no: result.rgp_no,
              site_address: {
                company_name: result.site_address.company_name,
                address1: result.site_address.address1,
                address2: result.site_address.address2,
                country: result.site_address.country,
                city: result.site_address.city,
                pincode: result.site_address.pincode,
                states: result.site_address.states,
              },
              customer_data: result.customer_data,
            };
          })
        );
      } else {
      }
    };

    const GetOnGoingRGP = async () => {
      ApiService.setHeader();

      const company_ID = auth.GetUser().company_id;
      const response = await getOnGoingCompletedRGP(company_ID);

      if (response) {
        await fillDetails(response);
      }
    };

    async function thermal_instrument_listing(): Promise<void> {
      try {
        const response = await getThermalInstruments(``);
        thermalInstruments.value = response.result.data.map(
          ({ id, name, instrument_id, serial_no }) => ({
            id: id,
            instrument_name: name,
            instrument_id: instrument_id,
            serial_no: serial_no,
          })
        );
      } catch (error) {
        console.error(error);
      } finally {
        //console.log("done");
        setTimeout(() => {
          loading.value = false;
        }, 100);
      }
    }

    onMounted(async () => {
      RGPS.value.pop();
      thermalReportDetails.value.excel_data.pop();
      await GetOnGoingRGP();

      _stepperObj.value = StepperComponent.createInsance(
        horizontalWizardRef.value as HTMLElement
      );
      thermal_instrument_listing();
    });

    // const createAccountSchema = [];

    // const currentSchema = computed(() => {
    //   return createAccountSchema[currentStepIndex.value];
    // });

    const { resetForm, handleSubmit } = useForm<IStep2 | IStep3>({
      // validationSchema: currentSchema,
    });

    const totalSteps = computed(() => {
      if (_stepperObj.value) {
        return _stepperObj.value.totalStepsNumber;
      } else {
        return 1;
      }
    });

    const handleStep = handleSubmit((values) => {
      // resetForm({});

      // formData.value = { ...values };

      if (currentStepIndex.value === 0) {
        if (thermalReportDetails.value.rgp_id) {
          currentStepIndex.value++;

          if (!_stepperObj.value) {
            return;
          }

          _stepperObj.value.goNext();
        } else {
          Swal.fire({
            icon: "info",
            title: "Please fill all the required fields",
          });
        }
      } else if (currentStepIndex.value === 1) {
        if (thermalReportDetails.value.instruments.length > 0) {
          currentStepIndex.value++;

          if (!_stepperObj.value) {
            return;
          }

          _stepperObj.value.goNext();
        } else {
          Swal.fire({
            icon: "info",
            title: "Please select at least one instrument.",
          });
        }
      }
    });

    const previousStep = () => {
      if (!_stepperObj.value) {
        return;
      }

      currentStepIndex.value--;

      _stepperObj.value.goPrev();
    };

    const formSubmit = async () => {
      loading.value = true;

      // check whether selected instruments length and excel files length are same
      if (
        thermalReportDetails.value.excel_data.length !=
        thermalReportDetails.value.instruments.length
      ) {
        Swal.fire({
          icon: "info",
          title: "Data Mismatch",
          text: "Number of files must match with Number of Number of selected instruments. Please check and try again.",
        });
        loading.value = false;
        return;
      }

      try {
        const response = await addExpenseSheet(thermalReportDetails.value);
        if (!response.error) {
          showSuccessAlert(
            "Success",
            "Thermal Report have been successfully inserted!"
          );

          loading.value = false;
          route.push({ name: "expensesheet-list" });
        } else {
          // Handle API error response
          const errorData = response.error;
          // console.log("API error:", errorData);
          console.log("API error:", errorData.response.data.errors);
          showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
          loading.value = false;
        }
      } catch (error) {
        // Handle any other errors during API call
        console.error("API call error:", error);
        showErrorAlert("Error", "An error occurred during the API call.");
      } finally {
        loading.value = false;
      }
    };

    const removeObjectWithId = (arr, id) => {
      if (id !== -1) {
        arr.splice(id, 1);
      }

      return arr;
    };

    // function associated with calculating MIN, MAX, AVG values for Temperature and Humidity
    const calculateTemperatureAndHumidity = () => {
      const excelData = thermalReportDetails.value.excel_data;

      if (excelData.length > 0) {
        const result = excelData.reduce(
          (acc, current) => {
            if (current["MIN_TEMP"] < acc.minTemp) {
              acc.minTemp = current["MIN_TEMP"];
              acc.minTempInstrumentId = current["instrument_id"];
              acc.minTempLoggerId = current["logger_id"];
            }

            if (current["MAX_TEMP"] > acc.maxTemp) {
              acc.maxTemp = current["MAX_TEMP"];
              acc.maxTempInstrumentId = current["instrument_id"];
              acc.maxTempLoggerId = current["logger_id"];
            }

            if (current["MIN_RH"] < acc.minRh) {
              acc.minRh = current["MIN_RH"];
              acc.minRhInstrumentId = current["instrument_id"];
              acc.minRhLoggerId = current["logger_id"];
            }

            if (current["MAX_RH"] > acc.maxRh) {
              acc.maxRh = current["MAX_RH"];
              acc.maxRhInstrumentId = current["instrument_id"];
              acc.maxRhLoggerId = current["logger_id"];
            }

            return acc;
          },
          {
            minTemp: excelData[0]["MIN_TEMP"],
            minTempInstrumentId: excelData[0]["instrument_id"],
            minTempLoggerId: excelData[0]["logger_id"],

            maxTemp: excelData[0]["MAX_TEMP"],
            maxTempInstrumentId: excelData[0]["instrument_id"],
            maxTempLoggerId: excelData[0]["logger_id"],

            minRh: excelData[0]["MIN_RH"],
            minRhInstrumentId: excelData[0]["instrument_id"],
            minRhLoggerId: excelData[0]["logger_id"],

            maxRh: excelData[0]["MAX_RH"],
            maxRhInstrumentId: excelData[0]["instrument_id"],
            maxRhLoggerId: excelData[0]["logger_id"],
          }
        );

        // MIN TEMP
        thermalReportDetails.value.min_temp = {
          reading: result.minTemp,
          instrument_id: result.minTempInstrumentId,
          logger_id: result.minTempLoggerId,
        };

        // MAX TEMP
        thermalReportDetails.value.max_temp = {
          reading: result.maxTemp,
          instrument_id: result.maxTempInstrumentId,
          logger_id: result.maxTempLoggerId,
        };

        // MIN RH
        thermalReportDetails.value.min_rh = {
          reading: result.minRh,
          instrument_id: result.minRhInstrumentId,
          logger_id: result.minRhLoggerId,
        };

        // MAX RH
        thermalReportDetails.value.max_rh = {
          reading: result.maxRh,
          instrument_id: result.maxRhInstrumentId,
          logger_id: result.maxRhLoggerId,
        };

        // Average Temperature
        thermalReportDetails.value.avg_temp =
          (thermalReportDetails.value.min_temp.reading +
            thermalReportDetails.value.max_temp.reading) /
          2;

        // Average Humidity
        thermalReportDetails.value.avg_rh =
          (thermalReportDetails.value.min_rh.reading +
            thermalReportDetails.value.max_rh.reading) /
          2;
      }
      else{
        
      }
    };

    /*
      if you want to add delete functionality, delete event is emmited from ( Step3 Component - ExcelFiles Component ) and listened to ThermalReportAdd Component

      NOTE : it require whole traversal of all files in order to calculate the MIN, MAX, AVG values for Temperature and Humidity
    */
    const deleteExcelFile = async (index) => {
      thermalReportDetails.value.excel_data = await removeObjectWithId(
        thermalReportDetails.value.excel_data,
        index
      );
      await calculateTemperatureAndHumidity;
      showSuccessAlert("Success", "Excel file removed successfully!");
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
      horizontalWizardRef,
      previousStep,
      handleStep,
      formSubmit,
      totalSteps,
      currentStepIndex,
      getAssetPath,
      thermalReportDetails,
      GetOnGoingRGP,
      showErrorAlert,
      showSuccessAlert,
      RGPS,
      loading,
      setRGPDetails,
      setTheStartDate,
      setTheStartTime,
      setInstruments,
      thermalInstruments,
      storeExcelFile,
      deleteExcelFile,
    };
  },
});
</script>