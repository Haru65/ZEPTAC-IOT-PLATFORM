<template>
  <!--begin::Wrapper-->
  <div class="w-100">
    <!--begin::Heading-->
    <div class="pb-10 pb-lg-15">
      <!--begin::Title-->
      <h2 class="fw-bold d-flex align-items-center text-dark">
        Review Your RGP
      </h2>
      <!--end::Title-->
    </div>
    <!--end::Heading-->

    <div class="border-bottom mb-5 pb-5">
      <div class="font-weight-bold fs-4 mb-3">
        <strong> Date and Quotation Details: </strong>
      </div>
      <div class="line-height-md l">
        <p>Returnable Gate Pass: {{ $props.summary.rgp_no }}</p>
        <p>Date: {{ $props.summary.date }}</p>
        <p>Due Date: {{ $props.summary.duedate }}</p>
        <p>Quotation Number: {{ $props.summary.quotation_no }}</p>

        <p>Customer Name: {{ $props.summary.customer_name }}</p>
        <p>Client Name: {{ $props.summary.client_name }}</p>
        <p>
          Site Address: {{ $props.summary.site_address.address1 }}
          {{ $props.summary.site_address.address2 }}
          {{ $props.summary.site_address.city }}
          {{ $props.summary.site_address.pincode }}
          {{ $props.summary.site_address.states }}
          {{ $props.summary.site_address.country }}
        </p>
      </div>
    </div>

    <div class="border-bottom mb-5 pb-5">
      <div class="font-weight-bold fs-4 mb-3">
        <strong> Engineers Details: </strong>
      </div>
      <div class="line-height-md l">
      </div>
    </div>

    <div class="border-bottom mb-5 pb-5">
      <div class="font-weight-bold mb-3">Instruments Details:</div>
      <div class="line-height-md">
        John Wick <br />
        Phone: +61412345678 <br />
        Email: johnwick@reeves.com
      </div>
    </div>
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { ErrorMessage, Field } from "vee-validate";

export default defineComponent({
  name: "step-4",
  components: {
    Field,
    ErrorMessage,
  },
  props: ["summary"],

  setup(props) {
    return {
      summary: props.summary,
    };
  },
});
</script>

<style>
.el-input__inner {
  font-weight: 500;
}

.el-input__wrapper {
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