import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

// 引入 axios
Vue.prototype.$http = axios;

Vue.config.productionTip = false

// 全局注册时间的过滤器
Vue.filter('formatDate',val =>{
  if(!val) return ''
  const diff = Math.floor((Date.now() - Date.parse(val.toString())) /1000);
  if(diff < 10){
    return '几秒前'
  }else if( diff >= 10 && diff < 60){
    return '1 分钟前'
  }else if( diff >= 60 && diff < 3600){
    return Math.floor(diff/60) + ' 分钟前'
  }else if( diff >= 3600 && diff < 86400){
    return Math.floor(diff/3600) + ' 小时前'
  }else if(diff >=86400 && diff <2678400){
    return Math.floor(diff/86400) + ' 天前' 
  }else if(diff>=2678400 && diff< 31536000){
    return Math.floor(diff/2678400) + ' 个月前'
  }else if(diff >= 31536000){
    return Math.floor(diff / 31536000)+ ' 年前'
  }
  else{
    return ''
  }
})


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


