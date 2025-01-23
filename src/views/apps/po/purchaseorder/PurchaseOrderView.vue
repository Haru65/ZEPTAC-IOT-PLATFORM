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
                {{ itemDetails.po_number }}
              </div>
            </div>
            <!--end::Col-->

            <!--begin::Col-->
            <div class="col mx-5">
              <div class="fs-6 text-gray-700">Quotation No.</div>
              <div class="fs-2 fw-bold text-gray-800">
                {{ itemDetails.quotation_no }}
              </div>
            </div>
            <!--end::Col-->

            <!--begin::Col-->
            <div class="col mx-5">
              <div class="fs-6 text-gray-700">Po Date</div>
              <div class="fs-2 fw-bold text-gray-800">
                {{ itemDetails.po_date }}
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

  <!--begin::Row-->
  <div class="row g-5 g-xl-8 mb-5">
    <!--begin::Col-->
    <div class="col-xl-6">
      <div class="card card-xl-stretch">
        <!--begin::Body-->
        <div class="card-body d-flex flex-column">
          <span class="text-dark fw-bold text-hover-primary fs-4"> From </span>
          <!--begin::Details-->
          <table class="table fs-6 fw-semobold gs-0 gy-2 gx-2 m-0">
            <!--begin::Row-->
            <tr class="h-auto">
              <td class="text-gray-700 min-w-175px">Company Name:</td>
              <td class="text-gray-800">
                {{ itemDetails?.customer_information.company_name || "" }}
              </td>
            </tr>
            <!--end::Row-->

            <!--begin::Row-->
            <tr class="h-auto">
              <td class="text-gray-700">Address:</td>
              <td class="text-gray-800">
                {{ itemDetails?.customer_information.address1 || "" }}
                {{ itemDetails?.customer_information.address2 || "" }}
                {{ itemDetails?.customer_information.city || "" }}
                {{ itemDetails?.customer_information.pincode || "" }}
                {{ itemDetails?.customer_information.state || "" }}
                {{ itemDetails?.customer_information.country || "" }}
                <br />
                GST No:
                {{ itemDetails?.client_information.gst_number || "" }}
              </td>
            </tr>
            <!--end::Row-->
          </table>
          <!--end::Details-->
        </div>
        <!--end::Body-->
      </div>
    </div>
    <!--end::Col-->

    <!--begin::Col-->
    <div class="col-xl-6">
      <div class="card card-xl-stretch mb-xl-8">
        <!--begin::Body-->
        <div class="card-body d-flex flex-column">
          <span class="text-dark fw-bold text-hover-primary fs-4"> To </span>
          <!--begin::Details-->
          <table class="table fs-6 fw-semobold gs-0 gy-2 gx-2 m-0">
            <!--begin::Row-->
            <tr class="h-auto">
              <td class="text-gray-700 min-w-175px">Company Name:</td>
              <td class="text-gray-800">
                {{ itemDetails?.company.company_name || "" }}
              </td>
            </tr>
            <!--end::Row-->

            <!--begin::Row-->
            <tr class="h-auto">
              <td class="text-gray-700">Address:</td>
              <td class="text-gray-800">
                {{ itemDetails?.company.address || "" }}
                <br />
                {{ itemDetails?.company.city || "" }}
                {{ itemDetails?.company.pincode || "" }}
                {{ itemDetails?.company.state || "" }}
                {{ itemDetails?.company.country || "" }}
                <br />GST No:
                {{ itemDetails?.company.gst_details || "" }}
              </td>
            </tr>
            <!--end::Row-->
          </table>
          <!--end::Details-->
        </div>
        <!--end::Body-->
      </div>
    </div>
    <!--end::Col-->
  </div>
  <!--end::Row-->

  <!-- begin:Order -->
  <div class="card pt-3 mb-5 mb-xl-10">
    <div class="card-header">
      <div class="card-title">PO File</div>
      <div class="card-toolbar">
        <a
          class="fs-6 text-decoration-underline fw-semobold"
          target="blank"
          :href="`https://api.zeptac.com/storage/company/${itemDetails?.company_id}/purchase_orders/${itemDetails?.po_file}`"
          >click here to see</a
        >
      </div>
    </div>
    <!--begin::Card body-->
    <div class="card-body pt-3">
      <!--begin::Section-->
      <div class="container">
        <iframe
          loading="loading"
          height="350px"
          class="w-100 h-lg-600px h-sd-400px overflow-auto"
          :src="`https://api.zeptac.com/storage/company/${itemDetails?.company_id}/purchase_orders/${itemDetails?.po_file}`"
          frameborder="0"
        ></iframe>
      </div>
      <!--end::Section-->
    </div>
  </div>
  <!-- end:Order -->

  <!-- begin:Payment -->
  <div class="card pt-3 mb-5 mb-xl-10">
    <div class="card-header">
      <div class="card-title">Payment History</div>
    </div>

    <!--begin::Card body-->
    <div class="card-body">
      <!--begin::Product table-->
      <div
        class="table-responsive overflow-auto mb-6"
        style="max-height: 500px"
      >
        <!--begin::Table-->
        <table class="table align-middle table-row-dashed fs-6 gy-4 mb-0">
          <!--begin::Table head-->
          <thead>
            <!--begin::Table row-->
            <!-- Payment Table Header -->
            <tr
              class="border-bottom border-gray-200 text-start text-gray-700 fw-bold fs-7 text-uppercase gs-0"
            >
              <th class="min-w-50px">Sr.No</th>
              <th class="min-w-100px">Payment Mode</th>
              <th class="min-w-150px">Amount Paid (INR)</th>
              <th class="min-w-100px">Payment Status</th>
              <th class="text-end min-w-100px">Payment Date</th>
            </tr>
            <!--end::Table row-->
          </thead>
          <!--end::Table head-->

          <!--begin::Table body-->
          <tbody class="fw-semobold text-gray-800">
            <!-- Dynamic Payment Rows -->
            <tr v-for="(pymt, index) in itemDetails?.payments" :key="index">
              <td>
                {{ index + 1 }}
              </td>
              <td>
                {{ pymt["payment_method"] ?? "N/A" }}
              </td>
              <td>
                {{ pymt["amount_paid"] ?? "0.00" }}
              </td>
              <td>
                <span
                  v-if="pymt.status == '0'"
                  class="badge py-3 px-4 fs-7 badge-light-primary"
                  >{{ GetPoPaymentStatus(pymt.status) }}</span
                >
                <span
                  v-else-if="pymt.status == '1'"
                  class="badge py-3 px-4 fs-7 badge-light-success"
                  >{{ GetPoPaymentStatus(pymt.status) }}</span
                >
                <span
                  v-else-if="pymt.status == '2'"
                  class="badge py-3 px-4 fs-7 badge-light-danger"
                  >{{ GetPoPaymentStatus(pymt.status) }}</span
                >
                <span v-else> </span>
              </td>
              <td class="text-end">
                {{ pymt["payment_date"] ?? "" }}
              </td>
            </tr>

            <!-- NO PAYMENT -->
            <tr
              v-if="itemDetails?.payments && itemDetails?.payments.length < 1"
            >
              <td class="text-center font-bold" colspan="5">
                No Payment Made yet.
              </td>
            </tr>
          </tbody>
          <!--end::Table body-->
        </table>
        <!--end::Table-->
      </div>
      <!--end::Product table-->
    </div>
  </div>
  <!-- end:Payment -->

  <!--begin::details View-->
  <div class="card mb-5 mb-xl-10">
    <div class="card-header ribbon ribbon-end ribbon-clip">
      <div v-if="itemDetails?.status == '0'" class="ribbon-label">
        Draft
        <span class="ribbon-inner bg-info"></span>
      </div>
      <div v-else-if="itemDetails?.status == '1'" class="ribbon-label">
        Partially Paid
        <span class="ribbon-inner bg-warning"></span>
      </div>
      <div v-else-if="itemDetails?.status == '2'" class="ribbon-label">
        Paid
        <span class="ribbon-inner bg-success"></span>
      </div>
      <div class="card-title">Summary</div>
    </div>

    <div class="card-body">
      <!--begin::Details-->
      <div class="d-flex flex-wrap flex-sm-nowrap mb-3">
        <!--begin::Info-->
        <div class="flex-grow-1">
          <!--begin::Title-->
          <div
            class="d-flex justify-content-between align-items-start flex-wrap mb-2"
          >
            <!--begin::User-->
            <div class="d-flex flex-column">
              <!--begin::Name-->
              <div class="d-flex align-items-center mb-2">
                <span
                  class="text-gray-800 text-hover-primary fs-2 fw-bold me-1"
                >
                  {{ itemDetails?.customer_information.company_name ?? "" }}
                </span>
              </div>
              <!--end::Name-->

              <!--begin::Info-->
              <div class="d-flex flex-wrap fw-semobold fs-6 mb-4 pe-2">
                <span
                  class="d-flex align-items-center text-gray-700 text-hover-primary me-5 mb-2"
                >
                  <KTIcon icon-name="profile-circle" icon-class="fs-4 me-1" />
                  {{ itemDetails?.customer_information.name ?? "" }}
                </span>
                <span
                  class="d-flex align-items-center text-gray-700 text-hover-primary me-5 mb-2"
                >
                  <KTIcon icon-name="whatsapp" icon-class="fs-4 me-1" />
                  {{ itemDetails?.customer_information.mobile ?? "" }}
                </span>
                <span
                  class="d-flex align-items-center text-gray-700 text-hover-primary mb-2"
                >
                  <KTIcon icon-name="sms" icon-class="fs-4 me-1" />
                  {{ itemDetails?.customer_information.email ?? "" }}
                </span>
              </div>
              <!--end::Info-->
            </div>
            <!--end::User-->

            <!--begin::Actions-->
            <div v-if="Identifier == 'Company-Admin'" class="d-flex my-4">
              <router-link
                :to="`/po-payment/direct/${itemDetails.id}`"
                class="btn btn-sm btn-light-primary me-3"
                v-tooltip
                title="Add transaction related to this Purchase Order"
                >Add Payments</router-link
              >
            </div>
            <!--end::Actions-->
          </div>
          <!--end::Title-->

          <!--begin::Row-->
          <div class="row g-5 mb-7">
            <!--begin::Col-->
            <div class="col">
              <div class="fs-6 text-gray-700">PO No.</div>
              <div class="fs-2 fw-bold text-gray-800">
                {{ itemDetails.po_number }}
              </div>
            </div>
            <!--end::Col-->

            <!--begin::Col-->
            <div class="col">
              <div class="fs-6 text-gray-700">Quotation No.</div>
              <div class="fs-2 fw-bold text-gray-800">
                {{ itemDetails.quotation_no }}
              </div>
            </div>
            <!--end::Col-->

            <!--begin::Col-->
            <div class="col">
              <div class="fs-6 text-gray-700">PO Date:</div>
              <div class="fs-2 fw-bold text-gray-800">
                {{ itemDetails.po_date }}
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Row-->

          <!--begin::Stats-->
          <div class="d-flex flex-wrap flex-stack">
            <!--begin::Wrapper-->
            <div class="d-flex flex-column flex-grow-1 pe-8">
              <!--begin::Row-->
              <div class="row m-0">
                <div class="col bg-light-warning px-6 py-8 rounded-2 me-7 mb-7">
                  <p class="fs-2x text-dark d-block my-2">
                    {{
                      itemDetails?.total !== undefined &&
                      !isNaN(Number(itemDetails.total))
                        ? formatPrice(Number(itemDetails.total).toString())
                        : ""
                    }}
                  </p>
                  <span class="text-dark fw-semobold fs-6"> Total Amount </span>
                </div>
                <div class="col bg-light-primary px-6 py-8 rounded-2 me-7 mb-7">
                  <p class="fs-2x text-dark d-block my-2">
                    {{
                      itemDetails?.total_paid !== undefined &&
                      !isNaN(Number(itemDetails.total_paid))
                        ? formatPrice(Number(itemDetails.total_paid).toString())
                        : ""
                    }}
                  </p>
                  <span class="text-dark fw-semobold fs-6">
                    Successfull Payment
                  </span>
                </div>
              </div>
              <!--end::Row-->
              <!--begin::Row-->
              <div class="row m-0">
                <div class="col bg-light-info px-6 py-8 rounded-2 me-7 mb-7">
                  <p class="fs-2x text-dark d-block my-2">
                    {{
                      itemDetails?.total_pending !== undefined &&
                      !isNaN(Number(itemDetails.total_pending))
                        ? formatPrice(
                            Number(itemDetails.total_pending).toString()
                          )
                        : ""
                    }}
                  </p>
                  <span class="text-dark fw-semobold fs-6">
                    Payment in processing
                  </span>
                </div>
                <div class="col bg-light-success px-6 py-8 rounded-2 me-7 mb-7">
                  <p class="fs-2x text-dark d-block my-2">
                    {{
                      itemDetails?.total_paid !== undefined &&
                      itemDetails?.total_pending !== undefined &&
                      itemDetails?.total !== undefined
                        ? formatPrice(
                            (
                              Number(itemDetails.total) -
                              (Number(itemDetails.total_paid) +
                                Number(itemDetails.total_pending))
                            ).toString()
                          )
                        : ""
                    }}
                  </p>
                  <span class="text-dark fw-semobold fs-6"> Balance </span>
                </div>
              </div>
              <!--end::Row-->
            </div>
            <!--end::Wrapper-->
          </div>
          <!--end::Stats-->
        </div>
        <!--end::Info-->
      </div>
      <!--end::Details-->
    </div>
  </div>
  <!--end::details View-->
