<template>
  <tr v-for="(task, index) in tasks" :key="task.id" class="w-100">
    <td class="pt-8 text-end w-100 text-nowrap" :id="task.id">
      <div
        class="shadow-lg p-5 m-3 fs-4 rounded w-100 btn btn-outline btn-outline-dashed btn-outline-default"
      >
        <div class="row mb-2">
          <div class="form-group col-lg-4 col-sm-6 col-md-6 mb-2 mb-sd-2">
            <el-date-picker
              type="date"
              name="date"
              placeholder="Pick a day"
              @change="setTheDate"
              class="mb-3 mb-lg-0 min-w-150px"
              v-model="task.date"
            />
          </div>

          <div class="form-group col-lg-8 col-sm-6 col-md-6 mb-2 mb-sd-2">
            <el-select
              filterable
              v-model="task.id"
              @change="setTheType($event, index)"
              placeholder="Please Select Expense Type"
            >
              <el-option
                value=""
                label="Please Select Item..."
                disabled="disabled"
                key=""
                >Please Select Expense Type</el-option
              >
              <el-option
                v-for="ele in ExpenseTypes"
                :key="ele.id"
                :label="ele.type"
                :value="ele.id"
              />
            </el-select>
          </div>
        </div>
        <div class="row mb-2">
          <div class="form-group col-lg-4 col-sm-6 col-md-6 mb-2 mb-sd-2">
            <input
              type="text"
              name="price"
              v-model="task.amount"
              @keyup="setTheAmount($event, index)"
              class="form-control form-control-lg form-control-solid mb-3 mb-lg-0 min-w-150px"
              placeholder="Enter Amount (₹ 0.00)"
            />
          </div>
          <div class="form-group col-lg-8 col-sm-6 col-md-6 mb-2 mb-sd-2">
            <input
              type="textarea"
              v-model="task.description"
              @keyup="setTheDescription($event, index)"
              name="description"
              rows="2"
              class="form-control form-control-lg form-control-solid"
              placeholder="write more about expense..."
            />
          </div>
        </div>
        <div class="row mb-2">
          <div class="form-group col-lg-12 mb-2 mb-sd-2">
            <input
              type="file"
              class="form-control form-control-file form-control-lg form-control-solid"
              name="receipt"
              accept="image/*"
              v-bind:image="task.receipt"
              @change="setTheImage($event, index)"
            />
          </div>
        </div>
        <div class="row mb-2">
          <div class="form-group col-lg-12 mb-2 mb-sd-2">
            <div class="border p-2 mt-3">
              <p>Preview Here:</p>
              <template v-if="task.receipt">
                <img :src="task.preview" class="rounded mx-auto d-block w-200px h-200px" />
              </template>
            </div>
          </div>
        </div>

        <div class="row mb-2">
          <div
            class="form-group d-flex justify-content-between col-lg-12 mb-2 mb-sd-2"
          >
            <div>
              <button class="btn btn-primary" @click="addExpense(index)">
                <KTIcon icon-name="plus" icon-class="fs-3" />
                Add Expense
              </button>
            </div>

            <div>
              <button class="btn btn-danger" @click="removeExpense(index)">
                <KTIcon icon-name="trash" icon-class="fs-3" />
                Delete Expense
              </button>
            </div>
          </div>
        </div>
      </div>
    </td>
  </tr>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import { ExpenseTypes } from "@/core/model/expensetypes";
import { ErrorMessage, Field } from "vee-validate";

interface itemDetails {
  id: string;
  date: string;
  description: string;
  type: string;
  amount: string;
  receipt: string;
}

export default {
  name: "CustomSelect",
  // emits: ['set-Amount', 'set-Description', 'set-Type', 'set-Image', 'set-Date'],
  // emit: ["setAmount", "setDescription", "setType", "setImage", "setDate"],
  props: ["tasks"],

  setup(props, { emit }) {
    const image = ref("");
    const preview = ref(null);

    const items = ref([
      { id: "", date: "", name: "", type: "", amount: "", receipt: "" },
    ]);
    const item = ref({
      id: "",
      date: "",
      type: "",
      description: "",
      amount: "",
      receipt: "",
    });

    async function setTheType(id, index) {
      if(index){
        await emit("setType", id, index);
      }
    }

    async function setTheDate(id, index) {
      if(index) await emit("setDate", id, index);
    }

    async function setTheAmount(id, index) {
      if(index) await emit("setAmount", id, index);
    }

    async function setTheDescription(id, index) {
      if(index) await emit("setDescription", id, index);
    }

    async function setTheImage(event, index) {
      await emit("setImage", event, index);
    }

    
    const addExpense = (index) => {
      if (index) {
        console.log(item.value);
      }

      // if(!item.value.id || !item.value.date || !item.value.name || !item.value.price || !item.value.description || !item.value.receipt){
      //   console.log("fill all details")
      // }
      // else{
      //   emit("add-expense", index)
      //   item.value.id = ""
      //   item.value.date = ""
      //   item.value.name = ""
      //   item.value.price = ""
      //   item.value.description = ""
      //   item.value.receipt = ""
      // }
    };

    const removeExpense = (index) => {
      console.log(index);
      // emit("remove-expense", index);
    };

    // const handleSelectedChange = (newVal) => {
    //   // emit the custom event called 'myfunc' with the new selected value as payload
    //   const data = items.value.find((e) => e.id === newVal) || {
    //     id: "",
    //     price: "",
    //     description: "",
    //   };
    //   emit("getval", data);
    // };

    // const UpdateEvent = (newval) => {
    //   emit("UpdateTotal", newval.target.value);
    // };

    // const onRemoveitem = (index) => {
    //   console.log(index);
    //   emit("removeitem", index);
    // };

    return {
      items,
      item,
      // onRemoveitem,
      // handleSelectedChange,
      // UpdateEvent,
      addExpense,
      removeExpense,
      setTheType,
      setTheAmount,
      setTheDescription,
      setTheDate,
      setTheImage,
      tasks: props.tasks,
      ExpenseTypes,
      image,
      preview,
    };
  },
};
</script>
