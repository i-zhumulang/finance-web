<script lang="ts">
import { getCurrentInstance } from "vue";
import type { ComponentInternalInstance } from "vue";
import { ArrowDown } from '@element-plus/icons-vue';
import IndexClass from "@/typescripts/FamilyInvite/IndexClass";
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
                <el-table-column prop="family.name" label="消费组"/>
                <el-table-column prop="data.invite_type_zh" label="类型"/>
                <el-table-column prop="inviter.name" label="邀请人"/>
                <el-table-column prop="invitee.name" label="受邀人"/>
                <el-table-column prop="data.state_zh" label="状态"/>
                <el-table-column prop="data.description" label="备注"/>
                <el-table-column prop="data.created_at_format" label="创建时间"/>
                <el-table-column prop="data.expiration_at_format" label="过期"/>
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