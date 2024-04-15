
<template>
  <div style="width: 99%" class="bg-body p-12 rounded">
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Form-->
        <VForm id="kt_account_profile_details_form" class="form">
          <!--begin::Card body-->
          <div class="card-body border-top p-6">
            <div class="row mb-6">
              <!--begin::Label-->
              <label
                class="col-lg-3 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                >Year</label
              >
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-9 fv-row">
                <el-select
                  v-model="selectedYear"
                  filterable
                  placeholder="Please Select Year..."
                >
                  <el-option
                    v-for="year in academicYears"
                    :key="year"
                    :value="year"
                  />
                </el-select>
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="selectedYear" />
                  </div>
                </div>
              </div>
              <!--end::Col-->
            </div>

            <div class="container-fluid mt-6">
              <div class="row g-5 g-xl-8">
                <div class="col-xl-4">
                  <div
                    :class="[`card-xl-stretch mb-xl-8`, `bg-light-success`]"
                    class="card"
                  >
                    <!--begin::Body-->
                    <div class="card-body my-3">
                      <span
                        :class="`text-gray-800`"
                        class="card-title fw-bold fs-4 mb-3 d-block text-underline"
                      >
                        Training Plan
                      </span>

                      <div class="d-flex justify-content-start gap-2">
                        <router-link
                          to="/plan/training"
                          class="btn btn-sm btn-outline btn-outline-dashed btn-outline-warning btn-active-light-warning"
                          >Add</router-link
                        >
                      </div>
                    </div>
                    <!--end:: Body-->
                  </div>
                </div>

                <div class="col-xl-4">
                  <div
                    :class="[`card-xl-stretch mb-xl-8`, `bg-light-success`]"
                    class="card"
                  >
                    <!--begin::Body-->
                    <div class="card-body my-3">
                      <span
                        :class="`text-gray-700`"
                        class="card-title fw-bold fs-4 mb-3 d-block"
                      >
                        Intermediate Check Plan
                      </span>

                      <div class="d-flex justify-content-start gap-2">
                        <router-link
                          to="/plan/intermediate"
                          class="btn btn-sm btn-outline btn-outline-dashed btn-outline-warning btn-active-light-warning"
                          >Add</router-link
                        >
                      </div>
                    </div>
                    <!--end:: Body-->
                  </div>
                </div>

                <div class="col-xl-4">
                  <div
                    :class="[`card-xl-stretch mb-xl-8`, `bg-light-success`]"
                    class="card"
                  >
                    <!--begin::Body-->
                    <div class="card-body my-3">
                      <span
                        :class="`text-gray-700`"
                        class="card-title fw-bold fs-4 mb-3 d-block"
                      >
                        Maintenance Plan
                      </span>

                      <div class="d-flex justify-content-start gap-2">
                        <router-link
                          to="/plan/maintenance"
                          class="btn btn-sm btn-outline btn-outline-dashed btn-outline-warning btn-active-light-warning"
                          >Add</router-link
                        >
                      </div>
                    </div>
                    <!--end:: Body-->
                  </div>
                </div>

                <div class="col-xl-4">
                  <div
                    :class="[`card-xl-stretch mb-xl-8`, `bg-light-success`]"
                    class="card"
                  >
                    <!--begin::Body-->
                    <div class="card-body my-3">
                      <span
                        :class="`text-gray-700`"
                        class="card-title fw-bold fs-4 mb-3 d-block"
                      >
                        Replicate Plan
                      </span>

                      <div class="d-flex justify-content-start gap-2">
                        <router-link
                          to="/plan/replicate"
                          class="btn btn-sm btn-outline btn-outline-dashed btn-outline-warning btn-active-light-warning"
                          >Add</router-link
                        >
                      </div>
                    </div>
                    <!--end:: Body-->
                  </div>
                </div>

                <div class="col-xl-4">
                  <div
                    :class="[`card-xl-stretch mb-xl-8`, `bg-light-success`]"
                    class="card"
                  >
                    <!--begin::Body-->
                    <div class="card-body my-3">
                      <span
                        :class="`text-gray-700`"
                        class="card-title fw-bold fs-4 mb-3 d-block"
                      >
                        Interlaboratory Comparison Plan
                      </span>

                      <div class="d-flex justify-content-start gap-2">
                        <router-link
                          to="/plan/interlaboratory"
                          class="btn btn-sm btn-outline btn-outline-dashed btn-outline-warning btn-active-light-warning"
                          >Add</router-link
                        >
                      </div>
                    </div>
                    <!--end:: Body-->
                  </div>
                </div>

                <div class="col-xl-4">
                  <div
                    :class="[`card-xl-stretch mb-xl-8`, `bg-light-success`]"
                    class="card"
                  >
                    <!--begin::Body-->
                    <div class="card-body my-3">
                      <span
                        :class="`text-gray-700`"
                        class="card-title fw-bold fs-4 mb-3 d-block"
                      >
                        Internal Audit Plan
                      </span>

                      <div class="d-flex justify-content-start gap-2">
                        <router-link
                          to="/plan/audit"
                          class="btn btn-sm btn-outline btn-outline-dashed btn-outline-warning btn-active-light-warning"
                          >Add</router-link
                        >
                      </div>
                    </div>
                    <!--end:: Body-->
                  </div>
                </div>

                <div class="col-xl-4">
                  <div
                    :class="[`card-xl-stretch mb-xl-8`, `bg-light-success`]"
                    class="card"
                  >
                    <!--begin::Body-->
                    <div class="card-body my-3">
                      <span
                        :class="`text-gray-700`"
                        class="card-title fw-bold fs-4 mb-3 d-block"
                      >
                        Management Review Meeting Plan
                      </span>

                      <div class="d-flex justify-content-start gap-2">
                        <router-link
                          to="/plan/mrm"
                          class="btn btn-sm btn-outline btn-outline-dashed btn-outline-warning btn-active-light-warning"
                          >Add</router-link
                        >
                      </div>
                    </div>
                    <!--end:: Body-->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row g-5 g-xl-10 mb-5 mb-xl-10">
            <!--begin::Row-->
            <div class="row g-5 g-xl-10 mb-5 mb-xl-10">
              <!--begin::Col-->
              <div class="col-12">
                <!-- Lead Conversion -->
                <HeatMap />
              </div>
              <!--end::Col-->
            </div>
          </div>
          <!--end::Row-->
          
        </VForm>
        <!--end::Form-->
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { reactive, defineComponent, onMounted, ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { Identifier } from "@/core/config/WhichUserConfig";
import { getCompanies, addISORule } from "@/stores/api";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import ApiService from "@/core/services/ApiService";
import Swal from "sweetalert2/dist/sweetalert2.js";

import HeatMap from "./PlannerComponents/HeatMap.vue";

export default defineComponent({
  name: "planner-list",
  components: {
    ErrorMessage,
    Field,
    VForm,
    HeatMap,
  },
  setup() {
    const loading = ref(false);
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 1 - ((currentYear - 1) % 2); // Calculate startYear based on the current academic year
    const academicYears = ref<string[]>([]);

    const itemDetails = ref({
      training_plan: [],
      record_plan: [],
      maintenance_plan: [],
      audit_plan: [],
      replicate_plan: [],
      interlab_plan: [],
      mrm_plan: [],
    });

    for (let year = startYear; year <= currentYear; year++) {
      const academicYear = `${year}-${year + 1}`;
      academicYears.value.push(academicYear);
    }

    const selectedYear = ref<string>("");

    const monthNames = [
      { id: 4, name: "Apr" },
      { id: 5, name: "May" },
      { id: 6, name: "Jun" },
      { id: 7, name: "Jul" },
      { id: 8, name: "Aug" },
      { id: 9, name: "Sep" },
      { id: 10, name: "Oct" },
      { id: 11, name: "Nov" },
      { id: 12, name: "Dec" },
      { id: 1, name: "Jan" },
      { id: 2, name: "Feb" },
      { id: 3, name: "Mar" },
    ];

    // // Calculate the index of April (0-based)
    // const aprilIndex = monthNames.findIndex((month) => month.name === "Apr");

    // // Arrange months from April to March
    // const months = ref<string[]>([]);
    // for (let i = 0; i < 12; i++) {
    //   const monthIndex = (aprilIndex + i) % 12;
    //   months.value.push(monthNames[i]);
    // }

    const plans = ref([
      { id: 1, plan: "Training Plan" },
      { id: 2, plan: "Intermediate Check Plan" },
      { id: 3, plan: "Maintenance Plan" },
      { id: 4, plan: "Replicate Plan" },
      { id: 5, plan: "Interlaboratory Comparison Plan" },
      { id: 6, plan: "Internal Audit Plan" },
      { id: 7, plan: "MRM Plan" },
    ]);

    return {
      academicYears,
      selectedYear,
      loading,
      monthNames,
      plans,
    };
  },
});
</script>