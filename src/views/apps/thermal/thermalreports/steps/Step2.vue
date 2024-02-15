<template>
  <!--begin::Wrapper-->
  <div class="w-100">
    <!--begin::Heading-->
    <div class="pb-10 pb-lg-10">
      <!--begin::Title-->
      <h2 class="fw-bold d-flex align-items-center text-dark">
        <span class="badge-light-primary rounded p-3">
          Instrument Selection
        </span>
      </h2>
      <!--end::Title-->
    </div>
    <!--end::Heading-->

    <div class="card-header border-0 pt-6">
      <!--begin::Card title-->
      <div class="card-title d-flex gap-4">
        <div class="d-flex align-items-center position-relative my-3">
          <el-select
            name="fromInstrumentId"
            filterable
            placeholder="From Instrument ID"
            v-model="fromInstrumentId"
            @change="handleFrom"
          >
            <el-option
              v-for="instrument in instrumentsFrom"
              :key="instrument.id"
              :value="instrument.id"
              :label="instrument.instrument_id"
            />
          </el-select>
        </div>

        <div class="d-flex align-items-center position-relative my-3">
          <el-select
            name="toInstrumentId"
            filterable
            placeholder="To Instrument ID"
            v-model="toInstrumentId"
            :disabled="disabelRef"
            @change="handleTo"
          >
            <el-option
              v-for="instrument in instrumentsTo"
              :key="instrument.id"
              :value="instrument.id"
              :label="instrument.instrument_id"
            />
          </el-select>
        </div>
      </div>
      <!--begin::Card title-->
      <!--begin::Card toolbar-->
      <div class="card-toolbar">
        <!--begin::Group actions-->
        <div
          v-if="selectedIds.length > 0"
          class="d-flex justify-content-end align-items-center"
          data-kt-customer-table-toolbar="selected"
        >
          <div class="fw-bold me-5">
            <span class="me-2 btn btn-light-success"
              >{{ selectedIds.length }} Selected</span
            >
          </div>
        </div>
        <!--end::Group actions-->
        <!--begin::Group actions-->
        <div
          class="d-flex justify-content-end align-items-center d-none"
          data-kt-customer-table-toolbar="selected"
        >
          <div class="fw-bold me-5">
            <span
              class="me-2"
              data-kt-customer-table-select="selected_count"
            ></span
            >Selected
          </div>
          <button
            type="button"
            class="btn btn-danger"
            data-kt-customer-table-select="delete_selected"
          >
            Delete Selected
          </button>
        </div>
        <!--end::Group actions-->
      </div>
      <!--end::Card toolbar-->
    </div>

    <div class="card-body pt-0">
      <TableContent
        :data="tableData"
        :header="tableHeader"
        :items-per-page-dropdown-enabled="false"
        :loading="loading"
      >
        <template v-slot:checked="{ row: thermal_instruments }">
          <div
            class="form-check form-switch form-check-custom form-check-success form-check-solid"
          >
            <input
              class="form-check-input w-60px"
              type="checkbox"
              v-model="thermal_instruments.checked"
              @click="
                toggleInstrument(
                  $event,
                  thermal_instruments.id,
                  thermal_instruments.instrument_id,
                  thermal_instruments.name,
                  thermal_instruments.serial_no,
                  thermal_instruments.calibration_date,
                  thermal_instruments.calibration_due_date
                )
              "
            />
          </div>
        </template>
        <template v-slot:instrument_id="{ row: thermal_instruments }">
          {{ thermal_instruments.instrument_id }}
        </template>
        <template v-slot:name="{ row: thermal_instruments }">
          {{ thermal_instruments.name }}
        </template>
        <template v-slot:model_no="{ row: thermal_instruments }">
          {{ thermal_instruments.model_no }}
        </template>
        <template v-slot:ranges="{ row: thermal_instruments }">
          {{ thermal_instruments.ranges }}
        </template>
        <template v-slot:accuracy="{ row: thermal_instruments }">
          {{ thermal_instruments.accuracy }}
        </template>
        <template v-slot:serial_no="{ row: thermal_instruments }">
          {{ thermal_instruments.serial_no }}
        </template>
        <!-- defualt data -->
        <template v-slot:make="{ row: thermal_instruments }">
          {{ thermal_instruments.make }}
        </template>
        <template v-slot:calibration_date="{ row: thermal_instruments }">
          {{ thermal_instruments.calibration_date }}
        </template>
        <template v-slot:calibration_due_date="{ row: thermal_instruments }">
          {{ thermal_instruments.calibration_due_date }}
        </template>
      </TableContent>
    </div>
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from "vue";
import { ErrorMessage, Field } from "vee-validate";
import TableContent from "@/components/kt-datatable/table-partials/table-content/TableContent.vue";
import {
  getThermalInstruments,
  deleteThermalInstrument,
  ThermalInstrumentSearch,
  GetIncrInstrumentId,
} from "@/stores/api";
import arraySort from "array-sort";
import moment from "moment";
import Swal from "sweetalert2";

interface Inst {
  id: number;
  instrument_id: string;
}

interface Instrument {
  id: number;
  instrument_id: string;
  name: string;
  model_no: string;
  ranges: string;
  accuracy: string;
  serial_no: string;
  make: string;
  calibration_date: string;
  calibration_due_date: string;
  checked: boolean;
}

