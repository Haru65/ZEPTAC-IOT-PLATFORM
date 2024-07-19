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
          :validation-schema="itemDetailsValidator"
        >
          <!--begin::Card body-->
          <div class="card-body p-sd-2 p-lg-9">
            <!--begin::Input group-->

            <!--begin::Table-->
            <div class="table-responsive">
              <table
                class="table table-row-dashed border-gray-300 align-middle gy-6"
              >
                <thead class="fs-4 fw-bold">
                  <tr>
                    <th>Sr.No</th>
                    <th class="min-w-250px">Modules</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody class="fs-6">
                  <tr v-for="(item, index) in moduleWithStatus" :key="index">
                    <td>
                      <span class="fs-4">
                        {{ index + 1 }}
                      </span>
                    </td>
                    <td class="min-w-250px">
                      <span class="fs-4">
                        {{ item.name ? item.name.toUpperCase() : "" }}
                      </span>
                    </td>

                    <td>
                      <div class="form-check form-check-solid">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          :value="item.name"
                          :checked="item.isPresent"
                          :id="'kt_settings_notification_' + item.name"
                          @click="ToggleModules($event, item)"
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!--end::Table-->
          </div>

          <div class="modal-footer flex-center w-100">
            <span
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-lg btn-primary w-sd-25 w-lg-25"
              @click.prevent="submit()"
            >
              <span v-if="!loading" class="indicator-label"> Submit </span>
              <span v-if="loading" class="indicator-progress">
                Please wait...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </span>
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
import { defineComponent, onMounted, ref } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import {
  addLaminarAirFlow,
  getServiceRequests,
  getAllInstrument,
  getModules,
  assignModules,
  getCompany,
} from "@/stores/api";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import { Identifier } from "@/core/config/WhichUserConfig";
import { useAuthStore } from "@/stores/auth";
import { useRoute, useRouter } from "vue-router";
import ApiService from "@/core/services/ApiService";
import moment from "moment";

interface Module {
  id: number;
  name: string;
}

interface ModuleWithStatus extends Module {
  isPresent: boolean;
}

export default defineComponent({
  name: "company-modules",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  setup() {
    const identifier = Identifier;
    const loading = ref(false);
    const auth = useAuthStore();
    const router = useRouter();
    const route = useRoute();
    const User = auth.GetUser();
    const itemId = route.params.id;

    const itemDetailsValidator = Yup.object().shape({});

    const moduleArray = ref<Module[]>([]);

    const itemDetails = ref<{ modules: Module[] }>({ modules: [] });

    onMounted(async () => {
      
      console.log(User);
      moduleArray.value.pop();
      try {
        ApiService.setHeader();
        const response = await getModules(`fetchAll=true`);
        if (response.result != null && response.result) {
          moduleArray.value.push(
            ...response.result?.map(({ id, name, ...rest }) => ({
              id,
              name,
              ...rest,
            }))
          );
        }
        console.log(moduleArray.value);
      } catch (error) {
        showErrorAlert("Error", "An error occurred during the API call.");
        loading.value = false;
      }

      try {
        ApiService.setHeader();
        const res = await getCompany(itemId);
        if (res != null) {
          itemDetails.value.modules = res.modules;
        }
        console.log(itemDetails.value.modules);
      } catch (error) {
        showErrorAlert("Error", "An error occurred during the API call.");
        loading.value = false;
      }

      updateModulesWithStatus();
    });

    const moduleWithStatus = ref<ModuleWithStatus[]>([]);
    const moduleArr = ref<number[]>([]);

    async function ToggleModules(e: Event, item: Module) {
      if (e.target instanceof HTMLInputElement && e.target.value) {
        if (e.target.checked) {
          moduleArr.value.push(item.id);
        } else {
          moduleArr.value = moduleArr.value.filter(
            (module) => module !== item.id
          );
        }
      }
      console.log(moduleArr.value)
    }

    const updateModulesWithStatus = () => {
      moduleWithStatus.value = moduleArray.value.map((module) => {
        const isPresent = itemDetails.value.modules.some(
          (companyModule) => companyModule.id === module.id
        );
        return { ...module, isPresent };
      });

      moduleArr.value = itemDetails.value.modules.map((module) => module.id);
    };

    const submit = async () => {
      loading.value = true;

      try {
        const response = await assignModules(itemId, moduleArr.value);
        if (!response.error) {
          showSuccessAlert(
            "Success",
            "Module Successfully Assigned to Company!"
          );
          loading.value = false;
          router.push({ name: "company-list" });
        } else {
          showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
          loading.value = false;
          return;
        }
      } catch (error) {
        // Handle any other errors during API call
        // console.error("API call error:", error);
        showErrorAlert("Error", "An error occurred during the API call.");
      } finally {
        loading.value = false;
      }
    };

    const clear = () => {};
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
      itemDetailsValidator,
      getAssetPath,
      submit,
      loading,
      moduleWithStatus,
      ToggleModules,
    };
  },
});
</script>
      
      <style>
.el-input__inner,
.el-select__inner {
  font-weight: 500;
}
.el-input__wrapper,
.el-select__wrapper {
  min-height: 3.5rem;
  border-radius: 0.5rem;
  background-color: var(--bs-gray-100);
  border-color: var(--bs-gray-100);
  color: var(--bs-gray-700);
  transition: color 0.2s ease;
  appearance: none;
  line-height: 1.5;
  border: none !important;
  padding-top: 0.825rem;
  padding-bottom: 0.825rem;
  padding-left: 1.5rem;
  font-size: 1.15rem;
  border-radius: 0.625rem;
  box-shadow: none !important;
}

.trainer-container {
  display: flex;
  align-items: center;
  margin-right: 10px; /* Adjust as needed */
  background-color: #000; /* Optional background color for each trainer container */
  padding: 5px 10px; /* Optional padding */
  border-radius: 5px; /* Optional border radius */
}
.tagify-remove {
  margin-left: 5px; /* Optional margin between the name and the 'X' button */
}
.override-styles {
  z-index: 99999 !important;
  pointer-events: initial;
}
</style>