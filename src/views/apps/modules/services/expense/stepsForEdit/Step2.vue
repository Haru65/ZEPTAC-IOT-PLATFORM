<template>
  <!--begin::Wrapper-->
  <div class="w-100">
    <!--begin::Heading-->
    <div class="pb-10 pb-lg-15">
      <!--begin::Title-->
      <h2 class="fw-bold text-dark">Specify your Expenses</h2>
      <!--end::Title-->
    </div>
    <!--end::Heading-->

    <!--begin::Card body-->
    <div class="card p-3 w-100">
      <div class="table-responsive mb-10">
        <!--begin::Table-->
        <table
          class="table g-5 gs-0 mb-0 w-100 fw-bold text-gray-700"
          data-kt-element="Selects"
        >
          <!--begin::Table head-->
          <thead>
            <tr class="fs-3 fw-bold text-dark-700 text-uppercase text-center">
              <th class="">Your Expenses</th>
            </tr>
          </thead>
          <!--end::Table head-->

          <!--begin::Table body-->
          <tbody>
            <tr
              v-for="(task, index) in $props.tasks"
              :key="task.id"
              class="w-100"
            >
              <td class="pt-8 text-nowrap" :id="task.id">
                <div class="shadow-lg p-5 m-3 fs-4 rounded w-100 border">
                  <div class="row mb-2">
                    <!--begin::Col-->
                    <div class="col-lg-6">
                      <!--begin::Option-->
                      <label
                        class="btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center"
                      >
                        <!--begin::Info-->
                        <span class="d-block fw-semobold text-start">
                          <span class="text-gray fw-bold d-block fs-4 mb-2">
                            Date of Expense
                          </span>
                          <div class="block">
                            <el-date-picker
                              disabled
                              type="date"
                              name="date"
                              placeholder="Pick a day"
                              class="mb-3 mb-lg-0 min-w-150px"
                              v-model="task.date"
                            />
                          </div>
                        </span>
                        <!--end::Info-->
                      </label>

                      <!--end::Option-->
                    </div>
                    <!--end::Col-->

                    <!--begin::Col-->
                    <div class="col-lg-6">
                      <!--begin::Option-->
                      <label
                        class="btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center"
                      >
                        <!--begin::Info-->
                        <span class="d-block fw-semobold text-start">
                          <span class="text-gray fw-bold d-block fs-4 mb-2"
                            >Expense Amount</span
                          >
                          <div class="block">
                            <div class="fs-5 fw-bold text-gray-700 fs-3 mb-2">
                              ₹ {{ task.amount }}
                            </div>
                          </div>
                        </span>
                        <!--end::Info-->
                      </label>
                      <!--end::Option-->
                    </div>
                    <!--end::Col-->
                  </div>

                  <div class="card mb-2 p-2">
                    <div
                      class="row mt-6 align-items-center align-items-center-lg align-items-center-md"
                    >
                      <!--begin::Label-->
                      <label
                        class="col-lg-4 fs-4 fw-bold text-gray text-start text-nowrap"
                        >Type of Expense
                      </label>
                      <!--end::Label-->

                      <div class="col-lg bt-md-5">
                        <!--begin::Row-->
                        <div class="col-lg fv-row mt-md-3 mt-5">
                          <div class="form-control form-control-solid">
                            <span class="fs-5 fw-bold text-gray-700">
                              {{ task.type }}
                            </span>
                          </div>
                        </div>
                        <!--end::Row-->
                      </div>
                    </div>
                  </div>

                  <div class="card mb-2 p-2">
                    <div
                      class="row mt-6 align-items-center align-items-center-lg align-items-center-md"
                    >
                      <!--begin::Label-->
                      <label
                        class="col-lg-4 fs-4 fw-bold text-gray text-start text-nowrap"
                      >
                        Describtion of Expense
                      </label>
                      <!--end::Label-->

                      <div class="col-lg bt-md-5">
                        <!--begin::Row-->
                        <div class="col-lg fv-row mt-md-3 mt-5">
                          <div class="form-control form-control-solid">
                            <span class="fs-5 fw-bold text-gray-700">
                              {{ task.description }}
                            </span>
                          </div>
                        </div>
                        <!--end::Row-->
                      </div>
                    </div>
                  </div>

                  <div>
                    <div class="row mb-2">
                      <div class="form-group col-lg-12 mb-2 mb-sd-2">
                        <div class="border p-2 mt-3">
                          <template v-if="task.receipt">
                            <img
                              :src="task.receipt"
                              class="rounded mx-auto d-block w-200px h-200px cursor-pointer"
                              @click="showImg(index)"
                            />
                          </template>
                        </div>
                      </div>
                    </div>
                  </div>
                  <vue-easy-lightbox
                    :visible="task.visible"
                    :imgs="task.receipt"
                    :index="index"
                    @hide="onHide(index)"
                  ></vue-easy-lightbox>
                </div>
              </td>
            </tr>
          </tbody>
          <!--end::Table body-->
          <!--begin::Table foot-->
          <tfoot>
            <tr
              class="border-top border-top-dashed align-top fs-6 fw-bold text-gray-700"
            >
              <th class="text-primary">
                <div class="row m-2">
                  <div
                    class="form-group d-flex justify-content-between col-lg-12 mb-2 mb-sd-2"
                  >
                    <div>
                      <h2 class="fw-bold fs-4 text-dark">
                        Total Expense ₹<span
                          class="text-primary"
                          data-kt-element="grand-total"
                          >{{
                            $props.total_amount ? $props.total_amount : "0.0"
                          }}</span
                        >
                      </h2>
                    </div>
                  </div>
                </div>
              </th>
            </tr>
          </tfoot>
          <!--end::Table foot-->
        </table>
      </div>
    </div>
    <!--end::Card body-->

    <div class="card p-3 w-100">
      <div class="row mb-6">
        <div class="form-group btn-group col-md-6 mb-8 mb-sd-8">
          <label
            class="btn btn-outline btn-outline-dashed btn-outline-default p-5 d-flex align-items-center"
          >
            <span class="d-block fw-semobold text-start">
              <div class="text-dark fw-bold d-block fs-4 mb-2"
                >Select the Expense Status</div
              >
              <input
                type="radio"
                class="btn-check"
                name="status"
                id="pending"
                value="1"
                v-model="$props.status"
                v-on:change="SetStatus($event)"
                autocomplete="off"
              />
              <label class="btn btn-md btn-outline-primary" for="pending">Pending</label>

              <input
                type="radio"
                class="btn-check"
                name="status"
                id="reject"
                value="2"
                v-model="$props.status"
                v-on:change="SetStatus($event)"
                autocomplete="off"
              />
              <label class="btn btn-md btn-outline-danger" for="reject">Reject</label>
              <input
                type="radio"
                class="btn-check"
                name="status"
                id="approve"
                value="3"
                v-model="$props.status"
                v-on:change="SetStatus($event)"
                autocomplete="off"
              />
              <label class="btn btn btn-md btn-outline-success" for="approve">Approve</label>
            </span>
          </label>
        </div>
      </div>
    </div>


    

  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref, onMounted } from "vue";
import { ErrorMessage, Field } from "vee-validate";
import { ExpenseTypes } from "@/core/model/expensetypes";
import { formatPrice } from "@/core/config/DataFormatter";

import VueEasyLightbox from "vue-easy-lightbox";

export default defineComponent({
  name: "step-2",
  components: {
    Field,
    ErrorMessage,
    VueEasyLightbox,
  },
  props: ["tasks", "total_amount", "status"],
  emit: ["showImage", "HideImage", "changeStatus"],
  setup(props, { emit }) {
    // Handling Emits
    const showImg = async (index) => {
      await emit("showImage", index);
    };

    const onHide = async (index) => {
      await emit("HideImage", index);
    };

    const SetStatus = async (e) => {
      await emit("changeStatus", e.target.value);
    };

    return {
      getAssetPath,
      tasks: props.tasks,
      status: props.status,
      ExpenseTypes,
      formatPrice,
      showImg,
      SetStatus,
      onHide,
    };
  },
});
</script>
