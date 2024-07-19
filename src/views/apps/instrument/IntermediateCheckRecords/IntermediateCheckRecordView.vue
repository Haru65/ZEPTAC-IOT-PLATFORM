<template>
  <div style="width: 99%" class="bg-body p-12 rounded">
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Form-->
        <VForm id="kt_account_profile_details_form">
          <!--begin::Card body-->
          <div class="card-body p-sd-2 p-lg-9">
            <!--begin::Input group-->

            <!-- extra fields -->
            <div class="row mb-6">
              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fw-semobold fw-bold text-gray-700 fs-6 text-nowrap"
                  >Instument Name</label
                >
                <div class="form-control form-control-lg form-control-solid">
                  {{ itemDetails.name }}
                </div>
              </div>

              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                  >Make</label
                >
                <div class="form-control form-control-lg form-control-solid">
                  {{ itemDetails.make }}
                </div>
              </div>
            </div>
            <!--end::Input group-->

            <!-- extra fields -->
            <div class="row mb-6">
              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                  >Model No.</label
                >
                <div class="form-control form-control-lg form-control-solid">
                  {{ itemDetails.model_no }}
                </div>
              </div>
              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                  >Serial No.</label
                >
                <div class="form-control form-control-lg form-control-solid">
                  {{ itemDetails.serial_no }}
                </div>
              </div>
            </div>

            <!--begin::Accordion-->
            <div class="accordion mt-6" id="kt_accordion_4">
              <div class="accordion-item">
                <h2 class="accordion-header" :id="'kt_accordion_4_header_'">
                  <button
                    class="accordion-button fs-4 fw-semibold"
                    type="button"
                    :data-bs-toggle="'collapse'"
                    :data-bs-target="'#kt_accordion_4_body_'"
                    :aria-controls="'kt_accordion_4_body_'"
                  >
                    Intermediate Plans
                  </button>
                </h2>
                <div
                  :id="'kt_accordion_4_body_'"
                  class="accordion-collapse"
                  :aria-labelledby="'kt_accordion_4_header_'"
                  data-bs-parent="#kt_accordion_4"
                >
                  <div class="accordion-body">
                    <div class="table-responsive">
                      <table
                        class="table table-rounded table-striped border gy-7 gs-7 text-nowrap"
                      >
                        <thead>
                          <tr
                            class="fw-semibold fs-6 text-gray-800 border-bottom border-gray-200 text-align-center"
                          >
                            <th class="col-2">No.</th>
                            <th class="col-5">Check Date</th>
                            <th class="col-2">Approval Status</th>
                            <th>Edit</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(
                              plan, index
                            ) of itemDetails.intermediate_check_records"
                            :key="index"
                          >
                            <td class="align-middle">
                              <span>{{ index + 1 }}</span>
                            </td>
                            <td class="align-middle">
                              <span
                                class="badge py-3 px-4 fs-7 badge-light-primary"
                                >{{ `${plan?.check_date}` }}</span
                              >
                            </td>
                            <td class="align-middle">
                              <span
                                v-if="plan?.approval_status == '1'"
                                class="badge py-3 px-4 fs-7 badge-light-primary"
                                >{{
                                  GetApprovalStatus(plan?.approval_status)
                                }}</span
                              >
                              <span
                                v-if="plan?.approval_status == '2'"
                                class="badge py-3 px-4 fs-7 badge-light-danger"
                                >{{
                                  GetApprovalStatus(plan?.approval_status)
                                }}</span
                              >
                              <span
                                v-if="plan?.approval_status == '3'"
                                class="badge py-3 px-4 fs-7 badge-light-success"
                                >{{
                                  GetApprovalStatus(plan?.approval_status)
                                }}</span
                              >
                            </td>
                            <td>
                              <div class="d-flex flex-lg-row my-3">
                                <!--begin::Edit-->
                                <router-link
                                  :to="`/intermediate_check_records/edit/${plan?.id}`"
                                >
                                  <span
                                    class="btn btn-icon btn-active-light-primary w-30px h-30px me-3"
                                    data-bs-toggle="tooltip"
                                    title="View Intermediate Record"
                                  >
                                    <KTIcon
                                      icon-name="pencil"
                                      icon-class="fs-2"
                                    />
                                  </span>
                                </router-link>
                                <!--end::Edit-->
                              </div>
                            </td>
                          </tr>
                          <tr
                            class="text-center"
                            v-if="
                              itemDetails.intermediate_check_records == null ||
                              itemDetails.intermediate_check_records?.length ===
                                0
                            "
                          >
                            <td
                              colspan="4"
                              class="fw-semibold fs-6 text-gray-800 border-bottom border-gray-200 text-align-center"
                            >
                              No Intermediate Plans Yet.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--end::Accordion-->

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
import { defineComponent, onMounted, ref, reactive } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import {
  addIntermediateCheckRecord,
  getCalibrationInstrumentForIntermediate,
  getIntermediateCheckRecord,
} from "@/stores/api";
import { ApprovalStatus, GetApprovalStatus } from "@/core/model/global";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import packages from "@/core/config/PackagesConfig";
import { limit, Identifier } from "@/core/config/WhichUserConfig";
import { useAuthStore } from "@/stores/auth";
import { useRoute, useRouter } from "vue-router";
import ApiService from "@/core/services/ApiService";
import moment from "moment";

interface Data {
  id: string;
  check_date: string;
  approval_status: string;
}

export default defineComponent({
  name: "intermediate-check-records-view",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  setup() {
    const identifier = Identifier;
    const loading = ref(false);
    const auth = useAuthStore();
    const router = useRouter();
    const route = useRoute();
    const User = auth.GetUser();
    let limit = ref(500);

    const itemId = route.params.id;

    const itemDetails = reactive({
      instrument_id: "",
      name: "",
      make: "",
      model_no: "",
      serial_no: "",

      intermediate_check_records: [
        {
          id: "",
          check_date: "",
          approval_status: "",
        },
      ],
    });

    onMounted(async () => {
      try {
        let response = await getCalibrationInstrumentForIntermediate(
          itemId.toString()
        );
        console.log(response);
        itemDetails.instrument_id = response.id;
        itemDetails.name = response.name;
        itemDetails.make = response.make;
        itemDetails.model_no = response.model_no;
        itemDetails.serial_no = response.serial_no;
        itemDetails.intermediate_check_records =
          response?.intermediate_check_records
            ? response?.intermediate_check_records
            : [];
      } catch (error) {
        showErrorAlert("Error", "An error occurred during the API call.");
        loading.value = false;
      }
    });

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
      itemDetails,
      getAssetPath,
      loading,
      packages,
      limit,
      ApprovalStatus,
      GetApprovalStatus,
    };
  },
});
</script>
      
<style>
.el-input__inner,
.el-select__inner {
  font-weight: 500;
}
.el-input__wrapper,
.el-select__wrapper {
  min-height: 3.5rem;
  border-radius: 0.5rem;
  background-color: var(--bs-gray-100);
  border-color: var(--bs-gray-100);
  color: var(--bs-gray-700);
  transition: color 0.2s ease;
  appearance: none;
  line-height: 1.5;
  border: none !important;
  padding-top: 0.825rem;
  padding-bottom: 0.825rem;
  padding-left: 1.5rem;
  font-size: 1.15rem;
  border-radius: 0.625rem;
  box-shadow: none !important;
}
</style>