<!-- eslint-disable prettier/prettier -->
<template>
  <!--begin::Authentication Layout -->
  <div class="d-flex flex-column flex-lg-row flex-column-fluid">
    <!--begin::Body-->
    <div
      class="d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1"
    >
      <!--begin::Form-->
      <div class="d-flex flex-center flex-column flex-lg-row-fluid">
        <!--begin::Wrapper-->
        <div class="w-lg-500px p-6">
          <router-view></router-view>
        </div>
        <!--end::Wrapper-->
      </div>
      <!--end::Form-->

      <!--begin::Footer-->
      <div class="d-flex flex-center flex-wrap px-6">
        <!--begin::Links-->
        <div class="d-flex fw-semibold text-primary fs-base">
          <a href="https://zeptac.com/contact/" target="_blank">
            <p class="px-5">Contact Us</p>
          </a>
        </div>
        <!--end::Links-->
      </div>
      <!--end::Footer-->
    </div>
    <!--end::Body-->

    <!--begin::Aside-->
    <div
      class="d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center order-1 order-lg-2"
      :style="`background-image: url('${getAssetPath(
        'media/misc/zeptac-auth-bg.jpg'
      )}')`"
    >
      <!--begin::Content-->
      <div
        class="d-flex flex-column flex-center py-7 py-lg-15 px-5 px-md-15 w-100"
      >
        <!--begin::Logo-->
        <router-link to="/" class="mb-0 mb-lg-20">
          <img
            alt="Logo"
            :src="getAssetPath('media/logos/zeptac_white_horizontal.png')"
            class="h-30px h-lg-60px"
          />
        </router-link>
        <!--end::Logo-->

        <!--begin::Image-->
        <img
          class="d-none d-lg-block mx-auto w-275px w-md-50 w-xl-500px mt-10 mb-10 mb-lg-10"
          :src="getAssetPath('media/illustrations/sigma-1/home_1.png')"
          alt="bg"
        />
        <!--end::Image-->

        <!--begin::Title-->
        <h1
          class="d-none d-lg-block text-white fs-3x fw-bolder text-center mb-7"
        >
          Transforming the Future of<br /> TIC Industry
        </h1>
        <!--end::Title-->

        <!--begin::Text-->
        <div class="d-none d-lg-block text-white fs-3 text-center">
          A Scalable, Cloud-Based Software Solution for Testing, Inspection, Calibration & Certification Industry.
        </div>
        <!--end::Text-->
      </div>
      <!--end::Content-->
    </div>
    <!--end::Aside-->
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
