<template>
  <!--begin::Wrapper-->
  <div class="w-100">
    <!--begin::Heading-->
    <div class="pb-10 pb-lg-15">
      <!--begin::Title-->
      <h2 class="fw-bold d-flex align-items-center text-dark">Choose A Date</h2>
      <!--end::Title-->
    </div>
    <!--end::Heading-->

    <!--begin::Input group-->
    <div class="fv-row">
      <!--begin::Row-->
      <div class="row">
        <!--begin::Col-->
        <div class="col-lg-6">
          <!--begin::Option-->
          <label
            class="btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center mb-10"
          >
            <!--begin::Info-->
            <span class="d-block fw-semobold text-start">
              <span class="text-dark fw-bold d-block fs-4 mb-2"> Date </span>
              <div class="block">
                <el-date-picker
                  type="date"
                  v-model="date"
                  @change="dateSelected($event)"
                  placeholder="Pick a day"
                  :shortcuts="shortcuts"
                  :disabled-date="disabledDate"
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
              <span class="text-dark fw-bold d-block fs-4 mb-2">Due Date</span>
              <div class="block">
                <el-date-picker
                  type="date"
                  v-model="duedate"
                  @change="duedateSelected($event)"
                  placeholder="Pick a day"
                  :shortcuts="shortcuts"
                  :disabled-date="disabledDate"
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
      <div class="row mt-6">
        <!--begin::Label-->
        <label class="col-lg-3 required fs-4 fw-bold text-gray text-start"
          >Quotations
        </label>
        <!--end::Label-->

        <div class="col-lg">
          <!--begin::Row-->
          <div class="col-lg fv-row">
            <div>
              <el-select
                filterable
                placeholder="Please Select Quotation..."
              >
                <el-option
                  value=""
                  disabled="disabled"
                  label="Please Select Quotation..."
                  key=""
                  onchange="setSiteAddress"
                >
                  Please Select Quotation...</el-option
                >
                <el-option
                v-for="item in quotations"
                  :key="item.id"
                  :value="item.id"
                  :label="`( ${item.quotation_no} )  [ ${item.customer_data.first_name} ${item.customer_data.last_name} ]  /  [ ${item.client_data.first_name} ${item.client_data.last_name} ]`"
                />
              </el-select>
            </div>
          </div>
          <!--end::Row-->
        </div>
      </div>
    </div>

    <div class="card mt-6">
      <div class="row mt-6">
        <!--begin::Label-->
        <label class="col-lg-3 required fs-4 fw-bold text-gray text-start"
          >Site Address
        </label>
        <!--end::Label-->

        <div class="col-lg">
          <!--begin::Row-->
          <div class="col-lg fv-row">
            <div class="form-control form-control-solid">
              <span class="fs-5 fw-bold text-gray-700"
                >
                {{ SiteAddress.address1 }} {{ SiteAddress.address2 }}
                          {{ SiteAddress.city }} - {{ SiteAddress.pincode }}
                          {{ SiteAddress.states }} {{ SiteAddress.country }}
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
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref } from "vue";
import { ErrorMessage, Field } from "vee-validate";

export default defineComponent({
  name: "step-1",
  components: {
    Field,
    ErrorMessage,
  },
  props: ["quotations"],

  setup(props, {emit}) {

    const date = ref("");
    const duedate = ref("");
    
    const step1Data = ref({
      date: "",
      duedate: "",
      quotation_id: "",
      
      address1: "",
      address2: "",
      city: "",
      states: "",
      pincode: "",
      country: "",
    });
    

    const dateSelected = (e) => {
      console.log(e);
  emit("date", e);
    }
    const duedateSelected = (e) => {
      console.log(e);
      emit("duedate", e);
    }

    const shortcuts = [
      {
        text: "Today",
        value: new Date(),
      },
      {
        text: "Yesterday",
        value: () => {
          const date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24);
          return date;
        },
      },
      {
        text: "A week ago",
        value: () => {
          const date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
          return date;
        },
      },
    ];

    const setSiteAddress = () => {

    }
    const disabledDate = (time: Date) => {
      return null;
    };

    return {
      getAssetPath,
      disabledDate,
      shortcuts,
      dateSelected,
      duedateSelected,
      date,
      duedate,
      SiteAddress,
      quotations: props.quotations,
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