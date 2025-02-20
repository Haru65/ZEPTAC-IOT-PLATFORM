<template>
  <div style="width: 99%" class="bg-body p-12 rounded">
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Form-->
        <VForm
          id="kt_account_profile_details_form"
          class="form"
          :validation-schema="ItemValidator"
        >
          <!--begin::Card body-->
          <div class="card-body p-sd-2 p-lg-9">
            <div class="row mb-6">
              <div class="container-fluid">
                <div class="alert alert-info text-gray-700 fs-6 font-semibold">
                  <p>Note</p>
                  <ul>
                    <li>Score &gt; 2 : Supplier is approved.</li>
                    <li>Score &le; 2 : Supplier is rejected.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="row mb-6">
              <!--begin::Col-->
              <div class="col-md-6 fv-row mb-8 mb-sd-8">
                <!--begin::Label-->
                <label
                  class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Registration Date</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-date-picker
                  type="date"
                  name="registration_date"
                  id="registration_date"
                  v-model="itemDetails.registration_date"
                  @change="setDates($event, 'registration_date')"
                  placeholder="Pick a day"
                  :editable="false"
                />
                <div
                  class="fv-plugins-message-container mt-3"
                  v-if="!itemDetails.registration_date"
                >
                  <div class="fv-help-block">
                    <ErrorMessage name="registration_date" />
                  </div>
                </div>
                <!--end::Input-->
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="row mb-6">
              <!--begin::Col-->
              <div class="col-md-6 fv-row mb-8 mb-sd-8">
                <!--begin::Label-->
                <label
                  class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Supplier Name</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <Field
                  type="text"
                  name="supplier_name"
                  v-model="itemDetails.supplier_name"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter supplier name"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="supplier_name" />
                  </div>
                </div>
                <!--end::Input-->
              </div>
              <!--end::Col-->
              <!--begin::Col-->
              <div class="col-md-6 fv-row mb-8 mb-sd-8">
                <!--begin::Label-->
                <label
                  class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Supplier Code</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <Field
                  type="text"
                  name="supplier_code"
                  v-model="itemDetails.supplier_code"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter supplier code"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="supplier_code" />
                  </div>
                </div>
                <!--end::Input-->
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->
            <!--begin::Input group-->
            <div class="row mb-6">
              <!--begin::Col-->
              <div class="col-md-6 fv-row mb-8 mb-sd-8">
                <!--begin::Label-->
                <label
                  class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Contact Person</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <Field
                  type="text"
                  name="contact_person"
                  v-model="itemDetails.contact_person"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter contact person name"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="contact_person" />
                  </div>
                </div>
                <!--end::Input-->
              </div>
              <!--end::Col-->
              <!--begin::Col-->
              <div class="col-md-6 fv-row mb-8 mb-sd-8">
                <!--begin::Label-->
                <label
                  class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Contact Number</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <Field
                  type="text"
                  name="contact_number"
                  v-model="itemDetails.contact_number"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter contact person number"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="contact_number" />
                  </div>
                </div>
                <!--end::Input-->
              </div>
              <!--end::Col-->
            </div>

            <div class="row mb-6">
              <!--begin::Col-->
              <div class="col-md-6 fv-row mb-8 mb-sd-8">
                <!--begin::Label-->
                <label
                  class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Email ID</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <Field
                  type="text"
                  name="email"
                  v-model="itemDetails.email"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter Email"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="email" />
                  </div>
                </div>
                <!--end::Input-->
              </div>
              <!--end::Col-->
              <!--begin::Col-->
              <div class="col-md-6 fv-row mb-8 mb-sd-8">
                <!--begin::Label-->
                <label
                  class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Supplier Category</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <div>
                  <el-select
                    filterable
                    placeholder="Please Select Category"
                    disabled
                    v-model="itemDetails.supplier_category"
                  >
                    <el-option
                      value=""
                      disabled="disabled"
                      label="Please Select Category"
                      key=""
                    >
                      Please Select Category</el-option
                    >
                    <el-option
                      v-for="item in SupplierCategory"
                      :key="item.id"
                      :value="item.id"
                      :label="item.category"
                    />
                  </el-select>
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage
                        class="invalid-feedback"
                        name="supplier_category"
                      />
                    </div>
                  </div>
                </div>
                <!--end::Input-->
              </div>
              <!--end::Col-->
            </div>

            <div class="row mb-6">
              <div class="form-group col-lg-12 col-md-12">
                <label
                  class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Product/Service Details</label
                >
                <Field
                  type="text"
                  as="textarea"
                  name="product_service_details"
                  rows="5"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter the product/service detail..."
                  v-model="itemDetails.product_service_details"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="product_service_details" />
                  </div>
                </div>
              </div>
            </div>

            <div class="form-group col-md-6">
              <label
                class="col-lg-4 col-form-label fw-bold text-gray-700 fw-semobold fs-6"
                >Supplier Evaluation</label
              >
            </div>
            <div class="table-responsive">
              <table
                class="table table-rounded table-striped border gy-7 gs-7 text-nowrap"
              >
                <thead>
                  <tr
                    class="fw-semibold fs-6 text-gray-800 border-bottom border-gray-200 text-align-center"
                  >
                    <th class="col-2">No.</th>
                    <th class="col-5">Score</th>
                    <th class="col-5">Remark</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) of itemDetails.evaluation"
                    :key="index"
                  >
                    <td class="align-middle">
                      <span>{{ index + 1 }}</span>
                    </td>
                    <td class="align-middle">
                      <span class="badge py-3 px-4 fs-7 badge-light-primary">{{
                        `${item?.score}`
                      }}</span>
                    </td>
                    <td class="align-middle">
                      <span class="badge py-3 px-4 fs-7 badge-light-primary">{{
                        `${item?.remark}`
                      }}</span>
                    </td>
                    <td>
                      <div class="d-flex flex-lg-row my-3">
                        <!--begin::Delete-->
                        <span
                          @click="deleteItem(item?.id, false)"
                          class="btn btn-icon btn-active-light-danger w-30px h-30px me-3"
                          data-bs-toggle="tooltip"
                          title="Delete Evaluation"
                        >
                          <KTIcon icon-name="trash" icon-class="fs-2" />
                        </span>
                        <!--end::Delete-->
                      </div>
                    </td>
                  </tr>
                  <tr
                    class="text-center"
                    v-if="
                      itemDetails.evaluation == null ||
                      itemDetails.evaluation?.length === 0
                    "
                  >
                    <td
                      colspan="3"
                      class="fw-semibold fs-6 text-gray-800 border-bottom border-gray-200 text-align-center"
                    >
                      No Evalaution Done Yet.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </VForm>
        <!--end::Form-->
      </div>
    </div>
  </div>
