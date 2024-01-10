<script lang="ts">
import StatisticsFamilyComponent from "@/components/Index/StatisticsFamilyComponent.vue";

import StatisticsFamilyClass from "@/typescripts/Index/StatisticsFamilyClass";

export default {
  name: "IndexView",
  components: {StatisticsFamilyComponent},
  setup() {
    const statisticsFamilyClass = new StatisticsFamilyClass();
    return {statisticsFamilyClass};
  }
}
</script>

<template>
  <StatisticsFamilyComponent :statisticsFamilyClass="statisticsFamilyClass"/>
</template>

<style scoped>

</style>