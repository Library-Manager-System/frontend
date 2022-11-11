<script lang="ts">
import RedirectTo from "@/components/RedirectTo.vue";
import { useAuth } from "@/stores/auth";

export default {
  data: () => ({
    formData: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      phone: "",
      address: "",
    },
    authError: "",
    authLoading: false,
    authStore: useAuth(),
  }),

  methods: {
    async submit() {
      this.authLoading = true;
      this.resetAuthError();

      if (Object.values(this.formData).every((data) => data.length > 0)) {
        if (this.formData.password !== this.formData.passwordConfirm) {
          this.authError = "As senhas precisam coincidir";
        } else {
          const err = await this.authStore.signup({
            name: this.formData.name,
            email: this.formData.email,
            password: this.formData.password,
            phone: this.formData.phone,
            address: this.formData.address,
          });

          if (err instanceof Error) {
            this.authError = err.message;
          }
        }
      } else {
        this.authError = "Preencha todos os campos";
      }

      this.authLoading = false;
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
  <div class="form-container" v-else>
    <h2>Nova conta</h2>
    <form @submit.prevent="submit">
      <div class="form-input-container">
        <div>
          <label htmlFor="input-name">Nome:</label>
          <br />
          <input
            type="text"
            id="input-name"
            placeholder="Nome completo"
            v-model="formData.name"
            @input="resetAuthError"
          />
        </div>
        <div>
          <label htmlFor="input-email">Email:</label>
          <br />
          <input
            type="email"
            id="input-email"
            placeholder="email@exemplo.com"
            v-model="formData.email"
            @input="resetAuthError"
          />
        </div>
        <div>
          <label htmlFor="input-password">Senha:</label>
          <br />
          <input
            type="password"
            id="input-password"
            placeholder="**********"
            v-model="formData.password"
            @input="resetAuthError"
          />
        </div>
        <div>
          <label htmlFor="input-password-confirm">Confirme sua senha:</label>
          <br />
          <input
            type="password"
            id="input-password-confirm"
            placeholder="**********"
            v-model="formData.passwordConfirm"
            @input="resetAuthError"
          />
        </div>
        <div>
          <label htmlFor="input-phone">Número de telefone:</label>
          <br />
          <input
            type="tel"
            id="input-phone"
            placeholder="99999999999"
            v-model="formData.phone"
            @input="resetAuthError"
          />
        </div>
        <div>
          <label htmlFor="input-address">Endereço:</label>
          <br />
          <input
            type="text"
            id="input-address"
            placeholder="..."
            v-model="formData.address"
            @input="resetAuthError"
          />
        </div>
      </div>
      <button
        type="submit"
        :class="
          authError.length > 0
            ? 'button-error'
            : authLoading && 'button-disabled'
        "
      >
        <span v-if="authError.length > 0">{{ authError }}</span>
        <span v-else-if="authLoading">...</span>
        <span v-else>Continuar</span>
      </button>
    </form>
    <span class="form-message">
      Já tem uma conta?
      <RouterLink :to="{ name: 'auth.login' }">Entrar</RouterLink>
    </span>
  </div>
</template>

<style scoped>
.form-container {
  padding: 2rem;
  border: 1px solid var(--shadow-color);
  box-shadow: 10px 10px 0px var(--shadow-color);
  transform: translate(-5px, -5px);
  width: 75%;
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

.form-input-container {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(2, 1fr);
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

.button-disabled,
.button-disabled:hover,
.button-disabled:active {
  opacity: 0.8;
  box-shadow: none;
  transform: none;
  cursor: wait;
}

.form-message {
  margin-top: 1rem;
  display: inline-block;
}

.form-message a {
  color: var(--sucess-color);
  font-weight: bold;
}

@media screen and (max-width: 768px) {
  .form-container {
    width: 100%;
    border: none;
    box-shadow: none;
    transform: none;
  }

  .form-input-container {
    gap: 1rem;
    grid-template-columns: 1fr;
  }
}
</style>
