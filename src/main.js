import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from './https'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import * as filters from "./filter/Filter"
import hljs from 'highlight.js' //导入代码高亮文件
import 'highlight.js/styles/default.css' 
import 'highlight.js/styles/github.css' 
//use v-highlight
//自定义一个代码高亮指令
Vue.directive('highlight',function (el) {
  let highlight = el.querySelectorAll('pre code');
  highlight.forEach((block)=>{
      hljs.highlightBlock(block)
  })
})
Vue.config.productionTip = false;
Vue.prototype.bus = new Vue();
Axios.defaults.baseURL = 'http://39.108.125.224';
// Axios.defaults.baseURL = 'http://localhost:3300';
Vue.prototype.$axios=Axios;
Object.keys(filters).forEach(key=>{
  Vue.filter(key,filters[key])
})
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
