<script lang="ts">
import IndexClass from "@/typescripts/Index/IndexClass";
import StatisticsFamilyComponent from "@/components/Index/StatisticsFamilyComponent.vue";
import StatisticsCategoryComponent from "@/components/Index/StatisticsCategoryComponent.vue";
import StatisticsUserComponent from "@/components/Index/StatisticsUserComponent.vue";

export default {
  name: "IndexView",
  components: {StatisticsFamilyComponent, StatisticsCategoryComponent, StatisticsUserComponent},
  setup() {
    const indexClass = new IndexClass();
    return {indexClass};
  }
}
</script>

<template>
  <el-card>
    <el-tabs
        class="demo-tabs"
        v-model="indexClass.activeName"
        @tab-click="indexClass.handleClick($event, $event, indexClass)">
      <el-tab-pane
          label="成员"
          name="statistics-user">
        <StatisticsUserComponent :indexClass="indexClass" v-if="indexClass.activeName==='statistics-user'"/>
      </el-tab-pane>
      <el-tab-pane
          label="消费组"
          name="statistics-family">
        <StatisticsFamilyComponent :indexClass="indexClass" v-if="indexClass.activeName==='statistics-family'"/>
      </el-tab-pane>
      <el-tab-pane
          label="支出分类"
          name="statistics-category">
        <StatisticsCategoryComponent :indexClass="indexClass" v-if="indexClass.activeName==='statistics-category'"/>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<style scoped>

</style>