/**
 * Created by zhao on 2017/8/11.
 */

var express = require('express');

var router = express.Router();

var Category = require('../models/Category');
var Content = require('../models/Content');

// 统一返回格式
var responseData;
router.use(function (req, res, next) {
    responseData = {
        code: 0,
        message: '',
    }
    next();
});

router.get('/', function (req, res, next) {
    Category.find().then(function (categories) {
        responseData.categories = categories;
        if (req.userInfo) {
            responseData.code = 0;
            responseData.message = '已登录';
        } else {
            responseData.code = 1;
            responseData.message = '未登录';
        }
        responseData.userInfo = req.userInfo;
        res.json(responseData);
    });
})


/*获取文章列表*/
var data = {};
router.get('/category', function (req, res, next) {
    data.category = req.query.id || '';
    data.count = 0;
    data.page = Number(req.query.page || 1);
    data.limit = 5;
    data.pages = 0;
    var where = {};
    if (data.category) {
        where.category = data.category;
    }
    Content.where(where).count().then(function (count) {
        data.count = count;
        data.pages = Math.ceil(data.count / data.limit);
        data.page = Math.min(data.page, data.pages);
        // 取值不能小于1
        data.page = Math.max(data.page, 1);

        var skip = (data.page - 1) * data.limit;

        return Content.find().where(where).sort({addTime: -1}).limit(data.limit).skip(skip).populate(['category', 'user']);

    }).then(function (contents) {
        data.contents = contents;
        // console.log(data);
        res.json(data);
    })
})

/*文章详情*/
var contentDetail = {};
router.get('/view', function (req, res, next) {
    var contentId = req.query.contentid;

    Content.findOne({
        _id: contentId,
    }).populate(['category', 'user']).then(function (content) {
        content.views = content.views + 1;
        content.save();
        contentDetail.content = content;
        // console.log(data);
        res.json(contentDetail);
    })
})
/*
 * 提交评论
 * */
router.post('/comment/post', function (req, res, next) {
    // 文章ID
    var contentId = req.body.contentid || '';
    // 评论信息
    var postData = {
        username: req.userInfo.username,
        postTime: new Date(),
        content: req.body.content,
    }
    // 查询当前文章的信息
    Content.findOne({
        _id: contentId,
    }).populate(['category']).then(function (content) { //关联表查询
        content.comments.push(postData);
        // return content.save();
        // console.log(content)
        content =new Content(content)
        return content.save()
    }).then(function (newContent) {
        responseData.message = '评论成功';
        responseData.data = newContent;
        res.json(responseData);
    })
})


module.exports = router;