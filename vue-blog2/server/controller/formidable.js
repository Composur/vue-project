var formidable = require('formidable'),
    http = require('http'),
    util = require('util');

http.createServer(function (req, res) {
    if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
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
    }

    // show a file upload form
    res.writeHead(200, {'content-type': 'text/html'});
    res.end('<form action="/upload" enctype="multipart/form-data" method="post"><input type="' +
            'text" name="title"><br><input type="file" name="upload" multiple="multiple"><br>' +
            '<input type="submit" value="Upload"></form>');
}).listen(8088, err => {
    console.log('8088')
});