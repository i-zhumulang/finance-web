<script lang="ts">
import { getCurrentInstance } from "vue";
import type { ComponentInternalInstance } from "vue";
import IndexClass from "@/typescripts/FamilyUser/IndexClass";
import InviteClass from "@/typescripts/FamilyUser/InviteClass";

export default {
  name: "InviteComponent",
  props: {
    indexClass: {type: IndexClass, required: true}
  },
  setup() {
    const instance = getCurrentInstance() as ComponentInternalInstance;
    const indexClass: IndexClass = instance.props.indexClass as IndexClass;
    const currentClass = new InviteClass(indexClass);
    return {currentClass}
  }
}
</script>

<template>
  <el-form
      v-if="currentClass.indexClass.inviteDialogClass.dialog"
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