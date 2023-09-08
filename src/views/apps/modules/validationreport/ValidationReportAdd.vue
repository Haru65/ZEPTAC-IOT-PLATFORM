<template>
  <div style="width: 99%" class="sm:p-4 md:p-8 lg:p-12 rounded">
    <!--begin::Modal dialog-->
    <div class="d-flex flex-column">
      <div class="flex-xl-row-fluid mb-10 mb-lg-0 me-lg-7 me-xl-10">
        <div class="card w-20">
          <div class="card-body sm:p-2 lg:p-12">
            <!--end::Form-->

            <VForm :validation-schema="worksheetDetailsValidator">
              <!--begin::Card body-->
              <div class="card-body border-top p-9">
                <!-- extra fields -->

                <!--begin::Card body-->
                <div class="card p-2 w-100">
                  <div class="shadow-lg p-5 m-3 fs-4 rounded w-100 border">
                    <div class="row mb-2">
                      <div class="form-group col-md-12 mb-8 mb-sd-8">
                        <label
                          class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap"
                          >Gate Pass
                        </label>
                        <div>
                          <el-select
                            v-model="worksheetDetails.rgp_id"
                            filterable
                            placeholder="Please Select GatePass"
                            name="rgp_id"
                            @change="SetDetails(worksheetDetails.rgp_id)"
                          >
                            <el-option
                              value=""
                              disabled="disabled"
                              label="Please Select GatePass"
                              key=""
                            >
                              Please Select GatePass</el-option
                            >
                            <el-option
                              v-for="item in RGPS"
                              :key="item.id"
                              :value="item.id"
                              :label="item.rgp_no"
                            />
                          </el-select>
                          <div
                            class="fv-plugins-message-container"
                            v-if="!worksheetDetails.rgp_id"
                          >
                            <div class="fv-help-block">
                              <ErrorMessage name="rgp_id" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <!--end::Input group-->
                    </div>

                    <div class="row mb-2" v-if="worksheetDetails.rgp_id">
                      <div class="form-group col-md-6 mb-8 mb-sd-8">
                        <label
                          class="col-lg-4 col-form-label fs-5 fw-bold text-gray-700 text-nowrap"
                          >Customer Name</label
                        >
                        <div class="form-control form-control-solid">
                          <span class="fs-5 fw-bold text-gray-700">
                            {{ CustomerData.first_name }}
                            {{ CustomerData.last_name }}
                          </span>
                        </div>
                      </div>
                      <div class="form-group col-md-6 mb-8 mb-sd-8">
                        <label
                          class="col-lg-4 col-form-label fs-5 fw-bold text-gray-700 text-nowrap"
                          >Customer Address</label
                        >
                        <div class="form-control form-control-solid">
                          <span class="fs-5 fw-bold text-gray-700">
                            {{ CustomerAddress.address1 }}
                            {{ CustomerAddress.address2 }}
                            {{ CustomerAddress.city }} -
                            {{ CustomerAddress.pincode }}
                            {{ CustomerAddress.states }}
                            {{ CustomerAddress.country }}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="row mb-2" v-if="worksheetDetails.rgp_id">
                      <div class="form-group col-md-6 mb-8 mb-sd-8">
                        <label
                          class="col-lg-4 col-form-label fs-5 fw-bold text-gray-700 text-nowrap"
                          >Client Name</label
                        >
                        <div class="form-control form-control-solid">
                          <span class="fs-5 fw-bold text-gray-700">
                            {{ ClientData.first_name }}
                            {{ ClientData.last_name }}
                          </span>
                        </div>
                      </div>
                      <div class="form-group col-md-6 mb-8 mb-sd-8">
                        <label
                          class="col-lg-4 col-form-label fs-5 fw-bold text-gray-700 text-nowrap"
                          >Client Address</label
                        >
                        <div class="form-control form-control-solid">
                          <span class="fs-5 fw-bold text-gray-700">
                            {{ ClientAddress.address1 }}
                            {{ ClientAddress.address2 }}
                            {{ ClientAddress.city }} -
                            {{ ClientAddress.pincode }}
                            {{ ClientAddress.states }}
                            {{ ClientAddress.country }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!--end::Card body-->

                <!--begin::Accordion-->
                <div class="accordion" id="kt_accordion_1">
                  <div
                    class="accordion-item"
                    v-for="test in ConductedTests"
                    :key="test.id"
                  >
                    <h2
                      class="accordion-header"
                      :id="'kt_accordion_1_header_' + test.id"
                    >
                      <button
                        class="accordion-button fs-4 fw-semibold"
                        type="button"
                        :data-bs-toggle="'collapse'"
                        :data-bs-target="'#kt_accordion_1_body_' + test.id"
                        :aria-expanded="test.id === 1 ? 'true' : 'false'"
                        :aria-controls="'kt_accordion_1_body_' + test.id"
                      >
                        {{ test.test }}
                      </button>
                    </h2>
                    <div
                      :id="'kt_accordion_1_body_' + test.id"
                      class="accordion-collapse collapse"
                      :class="test.id === 1 ? 'show' : ''"
                      :aria-labelledby="'kt_accordion_1_header_' + test.id"
                      data-bs-parent="#kt_accordion_1"
                    >
                      <div class="accordion-body">
                        <button type="button" class="btn btn-primary">
                          Add Test Report
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <!--end::Accordion-->

                <div class="modal-footer flex-center">
                  <!--begin::Button-->
                  <button type="reset" class="btn btn-lg btn-danger w-25">
                    Discard
                  </button>
                  <!--end::Button-->
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  <!--begin::Button-->
                  <span
                    :data-kt-indicator="loading ? 'on' : null"
                    class="btn btn-lg btn-primary w-25"
                    @click="onsubmit()"
                  >
                    <span v-if="!loading" class="indicator-label">
                      Submit
                    </span>
                    <span v-if="loading" class="indicator-progress">
                      Please wait...
                      <span
                        class="spinner-border spinner-border-sm align-middle ms-2"
                      ></span>
                    </span>
                  </span>
                  <!--end::Button-->
                </div>
              </div>
            </VForm>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import ApiService from "@/core/services/ApiService";
import { getAllRGP } from "@/stores/api";
import { useAuthStore } from "@/stores/auth";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { useRouter } from "vue-router";
import { ConductedTests } from "@/core/model/conductedtests";
import Swal from "sweetalert2/dist/sweetalert2.js";
import moment from "moment";
import * as Yup from "yup";

interface Instrument {
  id: string;
  name: string;
  model_no: string;
  serial_no: string;
  make: string;
}
interface worksheet {
  rgp_id: string;
  rgp_no: string;
  company_id: string;
  instruments: Array<Instrument>;
  created_by: string;
  updated_by: string;
  is_active: string;
}

interface InstrumentUsed {
  id: String;
  instrument_name: String;
}
interface TestReport {
  id: String;
  test_name: String;
  instrument_used: InstrumentUsed;
}

interface ValidationReport {
  rp_id: String;

  company_id: String;

  tests: [
    {
      id: String;

      test_name: String;

      reports: Array<TestReport>;
    }
  ];

  status: String;

  is_active: number;

  created_by: String;
}

export default defineComponent({
  name: "worksheet-add",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  setup() {
    const auth = useAuthStore();
    const route = useRouter();
    const User = auth.GetUser();

    const engineerSelect = ref(true);
    const selectedTests = ref([]);
    const loading = ref(false);

    const RGPS = ref([
      {
        id: "",
        rgp_no: "",
        quotation_id: "",
        quotation_no: "",
        instruments: [],
        client_id: "",
        customer_id: "",
        date: "",
        duedate: "",
        status: "",
        customer_address: {
          address1: "",
          address2: "",
          country: "",
          city: "",
          pincode: "",
          states: "",
        },
        client_address: {
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
        },
        client_data: {
          id: "",
          first_name: "",
          last_name: "",
        },
      },
    ]);

    const worksheetDetails = ref<worksheet>({
      rgp_id: "",
      rgp_no: "",
      company_id: User.company_id,
      instruments: [],
      created_by: User.id,
      updated_by: User.id,
      is_active: "1",
    });

    const worksheetDetailsValidator = Yup.object().shape({
      rgp_id: Yup.string().required().label("RGP"),
    });

    const CustomerAddress = ref({
      address1: "",
      address2: "",
      country: "",
      city: "",
      pincode: "",
      states: "",
    });

    const ClientAddress = ref({
      address1: "",
      address2: "",
      country: "",
      city: "",
      pincode: "",
      states: "",
    });

    const CustomerData = ref({
      id: "",
      first_name: "",
      last_name: "",
    });

    const ClientData = ref({
      id: "",
      first_name: "",
      last_name: "",
    });

    const SetDetails = async (id) => {
      if (id) {
        try {
          // Find the rgp
          const foundRGP = RGPS.value.find((rgp) => rgp.id === id);

          // If not found, return early
          if (!foundRGP) {
            return;
          }

          // Destructure and assign rgp details
          const {
            rgp_no,
            instruments,
            client_address,
            customer_address,
            customer_data,
            client_data,
          } = foundRGP;
          worksheetDetails.value.rgp_no = rgp_no;
          ClientAddress.value = client_address;
          CustomerAddress.value = customer_address;
          CustomerData.value = customer_data;
          ClientData.value = client_data;
        } catch (error) {
          console.error("An error occurred:", error);
        }
      }
    };

    const fillDetails = (response) => {
      if (Array.isArray(response.result)) {
        RGPS.value.push(
          ...response.result.map((result) => {
            return {
              id: result.id,
              rgp_no: result.rgp_no,
              quotation_id: result.quotation_id,
              quotation_no: result.quotation_no,
              instruments: JSON.parse(result.instruments),
              client_id: result.client_id,
              customer_id: result.customer_id,
              client_address: {
                address1: result.client_address.address1,
                address2: result.client_address.address2,
                country: result.client_address.country,
                city: result.client_address.city,
                pincode: result.client_address.pincode,
                states: result.client_address.states,
              },
              customer_address: {
                address1: result.customer_address.address1,
                address2: result.customer_address.address2,
                country: result.customer_address.country,
                city: result.customer_address.city,
                pincode: result.customer_address.pincode,
                states: result.customer_address.states,
              },
              customer_data: {
                id: result.customer_data.id,
                first_name: result.customer_data.first_name,
                last_name: result.customer_data.last_name,
              },
              client_data: {
                id: result.client_data.id,
                first_name: result.client_data.first_name,
                last_name: result.client_data.last_name,
              },
              // Add other properties like 'date' and 'duedate' here if needed
            };
          })
        );
      } else {
      }
    };

    onMounted(async () => {
      // get all the rgp
      const response = await getAllRGP(User.company_id);

      RGPS.value.pop();

      if (response) {
        await fillDetails(response);
      }
    });

    const onsubmit = async () => {
      // loading.value = true;
      // console.log(worksheetDetails.value);
      // worksheetDetails.value.work_date = moment(
      //   worksheetDetails.value.work_date
      // ).format("YYYY-MM-DD");
      // worksheetDetails.value.start_time = moment(
      //   worksheetDetails.value.start_time
      // ).format("YYYY-MM-DD HH:mm:ss");
      // worksheetDetails.value.end_time = moment(
      //   worksheetDetails.value.end_time
      // ).format("YYYY-MM-DD HH:mm:ss");
      // console.log(worksheetDetails.value);
      // if (
      //   worksheetDetails.value.tests.length === 0 &&
      //   worksheetDetails.value.other_test == ""
      // ) {
      //   showErrorAlert(
      //     "Warning",
      //     "Please select at least one test or Specify any other test"
      //   );
      //   loading.value = false;
      //   return;
      // }
      // try {
      //   // Call your API here with the form values
      //   const response = await addDailyWorksheet(worksheetDetails.value);
      //   // console.log(response.error);
      //   if (!response.error) {
      //     // Handle successful API response
      //     //   console.log("API response:", response);
      //     loading.value = false;
      //     showSuccessAlert(
      //       "Success",
      //       "Today's Worksheet has been successfully submitted!"
      //     );
      //     // clear();
      //     route.push({ name: "dailyworksheet-list" });
      //   } else {
      //     // Handle API error response
      //     // const errorData = response.error;
      //     loading.value = false;
      //     showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
      //   }
      // } catch (error) {
      //   // Handle any other errors during API call
      //   // console.error("API call error:", error);
      //   showErrorAlert("Error", "An error occurred during the API call.");
      // } finally {
      //   loading.value = false;
      // }
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
      RGPS,
      fillDetails,
      worksheetDetails,
      SetDetails,
      CustomerData,
      ClientData,
      ConductedTests,
      selectedTests,
      worksheetDetailsValidator,
      loading,
      onsubmit,
      CustomerAddress,
      ClientAddress,

      // toggleCheckbox,
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