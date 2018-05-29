import request from '../helper/req'


const options={
    REGISTER:'/auth/register',
    LOGIN:'/auth/login',
    LOGIN_INFO:'/auth/',
    LOGOUT:'/auth/logout',
}

export default{
    register({username,password}){
        return request(options.REGISTER,'POST',{username,password})
    },
    login({username,password}){
        return request(options.LOGIN,{username,password})
    },
    login_info(){
        // isLogin=true or false
        return request(options.LOGIN_INFO)
    },
    logout(){
        // msg 用户未登录 or 已注销
        return request(options.LOGOUT)
    }
}