<template>
  <Vform
    id="kt_account_profile_details_form"
    class="form"
    novalidate
    :validation-schema="profileDetailsValidator"
    enctype="multipart/form-data"
  >
    <!--begin::Basic info-->
    <div class="card mb-5 mb-xl-10 p-6 pb-12">
      <!--begin::Card header-->
      <div
        class="card-header border-0 cursor-pointer"
        role="button"
        data-bs-toggle="collapse"
        data-bs-target="#kt_account_profile_details"
        aria-expanded="true"
        aria-controls="kt_account_profile_details"
      >
        <!--begin::Card title-->
        <div class="card-title m-0">
          <h3 class="fw-bold m-0">Profile Details</h3>
        </div>
        <!--end::Card title-->
      </div>
      <!--begin::Card header-->

      <!--begin::Content-->
      <div id="kt_account_profile_details" class="collapse show">
        <!--begin::Form-->
        <!--begin::Card body-->
        <div class="card-body border-top p-9">
          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6"
              >Profile Image</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8">
              <!--begin::Image input-->
              <div
                class="image-input image-input-outline"
                data-kt-image-input="true"
                :style="{
                  backgroundImage: `url(${getAssetPath(
                    'media/avatars/blank.png'
                  )})`,
                }"
              >
                <!--begin::Preview existing avatar-->
                <img
                  v-if="
                    profileDetails.profile_pic && profileData.file_name == ''
                  "
                  v-bind:src="`https://api.zeptac.com/storage/company/${profileDetails.company_id}/profile_images/${profileDetails.profile_pic}`"
                  class="image-input-wrapper"
                  alt="profile image"
                />
                <img
                  v-else-if="
                    profileDetails.profile_pic && profileData.file_name
                  "
                  v-bind:src="`https://api.zeptac.com/storage/temporary/${profileData.file_name}`"
                  class="image-input-wrapper"
                  alt="profile image"
                />
                <img
                  v-else
                  v-bind:src="`${getAssetPath('media/avatars/blank.png')}`"
                  class="image-input-wrapper"
                  alt="profile image"
                />
                <!--end::Preview existing avatar-->

                <!--begin::Label-->
                <label
                  class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                  data-kt-image-input-action="change"
                  data-bs-toggle="tooltip"
                  title="Change profile image"
                >
                  <i class="bi bi-pencil-fill fs-7"></i>

                  <!--begin::Inputs-->
                  <input
                    type="file"
                    name="profile_pic"
                    accept=".png, .jpg, .jpeg"
                    @change="handleProfileChange($event)"
                  />
                  <input max-size="1000" type="hidden" name="avatar_update" />
                  <!--end::Inputs-->
                </label>
                <!--end::Label-->

                <!--begin::Remove-->
                <span
                  class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                  data-kt-image-input-action="remove"
                  data-bs-toggle="tooltip"
                  @click="removeProfileFromTemp"
                  title="Remove image"
                >
                  <i class="bi bi-x fs-2"></i>
                </span>
                <!--end::Remove-->
              </div>
              <!--end::Image input-->

              <!--begin::Hint-->
              <div class="form-text">
                Allowed file types: png, jpg, jpeg. <br />
                Note : Max Upload limit 1 MB.
                <br />
              </div>
              <!--end::Hint-->
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-semobold fs-6"
              >Full Name</label
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
                    name="fname"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    placeholder="First name"
                    v-model="profileDetails.first_name"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="fname" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->

                <!--begin::Col-->
                <div class="col-lg-6 fv-row">
                  <Field
                    type="text"
                    name="lname"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Last name"
                    v-model="profileDetails.last_name"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="lname" />
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
                v-model="profileDetails.email"
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
                v-model="profileDetails.phone"
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
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-semobold fs-6"
              >Role</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <el-select
                v-model="profileDetails.role_id"
                filterable
                placeholder="Please Select Role..."
              >
                <el-option
                  v-for="item in c_rolesArray"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="role" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6" v-if="identifier == 'Admin'">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-semobold fs-6"
              >Company</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <el-select
                v-model="profileDetails.company_id"
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
                  <ErrorMessage name="company" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!-- extra fields -->
          <!--end::Input group-->
          <div class="separator my-10"></div>

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6">
              <span>WhatsApp No.</span>
            </label>
            <!--end::Label-->

            <div class="col-lg-8 fv-row">
              <Field
                type="tel"
                name="whatsapp_no"
                class="form-control form-control-lg form-control-solid"
                placeholder="Enter Your WhatsApp Number"
                v-model="profileDetails.whatsapp_no"
              />
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6">
              <span>Address 1</span>
            </label>
            <!--begin::Col-->
            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="textarea"
                name="address1"
                as="textarea"
                class="form-control form-control-lg form-control-solid"
                placeholder="eg. plot no, apartment name"
                v-model="profileDetails.address1"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="address1" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>

          <!-- address 2 -->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6">
              <span>Address 2</span>
            </label>
            <!--begin::Col-->
            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="textarea"
                name="address2"
                as="textarea"
                class="form-control form-control-lg form-control-solid"
                placeholder="eg. street name, road name, area name"
                v-model="profileDetails.address2"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="address2" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6"
              >Country</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8">
              <!--begin::Row-->
              <div class="row">
                <!--begin::Col-->
                <div class="col-lg fv-row">
                  <el-select
                    v-model="profileDetails.country"
                    filterable
                    placeholder="Select your Country..."
                  >
                    <el-option
                      v-for="item in countries"
                      :key="item.name"
                      :label="item.name"
                      :value="item.name"
                    />
                  </el-select>
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
            <label class="col-lg-4 col-form-label fw-semobold fs-6"
              >State</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8">
              <!--begin::Row-->
              <div class="row">
                <!--begin::Col-->
                <!--begin::Col-->
                <div v-if="state.length" class="col-lg fv-row">
                  <div>
                    <el-select
                      v-model="profileDetails.states"
                      filterable
                      placeholder="Select Your State..."
                    >
                      <el-option
                        v-for="item in state"
                        :key="item"
                        :label="item"
                        :value="item"
                      />
                    </el-select>
                  </div>
                </div>

                <div v-if="!state.length" class="col-lg fv-row">
                  <div>
                    <Field
                      type="text"
                      name="state"
                      class="form-control form-control-lg form-control-solid"
                      placeholder="Enter State Name"
                      v-model="profileDetails.states"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="state" />
                      </div>
                    </div>
                  </div>
                </div>
                <!--end::Col-->
                <!--end::Col-->
              </div>
              <!--end::Row-->
            </div>
            <!--end::Col-->
          </div>
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6"
              >Pincode</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg">
              <!--begin::Row-->
              <div class="row">
                <!--begin::Col-->
                <div class="col-lg fv-row">
                  <Field
                    type="text"
                    name="pincode"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Enter Pincode"
                    v-model="profileDetails.pincode"
                  />
                </div>
                <!--end::Col-->
              </div>
              <!--end::Row-->
            </div>
            <!--end::Col-->
          </div>
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6">City</label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg">
              <!--begin::Row-->
              <div class="row">
                <!--begin::Col-->
                <div class="col-lg fv-row">
                  <Field
                    type="text"
                    name="city"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Enter City"
                    v-model="profileDetails.city"
                  />
                </div>
                <!--end::Col-->
              </div>
              <!--end::Row-->
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6"
              >Date of Birth</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg">
              <!--begin::Row-->
              <div class="row">
                <!--begin::Col-->
                <div class="col-lg fv-row">
                  <el-date-picker
                    type="date"
                    name="dob"
                    id="dob"
                    v-model="profileDetails.dob"
                    @change="setDates($event, 'dob')"
                    placeholder="Select Date of Birth"
                    :editable="false"
                  />
                </div>
                <!--end::Col-->
              </div>
              <!--end::Row-->
            </div>
            <!--end::Col-->
          </div>
          <!--  -->
          <!--end::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6"
              >Gender</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg">
              <!--begin::Row-->
              <div class="row">
                <div class="col-lg fv-row">
                  <div>
                    <el-select
                      v-model="profileDetails.gender"
                      filterable
                      placeholder="Select Your Gender..."
                    >
                      <el-option label="Male" value="male" />
                      <el-option label="Female" value="female" />
                      <el-option label="Other" value="other" />
                    </el-select>
                  </div>
                </div>
              </div>
              <!--end::Row-->
            </div>
            <!--end::Col-->
          </div>
          <!--  -->
          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6"
              >Aadhar Card</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8">
              <!--begin::Row-->
              <div class="row">
                <!--begin::Col-->
                <div
                  v-if="profileDetails.adhar == ''"
                  class="form-group col-md-12 mb-8 mb-sd-8"
                >
                  <div class="position-relative">
                    <label
                      class="w-100 bg-gray-200 min-h-100px btn btn-outline btn-outline-dashed btn-outline-default d-flex align-items-center position-relative"
                    >
                      <div
                        class="m-6 position-absolute fs-1 top-50 start-50 translate-middle"
                      >
                        <i class="bi bi-upload fs-1"></i>

                        <p class="fs-3 text-gray-700">Browse File to upload</p>
                      </div>
                      <input
                        type="file"
                        @change="handleAadharChange"
                        accept=".pdf"
                        class="position-absolute top-0 start-0 end-0 bottom-0 opacity-0 w-100 h-100"
                      />
                    </label>
                  </div>
                  <div
                    v-if="
                      uploadProgressForAadhar &&
                      uploadProgressForAadhar > 0 &&
                      uploadProgressForAadhar <= 100
                    "
                    class="h-10px min-w-100 d-flex flex-stack py-4"
                  >
                    <div
                      class="progress progress-bar bg-primary d-flex align-items-center justify-content-center"
                      role="progressbar"
                      :style="`width: ${uploadProgressForAadhar}%`"
                      :aria-valuenow="uploadProgressForAadhar"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                    <div class="d-flex flex-column align-items-end ms-2">
                      {{ `${uploadProgressForAadhar}%` }}
                    </div>
                  </div>
                </div>
                <div
                  v-if="
                    profileDetails.adhar != '' && aadharData.file_name == ''
                  "
                  class="notice d-flex bg-light-primary rounded border-primary border min-w-lg-600px flex-shrink-0 p-6"
                >
                  <!--begin::Icon-->
                  <KTIcon
                    icon-name="file"
                    icon-class="fs-2tx text-primary me-4"
                  />
                  <!--end::Icon-->

                  <!--begin::Wrapper-->
                  <div
                    class="d-flex flex-stack flex-grow-1 flex-wrap flex-md-nowrap"
                  >
                    <!--begin::Content-->
                    <div class="mb-3 mb-md-0 fw-semobold">
                      <h4 class="text-gray-800 fw-bold cursor-pointer">
                        <a
                          target="blank"
                          v-bind:href="`https://api.zeptac.com/storage/company/${profileDetails.company_id}/aadhar_cards/${profileDetails.adhar}`"
                          data-toggle="tooltip"
                          title="preview file"
                          class="underline"
                          >{{ profileDetails.adhar }}
                        </a>
                      </h4>
                    </div>
                    <!--end::Content-->

                    <!--begin::Action-->

                    <KTIcon
                      data-toggle="tooltip"
                      title="remove file"
                      icon-name="cross"
                      class="cursor-pointer fs-2tx text-danger rounded"
                      @click="removeAadharFromTemp"
                      icon-class="fs-1"
                    />
                    <!--end::Action-->
                  </div>
                  <!--end::Wrapper-->
                </div>
                <div
                  v-else-if="aadharData.file_name != ''"
                  class="notice d-flex bg-light-primary rounded border-primary border min-w-lg-600px flex-shrink-0 p-6"
                >
                  <!--begin::Icon-->
                  <KTIcon
                    icon-name="file"
                    icon-class="fs-2tx text-primary me-4"
                  />
                  <!--end::Icon-->

                  <!--begin::Wrapper-->
                  <div
                    class="d-flex flex-stack flex-grow-1 flex-wrap flex-md-nowrap"
                  >
                    <!--begin::Content-->
                    <div class="mb-3 mb-md-0 fw-semobold">
                      <h4 class="text-gray-800 fw-bold cursor-pointer">
                        <a
                          target="blank"
                          v-bind:href="`https://api.zeptac.com/storage/temporary/${profileDetails.adhar}`"
                          data-toggle="tooltip"
                          title="preview file"
                          class="underline"
                          >{{ profileDetails.adhar }}
                        </a>
                      </h4>
                      <div class="fs-6 text-gray-600 pe-7">
                        {{ aadharData.file_size.toFixed(2) }} MB
                      </div>
                    </div>
                    <!--end::Content-->

                    <!--begin::Action-->

                    <KTIcon
                      data-toggle="tooltip"
                      title="remove file"
                      icon-name="cross"
                      class="cursor-pointer fs-2tx text-danger rounded"
                      @click="removeAadharFromTemp"
                      icon-class="fs-1"
                    />
                    <!--end::Action-->
                  </div>
                  <!--end::Wrapper-->
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
            <label class="col-lg-4 col-form-label fw-semobold fs-6"
              >Pan Card</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8">
              <!--begin::Row-->
              <div class="row">
                <!--begin::Col-->
                <div
                  v-if="profileDetails.pan == ''"
                  class="form-group col-md-12 mb-8 mb-sd-8"
                >
                  <div class="position-relative">
                    <label
                      class="w-100 bg-gray-200 min-h-100px btn btn-outline btn-outline-dashed btn-outline-default d-flex align-items-center position-relative"
                    >
                      <div
                        class="m-6 position-absolute fs-1 top-50 start-50 translate-middle"
                      >
                        <i class="bi bi-upload fs-1"></i>

                        <p class="fs-3 text-gray-700">Browse File to upload</p>
                      </div>
                      <input
                        type="file"
                        @change="handlePanChange"
                        accept=".pdf"
                        class="position-absolute top-0 start-0 end-0 bottom-0 opacity-0 w-100 h-100"
                      />
                    </label>
                  </div>
                  <div
                    v-if="
                      uploadProgressForPan &&
                      uploadProgressForPan > 0 &&
                      uploadProgressForPan <= 100
                    "
                    class="h-10px min-w-100 d-flex flex-stack py-4"
                  >
                    <div
                      class="progress progress-bar bg-primary d-flex align-items-center justify-content-center"
                      role="progressbar"
                      :style="`width: ${uploadProgressForPan}%`"
                      :aria-valuenow="uploadProgressForPan"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                    <div class="d-flex flex-column align-items-end ms-2">
                      {{ `${uploadProgressForPan}%` }}
                    </div>
                  </div>
                </div>
                <div
                  v-if="profileDetails.pan != '' && panData.file_name == ''"
                  class="notice d-flex bg-light-primary rounded border-primary border min-w-lg-600px flex-shrink-0 p-6"
                >
                  <!--begin::Icon-->
                  <KTIcon
                    icon-name="file"
                    icon-class="fs-2tx text-primary me-4"
                  />
                  <!--end::Icon-->

                  <!--begin::Wrapper-->
                  <div
                    class="d-flex flex-stack flex-grow-1 flex-wrap flex-md-nowrap"
                  >
                    <!--begin::Content-->
                    <div class="mb-3 mb-md-0 fw-semobold">
                      <h4 class="text-gray-800 fw-bold cursor-pointer">
                        <a
                          target="blank"
                          v-bind:href="`https://api.zeptac.com/storage/company/${profileDetails.company_id}/pan_cards/${profileDetails.pan}`"
                          data-toggle="tooltip"
                          title="preview file"
                          class="underline"
                          >{{ profileDetails.pan }}
                        </a>
                      </h4>
                    </div>
                    <!--end::Content-->

                    <!--begin::Action-->

                    <KTIcon
                      data-toggle="tooltip"
                      title="remove file"
                      icon-name="cross"
                      class="cursor-pointer fs-2tx text-danger rounded"
                      @click="removePanFromTemp"
                      icon-class="fs-1"
                    />
                    <!--end::Action-->
                  </div>
                  <!--end::Wrapper-->
                </div>
                <div
                  v-else-if="panData.file_name != ''"
                  class="notice d-flex bg-light-primary rounded border-primary border min-w-lg-600px flex-shrink-0 p-6"
                >
                  <!--begin::Icon-->
                  <KTIcon
                    icon-name="file"
                    icon-class="fs-2tx text-primary me-4"
                  />
                  <!--end::Icon-->

                  <!--begin::Wrapper-->
                  <div
                    class="d-flex flex-stack flex-grow-1 flex-wrap flex-md-nowrap"
                  >
                    <!--begin::Content-->
                    <div class="mb-3 mb-md-0 fw-semobold">
                      <h4 class="text-gray-800 fw-bold cursor-pointer">
                        <a
                          target="blank"
                          v-bind:href="`https://api.zeptac.com/storage/temporary/${profileDetails.pan}`"
                          data-toggle="tooltip"
                          title="preview file"
                          class="underline"
                          >{{ profileDetails.pan }}
                        </a>
                      </h4>
                      <div class="fs-6 text-gray-600 pe-7">
                        {{ panData.file_size.toFixed(2) }} MB
                      </div>
                    </div>
                    <!--end::Content-->

                    <!--begin::Action-->

                    <KTIcon
                      data-toggle="tooltip"
                      title="remove file"
                      icon-name="cross"
                      class="cursor-pointer fs-2tx text-danger rounded"
                      @click="removePanFromTemp"
                      icon-class="fs-1"
                    />
                    <!--end::Action-->
                  </div>
                  <!--end::Wrapper-->
                </div>
                <!--end::Col-->
              </div>
              <!--end::Row-->
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->
        </div>
        <!--end::Input group-->
        <!--end::Form-->
      </div>
      <!--end::Content-->
    </div>
    <!--end::Basic info-->
    <div class="card mb-5 mb-xl-10 p-6 pb-12">
      <!--begin::Card header-->
      <div
        class="card-header border-0 cursor-pointer"
        role="button"
        data-bs-toggle="collapse"
        data-bs-target="#kt_account_profile_details_2"
        aria-expanded="true"
        aria-controls="kt_account_profile_details_2"
      >
        <!--begin::Card title-->
        <div class="card-title m-0">
          <h3 class="fw-bold m-0">Employment Details</h3>
        </div>
        <!--end::Card title-->
      </div>
      <!--begin::Card header-->

      <!--begin::Content-->
      <div id="kt_account_profile_details_2" class="collapse show">
        <!--begin::Form-->
        <!--begin::Card body-->
        <div class="card-body border-top p-9">
          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6">
              <span>Employee Code</span>
            </label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="text"
                name="employee_code"
                class="form-control form-control-lg form-control-solid"
                placeholder="Enter Employee Code"
                v-model="profileDetails.employee_code"
              />
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6">
              <span>Department</span>
            </label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="text"
                name="department"
                class="form-control form-control-lg form-control-solid"
                placeholder="Enter Department Name"
                v-model="profileDetails.department"
              />
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6">
              <span>Designation</span>
            </label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="text"
                name="designation"
                class="form-control form-control-lg form-control-solid"
                placeholder="Enter Designation"
                v-model="profileDetails.designation"
              />
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6">
              <span>Date of Joining</span>
            </label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <el-date-picker
                type="date"
                name="date_of_joining"
                id="date_of_joining"
                v-model="profileDetails.date_of_joining"
                @change="setDates($event, 'date_of_joining')"
                placeholder="Pick date of joining"
                :editable="false"
              />
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6">
              <span>Work Experience</span>
            </label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="text"
                as="textarea"
                row="3"
                name="experience"
                class="form-control form-control-lg form-control-solid"
                placeholder="Enter Work Experience"
                v-model="profileDetails.experience"
              />
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6">
              <span>Qualification</span>
            </label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="text"
                name="qualification"
                class="form-control form-control-lg form-control-solid"
                placeholder="Your Highest Qualification"
                v-model="profileDetails.qualification"
              />
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6">
              <span>Job Description</span>
            </label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="text"
                as="textarea"
                row="3"
                name="job_desc"
                class="form-control form-control-lg form-control-solid"
                placeholder="Enter Job Description"
                v-model="profileDetails.job_desc"
              />
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6">
              <span>Reporting To</span>
            </label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="text"
                name="reports_to"
                class="form-control form-control-lg form-control-solid"
                placeholder="Enter Reporting Person name"
                v-model="profileDetails.reports_to"
              />
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->
        </div>
        <!--end::Input group-->
        <!--end::Form-->
      </div>
      <!--end::Content-->
    </div>

    <!--begin::Notifications-->
    <div class="card mb-5 mb-xl-10 p-6 pb-12">
      <!--begin::Card header-->
      <div
        class="card-header border-0 cursor-pointer"
        role="button"
        data-bs-toggle="collapse"
        data-bs-target="#kt_account_notifications"
        aria-expanded="true"
        aria-controls="kt_account_notifications"
      >
        <div class="card-title m-0">
          <h3 class="fw-bold m-0">User Permissions</h3>
        </div>
      </div>
      <!--begin::Card header-->

      <!--begin::Content-->
      <div id="kt_account_notifications" class="collapse show">
        <!--begin::Form-->
        <form class="form">
          <UserPermission
            v-bind:permissionsWithStatus="permissionsWithStatus"
            @appendPermission="addOrRemovePermission"
          >
          </UserPermission>

          <!--begin::Card footer-->
          <div class="card-footer d-flex justify-content-end py-6 px-9">
            <button
              ref="submitButton4"
              @click="submitPermissions"
              :data-kt-indicator="pLoading ? 'on' : null"
              class="btn btn-primary px-6"
            >
              <span v-if="!pLoading" class="indicator-label">
                Save Permissions
              </span>
              <span v-if="pLoading" class="indicator-progress">
                Please wait...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </button>
          </div>
          <!--end::Card footer-->
        </form>
        <!--end::Form-->
      </div>
      <!--end::Content-->
    </div>
    <!--end::Notifications-->

    <div class="modal-footer flex-center">
      <!--begin::Button-->
      <button type="reset" class="btn btn-lg btn-danger w-25">Clear</button>
      <!--end::Button-->
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      <!--begin::Button-->
      <span
        @click="onsubmit()"
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
      </span>
      <!--end::Button-->
    </div>
  </Vform>
