import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@fortawesome/fontawesome-free/css/all.css' 
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from './store'
import router from './router'
import BootstrapVue from 'bootstrap-vue'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(BootstrapVue);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')




