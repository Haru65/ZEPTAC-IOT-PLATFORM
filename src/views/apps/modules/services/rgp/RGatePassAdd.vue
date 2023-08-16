<template>
  <!--begin::Card-->
  <div class="card">
    <!--begin::Card body-->
    <div class="card-body">
      <div
        class="d-flex flex-center fw-row text-nowrap order-1 order-xxl-2 me-4"
        data-bs-toggle="tooltip"
        data-bs-trigger="hover"
        data-bs-original-title="Enter RGP number"
        data-kt-initialized="1"
      >
        <h3 class="fs-2 fw-bold text-gray-800"
          >Gate Pass # {{ rgpDetails.rgp_no }}</h3
        >
      </div>
      <!--begin::Stepper-->
      <div
        class="stepper stepper-links d-flex flex-column"
        id="kt_create_account_stepper"
        ref="horizontalWizardRef"
      >
        <!--begin::Nav-->
        <div class="stepper-nav py-5 mt-5 mw-900">
          <!--begin::Step 1-->
          <div class="stepper-item current" data-kt-stepper-element="nav">
            <h3 class="stepper-title">Pick a Date</h3>
          </div>
          <!--end::Step 1-->

          <!--begin::Step 2-->
          <div class="stepper-item" data-kt-stepper-element="nav">
            <h3 class="stepper-title">Engineers</h3>
          </div>
          <!--end::Step 2-->

          <!--begin::Step 3-->
          <div class="stepper-item" data-kt-stepper-element="nav">
            <h3 class="stepper-title">Instruments</h3>
          </div>
          <!--end::Step 3-->

          <!--begin::Step 4-->
          <div class="stepper-item" data-kt-stepper-element="nav">
            <h3 class="stepper-title">Summary</h3>
          </div>
          <!--end::Step 4-->
        </div>
        <!--end::Nav-->

        <!--begin::Form-->
        <form
          class="mx-auto mw-900px w-100 pt-15 pb-10"
          novalidate
          id="kt_create_account_form"
          @submit="handleStep"
        >
          <!--begin::Step 1-->
          <div class="current" data-kt-stepper-element="content">
            <Step1
              v-bind:quotations="Quotations"
              @date-selected="setDate"
              @duedate-selected="setDueDate"
              @quotation-selected="setQuotation"
            ></Step1>
          </div>
          <!--end::Step 1-->

          <!--begin::Step 2-->
          <div data-kt-stepper-element="content">
            <Step2
              v-bind:engineers="AvailableEngineers"
              @set-engineers="setEngineers"
            ></Step2>
          </div>
          <!--end::Step 2-->

          <!--begin::Step 3-->
          <div data-kt-stepper-element="content">
            <Step3
              v-bind:instruments="AvailableInstruments"
              @set-instruments="setInstruments"
            ></Step3>
          </div>
          <!--end::Step 3-->

          <!--begin::Step 4-->
          <div data-kt-stepper-element="content">
            <Step4 v-bind:summary="rgpDetails"></Step4>
          </div>
          <!--end::Step 4-->

          <!--begin::Actions-->
          <div class="d-flex flex-stack pt-15">
            <!--begin::Wrapper-->
            <div class="mr-2">
              <button
                type="button"
                class="btn btn-lg btn-light-primary me-3"
                data-kt-stepper-action="previous"
                @click="previousStep"
              >
                <KTIcon icon-name="arrow-left" icon-class="fs-4 me-1" />
                Back
              </button>
            </div>
            <!--end::Wrapper-->

            <!--begin::Wrapper-->
            <div>
              <button
                type="button"
                class="btn btn-lg btn-primary me-3"
                data-kt-stepper-action="submit"
                v-if="currentStepIndex === totalSteps - 1"
                @click="formSubmit()"
              >
                <span class="indicator-label">
                  Submit
                  <KTIcon icon-name="arrow-right" icon-class="fs-3 ms-2 me-0" />
                </span>
                <span class="indicator-progress">
                  Please wait...
                  <span
                    class="spinner-border spinner-border-sm align-middle ms-2"
                  ></span>
                </span>
              </button>

              <button v-else type="submit" class="btn btn-lg btn-primary">
                Continue
                <KTIcon icon-name="arrow-right" icon-class="fs-4 ms-2 me-0" />
              </button>
            </div>
            <!--end::Wrapper-->
          </div>
          <!--end::Actions-->
        </form>
        <!--end::Form-->
      </div>
      <!--end::Stepper-->
    </div>
    <!--end::Card body-->
  </div>
  <!--end::Card-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent, onMounted, ref } from "vue";
