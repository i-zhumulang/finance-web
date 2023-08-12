<script lang="ts">
import {toRefs} from "vue";
import IndexClass from "@/typescripts/PaymentAccount/IndexClass";
import CreateClass from "@/typescripts/PaymentAccount/CreateClass";

export default {
  name: "CreateComponent",
  props: {
    indexClass: {type: IndexClass}
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
      v-loading="createClass.options.loading"
      v-if="createClass.indexClass.getCreateDialog()"
      :ref="createClass.formRef"
      @submit.prevent="createClass.store(createClass.formRef.value)"
      label-width="120px"
      :rules="createClass.rule"
      :model="createClass.data">
    <el-form-item prop="payment_method_id" label="支付方式">
      <el-select
          v-model="createClass.data.payment_method_id"
          style="width: 100%"
          clearable
          placeholder="支付方式">
        <el-option
            v-for="payment_method in createClass.options.payment_method"
            :key="payment_method.id"
            :label="payment_method.data.name"
            :value="payment_method.id"/>
      </el-select>
    </el-form-item>
    <el-form-item prop="name" label="账号名称">
      <el-input
          v-model="createClass.data.name"
          autocomplete="off"
          placeholder="请输入2~30字符的账号名称"/>
    </el-form-item>
    <el-form-item prop="account" label="账号">
      <el-input
          v-model="createClass.data.account"
          autocomplete="off"
          placeholder="请输入2~30字符的账号"/>
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