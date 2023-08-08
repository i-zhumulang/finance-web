<script lang="ts">
import { getCurrentInstance } from "vue";
import IndexClass from "@/typescripts/FinancialStatement/IndexClass";
import PaginationClass from "@/typescripts/Common/Common/Objects/PaginationClass";

export default {
  name: "IndexComponent",
  props: {
    indexClass: IndexClass
  },
  setup: function () {
    // @ts-ignore
    const {ctx} = getCurrentInstance();
    const currentClass: IndexClass = ctx.$props.indexClass;
    currentClass.search()
    currentClass.options()
    return {currentClass, PaginationClass};
  }
}
</script>

<template>
  <div class="index-component">
    <el-row style="margin-bottom: 10px;">
      <el-col :span="24">
        <el-card class="box-card">
          <el-form :inline="true" :model="currentClass.data.query">
            <el-form-item>
              <el-select v-model="currentClass.data.query.category_id"
                         style="width: 100%"
                         clearable
                         placeholder="支出分类">
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="currentClass.data.query.payment_method_id"
                         style="width: 100%"
                         clearable
                         placeholder="支付方式">
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="currentClass.data.query.payment_account_id"
                         style="width: 100%"
                         clearable
                         placeholder="支付账号">
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="currentClass.search">查询</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <template #header v-if="currentClass.data.options.operate.length > 0">
            <div class="card-header">
              <el-button v-for="operate in currentClass.data.options.operate"
                         :key="operate.name_en"
                         :type="operate.type"
                         @click="currentClass.event(operate.name_en.toString())"
              >{{ operate.name_zh }}
              </el-button>
            </div>
          </template>
          <el-row>
            <el-col :span="24">
              <el-table
                  :data="currentClass.data.table.index"
                  row-key="id"
                  style="width: 100%">
                <el-table-column prop="data.consumption_date_format" label="消费日期"/>
                <el-table-column prop="data.amount" label="消费金额"/>
                <el-table-column prop="category.name" label="支出分类"/>
                <el-table-column prop="payment_method.name" label="支付方式"/>
                <el-table-column prop="payment_account.name" label="支付账号"/>
                <el-table-column prop="data.description" label="备注"/>
                <el-table-column prop="data.created_at_format" label="创建时间"/>
                <el-table-column label="操作" width="120">
                  <template #default="scope">
                    <el-dropdown
                        split-button
                        type="primary">操作
                      <template #dropdown>
                        <el-dropdown-menu>
                          <el-dropdown-item v-for="opts in scope.row.opts"
                                            :key="opts.name_en"
                                            @click="currentClass.event(opts.name_en, scope.row.data)"
                          >{{ opts.name_zh }}
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-pagination
                  :layout="PaginationClass.indexLayout"
                  :total="currentClass.data.table.count"
                  :page-size="currentClass.data.query.limit"
                  @current-change="currentClass.currentChange($event)"/>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>

</style>