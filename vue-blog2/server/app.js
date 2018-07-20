/**
 * Created by zhao on 2017/8/11.
 */

// 加载express模块
var express = require('express');
// 加载数据库管理模块
var mongoose = require('mongoose');
// 加载body-parser用来处理post提交过来的数据
var bodyParser = require('body-parser');
// 加载cookies模块
var Cookies = require('cookies');
var cors = require('cors');
// 创建app应用
var app = express();


var User = require('./models/User.js');


// 配置body-parser 配置好后就可以通过request的body属性获取数据了
app.use(bodyParser.urlencoded({extended: true}));
//在原有的基础上加上下面代码即可
app.use(bodyParser.json())


// cors
// app.use(function (req, res, next) {
//     // if(req.headers.origin == 'http://47.94.237.28:80' || 'http://localhost:8080'){
//         res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
//         // res.header('Access-Control-Allow-Origin', 'http://47.94.237.28:80');
//         // res.header('Access-Control-Allow-Origin', '*');
//         res.header('Access-Control-Allow-Credentials', 'true');
//         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     // } 
   
// })

app.use(cors());

// 配置cookies
app.use(function(req,res,next){
    req.cookies = new Cookies(req, res);
    // 解析用户登录的信息
    req.userInfo = null;
    if (req.cookies.get('userInfo')) {
        try {
            req.userInfo = JSON.parse(req.cookies.get('userInfo'));
            // 获取当前登录用户的类型:是否是管理员
            User.findById(req.userInfo._id).then(function (userInfo) {
                req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
                next();
            })
        } catch (e) {
            next();
        }
    } else {
        next();
    }
})



/*
 * 根据不同的功能划分模块(路由分块)
 *
 * */
app.use('/admin', require('./routers/admin'));
app.use('/api', require('./routers/api'));
app.use('/', require('./routers/main'));


mongoose.connect("mongodb://localhost:27017/blog", function (err) {
    if (err) {
        console.log("数据库连接失败");
    } else {
        console.log("数据库连接成功");
        app.listen(8081, function () {
            console.log('app is listening on port 8081.');
        })
    }
});
