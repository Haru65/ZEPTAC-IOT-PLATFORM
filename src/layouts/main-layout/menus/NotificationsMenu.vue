<template>
  <!--begin::Menu-->
  <div
    class="menu menu-sub menu-sub-dropdown menu-column w-350px w-lg-375px"
    data-kt-menu="true"
  >
    <!--begin::Heading-->
    <div
      class="d-flex flex-column bgi-no-repeat rounded-top"
      :style="`background-image: url('${getAssetPath(
        'media/misc/menu-header-bg.jpg'
      )}')`"
    >
      <!--begin::Title-->
      <h3 class="text-white fw-semobold px-9 mt-10 mb-6">Notifications</h3>
      <!--end::Title-->

      <!--begin::Tabs-->
      <ul
        class="nav nav-line-tabs nav-line-tabs-2x nav-stretch fw-semobold px-9 d-flex justify-content-between"
      >
        <li class="nav-item">
          <a
            class="nav-link text-white opacity-75 opacity-state-100 pb-4"
            data-bs-toggle="tab"
            href="#kt_topbar_notifications_1"
            >Calibration
            <span class="ms-3 badge badge-primary fs-8">{{
              $props.calibrationNotificationCount
            }}</span></a
          >
        </li>

        <li class="nav-item">
          <a
            class="nav-link text-white opacity-75 opacity-state-100 pb-4 active"
            data-bs-toggle="tab"
            href="#kt_topbar_notifications_2"
            >Maintenance
            <span class="ms-3 badge badge-primary fs-8">{{
              $props.maintenanaceNotificationCount
            }}</span></a
          >
        </li>
      </ul>
      <!--end::Tabs-->
    </div>
    <!--end::Heading-->

    <!--begin::Tab content-->
    <div class="tab-content">
      <!--begin::Tab panel-->
      <div class="tab-pane fade" id="kt_topbar_notifications_1" role="tabpanel">
        <!--begin::Items-->
        <div class="scroll-y mh-325px my-5 px-8">
          <template v-for="(item, index) in $props.dueCalibration" :key="index">
            <!--begin::Item-->
            <div class="d-flex flex-stack py-4">
              <!--begin::Section-->
              <div class="d-flex align-items-center">
                <!--begin::Title-->
                <div class="mb-0 me-2">
                  <router-link :to="`/instruments/edit/${item.id}`">
                    <span
                      class="fs-6 text-gray-800 text-hover-primary fw-bold"
                      >{{ item.instrument_id }}</span
                    >
                    <div class="text-gray-400 fs-7">
                      {{ item.name }}
                    </div>
                  </router-link>
                </div>
                <!--end::Title-->
              </div>
              <!--end::Section-->

              <!--begin::Label-->
              <span class="badge badge-light fs-8">{{
                item.calibration_due_date
              }}</span>
              <!--end::Label-->
            </div>
            <!--end::Item-->
          </template>

          <div
            class="p-4 text-gray-700 fw-semobold fs-6"
            v-if="$props.calibrationNotificationCount === 0"
          >
            Calibration for all instruments is up-to-date. Currently, there are
            no pending calibration.
          </div>
        </div>
        <!--end::Items-->
      </div>
      <!--end::Tab panel-->

      <!--begin::Tab panel-->
      <div
        class="tab-pane fade show active"
        id="kt_topbar_notifications_2"
        role="tabpanel"
      >
        <div class="scroll-y mh-325px my-5 px-8">
          <template v-for="(item, index) in $props.dueMaintenance" :key="index">
            <!--begin::Item-->
            <div class="d-flex flex-stack py-4">
              <!--begin::Section-->
              <div class="d-flex align-items-center">
                <!--begin::Title-->
                <div class="mb-0 me-2">
                  <router-link :to="`/instruments/edit/${item.id}`">
                    <span
                      class="fs-6 text-gray-800 text-hover-primary fw-bold"
                      >{{ item.instrument_id }}</span
                    >
                    <div class="text-gray-400 fs-7">
                      {{ item.name }}
                    </div>
                  </router-link>
                </div>
                <!--end::Title-->
              </div>
              <!--end::Section-->

              <!--begin::Label-->
              <span class="badge badge-light-danger fs-8">{{
                item.m_date2
              }}</span>
              <!--end::Label-->
            </div>
            <!--end::Item-->
          </template>

          <div
            class="p-4 text-gray-700 fw-semobold fs-6"
            v-if="$props.maintenanaceNotificationCount === 0"
          >
            All instruments are currently functioning well. No maintenance is currently required.
          </div>

        </div>
        <!--end::Items-->
      </div>
      <!--end::Tab panel-->
    </div>
    <!--end::Tab content-->
  </div>
  <!--end::Menu-->
</template>

<script lang="ts">
import { getAssetPath, getIllustrationsPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/auth";

interface Instrument {
  id: string;
  instrument_id: string;
  name: string;
  calibration_due_date: string;
}

interface MaintenanceInstrument {
  id: string;
  instrument_id: string;
  name: string;
  m_date2: string;
}

export default defineComponent({
  name: "notifications-menu",
  components: {},
  props: [
    "dueCalibration",
    "dueMaintenance",
    "TotalNotification",
    "calibrationNotificationCount",
    "maintenanaceNotificationCount",
  ],
  setup(props) {
    const auth = useAuthStore();
    const User = auth.GetUser();

    return {
      getIllustrationsPath,
      getAssetPath,
      dueCalibration: props.dueCalibration,
      dueMaintenance: props.dueMaintenance,
      maintenanaceNotificationCount: props.maintenanaceNotificationCount,
      calibrationNotificationCount: props.calibrationNotificationCount,
      TotalNotification: props.TotalNotification,
    };
  },
});
</script>
