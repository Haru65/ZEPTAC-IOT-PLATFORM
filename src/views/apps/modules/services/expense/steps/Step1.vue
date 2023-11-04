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

        <div class="col-lg">
          <!--begin::Row-->
          <div class="col-lg fv-row mt-md-3 mt-5">
            <div>
              <el-select
                v-model="step1Data.rgp_id"
                filterable
                placeholder="Please Select GatePass"
                name="rgp_id"
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
              <div
                class="fv-plugins-message-container"
                v-if="!step1Data.rgp_id"
              >
                <div class="fv-help-block">
                  <ErrorMessage name="rgp_id" />
                </div>
              </div>
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

        <div class="col-lg">
          <!--begin::Row-->
          <div class="col-lg fv-row mt-md-3 mt-5">
            <div>
              <el-select
                filterable
                placeholder="Select Service Engineer..."
                name="engineer_id"
                v-model="step1Data.engineer_id"
                @change="setEngineer($event)"
              >
                <el-option
                  value=""
                  disabled="disabled"
                  label="Select Service Engineer..."
                  key=""
                >
                  Select Service Engineer...</el-option
                >
                <el-option
                  v-for="engineer in ServiceEngineers"
                  :key="engineer.id"
                  :value="engineer.id"
                  :label="`${engineer.first_name} ${engineer.last_name}`"
                />
              </el-select>
              <div
                class="fv-plugins-message-container"
                v-if="!step1Data.engineer_id"
              >
                <div class="fv-help-block">
                  <ErrorMessage name="engineer_id" />
                </div>
              </div>
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
                  v-model="step1Data.date"
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
                  v-model="step1Data.duedate"
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

    <div class="card mt-6" v-if="step1Data.rgp_id">
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
                {{ step1Data.customer_name }}
              </span>
            </div>
          </div>
          <!--end::Row-->
        </div>
      </div>
    </div>

    <div class="card mt-6" v-if="step1Data.rgp_id">
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
  props: ["ongoingRGPS"],

  setup(props, { emit }) {
    const step1Data = ref({
      rgp_id: "",
      rgp_no: "",
      engineer_id: "",
      quotation_id: "",
      quotation_no: "",
      engineer_name: "",
      date: "",
      duedate: "",
      customer_name: "",
      site_address: {
        company_name:"",
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

    const ServiceEngineers = ref([
      {
        id: "",
        first_name: "",
        last_name: "",
      },
    ]);

    onMounted(()=>{
      ServiceEngineers.value.pop();
    });

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
          const {
            rgp_no,
            date,
            duedate,
            engineers,
            site_address,
            customer_data,
            quotation_id,
            quotation_no
          } = foundRGP;
          step1Data.value.rgp_no = rgp_no;
          step1Data.value.engineer_id = "";
          ServiceEngineers.value = [];
          ServiceEngineers.value = [...engineers];
          step1Data.value.site_address = site_address;
          step1Data.value.customer_name = customer_data.company.company_name;
          step1Data.value.date = date;
          step1Data.value.duedate = duedate;
          step1Data.value.quotation_id = quotation_id;
          step1Data.value.quotation_no = quotation_no;
          await emit("rgp-Selected", step1Data.value.rgp_id, step1Data.value.rgp_no,  step1Data.value.site_address, step1Data.value.customer_name, step1Data.value.date, step1Data.value.duedate,  step1Data.value.quotation_id,  step1Data.value.quotation_no);

        } catch (error) {
          console.error("An error occurred:", error);
        }
      }
    };

    const setEngineer = async (id) => {
      
      console.log(id)

      if(id){

        step1Data.value.engineer_id = id;

        const rgp = props.ongoingRGPS.find((r) => r.id === step1Data.value.rgp_id);

        const engineer_name = rgp.engineers.find((e) => e.id === id)

        step1Data.value.engineer_name = engineer_name.first_name + " " + engineer_name.last_name

        await emit("engineer-Selected", step1Data.value.engineer_id, step1Data.value.engineer_name);

      }

    };

    // const GetSiteAddress = async (data: any) => {
    //   if (data != " ") {
    //     ApiService.setHeader();
    //     const id = data;
    //     const response = await getSiteAddress(id);
    //     // console.log(response);

    //     step1Data.value.site_address.address1 = response.result.address1;
    //     step1Data.value.site_address.address2 = response.result.address2;
    //     step1Data.value.site_address.city = response.result.city;
    //     step1Data.value.site_address.states = response.result.states;
    //     step1Data.value.site_address.pincode = response.result.pincode;
    //     step1Data.value.site_address.country = response.result.country;

    //     step1Data.value.quotation_id = id;

    //     const quotationDetail = props.quotations.find(quotation => {
    //       if (quotation.id == step1Data.value.quotation_id) {
    //         step1Data.value.quotation_no = quotation.quotation_no;
    //         step1Data.value.customer_name = quotation.customer_data.first_name +
    //           " " +
    //           quotation.customer_data.last_name;
    //         step1Data.value.client_name = quotation.client_data.first_name +
    //           " " +
    //           quotation.client_data.last_name;
    //       }
    //     })

    //     await emit("quotation-Selected", step1Data.value.quotation_id, step1Data.value.site_address, step1Data.value.customer_name,step1Data.value.client_name,step1Data.value.quotation_no);

    //   } else {
    //     step1Data.value.site_address.address1 = "";
    //     step1Data.value.site_address.address2 = "";
    //     step1Data.value.site_address.city = "";
    //     step1Data.value.site_address.states = "";
    //     step1Data.value.site_address.pincode = "";
    //     step1Data.value.site_address.country = "";
    //   }
    // };

    // const setSiteAddress = (e) => {
    //   console.log(e);
    // };

    return {
      dateSelected,
      duedateSelected,
      ServiceEngineers,
      step1Data,
      SetDetails,
      setEngineer,
      ongoingRGPS: props.ongoingRGPS,
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