<script lang="ts">
import { getCurrentInstance, onMounted } from "vue";
import type { ComponentInternalInstance } from "vue";

import IndexClass from "@/typescripts/Index/IndexClass";

export default {
  name: "IndexComponent",
  props: {
    indexClass: {type: IndexClass, required: true}
  },
  setup() {
    const instance = getCurrentInstance() as ComponentInternalInstance;
    const currentClass: IndexClass = instance.props.indexClass as IndexClass;
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
          <div id="main" ref="chart" style="height: 500px; width: 100%"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>

</style>