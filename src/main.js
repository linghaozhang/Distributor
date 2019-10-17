// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import {routes} from './routes';
import { TransferDom,LoadingPlugin,ToastPlugin,ConfirmPlugin,ConfigPlugin ,AlertPlugin} from 'vux';
import {needVConsole} from "@/constants/config";
// 或者umd方式
// 引入构建的js文件
if(!Promise) require('es6-promise').polyfill();
if(needVConsole) require('@/utils/lib/vconsole.min');
Vue.directive('transfer-dom', TransferDom);
Vue.use(ConfigPlugin, {
  $layout: 'VIEW_BOX'
});
Vue.use(ToastPlugin);
Vue.use(AlertPlugin);
Vue.use(ConfirmPlugin);
Vue.use(LoadingPlugin);
Vue.use(VueRouter);
Vue.use(Vuex);
let store = new Vuex.Store();
store.registerModule('h5vue',{
  state: {
    demoScrollTop: 0,
    isLoading: false,
    direction: 'forward'
  },
  mutations: {
    updateDirection (state, payload) {
      state.direction = payload.direction
    }
  },
  actions: {}
});
Vue.use(store);

const router = new VueRouter({routes});
FastClick.attach(document.body);


const history = window.sessionStorage;
history.clear();
let historyCount = history.getItem('count') * 1 || 0;
history.setItem('/', 0);
let isPush = false;
let endTime = Date.now();
let methods = ['push', 'go', 'replace', 'forward', 'back'];

document.addEventListener('touchend', () => {
  endTime = Date.now()
});
methods.forEach(key => {
  let method = router[key].bind(router);
  router[key] = function (...args) {
    isPush = true;
    method.apply(null, args)
  }
});

router.beforeEach(function (to, from, next) {
  // store.commit('updateLoadingStatus', {isLoading: true})
  // window.scrollTo(0,0);
  const toIndex = history.getItem(to.path);
  const fromIndex = history.getItem(from.path);

  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('updateDirection', {direction: 'forward'})
    } else {
      // 判断是否是ios左滑返回
      if (!isPush && (Date.now() - endTime) < 377) {
        store.commit('updateDirection', {direction: ''})
      } else {
        store.commit('updateDirection', { direction: 'reverse' })
      }
    }
  } else {
    ++historyCount;
    history.setItem('count', historyCount);
    to.path !== '/' && history.setItem(to.path, historyCount);
    store.commit('updateDirection', {direction: 'forward'})
  }

  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1];
    window.location.href = `http${url}`
  } else {
     next()
  }
});

router.afterEach(function (to) {
   // setTimeout(()=>window.scrollTo(0,0),0);
  window.scrollTo(0,0);
  isPush = false;
  // store.commit('updateLoadingStatus', {isLoading: false})
  // 禁用history
  // if (process.env.NODE_ENV === 'production') {
  //   ga && ga('set', 'page', to.fullPath);
  //   ga && ga('send', 'pageview')
  // }
});
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app-box');
