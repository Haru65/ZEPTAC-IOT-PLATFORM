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
          <div class="row mb-6" v-if="identifier == 'Admin'">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-semobold fs-6"
              >Company</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <el-select v-model="itemDetails.company_id" filterable  placeholder="Please Select Company...">
                <el-option
                  v-for="item in Companies"
                  :key="item.id"
                  :label="item.company_name"
                  :value="item.id"
                />
              </el-select>
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="company" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!-- extra fields -->
            <div class="row mb-6">
              <!--begin::Label-->
              <label class="col-lg-4 col-form-label required fw-semobold fs-6"
                >Instrument Model No.</label
              >
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-8 fv-row">
                <Field
                  type="text"
                  name="model_no"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter Instrument Model"
                  v-model="itemDetails.model_no"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="model_no" />
                  </div>
                </div>
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="row mb-6">
              <!--begin::Label-->
              <label class="col-lg-4 col-form-label required fw-semobold fs-6"
                >Instrument Name</label
              >
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-8 fv-row">
                <Field
                  type="text"
                  name="name"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter Instrument Name"
                  v-model="itemDetails.name"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="name" />
                  </div>
                </div>
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->
            <!--begin::Input group-->
            <div class="row mb-3">
              <!--begin::Label-->
              <label class="col-lg-4 col-form-label required fw-semobold fs-6"
                >Instrument Detials</label
              >
              <!--end::Label-->
              <!--begin::Col-->
              <div class="col-lg-8">
                <!--begin::Row-->
                <!--begin::Col-->
                <div class="col-lg fv-row">
                  <Field
                    type="text"
                    as="textarea"
                    name="description"
                    rows="10"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Description of instrument..."
                    v-model="itemDetails.description"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="description" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
                <!--end::Row-->
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->
            <!--begin::Input group-->
            <div class="row mb-6">
              <!--begin::Label-->
              <label class="col-lg-4 col-form-label required fw-semobold fs-6"
                >Instrument Quantity</label
              >
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-8 fv-row">
                <Field
                  type="text"
                  name="quantity"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Enter a quantity"
                  v-model="itemDetails.quantity"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="quantity" />
                  </div>
                </div>
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->
          </div>
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <span @click="deleteItem" class="btn btn-lg btn-danger w-25">
              Delete
            </span>
            <!--end::Button-->
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <!--begin::Button-->
            <span
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-lg btn-primary w-25"
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
  updateInstrument,
  getInstrument,
  deleteInstrument,
getCompanies,
} from "@/stores/api";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import { useAuthStore } from "@/stores/auth";
import { useRouter, useRoute } from "vue-router";
import ApiService from "@/core/services/ApiService";
import moment from "moment";
import { Identifier } from "@/core/config/WhichUserConfig";

interface itemDetails {
  name: string;
  description: string;
  quantity: string;
  model_no: string;
  company_id: string;
  created_by: number;
  updated_by: number;
}

export default defineComponent({
  name: "instrument-edit",
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
    const Companies = ref([{ id: "", company_name: "" }]);
    let limit = ref(500);
    const itemId = route.params.id;

    const itemDetailsValidator = Yup.object().shape({
      name: Yup.string().required().label("Instrument Name"),
      description: Yup.string().required().label("Instrument Description"),
      quantity: Yup.string().required().label("Quantity"),
      model_no: Yup.string().required().label("Model No."),
    });

    const getdropcomp = async () => {
      ApiService.setHeader();
      const response = await getCompanies(`limit=${limit.value}`);
      Companies.value.push(
        ...response.result.data.data.map(({ created_at, ...rest }) => ({
          ...rest,
          created_at: moment(created_at).format("MMMM Do YYYY"),
        }))
      );
    };

    const itemDetails = ref<itemDetails>({
      name: "",
      description: "",
      quantity: "",
      model_no: "",
      company_id: "",
      created_by: User.id,
      updated_by: User.id,
    });

    onMounted(async () => {
      Companies.value.pop();
      const response = await getInstrument(itemId.toString());
      console.log(response);
      itemDetails.value = {
        name: response.name,
        description: response.description,
        quantity: response.quantity,
        model_no: response.model_no,
        company_id: response.company_id ? response.company_id : "",
        created_by: response.created_by,
        updated_by: response.updated_by,
      };
      await getdropcomp();
    });

    const submit = async () => {
      loading.value = true;
      console.warn("Nice");
      try {
        // Call your API here with the form values
        const response = await updateInstrument(itemId, itemDetails.value);
        console.log(response.error);
        if (!response.error) {
          // Handle successful API response
          console.log("API response:", response);
          showSuccessAlert(
            "Success",
            "Instrument has been successfully updated!"
          );
          router.push({ name: "instrument-list" });
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
          deleteInstrument(itemId);
          router.push({ name: "instrument-list" });
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

    const clear = () => {
      console.log("clear");
    };

    return {
      itemDetails,
      itemDetailsValidator,
      getAssetPath,
      submit,
      loading,
      Companies,
      deleteItem,
      identifier,

    };
  },
});
</script>
    
<style>
.el-input__inner {
  font-weight: 500;
}
.el-input__wrapper {
  color: red !important;
  height: 3.5rem;
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