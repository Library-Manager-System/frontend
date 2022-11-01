<script lang="ts">
import { useAuth } from "@/stores/auth";
import RedirectTo from "@/components/RedirectTo.vue";

export default {
  data: () => ({
    authStore: useAuth(),
  }),

  components: {
    RedirectTo,
  },
};
</script>

<template>
  <slot v-if="authStore.userAuthenticated" />
  <RedirectTo name="auth.login" v-else />
</template>
