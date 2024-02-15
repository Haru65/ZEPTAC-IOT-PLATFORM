<template>
  <!--begin::Wrapper-->
  <div class="w-100">
    <!--begin::Heading-->
    <div class="pb-10 pb-lg-10">
      <!--begin::Title-->
      <h2 class="fw-bold d-flex align-items-center text-dark">
        <span class="badge-light-primary rounded p-3">
          Thermal Mapping Report Details
        </span>
      </h2>
      <!--end::Title-->
    </div>
    <!--end::Heading-->

    <!--begin::Input group-->
    <div class="row mb-6">
      <!--begin::Col-->
      <div class="col-md-6 fv-row mb-8 mb-sd-8">
        <!--begin::Label-->
        <label class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
          >Returnable Gate Pass</label
        >
        <!--end::Label-->

        <div>
          <el-select
            v-model="step1Data.rgp_id"
            name="rgp_id"
            filterable
            placeholder="Please Select GatePass"
            @change="SetDetails($event)"
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
              v-for="item in $props.ongoingRGPS"
              :key="item.id"
              :value="item.id"
              :label="item.rgp_no"
            />
          </el-select>
        </div>

        <div class="fv-help-block">
          <ErrorMessage class="invalid-feedback" name="rgp_id" />
        </div>
        <!--end::Input-->
      </div>
      <!--end::Col-->
    </div>
    <!--end::Input group-->

    <div class="row mb-2" v-if="step1Data.rgp_id">
      <div class="form-group col-md-6 mb-8 mb-sd-8">
        <label
          class="col-lg-4 col-form-label fs-5 fw-bold text-gray-700 text-nowrap"
          >Customer Name</label
        >
        <div class="form-control form-control-solid">
          <span class="fs-5 fw-bold text-gray-700">
            {{ step1Data.customer_name }}
          </span>
        </div>
      </div>
      <div class="form-group col-md-6 mb-8 mb-sd-8">
        <label
          class="col-lg-4 col-form-label fs-5 fw-bold text-gray-700 text-nowrap"
          >Site Location</label
        >
        <div class="form-control form-control-solid">
          <span class="fs-5 fw-bold text-gray-700">
            {{ step1Data.site_address.company_name }}
            {{ step1Data.site_address.address1 }}
            {{ step1Data.site_address.address2 }}
            {{ step1Data.site_address.city }}
            {{ step1Data.site_address.pincode }}
            {{ step1Data.site_address.states }}
            {{ step1Data.site_address.country }}
          </span>
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
            <span class="fs-5 fw-bold text-gray-700 text-nowrap"
              >Validation Start Date</span
            >
            <div class="block">
              <el-date-picker
                type="date"
                name="val_start_date"
                id="val_start_date"
                placeholder="Pick a Day"
                @change="startDateSelected"
                v-model="step1Data.val_start_date"
              />
            </div>
          </span>
          <!--end::Info-->
        </label>
        <div
          class="fv-plugins-message-container"
          v-if="!step1Data.val_start_date"
        >
          <div class="fv-help-block">
            <ErrorMessage name="val_start_date" />
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
              >Start Time</span
            >
            <div class="block">
              <el-time-picker
                type="time"
                name="start_time"
                id="start_time"
                placeholder="Pick a Day"
                @change="startTimeSelected"
                v-model="step1Data.start_time"
              />
            </div>
          </span>
          <!--end::Info-->
        </label>
        <div class="fv-plugins-message-container" v-if="!step1Data.start_time">
          <div class="fv-help-block">
            <ErrorMessage name="start_time" />
          </div>
        </div>
      </div>
    </div>

    <!-- extra fields -->
    <div class="row mb-6">
      <div class="form-group col-md-6">
        <label
          class="col-lg-4 col-form-label required fw-semobold fw-bold text-gray-700 fs-6 text-nowrap"
          >AcceptanceCriteria for Temperature</label
        >
        <Field
          type="text"
          name="acc_for_temp"
          class="form-control form-control-lg form-control-solid"
          placeholder="Enter Criteria for Temperature"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="acc_for_temp" />
          </div>
        </div>
      </div>

      <div class="form-group col-md-6">
        <label
          class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
          >AcceptanceCriteria for Humidity</label
        >
        <Field
          type="text"
          name="acc_for_rh"
          class="form-control form-control-lg form-control-solid"
          placeholder="Enter Criteria for Humidity"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="acc_for_rh" />
          </div>
        </div>
      </div>
    </div>
    <!--end::Input group-->

    <!-- extra fields -->
    <div class="row mb-6">
      <div class="form-group col-md-6">
        <label
          class="col-lg-4 col-form-label required fw-semobold fw-bold text-gray-700 fs-6 text-nowrap"
          >Room Name</label
        >
        <Field
          type="text"
          name="room_name"
          class="form-control form-control-lg form-control-solid"
          placeholder="Enter Room Name"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="room_name" />
          </div>
        </div>
      </div>

      <div class="form-group col-md-6">
        <label
          class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
          >Mapping Duration</label
        >
        <Field
          type="number"
          name="mapping_duration"
          class="form-control form-control-lg form-control-solid"
          placeholder="Enter Mapping Duraction (in hours)"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="mapping_duration" />
          </div>
        </div>
      </div>
    </div>
    <!--end::Input group-->

    <!-- extra fields -->
    <div class="row mb-6">
      <div class="form-group col-md-6">
        <label
          class="col-lg-4 col-form-label required fw-semobold fw-bold text-gray-700 fs-6 text-nowrap"
          >Data Logging Interval</label
        >
        <Field
          type="number"
          name="logging_interval"
          class="form-control form-control-lg form-control-solid"
          placeholder="Enter logging interval (in minutes)"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="logging_interval" />
          </div>
        </div>
      </div>

      <div class="form-group col-md-6">
        <label
          class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
          >Data Logger Used</label
        >
        <Field
          type="text"
          name="logger_used"
          class="form-control form-control-lg form-control-solid"
          placeholder="Number of data loggers used"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="logger_used" />
          </div>
        </div>
      </div>
    </div>
    <!--end::Input group-->
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { ErrorMessage, Field } from "vee-validate";
import moment from "moment";

