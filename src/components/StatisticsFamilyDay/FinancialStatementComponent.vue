<script lang="ts">
import { getCurrentInstance } from "vue";
import type { ComponentInternalInstance } from "vue";
import { ArrowDown } from '@element-plus/icons-vue';
import IndexClass from "@/typescripts/StatisticsFamilyDay/IndexClass";
import FinancialStatementClass from "@/typescripts/StatisticsFamilyDay/FinancialStatementClass";

export default {
  name: "FinancialStatementComponent",
  components: {ArrowDown},
  props: {
    indexClass: {type: IndexClass, required: true}
  },
  setup() {
    const instance = getCurrentInstance() as ComponentInternalInstance;
    const indexClass: IndexClass = instance.props.indexClass as IndexClass;
    const currentClass: FinancialStatementClass = new FinancialStatementClass(indexClass);
    currentClass.index()
    return {currentClass};
  }
}
</script>

<template>
  <div class="index-component">
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <el-row>
            <el-col :span="24">
              <el-table
                  v-loading="currentClass.loadingClass.loading"
                  :data="currentClass.data.table.index"
                  height="600"
                  row-key="id"
                  style="width: 100%">
                <el-table-column prop="data.consumption_date_format" label="花费日期"/>
                <el-table-column prop="data.amount" align="center" label="花费金额">
                  <template #default="scope">
                    <el-row>
                      <el-col :span="14" class="custom-class">
                        {{ scope.row.data.amount }}
                      </el-col>
                    </el-row>
                  </template>
                </el-table-column>
                <el-table-column prop="category.name" label="支出分类"/>
                <el-table-column prop="payment_method.name" label="支付信息">
                  <template #default="scope">
                    <el-row>
                      <el-col :span="24">
                        方式:{{ scope.row.payment_method.name }}
                      </el-col>
                      <el-col :span="24">
                        账号:{{ scope.row.payment_account.name }}
                      </el-col>
                    </el-row>
                  </template>
                </el-table-column>
                <el-table-column prop="data.description" label="备注"/>
                <el-table-column prop="data.created_by_name" label="创建信息">
                  <template #default="scope">
                    <el-row>
                      <el-col :span="24">
                        {{ scope.row.data.created_by_name }}
                      </el-col>
                      <el-col :span="24">
                        {{ scope.row.data.created_at_format }}
                      </el-col>
                    </el-row>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>

</style>