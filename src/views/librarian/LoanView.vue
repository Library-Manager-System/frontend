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
      <div v-if="loans.length > 0" class="loan-container">
        <LoanDetail
          v-for="loan of loans"
          :key="loan.id_loan"
          :loan="loan"
          @refresh="fetchLoans"
        />
      </div>
    </PermissionLevel>
  </ProtectedRoute>
</template>

<style scoped>
.loan-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 1rem;
}

@media screen and (max-width: 768px) {
  .loan-container {
    grid-template-columns: 1fr;
    width: 100%;
    margin: auto;
  }
}
</style>
