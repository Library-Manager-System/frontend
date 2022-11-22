<script lang="ts">
import ProtectedRoute from "@/components/ProtectedRoute.vue";
import { useAuth } from "@/stores/auth";
import UserHome from "../components/UserHome.vue";
import LibrarianHome from "../components/LibrarianHome.vue";

export default {
  data: () => ({
    authStore: useAuth(),
    userPermissionLevel: 0,
  }),

  async mounted() {
    this.userPermissionLevel = this.authStore.userData![
      "permission_level"
    ] as number;
  },

  components: {
    ProtectedRoute,
    UserHome,
    LibrarianHome,
  },
};
</script>

<template>
  <main>
    <ProtectedRoute>
      <h2 v-if="userPermissionLevel === 0">Carregando...</h2>
      <UserHome v-else-if="userPermissionLevel === 1" />
      <LibrarianHome v-else-if="userPermissionLevel === 2" />
    </ProtectedRoute>
  </main>
</template>

<style scoped>
main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  flex-grow: 1;
  gap: 2rem;
}
</style>
