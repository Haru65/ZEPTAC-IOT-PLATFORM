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
              <div class="row mb-6">
                <!--begin::Col-->
                <div class="col-md-12 fv-row">
                  <!--begin::Label-->
                  <label
                    class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                    >Full Name</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Field
                    type="text"
                    v-model="leadDetails.name"
                    name="name"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Enter the contact person name"
                  />
                  <ErrorMessage class="invalid-feedback" name="name" />
                  <!--end::Input-->
                </div>
                <!--end::Col-->
              </div>

              <div class="row mb-6">
                <!--begin::Col-->
                <div class="col-md-12 fv-row">
                  <!--begin::Label-->
                  <label
                    class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                    >Email</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Field
                    type="text"
                    v-model="leadDetails.email"
                    name="email"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Enter the email"
                  />
                  <ErrorMessage class="invalid-feedback" name="email" />
                  <!--end::Input-->
                </div>
                <!--end::Col-->
              </div>

              <div class="row mb-6">
                <!--begin::Col-->
                <div class="col-md-12 fv-row">
                  <!--begin::Label-->
                  <label
                    class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                    >Phone Number</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Field
                    type="text"
                    v-model="leadDetails.phone"
                    name="phone"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Enter the phone number"
                  />
                  <ErrorMessage class="invalid-feedback" name="phone" />
                  <!--end::Input-->
                </div>
                <!--end::Col-->
              </div>
            </div>
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->

          <!--begin::Modal footer-->
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <button
              @click="clear"
              id="kt_modal_new_address_cancel"
              class="btn btn-light me-3"
            >
              Discard
            </button>
            <!--end::Button-->

            <!--begin::Button-->
            <button
              ref="submitButtonRef"
              type="submit"
              id="kt_modal_new_address_submit"
              class="btn btn-primary"
            >
              <span class="indicator-label"> Add </span>
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
import * as Yup from "yup";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import moment from "moment";

interface NewAddressData {}

export default defineComponent({
  name: "new-address-modal",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },

  emit: ["addData"],

  props: ["heading"],

  setup(props, { emit }) {
    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const newAddressModalRef = ref<null | HTMLElement>(null);
    const newAddressData = ref<NewAddressData>({});
    const validationSchema = Yup.object().shape({});

    const leadDetails = ref({
      name: "",
      email: "",
      phone: "",
    });

    function areAllPropertiesNull(array) {
      return array.some((detail) => {
        const { name, email, phone } = detail;

        // Check if any property is null or empty

        return name === "" || email === "" || phone === "";
      });
    }

    const clear = () => {
      leadDetails.value = {
        name: "",
        email: "",
        phone: "",
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
      console.log(leadDetails.value);

      const result = areAllPropertiesNull([leadDetails.value]);

      if (!result) {
        await emit("addData", leadDetails.value);
        showSuccessAlert("Success", "Lead Added Successfully!");
        clear();
        hideModal(newAddressModalRef.value);
      } else {
        showErrorAlert("Warning", "Please fill all the details Correctly");
        return;
      }
    };

    return {
      newAddressData,
      leadDetails,
      validationSchema,
      submit,
      submitButtonRef,
      newAddressModalRef,
      heading: props.heading,
      clear,
    };
  },
});
</script>
    
    