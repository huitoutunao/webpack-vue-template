<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style lang="scss">
  // @font-face {
  //   font-family: 'ffy';
  //   src : url('./assets/fonts/PingFang SC Medium.ttf');
  // }

  #app {
    font-size: 16px;
    // font-family: 'ffy';
    color: blue;
  }
</style>
