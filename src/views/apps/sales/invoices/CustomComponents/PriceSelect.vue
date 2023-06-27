<template>
  <td class="w-75 pt-8 text-end text-nowrap">
    <el-select v-model="item.name" filterable @change="handleSelectedChange">
      <el-option value="0" label="Please Select Item..." key="0"
        >Please Select Item...</el-option
      >
      <el-option
        v-for="ele in items"
        :key="ele.id"
        :label="ele.name"
        :value="ele.name"
      />
    </el-select>
    <br />
    <textarea
      name="notes"
      class="form-control mt-4 form-control-solid"
      rows="3"
      v-model="item.desc"
      placeholder="Description"
    ></textarea>
  </td>

  <td class="p-8 text-end text-nowrap w-auto">
    <input
      type="text"
      name="price"
      class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
      placeholder="$ 0.00"
      v-model="item.pric"
    />
  </td>

  <td class="pt-5 text-end w-50">
    <button type="button" class="btn btn-sm btn-icon btn-active-color-primary">
      <i class="ki-duotone ki-trash fs-3"
        ><span class="path1"></span><span class="path2"></span
        ><span class="path3"></span><span class="path4"></span
        ><span class="path5"></span
      ></i>
    </button>
  </td>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import ApiService from "@/core/services/ApiService";
import { getPriceList } from "@/stores/api";

interface itemDetails {
  id: string;
  desc: string;
  name: string;
  pric: string;
}

export default {
  emits: ["myfunc"],
  setup(props, { emit }) {
    const items = ref([{ id: "", name: "", description: "", price: "" }]);

    const item = ref<itemDetails>({
      id: "",
      name: "0",
      desc: "",
      pric: "",
    });

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
    });

    // currency foratter
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
    });


    const handleSelectedChange = (newVal) => {
      // emit the custom event called 'myfunc' with the new selected value as payload
      const data = items.value.find((e) => e.name === newVal) || {
        id: "",
        price: "",
        description: "",
      };
      item.value.id = data.id;
      item.value.pric = formatter.format(Number(data.price)).toString();
      item.value.desc = data.description.toString();
      emit("myfunc", item.value);
    };

    return {
      items,
      item,
      handleSelectedChange,
    };
  },
};
</script>
