<template>
  <div class="page">
    <p class="word">Hello Index</p>
    <comp></comp>
    <img src="../assets/images/logo.png" alt="">
    <div class="img"></div>
    <router-link to="/about">跳转关于</router-link>
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
  .word {
    font-size: 20px;
    color: brown;
    text-align: center;
  }
  .img {
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background-image: url('../assets/images/photo.png');
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }
</style>
