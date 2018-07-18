/**
 * Created by zhao on 2017/8/12.
 */
var mongoose = require('mongoose');
var categoriesSchema = require('../schemas/categories');

module.exports = mongoose.model('Category', categoriesSchema);