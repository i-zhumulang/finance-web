<script lang="ts">
import {getCurrentInstance} from "vue";
import type {ComponentInternalInstance} from "vue";
import {ArrowDown} from '@element-plus/icons-vue';
import IndexClass from "@/typescripts/Files/IndexClass";
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
                <el-table-column prop="data.file_name" label="文件名称"/>
                <el-table-column prop="data.file_size" label="文件大小">
                  <template #default="scope">
                    <el-row>
                      <el-col :span="14" class="custom-class">
                        {{ scope.row.data.file_size }}
                      </el-col>
                    </el-row>
                  </template>
                </el-table-column>
                <el-table-column prop="data.number_of_uses" label="使用次数"/>
                <el-table-column prop="payment_method.name" label="文件信息">
                  <template #default="scope">
                    <el-row>
                      <el-col :span="24">
                        文件类型:{{ scope.row.data.file_mime_type }}
                      </el-col>
                      <el-col :span="24">
                        文件路径:{{ scope.row.data.file_path }}
                      </el-col>
                    </el-row>
                  </template>
                </el-table-column>
                <el-table-column prop="data.created_at_format" label="创建信息"/>
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