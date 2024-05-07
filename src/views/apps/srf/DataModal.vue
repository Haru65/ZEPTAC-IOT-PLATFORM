<template>
  <div
    class="modal fade"
    tabindex="-1"
    id="kt_modal_srf"
    ref="newAddressModalRef"
  >
    <div class="modal-dialog modal-dialog-centered mw-1000px">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Scope of Work</h3>

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

        <div class="modal-body py-5 px-lg-5">
          <div class="card p-1 w-100">
            <div class="table-responsive mb-10">
              <table
                class="table table-responsive g-5 gs-0 m-2 w-100 fw-bold text-gray-700 table-bordered"
              >
                <thead>
                  <tr class="fs-5 fw-bold text-gray-700 text-center">
                    <th>Description of Items</th>
                    <th v-for="item in SrfItems" :key="item.id">
                      {{ item.test }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(test, testIdx) in SrfTests" :key="test.id">
                    <td class="text-center">{{ test.test }}</td>
                    <td
                      v-for="(item, itemIdx) in SrfItems"
                      :key="itemIdx"
                      class="text-center"
                    >
                      <div class="form-check-solid">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          :id="'srf_' + testIdx + '_' + itemIdx"
                          :value="false"
                          :name="'srf_' + testIdx + '_' + itemIdx"
                          :checked="itemDetails.srf_data[testIdx][itemIdx]"
                          disabled
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
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
import { SrfTests, SrfItems, TestMethods } from "@/core/model/srf";

export default defineComponent({
  name: "new-srf-modal",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },

  props: ["data"],

  setup(props, { emit }) {
    const itemDetails = ref({
      id: "",
      srf_data: Array.from({ length: SrfTests.length }, () =>
        Array.from({ length: SrfItems.length }, () => false)
      ),
    });

    onMounted(async () => {
      // Watch for changes in props.data and update itemData accordingly
      watch(
        () => props.data,
        (newValue) => {
          itemDetails.value = { ...newValue };
        }
      );
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

    return {
      itemDetails,
      SrfTests,
      SrfItems,
      TestMethods,
    };
  },
});
</script>
          
          