<script lang="ts">
import {toRefs} from "vue";
import IndexClass from "@/typescripts/PaymentMethod/IndexClass";
import UpdateClass from "@/typescripts/PaymentMethod/UpdateClass";

export default {
  name: "UpdateComponent",
  props: {
    indexClass: {type: IndexClass}
  },
  setup(props: any) {
    const {indexClass} = toRefs(props);
    const currentClass = new UpdateClass(indexClass.value);
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