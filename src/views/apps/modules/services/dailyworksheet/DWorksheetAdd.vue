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
                <div class="row mb-6">
                  <div class="form-group col-md-6 mb-8 mb-sd-8">
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
                  <div class="form-group col-md-6 mb-8 mb-sd-8">
                    <label
                      class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap"
                      >Service Engineer
                    </label>
                    <div>
                      <el-select
                        filterable
                        placeholder="Select Service Engineer..."
                        name="engineer_id"
                        v-model="worksheetDetails.engineer_id"
                      >
                        <el-option
                          value="Select Service Engineer..."
                          disabled="disabled"
                          label="Select Service Engineer..."
                          key=""
                        >
                          Select Service Engineer...</el-option
                        >
                        <el-option
                          v-for="engineer in ServiceEngineers"
                          :key="engineer.id"
                          :value="engineer.id"
                          :label="`${engineer.first_name} ${engineer.last_name}`"
                        />
                      </el-select>
                      <div
                        class="fv-plugins-message-container"
                        v-if="!worksheetDetails.engineer_id"
                      >
                        <div class="fv-help-block">
                          <ErrorMessage name="engineer_id" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--end::Input group-->

                  <div class="row mb-6" v-if="worksheetDetails.rgp_id">
                    <div class="form-group col-md-6 mb-8 mb-sd-8">
                      <label
                        class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap"
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
                        class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap"
                        >Site Location</label
                      >
                      <div class="form-control form-control-solid">
                        <span class="fs-5 fw-bold text-gray-700">
                          {{ SiteAddress.address1 }} {{ SiteAddress.address2 }}
                          {{ SiteAddress.city }} - {{ SiteAddress.pincode }}
                          {{ SiteAddress.states }} {{ SiteAddress.country }}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div class="row mb-6">
                    <div class="form-group col-md-6 mb-8 mb-sd-8">
                      <label
                        class="btn btn-outline btn-outline-dashed btn-outline-default p-5 d-flex align-items-center"
                      >
                        <!--begin::Info-->
                        <span class="d-block fw-semobold text-start">
                          <span class="text-dark fw-bold d-block fs-4 mb-2"
                            >Work Status</span
                          >
                          <input
                            type="radio"
                            class="btn-check"
                            name="work_status"
                            id="1"
                            value="1"
                            v-model="worksheetDetails.work_status"
                            autocomplete="off"
                          />
                          <label class="btn btn-outline-primary" for="1"
                            >Ongoing</label
                          >

                          <input
                            type="radio"
                            class="btn-check"
                            name="work_status"
                            id="2"
                            v-model="worksheetDetails.work_status"
                            value="2"
                            autocomplete="off"
                          />
                          <label class="btn btn-outline-primary" for="2"
                            >Completed</label
                          >
                        </span>
                        <!--end::Info-->
                      </label>
                    </div>
                    <div class="form-group col-md-6 mb-8 mb-sd-8">
                      <label
                        class="btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center"
                      >
                        <!--begin::Info-->
                        <span class="d-block fw-semobold text-start">
                          <span class="text-dark fw-bold d-block fs-4 mb-2"
                            >Work Date</span
                          >
                          <div class="block">
                            <el-date-picker
                              type="date"
                              name="work_date"
                              id="work_date"
                              v-model="worksheetDetails.work_date"
                              placeholder="Pick Work Day"
                            />
                          </div>
                        </span>
                        <!--end::Info-->
                      </label>
                      <div
                        class="fv-plugins-message-container"
                        v-if="!worksheetDetails.work_date"
                      >
                        <div class="fv-help-block">
                          <ErrorMessage name="work_date" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row mb-6">
                    <div class="form-group col-md-6 mb-8 mb-sd-8">
                      <label
                        class="btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center"
                      >
                        <!--begin::Info-->
                        <span class="d-block fw-semobold text-start">
                          <span class="text-dark fw-bold d-block fs-4 mb-2"
                            >Work Start Time</span
                          >
                          <div class="block">
                            <el-time-picker
                              type="time"
                              name="start_time"
                              id="start_time"
                              v-model="worksheetDetails.start_time"
                              placeholder="Pick start time"
                            />
                          </div>
                        </span>
                        <!--end::Info-->
                      </label>
                      <div
                        class="fv-plugins-message-container"
                        v-if="!worksheetDetails.start_time"
                      >
                        <div class="fv-help-block">
                          <ErrorMessage name="start_time" />
                        </div>
                      </div>
                    </div>
                    <div class="form-group col-md-6 mb-8 mb-sd-8">
                      <label
                        class="btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center"
                      >
                        <!--begin::Info-->
                        <span class="d-block fw-semobold text-start">
                          <span class="text-dark fw-bold d-block fs-4 mb-2"
                            >Work Finish Time</span
                          >
                          <div class="block">
                            <el-time-picker
                              type="time"
                              name="end_time"
                              id="end_time"
                              v-model="worksheetDetails.end_time"
                              placeholder="Pick end time"
                            />
                          </div>
                        </span>
                        <!--end::Info-->
                      </label>
                      <div
                        class="fv-plugins-message-container"
                        v-if="!worksheetDetails.end_time"
                      >
                        <div class="fv-help-block">
                          <ErrorMessage name="end_time" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row mb-6">
                    <div class="form-group col-md-6 mb-8 mb-sd-8">
                      <label
                        class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap"
                        >Scope of Work</label
                      >
                      <Field
                        type="textarea"
                        as="textarea"
                        name="scope_of_work"
                        rows="4"
                        class="form-control form-control-lg form-control-solid"
                        placeholder="Specify scope of work..."
                        v-model="worksheetDetails.scope_of_work"
                      />
                      <div class="fv-plugins-message-container">
                        <div class="fv-help-block">
                          <ErrorMessage name="scope_of_work" />
                        </div>
                      </div>
                    </div>
                    <div class="form-group col-md-6 mb-8 mb-sd-8">
                      <label
                        class="col-lg-4 col-form-label fs-5 fw-bold text-gray-700 text-nowrap"
                        >Problem Faced (if any)</label
                      >
                      <Field
                        type="textarea"
                        as="textarea"
                        name="problem"
                        rows="4"
                        class="form-control form-control-lg form-control-solid"
                        placeholder="Specify any problem faced..."
                        v-model="worksheetDetails.problem"
                      />
                    </div>
                  </div>

                  <div class="row mb-6">
                    <div class="form-group col-md-12 mb-8 mb-sd-8">
                      <label
                        class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap"
                        >Tests Conducted</label
                      >
                      <div class="row">
                        <div
                          class="col-lg-4 col-md-6 col-sm-12"
                          v-for="test in ConductedTests"
                          :key="test.id"
                        >
                          <div class="d-flex align-items-center p-3 m-3">
                            <!--begin::Checkbox-->
                            <label
                              class="form-check form-check-custom form-check-solid me-10"
                            >
                              <Field
                                class="form-check-input border-dark"
                                type="checkbox"
                                name="test"
                                :value="test.test"
                                :id="test.id"
                                :v-model="selectedTests"
                                @click="ToggleCheckBoxForTests($event)"
                              />

                              <span
                                class="form-check-label fs-5 fw-semibold text-nowrap text-gray-700"
                                >{{ test.test }}</span
                              >
                            </label>
                            <!--end::Checkbox-->
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row mb-6">
                    <div class="form-group col-12 mb-8">
                      <label
                        class="col-lg-4 col-form-label fs-5 fw-bold text-gray-700 text-nowrap"
                        >Any Other Test (if any)</label
                      >
                      <Field
                        type="textarea"
                        as="textarea"
                        name="other_test"
                        rows="3"
                        class="form-control form-control-lg form-control-solid"
                        placeholder="Specify the test name..."
                        v-model="worksheetDetails.other_test"
                      />
                    </div>
                  </div>
                </div>
                <div class="row mb-6">
                  <div class="form-group col-md-6 mb-8 mb-sd-8">
                    <label
                      class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap"
                      >Standard Used</label
                    >
                    <Field
                      type="text"
                      name="standard_used"
                      class="form-control form-control-lg form-control-solid"
                      placeholder="Specify the standard used..."
                      v-model="worksheetDetails.standard_used"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="standard_used" />
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-md-6 mb-8 mb-sd-8">
                    <label
                      class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap"
                      >Witnessed By</label
                    >
                    <Field
                      type="text"
                      name="witnessed_by"
                      class="form-control form-control-lg form-control-solid"
                      placeholder="witnessed by..."
                      v-model="worksheetDetails.witnessed_by"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="witnessed_by" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
