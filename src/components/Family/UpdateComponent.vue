<script lang="ts">
import {toRefs} from "vue";
import IndexClass from "@/typescripts/Family/IndexClass";
import UpdateClass from "@/typescripts/Family/UpdateClass";

export default {
  name: "UpdateComponent",
  props: {
    indexClass: {type: IndexClass}
  },
  setup(props: any) {
    const {indexClass} = toRefs(props);
    const updateClass = new UpdateClass();
    updateClass.indexClass = indexClass.value;
    updateClass.edit();
    return {updateClass}
  }
}
</script>

<template>
  <el-form
      v-loading="updateClass.options.loading"
      v-if="updateClass.indexClass.getUpdateDialog()"
      :ref="updateClass.formRef"
      @submit.prevent="updateClass.update(updateClass.formRef.value)"
      label-width="120px"
      :rules="updateClass.rule"
      :model="updateClass.data">
    <el-form-item prop="name" label="支付方式">
      <el-input
          v-model="updateClass.data.name"
          autocomplete="off"
          placeholder="请输入2~30字符的支付方式名称"/>
    </el-form-item>
    <el-form-item>
      <el-button
          type="primary"
          native-type="submit">确定
      </el-button>
      <el-button @click="updateClass.close()">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>

</style>