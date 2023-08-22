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
    <div class="card pt-0 w-100">
      <div class="table-responsive w-100 mb-10">
        <!--begin::Table-->
        <table
          class="table g-5 gs-0 mb-0 w-100 fw-bold text-gray-700"
          data-kt-element="Selects"
        >
          <!--begin::Table head-->
          <thead>
            <tr
              class="border-bottomfs-7 w-100 fw-bold text-gray-700 text-uppercase"
            >
              <th class="">Expense Details</th>
            </tr>
          </thead>
          <!--end::Table head-->

          <!--begin::Table body-->
          <tbody>
            <CustomSelect
              v-bind:tasks="step2Data.expenses"
              @setAmount="setExpenseAmount"
              @setDescription="setExpenseDescription"
              @setType="setExpenseType"
              @setImage="setExpenseImage"
              @setDate="setExpenseDate"
            />
          </tbody>
          <!--end::Table body-->

          <!--begin::Table foot-->
          <tfoot>
            <tr
              class="border-top border-top-dashed align-top fs-6 fw-bold text-gray-700"
            >
              <th class="text-primary">
                <span class="btn btn-primary" @click="addNewItem()">
                  <KTIcon icon-name="plus" icon-class="fs-2" />
                  Add More Expense
                </span>
              </th>
            </tr>
            <tr class="align-top fw-bold text-gray-700">
              <th colspan="1" class="fs-4 ps-0">Total</th>
              <th colspan="1" class="text-end fs-4 text-nowrap">
                ₹<span data-kt-element="grand-total">{{ 987 }}</span>
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
import CustomSelect from "../CustomComponents/CustomQuotationItems.vue";
import { ExpenseTypes } from "@/core/model/expensetypes";
import moment from "moment";

export default defineComponent({
  name: "step-2",
  components: {
    Field,
    ErrorMessage,
    CustomSelect,
  },
  emit: [
    "setExpenseAmount",
    "setExpenseDescription",
    "setExpenseType",
    "setExpenseImage",
    "setExpenseDate",
  ],
  props: [],
  setup(props, { emit }) {
    const step2Data = ref({
      expenses: [
        {
          id: "",
          date: "",
          type: "",
          description: "",
          amount: "",
          receipt: "",
          preview: "",
        },
      ],
    });

    async function setExpenseDate(event, index) {
      if (index && event) {
        console.log(event, index);
        step2Data.value.expenses[index].date = moment(event).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      }
    }

    async function setExpenseType(typeId, index) {
      if (index && typeId) {
        const findExpenseType = (await ExpenseTypes.find(
          (x) => x.id == typeId
        )) || { id: "", type: "" };
        step2Data.value.expenses[index].id = typeId;
        step2Data.value.expenses[index].type = findExpenseType.type;
      }
    }

    async function setExpenseDescription(desc, index) {
      if (index && desc) {
        step2Data.value.expenses[index].description = await desc.target.value;
      }
    }

    async function setExpenseAmount(amount, index) {
      if (index && amount) {
        step2Data.value.expenses[index].amount = await amount.target.value;
      }
    }

    async function setExpenseImage(event, index) {
        const input = event.target;
        if (input.files && input.files.length > 0) {
          const reader = new FileReader();
          reader.onload = (e) => {
            step2Data.value.expenses[index].preview = e.target.result;
          };
          step2Data.value.expenses[index].receipt = input.files[0];
          reader.readAsDataURL(input.files[0]);
        }
    }

    // const removeObjectWithId = (arr, id) => {
    //   const objWithIdIndex = arr.findIndex((obj) => obj.id === id);

    //   if (objWithIdIndex > -1) {
    //     arr.splice(objWithIdIndex, 1);
    //   }

    //   return arr;
    // };

    const RemoveExpense = (index) => {
      console.log(index);
      // removeObjectWithId(step2Data.value.expenses, index);
      // calPrice();
    };
    const AddExpense = (index) => {
      // console.log(index);
      // removeObjectWithId(QuotationDetials.value.items, index);
      // calPrice();
    };

    // const ToggleCheckBoxForEngineers = async (e) => {
    //   const selectedId = e.target.value;

    //   const selectedEngineer = props.engineers.find(
    //     (engineer) => engineer.id == selectedId
    //   );

    //   if (e.target.checked) {
    //     step2Data.value.engineers.push({
    //       id: selectedId,
    //       first_name: selectedEngineer.first_name,
    //       last_name: selectedEngineer.last_name,
    //     });
    //   } else {
    //     step2Data.value.engineers = step2Data.value.engineers.filter(
    //       (engineer) => engineer.id != selectedId
    //     );
    //   }

    //   await emit("set-engineers", step2Data.value.engineers);
    // };

    const addNewItem = () => {
      step2Data.value.expenses.push({
        id: "",
        date: "",
        type: "",
        description: "",
        amount: "",
        receipt: "",
        preview: "",
      });
    };

    return {
      getAssetPath,
      step2Data,
      addNewItem,
      RemoveExpense,
      AddExpense,
      setExpenseDate,
      setExpenseAmount,
      setExpenseDescription,
      setExpenseImage,
      setExpenseType,

      // engineers: props.engineers,
      // ToggleCheckBoxForEngineers,
    };
  },
});
</script>
