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
    authorizeLoan() {
      this.authStore
        .protectedFetch("/book/loan/authorize", "POST", {
          loan_id: this.loan.id_loan,
        })
        .then(() => {
          this.$router.go(0);
        });
    },

    returnLoan() {
      this.authStore
        .protectedFetch("/book/loan/authorize", "POST", {
          loan_id: this.loan.id_loan,
        })
        .then(() => {
          this.$router.go(0);
        });
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
    </span>
    <div>
      <button @click="authorizeLoan">Aprovar</button>
      <button @click="returnLoan">Recusar</button>
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
