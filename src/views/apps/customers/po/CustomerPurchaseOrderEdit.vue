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
          :validation-schema="itemDetailsValidator"
          @submit="submit"
        >
          <!--begin::Card body-->
          <div class="card-body border-top p-sd-2 p-lg-9">
            <!--begin::Input group-->
            <div class="row mb-6">
              <!--begin::Col-->
              <div class="col-md-6 fv-row mb-8 mb-sd-8">
                <!--begin::Label-->
                <label
                  class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >PO Number</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <Field
                  type="text"
                  name="po_number"
                  v-model="itemDetails.po_number"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter PO Number"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="po_number" />
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
                  >PO Date</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-date-picker
                  type="date"
                  name="po_date"
                  id="po_date"
                  v-model="itemDetails.po_date"
                  @change="setDates($event, 'po_date')"
                  placeholder="Pick a day"
                  :editable="false"
                />
                <div
                  class="fv-plugins-message-container mt-3"
                  v-if="!itemDetails.po_date"
                >
                  <div class="fv-help-block">
                    <ErrorMessage name="po_date" />
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
                <!--end::Label-->
                <label
                  class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >PO Amount</label
                >
                <!--end::Label-->

                <Field
                  type="text"
                  name="total"
                  class="form-control form-control-lg form-control-solid"
                  v-model="itemDetails.total"
                  placeholder="Enter total amount"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="total" />
                  </div>
                </div>
                <!--end::Input-->
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->

            <div class="row mb-6" v-if="itemDetails.po_file == ''">
              <div class="form-group col-md-12 mb-8 mb-sd-8">
                <label
                  class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap"
                >
                  Upload File
                </label>
                <div class="position-relative">
                  <label
                    class="w-100 min-h-100px btn btn-outline btn-outline-dashed btn-outline-default d-flex align-items-center position-relative"
                  >
                    <div
                      class="m-6 position-absolute fs-1 top-50 start-50 translate-middle"
                    >
                      <i class="bi bi-upload fs-1"></i>

                      <p class="fs-3 text-gray-700">Browse File to upload</p>
                    </div>
                    <input
                      type="file"
                      @change="handleFileChange"
                      accept=".pdf"
                      class="position-absolute top-0 start-0 end-0 bottom-0 opacity-0 w-100 h-100"
                    />
                  </label>
                </div>
                <div
                  v-if="
                    uploadProgress &&
                    uploadProgress > 0 &&
                    uploadProgress <= 100
                  "
                  class="h-10px min-w-100 d-flex flex-stack py-4"
                >
                  <div
                    class="progress progress-bar bg-primary d-flex align-items-center justify-content-center"
                    role="progressbar"
                    :style="`width: ${uploadProgress}%`"
                    :aria-valuenow="uploadProgress"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                  <div class="d-flex flex-column align-items-end ms-2">
                    {{ `${uploadProgress}%` }}
                  </div>
                </div>
              </div>
            </div>

            <div
              v-if="itemDetails.po_file != '' && data.file_name == ''"
              class="notice d-flex bg-light-primary rounded border-primary border border min-w-lg-600px flex-shrink-0 p-6"
            >
              <!--begin::Icon-->
              <KTIcon icon-name="file" icon-class="fs-2tx text-primary me-4" />
              <!--end::Icon-->

              <!--begin::Wrapper-->
              <div
                class="d-flex flex-stack flex-grow-1 flex-wrap flex-md-nowrap"
              >
                <!--begin::Content-->
                <div class="mb-3 mb-md-0 fw-semobold">
                  <h4 class="text-gray-800 fw-bold cursor-pointer">
                    <a
                      target="blank"
                      v-bind:href="`https://api.zeptac.com/storage/company/${itemDetails.company_id}/purchase_orders/${itemDetails.po_file}`"
                      data-toggle="tooltip"
                      title="preview file"
                      class="underline"
                      >{{ itemDetails.po_file }}
                    </a>
                  </h4>
                </div>
                <!--end::Content-->

                <!--begin::Action-->

                <KTIcon
                  data-toggle="tooltip"
                  title="remove file"
                  icon-name="cross"
                  class="cursor-pointer fs-2tx text-danger rounded"
                  @click="removeFileFromTemp"
                  icon-class="fs-1"
                />
                <!--end::Action-->
              </div>
              <!--end::Wrapper-->
            </div>
            <div
              v-else-if="data.file_name != ''"
              class="notice d-flex bg-light-primary rounded border-primary border min-w-lg-600px flex-shrink-0 p-6"
            >
              <!--begin::Icon-->
              <KTIcon icon-name="file" icon-class="fs-2tx text-primary me-4" />
              <!--end::Icon-->

              <!--begin::Wrapper-->
              <div
                class="d-flex flex-stack flex-grow-1 flex-wrap flex-md-nowrap"
              >
                <!--begin::Content-->
                <div class="mb-3 mb-md-0 fw-semobold">
                  <h4 class="text-gray-800 fw-bold cursor-pointer">
                    <a
                      target="blank"
                      v-bind:href="`https://api.zeptac.com/storage/temporary/${itemDetails.po_file}`"
                      data-toggle="tooltip"
                      title="preview file"
                      class="underline"
                      >{{ itemDetails.po_file }}
                    </a>
                  </h4>

                  <div class="fs-6 text-gray-600 pe-7">
                    {{ data.file_size.toFixed(2) }} MB
                  </div>
                </div>
                <!--end::Content-->

                <!--begin::Action-->

                <KTIcon
                  data-toggle="tooltip"
                  title="remove file"
                  icon-name="cross"
                  class="cursor-pointer fs-2tx text-danger rounded"
                  @click="removeFileFromTemp"
                  icon-class="fs-1"
                />

                <!--end::Action-->
              </div>
              <!--end::Wrapper-->
            </div>
          </div>

          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <button
              id="kt_modal_new_address_submit"
              type="submit"
              ref="submitButtonRef"
              class="btn btn-primary w-sd-25 w-lg-25 me-2 px-6"
            >
              <span class="indicator-label"> Update </span>
              <span class="indicator-progress">
                Please wait...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </button>
            <!--end::Button-->
            <!--end::Input group-->
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
  updatePurchaseOrder,
  purchaseOrderEditable,
  removeImage,
  uploadImage,
} from "@/stores/api";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import { useAuthStore } from "@/stores/auth";
import { useRoute, useRouter } from "vue-router";
import ApiService from "@/core/services/ApiService";
import moment from "moment";

