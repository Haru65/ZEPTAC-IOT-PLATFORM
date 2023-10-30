<template>
  <div style="width: 99%" class="sm:p-4 md:p-8 lg:p-12 rounded">
    <!--begin::Modal dialog-->
    <div class="d-flex flex-column">
      <div class="flex-xl-row-fluid mb-10 mb-lg-0 me-lg-7 me-xl-10">
        <div class="card w-20">
          <div class="card-body sm:p-2 lg:p-12">
            <!--end::Form-->

            <VForm form id="kt_Quotation_form" novalidate>
              <div
                class="d-flex gap-5 flex-column align-items-start flex-xxl-row"
              >
                <!--begin::Input group-->
                <div
                  class="d-flex align-items-center flex-equal fw-row me-4 order-2"
                  data-bs-toggle="tooltip"
                  data-bs-trigger="hover"
                  data-bs-original-title="Specify Quotation date"
                  data-kt-initialized="1"
                >
                  <!--begin::Date-->
                  <div class="m-2 fs-6 fw-bold text-gray-700 text-nowrap">
                    Date:
                  </div>
                  <!--end::Date-->
                  &nbsp;&nbsp;
                  <!--begin::Input-->
                  <div
                    class="position-relative d-flex align-items-center w-150px"
                  >
                    <!--begin::Datepicker-->
                    <div class="block">
                      <el-date-picker
                        v-model="rgpDetails.date"
                        type="date"
                        placeholder="Pick a day"
                        :shortcuts="shortcuts"
                        :disabled-date="disabledDate"
                      />
                    </div>
                    <!--end::Datepicker-->
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div
                  class="d-flex flex-center flex-equal fw-row text-nowrap order-1 order-xxl-2 me-4"
                  data-bs-toggle="tooltip"
                  data-bs-trigger="hover"
                  data-bs-original-title="Enter RGP number"
                  data-kt-initialized="1"
                >
                  <span class="fs-2 fw-bold text-gray-800">Gate Pass #</span>

                  <input
                    type="text"
                    class="form-control form-control-flush fw-bold text-muted fs-3 w-auto"
                    v-model="rgpDetails.rgp_no"
                    placehoder="..."
                    disabled="true"
                  />
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div
                  class="d-flex align-items-center justify-content-end flex-equal order-3 fw-row"
                  data-bs-toggle="tooltip"
                  data-bs-trigger="hover"
                  data-bs-original-title="Specify Quotation due date"
                  data-kt-initialized="1"
                >
                  <!--begin::Date-->
                  <div class="fs-6 fw-bold text-gray-700 text-nowrap">
                    Due Date:
                  </div>
                  <!--end::Date-->
                  &nbsp; &nbsp;
                  <!--begin::Input-->
                  <div
                    class="position-relative d-flex align-items-center w-150px"
                  >
                    <!--begin::Datepicker-->
                    <div class="block">
                      <el-date-picker
                        v-model="rgpDetails.duedate"
                        type="date"
                        placeholder="Pick a day"
                        :shortcuts="shortcuts"
                        :disabled-date="disabledDate"
                      />
                    </div>
                    <!--end::Datepicker-->
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->
              </div>
              <!--end::Input group-->
              <!--end::Top-->

              <!--begin::Separator-->
              <div class="my-10"></div>
              <!--end::Separator-->

              <!--begin::Card body-->
              <div class="card-body border-top border-bottom p-9">
                <div class="row mb-6">
                  <!--begin::Label-->
                  <label
                    class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap"
                    >Quotations
                  </label>
                  <!--end::Label-->

                  <div class="col-lg">
                    <!--begin::Row-->
                    <div class="col-lg fv-row">
                      <div>
                        <el-select
                          v-model="rgpDetails.quotation_id"
                          filterable
                          placeholder="Please Select Quotation..."
                          v-on:change="GetSiteAddress(rgpDetails.quotation_id)"
                        >
                          <el-option
                            value=""
                            disabled="disabled"
                            label="Please Select Quotation..."
                            key=""
                          >
                            Please Select Quotation...</el-option
                          >
                          <el-option
                            v-for="item in Quotations"
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

                <div class="row mb-6" v-if="rgpDetails.quotation_id">
                  <!--begin::Label-->
                  <label
                    class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap"
                    >Site Address
                  </label>
                  <!--end::Label-->

                  <div class="col-lg">
                    <!--begin::Row-->
                    <div class="col-lg fv-row">
                      <div class="form-control form-control-solid">
                        <span class="fs-5 fw-bold text-gray-700">
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

              <div class="card card-flush pt-3 mb-4 mb-lg-6">
                <!--begin::Card header-->
                <div class="card-header">
                  <!--begin::Card title-->
                  <div class="card-title">
                    <h2 class="fw-bold text-nowrap">Available Engineers</h2>
                  </div>
                  <!--begin::Card title-->

                  <div class="card-toolbar" v-if="rgpDetails.engineers.length">
                    <div
                      class="btn btn-light-primary"
                      :v-model="rgpDetails.engineers"
                    >
                      {{ rgpDetails.engineers.length }} Engineer Selected
                    </div>
                  </div>
                </div>
                <!--end::Card header-->

                <!--begin::Card body-->
                <div class="card-body pt-0">
                  <!--begin::Table wrapper-->
                  <div class="table-responsive">
                    <!--begin::Table-->
                    <table
                      class="table align-middle table-row-dashed fs-6 fw-semobold gy-4"
                      id="kt_subscription_products_table"
                    >
                      <!--begin::Table head-->
                      <thead>
                        <tr
                          class="text-start text-muted fw-bold fs-7 text-uppercase gs-0"
                        >
                          <th
                            class="min-w-30px fs-5 fw-bold text-gray-700 text-nowrap"
                          >
                            Sr.No
                          </th>
                          <th
                            class="min-w-300px fs-5 fw-bold text-gray-700 text-wrap"
                          >
                            Name
                          </th>
                          <th
                            class="min-w-70px text-center fs-5 fw-bold text-gray-700 text-nowrap"
                          >
                            Select
                          </th>
                        </tr>
                      </thead>
                      <!--end::Table head-->

                      <!--begin::Table body-->
                      <tbody class="text-gray-600">
                        <tr
                          class="odd"
                          v-for="(item, index) in AvailableEngineers"
                          :key="item.id"
                        >
                          <td class="fs-3 fw-bold">{{ index + 1 }}</td>
                          <td class="fs-3 fw-bold text-wrap">
                            {{ item.first_name }} {{ item.last_name }}
                          </td>
                          <td class="text-center">
                            <!--begin::Delete-->

                            <input
                              class="form-check-input border border-dark"
                              type="checkbox"
                              :key="item.id"
                              :value="item.id"
                              @click="checkboxToggle"
                            />
                            <!--end::Delete-->
                          </td>
                        </tr>
                      </tbody>
                      <!--end::Table body-->
                    </table>
                    <!--end::Table-->
                  </div>
                  <!--end::Table wrapper-->
                </div>
                <!--end::Card body-->
              </div>

              <div class="card card-flush pt-3 mb-5 mb-lg-10 border-top">
                <!--begin::Card header-->
                <div class="card-header">
                  <!--begin::Card title-->
                  <div class="card-title">
                    <h2 class="fw-bold text-nowrap">Available Instruments</h2>
                  </div>
                  <!--begin::Card title-->

                  <div
                    class="card-toolbar"
                    v-if="rgpDetails.instruments.length"
                  >
                    <div
                      class="btn btn-light-primary"
                      :v-model="rgpDetails.instruments"
                    >
                      {{ rgpDetails.instruments.length }} Instrument Selected
                    </div>
                  </div>
                </div>
                <!--end::Card header-->

                <!--begin::Card body-->
                <div class="card-body pt-0">
                  <!--begin::Table wrapper-->
                  <div class="table-responsive">
                    <!--begin::Table-->
                    <table
                      class="table align-middle table-row-dashed fs-6 fw-semobold gy-4"
                      id="kt_subscription_products_table"
                    >
                      <!--begin::Table head-->
                      <thead>
                        <tr
                          class="text-start text-muted fw-bold fs-7 text-uppercase gs-0"
                        >
                          <th
                            class="min-w-30px fs-5 fw-bold text-gray-700 text-nowrap"
                          >
                            Sr.No
                          </th>
                          <th
                            class="min-w-200px fs-5 fw-bold text-gray-700 text-nowrap"
                          >
                            Instrument
                          </th>
                          <th
                            class="min-w-100px fs-5 fw-bold text-gray-700 text-nowrap"
                          >
                            Made By
                          </th>
                          <th
                            class="min-w-100px fs-5 fw-bold text-gray-700 text-nowrap"
                          >
                            Model No.
                          </th>
                          <th
                            class="min-w-100px fs-5 fw-bold text-gray-700 text-nowrap"
                          >
                            Serial No.
                          </th>
                          <th
                            class="min-w-30px fs-5 fw-bold text-center text-gray-700 text-nowrap"
                          >
                            Select
                          </th>
                        </tr>
                      </thead>
                      <!--end::Table head-->

                      <!--begin::Table body-->
                      <tbody class="text-gray-600">
                        <tr
                          v-for="(instrument, index) in AvailableInstruments"
                          :key="instrument.id"
                        >
                          <td class="fs-3 fw-bold">
                            {{ index + 1 }}
                          </td>
                          <td class="fs-3 fw-bold text-wrap">
                            {{ instrument.name }}
                          </td>
                          <td class="fs-3 fw-bold text-nowrap">
                            {{ instrument.make }}
                          </td>
                          <td class="fs-3 fw-bold text-nowrap">
                            {{ instrument.model_no }}
                          </td>
                          <td class="fs-3 fw-bold text-nowrap">
                            {{ instrument.serial_no }}
                          </td>
                          <td class="text-center">
                            <!--begin::Delete-->

                            <input
                              class="form-check-input border border-dark"
                              type="checkbox"
                              :key="instrument.id"
                              :value="instrument.id"
                              @click="checkboxToggleForInstruments"
                            />
                            <!--end::Delete-->
                          </td>
                        </tr>
                      </tbody>
                      <!--end::Table body-->
                    </table>
                    <!--end::Table-->
                  </div>
                  <!--end::Table wrapper-->
                </div>
                <!--end::Card body-->
              </div>

              <div class="modal-footer flex-center">
                <!--begin::Button-->
                <button type="reset" class="btn btn-lg btn-danger w-25">
                  Clear
                </button>
                <!--end::Button-->
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <!--begin::Button-->
                <span
                  @click="onsubmit()"
                  :data-kt-indicator="loading ? 'on' : null"
                  class="btn btn-lg btn-primary w-25"
                  type="submit"
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
            </VForm>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import ApiService from "@/core/services/ApiService";
