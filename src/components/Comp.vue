<template>
  <div class="info">
    {{ msg }}
  </div>
</template>

<script>
export default {
  name: 'Comp',
  data () {
    return {
      msg: ''
    }
  },
  created () {
    this.msg = this.$store.state.text
  }
}
</script>
