
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
            <div class="row mb-6" v-if="identifier == 'Admin'">
              <!--begin::Label-->
              <label
                class="col-lg-3 col-form-label required fw-bold text-gray-700 fw-semobold fs-6"
                >Company</label
              >
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-9 fv-row">
                <el-select
                  name="company_id"
                  v-model="ISO.company_id"
                  filterable
                  placeholder="Please Select Company..."
                >
                  <el-option
                    disabled="disabled"
                    value=""
                    label="Please Select Company..."
                  >
                    Please Select Company
                  </el-option>
                  <el-option
                    v-for="item in Companies"
                    :key="item.id"
                    :label="item.company_name"
                    :value="item.id"
                  />
                </el-select>
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="company_id" />
                  </div>
                </div>
              </div>
              <!--end::Col-->
            </div>

            <div class="tree">
              <ul>
                <template v-for="(clause, index) in clauses" :key="index">
                  <li>
                    <div class="card mb-3">
                      <div class="card-header border-0">
                        <div class="d-block p-2 w-100">
                          <span
                            class="input-group-text"
                            @click="toggleAccordion(clause)"
                          >
                            {{ clause.clause_number }}
                          </span>
                        </div>
                      </div>
                      <div class="card-body" v-if="clause.open">
                        <div class="form-group">
                          <label for="description">Description:</label>
                          <textarea
                            class="form-control"
                            v-model="clause.description"
                          ></textarea>
                        </div>

                        <div class="row mb-6 mt-6">
                          <div class="form-group d-flex align-items-center">
                            <label class="form-label me-3 text-nowrap required"
                              >Has NC</label
                            >
                            <div
                              class="input-group"
                              :id="'has_nc_' + clause.clause_number"
                            >
                              <div class="form-check form-check-inline me-2">
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  :value="true"
                                  v-model="clause.has_nc"
                                  :id="'has_nc_yes_' + clause.clause_number"
                                  :name="'has_nc_' + clause.clause_number"
                                />
                                <label
                                  :for="'has_nc_yes_' + clause.clause_number"
                                  class="form-check-label"
                                  >Yes</label
                                >
                              </div>

                              <div class="form-check form-check-inline">
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  :value="false"
                                  v-model="clause.has_nc"
                                  :id="'has_nc_no_' + clause.clause_number"
                                  :name="'has_nc_' + clause.clause_number"
                                />
                                <label
                                  :for="'has_nc_no_' + clause.clause_number"
                                  class="form-check-label"
                                  >No</label
                                >
                              </div>
                            </div>
                          </div>
                        </div>

                        <div v-if="clause.hierarchies.length">
                          <ul>
                            <template
                              v-for="(child, childIndex) in clause.hierarchies"
                              :key="childIndex"
                            >
                              <li>
                                <div class="card">
                                  <div class="card-header border-0">
                                    <div class="d-block p-2 w-100">
                                      <span
                                        class="input-group-text"
                                        @click="toggleAccordion(child)"
                                      >
                                        {{ child.clause_number }}
                                      </span>
                                    </div>
                                  </div>

                                  <div class="card-body" v-if="child.open">
                                    <div class="form-group">
                                      <label for="description"
                                        >Description:</label
                                      >
                                      <textarea
                                        class="form-control"
                                        v-model="child.description"
                                      ></textarea>
                                    </div>
                                    <div class="row mb-6 mt-6">
                                      <div
                                        class="form-group d-flex align-items-center"
                                      >
                                        <label
                                          class="form-label me-3 text-nowrap required"
                                          >Has NC</label
                                        >
                                        <div
                                          class="input-group"
                                          :id="'has_nc_' + child.clause_number"
                                        >
                                          <div
                                            class="form-check form-check-inline me-2"
                                          >
                                            <input
                                              class="form-check-input"
                                              type="radio"
                                              :value="true"
                                              v-model="child.has_nc"
                                              :id="
                                                'has_nc_yes_' +
                                                child.clause_number
                                              "
                                              :name="
                                                'has_nc_' + child.clause_number
                                              "
                                            />
                                            <label
                                              :for="
                                                'has_nc_yes_' +
                                                child.clause_number
                                              "
                                              class="form-check-label"
                                              >Yes</label
                                            >
                                          </div>

                                          <div
                                            class="form-check form-check-inline"
                                          >
                                            <input
                                              class="form-check-input"
                                              type="radio"
                                              :value="false"
                                              v-model="child.has_nc"
                                              :id="
                                                'has_nc_no_' +
                                                child.clause_number
                                              "
                                              :name="
                                                'has_nc_' + child.clause_number
                                              "
                                            />
                                            <label
                                              :for="
                                                'has_nc_no_' +
                                                child.clause_number
                                              "
                                              class="form-check-label"
                                              >No</label
                                            >
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div v-if="child.hierarchies.length">
                                      <ul>
                                        <template
                                          v-for="(
                                            subChild, subChildIndex
                                          ) in child.hierarchies"
                                          :key="subChildIndex"
                                        >
                                          <li>
                                            <div class="card">
                                              <!-- Added margin to create gap -->
                                              <div class="card-header border-0">
                                                <div class="d-block p-2 w-100">
                                                  <span
                                                    class="input-group-text"
                                                    @click="
                                                      toggleAccordion(subChild)
                                                    "
                                                  >
                                                    {{ subChild.clause_number }}
                                                  </span>
                                                </div>
                                              </div>
                                              <div
                                                class="card-body"
                                                v-if="subChild.open"
                                              >
                                                <div class="form-group">
                                                  <label for="description"
                                                    >Description:</label
                                                  >
                                                  <textarea
                                                    class="form-control"
                                                    v-model="
                                                      subChild.description
                                                    "
                                                  ></textarea>
                                                </div>
                                                <div class="row mb-6 mt-6">
                                                  <div
                                                    class="form-group d-flex align-items-center"
                                                  >
                                                    <label
                                                      class="form-label me-3 text-nowrap required"
                                                      >Has NC</label
                                                    >
                                                    <div
                                                      class="input-group"
                                                      :id="
                                                        'has_nc_' +
                                                        subChild.clause_number
                                                      "
                                                    >
                                                      <div
                                                        class="form-check form-check-inline me-2"
                                                      >
                                                        <input
                                                          class="form-check-input"
                                                          type="radio"
                                                          :value="true"
                                                          v-model="
                                                            subChild.has_nc
                                                          "
                                                          :id="
                                                            'has_nc_yes_' +
                                                            subChild.clause_number
                                                          "
                                                          :name="
                                                            'has_nc_' +
                                                            subChild.clause_number
                                                          "
                                                        />
                                                        <label
                                                          :for="
                                                            'has_nc_yes_' +
                                                            subChild.clause_number
                                                          "
                                                          class="form-check-label"
                                                          >Yes</label
                                                        >
                                                      </div>

                                                      <div
                                                        class="form-check form-check-inline"
                                                      >
                                                        <input
                                                          class="form-check-input"
                                                          type="radio"
                                                          :value="false"
                                                          v-model="
                                                            subChild.has_nc
                                                          "
                                                          :id="
                                                            'has_nc_no_' +
                                                            subChild.clause_number
                                                          "
                                                          :name="
                                                            'has_nc_' +
                                                            subChild.clause_number
                                                          "
                                                        />
                                                        <label
                                                          :for="
                                                            'has_nc_no_' +
                                                            subChild.clause_number
                                                          "
                                                          class="form-check-label"
                                                          >No</label
                                                        >
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div
                                                  v-if="
                                                    subChild.hierarchies.length
                                                  "
                                                >
                                                  <ul>
                                                    <template
                                                      v-for="(
                                                        subSubChild,
                                                        subSubChildIndex
                                                      ) in subChild.hierarchies"
                                                      :key="subSubChildIndex"
                                                    >
                                                      <li>
                                                        <div class="card">
                                                          <div
                                                            class="card-header border-0"
                                                          >
                                                            <div
                                                              class="d-block p-2 w-100"
                                                            >
                                                              <span
                                                                class="input-group-text"
                                                                @click="
                                                                  toggleAccordion(
                                                                    subSubChild
                                                                  )
                                                                "
                                                              >
                                                                {{
                                                                  subSubChild.clause_number
                                                                }}
                                                              </span>
                                                            </div>
                                                          </div>
                                                          <div
                                                            class="card-body"
                                                            v-if="
                                                              subSubChild.open
                                                            "
                                                          >
                                                            <div
                                                              class="form-group"
                                                            >
                                                              <label
                                                                for="description"
                                                                >Description:</label
                                                              >
                                                              <textarea
                                                                class="form-control"
                                                                v-model="
                                                                  subSubChild.description
                                                                "
                                                              ></textarea>
                                                            </div>
                                                            <div
                                                              class="row mb-6 mt-6"
                                                            >
                                                              <div
                                                                class="form-group d-flex align-items-center"
                                                              >
                                                                <label
                                                                  class="form-label me-3 text-nowrap required"
                                                                  >Has NC</label
                                                                >
                                                                <div
                                                                  class="input-group"
                                                                  :id="
                                                                    'has_nc_' +
                                                                    subSubChild.clause_number
                                                                  "
                                                                >
                                                                  <div
                                                                    class="form-check form-check-inline me-2"
                                                                  >
                                                                    <input
                                                                      class="form-check-input"
                                                                      type="radio"
                                                                      :value="
                                                                        true
                                                                      "
                                                                      v-model="
                                                                        subSubChild.has_nc
                                                                      "
                                                                      :id="
                                                                        'has_nc_yes_' +
                                                                        subSubChild.clause_number
                                                                      "
                                                                      :name="
                                                                        'has_nc_' +
                                                                        subSubChild.clause_number
                                                                      "
                                                                    />
                                                                    <label
                                                                      :for="
                                                                        'has_nc_yes_' +
                                                                        subSubChild.clause_number
                                                                      "
                                                                      class="form-check-label"
                                                                      >Yes</label
                                                                    >
                                                                  </div>

                                                                  <div
                                                                    class="form-check form-check-inline"
                                                                  >
                                                                    <input
                                                                      class="form-check-input"
                                                                      type="radio"
                                                                      :value="
                                                                        false
                                                                      "
                                                                      v-model="
                                                                        subSubChild.has_nc
                                                                      "
                                                                      :id="
                                                                        'has_nc_no_' +
                                                                        subSubChild.clause_number
                                                                      "
                                                                      :name="
                                                                        'has_nc_' +
                                                                        subSubChild.clause_number
                                                                      "
                                                                    />
                                                                    <label
                                                                      :for="
                                                                        'has_nc_no_' +
                                                                        subSubChild.clause_number
                                                                      "
                                                                      class="form-check-label"
                                                                      >No</label
                                                                    >
                                                                  </div>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </li>
                                                    </template>
                                                  </ul>
                                                </div>
                                                <div class="text-end mt-2">
                                                  <button
                                                    type="button"
                                                    class="fs-6 btn btn-sm rounded-circle btn-success"
                                                    @click="
                                                      addHierarchy(subChild, 3)
                                                    "
                                                  >
                                                    +
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                        </template>
                                      </ul>
                                    </div>
                                    <div class="text-end mt-2">
                                      <button
                                        type="button"
                                        class="fs-6 btn btn-sm rounded-circle btn-success"
                                        @click="addHierarchy(child, 2)"
                                      >
                                        +
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            </template>
                          </ul>
                        </div>
                        <div class="text-end mt-2">
                          <button
                            type="button"
                            class="fs-6 btn btn-sm rounded-circle btn-success"
                            @click="addHierarchy(clause, 1)"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                </template>
              </ul>
            </div>

            <button type="button" class="btn btn-success" @click="addClause">
              + Add Clause
            </button>
          </div>
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <button
              @click="clear"
              class="btn btn-lg btn-danger w-sd-25 w-lg-25"
            >
              Discard
            </button>
            <!--end::Button-->
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <!--begin::Button-->
            <span
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-lg btn-primary w-sd-25 w-lg-25"
              @click="onSubmit()"
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


