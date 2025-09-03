<template>
  <div class="app-sidebar-menu sidebar-menu overflow-hidden flex-column-fluid">
    <div class="app-sidebar-wrapper hover-scroll-overlay-y my-5">
      <div class="menu menu-column menu-rounded menu-sub-indention px-3">
        <div v-for="(item, i) in menu" :key="i" class="menu-item pt-5">
          <div class="menu-content">
            <span class="menu-heading fw-bold text-uppercase fs-7">
              {{ item.heading }}
            </span>
          </div>
          <div v-for="(page, j) in item.pages" :key="j" class="menu-item">
            <router-link
              class="menu-link"
              active-class="active"
              :to="page.route"
            >
              <span class="menu-icon">
                <i :class="page.bootstrapIcon" class="bi fs-3"></i>
              </span>
              <span class="menu-title">{{ page.heading }}</span>
            </router-link>
          </div>
        </div>
      </div>
                        <style scoped>
                          /* Force sidebar menu text to black, even on hover/active */
                          .app-sidebar-menu .menu-link,
                          .app-sidebar-menu .menu-link .menu-title,
                          .app-sidebar-menu .menu-link .menu-icon,
                          .app-sidebar-menu .menu-link .menu-bullet {
                            color: #000 !important;
                          }
                          .app-sidebar-menu .menu-link:hover,
                          .app-sidebar-menu .menu-link.active {
                            background-color: transparent !important;
                          }
                          .app-sidebar-menu .menu-link:hover .menu-title,
                          .app-sidebar-menu .menu-link.active .menu-title,
                          .app-sidebar-menu .menu-link:hover .menu-icon,
                          .app-sidebar-menu .menu-link.active .menu-icon,
                          .app-sidebar-menu .menu-link:hover .menu-bullet,
                          .app-sidebar-menu .menu-link.active .menu-bullet {
                            color: #000 !important;
                          }
                        </style>
    </div>
  </div>

  <!--begin::sidebar menu for different user types-->
  <div v-for="(menuItem, j) in AdminMenuConfig[0]?.pages || []" :key="`admin-${j}`">
    <template v-if="menuItem.heading">
      <div class="menu-item">
        <router-link
          v-if="menuItem.route"
          class="menu-link"
          active-class="active"
          :to="menuItem.route"
        >
          <span
            v-if="menuItem.keenthemesIcon || menuItem.bootstrapIcon"
            class="menu-icon"
          >
            <i
              v-if="sidebarMenuIcons === 'bootstrap'"
              :class="menuItem.bootstrapIcon"
              class="bi fs-3"
            ></i>
            <KTIcon
              v-else-if="sidebarMenuIcons === 'keenthemes'"
              :icon-name="menuItem.keenthemesIcon"
              icon-class="fs-2"
            />
          </span>
          <span class="menu-title">{{ translate(menuItem.heading) }}</span>
        </router-link>
      </div>
    </template>
    <div
      v-if="menuItem.sectionTitle && menuItem.route"
      class="menu-item menu-accordion"
      data-kt-menu-sub="accordion"
      data-kt-menu-trigger="click"
    >
      <span class="menu-link">
        <span
          v-if="menuItem.keenthemesIcon || menuItem.bootstrapIcon"
          class="menu-icon"
        >
          <i
            v-if="sidebarMenuIcons === 'bootstrap'"
            :class="menuItem.bootstrapIcon"
            class="bi fs-3"
          ></i>
          <KTIcon
            v-else-if="sidebarMenuIcons === 'keenthemes'"
            :icon-name="menuItem.keenthemesIcon"
            icon-class="fs-2"
          />
        </span>
        <span class="menu-title">{{ translate(menuItem.sectionTitle) }}</span>
        <span class="menu-arrow"></span>
      </span>
      <div class="menu-sub menu-sub-accordion">
        <template v-for="(item2, k) in menuItem.sub" :key="k">
          <div v-if="item2.heading" class="menu-item">
            <router-link
              v-if="item2.route"
              class="menu-link"
              active-class="active"
              :to="item2.route"
            >
              <span class="menu-bullet">
                <span class="bullet bullet-dot"></span>
              </span>
              <span class="menu-title">{{ translate(item2.heading) }}</span>
            </router-link>
          </div>
          <div
            v-if="item2.sectionTitle && item2.route"
            class="menu-item menu-accordion"
            data-kt-menu-sub="accordion"
            data-kt-menu-trigger="click"
          >
            <span class="menu-link">
              <span class="menu-bullet">
                <span class="bullet bullet-dot"></span>
              </span>
              <span class="menu-title">{{ translate(item2.sectionTitle) }}</span>
              <span class="menu-arrow"></span>
            </span>
            <div class="menu-sub menu-sub-accordion">
              <template v-for="(item3, k) in item2.sub" :key="k">
                <div v-if="item3.heading" class="menu-item">
                  <router-link
                    v-if="item3.route"
                    class="menu-link"
                    active-class="active"
                    :to="item3.route"
                  >
                    <span class="menu-bullet">
                      <span class="bullet bullet-dot"></span>
                    </span>
                    <span class="menu-title">{{ translate(item3.heading) }}</span>
                  </router-link>
                </div>
              </template>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
  <!--end::Menu-->

  <!--begin::sidebar menu-->
  <div
    class="app-sidebar-menu sidebar-menu overflow-hidden flex-column-fluid"
    v-if="sidebarIdentifier === 'Company-Admin'"
  >
    <!--begin::Menu wrapper-->
    <div
      id="kt_app_sidebar_menu_wrapper"
      class="app-sidebar-wrapper hover-scroll-overlay-y my-5"
      data-kt-scroll="true"
      data-kt-scroll-activate="true"
      data-kt-scroll-height="auto"
      data-kt-scroll-dependencies="#kt_app_sidebar_logo, #kt_app_sidebar_footer"
      data-kt-scroll-wrappers="#kt_app_sidebar_menu"
      data-kt-scroll-offset="5px"
      data-kt-scroll-save-state="true"
    >
      <!--begin::Menu-->
      <div
        id="#kt_app_sidebar_menu"
        class="menu menu-column menu-rounded menu-sub-indention px-3"
        data-kt-menu="true"
      >
        <template v-for="(item, i) in companyAdminMenu" :key="i">
          <div v-if="item.heading" class="menu-item pt-5">
            <div class="menu-content">
              <span class="menu-heading fw-bold text-uppercase fs-7">
                {{ translate(item.heading) }}
              </span>
            </div>
          </div>
          <template v-for="(menuItem, j) in item.pages" :key="j">
            <template v-if="menuItem.heading">
              <div class="menu-item">
                <router-link
                  v-if="menuItem.route"
                  class="menu-link"
                  active-class="active"
                  :to="menuItem.route"
                >
                  <span
                    v-if="menuItem.keenthemesIcon || menuItem.bootstrapIcon"
                    class="menu-icon"
                  >
                    <i
                      v-if="sidebarMenuIcons === 'bootstrap'"
                      :class="menuItem.bootstrapIcon"
                      class="bi fs-3"
                    ></i>
                    <KTIcon
                      v-else-if="sidebarMenuIcons === 'keenthemes'"
                      :icon-name="menuItem.keenthemesIcon"
                      icon-class="fs-2"
                    />
                  </span>
                  <span class="menu-title">{{ translate(menuItem.heading) }}</span>
                </router-link>
              </div>
            </template>
            <div
              v-if="menuItem.sectionTitle && menuItem.route"
              class="menu-item menu-accordion"
              data-kt-menu-sub="accordion"
              data-kt-menu-trigger="click"
            >
              <span class="menu-link">
                <span
                  v-if="menuItem.keenthemesIcon || menuItem.bootstrapIcon"
                  class="menu-icon"
                >
                  <i
                    v-if="sidebarMenuIcons === 'bootstrap'"
                    :class="menuItem.bootstrapIcon"
                    class="bi fs-3"
                  ></i>
                  <KTIcon
                    v-else-if="sidebarMenuIcons === 'keenthemes'"
                    :icon-name="menuItem.keenthemesIcon"
                    icon-class="fs-2"
                  />
                </span>
                <span class="menu-title">{{ translate(menuItem.sectionTitle) }}</span>
                <span class="menu-arrow"></span>
              </span>
              <div class="menu-sub menu-sub-accordion">
                <template v-for="(item2, k) in menuItem.sub" :key="k">
                  <div v-if="item2.heading" class="menu-item">
                    <router-link
                      v-if="item2.route"
                      class="menu-link"
                      active-class="active"
                      :to="item2.route"
                    >
                      <span class="menu-bullet">
                        <span class="bullet bullet-dot"></span>
                      </span>
                      <span class="menu-title">{{ translate(item2.heading) }}</span>
                    </router-link>
                  </div>
                  <div
                    v-if="item2.sectionTitle && item2.route"
                    class="menu-item menu-accordion"
                    data-kt-menu-sub="accordion"
                    data-kt-menu-trigger="click"
                  >
                    <span class="menu-link">
                      <span class="menu-bullet">
                        <span class="bullet bullet-dot"></span>
                      </span>
                      <span class="menu-title">{{ translate(item2.sectionTitle) }}</span>
                      <span class="menu-arrow"></span>
                    </span>
                    <div class="menu-sub menu-sub-accordion">
                      <template v-for="(item3, k) in item2.sub" :key="k">
                        <div v-if="item3.heading" class="menu-item">
                          <router-link
                            v-if="item3.route"
                            class="menu-link"
                            active-class="active"
                            :to="item3.route"
                          >
                            <span class="menu-bullet">
                              <span class="bullet bullet-dot"></span>
                            </span>
                            <span class="menu-title">{{ translate(item3.heading) }}</span>
                          </router-link>
                        </div>
                      </template>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </template>
        </template>
      </div>
      <!--end::Menu-->
    </div>
    <!--end::Menu wrapper-->
  </div>
  <!--end::sidebar menu-->

  <!--begin::sidebar menu-->
  <div
    class="app-sidebar-menu sidebar-menu overflow-hidden flex-column-fluid"
    v-if="sidebarIdentifier === 'Site-Incharge'"
  >
    <!--begin::Menu wrapper-->
    <div
      id="kt_app_sidebar_menu_wrapper"
      class="app-sidebar-wrapper hover-scroll-overlay-y my-5"
      data-kt-scroll="true"
      data-kt-scroll-activate="true"
      data-kt-scroll-height="auto"
      data-kt-scroll-dependencies="#kt_app_sidebar_logo, #kt_app_sidebar_footer"
      data-kt-scroll-wrappers="#kt_app_sidebar_menu"
      data-kt-scroll-offset="5px"
      data-kt-scroll-save-state="true"
    >
      <!--begin::Menu-->
      <div
        id="#kt_app_sidebar_menu"
        class="menu menu-column menu-rounded menu-sub-indention px-3"
        data-kt-menu="true"
      >
        <template v-for="(item, i) in siteInchargeMenu" :key="i">
          <div v-if="item.heading" class="menu-item pt-5">
            <div class="menu-content">
              <span class="menu-heading fw-bold text-uppercase fs-7">
                {{ translate(item.heading) }}
              </span>
            </div>
          </div>
          <template v-for="(menuItem, j) in item.pages" :key="j">
            <template v-if="menuItem.heading">
              <div class="menu-item">
                <router-link
                  v-if="menuItem.route"
                  class="menu-link"
                  active-class="active"
                  :to="menuItem.route"
                >
                  <span
                    v-if="menuItem.keenthemesIcon || menuItem.bootstrapIcon"
                    class="menu-icon"
                  >
                    <i
                      v-if="sidebarMenuIcons === 'bootstrap'"
                      :class="menuItem.bootstrapIcon"
                      class="bi fs-3"
                    ></i>
                    <KTIcon
                      v-else-if="sidebarMenuIcons === 'keenthemes'"
                      :icon-name="menuItem.keenthemesIcon"
                      icon-class="fs-2"
                    />
                  </span>
                  <span class="menu-title">{{ translate(menuItem.heading) }}</span>
                </router-link>
              </div>
            </template>
            <div
              v-if="menuItem.sectionTitle && menuItem.route"
              :class="{ show: hasActiveChildren(menuItem.route) }"
              class="menu-item menu-accordion"
              data-kt-menu-sub="accordion"
              data-kt-menu-trigger="click"
            >
              <span class="menu-link">
                <span
                  v-if="menuItem.keenthemesIcon || menuItem.bootstrapIcon"
                  class="menu-icon"
                >
                  <i
                    v-if="sidebarMenuIcons === 'bootstrap'"
                    :class="menuItem.bootstrapIcon"
                    class="bi fs-3"
                  ></i>
                  <KTIcon
                    v-else-if="sidebarMenuIcons === 'keenthemes'"
                    :icon-name="menuItem.keenthemesIcon"
                    icon-class="fs-2"
                  />
                </span>
                <span class="menu-title">{{ translate(menuItem.sectionTitle) }}</span>
                <span class="menu-arrow"></span>
              </span>
              <div
                :class="{ show: hasActiveChildren(menuItem.route) }"
                class="menu-sub menu-sub-accordion"
              >
                <template v-for="(item2, k) in menuItem.sub" :key="k">
                  <div v-if="item2.heading" class="menu-item">
                    <router-link
                      v-if="item2.route"
                      class="menu-link"
                      active-class="active"
                      :to="item2.route"
                    >
                      <span class="menu-bullet">
                        <span class="bullet bullet-dot"></span>
                      </span>
                      <span class="menu-title">{{ translate(item2.heading) }}</span>
                    </router-link>
                  </div>
                  <div
                    v-if="item2.sectionTitle && item2.route"
                    :class="{ show: hasActiveChildren(item2.route) }"
                    class="menu-item menu-accordion"
                    data-kt-menu-sub="accordion"
                    data-kt-menu-trigger="click"
                  >
                    <span class="menu-link">
                      <span class="menu-bullet">
                        <span class="bullet bullet-dot"></span>
                      </span>
                      <span class="menu-title">{{ translate(item2.sectionTitle) }}</span>
                      <span class="menu-arrow"></span>
                    </span>
                    <div
                      :class="{ show: hasActiveChildren(item2.route) }"
                      class="menu-sub menu-sub-accordion"
                    >
                      <template v-for="(item3, k) in item2.sub" :key="k">
                        <div v-if="item3.heading" class="menu-item">
                          <router-link
                            v-if="item3.route"
                            class="menu-link"
                            active-class="active"
                            :to="item3.route"
                          >
                            <span class="menu-bullet">
                              <span class="bullet bullet-dot"></span>
                            </span>
                            <span class="menu-title">{{ translate(item3.heading) }}</span>
                          </router-link>
                        </div>
                      </template>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </template>
        </template>
      </div>
      <!--end::Menu-->
    </div>
    <!--end::Menu wrapper-->
  </div>
  <!--end::sidebar menu-->

  <!--begin::sidebar menu-->
  <div
    class="app-sidebar-menu sidebar-menu overflow-hidden flex-column-fluid"
    v-if="sidebarIdentifier == 'Service-Engineer'"
  >
    <!--begin::Menu wrapper-->
    <div
      id="kt_app_sidebar_menu_wrapper"
      class="app-sidebar-wrapper hover-scroll-overlay-y my-5"
      data-kt-scroll="true"
      data-kt-scroll-activate="true"
      data-kt-scroll-height="auto"
      data-kt-scroll-dependencies="#kt_app_sidebar_logo, #kt_app_sidebar_footer"
      data-kt-scroll-wrappers="#kt_app_sidebar_menu"
      data-kt-scroll-offset="5px"
      data-kt-scroll-save-state="true"
    >
      <!--begin::Menu-->
      <div
        id="#kt_app_sidebar_menu"
        class="menu menu-column menu-rounded menu-sub-indention px-3"
        data-kt-menu="true"
      >
        <template v-for="(item, i) in serviceEngineerMenu" :key="i">
          <div v-if="item.heading" class="menu-item pt-5">
            <div class="menu-content">
              <span class="menu-heading fw-bold text-uppercase fs-7">
                {{ translate(item.heading) }}
              </span>
            </div>
          </div>
          <template v-for="(menuItem, j) in item.pages" :key="j">
            <template v-if="menuItem.heading">
              <div class="menu-item">
                <router-link
                  v-if="menuItem.route"
                  class="menu-link"
                  active-class="active"
                  :to="menuItem.route"
                >
                  <span
                    v-if="menuItem.keenthemesIcon || menuItem.bootstrapIcon"
                    class="menu-icon"
                  >
                    <i
                      v-if="sidebarMenuIcons === 'bootstrap'"
                      :class="menuItem.bootstrapIcon"
                      class="bi fs-3"
                    ></i>
                    <KTIcon
                      v-else-if="sidebarMenuIcons === 'keenthemes'"
                      :icon-name="menuItem.keenthemesIcon"
                      icon-class="fs-2"
                    />
                  </span>
                  <span class="menu-title">{{ translate(menuItem.heading) }}</span>
                </router-link>
              </div>
            </template>
            <div
              v-if="menuItem.sectionTitle && menuItem.route"
              :class="{ show: hasActiveChildren(menuItem.route) }"
              class="menu-item menu-accordion"
              data-kt-menu-sub="accordion"
              data-kt-menu-trigger="click"
            >
              <span class="menu-link">
                <span
                  v-if="menuItem.keenthemesIcon || menuItem.bootstrapIcon"
                  class="menu-icon"
                >
                  <i
                    v-if="sidebarMenuIcons === 'bootstrap'"
                    :class="menuItem.bootstrapIcon"
                    class="bi fs-3"
                  ></i>
                  <KTIcon
                    v-else-if="sidebarMenuIcons === 'keenthemes'"
                    :icon-name="menuItem.keenthemesIcon"
                    icon-class="fs-2"
                  />
                </span>
                <span class="menu-title">{{ translate(menuItem.sectionTitle) }}</span>
                <span class="menu-arrow"></span>
              </span>
              <div
                :class="{ show: hasActiveChildren(menuItem.route) }"
                class="menu-sub menu-sub-accordion"
              >
                <template v-for="(item2, k) in menuItem.sub" :key="k">
                  <div v-if="item2.heading" class="menu-item">
                    <router-link
                      v-if="item2.route"
                      class="menu-link"
                      active-class="active"
                      :to="item2.route"
                    >
                      <span class="menu-bullet">
                        <span class="bullet bullet-dot"></span>
                      </span>
                      <span class="menu-title">{{ translate(item2.heading) }}</span>
                    </router-link>
                  </div>
                  <div
                    v-if="item2.sectionTitle && item2.route"
                    :class="{ show: hasActiveChildren(item2.route) }"
                    class="menu-item menu-accordion"
                    data-kt-menu-sub="accordion"
                    data-kt-menu-trigger="click"
                  >
                    <span class="menu-link">
                      <span class="menu-bullet">
                        <span class="bullet bullet-dot"></span>
                      </span>
                      <span class="menu-title">{{ translate(item2.sectionTitle) }}</span>
                      <span class="menu-arrow"></span>
                    </span>
                    <div
                      :class="{ show: hasActiveChildren(item2.route) }"
                      class="menu-sub menu-sub-accordion"
                    >
                      <template v-for="(item3, k) in item2.sub" :key="k">
                        <div v-if="item3.heading" class="menu-item">
                          <router-link
                            v-if="item3.route"
                            class="menu-link"
                            active-class="active"
                            :to="item3.route"
                          >
                            <span class="menu-bullet">
                              <span class="bullet bullet-dot"></span>
                            </span>
                            <span class="menu-title">{{ translate(item3.heading) }}</span>
                          </router-link>
                        </div>
                      </template>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </template>
        </template>
      </div>
      <!--end::Menu-->
    </div>
    <!--end::Menu wrapper-->
  </div>
  <!--end::sidebar menu-->
