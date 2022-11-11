<script lang="ts">
import { useAuth } from "@/stores/auth";
import NavMenu from "@/components/NavMenu.vue";
import NavMenuButton from "@/components/NavMenuButton.vue";

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
  },
};
</script>

<template>
  <header :class="!menuOpen && 'header-blur'">
    <h1 class="title">OLMS</h1>
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
}

.header-blur {
  backdrop-filter: saturate(180%) blur(1rem);
}

.title {
  font-size: 2rem;
}
</style>
