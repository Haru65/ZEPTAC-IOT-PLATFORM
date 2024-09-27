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
          novalidate
          :validation-schema="itemDetailsValidator"
        >
          <!--begin::Card body-->
          <div class="card-body border-top p-sd-2 p-lg-9">
            <!--begin::Input group-->

            <div class="row mb-6">
              <div class="form-group col-lg-12 col-md-12">
                <label
                  class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Service Request</label
                >
                <el-select
                  filterable
                  v-model="itemDetails.service_request_id"
                  placeholder="Enter srf and select it to add..."
                >
                  <el-option
                    v-for="(item, index) in srfs"
                    :key="index"
                    :label="item.srf_no"
                    :value="item.id"
                  />
                </el-select>
                <div class="fv-plugins-message-container mt-0">
                  <div class="fv-help-block">
                    <ErrorMessage name="service_request_id" />
                  </div>
                </div>
              </div>
            </div>

            <div class="row mb-6">
              <div class="form-group col-lg-12 col-md-12">
                <label
                  class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Select Instruments</label
                >
                <el-form-item>
                  <el-select
                    v-model="itemDetails.cleanroom_instruments"
                    multiple
                    filterable
                    placeholder="Enter and select it to add..."
                  >
                    <el-option
                      v-for="(item, index) in CleanRoomInstruments"
                      :key="index"
                      :label="item.instrument_id"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
                <div
                  class="fv-plugins-message-container mt-0"
                  v-if="!itemDetails.cleanroom_instruments.length"
                >
                  <div class="fv-help-block">
                    <ErrorMessage name="cleanroom_instruments" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer flex-center w-100">
            <!--begin::Button-->
            <button
              type="button"
              @click="clear"
              class="btn btn-lg btn-danger w-sd-25 w-lg-25"
            >
              Discard
            </button>
            <!--end::Button-->
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <!--begin::Button-->
            <span
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-lg btn-primary w-sd-25 w-lg-25"
              @click.prevent="submit()"
            >
              <span v-if="!loading" class="indicator-label"> Submit </span>
              <span v-if="loading" class="indicator-progress">
                Please wait...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </span>
            <!--end::Button-->
          </div>
          <!--end::Input group-->
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
  addBioSafetyCabinet,
  getServiceRequests,
  getAllInstrument,
} from "@/stores/api";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import { Identifier } from "@/core/config/WhichUserConfig";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import ApiService from "@/core/services/ApiService";
import moment from "moment";

interface Item {
  service_request_id: string;
  cleanroom_instruments: [];
  company_id: string;
  created_by: string;
  updated_by: string;
  is_active: string;
}

export default defineComponent({
  name: "bsc-add",
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
    const User = auth.GetUser();
    let limit = ref(500);

    const srfs = ref([{ id: "", srf_no: "" }]);
    const CleanRoomInstruments = ref([
      {
        id: "",
        instrument_id: "",
        name: "",
      },
    ]);

    const itemDetailsValidator = Yup.object().shape({});

    const itemDetails = ref<Item>({
      service_request_id: "",
      cleanroom_instruments: [],
      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
      is_active: "1",
    });

    onMounted(async () => {
      srfs.value.pop();
      CleanRoomInstruments.value.pop();

      try {
        ApiService.setHeader();
        const response = await getAllInstrument(`fetchAll=true`);

        if (response.success) {
          if (response.result != null && response.result) {
            CleanRoomInstruments.value.push(
              ...response.result?.map(
                ({ id, instrument_id, name, ...rest }) => ({
                  id,
                  instrument_id,
                  name,
                  ...rest,
                })
              )
            );
          }
        } else {
          console.error(
            `Error Occured in getAllInstrument : ${
              response.message || "Error Occured in API"
            }`
          );
        }
      } catch (err) {
        console.error(`Error Occured in getAllInstrument : ${err}`);
      }

      try {
        ApiService.setHeader();
        const response = await getServiceRequests(`fetchAll=true`);

        if (response.success) {
          if (response.result != null && response.result) {
            srfs.value.push(
              ...response.result?.map(({ id, srf_no }) => ({
                id,
                srf_no,
              }))
            );
          }
        } else {
          console.error(
            `Error Occured in getServiceRequests : ${
              response.message || "Error Occured in API"
            }`
          );
        }
      } catch (err) {
        console.error(`Error Occured in getServiceRequests : ${err}`);
        loading.value = false;
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
      loading.value = true;

      console.log(itemDetails.value);
      try {
        if (itemDetails.value.cleanroom_instruments.length === 0) {
          showErrorAlert("Warning", "Please Select Atleast One Instrument");
          loading.value = false;
          return;
        }

        if (validateForm(itemDetails.value)) {
          const response = await addBioSafetyCabinet(itemDetails.value);
          if (response.success) {
            showSuccessAlert(
              "Success",
              response.message ||
                "BioSafety Cabinet has been successfully added!"
            );
            loading.value = false;
            router.push({ name: "bsc-list" });
          } else {
            // Handle API error response
            loading.value = false;
            showErrorAlert("Error", response.message || "An error occurred.");
            return;
          }
        } else {
          console.log(validateForm(itemDetails));
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

    const clear = () => {};
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
      itemDetails,
      itemDetailsValidator,
      getAssetPath,
      submit,
      loading,
      setDates,
      clear,
      srfs,
      CleanRoomInstruments,
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