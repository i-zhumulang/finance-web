<script lang="ts">
import IndexComponent from "@/components/FinancialStatement/IndexComponent.vue";
import CreateComponent from "@/components/FinancialStatement/CreateComponent.vue";

import IndexClass from "@/typescripts/FinancialStatement/IndexClass";

export default {
  name: "IndexView",
  components: {IndexComponent, CreateComponent},
  setup() {
    const indexClass = new IndexClass();
    return {indexClass};
  }
}
</script>

<template>
  <IndexComponent :indexClass="indexClass"/>
  <el-dialog title="新增"
             width="40%"
             v-if="indexClass.getCreateDialog()"
             v-model="indexClass.dialog.dialogCreateVisible"
             :draggable="true"
             :close-on-press-escape="false"
             :close-on-click-modal="false">
    <CreateComponent :indexClass="indexClass"/>
  </el-dialog>
</template>

<style scoped>

</style>