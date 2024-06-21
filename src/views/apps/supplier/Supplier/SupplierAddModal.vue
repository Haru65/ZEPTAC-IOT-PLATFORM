<template>
  <!--begin::Modal - New Address-->
  <div
    class="modal fade"
    ref="newAddressModalRef"
    id="kt_modal_internal_doc"
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
          :validation-schema="ItemValidator"
          @submit="submit"
        >
          <!--begin::Modal header-->
          <div class="modal-header" id="kt_modal_new_address_header">
            <!--begin::Modal title-->
            <h2>Add Supplier</h2>
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
              <!--begin::Input group-->
              <div class="row mb-6">
                <!--begin::Col-->
                <div class="col-md-6 fv-row mb-8 mb-sd-8">
                  <!--begin::Label-->
                  <label
                    class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                    >Registration Date</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-date-picker
                    type="date"
                    name="registration_date"
                    id="registration_date"
                    v-model="itemDetails.registration_date"
                    @change="setDates($event, 'registration_date')"
                    placeholder="Pick a day"
                    :editable="false"
                  />
                  <div
                    class="fv-plugins-message-container mt-3"
                    v-if="!itemDetails.registration_date"
                  >
                    <div class="fv-help-block">
                      <ErrorMessage name="registration_date" />
                    </div>
                  </div>
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
                    >Supplier Name</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Field
                    type="text"
                    name="supplier_name"
                    v-model="itemDetails.supplier_name"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Enter supplier name"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="supplier_name" />
                    </div>
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Col-->
                <!--begin::Col-->
                <div class="col-md-6 fv-row mb-8 mb-sd-8">
                  <!--begin::Label-->
                  <label
                    class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                    >Supplier Code</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Field
                    type="text"
                    name="supplier_code"
                    v-model="itemDetails.supplier_code"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Enter supplier code"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="supplier_code" />
                    </div>
                  </div>
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
                    >Contact Person</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Field
                    type="text"
                    name="contact_person"
                    v-model="itemDetails.contact_person"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Enter contact person name"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="contact_person" />
                    </div>
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Col-->
                <!--begin::Col-->
                <div class="col-md-6 fv-row mb-8 mb-sd-8">
                  <!--begin::Label-->
                  <label
                    class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                    >Contact Number</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Field
                    type="text"
                    name="contact_number"
                    v-model="itemDetails.contact_number"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Enter contact person number"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="contact_number" />
                    </div>
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Col-->
              </div>

              <div class="row mb-6">
                <!--begin::Col-->
                <div class="col-md-6 fv-row mb-8 mb-sd-8">
                  <!--begin::Label-->
                  <label
                    class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                    >Email ID</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Field
                    type="text"
                    name="email"
                    v-model="itemDetails.email"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Enter Email"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="email" />
                    </div>
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Col-->
                <!--begin::Col-->
                <div class="col-md-6 fv-row mb-8 mb-sd-8">
                  <!--begin::Label-->
                  <label
                    class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                    >Supplier Category</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <div>
                    <el-select
                      filterable
                      placeholder="Please Select Category"
                      v-model="itemDetails.supplier_category"
                    >
                      <el-option
                        value=""
                        disabled="disabled"
                        label="Please Select Category"
                        key=""
                      >
                        Please Select Category</el-option
                      >
                      <el-option
                        v-for="item in SupplierCategory"
                        :key="item.id"
                        :value="item.id"
                        :label="item.category"
                      />
                    </el-select>
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage
                          class="invalid-feedback"
                          name="supplier_category"
                        />
                      </div>
                    </div>
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Col-->
              </div>

              <div class="row mb-6">
                <div class="form-group col-lg-12 col-md-12">
                  <label
                    class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                    >Product/Service Details</label
                  >
                  <Field
                    type="text"
                    as="textarea"
                    name="product_service_details"
                    rows="5"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Enter the product/service detail..."
                    v-model="itemDetails.product_service_details"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="product_service_details" />
                    </div>
                  </div>
                </div>
              </div>

              <!--end::Input group-->
            </div>
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->

          <!--begin::Modal footer-->
          <div class="modal-footer flex-center">
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
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";
import moment from "moment";
import { addSupplier } from "@/stores/api";
import { SupplierCategory } from "@/core/model/suppliers";

