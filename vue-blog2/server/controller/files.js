var formidable = require('formidable');
var fs = require('fs'); //node.js核心的文件处理模块

exports.upload = function (req, res, next) {
   console.log(req)
};

// exports.download = function(req, res){     var path =
// 'public/upload/file.txt';  // 文件存储的路径     // filename:设置下载时文件的文件名，可不填，则为原名称
//   res.download(path, filename);   };