<template>
  <div
    class="modal fade"
    tabindex="-1"
    id="kt_modal_tax"
    ref="newAddressModalRef"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <VForm
          class="form"
          :validation-schema="companyTaxValidator"
          novalidate
          @submit="onsubmit"
        >
          <div class="modal-header">
            <h3 class="modal-title">Add Your Tax/GST</h3>

            <!--begin::Close-->
            <div
              class="btn btn-icon btn-sm btn-active-light-primary ms-2"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i class="ki-duotone ki-cross fs-1"
                ><span class="path1"></span><span class="path2"></span
              ></i>
            </div>
            <!--end::Close-->
          </div>

          <div class="modal-body">
            <div class="row mb-6">
              <div class="container-fluid">
                <div class="alert alert-primary mt-2">
                  <h3>Note</h3>
                  <h5 class="mt-6 text-primary">
                    If the tax type is CGST + SGST (Central & State Goods and
                    Services Tax), then you must type it as "(CGST + SGST)"
                  </h5>
                </div>
              </div>
            </div>
            <div class="row mb-6">
              <div class="form-group col-md-12">
                <label
                  class="col-lg-4 col-form-label text-nowrap required fw-bold text-gray-700 fw-semobold fs-6"
                  >Tax Type</label
                >
                <Field
                  type="text"
                  name="tax_type"
                  v-model="itemDetails.tax_type"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter Tax Name..."
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="tax_type" />
                  </div>
                </div>
              </div>
            </div>
            <div class="row mb-6">
              <div class="form-group col-md-12">
                <label
                  class="col-lg-4 col-form-label text-nowrap required fw-bold text-gray-700 fw-semobold fs-6"
                  >Tax Rate</label
                >
                <Field
                  type="text"
                  name="tax_rate"
                  v-model="itemDetails.tax_rate"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Tax Rate"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="tax_rate" />
                  </div>
                </div>
              </div>
            </div>

            <div class="row mb-6">
              <div class="form-group col-md-12">
                <label
                  class="col-lg-4 col-form-label text-nowrap required fw-bold text-gray-700 fw-semobold fs-6"
                  >Tax Description</label
                >
                <Field
                  type="text"
                  as="textarea"
                  rows="2"
                  name="tax_description"
                  v-model="itemDetails.tax_description"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter Tax Description..."
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="tax_description" />
                  </div>
                </div>
              </div>
            </div>
            <!--end::Input group-->
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-light" data-bs-dismiss="modal">
              Close
            </button>

            <!--begin::Button-->
            <button
              ref="submitButtonRef"
              type="submit"
              :data-kt-indicator="loading ? 'on' : ''"
              id="kt_modal_new_address_submit"
              class="btn btn-success px-6"
            >
              <span v-if="!loading" class="indicator-label"> Add Tax</span>
              <span v-if="loading" class="indicator-progress">
                Please wait...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </button>
            <!--end::Button-->
          </div>
        </VForm>
      </div>
    </div>
  </div>

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
            placeholder="Search Tax Name"
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
          <!--begin::Add-->
          <button
            type="button"
            class="btn btn-primary me-3"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_tax"
          >
            <KTIcon icon-name="plus" icon-class="fs-2" />
            Tax
          </button>
          <!--end::Add-->
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
          <button type="button" class="btn btn-danger" @click="deleteFewItem()">
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
      <CompanyTaxEditModal
        @reloadData="reLoadData"
        v-bind:data="itemData"
      ></CompanyTaxEditModal>

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
        <template v-slot:id="{ row: company_tax }">
          {{ company_tax.id }}
        </template>
        <template v-slot:tax_type="{ row: company_tax }">
          {{ company_tax.tax_type }}
        </template>
        <template v-slot:tax_description="{ row: company_tax }">
          {{ company_tax.tax_description }}
        </template>
        <template v-slot:tax_rate="{ row: company_tax }">
          {{ company_tax.tax_rate }}
        </template>
        <template v-slot:actions="{ row: company_tax }">
          <!--begin::Menu Flex-->
          <div class="d-flex flex-lg-row my-3">
            <!--begin::Edit-->
            <span
              class="btn btn-icon btn-active-light-primary w-30px h-30px me-3"
              data-bs-toggle="modal"
              v-tooltip
              title="View Training"
              data-bs-target="#kt_modal_tax_edit"
              @click="fillItemData(company_tax)"
            >
              <KTIcon icon-name="pencil" icon-class="fs-2" />
            </span>

            <!--begin::Delete-->
            <span
              @click="deleteItem(company_tax.id, false)"
              class="btn btn-icon btn-active-light-danger w-30px h-30px me-3"
              v-tooltip
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
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import type { ICompanyTax } from "@/core/model/company_tax";
import arraySort from "array-sort";
import ApiService from "@/core/services/ApiService";
import moment from "moment";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useRoute, useRouter } from "vue-router";
import * as Yup from "yup";
import CompanyTaxEditModal from "./CompanyTaxEditModal.vue";
import { hideModal } from "@/core/helpers/dom";
import {
  addCompanyTax,
  deleteCompanyTax,
  getCompanyTaxes,
  CompanyTaxSearch,
} from "@/stores/api";
import { useAuthStore } from "@/stores/auth";