interface NewAddressData {}

interface Item {
  registration_date: string;
  supplier_name: string;
  supplier_code: string;
  contact_person: string;
  contact_number: string;
  email: string;
  supplier_category: string;
  product_service_details: string;
  status: string;
  approval_status: string;
  company_id: string;
  created_by: string;
  updated_by: string;
  is_active: string;
}

export default defineComponent({
  name: "new-address-modal",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },

  emits: ["document-added"],
  setup(props, { emit }) {
    const loading = ref(false);
    const auth = useAuthStore();
    const router = useRouter();
    const User = auth.GetUser();

    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const newAddressModalRef = ref<null | HTMLElement>(null);
    const newAddressData = ref<NewAddressData>({});

    const itemDetails = ref<Item>({
      registration_date: "",
      supplier_name: "",
      supplier_code: "",
      contact_person: "",
      contact_number: "",
      email: "",
      supplier_category: "",
      product_service_details: "",
      status: "1",
      approval_status: "1",

      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
      is_active: "1",
    });

    const ItemValidator = Yup.object().shape({
      supplier_name: Yup.string().required().label("Supplier Name"),
      supplier_code: Yup.string().required().label("Supplier Code"),
      contact_person: Yup.string().required().label("Contact Person"),
      contact_number: Yup.string().required().label("Contact Number"),
      email: Yup.string().required().label("Email"),
      product_service_details: Yup.string().required().label("product/Service"),
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

    function areAllPropertiesNull(array) {
      return array.some((detail) => {
        const {
          registration_date,
          supplier_name,
          supplier_code,
          contact_person,
          contact_number,
          email,
          supplier_category,
          product_service_details,
          status,
        } = detail;

        // Check if any property is null or empty

        return (
          registration_date === "" ||
          supplier_name === "" ||
          supplier_code === "" ||
          contact_person === "" ||
          contact_number === "" ||
          email === "" ||
          supplier_category === "" ||
          product_service_details === "" ||
          status === ""
        );
      });
    }

    const clear = () => {
      itemDetails.value = {
        registration_date: "",
        supplier_name: "",
        supplier_code: "",
        contact_person: "",
        contact_number: "",
        email: "",
        supplier_category: "",
        product_service_details: "",
        status: "1",
        approval_status: "1",

        company_id: User.company_id,
        created_by: User.id,
        updated_by: User.id,
        is_active: "1",
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
      console.log(itemDetails.value);

      const result = areAllPropertiesNull([itemDetails.value]);
      if (!result) {
        try {
          // Call your API here with the form values
          const response = await addSupplier(itemDetails.value);
          // console.log(response.error);
          if (!response.error) {
            // Handle successful API response
            //   console.log("API response:", response);
            loading.value = false;

            showSuccessAlert("Success", "Supplier Added Successfully!");
            clear();

            await emit("document-added");
            hideModal(newAddressModalRef.value);
            // clear();
          } else {
            // Handle API error response
            // const errorData = response.error;
            loading.value = false;
            showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
          }
        } catch (error) {
          // Handle any other errors during API call
          // console.error("API call error:", error);
          showErrorAlert("Error", "An error occurred during the API call.");
        } finally {
          loading.value = false;
        }
      } else {
        showErrorAlert("Warning", "Please fill all the details Correctly");
        return;
      }
    };

    return {
      newAddressData,
      itemDetails,
      ItemValidator,
      submit,
      submitButtonRef,
      newAddressModalRef,
      setDates,
      clear,
      SupplierCategory,
    };
  },
});
</script>
      
      