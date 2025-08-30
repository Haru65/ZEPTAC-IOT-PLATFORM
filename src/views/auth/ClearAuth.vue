<template>
  <div class="d-flex flex-column flex-root">
    <div class="text-center p-10">
      <h1 class="mb-5">Clearing Authentication...</h1>
      <p>You will be redirected to login shortly.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

export default defineComponent({
  name: "clear-auth",
  setup() {
    const router = useRouter();
    const auth = useAuthStore();

    onMounted(() => {
      // Clear all auth data
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated');
      
      // Reset auth store
      auth.$reset();
      
      // Clear any API headers
      if (window.axios && window.axios.defaults) {
        delete window.axios.defaults.headers.common["Authorization"];
      }
      
      // Redirect to login
      router.push('/login');
    });
  },
});
</script>
