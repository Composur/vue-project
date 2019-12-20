/**
 * @description api 请求 
 * @return Promise 
 */

 import request from './axios'

//根据经纬度获取位置详情
export const reqAddress = geohash => request('/position/'+geohash)

// 获取食品分类列表
export const reqFoodList = data => request('/index_category','GET',data)

// 根据经纬度获取商铺列表
export const reqShopList = data => request('/shops','GET',data)

// 根据经纬度和关键字搜索商铺列表
export const reqSearchShop = data => request('/search_shops', 'GET',data)

// 用户名密码登陆
export const reqLogin = data=> request('/login_pwd','POST',data)

// 发送短信验证码
export const reqCode = data=> request('/sendcode','get',data)

// 手机号验证码登陆
export const reqLoginMsg = data=> request('/login_sms','POST',data)

// 根据会话获取用户信息
export const reqUserInfo = () => request('/userinfo')

// 用户登出
export const reqLoginOut = ()=> request('/logout')


/**
 * @description 商品详情页相关 
 */  
export const reqFoodLists = ()=> request('/goods') // 食物列表
export const reqRatings = ()=> request('/ratings') // 评论列表
export const reqFoodInfo = ()=> request('/foodInfo') // 食物信息