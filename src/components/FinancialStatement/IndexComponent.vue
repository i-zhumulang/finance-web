<script lang="ts">
import { getCurrentInstance } from "vue";
import type { ComponentInternalInstance } from "vue";
import { ArrowDown } from '@element-plus/icons-vue';
import IndexClass from "@/typescripts/FinancialStatement/IndexClass";
import PaginationClass from "@/typescripts/Common/Common/Objects/PaginationClass";

export default {
  name: "IndexComponent",
  components: {ArrowDown},
  props: {
    indexClass: {type: IndexClass, required: true}
  },
  setup() {
    const instance = getCurrentInstance() as ComponentInternalInstance;
    const currentClass: IndexClass = instance.props.indexClass as IndexClass;
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
              <el-select
                  v-model="currentClass.data.query.category_id"
                  style="width: 100%"
                  clearable
                  filterable
                  placeholder="支出分类">
                <el-option-group
                    v-for="category in currentClass.data.options.category"
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
            <el-form-item>
              <el-select
                  v-model="currentClass.data.query.payment_method_id"
                  style="width: 100%"
                  @change="currentClass.paymentMethodChangeHandle($event)"
                  @clear="currentClass.paymentMethodClearHandle()"
                  clearable
                  filterable
                  placeholder="支付方式">
                <el-option
                    v-for="payment_method in currentClass.data.options.payment_method"
                    :key="payment_method.id"
                    :label="payment_method.data.name"
                    :value="payment_method.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select
                  v-model="currentClass.data.query.payment_account_id"
                  style="width: 100%"
                  clearable
                  filterable
                  placeholder="支付账号">
                <el-option
                    v-for="payment_account in currentClass.data.options.payment_account"
                    :key="payment_account.id"
                    :label="payment_account.data.name"
                    :value="payment_account.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="currentClass.search()">查询</el-button>
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
              <el-button
                  v-for="operate in currentClass.data.options.operate"
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
                  v-loading="currentClass.loadingClass.loading"
                  :data="currentClass.data.table.index"
                  row-key="id"
                  style="width: 100%">
                <el-table-column prop="data.consumption_date_format" label="花费日期" align="center"/>
                <el-table-column prop="data.amount" label="花费金额" align="center">
                  <template #default="scope">
                    <el-row>
                      <el-col :span="15" align="right">
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
                <el-table-column label="操作" width="120">
                  <template #default="scope">
                    <el-dropdown>
                      <span class="el-dropdown-link">
                        操作
                        <el-icon class="el-icon--right">
                          <arrow-down/>
                        </el-icon>
                      </span>
                      <template #dropdown>
                        <el-dropdown-menu>
                          <el-dropdown-item
                              v-for="opts in scope.row.opts"
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