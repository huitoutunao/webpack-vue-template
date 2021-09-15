<template>
  <div class="test-page">
    <div class="page-title">Unit Test Page</div>
    <p>count is: {{ count }}</p>
    <button @click="increment">increment</button>
  </div>
</template>

<script>
export default {
  name: 'Test',
  data() {
    return {
      count: 0,
    }
  },
  methods: {
    increment() {
      this.count += 1
    },
  },
}
</script>

<style lang="scss" scoped>
.page-title {
  font-size: 16px;
  color: #333;
}
</style>