</template>

<style>
/* Main hover effect for 90% transparent white background */
.sidebar-menu .menu-link:hover {
  background-color: rgba(255, 255, 255, 0.1) !important;
  transition: all 0.3s ease;
}

/* Text and icon color on hover - 90% opacity white */
.sidebar-menu .menu-link:hover .menu-title,
  transition: all 0.3s ease;
  border-radius: 6px;
  margin: 2px 0;
}

/* Sub-menu hover effects */
.app-sidebar-menu .menu-sub .menu-link:hover {
  background-color: rgba(255, 255, 255, 0.08) !important;
  padding-left: 20px;
}

/* Menu heading styling */
.app-sidebar-menu .menu-heading {
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
  letter-spacing: 0.5px;
}
</style>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useFilteredMenu } from "@/core/config/FilteredMenu";
import AdminMenuConfig from "@/core/config/AdminMenuConfig";
import CompanyAdminMenuConfig from "@/core/config/CompanyAdminMenuConfig";
import SiteInchargeMenuConfig from "@/core/config/SiteInchargeMenuConfig";
import ServiceEngMenuConfig from "@/core/config/ServiceEngMenuConfig";
import { sidebarMenuIcons } from "@/core/helpers/config";
import { useI18n } from "vue-i18n";
import { Identifier } from "@/core/config/WhichUserConfig";

