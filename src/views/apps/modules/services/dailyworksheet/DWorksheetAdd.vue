<template>
  <div style="width: 99%" class="bg-body p-4 rounded">
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered">
      <!--begin::Modal content-->
      <div class="modal-content">
        <VForm
          class="form"
          validate
          :validation-schema="worksheetDetailsValidator"
          @submit="submit"
        >
          <div class="card-body p-4">
            <!-- Row 1 -->
            <div class="row g-6 mb-4">
              <div class="col-md-4">
                <label class="form-label required fw-bold">Gate Pass</label>
                <el-select
                  v-model="itemDetails.rgp_id"
                  filterable
                  placeholder="Select GatePass"
                  @change="fetchRGP(itemDetails.rgp_id)"
                  class="w-100"
                >
                  <el-option
                    v-for="item in RGatePasses"
                    :key="item.id"
                    :value="item.id"
                    :label="item.rgp_no"
                  />
                </el-select>
                <ErrorMessage name="rgp_id" class="text-danger small" />
              </div>

              <div class="col-md-4">
                <label class="form-label required fw-bold"
                  >Service Engineer</label
                >
                <el-select
                  v-model="itemDetails.engineer_id"
                  filterable
                  placeholder="Select Engineer"
                  class="w-100"
                >
                  <el-option
                    v-for="engineer in Engineers"
                    :key="engineer.id"
                    :value="engineer.id"
                    :label="`${engineer.first_name} ${engineer.last_name}`"
                  />
                </el-select>
                <ErrorMessage name="engineer_id" class="text-danger small" />
              </div>

              <div class="col-md-4">
                <label class="form-label required fw-bold">Work Status</label>
                <div class="d-flex gap-3 my-6">
                  <div class="form-check">
                    <input
                      type="radio"
                      class="form-check-input"
                      id="ongoing"
                      value="1"
                      v-model="itemDetails.work_status"
                    />
                    <label class="form-check-label" for="ongoing"
                      >Ongoing</label
                    >
                  </div>
                  <div class="form-check">
                    <input
                      type="radio"
                      class="form-check-input"
                      id="completed"
                      value="2"
                      v-model="itemDetails.work_status"
                    />
                    <label class="form-check-label" for="completed"
                      >Completed</label
                    >
                  </div>
                </div>
              </div>
            </div>

            <!-- Customer/Client Info Row -->
            <div class="row g-6 mb-4" v-if="itemDetails.rgp_id">
              <div class="col-md-6">
                <div class="border rounded p-3 h-100">
                  <label class="fw-bold mb-2">Customer</label>
                  <div class="small">
                    <div class="fw-semibold">
                      {{ RgpData?.quotation?.customer.company_name || "" }}
                    </div>
                    <div class="mt-2 fw-semibold">Billing Address:</div>
                    <div>
                      {{ RgpData?.quotation?.customer.name }}<br />
                      <template
                        v-if="RgpData?.quotation?.customer.company_name"
                      >
                        {{ RgpData?.quotation?.customer.company_name }}<br />
                        {{ RgpData?.quotation?.customer.address1 }}<br />
                        {{ RgpData?.quotation?.customer.address2 }}<br />
                      </template>
                      <template v-if="RgpData?.quotation?.customer.country">
                        {{ RgpData?.quotation?.customer.city }} -
                        {{ RgpData?.quotation?.customer.pincode }}<br />
                        {{ RgpData?.quotation?.customer.state }}
                        {{ RgpData?.quotation?.customer.country }}
                      </template>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="border rounded p-3 h-100">
                  <label class="fw-bold mb-2">Client</label>
                  <div class="small">
                    <div class="fw-semibold">
                      {{ RgpData?.quotation?.clientx.company_name }}
                    </div>
                    <div class="mt-2 fw-semibold">Site Address:</div>
                    <div>
                      {{ RgpData?.quotation?.clientx.name }}<br />
                      <template v-if="RgpData?.quotation?.clientx.company_name">
                        {{ RgpData?.quotation?.clientx.company_name }}<br />
                        {{ RgpData?.quotation?.clientx.address1 }}<br />
                        {{ RgpData?.quotation?.clientx.address2 }}<br />
                      </template>
                      <template v-if="RgpData?.quotation?.clientx.country">
                        {{ RgpData?.quotation?.clientx.city }} -
                        {{ RgpData?.quotation?.clientx.pincode }}<br />
                        {{ RgpData?.quotation?.clientx.state }}
                        {{ RgpData?.quotation?.clientx.country }}
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Row 2 -->
            <div class="row g-6 mb-4">
              <div class="col-md-4">
                <label class="form-label required fw-bold">Work Date</label>
                <el-date-picker
                  v-model="itemDetails.work_date"
                  type="date"
                  placeholder="Select date"
                  @change="setDates($event, 'work_date')"
                  class="w-100"
                />
                <ErrorMessage name="work_date" class="text-danger small" />
              </div>

              <div class="col-md-4">
                <label class="form-label required fw-bold">Start Time</label>
                <el-time-picker
                  v-model="itemDetails.start_time"
                  placeholder="Select time"
                  @change="setDateTiming($event, 'start_time')"
                  class="w-100"
                />
                <ErrorMessage name="start_time" class="text-danger small" />
              </div>

              <div class="col-md-4">
                <label class="form-label required fw-bold">End Time</label>
                <el-time-picker
                  v-model="itemDetails.end_time"
                  placeholder="Select time"
                  @change="setDateTiming($event, 'end_time')"
                  class="w-100"
                />
                <ErrorMessage name="end_time" class="text-danger small" />
              </div>
            </div>

            <!-- Row 3 -->
            <div class="row g-6 mb-4 mt-4">
              <div class="col-md-4">
                <label class="form-label required fw-bold">Scope of Work</label>
                <Field
                  as="textarea"
                  name="scope_of_work"
                  rows="2"
                  class="form-control"
                  v-model="itemDetails.scope_of_work"
                />
                <ErrorMessage name="scope_of_work" class="text-danger small" />
              </div>

              <div class="col-md-4">
                <label class="form-label fw-bold">Problem Faced</label>
                <Field
                  as="textarea"
                  name="problem"
                  rows="2"
                  class="form-control"
                  v-model="itemDetails.problem"
                />
              </div>

              <div class="col-md-4">
                <label class="form-label required fw-bold">Standard Used</label>
                <el-select
                  v-model="itemDetails.standard_used"
                  filterable
                  placeholder="Select standard"
                  class="w-100"
                >
                  <el-option
                    v-for="criteria in AcceptanceCriteria"
                    :key="criteria.id"
                    :value="criteria.id"
                    :label="criteria.certified"
                  />
                </el-select>
                <ErrorMessage name="standard_used" class="text-danger small" />
              </div>
            </div>

            <!-- Tests Conducted -->
            <div class="mb-4">
              <label class="form-label required fw-bold">Tests Conducted</label>
              <div class="row g-3">
                <div
                  class="col-md-4 col-lg-3 col-6"
                  v-for="test in ConductedTests"
                  :key="test.id"
                >
                  <div class="form-check">
                    <Field
                      type="checkbox"
                      name="test"
                      :value="test.test"
                      :id="'test-' + test.id.toString()"
                      class="form-check-input"
                      @click="ToggleCheckBoxForTests($event)"
                    />
                    <label
                      class="form-check-label text-gray-700"
                      :for="'test-' + test.id.toString()"
                    >
                      {{ test.test }}
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <!-- Row 4 -->
            <div class="row g-4 mb-4">
              <div class="col-md-4">
                <label class="form-label fw-bold">Other Test</label>
                <Field
                  as="textarea"
                  name="other_test"
                  rows="2"
                  class="form-control"
                  v-model="itemDetails.other_test"
                />
              </div>

              <div class="col-md-4">
                <label class="form-label required fw-bold">Witnessed By</label>
                <Field
                  type="text"
                  name="witnessed_by"
                  class="form-control"
                  v-model="itemDetails.witnessed_by"
                />
                <ErrorMessage name="witnessed_by" class="text-danger small" />
              </div>
            </div>
          </div>
          <div class="modal-footer flex-center mt-6">
            <!--begin::Button-->
            <button
              type="submit"
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-lg btn-primary w-sd-25 w-lg-25"
            >
              <span v-if="!loading" class="indicator-label"> Submit </span>
              <span v-if="loading" class="indicator-progress">
                Please wait...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </button>
            <!--end::Button-->
          </div>
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
        try {
          itemDetails.value.rgp_id = rgpId;
          const response = await getRGatePass(rgpId);

          if (response.success) {
            itemDetails.value.rgp_no = response.result.rgp_no;
            RgpData.value = { ...response.result };
            Engineers.value = { ...response?.result.Engineers };
          } else {
            console.error(
              `Error Occured in getRGatePass : ${
                response.message || "Error Occured in API"
              }`
            );
          }
        } catch (err) {
          console.error(`Error Occured in getRGatePass : ${err}`);
        }
      } else {
      }
    };

    onMounted(async () => {
      /* --------GET ALL IN PROCESS RGP LOGIC--------*/

      try {
        const response = await getOnGoingRGP(User.company_id);

        if (response.success) {
          if (response.result != null && response.result) {
            RGatePasses.value = response.result.map(({ id, ...rest }) => ({
              id: id,
              ...rest,
            }));
          }
        } else {
          console.error(
            `Error Occured in getOnGoingRGP : ${
              response.message || "Error Occured in API"
            }`
          );
        }
      } catch (err) {
        console.error(`Error Occured in getOnGoingRGP : ${err}`);
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
