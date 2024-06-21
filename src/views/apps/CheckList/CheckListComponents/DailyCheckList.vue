<template>
  <!--begin::Modal - New Address-->
  <div
    class="modal fade"
    ref="newAddressModalRef"
    id="kt_modal_new_target_daily"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    data-bs-focus="false"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-100">
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
            <h2>Add Daily CheckList</h2>
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
                    >Date</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-date-picker
                    type="date"
                    name="checklist_date"
                    id="checklist_date"
                    v-model="itemDetails.checklist_date"
                    @change="setDates($event, 'checklist_date')"
                    placeholder="Pick a day"
                    :editable="false"
                  />
                </div>
                <!--end::Col-->
              </div>
              <!--end::Input group-->

              <div class="table-responsive mb-10">
                <!--begin::Table-->

                <table
                  class="table table-responsive g-5 m-2 w-100 fw-bold text-gray-700 table-bordered"
                  data-kt-element="Selects"
                >
                  <!--begin::Table head-->
                  <thead>
                    <tr class="fs-5 fw-bold text-gray-700 text-center">
                      <th class="col-1" rowspan="2">Sr.No</th>
                      <th class="col-3" rowspan="2">Check Points</th>
                      <th class="col-3" colspan="2">Requirements</th>
                      <th class="col-6" rowspan="2">Remark</th>
                    </tr>
                    <tr class="fs-6 fw-bold text-gray-700 text-center">
                      <th>Yes</th>
                      <th>No</th>
                    </tr>
                  </thead>
                  <!--end::Table head-->
                  <!--begin::Table body-->
                  <tbody>
                    <tr class="justifiy-content-start" v-for="(item, index) in dailyCheckList" :key="index">
                      <td class="text-center">
                        <div
                          class="form-control"
                          >{{item.id}}</div>
                      </td>
                      <td class="">
                        <div
                          class="form-control min-w-100px"
                          >{{item.point}}</div>
                      </td>
                      <td class="">
                        <div
                        class="form-check form-check-custom form-check-solid text-center justify-content-center"
                      >
                        <input
                          type="radio"
                          class="form-check-input"
                          :name="'ticked_' + index"
                          value="yes"
                          id="yes"
                        />
                      </div>

                      </td>
                      <td class="">
                        <div
                        class="form-check form-check-custom form-check-solid text-center justify-content-center"
                      >
                        <input
                          type="radio"
                          class="form-check-input"
                          :name="'ticked_' + index"
                          value="no"
                          id="no"
                        />
                      </div>
                      </td>
                      <td class="">
                        <div class="form-group">
                          <Field
                          type="text"
                          as="textarea"
                          name="reference_lab_address"
                            class="form-control min-w-300px"
                          placeholder="Reference laboratory Address"
                        />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                  <!--end::Table body-->
                  <!--begin::Table foot-->
                  <!--end::Table foot-->
                </table>
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
import { DailyCheckList } from "@/core/model/checklist";

interface NewAddressData {}

interface Item {
  checklist_date: string;
  data: [];
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

    const dailyCheckList = ref(DailyCheckList);

    const itemDetails = ref<Item>({
      checklist_date: "",
      data: [],
      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
      is_active: "1",
    });

    const ItemValidator = Yup.object().shape({});

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
    }

    const clear = () => {
      itemDetails.value = {
        checklist_date: "",
        data: [],
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
      DailyCheckList,
      dailyCheckList,
    };
  },
});
</script>
      
      

