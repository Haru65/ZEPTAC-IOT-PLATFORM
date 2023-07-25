<template>
  <tr v-for="task in tasks" :key="task.id">
    <td class="pt-8 w-50 text-end text-nowrap" style="min-width: 20rem">
      <!-- {{task.id}} -->
      <el-select v-model="task.id" filterable @change="handleSelectedChange" placeholder="Please Select Item...">
        <!-- <el-option value="0" label="Please Select Item..." key="0"
          >Please Select Item...</el-option
        > -->
        <el-option
          v-for="ele in items"
          :key="ele.id"
          :label="ele.name"
          :value="ele.id"
        />
      </el-select>
      <br />
      <textarea
        name="notes"
        class="form-control mt-4 form-control-solid"
        rows="3"
        v-model="task.desc"
        placeholder="Description"
      ></textarea>
    </td>
    <td class="p-8 text-end text-nowrap w-50">
      <input
        v-on:input="UpdateEvent"
        type="text"
        name="price"
        class="form-control form-control-lg form-control-solid mb-3 mb-lg-0 min-w-150px"
        placeholder="₹ 0.00"
        v-model="task.price"
      />
    </td>
    <td class="p-8 text-end text-nowrap w-50">
      <button
        type="button"
        @click="onRemoveitem(task.id)"
        class="btn btn-sm btn-icon btn-active-color-primary"
      >
        <i class="ki-duotone ki-trash fs-3"
          ><span class="path1"></span><span class="path2"></span
          ><span class="path3"></span><span class="path4"></span
          ><span class="path5"></span
        ></i>
      </button>
    </td>
  </tr>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import ApiService from "@/core/services/ApiService";
import { getPriceList } from "@/stores/api";

interface itemDetails {
  id: string;
  desc: string;
  name: string;
  price: string;
}

export default {
  emits: ["getval", "removeitem", "UpdateTotal"],
  props: ["tasks"],

  setup(props, { emit }) {
    const items = ref([{ id: "", name: "", description: "", price: "" }]);
    const item = ref<itemDetails>({
      id: "",
      name: "0",
      desc: "",
      price: "",
    });

    // get options from DB;
    const getSelects = async () => {
      ApiService.setHeader();
      const response = await getPriceList();
      const data = response.result.data.map(
        ({ id, name, description, price, created_at }) => ({
          id,
          name,
          description,
          price,
          created_at: new Date(created_at).toLocaleDateString(),
        })
      );
      items.value = data;
    };

    onMounted(async () => {
      items.value.pop();
      await getSelects();
      console.log(props.tasks);
    });

    const handleSelectedChange = (newVal) => {
      // emit the custom event called 'myfunc' with the new selected value as payload
      const data = items.value.find((e) => e.id === newVal) || {
        id: "",
        price: "",
        description: "",
      };
      emit("getval", data);
    };

    const UpdateEvent = (newval) => {
      emit("UpdateTotal", newval.target.value);
    };

    const onRemoveitem = (index) => {
      console.log(index);
      emit("removeitem", index);
    };

    return {
      items,
      item,
      onRemoveitem,
      handleSelectedChange,
      UpdateEvent,
    };
  },
};
</script>
