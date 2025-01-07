<template>
  <div
    class="modal fade"
    tabindex="-1"
    id="kt_modal_tax_edit"
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
            <h3 class="modal-title">Update Your Tax/GST</h3>

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
                  v-model="itemData.tax_type"
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
                  v-model="itemData.tax_rate"
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
                  v-model="itemData.tax_description"
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
              :data-kt-indicator="dataLoading ? 'on' : ''"
              id="kt_modal_new_address_submit"
              class="btn btn-success px-6"
            >
              <span v-if="!dataLoading" class="indicator-label"> Add Tax</span>
              <span v-if="dataLoading" class="indicator-progress">
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
</template>
          
          <script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";
import moment from "moment";
import Loading from "@/components/kt-datatable/table-partials/Loading.vue";
import { updateCompanyTax } from "@/stores/api";

export default defineComponent({
  name: "company-tax-edit-modal",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },

  emits: ["reloadData"],
  props: ["data"],

  setup(props, { emit }) {
    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const newAddressModalRef = ref<null | HTMLElement>(null);

    const dataLoading = ref(false);

    const itemData = ref({
      id: "",
      tax_type: "",
      tax_description: "",
      tax_rate: 0,
      tax_amount: 0,
      company_id: "",
    });

    const companyTaxValidator = Yup.object().shape({
      tax_type: Yup.string().required().label("Tax type"),
      tax_description: Yup.string().required().label("Tax Description"),
      tax_rate: Yup.number()
        .required("Tax Rate is required.") // Custom message for required field
        .min(0, "Rate cannot be negative.") // Ensures value is not negative
        .label("Tax"),
    });

    onMounted(async () => {
      // Watch for changes in props.data and update itemData accordingly
      watch(
        () => props.data,
        (newValue) => {
          itemData.value = { ...newValue };
        }
      );
    });

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
      console.log(itemData.value);
      dataLoading.value = true;

      //   console.warn("Nice");
      try {
        const result = validateForm(itemData);

        if (result == false) {
          dataLoading.value = true;
          showErrorAlert("Warning", "Please fill all the details Correctly");
          return;
        }

        const response = await updateCompanyTax(
          itemData.value.id,
          itemData.value
        );

        if (response?.success) {
          await emit("reloadData", itemData.value);

          showSuccessAlert(
            "Success",
            response.message || "Tax details updated Successfully!"
          );
          await clearItemData();
          console.log(itemData.value);
          hideModal(newAddressModalRef.value);
        } else {
          showErrorAlert("Error", response.message || "An error occurred.");
          dataLoading.value = false;
          return;
        }
      } catch (error) {
        // Handle any other errors during API call
        // console.error("API call error:", error);
        showErrorAlert("Error", "An error occurred during the API call.");
        await clearItemData();
        console.log(itemData.value);
        hideModal(newAddressModalRef.value);
      } finally {
        dataLoading.value = false;
      }
    };

    const clearItemData = () => {
      itemData.value = {
        id: "",
        tax_type: "",
        tax_description: "",
        tax_rate: 0,
        tax_amount: 0,
        company_id: "",
      };
    };

    return {
      companyTaxValidator,
      itemData,
      onsubmit,
      submitButtonRef,
      newAddressModalRef,
      clearItemData,
      data: props.data,
      dataLoading,
    };
  },
});
</script>
          
          