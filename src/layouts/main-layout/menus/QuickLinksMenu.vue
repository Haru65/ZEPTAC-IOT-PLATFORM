<template>
  <!--begin::Menu-->
  <div
    class="menu menu-sub menu-sub-dropdown menu-column w-250px w-lg-300px"
    data-kt-menu="true"
  >
    <!--begin::Heading-->
    <div
      class="d-flex flex-column flex-center bgi-no-repeat rounded-top px-9 py-10"
      :style="{
        backgroundImage: `url(${getAssetPath(
          'media/misc/menu-header-bg.jpg'
        )})`,
      }"
    >
      <!--begin::Title-->
      <h3 class="text-white fw-semobold mb-3">Quick Links</h3>
      <!--end::Title-->
    </div>
    <!--end::Heading-->

    <!--begin:Nav-->
    <div class="row g-0" v-if="Identifier == 'Company-Admin' || Identifier == 'Admin'">
      <!--begin:Item-->
      <div class="col-6">
        <router-link
          to="/devices"
          class="d-flex flex-column flex-center h-100 p-4 bg-hover-light border-end border-bottom"
        >
          <KTIcon icon-name="router" icon-class="fs-2x text-success mb-2" />
          <span class="fs-5 fw-semobold text-gray-800 mb-0">Devices</span>
          <span class="fs-7 text-primary-400 text-wrap">Lorem Text</span>
        </router-link>
      </div>
      <!--end:Item-->

      <!--begin:Item-->
      <div class="col-6">
        <router-link
          to="/reports"
          class="d-flex flex-column flex-center h-100 p-4 bg-hover-light border-bottom"
        >
          <KTIcon icon-name="chart" icon-class="fs-2x text-success mb-2" />
          <span class="fs-5 fw-semobold text-gray-800 mb-0">Reports</span>
          <span class="fs-7 text-primary-400 text-wrap">Lorem Text</span>
        </router-link>
      </div>
      <!--end:Item-->

      <!--begin:Item-->
      <div class="col-6">
        <router-link
          to="/alarms"
          class="d-flex flex-column flex-center h-100 p-4 bg-hover-light border-end border-bottom "
        >
          <KTIcon icon-name="timer" icon-class="fs-2x text-success mb-2" />
          <span class="fs-5 fw-semobold text-gray-800 mb-0">Alarm</span>
          <span class="fs-7 text-primary-400 text-wrap">Lorem Text</span>
        </router-link>
      </div>
      <!--end:Item-->

      <!--begin:Item-->
      <div class="col-6">
        <router-link
          to="/locations"
          class="d-flex flex-column flex-center h-100 p-4 bg-hover-light border-bottom"
        >
          <KTIcon
            icon-name="route"
            icon-class="fs-2x text-success mb-2"
          />
          <span class="fs-5 fw-semobold text-gray-800 mb-0">Location</span>
          <span class="fs-7 text-primary-400 text-wrap">Lorem Text</span>
        </router-link>
      </div>
      <!--end:Item-->
    </div>
    <!--end:Nav-->
  </div>
  <!--end::Menu-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent } from "vue";

import { Identifier } from "@/core/config/WhichUserConfig";

export default defineComponent({
  name: "kt-quick-links-menu",
  components: {},
  setup() {
    return {
      getAssetPath,
      Identifier,
    };
  },
});
</script>
