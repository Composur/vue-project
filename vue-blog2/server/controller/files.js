var formidable = require('formidable');
var fs = require('fs'); //node.js核心的文件处理模块

exports.upload = function (req, res, next) {
  console.log(req)
  // parse a file upload
        var form = new formidable.IncomingForm();
        form.uploadDir = "./";
        form.encoding = 'utf-8';
        form.keepExtensions = true;
        form.type = true
        form.maxFieldsSize = 20000000000 * 1024 * 1024
        form.parse(req, function (err, fields, files) {
            files.name = 'test.pdf'
            res.writeHead(200, {'content-type': 'text/plain'});
            res.write('received upload:\n\n');
            res.end(util.inspect({fields: fields, files: files}));
        });

        return;
};

exports.download = function (req, res) {
  var path =
    'public/upload/file.txt'; // 文件存储的路径     // filename:设置下载时文件的文件名，可不填，则为原名称
  res.download(path, filename);
};