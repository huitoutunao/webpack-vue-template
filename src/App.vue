<template>
  <div id="app">
    <p>Hello World!</p>
    <p>test gg</p>
    <p class="word">Index Home Test</p>
    <img src="./assets/images/logo.png" alt="">
    <!-- <img src="./assets/images/photo.png" alt=""> -->
    <div class="img"></div>
  </div>
</template>

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
    background-image: url('./assets/images/photo.png');
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }
</style>
