<template>
  <div class="app-sidebar-menu overflow-hidden flex-column-fluid">
    <div class="app-sidebar-wrapper hover-scroll-overlay-y my-5">
      <div class="menu menu-column menu-rounded menu-sub-indention px-3">
        <template v-for="(item, i) in filteredMenu" :key="i">
          <!-- Main Menu Item -->
          <div class="menu-item pt-5">
            <div class="menu-content">
              <span class="menu-heading fw-bold text-uppercase fs-7">
                {{ item.heading }}
              </span>
            </div>
          </div>

          <!-- Menu Pages -->
          <template v-if="item.pages">
            <div v-for="(page, j) in item.pages" :key="j" class="menu-item">
              <router-link class="menu-link" :to="page.route">
                <span class="menu-icon" v-if="page.bootstrapIcon">
                  <i :class="page.bootstrapIcon" class="bi fs-3"></i>
                </span>
                <span class="menu-icon" v-else-if="page.keenthemesIcon">
                  <KTIcon :icon-name="page.keenthemesIcon" icon-class="fs-3" />
                </span>
                <span class="menu-title">{{ page.heading }}</span>
              </router-link>
            </div>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import AdminMenuConfig from '@/core/config/AdminMenuConfig';

export default defineComponent({
  name: 'SimpleSidebarMenu',
  components: {
    KTIcon: () => import('@/core/helpers/kt-icon/KTIcon.vue'),
  },
  setup() {
    const filteredMenu = computed(() => {
      return AdminMenuConfig.filter(item => {
        return item.heading === 'Dashboard';
      });
    });

    return {
      filteredMenu
    };
  }
});
</script>

<style scoped>
.menu-item {
  margin-bottom: 0.5rem;
}

.menu-link {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: #181c32;
  text-decoration: none;
  border-radius: 0.475rem;
  transition: color 0.2s ease, background-color 0.2s ease;
}

.menu-link:hover,
.menu-link.active {
  background-color: #f5f8fa;
  color: #009ef7;
}

.menu-icon {
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
}

.menu-title {
  font-weight: 500;
}
</style>
