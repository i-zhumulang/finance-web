<script lang="ts">
import { RouterView } from 'vue-router'

export default {
  name: "App",
  components: {RouterView}
}
</script>

<template>
  <RouterView/>
</template>

<style scoped>
html,
body,
#app {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
</style>
