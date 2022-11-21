<script lang="ts">
import { useAuth } from "@/stores/auth";
import NavMenu from "@/components/NavMenu.vue";
import NavMenuButton from "@/components/NavMenuButton.vue";
import { RouterLink } from "vue-router";

export default {
  data: () => ({
    authStore: useAuth(),
    menuOpen: false,
  }),

  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
  },

  watch: {
    $route() {
      if (this.menuOpen) {
        this.menuOpen = false;
      }
    },
  },

  components: {
    NavMenuButton,
    NavMenu,
    RouterLink,
  },
};
</script>

<template>
  <header :class="!menuOpen && 'header-blur'">
    <RouterLink :to="{ name: 'home' }">
      <h1 class="title">OLMS</h1>
    </RouterLink>
    <div v-if="authStore.userAuthenticated">
      <NavMenuButton @toggle-menu="toggleMenu" />
      <NavMenu :menu-open="menuOpen" @toggle-menu="toggleMenu" />
    </div>
  </header>
</template>

<style scoped>
header {
  position: sticky;
  top: 0;
  height: 8vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 2rem;
  background-color: var(--bg-color-transparent);
  box-shadow: 0px 0px 1px var(--shadow-color);
  z-index: 8;
}

.header-blur {
  backdrop-filter: saturate(180%) blur(1rem);
}

.title {
  font-size: 2rem;
}

a:has(.title) {
  text-decoration: none;
}
</style>
