<script lang="ts">
import { useAuth } from "@/stores/auth";
import RedirectTo from "@/components/RedirectTo.vue";

export default {
  props: {
    reverse: {
      required: false,
      type: Boolean,
      default: false,
    },

    routeName: {
      required: false,
      type: String,
      default: "auth.login",
    },
  },

  data: () => ({
    authStore: useAuth(),
    userAuthenticated: undefined as boolean | undefined,
  }),

  methods: {
    async verifyLogin() {
      this.userAuthenticated = await this.authStore.verifyLogin();
    },
  },

  mounted() {
    this.verifyLogin();
  },

  watch: {
    "authStore.user": {
      handler() {
        this.verifyLogin();
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
  <h2 v-if="userAuthenticated === undefined">Carregando...</h2>
  <RedirectTo
    :name="routeName"
    v-else-if="userAuthenticated === (reverse ? true : false)"
  />
  <slot v-else-if="userAuthenticated === (reverse ? false : true)" />
</template>
