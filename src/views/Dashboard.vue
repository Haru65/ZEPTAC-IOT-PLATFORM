<template>
  
    <div >
      <Widget10 className="h-md-100 " />
    </div>

</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent } from "vue";
import Widget10 from "@/components/dashboard-default-widgets/Widget10.vue";

export default defineComponent({
  name: "main-dashboard",
  components: {
    Widget10
  },
  setup() {
    return {
      getAssetPath,
    };
  },
});
</script>