import { addDailyWorksheet, getOnGoingRGP } from "@/stores/api";
import { useAuthStore } from "@/stores/auth";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { useRouter } from "vue-router";
import { ConductedTests } from "@/core/model/conductedtests";
import Swal from "sweetalert2/dist/sweetalert2.js";
import moment from "moment";
import * as Yup from "yup";

interface Test {
  id: string;
  name: string;
}

interface worksheet {
  rgp_id: string;
  rgp_no: string;
  engineer_id: string;
  company_id: string;
  scope_of_work: string;
  problem: string;
  work_date: string;
  start_time: string;
  end_time: string;
  work_status: string;
  tests: Array<Test>;
  other_test: string;
  standard_used: string;
  witnessed_by: string;
  created_by: string;
  updated_by: string;
  is_active: string;
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
        engineers: [],
        client_id: "",
        customer_id: "",
        site_address: {
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
      },
    ]);

    const worksheetDetails = ref<worksheet>({
      rgp_id: "",
      rgp_no: "",
      engineer_id: "",
      company_id: User.company_id,
      scope_of_work: "",
      problem: "",
      work_date: "",
      tests: [],
      other_test: "",
      start_time: "",
      end_time: "",
      work_status: "1",
      standard_used: "",
      witnessed_by: "",
      created_by: User.id,
      updated_by: User.id,
      is_active: "1",
    });

    const worksheetDetailsValidator = Yup.object().shape({
      scope_of_work: Yup.string().required().label("Scope of Work"),
      standard_used: Yup.string().required().label("Standard Used"),
      rgp_id: Yup.string().required().label("RGP"),
      engineer_id: Yup.string().required().label("Engineer"),
      work_date: Yup.string().required().label("Work Date"),
      start_time: Yup.string().required().label("Start Time"),
      end_time: Yup.string().required().label("Finish Time"),
      witnessed_by: Yup.string().required().label("Witness"),
      tests: Yup.string().required().label("Test"),
    });

    const ServiceEngineers = ref([
      {
        id: "",
        first_name: "",
        last_name: "",
      },
    ]);

    const SiteAddress = ref({
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

    const ToggleCheckBoxForTests = async (e) => {
      const selectedId = e.target.id;

      const { tests } = worksheetDetails.value;

      if (e.target.checked) {
        tests.push({
          id: selectedId,
          name: e.target.value,
        });
        worksheetDetails.value.tests = tests;
      } else {
        worksheetDetails.value.tests = tests.filter(
          (test) => test.id !== selectedId
        );
      }

      // await emit("set-engineers", step2Data.value.engineers);
    };

    const SetDetails = async (id) => {

      if(id){
        try {
        // Find the rgp
        const foundRGP = RGPS.value.find((rgp) => rgp.id === id);

        // If not found, return early
        if (!foundRGP) {
          return;
        }

        // Destructure and assign rgp details
        const { rgp_no, engineers, site_address, customer_data } = foundRGP;
        worksheetDetails.value.rgp_no = rgp_no;
        worksheetDetails.value.engineer_id = "";
        ServiceEngineers.value = [];
        ServiceEngineers.value = [...engineers];
        engineerSelect.value = false;
        SiteAddress.value = site_address;
        CustomerData.value = customer_data;
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
          engineers: JSON.parse(result.engineers),
          client_id: result.client_id,
          customer_id: result.customer_id,
          site_address: {
            address1: result.site_address.address1,
            address2: result.site_address.address2,
            country: result.site_address.country,
            city: result.site_address.city,
            pincode: result.site_address.pincode,
            states: result.site_address.states,
          },
          customer_data: {
            id: result.customer_data.id,
            first_name: result.customer_data.first_name,
            last_name: result.customer_data.last_name,
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
      const response = await getOnGoingRGP(User.company_id);

      RGPS.value.pop();

      if (response) {
        await fillDetails(response);
      }
    });

    const onsubmit = async () => {
      
      loading.value = true;
      console.log(worksheetDetails.value);

      worksheetDetails.value.work_date = moment(
            worksheetDetails.value.work_date
          ).format("YYYY-MM-DD");
          worksheetDetails.value.start_time = moment(
            worksheetDetails.value.start_time
          ).format("YYYY-MM-DD HH:mm:ss");
          worksheetDetails.value.end_time = moment(
            worksheetDetails.value.end_time
          ).format("YYYY-MM-DD HH:mm:ss");
      console.log(worksheetDetails.value)
      if (
        worksheetDetails.value.tests.length === 0 &&
        worksheetDetails.value.other_test == ""
      ) {
        showErrorAlert(
          "Warning",
          "Please select at least one test or Specify any other test"
        );
        loading.value = false;
        return;
      }
      try {
        // Call your API here with the form values
        const response = await addDailyWorksheet(worksheetDetails.value);
        // console.log(response.error);
        if (!response.error) {
          // Handle successful API response
          //   console.log("API response:", response);
          loading.value = false;
          showSuccessAlert(
            "Success",
            "Today's Worksheet has been successfully submitted!"
          );

          // clear();
          route.push({ name: "dailyworksheet-list" });
        } else {
          // Handle API error response
          // const errorData = response.error;
          loading.value = false;
          showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
        }
      } catch (error) {
        // Handle any other errors during API call
        // console.error("API call error:", error);
        showErrorAlert("Error", "An error occurred during the API call.");
      }
      finally {
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
      RGPS,
      fillDetails,
      worksheetDetails,
      SetDetails,
      ServiceEngineers,
      CustomerData,
      SiteAddress,
      engineerSelect,
      ConductedTests,
      selectedTests,
      ToggleCheckBoxForTests,
      worksheetDetailsValidator,
      loading,
      onsubmit,
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