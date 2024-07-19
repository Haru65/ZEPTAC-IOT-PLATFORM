<template>
  <div style="width: 99%" class="bg-body p-12 rounded">
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--end::Form-->
        <VForm
          class="form"
          validate
          :validation-schema="worksheetDetailsValidator"
          @submit="submit"
        >
          <!--begin::Card body-->
          <div class="card-body p-sd-2 p-lg-9">
            <!-- extra fields -->
            <div class="row mb-6">
              <div class="form-group col-md-6 mb-8 mb-sd-8">
                <label
                  class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap"
                  >Gate Pass
                </label>
                <div>
                  <el-select
                    v-model="itemDetails.rgp_id"
                    filterable
                    placeholder="Please Select GatePass"
                    name="rgp_id"
                    @change="fetchRGP(itemDetails.rgp_id)"
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
                      v-for="item in RGatePasses"
                      :key="item.id"
                      :value="item.id"
                      :label="item.rgp_no"
                    />
                  </el-select>
                  <div
                    class="fv-plugins-message-container"
                    v-if="!itemDetails.rgp_id"
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
                    v-model="itemDetails.engineer_id"
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
                      v-for="engineer in Engineers"
                      :key="engineer.id"
                      :value="engineer.id"
                      :label="`${engineer.first_name} ${engineer.last_name}`"
                    />
                  </el-select>
                  <div
                    class="fv-plugins-message-container"
                    v-if="!itemDetails.engineer_id"
                  >
                    <div class="fv-help-block">
                      <ErrorMessage name="engineer_id" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="row mb-6" v-if="itemDetails.rgp_id">
                <!--begin::Col-->
                <div class="col-md-6 fv-row mb-8 mb-sd-8">
                  <!--begin::Label-->
                  <label class="fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                    >Customer :</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <div class="form-control form-control-lg form-control-solid">
                    <div>
                      {{ RgpData?.quotation?.customer.company_name || "" }}
                    </div>
                    <div class="mt-2 pt-4">
                      <h6 class="mt-5">Billing Address:</h6>
                      <div class="mt-2">
                        <div class="mb-1">
                          <br />
                          <span
                            v-show="RgpData?.quotation?.customer.company_name"
                          >
                            {{
                              `${
                                RgpData?.quotation?.customer.company_name || ""
                              }`
                            }}
                          </span>
                          <br />
                          <span>
                            {{ `${RgpData?.quotation?.customer.name}` }}
                          </span>
                          <!-- v-if company_data present -->
                          <div
                            v-show="RgpData?.quotation?.customer.company_name"
                          >
                            <br />
                            <span>
                              {{
                                `${RgpData?.quotation?.customer.address1 || ""}`
                              }}
                            </span>
                            <br />
                            <span>
                              {{
                                `${RgpData?.quotation?.customer.address2 || ""}`
                              }}
                            </span>
                          </div>
                          <div v-show="RgpData?.quotation?.customer.country">
                            <span>
                              {{
                                `${RgpData?.quotation?.customer.city || ""} - ${
                                  RgpData?.quotation?.customer.pincode || ""
                                }`
                              }}
                            </span>
                            <br />
                            <span>
                              {{
                                `${RgpData?.quotation?.customer.state || ""} ${
                                  RgpData?.quotation?.customer.country || ""
                                }`
                              }}
                            </span>
                            <br />
                          </div>
                        </div>
                        <br />
                      </div>
                    </div>
                  </div>

                  <!--end::Input-->
                </div>
                <!--end::Col-->
                <!--begin::Col-->
                <div class="col-md-6 fv-row mb-8 mb-sd-8">
                  <!--begin::Label-->
                  <label class="fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                    >Client :</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <div class="form-control form-control-lg form-control-solid">
                    <div>
                      {{ RgpData?.quotation?.clientx.company_name }}
                    </div>
                    <div class="mt-2 pt-4">
                      <h6 class="mt-5">Site Address:</h6>
                      <div class="mt-2">
                        <div class="mb-1" v-show="RgpData?.quotation?.clientx">
                          <br />
                          <span
                            v-show="RgpData?.quotation?.clientx.company_name"
                          >
                            {{
                              `${
                                RgpData?.quotation?.clientx.company_name || ""
                              }`
                            }}
                          </span>
                          <br />
                          <span>
                            {{ `${RgpData?.quotation?.clientx.name || ""}` }}
                          </span>
                          <!-- v-if company_data present -->
                          <div
                            v-show="RgpData?.quotation?.clientx.company_name"
                          >
                            <br />
                            <span>
                              {{
                                `${RgpData?.quotation?.clientx.address1 || ""}`
                              }}
                            </span>
                            <br />
                            <span>
                              {{
                                `${RgpData?.quotation?.clientx.address2 || ""}`
                              }}
                            </span>
                          </div>
                          <div v-show="RgpData?.quotation?.clientx.country">
                            <span>
                              {{
                                `${RgpData?.quotation?.clientx.city || ""} - ${
                                  RgpData?.quotation?.clientx.pincode || ""
                                }`
                              }}
                            </span>
                            <br />
                            <span>
                              {{
                                `${RgpData?.quotation?.clientx.state || ""} ${
                                  RgpData?.quotation?.clientx.country || ""
                                }`
                              }}
                            </span>
                            <br />
                          </div>
                        </div>
                        <br />
                      </div>
                    </div>
                  </div>

                  <!--end::Input-->
                </div>
                <!--end::Col-->
              </div>
              <!--end::Input group-->

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
                        v-model="itemDetails.work_status"
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
                        v-model="itemDetails.work_status"
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
                          v-model="itemDetails.work_date"
                          @change="setDates($event, 'work_date')"
                          placeholder="Pick Work Day"
                          :editable="false"
                        />
                      </div>
                    </span>
                    <!--end::Info-->
                  </label>
                  <div
                    class="fv-plugins-message-container"
                    v-if="!itemDetails.work_date"
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
                          id="start_time"
                          name="start_time"
                          v-model="itemDetails.start_time"
                          @change="setDateTiming($event, 'start_time')"
                          placeholder="Pick start time"
                          :editable="false"
                        />
                      </div>
                    </span>
                    <!--end::Info-->
                  </label>
                  <div
                    class="fv-plugins-message-container"
                    v-if="!itemDetails.start_time"
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
                          v-model="itemDetails.end_time"
                          @change="setDateTiming($event, 'end_time')"
                          placeholder="Pick end time"
                          :editable="false"
                        />
                      </div>
                    </span>
                    <!--end::Info-->
                  </label>
                  <div
                    class="fv-plugins-message-container"
                    v-if="!itemDetails.end_time"
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
                    v-model="itemDetails.scope_of_work"
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
                    v-model="itemDetails.problem"
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
                    v-model="itemDetails.other_test"
                  />
                </div>
              </div>

            <div class="row mb-6">
              <div class="form-group col-md-6 mb-8 mb-sd-8">
                <label
                  class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap"
                  >Standard Used</label
                >
                <div>
                  <el-select
                    filterable
                    placeholder="Please Select Standard Used..."
                    name="acceptance_criteria"
                    v-model="itemDetails.standard_used"
                  >
                    <el-option
                      value=""
                      disabled="disabled"
                      label="Please Select Standard Used..."
                      key=""
                    >
                      Please Select Standard Used...</el-option
                    >
                    <el-option
                      v-for="criteria in AcceptanceCriteria"
                      :key="criteria.id"
                      :value="criteria.id"
                      :label="criteria.certified"
                    />
                  </el-select>
                </div>
                <div
                  class="fv-plugins-message-container"
                  v-if="!itemDetails.standard_used"
                >
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
                  v-model="itemDetails.witnessed_by"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="witnessed_by" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer flex-center w-100">
            <!--begin::Button-->
            <button
              id="kt_modal_new_address_submit"
              type="submit"
              ref="submitButton"
              class="btn btn-lg btn-primary w-sd-25 w-lg-25"
            >
              <span class="indicator-label"> Save </span>
              <span class="indicator-progress">
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
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import ApiService from "@/core/services/ApiService";
import { addDailyWorksheet, getOnGoingRGP, getRGatePass } from "@/stores/api";
import { useAuthStore } from "@/stores/auth";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { useRouter } from "vue-router";
import { ConductedTests } from "@/core/model/conductedtests";
import Swal from "sweetalert2/dist/sweetalert2.js";
import moment from "moment";
import * as Yup from "yup";
import { AcceptanceCriteria } from "@/core/model/dailyworksheets";

