<template>
  <div class="card">
    <div class="card-header border-0 pt-6">
      <!-- Card title -->
      <div class="card-title">
        <!-- Search -->
        <div class="d-flex align-items-center position-relative my-1">
          <KTIcon icon-name="magnifier" icon-class="fs-1 position-absolute ms-6" />
          <input
            type="text"
            v-model="search"
            @input="searchItems"
            class="form-control form-control-solid w-250px ps-15"
            placeholder="Search Alarms"
          />
        </div>
      </div>
      <!-- Card toolbar -->
      <div class="card-toolbar">
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#add_alarm_modal"
        >
          <KTIcon icon-name="plus" icon-class="fs-2" />
          Add Alarm
        </button>
      </div>
    </div>
    <div class="card-body pt-0">
      <!-- Add Alarm Modal -->
      <AlarmAddModal @add-alarm="addAlarm" />

      <!-- Datatable -->
      <Datatable
        checkbox-label="id"
        @on-sort="sort"
        @on-items-select="onItemSelect"
        :data="tableData"
        :header="tableHeader"
        :checkbox-enabled="true"
        :items-per-page="limit"
        :items-per-page-dropdown-enabled="false"
        :loading="loading"
      >
        <template v-slot:id="{ row: alarm }">
          {{ alarm.id }}
        </template>
        <template v-slot:name="{ row: alarm }">
          {{ alarm.name }}
        </template>
        <template v-slot:device_name="{ row: alarm }">
          {{ alarm.device_name }}
        </template>
        <template v-slot:location="{ row: alarm }">
          {{ alarm.location }}
        </template>
        <template v-slot:parameter="{ row: alarm }">
          {{ alarm.parameter }}
        </template>
        <template v-slot:status="{ row: alarm }">
          <span
            :class="{
              'badge py-3 px-4 fs-7 badge-light-success': alarm.status === 'Active',
              'badge py-3 px-4 fs-7 badge-light-danger': alarm.status === 'Inactive',
            }"
          >
            {{ alarm.status }}
          </span>
        </template>
        <template v-slot:created_at="{ row: alarm }">
          {{ alarm.created_at }}
        </template>
        <template v-slot:last_modified="{ row: alarm }">
          {{ alarm.last_modified }}
        </template>
        <template v-slot:actions="{ row: alarm }">
          <div class="dropdown">
            <a
              href="#"
              class="text-gray-700 hover:text-gray-700  cursor-pointer transition-colors"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              @click.prevent
            >
              <KTIcon icon-name="dots-circle-vertical" icon-class="fs-2x" />
            </a>
            <ul class="dropdown-menu dropdown-menu-end min-w-150px py-2 shadow-sm">
              <li>
                <a
                  class="dropdown-item d-flex align-items-center gap-3 px-4 py-3 hover-bg-light-danger cursor-pointer"
                  @click.prevent="deleteItem(alarm.id)"
                >
                  <KTIcon icon-name="trash" icon-class="fs-3 text-danger" />
                  <span class="text-danger">Delete</span>
                </a>
              </li>
            </ul>
          </div>
        </template>
      </Datatable>
      <div class="d-flex justify-content-between p-2">
        <div>
          <el-select
            class="w-100px rounded-2"
            v-model="limit"
            filterable
            @change="updateLimit"
          >
            <el-option
              v-for="item in limits"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </div>
        <ul class="pagination">
          <li class="paginate_button page-item" style="cursor: auto">
            <span @click="prevPage" class="paginate_button page-link">
              <i class="ki-duotone ki-left fs-2"></i>
            </span>
          </li>
          <li class="paginate_button disabled">
            <span class="paginate_button page-link"> Page - {{ page }} </span>
          </li>
          <li class="paginate_button page-item" style="cursor: pointer">
            <span @click="nextPage" class="paginate_button page-link">
              <i class="ki-duotone ki-right fs-2"></i>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import AlarmAddModal from "./AlarmAddModal.vue";
import Swal from "sweetalert2";
import arraySort from "array-sort";

interface IAlarm {
  id: number;
  name: string;
  device_name: string;
  location: string;
  parameter: string;
  status: string;
  created_at: string;
  last_modified: string;
}

