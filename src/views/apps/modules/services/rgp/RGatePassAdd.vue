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
        <span class="fs-2 fw-bold text-gray-800" >Gate Pass # {{ rgpDetails.rgp_no }}</span>
      </div>
      <!--begin::Stepper-->
      <div
        class="stepper stepper-links d-flex flex-column"
        id="kt_create_account_stepper"
        ref="horizontalWizardRef"
      >
        <!--begin::Nav-->
        <div class="stepper-nav py-5 mt-5">
          <!--begin::Step 1-->
          <div class="stepper-item current" data-kt-stepper-element="nav">
            <h3 class="stepper-title">Pick a Date</h3>
          </div>
          <!--end::Step 1-->

          <!--begin::Step 2-->
          <div class="stepper-item" data-kt-stepper-element="nav">
            <h3 class="stepper-title">Quotation</h3>
          </div>
          <!--end::Step 2-->

          <!--begin::Step 3-->
          <div class="stepper-item" data-kt-stepper-element="nav">
            <h3 class="stepper-title">Engineers</h3>
          </div>
          <!--end::Step 3-->

          <!--begin::Step 4-->
          <div class="stepper-item" data-kt-stepper-element="nav">
            <h3 class="stepper-title">Instruments</h3>
          </div>
          <!--end::Step 4-->

          <!--begin::Step 5-->
          <div class="stepper-item" data-kt-stepper-element="nav">
            <h3 class="stepper-title">Overview</h3>
          </div>
          <!--end::Step 5-->
        </div>
        <!--end::Nav-->

        <!--begin::Form-->
        <form
          class="mx-auto mw-600px w-100 pt-15 pb-10"
          novalidate
          id="kt_create_account_form"
          @submit="handleStep"
        >
          <!--begin::Step 1-->
          <div class="current" data-kt-stepper-element="content">
            <Step1 v-bind:quotations="Quotations"
            
            ></Step1>
          </div>
          <!--end::Step 1-->

          <!--begin::Step 2-->
          <div data-kt-stepper-element="content">
            <Step2></Step2>
          </div>
          <!--end::Step 2-->

          <!--begin::Step 3-->
          <div data-kt-stepper-element="content">
            <Step3></Step3>
          </div>
          <!--end::Step 3-->

          <!--begin::Step 4-->
          <div data-kt-stepper-element="content">
            <Step4></Step4>
          </div>
          <!--end::Step 4-->

          <!--begin::Step 5-->
          <div data-kt-stepper-element="content">
            <Step5></Step5>
          </div>
          <!--end::Step 5-->

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
import Step2 from "@/components/wizard/steps/Step2.vue";
import Step3 from "@/components/wizard/steps/Step3.vue";
import Step4 from "@/components/wizard/steps/Step4.vue";
import Step5 from "@/components/wizard/steps/Step5.vue";

import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { GetAppovedQuotationsList, GetIncrReturnableGatePassId } from "@/stores/api";
import ApiService from "@/core/services/ApiService";

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

interface IStep1 {
  accountType?: string;
}

interface IStep2 {
  accountTeamSize?: string;
  accountName?: string;
  accountPlan?: string;
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
    Step5,
  },
  setup() {
    const _stepperObj = ref<StepperComponent | null>(null);
    const horizontalWizardRef = ref<HTMLElement | null>(null);
    const currentStepIndex = ref(0);

    const auth = useAuthStore();
    const route = useRouter();
    const User = auth.GetUser();

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
    // onMounted(async () => {

    // const res = await GetIncrReturnableGatePassId(User.company_id);
    // IncrRGP(res);

    // // Quotations.value.pop();
    // // AvailableEngineers.value.pop();
    // // AvailableInstruments.value.pop();
    // // await GetApprovedQuotations();
    // // await engineer_listing();
    // // await instrument_listing();
    // });

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

    const formData = ref<CreateAccount>({
      accountType: "personal",
      accountTeamSize: "50+",
      accountName: "",
      accountPlan: "1",
      businessName: "Portal Inc.",
      businessDescriptor: "PORTAL",
      businessType: "1",
      businessDescription: "",
      businessEmail: "corp@support.com",
      nameOnCard: "Max Doe",
      cardNumber: "4111 1111 1111 1111",
      cardExpiryMonth: "1",
      cardExpiryYear: "2",
      cardCvv: "123",
      saveCard: "1",
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
    // AvailableEngineers.value.pop();
    // AvailableInstruments.value.pop();
    await GetApprovedQuotations();
    // await engineer_listing();
    // await instrument_listing();
      _stepperObj.value = StepperComponent.createInsance(
        horizontalWizardRef.value as HTMLElement
      );
    });

    const createAccountSchema = [
      Yup.object({
        date: Yup.string().required().label("date"),
        duedate: Yup.string().required().label("duedate"),
      }),
      Yup.object({
        accountName: Yup.string().required().label("Account Name"),
      }),
      Yup.object({
        businessName: Yup.string().required().label("Business Name"),
        businessDescriptor: Yup.string()
          .required()
          .label("Shortened Descriptor"),
        businessType: Yup.string().required().label("Corporation Type"),
        businessEmail: Yup.string().required().label("Contact Email"),
      }),
      Yup.object({
        nameOnCard: Yup.string().required().label("Name On Card"),
        cardNumber: Yup.string().required().label("Card Number"),
        cardExpiryMonth: Yup.string().required().label("Expiration Month"),
        cardExpiryYear: Yup.string().required().label("Expiration Year"),
        cardCvv: Yup.string().required().label("CVV"),
      }),
    ];

    const currentSchema = computed(() => {
      return createAccountSchema[currentStepIndex.value];
    });

    const { resetForm, handleSubmit } = useForm<
      IStep1 | IStep2 | IStep3 | IStep4
    >({
      validationSchema: currentSchema,
    });

    const totalSteps = computed(() => {
      if (_stepperObj.value) {
        return _stepperObj.value.totalStepsNumber;
      } else {
        return 1;
      }
    });

    const handleStep = handleSubmit((values) => {
      resetForm({
        values: {
          ...formData.value,
        },
      });

      formData.value = { ...values };

      currentStepIndex.value++;

      if (!_stepperObj.value) {
        return;
      }

      _stepperObj.value.goNext();
    });

    const previousStep = () => {
      if (!_stepperObj.value) {
        return;
      }

      currentStepIndex.value--;

      _stepperObj.value.goPrev();
    };

    const formSubmit = () => {
      Swal.fire({
        text: "All is cool! Now you submit this form",
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: "Ok, got it!",
        heightAuto: false,
        customClass: {
          confirmButton: "btn fw-semobold btn-light-primary",
        },
      }).then(() => {
        window.location.reload();
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
    };
  },
});
</script>
