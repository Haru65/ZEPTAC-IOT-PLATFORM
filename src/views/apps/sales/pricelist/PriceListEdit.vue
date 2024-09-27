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
          @submit="onsubmit"
          :validation-schema="itemDetailsValidator"
        >
          <!--begin::Card body-->
          <div class="card-body border-top p-9">
            <!--begin::Input group-->
            <div class="row mb-6">
              <!--begin::Col-->
              <div class="col-md-6 fv-row mb-8 mb-sd-8">
                <!--end::Label-->
                <label
                  class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Site Location</label
                >
                <!--end::Label-->

                <Field
                  type="text"
                  name="site_location"
                  class="form-control form-control-lg form-control-solid"
                  v-model="itemDetails.site_location"
                  placeholder="Enter Site Location"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="site_location" />
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
                  >Per Day Charge</label
                >
                <!--end::Label-->

                <Field
                  type="text"
                  name="per_day_charge"
                  class="form-control form-control-lg form-control-solid"
                  v-model="itemDetails.per_day_charge"
                  placeholder="Per Day Charge is...₹0.0"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="complaint_no" />
                  </div>
                </div>
                <!--end::Input-->
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="row mb-6">
              <PriceCustomComponent
                v-bind:equipment_wise="itemDetails.equipment_wise"
                v-on:removeRow="RemoveRow"
                v-on:addNewRow="addNewRow"
                v-on:setTheEquipment="SetEquipment"
                v-on:setTheCharge="SetCharge"
              ></PriceCustomComponent>
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="row mb-6">
              <!--begin::Col-->
              <div class="col-md-6 fv-row mb-8 mb-sd-8">
                <!--end::Label-->
                <label class="fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Accommodation Charge</label
                >
                <!--end::Label-->
                <Field
                  type="text"
                  name="accommodation"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="₹0.00"
                  v-model="itemDetails.accommodation"
                />
                <!--end::Input-->
              </div>
              <!--end::Col-->

              <!--begin::Col-->
              <div class="col-md-6 fv-row mb-8 mb-sd-8">
                <!--end::Label-->
                <label class="fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Travelling Charge</label
                >
                <!--end::Label-->
                <Field
                  type="text"
                  name="travelling"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="₹0.00"
                  v-model="itemDetails.travelling"
                />
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
                <label class="fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Training Charge</label
                >
                <!--end::Label-->
                <Field
                  type="text"
                  name="training"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="₹0.00"
                  v-model="itemDetails.training"
                />
                <!--end::Input-->
              </div>
              <!--end::Col-->

              <!--begin::Col-->
              <div class="col-md-6 fv-row mb-8 mb-sd-8">
                <!--end::Label-->
                <label class="fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                  >Customer Type</label
                >
                <!--end::Label-->
                <Field
                  type="text"
                  name="customer_type"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter Customer Type"
                  v-model="itemDetails.customer_type"
                />
                <!--end::Input-->
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->
          </div>
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <button
              type="submit"
              ref="submitButton"
              class="btn btn-primary w-sd-25 w-lg-25"
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
import { updatePriceListItem, getPriceListItem } from "@/stores/api";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import { useAuthStore } from "@/stores/auth";
import { useRouter, useRoute } from "vue-router";
import { Equipments, GetEquipment } from "@/core/model/pricelist";
import PriceCustomComponent from "./PriceCustomComponent.vue";

export default defineComponent({
  name: "price-edit",
  components: {
    ErrorMessage,
    Field,
    VForm,
    PriceCustomComponent,
  },
  setup() {
    const submitButton = ref<null | HTMLButtonElement>(null);
    const router = useRouter();
    const route = useRoute();
    const itemId = route.params.id;
    const loading = ref(false);
    const auth = useAuthStore();
    const User = auth.GetUser();

    const itemDetailsValidator = Yup.object().shape({
      site_location: Yup.string().required().label("Site Location"),
      per_day_charge: Yup.string().required().label("Per Day Charge"),
    });

    const itemDetails = ref({
      site_location: "",
      per_day_charge: "",
      equipment_wise: [
        {
          id: "",
          name: "",
          charge: "",
        },
      ],
      accommodation: "",
      travelling: "",
      training: "",
      customer_type: "",
      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
      is_active: 1,
    });

    onMounted(async () => {
      try {
        const response = await getPriceListItem(itemId.toString());

        if (response.success) {
          itemDetails.value = {
            site_location: response.result.site_location,
            per_day_charge: response.result.per_day_charge,
            equipment_wise: JSON.parse(response.result.equipment_wise),
            accommodation: response.result.accommodation,
            travelling: response.result.travelling,
            training: response.result.training,
            customer_type: response.result.customer_type,
            company_id: response.result.company_id,
            created_by: response.result.created_by,
            updated_by: response.result.updated_by,
            is_active: response.result.is_active,
          };
        } else {
          console.error(
            `Error Occured in getPriceListItem : ${
              response.message || "Error Occured in API"
            }`
          );
        }
      } catch (err) {
        console.error(`Error Occured in getPriceListItem : ${err}`);
      }
    });

    function areAllPropertiesNotNull(array) {
      return array.some((detail) => {
        const { name, charge } = detail;

        // Check if any property is null or empty

        return name === "" || isNaN(parseFloat(charge));
      });
    }

    // add
    const addNewRow = () => {
      if (!itemDetails.value.equipment_wise.length) {
        itemDetails.value.equipment_wise.push({
          id: "",
          name: "",
          charge: "",
        });
      } else {
        const result = areAllPropertiesNotNull(
          itemDetails.value.equipment_wise
        );
        if (!result) {
          itemDetails.value.equipment_wise.push({
            id: "",
            name: "",
            charge: "",
          });
        } else {
          Swal.fire({
            icon: "info",
            title: "Please fill all the details correctly",
          });
        }
      }
      // console.log(itemDetails.value.equipment_wise)
    };

    async function SetEquipment(foundItem, index) {
      // console.log(foundItem);
      const { id, name } = foundItem;
      itemDetails.value.equipment_wise[index].id = await id;
      itemDetails.value.equipment_wise[index].name = await name;
    }

    async function SetCharge(e, index) {
      // console.log(e);
      itemDetails.value.equipment_wise[index].charge = await e.target.value;
    }

    const removeObjectWithId = (arr, id) => {
      if (id !== -1) {
        arr.splice(id, 1);
      }

      return arr;
    };

    // Remove
    const RemoveRow = (index) => {
      itemDetails.value.equipment_wise = removeObjectWithId(
        itemDetails.value.equipment_wise,
        index
      );
    };
    const validateForm = (formData) => {
      for (const key in formData) {
        let value = formData[key];
        if (key !== "customer_type") {
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

    const onsubmit = async () => {
      loading.value = true;

      const result = validateForm(itemDetails);
      console.log(itemDetails.value, result);
      if (result == false) {
        showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
        loading.value = false;
        return;
      }

      try {
        if (submitButton.value) {
          // Activate indicator
          submitButton.value.setAttribute("data-kt-indicator", "on");
        }

        // Call your API here

        const response = await updatePriceListItem(itemId, itemDetails.value);

        if (response?.success) {
          // Handle successful API response

          showSuccessAlert(
            "Success",
            response.message || "Item has been successfully inserted!"
          );

          router.push({ name: "price-list" });
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
      itemDetails,
      itemDetailsValidator,
      getAssetPath,
      onsubmit,
      loading,
      Equipments,
      RemoveRow,
      addNewRow,
      SetEquipment,
      SetCharge,
    };
  },
});
</script>
