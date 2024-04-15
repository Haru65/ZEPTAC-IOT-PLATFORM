<template>
  <div style="width: 99%" class="bg-body p-12 rounded">
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Form-->
        <VForm
          id="kt_account_profile_details_form"
          class="form"
          :validation-schema="itemDetailsValidator"
        >
          <!--begin::Card body-->
          <div class="card-body border-top p-6">
            <!--begin::Input group-->
            <div class="row mb-6" v-if="identifier == 'Admin'">
              <!--begin::Label-->
              <label
                class="col-lg-3 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                >Company</label
              >
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-9 fv-row">
                <el-select
                  v-model="itemDetails.company_id"
                  filterable
                  placeholder="Please Select Company..."
                >
                  <el-option
                    disabled="disabled"
                    value=""
                    label="Please Select Company..."
                  >
                    Please Select Company
                  </el-option>
                  <el-option
                    v-for="item in Companies"
                    :key="item.id"
                    :label="item.company_name"
                    :value="item.id"
                  />
                </el-select>
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="company_id" />
                  </div>
                </div>
              </div>
              <!--end::Col-->
            </div>

            <!-- extra fields -->
            <div class="row mb-6">
              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fw-semobold fw-bold text-gray-700 fs-6 text-nowrap"
                  >Name of Method</label
                >
                <Field
                  type="text"
                  name="method_name"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter Name of the Method"
                  v-model="itemDetails.method_name"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="method_name" />
                  </div>
                </div>
              </div>

              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6 text-nowrap"
                  >Date</label
                >
                <el-date-picker
                  type="date"
                  name="val_date"
                  id="val_date"
                  v-model="itemDetails.val_date"
                  @change="setDates($event, 'val_date')"
                  placeholder="Pick a day"
                  :editable="false"
                />
              </div>
            </div>
            <!--end::Input group-->

            <div class="row mb-6">
              <div class="form-group col-lg-12 col-md-12">
                <label
                  class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Application Area</label
                >
                <Field
                  type="text"
                  as="textarea"
                  name="application_area"
                  rows="3"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter Application Area"
                  v-model="itemDetails.application_area"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="application_area" />
                  </div>
                </div>
              </div>
            </div>

            <!-- extra fields -->
            <div class="row mb-6">
              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6 text-nowrap"
                  >Reference</label
                >
                <Field
                  type="text"
                  name="reference"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter Reference"
                  v-model="itemDetails.reference"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="reference" />
                  </div>
                </div>
              </div>
              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6 text-nowrap"
                  >Equipment Used</label
                >
                <Field
                  type="text"
                  name="equipment"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter Equipment Used"
                  v-model="itemDetails.equipment"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="equipment" />
                  </div>
                </div>
              </div>
            </div>
            <!--end::Input group-->

            <!-- extra fields -->
            <div class="row mb-6">
              <div class="form-group col-12">
                <label
                  class="col-lg-4 col-form-label required fw-semobold fw-bold text-gray-700 fs-6 text-nowrap"
                  >Reference Standard Used</label
                >
                <Field
                  type="text"
                  name="reference_standard"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter Reference Standard Used"
                  v-model="itemDetails.reference_standard"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="reference_standard" />
                  </div>
                </div>
              </div>
            </div>
            <!--end::Input group-->

            <div class="row mb-6">
              <div class="form-group col-12">
                <label
                  class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6 text-nowrap"
                  >Method of Validation</label
                >
                <div>
                  <el-select
                    name="method_validation"
                    v-model="itemDetails.method_validation"
                    filterable
                    placeholder="Select method of validation..."
                  >
                    <el-option
                      disabled="disabled"
                      value=""
                      label="Select method of validation..."
                    >
                      Select method of validation
                    </el-option>
                    <el-option
                      v-for="item in ValidationMethods"
                      :key="item.id"
                      :value="item.id"
                      :label="item.name"
                    />
                  </el-select>
                </div>
                <div
                  class="fv-plugins-message-container"
                  v-if="!itemDetails.method_validation"
                >
                  <div class="fv-help-block">
                    <ErrorMessage name="method_validation" />
                  </div>
                </div>
              </div>
            </div>

            <div class="table-responsive p-6 mb-6">
              <table
                class="table table-responsive table-bordered g-6 m-4 w-100 fw-bold text-gray-700"
              >
                <thead
                  class="fw-semibold fs-6 text-gray-700 text-center justify-content-center"
                >
                  <tr>
                    <th class="col-1" rowspan="2">Readings</th>
                    <th class="col-5" colspan="2">Laboratory Reading</th>
                    <th class="col-5" colspan="2">Reference Reading</th>
                    <th class="col-5" rowspan="2">En Ratio</th>
                    <th class="col-2" rowspan="2">Action</th>
                  </tr>
                  <tr
                    class="fs-6 fw-semibold text-gray-700 text-center justify-content-center"
                  >
                    <th>Measured value (LV)</th>
                    <th>
                      Measurement Uncertainty (U<subscript>LV</subscript>)
                    </th>
                    <th>Measured value (RV)</th>
                    <th>
                      Measurement √ Uncertainty (U<subscript>RV</subscript>)
                    </th>
                  </tr>
                </thead>
                <tbody class="text-center justify-content-center">
                  <tr
                    v-for="(data, index) in itemDetails.readings"
                    :key="index"
                  >
                    <td>
                      <span
                        class="form-control form-control-lg form-control-solid"
                      >
                        {{ index + 1 }}
                      </span>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="LV"
                        class="form-control form-control-lg form-control-solid min-w-100px"
                        placeholder="0"
                        v-model="data.laboratory.LV"
                        @keyup="setLaboratoryLV($event, index)"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="ULV"
                        class="form-control form-control-lg form-control-solid min-w-100px"
                        placeholder="0"
                        v-model="data.laboratory.ULV"
                        @keyup="setLaboratoryULV($event, index)"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="RV"
                        class="form-control form-control-lg form-control-solid min-w-100px"
                        placeholder="0"
                        v-model="data.reference.RV"
                        @keyup="setReferenceRV($event, index)"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="URV"
                        class="form-control form-control-lg form-control-solid min-w-100px"
                        placeholder="0"
                        v-model="data.reference.URV"
                        @keyup="setReferenceURV($event, index)"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        disabled
                        name="en_ratio"
                        class="form-control form-control-lg form-control-solid min-w-100px"
                        placeholder="0"
                        v-model="data.en_ratio"
                      />
                    </td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-sm rounded-circle btn-danger"
                        @click="removeReading(index)"
                      >
                        <span class="text-center">X</span>
                      </button>
                    </td>
                  </tr>
                  <tr
                    class="text-center"
                    v-if="itemDetails.readings.length === 0"
                  >
                    <td
                      colspan="7"
                      class="fw-semibold fs-6 text-gray-800 border-bottom border-gray-200 text-align-center"
                    >
                      No Readings.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="text-start mt-8">
              <div class="input-group p-2 flex gap-6">
                <div class="input-group-append">
                  <button
                    class="btn btn-md btn-primary"
                    type="button"
                    @click="addReading"
                  >
                    + Add Reading
                  </button>
                </div>
              </div>
            </div>

            <div class="row mb-6">
              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                  >Remark</label
                >
                <div class="form-control form-control-lg form-control-solid">
                  {{ itemDetails.remark ? itemDetails.remark : "......." }}
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <button
              @click="clear"
              class="btn btn-lg btn-danger w-sd-25 w-lg-25"
            >
              Discard
            </button>
            <!--end::Button-->
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <!--begin::Button-->
            <span
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-lg btn-primary w-sd-25 w-lg-25"
              @click="submit()"
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
        <!--end::Form-->
      </div>
    </div>
  </div>
