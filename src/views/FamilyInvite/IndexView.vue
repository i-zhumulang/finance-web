<script lang="ts">
import IndexComponent from "@/components/FamilyInvite/IndexComponent.vue";
import CreateComponent from "@/components/FamilyInvite/CreateComponent.vue";

import IndexClass from "@/typescripts/FamilyInvite/IndexClass";

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
             v-if="indexClass.createDialogClass.dialog"
             v-model="indexClass.createDialogClass.dialog"
             :draggable="true"
             :close-on-press-escape="false"
             :close-on-click-modal="false">
    <CreateComponent :indexClass="indexClass"/>
  </el-dialog>
</template>

<style scoped>

</style>