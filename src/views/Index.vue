<template>
  <div class="page">
    <h1>Hello Index</h1>
    <comp></comp>
    <router-link to="/about">About</router-link>
    <div class="img"><img src="../assets/images/logo.png" alt=""></div>
  </div>
</template>

<script>
  import Comp from '@/components/Comp'

  export default {
    name: 'Index',
    components: {
      Comp
    }
  }
</script>

<style lang="scss" scoped>
  .page {
    padding: 30px;
  }
  h1 {
    font-size: 20px;
    color: brown;
    text-align: center;
  }
</style>
