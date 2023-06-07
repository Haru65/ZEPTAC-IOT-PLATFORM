<template>
  <div>
    <Widget1 className="h-md-100" description="Active Projects" bgColor="#F1416C"
      :bgImage="getAssetPath('media/patterns/vector-1.png')" />
  </div>
  <br>
  <div>
    <Widget10 className="h-md-100" />
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent } from "vue";
import Widget10 from "@/components/dashboard-default-widgets/Widget10.vue";
import Widget1 from "@/components/dashboard-default-widgets/Widget1.vue"

export default defineComponent({
  name: "main-dashboard",
  components: {
    Widget1,
    Widget10
  },
  setup() {
    return {
      getAssetPath,
    };
  },
});
</script>
