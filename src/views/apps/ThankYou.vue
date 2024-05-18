<template>
  <!--begin::Wrapper-->
  <div class="h-100 d-flex justify-content-center align-items-center">
    <div class="w-lg-500px p-10">
      <!--begin::Heading-->
      <div class="text-center mb-10">
        <!--begin::Title-->
        <h1 class="text-white mb-3" style="font-size: 4.3rem">Thank You! :)</h1>
        <!--end::Title-->
      </div>
      <!--end::Heading-->
    </div>
  </div>
  <!--end::Wrapper-->
</template>
  
  <script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref, onMounted } from "vue";
import { useBodyStore } from "@/stores/body";
import LayoutService from "@/core/services/LayoutService";

export default defineComponent({
  name: "thankyou",
  components: {
  },
  setup() {
    const bodyStore = useBodyStore();

    const bgImage = getAssetPath("media/patterns/layered-waves-haikei.svg");

    onMounted(() => {
      LayoutService.emptyElementClassesAndAttributes(document.body);

      bodyStore.addBodyClassname("bg-body");
      bodyStore.addBodyAttribute({
        qualifiedName: "style",
        value: `background-image: url("${bgImage}");background-repeat:no-repeat;background-size:cover`,
      });
    });

    return {
      getAssetPath,
    };
  },
});
</script>
  