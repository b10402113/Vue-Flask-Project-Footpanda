//<ROOT>/shared/APIKit.js
import axios from 'axios';
import {AsyncStorage} from 'react-native';
import {decode, encode} from 'base-64'

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}
axios.defaults.baseURL = 'http://192.168.1.102:5000/v1/';
axios.interceptors.request.use(
  async config => {
    // 如果Cookie中存在这个token，就在header中设置这个token
    // 这样token就可以跨域转发
    const userToken = await AsyncStorage.getItem('user_token');
    if (userToken != null) {
      let username = userToken;
      let password = '';
      var basicAuth = 'Basic ' + global.btoa(username + ':' + password);
      config.headers.Authorization = basicAuth;
    }
    return config;
  },
  err => {
    // 出错调用
    return Promise.reject(err);
  },
);
axios.interceptors.response.use(function (response) {
  let res = response.data;
  return res;
});
let APIKit = axios;
// Create axios client, pre-configured with baseURL
// let APIKit = axios.create({
//   baseURL: 'http://192.168.1.102:5000/v1/',
//   timeout: 10000,
// });

// Set JSON Web Token in Client to be included in all calls
// export const setClientToken = token => {
//   APIKit.interceptors.request.use(function (config) {
//     let username = token;
//     let password = '';
//     var basicAuth = 'Basic ' + btoa(username + ':' + password);
//     config.headers.Authorization = basicAuth;
//     config.headers.Authorization = `Basic ${token}`;
//     return config;
//   });
// };

export default APIKit;
