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
              <!--begin::Label-->
              <label class="col-lg-4 col-form-label required fw-semobold fs-6"
                >Product Name</label
              >
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-8 fv-row">
                <Field
                  type="text"
                  name="name"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Product Name"
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
                >Product Detials</label
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
                    placeholder="Description"
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
                >Product Price</label
              >
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-8 fv-row">
                <Field
                  type="text"
                  name="price"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="₹0.00"
                  v-model="itemDetails.price"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="price" />
                  </div>
                </div>
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->
          </div>
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <button type="reset" class="btn btn-lg btn-danger w-25">
              Discard
            </button>
            <!--end::Button-->
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <!--begin::Button-->
            <span
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-lg btn-primary w-25"
              @click="submit()"
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
import { countries } from "@/core/model/countries";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { addPriceList } from "@/stores/api";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import packages from "@/core/config/PackagesConfig";
import { limit } from "@/core/config/WhichUserConfig";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

interface itemDetails {
  name: string;
  description: string;
  price: string;
  created_by: number;
  updated_by: number;
}

export default defineComponent({
  name: "company-add",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  setup() {
    const updateEmailButton = ref<HTMLElement | null>(null);
    const updatePasswordButton = ref<HTMLElement | null>(null);

    const loading = ref(false);
    const auth = useAuthStore();
    const emailFormDisplay = ref(false);
    const passwordFormDisplay = ref(false);
    const router = useRouter();
    const state = ref([""]);
    const User = auth.GetUser();

    const itemDetailsValidator = Yup.object().shape({
      name: Yup.string().required().label("Product Name"),
      description: Yup.string().required().label("Description"),
      price: Yup.string().required().label("Price"),
    });

    const itemDetails = ref<itemDetails>({
      name: "",
      description: "",
      price: "",
      created_by: User.id,
      updated_by: User.id,
    });

    onMounted(() => {});

    const submit = async () => {
      loading.value = true;
      console.warn("Nice");
      try {
        // Call your API here with the form values
        const response = await addPriceList(itemDetails.value);
        console.log(response.error);
        if (!response.error) {
          // Handle successful API response
          console.log("API response:", response);
          showSuccessAlert("Success", "Item has been successfully inserted!");

          clear();
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
      emailFormDisplay,
      passwordFormDisplay,
      itemDetailsValidator,
      updateEmailButton,
      updatePasswordButton,
      getAssetPath,
      submit,
      countries,
      loading,
      state,
      packages,
      limit,
    };
  },
});
</script>
