<template>
  <!--begin::Row-->
  <div class="row mb-6 g-5 g-xl-8 justify-content-center align-items-center">
    <!--begin::Col-->
    <div class="col-xl-12">
      <div class="card card-xl-stretch">
        <!--begin::Body-->
        <div class="card-body d-flex flex-column">
          <!--begin::Row-->
          <div class="row g-5 mb-7">
            <!--begin::Col-->
            <div class="col mx-5">
              <div class="fs-6 text-gray-700">PO No.</div>
              <div class="fs-2 fw-bold text-gray-800">
                {{ PoInformationData?.po_number || "" }}
              </div>
            </div>
            <!--end::Col-->

            <!--begin::Col-->
            <div class="col mx-5">
              <div class="fs-6 text-gray-700">Quotation No.</div>
              <div class="fs-2 fw-bold text-gray-800">
                {{ PoInformationData?.quotation_no || "" }}
              </div>
            </div>
            <!--end::Col-->

            <!--begin::Col-->
            <div class="col mx-5">
              <div class="fs-6 text-gray-700">Po Date</div>
              <div class="fs-2 fw-bold text-gray-800">
                {{ PoInformationData?.po_date || "" }}
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Row-->
        </div>
        <!--end::Body-->
      </div>
    </div>
    <!--end::Col-->
  </div>
  <!--end::Row-->

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
          <div class="card-body p-sd-2 p-lg-9">
            <!--begin::Input group-->
            <!--begin::Input group-->
            <div class="row mb-6">
              <!--begin::Col-->
              <div class="col-md-6 fv-row mb-8 mb-sd-8">
                <!--end::Label-->
                <label
                  class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Amount Paid</label
                >
                <!--end::Label-->

                <div class="form-control form-control-lg form-control-solid">
                  {{ itemDetails?.amount_paid || "" }}
                </div>
                <!--end::Input-->
              </div>
              <!--end::Col-->

              <!--begin::Col-->
              <div class="col-md-6 fv-row mb-8 mb-sd-8">
                <!--end::Label-->
                <label
                  class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Payment Method</label
                >
                <!--end::Label-->

                <div>
                  <el-select
                    filterable
                    placeholder="Please Select Payment Type"
                    name="payment_method"
                    v-model="itemDetails.payment_method"
                  >
                    <el-option
                      value=""
                      label="Please Select Payment Type"
                      key=""
                    >
                      Select Payment Type</el-option
                    >
                    <el-option
                      v-for="i in PoPaymentMethod"
                      :key="i.method"
                      :value="i.method"
                      :label="i.method"
                    />
                  </el-select>
                  <!--end::Input-->
                </div>
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->

            <div class="row mb-6">
              <div class="form-group col-md-6 mb-8 mb-sd-8">
                <label
                  class="btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center"
                >
                  <!--begin::Info-->
                  <span class="d-block fw-semobold text-start">
                    <span class="fs-5 fw-bold text-gray-700 text-nowrap"
                      >Payment Date</span
                    >
                    <div class="block">
                      <el-date-picker
                        type="date"
                        name="payment_date"
                        id="payment_date"
                        v-model="itemDetails.payment_date"
                        @change="setDates($event, 'payment_date')"
                        placeholder="Pick Payment Date"
                        :editable="false"
                      />
                    </div>
                  </span>
                  <!--end::Info-->
                </label>
                <div
                  class="fv-plugins-message-container"
                  v-if="!itemDetails.payment_date"
                >
                  <div class="fv-help-block">
                    <ErrorMessage name="payment_date" />
                  </div>
                </div>
              </div>

              <div class="form-group col-md-12 mb-8 mb-sd-8">
                <label
                  class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap"
                  >Payment Status
                </label>
                <div class="input-group gap-6">
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      value="0"
                      v-model="itemDetails.status"
                      id="pending"
                      name="status"
                    />
                    <label
                      for="pending"
                      class="form-check-label fw-bold text-gray-700 text-nowrap"
                      >Pending</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      value="1"
                      v-model="itemDetails.status"
                      id="completed"
                      name="status"
                    />
                    <label
                      for="completed"
                      class="form-check-label fw-bold text-gray-700 text-nowrap"
                      >Completed</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      value="2"
                      v-model="itemDetails.status"
                      id="failed"
                      name="status"
                    />
                    <label
                      for="failed"
                      class="form-check-label fw-bold text-gray-700 text-nowrap"
                      >Failed</label
                    >
                  </div>
                </div>
              </div>
            </div>

            <!-- extra fields -->
            <div class="row mb-6">
              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Transaction Id (if any)</label
                >
                <Field
                  type="text"
                  as="textarea"
                  name="transaction_reference"
                  rows="3"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter transaction id / reference number..."
                  v-model="itemDetails.transaction_reference"
                />
              </div>
              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Note (if any)</label
                >
                <Field
                  type="text"
                  as="textarea"
                  name="payment_notes"
                  rows="3"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter Payment Note..."
                  v-model="itemDetails.payment_notes"
                />
              </div>
            </div>
            <!--end::Input group-->
          </div>

          <div class="modal-footer flex-center w-100">
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
import { updatePoPayment, getPoPayment } from "@/stores/api";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import { useAuthStore } from "@/stores/auth";
import { useRoute, useRouter } from "vue-router";
import ApiService from "@/core/services/ApiService";
import moment from "moment";

