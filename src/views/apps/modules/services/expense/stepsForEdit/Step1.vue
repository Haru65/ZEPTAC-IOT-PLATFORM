<template>
  <!--begin::Wrapper-->
  <div class="w-100">
    <!--begin::Heading-->
    <div class="pb-10 pb-lg-15">
      <!--begin::Title-->
      <h2 class="fw-bold d-flex align-items-center text-dark">
        Fill RGP Information
      </h2>
      <!--end::Title-->
    </div>
    <!--end::Heading-->

    <div class="card mt-6">
      <div
        class="row mt-6 align-items-center align-items-center-lg align-items-center-md"
      >
        <!--begin::Label-->
        <label class="col-lg-4 required fs-4 fw-bold text-gray text-start text-nowrap"
          >Returnable Gate Pass
        </label>
        <!--end::Label-->


        <div class="col-lg bt-md-5">
          <!--begin::Row-->
          <div class="col-lg fv-row mt-md-3 mt-5">
            <div class="form-control form-control-solid">
              <span class="fs-5 fw-bold text-gray-700">
                {{ $props.details.rgp_no }}
              </span>
            </div>
          </div>
          <!--end::Row-->
        </div>
      </div>
    </div>

    <div class="card mt-6">
      <div
        class="row mt-6 align-items-center align-items-center-lg align-items-center-md"
      >
        <!--begin::Label-->
        <label class="col-lg-4 required fs-4 fw-bold text-gray text-start text-nowrap"
          >Service Engineer
        </label>
        <!--end::Label-->

        <div class="col-lg bt-md-5">
          <!--begin::Row-->
          <div class="col-lg fv-row mt-md-3 mt-5">
            <div class="form-control form-control-solid">
              <span class="fs-5 fw-bold text-gray-700">
                {{ $props.details.engineer_name }}
              </span>
            </div>
          </div>
          <!--end::Row-->
        </div>
      </div>
    </div>

    <!--begin::Input group-->
    <div class="fv-row mt-6">
      <!--begin::Row-->
      <div class="row">
        <!--begin::Col-->
        <div class="col-lg-6">
          <!--begin::Option-->
          <label
            class="btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center"
          >
            <!--begin::Info-->
            <span class="d-block fw-semobold text-start">
              <span class="text-dark fw-bold d-block fs-4 mb-2"> From Date </span>
              <div class="block">
                <el-date-picker
                  type="date"
                  name="date"
                  id="date"
                  disabled
                  v-model="$props.details.date"
                  placeholder="Pick a day"
                />
              </div>
            </span>
            <!--end::Info-->
          </label>

          <!--end::Option-->
        </div>
        <!--end::Col-->

        <!--begin::Col-->
        <div class="col-lg-6">
          <!--begin::Option-->
          <label
            class="btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center"
          >
            <!--begin::Info-->
            <span class="d-block fw-semobold text-start">
              <span class="text-dark fw-bold d-block fs-4 mb-2">Till Date</span>
              <div class="block">
                <el-date-picker
                  type="date"
                  name="duedate"
                  id="duedate"
                  disabled
                  v-model="$props.details.duedate"
                  placeholder="Pick a day"
                />
              </div>
            </span>
            <!--end::Info-->
          </label>
          <!--end::Option-->
        </div>
        <!--end::Col-->
      </div>
      <!--end::Row-->
    </div>
    <!--end::Input group-->

    <div class="card mt-6">
      <div
        class="row mt-6 align-items-center align-items-center-lg align-items-center-md"
      >
        <!--begin::Label-->
        <label class="col-lg-4 required fs-4 fw-bold text-gray text-start"
          >Company Name
        </label>
        <!--end::Label-->

        <div class="col-lg bt-md-5">
          <!--begin::Row-->
          <div class="col-lg fv-row mt-md-3 mt-5">
            <div class="form-control form-control-solid">
              <span class="fs-5 fw-bold text-gray-700">
                {{ $props.details.customer_name }}
              </span>
            </div>
          </div>
          <!--end::Row-->
        </div>
      </div>
    </div>

    <div class="card mt-6">
      <div
        class="row mt-6 align-items-center align-items-center-lg align-items-center-md"
      >
        <!--begin::Label-->
        <label class="col-lg-4 required fs-4 fw-bold text-gray text-start"
          >Site Location
        </label>
        <!--end::Label-->

        <div class="col-lg bt-md-5">
          <!--begin::Row-->
          <div class="col-lg fv-row mt-md-3 mt-5">
            <div class="form-control form-control-solid">
              <span class="fs-5 fw-bold text-gray-700">
                {{ $props.details.site_address.company_name }}
                {{ $props.details.site_address.address1 }}
                {{ $props.details.site_address.address2 }}
                {{ $props.details.site_address.city }}
                {{ $props.details.site_address.pincode }}
                {{ $props.details.site_address.states }}
                {{ $props.details.site_address.country }}
              </span>
            </div>
          </div>
          <!--end::Row-->
        </div>
      </div>
    </div>
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
  props: ["details"],

  setup(props) {

    return {
      details: props.details,
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