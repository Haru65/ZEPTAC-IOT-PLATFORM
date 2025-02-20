<template>
  <!--begin::Footer-->
  <div
    class="app-sidebar-menu flex-column-auto pt-2 pb-2 px-2 border-top"
    id="kt_app_sidebar_footer"
  >
    <div class="menu menu-column menu-rounded menu-sub-indention px-3">
      <div class="menu-item">
        <div class="menu-content">
          <h4 class="menu-heading fw-bold fs-3">Powered by Zeptac</h4>
        </div>
      </div>
    </div>
  </div>
  <!--end::Footer-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent } from "vue";

export default defineComponent({
  name: "sidebar-footer",
  components: {},
  setup() {
    return {
      getAssetPath,
    };
  },
});
</script>
