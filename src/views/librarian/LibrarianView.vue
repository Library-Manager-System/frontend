<script lang="ts">
import ProtectedRoute from "@/components/ProtectedRoute.vue";
import { useAuth } from "@/stores/auth";
import { defineComponent } from "vue";
import PermissionLevel from "@/components/PermissionLevel.vue";

export default defineComponent({
  data: () => ({
    authStore: useAuth(),
  }),

  components: {
    ProtectedRoute,
    PermissionLevel,
  },
});
</script>

<template>
  <ProtectedRoute>
    <PermissionLevel :permission-level="2">
      <h2>Área do bibliotecário</h2>
      <ul>
        <li>
          <RouterLink :to="{ name: 'librarian.loans' }">
            Empréstimos
          </RouterLink>
        </li>
        <li>
          <RouterLink to="#">Usuários</RouterLink>
        </li>
        <li>
          <RouterLink to="#">Livros</RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'settings' }">
            Configurações da conta
          </RouterLink>
        </li>
      </ul>
    </PermissionLevel>
  </ProtectedRoute>
</template>

<style scoped>
ul {
  list-style: none;
  padding-left: 0;
}

a {
  color: var(--sucess-color);
}
</style>
