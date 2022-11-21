<script setup lang="ts">
import { RouterView } from "vue-router";
import NavBar from "@/components/NavBar.vue";
</script>

<template>
  <div class="app-root">
    <NavBar />
    <main class="app-main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-root,
.app-main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  position: relative;
}

.app-root {
  min-height: 100vh;
  justify-content: flex-start;
}

.app-main {
  max-width: 1200px;
  padding: 1rem;
  justify-content: center;
  flex-grow: 1;
}
</style>
