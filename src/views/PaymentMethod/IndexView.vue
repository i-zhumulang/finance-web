<script lang="ts">
import IndexComponent from "@/components/PaymentMethod/IndexComponent.vue";
import CreateComponent from "@/components/PaymentMethod/CreateComponent.vue";
import UpdateComponent from "@/components/PaymentMethod/UpdateComponent.vue";

import IndexClass from "@/typescripts/PaymentMethod/IndexClass";

export default {
  name: "IndexView",
  components: {IndexComponent, CreateComponent, UpdateComponent},
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
             v-if="indexClass.createDialogClass.dialog"
             v-model="indexClass.createDialogClass.dialog"
             :draggable="true"
             :close-on-press-escape="false"
             :close-on-click-modal="false">
    <CreateComponent :indexClass="indexClass"/>
  </el-dialog>
  <el-dialog title="编辑"
             width="40%"
             v-if="indexClass.updateDialogClass.dialog"
             v-model="indexClass.updateDialogClass.dialog"
             :draggable="true"
             :close-on-press-escape="false"
             :close-on-click-modal="false">
    <UpdateComponent :indexClass="indexClass"/>
  </el-dialog>
</template>

<style scoped>

</style>