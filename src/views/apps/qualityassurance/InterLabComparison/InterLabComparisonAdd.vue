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
          novalidate
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
                  >Artifact's Name</label
                >
                <Field
                  type="text"
                  name="artifact_name"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter Artifact's Name"
                  v-model="itemDetails.artifact_name"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="artifact_name" />
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
                  name="lab_date"
                  id="lab_date"
                  v-model="itemDetails.lab_date"
                  @change="setDates($event, 'lab_date')"
                  placeholder="Pick a day"
                  :editable="false"
                />
              </div>
            </div>
            <!--end::Input group-->

            <div class="row mb-6">
              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fw-semobold fw-bold text-gray-700 fs-6 text-nowrap"
                  >Artifact's ID No.</label
                >
                <Field
                  type="text"
                  name="artifact_id"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter Artifact's ID No."
                  v-model="itemDetails.artifact_id"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="artifact_id" />
                  </div>
                </div>
              </div>

              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fw-semobold fw-bold text-gray-700 fs-6 text-nowrap"
                  >Range / Size</label
                >
                <Field
                  type="text"
                  name="ranges"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter the range"
                  v-model="itemDetails.ranges"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="ranges" />
                  </div>
                </div>
              </div>
            </div>

            <div class="row mb-6">
              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fw-semobold fw-bold text-gray-700 fs-6 text-nowrap"
                  >Serial No.</label
                >
                <Field
                  type="text"
                  name="serial_no"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter Serial No."
                  v-model="itemDetails.serial_no"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="serial_no" />
                  </div>
                </div>
              </div>

              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fw-semobold fw-bold text-gray-700 fs-6 text-nowrap"
                  >Least Count</label
                >
                <Field
                  type="text"
                  name="least_count"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter the least count"
                  v-model="itemDetails.least_count"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="least_count" />
                  </div>
                </div>
              </div>
            </div>

            <div class="row mb-6">
              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fw-semobold fw-bold text-gray-700 fs-6 text-nowrap"
                  >Make</label
                >
                <Field
                  type="text"
                  name="make"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Make By"
                  v-model="itemDetails.make"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="make" />
                  </div>
                </div>
              </div>

              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fw-semobold fw-bold text-gray-700 fs-6 text-nowrap"
                  >Model No.</label
                >
                <Field
                  type="text"
                  name="model_no"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter Model No."
                  v-model="itemDetails.model_no"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="model_no" />
                  </div>
                </div>
              </div>
            </div>

            <!--begin::Accordion-->
            <div class="accordion mt-6" id="kt_accordion_1">
              <div class="accordion-item">
                <h2 class="accordion-header" :id="'kt_accordion_1_header_'">
                  <button
                    class="accordion-button fs-4 fw-semibold"
                    type="button"
                    :data-bs-toggle="'collapse'"
                    :data-bs-target="'#kt_accordion_1_body_'"
                    :aria-controls="'kt_accordion_1_body_'"
                  >
                    Participating Laboratory
                  </button>
                </h2>
                <div
                  :id="'kt_accordion_1_body_'"
                  class="accordion-collapse"
                  :aria-labelledby="'kt_accordion_1_header_'"
                  data-bs-parent="#kt_accordion_1"
                >
                  <div class="accordion-body">
                    <!-- extra fields -->
                    <div class="row mb-6">
                      <div class="form-group col-12">
                        <label
                          class="col-lg-4 col-form-label required fw-semobold fw-bold text-gray-700 fs-6 text-nowrap"
                          >Participating Lab Name</label
                        >
                        <Field
                          type="text"
                          name="participate_lab_name"
                          class="form-control form-control-lg form-control-solid"
                          placeholder="Partipating laboratory name..."
                          v-model="itemDetails.participate_lab_name"
                        />
                        <div class="fv-plugins-message-container">
                          <div class="fv-help-block">
                            <ErrorMessage name="participate_lab_name" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <!--end::Input group-->

                    <div class="row mb-6">
                      <div class="form-group col-md-6">
                        <label
                          class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                          >Participating Lab ID</label
                        >
                        <Field
                          type="text"
                          name="participate_lab_id"
                          class="form-control form-control-lg form-control-solid"
                          placeholder="Partipating laboratory Id"
                          v-model="itemDetails.participate_lab_id"
                        />
                        <div class="fv-plugins-message-container">
                          <div class="fv-help-block">
                            <ErrorMessage name="participate_lab_id" />
                          </div>
                        </div>
                      </div>
                      <div class="form-group col-md-6">
                        <label
                          class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                          >Participating Lab Address</label
                        >
                        <Field
                          type="text"
                          as="textarea"
                          name="participate_lab_address"
                          class="form-control form-control-lg form-control-solid"
                          placeholder="Partipating laboratory Address"
                          v-model="itemDetails.participate_lab_address"
                        />
                        <div class="fv-plugins-message-container">
                          <div class="fv-help-block">
                            <ErrorMessage name="participate_lab_address" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--end::Accordion-->

            <!--begin::Accordion-->
            <div class="accordion mt-6" id="kt_accordion_2">
              <div class="accordion-item">
                <h2 class="accordion-header" :id="'kt_accordion_2_header_'">
                  <button
                    class="accordion-button fs-4 fw-semibold"
                    type="button"
                    :data-bs-toggle="'collapse'"
                    :data-bs-target="'#kt_accordion_2_body_'"
                    :aria-controls="'kt_accordion_2_body_'"
                  >
                    Reference Laboratory
                  </button>
                </h2>
                <div
                  :id="'kt_accordion_2_body_'"
                  class="accordion-collapse"
                  :aria-labelledby="'kt_accordion_2_header_'"
                  data-bs-parent="#kt_accordion_2"
                >
                  <div class="accordion-body">
                    <!-- extra fields -->
                    <div class="row mb-6">
                      <div class="form-group col-12">
                        <label
                          class="col-lg-4 col-form-label required fw-semobold fw-bold text-gray-700 fs-6 text-nowrap"
                          >Reference Lab Name</label
                        >
                        <Field
                          type="text"
                          name="reference_lab_name"
                          class="form-control form-control-lg form-control-solid"
                          placeholder="Reference laboratory name..."
                          v-model="itemDetails.reference_lab_name"
                        />
                        <div class="fv-plugins-message-container">
                          <div class="fv-help-block">
                            <ErrorMessage name="reference_lab_name" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <!--end::Input group-->

                    <div class="row mb-6">
                      <div class="form-group col-md-6">
                        <label
                          class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                          >Reference Lab ID</label
                        >
                        <Field
                          type="text"
                          name="reference_lab_id"
                          class="form-control form-control-lg form-control-solid"
                          placeholder="Reference laboratory Id"
                          v-model="itemDetails.reference_lab_id"
                        />
                        <div class="fv-plugins-message-container">
                          <div class="fv-help-block">
                            <ErrorMessage name="reference_lab_id" />
                          </div>
                        </div>
                      </div>
                      <div class="form-group col-md-6">
                        <label
                          class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                          >Reference Lab Address</label
                        >
                        <Field
                          type="text"
                          as="textarea"
                          name="reference_lab_address"
                          class="form-control form-control-lg form-control-solid"
                          placeholder="Reference laboratory Address"
                          v-model="itemDetails.reference_lab_address"
                        />
                        <div class="fv-plugins-message-container">
                          <div class="fv-help-block">
                            <ErrorMessage name="reference_lab_address" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--end::Accordion-->

            <div class="table-responsive p-6 mb-6">
              <table
                class="table table-responsive table-bordered g-6 m-4 w-100 fw-bold text-gray-700"
              >
                <thead
                  class="fw-semibold fs-6 text-gray-700 text-center justify-content-center"
                >
                  <tr>
                    <th class="col-1" rowspan="2">Readings</th>
                    <th class="col-1" rowspan="2">Nominal Size</th>
                    <th class="col-5" colspan="2">Participating Laboratory</th>
                    <th class="col-5" colspan="2">Reference Laboratory</th>
                    <th class="col-5" rowspan="2">En Ratio</th>
                    <th class="col-2" rowspan="2">Action</th>
                  </tr>
                  <tr
                    class="fs-6 fw-semibold text-gray-700 text-center justify-content-center"
                  >
                    <th>Observed (LV)</th>
                    <th>Uncertainty / CMC (U<subscript>LV</subscript>)</th>
                    <th>Observed value (RV)</th>
                    <th>Uncertainty / CMC (U<subscript>RV</subscript>)</th>
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
                        :name="'LV' + index"
                        class="form-control form-control-lg form-control-solid min-w-100px"
                        placeholder="Nominal Size"
                        v-model="data.nominal_size"
                      />
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
                      colspan="8"
                      class="fw-semibold fs-6 text-gray-800 border-bottom border-gray-200 text-align-center"
                    >
                      No Readings.
                    </td>
                  </tr>
                </tbody>
                <div class="text-start">
                  <div class="input-group p-2 flex gap-6">
                    <div class="input-group-append">
                      <button
                        class="btn btn-sm btn-success rounded-circle fs-6"
                        type="button"
                        @click="addReading"
                      >
                        <span class="text-center">+</span>
                      </button>
                    </div>
                  </div>
                </div>
              </table>
            </div>

            <div class="row mb-6">
              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                  >Conclusion</label
                >
                <div class="form-control form-control-lg form-control-solid">
                  Above Study Found
                  {{ itemDetails.remark ? itemDetails.remark : "" }}
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
import { addInterLabComparison, getCompanies } from "@/stores/api";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import packages from "@/core/config/PackagesConfig";
import { limit, Identifier } from "@/core/config/WhichUserConfig";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import ApiService from "@/core/services/ApiService";
import moment from "moment";

