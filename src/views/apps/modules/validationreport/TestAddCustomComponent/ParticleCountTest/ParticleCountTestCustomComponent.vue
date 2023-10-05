<template>
  <!--begin::Wrapper-->
  <div class="w-100">
    <!--begin::Card body-->
    <div class="card p-1 w-100">
      <div class="table-responsive mb-10">
        <!--begin::Table-->

        <table
          class="table table-responsive g-5 gs-0 m-2 w-100 fw-bold text-gray-700 table-bordered"
          data-kt-element="Selects"
        >
          <!--begin::Table head-->
          <thead>
            <tr class="fs-5 fw-bold text-gray-700 text-center">
              <th rowspan="2">LOCATION NO.</th>
              <th colspan="2">PARTICLE SIZE (m³)</th>
              <th rowspan="2">REMARK</th>
              <th rowspan="2">DELETE</th>
            </tr>
            <tr class="fs-6 fw-bold text-gray-700 text-center">
              <th>0.5 μm</th>
              <th>5 μm</th>
            </tr>
          </thead>
          <!--end::Table head-->
          <!--begin::Table body-->
          <tbody>
            <tr v-for="(detail, index) in $props.details" :key="index">
              <td class="text-nowrap">
                <div class="form-group">
                  <input
                    type="text"
                    name="location_no"
                    placeholder="L1"
                    class="form-control min-w-100px"
                    @keyup="setLocationNo($event, index)"
                    v-model="detail.location_no"
                  />
                </div>
              </td>
              <td class="text-nowrap">
                <div class="form-group">
                  <input
                    type="text"
                    name="reading_1"
                    placeholder="0"
                    class="form-control min-w-100px"
                    @keyup="setReading1($event, index)"
                    v-model="detail.particle_readings.reading_1"
                  />
                </div>
              </td>
              <td class="text-nowrap">
                <div class="form-group">
                  <input
                    type="text"
                    name="reading_2"
                    placeholder="0"
                    class="form-control min-w-100px"
                    @keyup="setReading2($event, index)"
                    v-model="detail.particle_readings.reading_2"
                  />
                </div>
              </td>
              <td class="text-nowrap">
                <div class="form-group">
                  <input
                    type="text"
                    name="remark"
                    placeholder="Remark"
                    class="form-control min-w-100px"
                    @keyup="setRemark($event, index)"
                    v-model="detail.remark"
                  />
                </div>
              </td>
              <td class="text-nowrap">
                <div class="row mb-2">
                  <div
                    class="form-group d-flex flex-end col-lg-12 mb-2 mb-sd-2"
                  >
                    <div>
                      <span>
                        <i
                          @click="RemoveRowData(index)"
                          class="bi bi-trash btn btn-light text-gray-700 text-hover-danger mb-1 fs-1"
                        ></i>
                      </span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
          <!--end::Table body-->
          <!--begin::Table foot-->
          <tfoot>
            <tr class="align-top fs-6 fw-bold text-gray-700 text-center">
              <td colspan="3" class="text-nowrap">
                <div>
                  <span class="btn btn-primary" @click="addNewRowData">
                    <KTIcon icon-name="plus" icon-class="fs-2" />
                    Add More Filters
                  </span>
                </div>
              </td>
            </tr>
          </tfoot>
          <!--end::Table foot-->
        </table>
      </div>
    </div>
    <!--end::Card body-->
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref, onMounted } from "vue";
import { ErrorMessage, Field } from "vee-validate";

export default defineComponent({
  name: "particle-count-test",
  components: {
    Field,
    ErrorMessage,
  },
  emit: [
    "setTheLocationNo",
    "setTheReading1",
    "setTheReading2",
    "setTheRemark",
    "removeRow",
    "addNewRow",
  ],
  props: ["details"],
  setup(props, { emit }) {
    // Handling Emits

    async function setLocationNo(id, index) {
      await emit("setTheLocationNo", id, index);
    }

    async function setReading1(id, index) {
      await emit("setTheReading1", id, index);
    }

    async function setReading2(id, index) {
      await emit("setTheReading2", id, index);
    }

    async function setRemark(id, index) {
      await emit("setTheRemark", id, index);
    }

    const RemoveRowData = (index) => {
      emit("removeRow", index);
    };

    const addNewRowData = () => {
      emit("addNewRow");
    };

    return {
      getAssetPath,
      addNewRowData,
      RemoveRowData,
      setLocationNo,
      setReading1,
      setReading2,
      setRemark,
      details: props.details,
    };
  },
});
</script>