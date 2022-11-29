<script lang="ts">
import ProtectedRoute from "@/components/ProtectedRoute.vue";
import { useAuth } from "@/stores/auth";
import { defineComponent } from "vue";
import LoanDetail from "@/components/LoanDetail.vue";
import PermissionLevel from "@/components/PermissionLevel.vue";

export default defineComponent({
  data: () => ({
    authStore: useAuth(),
    loans: [] as Loan[],
  }),

  methods: {
    async fetchLoans() {
      const res: Loan[] = await this.authStore.protectedFetch(
        "/book/loan/list/all",
        "GET"
      );

      this.loans = res
        .map((loan) => {
          loan.approved_loan = Boolean(loan.approved_loan);
          loan.returned_loan = loan.dt_real_devolution_loan !== null;
          return loan;
        })
        .sort((a, b) => b.id_loan - a.id_loan);
    },
  },

  mounted() {
    this.fetchLoans();
  },

  components: {
    ProtectedRoute,
    LoanDetail,
    PermissionLevel,
  },
});
</script>

<template>
  <ProtectedRoute>
    <PermissionLevel :permission-level="2">
      <h2>Empréstimos</h2>
      <ul v-if="loans.length > 0" class="loan-list">
        <li v-for="loan of loans" :key="loan.id_loan" class="loan-item">
          <LoanDetail :loan="loan" @refresh="fetchLoans" />
        </li>
      </ul>
    </PermissionLevel>
  </ProtectedRoute>
</template>

<style scoped>
.loan-list {
  padding-left: 0;
  list-style-type: none;
  width: 80%;
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
