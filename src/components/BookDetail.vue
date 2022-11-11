<script lang="ts">
export default {
  props: {
    title: {
      required: true,
      type: String,
    },
  },
};
</script>

<template>
  <div class="book">
    <span class="title">{{ title }}</span>
  </div>
</template>

<style scoped>
.book {
  width: 100px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--shadow-color);
  background-color: #fff;

  cursor: pointer;
  transition: 0.2s transform;
}

.book:hover {
  transform: scale(1.05);
}

.title {
  font-weight: bold;
}
</style>
