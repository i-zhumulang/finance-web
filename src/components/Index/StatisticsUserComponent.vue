<script lang="ts">
import { getCurrentInstance, onMounted } from "vue";
import type { ComponentInternalInstance } from "vue";

import IndexClass from "@/typescripts/Index/IndexClass";
import type StatisticsUserClass from "@/typescripts/Index/StatisticsUserClass";

export default {
  name: "StatisticsUserComponent",
  props: {
    indexClass: {type: IndexClass, required: true}
  },
  setup() {
    const instance = getCurrentInstance() as ComponentInternalInstance;
    const indexClass: IndexClass = instance.props.indexClass as IndexClass;
    const currentClass: StatisticsUserClass = indexClass.statisticsUser
    onMounted(() => {
      currentClass.index();
    });
    return {currentClass};
  }
}
</script>

<template>
  <div class="index-component">
    <el-row>
      <el-col :span="24">
        <el-card>
          <div
              id="statistics-user"
              :ref="currentClass.statisticsUserRef"
              style="height: 700px!important; width: 100%!important;"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>

</style>