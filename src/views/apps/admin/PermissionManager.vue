<template>
  <div class="card">
    <Vform
      id="kt_account_profile_details_form"
      class="form card-body"
      novalidate
      :validation-schema="permissionValidator"
    >
      <!--begin::Input group-->
      <div class="mb-6 mt-6">
        <!--begin::Title-->
        <h4 class="fs-5 fw-semobold text-gray-800">Permission Name</h4>
        <!--end::Title-->

        <!--begin::Title-->
        <div class="d-flex gap-6">
          <Field
            type="text"
            name="permission_name"
            class="form-control form-control-lg form-control-solid flex-grow-1"
            placeholder="Enter permission name"
            v-model="permissionDetails.permission_name"
          />
          <button
            @click.prevent="onsubmit"
            class="btn btn-success fw-bold flex-shrink-0"
          >
            Add permission
          </button>
        </div>
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="permission_name" />
          </div>
        </div>
        <!--end::Title-->
      </div>
      <!--end::Input group-->
    </Vform>

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
            placeholder="Search Permission"
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
            @click="deleteFewPermission()"
          >
            Delete Selected
          </button>
        </div>
      </div>
      <!--end::Card toolbar-->
    </div>
    <div class="card-body pt-0">
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
        <template v-slot:id="{ row: permissions }">
          {{ permissions.id }}
        </template>
        <template v-slot:name="{ row: permissions }">
          {{ permissions.name }}
        </template>
        <template v-slot:actions="{ row: permissions }">
          <!--begin::Menu Flex-->
          <div class="d-flex flex-lg-row my-3">
            <!--begin::Delete-->
            <span
              @click="deletepermission(permissions.id, false)"
              class="btn btn-icon btn-active-light-danger w-30px h-30px me-3"
              data-bs-toggle="tooltip"
              title="Delete Permission"
            >
              <KTIcon icon-name="trash" icon-class="fs-2" />
            </span>
            <!--end::Delete-->
          </div>
          <!--end::Menu FLex-->
        </template>
      </Datatable>
      <div class="d-flex justify-content-between p-2">
        <div>
          <el-select
            class="w-100px rounded-2"
            v-model="limit"
            filterable
            @change="PageLimitPoiner(limit)"
          >
            <el-option
              v-for="item in Limits"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </div>
        <ul class="pagination">
          <li class="paginate_button page-item" style="cursor: auto">
            <span @click="PrevPage" class="paginate_button page-link"
              ><i class="ki-duotone ki-left fs-2"><!--v-if--></i></span
            >
          </li>
          <li class="paginate_button disabled">
            <span class="paginate_button page-link"> Page - {{ page }} </span>
          </li>
          <li class="paginate_button page-item" style="cursor: pointer">
            <span @click="NextPage" class="paginate_button page-link"
              ><i class="ki-duotone ki-right fs-2"><!--v-if--></i></span
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
  
  <script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import { ErrorMessage, Field, Form as Vform } from "vee-validate";
import type { IPermissions } from "@/core/model/permissions";
import arraySort from "array-sort";
import ApiService from "@/core/services/ApiService";
import moment from "moment";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useRoute, useRouter } from "vue-router";
import * as Yup from "yup";
import {
  addPermission,
  deletePermission,
  getPermissions,
  PermissionSearch,
} from "@/stores/api";
import { useAuthStore } from "@/stores/auth";

