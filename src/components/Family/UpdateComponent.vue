<script lang="ts">
import { getCurrentInstance } from "vue";
import type { ComponentInternalInstance } from "vue";
import IndexClass from "@/typescripts/Family/IndexClass";
import UpdateClass from "@/typescripts/Family/UpdateClass";

export default {
  name: "UpdateComponent",
  props: {
    indexClass: {type: IndexClass, required: true}
  },
  setup() {
    const instance = getCurrentInstance() as ComponentInternalInstance;
    const indexClass: IndexClass = instance.props.indexClass as IndexClass;
    const currentClass = new UpdateClass(indexClass);
    currentClass.edit();
    return {currentClass}
  }
}
</script>

<template>
  <el-form
      v-loading="currentClass.loadingClass.loading"
      v-if="currentClass.indexClass.updateDialogClass.dialog"
      :ref="currentClass.formRef"
      @submit.prevent="currentClass.update(currentClass.formRef.value)"
      label-width="120px"
      :rules="currentClass.rule"
      :model="currentClass.data">
    <el-form-item prop="name" label="支付方式">
      <el-input
          v-model="currentClass.data.name"
          autocomplete="off"
          placeholder="请输入2~30字符的支付方式名称"/>
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