<template>
  <div class="w-100">
    <!-- Uploaded Files Header -->
    <div class="d-flex justify-content-between align-items-center mb-6">
      <h4 class="fw-bold text-gray-800">Uploaded Files</h4>
    </div>

    <!-- Files Grid -->
    <div class="row g-6">
      <div
        class="col-md-6 col-12"
        v-for="(fileItem, index) in $props.filesData"
        :key="index"
      >
        <div class="border rounded overflow-hidden shadow-sm h-100">
          <!-- File Data Table -->
          <div class="table-responsive" style="max-height: 300px">
            <table class="table table-hover table-sm mb-0">
              <thead class="bg-light">
                <tr class="fw-semibold fs-7 text-gray-600">
                  <th class="ps-4">ID</th>
                  <th>Temperature</th>
                  <th class="pe-4">Humidity</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="r in fileItem.data" :key="r.id">
                  <td class="ps-4">{{ r.id }}</td>
                  <td>{{ r.temp }}</td>
                  <td class="pe-4">{{ r.rh }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- File Info Footer -->
          <div
            class="d-flex justify-content-between align-items-center p-3 border-top bg-light"
          >
            <div>
              <span class="d-block fw-bold text-success fs-7">{{
                fileItem.file_name
              }}</span>
              <span class="fs-8">
                {{ (fileItem.file_size / (1024 * 1024)).toFixed(2) }} MB
              </span>
            </div>
            <button
              class="btn btn-icon btn-sm btn-danger"
              @click="DeleteFile(index)"
              title="Remove file"
            >
              <i class="bi bi-trash fs-6"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

   
<script lang="ts">
import { defineComponent, onMounted, onUpdated, ref } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default defineComponent({
  name: "excel-files",
  components: {},

  emit: ["deleteFile"],

  props: ["filesData"],

  setup(props, { emit }) {
    const DeleteFile = async (index) => {
      await emit("deleteFile", index);
    };

    return {
      filesData: props.filesData,
      DeleteFile,
    };
  },
});
</script>
  
  