</template>
        
        <script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import {
  deleteSupplierEvaluation,
  getSupplier,
  updateSupplier,
} from "@/stores/api";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import { Identifier } from "@/core/config/WhichUserConfig";
import { useAuthStore } from "@/stores/auth";
import { useRouter, useRoute } from "vue-router";
import ApiService from "@/core/services/ApiService";
import moment from "moment";
import { SupplierCategory } from "@/core/model/suppliers";

interface Item {
  registration_date: string;
  supplier_name: string;
  supplier_code: string;
  contact_person: string;
  contact_number: string;
  email: string;
  supplier_category: string;
  product_service_details: string;
  status: string;
  approval_status: string;

  evaluation: {
    id: number;
    supplier_id: string;
    score: string;
    remark: string;
  }[];

  company_id: string;
  created_by: string;
  updated_by: string;
  is_active: string;
}

export default defineComponent({
  name: "supplier-edit",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  setup() {
    const loading = ref(false);
    const auth = useAuthStore();
    const router = useRouter();
    const route = useRoute();
    const User = auth.GetUser();
    const itemId = route.params.id;

    const submitButton = ref<null | HTMLButtonElement>(null);

    const itemDetails = ref<Item>({
      registration_date: "",
      supplier_name: "",
      supplier_code: "",
      contact_person: "",
      contact_number: "",
      email: "",
      supplier_category: "",
      product_service_details: "",
      status: "",
      approval_status: "",

      evaluation: [],

      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
      is_active: "1",
    });

    const ItemValidator = Yup.object().shape({
      supplier_name: Yup.string().required().label("Supplier Name"),
      supplier_code: Yup.string().required().label("Supplier Code"),
      contact_person: Yup.string().required().label("Contact Person"),
      contact_number: Yup.string().required().label("Contact Number"),
      email: Yup.string().required().label("Email"),
      product_service_details: Yup.string().required().label("product/Service"),
    });

    onMounted(async () => {
      try {
        let response = await getSupplier(itemId.toString());

        if (response.success) {
          itemDetails.value = {
            registration_date: response.result.registration_date,
            supplier_name: response.result.supplier_name,
            supplier_code: response.result.supplier_code,
            contact_person: response.result.contact_person,
            contact_number: response.result.contact_number,
            email: response.result.email,
            supplier_category: response.result.supplier_category,
            product_service_details: response.result.product_service_details,
            status: response.result.status,
            approval_status: response.result.approval_status,

            evaluation: response.result.evaluation
              ? [response.result.evaluation]
              : [],

            company_id: response.result.company_id
              ? response.result.company_id
              : "",
            created_by: response.result.created_by,
            updated_by: response.result.updated_by,
            is_active: response.result.is_active,
          };
        } else {
          console.error(
            `Error Occured in getSupplier : ${
              response.message || "Error Occured in API"
            }`
          );
        }
      } catch (err) {
        console.error(`Error Occured in getSupplier : ${err}`);
      }
    });

    /* --------SET DATE LOGIC--------*/
    async function setDates(e, dateType) {
      try {
        if (e != null) {
          if (e != "" && e != null) {
            itemDetails.value[dateType] = moment(e).format("YYYY-MM-DD");
          } else {
            itemDetails.value[dateType] = "";
          }
        } else {
          itemDetails.value[dateType] = "";
        }
      } catch (err) {
        itemDetails.value[dateType] = "";
      }

      console.log(itemDetails.value[dateType]);
    }

    const submit = async () => {
      loading.value = true;

      try {
        if (submitButton.value) {
          // Activate indicator
          submitButton.value.setAttribute("data-kt-indicator", "on");
        }

        // Call your API here
        const response = await updateSupplier(itemId, itemDetails.value);

        if (response?.success) {
          // Handle successful API response
          showSuccessAlert(
            "Success",
            response.message || "Supplier has been successfully updated!"
          );
          loading.value = false;
          router.push({ name: "supplier-list" });
        } else {
          // Handle API error response
          loading.value = false;
          showErrorAlert("Error", response.message || "An error occurred.");
        }
      } catch (error) {
        // Handle any other errors during API call
        console.error("API call error:", error);
        showErrorAlert("Error", "An error occurred during the API call.");
      } finally {
        if (submitButton.value) {
          submitButton.value.removeAttribute("data-kt-indicator");
        }
        loading.value = false;
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
          const response = await deleteSupplierEvaluation(id);
          if (response?.success) {
            itemDetails.value.evaluation.splice(0, 1);
            // console.log(`Item with id ${id} deleted successfully`);
            router.push({ name: "supplier-list" });
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

    // Alert functions
    const showSuccessAlert = (title: string, message: string) => {
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

    const showErrorAlert = (title: string, message: string) => {
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

    return {
      itemDetails,
      ItemValidator,
      getAssetPath,
      submit,
      loading,
      setDates,
      SupplierCategory,
      deleteItem,
    };
  },
});
</script>
      