</template>
    
      
    <script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent, onMounted, ref } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { getPurchaseOrder, updateExpenseSheet } from "@/stores/api";
import ApiService from "@/core/services/ApiService";
import type { PoInfoType } from "@/core/model/po";
import { formatPrice } from "@/core/config/DataFormatter";
import { PoStatus, GetPoStatus } from "@/core/model/po";
import { Identifier } from "@/core/config/WhichUserConfig";
import { GetPoPaymentStatus } from "@/core/model/popayment";

export default defineComponent({
  name: "purchase-order-view",
  components: {},
  props: {
    routeId: { type: String, required: false },
  },
  setup() {
    const loading = ref(false);

    const auth = useAuthStore();
    const route = useRoute();
    const router = useRouter();

    const User = auth.GetUser();
    const itemId = route.params.id;

    const itemDetails = ref<PoInfoType>({
      id: "",
      quotation_id: "",
      quotation_no: "",
      customer_id: "",
      client_id: "",

      customer_information: {
        id: "",
        name: "",
        email: "",
        mobile: "",
        company_name: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
        gst_number: "",
      },

      client_information: {
        id: "",
        name: "",
        email: "",
        mobile: "",
        company_name: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
        gst_number: "",
      },

      po_number: "",
      po_date: "",

      payments: [],

      quotation_total: 0,
      total: 0,

      total_pending: 0,
      total_paid: 0,

      po_file: "",

      remaining_balance: 0,
      status: "",
      approval_status: "",
      comment_description: "",
      company_id: "",

      company: {
        id: "",
        company_name: "",
        company_logo: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
        gst_details: "",
      },
    });

    onMounted(async () => {
      try {
        ApiService.setHeader();
        const response = await getPurchaseOrder(itemId.toString());

        if (response.success) {
          itemDetails.value = { ...response.result };
          itemDetails.value.payments = response.result.payments || [];
        } else {
          console.error(
            `Error Occured in getPurchaseOrder : ${
              response.message || "Error Occured in API"
            }`
          );
        }
      } catch (err) {
        console.error(`Error Occured in getPurchaseOrder : ${err}`);
      }
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

    return {
      getAssetPath,
      Identifier,
      itemDetails,
      showErrorAlert,
      showSuccessAlert,
      loading,
      PoStatus,
      GetPoStatus,
      formatPrice,
      GetPoPaymentStatus,
    };
  },
});
</script>