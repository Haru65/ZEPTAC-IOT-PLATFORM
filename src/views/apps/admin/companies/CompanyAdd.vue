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
          @submit="onsubmit()"
          :validation-schema="companyDetailsValidator"
        >
          <!--begin::Card body-->
          <div class="card-body border-top p-9">
            <!--begin::Input group-->
            <div class="row mb-6">
              <!--begin::Label-->
              <label class="col-lg-4 col-form-label required fw-semobold fs-6"
                >Company Name & Address</label
              >
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-8">
                <!--begin::Row-->
                <div class="row">
                  <!--begin::Col-->
                  <div class="col-lg-6 fv-row">
                    <Field
                      type="text"
                      name="cname"
                      class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                      placeholder="Company name"
                      v-model="companyDetails.name"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="cname" />
                      </div>
                    </div>
                  </div>
                  <!--end::Col-->

                  <!--begin::Col-->
                  <div class="col-lg-6 fv-row">
                    <Field
                      type="text"
                      name="caddr"
                      class="form-control form-control-lg form-control-solid"
                      placeholder="Company address"
                      v-model="companyDetails.address"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="caddr" />
                      </div>
                    </div>
                  </div>
                  <!--end::Col-->
                </div>
                <!--end::Row-->
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="row mb-6">
              <!--begin::Label-->
              <label class="col-lg-4 col-form-label required fw-semobold fs-6"
                >Email</label
              >
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-8 fv-row">
                <Field
                  type="text"
                  name="email"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Email"
                  v-model="companyDetails.email"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="email" />
                  </div>
                </div>
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="row mb-6">
              <!--begin::Label-->
              <label class="col-lg-4 col-form-label fw-semobold fs-6">
                <span class="required">Contact Phone</span>

                <i
                  class="fas fa-exclamation-circle ms-1 fs-7"
                  data-bs-toggle="tooltip"
                  title="Phone number must be active"
                ></i>
              </label>
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-8 fv-row">
                <Field
                  type="tel"
                  name="phone"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Phone number"
                  v-model="companyDetails.phone"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="phone" />
                  </div>
                </div>
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <!--end::Input group-->

            <!--begin::Input group-->

            <div class="row mb-6">
              <!--begin::Label-->
              <label class="col-lg-4 col-form-label fw-semobold fs-6">
                <span class="required">Password</span>

                <i
                  class="fas fa-exclamation-circle ms-1 fs-7"
                  data-bs-toggle="tooltip"
                  title="Phone number must be active"
                ></i>
              </label>
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-8 fv-row">
                <Field
                  type="password"
                  name="password"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Password"
                  v-model="companyDetails.password"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="password" />
                  </div>
                </div>
              </div>
              <!--end::Col-->
            </div>

            <!--begin::Input group-->
            <div class="row mb-6">
              <!--begin::Label-->
              <label class="col-lg-4 col-form-label required fw-semobold fs-6"
                >Role</label
              >
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-8 fv-row">
                <Field
                  as="select"
                  name="role"
                  class="form-select form-select-solid form-select-lg"
                  v-model="companyDetails.role"
                >
                  <option
                    v-for="ele in roleArray"
                    :key="ele.id"
                    :value="ele.id"
                  >
                    {{ ele.name }}
                  </option>
                </Field>
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="role" />
                  </div>
                </div>
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->
            <!--begin::Col-->
          </div>
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <button type="reset" class="btn btn-lg btn-danger w-25">
              Discard
            </button>
            <!--end::Button-->
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <!--begin::Button-->
            <button
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-lg btn-primary w-25"
              type="submit"
            >
              <span v-if="!loading" class="indicator-label"> Submit </span>
              <span v-if="loading" class="indicator-progress">
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
import { defineComponent, ref, watch } from "vue";
import { countries, INstates } from "@/core/model/countries";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { addCompany } from "@/stores/api";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";

interface companyDetails {
  avatar: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  password: string;
  role: number;
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

    const emailFormDisplay = ref(false);
    const passwordFormDisplay = ref(false);

    const companyDetailsValidator = Yup.object().shape({
      cname: Yup.string().required().label("Company name"),
      caddr: Yup.string().required().label("Company address"),
      email: Yup.string().required().label("Email"),
      phone: Yup.string().required().label("Phone"),
      password: Yup.string().required().label("Password"),
    });

    const companyDetails = ref<companyDetails>({
      avatar: getAssetPath("media/avatars/300-1.jpg"),
      name: "",
      address: "",
      email: "",
      phone: "",
      password: "",
      role: 2,
    });

    const onsubmit = () => {
      loading.value = true;
      console.warn("Nice");
    };

    const removeImage = () => {
      companyDetails.value.avatar = "/media/avatars/blank.png";
    };

    return {
      companyDetails,
      emailFormDisplay,
      passwordFormDisplay,
      removeImage,
      companyDetailsValidator,
      updateEmailButton,
      updatePasswordButton,
      getAssetPath,
      onsubmit,
      loading,
    };
  },
});
</script>
