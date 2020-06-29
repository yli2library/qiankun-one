import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import './public-path'
import App from './App.vue'
import routes from './router'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(ElementUI)

let instance = null
let router = null

/**
 * 渲染函数
 * 两种情况：主应用生命周期钩子中运行；微应用单独启动时运行
 */
function render(props = {}) {
  const { container } = props
  // 在render中创建VueRouter，可以保证在卸载微应用时，移除location事件监听器，防止事件污染
  router = new VueRouter({
    // 运行在主应用中时，添加路由命名空间/vueone
    base: window.__POWERED_BY_QIANKUN__ ? '/vueone' : '/',
    mode: 'history',
    routes
  })

  // 挂载应用
  instance = new Vue({
    router,
    render: (h) => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app')
}

// 独立运行时，直接挂载应用
if(!window.__POWERED_BY_QIANKUN__) {
  render()
}

/**
 * 微应用需要在自己的入口js导出bootstrap、mount、unmount三个生命周期钩子，供主应用在适当的时机调用。
 * bootstrap 只会在微应用初始化时调用一次，下次微应用重新进入时会直接调用mount钩子，
 * 不会再重复触发bootstrap。
 * 通常可在这里做一些全局变量的初始化，比如不会在unmount阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  console.log('VueMicroAppOne bootstraped')
}

/**
 * 应用每次进入都会调用mount方法，通常在这里触发应用的渲染方法
 */
export async function mount(props) {
  console.log('VueMicroAppOne mount-------------------------', props)

  // // 设置主应用下发的方法
  // Object.keys(props.fn).forEach(method => {
  //   Vue.prototype[`$${method}`] = props.fn[method]
  // })

  // 设置通信
  Vue.prototype.$onGlobalStateChange = props.onGlobalStateChange
  Vue.prototype.$setGlobalState = props.setGlobalState
  // Vue.propotype.$offGlobalStateChange = props.offGlobalStateChange

  render(props)
}

/**
 * 应用每次切出、卸载会调用的方法，通常在这里会卸载微应用的应用实例。
 */
export async function unmount() {
  console.log('VueMicroAppOne unmount')
  instance.$destroy()
  instance = null
  router = null
}
