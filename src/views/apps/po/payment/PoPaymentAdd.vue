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
          <div class="card-body p-sd-2 p-lg-9">
            <!--begin::Input group-->

            <div class="row mb-6">
              <!--begin::Label-->
              <label
                class="col-lg-3 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                >Purchase Order</label
              >
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-9 fv-row">
                <el-select
                  v-model="itemDetails.purchase_order_id"
                  filterable
                  placeholder="Select Purchase Order..."
                  @change="SetPurchaseOrder(itemDetails.purchase_order_id)"
                >
                  <el-option key="" value="" label="Select Purchase Order...">
                    Please Select Purchase Order
                  </el-option>
                  <el-option
                    v-for="item in PurchaseOrders"
                    :key="item.id"
                    :label="item.po_number"
                    :value="item.id"
                  />
                </el-select>
                <div
                  class="fv-plugins-message-container"
                  v-if="!itemDetails.purchase_order_id"
                >
                  <div class="fv-help-block">
                    <ErrorMessage name="purchase_order_id" />
                  </div>
                </div>
              </div>
              <!--end::Col-->
            </div>

            <!-- extra fields -->
            <div class="row mb-6">
              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Total Amount</label
                >
                <div class="form-control form-control-lg form-control-solid">
                  {{
                    PoInformationData.total &&
                    !isNaN(Number(PoInformationData.total))
                      ? formatPrice(Number(PoInformationData.total).toString())
                      : ""
                  }}
                </div>
              </div>
              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Remaining Balance</label
                >
                <div class="form-control form-control-lg form-control-solid">
                  {{
                      PoInformationData?.total_paid !== undefined &&
                      PoInformationData?.total_pending !== undefined &&
                      PoInformationData?.total !== undefined
                        ? formatPrice(
                            (
                              Number(PoInformationData.total) -
                              (Number(PoInformationData.total_paid) +
                                Number(PoInformationData.total_pending))
                            ).toString()
                          )
                        : ""
                    }}
                </div>
              </div>
            </div>
            <!--end::Input group-->

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

                <Field
                  type="text"
                  name="amount_paid"
                  class="form-control form-control-lg form-control-solid"
                  v-model="itemDetails.amount_paid"
                  placeholder="0"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="amount_paid" />
                  </div>
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

              <div class="form-group col-md-6 mb-8 mb-sd-8">
                <label
                  class="btn btn-outline btn-outline-dashed btn-outline-default p-5 d-flex align-items-center"
                >
                  <!--begin::Info-->
                  <span class="d-block fw-semobold text-start">
                    <span class="text-gray-700 fw-bold d-block fs-6 mb-2"
                      >Complaint Status</span
                    >
                    <div class="btn-group" role="group">
                      <div v-for="status in PoPaymentStatus" :key="status.id">
                        <input
                          type="radio"
                          class="btn-check"
                          name="status"
                          :id="`${status.id}`"
                          :value="status.id"
                          v-model="itemDetails.status"
                          autocomplete="off"
                        />
                        <label
                          :class="'btn btn-outline-primary'"
                          :for="`${status.id}`"
                        >
                          {{ status.status }}
                        </label>
                      </div>
                    </div>
                  </span>
                  <!--end::Info-->
                </label>
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
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="transaction_reference" />
                  </div>
                </div>
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

          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <button
              type="reset"
              @click="clear"
              id="kt_modal_new_address_cancel"
              class="btn btn-light w-sd-25 w-lg-25 me-3"
            >
              Discard
            </button>
            <!--end::Button-->

            <!--begin::Button-->
            <button
              id="kt_modal_new_address_submit"
              type="submit"
              ref="submitButtonRef"
              class="btn btn-primary w-sd-25 w-lg-25 me-2 px-6"
            >
              <span class="indicator-label"> Save </span>
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
import { getDuePurchaseOrders, addPoPayment } from "@/stores/api";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import packages from "@/core/config/PackagesConfig";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import ApiService from "@/core/services/ApiService";
import moment from "moment";

import {
  PoPaymentMethod,
  PoPaymentStatus,
  GetPoPaymentStatus,
} from "@/core/model/popayment";
import { formatPrice } from "@/core/config/DataFormatter";

