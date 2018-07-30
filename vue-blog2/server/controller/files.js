var formidable = require('formidable');
var fs = require('fs');  //node.js核心的文件处理模块

exports.upload = function(req, res, next){
  var message = '';
  var form = new formidable.IncomingForm();   //创建上传表单
    // form.encoding = 'utf-8';        //设置编辑
    form.uploadDir = '../public/upload';     //设置上传目录
    form.keepExtensions = true;     //保留后缀
    form.maxFieldsSize = 10000000000000000000000000 * 1024 * 1024;   //文件大小
  
  form.parse(req, function(err, fields, files) {
    if (err) {
      console.log(err);
    }  

    const title = fields.title;
    const singer = fields.singer;

   
  });
};


exports.download = function(req, res){
    var path = 'public/upload/file.txt';  // 文件存储的路径
  
    // filename:设置下载时文件的文件名，可不填，则为原名称
    res.download(path, filename); 
  };