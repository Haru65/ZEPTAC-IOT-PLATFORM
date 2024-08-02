<template>
  <!--begin::Menu-->
  <div
    class="menu menu-sub menu-sub-dropdown menu-column w-250px w-lg-325px"
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
    <div class="row g-0" v-if="Identifier == 'Company-Admin' || Identifier == 'Admin' || Identifier == 'Sales-Person'">
      <!--begin:Item-->
      <div class="col-6">
        <router-link
          to="/leads/add"
          class="d-flex flex-column flex-center h-100 p-6 bg-hover-light border-end border-bottom"
        >
          <KTIcon icon-name="user-tick" icon-class="fs-3x text-success mb-2" />
          <span class="fs-5 fw-semobold text-gray-800 mb-0">Lead</span>
          <span class="fs-7 text-primary-400">generate lead</span>
        </router-link>
      </div>
      <!--end:Item-->

      <!--begin:Item-->
      <div class="col-6">
        <router-link
          to="/quotations/add"
          class="d-flex flex-column flex-center h-100 p-6 bg-hover-light border-bottom"
        >
          <KTIcon icon-name="note-2" icon-class="fs-3x text-success mb-2" />
          <span class="fs-5 fw-semobold text-gray-800 mb-0">Quotation</span>
          <span class="fs-7 text-primary-400">make a quotation</span>
        </router-link>
      </div>
      <!--end:Item-->

      <!--begin:Item-->
      <div class="col-6">
        <router-link
          to="/clients/add"
          class="d-flex flex-column flex-center h-100 p-6 bg-hover-light border-end"
        >
          <KTIcon icon-name="profile-user" icon-class="fs-3x text-success mb-2" />
          <span class="fs-5 fw-semobold text-gray-800 mb-0">Client</span>
          <span class="fs-7 text-primary-400">add new client</span>
        </router-link>
      </div>
      <!--end:Item-->

      <!--begin:Item-->
      <div class="col-6">
        <router-link
          to="/pricelist/add"
          class="d-flex flex-column flex-center h-100 p-6 bg-hover-light"
        >
          <KTIcon
            icon-name="notification-status"
            icon-class="fs-3x text-success mb-2"
          />
          <span class="fs-5 fw-semobold text-gray-800 mb-0">PriceList</span>
          <span class="fs-7 text-primary-400">create pricelist</span>
        </router-link>
      </div>
      <!--end:Item-->
    </div>
    <!--end:Nav-->
    <!--begin:Nav-->
    <div class="row g-0" v-if="Identifier == 'Company-Admin' || Identifier == 'Admin' || Identifier == 'Site-Incharge' || Identifier == 'Service-Engineer'">
      <!--begin:Item-->
      <div class="col-6">
        <router-link
          to="/returnablegatepasses/add"
          class="d-flex flex-column flex-center h-100 p-6 bg-hover-light border-end border-bottom"
        >
          <KTIcon icon-name="data" icon-class="fs-3x text-success mb-2" />
          <span class="fs-5 fw-semobold text-gray-800 mb-0">RGP</span>
          <span class="fs-7 text-primary-400">generate gatepass</span>
        </router-link>
      </div>
      <!--end:Item-->

      <!--begin:Item-->
      <div class="col-6">
        <router-link
          to="/dailyworksheets/add"
          class="d-flex flex-column flex-center h-100 p-6 bg-hover-light border-bottom"
        >
          <KTIcon icon-name="tablet-text-up" icon-class="fs-3x text-success mb-2" />
          <span class="fs-5 fw-semobold text-gray-800 mb-0">Worksheet</span>
          <span class="fs-7 text-primary-400">fill daily worksheet</span>
        </router-link>
      </div>
      <!--end:Item-->

      <!--begin:Item-->
      <div class="col-6">
        <router-link
          to="/expensesheets/add"
          class="d-flex flex-column flex-center h-100 p-6 bg-hover-light border-end"
        >
          <KTIcon icon-name="tag" icon-class="fs-3x text-success mb-2" />
          <span class="fs-5 fw-semobold text-gray-800 mb-0">Expense Sheet</span>
          <span class="fs-7 text-primary-400">make expense sheet</span>
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
