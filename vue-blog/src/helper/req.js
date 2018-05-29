import axios from 'axios'
import {Message} from 'element-ui'
const log=console.log.bind(console)

 //全局的 axios 默认值
axios.defaults.baseURL = 'http://blog-server.hunger-valley.com';
// `withCredentials` 表示跨域请求时是否需要使用凭证 默认是true
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

export default function request(url,type='get',data={}){
    return new Promise((resolve,reject)=>{

    // 根据axios的get/post请求API进行封装
        const option={
            url,
            method:type
        }
        if(type.toLocaleLowerCase()=='get'){
            // get的请求方式
           // `params` 是即将与请求一起发送的 URL 参数
            option.params=data
        }else{
            // post的方式
            option.data=data
        }
        axios(option).then(res=>{
            if(res.data.status==='ok'){
                resolve(res.data)
                Message.success(res.data.msg)
            }else{
                // ele提示框
                Message.error(res.data.msg)
                reject(res.data)
            }
        }).catch(err=>{
            Message.error('网络异常')
            reject({msg:'网络异常'})
        })
    })
}