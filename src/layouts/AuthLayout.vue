<template>
  <!--begin::Authentication Layout -->
  <div class="d-flex flex-column flex-lg-row flex-column-fluid min-vh-100">
    <!--begin::Aside - Background and branding -->
    <div
      class="d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center order-1 order-lg-2 position-relative"
      :style="`background-image: url('${getAssetPath('media/misc/zeptac-auth-bg.jpg')}')`"
    >
      <!-- Semi-transparent overlay -->
      <div class="position-absolute w-100 h-100 bg-dark opacity-25"></div>
      
      <!--begin::Content-->
      <div
        class="d-flex flex-column flex-center py-7 py-lg-10 px-5 px-md-10 w-100 position-relative"
      >
        <!--begin::Logo - Responsive sizing -->
        <router-link to="/" class="mb-0 mb-lg-10">
          <img
            alt="Logo"
            :src="getAssetPath('media/logos/zeptac_white_horizontal.png')"
            class="h-30px h-lg-40px"
          />
        </router-link>

        <!--begin::Image - Hidden on mobile -->
        <img
          class="mx-auto w-275px w-lg-300px w-xl-350px mt-5 mb-5 d-none d-md-block"
          :src="getAssetPath('media/illustrations/sigma-1/home_1.png')"
          alt="Authentication illustration"
        />

        <!--begin::Title & Text-->
        <div class="text-center d-none d-md-block">
          <h1 class="text-white fs-2x fw-bolder mb-5">
            <span class="d-block">Transforming the Future of</span>
            <span class="d-block">TIC Industry</span>
          </h1>
          
          <div class="text-white fs-1x fw-semibold opacity-75">
            A Scalable, Cloud-Based Software Solution for Testing,<br>
            Inspection, Calibration & Certification Industry.
          </div>
        </div>
        <!--end::Title & Text-->
      </div>
      <!--end::Content-->
    </div>
    <!--end::Aside-->

    <!--begin::Body-->
    <div
      class="d-flex flex-column flex-lg-row-fluid w-lg-50 p-5 p-lg-10 order-2 order-lg-1 bg-body"
    >
      <!-- Mobile-only logo -->
      <div class="d-flex justify-content-center mb-5 mb-lg-10 d-lg-none">
        <router-link to="/">
        </router-link>
      </div>

      <!--begin::Form Container-->
      <div class="d-flex flex-center flex-column flex-lg-row-fluid">
        <!--begin::Form Wrapper-->
        <div class="w-100 w-md-450px w-lg-500px p-10 shadow-sm rounded">
          <router-view></router-view>
        </div>
        <!--end::Form Wrapper-->
      </div>
      <!--end::Form Container-->

      <!--begin::Footer-->
      <div class="d-flex flex-center flex-wrap px-6 mt-auto mt-lg-10">
        <!--begin::Links-->
        <div class="d-flex fw-semibold text-gray-600 fs-base">
          <a
            href="https://zeptac.com/contact/"
            target="_blank"
            class="px-3 px-lg-5 text-hover-primary"
          >
            Contact Us
          </a>
        </div>
        <!--end::Links-->
      </div>
      <!--end::Footer-->
    </div>
    <!--end::Body-->
  </div>
  <!--end::Authentication Layout -->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted } from "vue";
import LayoutService from "@/core/services/LayoutService";
import { useBodyStore } from "@/stores/body";

export default defineComponent({
  name: "auth-layout",
  components: {},
  setup() {
    const store = useBodyStore();

    onMounted(() => {
      LayoutService.emptyElementClassesAndAttributes(document.body);
      store.addBodyClassname("app-blank");
      store.addBodyClassname("bg-body");
    });

    return {
      getAssetPath,
    };
  },
});
</script>