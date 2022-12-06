<template>
  <div class="view-container">
    <slot />
  </div>
</template>

<style scoped>
.view-container {
  width: 100%;
  height: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
}
</style>
