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
          @submit="submit"
          novalidate
        >
          <!--begin::Card body-->
          <div class="card-body p-sd-2 p-lg-9">
            <!--begin::Input group-->
            <!--begin::Heading-->
            <div class="text-center mb-10">
              <!--begin::Title-->
              <h1 class="text-dark mb-3" style="font-size: 2.3rem">
                Service Request Form
              </h1>
              <!--end::Title-->
            </div>
            <!--end::Heading-->

            <!-- extra fields -->
            <div class="row mb-6">
              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fw-semobold fw-bold text-gray-700 fs-6 text-nowrap"
                  >Customer Name</label
                >
                <div class="form-control form-control-lg form-control-solid">
                  {{ customerData.company_name }}
                </div>
              </div>

              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                  >Address</label
                >
                <div class="form-control form-control-lg form-control-solid">
                  {{ customerData.address1 || "" }}
                  {{ customerData.address2 || "" }}
                  {{ customerData.city || "" }}
                  {{ customerData.pincode || "" }}
                  {{ customerData.state || "" }}
                  {{ customerData.country || "" }}
                </div>
              </div>
            </div>
            <!--end::Input group-->

            <!-- extra fields -->
            <div class="row mb-6">
              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                  >Contact person</label
                >
                <div class="form-control form-control-lg form-control-solid">
                  {{ customerData.name }}
                </div>
              </div>
            </div>

            <div class="card p-1 w-100">
              <div class="table-responsive mb-10">
                <table
                  class="table table-responsive g-5 gs-0 m-2 w-100 fw-bold text-gray-700 table-bordered"
                >
                  <thead>
                    <tr class="fs-5 fw-bold text-gray-700 text-center">
                      <th>Description of Items</th>
                      <th v-for="item in SrfItems" :key="item.id">
                        {{ item.test }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(test, testIdx) in SrfTests" :key="test.id">
                      <td class="text-center">{{ test.test }}</td>
                      <td
                        v-for="(item, itemIdx) in SrfItems"
                        :key="itemIdx"
                        class="text-center"
                      >
                        <div class="form-check-solid">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            :id="'srf_' + testIdx + '_' + itemIdx"
                            :value="false"
                            :name="'srf_' + testIdx + '_' + itemIdx"
                            :checked="itemDetails.srf_data[testIdx][itemIdx]"
                            @change="toggleSelection(testIdx, itemIdx)"
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="row mb-6">
              <div class="form-group col-md-6 mt-4">
                <!--begin::Label-->
                <label class="required fs-5 fw-bold text-gray-700 mb-2"
                  >Test Method</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <div>
                  <el-select
                    class="w-100"
                    filterable
                    name="area"
                    v-model="itemDetails.test_method"
                    placeholder="--Select--"
                  >
                    <el-option
                      v-for="item in TestMethods"
                      :key="item.id"
                      :label="item.method"
                      :value="item.id"
                    />
                  </el-select>
                </div>
                <!--end::Col-->
                <div
                  class="fv-plugins-message-container mt-3"
                  v-if="!itemDetails.test_method"
                >
                  <div class="fv-help-block">
                    <ErrorMessage name="test_method" />
                  </div>
                </div>
              </div>
              <div class="form-group col-md-6">
                <label
                  class="col-form-label required fw-bold text-gray-700 fw-semobold fs-6 text-nowrap"
                  >Due Date</label
                >
                <div class="block">
                  <el-date-picker
                    class="w-100"
                    type="date"
                    name="due_date"
                    id="due_date"
                    v-model="itemDetails.due_date"
                    @change="setDates($event, 'due_date')"
                    placeholder="Pick a day"
                    :editable="false"
                  />
                </div>
              </div>
            </div>

            <div class="row mb-6">
              <div class="form-group col-md-6 mb-8 mb-sd-8">
                <label
                  class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap"
                  >Statement of Conformity
                </label>
                <div class="input-group gap-6">
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      value="yes"
                      v-model="itemDetails.conformity"
                      @change="handleConformity"
                      id="yes"
                      name="conformity"
                    />
                    <label
                      for="yes"
                      class="form-check-label fw-bold text-gray-700 text-nowrap"
                      >Yes</label
                    >
                  </div>

                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      value="no"
                      v-model="itemDetails.conformity"
                      @change="handleConformity"
                      id="no"
                      name="conformity"
                    />
                    <label
                      for="no"
                      class="form-check-label fw-bold text-gray-700 text-nowrap"
                      >No</label
                    >
                  </div>
                </div>
              </div>
              <!--end::Input group-->
              <div
                class="form-group col-md-6 mb-8 mb-sd-8"
                v-if="conformityRef"
              >
                <label
                  class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap"
                  >Conformity Based
                </label>
                <div class="input-group gap-6">
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      value="customer"
                      v-model="itemDetails.conformity_based"
                      id="customer"
                      name="conformity_based"
                    />
                    <label
                      for="customer"
                      class="form-check-label fw-bold text-gray-700 text-nowrap"
                      >Customer Specified</label
                    >
                  </div>

                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      value="lab"
                      v-model="itemDetails.conformity_based"
                      id="lab"
                      name="conformity_based"
                    />
                    <label
                      for="lab"
                      class="form-check-label fw-bold text-gray-700 text-nowrap"
                      >Laboratory</label
                    >
                  </div>
                </div>
              </div>
              <!--end::Input group-->
            </div>

            <div class="row mb-6 mt-6">
              <div
                class="form-check form-switch form-check-custom form-check-primary form-check-solid"
              >
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  name="customerNameRef"
                  id="customerNameRef"
                  v-model="customerNameRef"
                  @change="handleToggle"
                />
                <label
                  class="form-check-label fw-bold text-primary fw-semobold fs-6"
                  for="customerNameRef"
                >
                  Want Customer Name Same as Above.
                </label>
              </div>
            </div>

            <!-- extra fields -->
            <div class="row mb-6">
              <div class="form-group col-12" v-if="customerNameRef">
                <label
                  class="col-lg-4 col-form-label required fw-semobold fw-bold text-gray-700 fs-6 text-nowrap"
                  >Customer Name (Test Report)</label
                >
                <div class="form-control form-control-lg form-control-solid">
                  {{ itemDetails.customer_name }}
                </div>
              </div>
              <div class="form-group col-12" v-else>
                <label
                  class="col-lg-4 col-form-label required fw-semobold fw-bold text-gray-700 fs-6 text-nowrap"
                  >Customer Name (Test Report)</label
                >
                <Field
                  type="text"
                  name="customer_name"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="M/S."
                  v-model="itemDetails.customer_name"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="customer_name" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer flex-center w-100">
            <!--begin::Button-->
            <button
              type="submit"
              ref="submitButton"
              class="btn btn-primary w-sd-25 w-lg-25"
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
import { defineComponent, ref, onMounted } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { useAuthStore, type User } from "@/stores/auth";
import { SrfTests, SrfItems, TestMethods } from "@/core/model/srf";

import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";
import { useBodyStore } from "@/stores/body";
import { useRouter, useRoute } from "vue-router";
import LayoutService from "@/core/services/LayoutService";
import { validateUser, addServiceRequest } from "@/stores/api";
import ApiService from "@/core/services/ApiService";
import moment from "moment";

interface srf {
  testId: string;
  itemId: string;
  selected: boolean;
}

export default defineComponent({
  name: "srf-add",
  components: {
    Field,
    VForm,
    ErrorMessage,
  },
  setup() {
    const submitButton = ref<null | HTMLButtonElement>(null);
    const loading = ref(false);

    // Toggle Conformity Based on yes/no
    const conformityRef = ref(false);
    const customerNameRef = ref(false);

    const handleConformity = async (e) => {
      console.log(e);
      if (e != null && e.target) {
        if (e.target.value == "yes") {
          conformityRef.value = true;
        } else {
          conformityRef.value = false;
          itemDetails.value.conformity_based = "";
        }
      } else {
        conformityRef.value = false;
        itemDetails.value.conformity_based = "";
      }
    };

    const handleToggle = (e) => {
      if (e.target.checked === true) {
        customerNameRef.value = true;

        itemDetails.value.customer_name = customerData.value.company_name;
      } else {
        customerNameRef.value = false;

        itemDetails.value.customer_name = "";
      }
    };

    const store = useAuthStore();
    const bodyStore = useBodyStore();

    const router = useRouter();
    const route = useRoute();
    const companyID = route.params.company;
    const customerID = route.params.customer;

    const bgImage = getAssetPath("media/patterns/layered-waves-haikei.svg");

    //Create form validation object
    const itemValidator = Yup.object().shape({});

    const data = ref({
      company_id: customerID,
      customer_id: customerID,
    });

    const customerData = ref({
      id: customerID,
      name: "",
      company_name: "",
      address1: "",
      address2: "",
      country: "",
      state: "",
      city: "",
      pincode: "",
    });

    const itemDetails = ref({
      srf_no: "",
      customer_id: customerID,
      srf_data: Array.from({ length: SrfTests.length }, () =>
        Array.from({ length: SrfItems.length }, () => false)
      ),
      due_date: "",
      test_method: "",
      conformity: "",
      conformity_based: "",
      customer_name: "",
      company_id: companyID,
      created_by: customerID,
      updated_by: customerID,
      is_active: 1,
    });

    onMounted(async () => {
      try {
        data.value.company_id = companyID;
        data.value.customer_id = customerID;

        let response = await validateUser(data.value);
        console.log(response);

        if (response) {
          customerData.value.name = response.name ? response.name : "";
          customerData.value.company_name = response.company_name
            ? response.company_name
            : "";
          customerData.value.address1 = response.address1
            ? response.address1
            : "";
          customerData.value.address2 = response.address2
            ? response.address2
            : "";
          customerData.value.city = response.city ? response.city : "";
          customerData.value.pincode = response.pincode ? response.pincode : "";
          customerData.value.state = response.state ? response.state : "";
          customerData.value.country = response.country ? response.country : "";
        }
      } catch (error) {
        showErrorAlert("Error", "An error occurred during the API call.");
        loading.value = false;
        console.log(error);
      }

      console.log(route.params);
    });

    const selectedItems = ref({});

    // Initialize srf_data as a 2D array with default value of false
    itemDetails.value.srf_data = Array.from({ length: SrfTests.length }, () =>
      Array.from({ length: SrfItems.length }, () => false)
    );

    for (const test of SrfTests) {
      selectedItems.value[test.id] = {};
      for (const item of SrfItems) {
        selectedItems.value[test.id][item.id] = false;
      }
    }

    const toggleSelection = async (testId: number, itemId: number) => {
      console.log("testId:", testId);
      console.log("itemId:", itemId);

      // Toggle the selected state
      itemDetails.value.srf_data[testId][itemId] =
        !itemDetails.value.srf_data[testId][itemId];
      console.log(itemDetails.value.srf_data);
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

    const validateForm = (formData) => {
      for (const key in formData) {
        let value = formData[key];
        if (key !== "srf_no" && key !== "conformity_based") {
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

    const submit = async () => {
      try {
        loading.value = true;

        const result = validateForm(itemDetails.value);

        if (result == false) {
          showErrorAlert("Warning", "Please fill all the details correctly.");
          loading.value = false;
          return;
        }

        if (submitButton.value) {
          // Activate indicator
          submitButton.value.setAttribute("data-kt-indicator", "on");
        }

        // Call your API here
        const response = await addServiceRequest(itemDetails.value);

        if (response?.success) {
          // Handle successful API response
          loading.value = false;
          showSuccessAlert(
            "Success",
            response.message || "Service Request Form  has been successfully added!"
          );
          // window.location.href = "https://www.google.com";
          router.push({ name: "thankyou" });
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
        if (submitButton.value) {
          submitButton.value.removeAttribute("data-kt-indicator");
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
      submitButton,
      submit,
      customerData,
      itemDetails,
      itemValidator,
      getAssetPath,
      setDates,
      loading,
      SrfTests,
      SrfItems,
      selectedItems,
      toggleSelection,
      TestMethods,

      customerNameRef,
      conformityRef,

      handleToggle,
      handleConformity,
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