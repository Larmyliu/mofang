// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// const Vue = require('vue')
import Vue from 'vue'

const Three = require('three')
const Cube = require('cubejs')
import App from './App.vue'

import router from './router'
import Apply from './api/api'
Vue.use(Apply)

// import axios from 'axios'
// Vue.prototype.$Apply = axios
//Vue.config.productionTip = false
Vue.prototype.$three = Three;
// 若是没有开启Devtools工具，在开发环境中开启，在生产环境中关闭
// Vue.config.devtools = true

// if (process.env.NODE_ENV == 'development') {
//   Vue.config.devtools = true;
// } else {
//   Vue.config.devtools = false;
// }
/* eslint-disable no-new */

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';   // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import SIdentify from './components/Identify.vue';    //自定义组件
import "babel-polyfill";

Vue.component("SIdentify",SIdentify);
Vue.use(ElementUI);



new Vue({
  el: '#app',
  components: { App },
  router,
  template: '<App/>'
})
