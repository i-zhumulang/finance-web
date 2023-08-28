<script lang="ts">
import IndexComponent from "@/components/FamilyInvite/IndexComponent.vue";

import IndexClass from "@/typescripts/FamilyInvite/IndexClass";

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