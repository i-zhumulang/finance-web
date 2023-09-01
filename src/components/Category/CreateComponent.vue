<script lang="ts">
import { getCurrentInstance } from "vue";
import type { ComponentInternalInstance } from "vue";
import IndexClass from "@/typescripts/Category/IndexClass";
import CreateClass from "@/typescripts/Category/CreateClass";

export default {
  name: "CreateComponent",
  props: {
    indexClass: {type: IndexClass, required: true}
  },
  setup() {
    const instance = getCurrentInstance() as ComponentInternalInstance;
    const indexClass: IndexClass = instance.props.indexClass as IndexClass;
    const currentClass = new CreateClass(indexClass);
    currentClass.create();
    return {currentClass}
  }
}
</script>

<template>
  <el-form
      v-loading="currentClass.loadingClass.loading"
      v-if="currentClass.indexClass.createDialogClass.dialog"
      :ref="currentClass.formRef"
      @submit.prevent="currentClass.store(currentClass.formRef.value)"
      label-width="120px"
      :rules="currentClass.rule"
      :model="currentClass.data">
    <el-form-item prop="parent_id" label="上级分类">
      <el-select
          v-model="currentClass.data.parent_id"
          style="width: 100%"
          clearable
          placeholder="上级分类">
        <el-option
            v-for="category in currentClass.options.category"
            :key="category.id"
            :label="category.data.name"
            :value="category.id"/>
      </el-select>
    </el-form-item>
    <el-form-item prop="name" label="分类名称">
      <el-input
          v-model="currentClass.data.name"
          autocomplete="off"
          placeholder="请输入1~10字符的分类名称"/>
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