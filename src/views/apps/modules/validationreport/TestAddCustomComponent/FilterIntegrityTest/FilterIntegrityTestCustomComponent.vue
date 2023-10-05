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
              <th rowspan="2">SUPPLY CODE</th>
              <th rowspan="2">UPSTREAM CONC.IN (mg/m³)</th>
              <th rowspan="2">LEAKAGE IN (%)</th>
              <th rowspan="2">TEST RESULT OF PAO</th>
              <th rowspan="2">REMARK</th>
              <th rowspan="2">DELETE</th>
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
                    name="supply_code"
                    placeholder="Supply Code"
                    class="form-control min-w-100px"
                    @keyup="setSupplyCode($event, index)"
                    v-model="detail.supply_code"
                  />
                </div>
              </td>
              <td class="text-nowrap">
                <div class="form-group">
                  <input
                    type="text"
                    name="up_stream_conc"
                    placeholder="0"
                    class="form-control min-w-50px"
                    @keyup="setUpstreamConc($event, index)"
                    v-model="detail.up_stream_conc"
                  />
                </div>
              </td>
              <td class="text-nowrap">
                <div class="form-group">
                  <input
                    type="text"
                    name="leakage"
                    placeholder="10%"
                    class="form-control min-w-100px"
                    @keyup="setLeakage($event, index)"
                    v-model="detail.leakage"
                  />
                </div>
              </td>
              <td class="text-nowrap">
                <div class="form-group">
                  <input
                    type="text"
                    name="test_result_of_pov"
                    placeholder="Result"
                    class="form-control min-w-100px"
                    @keyup="setResultOfPOV($event, index)"
                    v-model="detail.test_result_of_pov"
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
  name: "filter-integrity-test",
  components: {
    Field,
    ErrorMessage,
  },
  emit: [
    "setTheSupplyCode",
    "setTheUpstreamConc",
    "setTheLeakage",
    "setTheResultOfPOV",
    "setTheRemark",
    "removeRow",
    "addNewRow",
  ],
  props: ["details"],
  setup(props, { emit }) {
    // Handling Emits

    async function setSupplyCode(id, index) {
      await emit("setTheSupplyCode", id, index);
    }

    async function setUpstreamConc(id, index) {
      await emit("setTheUpstreamConc", id, index);
    }

    async function setLeakage(id, index) {
      await emit("setTheLeakage", id, index);
    }

    async function setResultOfPOV(id, index) {
      await emit("setTheResultOfPOV", id, index);
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
      setSupplyCode,
      setUpstreamConc,
      setLeakage,
      setResultOfPOV,
      setRemark,
      details: props.details,
    };
  },
});
</script>