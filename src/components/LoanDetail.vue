<script lang="ts">
import { useAuth } from "@/stores/auth";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    loan: {
      required: true,
      type: Object as () => Loan,
    },
  },

  data: () => ({
    authStore: useAuth(),
  }),

  methods: {
    emitRefresh() {
      this.$emit("refresh");
    },

    authorizeLoan() {
      this.authStore
        .protectedFetch("/book/loan/authorize", "POST", {
          loan_id: this.loan.id_loan,
        })
        .then(() => this.emitRefresh());
    },

    returnLoan() {
      this.authStore
        .protectedFetch("/book/loan/return", "POST", {
          loan_id: this.loan.id_loan,
        })
        .then(() => this.emitRefresh());
    },
  },
});
</script>

<template>
  <div class="loan-detail">
    <div class="book-container">
      <img
        :src="`https://covers.openlibrary.org/b/isbn/${loan.isbn}-M.jpg`"
        :alt="loan.title"
        loading="lazy"
        class="book-cover"
      />
      <div>
        <strong>{{ loan.title }}</strong>
        <br /><br />
        <span>
          <strong>ISBN: </strong>
          {{ loan.isbn }}
        </span>
        <br />
        <span>
          <strong>Solicitado por: </strong>
          <a :href="`mailto:${loan.email}`">
            {{ loan.email }}
          </a>
        </span>
        <br />
        <span>
          <strong>Solicitado em: </strong>
          {{ new Date(loan.dt_loan).toLocaleDateString() }}</span
        >
        <br />
        <span>
          <strong>Status: </strong>
          {{
            loan.approved_loan
              ? loan.returned_loan
                ? "Devolvido"
                : "Aprovado"
              : "Aguardando aprovação"
          }}
        </span>
        <br /><br />
        <button @click="authorizeLoan" v-if="!loan.approved_loan">
          Aprovar
        </button>
        <button
          @click="returnLoan"
          class="button-error"
          v-else-if="!loan.returned_loan"
        >
          Devolver
        </button>
        <button class="button-disabled" v-else>Devolvido</button>
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
  width: 400px;
}

.book-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.book-cover {
  width: 120px;
  height: 180px;
  border: 1px solid var(--shadow-color);
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

@media screen and (max-width: 768px) {
  .loan-detail {
    width: 100%;
    border: none;
    box-shadow: none;
    padding: 0;
  }
}
</style>