export default defineComponent({
  name: "permission-manager-list",
  components: {
    Datatable,
    ErrorMessage,
    Field,
    Vform,
  },
  setup() {
    const auth = useAuthStore();
    const User = auth.GetUser();
    const route = useRoute();
    const router = useRouter();

    const permissionValidator = Yup.object().shape({
      permission_name: Yup.string().required().label("Permission"),
    });

    // permission
    const permissionDetails = ref({
      permission_name: "",
    });

    const tableHeader = ref([
      {
        columnName: "Permission Id",
        columnLabel: "id",
        sortEnabled: true,
        columnWidth: 75,
      },
      {
        columnName: "Permission Name",
        columnLabel: "name",
        sortEnabled: true,
        columnWidth: 400,
      },
      {
        columnName: "Actions",
        columnLabel: "actions",
        sortEnabled: false,
        columnWidth: 75,
      },
    ]);

    const selectedIds = ref<Array<number>>([]);
    const tableData = ref<Array<IPermissions>>([]);
    const initvalues = ref<Array<IPermissions>>([]);

    // functions
    const Limits = ref({
      1: 10,
      2: 25,
      3: 50,
    });

    const loading = ref(true);
    // staring from 1
    const page = ref(1);
    const limit = ref(10);
    // limit 10
    const more = ref(false);

    const PagePointer = async (page) => {
      // ? Truncate the tableData
      //console.log(limit.value);
      loading.value = true;
      try {
        while (tableData.value.length != 0) tableData.value.pop();
        while (initvalues.value.length != 0) initvalues.value.pop();

        ApiService.setHeader();
        const response = await getPermissions(
          `page=${page}&limit=${limit.value}`
        );
        
        more.value = response.result.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(({ ...rest }) => ({
          ...rest,
        }));
        initvalues.value.splice(0, tableData.value.length, ...tableData.value);
      } catch (error) {
        console.error(error);
      } finally {
        ////console.log("done");
        setTimeout(() => {
          loading.value = false;
        }, 250);
      }
    };

    const PageLimitPoiner = async (limit) => {
      // ? Truncate the tableData
      page.value = 1;
      //console.log(page.value, limit);
      loading.value = true;
      try {
        while (tableData.value.length != 0) tableData.value.pop();
        while (initvalues.value.length != 0) initvalues.value.pop();

        ApiService.setHeader();
        const response = await getPermissions(
          `page=${page.value}&limit=${limit}`
        );
        
        more.value = response.result.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(({ ...rest }) => ({
          ...rest,
        }));
        initvalues.value.splice(0, tableData.value.length, ...tableData.value);
      } catch (error) {
        console.error(error);
      } finally {
        ////console.log("done");
        setTimeout(() => {
          loading.value = false;
        }, 250);
      }
    };

    //console.log(initvalues.value);

    const NextPage = async () => {
      if (more.value != false) {
        page.value = page.value + 1;
        await PagePointer(page.value);
      }
    };

    const PrevPage = async () => {
      if (page.value > 1) {
        page.value = page.value - 1;
        await PagePointer(page.value);
      }
    };

    // get_compaines
    const permission_listing = async () => {
      try {
        ApiService.setHeader();
        const response = await getPermissions(
          `page=${page.value}&limit=${limit.value}`
        );
        
        more.value = response.result.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(({ ...rest }) => ({
          ...rest,
        }));
        initvalues.value.splice(0, tableData.value.length, ...tableData.value);
      } catch (error) {
        console.error(error);
      } finally {
        ////console.log("done");
        setTimeout(() => {
          loading.value = false;
        }, 250);
      }
    };

    onMounted(async () => {
      await permission_listing();
      setTimeout(() => {
        loading.value = false;
      }, 250);
    });

    const deleteFewPermission = () => {
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
            deletepermission(item, true);
          });
          selectedIds.value.length = 0;
        }
      });
    };

    const deletepermission = (id: number, mul: boolean) => {
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
            }).then((result: { [x: string]: any }) => {
              if (result["isConfirmed"]) {
                // Put your function here
                deletePermission(id);
                tableData.value.splice(i, 1);
              }
            });
          }
        }
      } else {
        for (let i = 0; i < tableData.value.length; i++) {
          if (tableData.value[i].id === id) {
            // Put your function here
            deletePermission(id);
            tableData.value.splice(i, 1);
          }
        }
      }
    };

    const search = ref<string>("");

    // ? debounce timer
    let debounceTimer;
    const searchItems = async () => {
      tableData.value.splice(0, tableData.value.length, ...initvalues.value);
      if (search.value !== "") {
        let results: Array<IPermissions> = [];
        // if Search
        for (let j = 0; j < tableData.value.length; j++) {
          if (searchingFunc(tableData.value[j], search.value)) {
            results.push(tableData.value[j]);
          }
        }
        tableData.value.splice(0, tableData.value.length, ...results);
        if (tableData.value.length == 0 && search.value.length != 0) {
          loading.value = true;
          clearTimeout(debounceTimer); // Clear any existing debounce timer
          debounceTimer = setTimeout(async () => {
            await SearchMore();
          }, 1000);
        }
      } else {
        page.value = 1;
        while (tableData.value.length != 0) tableData.value.pop();
        while (initvalues.value.length != 0) initvalues.value.pop();
        await permission_listing();
      }
    };

    async function SearchMore() {
      // Your API call logic here
      try {
        ApiService.setHeader();
        const response = await PermissionSearch(search.value);
        
        more.value = response.result.next_page_url != null ? true : false;
        tableData.value = response.result.data.map(({ ...rest }) => ({
          ...rest,
        }));
        initvalues.value.splice(0, tableData.value.length, ...tableData.value);
      } catch (error) {
        console.error(error);
      } finally {
        //console.log("done");
        setTimeout(() => {
          loading.value = false;
        }, 250);
      }
    }

    const searchingFunc = (obj: any, value: string): boolean => {
      //console.log(initvalues.value);
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

    const showSuccessAlert = (title, message) => {
      Swal.fire({
        title,
        text: message,
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: "Ok, got it!",
        heightAuto: false,
        customClass: {
          confirmButton: "btn btn-primary",
        },
      });
    };

    const showErrorAlert = (title, message) => {
      Swal.fire({
        title,
        text: message,
        icon: "error",
        buttonsStyling: false,
        confirmButtonText: "Ok, got it!",
        heightAuto: false,
        customClass: {
          confirmButton: "btn btn-primary",
        },
      });
    };

    const onsubmit = async () => {
      if (permissionDetails.value.permission_name == "") {
        showErrorAlert("Warning", "Please enter a permission name");
        loading.value = false;
        return;
      }

      try {
        // Call your API here with the form values
        const response = await addPermission(permissionDetails.value);
        // console.log(response.error);
        if (!response.error) {
          // Handle successful API response
          // console.log("API response:", response);
          showSuccessAlert("Success", "Permission added successfully");

          // clear();
          router.push({ name: "permission-manager-list" });
        } else {
          // Handle API error response
          // const errorData = response.error;
          showErrorAlert("Warning", "Please enter a permission name");
        }
      } catch (error) {
        // Handle any other errors during API call
        // console.error("API call error:", error);
        showErrorAlert("Error", "An error occurred during the API call.");
      } finally {
      }
    };
    return {
      onsubmit,
      permissionValidator,
      permissionDetails,
      tableData,
      tableHeader,
      deletepermission,
      search,
      searchItems,
      selectedIds,
      deleteFewPermission,
      sort,
      onItemSelect,
      getAssetPath,
      loading,
      NextPage,
      PrevPage,
      page,
      limit,
      PageLimitPoiner,
      Limits,
      User,
    };
  },
});
</script>
  