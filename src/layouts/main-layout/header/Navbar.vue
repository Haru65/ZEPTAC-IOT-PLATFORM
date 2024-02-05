<template>
  <!--begin::Navbar-->
  <div class="app-navbar flex-shrink-0">
    <!--begin::Notifications-->
    <div class="app-navbar-item ms-1 ms-md-3">
      <!--begin::Menu- wrapper-->
      <div
        class="btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-30px h-30px w-md-40px h-md-40px position-relative"
        id="kt_drawer_chat_toggle"
        data-kt-menu-trigger="click"
        data-kt-menu-attach="parent"
        data-kt-menu-placement="bottom-end"
      >
      <KTIcon icon-name="message-text-2" icon-class="fs-2 fs-md-1" />
        <span
          class="position-absolute translate-middle top-0 start-50"
        ><span class="badge rounded badge-success animation-blink">
          {{ TotalNotification }}
        </span></span>
      </div>
      
      <KTNotificationMenu
      :TotalNotification="TotalNotification"
      :dueCalibration="dueCalibration"
      :dueMaintenance="dueMaintenance"
      :calibrationNotificationCount="calibrationNotificationCount"
      :maintenanaceNotificationCount="maintenanaceNotificationCount"
      />
      <!--end::Menu wrapper-->
    </div>
    <!--end::Notifications-->

    <!--begin::Quick links-->
    <div class="app-navbar-item ms-1 ms-md-3">
      <!--begin::Menu wrapper-->
      <div
        class="btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-30px h-30px w-md-40px h-md-40px"
        data-kt-menu-trigger="click"
        data-kt-menu-attach="parent"
        data-kt-menu-placement="bottom-end"
      >
        <KTIcon icon-name="element-11" icon-class="fs-2 fs-md-1" />
      </div>
      <KTQuickLinksMenu />
      <!--end::Menu wrapper-->
    </div>
    <!--end::Quick links-->
    <!--begin::Theme mode-->
    <div class="app-navbar-item ms-1 ms-md-3">
      <!--begin::Menu toggle-->
      <a
        href="#"
        class="btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-30px h-30px w-md-40px h-md-40px"
        data-kt-menu-trigger="{default:'click', lg: 'hover'}"
        data-kt-menu-attach="parent"
        data-kt-menu-placement="bottom-end"
      >
        <KTIcon
          v-if="themeMode === 'light'"
          icon-name="night-day"
          icon-class="theme-light-show fs-2 fs-md-1"
        />
        <KTIcon
          v-else
          icon-name="moon"
          icon-class="theme-dark-show fs-2 fs-md-1"
        />
      </a>
      <!--begin::Menu toggle-->
      <KTThemeModeSwitcher />
    </div>
    <!--end::Theme mode-->
    <!--begin::User menu-->
    <div class="app-navbar-item ms-1 ms-md-3" id="kt_header_user_menu_toggle">
      <!--begin::Menu wrapper-->
      <div
        class="cursor-pointer symbol symbol-30px symbol-md-40px"
        data-kt-menu-trigger="click"
        data-kt-menu-attach="parent"
        data-kt-menu-placement="bottom-end"
      >
        <img
            v-if="User.meta.profile_pic_data"
            class="rounded-circle"
            alt="user"
            :src="`data:image/png;base64,` + User.meta.profile_pic_data"
          />
          <img
            v-else
            class="rounded-circle"
            alt="user"
            :src="`data:image/png;base64,` + blank64"
          />
      </div>
      <KTUserMenu />
      <!--end::Menu wrapper-->
    </div>
    <!--end::User menu-->
<!-- 
    <div
      class="app-navbar-item d-lg-none ms-2 me-n3"
      v-tooltip
      title="Show header menu"
    >
      <div
        class="btn btn-icon btn-active-color-primary w-30px h-30px w-md-35px h-md-35px"
        id="kt_app_header_menu_toggle"
      >
        <KTIcon icon-name="text-align-left" icon-class="fs-2 fs-md-1" />
      </div>
    </div>
     -->
  </div>
  <!--end::Navbar-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent, onMounted, ref } from "vue";

import KTNotificationMenu from "@/layouts/main-layout/menus/NotificationsMenu.vue";
import KTQuickLinksMenu from "@/layouts/main-layout/menus/QuickLinksMenu.vue";
import KTUserMenu from "@/layouts/main-layout/menus/UserAccountMenu.vue";
import KTThemeModeSwitcher from "@/layouts/main-layout/theme-mode/ThemeModeSwitcher.vue";
import { ThemeModeComponent } from "@/assets/ts/layout";
import { useThemeStore } from "@/stores/theme";
import { useAuthStore } from "@/stores/auth";
import { calibrationNotification, maintenanceNotification } from "@/stores/api";
import moment from "moment";
import { blank64 } from "./blank";

interface Instrument {
  id: string;
  instrument_id: string;
  name: string;
  calibration_due_date: string;
}

interface MaintenanceInstrument {
  id: string;
  instrument_id: string;
  name: string;
  m_date2: string;
}

export default defineComponent({
  name: "header-navbar",
  components: {
    KTNotificationMenu,
    KTQuickLinksMenu,
    KTUserMenu,
    KTThemeModeSwitcher,
  },
  setup() {
    const auth = useAuthStore();
    const store = useThemeStore();
    const User = auth.GetUser();

    const dueCalibration = ref<Instrument[]>();
    const dueMaintenance = ref<MaintenanceInstrument[]>();

    const themeMode = computed(() => {
      if (store.mode === "system") {
        return ThemeModeComponent.getSystemMode();
      }
      return store.mode;
    });

    const TotalNotification = ref(0);
    const calibrationNotificationCount = ref(0);
    const maintenanaceNotificationCount = ref(0);

    const fetchDueCalibration = async () => {
      try {
        const company_id = User.company_id;

        const response = await calibrationNotification(company_id);
        console.log(response);
        dueCalibration.value = response.result.map(
          ({ id, instrument_id, name, calibration_due_date }) => ({
            id,
            instrument_id,
            name,
            calibration_due_date: moment(calibration_due_date).format("D MMM"),
          })
        );
        calibrationNotificationCount.value = dueCalibration.value ? dueCalibration.value.length : 0;
      } catch (error) {
        // Handle errors, e.g., show an error message
        console.error("Error fetching data:", error);
      }
    };

    const fetchDueMaintenance = async () => {
      try {
        const company_id = User.company_id;

        const response = await maintenanceNotification(company_id);
        console.log(response);
        dueMaintenance.value = response.result.map(
          ({ id, instrument_id, name, m_date2 }) => ({
            id,
            instrument_id,
            name,
            m_date2: moment(m_date2).format("D MMM"),
          })
        );
        
        maintenanaceNotificationCount.value = dueMaintenance.value ? dueMaintenance.value.length : 0;
      } catch (error) {
        // Handle errors, e.g., show an error message
        console.error("Error fetching data:", error);
      }
    };

    onMounted(async () => {
      await fetchDueCalibration();
      await fetchDueMaintenance();

      TotalNotification.value = calibrationNotificationCount.value + maintenanaceNotificationCount.value;

    });

    return {
      themeMode,
      getAssetPath,
      User,
      dueCalibration,
      dueMaintenance,
      maintenanaceNotificationCount,
      calibrationNotificationCount,
      TotalNotification,
      blank64,
    };
  },
});
</script>