import {
  GetAppovedQuotationsList,
  GetIncrReturnableGatePassId,
  getEngineers,
  getSiteAddress,
  getInstruments,
  addRGatePass,
  UpdateStatus,
} from "@/stores/api";
import { useAuthStore } from "@/stores/auth";
import moment from "moment";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { useRouter } from "vue-router";

// ${item.customer_name[0].first_name} ${item.customer_name[0].last_name}  ${item.client_name[0].first_name} ${item.client_name[0].last_name}

interface Engineer {
  id: string;
  first_name: string;
  last_name: string;
}

interface Instrument {
  id: string;
  name: string;
  model_no: string;
  serial_no: string;
  make: string;
}

interface RGP {
  rgp_no: string;
  quotation_id: string;
  company_id: string;
  date: string;
  duedate: string;
  engineers: Array<Engineer>;
  instruments: Array<Instrument>;
  created_by: string;
  updated_by: string;
  is_active: 1;
}

export default defineComponent({
  name: "rgp-edit",
  components: {
    VForm,
  },
  setup() {
    const auth = useAuthStore();
    const route = useRouter();
    const User = auth.GetUser();

    const loading = ref(false);

    const AvailableEngineers = ref([{ id: "", first_name: "", last_name: "" }]);

    const AvailableInstruments = ref([
    { id: "", instrument_id: "", name: "", model_no: "", serial_no: "", make: "", calibration_date: "", calibration_due_date: "",}
    ]);

    async function engineer_listing(): Promise<void> {
      try {
        const company_id = auth.GetUser().company_id;
        const response = await getEngineers(company_id);
        // console.log(response.result);
        AvailableEngineers.value = response.result.map(({ ...rest }) => ({
          ...rest,
        }));
      } catch (error) {
        console.error(error);
      } finally {
        //console.log("done");
        setTimeout(() => {
          loading.value = false;
        }, 250);
      }
    }

    async function instrument_listing(): Promise<void> {
      try {
        const company_id = auth.GetUser().company_id;
        const response = await getInstruments(company_id);
        // console.log(response.result);
        AvailableInstruments.value = response.result.map(({ ...rest }) => ({
          ...rest,
        }));
      } catch (error) {
        console.error(error);
      } finally {
        //console.log("done");
        setTimeout(() => {
          loading.value = false;
        }, 250);
      }
    }

    const Quotations = ref([
      {
        id: "",
        client_id: "",
        customer_id: "",
        quotation_no: "",
        customer_data: {
          first_name: "",
          last_name: "",
        },
        client_data: {
          first_name: "",
          last_name: "",
        },
      },
    ]);

    const SiteAddress = ref({
      address1: "",
      address2: "",
      city: "",
      states: "",
      pincode: "",
      country: "",
    });

    const rgpDetails = ref<RGP>({
      rgp_no: "",
      date: "",
      duedate: "",
      engineers: [],
      instruments: [],
      quotation_id: "",
      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
      is_active: 1,
    });

    onMounted(async () => {
      const res = await GetIncrReturnableGatePassId(User.company_id);

      console.log(res);

      IncrRGP(res);

      Quotations.value.pop();
      AvailableEngineers.value.pop();
      AvailableInstruments.value.pop();
      await GetApprovedQuotations();
      await engineer_listing();
      await instrument_listing();
    });

    const IncrRGP = (data: any) => {
      const latest_rgp_no = data.result.split("_");
      if (parseInt(latest_rgp_no[1]) == 0) {
        // ? if no record
        rgpDetails.value.rgp_no =
          latest_rgp_no[0] + "_" + latest_rgp_no[1].toString();
      } else {
        // ? if record exisit inc 1
        rgpDetails.value.rgp_no =
          latest_rgp_no[0] + "_" + (1 + +latest_rgp_no[1]).toString();
      }
    };

    const checkboxToggle = (e) => {
      if (e.target.checked) {
        const selectedId = e.target.value;
        const selectedEngineer = AvailableEngineers.value.find(
          (engineer) => engineer.id == selectedId
        );

        if (selectedEngineer) {
          rgpDetails.value.engineers.push({
            id: selectedId,
            first_name: selectedEngineer.first_name,
            last_name: selectedEngineer.last_name,
          });
        }
      } else {
        rgpDetails.value.engineers = rgpDetails.value.engineers.filter(
          (id) => id.id !== e.target.value
        );
      }

      console.log(rgpDetails.value.engineers);
    };

    const checkboxToggleForInstruments = (e) => {
      console.log(e);
      if (e.target.checked) {
        const selectedId = e.target.value;
        const selectedInstruments = AvailableInstruments.value.find(
          (instrument) => instrument.id == selectedId
        );

        if (selectedInstruments) {
          rgpDetails.value.instruments.push({
            id: selectedId,
            name: selectedInstruments.name,
            model_no: selectedInstruments.model_no,
            serial_no: selectedInstruments.serial_no,
            make: selectedInstruments.make,
          });
        }
      } else {
        rgpDetails.value.instruments = rgpDetails.value.instruments.filter(
          (id) => id.id !== e.target.value
        );
      }

      console.log(rgpDetails.value.instruments);
    };

    const GetSiteAddress = async (data: any) => {
      if (data != " ") {
        ApiService.setHeader();
        const id = data;
        const response = await getSiteAddress(id);
        // console.log(response);

        SiteAddress.value.address1 = response.result.address1;
        SiteAddress.value.address2 = response.result.address2;
        SiteAddress.value.city = response.result.city;
        SiteAddress.value.states = response.result.states;
        SiteAddress.value.pincode = response.result.pincode;
        SiteAddress.value.country = response.result.country;
      } else {
        SiteAddress.value.address1 = "";
        SiteAddress.value.address2 = "";
        SiteAddress.value.city = "";
        SiteAddress.value.states = "";
        SiteAddress.value.pincode = "";
        SiteAddress.value.country = "";
      }
    };

    const GetApprovedQuotations = async () => {
      ApiService.setHeader();

      const company_ID = auth.GetUser().company_id;
      const response = await GetAppovedQuotationsList(company_ID);

      Quotations.value.push(
        ...response.result.map(({ ...rest }) => ({
          ...rest,
        }))
      );
    };

    const onsubmit = async () => {
      console.log(rgpDetails.value);
      rgpDetails.value.date = moment(rgpDetails.value.date).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      rgpDetails.value.duedate = moment(rgpDetails.value.duedate).format(
        "YYYY-MM-DD HH:mm:ss"
      );

      try {
        const res = await GetIncrReturnableGatePassId(User.company_id);
        // console.log(res);
        if (rgpDetails.value.rgp_no !== res.result) {
          const response = await addRGatePass(rgpDetails.value);

          if (!response.error) {
            // change the availability of engineers and instruments
            const statusUpdate = await UpdateStatus(rgpDetails.value);

            if (!statusUpdate.error) {
              showSuccessAlert(
                "Success",
                "Returnable Gate pass details have been successfully inserted!"
              );
              route.push({ name: "invoices-list" });
            }
          } else {
            // Handle API error response
            const errorData = response.error;
            // console.log("API error:", errorData);
            console.log("API error:", errorData.response.data.errors);
            showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
          }
        } else {
          showErrorAlert("Warning", "Bad Luck! RGP Details Already Exists");
          route.push({ name: "rgp-add" });
        }
      } catch (error) {
        // Handle any other errors during API call
        console.error("API call error:", error);
        showErrorAlert("Error", "An error occurred during the API call.");
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

    const disabledDate = (time: Date) => {
      return null;
    };

    return {
      Quotations,
      rgpDetails,
      getAssetPath,
      GetApprovedQuotations,
      SiteAddress,
      GetSiteAddress,
      engineer_listing,
      instrument_listing,
      AvailableEngineers,
      AvailableInstruments,
      loading,
      onsubmit,
      shortcuts,
      checkboxToggle,
      checkboxToggleForInstruments,
      disabledDate,
      IncrRGP,
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
