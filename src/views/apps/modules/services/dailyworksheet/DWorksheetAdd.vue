<template>
  <div style="width: 99%" class="sm:p-4 md:p-8 lg:p-12 rounded">
    <!--begin::Modal dialog-->
    <div class="d-flex flex-column">
      <div class="flex-xl-row-fluid mb-10 mb-lg-0 me-lg-7 me-xl-10">
        <div class="card w-20">
          <div class="card-body sm:p-2 lg:p-12">
            <!--end::Form-->

            <VForm form id="kt_Quotation_form" novalidate>
              <!--begin::Card body-->
              <div class="card-body border-top p-9">
                <!-- extra fields -->
                <div class="row mb-6">
                  <div class="form-group col-md-6 mb-8 mb-sd-8">
                    <label
                      class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap"
                      >Gate Pass
                    </label>
                    <div>
                      <el-select
                        v-model="worksheetDetails.rgp_id"
                        filterable
                        placeholder="Please Select GatePass"
                        :onchange="SetDetails(worksheetDetails.rgp_id)"
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
                          v-for="item in RGPS"
                          :key="item.id"
                          :value="item.id"
                          :label="item.rgp_no"
                        />
                      </el-select>
                    </div>
                  </div>
                  <div class="form-group col-md-6 mb-8 mb-sd-8">
                    <label
                      class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap"
                      >Service Engineer
                    </label>
                    <div>
                      <el-select
                        filterable
                        placeholder="Select Service Engineer..."
                        v-model="worksheetDetails.engineer_id"
                        :disabled="engineerSelect"
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
                    </div>
                  </div>
                </div>
                <!--end::Input group-->

                <div class="row mb-6" v-if="worksheetDetails.rgp_id">
                  <div class="form-group col-md-6 mb-8 mb-sd-8">
                    <label
                      class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap"
                      >Customer Name</label
                    >
                    <div class="form-control form-control-solid">
                      <span class="fs-5 fw-bold text-gray-700">
                        {{ CustomerData.first_name }}
                        {{ CustomerData.last_name }}
                      </span>
                    </div>
                  </div>
                  <div class="form-group col-md-6 mb-8 mb-sd-8">
                    <label
                      class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap"
                      >Site Location</label
                    >
                    <div class="form-control form-control-solid">
                      <span class="fs-5 fw-bold text-gray-700">
                        {{ SiteAddress.address1 }} {{ SiteAddress.address2 }}
                        {{ SiteAddress.city }} - {{ SiteAddress.pincode }}
                        {{ SiteAddress.state }} {{ SiteAddress.country }}
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
                        <span class="text-dark fw-bold d-block fs-4 mb-2"
                          >Work Date</span
                        >
                        <div class="block">
                          <el-date-picker
                            type="date"
                            name="date"
                            id="date"
                            v-model="worksheetDetails.workdate"
                            placeholder="Pick Work Day"
                          />
                        </div>
                      </span>
                      <!--end::Info-->
                    </label>
                  </div>
                </div>

                <div class="row mb-6">
                  <div class="form-group col-md-6 mb-8 mb-sd-8">
                    <label
                      class="btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center"
                    >
                      <!--begin::Info-->
                      <span class="d-block fw-semobold text-start">
                        <span class="text-dark fw-bold d-block fs-4 mb-2"
                          >Work Start Time</span
                        >
                        <div class="block">
                          <el-time-picker
                            type="time"
                            name="start"
                            id="start"
                            v-model="worksheetDetails.starttime"
                            placeholder="Pick start time"
                          />
                        </div>
                      </span>
                      <!--end::Info-->
                    </label>
                  </div>
                  <div class="form-group col-md-6 mb-8 mb-sd-8">
                    <label
                      class="btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center"
                    >
                      <!--begin::Info-->
                      <span class="d-block fw-semobold text-start">
                        <span class="text-dark fw-bold d-block fs-4 mb-2"
                          >Work Finish Time</span
                        >
                        <div class="block">
                          <el-time-picker
                            type="time"
                            name="end"
                            id="end"
                            v-model="worksheetDetails.endtime"
                            placeholder="Pick end time"
                          />
                        </div>
                      </span>
                      <!--end::Info-->
                    </label>
                  </div>
                </div>

                <div class="row mb-6">
                  <div class="form-group col-md-6 mb-8 mb-sd-8">
                    <label
                      class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap"
                      >Scope of Work</label
                    >
                    <Field
                        type="textarea"
                        as="textarea"
                        name="scope"
                        rows="4"
                        class="form-control form-control-lg form-control-solid"
                        placeholder="Description of the instrument..."
                        v-model="worksheetDetails.scopeofwork"
                      />
                  </div>
                  <div class="form-group col-md-6 mb-8 mb-sd-8">
                    <label
                      class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap"
                      >Problem Faced (if any)</label
                    >
                    <Field
                        type="textarea"
                        as="textarea"
                        name="problem"
                        rows="4"
                        class="form-control form-control-lg form-control-solid"
                        placeholder="Description of the instrument..."
                        v-model="worksheetDetails.problem"
                      />
                  </div>
                </div>
              </div>
            </VForm>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import ApiService from "@/core/services/ApiService";
