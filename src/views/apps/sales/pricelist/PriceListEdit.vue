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
            <span
              @click="deleteItem"
              class="btn btn-lg btn-danger w-sd-25 w-lg-25"
            >
              Delete
            </span>
            <!--end::Button-->
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <!--begin::Button-->
            <span
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-lg btn-primary w-sd-25 w-lg-25"
              @click="submit()"
            >
              <span v-if="!loading" class="indicator-label"> Update</span>
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
  updatePriceListItem,
  getPriceListItem,
  deletePriceListItem,
} from "@/stores/api";
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
      const response = await getPriceListItem(itemId.toString());
      // console.log(response);
      itemDetails.value = {
        site_location: response.site_location,
        per_day_charge: response.per_day_charge,
        equipment_wise: JSON.parse(response.equipment_wise),
        accommodation: response.accommodation,
        travelling: response.travelling,
        training: response.training,
        customer_type: response.customer_type,
        company_id: response.company_id,
        created_by: response.created_by,
        updated_by: response.updated_by,
        is_active: response.is_active,
      };
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
        const {id, name} = foundItem;
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

    const submit = async () => {
      loading.value = true;
      // console.warn("Nice");
      try {
        // Call your API here with the form values
        const response = await updatePriceListItem(itemId, itemDetails.value);
        // console.log(response.error);
        if (!response.error) {
          // Handle successful API response
          // console.log("API response:", response);
          showSuccessAlert("Success", "Item has been successfully updated!");
          router.push({ name: "price-list" });
        } else {
          // Handle API error response
          const errorData = response.error;
          console.log("API error:", errorData);
          // console.log("API error:", errorData.response.data.errors);
          showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
        }
      } catch (error) {
        // Handle any other errors during API call
        console.error("API call error:", error);
        showErrorAlert("Error", "An error occurred during the API call.");
      } finally {
        loading.value = false;
      }
    };

    const deleteItem = () => {
      Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover from this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "red",
        confirmButtonText: "Yes, I am sure!",
      }).then((result: { [x: string]: any }) => {
        if (result["isConfirmed"]) {
          // Put your function here
          deletePriceListItem(itemId);
          router.push({ name: "price-list" });
        }
      });
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
      itemDetails,
      itemDetailsValidator,
      getAssetPath,
      submit,
      loading,
      deleteItem,
      Equipments,
      RemoveRow,
      addNewRow,
      SetEquipment,
      SetCharge,
    };
  },
});
</script>
