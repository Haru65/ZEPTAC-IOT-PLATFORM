<template>
  <div>
    <div class="card">
      <div class="card-header border-0 pt-6">
        <!--begin::Card title-->
        <div class="card-title">
          <!--begin::Search-->
          <div class="d-flex align-items-center position-relative my-1">
            <KTIcon
              icon-name="magnifier"
              icon-class="fs-1 position-absolute ms-6"
            />
            <input
              type="text"
              v-model="search"
              @input="searchItems()"
              class="form-control form-control-solid w-250px ps-15"
              placeholder="Search User"
            />
          </div>
          <!--end::Search-->
        </div>
        <!--begin::Card title-->
        <!--begin::Card toolbar-->
        <div class="card-toolbar">
          <!--begin::Toolbar-->
          <div
            v-if="selectedIds.length === 0"
            class="d-flex justify-content-end"
            data-kt-customer-table-toolbar="base"
          >
            <!--begin::Export-->
            <button
              type="button"
              class="btn btn-light-primary me-3"
              data-bs-toggle="modal"
              data-bs-target="#kt_customers_export_modal"
            >
              <KTIcon icon-name="exit-up" icon-class="fs-2" />
              Export
            </button>
            <!--end::Export-->
            <!--begin::Add customer-->
            <router-link to="./add" class="btn btn-primary">
              <KTIcon icon-name="plus" icon-class="fs-2" />
              Add User
            </router-link>

            <!--end::Add customer-->
          </div>
          <!--end::Toolbar-->
          <!--begin::Group actions-->
          <div
            v-else
            class="d-flex justify-content-end align-items-center"
            data-kt-customer-table-toolbar="selected"
          >
            <div class="fw-bold me-5">
              <span class="me-2">{{ selectedIds.length }}</span
              >Selected
            </div>
            <button
              type="button"
              class="btn btn-danger"
              @click="deleteFewCustomers()"
            >
              Delete Selected
            </button>
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
        <Datatable
          @on-sort="sort"
          @on-items-select="onItemSelect"
          :data="tableData"
          :header="tableHeader"
          :enable-items-per-page-dropdown="true"
          :checkbox-enabled="true"
          :loading="loading"
          checkbox-label="id"
        >
          <!-- img data -->
          <template v-slot:name="{ row: user }">
            <div class="d-flex justify-content-start align-items-center">
              <!-- <img :src="user.name" class="w-45px rounded-circle" alt="" /> -->
              <span style="margin-left: 5.5%">
                <span class="text-gray-600 text-hover-primary mb-1">
                  {{ user.first_name + " " + user.last_name }}
                </span>
              </span>
            </div>
          </template>
          <!-- defualt data -->
          <template v-slot:email="{ row: user }">
            <a
              v-bind:href="'mailto:' + user.email"
              class="text-gray-600 text-hover-primary mb-1"
            >
              {{ user.email }}
            </a>
          </template>
          <template v-slot:mobile="{ row: user }">
            {{ user.mobile }}
          </template>
          <template v-slot:role="{ row: user }">
            {{ user.role_id }}
          </template>
          <template v-slot:company_name="{ row: user }">
            {{ user.company_name[0].company_name }}
          </template>
          <template v-slot:created_at="{ row: user }">
            {{ user.created_at }}
          </template>
          <template v-slot:actions="{ row: user }">
            <!--begin::Menu Flex-->
            <div class="d-flex flex-lg-row">
              <span class="menu-link px-3">
                <router-link :to="`./edit/${user.id}`">
                  <i
                    class="las la-edit text-gray-600 text-hover-primary mb-1 fs-1"
                  ></i>
                </router-link>
              </span>
              <span>
                <i
                  @click="deleteCustomer(user.id, false)"
                  class="las la-minus-circle text-gray-600 text-hover-danger mb-1 fs-2"
                ></i>
              </span>
            </div>
            <!--end::Menu FLex-->
          </template>
        </Datatable>
      </div>
    </div>

    <ExportCustomerModal></ExportCustomerModal>
    <AddCustomerModal></AddCustomerModal>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onBeforeMount, onMounted, ref } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import ExportCustomerModal from "@/components/modals/forms/ExportCustomerModal.vue";
