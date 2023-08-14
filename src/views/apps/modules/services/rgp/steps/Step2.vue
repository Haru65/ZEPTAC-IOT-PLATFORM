<template>
  <!--begin::Wrapper-->
  <div class="w-100">
    <!--begin::Heading-->
    <div class="pb-10 pb-lg-15">
      <!--begin::Title-->
      <h2 class="fw-bold text-dark">Select Engineers</h2>
      <!--end::Title-->
    </div>
    <!--end::Heading-->

    <!--begin::Card body-->
    <div class="card pt-0">
      <!--begin::Table wrapper-->
      <div class="table-responsive">
        <!--begin::Table-->
        <table
          class="table align-middle table-row-dashed fs-6 fw-semobold gy-4 v-100"
          id="kt_subscription_products_table"
        >
          <!--begin::Table head-->
          <thead>
            <tr class="text-start text-muted fw-bold fs-7 text-uppercase gs-0">
              <th class="min-w-30px fs-5 fw-bold text-gray-700 text-nowrap">
                Sr.No
              </th>
              <th class="min-w-300px fs-5 fw-bold text-gray-700 text-wrap">
                Name
              </th>
              <th
                class="min-w-70px text-center fs-5 fw-bold text-gray-700 text-nowrap"
              >
                Select
              </th>
            </tr>
          </thead>
          <!--end::Table head-->

          <!--begin::Table body-->
          <tbody class="text-gray-600">
            <tr
              class="odd"
              v-for="(item, index) in $props.engineers"
              :key="item.id"
            >
              <td class="fs-3 fw-bold">{{ index + 1 }}</td>
              <td class="fs-3 fw-bold text-wrap">
                {{ item.first_name }} {{ item.last_name }}
              </td>
              <td class="text-center">
                <!--begin::Delete-->

                <input
                  class="form-check-input border border-dark"
                  type="checkbox"
                  :key="item.id"
                  :value="item.id"
                  @click="ToggleCheckBoxForEngineers($event)"
                />
                <!--end::Delete-->
              </td>
            </tr>
          </tbody>
          <!--end::Table body-->
        </table>
        <!--end::Table-->
      </div>
      <!--end::Table wrapper-->
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
  name: "step-2",
  components: {
    Field,
    ErrorMessage,
  },
  props: ["engineers"],
  setup(props, { emit }) {
    const step2Data = ref({
      engineers: [],
    });

    const ToggleCheckBoxForEngineers = async (e) => {

      const selectedId = e.target.value;

      const selectedEngineer = props.engineers.find(
        (engineer) => engineer.id == selectedId
      );

      if (e.target.checked) {
        step2Data.value.engineers.push({
          id: selectedId,
          first_name: selectedEngineer.first_name,
          last_name: selectedEngineer.last_name,
        });
      } else {
        step2Data.value.engineers = step2Data.value.engineers.filter(
          (engineer) => engineer.id != selectedId
        );
      }

      await emit('set-engineers',step2Data.value.engineers);

    };

    return {
      getAssetPath,
      step2Data,
      engineers: props.engineers,
      ToggleCheckBoxForEngineers,
    };
  },
});
</script>
