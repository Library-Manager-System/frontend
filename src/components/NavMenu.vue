<script lang="ts">
import { useAuth } from "@/stores/auth";
import { RouterLink } from "vue-router";

interface Route {
  label: string;
  name: string;
  show: boolean;
}

export default {
  props: {
    menuOpen: {
      required: true,
      type: Boolean,
    },
  },

  data: () => ({
    authStore: useAuth(),
    routes: [
      {
        label: "Página inicial",
        name: "home",
        show: true,
      },
      {
        label: "Área do bibliotecário",
        name: "librarian",
        show: useAuth().userData!.permission_level >= 2,
      },
      {
        label: "Configurações",
        name: "settings",
        show: true,
      },
      {
        label: "Sair",
        name: "auth.logout",
        show: true,
      },
    ] as Route[],
    filteredRoutes: [] as Route[],
  }),

  methods: {
    closeMenu() {
      this.$emit("toggleMenu");
    },

    filterRoutes() {
      this.filteredRoutes = this.routes.filter((route) => route.show);
    },
  },

  mounted() {
    this.filterRoutes();
  },

  components: {
    RouterLink,
  },
};
</script>

<template>
  <dialog :open="menuOpen">
    <div class="nav-menu">
      <span @click="closeMenu" class="menu-item">Fechar</span>
      <RouterLink
        v-for="route in filteredRoutes"
        :key="route.name"
        :to="{ name: route.name }"
        @click="closeMenu"
        class="menu-item"
      >
        {{ route.label }}
      </RouterLink>
    </div>
  </dialog>
</template>

<style scoped>
dialog {
  z-index: 9;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  border: none;
  background-color: var(--bg-color-transparent);
  backdrop-filter: saturate(180%) blur(1rem);
  padding: 2rem;
  text-align: center;
}

.nav-menu {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  font-size: 1.5rem;
  position: relative;
}

.menu-item {
  cursor: pointer;
  text-decoration: none;
}

.menu-item:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>
