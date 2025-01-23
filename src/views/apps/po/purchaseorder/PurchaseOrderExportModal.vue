<template>
  <div
    class="modal fade"
    tabindex="-1"
    id="kt_purcahse_order_export_modal"
    ref="newAddressModalRef"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <VForm class="form" novalidate>
          <div class="modal-header">
            <h3 class="modal-title">Export Purchase Order Data</h3>

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
            <!--begin::Input group-->
            <div class="row mb-6">
              <!--begin::Col-->
              <div class="col-md-6 fv-row mb-8 mb-sd-8">
                <!--begin::Label-->
                <label
                  class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >From Date</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-date-picker
                  type="date"
                  name="from_date"
                  id="from_date"
                  v-model="itemData.from_date"
                  @change="setDates($event, 'from_date')"
                  placeholder="Pick a day"
                  :editable="false"
                />
                <!--end::Input-->
              </div>
              <!--end::Col-->
              <!--begin::Col-->
              <div class="col-md-6 fv-row mb-8 mb-sd-8">
                <!--begin::Label-->
                <label
                  class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Till Date</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-date-picker
                  type="date"
                  name="till_date"
                  id="till_date"
                  v-model="itemData.till_date"
                  @change="setDates($event, 'till_date')"
                  placeholder="Pick a day"
                  :editable="false"
                />

                <!--end::Input-->
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-light" data-bs-dismiss="modal">
              Close
            </button>

            <!-- Export as PDF Button -->
            <button
              type="button"
              class="btn btn-danger px-6"
              :data-kt-indicator="exportLoading ? 'on' : ''"
              @click="onsubmit('pdf')"
            >
              <span v-if="!exportLoading" class="indicator-label"
                >Export as PDF</span
              >
              <span v-if="exportLoading" class="indicator-progress">
                Please wait...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </button>

            <!-- Export as Excel Button -->
            <button
              type="button"
              class="btn btn-success px-6"
              :data-kt-indicator="exportLoading ? 'on' : ''"
              @click="onsubmit('excel')"
            >
              <span v-if="!exportLoading" class="indicator-label"
                >Export as Excel</span
              >
              <span v-if="exportLoading" class="indicator-progress">
                Please wait...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </button>
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
import { ExportPurchaseOrderData } from "@/stores/api";

export default defineComponent({
  name: "purchase-order-export-modal",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },

  setup(props, { emit }) {
    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const newAddressModalRef = ref<null | HTMLElement>(null);

    const exportLoading = ref(false);

    const itemData = ref({
      from_date: "",
      till_date: "",
    });

    /* --------SET DATE LOGIC--------*/
    async function setDates(e, dateType) {
      try {
        if (e != null) {
          if (e != "" && e != null) {
            itemData.value[dateType] = moment(e).format("YYYY-MM-DD");
          } else {
            itemData.value[dateType] = "";
          }
        } else {
          itemData.value[dateType] = "";
        }
      } catch (err) {
        itemData.value[dateType] = "";
      }
      console.log(itemData.value[dateType]);
    }

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

    const onsubmit = async (exportType: "pdf" | "excel") => {
      exportLoading.value = true; // Show the loading spinner or indicator

      try {
        // Validate the form data before proceeding
        const result = validateForm(itemData);

        if (
          result === false ||
          !itemData.value.from_date ||
          !itemData.value.till_date
        ) {
          exportLoading.value = false;
          showErrorAlert(
            "Warning",
            "Please select both From Date and Till Date."
          );
          return;
        }

        // Define the data to send in the request
        const data = {
          from_date: itemData.value.from_date,
          till_date: itemData.value.till_date,
          export_type: exportType, // Specify PDF or Excel
        };

        // Make the API call
        const response = await ExportPurchaseOrderData(data); // This will await the response from the server

        // Check if the response is successful (non-empty Blob data)
        if (!response || response.size === 0) {
          const errorMessage =
            response?.message || "Export failed due to server error.";
          showErrorAlert("Error", errorMessage); // Show specific error
          console.error("Export Error:", errorMessage);
          return;
        }

        // If the file download was successful, trigger the download
        const fileType = data.export_type === "pdf" ? "pdf" : "xlsx"; // Determine the file extension based on export type
        const fileName = `purchase_orders_${moment().format(
          "YYYYMMDD_HHmmss"
        )}.${fileType}`;

        const link = document.createElement("a");
        link.href = URL.createObjectURL(response); // Use the Blob response here
        link.download = fileName; // Set the filename for download
        link.click(); // Trigger the download

        // Show success alert and close modal
        showSuccessAlert(
          "Success",
          `${exportType.toUpperCase()} export successful!`
        );
        hideModal(newAddressModalRef.value); // Close the modal after export
        await clearItemData();
      } catch (error) {
        // If there's an error, display it and stop loading
        showErrorAlert("Error", "An error occurred during the export process.");
        console.error("API call error:", error);
      } finally {
        // Regardless of success or failure, hide the loading indicator
        exportLoading.value = false;
      }
    };

    const clearItemData = () => {
      itemData.value = {
        from_date: "",
        till_date: "",
      };
    };

    return {
      setDates,
      itemData,
      onsubmit,
      submitButtonRef,
      newAddressModalRef,
      clearItemData,
      exportLoading,
    };
  },
});
</script>
              
              