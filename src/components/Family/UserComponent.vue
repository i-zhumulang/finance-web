<script lang="ts">
import { toRefs } from "vue";
import IndexClass from "@/typescripts/Family/IndexClass";
import UserClass from "@/typescripts/Family/UserClass";

export default {
  name: "UserComponent",
  props: {
    indexClass: {type: IndexClass}
  },
  setup(props: any) {
    const {indexClass} = toRefs(props);
    const currentClass = new UserClass(indexClass.value);
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