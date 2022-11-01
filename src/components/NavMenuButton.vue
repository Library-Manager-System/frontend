<template>
  <div @click="$emit('toggleMenu')" class="menu-button">
    <div class="menu-bar"></div>
    <div class="menu-bar"></div>
    <div class="menu-bar"></div>
  </div>
</template>

<style scoped>
.menu-button {
  cursor: pointer;
  width: 1.5rem;
  height: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.menu-bar {
  width: 100%;
  height: 2px;
  background-color: var(--text-color);
}
</style>
