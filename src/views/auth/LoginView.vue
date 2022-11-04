<script lang="ts">
import RedirectTo from "@/components/RedirectTo.vue";
import { useAuth } from "@/stores/auth";

export default {
  data: () => ({
    email: "",
    password: "",
    authError: "",
    authStore: useAuth(),
  }),

  methods: {
    async submit() {
      this.resetAuthError();
      if (this.email.length > 0 && this.password.length > 0) {
        const err = await this.authStore.login(this.email, this.password);

        if (err instanceof Error) {
          this.authError = err.message;
        }
      }
    },

    resetAuthError() {
      if (this.authError.length > 0) {
        this.authError = "";
      }
    },
  },

  components: {
    RedirectTo,
  },
};
</script>

<template>
  <RedirectTo name="home" v-if="authStore.userAuthenticated" />
  <div class="login-form-container" v-else>
    <h2>Entrar</h2>
    <form @submit.prevent="submit">
      <div>
        <label htmlFor="input-email">Email:</label>
        <br />
        <input
          type="email"
          name="email"
          id="input-email"
          placeholder="email@exemplo.com"
          v-model="email"
          @input="resetAuthError"
        />
      </div>
      <div>
        <label htmlFor="input-password">Senha:</label>
        <br />
        <input
          type="password"
          name="password"
          id="input-password"
          placeholder="**********"
          v-model="password"
          @input="resetAuthError"
        />
      </div>
      <button type="submit" :class="authError.length > 0 && 'button-error'">
        <span v-if="authError.length > 0">{{ authError }}</span>
        <span v-else>Continuar</span>
      </button>
    </form>
  </div>
</template>

<style scoped>
.login-form-container {
  padding: 2rem;
  border: 1px solid var(--shadow-color);
  box-shadow: 10px 10px 0px var(--shadow-color);
  transform: translate(-5px, -5px);
  width: 50%;
  max-width: 400px;
}

h2 {
  margin: 0;
  font-size: 1.6rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  margin-top: 1.5rem;
}

input,
button {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--shadow-color);
  background-color: #fff;
  box-shadow: 2px 2px 0px var(--shadow-color);
  outline: none;
  transition: 0.1s;
}

input {
  margin-top: 3px;
}

input:focus {
  box-shadow: 0px 0px 0px var(--shadow-color);
  transform: translate(1px, 1px);
  transition: 0.1s;
}

button {
  margin-top: 1rem;
  background-color: var(--sucess-color);
  font-weight: bold;
  transition: ease-in-out 0.1s;
}

button:hover {
  box-shadow: 4px 4px 0px var(--shadow-color);
  transform: translate(-2px, -2px);
}

button:active {
  box-shadow: 0px 0px 0px var(--shadow-color);
  transform: translate(1px, 1px);
}

.button-error {
  background-color: var(--error-color);
}

@media screen and (max-width: 600px) {
  .login-form-container {
    width: 100%;
    border: none;
    box-shadow: none;
    transform: none;
  }
}
</style>
