<template>
  <section class="h-100 m-lg-6 m-md-3 m-sm-1">
    <div class="row g-5 h-100">
      <div class="col-lg-4">
        <div class="card card-stretch shadow mb-5">
          <div class="card-header">
            <h3 class="card-title">Height 100%</h3>
          </div>
          <div class="card-body">Lorem Ipsum is simply dummy text</div>
          <div class="card-footer">Footer</div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="card card-stretch-50 shadow mb-5">
          <div class="card-header">
            <h3 class="card-title">Height 50%</h3>
          </div>
          <div class="card-body">Lorem Ipsum is simply dummy text</div>
          <div class="card-footer">Footer</div>
        </div>

        <div class="card card-stretch-50 shadow mb-5">
          <div class="card-header">
            <h3 class="card-title">Height 50%</h3>
          </div>
          <div class="card-body">Lorem Ipsum is simply dummy text</div>
          <div class="card-footer">Footer</div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="card card-stretch-50 shadow mb-5">
          <div class="card-header">
            <h3 class="card-title">Height 50%</h3>
          </div>
          <div class="card-body">Lorem Ipsum is simply dummy text</div>
          <div class="card-footer">Footer</div>
        </div>

        <div class="card card-stretch-50 shadow mb-5">
          <div class="card-header">
            <h3 class="card-title">Height 50%</h3>
          </div>
          <div class="card-body">Lorem Ipsum is simply dummy text</div>
          <div class="card-footer">Footer</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// basic imports
import { getAssetPath, getIllustrationsPath } from "@/core/helpers/assets";
import { defineComponent, onMounted } from "vue";
// OR if using custom default options

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Plans",
  components: {},
  setup() {
    onMounted(() => {
      console.log("onMounted");
    });
    return {
      getAssetPath,
      getIllustrationsPath,
    };
  },
});
</script>
