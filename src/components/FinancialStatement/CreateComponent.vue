<script lang="ts">
import {toRefs} from "vue";
import IndexClass from "@/typescripts/FinancialStatement/IndexClass";
import CreateClass from "@/typescripts/FinancialStatement/CreateClass";

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
      v-if="createClass.indexClass.getCreateDialog()"
      :ref="createClass.formRef"
      @submit.prevent="createClass.store(createClass.formRef.value)"
      label-width="120px"
      :rules="createClass.rule"
      :model="createClass.data">
    <el-form-item prop="category_id" label="支出分类">
      <el-select
          v-model="createClass.data.category_id"
          style="width: 100%"
          clearable
          placeholder="请选择支出分类">
        <el-option-group
            v-for="category in createClass.options.category"
            :key="category.id"
            :label="category.data.name">
          <el-option
              v-for="item in category.children"
              :key="item.id"
              :label="item.data.name"
              :value="item.id"
          />
        </el-option-group>
      </el-select>
    </el-form-item>
    <el-form-item prop="payment_account_id" label="支付账号">
      <el-select
          v-model="createClass.data.payment_account_id"
          style="width: 100%"
          clearable
          placeholder="请选择支付账号">
        <el-option-group
            v-for="payment_method in createClass.options.payment_method"
            :key="payment_method.id"
            :label="payment_method.data.name">
          <el-option
              v-for="payment_account in payment_method.payment_account"
              :key="payment_account.id"
              :label="payment_account.data.name"
              :value="payment_account.id"
          />
        </el-option-group>
      </el-select>
    </el-form-item>
    <el-form-item prop="consumption_date" label="消费日期">
      <el-date-picker
          v-model="createClass.data.consumption_date"
          style="width: 100%"
          type="date"
          placeholder="请选择消费日期"
          value-format="YYYY-MM-DD"
          size="default"
      />
    </el-form-item>
    <el-form-item prop="amount" label="消费金额">
      <el-input-number
          v-model="createClass.data.amount"
          :precision="2"
          :step="0.1"
          :min="0.1"
          :max="99999.99"
          autocomplete="off"
          placeholder="请输入消费金额"/>
    </el-form-item>
    <el-form-item prop="description" label="备注">
      <el-input
          v-model="createClass.data.description"
          :rows="3"
          type="textarea"
          resize="none"
          placeholder="请输入0~255个字符的备注"
      />
    </el-form-item>
    <el-form-item prop="file" label="付款截图">
      <el-upload
          v-model:file-list="createClass.fileList.value"
          class="upload-demo"
          action="http://finance.api.com/financial-statement/upload"
          :on-preview="createClass.handlePreview"
          :on-remove="createClass.handleRemove"
          list-type="picture"
      >
        <el-button type="primary">选择图片</el-button>
        <template #tip>
          <div class="el-upload__tip" type="danger">
            请上传 jpg, jpeg, png 类型图片
          </div>
        </template>
      </el-upload>
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
.upload-demo {
  width: 100%;
}
</style>