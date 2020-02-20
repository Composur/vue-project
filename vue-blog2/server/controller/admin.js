
// 切片上传
const path = require("path");
const fse = require("fs-extra");
const multiparty = require("multiparty");
const UPLOAD_DIR = path.resolve(__dirname, "..", "target"); // 大文件存储目录
const extractExt = filename =>filename.slice(filename.lastIndexOf("."), filename.length); // 提取后缀名


// 文件上传
const upload = ((req, res) => {
  const multipart = new multiparty.Form();
  // fields:除了FormData中的字段
  // files：FomData 字段
  multipart.parse(req, (err, fields, files) => {
    if (err) {
      return;
    }
    const [chunk] = files.chunk;
    const [hash] = fields.hash;
    const [filename] = fields.filename;
    const chunkDir = path.resolve(UPLOAD_DIR, filename);

    // 切片目录不存在，创建切片目录
    if (!fse.existsSync(chunkDir)) {
      fse.mkdirpSync(chunkDir);
    }

    // fs-extra 专用方法，类似 fs.rename 并且跨平台
    // fs-extra 的 rename 方法 windows 平台会有权限问题
    // https://github.com/meteor/meteor/issues/7852#issuecomment-255767835
    fse.moveSync(chunk.path, `${chunkDir}/${hash}`);
    res.end("received file chunk");
  });
})

// 文件合并
const merge = (async (req, res,next) => {
  const {
    fileHash,
    filename,
    size
  } = req.body;
  const ext = extractExt(filename);
  const filePath = path.resolve(UPLOAD_DIR, `${filename}${ext}`);
  mergeFileChunk(filePath, filename, size);
  res.end(
    JSON.stringify({
      code: 0,
      message: "file merged success"
    })
  );
  next()
})



//  原生的的 createServer 需要这样读数据
const resolvePost = req =>{
  new Promise(resolve => {
    let chunk = "";
    req.on("data", data => {
      chunk += data;
    }).on("end", () => {
      resolve(JSON.parse(chunk));
    });
  });
}


  
const pipeStream = (path, writeStream) =>
  new Promise(resolve => {
    const readStream = fse.createReadStream(path);
    readStream.on("end", () => {
      fse.unlinkSync(path);
      resolve();
    });
    readStream.pipe(writeStream);
  });
// 合并切片
const mergeFileChunk = async (filePath, fileHash, size) => {
  const chunkDir = path.resolve(UPLOAD_DIR, fileHash);
  const chunkPaths = await fse.readdir(chunkDir);
  // 根据切片下标进行排序
  // 否则直接读取目录的获得的顺序可能会错乱
  chunkPaths.sort((a, b) => a.split("-")[1] - b.split("-")[1]);
  await Promise.all(
    chunkPaths.map((chunkPath, index) =>
      pipeStream(
        path.resolve(chunkDir, chunkPath),
        // 指定位置创建可写流
        fse.createWriteStream(filePath, {
          start: index * size,
          end: (index + 1) * size
        })
      )
    )
  );
  fse.rmdirSync(chunkDir); // 合并后删除保存切片的目录
};
// 返回已经上传切片名
const createUploadedList = async fileHash =>
  fse.existsSync(path.resolve(UPLOAD_DIR, fileHash)) ?
  await fse.readdir(path.resolve(UPLOAD_DIR, fileHash)) : [];


module.exports={
  upload,
  merge,
}