export default defineComponent({
  name: "alarm-listing",
  components: {
    Datatable,
    AlarmAddModal,
  },
  setup() {
    const tableHeader = ref([
      { columnName: "ID", columnLabel: "id", sortEnabled: true, columnWidth: 50 },
      { columnName: "Alarm Name", columnLabel: "name", sortEnabled: true, columnWidth: 150 },
      { columnName: "Device Name", columnLabel: "device_name", sortEnabled: true, columnWidth: 150 },
      { columnName: "Location", columnLabel: "location", sortEnabled: true, columnWidth: 150 },
      { columnName: "Parameter", columnLabel: "parameter", sortEnabled: true, columnWidth: 150 },
      { columnName: "Status", columnLabel: "status", sortEnabled: true, columnWidth: 100 },
      { columnName: "Created At", columnLabel: "created_at", sortEnabled: true, columnWidth: 150 },
      { columnName: "Last Modified", columnLabel: "last_modified", sortEnabled: true, columnWidth: 150 },
      { columnName: "Actions", columnLabel: "actions", sortEnabled: false, columnWidth: 75 },
    ]);

    const dummyData: IAlarm[] = [
      { id: 1, name: "High Temp Alert", device_name: "Sensor A", location: "Room 101", parameter: "Temperature", status: "Active", created_at: "2025-06-20 10:00:00", last_modified: "2025-06-20 10:00:00" },
      { id: 2, name: "Low Pressure", device_name: "Sensor B", location: "Room 102", parameter: "Pressure", status: "Inactive", created_at: "2025-06-21 12:00:00", last_modified: "2025-06-21 12:00:00" },
      { id: 3, name: "Vibration Warning", device_name: "Motor X", location: "Factory Floor", parameter: "Vibration", status: "Active", created_at: "2025-06-22 14:00:00", last_modified: "2025-06-22 14:00:00" },
      { id: 4, name: "Humidity Alert", device_name: "Sensor C", location: "Storage Unit", parameter: "Humidity", status: "Active", created_at: "2025-06-23 09:00:00", last_modified: "2025-06-23 09:00:00" },
      { id: 5, name: "Power Failure", device_name: "UPS 1", location: "Server Room", parameter: "Power", status: "Inactive", created_at: "2025-06-24 11:00:00", last_modified: "2025-06-24 11:00:00" },
      { id: 6, name: "Flow Rate Low", device_name: "Pump Y", location: "Pipeline 1", parameter: "Flow Rate", status: "Active", created_at: "2025-06-25 08:00:00", last_modified: "2025-06-25 08:00:00" },
      { id: 7, name: "Overheat Alert", device_name: "Sensor D", location: "Room 103", parameter: "Temperature", status: "Active", created_at: "2025-06-25 15:00:00", last_modified: "2025-06-25 15:00:00" },
    ];

    const tableData = ref<IAlarm[]>([...dummyData]);
    const initValues = ref<IAlarm[]>([...dummyData]);
    const search = ref<string>("");
    const loading = ref(false);
    const page = ref(1);
    const limit = ref(10);
    const limits = ref([10, 25, 50]);
    const selectedIds = ref<number[]>([]);
    const more = ref(true);

    const addAlarm = (newAlarm: IAlarm) => {
      tableData.value.push(newAlarm);
      initValues.value.push(newAlarm);
      Swal.fire({
        title: "Success",
        text: "Alarm added successfully!",
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: "Ok, got it!",
        customClass: { confirmButton: "btn btn-primary" },
      });
    };

    const deleteItem = async (id: number) => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this alarm!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "red",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
      });

      if (result.isConfirmed) {
        tableData.value = tableData.value.filter((item) => item.id !== id);
        initValues.value = initValues.value.filter((item) => item.id !== id);
        Swal.fire({
          title: "Deleted!",
          text: "Alarm has been deleted.",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          customClass: { confirmButton: "btn btn-primary" },
        });
      }
    };

    const searchItems = () => {
      tableData.value = [...initValues.value];
      if (search.value) {
        tableData.value = tableData.value.filter((item) =>
          Object.values(item).some(
            (val) =>
              typeof val === "string" &&
              val.toLowerCase().includes(search.value.toLowerCase())
          )
        );
      }
    };

    const sort = (sort: { label: string; order: string }) => {
      const reverse = sort.order === "asc";
      if (sort.label) {
        arraySort(tableData.value, sort.label, { reverse });
      }
    };

    const onItemSelect = (selectedItems: number[]) => {
      selectedIds.value = selectedItems;
    };

    const updateLimit = (newLimit: number) => {
      limit.value = newLimit;
      page.value = 1;
      updateTableData();
    };

    const prevPage = () => {
      if (page.value > 1) {
        page.value--;
        updateTableData();
      }
    };

    const nextPage = () => {
      if (more.value) {
        page.value++;
        updateTableData();
      }
    };

    const updateTableData = () => {
      loading.value = true;
      const start = (page.value - 1) * limit.value;
      const end = start + limit.value;
      tableData.value = initValues.value.slice(start, end);
      more.value = end < initValues.value.length;
      setTimeout(() => {
        loading.value = false;
      }, 250);
    };

    return {
      tableData,
      tableHeader,
      search,
      searchItems,
      selectedIds,
      sort,
      onItemSelect,
      loading,
      limit,
      limits,
      prevPage,
      nextPage,
      page,
      addAlarm,
      deleteItem,
      updateLimit,
    };
  },
});
</script>