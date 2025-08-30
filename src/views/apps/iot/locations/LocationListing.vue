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
            placeholder="Search Locations"
          />
        </div>
      </div>
      <!-- Card toolbar -->
      <div class="card-toolbar">
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#add_location_modal"
        >
          <KTIcon icon-name="plus" icon-class="fs-2" />
          Add Location
        </button>
      </div>
    </div>
    <div class="card-body pt-0">
      <!-- Add Location Modal -->
      <LocationAddModal @add-location="addLocation" />

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
        <template v-slot:id="{ row: location }">
          {{ location.id }}
        </template>
        <template v-slot:device_name="{ row: location }">
          {{ location.device_name }}
        </template>
        <template v-slot:location_name="{ row: location }">
          {{ location.location_name }}
        </template>
        <template v-slot:parent_location_name="{ row: location }">
          {{ location.parent_location_name || 'None' }}
        </template>
        <template v-slot:actions="{ row: location }">
          <div class="dropdown">
            <a
              href="#"
              class="text-gray-700 hover:text-gray-700 cursor-pointer transition-colors"
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
                  @click.prevent="deleteItem(location.id)"
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
import LocationAddModal from "./LocationAddModal.vue";
import Swal from "sweetalert2";
import arraySort from "array-sort";

interface ILocation {
  id: number;
  device_name: string;
  location_name: string;
  parent_location_name: string | null;
}

export default defineComponent({
  name: "location-listing",
  components: {
    Datatable,
    LocationAddModal,
  },
  setup() {
    const tableHeader = ref([
      { columnName: "ID", columnLabel: "id", sortEnabled: true, columnWidth: 50 },
      { columnName: "Device Name", columnLabel: "device_name", sortEnabled: true, columnWidth: 150 },
      { columnName: "Location Name", columnLabel: "location_name", sortEnabled: true, columnWidth: 150 },
      { columnName: "Parent Location Name", columnLabel: "parent_location_name", sortEnabled: true, columnWidth: 150 },
      { columnName: "Actions", columnLabel: "actions", sortEnabled: false, columnWidth: 75 },
    ]);

    const dummyData: ILocation[] = [
      { id: 1, device_name: "Sensor A", location_name: "Room 101", parent_location_name: null },
      { id: 2, device_name: "Sensor B", location_name: "Room 102", parent_location_name: "Building A" },
      { id: 3, device_name: "Motor X", location_name: "Factory Floor", parent_location_name: null },
      { id: 4, device_name: "Sensor C", location_name: "Storage Unit", parent_location_name: "Warehouse" },
      { id: 5, device_name: "UPS 1", location_name: "Server Room", parent_location_name: "Data Center" },
      { id: 6, device_name: "Pump Y", location_name: "Pipeline 1", parent_location_name: null },
      { id: 7, device_name: "Sensor D", location_name: "Room 103", parent_location_name: "Building B" },
    ];

    const tableData = ref<ILocation[]>([...dummyData]);
    const initValues = ref<ILocation[]>([...dummyData]);
    const search = ref<string>("");
    const loading = ref(false);
    const page = ref(1);
    const limit = ref(10);
    const limits = ref([10, 25, 50]);
    const selectedIds = ref<number[]>([]);
    const more = ref(true);

    const addLocation = (newLocation: ILocation) => {
      tableData.value.push(newLocation);
      initValues.value.push(newLocation);
      Swal.fire({
        title: "Success",
        text: "Location added successfully!",
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: "Ok, got it!",
        customClass: { confirmButton: "btn btn-primary" },
      });
    };

    const deleteItem = async (id: number) => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this location!",
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
          text: "Location has been deleted.",
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
              val && typeof val === "string" &&
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
      addLocation,
      deleteItem,
    };
  },
});
</script>