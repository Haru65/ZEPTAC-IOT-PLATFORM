<template>
  <!--begin::Chat drawer-->
  <div
    id="kt_drawer_chat"
    class="bg-body"
    data-kt-drawer="true"
    data-kt-drawer-name="chat"
    data-kt-drawer-activate="true"
    data-kt-drawer-overlay="true"
    data-kt-drawer-width="{default:'500px', 'md': 500px', 'lg': '800px'}"
    data-kt-drawer-direction="end"
    data-kt-drawer-toggle="#kt_drawer_chat_toggle"
    data-kt-drawer-close="#kt_drawer_chat_close"
  >
    <!--begin::Messenger-->
    <div class="card w-100 mw-500px" id="kt_drawer_chat_messenger">
      <!--begin::Card header-->
      <div class="card-header pe-5" id="kt_drawer_chat_messenger_header">
        <!--begin::Title-->
        <div class="card-title">
          <!--begin::User-->
          <div class="d-flex justify-content-center flex-column me-3">
            <span
              class="fs-4 fw-bold text-gray-900 text-hover-primary me-1 mb-2 lh-1"
              >Notifications</span
            >
          </div>
          <!--end::User-->
        </div>
        <!--end::Title-->

        <!--begin::Card toolbar-->
        <div class="card-toolbar">
          <!--begin::Close-->
          <div
            class="btn btn-sm btn-icon btn-active-icon-primary"
            id="kt_drawer_chat_close"
          >
            <KTIcon icon-name="cross" icon-class="fs-2x" />
          </div>
          <!--end::Close-->
        </div>
        <!--end::Card toolbar-->
      </div>
      <!--end::Card header-->

      <!--begin::Card body-->
      <div class="card-body" id="kt_drawer_chat_messenger_body">
        <!--begin::Messages-->
        <div
          class="scroll-y me-n5 pe-5"
          ref="messagesRef"
          data-kt-element="messages"
          data-kt-scroll="true"
          data-kt-scroll-activate="true"
          data-kt-scroll-height="auto"
          data-kt-scroll-dependencies="#kt_drawer_chat_messenger_header, #kt_drawer_chat_messenger_footer"
          data-kt-scroll-wrappers="#kt_drawer_chat_messenger_body"
          data-kt-scroll-offset="0px"
        >
          <div
            class="d-flex justify-content-start mb-2"
            v-for="notification in notifications"
            :key="notification.id"
          >
            <div class="d-flex flex-column align-items-start">
              <div
                class="p-5 rounded bg-light-info text-dark fw-sembold mw-lg-400px text-start d-flex justify-content-between align-items-center"
                data-kt-element="message-text"
              >
                <span>{{ notification.data.message }}</span>
                <button
                  class="btn btn-sm btn-light ms-2"
                  @click="markAsRead(notification.id)"
                  v-if="!notification.read"
                >
                  <i class="fas fa-check"></i>
                </button>
              </div>
            </div>
          </div>

          <p
            class="text-dark fw-sembold text-center"
            v-if="!notifications.length"
          >
            No new notifications
          </p>

          <!--begin::View more-->
          <div class="py-3 text-center border-top">
            <router-link
              to="/notifications/list"
              class="btn btn-color-gray-600 btn-active-color-primary"
            >
              View All
              <KTIcon icon-name="arrow-right" icon-class="fs-5" />
            </router-link>
          </div>
          <!--end::View more-->
        </div>
        <!--end::Messages-->
      </div>
      <!--end::Card body-->
    </div>
    <!--end::Messenger-->
  </div>
  <!--end::Chat drawer-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onBeforeUnmount, onMounted, ref } from "vue";
import MessageIn from "@/components/messenger-parts/MessageIn.vue";
import MessageOut from "@/components/messenger-parts/MessageOut.vue";
import Dropdown4 from "@/components/dropdown/Dropdown4.vue";

import { useAuthStore } from "@/stores/auth";
import { getToken } from "@/core/services/JwtService";
import initializeEcho from "@/echo";

interface KTMessage {
  type: string;
  name?: string;
  image: string;
  time: string;
  text: string;
}

export default defineComponent({
  name: "upgrade-to-pro",
  components: {
    MessageIn,
    MessageOut,
    Dropdown4,
  },
  setup() {
    const messagesRef = ref<null | HTMLElement>(null);
    const messagesInRef = ref<null | HTMLElement>(null);
    const messagesOutRef = ref<null | HTMLElement>(null);

    const authStore = useAuthStore();
    const User = authStore.GetUser();

    const notifications: any = ref([]);
    // Get the company ID dynamically if needed
    const companyId = User.company_id;

    // Get the API token from local storage
    const token = getToken();

    let Echo;

    // Function to fetch the latest unread notifications
    const fetchLatestUnreadNotifications = async () => {
      try {
        const response = await fetch(
          `https://api.zeptac.com/api/v1/notifications/latest`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          notifications.value = data.notifications; // Assuming the response contains a notifications array
        } else {
          console.error("Error fetching notifications:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    const markAsRead = async (notificationId) => {
      try {
        const response = await fetch(
          `https://api.zeptac.com/api/v1/notifications/${notificationId}/read`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const updatedNotifications = notifications.value.filter(
            (notification) => {
              if (notification.id !== notificationId) {
                return notification;
              }
            }
          );
          notifications.value = updatedNotifications;
        } else {
          console.error(
            "Error marking notification as read:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error marking notification as read:", error);
      }
    };

    onMounted(async () => {
      console.log("onMount -> before fetch1");
      await fetchLatestUnreadNotifications();
      console.log("onMount -> after fetch1");

      try {
        if (User.role_id === 2) {
          // Create or retrieve the existing Echo instance
          Echo = initializeEcho(token);

          console.log("onMount -> before listener setup");

          // Set up event listener if not already set
          if (!sessionStorage.getItem("echoListenerSet")) {
            Echo.channel(`company-${companyId}`).listen(
              ".lead.already.exists",
              async (event) => {
                console.log("Received event: Lead already exists", event);

                // Fetch the latest unread notifications
                await fetchLatestUnreadNotifications();
              }
            );

            // Mark the listener as set
            sessionStorage.setItem("echoListenerSet", "true");
          }

          console.log("onMount -> after listener setup");
        } else {
          console.log("User is not a company admin. Skipping Echo setup.");
        }
      } catch (error) {
        console.error("Error setting up real-time notifications:", error);
      }
    });

    const messages = ref<Array<KTMessage>>([]);

    const newMessageText = ref("");

    const addNewMessage = () => {
      if (!newMessageText.value) {
        return;
      }
      messages.value.push({
        type: "out",
        image: getAssetPath("media/avatars/300-1.jpg"),
        time: "Just now",
        text: newMessageText.value,
      });

      setTimeout(() => {
        if (messagesRef.value) {
          messagesRef.value.scrollTop = messagesRef.value.scrollHeight;
        }
      }, 1);

      newMessageText.value = "";
      setTimeout(() => {
        messages.value.push({
          type: "in",
          name: "Ja Morant",
          image: getAssetPath("media/avatars/300-25.jpg"),
          time: "Just now",
          text: "Thank you for your awesome support!",
        });

        setTimeout(() => {
          if (messagesRef.value) {
            messagesRef.value.scrollTop = messagesRef.value.scrollHeight;
          }
        }, 1);
      }, 2000);
    };

    return {
      messages,
      messagesRef,
      newMessageText,
      addNewMessage,
      messagesInRef,
      messagesOutRef,
      getAssetPath,
      notifications,
      markAsRead,
    };
  },
});
</script>