import {
  PoPaymentMethod,
  PoPaymentStatus,
  GetPoPaymentStatus,
} from "@/core/model/popayment";

interface PO {
  id: string;
  po_number: string;
  quotation_no: string;
  remaining_balance: string;
  total: string;
  company_id: string;
}

interface PoPayment {
  id: string;
  purchase_order_id: string;
  amount_paid: string;
  payment_method: string;
  transaction_reference: string;
  payment_date: string;
  payment_notes: string;
  status: string;
  company_id: string;
  created_by: string;
  updated_by: string;
  is_active: string;
}

export default defineComponent({
  name: "po-payment-edit",
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
    const User = auth.GetUser();
    const route = useRoute();
    const itemId = route.params.id;

    const itemDetailsValidator = Yup.object().shape({
    });

    const PoInformationData = ref({
      po_number: "",
      po_date: "",
      quotation_no: "",
      total: "",
    });

    const itemDetails = ref<PoPayment>({
      id: "",
      purchase_order_id: "",
      amount_paid: "",
      payment_method: "",
      transaction_reference: "",
      payment_date: "",
      payment_notes: "",
      status: "",
      company_id: User.company_id,
      created_by: "",
      updated_by: User.id,
      is_active: "1",
    });

    onMounted(async () => {
      try {
        let response = await getPoPayment(itemId.toString());

        if (response.success) {
          itemDetails.value = {
            id: response.result.id,
            purchase_order_id: response.result.purchase_order_id,
            amount_paid: response.result.amount_paid,
            payment_method: response.result.payment_method,
            payment_date: response.result.payment_date,
            payment_notes: response.result.payment_notes,
            transaction_reference: response.result.transaction_reference,
            status: response.result.status,
            company_id: response.result.company_id
              ? response.result.company_id
              : "",
            created_by: response.result.created_by,
            updated_by: response.result.created_by,
            is_active: response.result.is_active,
          };

          PoInformationData.value.po_number = response.result.purchase_order
            ? response.result.purchase_order?.po_number
            : "";
          PoInformationData.value.po_date = response.result.purchase_order
            ? response.result.purchase_order?.po_date
            : "";
          PoInformationData.value.quotation_no = response.result.purchase_order
            ? response.result.purchase_order?.quotation_no
            : "";
          PoInformationData.value.total = response.result.purchase_order
            ? response.result.purchase_order?.total
            : "";
        } else {
          console.error(
            `Error Occured in getPoPayment : ${
              response.message || "Error Occured in API"
            }`
          );
        }
      } catch (err) {
        console.error(`Error Occured in getPoPayment : ${err}`);
      }
    });

    const validateForm = (formData) => {
      for (const key in formData) {
        let value = formData[key];
        if (key !== "transaction_reference" && key !== "payment_notes") {
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
        const response = await updatePoPayment(itemId, itemDetails.value);
        if (response?.success) {
          showSuccessAlert(
            "Success",
            response.message || "Po Payment has been successfully updated!"
          );
          loading.value = false;
          router.push({ name: "po-payment-list" });
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
      PoPaymentStatus,
      PoPaymentMethod,
      GetPoPaymentStatus,
      PoInformationData,
    };
  },
});
</script>
    