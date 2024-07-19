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

    <!-- 

    <div class="col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10">
      <Widget1
        className="h-md-50 mb-5 mb-xl-10"
        description="Active Projects"
        bgColor="#F1416C"
        :bgImage="getAssetPath('media/patterns/vector-1.png')"
      />

      <Widget2
        className="h-md-50 mb-5 mb-xl-10"
        :icon="false"
        stats="357"
        description="Professionals"
        labelColor="dark"
        textColor="gray-300"
      />
    </div>

    <div class="col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10">
      <Widget3 className="h-md-50 mb-5 mb-xl-10" :chartSize="70" />

      <Widget4 className="h-lg-50" />
    </div>

    <div class="col-xxl-6">
      <Widget5 className="h-md-100" />
    </div>
  </div>

  <div class="row gx-5 gx-xl-10">
    <div class="col-xxl-6 mb-5 mb-xl-10">
      <Widget6 className="h-xl-100" height="275px" />
    </div>

    <div class="col-xl-6 mb-5 mb-xl-10">
      <Widget7 className="h-xl-100" />
    </div>
  </div>

  <div class="row g-5 g-xl-10 mb-5 mb-xl-10">
    <div class="col-xxl-6">
      <Widget8
        className="h-xl-100"
        :image="getAssetPath('media/stock/600x600/img-65.jpg')"
      />
    </div>

    <div class="col-xl-6">
      <Widget9 className="h-lg-100" :height="300" />
    </div>
  </div>

  <div class="row g-5 g-xl-10 mb-5 mb-xl-10">
    <div class="col-xl-4">
      <MixedWidget5
        widget-classes="card-xl-stretch mb-xl-8 h-md-100"
        chart-color="primary"
        chart-height="150"
      ></MixedWidget5>
    </div>

    <div class="col-xl-8">
      <Widget10 className="h-md-100" />
    </div>
  --></div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref, watch, computed } from "vue";
import { useAuthStore } from "@/stores/auth";

// import Widget1 from "@/components/dashboard-default-widgets/Widget1.vue";
// import Widget2 from "@/components/dashboard-default-widgets/Widget2.vue";
// import Widget3 from "@/components/dashboard-default-widgets/Widget3.vue";
// import Widget4 from "@/components/dashboard-default-widgets/Widget4.vue";
// import Widget5 from "@/components/dashboard-default-widgets/Widget5.vue";
// import Widget6 from "@/components/dashboard-default-widgets/Widget6.vue";
// import Widget7 from "@/components/dashboard-default-widgets/Widget7.vue";
// import Widget8 from "@/components/dashboard-default-widgets/Widget8.vue";
// import Widget9 from "@/components/dashboard-default-widgets/Widget9.vue";
// import Widget10 from "@/components/dashboard-default-widgets/Widget10.vue";
// import Widget12 from "@/components/dashboard-default-widgets/Widget12.vue";
// import Widget13 from "@/components/dashboard-default-widgets/Widget13.vue";
// import Widget14 from "@/components/dashboard-default-widgets/Widget14.vue";
// import MixedWidget5 from "@/components/widgets/mixed/Widget5.vue";

interface Instrument {
  id: string;
  instrument_id: string;
  name: string;
  calibration_due_date: string;
}

export default defineComponent({
  name: "main-dashboard",
  components: {
    // Widget9,
    // Widget12,
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