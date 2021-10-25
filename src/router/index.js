import Vue from 'vue';
import Router from 'vue-router';
import Rubik from '../components/Rubik.vue'
import Ceng from '../components/ceng.vue'
Vue.use(Router);
export default new Router({
  routes:[
    {
      path:"/",
      redirect:'/Ceng'
    },
    {
      path:'/Rubik',
      component: Rubik
    },{
      path: '/Ceng',
      component: Ceng
    }
  ]
})
