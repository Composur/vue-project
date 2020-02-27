 /**
 * @description 封装axios
 */
// import store from 'store'
import config from '../config'

import axios from 'axios'

// 把 Token 存在localStroage,每次请求在 Axios 请求头上进行携带
// function redirect(){
//   return  (<Redirect to={'/login'}></Redirect>)
// }


// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});


// 创建一个实例 根据不同的 url 创建实例 
const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 5000,
  headers: {'X-Custom-Header': 'foobar'}
});


export default function (url, type = 'GET', data={}) {
  // axios.defaults.headers.common['Authorization'] = store.get('token')
  let promise;
  // if(process.env.NODE_ENV==='production'){
  //     if(!['/goods','/ratings','/foodInfo'].includes(url)){
  //       url=config.baseURlDev+url
  //     }else{
  //       url=config.baseURl+url
  //     }
  // }else{
  //   // mock 的 URL 不走代理
  //   if(!['/goods','/ratings','/foodInfo'].includes(url)){
  //     url=config.baseURlDev+url
  //   }
  // }
  // url=config.baseURl+url
  if(!['/goods','/ratings','/foodInfo'].includes(url)){
      url=config.baseURl+url
  }else{
      url=config.baseURlDev+url
  }
  // 返回一个promise，统一处理错误
  return new Promise((resolve) => {
    // 1.执行异步请求
    if (type.toLocaleLowerCase() === 'get') {
      let paramStr = ''
      Object.keys(data).forEach(key => {
          paramStr += `${key}=${data[key]}&`
      })
      if(paramStr) {
          paramStr = paramStr.substring(0, paramStr.length-1)
        }
        if(!['/goods','/ratings','/foodInfo'].includes(url)){
          promise = axios.get(url+'?'+paramStr+'&t='+new Date())
        }else{
          promise = axios.get(url)
        }
    } else {
      promise = axios.post(url, data)
    }
    // axios 返回的promise 
    promise.then(res => {
      // 2.成功调用resolve
      if(res.data&&res.data.code===0){
          resolve(res.data)
      }else{
        // message.error(res.data.msg)
        resolve(res.data)
      }
    }).catch(err => {
      const {data}= err
      console.log(err)
      if(data&&data.msg){
        // message.error('请求出错'+data.msg)
        console.log(data.msg)
        return 
      }
      // 3.失败调用reject，但是不能调用，调用就进入外层catch里了，为了不在外层用try...catch这里显式的返回error
      // message.error('请求出错'+err.message)
    })
  })
}