interface itemDetails {
  artifact_name: string;
  lab_date: string;
  artifact_id: string;
  ranges: string;
  serial_no: string;
  least_count: string;
  make: string;
  model_no: string;

  participate_lab_name: string;
  participate_lab_id: string;
  participate_lab_address: string;

  reference_lab_name: string;
  reference_lab_id: string;
  reference_lab_address: string;

  readings: {
    nominal_size: string;
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
  name: "interlaboratory-add",
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
      artifact_name: "",
      lab_date: "",
      artifact_id: "",
      ranges: "",
      serial_no: "",
      least_count: "",
      make: "",
      model_no: "",

      participate_lab_name: "",
      participate_lab_id: "",
      participate_lab_address: "",

      reference_lab_name: "",
      reference_lab_id: "",
      reference_lab_address: "",

      readings: [
        {
          nominal_size: "",
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

    const itemDetailsValidator = Yup.object().shape({
      artifact_name: Yup.string().required().label("Artifact's Name"),
      artifact_id: Yup.string().required().label("Artifact's ID No."),
      ranges: Yup.string().required().label("Range/Size"),
      serial_no: Yup.string().required().label("Serial No."),
      least_count: Yup.string().required().label("Least Count"),
      make: Yup.string().required().label("Make"),
      model_no: Yup.string().required().label("Model No."),

      participate_lab_name: Yup.string()
        .required()
        .label("Participating Lab Name"),
      participate_lab_id: Yup.string().required().label("Participating Lab ID"),
      participate_lab_address: Yup.string()
        .required()
        .label("Participating Lab Address"),

      reference_lab_name: Yup.string().required().label("Reference Lab Name"),
      reference_lab_id: Yup.string().required().label("Reference Lab ID"),
      reference_lab_address: Yup.string()
        .required()
        .label("Reference Lab Address"),
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
        nominal_size: "",
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

        const result = await calculateOverallStatus(itemDetails.value.readings);
        if (result) {
          itemDetails.value.status = "1";
          itemDetails.value.remark = SATISFACTORY;
        } else {
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
          const response = await addInterLabComparison(itemDetails.value);
          if (!response.error) {
            showSuccessAlert(
              "Success",
              "Interlaboratory Comparison has been successfully inserted!"
            );
            loading.value = false;
            router.push({ name: "interlaboratory-list" });
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
        artifact_name: "",
        lab_date: "",
        artifact_id: "",
        ranges: "",
        serial_no: "",
        least_count: "",
        make: "",
        model_no: "",

        participate_lab_name: "",
        participate_lab_id: "",
        participate_lab_address: "",

        reference_lab_name: "",
        reference_lab_id: "",
        reference_lab_address: "",

        readings: [
          {
            nominal_size: "",
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