interface PurchaseOrder {
  id: string;
  quotation_id: string;
  quotation_no: string;
  po_number: string;
  po_date: string;

  total: number;

  status: number;

  approval_status: string;
  comment_description: string;

  po_file: string;

  company_id: string;
  created_by: string;
  updated_by: string;
  is_active: string;
}

export default defineComponent({
  name: "customer-purchase-order-edit",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  setup() {
    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const loading = ref(false);
    const auth = useAuthStore();
    const router = useRouter();
    const route = useRoute();
    const User = auth.GetUser();

    const itemId = route.params.id;

    const data = ref({
      file_name: "",
      file_size: 0,
      file: "",
    });

    const itemDetails = ref<PurchaseOrder>({
      id: "",
      quotation_id: "",
      quotation_no: "",
      po_number: "",
      po_date: "",

      total: 0,

      status: 0,

      approval_status: "",
      comment_description: "",

      po_file: "",

      company_id: "",
      created_by: User.id,
      updated_by: User.id,
      is_active: "1",
    });

    const itemDetailsValidator = Yup.object().shape({
      po_number: Yup.string().required().label("Purchase Order Number"),
      total: Yup.number()
        .required("Amount is required.") // Custom message for required field
        .min(0, "Amount cannot be negative.") // Ensures value is not negative
        .label("Amount"),
    });

    const uploadProgress = ref<number>(0);

    const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB

    const handleFileChange = async (event) => {
      const selectedFile = event.target?.files?.[0];

      if (!selectedFile) {
        alert("Please Select a file");
        return;
      }

      if (selectedFile.size > MAX_FILE_SIZE) {
        alert("File size should be less than 2 MB");
        return;
      }

      data.value.file_size = selectedFile.size / (1024 * 1024);

      if (selectedFile.type === "application/pdf") {
        await uploadPDF(selectedFile);
      } else {
        data.value.file = "";
      }

      console.log(data.value);
    };

    const uploadPDF = async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("file_name", data.value.file_name);

      const onUploadProgress = (progressEvent) => {
        const { loaded, total } = progressEvent;
        const percentage = Math.floor((loaded / total) * 100);
        uploadProgress.value = percentage;
      };

      try {
        await simulateUploadProgress();
        const response = await uploadImage(formData, onUploadProgress);
        itemDetails.value.po_file = response.modifiedFileName;
        data.value.file_name = response.modifiedFileName;
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        finalizeProgress();
      }

      data.value.file = file;
    };

    const simulateUploadProgress = async () => {
      uploadProgress.value = 0;
      const interval = setInterval(() => {
        if (uploadProgress.value < 100) {
          uploadProgress.value += 10; // Adjust this value for smoother progress
        } else {
          clearInterval(interval);
        }
      }, 200); // Adjust the interval duration as needed
    };

    const finalizeProgress = () => {
      uploadProgress.value = 100; // Ensure progress bar is complete
      setTimeout(() => {
        uploadProgress.value = 0; // Reset progress bar after a short delay
      }, 100);
    };

    const removeFileFromTemp = async () => {
      if (itemDetails.value.po_file && data.value.file_name === "") {
        var confirmChange = confirm("Do you really want to change file?");
        if (!confirmChange) {
          return;
        }

        itemDetails.value.po_file = "";
        // Continue with the rest of your code here
        return;
      }

      if (itemDetails.value.po_file === "" && data.value.file_name === "") {
        alert("You already removed the file. Please select a new file.");
        return;
      }

      const deleteConfirmation = async () => {
        try {
          const result = await Swal.fire({
            title: "Are you sure?",
            text: "You want to change the file!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "red",
            confirmButtonText: "Yes, I am sure!",
          });
          return result.isConfirmed;
        } catch (error) {
          const errorMessage = "An unknown error occurred";
          showErrorAlert("Error", errorMessage);
          return false;
        }
      };

      const deleteFromServer = async () => {
        try {
          const response = await removeImage(data.value);

          if (response.success) {
            itemDetails.value.po_file = "";
            data.value = {
              file_name: "",
              file_size: 0,
              file: "",
            };

            showSuccessAlert(
              "Success",
              response.message || `File removed successfully.`
            );
            return { success: true };
          } else {
            throw new Error(response.message || "Failed to remove the file.");
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

      const isConfirmed = await deleteConfirmation();
      if (isConfirmed) {
        return await deleteFromServer();
      } else {
        return { success: false };
      }
    };

    onMounted(async () => {
      try {
        const response = await purchaseOrderEditable(itemId.toString());
        if (response?.success) {
          itemDetails.value = {
            id: response.result.id,
            quotation_id: response.result.quotation_id,
            quotation_no: response.result.quotation_no,
            po_number: response.result.po_number,
            po_date: response.result.po_date,
            total: response.result.total,
            status: 0,
            approval_status: "1",
            comment_description: "",
            po_file: response.result.po_file ? response.result.po_file : "",
            company_id: response.result.company_id
              ? response.result.company_id
              : "",
            created_by: response.result.created_by,
            updated_by: response.result.updated_by,
            is_active: response.result.is_active,
          };
        } else {
          console.error(
            `Error Occured in purchaseOrderEditable : ${
              response.message || "Error Occured in API"
            }`
          );
        }
      } catch (err) {
        console.error(`Error Occured in purchaseOrderEditable : ${err}`);
      }
    });

    const validateForm = (formData) => {
      for (const key in formData) {
        let value = formData[key];
        if (key !== "comment_description" && key !== "po_number") {
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
      }
      return true;
    };

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
      const result = validateForm(itemDetails.value);

      if (result == false) {
        loading.value = false;
        showErrorAlert("Warning", "Please fill all the details correctly.");
        return;
      }

      try {
        if (submitButtonRef.value) {
          // Activate indicator
          submitButtonRef.value.setAttribute("data-kt-indicator", "on");
        }

        // Call your API here
        const response = await updatePurchaseOrder(itemId, itemDetails.value);

        if (response?.success) {
          // Handle successful API response
          loading.value = false;
          showSuccessAlert(
            "Success",
            response.message || "Purchase Order updated Successfully!"
          );

          router.push({ name: "customer-purchase-order-list" });
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
        if (submitButtonRef.value) {
          submitButtonRef.value.removeAttribute("data-kt-indicator");
        }
        loading.value = false;
      }
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

    return {
      submitButtonRef,
      itemDetails,
      itemDetailsValidator,
      getAssetPath,
      submit,
      loading,
      setDates,

      handleFileChange,
      uploadProgress,
      data,
      removeFileFromTemp,
    };
  },
});
</script>
    