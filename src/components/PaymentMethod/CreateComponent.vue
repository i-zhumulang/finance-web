<script lang="ts">
import {toRefs} from "vue";
import IndexClass from "@/typescripts/PaymentMethod/IndexClass";
import CreateClass from "@/typescripts/PaymentMethod/CreateClass";

export default {
  name: "CreateComponent",
  props: {
    indexClass: {type: IndexClass}
  },
  setup(props: any) {
    const {indexClass} = toRefs(props);
    const createClass = new CreateClass();
    createClass.indexClass = indexClass.value;
    return {createClass}
  }
}
</script>

<template>
  <el-form v-if="createClass.indexClass.getCreateDialog()"
           :ref="createClass.formRef"
           @submit.prevent="createClass.store(createClass.formRef.value)"
           label-width="120px"
           :rules="createClass.rule"
           :model="createClass.data">
    <el-form-item prop="name" label="支付方式">
      <el-input v-model="createClass.data.name" autocomplete="off" placeholder="请输入2~30字符的支付方式名称"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary"
                 native-type="submit">确定
      </el-button>
      <el-button @click="createClass.close()">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>

</style>