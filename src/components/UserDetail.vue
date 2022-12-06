<script lang="ts">
import { useAuth } from "@/stores/auth";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    user: {
      required: true,
      type: Object as () => User,
    },
  },

  data: () => ({
    authStore: useAuth(),
  }),

  methods: {
    emitRefresh() {
      this.$emit("refresh");
    },

    authorizeUser() {
      if (
        !confirm(
          `Confirmar o cadastro de ${this.user.name} (${this.user.email})?`
        )
      )
        return;
      this.authStore
        .protectedFetch("/user/confirm", "PUT", { email: this.user.email })
        .then(() => this.emitRefresh());
    },
  },
});
</script>

<template>
  <div class="loan-detail">
    <div class="book-container">
      <div>
        <strong>{{ user.name }}</strong>
        <br /><br />
        <span>
          <strong>Email: </strong>
          <a :href="`mailto:${user.email}`" target="_blank" class="link">
            {{ user.email }}
          </a>
        </span>
        <br />
        <span>
          <strong>Tipo: </strong>
          {{
            user.type === 3
              ? "Administrador"
              : user.type === 2
              ? "Bibliotecário"
              : "Usuário"
          }}</span
        >
        <br />
        <span>
          <strong>Status: </strong>
          <span>
            {{
              user.confirmed_account === 1 ? "Aprovado" : "Aguardando aprovação"
            }}
          </span>
        </span>
        <div v-if="user.confirmed_account === 0">
          <br />
          <button @click="authorizeUser">Aprovar cadastro</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loan-detail {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #000;
  padding: 1rem;
  border: 1px solid var(--shadow-color);
  background-color: #fff;
  box-shadow: 2px 2px 0px var(--shadow-color);
  width: 300px;
}

.book-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

button {
  padding: 10px 15px;
  border: 1px solid var(--shadow-color);
  box-shadow: 2px 2px 0px var(--shadow-color);
  outline: none;
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
}

.button-disabled {
  cursor: default;
}

.text-green {
  color: var(--sucess-color);
}

.text-red {
  color: var(--error-color);
}

.text-orange {
  color: rgb(255, 90, 14);
}

.link {
  color: rgb(48, 120, 255);
}

@media screen and (max-width: 768px) {
  .loan-detail {
    width: 100%;
    border: none;
    box-shadow: none;
    padding: 0;
  }
}
</style>
