<template>
  <!--begin::Modal - New Address-->
  <div
    class="modal fade"
    ref="newAddressModalRef"
    :id="'kt_modal_new_address_' + $props.id"
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
          <div class="modal-body py-10 px-lg-17">
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
                <div>
                  <div class="tab-content">
                    <div
                      class="tab-pane fade show active"
                      aria-labelledby="home-tab"
                    >
                      <div class="shadow-lg p-5 mb-7 fs-4 rounded">
                        <p>Sorry! You cannot fill the report.</p>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            <!--end::Scroll-->
          </div>
        </div>
          <!--end::Modal body-->

          <!--begin::Modal footer-->
          <div class="modal-footer flex-center">

            <!--begin::Button-->
            <button
              type="button"
              class="btn btn-primary"
              disabled
            >
              <span class="indicator-label"> Submit </span>
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
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";

interface NewAddressData {}

export default defineComponent({
  name: "new-address-modal",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },

  props: ["heading","id"],

  setup(props, { emit }) {
    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const newAddressModalRef = ref<null | HTMLElement>(null);
    const newAddressData = ref<NewAddressData>({});
    const validationSchema = Yup.object().shape({
    });

    onMounted(function () {
    });

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
      newAddressData,
      validationSchema,
      submitButtonRef,
      newAddressModalRef,
      getAssetPath,
      heading: props.heading,
      id: props.id,
    };
  },
});
</script>

