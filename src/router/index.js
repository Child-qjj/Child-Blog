import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    //name: 'Home',
    component: ()=>import(/* webpackChunkName: "Home" */'../views/Home.vue'),
    children:[
      // {
      //   path:'',
      //   component:Home
      // },
      {
        path:'/',
        name:'index',
        component:()=>import(/* webpackChunkName: "Home" */'../components/MainComponents/showArticles.vue')
      },
      {
        path:'/page',
        name:'page',
        component:()=>import(/* webpackChunkName: "Home" */'../views/pages.vue')
      }
    ]
  },
  {
    path:'/admin',
    // name:'admin',
    component:()=>import(/* webpackChunkName: "Admin" */'../views/Admin.vue'),
    children:[
      {
        path:'/admin',
        name:'tab',
        component:()=>import(/* webpackChunkName: "Admin" */'../components/adminComponent/RoleTable.vue')
      },
      {
        path:'/admin/page-list',
        name:'tab-art',
        component:()=>import(/* webpackChunkName: "Admin" */'../components/adminComponent/ArticleTable.vue')
      },
    ]
  },
  {
    path:'/about',
    name:'about',
    component:()=>import(/* webpackChunkName: "about" */'../views/About.vue')
  },
  {
    path:'/login',
    name:'login',
    component:()=>import(/* webpackChunkName: "group-component" */'../views/Login.vue')
  },
  {
    path:'/logout',
    name:'logout',
    component:()=>import(/* webpackChunkName: "group-component" */'../views/Logout.vue')
  },
  {
    path:'/admin/edit/:id',
    name:'markdown',
    component:()=>import(/* webpackChunkName: "Admin" */'../components/adminComponent/MarkdownEdit.vue')
  },
  {
    path:'/admin/draft-list',
    name:'draft',
    component:()=>import(/* webpackChunkName: "Admin" */'../components/adminComponent/Draft.vue')
  },
  // {
  //   path:'/share',
  //   name:'Share',
  //   component:()=>import('../views/shareAticles.vue')
  // },
  {
    path:'/resume',
    name:'Resume',
    component:()=>import(/* webpackChunkName: "resume" */'../views/Resume.vue')
  },
 
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
// router.afterEach((to,from,next)=>{
//   setTimeout(()=>{
//   	var _mtac = {};
//   	(function() {
//   		var mta = document.createElement("script");
//   		mta.src = "//pingjs.qq.com/h5/stats.js?v2.0.4";
//   		mta.setAttribute("name", "MTAH5");
//   		mta.setAttribute("sid", "500728195");
//   		var s = document.getElementsByTagName("script")[0];
//   		s.parentNode.insertBefore(mta, s);
//     })();
//   })
router.afterEach((to,from,next)=>{
})
// 路由守卫必须简洁,避免规则错误
router.beforeEach((to,from,next)=>{
  const isLogin = localStorage.loginToken?true:false;
  if(to.path=='/admin') {
    if (isLogin) {
      next();
    }
    else {
      alert('请登录账号!')
      next('/login')
    }
  }
  else next();
})
export default router
