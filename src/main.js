import Vue from 'vue';
import axios from './router/axios';
import VueAxios from 'vue-axios';
import App from './App';
import router from './router/router';
import './permission'; // 权限
import './error'; // 日志
import store from './store';
import {
  loadStyle
} from './util/util'
import * as urls from '@/config/env';
import Element from 'element-ui';
import {
  iconfontUrl,
  iconfontVersion
} from '@/config/env';
import i18n from './lang' // Internationalization
import './styles/common.scss';

import basicContainer from './components/basic-container/main'

import GL_Component from '@/util/globalComponents'
// 时间格式化
import moment from 'moment'

import 'lib-flexible'
import './util/flexible'
//剪切板功能
import VueClipboard from 'vue-clipboard2'

Vue.use(GL_Component)

Vue.use(router)
Vue.use(VueAxios, axios)
Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(window.AVUE, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(VueClipboard)
//注册全局容器
Vue.component('basicContainer', basicContainer)
// 加载相关url地址
Object.keys(urls).forEach(key => {
  Vue.prototype[key] = urls[key];
})
// 默认时分秒
Vue.filter('timeFilter', function (value, formatString) {
  // formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
  formatString = formatString || 'YYYY-MM-DD';
  if (value) {
    if( /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(value) || value instanceof Date){
        var val = String(value)
     return moment(value).format(formatString);
    }else{
      return value
    }
  }
  return '';
})

//格式金钱 每三位逗号隔开
Vue.filter('formatMoneyFilter', function formatMoney(num, type) {
  // console.log(num)
  if (num === -1) {
    return -1;
  }
  // console.log(type)
  if (type != true) {
    return num;
  }
  var num = (num || 0).toString(),
    result = '';
  while (num.length > 3) {
    result = ',' + num.slice(-3) + result;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return result;
})

//格式百分比 每三位逗号隔开
Vue.filter('formatPercentFilter', function formatMoney(num,bit) {
  // console.log(num)
 if(!num){
   return 0;
 }  
 if(!bit){
   bit =2
 }
 
  return  num.toFixed(bit);
})

// 动态加载阿里云字体库
iconfontVersion.forEach(ele => {
  loadStyle(iconfontUrl.replace('$key', ele));
})

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
