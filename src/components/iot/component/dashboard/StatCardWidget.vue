<template>
  <span
    :class="[
      widgetClasses,
      `bg-${color}`,
      'shadow-lg',
      'card',
      'rounded',
      'hoverable',
    ]"
  >
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <div class="fw-bold fs-4 text-gray-800">
          {{ heading }}
        </div>
        <i :class="`bi bi-${iconName} text-${iconColor} fs-2`"></i>
      </div>

      <div class="d-flex align-items-center mt-2 mb-2">
        <div class="text-gray-800 fw-semibold fs-2 me-3">
          {{ title }}
        </div>
        <div v-if="changeValue !== undefined">
          <span
            :class="isPositive ? 'text-success' : 'text-danger'"
            class="fw-bold d-flex align-items-center"
          >
            <i
              :class="isPositive ? 'bi bi-arrow-up' : 'bi bi-arrow-down'"
              class="me-1"
            ></i>
            {{ isPositive ? "+" : "-" }}{{ Math.abs(changeValue) }}%
          </span>
        </div>
      </div>

      <div class="text-gray-800 fs-7">
        {{ description }}
      </div>
    </div>
  </span>
</template>


<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent } from "vue";

export default defineComponent({
  name: "StatCardWidget",
  props: {
    widgetClasses: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "light",
    },
    iconColor: {
      type: String,
      default: "primary",
    },
    iconName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    changeValue: {
      type: Number,
      default: undefined,
    },
    isPositive: {
      type: Boolean,
      default: true,
    },
    heading: {
      type: String,
      required: true,
    },
  },
  setup() {
    return {
      getAssetPath,
    };
  },
});
</script>
