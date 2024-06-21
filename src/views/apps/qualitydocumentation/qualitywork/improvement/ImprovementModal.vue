<template>
  <!--begin::Modal - New Address-->
  <div
    class="modal fade"
    ref="newAddressModalRef"
    id="kt_modal_ncr"
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
          :validation-schema="itemDetailsValidator"
          @submit="submit"
        >
          <!--begin::Modal header-->
          <div class="modal-header" id="kt_modal_new_address_header">
            <!--begin::Modal title-->
            <h2>Add Improvement Action</h2>
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
                <div class="col-md-12 fv-row mb-8 mb-sd-8">
                  <!--begin::Label-->
                  <label class="required fs-5 fw-bold text-gray-700 mb-2"
                    >Area of Improvement</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <div>
                    <el-select
                      v-model="itemDetails.area"
                      filterable
                      name="area"
                      @change="setTarget($event)"
                      placeholder="--Select--"
                    >
                      <el-option
                        v-for="item in AreaOfImprovement"
                        :key="item.id"
                        :label="item.area"
                        :value="item.id"
                      />
                    </el-select>
                  </div>
                  <!--end::Col-->
                  <div
                    class="fv-plugins-message-container mt-3"
                    v-if="!itemDetails.area"
                  >
                    <div class="fv-help-block">
                      <ErrorMessage name="area" />
                    </div>
                  </div>
                </div>
              </div>

              <div class="row mb-6">
                <!--begin::Col-->
                <div class="col-md-12 fv-row">
                  <!--begin::Label-->
                  <label
                    class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                    >Target Rating</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <div class="form-control form-control-lg form-control-solid">
                    {{ itemDetails.target }}
                  </div>
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
                    >Select Quarter</label
                  >
                  <!--end::Label-->

                  <div>
                    <el-select
                      v-model="itemDetails.quarter"
                      filterable
                      name="quarter"
                      placeholder="--Select--"
                    >
                      <el-option
                        v-for="item in Quarters"
                        :key="item.quarter"
                        :label="item.quarter"
                        :value="item.quarter"
                      />
                    </el-select>
                  </div>
                  <!--end::Col-->
                  <div
                    class="fv-plugins-message-container mt-3"
                    v-if="!itemDetails.quarter"
                  >
                    <div class="fv-help-block">
                      <ErrorMessage name="quarter" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
              </div>

              <div class="row mb-6">
                <!--begin::Col-->
                <div class="col-md-12 fv-row">
                  <!--begin::Label-->
                  <label
                    class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                    >OutCome of Improvement</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Field
                    type="text"
                    as="textarea"
                    rows="3"
                    v-model="itemDetails.outcome"
                    name="outcome"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Specify the outcome achieved..."
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="outcome" />
                    </div>
                  </div>
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
              type="reset"
              @click="clear"
              id="kt_modal_new_address_cancel"
              class="btn btn-light w-sd-25 w-lg-25 me-3"
            >
              Discard
            </button>
            <!--end::Button-->

            <!--begin::Button-->
            <button
              id="kt_modal_new_address_submit"
              type="submit"
              ref="submitButtonRef"
              class="btn btn-primary w-sd-25 w-lg-25 me-2 px-6"
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
import { addImprovementPlan } from "@/stores/api";

import { AreaOfImprovement, GetAreaTarget, Quarters } from "@/core/model/improvement";

interface NewAddressData {}

interface Item {
  area: string;
  target: string;
  outcome: string;
  quarter: string;
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
  emits: ["improvement-added"],
  setup(props, { emit }) {
    AreaOfImprovement;
    const loading = ref(false);
    const loading2 = ref(false);
    const auth = useAuthStore();
    const router = useRouter();
    const User = auth.GetUser();

    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const newAddressModalRef = ref<null | HTMLElement>(null);
    const newAddressData = ref<NewAddressData>({});

    const itemDetails = ref<Item>({
      area: "",
      target: "",
      outcome: "",
      quarter: "",
      approval_status: "1",
      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
      is_active: "1",
    });

    const itemDetailsValidator = Yup.object().shape({
      outcome: Yup.string().required().label("OutCome"),
    });

    async function setTarget(id) {
      if(id !== ""){
        itemDetails.value.target = await GetAreaTarget(id);
      }
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
            value = value.trim();
            if (value === "") {
              return false;
            }
          } else {
          }
      }
      return true;
    };

    const clear = () => {
      itemDetails.value = {
        area: "",
        target: "",
        outcome: "",
        quarter: "",
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

    const submit = async () => {
      loading2.value = true;
      const result = validateForm(itemDetails.value);

      if (result == false) {
        loading2.value = false;
        showErrorAlert("Warning", "Please fill all the details correctly.");
        return;
      }

      try {
        if (submitButtonRef.value) {
          // Activate indicator
          submitButtonRef.value.setAttribute("data-kt-indicator", "on");
        }

        // Call your API here

        const response = await addImprovementPlan(itemDetails.value);
        if (response?.success) {
          await emit("improvement-added");
          loading2.value = false;
          
          showSuccessAlert(
            "Success",
            response.message || "Improvement Action Plan Added Successfully!"
          );
          clear();
          hideModal(newAddressModalRef.value);
        } else {
          // Handle API error response
          loading2.value = false;
          showErrorAlert("Error", response.message || "An error occurred.");
        }
      } catch (error) {
        // Handle any other errors during API call
        console.error("API call error:", error);
        showErrorAlert("Error", "An error occurred during the API call.");
      } finally {
        if (submitButtonRef.value) {
          submitButtonRef.value.removeAttribute("data-kt-indicator");
        }
        loading2.value = false;
      }
    };

    return {
      loading2,
      newAddressData,
      itemDetails,
      itemDetailsValidator,
      submit,
      submitButtonRef,
      newAddressModalRef,
      clear,
      AreaOfImprovement,
      Quarters,
      setTarget,
    };
  },
});
</script>
  
  