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
                        v-model="worksheetDetails.rgp_id"
                        filterable
                        placeholder="Select Service Engineer..."
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
                          v-for="engineer in RGPS"
                          :key="engineer.engineers.id"
                          :value="engineer.engineers.id"
                          :label="`${engineer.engineers.first_name} ${engineer.engineers.last_name}`"
                        />
                      </el-select>
                    </div>
                  </div>
                </div>
                <!--end::Input group-->

                <div class="row mb-6" v-if="RGPS.id">
                  <div class="form-group col-md-6 mb-8 mb-sd-8">
                    <label
                      class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap"
                      >Customer Name</label
                    >
                    <div class="form-control form-control-solid">
                      <span class="fs-5 fw-bold text-gray-700">
                          {{ RGPS.customer_data.first_name }} {{ RGPS.customer_data.last_name }}
                        </span>
                      </div>
                  </div>
                  <div class="form-group col-md-6 mb-8 mb-sd-8">
                    <label
                      class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap"
                      >Serial No.</label
                    >
                    <div class="form-control form-control-solid">
                        <span class="fs-5 fw-bold text-gray-700">
                          {{ RGPS.site_address.address1 }} {{ RGPS.site_address.address2 }}
                          {{ RGPS.site_address.city }} - {{ RGPS.site_address.pincode }}
                          {{ RGPS.site_address.states }} {{ RGPS.site_address.country }}
                        </span>
                      </div>
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
import {
  getOnGoingRGP,
} from "@/stores/api";
import { useAuthStore } from "@/stores/auth";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { useRouter } from "vue-router";


interface worksheet {
  rgp_id: string;
  rgp_no: string;
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

    const RGPS = ref([{
      id: "",
      rgp_no: "",
      quotation_id: "",
      engineers: [{
        id: "",
        first_name: "",
        last_name: "",
      }],
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
      customer_data:{
        id:"",
        first_name: "",
        last_name: "",
      }

    }])

    const worksheetDetails = ref<worksheet>({
      rgp_id:"",
      rgp_no: "",
    });

    const selectEngineer = (id) => {
      
    };

    const fillDetails = (response) => {
      RGPS.value.push(
      ...response.result.map(result => {
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
          }
        };
      }))
    console.log(RGPS.value)

    }

    onMounted(async () => {

      // get all the rgp
      const response = await getOnGoingRGP(User.company_id);
      
      RGPS.value.pop();

      if(response){
        await fillDetails(response);
      }

    });

    return {
      RGPS,
      fillDetails,
      worksheetDetails,
      selectEngineer,
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