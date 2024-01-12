<script lang="ts">
import { getCurrentInstance, onMounted } from "vue";
import type { ComponentInternalInstance } from "vue";

import StatisticsFamilyClass from "@/typescripts/Index/StatisticsFamilyClass";

export default {
  name: "StatisticsFamilyComponent",
  props: {
    statisticsFamilyClass: {type: StatisticsFamilyClass, required: true}
  },
  setup() {
    const instance = getCurrentInstance() as ComponentInternalInstance;
    const currentClass: StatisticsFamilyClass = instance.props.statisticsFamilyClass as StatisticsFamilyClass;
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
          <template #header>
            <div class="card-header">
              <span>消费组</span>
            </div>
          </template>
          <div id="statistics-family" ref="chart" style="height: 500px; width: 100%"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>

</style>