<template>
  <!--begin::Form-->
  <form id="kt_forms_widget_1_form" class="ql-quil ql-quil-plain pb-3">
    <!--begin::Editor-->
    <div id="kt_forms_widget_1_editor" class="p-6"></div>
    <!--end::Editor-->

    <div class="separator"></div>

    <!--begin::Toolbar-->
    <div
      id="kt_forms_widget_1_editor_toolbar"
      class="ql-toolbar d-flex flex-stack py-2"
    >
      <div class="me-2">
        <span class="ql-formats ql-size ms-0">
          <select class="ql-size w-75px"></select>
        </span>

        <span class="ql-formats">
          <button class="ql-bold"></button>
          <button class="ql-italic"></button>
          <button class="ql-underline"></button>
          <button class="ql-strike"></button>
          <button class="ql-image"></button>
          <button class="ql-link"></button>
          <button class="ql-clean"></button>
        </span>
      </div>

      <div class="me-n3">
        <span class="btn btn-icon btn-sm btn-active-color-primary">
          <i class="flaticon2-clip-symbol icon-ms"></i>
        </span>

        <span class="btn btn-icon btn-sm btn-active-color-primary">
          <i class="flaticon2-pin icon-ms"></i>
        </span>
      </div>
    </div>
    <!--end::Toolbar-->

    <div>
      <!-- Display editor content for debugging -->
      <p>Editor Content:</p>
      <pre class="text-wrap">{{ editorContent }}</pre>
    </div>
  </form>
  <!--end::Form-->
</template>
  
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import Quill from "quill";

export default defineComponent({
  name: "quill-practice",
  setup() {
    const editorContent = ref(""); // This will hold the content of the editor

    onMounted(() => {
      const editorId = "kt_forms_widget_1_editor";

      // Initialize the Quill editor
      const options = {
        modules: {
          toolbar: {
            container: "#kt_forms_widget_1_editor_toolbar", // Linking the toolbar
          },
        },
        theme: "snow", // Theme for the editor
      };

      const quillInstance = new Quill("#" + editorId, options);

      // Capture changes to the editor and update the editor content
      quillInstance.on("text-change", () => {
        // Get the content of the editor as HTML
        editorContent.value = quillInstance.root.innerHTML;

        // Console log the updated content
        console.log(editorContent.value);
      });
    });

    return {
      editorContent, // Bind the content to a ref
    };
  },
});
</script>
  
  <style scoped>
/* Quill editor styling */
.quill-editor {
  min-height: 150px;
  border: 1px solid #ccc;
}
</style>
  