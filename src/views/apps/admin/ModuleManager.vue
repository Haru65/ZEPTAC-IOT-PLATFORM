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
        <h4 class="fs-5 fw-semobold text-gray-800">Module Name</h4>
        <!--end::Title-->

        <!--begin::Title-->
        <div class="d-flex gap-6">
          <Field
            type="text"
            name="module_name"
            class="form-control form-control-lg form-control-solid flex-grow-1"
            placeholder="Enter module name"
            v-model="itemDetails.module_name"
          />
          <button
            @click.prevent="onsubmit"
            class="btn btn-success fw-bold flex-shrink-0"
          >
            Add Module
          </button>
        </div>
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="module_name" />
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
            placeholder="Search Module"
          />
        </div>
        <!--end::Search-->
      </div>
      <!--begin::Card title-->
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
        <template v-slot:name="{ row: permissions }">
          {{ permissions.name }}
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
import type { IModule } from "@/core/model/module_manager";
import arraySort from "array-sort";
import ApiService from "@/core/services/ApiService";
import moment from "moment";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useRoute, useRouter } from "vue-router";
import * as Yup from "yup";
import { addModule, getModules, ModuleSearch } from "@/stores/api";
import { useAuthStore } from "@/stores/auth";

export default defineComponent({
  name: "module-manager-list",
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
      module_name: Yup.string().required().label("Module"),
    });

    const itemDetails = ref({
      module_name: "",
    });

    const tableHeader = ref([
      {
        columnName: "Module Name",
        columnLabel: "name",
        sortEnabled: true,
        columnWidth: 275,
      },
    ]);

    const selectedIds = ref<Array<number>>([]);
    const tableData = ref<Array<IModule>>([]);
    const initvalues = ref<Array<IModule>>([]);

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
        const response = await getModules(`page=${page}&limit=${limit.value}`);

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
        const response = await getModules(`page=${page.value}&limit=${limit}`);

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
    const module_listing = async () => {
      try {
        ApiService.setHeader();
        const response = await getModules(
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
      await module_listing();
      setTimeout(() => {
        loading.value = false;
      }, 250);
    });

    const search = ref<string>("");

    // ? debounce timer
    let debounceTimer;
    const searchItems = async () => {
      tableData.value.splice(0, tableData.value.length, ...initvalues.value);
      if (search.value !== "") {
        let results: Array<IModule> = [];
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
        await module_listing();
      }
    };

    async function SearchMore() {
      // Your API call logic here
      try {
        ApiService.setHeader();
        const response = await ModuleSearch(search.value);

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
      if (itemDetails.value.module_name == "") {
        showErrorAlert("Warning", "Please enter a module name");
        loading.value = false;
        return;
      }

      try {
        // Call your API here with the form values
        const response = await addModule(itemDetails.value);
        // console.log(response.error);
        if (!response.error) {
          // Handle successful API response
          // console.log("API response:", response);
          showSuccessAlert("Success", "Module added successfully");

          // clear();
          await module_listing();
        } else {
          // Handle API error response
          // const errorData = response.error;
          showErrorAlert("Warning", "Please enter a module name");
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
      itemDetails,
      tableData,
      tableHeader,
      search,
      searchItems,
      selectedIds,
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
  