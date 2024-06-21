<template>
  <!--begin::Modal - New Address-->
  <div
    class="modal fade"
    ref="newAddressModalRef"
    :id="'kt_modal_new_address'"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    data-bs-focus="false"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-1000px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Form-->
        <VForm
          class="form"
          id="kt_modal_new_address_form"
          @submit="submit($event)"
          :validation-schema="validationSchema"
        >
          <!--begin::Modal header-->
          <div class="modal-header" id="kt_modal_new_address_header">
            <!--begin::Modal title-->
            <h2>{{ $props.heading }}</h2>
            <!--end::Modal title-->

            <!--begin::Close-->
            <div
              class="btn btn-sm btn-icon btn-active-color-primary"
              data-bs-dismiss="modal"
            >
              <KTIcon icon-name="cross" icon-class="fs-1" />
            </div>
            <!--end::Close-->
          </div>
          <!--end::Modal header-->

          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-10">
            <!--begin::Scroll-->
            <div
              class="scroll-y me-n7 pe-7"
              id="kt_modal_new_address_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              style="max-height: 100% !important"
              data-kt-scroll-dependencies="#kt_modal_new_address_scroll"
              data-kt-scroll-wrappers="#kt_modal_new_address_scroll"
              data-kt-scroll-offset="auto"
            >

            <input type="hidden" />
              <!--begin::Input group-->
              <div class="row mb-6">
                <!--begin::Col-->
                <div class="col-md-6 fv-row mb-8 mb-sd-8">
                  <!--begin::Label-->
                  <label
                    class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                    >Select Periodicity</label
                  >
                  <!--end::Label-->

                  <div>
                    <el-select
                      filterable
                      placeholder="Number of months"
                      name="periodicity"
                      v-model="maintenanceDetails.periodicity"
                      @change="setPeriodicity"
                    >
                      <el-option
                        value=""
                        disabled="disabled"
                        label="Number of months"
                        key=""
                      >
                        Number of months</el-option
                      >
                      <el-option
                        v-for="i in 12"
                        :key="i"
                        :value="i"
                        :label="i"
                      />
                    </el-select>
                  </div>

                  <div class="fv-help-block">
                    <ErrorMessage class="invalid-feedback" name="periodicity" />
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Col-->

                <!--begin::Col-->
                <div class="col-md-6 fv-row mb-8 mb-sd-8">
                  <!--begin::Label-->
                  <label
                    class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                    >Maintenance Date</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-date-picker
                    type="date"
                    name="m_date1"
                    id="m_date1"
                    v-model="maintenanceDetails.m_date1"
                    @change="setDates($event, 'm_date1')"
                    placeholder="Pick a day"
                    :editable="false"
                  />
                  <ErrorMessage class="invalid-feedback" name="m_date1" />
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
                    >Next Maintenance Date</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-date-picker
                    type="date"
                    v-model="maintenanceDetails.m_date2"
                    name="m_date2"
                    id="m_date2"
                    placeholder="Pick a day"
                    disabled
                    :editable="false"
                  />
                  <ErrorMessage class="invalid-feedback" name="m_date2" />
                  <!--end::Input-->
                </div>
                <!--end::Col-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="row mb-6">
                <div class="form-group col-md-12">
                  <label
                    class="col-lg-4 col-form-label required fw-semobold fs-6 fw-bold text-gray-700 text-nowrap"
                    >Maintenance Details</label
                  >
                  <Field
                    type="text"
                    as="textarea"
                    name="m_details"
                    rows="5"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Specify maintenance details..."
                    v-model="maintenanceDetails.m_details"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="m_details" />
                    </div>
                  </div>
                </div>
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="row mb-6">
                <div class="form-group col-md-12">
                  <label
                    class="col-lg-4 col-form-label fw-semobold fs-6 fw-bold text-gray-700 text-nowrap"
                    >Any Repair Details (if any)</label
                  >
                  <Field
                    type="text"
                    as="textarea"
                    name="any_repair_detail"
                    rows="5"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Specify repair details..."
                    v-model="maintenanceDetails.any_repair_detail"
                  />
                </div>
              </div>
              <!--end::Input group-->

              <div class="row mb-6">
                <!--begin::Col-->
                <div class="col-md-12 fv-row">
                  <!--begin::Label-->
                  <label
                    class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                    >Maintenance Done By</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Field
                    type="text"
                    disabled
                    v-model="maintenanceDetails.maintenance_done_by"
                    name="maintenance_done_by"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Enter the person name"
                  />
                  <ErrorMessage
                    class="invalid-feedback"
                    name="maintenance_done_by"
                  />
                  <!--end::Input-->
                </div>
                <!--end::Col-->
              </div>
            </div>
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->

          <!--begin::Modal footer-->
          <div class="modal-footer">
            <!--begin::Button-->
            <span
              @click="clear"
              id="kt_modal_new_address_cancel"
              class="btn btn-light me-3"
            >
              Discard
          </span>
            <!--end::Button-->

            <!--begin::Button-->
            <button
              ref="submitButtonRef"
              type="submit"
              id="kt_modal_new_address_submit"
              class="btn btn-primary"
            >
              <span class="indicator-label"> Submit </span>
              <span class="indicator-progress">
                Please wait...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </button>
            <!--end::Button-->
          </div>
          <!--end::Modal footer-->
        </VForm>
        <!--end::Form-->
      </div>
    </div>
  </div>
  <!--end::Modal - New Address-->
