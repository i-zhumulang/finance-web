<script lang="ts">
import { getCurrentInstance, onMounted } from "vue";
import type { ComponentInternalInstance } from "vue";

import IndexClass from "@/typescripts/Index/IndexClass";
import type StatisticsCategoryClass from "@/typescripts/Index/StatisticsCategoryClass";

export default {
  name: "StatisticsCategoryComponent",
  props: {
    indexClass: {type: IndexClass, required: true}
  },
  setup() {
    const instance = getCurrentInstance() as ComponentInternalInstance;
    const indexClass: IndexClass = instance.props.indexClass as IndexClass;
    const currentClass: StatisticsCategoryClass = indexClass.statisticsCategory
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
              id="statistics-category"
              :ref="currentClass.statisticsCategoryRef"
              style="height: 700px; width: 100%"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>

</style>