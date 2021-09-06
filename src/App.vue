<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss">
  @import '@/assets/styles/common.scss';

  #app {
    font-size: 16px;
    color: blue;
  }
</style>