import { StepperComponent } from "@/assets/ts/components";
import { useForm } from "vee-validate";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";
import Step1 from "./steps/step1.vue";
import Step2 from "./steps/step2.vue";
import Step3 from "./steps/step3.vue";
import Step4 from "./steps/step4.vue";
import moment from "moment";

import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import {
  GetAppovedQuotationsList,
  GetIncrReturnableGatePassId,
  UpdateStatus,
  addRGatePass,
  getEngineers,
getInstruments,
} from "@/stores/api";
import ApiService from "@/core/services/ApiService";

interface IStep1 {
  date?: string;
  duedate?: string;
  quotation_id?: string;
}

interface IStep2 {
  engineers?: [{}];
}

interface IStep3 {
  businessName?: string;
  businessDescriptor?: string;
  businessType?: string;
  businessDescription?: string;
  businessEmail?: string;
}

interface IStep4 {
  nameOnCard?: string;
  cardNumber?: string;
  cardExpiryMonth?: string;
  cardExpiryYear?: string;
  cardCvv?: string;
  saveCard?: string;
}

interface CreateAccount extends IStep1, IStep2, IStep3, IStep4 {}

export default defineComponent({
  name: "kt-horizontal-wizard",
  components: {
    Step1,
    Step2,
    Step3,
    Step4,
  },
  setup() {
    const _stepperObj = ref<StepperComponent | null>(null);
    const horizontalWizardRef = ref<HTMLElement | null>(null);
    const currentStepIndex = ref(0);

    const auth = useAuthStore();
    const route = useRouter();
    const User = auth.GetUser();

    const rgpDetails = ref({
      rgp_no: "",
      date: "",
      duedate: "",
      engineers: [],
      instruments: [],
      site_address: {
        address1: "",
        address2: "",
        city: "",
        pincode: "",
        states: "",
        country: "",
      },
      quotation_id: "",
      customer_name: "",
      client_name: "",
      quotation_no: "",
      status: 1,
      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
      is_active: 1,
    });

    function setDate(date){
        rgpDetails.value.date = date
      
    }

    function setDueDate(duedate){
        rgpDetails.value.duedate = duedate
    }

    function setQuotation(e,address, customer_name, client_name, quotation_no){
      rgpDetails.value.quotation_id = e ? e : ""
      rgpDetails.value.customer_name = customer_name ? customer_name : ""
      rgpDetails.value.client_name = client_name ? client_name : ""
      rgpDetails.value.quotation_no = quotation_no ? quotation_no : ""
      rgpDetails.value.site_address.address1 = address.address1 ? address.address1 : ""
      rgpDetails.value.site_address.address2 = address.address2? address.address2 : ""
      rgpDetails.value.site_address.city = address.city? address.city : ""
      rgpDetails.value.site_address.pincode = address.pincode? address.pincode : ""
      rgpDetails.value.site_address.states = address.states? address.states : ""

    } 


    async function setEngineers(engineers){
      rgpDetails.value.engineers = await engineers
    }

    async function setInstruments(instruments){
      rgpDetails.value.instruments = await instruments
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

    const AvailableEngineers = ref([{ id: "", first_name: "", last_name: "" }]);

    async function engineer_listing(): Promise<void> {
      try {
        const company_id = auth.GetUser().company_id;
        const response = await getEngineers(company_id);
        // console.log(response.result);
        if (response.result) {
          AvailableEngineers.value = response.result.map(({ ...rest }) => ({
            ...rest,
          }));
        }
      } catch (error) {
        console.error(error);
      }
    }

    const AvailableInstruments = ref([
      { id: "", name: "", model_no: "", serial_no: "", make: "" },
    ]);

    async function instrument_listing(): Promise<void> {
      try {
        const company_id = auth.GetUser().company_id;
        const response = await getInstruments(company_id);
        // console.log(response.result);
        if(response.result){
          AvailableInstruments.value = response.result.map(({ ...rest}) => ({
          ...rest,
        }));
        }
      } catch (error) {
        console.error(error);
      }
    }
    

    const formData = ref<CreateAccount>({
    });

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

    onMounted(async () => {
      const res = await GetIncrReturnableGatePassId(User.company_id);
      IncrRGP(res);

      Quotations.value.pop();
      AvailableEngineers.value.pop();
      AvailableInstruments.value.pop();
      await GetApprovedQuotations();
      await engineer_listing();
      await instrument_listing();
      _stepperObj.value = StepperComponent.createInsance(
        horizontalWizardRef.value as HTMLElement
      );
    });

    const createAccountSchema = [
      // Yup.object({
      //   date: Yup.string().required().label("date"),
      //   duedate: Yup.string().required().label("duedate"),
      // }),
      // Yup.object({
      //   accountName: Yup.string().required().label("Account Name"),
      // }),
      // Yup.object({
      //   businessName: Yup.string().required().label("Business Name"),
      //   businessDescriptor: Yup.string()
      //     .required()
      //     .label("Shortened Descriptor"),
      //   businessType: Yup.string().required().label("Corporation Type"),
      //   businessEmail: Yup.string().required().label("Contact Email"),
      // }),
      // Yup.object({
      //   nameOnCard: Yup.string().required().label("Name On Card"),
      //   cardNumber: Yup.string().required().label("Card Number"),
      //   cardExpiryMonth: Yup.string().required().label("Expiration Month"),
      //   cardExpiryYear: Yup.string().required().label("Expiration Year"),
      //   cardCvv: Yup.string().required().label("CVV"),
      // }),
      // Yup.object({
      //   date: Yup.string().required().label("date"),
      //   duedate: Yup.string().required().label("duedate"),
      //   quotation_id: Yup.string().required().label("quotation_id"),
      // }),
      // Yup.object({
      //   accountName: Yup.string().required().label("Account Name"),
      // }),
      // Yup.object({
      //   businessName: Yup.string().required().label("Business Name"),
      //   businessDescriptor: Yup.string()
      //     .required()
      //     .label("Shortened Descriptor"),
      //   businessType: Yup.string().required().label("Corporation Type"),
      //   businessEmail: Yup.string().required().label("Contact Email"),
      // }),
      // Yup.object({
      //   nameOnCard: Yup.string().required().label("Name On Card"),
      //   cardNumber: Yup.string().required().label("Card Number"),
      //   cardExpiryMonth: Yup.string().required().label("Expiration Month"),
      //   cardExpiryYear: Yup.string().required().label("Expiration Year"),
      //   cardCvv: Yup.string().required().label("CVV"),
      // }),
    ];

    const currentSchema = computed(() => {
      return createAccountSchema[currentStepIndex.value];
    });

    const { resetForm, handleSubmit } = useForm<IStep2 | IStep3 | IStep4 >({
      // validationSchema: currentSchema,
    });

    const totalSteps = computed(() => {
      if (_stepperObj.value) {
        return _stepperObj.value.totalStepsNumber;
      } else {
        return 1;
      }
    });

    const handleStep = handleSubmit((values) => {

      // resetForm({});

      // formData.value = { ...values };

      if(currentStepIndex.value === 0){
        if(rgpDetails.value.date && rgpDetails.value.duedate && rgpDetails.value.quotation_id){

          currentStepIndex.value++;

          if (!_stepperObj.value) {
            return;
          }

          _stepperObj.value.goNext();

        }
        else{
          Swal.fire({
            icon: "info",
            title: "Please fill all the required fields",
          });
        }
      }
      else if(currentStepIndex.value === 1){
        if(rgpDetails.value.engineers.length > 0){
          currentStepIndex.value++;

          if (!_stepperObj.value) {
            return;
          }

          _stepperObj.value.goNext();
        }
        else{
          Swal.fire({
            icon: "info",
            title: "Please select at least one engineer",
          });
        }
      }
      else if(currentStepIndex.value === 2){
        if(rgpDetails.value.instruments.length > 0){
          currentStepIndex.value++;

          if (!_stepperObj.value) {
            return;
          }

          _stepperObj.value.goNext();
        }
        else{
          Swal.fire({
            icon: "info",
            title: "Please select at least one instrument",
          });
        }
      }


    });

    const previousStep = () => {
      
      if (!_stepperObj.value) {
        return;
      }

      currentStepIndex.value--;

      _stepperObj.value.goPrev();
    };

    const formSubmit = async () => {

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

            if(!statusUpdate.error){

            showSuccessAlert(
              "Success",
              "Returnable Gate pass details have been successfully inserted!"
            );
            route.push({ name: "rgp-list" });
            }
          }else {
            // Handle API error response
            const errorData = response.error;
            // console.log("API error:", errorData);
            console.log("API error:", errorData.response.data.errors);
            showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
          }
        }else {
          showErrorAlert("Warning", "Bad Luck! RGP Details Already Exists");
          route.push({ name: "rgp-list" });
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

    return {
      horizontalWizardRef,
      previousStep,
      handleStep,
      formSubmit,
      totalSteps,
      currentStepIndex,
      getAssetPath,
      IncrRGP,
      rgpDetails,
      Quotations,
      GetApprovedQuotations,
      AvailableEngineers,
      engineer_listing,
      AvailableInstruments,
      instrument_listing,
      setDate,
      setDueDate,
      setQuotation,
      setEngineers,
      setInstruments,
      showErrorAlert,
      showSuccessAlert
    };
  },
});
</script>
