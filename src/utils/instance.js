import axios from "axios";
// import QueryString from "qs";

// import { Notification, MessageBox, Message } from 'element-plus'
// import store from '@/store'
// import { getToken } from '@/utils/auth'
import errorCode from '@/utils/errorCode'


// 创建axios实例
const instance = axios.create();

//  常规配置项
instance.defaults.baseURL = import.meta.env.VITE_APP_BASE_API; //  请求服务器具体的地址
instance.defaults.timeout = 2000; //  请求服务器超时
instance.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
instance.defaults.headers.common['Accept'] = "application/json, text/plain, */*"
instance.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';
instance.defaults.headers.common["token"] = 'token'; //  携带token请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; //声明传给服务器的数据，通过请求传给服务器的数据application/x-www-form-urlencoded格式
// instance.defaults.withCredentials = false; //  在跨域中允许携带凭证

// instance.defaults.transformRequest = function (data) {
//     if (data) return data;
//     let result = ``;
//     for (let attr in data) {

//         if (!data.hasOwnProperty(attr)) break;
//         result += `&${attr}=${data[attr]}`;
//     }
//     return result.substring(1);
// };

//  请求拦截器：当我们通过porps请求向服务器发请求的时候，能拦截到请求主体信息，然后把请求主体传递进来的json格式的对象，变成urlencoded 某某某等于&某某某格式发送给服务器
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么

    // const isToken = (config.headers || {}).isToken === false
    // if (getToken() && !isToken) {
    //     config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    // }
    // // get请求映射params参数
    // if (config.method === 'get' && config.params) {
    //     let url = config.url + '?';
    //     for (const propName of Object.keys(config.params)) {
    //         const value = config.params[propName];
    //         var part = encodeURIComponent(propName) + "=";
    //         if (value && typeof (value) !== "undefined") {
    //             if (typeof value === 'object') {
    //                 for (const key of Object.keys(value)) {
    //                     let params = propName + '[' + key + ']';
    //                     var subPart = encodeURIComponent(params) + "=";
    //                     url += subPart + encodeURIComponent(value[key]) + "&";
    //                 }
    //             } else {
    //                 url += part + encodeURIComponent(value) + "&";
    //             }
    //         }
    //     }
    //     url = url.slice(0, -1);
    //     config.params = {};
    //     config.url = url;
    // }

    return config;
}, function (error) {
    // 对请求错误做些什么
    console.log(error)
    return Promise.reject(error);
});

//  响应服务器：接受服务器返回的结果，把返回的结果，因为它的anshuosi从服务器获得的结果response对象当中包含了很多信息，既有响应头也有相应主体的信息，xx配置信息。
//  现在只拿到data，如果有错误就抛出错误的Promise，
instance.interceptors.response.use(res => {
        // 未设置状态码则默认成功状态
        const code = res.data.code || 200;
        // 获取错误信息
        const msg = errorCode[code] || res.data.msg || errorCode['default']
        // if (code === 401) {
        //     MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
        //         confirmButtonText: '重新登录',
        //         cancelButtonText: '取消',
        //         type: 'warning'
        //     })
        //     .then(() => {
        //         store.dispatch('LogOut').then(() => {
        //             location.href = '/index';
        //         })
        //     })
        // } else if (code === 500) {
        //     Message({
        //         message: msg,
        //         type: 'error'
        //     })
        //     return Promise.reject(new Error(msg))
        // } else if (code !== 200) {
        //     Notification.error({
        //         title: msg
        //     })
        //     return Promise.reject('error')
        // } else {
        //     return res.data
        // }
    },
    error => {
        console.log('err' + error)
        // let { message } = error;
        // if (message == "Network Error") {
        //   message = "后端接口连接异常";
        // }
        // else if (message.includes("timeout")) {
        //   message = "系统接口请求超时";
        // }
        // else if (message.includes("Request failed with status code")) {
        //   message = "系统接口" + message.substr(message.length - 3) + "异常";
        // }
        // Message({
        //   message: message,
        //   type: 'error',
        //   duration: 5 * 1000
        // })
        return Promise.reject(error)
    });

//  验证什么时候成功失败，用正则检验，自定义成功失败，主要以http状态码
// instance.defaults.validateStatus = function (status) {
//     //  http状态码，2或者3开头的都是成功，默认只有2开头的才能成功
//     return /^(2\3)\d{2}$/.test(status);
// }

export default instance;