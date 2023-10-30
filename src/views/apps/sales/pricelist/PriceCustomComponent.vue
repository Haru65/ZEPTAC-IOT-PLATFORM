<template>
  <!--begin::Card body-->
  <div class="card p-0 mt-0 w-100">
    <div class="table-responsive mb-10">
      <!--begin::Table-->
      <table
        class="table gs-0 mb-0 w-100 fw-bold text-gray-700"
        data-kt-element="Selects"
      >
        <!--begin::Table head-->
        <thead>
          <tr class="fs-4 fw-bold text-gray-700 text-uppercase text-center">
            <th class="">Add Equipments</th>
          </tr>
        </thead>
        <!--end::Table head-->

        <!--begin::Table body-->
        <tbody>
          <tr
            v-for="(equip, index) in $props.equipment_wise"
            :key="index"
            class="w-100"
          >
            <td class="pt-8 text-nowrap" :id="equip.id">
              <div class="shadow-lg p-5 m-3 fs-4 rounded w-100 border">
                <div class="row mb-2">
                  <div
                    class="form-group col-lg-8 col-sm-6 col-md-6 mb-2 mb-sd-2"
                  >
                    <el-select
                      v-model="equip.id"
                      filterable
                      @change="setEquipment($event, index)"
                      placeholder="Please Select Equipment..."
                    >
                      <el-option
                        disabled="disabled"
                        value=""
                        label="Please Select Equipment..."
                      >
                        Please Select Source
                      </el-option>
                      <el-option
                        v-for="(item, index) in Equipments"
                        :key="index"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </div>

                  <div
                    class="form-group col-lg-4 col-sm-6 col-md-6 mb-2 mb-sd-2"
                  >
                    <input
                        type="text"
                        name="charge"
                        v-model="equip.charge"
                        @keyup="setCharge($event, index)"
                        class="form-control form-control-lg form-control-solid mb-3 mb-lg-0 min-w-150px"
                        placeholder="Charge is... ₹0.00"
                      />
                  </div>
                </div>

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
              </div>
            </td>
          </tr>
        </tbody>
        <!--end::Table body-->
        <!--begin::Table foot-->
        <tfoot>
          <tr
            class="border-top border-top-dashed align-top fs-6 fw-bold text-gray-700"
          >
            <th class="text-primary">
              <div class="row m-2">
                <div
                  class="form-group d-flex justify-content-between col-lg-12 mb-2 mb-sd-2"
                >
                  <div>
                    <span class="btn btn-primary btn-md" @click="addNewRowData">
                      <KTIcon icon-name="plus" icon-class="fs-2" />
                      Add Equipment
                    </span>
                  </div>
                  <div></div>
                </div>
              </div>
            </th>
          </tr>
        </tfoot>
        <!--end::Table foot-->
      </table>
    </div>
  </div>
  <!--end::Card body-->
</template>
  
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { ErrorMessage, Field } from "vee-validate";
import { Equipments } from "@/core/model/pricelist";

export default defineComponent({
  name: "price-custom",
  components: {
    Field,
    ErrorMessage,
  },
  emit: ["setTheEquipment", "setTheCharge", "removeRow", "addNewRow"],
  props: ["equipment_wise"],
  setup(props, { emit }) {
    // Handling Emits

    async function setEquipment(id, index) {
    const foundEquipment = await Equipments.find( item => {
        return item.id === id;
    });

    await emit("setTheEquipment", foundEquipment, index);
    }

    async function setCharge(id, index) {
      await emit("setTheCharge", id, index);
    }

    const RemoveRowData = (index) => {
      emit("removeRow", index);
    };

    const addNewRowData = () => {
      emit("addNewRow");
    };

    return {
      addNewRowData,
      RemoveRowData,
      setEquipment,
      setCharge,
      equipment_wise: props.equipment_wise,
      Equipments,
    };
  },
});
</script>