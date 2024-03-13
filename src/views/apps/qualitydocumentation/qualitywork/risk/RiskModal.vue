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
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-1000px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Form-->
        <VForm
          class="form"
          id="kt_modal_new_address_form"
          :validation-schema="riskValidator"
          @submit="submit"
        >
          <!--begin::Modal header-->
          <div class="modal-header" id="kt_modal_new_address_header">
            <!--begin::Modal title-->
            <h2>Add Risk Register</h2>
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
                <div class="col-md-6 fv-row mb-8 mb-sd-8">
                  <!--end::Label-->
                  <label
                    class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                    >Entity</label
                  >
                  <!--end::Label-->

                  <div>
                    <el-select
                      filterable
                      placeholder="Please Select Entity"
                      name="entity"
                      v-model="riskDetails.entity"
                    >
                      <el-option
                        value=""
                        disabled="disabled"
                        label="Please Select Entity"
                        key=""
                      >
                        Please Select Entity</el-option
                      >
                      <el-option
                        v-for="entity in EntityList"
                        :key="entity"
                        :value="entity"
                        :label="`${entity}`"
                      />
                    </el-select>
                    <div class="fv-help-block">
                      <ErrorMessage class="invalid-feedback" name="entity" />
                    </div>
                    <!--end::Input-->
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
                    >Threats</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Field
                    type="text"
                    as="textarea"
                    rows="5"
                    v-model="riskDetails.threats"
                    name="threats"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Enter threats..."
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="threats" />
                    </div>
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
                    >Impacts</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Field
                    type="text"
                    as="textarea"
                    rows="5"
                    v-model="riskDetails.impacts"
                    name="impacts"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Enter impacts..."
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="impacts" />
                    </div>
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Col-->
              </div>

              <div class="row mb-6">
                <div class="form-group col-md-6 mb-8 mb-sd-8">
                  <label
                    class="btn btn-outline btn-outline-dashed btn-outline-default p-5 d-flex align-items-center"
                  >
                    <!--begin::Info-->
                    <span class="d-block fw-semobold text-start">
                      <span class="text-dark fw-bold d-block fs-4 mb-2"
                        >Control Adequacy</span
                      >
                      <input
                        type="radio"
                        class="btn-check"
                        name="control_adequacy"
                        id="yes"
                        value="yes"
                        v-model="riskDetails.control_adequacy"
                        autocomplete="off"
                      />
                      <label class="btn btn-outline-primary" for="yes"
                        >Yes</label
                      >
                      <input
                        type="radio"
                        class="btn-check"
                        name="work_status"
                        id="no"
                        v-model="riskDetails.control_adequacy"
                        value="no"
                        autocomplete="off"
                      />
                      <label class="btn btn-outline-primary" for="no">No</label>
                    </span>
                    <!--end::Info-->
                  </label>
                </div>
                <div class="form-group col-md-6 mb-8 mb-sd-8">
                  <label
                    class="btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center"
                  >
                    <!--begin::Info-->
                    <span class="d-block fw-semobold text-start">
                      <span class="text-dark fw-bold d-block fs-4 mb-2"
                        >Review Date</span
                      >
                      <div class="block">
                        <el-date-picker
                          type="date"
                          name="review_date"
                          id="review_date"
                          v-model="riskDetails.review_date"
                          @change="setDates($event, 'review_date')"
                          placeholder="Pick a day"
                          :editable="false"
                        />
                      </div>
                    </span>
                    <!--end::Info-->
                  </label>
                  <div
                    class="fv-plugins-message-container"
                    v-if="!riskDetails.review_date"
                  >
                    <div class="fv-help-block">
                      <ErrorMessage name="review_date" />
                    </div>
                  </div>
                </div>
              </div>

              <!--begin::Input group-->
              <div class="row mb-6">
                <!--begin::Col-->
                <div class="col-md-12 fv-row">
                  <!--begin::Label-->
                  <label
                    class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                    >Present Control</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Field
                    type="text"
                    as="textarea"
                    rows="5"
                    v-model="riskDetails.present_control"
                    name="present_control"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Specify present controls..."
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="present_control" />
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
                <div class="col-md-12 fv-row">
                  <!--begin::Label-->
                  <label
                    class="required fs-5 fw-bold text-gray-700 text-nowrap mb-2"
                    >Additional Control</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Field
                    type="text"
                    as="textarea"
                    rows="5"
                    v-model="riskDetails.additional_control"
                    name="additional_control"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Specify additonal controls..."
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="additional_control" />
                    </div>
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Col-->
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
              :data-kt-indicator="loading2 ? 'on' : null"
              ref="submitButtonRef"
              id="kt_modal_new_address_submit"
              class="btn btn-primary"
            >
              <span v-if="!loading2" class="indicator-label"> Submit </span>
              <span v-if="loading2" class="indicator-progress">
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
import { addRiskRegister } from "@/stores/api";
import { EntityList } from "@/core/model/risk";

