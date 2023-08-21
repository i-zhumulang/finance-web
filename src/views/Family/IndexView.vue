<script lang="ts">
import IndexComponent from "@/components/Family/IndexComponent.vue";
import CreateComponent from "@/components/Family/CreateComponent.vue";
import UpdateComponent from "@/components/Family/UpdateComponent.vue";
import UserComponent from "@/components/Family/UserComponent.vue";

import IndexClass from "@/typescripts/Family/IndexClass";

export default {
  name: "IndexView",
  components: {IndexComponent, CreateComponent, UpdateComponent, UserComponent},
  setup() {
    const indexClass = new IndexClass();
    return {indexClass};
  }
}
</script>

<template>
  <IndexComponent :indexClass="indexClass"/>
  <el-dialog
      title="新增"
      width="40%"
      v-if="indexClass.createDialogClass.dialog"
      v-model="indexClass.createDialogClass.dialog"
      :draggable="true"
      :close-on-press-escape="false"
      :close-on-click-modal="false">
    <CreateComponent :indexClass="indexClass"/>
  </el-dialog>
  <el-dialog
      title="编辑"
      width="40%"
      v-if="indexClass.updateDialogClass.dialog"
      v-model="indexClass.updateDialogClass.dialog"
      :draggable="true"
      :close-on-press-escape="false"
      :close-on-click-modal="false">
    <UpdateComponent :indexClass="indexClass"/>
  </el-dialog>
  <el-dialog
      title="家庭成员"
      width="40%"
      v-if="indexClass.userDialogClass.dialog"
      v-model="indexClass.userDialogClass.dialog"
      :draggable="true"
      :close-on-press-escape="false"
      :close-on-click-modal="false">
    <UserComponent :indexClass="indexClass"/>
  </el-dialog>
</template>

<style scoped>

</style>