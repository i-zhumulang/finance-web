<script lang="ts">
import { getCurrentInstance } from "vue";
import type { ComponentInternalInstance } from "vue";
import IndexClass from "@/typescripts/PaymentAccount/IndexClass";
import UpdateClass from "@/typescripts/PaymentAccount/UpdateClass";

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
    <el-form-item prop="payment_method_id" label="支付方式">
      <el-select
          v-model="currentClass.data.payment_method_id"
          style="width: 100%"
          clearable
          placeholder="支付方式">
        <el-option
            v-for="payment_method in currentClass.options.payment_method"
            :key="payment_method.id"
            :label="payment_method.data.name"
            :value="payment_method.id"/>
      </el-select>
    </el-form-item>
    <el-form-item prop="name" label="账号名称">
      <el-input
          v-model="currentClass.data.name"
          autocomplete="off"
          placeholder="请输入1~10字符的账号名称"/>
    </el-form-item>
    <el-form-item prop="account" label="账号">
      <el-input
          v-model="currentClass.data.account"
          autocomplete="off"
          placeholder="请输入2~30字符的账号"/>
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