<template>
  <div class="m-6 rounded">
    <div class="d-flex flex-column flex-lg-row">
      <!--begin::Content-->
      <div class="flex-lg-row-fluid me-lg-6 order-2 order-lg-1 mb-10 mb-lg-0">
        <!--begin::Form-->
        <form class="form" action="#" id="kt_subscriptions_create_new">
          <!--begin::Customer-->
          <div class="card card-flush pt-3 mb-5 mb-lg-10">
            <!--begin::Card header-->
            <div class="card-header">
              <!--begin::Card title-->
              <div class="card-title">
                <h2 class="fw-bold">Instrument</h2>
              </div>
              <!--begin::Card title-->

              <!--begin::Card toolbar-->
              <div class="card-toolbar">
                <!--begin::Toolbar-->
                <div
                  class="d-flex justify-content-end"
                  data-kt-customer-table-toolbar="base"
                >
                  <!--begin::Add customer-->
                  <router-link
                    :to="`/calibration-srf/edit/${itemDetails.service_request_id}/${itemDetails.company_id}`"
                    class="btn btn-primary"
                  >
                    <KTIcon icon-name="arrow-left" icon-class="fs-2" />
                    Back
                  </router-link>
                  <!--end::Add customer-->
                  <!--end::Add customer-->
                </div>
                <!--end::Toolbar-->
              </div>
              <!--end::Card toolbar-->
            </div>
            <!--end::Card header-->

            <!--begin::Card body-->
            <div class="card-body pt-3">
              <!--begin::Section-->
              <div class="mb-10">
                <!--begin::Details-->
                <div class="d-flex flex-wrap py-5">
                  <!--begin::Row-->
                  <div class="flex-equal me-5">
                    <!--begin::Details-->
                    <table class="table fs-6 fw-semobold gs-0 gy-2 gx-2 m-0">
                      <!--begin::Row-->
                      <tr>
                        <td class="text-gray-600 min-w-175px w-175px">
                          Instrument Name:
                        </td>
                        <td class="text-gray-800 min-w-175px">
                          {{ itemDetails.name || "" }}
                        </td>
                      </tr>
                      <!--end::Row-->

                      <!--begin::Row-->
                      <tr>
                        <td class="text-gray-600">Instrument Id:</td>
                        <td class="text-gray-800">
                          {{ itemDetails.instrument_id || "" }}
                        </td>
                      </tr>
                      <!--end::Row-->

                      <!--begin::Row-->
                      <tr>
                        <td class="text-gray-600">Model No:</td>
                        <td class="text-gray-800">
                          {{ itemDetails.model_no || "" }}
                        </td>
                      </tr>
                      <!--end::Row-->

                      <!--begin::Row-->
                      <tr>
                        <td class="text-gray-600">Serial No:</td>
                        <td class="text-gray-800">
                          {{ itemDetails.serial_no || "" }}
                        </td>
                      </tr>
                      <!--end::Row-->

                      <!--begin::Row-->
                      <tr>
                        <td class="text-gray-600">Make By:</td>
                        <td class="text-gray-800">
                          {{ itemDetails.make || "" }}
                        </td>
                      </tr>
                      <!--end::Row-->
                      <!--begin::Row-->
                      <tr>
                        <td class="text-gray-600">Calibration Date:</td>
                        <td class="text-gray-800">
                          {{ itemDetails.calibration_date || "" }}
                        </td>
                      </tr>
                      <!--end::Row-->
                      <!--begin::Row-->
                      <tr>
                        <td class="text-gray-600">Calibration Due:</td>
                        <td class="text-gray-800">
                          {{ itemDetails.calibration_due_date || "" }}
                        </td>
                      </tr>
                      <!--end::Row-->
                    </table>
                    <!--end::Details-->
                  </div>
                  <!--end::Row-->

                  <!--begin::Row-->
                  <div class="flex-equal">
                    <!--begin::Details-->
                    <table class="table fs-6 fw-semobold gs-0 gy-2 gx-2 m-0">
                      <!--begin::Row-->
                      <tr>
                        <td class="text-gray-600 min-w-175px w-175px">
                          Parameter:
                        </td>
                        <td class="text-gray-800 min-w-175px">
                          {{ itemDetails.parameter || "" }}
                        </td>
                      </tr>
                      <!--end::Row-->

                      <!--begin::Row-->
                      <tr>
                        <td class="text-gray-600">Range:</td>
                        <td class="text-gray-800">
                          {{ itemDetails.ranges_from || "" }} to
                          {{ itemDetails.ranges_to || "" }}
                        </td>
                      </tr>
                      <!--end::Row-->
                      <!--begin::Row-->
                      <tr>
                        <td class="text-gray-600">Accuracy:</td>
                        <td class="text-gray-800">
                          {{ itemDetails.accuracy || "" }}
                        </td>
                      </tr>
                      <!--end::Row-->
                      <!--begin::Row-->
                      <tr>
                        <td class="text-gray-600">Resolution:</td>
                        <td class="text-gray-800">
                          {{ itemDetails.resolution || "" }}
                        </td>
                      </tr>
                      <!--end::Row-->

                      <!--begin::Row-->
                      <tr>
                        <td class="text-gray-600">Location:</td>
                        <td class="text-gray-800">
                          {{ itemDetails.location || "" }}
                        </td>
                      </tr>
                      <!--end::Row-->
                      <!--begin::Row-->
                      <tr>
                        <td class="text-gray-600">Temperature:</td>
                        <td class="text-gray-800">
                          {{ itemDetails.temp || "" }} &deg; C
                        </td>
                      </tr>
                      <!--end::Row-->
                      <!--begin::Row-->
                      <tr>
                        <td class="text-gray-600">Humidity:</td>
                        <td class="text-gray-800">
                          {{ itemDetails.rh || "" }} % RH
                        </td>
                      </tr>
                      <!--end::Row-->
                    </table>
                    <!--end::Details-->
                  </div>
                  <!--end::Row-->
                </div>
                <!--end::Row-->
              </div>
              <!--end::Section-->

              <!--begin::Card title-->
              <div class="card-title">
                <h2 class="fw-bold">Master Instrument</h2>
              </div>
              <!--begin::Card title-->

              <div class="row mb-6">
                <!--begin::Label-->
                <label
                  class="col-lg-3 col-form-label required fs-5 fw-bold text-gray-700 text-wrap mb-2"
                  >Attach Reference Instrument</label
                >
                <!--end::Label-->

                <!--begin::Col-->
                <div class="col-lg-9 fv-row">
                  <el-select
                    v-model="itemDetails.reference_instrument_id"
                    filterable
                    placeholder="Select Master Instrument..."
                  >
                    <el-option
                      key=""
                      disabled="disabled"
                      value=""
                      label="Select Master Instrument..."
                    >
                      Select Master Instrument
                    </el-option>
                    <el-option
                      v-for="item in ReferenceInstruments"
                      :key="item.id"
                      :label="item.instrument_id"
                      :value="item.id"
                    />
                  </el-select>
                </div>
                <!--end::Col-->
              </div>

              <div class="modal-footer flex-start w-100 mb-6">
                <button
                  type="button"
                  ref="submitButtonRef"
                  @click="submit"
                  class="btn btn-md btn-success"
                >
                  <span class="indicator-label"> Submit </span>
                  <span class="indicator-progress">
                    Please wait...
                    <span
                      class="spinner-border spinner-border-sm align-middle ms-2"
                    ></span>
                  </span>
                </button>
              </div>
            </div>
            <!--end::Card body-->

            <!--end::Input group-->
          </div>
          <!--end::Customer-->
        </form>
        <!--end::Form-->
      </div>
      <!--end::Content-->
    </div>

    <div class="d-flex flex-column flex-lg-row">
      <!--begin::Content-->
      <div
        class="flex-lg-row-fluid me-lg-6 order-2 order-lg-1 mb-10 mb-lg-0 bg-body rounded"
      >
        <!--begin::Card body-->
        <div class="card-body border-top p-sd-2 p-lg-9">
          <div class="row mb-6">
            <div class="container-fluid">
              <div class="alert alert-primary mt-2">
                <h3>UUC Readings in psi</h3>
              </div>
            </div>
          </div>
          <div class="table-responsive py-6 mb-6">
            <table
              class="table table-responsive table-bordered g-6 w-100 fw-bold text-gray-700"
            >
              <thead
                class="fw-semibold fs-6 text-gray-700 text-center justify-content-center"
              >
                <tr>
                  <th class="col-2">UUC Reading</th>
                  <th class="col-2">I1 psi (&#8593;)</th>
                  <th class="col-2">D1 psi (&#8595;)</th>
                  <th class="col-2">I2 psi (&#8593;)</th>
                  <th class="col-2">D2 psi (&#8595;)</th>
                  <th class="col-2">Mean</th>
                  <th class="col-2"></th>
                </tr>
              </thead>
              <tbody class="text-center justify-content-center">
                <tr>
                  <td>
                    <input
                      type="text"
                      name="uuc_reading"
                      class="form-control form-control-lg form-control-solid min-w-100px"
                      placeholder="0"
                      v-model="uucDetails.uuc_reading"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="i1_up"
                      class="form-control form-control-lg form-control-solid min-w-100px"
                      placeholder="0"
                      v-model="uucDetails.i1_up"
                      @keyup="setUUCReading($event, 'i1_up')"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="d1_down"
                      class="form-control form-control-lg form-control-solid min-w-100px"
                      placeholder="0"
                      v-model="uucDetails.d1_down"
                      @keyup="setUUCReading($event, 'd1_down')"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="i2_up"
                      class="form-control form-control-lg form-control-solid min-w-100px"
                      placeholder="0"
                      v-model="uucDetails.i2_up"
                      @keyup="setUUCReading($event, 'i2_up')"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="d2_down"
                      class="form-control form-control-lg form-control-solid min-w-100px"
                      placeholder="0"
                      v-model="uucDetails.d2_down"
                      @keyup="setUUCReading($event, 'd2_down')"
                    />
                  </td>
                  <td>
                    <div
                      class="form-control form-control-lg form-control-transparent min-w-100px"
                    >
                      {{ uucDetails.mean_value || "" }}
                    </div>
                  </td>
                  <td>
                    <div class="d-flex flex-lg-row my-3">
                      <button
                        type="button"
                        ref="uucSubmitButtonRef"
                        @click="submitUUC"
                        class="btn btn-sm btn-success"
                      >
                        <span class="indicator-label"> Save </span>
                        <span class="indicator-progress">
                          Please wait...
                          <span
                            class="spinner-border spinner-border-sm align-middle ms-2"
                          ></span>
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!--end::Content-->
    </div>

    <div class="card mt-6">
      <div class="card-header border-0 pt-6">
        <!--begin::Card title-->
        <div class="card-title">
          <h2 class="fw-bold">UUC Readings</h2>
        </div>
        <!--begin::Card title-->

        <!--begin::Card toolbar-->
        <div class="card-toolbar">
          <!--begin::Toolbar-->
          <div
            v-if="selectedIds.length === 0"
            class="d-flex justify-content-end"
            data-kt-customer-table-toolbar="base"
          ></div>
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
            <button
              type="button"
              class="btn btn-danger"
              @click="deleteFewItem()"
            >
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
        <Datatable
          @on-sort="sort"
          @on-items-select="onItemSelect"
          :data="tableData"
          :header="tableHeader"
          :checkbox-enabled="true"
          :items-per-page-dropdown-enabled="false"
          :loading="loading"
        >
          <!-- img data -->
          <template v-slot:id="{ row: uuc_reading }">
            {{ uuc_reading.id }}
          </template>
          <template v-slot:ranges="{ row: uuc_reading }">
            <span v-if="uuc_reading">
              {{
              `${itemDetails.ranges_from || ""} to ${
                itemDetails.ranges_to || ""
              }`
            }}
            </span>
          </template>
          <template v-slot:uuc_reading="{ row: uuc_reading }">
            {{ uuc_reading.uuc_reading }}
          </template>
          <template v-slot:i1_up="{ row: uuc_reading }">
            {{ uuc_reading.i1_up }}
          </template>
          <template v-slot:d1_down="{ row: uuc_reading }">
            {{ uuc_reading.d1_down }}
          </template>
          <template v-slot:i2_up="{ row: uuc_reading }">
            {{ uuc_reading.i2_up }}
          </template>
          <template v-slot:d2_down="{ row: uuc_reading }">
            {{ uuc_reading.d2_down }}
          </template>
          <template v-slot:mean_value="{ row: uuc_reading }">
            {{ uuc_reading.mean_value }}
          </template>

          <template v-slot:actions="{ row: uuc_reading }">
            <!--begin::Menu Flex-->
            <div class="d-flex flex-lg-row my-3">
              <!--begin::Edit-->
              <a :href="`/uuc-reading/edit/${uuc_reading.id}`" target="blank">
                <span
                  class="btn btn-icon btn-active-light-primary w-30px h-30px me-3"
                  data-bs-toggle="tooltip"
                  title="View Uncertainity Calculation"
                >
                  <KTIcon icon-name="finance-calculator" icon-class="fs-2" />
                </span>
              </a>
              <!--end::Edit-->

              <!--begin::Delete-->
              <span
                @click="deleteItem(uuc_reading.id, false)"
                class="btn btn-icon btn-active-light-danger w-30px h-30px me-3"
                data-bs-toggle="tooltip"
                title="Delete UUC Reading"
              >
                <KTIcon icon-name="trash" icon-class="fs-2" />
              </span>
              <!--end::Delete-->
            </div>
            <!--end::Menu FLex-->
          </template>
        </Datatable>
      </div>
    </div>
  </div>
</template>
            
<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable/table-partials/models";
import arraySort from "array-sort";

import Swal from "sweetalert2/dist/sweetalert2.js";
import {
  getCalibrationInstrument,
  getUUCReadings,
  getReferenceInstruments,
  updateCalibrationInstrument,
  deleteUUCReading,
  addUUCReading,
} from "@/stores/api";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import { Identifier } from "@/core/config/WhichUserConfig";
import { useAuthStore } from "@/stores/auth";
import { useRouter, useRoute } from "vue-router";
import ApiService from "@/core/services/ApiService";
import moment from "moment";
import type { IUUCReading } from "@/core/model/ucc_reading";

interface UUCReading {
  calibration_instrument_id: string;
  uuc_reading: string;
  i1_up: string;
  d1_down: string;
  i2_up: string;
  d2_down: string;
  mean_value: number;
  company_id: string;
  is_active: number;
}

interface Item {
  id: string;
  instrument_id: string;
  name: string;
  parameter: string;

  model_no: string;
  serial_no: string;
  make: string;

  calibration_date: string;
  calibration_due_date: string;

  location: string;

  ranges_from: string;
  ranges_to: string;
  accuracy: string;
  resolution: string;

  calibration_points: string;
  periodicity: string;

  temp: string;
  rh: string;

  instrument_condition: string;
  remark: string;

  reference_instrument_id: string;
  service_request_id: string;

  company_id: string;
  is_active: number;
}

export default defineComponent({
  name: "calibration-instrument-edit",
  components: {
    ErrorMessage,
    Field,
    VForm,
    Datatable,
  },
  setup() {
    const identifier = Identifier;
    const loading = ref(false);
    const uucLoading = ref(false);
    const auth = useAuthStore();
    const router = useRouter();
    const route = useRoute();
    const User = auth.GetUser();

    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const uucSubmitButtonRef = ref<null | HTMLButtonElement>(null);

    const itemId = route.params.id;

    /* UUC Reading Listing Logic:Begin */

    const tableHeader = ref([
      {
        columnName: "Range",
        columnLabel: "ranges",
        sortEnabled: false,
        columnWidth: 100,
      },
      {
        columnName: "UUC Reading",
        columnLabel: "uuc_reading",
        sortEnabled: true,
        columnWidth: 80,
      },
      {
        columnName: "I1 up (psi)",
        columnLabel: "i1_up",
        sortEnabled: true,
        columnWidth: 80,
      },
      {
        columnName: "D1 down (psi)",
        columnLabel: "d1_down",
        sortEnabled: true,
        columnWidth: 80,
      },
      {
        columnName: "I2 up (psi)",
        columnLabel: "i2_up",
        sortEnabled: true,
        columnWidth: 80,
      },
      {
        columnName: "D2 down (psi)",
        columnLabel: "d2_down",
        sortEnabled: true,
        columnWidth: 80,
      },
      {
        columnName: "Mean",
        columnLabel: "mean_value",
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

    const tableData = ref<Array<IUUCReading>>([]);

    const initvalues = ref<Array<IUUCReading>>([]);

    async function record_listing(): Promise<void> {
      try {
        const response = await getUUCReadings(
          `calibrationInstumentId=${itemId}&fetchAll=true`
        );

        if (response.success) {
          if (response.result != null && response.result) {
            tableData.value = response.result.map(({ ...rest }) => ({
              ...rest,
            }));

            initvalues.value.splice(
              0,
              tableData.value.length,
              ...tableData.value
            );
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        //console.log("done");
        setTimeout(() => {
          loading.value = false;
        }, 100);
      }
    }

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
          const response = await deleteUUCReading(id);
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

    const sort = (sort: Sort) => {
      const reverse: boolean = sort.order === "asc";
      if (sort.label) {
        arraySort(tableData.value, sort.label, { reverse });
      }
    };
    const onItemSelect = (selectedItems: Array<number>) => {
      selectedIds.value = selectedItems;
    };

    /* UUC Reading Listing Logic:End */

    const ReferenceInstruments = ref([{ id: "", name: "", instrument_id: "" }]);

    const itemDetailsValidator = Yup.object().shape({});

    const itemDetails = ref<Item>({
      id: "",
      instrument_id: "",
      name: "",
      parameter: "",

      model_no: "",
      serial_no: "",
      make: "",

      calibration_date: "",
      calibration_due_date: "",

      location: "",

      ranges_from: "",
      ranges_to: "",
      accuracy: "",
      resolution: "",

      calibration_points: "",
      periodicity: "",

      temp: "",
      rh: "",

      instrument_condition: "",
      remark: "",

      reference_instrument_id: "",
      service_request_id: "",

      company_id: "",
      is_active: 1,
    });

    const uucDetails = ref<UUCReading>({
      calibration_instrument_id: itemId.toString(),
      uuc_reading: "",
      i1_up: "",
      d1_down: "",
      i2_up: "",
      d2_down: "",
      mean_value: 0,
      company_id: itemDetails.value.company_id,
      is_active: 1,
    });

    const resetUUCReading = async () => {
      uucDetails.value = {
        calibration_instrument_id: itemId.toString(),
        uuc_reading: "",
        i1_up: "",
        d1_down: "",
        i2_up: "",
        d2_down: "",
        mean_value: 0,
        company_id: itemDetails.value.company_id,
        is_active: 1,
      };

      await record_listing();
    };

    const submitUUC = async () => {
      if (
        itemDetails.value.reference_instrument_id == "" ||
        itemDetails.value.reference_instrument_id == null
      ) {
        showErrorAlert("Error", "Please Select Reference Instrument.");
        return;
      }

      uucLoading.value = true;
      uucDetails.value.company_id = itemDetails.value.company_id || "";

      const result = validateForm(uucDetails.value);

      if (result == false) {
        showErrorAlert("Warning", "Please fill all the details correctly.");
        uucLoading.value = false;
        return;
      }

      try {
        if (uucSubmitButtonRef.value) {
          // Activate indicator
          uucSubmitButtonRef.value.setAttribute("data-kt-indicator", "on");
        }

        // Call your API here
        const response = await addUUCReading(uucDetails.value);

        if (response?.success) {
          // Handle successful API response
          uucLoading.value = false;
          showSuccessAlert(
            "Success",
            response.message || "Reading Added Successfully!"
          );

          resetUUCReading();
        } else {
          // Handle API error response
          uucLoading.value = false;
          showErrorAlert("Error", response.message || "An error occurred.");
        }
      } catch (error) {
        // Handle any other errors during API call
        console.error("API call error:", error);
        showErrorAlert("Error", "An error occurred during the API call.");
      } finally {
        if (uucSubmitButtonRef.value) {
          uucSubmitButtonRef.value.removeAttribute("data-kt-indicator");
        }
        uucLoading.value = false;
      }
    };

    const GetMasterInstruments = async () => {
      ApiService.setHeader();
      const response = await getReferenceInstruments(`fetchAll=true`);
      if (response.result != null && response.result) {
        ReferenceInstruments.value.push(
          ...response.result?.map(({ ...rest }) => ({
            ...rest,
          }))
        );
        // console.log(Companies);
      }
    };

    onMounted(async () => {
      ReferenceInstruments.value = [];

      await GetMasterInstruments();

      let response = await getCalibrationInstrument(itemId.toString());
      console.log(response);

      if (response.success) {
        itemDetails.value = { ...response.result };
      }

      await record_listing();
    });

    // Function to calculate the mean
    async function calculateMean(data) {
      const { i1_up, i2_up, d1_down, d2_down } = data;
      const L1_UP = Number(i1_up) || 0;
      const L2_UP = Number(i2_up) || 0;
      const D1_DOWN = Number(d1_down) || 0;
      const D2_DOWN = Number(d2_down) || 0;

      const average = (L1_UP + L2_UP + D1_DOWN + D2_DOWN) / 4;
      return Number(average.toFixed(5));
    }

    /* --------SET READING DATA--------*/
    async function setUUCReading(e, l) {
      try {
        if (e != null) {
          if (e != "" && e != null) {
            uucDetails.value[l] = e.target.value;
          } else {
            uucDetails.value[l] = "";
          }
        } else {
          uucDetails.value[l] = "";
        }
      } catch (err) {
        uucDetails.value[l] = "";
      }

      const average = await calculateMean(uucDetails.value);
      uucDetails.value.mean_value = average;
    }

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
          // Trim the string before validation
          value = value.trim();
          if (value === "") {
            return false;
          }
        }
      }
      return true;
    };

    const submit = async () => {
      if (
        itemDetails.value.reference_instrument_id == "" ||
        itemDetails.value.reference_instrument_id == null
      ) {
        showErrorAlert("Error", "Please Select Reference Instrument.");
        return;
      }

      loading.value = true;

      console.log(itemDetails.value);
      try {
        if (validateForm(itemDetails.value)) {
          const response = await updateCalibrationInstrument(
            itemId,
            itemDetails.value
          );

          if (response?.success) {
            console.log("im here")
            showSuccessAlert(
              "Success",
              response.message || "Calibration Instrument Reading has been successfully updated!"
            );
            loading.value = false;

            router.push({
              name: "calibration-srf-edit",
              params: {
                id: itemDetails.value.service_request_id,
                company_id: itemDetails.value.company_id,
              },
            });
            console.log("not reached");
          } else {
            showErrorAlert("Error", response.message || "An error occurred.");
            loading.value = false;
            return;
          }
        } else {
          showErrorAlert("Warning", "Please fill in all fields.");
          return;
        }
      } catch (error) {
        // Handle any other errors during API call
        // console.error("API call error:", error);
        showErrorAlert("Error", "An error occurred during the API call.");
      } finally {
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
      uucSubmitButtonRef,
      submitButtonRef,
      tableData,
      tableHeader,
      deleteItem,
      selectedIds,
      deleteFewItem,
      sort,
      onItemSelect,
      itemDetails,
      ReferenceInstruments,
      itemDetailsValidator,
      getAssetPath,
      submit,
      submitUUC,
      loading,
      uucLoading,

      uucDetails,
      setUUCReading,
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

.trainer-container {
  display: flex;
  align-items: center;
  margin-right: 10px; /* Adjust as needed */
  background-color: #000; /* Optional background color for each trainer container */
  padding: 5px 10px; /* Optional padding */
  border-radius: 5px; /* Optional border radius */
}
.tagify-remove {
  margin-left: 5px; /* Optional margin between the name and the 'X' button */
}
.override-styles {
  z-index: 99999 !important;
  pointer-events: initial;
}

.tab-item {
  cursor: pointer;
}

.tab-item:hover {
  background-color: blue;
  color: #fff;
  cursor: pointer;
}

.active-tab {
  background-color: blue;
  color: #fff;
}
</style>