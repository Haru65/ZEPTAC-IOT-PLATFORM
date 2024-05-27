<template>
  <!--begin: Statistics Widget 6-->
  <div :class="[widgetClasses, `bg-light-${color}`]" class="card">
    <!--begin::Body-->
    <div class="card-body my-3">
      <span
        :class="`text-${color}`"
        class="card-title fw-bold fs-5 mb-3 d-block"
      >
        {{ title }}
      </span>

      <div class="py-1">
        <span class="text-dark fs-1 fw-bold me-2">{{ progress }} %</span>
      </div>

      <input
        type="range"
        class="form-range"
        min="0"
        max="100"
        v-model="sliderValue"
        @input="updateProgress(id, $event)"
      />

    </div>
    <!--end:: Body-->
  </div>
  <!--end: Statistics Widget 6-->
</template>
  
  <script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  props: {
    id: Number,
    widgetClasses: String,
    color: String,
    progress: String, // Ensure progress is type-checked as a string
    title: String,
  },
  setup(props, { emit }) {

    const sliderValue = ref(parseInt(props.progress || "0")); // Initialize slider value with progress

    watch(
        () => props.progress,
        (newValue) => {
          sliderValue.value = parseInt(newValue || "0");
        }
    );

    const updateProgress = async (id, event) => {
      if (event.target != null) {
        await emit("setProgress", id, event.target.value);
      }
    };

    return {
      sliderValue,
      updateProgress,
    };
  },
});
</script>
  