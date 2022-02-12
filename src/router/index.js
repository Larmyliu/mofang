import Vue from 'vue';
import Router from 'vue-router';
import Rubik from '../components/Rubik.vue'
import Ceng from '../components/ceng.vue'
import report from '../components/report.vue'
import Login from '../components/Login.vue'
Vue.use(Router);
export default new Router({
  routes:[
    {
      path:"/",
      redirect:'/Login'
    },
    {
      path:'/Login',
      component: Login
    },
    {
      path:'/Rubik',
      component: Rubik
    },{
      path: '/Ceng',
      component: Ceng
    },{
      path: '/report',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      children:[
        {
          path: '/',
          component: report
        }
      ]
    },
    {
      path: '/register',
      component: resolve => require(['../components/Register.vue'], resolve)
  },
  {
      path: '/register-success',
      component: resolve => require(['../components/RegisterSuccess.vue'], resolve)
  },
  {
    path: '/readme',
    component: resolve => require(['../components/common/Home.vue'], resolve),
    children:[
        {
            path: '/',
            component: resolve => require(['../components/Readme.vue'], resolve)
        },
        {
            path: '/upload',
            component: resolve => require(['../components/Upload.vue'], resolve)       // Vue-Core-Image-Upload组件
        },
        {
            path: '/userCenter',
            component: resolve => require(['../components/UserCenter.vue'], resolve)    // 拖拽列表组件
        },
        {
            path: '/modifyUser',
            component: resolve => require(['../components/ModifyUser.vue'], resolve)
        },
        {
            path: '/modifyPassword',
            component: resolve => require(['../components/ModifyPassword.vue'], resolve)
        },
        {
            path: '/success',
            component: resolve => require(['../components/Success.vue'], resolve)
        }
    ]
},
  ]
})
