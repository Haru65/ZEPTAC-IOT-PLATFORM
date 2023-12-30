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
            <Step1 v-bind:details="expenseSheetDetails"></Step1>
          </div>
          <!--end::Step 1-->

          <!--begin::Step 2-->
          <div data-kt-stepper-element="content">
            <Step2
              v-bind:tasks="expenseSheetDetails.expenses"
              v-bind:total_amount="expenseSheetDetails.total_amount"
              v-bind:status="expenseSheetDetails.status"
              v-on:changeStatus="setStatus"
              v-on:showImage="showTheImage"
              v-on:HideImage="HideTheImage"
            ></Step2>
          </div>
          <!--end::Step 2-->

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
import Step1 from "./stepsForEdit/Step1.vue";
import Step2 from "./stepsForEdit/Step2.vue";

import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { getExpenseSheet, updateExpenseSheet } from "@/stores/api";
import ApiService from "@/core/services/ApiService";
import { ExpenseTypes } from "@/core/model/expensetypes";

interface IStep1 {}

interface IStep2 {}

interface CreateAccount extends IStep1, IStep2 {}

export default defineComponent({
  name: "kt-horizontal-wizard",
  components: {
    Step1,
    Step2,
  },
  setup() {
    const _stepperObj = ref<StepperComponent | null>(null);
    const horizontalWizardRef = ref<HTMLElement | null>(null);
    const currentStepIndex = ref(0);
    const loading = ref(false);

    const auth = useAuthStore();
    const route = useRoute();
    const router = useRouter();
    
    const User = auth.GetUser();
    const itemId = route.params.id;

    const expenseSheetDetails = ref({
      id: "",
      rgp_no: "",
      date: "",
      duedate: "",
      expenses: [
        {
          id: "",
          date: "",
          type: "",
          description: "",
          amount: "",
          receipt: "",
          imgData: "",
          visible: false,
        },
      ],
      total_amount: "",
      engineer_id: "",
      engineer_name: "",
      site_address: {
        company_name: "",
        address1: "",
        address2: "",
        city: "",
        pincode: "",
        states: "",
        country: "",
      },
      customer_name: "",
      status: "1",
      updated_by: User.id,
    });

    const formData = ref<CreateAccount>({});

    const lightBox = ref([]);

    const fillDetails = async (result) => {
      expenseSheetDetails.value.id = result.id;
      expenseSheetDetails.value.rgp_no = result.rgpDetails.rgp_no;
      expenseSheetDetails.value.date = result.rgpDetails.date;
      expenseSheetDetails.value.duedate = result.rgpDetails.duedate;
      expenseSheetDetails.value.total_amount = result.total_amount;
      expenseSheetDetails.value.status = result.status;
      expenseSheetDetails.value.site_address.company_name = result.site_address
        .company_name
        ? result.site_address.company_name
        : "";
      expenseSheetDetails.value.site_address.address1 = result.site_address
        .address1
        ? result.site_address.address1
        : "";
      expenseSheetDetails.value.site_address.address2 = result.site_address
        .address2
        ? result.site_address.address2
        : "";
      expenseSheetDetails.value.site_address.city = result.site_address.city
        ? result.site_address.city
        : "";
      expenseSheetDetails.value.site_address.pincode = result.site_address
        .pincode
        ? result.site_address.pincode
        : "";
      expenseSheetDetails.value.site_address.states = result.site_address.state
        ? result.site_address.states
        : "";
      expenseSheetDetails.value.site_address.country = result.site_address
        .country
        ? result.site_address.country
        : "";
      expenseSheetDetails.value.customer_name =
        result.customer_data.company_name;
      expenseSheetDetails.value.status = result.status;
      expenseSheetDetails.value.engineer_name =
        result.service_engineer_data.first_name +
        " " +
        result.service_engineer_data.last_name;

      expenseSheetDetails.value.expenses = JSON.parse(result.expenses);

      expenseSheetDetails.value.expenses.forEach((expense) => { // You can set the initial value for imgData here
        expense.imgData = `https://api.zeptac.com/storage/company/${result.company_id}/expenses/${expense.receipt}`; // You can set the initial value for imgData here
        expense.visible = false; // You can set the initial value for visible here
      });

      console.log(expenseSheetDetails.value);
    };

    function showTheImage(index) {
      expenseSheetDetails.value.expenses[index].visible = true;
      console.log(index);
    }

    function HideTheImage(index) {
      console.log(index);
      expenseSheetDetails.value.expenses[index].visible = false;
    }

    async function setStatus(e) {
      expenseSheetDetails.value.status = await e;
    }

    onMounted(async () => {
      ApiService.setHeader();
      const response = await getExpenseSheet(itemId.toString());
      await fillDetails(response.result);

      _stepperObj.value = StepperComponent.createInsance(
        horizontalWizardRef.value as HTMLElement
      );
    });

    const createAccountSchema = [];

    const currentSchema = computed(() => {
      return createAccountSchema[currentStepIndex.value];
    });

    const { resetForm, handleSubmit } = useForm<IStep2>({
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

    const formSubmit = async () => {
      loading.value = true;
      try {
        const response = await updateExpenseSheet(itemId, expenseSheetDetails.value);
        if (!response.error) {
          showSuccessAlert(
            "Success",
            "Expense Sheet Status have been successfully updated!"
          );

          loading.value = false;
          router.push({ name: "expensesheet-approval" });
        }
      } catch (error) {
        // Handle any other errors during API call
        console.error("API call error:", error);
        showErrorAlert("Error", "An error occurred during the API call.");
      } finally {
        loading.value = false;
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
      expenseSheetDetails,
      showTheImage,
      HideTheImage,
      showErrorAlert,
      showSuccessAlert,
      loading,
      setStatus,
    };
  },
});
</script>