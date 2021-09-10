<template>
  <div class="info">
    {{ msg }}
  </div>
</template>

<script>
export default {
  name: 'Comp',
  data() {
    return {
      msg: '',
    }
  },
  created() {
    this.msg = this.$store.state.text
  },
}
</script>

<style lang="scss" scoped>
.info {
  padding: 10px 0;
}
</style>
