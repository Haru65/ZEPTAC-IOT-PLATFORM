<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="card-box">
          <div class="row">
            <div class="col-lg-6 col-xl-6">
              <h4 class="header-title m-b-30">Uploaded Files</h4>
            </div>
          </div>

          <div class="row">
            <div
              class="col-lg-4 col-xl-3 col-md-6 col-sm-12"
              v-for="(fileItem, index) in $props.filesData"
              :key="index"
            >
              <div class="shadow overflow-auto">
                <div class="table-responsive mt-6" style="max-height: 300px">
                  <table
                    class="table table-rounded table-striped border gy-4 gs-4 position-relative"
                  >
                    <thead>
                      <tr
                        class="fw-semibold fs-9 text-gray-800 border-bottom border-gray-200"
                      >
                        <th>ID</th>
                        <th>Temperature</th>
                        <th>Humidity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="r in fileItem.data" :key="r.id">
                        <td>{{ r.id }}</td>
                        <td>{{ r.temp }}</td>
                        <td>{{ r.rh }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div class="card-header pt-3">
                  <!--begin::Title-->

                  <h5 class="card-title align-items-start flex-column">
                    <span class="card-label fw-bold text-success fs-9">{{
                      fileItem.file_name
                    }}</span>
                    <span class="text-info mt-1 fw-semibold fs-9"
                      >Size
                      {{
                        (fileItem.file_size / (1024 * 1024)).toFixed(2)
                      }}
                      MB</span
                    >
                  </h5>

                  <div class="card-toolbar">
                    <button
                      class="border border-danger rounded-circle badge m-3 py-3 px-4 bg-danger fs-9 badge-danger text-white cursor-pointer"
                      data-toggle="tooltip"
                      title="Remove file"
                      @click="DeleteFile(index)"
                    >X
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </div>
  <!-- container -->
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
  
  