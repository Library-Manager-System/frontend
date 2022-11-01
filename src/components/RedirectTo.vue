<script lang="ts">
export default {
  props: {
    name: {
      required: true,
      type: String,
    },
  },

  mounted() {
    this.$router.replace({ name: this.name });
  },
};
</script>

<template>
  <h2>Aguarde...</h2>
</template>
