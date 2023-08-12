<script lang="ts">
import {toRefs} from "vue";
import IndexClass from "@/typescripts/Category/IndexClass";
import CreateClass from "@/typescripts/Category/CreateClass";

export default {
  name: "CreateComponent",
  props: {
    indexClass: {type: IndexClass, required: true}
  },
  setup(props: any) {
    const {indexClass} = toRefs(props);
    const createClass = new CreateClass();
    createClass.indexClass = indexClass.value;
    createClass.create();
    return {createClass}
  }
}
</script>

<template>
  <el-form
      v-if="createClass.indexClass.getCreateDialog()"
      :ref="createClass.formRef"
      @submit.prevent="createClass.store(createClass.formRef.value)"
      label-width="120px"
      :rules="createClass.rule"
      :model="createClass.data">
    <el-form-item prop="parent_id" label="上级分类">
      <el-select
          v-model="createClass.data.parent_id"
          style="width: 100%"
          clearable
          placeholder="上级分类">
        <el-option
            v-for="category in createClass.options.category"
            :key="category.id"
            :label="category.data.name"
            :value="category.id"/>
      </el-select>
    </el-form-item>
    <el-form-item prop="name" label="分类名称">
      <el-input
          v-model="createClass.data.name"
          autocomplete="off"
          placeholder="请输入2~30字符的分类名称"/>
    </el-form-item>
    <el-form-item>
      <el-button
          type="primary"
          native-type="submit">确定
      </el-button>
      <el-button @click="createClass.close()">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>

</style>