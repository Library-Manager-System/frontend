<script lang="ts">
import RedirectTo from "@/components/RedirectTo.vue";
import { useAuth } from "@/stores/auth";

export default {
  data: () => ({
    authStore: useAuth(),
  }),

  mounted() {
    this.authStore.logout();
  },

  components: {
    RedirectTo,
  },
};
</script>

<template>
  <h2 v-if="authStore.userAuthenticated">Saindo...</h2>
  <RedirectTo name="auth.login" v-else />
</template>
