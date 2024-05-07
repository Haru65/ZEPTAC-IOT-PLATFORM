<template>
  <div
    class="modal fade"
    tabindex="-1"
    id="kt_modal_1"
    ref="newAddressModalRef"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Reject / Approve</h3>

          <!--begin::Close-->
          <div
            class="btn btn-icon btn-sm btn-active-light-primary ms-2"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i class="ki-duotone ki-cross fs-1"
              ><span class="path1"></span><span class="path2"></span
            ></i>
          </div>
          <!--end::Close-->
        </div>

        <div class="modal-body">
          <div class="row mb-6">
            <div class="form-group col-md-12 mb-8 mb-sd-8">
              <label
                class="col-lg-4 col-form-label required fs-5 fw-bold text-gray-700 text-nowrap"
                >Select Approval Status
              </label>
              <div class="input-group gap-6">
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    value="2"
                    v-model="itemData.new_status"
                    id="reject"
                    name="compilance"
                  />
                  <label
                    for="reject"
                    class="form-check-label fw-bold text-gray-700 text-nowrap"
                    >Reject</label
                  >
                </div>

                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    value="3"
                    v-model="itemData.new_status"
                    id="approve"
                    name="new_status"
                  />
                  <label
                    for="approve"
                    class="form-check-label fw-bold text-gray-700 text-nowrap"
                    >Approve</label
                  >
                </div>
              </div>
            </div>
            <!--end::Input group-->
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">
            Close
          </button>

          <!--begin::Button-->
          <button
            ref="submitButtonRef"
            type="button"
            :data-kt-indicator="dataLoading ? 'on' : ''"
            id="kt_modal_new_address_submit"
            class="btn btn-success px-6"
            @click="updateApprovalStatus"
          >
            <span v-if="!dataLoading" class="indicator-label"> Update</span>
            <span v-if="dataLoading" class="indicator-progress">
              Please wait...
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span>
            </span>
          </button>
          <!--end::Button-->
        </div>
      </div>
    </div>
  </div>
</template>
      
      <script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";
import moment from "moment";
import {
  NonConformanceRecordStatus,
  updateCorrectiveAction,
} from "@/stores/api";
import Loading from "@/components/kt-datatable/table-partials/Loading.vue";

export default defineComponent({
  name: "new-approval-modal",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },

  emits: ["reloadData"],
  props: ["data"],

  setup(props, { emit }) {
    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const newAddressModalRef = ref<null | HTMLElement>(null);

    const dataLoading = ref(false);

    const itemData = ref({
      id: "",
      approval_status: "",
      new_status: "",
      company_id: "",
      updated_by: "",
    });

    onMounted(async () => {
      // Watch for changes in props.data and update itemData accordingly
      watch(
        () => props.data,
        (newValue) => {
          itemData.value = { ...newValue };
        }
      );
    });

    //   const submit = async () => {
    //     console.log(itemData.value);
    //     dataLoading.value = true;

    //     //   console.warn("Nice");
    //     try {
    //       if (validateForm(itemData)) {
    //         const response = await updateCorrectiveAction(
    //           itemData.value.id,
    //           itemData.value
    //         );
    //         if (!response.error) {
    //           await emit("addData", itemData.value);

    //           showSuccessAlert(
    //             "Success",
    //             "Corrective Action Added Successfully!"
    //           );
    //           await clear();
    //           console.log(itemData.value);
    //           hideModal(newAddressModalRef.value);
    //         } else {
    //           showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
    //           dataLoading.value = false;
    //           return;
    //         }
    //       } else {
    //         showErrorAlert("Warning", "Please fill all the details Correctly");
    //         return;
    //       }
    //     } catch (error) {
    //       // Handle any other errors during API call
    //       // console.error("API call error:", error);
    //       showErrorAlert("Error", "An error occurred during the API call.");
    //       await clear();
    //       console.log(itemData.value);
    //       hideModal(newAddressModalRef.value);
    //     } finally {
    //       dataLoading.value = false;
    //     }
    //   };

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

    const validateForm = (formData) => {
      for (const key in formData) {
        let value = formData[key];
        if (key !== "audit_remark") {
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
      }
      return true;
    };

    const updateApprovalStatus = async () => {
      console.log(itemData.value);
      dataLoading.value = true;

      //   console.warn("Nice");
      try {
        if (validateForm(itemData)) {
          const response = await NonConformanceRecordStatus(
            itemData.value.id,
            itemData.value
          );

          if (!response.error) {
            await emit("reloadData", itemData.value);

            showSuccessAlert(
              "Success",
              "Approval Status Changed Successfully!"
            );
            await clearItemData();
            console.log(itemData.value);
            hideModal(newAddressModalRef.value);
          } else {
            showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
            dataLoading.value = false;
            return;
          }
        } else {
          showErrorAlert("Warning", "Please fill all the details Correctly");
          return;
        }
      } catch (error) {
        // Handle any other errors during API call
        // console.error("API call error:", error);
        showErrorAlert("Error", "An error occurred during the API call.");
        await clearItemData();
        console.log(itemData.value);
        hideModal(newAddressModalRef.value);
      } finally {
        dataLoading.value = false;
      }
    };

    const clearItemData = () => {
      itemData.value = {
        id: "",
        approval_status: "",
        new_status: "",
        company_id: "",
        updated_by: "",
      };
    };

    return {
      itemData,
      updateApprovalStatus,
      submitButtonRef,
      newAddressModalRef,
      clearItemData,
      data: props.data,
      dataLoading,
    };
  },
});
</script>
      
      