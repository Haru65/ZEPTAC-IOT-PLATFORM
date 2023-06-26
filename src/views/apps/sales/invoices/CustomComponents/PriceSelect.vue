<template>
  <el-select
    v-model="selected"
    filterable
    @change="$emit('update:select', select)"
  >
    <el-option value="0" label="Please Select Item..." key="0"
      >Please Select Item...</el-option
    >
    <el-option
      v-for="ele in item"
      :key="ele.id"
      :label="ele.name"
      :value="ele.name"
    />
  </el-select>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  props: ["item", "select"],
  setup() {
    const selected = ref("");
    return {
      selected,
    };
  },
};
</script>