import { getOnGoingRGP } from "@/stores/api";
import { useAuthStore } from "@/stores/auth";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { useRouter } from "vue-router";

interface worksheet {
  rgp_id: string;
  rgp_no: string;
  engineer_id: string;
  scopeofwork: string;
  problem: string;
  workdate: string;
  starttime: string;
  endtime: string;
}

export default defineComponent({
  name: "worksheet-add",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  setup() {
    const auth = useAuthStore();
    const route = useRouter();
    const User = auth.GetUser();

    const engineerSelect = ref(true);

    const RGPS = ref([
      {
        id: "",
        rgp_no: "",
        quotation_id: "",
        engineers: [],
        client_id: "",
        customer_id: "",
        site_address: {
          address1: "",
          address2: "",
          country: "",
          city: "",
          pincode: "",
          state: "",
        },
        customer_data: {
          id: "",
          first_name: "",
          last_name: "",
        },
      },
    ]);

    const worksheetDetails = ref<worksheet>({
      rgp_id: "",
      rgp_no: "",
      engineer_id: "",
      scopeofwork: "",
      problem: "",
      workdate: "",
      starttime: "",
      endtime: "",
    });

    const ServiceEngineers = ref([
      {
        id: "",
        first_name: "",
        last_name: "",
      },
    ]);

    const SiteAddress = ref({
      address1: "",
      address2: "",
      country: "",
      city: "",
      pincode: "",
      state: "",
    });

    const CustomerData = ref({
      id: "",
      first_name: "",
      last_name: "",
    });

    const SetDetails = async (id) => {
      try {
        // finding the rgp
        const foundRGP = RGPS.value.find((rgp) => rgp.id === id);

        if (foundRGP) {
          ServiceEngineers.value.pop();

          // setting the rgps engineers
          const newEngineers = [...foundRGP.engineers];
          ServiceEngineers.value = newEngineers;

          engineerSelect.value = false;

          // setting the rgps SiteAddress
          SiteAddress.value = foundRGP.site_address;

          // setting the rgps CustomerData
          CustomerData.value = foundRGP.customer_data;
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    const fillDetails = (response) => {
      RGPS.value.push(
        ...response.result.map((result) => {
          return {
            id: result.id,
            rgp_no: result.rgp_no,
            quotation_id: result.quotation_id,
            engineers: JSON.parse(result.engineers),
            client_id: result.client_id,
            customer_id: result.customer_id,
            site_address: {
              address1: result.site_address.address1,
              address2: result.site_address.address2,
              country: result.site_address.country,
              city: result.site_address.city,
              pincode: result.site_address.pincode,
              state: result.site_address.state,
            },
            customer_data: {
              id: result.customer_data.id,
              first_name: result.customer_data.first_name,
              last_name: result.customer_data.last_name,
            },
          };
        })
      );
    };

    onMounted(async () => {
      // get all the rgp
      const response = await getOnGoingRGP(User.company_id);

      RGPS.value.pop();

      if (response) {
        await fillDetails(response);
      }
    });

    return {
      RGPS,
      fillDetails,
      worksheetDetails,
      SetDetails,
      ServiceEngineers,
      CustomerData,
      SiteAddress,
      engineerSelect,
    };
  },
});
</script>

<style>
.el-input__inner {
  font-weight: 500;
}

.el-input__wrapper {
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