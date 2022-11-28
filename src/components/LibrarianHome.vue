<script lang="ts">
import ProtectedRoute from "@/components/ProtectedRoute.vue";
import { useAuth } from "@/stores/auth";
import { defineComponent } from "vue";
import LoanDetail from "./LoanDetail.vue";
import LoanHistoryDetail from "./LoanHistoryDetail.vue";

export default defineComponent({
  data: () => ({
    authStore: useAuth(),
    loans: [] as Loan[],
    pendingLoans: [] as Loan[],
  }),

  async mounted() {
    const res: Loan[] = await this.authStore.protectedFetch(
      "/book/loan/list/all",
      "GET"
    );

    this.loans = res.map((loan) => {
      loan.approved_loan = Boolean(loan.approved_loan);
      return loan;
    });

    this.pendingLoans = this.loans.filter((loan) => !loan.approved_loan);
  },

  components: {
    ProtectedRoute,
    LoanDetail,
    LoanHistoryDetail,
  },
});
</script>

<template>
  <ProtectedRoute>
    <h2>Empréstimos pendentes</h2>
    <ul v-if="pendingLoans.length > 0" class="loan-list">
      <li v-for="loan of pendingLoans" :key="loan.id_loan" class="loan-item">
        <LoanDetail :loan="loan" />
      </li>
    </ul>
    <h2>Histórico de empréstimos</h2>
    <ul v-if="loans.length > 0" class="loan-list">
      <li v-for="loan of loans" :key="loan.id_loan" class="loan-item">
        <LoanHistoryDetail :loan="loan" />
      </li>
    </ul>
  </ProtectedRoute>
</template>

<style scoped>
.loan-list {
  padding-left: 0;
  list-style-type: none;
  width: 75%;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.loan-item {
  border: 1px solid #000;
  padding: 1rem;
  border: 1px solid var(--shadow-color);
  background-color: #fff;
  box-shadow: 2px 2px 0px var(--shadow-color);
}
</style>
