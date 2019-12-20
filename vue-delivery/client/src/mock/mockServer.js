/*
使用mockjs提供mock数据接口
 */
import Mock from 'mockjs'
import data from './data.json'

// 返回商品列表的接口
Mock.mock('/goods', {code:0, data: data.goods})

// 返回评论的接口
Mock.mock('/ratings', {code:0, data: data.ratings})

// 返回商品信息的接口
Mock.mock('/foodInfo', {code:0, data: data.info})
