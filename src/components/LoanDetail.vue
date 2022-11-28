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
    <span>
      <strong>{{ loan.title }} </strong>
      <span> - Solicitado por </span>
      <strong>{{ loan.email }}</strong>
      <span> em </span>
      <strong>{{ new Date(loan.dt_loan).toLocaleDateString() }}</strong>
      <span> - Status: </span>
      <strong>{{
        loan.approved_loan
          ? loan.returned_loan
            ? "Devolvido"
            : "Aprovado"
          : "Aguardando aprovação"
      }}</strong>
    </span>
    <div>
      <button @click="authorizeLoan" v-if="!loan.approved_loan">Aprovar</button>
      <button @click="returnLoan" v-else-if="!loan.returned_loan">
        Devolver
      </button>
    </div>
  </div>
</template>

<style scoped>
.loan-detail {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