interface PO {
  id: string;
  po_number: string;
  quotation_no: string;
  remaining_balance: string;
  total: string;
  total_paid: string;
  total_pending: string;
  company_id: string;
}

interface PoPayment {
  purchase_order_id: string;
  amount_paid: string;
  payment_method: string;
  transaction_reference: string;
  payment_date: string;
  payment_notes: string;
  status: number;
  company_id: string;
  created_by: string;
  updated_by: string;
  is_active: string;
}

export default defineComponent({
  name: "po-payment-add",
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
    let limit = ref(500);

    const PurchaseOrders = ref<PO[]>([]);

    const itemDetailsValidator = Yup.object().shape({
      amount_paid: Yup.number()
        .required("Amount is required.") // Custom message for required field
        .min(0, "Amount cannot be negative.") // Ensures value is not negative
        .label("Amount"),
    });

    const PoInformationData = ref({
      id: "",
      po_number: "",
      quotation_no: "",
      total: "",
      total_paid: "",
      total_pending: "",
      remaining_balance: "",
    });

    const itemDetails = ref<PoPayment>({
      purchase_order_id: "",
      amount_paid: "",
      payment_method: "",
      transaction_reference: "",
      payment_date: "",
      payment_notes: "",
      status: 0,
      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
      is_active: "1",
    });

    /* --------GET ALL DUE PURCHASE ORDERS LOGIC--------*/
    const GetDuePurchaseOrders = async () => {
      try {
        ApiService.setHeader();

        const response = await getDuePurchaseOrders(User.company_id);

        if (response.success) {
          if (response.result != null && response.result) {
            PurchaseOrders.value = response.result.map(({ id, ...rest }) => ({
              id: id,
              ...rest,
            }));
          }
        } else {
          console.error(
            `Error Occured in getDuePurchaseOrders : ${
              response.message || "Error Occured in API"
            }`
          );
        }
      } catch (err) {
        console.error(`Error Occured in getDuePurchaseOrders : ${err}`);
      }
    };

    /* --------HANDLE PO SELECTION LOGIC--------*/
    const SetPurchaseOrder = async (poId: any) => {
      if (poId !== "") {
        try {
          const po = PurchaseOrders.value.find((item) => item.id == poId);

          if (po) {
            PoInformationData.value.id = poId;
            PoInformationData.value.po_number = po.po_number ?? "";
            PoInformationData.value.quotation_no = po.quotation_no ?? "";
            PoInformationData.value.total = po.total ?? "";
            PoInformationData.value.total_paid = po.total_paid ?? "";
            PoInformationData.value.total_pending = po.total_pending ?? "";
            PoInformationData.value.remaining_balance =
              po.remaining_balance ?? "";
          } else {
            PoInformationData.value.id = "";
            PoInformationData.value.po_number = "";
            PoInformationData.value.quotation_no = "";
            PoInformationData.value.total = "";
            PoInformationData.value.remaining_balance = "";
          }
        } catch (err) {
          console.error(`Error Occured in whle setting po details : ${err}`);
        }
      } else {
        PoInformationData.value.id = "";
        PoInformationData.value.po_number = "";
        PoInformationData.value.quotation_no = "";
        PoInformationData.value.total = "";
        PoInformationData.value.remaining_balance = "";
      }
    };

    onMounted(async () => {
      // Calling
      await GetDuePurchaseOrders();
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

        const response = await addPoPayment(itemDetails.value);
        if (response?.success) {
          showSuccessAlert(
            "Success",
            response.message || "Po Payment has been successfully added!"
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

    const clear = () => {
      itemDetails.value = {
        purchase_order_id: "",
        amount_paid: "",
        payment_method: "",
        transaction_reference: "",
        payment_date: "",
        payment_notes: "",
        status: 0,
        company_id: User.company_id,
        created_by: User.id,
        updated_by: User.id,
        is_active: "1",
      };
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
      clear,
      submitButtonRef,
      itemDetails,
      itemDetailsValidator,
      getAssetPath,
      submit,
      loading,
      packages,
      limit,
      setDates,
      PurchaseOrders,
      PoPaymentStatus,
      PoPaymentMethod,
      GetPoPaymentStatus,
      SetPurchaseOrder,
      PoInformationData,
      formatPrice,
    };
  },
});
</script>
  