export default defineComponent({
  name: "step-1",
  components: {
    Field,
    ErrorMessage,
  },
  props: ["ongoingRGPS"],
  emit: ["setStartDate", "setStartTime"],
  setup(props, { emit }) {
    const step1Data = ref({
      rgp_id: "",
      rgp_no: "",
      customer_name: "",
      site_address: {
        company_name: "",
        address1: "",
        address2: "",
        city: "",
        pincode: "",
        states: "",
        country: "",
      },
      val_start_date: "",
      start_time: "",
    });

    const startDateSelected = async (e) => {
      step1Data.value.val_start_date = e;
      await emit("setStartDate", step1Data.value.val_start_date);
    };

    const startTimeSelected = async (e) => {
      step1Data.value.start_time = e;
      await emit("setStartTime", step1Data.value.start_time);
    };

    const SetDetails = async (id) => {
      if (id) {
        try {
          // Find the rgp
          const foundRGP = props.ongoingRGPS.find((rgp) => rgp.id === id);

          // If not found, return early
          if (!foundRGP) {
            return;
          }
          // Destructure and assign rgp details
          const { rgp_no, site_address, customer_data } = foundRGP;
          step1Data.value.rgp_no = rgp_no;
          step1Data.value.site_address = site_address;
          step1Data.value.customer_name = customer_data.company.company_name;
          await emit(
            "rgp-Selected",
            step1Data.value.rgp_id,
            step1Data.value.rgp_no,
            step1Data.value.site_address,
            step1Data.value.customer_name
          );
        } catch (error) {
          console.error("An error occurred:", error);
        }
      }
    };

    return {
      startDateSelected,
      startTimeSelected,
      step1Data,
      SetDetails,
      ongoingRGPS: props.ongoingRGPS,
    };
  },
});
</script>

<style>
.el-input__inner, .el-select__inner {
  font-weight: 500;
}
.el-input__wrapper, .el-select__wrapper {
  width: 100%;
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