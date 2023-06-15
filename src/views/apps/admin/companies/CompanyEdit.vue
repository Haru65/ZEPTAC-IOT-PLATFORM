<template>
  <div style="width: 99%" class="bg-body p-12 rounded">
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Form-->
        <el-form
          @submit.prevent="onsubmit()"
          :model="formData"
          :rules="rules"
          ref="formRef"
        >
          <!--flex -->
          <div class="row g-9 mb-7">
            <!--begin::Modal body-->
            <div class="modal-body p-10 p-lg-17 col-md-6 fv-row">
              <!--begin::Scroll-->
              <div class="me-n7 pe-7">
                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-semobold mb-2"
                    >Company Name</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="company_name">
                    <el-input
                      v-model="formData.company_name"
                      type="text"
                      placeholder=""
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="fv-row mb-15">
                  <!--begin::Label-->
                  <label class="fs-6 fw-semobold mb-2">Address</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="address">
                    <el-input v-model="formData.address" type="text" />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--begin::Input group-->

                <div class="fv-row mb-12">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-semobold mb-2"
                    >Contact Person</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="contact_person">
                    <el-input
                      v-model="formData.contact_person"
                      type="text"
                      placeholder=""
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="fv-row mb-11">
                  <!--begin::Label-->
                  <label class="fs-6 fw-semobold mb-2">Contact</label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <el-form-item prop="mobile_number">
                    <el-input v-model="formData.mobile_number" type="text" />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--begin::Input group-->

                <!--begin::Input group-->
                <div class="fv-row mb-9">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-semobold mb-2">Email</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="email">
                    <el-input
                      v-model="formData.email"
                      type="text"
                      placeholder=""
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
              </div>
              <!--end::Billing form-->
            </div>
            <!--end::Modal body-->

            <!--begin::Modal body-->
            <div class="modal-body p-10 p-lg-17 col-md-6 fv-row">
              <!--begin::Scroll-->
              <div>
                <div class="row g-9 mb-14">
                  <!--begin::Col-->
                  <div class="col-md-6 fv-row">
                    <!--begin::Label-->
                    <label class="fs-6 fw-semobold mb-2">
                      <span class="required">Country</span>

                      <i
                        class="fas fa-exclamation-circle ms-1 fs-7"
                        data-bs-toggle="tooltip"
                        title="Country of origination"
                      ></i>
                    </label>
                    <!--end::Label-->

                    <!--begin::Input-->
                    <el-select v-model="formData.country" filterable>
                      <el-option value="">Select a Country...</el-option>
                      <el-option
                        v-for="(item, i) in countries"
                        :key="`countries-select-option-${i}`"
                        :value="item.name"
                      >
                        {{ item.name }}
                      </el-option>
                    </el-select>
                    <!--end::Input-->
                  </div>

                  <!--begin::Col-->
                  <div class="col-md-6 fv-row" v-show="state.length">
                    <!--begin::Label-->
                    <label class="fs-6 fw-semobold mb-2">
                      <span class="required">State</span>

                      <i
                        class="fas fa-exclamation-circle ms-1 fs-7"
                        data-bs-toggle="tooltip"
                        title="Country of origination"
                      ></i>
                    </label>
                    <!--end::Label-->

                    <!--begin::Input-->
                    <el-select
                      v-model="formData.state"
                      filterable
                      :disabled="!state.length"
                      prop="state"
                    >
                      <el-option value="">Select a Country...</el-option>
                      <el-option
                        v-for="item in state"
                        :key="`${item}`"
                        :value="item"
                      >
                        {{ item }}
                      </el-option>
                    </el-select>
                    <!--end::Input-->
                  </div>
                  <!--end::Col-->
                  <!--begin::Col-->
                  <div class="col-md-6 fv-row" v-show="!state.length">
                    <!--begin::Label-->
                    <label class="required fs-6 fw-semobold mb-2">State</label>
                    <!--end::Label-->
                    <!--begin::Input-->
                    <el-form-item prop="state">
                      <el-input v-model="formData.state" />
                    </el-form-item>
                    <!--end::Input-->
                  </div>
                  <!--end::Col-->
                </div>
                <!--end::Input group-->
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="row g-9 mb-9">
                  <!--begin::Col-->
                  <div class="col-md-6 fv-row">
                    <!--begin::Label-->
                    <label class="required fs-6 fw-semobold mb-2"
                      >PinCode</label
                    >
                    <!--end::Label-->

                    <!--begin::Input-->
                    <el-form-item prop="pincode">
                      <el-input v-model="formData.pincode" />
                    </el-form-item>
                    <!--end::Input-->
                  </div>
                  <!--end::Col-->

                  <div class="col-md-6 fv-row">
                    <!--begin::Label-->
                    <label class="required fs-6 fw-semobold mb-2"> City </label>
                    <!--end::Label-->

                    <!--begin::Input-->
                    <el-form-item prop="city">
                      <el-input v-model="formData.city" />
                    </el-form-item>
                    <!--end::Input-->
                  </div>
                  <!--end::Col-->
                </div>

                <div class="fv-row mb-18 mt-15">
                  <!--begin::Label-->
                  <label class="fs-6 fw-semobold mb-2">
                    <span class="required">GST Details</span>
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="gst_details">
                    <el-input type="textarea" v-model="formData.gst_details" />
                  </el-form-item>
                  <!--end::Input-->
                </div>

                <div class="row g-9 mb-14">
                  <!--begin::Input group-->
                  <div class="col-md-6 fv-row">
                    <!--begin::Label-->
                    <label class="fs-6 fw-semobold mb-2">
                      <span class="required">&nbsp;&nbsp;User Limit</span>
                    </label>
                    <!--end::Label-->
                    <br />
                    <el-input-number
                      prop="user_limit"
                      v-model="formData.user_limit"
                      class="mx-4"
                      :min="1"
                      :max="10"
                      size="mx-4"
                      controls-position="right"
                    />
                    <!--end::Input-->
                  </div>
                  <!--end::Input group-->

                  <!--begin::Input group-->
                  <div class="col-md-6 fv-row">
                    <!--begin::Label-->
                    <label class="fs-6 fw-semobold mb-2">
                      <span class="required">Select a Package</span>

                      <i
                        class="fas fa-exclamation-circle ms-1 fs-7"
                        data-bs-toggle="tooltip"
                        title="Select a Package"
                      ></i>
                    </label>
                    <!--end::Label-->

                    <!--begin::Input-->
                    <el-select
                      v-model="formData.selected_package"
                      filterable
                      prop="selected_package"
                    >
                      <el-option value="">Select a Package...</el-option>
                      <el-option
                        v-for="(item, i) in packages"
                        :key="`${i}`"
                        :value="item"
                      >
                        {{ item }}
                      </el-option>
                    </el-select>
                    <!--end::Input-->
                  </div>
                  <!--end::Input group-->
                </div>
              </div>
              <!--end::Billing form-->
            </div>
            <!--end::Modal body-->
          </div>
          <!-- flex -->
          <!--begin::Modal footer-->
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <button @click="DeleteCompany()" class="btn btn-lg btn-danger w-25">
              Discard
            </button>
            <!--end::Button-->
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <!--begin::Button-->
            <button
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-lg btn-primary w-25"
              @click="onsubmit()"
            >
              <span v-if="!loading" class="indicator-label"> Update </span>
              <span v-if="loading" class="indicator-progress">
                Please wait...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </button>
            <!--end::Button-->
          </div>
          <!--end::Modal footer-->
        </el-form>
        <!--end::Form-->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref, watch } from "vue";
