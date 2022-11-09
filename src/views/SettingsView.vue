<script lang="ts">
import { useAuth } from "@/stores/auth";
import ProtectedRoute from "@/components/ProtectedRoute.vue";

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
    <code>
      <pre>{{ authStore.userData }}</pre>
    </code>
  </ProtectedRoute>
</template>
