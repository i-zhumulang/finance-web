<script lang="ts">
import { getCurrentInstance } from "vue";
import IndexClass from "@/typescripts/Category/IndexClass";
import UpdateClass from "@/typescripts/Category/UpdateClass";

export default {
  name: "UpdateComponent",
  props: {
    indexClass: IndexClass
  },
  setup() {
    // @ts-ignore
    const {ctx} = getCurrentInstance();
    const updateClass = new UpdateClass();
    updateClass.indexClass = ctx.$props.indexClass;
    updateClass.edit();
    return {updateClass};
  }
}
</script>

<template>
  <el-form v-if="updateClass.indexClass.getUpdateDialog()"
           :ref="updateClass.formRef"
           @submit.prevent="updateClass.update(updateClass.formRef.value)"
           label-width="120px"
           :rules="updateClass.rule"
           :model="updateClass.data">
    <el-form-item prop="parent_id" label="上级分类">
      <el-select v-model="updateClass.data.parent_id"
                 style="width: 100%"
                 clearable
                 placeholder="所属模块">
        <el-option v-for="category in updateClass.options.category"
                   :key="category.id"
                   :label="category.data.name"
                   :value="category.id"/>
      </el-select>
    </el-form-item>
    <el-form-item prop="name" label="分类名称">
      <el-input v-model="updateClass.data.name" autocomplete="off" placeholder="请输入2~30字符的分类名称"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary"
                 native-type="submit">确定
      </el-button>
      <el-button @click="updateClass.close()">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>

</style>