<template>
  <!--begin::Wrapper-->
  <div class="w-100">
    <!--begin::Heading-->
    <div class="pb-10 pb-lg-15">
      <!--begin::Title-->
      <h2 class="fw-bold text-dark">Specify your Expenses</h2>
      <!--end::Title-->
    </div>
    <!--end::Heading-->

    <!--begin::Card body-->
    <div class="card p-3 w-100">
      <div class="table-responsive mb-10">
        <!--begin::Table-->
        <table
          class="table g-5 gs-0 mb-0 w-100 fw-bold text-gray-700"
          data-kt-element="Selects"
        >
          <!--begin::Table head-->
          <thead>
            <tr
              class="fs-3 fw-bold text-gray-700 text-uppercase text-center"
            >
              <th class="">Your Expenses</th>
            </tr>
          </thead>
          <!--end::Table head-->

          <!--begin::Table body-->
          <tbody>
            <tr
              v-for="(task, index) in $props.tasks"
              :key="task.id"
              class="w-100"
            >
              <td class="pt-8 text-nowrap" :id="task.id">
                <div class="shadow-lg p-5 m-3 fs-4 rounded w-100 border">
                  <div class="row mb-2">
                    <div
                      class="form-group col-lg-4 col-sm-6 col-md-6 mb-2 mb-sd-2"
                    >
                      <el-date-picker
                        type="date"
                        name="date"
                        class="mb-3 mb-lg-0 min-w-150px"
                        v-model="task.date"
                        @change="setTheDate($event, index)"
                        placeholder="Pick a day"
                      />
                    </div>

                    <div
                      class="form-group col-lg-8 col-sm-6 col-md-6 mb-2 mb-sd-2"
                    >
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
                    <div
                      class="form-group col-lg-4 col-sm-6 col-md-6 mb-2 mb-sd-2"
                    >
                      <input
                        type="text"
                        name="price"
                        v-model="task.amount"
                        @keyup="setTheAmount($event, index)"
                        class="form-control form-control-lg form-control-solid mb-3 mb-lg-0 min-w-150px"
                        placeholder="Enter Amount (₹ 0.00)"
                      />
                    </div>
                    <div
                      class="form-group col-lg-8 col-sm-6 col-md-6 mb-2 mb-sd-2"
                    >
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
                        accept="image/png,jpg,jpeg"
                        @change="setTheImage($event, index)"
                      />
                    </div>
                  </div>
                  <div class="row mb-2">
                    <div class="form-group col-lg-12 mb-2 mb-sd-2">
                      <div class="border p-2 mt-3">
                        <template v-if="task.receipt">
                          <img
                            :src="'data:image/png;base64,' + task.receipt"
                            class="rounded mx-auto d-block w-200px h-200px"
                          />
                        </template>
                      </div>
                    </div>
                  </div>

                  <div class="row mb-2">
                    <div
                      class="form-group d-flex flex-end col-lg-12 mb-2 mb-sd-2"
                    >
                      <div>
                        <span>
                          <i
                            @click="removeExpense(index)"
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
                      <span class="btn btn-primary" @click="addNewItem">
                        <KTIcon icon-name="plus" icon-class="fs-2" />
                        Add More Expense
                      </span>
                    </div>
                    <div>
                      
                      <h2 class="fw-bold fs-4 text-dark">Total Expense ₹<span class="text-primary" data-kt-element="grand-total">{{
                        $props.total_amount ? $props.total_amount : "0.0"
                      }}</span></h2>
                    </div>
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
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref, onMounted } from "vue";
import { ErrorMessage, Field } from "vee-validate";
import { ExpenseTypes } from "@/core/model/expensetypes";

export default defineComponent({
  name: "step-2",
  components: {
    Field,
    ErrorMessage,
  },
  emit: [
    "setExpenseAmount",
    "setExpenseDescription",
    "setExpenseType",
    "setExpenseImage",
    "setExpenseDate",
    "RemoveExpense",
    "addNewExpenseField",
  ],
  props: ["tasks", "total_amount"],
  setup(props, { emit }) {

    // Handling Emits

    const image = ref("");
    const receipt = ref(null);

    async function setTheType(id, index) {
      await emit("setType", id, index);
    }

    async function setTheDate(id, index) {
      await emit("setDate", id, index);
    }

    async function setTheAmount(id, index) {
      await emit("setAmount", id, index);
    }

    async function setTheDescription(id, index) {
      await emit("setDescription", id, index);
    }

    async function setTheImage(event, index) {
      await emit("setImage", event, index);
    }

    const removeExpense = (index) => {
      console.log("child", index);
      emit("removeExpense", index);
    };

    const addNewItem = () => {
      emit("addNewExpenseField");
    };

    return {
      getAssetPath,
      addNewItem,
      image,
      removeExpense,
      setTheType,
      setTheAmount,
      setTheDescription,
      setTheDate,
      setTheImage,
      tasks: props.tasks,
      ExpenseTypes,
      receipt,
    };
  },
});
</script>