</template>
    
<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref, watch } from "vue";
import { ErrorMessage, Field, Form as Vform } from "vee-validate";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";
import { c_rolesArray } from "@/core/config/PermissionsRolesConfig";
import {
  getEmployee,
  updateEmployee,
  getCompanies,
  updatePermission,
  uploadImage,
  removeImage,
} from "@/stores/api";
import ApiService from "@/core/services/ApiService";
import { countries, INstates } from "@/core/model/countries";
import moment from "moment";
import { Identifier } from "@/core/config/WhichUserConfig";
import { useAuthStore } from "@/stores/auth";
import { useRouter, useRoute } from "vue-router";
import { blank64 } from "./blank";
import UserPermission from "./customUserPermission/UserPermission.vue";

interface Permission {
  id: number;
  name: string;
}

interface ProfileDetails {
  id: string;
  profile_pic: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  confpassword: string;
  role_id: string;
  userPermissions: Array<Permission>;

  employee_code: string;
  department: string;
  designation: string;
  date_of_joining: string;
  experience: string;
  qualification: string;
  job_desc: string;
  reports_to: string;

  whatsapp_no: string;
  address1: string;
  address2: string;
  country: string;
  states: string;
  pincode: string;
  city: string;
  dob: string;
  gender: string;
  adhar: string;
  pan: string;
  company_id: string;
  updated_by: string;

