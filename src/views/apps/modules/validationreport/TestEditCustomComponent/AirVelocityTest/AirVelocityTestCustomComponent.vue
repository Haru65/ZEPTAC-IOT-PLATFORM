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
            <tr class="fs-5 fw-bold text-gray-700 text-uppercase text-center">
              <th rowspan="2">SUPPLY CODE</th>
              <th colspan="5">VELOCITY READINGS (FPM)</th>
              <th rowspan="2">AVG.</th>
              <th rowspan="2">SUPPLY FILTER SIZE FT²</th>
              <th rowspan="2">CFM</th>
              <th rowspan="2">Delete</th>
            </tr>
            <tr class="fs-6 fw-bold text-gray-700 text-uppercase text-center">
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
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
                    name="reading_1"
                    placeholder="0"
                    class="form-control min-w-50px"
                    @keyup="setReading1($event, index)"
                    v-model="detail.velocity_readings.reading_1"
                  />
                </div>
              </td>
              <td class="text-nowrap">
                <div class="form-group">
                  <input
                    type="text"
                    name="reading_2"
                    placeholder="0"
                    class="form-control min-w-50px"
                    
                    @keyup="setReading2($event, index)"
                    v-model="detail.velocity_readings.reading_2"
                  />
                </div>
              </td>
              <td class="text-nowrap">
                <div class="form-group">
                  <input
                    type="text"
                    name="reading_3"
                    placeholder="0"
                    class="form-control min-w-50px"
                    
                    @keyup="setReading3($event, index)"
                    v-model="detail.velocity_readings.reading_3"
                  />
                </div>
              </td>
              <td class="text-nowrap">
                <div class="form-group">
                  <input
                    type="text"
                    name="reading_4"
                    placeholder="0"
                    class="form-control min-w-50px"
                    
                    @keyup="setReading4($event, index)"
                    v-model="detail.velocity_readings.reading_4"
                  />
                </div>
              </td>
              <td class="text-nowrap">
                <div class="form-group">
                  <input
                    type="text"
                    name="reading_5"
                    placeholder="0"
                    class="form-control min-w-50px"
                    @keyup="setReading5($event, index)"
                    v-model="detail.velocity_readings.reading_5"
                  />
                </div>
              </td>

              <td class="text-nowrap">
                <div class="form-group min-w-100px">
                  <input
                    type="text"
                    name="average"
                    disabled
                    placeholder="0.0"
                    class="form-control min-w-100px"
                    v-model="detail.average_reading"
                  />
                </div>
              </td>
              <td class="text-nowrap">
                <div class="form-group">
                  <input
                    type="text"
                    name="supply_filter_size"
                    placeholder="Filter Size"
                    class="form-control min-w-100px"
                    v-model="detail.supply_filter_size"
                    @keyup="setSupplyFilterSize($event, index)"
                  />
                </div>
              </td>
              <td class="text-nowrap">
                <div class="form-group">
                  <input
                    type="text"
                    name="cfm"
                    disabled
                    placeholder="CFM"
                    class="form-control min-w-100px"
                    v-model="detail.cfm"
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
            <tr class="align-top fs-6 fw-bold text-gray-700 text-center">
              <td colspan="3" class="text-nowrap">
                <div class="form-group">
                  <label
                    class="btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center"
                  >
                    <!--begin::Info-->
                    <span class="d-block fw-semobold text-start">
                      <span class="text-gray fw-bold d-block fs-4 mb-2"
                        >TOTAL CFM</span
                      >
                      <div class="block">
                        <input
                          type="text"
                          disabled
                          name="total_cfm"
                          v-model="$props.total_cfm"
                          placeholder="Total CFM"
                          class="form-control min-w-100px"
                        />
                      </div>
                    </span>
                    <!--end::Info-->
                  </label>
                </div>
              </td>
              <td colspan="3" class="text-nowrap">
                <div class="form-group">
                  <label
                    class="btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center"
                  >
                    <!--begin::Info-->
                    <span class="d-block fw-semobold text-start">
                      <span class="text-gray fw-bold d-block fs-4 mb-2"
                        >ROOM VOLUME FT³</span
                      >
                      <div class="block">
                        <input
                          type="text"
                          v-model="$props.room_volume"
                          @keyup="setRoomVolume($event)"
                          name="room_volume"
                          placeholder="Room Volume"
                          class="form-control min-w-100px"
                        />
                      </div>
                    </span>
                    <!--end::Info-->
                  </label>
                </div>
              </td>
              <td colspan="3" class="text-nowrap">
                <div class="form-group">
                  <label
                    class="btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center"
                  >
                    <!--begin::Info-->
                    <span class="d-block fw-semobold text-start">
                      <span class="text-gray fw-bold d-block fs-4 mb-2"
                        >ACPH</span
                      >
                      <div class="block">
                        <input
                          type="text"
                          v-model="$props.acph"
                          disabled
                          name="acph"
                          placeholder="ACPH"
                          class="form-control min-w-100px"
                        />
                      </div>
                    </span>
                    <!--end::Info-->
                  </label>
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
  name: "activity-test",
  components: {
    Field,
    ErrorMessage,
  },
  emit: [
    "setTheSupplyCode",
    "setTheReading1",
    "setTheReading2",
    "setTheReading3",
    "setTheReading4",
    "setTheReading5",
    "setTheSupplyFilterSize",
    "setTheRoomVolume",
    "removeRow",
    "addNewRow",
  ],
  props: ["details","total_cfm","acph","room_volume"],
  setup(props, { emit }) {
    // Handling Emits

    async function setSupplyCode(id, index) {
      await emit("setTheSupplyCode", id, index);
    }

    async function setReading1(id, index) {
      await emit("setTheReading1", id, index);
    }

    async function setReading2(id, index) {
      await emit("setTheReading2", id, index);
    }

    async function setReading3(id, index) {
      await emit("setTheReading3", id, index);
    }

    async function setReading4(id, index) {
      await emit("setTheReading4", id, index);
    }
    
    async function setReading5(id, index) {
      await emit("setTheReading5", id, index);
    }

    async function setSupplyFilterSize(id, index) {
      await emit("setTheSupplyFilterSize", id, index);
    }

    async function setRoomVolume(id) {
      await emit("setTheRoomVolume", id);
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
      setReading1,
      setReading2,
      setReading3,
      setReading4,
      setReading5,
      setSupplyFilterSize,
      setRoomVolume,
      
      details: props.details,
      total_cfm: props.total_cfm,
      room_volume: props.room_volume,
      acph: props.acph,
    };
  },
});
</script>