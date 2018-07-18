/**
 * Created by zhao on 2017/8/12.
 */
var mongoose = require('mongoose');
var contentsSchema = require('../schemas/contents');

module.exports = mongoose.model('Content', contentsSchema);