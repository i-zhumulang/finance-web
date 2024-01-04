<script lang="ts">
import IndexComponent from "@/components/StatisticsUserDay/IndexComponent.vue";
import FinancialStatementComponent from "@/components/StatisticsUserDay/FinancialStatementComponent.vue";

import IndexClass from "@/typescripts/StatisticsUserDay/IndexClass";

export default {
  name: "IndexView",
  components: {IndexComponent, FinancialStatementComponent},
  setup() {
    const indexClass = new IndexClass();
    return {indexClass};
  }
}
</script>

<template>
  <IndexComponent :indexClass="indexClass"/>
  <el-dialog title="详情"
             width="60%"
             v-if="indexClass.financialStatementDialogClass.dialog"
             v-model="indexClass.financialStatementDialogClass.dialog"
             :draggable="true"
             :close-on-press-escape="false"
             :close-on-click-modal="false">
    <FinancialStatementComponent :indexClass="indexClass"/>
  </el-dialog>
</template>

<style scoped>

</style>