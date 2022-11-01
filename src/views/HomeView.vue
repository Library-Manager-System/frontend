<script lang="ts">
import ProtectedRoute from "@/components/ProtectedRoute.vue";
import { useAuth } from "@/stores/auth";

export default {
  data: () => ({
    authStore: useAuth(),
  }),

  components: {
    ProtectedRoute,
  },
};
</script>

<template>
  <ProtectedRoute>
    <h1>Página inicial</h1>
    <code>
      <pre>{{ authStore.userData }}</pre>
    </code>
  </ProtectedRoute>
</template>