</template>
    
    <script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import {
  addMethodValidation,
  addThermalInstrument,
  getCompanies,
} from "@/stores/api";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import packages from "@/core/config/PackagesConfig";
import { limit, Identifier } from "@/core/config/WhichUserConfig";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import ApiService from "@/core/services/ApiService";
import moment from "moment";
import { ValidationMethods } from "@/core/model/validation_method";
import type { ComplaintStatus } from "@/core/model/complaints";

interface itemDetails {
  method_name: string;
  val_date: string;
  application_area: string;
  reference: string;
  equipment: string;
  reference_standard: string;
  method_validation: string;

  readings: {
    laboratory: {
      LV: string;
      ULV: string;
    };
    reference: {
      RV: string;
      URV: string;
    };
    en_ratio: number;
  }[];
  status: string;
  remark: string;

  company_id: string;
  created_by: number;
  updated_by: number;
  is_active: number;
}

export default defineComponent({
  name: "method-validation-add",
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
    const User = auth.GetUser();
    const Companies = ref([{ id: "", company_name: "" }]);
    let limit = ref(500);

    //CONSTANTS

    const EN_VALUE = 1;
    const SATISFACTORY = "Satisfactory";
    const UNSATISFACTORY = "Unsatisfactory";

    const NOTES = `En ≤1: The laboratory is performing satisfactorily\nEn >1: The laboratory is performing unsatisfactory and requires corrective actions`;

    const itemDetailsValidator = Yup.object().shape({
      method_name: Yup.string().required().label("Name of Method"),
      application_area: Yup.string().required().label("Application area"),
      reference: Yup.string().required().label("Reference"),
      equipment: Yup.string().required().label("Equipment Used"),
      reference_standard: Yup.string().required().label("Reference Standed"),
    });

    const getdropcomp = async () => {
      ApiService.setHeader();
      const response = await getCompanies(`fetchAll=true`);
      if (response.result != null && response.result) {
        Companies.value.push(
          ...response.result?.map(({ created_at, ...rest }) => ({
            ...rest,
            created_at: moment(created_at).format("MMMM Do YYYY"),
          }))
        );
        console.log(Companies);
      }
    };

    const itemDetails = ref<itemDetails>({
      method_name: "",
      val_date: "",
      application_area: "",
      reference: "",
      equipment: "",
      reference_standard: "",
      method_validation: "",

      readings: [
        {
          laboratory: {
            LV: "",
            ULV: "",
          },
          reference: {
            RV: "",
            URV: "",
          },
          en_ratio: 0,
        },
      ],
      status: "",
      remark: "",

      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
      is_active: 1,
    });

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

    onMounted(async () => {
      Companies.value.pop();
      if (User.role_id === 1) {
        await getdropcomp();
      }
    });

    const addReading = () => {
      itemDetails.value.readings.push({
        laboratory: {
          LV: "",
          ULV: "",
        },
        reference: {
          RV: "",
          URV: "",
        },
        en_ratio: 0,
      });
    };

    const removeReading = async (index) => {
      if (index != null) {
        itemDetails.value.readings.splice(index, 1);
        const result = await calculateOverallStatus(itemDetails.value.readings);
        if (result) {
          itemDetails.value.status = "1";
          itemDetails.value.remark = SATISFACTORY;
        } else {
          itemDetails.value.status = "2";
          itemDetails.value.remark = UNSATISFACTORY;
        }
      }
    };

    async function calculateOverallStatus(items) {
      const allEnRatiosSatisfactory = items.every((item) => item.en_ratio <= EN_VALUE);
      return allEnRatiosSatisfactory ? true : false;
    }

    // Function to check if a string can be converted to a number
    function isNumeric(str: string | number): boolean {
      return !isNaN(parseFloat(str as string)) && isFinite(str as number);
    }

    // Calculate En Ratio
    async function calculateEnRatio(index) {
      if (index >= 0 && index < itemDetails.value.readings.length) {
        // const reading = itemDetails.value.readings[index];
        const lab = itemDetails.value.readings[index].laboratory;
        const ref = itemDetails.value.readings[index].reference;

        // Check if all values can be converted to numbers
        if (
          isNumeric(lab.LV) &&
          isNumeric(lab.ULV) &&
          isNumeric(ref.RV) &&
          isNumeric(ref.URV)
        ) {
          // Convert string values to numbers
          const numLV = parseFloat(lab.LV);
          const numULV = parseFloat(lab.ULV);
          const numRV = parseFloat(ref.RV);
          const numURV = parseFloat(ref.URV);

          // Calculate the en_ratio using the formula
          const en_ratio =
            (await (numLV - numRV)) /
            Math.sqrt(Math.pow(numULV, 2) + Math.pow(numURV, 2));

          // Update the en_ratio property in the readings array
          itemDetails.value.readings[index].en_ratio = Number(
            en_ratio.toFixed(2)
          );
        } else {
          itemDetails.value.readings[index].en_ratio = 0;
        }

        const result = await calculateOverallStatus(itemDetails.value.readings)
        if(result){
          itemDetails.value.status = "1";
          itemDetails.value.remark = SATISFACTORY;
        }
        else{
          itemDetails.value.status = "2";
          itemDetails.value.remark = UNSATISFACTORY;
        }
      }
    }

    // Handle All Inputs
    async function setLaboratoryLV(event, index) {
      if (event.target != null) {
        itemDetails.value.readings[index].laboratory.LV = await event.target
          .value;

        await calculateEnRatio(index);
      } else {
        itemDetails.value.readings[index].laboratory.LV = "";
      }
    }

    async function setLaboratoryULV(event, index) {
      if (event.target != null) {
        itemDetails.value.readings[index].laboratory.ULV = await event.target
          .value;

        await calculateEnRatio(index);
      } else {
        itemDetails.value.readings[index].laboratory.ULV = "";
      }
    }

    async function setReferenceRV(event, index) {
      if (event.target != null) {
        itemDetails.value.readings[index].reference.RV = await event.target
          .value;

        await calculateEnRatio(index);
      } else {
        itemDetails.value.readings[index].reference.RV = "";
      }
    }

    async function setReferenceURV(event, index) {
      if (event.target != null) {
        itemDetails.value.readings[index].reference.URV = await event.target
          .value;

        await calculateEnRatio(index);
      } else {
        itemDetails.value.readings[index].reference.URV = "";
      }
    }

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
      loading.value = true;

      try {

        if (itemDetails.value.readings.length === 0) {
          showErrorAlert("Warning", "Please Fill Atleast One Reading");
          loading.value = false;
          return;
        }

        if (validateForm(itemDetails)) {
          
          const response = await addMethodValidation(itemDetails.value);
          if (!response.error) {
            showSuccessAlert(
              "Success",
              "Method Validation has been successfully inserted!"
            );
            loading.value = false;
            router.push({ name: "method-validation-list" });
          } else {
            showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
            loading.value = false;
            return;
          }
        } else {
          console.log(validateForm(itemDetails));
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

    const clear = () => {
      itemDetails.value = {
        method_name: "",
        val_date: "",
        application_area: "",
        reference: "",
        equipment: "",
        reference_standard: "",
        method_validation: "",

        readings: [
          {
            laboratory: {
              LV: "",
              ULV: "",
            },
            reference: {
              RV: "",
              URV: "",
            },
            en_ratio: 0,
          },
        ],
        status: "",
        remark: "",

        company_id: User.company_id,
        created_by: User.id,
        updated_by: User.id,
        is_active: 1,
      };
    };
    return {
      itemDetails,
      itemDetailsValidator,
      submit,
      loading,
      packages,
      limit,
      identifier,
      Companies,
      User,
      clear,
      setDates,
      ValidationMethods,
      addReading,
      removeReading,
      setLaboratoryLV,
      setLaboratoryULV,
      setReferenceRV,
      setReferenceURV,
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
</style>