<script>
import { reactive, defineComponent, onMounted, ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { Identifier } from "@/core/config/WhichUserConfig";
import { getCompanies, addISORule } from "@/stores/api";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import ApiService from "@/core/services/ApiService";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default defineComponent({
  name: "iso-add",
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
    const User = auth.GetUser();
    const Companies = ref([{ id: "", company_name: "" }]);

    const clauses = reactive([
      {
        clause_number: "1",
        description: "",
        hierarchies: [],
        has_nc: "",
        open: true,
      },
    ]);

    const ISO = ref({
      clauses: [],
      company_id: User.company_id,
      is_active: 1,
    });

    const getdropcomp = async () => {
      try {
        ApiService.setHeader();
        const response = await getCompanies(`fetchAll=true`);

        if (response.success) {
          if (response.result != null && response.result) {
            Companies.value.push(
              ...response.result?.map(({ ...rest }) => ({
                ...rest,
              }))
            );
          }
        } else {
          console.error(
            `Error Occured in getCompanies : ${
              response.message || "Error Occured in API"
            }`
          );
        }
      } catch (err) {
        console.error(`Error Occured in getCompanies : ${err}`);
      }
    };

    onMounted(async () => {
      Companies.value.pop();
      if (User.role_id === 1) {
        await getdropcomp();
      }
    });

    const toggleAccordion = (node) => {
      node.open = !node.open;
    };

    const addHierarchy = (parent, level) => {
      if (parent.has_nc !== "") {
        const newClauseNumber = getNextClauseNumber(parent, level);
        console.log(parent, level);
        console.log(newClauseNumber);
        parent.hierarchies.push({
          clause_number: newClauseNumber,
          description: "",
          hierarchies: [],
          has_nc: "",
          open: true,
        });
      }else {
        alert("Has NC Is Required Field.");
      }
    };

    const addClause = () => {
      clauses.push({
        clause_number: String(clauses.length + 1),
        description: "",
        hierarchies: [],
        has_nc: "",
        open: true,
      });
    };

    const getNextClauseNumber = (parent, level) => {
      const lastChildIndex = parent.hierarchies.length;
      const parentClauseNumber = parent.clause_number;
      return `${parentClauseNumber}.${lastChildIndex + 1}`;
    };

    const onSubmit = async () => {
      try {
        console.log(clauses);
        loading.value = true;

        if (clauses.length == 0) {
          showErrorAlert("Warning", "Please Add at least one clause");
          loading.value = false;
          return;
        }

        ISO.value = {
          clauses: clauses,
          company_id: ISO.value.company_id,
          is_active: 1,
        };

        const response = await addISORule(ISO.value);
        // console.log(response.error);
        if (response.success) {
          // Handle successful API response
          // console.log("API response:", response);
          showSuccessAlert(
            "Success",
            response.message || "ISO Rules have been successfully inserted!"
          );
          router.push({ name: "iso-list" });
        } else {
            // Handle API error response
            loading.value = false;
            showErrorAlert("Error", response.message || "An error occurred.");
        }
      } catch (error) {
        // Handle any other errors during API call
        console.error("API call error:", error);
        showErrorAlert("Error", "An error occurred during the API call.");
      } finally {
        loading.value = false;
      }
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

    return {
      clauses,
      onSubmit,
      toggleAccordion,
      addHierarchy,
      addClause,
      ISO,
      identifier,
      Companies,
      loading,
    };
  },
});
</script>

<style scoped>
.tree ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  position: relative;
}

.tree ul::before {
  content: "";
  position: absolute;
  top: 0;
  left: -20px;
  width: 1px;
  height: 100%;
  border-left: 1px solid #ccc;
}

.tree ul li {
  padding: 0px;
  position: relative;
}

.tree ul li::after {
  content: "";
  position: absolute;
  top: 50%;
  left: -20px;
  width: 20px;
  height: 1px;
  background-color: #ccc;
}

.tree ul li:last-child::before {
  height: 50%;
}

.tree .card {
  width: 100%;
  border-bottom: none; /* Remove border bottom */
}
</style>
