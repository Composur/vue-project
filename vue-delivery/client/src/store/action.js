/**
 * 通过 mutations 间接更新 state 
 * Action 提交的是 mutation，而不是直接变更状态。
 * Action 可以包含任意异步操作。
 * Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象
 * 通过 context.commit 提交一个 mutation
 */

import * as Type from './mutations_types'
import jsonp from 'jsonp'
// api 接口函数
import {reqFoodList,reqShopList } from  '../api'

export default {
  async [Type.GET_ADDRESS]({commit,state}){
      // let {latitude,longitude} = state
      const { point,address } = await getLatitude()
      // latitude = point.y*1/100000
      // longitude = point.x*1/100000
      // const geohash = `${latitude},${longitude}`
      // const res = await reqAddress(geohash)
      // const {data} = res
      // 提交
      commit(Type.GET_ADDRESS,address)
    },
  async [Type.GET_SHOPS]({commit}){
      const res = await reqFoodList()
      commit(Type.GET_SHOPS,res.data)
   },
  async [Type.GET_SHOP_LIST]({commit}){
      const res = await reqShopList()
       commit(Type.GET_SHOP_LIST,res.data)
   },

} 

const getLatitude=()=>{
  return new Promise((resolve,reject)=>{
    jsonp('https://api.map.baidu.com/location/ip?ak=PFlNd9vKhGalbukR6ZIlFKzKvFsutPWV',(err,data)=>{
      if(data&&data.status===0){
        resolve(data.content)
      }else{
        reject('请求定位接口失败')
      }
    })
  })
}