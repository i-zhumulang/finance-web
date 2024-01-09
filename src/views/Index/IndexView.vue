<script lang="ts">
import IndexComponent from "@/components/Index/IndexComponent.vue";

import IndexClass from "@/typescripts/Index/IndexClass";

export default {
  name: "IndexView",
  components: {IndexComponent},
  setup() {
    const indexClass = new IndexClass();
    return {indexClass};
  }
}
</script>

<template>
  <IndexComponent :indexClass="indexClass"/>
</template>

<style scoped>

</style>