import AddCustomerModal from "@/components/modals/forms/AddCustomerModal.vue";
import type { IUser } from "@/core/model/users";
import arraySort from "array-sort";
import moment from "moment";
import { get_role } from "@/core/config/PermissionsRolesConfig";
import { deleteUser, getUsers } from "@/stores/api";
import Swal from "sweetalert2";

export default defineComponent({
  name: "users-listing",
  components: {
    Datatable,
    ExportCustomerModal,
    AddCustomerModal,
  },
  setup() {
    const loading = ref(true);
    const tableHeader = ref([
      {
        columnName: "Name",
        columnLabel: "name",
        sortEnabled: true,
        columnWidth: 155,
      },
      {
        columnName: "Email",
        columnLabel: "email",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Mobile",
        columnLabel: "mobile",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Role",
        columnLabel: "role",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Company Name",
        columnLabel: "company_name",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Created Date",
        columnLabel: "created_at",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Actions",
        columnLabel: "actions",
        sortEnabled: false,
        columnWidth: 75,
      },
    ]);

    // functions
    // get users function
    async function users_listing(): Promise<void> {
      try {
        const response = await getUsers();
        console.log(response);
        tableData.value = response.result.data.map(
          ({ created_at, role_id, ...rest }) => ({
            ...rest,
            created_at: moment(created_at).format("MMMM Do YYYY"),
            role_id: get_role(role_id),
          })
        );
        initCustomers.value.splice(
          0,
          tableData.value.length,
          ...tableData.value
        );
      } catch (error) {
        console.error(error);
      } finally {
        //console.log("done");
      }
    }

    const selectedIds = ref<Array<number>>([]);
    const tableData = ref<Array<IUser>>([]);
    const initCustomers = ref<Array<IUser>>([]);

    onBeforeMount(async () => {
      await users_listing();
      setTimeout(() => {
        loading.value = false;
      }, 250);
    });

    onMounted(async () => {
      //console.log("done");
    });

    const deleteFewCustomers = () => {
      Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover from this !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "red",
        confirmButtonText: "Yes, I am sure!",
        cancelButtonText: "No, cancel it!",
      }).then((result: { [x: string]: any }) => {
        if (result["isConfirmed"]) {
          // Put your function here
          selectedIds.value.forEach((item) => {
            deleteCustomer(item, true);
          });
          selectedIds.value.length = 0;
        }
      });
    };

    const deleteCustomer = (id: number, mul: boolean) => {
      if (!mul) {
        for (let i = 0; i < tableData.value.length; i++) {
          if (tableData.value[i].id === id) {
            Swal.fire({
              title: "Are you sure?",
              text: "You will not be able to recover from this !",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "red",
              confirmButtonText: "Yes, I am sure!",
              cancelButtonText: "No, cancel it!",
            }).then((result: { [x: string]: any }) => {
              if (result["isConfirmed"]) {
                // Put your function here
                deleteUser(id);
                tableData.value.splice(i, 1);
              }
            });
          }
        }
      } else {
        for (let i = 0; i < tableData.value.length; i++) {
          if (tableData.value[i].id === id) {
            // Put your function here
            deleteUser(id);
            tableData.value.splice(i, 1);
          }
        }
      }
    };

    const search = ref<string>("");
    const searchItems = () => {
      tableData.value.splice(0, tableData.value.length, ...initCustomers.value);
      if (search.value !== "") {
        let results: Array<IUser> = [];
        for (let j = 0; j < tableData.value.length; j++) {
          if (searchingFunc(tableData.value[j], search.value)) {
            results.push(tableData.value[j]);
          }
        }
        tableData.value.splice(0, tableData.value.length, ...results);
      }
    };

    const searchingFunc = (obj: any, value: string): boolean => {
      for (let key in obj) {
        if (!Number.isInteger(obj[key]) && !(typeof obj[key] === "object")) {
          if (obj[key].indexOf(value) != -1) {
            return true;
          }
        }
      }
      return false;
    };

    const sort = (sort: Sort) => {
      const reverse: boolean = sort.order === "asc";
      if (sort.label) {
        arraySort(tableData.value, sort.label, { reverse });
      }
    };
    const onItemSelect = (selectedItems: Array<number>) => {
      selectedIds.value = selectedItems;
    };

    return {
      tableData,
      tableHeader,
      deleteCustomer,
      search,
      searchItems,
      selectedIds,
      deleteFewCustomers,
      sort,
      onItemSelect,
      getAssetPath,
      users_listing,
      loading,
    };
  },
});
</script>
