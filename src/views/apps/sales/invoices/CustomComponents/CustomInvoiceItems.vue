<template>
  <div class="table-responsive">
    <table class="table table-rounded border gy-4 gs-7 text-nowrap">
      <thead>
        <tr
          class="fw-semibold fs-6 text-gray-800 border-bottom border-gray-200 text-align-center"
        >
          <th class="col-4">Equipment Name</th>
          <th class="col-3">Equipment Charge</th>
          <th class="col-2">Quantity</th>
          <th class="col-3">Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in $props.equipment_wise" :key="index">
          <td class="min-w-200px">
            <el-select
              v-model="task.id"
              filterable
              @change="setEquipment(task.id, index)"
              placeholder="Please Select Equipment..."
            >
              <el-option
                value=""
                label="Please Select Equipment..."
                key=""
                disabled
                >Please Select Equipment...</el-option
              >
              <el-option
                v-for="ele of $props.equipments"
                :key="ele.id"
                :label="ele.name"
                :value="ele.id"
              />
            </el-select>
          </td>
          <td class="min-w-200px">
            <input
              type="text"
              v-on:input="setEquipmentCharge($event, index)"
              v-model="task.charge"
              name="charge"
              placeholder="Equipment Charge..."
              class="form-control"
            />
          </td>
          <td class="min-w-100px">
            <input
              type="text"
              name="quantity"
              v-on:input="setQuantity($event, index)"
              v-model="task.quantity"
              placeholder="Enter Quantity..."
              class="form-control"
            />
          </td>
          <td class="min-w-200px">
            <input
              type="text"
              name="amount"
              disabled
              v-model="task.amount"
              placeholder="Amount is ₹ 0.00"
              class="form-control"
            />
          </td>
          <td>
            <span
              @click="RemoveRowData(index)"
              data-toggle="tooltip"
              title="Delete Equipment"
              class="border border-danger rounded-circle badge m-3 py-3 px-4 bg-light-danger fs-7 badge-light-danger text-danger text-hover-dark cursor-pointer"
              >X
            </span>
          </td>
        </tr>
      </tbody>
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
                  <span class="btn btn-primary btn-sm" @click="addNewRowData">
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
    </table>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, watch } from "vue";

export default {
  emit: [
    "setTheEquipment",
    "setTheCharge",
    "setTheQuantity",
    "removeRow",
    "addNewRow",
  ],
  props: ["equipments", "equipment_wise"],

  setup(props, { emit }) {
    const Equipments = ref([{ id: "", name: "", charge: "" }]);

    onMounted(async () => {
      // Equipments.value.pop();
      // Equipments.value = await [...props.equipments];

      console.log("-------------------------------->",props.equipments);
      console.log("-------------------------------->",props.equipment_wise);
    });

    async function setEquipment(id, index) {
      const foundEquipment = await props.equipments.find((item) => {
        return item.id === id;
      });
      await emit("setTheEquipment", foundEquipment, index);
    }

    async function setEquipmentCharge(newval, index) {
      await emit("setTheEquipmentCharge", newval.target.value, index);
      console.log(Equipments.value);
    }

    async function setQuantity(newval, index) {
      await emit("setTheQuantity", newval.target.value, index);
    }

    const RemoveRowData = async (index) => {
      await emit("removeRow", index);
    };

    const addNewRowData = async() => {
      await emit("addNewRow");
    };

    return {
      equipment_wise: props.equipment_wise,
      equipments: props.equipments,
      Equipments,
      setEquipment,
      setEquipmentCharge,
      setQuantity,
      RemoveRowData,
      addNewRowData,
    };
  },
};
</script>
