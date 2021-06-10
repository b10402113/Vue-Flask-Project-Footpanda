import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueAxios from 'vue-axios'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { Message } from 'element-ui'
import cookie from 'js-cookie';
// Vue.prototype.$cookie = cookie; 


import axios from 'axios';

axios.defaults.baseURL = 'http://192.168.1.102:5000/v1/';
// axios.defaults.headers.['Access-Control-Allow-Origin'] = '*';
axios.interceptors.request.use(
    config => {
        // 如果Cookie中存在这个token，就在header中设置这个token
        // 这样token就可以跨域转发
        if (cookie.get('user_token')) {
            let username = cookie.get('user_token')
            let password = ''
            var basicAuth = 'Basic ' + btoa(username + ':' + password);
            config.headers.Authorization = basicAuth;

        }
        return config;
    },
    err => {  // 出错调用
        return Promise.reject(err);
    }
)
axios.interceptors.response.use(function (response) {
    let res = response.data;
    return res;
//     console.log(res);
//     if (res.status == 201) {
//       return res.data;
//     } else {
//       Message.warning(res);
//       return Promise.reject(res);
//     }
//   }, (error) => {
//     let res = error.response;
//     Message.error(res.data.message);
//     return Promise.reject(error);
  });
Vue.use(ElementUI);
Vue.prototype.$message = Message
Vue.use(VueAxios, axios);
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
