<script lang="ts">
import ProtectedRoute from "@/components/ProtectedRoute.vue";
import { useAuth } from "@/stores/auth";
import { defineComponent } from "vue";
import LoanDetail from "./LoanDetail.vue";

export default defineComponent({
  data: () => ({
    authStore: useAuth(),
    loans: [],
    pendingLoans: [],
  }),

  components: {
    ProtectedRoute,
    LoanDetail,
  },
});
</script>

<template>
  <ProtectedRoute>
    <h2>Empréstimos pendentes</h2>
    <ul>
      <li>
        <LoanDetail
          v-for="pendingLoan of pendingLoans"
          :key="pendingLoan"
          title=":)"
        />
      </li>
    </ul>
  </ProtectedRoute>
</template>