  allPermissions: Array<Permission>;
}

interface PermissionWithStatus {
  id: number;
  name: string;
  isPresent: boolean;
}

export default defineComponent({
  name: "employee-edit",
  components: {
    ErrorMessage,
    Field,
    Vform,
    UserPermission,
  },
  setup() {
    const auth = useAuthStore();
    const identifier = Identifier;
    const submitButton4 = ref<HTMLElement | null>(null);
    const User = auth.GetUser();
    let limit = ref(500);
    const router = useRouter();
    const route = useRoute();
    const loading = ref(false);
    const pLoading = ref(false);
    const Companies = ref([{ id: "", company_name: "" }]);
    const state = ref([""]);
    const userId = route.params.id;

    const profileData = ref({
      file_name: "",
      file: "",
      file_size: 0,
    });

    const aadharData = ref({
      file_name: "",
      file: "",
      file_size: 0,
    });

    const panData = ref({
      file_name: "",
      file: "",
      file_size: 0,
    });

    // PERMISSION MANAGER
    // const userPermissions = ref([]);
    // const allPermissions = ref([]);

    const permissionsWithStatus = ref<PermissionWithStatus[]>([]);
    const permArr = ref<String[]>([]);

    async function addOrRemovePermission(e) {
      if (e.target && e.target.value) {
        if (e.target.checked == true) {
          permArr.value.push(e.target.value);
        } else {
          permArr.value = permArr.value.filter(
            (permission) => permission != e.target.value
          );
        }
        // console.log(permArr.value)
      }
    }

    const getdropcomp = async () => {
      ApiService.setHeader();
      const response = await getCompanies(`fetchAll=true`);
      if (response.result != null && response.result) {
        Companies.value.push(
          ...response.result?.map(({ created_at, ...rest }) => ({
            ...rest,
            created_at: moment(created_at).format("MMMM Do YYYY"),
          }))
        );
        // console.log(Companies);
      }
    };

    // get image as base64 and convert to img form larvel
    const loadUser = async () => {
      ApiService.setHeader();
      const response = await getEmployee(userId);
      // console.log(response);
      profileDetails.value = {
        id: userId.toString(),
        profile_pic: response.meta.profile_pic ?? "",
        first_name: response.first_name,
        last_name: response.last_name,
        email: response.email,
        phone: response.mobile,
        password: " ",
        confpassword: " ",
        role_id: response.role_id,
        userPermissions: response.userPermissions,
        //  ? optional fields check for data

        employee_code: response.meta.employee_code
          ? response.meta.employee_code
          : "",
        department: response.meta.department ? response.meta.department : "",
        designation: response.meta.designation ? response.meta.designation : "",
        date_of_joining: response.meta.date_of_joining
          ? response.meta.date_of_joining
          : "",
        experience: response.meta.experience ? response.meta.experience : "",
        qualification: response.meta.qualification
          ? response.meta.qualification
          : "",
        job_desc: response.meta.job_desc ? response.meta.job_desc : "",
        reports_to: response.meta.reports_to ? response.meta.reports_to : "",

        whatsapp_no: response.meta.whatsapp_no ? response.meta.whatsapp_no : "",
        address1: response.meta.address1 ? response.meta.address1 : "",
        address2: response.meta.address2 ? response.meta.address2 : "",
        country: response.meta.country ? response.meta.country : "",
        states: response.meta.states ? response.meta.states : "",
        city: response.meta.city ? response.meta.city : "",
        pincode: response.meta.pincode ? response.meta.pincode : "",
        dob: response.meta.dob ? response.meta.dob : "",
        gender: response.meta.gender ? response.meta.gender : "",
        adhar: response.meta.adhar ? response.meta.adhar : "",
        pan: response.meta.pan ? response.meta.pan : "",
        company_id: response.company_id ? response.company_id : "",
        updated_by: User.id,
        allPermissions: response.allPermissions ? response.allPermissions : [],
      };
    };

    const updatePermissionsWithStatus = () => {
      const userPermissions = profileDetails.value.userPermissions;
      const allPermissions = profileDetails.value.allPermissions;

      permissionsWithStatus.value = allPermissions.map((permission) => {
        const isPresent = userPermissions.some(
          (userPermission) => userPermission.id === permission.id
        );
        return { ...permission, isPresent };
      });

      permArr.value = userPermissions.map((permission) => permission.name);
      // console.log(permArr.value);
    };

    onMounted(async () => {
      state.value.pop();
      Companies.value.pop();
      await loadUser();
      if (User.role_id === 1) {
        await getdropcomp();
      }

      // create an array for permissions

      updatePermissionsWithStatus();
    });

    const profileDetailsValidator = Yup.object().shape({
      fname: Yup.string().required().label("First name"),
      lname: Yup.string().required().label("Last name"),
      email: Yup.string().required().email().label("Email"),
      phone: Yup.string().required().label("Phone"),
      password: Yup.string().required().label("Password"),
      confpassword: Yup.string().required().label("Confirm Password"),
      pincode: Yup.string().required().label("Pincode"),
      address1: Yup.string().required().label("Address"),
      address2: Yup.string().required().label("Address"),
      adhar: Yup.string().required().label("Adhar No"),
      pan: Yup.string().required().label("Pan No"),
    });

    const profileDetails = ref<ProfileDetails>({
      id: userId.toString(),
      profile_pic: "",
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      password: "",
      confpassword: "",
      role_id: "",
      userPermissions: [],

      employee_code: "",
      department: "",
      designation: "",
      date_of_joining: "",
      experience: "",
      qualification: "",
      job_desc: "",
      reports_to: "",

      whatsapp_no: "",
      address1: "",
      address2: "",
      country: "",
      states: "",
      city: "",
      pincode: "",
      dob: "",
      gender: "",
      adhar: "",
      pan: "",
      company_id: "",
      updated_by: User.id,

      allPermissions: [],
    });

    watch(
      () => profileDetails.value.country,
      (newVal) => {
        while (state.value.length) {
          state.value.pop();
        }
        if (newVal === "India") {
          // profileDetails.value.states = "";
          INstates.forEach((ele) => {
            state.value.push(ele.name);
          });
          //console.log(state);
        } else {
          // profileDetails.value.states = "";
        }
      }
    );

    /* --------SET DATE LOGIC--------*/
    async function setDates(e, dateType) {
      try {
        if (e != null) {
          if (e != "" && e != null) {
            profileDetails.value[dateType] = moment(e).format("YYYY-MM-DD");
          } else {
            profileDetails.value[dateType] = "";
          }
        } else {
          profileDetails.value[dateType] = "";
        }
      } catch (err) {
        profileDetails.value[dateType] = "";
      }
    }

    // CONSTANT
    const MAX_FILE_SIZE = 1024 ** 2; // 1 MB

    // TODO :: optional make a single function that can handle all files
    /* Profile Pic Logic */

    const uploadProgressForProfile = ref<number>(0);

    const handleProfileChange = async (event: any) => {
      const selectedFile = event.target?.files?.[0];
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

      if (!selectedFile) {
        alert("Please Select a file");
        return;
      }

      if (selectedFile.size > MAX_FILE_SIZE) {
        alert("File size should be less than 1 MB");
        return;
      }

      profileData.value.file_size = selectedFile.size / 1024 ** 2;

      if (allowedTypes.includes(selectedFile.type)) {
        await uploadProfileFile(selectedFile);
      } else {
        profileData.value.file = "";
        alert("Please select a valid file");
      }

      console.log(profileData.value);
    };

    const removeProfileFromTemp = async () => {
      if (
        profileDetails.value.profile_pic &&
        profileData.value.file_name === ""
      ) {
        var confirmChange = confirm(
          "Do you really want to change profile image?"
        );
        if (!confirmChange) {
          return;
        }

        profileDetails.value.profile_pic = "";
        // Continue with the rest of your code here
        return;
      }

      if (
        profileDetails.value.profile_pic === "" &&
        profileData.value.file_name === ""
      ) {
        alert("You already removed the file. Please select a new file.");
        return;
      }

      const deleteConfirmation = async () => {
        try {
          const result = await Swal.fire({
            title: "Are you sure?",
            text: "You want to change the file!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "red",
            confirmButtonText: "Yes, I am sure!",
          });
          return result.isConfirmed;
        } catch (error) {
          const errorMessage = "An unknown error occurred";
          showErrorAlert("Error", errorMessage);
          return false;
        }
      };

      const deleteFromServer = async () => {
        try {
          const response = await removeImage(profileData.value);

          if (response.success) {
            profileDetails.value.profile_pic = "";
            profileData.value = {
              file_name: "",
              file_size: 0,
              file: "",
            };

            showSuccessAlert(
              "Success",
              response.message || `File removed successfully.`
            );
            return { success: true };
          } else {
            throw new Error(response.message || "Failed to remove the file.");
          }
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "An unknown error occurred";
          showErrorAlert("Error", errorMessage);
          return { success: false, message: errorMessage };
        }
      };

      const isConfirmed = await deleteConfirmation();
      if (isConfirmed) {
        return await deleteFromServer();
      } else {
        return { success: false };
      }
    };

    const uploadProfileFile = async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("file_name", profileData.value.file_name);

      const onUploadProgress = (progressEvent) => {
        const { loaded, total } = progressEvent;
        const percentage = Math.floor((loaded / total) * 100);
        uploadProgressForProfile.value = percentage;
      };

      try {
        await simulateProfileUploadProgress();
        const response = await uploadImage(formData, onUploadProgress);
        profileDetails.value.profile_pic = response.modifiedFileName;
        profileData.value.file_name = response.modifiedFileName;
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        finalizeProfileProgress();
      }

      profileData.value.file = file;
    };

    const simulateProfileUploadProgress = async () => {
      uploadProgressForProfile.value = 0;
      const interval = setInterval(() => {
        if (uploadProgressForProfile.value < 100) {
          uploadProgressForProfile.value += 10; // Adjust this value for smoother progress
        } else {
          clearInterval(interval);
        }
      }, 200); // Adjust the interval duration as needed
    };

    const finalizeProfileProgress = () => {
      uploadProgressForProfile.value = 100; // Ensure progress bar is complete
      setTimeout(() => {
        uploadProgressForProfile.value = 0; // Reset progress bar after a short delay
      }, 100);
    };

    // TODO :: optional make a single function that can handle all files
    /* Aadhar Card Logic */

    const uploadProgressForAadhar = ref<number>(0);

    const handleAadharChange = async (event: any) => {
      const selectedFile = event.target?.files?.[0];
      const allowedTypes = ["application/pdf"];

      if (!selectedFile) {
        alert("Please Select a file");
        return;
      }

      if (selectedFile.size > MAX_FILE_SIZE) {
        alert("File size should be less than 1 MB");
        return;
      }

      aadharData.value.file_size = selectedFile.size / 1024 ** 2;

      if (allowedTypes.includes(selectedFile.type)) {
        await uploadAadharFile(selectedFile);
      } else {
        aadharData.value.file = "";
        alert("Please select a valid file");
      }

      console.log(aadharData.value);
    };

    const removeAadharFromTemp = async () => {
      if (profileDetails.value.adhar && aadharData.value.file_name === "") {
        var confirmChange = confirm(
          "Do you really want to change aadhar card?"
        );
        if (!confirmChange) {
          return;
        }

        profileDetails.value.adhar = "";
        // Continue with the rest of your code here
        return;
      }

      if (
        profileDetails.value.adhar === "" &&
        aadharData.value.file_name === ""
      ) {
        alert("You already removed the file. Please select a new file.");
        return;
      }

      const deleteConfirmation = async () => {
        try {
          const result = await Swal.fire({
            title: "Are you sure?",
            text: "You want to change the file!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "red",
            confirmButtonText: "Yes, I am sure!",
          });
          return result.isConfirmed;
        } catch (error) {
          const errorMessage = "An unknown error occurred";
          showErrorAlert("Error", errorMessage);
          return false;
        }
      };

      const deleteFromServer = async () => {
        try {
          const response = await removeImage(aadharData.value);

          if (response.success) {
            profileDetails.value.adhar = "";
            aadharData.value = {
              file_name: "",
              file_size: 0,
              file: "",
            };

            showSuccessAlert(
              "Success",
              response.message || `File removed successfully.`
            );
            return { success: true };
          } else {
            throw new Error(response.message || "Failed to remove the file.");
          }
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "An unknown error occurred";
          showErrorAlert("Error", errorMessage);
          return { success: false, message: errorMessage };
        }
      };

      const isConfirmed = await deleteConfirmation();
      if (isConfirmed) {
        return await deleteFromServer();
      } else {
        return { success: false };
      }
    };

    const uploadAadharFile = async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("file_name", aadharData.value.file_name);

      const onUploadProgress = (progressEvent) => {
        const { loaded, total } = progressEvent;
        const percentage = Math.floor((loaded / total) * 100);
        uploadProgressForAadhar.value = percentage;
      };

      try {
        await simulateAadharUploadProgress();
        const response = await uploadImage(formData, onUploadProgress);
        profileDetails.value.adhar = response.modifiedFileName;
        aadharData.value.file_name = response.modifiedFileName;
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        finalizeAadharProgress();
      }

      aadharData.value.file = file;
    };

    const simulateAadharUploadProgress = async () => {
      uploadProgressForAadhar.value = 0;
      const interval = setInterval(() => {
        if (uploadProgressForAadhar.value < 100) {
          uploadProgressForAadhar.value += 10; // Adjust this value for smoother progress
        } else {
          clearInterval(interval);
        }
      }, 200); // Adjust the interval duration as needed
    };

    const finalizeAadharProgress = () => {
      uploadProgressForAadhar.value = 100; // Ensure progress bar is complete
      setTimeout(() => {
        uploadProgressForAadhar.value = 0; // Reset progress bar after a short delay
      }, 100);
    };

    // TODO :: optional make a single function that can handle all files
    /* Pan Card Logic */

    const uploadProgressForPan = ref<number>(0);

    const handlePanChange = async (event: any) => {
      const selectedFile = event.target?.files?.[0];
      const allowedTypes = ["application/pdf"];

      if (!selectedFile) {
        alert("Please Select a file");
        return;
      }

      if (selectedFile.size > MAX_FILE_SIZE) {
        alert("File size should be less than 1 MB");
        return;
      }

      panData.value.file_size = selectedFile.size / 1024 ** 2;

      if (allowedTypes.includes(selectedFile.type)) {
        await uploadPanFile(selectedFile);
      } else {
        panData.value.file = "";
        alert("Please select a valid file");
      }

      console.log(panData.value);
    };

    const removePanFromTemp = async () => {
      if (profileDetails.value.pan && panData.value.file_name === "") {
        var confirmChange = confirm("Do you really want to change pan card?");
        if (!confirmChange) {
          return;
        }

        profileDetails.value.pan = "";
        // Continue with the rest of your code here
        return;
      }

      if (profileDetails.value.pan === "" && panData.value.file_name === "") {
        alert("You already removed the file. Please select a new file.");
        return;
      }

      const deleteConfirmation = async () => {
        try {
          const result = await Swal.fire({
            title: "Are you sure?",
            text: "You want to change the file!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "red",
            confirmButtonText: "Yes, I am sure!",
          });
          return result.isConfirmed;
        } catch (error) {
          const errorMessage = "An unknown error occurred";
          showErrorAlert("Error", errorMessage);
          return false;
        }
      };

      const deleteFromServer = async () => {
        try {
          const response = await removeImage(panData.value);

          if (response.success) {
            profileDetails.value.pan = "";
            panData.value = {
              file_name: "",
              file_size: 0,
              file: "",
            };

            showSuccessAlert(
              "Success",
              response.message || `File removed successfully.`
            );
            return { success: true };
          } else {
            throw new Error(response.message || "Failed to remove the file.");
          }
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "An unknown error occurred";
          showErrorAlert("Error", errorMessage);
          return { success: false, message: errorMessage };
        }
      };

      const isConfirmed = await deleteConfirmation();
      if (isConfirmed) {
        return await deleteFromServer();
      } else {
        return { success: false };
      }
    };

    const uploadPanFile = async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("file_name", panData.value.file_name);

      const onUploadProgress = (progressEvent) => {
        const { loaded, total } = progressEvent;
        const percentage = Math.floor((loaded / total) * 100);
        uploadProgressForPan.value = percentage;
      };

      try {
        await simulatePanUploadProgress();
        const response = await uploadImage(formData, onUploadProgress);
        profileDetails.value.pan = response.modifiedFileName;
        panData.value.file_name = response.modifiedFileName;
      } catch (error) {
        console.error("Error uploading File:", error);
      } finally {
        finalizePanProgress();
      }

      panData.value.file = file;
    };

    const simulatePanUploadProgress = async () => {
      uploadProgressForPan.value = 0;
      const interval = setInterval(() => {
        if (uploadProgressForPan.value < 100) {
          uploadProgressForPan.value += 10; // Adjust this value for smoother progress
        } else {
          clearInterval(interval);
        }
      }, 200); // Adjust the interval duration as needed
    };

    const finalizePanProgress = () => {
      uploadProgressForPan.value = 100; // Ensure progress bar is complete
      setTimeout(() => {
        uploadProgressForPan.value = 0; // Reset progress bar after a short delay
      }, 100);
    };

    const onsubmit = async () => {
      loading.value = true;
      // console.warn("Nice");
      try {
        // form multipart form post
        // push form
        // console.log(profileDetails.value);
        const response = await updateEmployee(profileDetails.value, userId);
        // console.log(response.error);
        if (!response.error) {
          // Handle successful API response
          // console.log("API response:", response);
          showSuccessAlert(
            "Success",
            "Employee have been successfully Updated!"
          );
          router.push({ name: "employee-list" });
        } else {
          // Handle API error response
          const errorData = response.error;
          console.log("API error:", errorData);
          // console.log("API error:", errorData.response.data.errors);
          showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
        }
      } catch (error) {
        // Handle any other errors during API call
        console.error("API call error:", error);
        showErrorAlert("Error", "An error occurred during the API call.");
      } finally {
        loading.value = false;
      }
    };

    const submitPermissions = async (e) => {
      e.preventDefault();
      pLoading.value = true;
      // console.warn("Nice");
      try {
        // form multipart form post
        // push form
        // console.log(profileDetails.value);
        const response = await updatePermission(userId, permArr.value);
        // console.log(response.error);
        if (!response.error) {
          // Handle successful API response
          console.log("API response:", response);
          showSuccessAlert(
            "Success",
            "Permission have been successfully updated!"
          );
          router.push({ name: "employee-list" });
        } else {
          // Handle API error response
          const errorData = response.error;
          console.log("API error:", errorData);
          // console.log("API error:", errorData.response.data.errors);
          showErrorAlert("Warning", "Please Fill the Form Fields Correctly");
        }
      } catch (error) {
        // Handle any other errors during API call
        console.error("API call error:", error);
        showErrorAlert("Error", "An error occurred during the API call.");
      } finally {
        pLoading.value = false;
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

    const clear = () => {
      profileDetails.value = {
        id: "",
        profile_pic: "",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
        confpassword: "",
        role_id: "",
        userPermissions: [],

        employee_code: "",
        department: "",
        designation: "",
        date_of_joining: "",
        experience: "",
        qualification: "",
        job_desc: "",
        reports_to: "",

        whatsapp_no: "",
        address1: "",
        address2: "",
        states: "",
        city: " ",
        country: "",
        pincode: "",
        dob: "",
        gender: "",
        adhar: "",
        pan: "",
        company_id: "",
        updated_by: User.id,

        allPermissions: [],
      };
    };

    return {
      submitButton4,
      profileDetails,
      profileDetailsValidator,
      getAssetPath,
      Companies,
      c_rolesArray,
      onsubmit,
      submitPermissions,
      loading,
      pLoading,
      clear,
      state,
      countries,
      identifier,
      permissionsWithStatus,
      addOrRemovePermission,
      setDates,

      handleProfileChange,
      uploadProgressForProfile,
      profileData,
      removeProfileFromTemp,

      handleAadharChange,
      uploadProgressForAadhar,
      aadharData,
      removeAadharFromTemp,

      handlePanChange,
      uploadProgressForPan,
      panData,
      removePanFromTemp,
    };
  },
});
</script>
