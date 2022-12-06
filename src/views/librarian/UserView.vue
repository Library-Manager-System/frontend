<script lang="ts">
import ProtectedRoute from "@/components/ProtectedRoute.vue";
import { useAuth } from "@/stores/auth";
import { defineComponent } from "vue";
import PermissionLevel from "@/components/PermissionLevel.vue";
import ViewContainer from "@/components/ViewContainer.vue";
import UserDetail from "@/components/UserDetail.vue";

export default defineComponent({
  data: () => ({
    authStore: useAuth(),
    users: [] as User[],
    aprovedUsers: [] as User[],
  }),

  methods: {
    async fetchUsers() {
      const res: User[] = await this.authStore.protectedFetch(
        "/user/all",
        "GET"
      );

      this.users = res.filter((user) => user.confirmed_account === 0);
      this.aprovedUsers = res.filter((user) => user.confirmed_account === 1);
    },
  },

  mounted() {
    this.fetchUsers();
  },

  components: {
    ProtectedRoute,
    PermissionLevel,
    ViewContainer,
    UserDetail,
  },
});
</script>

<template>
  <ProtectedRoute>
    <PermissionLevel :permission-level="2">
      <ViewContainer>
        <h2>Usuários</h2>
        <div v-if="users.length > 0">
          <h3>Aprovação pendente</h3>
          <div class="user-container">
            <UserDetail
              v-for="user in users"
              :key="user.id"
              :user="user"
              @refresh="fetchUsers"
            />
          </div>
        </div>
        <div v-if="aprovedUsers.length > 0">
          <h3>Aprovados</h3>
          <div class="user-container">
            <UserDetail
              v-for="user in aprovedUsers"
              :key="user.id"
              :user="user"
              @refresh="fetchUsers"
            />
          </div>
        </div>
      </ViewContainer>
    </PermissionLevel>
  </ProtectedRoute>
</template>

<style scoped>
.user-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 1rem;
}

div:has(.user-container) h3 {
  text-align: center;
}

@media screen and (max-width: 768px) {
  .user-container {
    grid-template-columns: 1fr;
    width: 100%;
    margin: auto;
  }
}
</style>
