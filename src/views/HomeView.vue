<script lang="ts">
import ProtectedRoute from "@/components/ProtectedRoute.vue";
import BookDetail from "@/components/BookDetail.vue";
import { useAuth } from "@/stores/auth";

export default {
  data: () => ({
    authStore: useAuth(),
  }),

  components: {
    ProtectedRoute,
    BookDetail,
  },
};
</script>

<template>
  <ProtectedRoute>
    <BookDetail title="Livro" />
  </ProtectedRoute>
</template>
