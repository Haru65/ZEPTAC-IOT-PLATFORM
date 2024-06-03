
<template>
  <div style="width: 99%" class="bg-body p-12 rounded">
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered">
      <!--begin::Modal content-->
      <div class="modal-content">
        <div class="card-body p-9">
          <!--begin::Alert-->
          <div
            class="notice d-flex bg-light-warning rounded border-warning border border-dashed p-6"
          >
            <!--begin::Icon-->
            <KTIcon
              icon-name="information-5"
              icon-class="fs-3tx text-warning me-4"
            />
            <!--end::Icon-->
            <div class="d-flex flex-stack flex-grow-1">
              <!--begin::Content-->
              <div class="fw-semobold">
                <h4 class="text-gray-800 fw-bold">Dear User,</h4>
                <div class="fs-4 text-gray-600">
                  Your {{ isTrial ? "trial" : "subscription" }} will expire on
                  {{ moment(endDate).format("DD-MM-YYYY") }}
                </div>
                <div class="fs-4 text-gray-600">
                  To avoid any service interuption, kindly contact us.
                </div>
                <div class="fs-4 text-gray-600">
                  Email :
                  <a
                    v-bind:href="'mailto:' + `support@zeptac.com`"
                    class="text-gray-600 text-hover-primary mb-1"
                  >
                    support@zeptac.com
                  </a>
                </div>
              </div>
              <!--end::Content-->
            </div>
          </div>
          <!--end::Alert-->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import moment from "moment";
import { useAuthStore } from "@/stores/auth";

export default defineComponent({
  name: "company-subscription",
  components: {},
  setup() {
    const authStore = useAuthStore();
    const User = authStore.GetUser();

    const endDate = computed(() => {
      return new Date(authStore.companyDetails.trial_subscription_end);
    });

    const daysLeft = computed(() => {
      if (!endDate.value) return 0;
      const today = new Date();
      const timeDifference = endDate.value.getTime() - today.getTime();
      return Math.ceil(timeDifference / (1000 * 3600 * 24));
    });

    const isTrial = computed(() => authStore.companyDetails.is_trial);

    return {
      User,
      daysLeft,
      endDate,
      isTrial,
      moment,
    };
  },
});
</script>