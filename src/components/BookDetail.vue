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
  <span class="title">{{ title }}</span>
</template>

<style scoped>
.title {
  font-weight: bold;
}
</style>
