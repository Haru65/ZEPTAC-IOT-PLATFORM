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
                  name="date"
                  id="date"
                  v-model="step1Data.date"
                  @change="dateSelected($event)"
                  placeholder="Pick a day"
                  :shortcuts="shortcuts"
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
                  name="duedate"
                  id="duedate"
                  v-model="step1Data.duedate"
                  @change="duedateSelected"
                  placeholder="Pick a day"
                  :shortcuts="shortcuts"
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
      <div class="row mt-6 align-items-center align-items-center-lg align-items-center-md">
        <!--begin::Label-->
        <label class="col-lg-3 required fs-4 fw-bold text-gray text-start"
          >Quotations
        </label>
        <!--end::Label-->

        <div class="col-lg">
          <!--begin::Row-->
          <div class="col-lg fv-row mt-md-3 mt-5">
            <div>
              <el-select
                filterable
                placeholder="Please Select Quotation..."
                v-model="step1Data.quotation_id"
                v-on:change="GetSiteAddress(step1Data.quotation_id)"
                name="quotation_id"
                id="quotation_id"

              >
                <el-option
                  v-for="item in quotations"
                  :key="item.id"
                  :value="item.id"
                  :label="`${item.quotation_no} -- ${item.customer_data.first_name} ${item.customer_data.last_name} -- ${item.client_data.first_name} ${item.client_data.last_name}`"
                />
                <el-option
                  value=""
                  label="Please Select Quotation..."
                  key=""
                  disabled ="disabled"
                >
                  Please Select Quotation...</el-option
                >
              </el-select>
            </div>
          </div>
          <!--end::Row-->
        </div>
      </div>
    </div>

    <div class="card mt-6" v-if="step1Data.quotation_id">
      <div class="row mt-6 align-items-center align-items-center-lg align-items-center-md">
        <!--begin::Label-->
        <label class="col-lg-3 required fs-4 fw-bold text-gray text-start"
          >Site Address
        </label>
        <!--end::Label-->

        <div class="col-lg bt-md-5">
          <!--begin::Row-->
          <div class="col-lg fv-row mt-md-3 mt-5">
            <div class="form-control form-control-solid">
              <span class="fs-5 fw-bold text-gray-700">
                {{ step1Data.site_address.address1 }} {{ step1Data.site_address.address2 }}
                {{ step1Data.site_address.city }} {{ step1Data.site_address.pincode }}
                {{ step1Data.site_address.states }} {{ step1Data.site_address.country }}
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
import { defineComponent, ref, onMounted } from "vue";
import { ErrorMessage, Field } from "vee-validate";
import ApiService from "@/core/services/ApiService";
import { getSiteAddress } from "@/stores/api";
import moment from "moment";


export default defineComponent({
  name: "step-1",
  components: {
    Field,
    ErrorMessage,
  },
  props: ["quotations"],

  setup(props, { emit }) {

    const step1Data = ref({
      date: "",
      duedate: "",
      quotation_id: "",
      customer_name: "",
      client_name: "",
      quotation_no: "",
      site_address: {
        address1: "",
        address2: "",
        city: "",
        pincode: "",
        states: "",
        country: "",
      },
    });

    const dateSelected = (e) => {
      step1Data.value.date = e;
      emit("date-Selected", step1Data.value.date);
    };

    const duedateSelected = (e) => {
      step1Data.value.duedate = e;
      emit("duedate-Selected", step1Data.value.duedate);
    };

    // const quotationSelected = async (e) => {
    //   step1Data.value.quotation_id = e;
    //   console.log(step1Data.value.site_address)
    //   await emit("quotation-Selected", step1Data.value.quotation_id, step1Data.value.site_address);
    // };

    const GetSiteAddress = async (data: any) => {
      if (data != " ") {
        ApiService.setHeader();
        const id = data;
        const response = await getSiteAddress(id);
        // console.log(response);

        step1Data.value.site_address.address1 = response.result.address1;
        step1Data.value.site_address.address2 = response.result.address2;
        step1Data.value.site_address.city = response.result.city;
        step1Data.value.site_address.states = response.result.states;
        step1Data.value.site_address.pincode = response.result.pincode;
        step1Data.value.site_address.country = response.result.country;

        step1Data.value.quotation_id = id;

        const quotationDetail = props.quotations.find(quotation => {
          if (quotation.id == step1Data.value.quotation_id) {
            step1Data.value.quotation_no = quotation.quotation_no;
            step1Data.value.customer_name = quotation.customer_data.first_name +
              " " +
              quotation.customer_data.last_name;
            step1Data.value.client_name = quotation.client_data.first_name +
              " " +
              quotation.client_data.last_name;
          }
        })

        await emit("quotation-Selected", step1Data.value.quotation_id, step1Data.value.site_address, step1Data.value.customer_name,step1Data.value.client_name,step1Data.value.quotation_no);

      } else {
        step1Data.value.site_address.address1 = "";
        step1Data.value.site_address.address2 = "";
        step1Data.value.site_address.city = "";
        step1Data.value.site_address.states = "";
        step1Data.value.site_address.pincode = "";
        step1Data.value.site_address.country = "";
      }
    };
    
    const setSiteAddress = (e) => {
      console.log(e);
    };

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


    return {
      getAssetPath,
      shortcuts,
      dateSelected,
      duedateSelected,
      step1Data,
      setSiteAddress,
      quotations: props.quotations,
      GetSiteAddress,

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