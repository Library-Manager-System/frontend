<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: String,
  },
});
</script>

<template>
  {{ title }}
</template>

<style scoped></style>