interface MenuItem {
  heading?: string;
  sectionTitle?: string;
  route?: string;
  pages?: Array<MenuItem>;
  keenthemesIcon?: string;
  bootstrapIcon?: string;
  sub?: Array<MenuItem>;
}

export default defineComponent({
  name: "sidebar-menu",
  components: {},
  setup() {
    const { t, te } = useI18n();
    const route = useRoute();
    const scrollElRef = ref<null | HTMLElement>(null);
    const authStore = useAuthStore();

    onMounted(() => {
      if (scrollElRef.value) {
        scrollElRef.value.scrollTop = 0;
      }
    });

    // Main menu data
    const menu = [
      {
        heading: 'Dashboard',
        pages: [
          {
            heading: 'Dashboard',
            route: '/dashboard',
            bootstrapIcon: 'bi-app-indicator'
          },
          {
            heading: 'Devices',
            route: '/devices',
            bootstrapIcon: 'bi-phone'
          },
          {
            heading: 'Reports',
            route: '/reports',
            bootstrapIcon: 'bi-file-earmark-text'
          },
          {
            heading: 'Alarms',
            route: '/alarms',
            bootstrapIcon: 'bi-bell'
          },
          {
            heading: 'Locations',
            route: '/locations',
            bootstrapIcon: 'bi-geo-alt'
          }
        ]
      }
    ];

    // AdminMenuConfig for development
    const AdminMenuConfig = [
      {
        heading: "Dashboard",
        route: "dashboard",
        pages: [
          {
            heading: "Dashboard",
            route: "/dashboard",
            keenthemesIcon: "element-11",
            bootstrapIcon: "bi-app-indicator",
          },
          {
            heading: "Devices",
            route: "/devices",
            keenthemesIcon: "router",
            bootstrapIcon: "bi-phone",
          },
          {
            heading: "Reports",
            route: "/reports",
            keenthemesIcon: "chart",
            bootstrapIcon: "bi-file-earmark-text",
          },
          {
            heading: "Alarms",
            route: "/alarms",
            keenthemesIcon: "timer",
            bootstrapIcon: "bi-bell",
          },
          {
            heading: "Location",
            route: "/locations",
            keenthemesIcon: "route",
            bootstrapIcon: "bi-geo-alt",
          },
        ],
      },
    ];

    // Mock data for different user types
    const companyAdminMenu = [
      {
        heading: "Company Management",
        pages: [
          {
            heading: "Users",
            route: "/users",
            bootstrapIcon: "bi-people",
          },
          {
            heading: "Settings",
            route: "/settings",
            bootstrapIcon: "bi-gear",
          },
        ],
      },
    ];

    const siteInchargeMenu = [
      {
        heading: "Site Operations",
        pages: [
          {
            heading: "Operations",
            route: "/operations",
            bootstrapIcon: "bi-clipboard-check",
          },
          {
            heading: "Maintenance",
            route: "/maintenance",
            bootstrapIcon: "bi-tools",
          },
        ],
      },
    ];

    const serviceEngineerMenu = [
      {
        heading: "Field Service",
        pages: [
          {
            heading: "Work Orders",
            route: "/work-orders",
            bootstrapIcon: "bi-list-check",
          },
          {
            heading: "Inspections",
            route: "/inspections",
            bootstrapIcon: "bi-search",
          },
        ],
      },
    ];

    // Get sidebar identifier - mock implementation
    const sidebarIdentifier = ref("Company-Admin"); // This should come from your auth/config

    const translate = (text: string) => {
      if (te(text)) {
        return t(text);
      } else {
        return text;
      }
    };

    const hasActiveChildren = (match: string) => {
      return route.path.indexOf(match) !== -1;
    };

    // Log user company modules if available
    if (typeof User !== 'undefined') {
      console.log(User.company_modules);
    }

    return {
      hasActiveChildren,
      translate,
      getAssetPath,
      sidebarMenuIcons,
      AdminMenuConfig,
      ServiceEngMenuConfig,
      sidebarIdentifier,
      companyAdminMenu,
      serviceEngineerMenu,
      siteInchargeMenu,
      menu,
      scrollElRef,
    };
  },
});
</script>