export default defineComponent({
  name: "step-2",
  components: {
    Field,
    ErrorMessage,
    TableContent,
  },
  props: ["instruments"],
  emits: ["store-instrument", "remove-instrument", "remove-all-instrument"],
  setup(props, { emit }) {
    const loading = ref(false);

    const tableHeader = ref([
      {
        columnName: "Add",
        columnLabel: "checked",
        sortEnabled: false,
        columnWidth: 80,
      },
      {
        columnName: "Instrument Id",
        columnLabel: "instrument_id",
        sortEnabled: false,
        columnWidth: 35,
      },
      {
        columnName: "Instrument Name",
        columnLabel: "name",
        sortEnabled: false,
        columnWidth: 75,
      },
      {
        columnName: "Model No",
        columnLabel: "model_no",
        sortEnabled: false,
        columnWidth: 80,
      },
      {
        columnName: "Range",
        columnLabel: "ranges",
        sortEnabled: false,
        columnWidth: 80,
      },
      {
        columnName: "Accuray",
        columnLabel: "accuracy",
        sortEnabled: false,
        columnWidth: 80,
      },
      {
        columnName: "Serial No",
        columnLabel: "serial_no",
        sortEnabled: false,
        columnWidth: 80,
      },
      {
        columnName: "Make",
        columnLabel: "make",
        sortEnabled: false,
        columnWidth: 125,
      },
      {
        columnName: "Calibration Date",
        columnLabel: "calibration_date",
        sortEnabled: false,
        columnWidth: 125,
      },
      {
        columnName: "Calibration Due Date",
        columnLabel: "calibration_due_date",
        sortEnabled: false,
        columnWidth: 125,
      },
    ]);

    const selectedIds = ref<Array<number>>([]);

    const disabelRef = ref(true);

    const fromInstrumentId = ref();
    const toInstrumentId = ref();

    const mainData = ref<Instrument[]>([]);
    const tableData = ref<Instrument[]>([]);

    async function thermal_instrument_listing(): Promise<void> {
      try {
        const response = await getThermalInstruments(`fetchAll=true`);

        if (response.result != null && response.result) {
          mainData.value = response.result?.map(
            ({ id, calibration_date, calibration_due_date, ...rest }) => ({
              id: id,
              calibration_date: moment(calibration_date).format("MMMM Do YYYY"),
              calibration_due_date:
                moment(calibration_due_date).format("MMMM Do YYYY"),
              ...rest,
              checked: false,
            })
          );
        }
        // tableData.value = response.result.data.map(
        //   ({ id, calibration_date, calibration_due_date, ...rest }) => ({
        //     id: id,
        //     calibration_date: moment(calibration_date).format("MMMM Do YYYY"),
        //     calibration_due_date:
        //       moment(calibration_due_date).format("MMMM Do YYYY"),
        //     ...rest,
        //   })
        // );
      } catch (error) {
        console.error(error);
      } finally {
        //console.log("done");
        setTimeout(() => {
          loading.value = false;
        }, 100);
      }
    }

    const instrumentsFrom = ref<Inst[]>([]);

    const instrumentsTo = ref<Inst[]>([]);

    const toggleInstrument = (
      event,
      id,
      inst_id,
      inst_name,
      inst_srno,
      inst_calib_date,
      inst_calib_due
    ) => {
      console.log(event.target.checked);

      const data = {
        id: id,
        instrument_id: inst_id,
        instrument_name: inst_name,
        serial_no: inst_srno,
        calibration_date: inst_calib_date,
        calibration_due_date: inst_calib_due,
      };

      if (event.target.checked === true) {
        // store the instrument
        emit("store-instrument", data);
      } else {
        // remove the instrument
        emit("remove-instrument", id);
      }
    };

    const handleFrom = async (id: any) => {
      toInstrumentId.value = "";
      disabelRef.value = false;
      console.log(fromInstrumentId.value);

      const indexOfFrom = instrumentsFrom.value.findIndex(
        (item) => item.id == id
      );
      console.log(indexOfFrom);

      instrumentsTo.value.splice(0);
      tableData.value = [];
      selectedIds.value = [];

      instrumentsTo.value = instrumentsFrom.value.slice(indexOfFrom + 1);

      console.log(instrumentsTo.value);

      await emit("remove-all-instrument", selectedIds.value);
    };

    const handleTo = async (id: any) => {
      console.log(toInstrumentId.value);

      tableData.value = await [];
      selectedIds.value = [];

      const indexOfFrom = instrumentsFrom.value.findIndex(
        (item) => item.id == fromInstrumentId.value
      );

      const indexOfTo = instrumentsFrom.value.findIndex(
        (item) => item.id == toInstrumentId.value
      );

      console.log(indexOfFrom);
      console.log(indexOfTo);

      console.log(tableData.value);
      tableData.value = mainData.value
        .slice(indexOfFrom, indexOfTo + 1)
        .map((item) => ({ ...item, checked: false }));
      console.log(tableData.value);

      await emit("remove-all-instrument", selectedIds.value);
    };

    onMounted(async () => {
      await thermal_instrument_listing();
      instrumentsFrom.value.splice(0);
      instrumentsFrom.value = mainData.value.map(({ id, instrument_id }) => ({
        id,
        instrument_id,
      }));
    });

    return {
      instruments: props.instruments,
      selectedIds,
      tableData,
      loading,
      tableHeader,
      instrumentsFrom,
      instrumentsTo,
      handleFrom,
      handleTo,
      fromInstrumentId,
      toInstrumentId,
      disabelRef,
      toggleInstrument,
    };
  },
});
</script>
