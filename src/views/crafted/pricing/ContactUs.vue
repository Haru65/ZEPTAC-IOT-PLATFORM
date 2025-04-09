<template>
  <!--begin::Wrapper-->
  <div class="h-100 d-flex justify-content-center align-items-center">
    <div class="w-lg-500px p-10">
      <!--begin::Card-->
      <div class="card shadow-sm rounded-3 border-0">
        <div class="card-body p-10">
          <!--begin::Form-->
          <VForm
            class="form w-100"
            id="kt_contact_form"
            @submit="onSubmitContact"
            :validation-schema="contactSchema"
            :initial-values="{ email: '', message: '' }"
          >
            <!--begin::Header-->
            <div class="text-center mb-10">
              <!--begin::Icon-->
              <div class="mb-5">
                <i class="bi bi-envelope-check fs-2x text-primary"></i>
              </div>
              <!--end::Icon-->

              <!--begin::Title-->
              <h1 class="text-dark mb-3 fs-2x fw-bold">Get In Touch</h1>
              <!--end::Title-->

              <!--begin::Subtitle-->
              <div class="text-gray-600 fw-semibold">
                We'd love to hear from you! Send us a message.
              </div>
              <!--end::Subtitle-->
            </div>
            <!--end::Header-->

            <!--begin::Input group - Email-->
            <div class="fv-row mb-8">
              <label class="form-label fs-6 fw-bold text-dark"
                >Your Email</label
              >
              <Field
                tabindex="1"
                class="form-control form-control-lg"
                type="email"
                name="email"
                placeholder="Enter your email"
                autocomplete="off"
              />
              <div class="fv-plugins-message-container mt-2">
                <div class="fv-help-block text-danger">
                  <ErrorMessage name="email" />
                </div>
              </div>
            </div>
            <!--end::Input group-->

            <!--begin::Input group - Message-->
            <div class="fv-row mb-8">
              <label class="form-label fs-6 fw-bold text-dark"
                >Your Message</label
              >
              <Field
                as="textarea"
                tabindex="2"
                class="form-control form-control-lg"
                name="message"
                rows="5"
                placeholder="Enter your message here..."
              />
              <div class="fv-plugins-message-container mt-2">
                <div class="fv-help-block text-danger">
                  <ErrorMessage name="message" />
                </div>
              </div>
            </div>
            <!--end::Input group-->

            <!--begin::Actions-->
            <div class="d-flex flex-column">
              <button
                type="submit"
                ref="submitButton"
                id="kt_contact_submit"
                class="btn btn-primary btn-lg py-3 mb-5"
              >
                <span class="indicator-label">Send Message</span>
                <span class="indicator-progress">
                  Sending...
                  <span
                    class="spinner-border spinner-border-sm align-middle ms-2"
                  ></span>
                </span>
              </button>

              <div class="separator separator-content my-5">
                <span class="w-250px text-gray-500 fw-semibold">Or</span>
              </div>

              <div class="text-center">
                <router-link
                  to="/"
                  class="text-primary fw-semibold fs-6 text-decoration-none"
                >
                  <i class="bi bi-arrow-left me-2"></i> Return to Homepage
                </router-link>
              </div>
            </div>
            <!--end::Actions-->
          </VForm>
          <!--end::Form-->
        </div>
      </div>
      <!--end::Card-->
    </div>
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import { useBodyStore } from "@/stores/body";
import LayoutService from "@/core/services/LayoutService";
import Swal from "sweetalert2/dist/sweetalert2.js";
import ApiService from "@/core/services/ApiService";

export default defineComponent({
  name: "ContactUs",
  components: {
    Field,
    VForm,
    ErrorMessage,
  },
  setup() {
    const bodyStore = useBodyStore();
    const submitButton = ref<HTMLButtonElement | null>(null);

    onMounted(() => {
      LayoutService.emptyElementClassesAndAttributes(document.body);
      bodyStore.addBodyClassname("bg-body");
    });

    // Form validation schema
    const contactSchema = Yup.object().shape({
      email: Yup.string().email().required().label("Email"),
      message: Yup.string().required().min(10).max(1000).label("Message"),
    });

    const onSubmitContact = async (values: any, { resetForm }: any) => {
      if (submitButton.value) {
        submitButton.value.disabled = true;
        submitButton.value.setAttribute("data-kt-indicator", "on");
      }

      try {
        ApiService.setHeader(); // e.g., to set auth token or content type

        const payload = {
          email: values.email,
          message: values.message,
        };

        /* Uncomment it in production mode */
        // const response = await ApiService.post("contact", payload);
        // const message = response.data.message || "Message sent successfully!";

        const message = "Thank you for reaching out! We've received your message and will get back to you shortly.";

        Swal.fire({
          title: "Message Sent!",
          text: message,
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Great!",
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });

        // ✅ Clear the form
        resetForm();
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message ||
          "Failed to send message. Please try again later.";

        Swal.fire({
          title: "Error!",
          text: errorMessage,
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Try again!",
          customClass: {
            confirmButton: "btn btn-light-danger",
          },
        });
      } finally {
        if (submitButton.value) {
          submitButton.value.removeAttribute("data-kt-indicator");
          submitButton.value.disabled = false;
        }
      }
    };

    return {
      onSubmitContact,
      contactSchema,
      submitButton,
    };
  },
});
</script>