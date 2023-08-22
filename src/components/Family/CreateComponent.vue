<script lang="ts">
import { getCurrentInstance } from "vue";
import type { ComponentInternalInstance } from "vue";
import IndexClass from "@/typescripts/Family/IndexClass";
import CreateClass from "@/typescripts/Family/CreateClass";

export default {
  name: "CreateComponent",
  props: {
    indexClass: {type: IndexClass, required: true}
  },
  setup() {
    const instance = getCurrentInstance() as ComponentInternalInstance;
    const indexClass: IndexClass = instance.props.indexClass as IndexClass;
    const currentClass = new CreateClass(indexClass);
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
    <el-form-item prop="name" label="家庭名称">
      <el-input
          v-model="currentClass.data.name"
          autocomplete="off"
          placeholder="请输入2~30字符的家庭名称"/>
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