export default defineComponent({
  name: "company-tax",
  components: {
    Datatable,
    ErrorMessage,
    Field,
    VForm,
    CompanyTaxEditModal,
  },
  setup() {
    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const newAddressModalRef = ref<null | HTMLElement>(null);

    const auth = useAuthStore();
    const User = auth.GetUser();
    const route = useRoute();
    const router = useRouter();

    const companyTaxValidator = Yup.object().shape({
      tax_type: Yup.string().required().label("Tax type"),
      tax_description: Yup.string().required().label("Tax Description"),
      tax_rate: Yup.number()
        .required("Tax Rate is required.") // Custom message for required field
        .min(0, "Rate cannot be negative.") // Ensures value is not negative
        .label("Tax"),
    });

    // permission
    const itemDetails = ref({
      tax_type: "",
      tax_description: "",
      tax_rate: 0,
      tax_amount: 0,
      company_id: User.company_id,
    });

    const itemData = ref({
      id: "",
      tax_type: "",
      tax_description: "",
      tax_rate: 0,
      tax_amount: 0,
      company_id: "",
    });

    const tableHeader = ref([
      {
        columnName: "Tax Type",
        columnLabel: "tax_type",
        sortEnabled: true,
        columnWidth: 100,
      },
      {
        columnName: "Tax Description",
        columnLabel: "tax_description",
        sortEnabled: true,
        columnWidth: 100,
      },
      {
        columnName: "Tax Rate",
        columnLabel: "tax_rate",
        sortEnabled: true,
        columnWidth: 100,
      },
      {
        columnName: "Actions",
        columnLabel: "actions",
        sortEnabled: false,
        columnWidth: 75,
      },
    ]);

    const selectedIds = ref<Array<number>>([]);
    const tableData = ref<Array<ICompanyTax>>([]);
    const initvalues = ref<Array<ICompanyTax>>([]);

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
        const response = await getCompanyTaxes(
          `page=${page}&limit=${limit.value}`
        );

        if (response.success) {
          more.value = response.result.next_page_url != null ? true : false;
          tableData.value = response.result.data.map(({ ...rest }) => ({
            ...rest,
          }));
          initvalues.value.splice(
            0,
            tableData.value.length,
            ...tableData.value
          );
        }
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
        const response = await getCompanyTaxes(
          `page=${page.value}&limit=${limit}`
        );

        if (response.success) {
          more.value = response.result.next_page_url != null ? true : false;
          tableData.value = response.result.data.map(({ ...rest }) => ({
            ...rest,
          }));
          initvalues.value.splice(
            0,
            tableData.value.length,
            ...tableData.value
          );
        }
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
    const tax_listing = async () => {
      try {
        ApiService.setHeader();
        const response = await getCompanyTaxes(
          `page=${page.value}&limit=${limit.value}`
        );

        if (response.success) {
          more.value = response.result.next_page_url != null ? true : false;
          tableData.value = response.result.data.map(({ ...rest }) => ({
            ...rest,
          }));
          initvalues.value.splice(
            0,
            tableData.value.length,
            ...tableData.value
          );
        }
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
      await tax_listing();
      setTimeout(() => {
        loading.value = false;
      }, 250);
    });

    const deleteFewItem = async () => {
      try {
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "You will not be able to recover from this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "red",
          confirmButtonText: "Yes, I am sure!",
          cancelButtonText: "No, cancel it!",
        });

        if (result.isConfirmed) {
          let allSuccess = true;
          let finalMessage = "Selected items deleted successfully.";

          for (const id of selectedIds.value) {
            const response = await deleteItem(id, true);
            if (!response.success) {
              allSuccess = false;
              finalMessage =
                response.message ||
                "An error occurred while deleting some items.";
              break;
            }
          }

          selectedIds.value.length = 0;

          if (allSuccess) {
            showSuccessAlert("Success", finalMessage);
          } else {
            showErrorAlert("Error", finalMessage);
          }
        }
      } catch (error: any) {
        const errorMessage = error.message || "An unknown error occurred";
        showErrorAlert("Error", errorMessage);
      }
    };

    const deleteItem = async (id: number, mul: boolean) => {
      const deleteConfirmation = async () => {
        try {
          const result = await Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover from this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "red",
            confirmButtonText: "Yes, I am sure!",
          });
          return result.isConfirmed;
        } catch (error: any) {
          const errorMessage = error.message || "An unknown error occurred";
          showErrorAlert("Error", errorMessage);
          return false;
        }
      };

      const deleteFromTable = async (id: number) => {
        try {
          const response = await deleteCompanyTax(id);
          if (response?.success) {
            const index = tableData.value.findIndex((item) => item.id === id);
            if (index !== -1) {
              tableData.value.splice(index, 1);
              // console.log(`Item with id ${id} deleted successfully`);
            }
            showSuccessAlert(
              "Success",
              response.message || `Item with id ${id} deleted successfully.`
            );
            return { success: true };
          } else {
            throw new Error(
              response?.message || `Failed to delete the item with id ${id}`
            );
          }
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "An unknown error occurred";
          showErrorAlert("Error", errorMessage);
          return { success: false, message: errorMessage };
        }
      };

      if (!mul) {
        const isConfirmed = await deleteConfirmation();
        if (isConfirmed) {
          return await deleteFromTable(id);
        } else {
          return { success: false };
        }
      } else {
        return await deleteFromTable(id);
      }
    };

    const search = ref<string>("");

    // ? debounce timer
    let debounceTimer;
    const searchItems = async () => {
      tableData.value.splice(0, tableData.value.length, ...initvalues.value);
      if (search.value !== "") {
        let results: Array<ICompanyTax> = [];
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
        await tax_listing();
      }
    };

    async function SearchMore() {
      // Your API call logic here
      try {
        ApiService.setHeader();
        const response = await CompanyTaxSearch(search.value);

        if (response.success) {
          more.value = response.result.next_page_url != null ? true : false;
          tableData.value = response.result.data.map(({ ...rest }) => ({
            ...rest,
          }));
          initvalues.value.splice(
            0,
            tableData.value.length,
            ...tableData.value
          );
        }
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

    const validateForm = (formData) => {
      for (const key in formData) {
        let value = formData[key];
        if (Array.isArray(value)) {
          for (const item of value) {
            if (!validateForm(item)) {
              return false;
            }
          }
        } else if (typeof value === "object" && value !== null) {
          if (!validateForm(value)) {
            return false;
          }
        } else if (typeof value === "string") {
          value = value.trim();
          if (value === "") {
            return false;
          }
        } else {
        }
      }
      return true;
    };

    const onsubmit = async () => {
      console.log(itemDetails.value);
      loading.value = true;

      //   console.warn("Nice");
      try {
        const result = validateForm(itemDetails);

        if (result == false) {
          loading.value = true;
          showErrorAlert("Warning", "Please fill all the details Correctly");
          return;
        }

        const response = await addCompanyTax(itemDetails.value);

        if (response?.success) {
          await clearItemData();
          showSuccessAlert(
            "Success",
            response.message || "Tax added successfully"
          );

          await tax_listing();
          hideModal(newAddressModalRef.value);
        } else {
          showErrorAlert("Error", response.message || "An error occurred.");
          loading.value = false;
          return;
        }
      } catch (error) {
        // Handle any other errors during API call
        // console.error("API call error:", error);
        showErrorAlert("Error", "An error occurred during the API call.");
        await clearItemData();
        console.log(itemDetails.value);
        hideModal(newAddressModalRef.value);
      } finally {
        loading.value = false;
      }
    };

    const clearItemData = () => {
      itemDetails.value = {
        tax_type: "",
        tax_description: "",
        tax_rate: 0,
        tax_amount: 0,
        company_id: User.company_id,
      };
    };

    async function reLoadData() {
      await tax_listing();
    }
    // Function
    const fillItemData = (taxData) => {
      const {
        id,
        tax_type,
        tax_description,
        tax_rate,
        tax_amount,
        company_id,
      } = taxData;

      itemData.value = {
        id,
        tax_type,
        tax_description,
        tax_rate,
        tax_amount,
        company_id,
      };
    };

    return {
      onsubmit,
      companyTaxValidator,
      itemDetails,
      tableData,
      tableHeader,
      deleteItem,
      search,
      searchItems,
      selectedIds,
      deleteFewItem,
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

      submitButtonRef,
      newAddressModalRef,

      itemData,
      fillItemData,
      reLoadData,
    };
  },
});
</script>
    