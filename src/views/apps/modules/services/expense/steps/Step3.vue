<template>
  <!--begin::Wrapper-->
  <div class="w-100">
    <!--begin::Heading-->
    <div class="pb-10 pb-lg-15">
      <!--begin::Title-->
      <h2 class="fw-bold d-flex align-items-center text-dark">
        Review Your Expense Sheet
      </h2>
      <!--end::Title-->
    </div>
    <!--end::Heading-->

    <div>
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <button
            class="nav-link active"
            data-bs-toggle="tab"
            type="button"
            aria-controls="home"
            aria-selected="true"
          >
            <div class="font-weight-bold fs-4 mb-3">
              <strong> Gate Pass Details: </strong>
            </div>
          </button>
        </li>
      </ul>
      <div class="tab-content">
        <div class="tab-pane fade show active" aria-labelledby="home-tab">
          <div class="shadow-lg p-5 mb-7 fs-4 rounded">
            <p>Returnable Gate Pass: {{ $props.summary.rgp_no }}</p>
            <p>Date: {{  moment($props.summary.date).format("DD-MM-YYYY") }}</p>
            <p>Due Date: {{ moment($props.summary.duedate).format("DD-MM-YYYY") }}</p>
            <p>Quotation ID: {{ $props.summary.quotation_id }}</p>
            <p>Quotation Number: {{ $props.summary.quotation_no }}</p>
            <p>Engineer Name: {{ $props.summary.engineer_name }}</p>
            <p>Company Name: {{ $props.summary.customer_name }}</p>
            <p>
              Site Location: {{ $props.summary.site_address.company_name }}
              {{ $props.summary.site_address.address1 }}
              {{ $props.summary.site_address.address2 }}
              {{ $props.summary.site_address.city }}
              {{ $props.summary.site_address.pincode }}
              {{ $props.summary.site_address.states }}
              {{ $props.summary.site_address.country }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div>
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <button
            class="nav-link active"
            data-bs-toggle="tab"
            type="button"
            aria-controls="home"
            aria-selected="true"
          >
            <div class="font-weight-bold fs-4 mb-3">
              <strong> Your Expenses Details: </strong>
            </div>
          </button>
        </li>
      </ul>
      <div class="tab-content">
        <div class="tab-pane fade show active" aria-labelledby="home-tab">
          <div class="shadow-lg p-5 mb-7 fs-4 rounded">

            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Type</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(expense,index) in $props.summary.expenses" :key="expense.id">
                  <th scope="row">{{ index + 1 }}</th>
                  <th scope="row">{{ expense.type}}</th>
                  <th scope="row">₹ {{ expense.amount}}</th>
                  <th scope="row">{{ moment(expense.date).format("DD-MM-YYYY") }}</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div>
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <button
            class="nav-link active"
            data-bs-toggle="tab"
            type="button"
            aria-controls="home"
            aria-selected="true"
          >
            <div class="font-weight-bold fs-4 mb-3">
              <strong> Your Total Expense: </strong>
            </div>
          </button>
        </li>
      </ul>
      <div class="tab-content">
        <div class="tab-pane fade show active" aria-labelledby="home-tab">
          <div class="shadow-lg p-5 mb-7 fs-4 rounded">
            <h2>
              ₹ {{ $props.summary.total_amount }}
            </h2>
          </div>
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
  name: "step-4",
  components: {
    Field,
    ErrorMessage,
  },
  props: ["summary"],

  setup(props) {
    return {
      summary: props.summary,
      moment,
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