</template>
  
  <script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";
import moment from "moment";

interface NewAddressData {}

interface Maintenance {
  periodicity: string;
  m_date1: string;
  m_date2: string;
  m_details: string;
  any_repair_detail: string;
  maintenance_done_by: string;
}

export default defineComponent({
  name: "new-address-modal",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },

  emit: ["addData"],

  props: ["heading", "username"],

  setup(props, { emit }) {
    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const newAddressModalRef = ref<null | HTMLElement>(null);
    const newAddressData = ref<NewAddressData>({});
    const validationSchema = Yup.object().shape({});

    const maintenanceDetails = ref({
      periodicity: "",
      m_date1: "",
      m_date2: "",
      m_details: "",
      any_repair_detail: "",
      maintenance_done_by: props.username,
    });

    function calculateNextDates(startDate, monthInterval) {
      // extracting the year, month, day
      const [year, month, day] = startDate.split("-").map(Number);
      // 0-based indexing, so -1
      const date1 = new Date(year, month - 1, day);

      // getting the year
      let newYear = date1.getFullYear();

      // adding the month interval to the date 1
      let newMonth = date1.getMonth() + monthInterval;

      // getting the day
      let newDay = date1.getDate();

      // Handle potential overflow for months
      // if newmonth is greater than or equal to 12 then increment the year and subtract the months from newmonth
      while (newMonth >= 12) {
        newYear++;
        newMonth -= 12;
      }

      // Calculate the maximum number of days for the new month, considering leap years
      const maxDayForDate2 = new Date(newYear, newMonth + 1, 0).getDate();

      // Handle potential overflow for days
      newDay = Math.min(newDay, maxDayForDate2);

      const date2 = new Date(newYear, newMonth, newDay);

      // Format the dates as strings (e.g., 'YYYY-MM-DD')
      const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };

      return [formatDate(date2)];
    }

    async function setPeriodicity(e) {
      console.log(e);
      if (maintenanceDetails.value.m_date1) {
        const [m_date2] = calculateNextDates(
          maintenanceDetails.value.m_date1,
          maintenanceDetails.value.periodicity
        );
        maintenanceDetails.value.m_date2 = m_date2;
      } else {
        maintenanceDetails.value.m_date1 = "";
        maintenanceDetails.value.m_date2 = "";
      }
    }

    /* --------SET DATE LOGIC--------*/
    async function setDates(e, dateType) {
      try {
        if (e != null) {
          if (e != "" && e != null) {
            maintenanceDetails.value.m_date1 = moment(e).format("YYYY-MM-DD");

            if (maintenanceDetails.value.periodicity) {
              const [m_date2] = calculateNextDates(
                maintenanceDetails.value.m_date1,
                maintenanceDetails.value.periodicity
              );
              maintenanceDetails.value.m_date2 = m_date2;
            }
          } else {
            maintenanceDetails.value.m_date1 = "";
            maintenanceDetails.value.m_date2 = "";
          }
        } else {
          maintenanceDetails.value.m_date1 = "";
          maintenanceDetails.value.m_date2 = "";
        }
      } catch (err) {
        maintenanceDetails.value.m_date1 = "";
        maintenanceDetails.value.m_date2 = "";
      }
      console.log(maintenanceDetails.value.m_date1);
      console.log(maintenanceDetails.value.m_date2);
    }

    const validateForm = (formData) => {
      for (const key in formData) {
        let value = formData[key];
        if (key !== "any_repair_detail") {
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

    function areAllPropertiesNull(array) {
      return array.some((detail) => {
        const {
          periodicity,
          m_date1,
          m_date2,
          m_details,
          maintenance_done_by,
        } = detail;

        // Check if any property is null or empty

        return (
          periodicity === "" ||
          m_date1 === "" ||
          m_date2 === "" ||
          m_details === "" ||
          maintenance_done_by === ""
        );
      });
    }

    const clear = () => {
      maintenanceDetails.value = {
        periodicity: "",
        m_date1: "",
        m_date2: "",
        m_details: "",
        any_repair_detail: "",
        maintenance_done_by: props.username,
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

    const submit = async (e) => {
      console.log(maintenanceDetails.value);

      const result = validateForm(maintenanceDetails.value);

      if (result === false) {
        showErrorAlert("Warning", "Please fill all the details correctly.");
        return;
      }

      try {
        if (submitButtonRef.value) {
          // Activate indicator
          submitButtonRef.value.setAttribute("data-kt-indicator", "on");
        }

        await emit("addData", maintenanceDetails.value);

        showSuccessAlert("Success", "Maintenance Plan Added Successfully!");
        clear();
        hideModal(newAddressModalRef.value);

      } catch (error) {
        showErrorAlert("Error", error);
      } finally {
        if (submitButtonRef.value) {
          submitButtonRef.value.removeAttribute("data-kt-indicator");
        }
      }
    };

    return {
      newAddressData,
      maintenanceDetails,
      validationSchema,
      submit,
      submitButtonRef,
      newAddressModalRef,
      heading: props.heading,
      setPeriodicity,
      setDates,
      username: props.username,
      clear,
    };
  },
});
</script>
  
  