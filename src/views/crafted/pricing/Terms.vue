<template>
  <section class="m-lg-4 m-md-3 m-sm-1">
    <div class="m-4">
      <!--begin::Accordion-->
      <div class="accordion" id="kt_accordion_1">
        <div class="accordion-item">
          <h2 class="accordion-header" id="kt_accordion_1_header_1">
            <button
              class="accordion-button fs-4 fw-bold"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#kt_accordion_1_body_1"
              aria-expanded="true"
              aria-controls="kt_accordion_1_body_1"
            >
              Accordion Item #1
            </button>
          </h2>
          <div
            id="kt_accordion_1_body_1"
            class="accordion-collapse collapse show"
            aria-labelledby="kt_accordion_1_header_1"
            data-bs-parent="#kt_accordion_1"
          >
            <div class="accordion-body">
              lorem ipsum dolor sit amet, consectetur adip
            </div>
          </div>
        </div>

        <div class="accordion-item">
          <h2 class="accordion-header" id="kt_accordion_1_header_2">
            <button
              class="accordion-button fs-4 fw-bold collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#kt_accordion_1_body_2"
              aria-expanded="false"
              aria-controls="kt_accordion_1_body_2"
            >
              Accordion Item #2
            </button>
          </h2>
          <div
            id="kt_accordion_1_body_2"
            class="accordion-collapse collapse"
            aria-labelledby="kt_accordion_1_header_2"
            data-bs-parent="#kt_accordion_1"
          >
            <div class="accordion-body">...</div>
          </div>
        </div>

        <div class="accordion-item">
          <h2 class="accordion-header" id="kt_accordion_1_header_3">
            <button
              class="accordion-button fs-4 fw-bold collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#kt_accordion_1_body_3"
              aria-expanded="false"
              aria-controls="kt_accordion_1_body_3"
            >
              Accordion Item #3
            </button>
          </h2>
          <div
            id="kt_accordion_1_body_3"
            class="accordion-collapse collapse"
            aria-labelledby="kt_accordion_1_header_3"
            data-bs-parent="#kt_accordion_1"
          >
            <div class="accordion-body">...</div>
          </div>
        </div>
      </div>
      <!--end::Accordion-->
    </div>
    <div class="separator my-10"></div>
    <div class="row g-5 m-3">
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
            <h3 class="card-title">Height 100%</h3>
          </div>
          <div class="card-body">Lorem Ipsum is simply dummy text</div>
          <div class="card-footer">Footer</div>
        </div>

        <div class="card card-stretch-50 shadow mb-5">
          <div class="card-header">
            <h3 class="card-title">Height 100%</h3>
          </div>
          <div class="card-body">Lorem Ipsum is simply dummy text</div>
          <div class="card-footer">Footer</div>
        </div>
      </div>

      <div class="col-lg-4">
        <div class="card card-stretch-33 shadow mb-5">
          <div class="card-header">
            <h3 class="card-title">Height 33.333%</h3>
          </div>
          <div class="card-body">Lorem Ipsum is simply dummy text</div>
          <div class="card-footer">Footer</div>
        </div>

        <div class="card card-stretch-33 shadow mb-5">
          <div class="card-header">
            <h3 class="card-title">Height 33.333%</h3>
          </div>
          <div class="card-body">Lorem Ipsum is simply dummy text</div>
          <div class="card-footer">Footer</div>
        </div>

        <div class="card card-stretch-33 shadow mb-5">
          <div class="card-header">
            <h3 class="card-title">Height 33.333%</h3>
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
// if using default options

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Terms",
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