interface NewAddressData {}

interface RISK {
  entity: string;
  threats: string;
  impacts: string;
  present_control: string;
  control_adequacy: string;
  review_date: string;
  additional_control: string;
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
  emits: ["risk-added"],
  setup(props, { emit }) {
    const loading = ref(false);
    const loading2 = ref(false);
    const auth = useAuthStore();
    const router = useRouter();
    const User = auth.GetUser();

    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const newAddressModalRef = ref<null | HTMLElement>(null);
    const newAddressData = ref<NewAddressData>({});

    const riskDetails = ref<RISK>({
      entity: "",
      threats: "",
      impacts: "",
      present_control: "",
      control_adequacy: "yes",
      review_date: "",
      additional_control: "",
      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
      is_active: "1",
    });

    const riskValidator = Yup.object().shape({
      threats: Yup.string().required().label("Threats"),
      impacts: Yup.string().required().label("Impacts"),
      present_control: Yup.string().required().label("Present Control"),
      additional_control: Yup.string().required().label("Addtional Control"),
    });

    async function setDates(e, dateType) {
      if (e != null) {
        riskDetails.value[dateType] = moment(e).format("YYYY-MM-DD");
      } else {
        riskDetails.value[dateType] = "";
      }
      console.log(dateType, " ", riskDetails.value[dateType]);
    }

    function areAllPropertiesNull(array) {
      return array.some((detail) => {
        const {
          entity,
          threats,
          impacts,
          present_control,
          control_adequacy,
          review_date,
          additional_control,
        } = detail;

        // Check if any property is null or empty

        return (
          entity === "" ||
          threats === "" ||
          impacts === "" ||
          present_control === "" ||
          control_adequacy === "" ||
          review_date === "" ||
          additional_control === ""
        );
      });
    }

    const clear = () => {
      riskDetails.value = {
        entity: "",
        threats: "",
        impacts: "",
        present_control: "",
        control_adequacy: "yes",
        review_date: "",
        additional_control: "",
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
      console.log(riskDetails.value);
      loading2.value = true;

      const result = areAllPropertiesNull([riskDetails.value]);
      if (!result) {
        try {
          // Call your API here with the form values
          const response = await addRiskRegister(riskDetails.value);
          // console.log(response.error);
          if (!response.error) {
            // Handle successful API response
            //   console.log("API response:", response);
            loading.value = false;
            showSuccessAlert("Success", "Risk Added Successfully!");
            clear();
            await emit("risk-added");
            hideModal(newAddressModalRef.value);
            // clear();
          } else {
            // Handle API error response
            // const errorData = response.error;
            loading2.value = false;
            showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
          }
        } catch (error) {
          // Handle any other errors during API call
          // console.error("API call error:", error);
          showErrorAlert("Error", "An error occurred during the API call.");
        } finally {
          loading2.value = false;
        }
      } else {
        showErrorAlert("Warning", "Please fill all the details Correctly");
        loading2.value = false;
        return;
      }
    };

    return {
      loading2,
      newAddressData,
      riskDetails,
      riskValidator,
      submit,
      submitButtonRef,
      newAddressModalRef,
      setDates,
      clear,
      EntityList,
    };
  },
});
</script>
  
  