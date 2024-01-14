<script lang="ts">
import IndexClass from "@/typescripts/Index/IndexClass";
import StatisticsFamilyComponent from "@/components/Index/StatisticsFamilyComponent.vue";

export default {
  name: "IndexView",
  components: {StatisticsFamilyComponent},
  setup() {
    const indexClass = new IndexClass();
    return {indexClass};
  }
}
</script>

<template>
  <el-card>
    <el-tabs v-model="indexClass.activeName" class="demo-tabs" @tab-click="indexClass.handleClick">
      <el-tab-pane label="消费组" name="statistics-family">
        <StatisticsFamilyComponent :indexClass="indexClass"/>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<style scoped>

</style>