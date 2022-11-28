<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    loan: {
      required: true,
      type: Object as () => Loan,
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
    <strong>{{ loan.approved_loan ? "Aprovado" : "Recusado" }}</strong>
  </div>
</template>

<style scoped>
.loan-detail {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
