import Vue from 'vue';
import Router from 'vue-router';
import Rubik from '../components/Rubik.vue'
import Ceng from '../components/ceng.vue'
import report from '../components/report.vue'
Vue.use(Router);
export default new Router({
  routes:[
    {
      path:"/",
      redirect:'/Rubik'
    },
    {
      path:'/Rubik',
      component: Rubik
    },{
      path: '/Ceng',
      component: Ceng
    },{
      path: '/report',
      component: report
    }
  ]
})
