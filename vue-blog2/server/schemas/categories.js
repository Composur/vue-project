/**
 * Created by zhao on 2017/8/12.
 */
var mongoose = require('mongoose');

// 分类的表结构
module.exports = new mongoose.Schema({
    // 分类名
    name: String,
});