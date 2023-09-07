<template>
  <!--begin::Wrapper-->
  <div class="w-100">
    <!--begin::Heading-->
    <div class="pb-10 pb-lg-15">
      <!--begin::Title-->
      <h2 class="fw-bold text-dark">Select Instruments</h2>
      <!--end::Title-->
    </div>
    <!--end::Heading-->

    <!--begin::Card body-->
    <div class="card pt-0" v-if="$props.instruments.length > 0">
      <!--begin::Table wrapper-->
      <div class="table-responsive">
        <!--begin::Table-->
        <table
          class="table align-middle table-row-dashed fs-6 fw-semobold gy-4 w-100"
          id="kt_subscription_products_table"
        >
          <!--begin::Table head-->
          <thead>
            <tr class="text-start text-muted fw-bold fs-7 text-uppercase gs-0">
              <th class="min-w-30px fs-5 fw-bold text-gray-700 text-nowrap">
                Sr.No
              </th>
              <th class="min-w-200px fs-5 fw-bold text-gray-700 text-nowrap">
                Instrument
              </th>
              <th class="min-w-100px fs-5 fw-bold text-gray-700 text-nowrap">
                Made By
              </th>
              <th class="min-w-100px fs-5 fw-bold text-gray-700 text-nowrap">
                Model No.
              </th>
              <th class="min-w-100px fs-5 fw-bold text-gray-700 text-nowrap">
                Serial No.
              </th>
              <th
                class="min-w-30px fs-5 fw-bold text-center text-gray-700 text-nowrap"
              >
                Select
              </th>
            </tr>
          </thead>
          <!--end::Table head-->

          <!--begin::Table body-->
          <tbody class="text-gray-600">
            <tr
              v-for="(instrument, index) in $props.instruments"
              :key="instrument.id"
            >
              <td class="fs-3 fw-bold">
                {{ index + 1 }}
              </td>
              <td class="fs-3 fw-bold text-wrap">
                {{ instrument.name }}
              </td>
              <td class="fs-3 fw-bold text-nowrap">
                {{ instrument.make }}
              </td>
              <td class="fs-3 fw-bold text-nowrap">
                {{ instrument.model_no }}
              </td>
              <td class="fs-3 fw-bold text-nowrap">
                {{ instrument.serial_no }}
              </td>
              <td class="text-center">
                <!--begin::Delete-->

                <input
                  class="form-check-input border border-dark"
                  type="checkbox"
                  :key="instrument.id"
                  :value="instrument.id"
                  @click="checkboxToggleForInstruments"
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

    <div v-else>
      <div class="tab-content">
        <div class="tab-pane fade show active" aria-labelledby="home-tab">
          <div class="shadow-lg p-5 mb-7 fs-4 rounded">
            <p>
              Sorry! No Instruments are available at this moment.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref } from "vue";
import { ErrorMessage, Field } from "vee-validate";


interface Instrument {
  id: string;
  name: string;
  model_no: string;
  serial_no: string;
  make: string;
}

interface step3Data {
  instruments: Array<Instrument>;
}

export default defineComponent({
  name: "step-3",
  components: {
    Field,
    ErrorMessage,
  },
  props: ["instruments"],
  setup(props, { emit }) {
    const step3Data = ref<step3Data>({
      instruments: [],
    });

    const checkboxToggleForInstruments = async (e) => {

      const selectedId = e.target.value;

      const selectedInstruments = props.instruments.find(
        (instrument) => instrument.id == selectedId
      );

      if (e.target.checked) {
        step3Data.value.instruments.push({
          id: selectedId,
          name: selectedInstruments.name,
          model_no: selectedInstruments.model_no,
          serial_no: selectedInstruments.serial_no,
          make: selectedInstruments.make,
        });
      } else {
        step3Data.value.instruments = step3Data.value.instruments.filter(
          (instrument) => instrument.id != selectedId
        );
      }

      await emit('set-instruments',step3Data.value.instruments);

    };

    return {
      getAssetPath,
      step3Data,
      checkboxToggleForInstruments,
      instruments: props.instruments,
    };
  },
});
</script>
