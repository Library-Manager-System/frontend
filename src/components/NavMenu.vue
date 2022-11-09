<script lang="ts">
import { useAuth } from "@/stores/auth";
import { RouterLink } from "vue-router";

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
      },
      {
        label: "Configurações",
        name: "settings",
      },
      {
        label: "Sair",
        name: "auth.logout",
      },
    ],
  }),

  methods: {
    closeMenu() {
      this.$emit("toggleMenu");
    },
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
        v-for="route in routes"
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
