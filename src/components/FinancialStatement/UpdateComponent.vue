<script lang="ts">
import { getCurrentInstance } from "vue";
import IndexClass from "@/typescripts/FinancialStatement/IndexClass";
import UpdateClass from "@/typescripts/FinancialStatement/UpdateClass";

export default {
  name: "CreateComponent",
  props: {
    indexClass: IndexClass
  },
  setup() {
    // @ts-ignore
    const {ctx} = getCurrentInstance();
    const updateClass = new UpdateClass();
    updateClass.indexClass = ctx.$props.indexClass;
    updateClass.edit();
    return {updateClass}
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
    <el-form-item prop="category_id" label="支出分类">
      <el-select v-model="updateClass.data.category_id"
                 style="width: 100%"
                 clearable
                 placeholder="请选择支出分类">
        <el-option v-for="category in updateClass.options.category"
                   :key="category.id"
                   :label="category.data.name"
                   :value="category.id"/>
      </el-select>
    </el-form-item>
    <el-form-item prop="payment_method_id" label="支付方式">
      <el-select v-model="updateClass.data.payment_method_id"
                 style="width: 100%"
                 clearable
                 placeholder="请选择支付方式">
        <el-option v-for="payment_method in updateClass.options.payment_method"
                   :key="payment_method.id"
                   :label="payment_method.data.name"
                   :value="payment_method.id"/>
      </el-select>
    </el-form-item>
    <el-form-item prop="category_id" label="支付账号">
      <el-select v-model="updateClass.data.payment_account_id"
                 style="width: 100%"
                 clearable
                 placeholder="请选择支付账号">
        <el-option v-for="payment_account in updateClass.options.payment_account"
                   :key="payment_account.id"
                   :label="payment_account.data.name"
                   :value="payment_account.id"/>
      </el-select>
    </el-form-item>
    <el-form-item prop="consumption_date" label="消费日期">
      <el-date-picker
          v-model="updateClass.data.consumption_date"
          style="width: 100%"
          type="date"
          placeholder="请选择消费日期"
          size="default"
      />
    </el-form-item>
    <el-form-item prop="amount" label="消费金额">
      <el-input-number
          v-model="updateClass.data.amount"
          :precision="2"
          :step="0.1"
          :min="1"
          :max="99999"
          autocomplete="off"
          placeholder="请输入消费金额"/>
    </el-form-item>
    <el-form-item prop="description" label="备注">
      <el-input
          v-model="updateClass.data.description"
          :rows="2"
          type="textarea"
          placeholder="请输入0~255个字符的备注"
      />
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