interface Test {
  id: string;
  test: string;
}

interface Data {
  id: string;
  name: string;
  company_name: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

interface Quotation {
  id: string;
  quotation_no: string;
  customer: Data;
  client: Data;
  clientx: Data;
}

interface RGP {
  id: string;
  rgp_no: string;
  quotation_id: string;
}

interface Engineer {
  id: string;
  first_name: string;
  last_name: string;
}

interface RGPInformation {
  id: string;
  rgp_no: string;
  quotation_id: string;
  engineer: string[];
  Engineers: Array<Engineer>;
  quotation: Quotation;
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
  approval_status: string;
  tests: Array<Test>;
  other_test: string;
  standard_used: string;
  witnessed_by: string;
  created_by: string;
  updated_by: string;
  is_active: string;
}

export default defineComponent({
  name: "dailyworksheet-add",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  setup() {
    const submitButton = ref<null | HTMLButtonElement>(null);

    const auth = useAuthStore();
    const route = useRouter();
    const User = auth.GetUser();

    const selectedTests = ref([]);
    const loading = ref(false);

    const RGatePasses = ref<RGP[]>([]);
    const Engineers = ref<Engineer[]>([]);

    const RgpData = ref<RGPInformation>();

    const itemDetails = ref<worksheet>({
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
      approval_status: "1",
      standard_used: "",
      witnessed_by: "",
      created_by: User.id,
      updated_by: User.id,
      is_active: "1",
    });

    const worksheetDetailsValidator = Yup.object().shape({
      scope_of_work: Yup.string().required().label("Scope of Work"),
      witnessed_by: Yup.string().required().label("Witness"),
    });

    /* --------SET DATE-TIME LOGIC--------*/
    async function setDateTiming(e, dateType) {
      try {
        if (e != null) {
          if (e != "" && e != null) {
            itemDetails.value[dateType] = moment(e).format(
              "YYYY-MM-DD HH:mm:ss"
            );
          } else {
            itemDetails.value[dateType] = "";
          }
        } else {
          itemDetails.value[dateType] = "";
        }
      } catch (err) {
        itemDetails.value[dateType] = "";
      }
      console.log(itemDetails.value[dateType]);
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
      console.log(itemDetails.value[dateType]);
    }

    /* --------TEST SELECTION LOGIC--------*/
    const ToggleCheckBoxForTests = async (e) => {
      const selectedId = e.target.id;

      const { tests } = itemDetails.value;

      if (e.target.checked) {
        tests.push({
          id: selectedId,
          test: e.target.value,
        });
        itemDetails.value.tests = tests;
      } else {
        itemDetails.value.tests = tests.filter(
          (test) => test.id !== selectedId
        );
      }
    };

    /* --------HANDLE RGP SELECTION LOGIC--------*/
    const fetchRGP = async (rgpId: any) => {
      itemDetails.value.engineer_id = "";
      if (rgpId !== "") {
        itemDetails.value.rgp_id = rgpId;
        const response = await getRGatePass(rgpId);
        itemDetails.value.rgp_no = response.rgp_no;
        if (response) {
          RgpData.value = { ...response };
          Engineers.value = { ...response?.Engineers };
        }
      } else {
      }
    };

    onMounted(async () => {
      /* --------GET ALL IN PROCESS RGP LOGIC--------*/
      const response = await getOnGoingRGP(User.company_id);
      if (response) {
        RGatePasses.value = response.result.map(({ id, ...rest }) => ({
          id: id,
          ...rest,
        }));
      } else {
      }
    });

    const validateForm = (formData) => {
      for (const key in formData) {
        let value = formData[key];
        if (key !== "problem" && key !== "other_test") {
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
            value = value.trim();
            if (value === "") {
              return false;
            }
          } else {
          }
        }
      }
      return true;
    };

    const submit = async () => {
      loading.value = true;
      const result = validateForm(itemDetails.value);

      if (result == false) {
        loading.value = false;
        showErrorAlert("Warning", "Please fill all the details correctly.");
        return;
      }

      if (
        itemDetails.value.tests.length === 0 &&
        itemDetails.value.other_test == ""
      ) {
        showErrorAlert(
          "Warning",
          "Please select at least one test or Specify any other test"
        );
        loading.value = false;
        return;
      }

      try {
        if (submitButton.value) {
          // Activate indicator
          submitButton.value.setAttribute("data-kt-indicator", "on");
        }

        // Call your API here

        const response = await addDailyWorksheet(itemDetails.value);

        if (response?.success) {
          // Handle successful API response
          loading.value = false;
          showSuccessAlert(
            "Success",
            response.message || "Today's Worksheet Successfully Submitted!"
          );

          route.push({ name: "dailyworksheet-list" });
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
        if (submitButton.value) {
          submitButton.value.removeAttribute("data-kt-indicator");
        }
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
      submitButton,
      RGatePasses,
      fetchRGP,
      Engineers,
      RgpData,

      itemDetails,
      ConductedTests,
      selectedTests,
      ToggleCheckBoxForTests,
      worksheetDetailsValidator,
      loading,
      submit,
      AcceptanceCriteria,
      setDates,
      setDateTiming,
    };
  },
});
</script>
