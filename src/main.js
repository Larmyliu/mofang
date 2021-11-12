// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// const Vue = require('vue')
import Vue from 'vue'
const ElementUI = require('element-ui')
const Three = require('three')
const Cube = require('cubejs')
import App from './App.vue'
import '../static/common.css'
import router from './router'
//Vue.config.productionTip = false
Vue.prototype.$three = Three;
// 若是没有开启Devtools工具，在开发环境中开启，在生产环境中关闭
Vue.config.devtools = true
// if (process.env.NODE_ENV == 'development') {
//   Vue.config.devtools = true;
// } else {
//   Vue.config.devtools = false;
// }
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  router,
  template: '<App/>'
})
