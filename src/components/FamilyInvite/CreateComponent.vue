<script lang="ts">
import { toRefs } from "vue";
import IndexClass from "@/typescripts/FamilyInvite/IndexClass";
import CreateClass from "@/typescripts/FamilyInvite/CreateClass";

export default {
  name: "CreateComponent",
  props: {
    indexClass: {type: IndexClass}
  },
  setup(props: any) {
    const {indexClass} = toRefs(props);
    const currentClass = new CreateClass(indexClass.value);
    return {currentClass}
  }
}
</script>

<template>
  <el-form
      v-if="currentClass.indexClass.createDialogClass.dialog"
      :ref="currentClass.formRef"
      @submit.prevent="currentClass.store(currentClass.formRef.value)"
      label-width="120px"
      :rules="currentClass.rule"
      :model="currentClass.data">
    <el-form-item prop="mobile" label="手机号码">
      <el-input
          v-model="currentClass.data.mobile"
          autocomplete="off"
          placeholder="请输入对方手机号码"/>
    </el-form-item>
    <el-form-item>
      <el-button
          type="primary"
          native-type="submit">确定
      </el-button>
      <el-button @click="currentClass.close()">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>

</style>