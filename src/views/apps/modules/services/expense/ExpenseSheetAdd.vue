<template>
  <!--begin::Card-->
  <div class="card">
    <!--begin::Card body-->
    <div class="card-body">
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
            <h3 class="stepper-title">RGP Information</h3>
          </div>
          <!--end::Step 1-->

          <!--begin::Step 2-->
          <div class="stepper-item" data-kt-stepper-element="nav">
            <h3 class="stepper-title">Expenses</h3>
          </div>
          <!--end::Step 2-->

          <!--begin::Step 3-->
          <div class="stepper-item" data-kt-stepper-element="nav">
            <h3 class="stepper-title">Summary</h3>
          </div>
          <!--end::Step 3-->
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
            v-bind:ongoingRGPS="RGPS"
            @rgp-Selected="setRGPDetails"
            @engineer-Selected="setEngineer"
            ></Step1>
          </div>
          <!--end::Step 1-->

          <!--begin::Step 2-->
          <div data-kt-stepper-element="content">
            <Step2>afad</Step2>
          </div>
          <!--end::Step 2-->

          <!--begin::Step 3-->
          <div data-kt-stepper-element="content">
            <Step3>adfadfa</Step3>
          </div>
          <!--end::Step 3-->

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
                :data-kt-indicator="loading ? 'on' : null"
                v-if="currentStepIndex === totalSteps - 1"
                @click="formSubmit()"
              >
                <span v-if="!loading" class="indicator-label"> Submit </span>
                <span v-if="loading" class="indicator-progress">
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
import moment from "moment";

import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { getOnGoingRGP } from "@/stores/api";
import ApiService from "@/core/services/ApiService";

interface IStep1 {}

interface IStep2 {}

interface IStep3 {}

interface CreateAccount extends IStep1, IStep2, IStep3 {}

export default defineComponent({
  name: "kt-horizontal-wizard",
  components: {
    Step1,
    Step2,
    Step3,
  },
  setup() {
    const _stepperObj = ref<StepperComponent | null>(null);
    const horizontalWizardRef = ref<HTMLElement | null>(null);
    const currentStepIndex = ref(0);
    const loading = ref(false);

    const auth = useAuthStore();
    const route = useRouter();
    const User = auth.GetUser();

    const expenseSheetDetails = ref({
      rgp_id: "",
      rgp_no: "",
      date: "",
      duedate: "",
      expenses: [],
      engineer_id: "",
      engineer_name: "",
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
      status: "1",
      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
      is_active: 1,
    });

    // function setDate(date){
    //     rgpDetails.value.date = date

    // }

    function setEngineer(engineer_id, engineer_name){
      expenseSheetDetails.value.engineer_id = engineer_id
      expenseSheetDetails.value.engineer_name = engineer_name
    }

    function setRGPDetails(rgp_id, rgp_no, address, customer_name, date, duedate){
      expenseSheetDetails.value.engineer_name = "";
      expenseSheetDetails.value.engineer_id = "";
      expenseSheetDetails.value.rgp_id = rgp_id ? rgp_id : ""
      expenseSheetDetails.value.rgp_no = rgp_no ? rgp_no : ""
      expenseSheetDetails.value.site_address.address1 = address.address1 ? address.address1 : ""
      expenseSheetDetails.value.site_address.address2 = address.address2? address.address2 : ""
      expenseSheetDetails.value.site_address.city = address.city? address.city : ""
      expenseSheetDetails.value.site_address.pincode = address.pincode? address.pincode : ""
      expenseSheetDetails.value.site_address.states = address.states? address.states : ""
      expenseSheetDetails.value.site_address.country = address.country? address.country : ""
      expenseSheetDetails.value.customer_name = customer_name ? customer_name : ""
      expenseSheetDetails.value.date = date
      expenseSheetDetails.value.duedate = duedate

    }

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
          states: "",
        },
        customer_data: {
          id: "",
          first_name: "",
          last_name: "",
        },
        date: "",
        duedate: "",
      },
    ]);

    const formData = ref<CreateAccount>({});

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
              states: result.site_address.states,
            },
            customer_data: {
              id: result.customer_data.id,
              first_name: result.customer_data.first_name,
              last_name: result.customer_data.last_name,
            },
            date: result.date,
            duedate: result.duedate,
          };
        })
      );
    };

    const GetOnGoingRGP = async () => {
      ApiService.setHeader();

      const company_ID = auth.GetUser().company_id;
      const response = await getOnGoingRGP(company_ID);

      if (response) {
        await fillDetails(response);
      }
    };

    onMounted(async () => {
      RGPS.value.pop();
      await GetOnGoingRGP();

      _stepperObj.value = StepperComponent.createInsance(
        horizontalWizardRef.value as HTMLElement
      );
    });

    const createAccountSchema = [];

    const currentSchema = computed(() => {
      return createAccountSchema[currentStepIndex.value];
    });

    const { resetForm, handleSubmit } = useForm<IStep2 | IStep3>({
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

      if (currentStepIndex.value === 0) {
        if (
          expenseSheetDetails.value.rgp_id &&
          expenseSheetDetails.value.engineer_id
        ) {
          currentStepIndex.value++;

          if (!_stepperObj.value) {
            return;
          }

          _stepperObj.value.goNext();
        } else {
          Swal.fire({
            icon: "info",
            title: "Please fill all the required fields",
          });
        }
      } else if (currentStepIndex.value === 1) {
        if (expenseSheetDetails.value.expenses.length > 0) {
          currentStepIndex.value++;

          if (!_stepperObj.value) {
            return;
          }

          _stepperObj.value.goNext();
        } else {
          Swal.fire({
            icon: "info",
            title: "Please fill at least one expense",
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
      // loading.value = true;
      // console.log(rgpDetails.value);
      // rgpDetails.value.date = moment(rgpDetails.value.date).format(
      //   "YYYY-MM-DD HH:mm:ss"
      // );
      // rgpDetails.value.duedate = moment(rgpDetails.value.duedate).format(
      //   "YYYY-MM-DD HH:mm:ss"
      // );
      // try {
      //   const res = await GetIncrReturnableGatePassId(User.company_id);
      //   // console.log(res);
      //   if (rgpDetails.value.rgp_no !== res.result) {
      //     const response = await addRGatePass(rgpDetails.value);
      //     if (!response.error) {
      //       // change the availability of engineers and instruments
      //       const statusUpdate = await UpdateStatus(rgpDetails.value);
      //       if(!statusUpdate.error){
      //       showSuccessAlert(
      //         "Success",
      //         "Returnable Gate pass details have been successfully inserted!"
      //       );
      //       route.push({ name: "rgp-list" });
      //       }
      //     }else {
      //       // Handle API error response
      //       const errorData = response.error;
      //       // console.log("API error:", errorData);
      //       console.log("API error:", errorData.response.data.errors);
      //       showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
      //     }
      //   }else {
      //     showErrorAlert("Warning", "Bad Luck! RGP Details Already Exists");
      //     route.push({ name: "rgp-list" });
      //   }
      //   loading.value = false;
      // } catch (error) {
      //   // Handle any other errors during API call
      //   console.error("API call error:", error);
      //   showErrorAlert("Error", "An error occurred during the API call.");
      // }
      // finally {
      //   loading.value = false;
      // }
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
      expenseSheetDetails,
      GetOnGoingRGP,
      // setDate,
      // setDueDate,
      showErrorAlert,
      showSuccessAlert,
      RGPS,
      loading,
      setRGPDetails,
      setEngineer,
    };
  },
});

</script>