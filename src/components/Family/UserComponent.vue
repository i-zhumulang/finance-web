<script lang="ts">
import { getCurrentInstance } from "vue";
import type { ComponentInternalInstance } from "vue";
import IndexClass from "@/typescripts/Family/IndexClass";
import UserClass from "@/typescripts/Family/UserClass";

export default {
  name: "UserComponent",
  props: {
    indexClass: {type: IndexClass, required: true}
  },
  setup() {
    const instance = getCurrentInstance() as ComponentInternalInstance;
    const indexClass: IndexClass = instance.props.indexClass as IndexClass;
    const currentClass = new UserClass(indexClass);
    currentClass.init();
    return {currentClass};
  }
}
</script>

<template>
  <el-row>
    <el-col :span="24">
      <el-card>
        <el-table
            v-loading="currentClass.loadingClass.loading"
            :data="currentClass.data.table.index"
            row-key="id"
            style="width: 100%">
          <el-table-column prop="name" label="名称"/>
        </el-table>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped>

</style>