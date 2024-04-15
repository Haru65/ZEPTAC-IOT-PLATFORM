<template>
  <div style="width: 99%" class="bg-body p-12 rounded">
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Form-->
        <VForm id="kt_account_profile_details_form" class="form">
          <!--begin::Card body-->
          <div class="card-body border-top p-sd-2 p-lg-9">
            <!-- extra fields -->
            <div class="row mb-6">
              <div class="container-fluid">
                <div class="alert alert-info text-gray-700 fs-6 font-semibold">
                  <p>Note</p>
                  <ul>
                    <li>Score &gt; 2 : Supplier is approved.</li>
                    <li>Score &le; 2 : Supplier is rejected.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="row mb-6">
              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fw-semobold fw-bold text-gray-700 fs-6 text-nowrap"
                  >Supplier Name</label
                >
                <div class="form-control form-control-lg form-control-solid">
                  {{ itemDetails.supplier.supplier_name }}
                </div>
              </div>

              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                  >Supplier Code</label
                >
                <div class="form-control form-control-lg form-control-solid">
                  {{ itemDetails.supplier.supplier_code }}
                </div>
              </div>
            </div>
            <!--end::Input group-->

            <!-- extra fields -->
            <div class="row mb-6">
              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                  >Supplier For</label
                >
                <div class="form-control form-control-lg form-control-solid">
                  {{
                    GetSupplierCategory(itemDetails.supplier.supplier_category)
                  }}
                </div>
              </div>
            </div>

            <div class="form-group col-md-6">
              <label
                class="col-lg-4 col-form-label fw-bold text-gray-700 fw-semobold fs-6"
                >Supplier Evaluation</label
              >
            </div>
            <div
              class="table-responsive p-2 mb-6"
              v-if="itemDetails.supplier.supplier_category === '1'"
            >
              <table
                class="table table-responsive table-bordered m-2 w-100 fw-bold text-gray-700"
              >
                <thead
                  class="fw-semibold fs-6 text-gray-700 text-center justify-content-center"
                >
                  <tr>
                    <th class="col-1">No.</th>
                    <th class="col-5">Question</th>
                    <th class="col-5" colspan="2">Rating</th>
                  </tr>
                </thead>
                <tbody class="text-center justify-content-center">
                  <tr
                    v-for="(question, index) in productQuestions"
                    :key="index"
                  >
                    <td class="text-center">{{ question.q_no }}</td>
                    <td class="text-center">{{ question.q_name }}</td>
                    <td class="text-center">
                      <div class="rating justify-content-center">
                        <input
                          class="rating-input"
                          checked
                          :name="'rating_' + question.q_no"
                          value="0"
                          type="radio"
                          :id="'rating_input_' + question.q_no + '_0'"
                        />

                        <!-- Star 1 -->
                        <label
                          class="rating-label"
                          :for="'rating_input_' + question.q_no + '_1'"
                        >
                          <i class="ki-duotone ki-star fs-1"></i>
                        </label>

                        <input
                          class="rating-input"
                          :name="'rating_' + question.q_no"
                          value="1"
                          type="radio"
                          :id="'rating_input_' + question.q_no + '_1'"
                          @change="handleProductRating(question.q_no, 1)"
                        />

                        <!-- Star 2 -->
                        <label
                          class="rating-label"
                          :for="'rating_input_' + question.q_no + '_2'"
                        >
                          <i class="ki-duotone ki-star fs-1"></i>
                        </label>
                        <input
                          class="rating-input"
                          :name="'rating_' + question.q_no"
                          value="2"
                          type="radio"
                          :id="'rating_input_' + question.q_no + '_2'"
                          @change="handleProductRating(question.q_no, 2)"
                        />

                        <!-- Star 3 -->
                        <label
                          class="rating-label"
                          :for="'rating_input_' + question.q_no + '_3'"
                        >
                          <i class="ki-duotone ki-star fs-1"></i>
                        </label>

                        <input
                          class="rating-input"
                          :name="'rating_' + question.q_no"
                          value="3"
                          type="radio"
                          :id="'rating_input_' + question.q_no + '_3'"
                          @change="handleProductRating(question.q_no, 3)"
                        />

                        <!-- Star 4 -->
                        <label
                          class="rating-label"
                          :for="'rating_input_' + question.q_no + '_4'"
                        >
                          <i class="ki-duotone ki-star fs-1"></i>
                        </label>
                        <input
                          class="rating-input"
                          :name="'rating_' + question.q_no"
                          value="4"
                          type="radio"
                          :id="'rating_input_' + question.q_no + '_4'"
                          @change="handleProductRating(question.q_no, 4)"
                        />

                        <!-- Star 5 -->
                        <label
                          class="rating-label"
                          :for="'rating_input_' + question.q_no + '_5'"
                        >
                          <i class="ki-duotone ki-star fs-1"></i>
                        </label>
                        <input
                          class="rating-input"
                          :name="'rating_' + question.q_no"
                          value="5"
                          type="radio"
                          :id="'rating_input_' + question.q_no + '_5'"
                          @change="handleProductRating(question.q_no, 5)"
                        />

                        ({{ question.rating }})
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div
              class="table-responsive p-2 mb-6"
              v-if="itemDetails.supplier.supplier_category === '2'"
            >
              <table
                class="table table-responsive table-bordered m-2 w-100 fw-bold text-gray-700"
              >
                <thead
                  class="fw-semibold fs-6 text-gray-700 text-center justify-content-center"
                >
                  <tr>
                    <th class="col-1">No.</th>
                    <th class="col-5">Question</th>
                    <th class="col-5" colspan="2">Rating</th>
                  </tr>
                </thead>
                <tbody class="text-center justify-content-center">
                  <tr
                    v-for="(question, index) in serviceQuestions"
                    :key="index"
                  >
                    <td class="text-center">{{ question.q_no }}</td>
                    <td class="text-center">{{ question.q_name }}</td>
                    <td class="text-center">
                      <div class="rating justify-content-center">
                        <input
                          class="rating-input"
                          checked
                          :name="'rating_' + question.q_no"
                          value="0"
                          type="radio"
                          :id="'rating_input_' + question.q_no + '_0'"
                        />

                        <!-- Star 1 -->
                        <label
                          class="rating-label"
                          :for="'rating_input_' + question.q_no + '_1'"
                        >
                          <i class="ki-duotone ki-star fs-1"></i>
                        </label>

                        <input
                          class="rating-input"
                          :name="'rating_' + question.q_no"
                          value="1"
                          type="radio"
                          :id="'rating_input_' + question.q_no + '_1'"
                          @change="handleServiceRating(question.q_no, 1)"
                        />

                        <!-- Star 2 -->
                        <label
                          class="rating-label"
                          :for="'rating_input_' + question.q_no + '_2'"
                        >
                          <i class="ki-duotone ki-star fs-1"></i>
                        </label>
                        <input
                          class="rating-input"
                          :name="'rating_' + question.q_no"
                          value="2"
                          type="radio"
                          :id="'rating_input_' + question.q_no + '_2'"
                          @change="handleServiceRating(question.q_no, 2)"
                        />

                        <!-- Star 3 -->
                        <label
                          class="rating-label"
                          :for="'rating_input_' + question.q_no + '_3'"
                        >
                          <i class="ki-duotone ki-star fs-1"></i>
                        </label>

                        <input
                          class="rating-input"
                          :name="'rating_' + question.q_no"
                          value="3"
                          type="radio"
                          :id="'rating_input_' + question.q_no + '_3'"
                          @change="handleServiceRating(question.q_no, 3)"
                        />

                        <!-- Star 4 -->
                        <label
                          class="rating-label"
                          :for="'rating_input_' + question.q_no + '_4'"
                        >
                          <i class="ki-duotone ki-star fs-1"></i>
                        </label>
                        <input
                          class="rating-input"
                          :name="'rating_' + question.q_no"
                          value="4"
                          type="radio"
                          :id="'rating_input_' + question.q_no + '_4'"
                          @change="handleServiceRating(question.q_no, 4)"
                        />

                        <!-- Star 5 -->
                        <label
                          class="rating-label"
                          :for="'rating_input_' + question.q_no + '_5'"
                        >
                          <i class="ki-duotone ki-star fs-1"></i>
                        </label>
                        <input
                          class="rating-input"
                          :name="'rating_' + question.q_no"
                          value="5"
                          type="radio"
                          :id="'rating_input_' + question.q_no + '_5'"
                          @change="handleServiceRating(question.q_no, 5)"
                        />

                        ({{ question.rating }})
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- extra fields -->
            <div class="row mb-6">
              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label fw-bold text-gray-700 fw-semobold fs-6"
                  >Score</label
                >
                <div class="form-control form-control-lg form-control-solid">
                  {{ itemDetails.score }}
                </div>
              </div>
            </div>

            <div class="row mb-6">
              <div class="form-group col-md-6">
                <label
                  class="col-lg-4 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                  >Remark</label
                >
                <div class="form-control form-control-lg form-control-solid">
                  Supplier is
                  {{ itemDetails.remark ? itemDetails.remark : "..." }}
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer flex-center w-100">
            <!--begin::Button-->
            <span
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-lg btn-primary w-sd-25 w-lg-25"
              @click="submit()"
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
import { defineComponent, onMounted, ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { hideModal } from "@/core/helpers/dom";
import { useAuthStore } from "@/stores/auth";
import { useRouter, useRoute } from "vue-router";
import ApiService from "@/core/services/ApiService";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";
import moment from "moment";
import { addSupplierEvaluation, getSupplier } from "@/stores/api";
import {
  GetSupplierCategory,
  ProductQuestion,
  ServiceQuestion,
} from "@/core/model/suppliers";

interface Item {
  supplier_id: string;
  supplier: {
    id: string;
    supplier_name: string;
    supplier_code: string;
    supplier_category: string;
  };
  evaluation_matrix: Question[];
  score: number;
  remark: string;
  company_id: string;
  created_by: string;
  updated_by: string;
  is_active: string;
}

interface Question {
  q_no: string;
  q_name: string;
  rating: number;
}

export default defineComponent({
  name: "supplier-evaluation",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  setup() {
    const loading = ref(false);
    const auth = useAuthStore();
    const router = useRouter();
    const route = useRoute();
    const User = auth.GetUser();
    const itemId = route.params.id;

    const SUPPLIER_SCORE = 2;

    const SUPPLIER_APPROVE_MSG = "Approved.";
    const SUPPLIER_REJECT_MSG = "Rejected.";


    const itemDetails = ref<Item>({
      supplier_id: "",
      supplier: {
        id: "",
        supplier_name: "",
        supplier_code: "",
        supplier_category: "",
      },
      evaluation_matrix: [],
      score: 0,
      remark: "",
      company_id: User.company_id,
      created_by: User.id,
      updated_by: User.id,
      is_active: "1",
    });

    onMounted(async () => {
      try {
        let response = await getSupplier(itemId.toString());
        console.log(response);
        itemDetails.value.supplier_id = response.id;
        itemDetails.value.supplier.supplier_name = response.supplier_name;
        itemDetails.value.supplier.supplier_code = response.supplier_code;
        itemDetails.value.supplier.supplier_category =
          response.supplier_category;
        console.log(itemDetails.value);
      } catch (error) {
        showErrorAlert("Error", "An error occurred during the API call.");
        loading.value = false;
      }
    });

    const productQuestions = ref(ProductQuestion);
    const serviceQuestions = ref(ServiceQuestion);

    const handleProductRating = async (q_no, value) => {
      const questionIndex = productQuestions.value.findIndex(
        (q) => q.q_no === q_no
      );
      if (questionIndex !== -1) {
        productQuestions.value[questionIndex].rating = value;
      }

      // function to check the score of supplier
      await calculateScore(productQuestions.value);

      if (itemDetails.value.score > SUPPLIER_SCORE) {
        itemDetails.value.remark = SUPPLIER_APPROVE_MSG;
      } else {
        itemDetails.value.remark = SUPPLIER_REJECT_MSG;
      }
    };

    const handleServiceRating = async (q_no, value) => {
      const questionIndex = serviceQuestions.value.findIndex(
        (q) => q.q_no === q_no
      );
      if (questionIndex !== -1) {
        serviceQuestions.value[questionIndex].rating = value;
      }

      // function to check the score of supplier
      await calculateScore(serviceQuestions.value);

      if (itemDetails.value.score > SUPPLIER_SCORE) {
        itemDetails.value.remark = SUPPLIER_APPROVE_MSG;
      } else {
        itemDetails.value.remark = SUPPLIER_REJECT_MSG;
      }
    };

    // Function to calculate Score / Rating
    async function calculateScore(questions) {
      const totalRatings = questions.reduce(
        (sum, question) => sum + question.rating,
        0
      );
      itemDetails.value.score = await Number(
        (totalRatings / questions.length).toFixed(2)
      );
    }

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
      loading.value = true;

      if (itemDetails.value.supplier.supplier_category === "1") {
        itemDetails.value.evaluation_matrix = productQuestions.value;
      } else if (itemDetails.value.supplier.supplier_category === "2") {
        itemDetails.value.evaluation_matrix = serviceQuestions.value;
      }

      try {
        if (itemDetails.value.supplier_id != "") {
          const response = await addSupplierEvaluation(itemDetails.value);
          if (!response.error) {
            showSuccessAlert(
              "Success",
              "Evaluation of Supplier has been successfully Done!"
            );
            loading.value = false;
            router.push({ name: "supplier-list" });
          } else {
            showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
            loading.value = false;
            return;
          }
        } else {
          showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
          loading.value = false;
          return;
        }
      } catch (error) {
        showErrorAlert("Error", "An error occurred during the API call.");
        loading.value = false;
      } finally {
        loading.value = false;
      }
    };

    return {
      itemDetails,
      submit,
      loading,
      productQuestions,
      serviceQuestions,
      handleProductRating,
      handleServiceRating,
      GetSupplierCategory,
    };
  },
});
</script>
        
        