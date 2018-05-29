### 关于认证
#### 注册
+ POST /auth/resiger
    + 参数类型Content-Type: application/x-www-form-urlencoded;charset=utf-8
    + username : 用户名, 长度1到15个字符，只能是字母数字下划线中文
    + password : 密码, 长度6到16个任意字符
+ 返回数据
    + fail
        + {"status": "fail", "msg": "错误原因"}
    + success
        + {
    "status": "ok",
    "msg": "注册成功",
    "data": {
        "id": 1,
        "username": "hunger",
        "avatar": "http://avatar.com/1.png",
        "updatedAt": "2017-12-27T07:40:09.697Z",
        "createdAt": "2017-12-27T07:40:09.697Z"
    }
}
