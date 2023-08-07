<script lang="ts">
import IndexComponent from "@/components/Category/IndexComponent.vue";
import CreateComponent from "@/components/Category/CreateComponent.vue";
import UpdateComponent from "@/components/Category/UpdateComponent.vue";

import IndexClass from "@/typescripts/Category/IndexClass";

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
             v-if="indexClass.getCreateDialog()"
             v-model="indexClass.dialog.dialogCreateVisible"
             :draggable="true"
             :close-on-press-escape="false"
             :close-on-click-modal="false">
    <CreateComponent :indexClass="indexClass"/>
  </el-dialog>
  <el-dialog title="编辑"
             width="40%"
             v-if="indexClass.getUpdateDialog()"
             v-model="indexClass.dialog.dialogUpdateVisible"
             :draggable="true"
             :close-on-press-escape="false"
             :close-on-click-modal="false">
    <UpdateComponent :indexClass="indexClass"/>
  </el-dialog>
</template>

<style scoped>

</style>