import { countries, INstates } from "@/core/model/countries";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { deleteCompany, getCompany, updateCompany } from "@/stores/api";
import packag from "@/core/config/PackagesConfig";
import { useRoute } from "vue-router";
import router from "@/router";

export default defineComponent({
  name: "add-customer-modal",
  components: {},
  setup() {
    const route = useRoute();
    const formRef = ref<null | HTMLFormElement>(null);
    const addCompanyModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const state = ref([""]);
    const packages = ref(packag);
    const companyId = route.params.id;
    const formData = ref({
      company_name: " ",
      address: " ",
      city: " ",
      state: " ",
      country: "Select Country",
      pincode: " ",
      contact_person: " ",
      email: " ",
      mobile_number: " ",
      gst_details: "Details ?",
      selected_package: "Select a Package",
      user_limit: "1",
    });


    // onmounted()
    onMounted(async () => {
      const response = await getCompany(companyId);
      console.log(response);
      formData.value = {
        company_name: response.company_name,
        address: response.address,
        city: response.city,
        state: response.state,
        country: response.country,
        pincode: response.pincode,
        contact_person: response.contact_person,
        email: response.email,
        mobile_number: response.mobile_number,
        gst_details: response.gst_details,
        selected_package: response.selected_package,
        user_limit: response.user_limit,
      };
    }),
      watch(
        () => formData.value.country,
        (newVal) => {
          while (state.value.length) {
            state.value.pop();
          }
          if (newVal === "India") {
            INstates.forEach((ele) => {
              state.value.push(ele.name);
            });
          } else {
            formData.value.state = "Please Write Country Name";
          }
        }
      );

    const rules = ref({
      company_name: [
        {
          required: true,
          message: "Company name is required",
          trigger: "change",
        },
      ],
      email: [
        {
          required: true,
          message: "Company email is required",
          trigger: "change",
        },
      ],
      address: [
        {
          required: true,
          message: "Company Address is required",
          trigger: "change",
        },
      ],
      city: [
        {
          required: true,
          message: "Company City is required",
          trigger: "change",
        },
      ],
      state: [
        {
          required: true,
          message: "Company State is required",
          trigger: "change",
        },
      ],
      pincode: [
        {
          required: true,
          message: "Company Pincode is required",
          trigger: "change",
        },
      ],
      contact_person: [
        {
          required: true,
          message: "Company Contact Person Name is required",
          trigger: "change",
        },
      ],
      mobile_number: [
        {
          required: true,
          message: "Company Contact No is required",
          trigger: "change",
        },
      ],
      gst_details: [
        {
          required: true,
          message: "Company GST Details required",
          trigger: "change",
        },
      ],
      selected_package: [
        {
          required: true,
          message: "Package is required",
          trigger: "change",
        },
      ],
      user_limit: [
        {
          required: true,
          message: "User Limit is required",
          trigger: "change",
        },
      ],
    });

    const onsubmit = () => {
      if (!formRef.value) {
        return null;
      }
      formRef.value.validate(async (valid: boolean) => {
        const formvalid = await updateCompany(formData.value, companyId);
        console.log(formvalid.error);
        // if error is preset catch block to
        if (!formvalid.error) {
          // check if API side correct
          if (valid) {
            loading.value = true;
            setTimeout(async () => {
              Swal.fire({
                text: "Company Detials has been successfully updated!",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Ok, got it!",
                heightAuto: false,
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              }).then(() => {
                loading.value = false;
              });
            }, 500);
          } else {
            // if Anything Wrong happends
            Swal.fire({
              text: formvalid.error.response.data.errors,
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              heightAuto: false,
              customClass: {
                confirmButton: "btn btn-primary",
              },
            });
            return false;
          }
        } else {
          if (formvalid.error.response.data.errors) {
            const errors = Object.values(formvalid.error.response.data.errors);
            Swal.fire({
              title: formvalid.error.response.data.message,
              text: errors.join("\n"),
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              heightAuto: false,
              customClass: {
                confirmButton: "btn btn-primary",
              },
            });
          } else {
            const exception = Object.values(
              formvalid.error.response.data.exception
            );
            console.error(exception);
            Swal.fire({
              title: formvalid.error.response.data.message,
              text: "An Exception Occured",
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              heightAuto: false,
              customClass: {
                confirmButton: "btn btn-primary",
              },
            });
          }
          return false;
        }
      });
    };

 // deletecompany
    const DeleteCompany = () => {
      Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this imaginary file!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "red",
        confirmButtonText: "Yes, I am sure!",
        cancelButtonText: "No, cancel it!",
        closeOnConfirm: false,
        closeOnCancel: false,
        dangerMode: true,
      }).then((result: { [x: string]: any }) => {
        if (result["isConfirmed"]) {
          // Put your function here
          deleteCompany(companyId);
          router.go(-1);
        }
      });
    };

    return {
      formData,
      rules,
      onsubmit,
      formRef,
      loading,
      addCompanyModalRef,
      getAssetPath,
      countries,
      state,
      packages,
      DeleteCompany,
    };
  },
});
</script>
