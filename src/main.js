import Vue from 'vue'
import App from './App.vue'

var add = (x, y) => x + y
var res = add(1, 2)
console.log(res)

class Person {
  sayname() {
    return 'name'
  }
}

async function asyc () {
  const cc = await 'hello world'
  return cc
}
asyc()

var promise = Promise.resolve('result')


new Vue({
  render: h => h(App)
}).$mount('#app')
