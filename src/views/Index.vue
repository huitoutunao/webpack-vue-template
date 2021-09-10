<template>
  <div class="page">
    <h1>{{ msg }}</h1>
    <comp />
    <van-button to="/about" type="primary"> About </van-button>
    <div class="img">
      <img src="../assets/images/logo.png" alt="" />
    </div>
  </div>
</template>

<script>
import Comp from '@/components/Comp'

export default {
  name: 'Index',
  components: {
    Comp,
  },
  data() {
    return {
      msg: 'Hello Index',
    }
  },
  mounted() {
    console.log('loading')
  },
}
</script>

<style lang="scss" scoped>
.page {
  height: 50px;
  padding: 30px;
  width: 100px;
}
h1 {
  font-size: 20px;
  color: #fff;
  text-align: center;
}
</style>
