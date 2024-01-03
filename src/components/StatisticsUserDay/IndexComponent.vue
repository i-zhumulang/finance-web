<script lang="ts">
import { getCurrentInstance } from "vue";
import type { ComponentInternalInstance } from "vue";
import { ArrowDown } from '@element-plus/icons-vue';
import IndexClass from "@/typescripts/StatisticsUserDay/IndexClass";
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
                  v-model="currentClass.data.query.family_id"
                  style="width: 100%"
                  filterable
                  placeholder="消费组">
                <el-option
                    v-for="family in currentClass.data.options.family"
                    :key="family.id"
                    :label="family.data.name"
                    :value="family.id"
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
          <el-row>
            <el-col :span="24">
              <el-table
                  v-loading="currentClass.loadingClass.loading"
                  :data="currentClass.data.table.index"
                  row-key="id"
                  style="width: 100%">
                <el-table-column prop="family.name" label="消费组"/>
                <el-table-column prop="user.name" label="成员"/>
                <el-table-column prop="data.day_format" label="日期"/>
                <el-table-column prop="data.amount" label="消费金额"/>
                <el-table-column prop="data.updated_at_format" label="最后统计时间"/>
                <el-table-column label="操作" width="120">
                  <template #default="scope">
                    <el-dropdown
                        v-if="scope.row.opts.length > 0"
                        @command="currentClass.event($event, scope.row.data)">
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
                              :command="opts.name_en"
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