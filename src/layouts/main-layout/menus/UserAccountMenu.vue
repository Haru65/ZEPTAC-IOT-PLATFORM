<template>
  <!--begin::Menu-->
  <div
    class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semobold py-4 fs-6 w-275px"
    data-kt-menu="true"
  >
    <!--begin::Menu item-->
    <div class="menu-item px-3">
      <div class="menu-content d-flex align-items-top px-3">
        <!--begin::Avatar-->
        <div class="symbol symbol-50px me-5">
          <img
            v-if="User.meta.profile_pic_data"
            class="rounded-circle"
            alt="Logo"
            :src="`data:image/png;base64,` + User.meta.profile_pic_data"
          />
          <img
            v-else
            class="rounded-circle"
            alt="Logo"
            :src="`data:image/png;base64,` + blank64"
          />
        </div>
        <!--end::Avatar-->

        <!--begin::Username-->
        <div class="d-flex flex-column">
          <div class="fw-bold d-flex align-items-center fs-5">
            {{ User.first_name + " " + User.last_name }}
            <span
              class="badge badge-light-success fw-bold fs-8 px-1 py-1 ms-2"
              >{{ User.role }}</span
            >
          </div>
          <span class="fw-semobold fs-7">
            {{
              User.company_details.company_name
                ? User.company_details.company_name
                : User.meta.company_name
            }}
            <br />
            {{ Identifier }}
            <br />
            <a
              :href="`mailto:` + User.email"
              class="fw-semobold text-muted text-hover-primary fs-7"
              >{{ User.email }}</a
            >
          </span>
        </div>
        <!--end::Username-->
      </div>
    </div>
    <!--end::Menu item-->

    <!--begin::Menu separator-->
    <div class="separator my-2"></div>
    <!--end::Menu separator-->

    <!--begin::Menu item-->
    <div class="menu-item px-5">
      <router-link to="/profile/changepassword" class="menu-link px-5">
        My Profile
      </router-link>
    </div>
    <!--end::Menu item-->

    <!--begin::Menu item-->
    <div class="menu-item px-5" v-if="Identifier == 'Company-Admin'">
      <router-link
        :to="`/company/settings/${User.company_id}`"
        class="menu-link px-5"
      >
        Company Settings
      </router-link>
    </div>
    <!--end::Menu item-->

    <!--begin::Menu separator-->
    <div class="separator my-2"></div>
    <!--end::Menu separator-->

    <!--begin::Menu item-->
    <div class="menu-item px-5">
      <a @click="signOut()" class="menu-link px-5"> Logout </a>
    </div>
    <!--end::Menu item-->
  </div>
  <!--end::Menu-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { Identifier } from "@/core/config/WhichUserConfig";
import { blank64 } from "./blank";

export default defineComponent({
  name: "kt-user-menu",
  components: {},
  setup() {
    const router = useRouter();
    const store = useAuthStore();
    const User = store.GetUser();

    // console.log("USER :>", User);

    const signOut = () => {
      store.logout();
      router.push({ name: "login" });
    };

    return {
      signOut,
      getAssetPath,
      User,
      Identifier,
      blank64,
    };
  },
});
</script>
