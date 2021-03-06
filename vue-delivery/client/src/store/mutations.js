/**
 * 1. mutation 类似于事件
 * 2. mutation 必须是同步函数
 * 3. 必须以相应的 type 调用 store.commit 方法进行调用 mutations
 * @param 事件类型 (type) 和 一个 回调函数 (handler(state,你传入的额外对象))
*/
import Vue from 'vue'

import * as Type from './mutations_types.js'

// store 中存储的数据

export default {
  // 我们可以使用 ES2015 风格的 计算属性 命名功能来使用一个常量作为函数名
  [Type.GET_ADDRESS](state, address) {
    state.address = address 
  },
  [Type.GET_SHOPS](state, payload) {
    state.shops = payload
  },
  [Type.GET_SHOP_LIST](state, payload) {
    state.shopList = payload
  },
  [Type.GET_FOOD_INFO](state, payload) {
    state.foodInfo = payload
  },
  [Type.GET_RATINGS](state, payload) {
    state.ratings = payload
  },
  [Type.GET_FOOD_LISTS](state, payload) {
    state.foodLists = payload
  },
  [Type.GET_SEARCH_RESULT](state, payload) {
    state.searchShops = payload
  },
  [Type.UPDATE_FOOD_COUNT](state, payload) {
    // 购物车菜品数量更新
    if(payload.isAdd){
      if(!payload.food.count){
        // 这样才有数据绑定效果
        Vue.set(payload.food,'count',1)
         // 添加到购物车
        state.cartFoods.push(payload.food)
      }else{
        payload.food.count++
      }
    }else{
      if(payload.food.count){
          payload.food.count--
        if(payload.food.count===0){
          // 清除此商品
          state.cartFoods.splice(state.cartFoods.indexOf(payload.food), 1)
        }
      }
    }
  },
  [Type.CLEAR_CART](state){
    // 清空foodLists的添加的商品数量
    state.cartFoods.forEach(food => food.count = 0)
    //  清空购物车的商品
    state.cartFoods=[]
  }
}