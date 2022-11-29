<script lang="ts">
import { useAuth } from "@/stores/auth";
import RedirectTo from "@/components/RedirectTo.vue";

export default {
  props: {
    permissionLevel: {
      required: false,
      type: Number,
      default: 1,
    },
  },

  data: () => ({
    authStore: useAuth(),
    userPermissionLevel: undefined as Number | undefined,
  }),

  methods: {
    loadPermissionLevel() {
      this.userPermissionLevel = this.authStore.userData!.permission_level;
    },
  },

  mounted() {
    this.loadPermissionLevel();
  },

  watch: {
    "authStore.user": {
      handler() {
        this.loadPermissionLevel();
      },
      deep: true,
    },
  },

  components: {
    RedirectTo,
  },
};
</script>

<template>
  <h2 v-if="userPermissionLevel === undefined">Carregando...</h2>
  <slot v-else-if="userPermissionLevel >= permissionLevel" />
  <RedirectTo name="home" v-else />
</template>
