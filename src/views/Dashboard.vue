<template>
  <div v-if="User.role_id == 1 || User.role_id == 2" class="">
    <!--begin::Row-->
    <div class="row p-6" v-if="daysLeft <= 5 && daysLeft >= 0">
      <!--begin::Alert-->
      <div
        class="alert alert-dismissible bg-light-warning border border-dashed d-flex flex-column flex-sm-row p-5 mb-10"
      >
        <!--begin::Icon-->
        <i
          class="ki-duotone ki-notification-bing fs-2hx text-success me-4 mb-5 mb-sm-0"
          ><span class="path1"></span><span class="path2"></span
          ><span class="path3"></span
        ></i>
        <!--end::Icon-->

        <!--begin::Wrapper-->
        <div class="d-flex flex-column pe-0 pe-sm-10">
          <!--begin::Title-->
          <h4 class="text-gray-800 fw-bold">Attention Required!</h4>
          <!--end::Title-->
          <div class="fs-6 text-gray-600">
            Your {{ isTrial ? "trial" : "subscription" }} will expire in
            {{ daysLeft }} days. Please renew to avoid any interruption in
            service.
            <router-link
              :to="`/subscription/${User.company_id}`"
              class="link-primary fw-bold"
              >Renew Now</router-link
            >
          </div>
        </div>
        <!--end::Wrapper-->

        <!--begin::Close-->
        <button
          type="button"
          class="position-absolute position-sm-relative m-2 m-sm-0 top-0 end-0 btn btn-icon ms-sm-auto"
          data-bs-dismiss="alert"
        >
          <i class="ki-duotone ki-cross fs-1 text-success"
            ><span class="path1"></span><span class="path2"></span
          ></i>
        </button>
        <!--end::Close-->
      </div>
      <!--end::Alert-->
    </div>
    <!--end::Row-->

    <!--begin::Row-->
    <div class="row g-5 g-xl-8">
      <!--begin::Col-->
      <div class="col-xl-6">
        <EnquiriesWidget
          widget-classes="card-xl-stretch mb-xl-8"
          widget-color="info"
          chart-height="200"
          stroke-color="#4e12c4"
        ></EnquiriesWidget>
      </div>
      <!--end::Col-->

      <!--begin::Col-->
      <div class="col-xl-6">
        <QuotationWidget
          widget-classes="card-xl-stretch mb-xl-8"
          widget-color="danger"
          chart-height="200"
          stroke-color="#cb1e46"
        ></QuotationWidget>
      </div>
      <!--end::Col-->

    </div>
    <!--end::Row-->
    <!--begin::Row-->
    <div class="row g-5 g-xl-8 mt-6">
      <!--begin::Col-->
      <div class="col-xl-12">
        <ConversionWidget
          widget-classes="card-xl-stretch mb-xl-8"
          widget-color="light-info"
          chart-height="200"
        ></ConversionWidget>
      </div>
      <!--end::Col-->
      <div class="col-xl-12">
        <SalesWidget
          widget-classes="card-xl-stretch mb-xl-8"
          widget-color="secondary"
          chart-height="200"
        ></SalesWidget>
      </div>
      <!--end::Col-->
    </div>
    <!--end::Row-->
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref, watch, computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import EnquiriesWidget from "@/components/widgets/mixed/EnquiriesWidget.vue";
import QuotationWidget from "@/components/widgets/mixed/QuotationWidget.vue";
import SalesWidget from "@/components/widgets/mixed/SalesWidget.vue";
import ConversionWidget from "@/components/widgets/mixed/ConversionWidget.vue";

export default defineComponent({
  name: "main-dashboard",
  components: {
    EnquiriesWidget,
    QuotationWidget,
    ConversionWidget,
    SalesWidget,
    // Widget13,
    // Widget14,
  },
  setup() {
    const authStore = useAuthStore();
    const User = authStore.GetUser();

    // Computed property to get end date
    const endDate = computed(() => {
      return new Date(authStore.companyDetails.trial_subscription_end);
    });

    // Computed property to calculate days left
    const daysLeft = computed(() => {
      if (!endDate.value) return 0;
      const today = new Date();
      const timeDifference = endDate.value.getTime() - today.getTime();
      return Math.ceil(timeDifference / (1000 * 3600 * 24));
    });

    // Computed property to check if it is a trial
    const isTrial = computed(() => authStore.companyDetails.is_trial);

    return {
      getAssetPath,
      User,
      daysLeft,
      isTrial,
    };
  },
});
</script>