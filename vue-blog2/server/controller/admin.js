
// 切片上传
const path = require("path");
const fse = require("fs-extra");
const multiparty = require("multiparty");
const UPLOAD_DIR = path.resolve(__dirname, "..", "target"); // 大文件存储目录
const extractExt = filename =>filename.slice(filename.lastIndexOf("."), filename.length); // 提取后缀名

//  原生的的 createServer 需要这样读 req.body 的数据
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

// hash 校验
const verify =( async (req,res,next)=>{
  // 服务器端有没有相同的文件
  // 有没有相同 hash 值得文件名
  const {fileHash,filename} = req.body 
  const ext = extractExt(filename)
  const filePath = path.resolve(UPLOAD_DIR,`${fileHash}${ext}`)
  // 文件已经存在
  if (fse.existsSync(filePath)) {
    res.end(JSON.stringify({
      shouldUpload:false
    }))
  } else {
    // 不存在
    res.end(JSON.stringify({
      shouldUpload:true,
      uploadedList:await createUploadedList(fileHash)
    }))
  }
})
// 文件上传
const upload = ((req, res) => {
  const multipart = new multiparty.Form();
  // fields: 其它formData字段
  // files：二进制文件 
  multipart.parse(req, async (err, fields, files) => {
    if (err) {
      return;
    }
    const [chunk] = files.chunk;
    const [hash] = fields.hash;
    const [filename] = fields.filename;
    const [fileHash] = fields.fileHash;
    const filePath = path.resolve(
      UPLOAD_DIR,
      `${fileHash}${extractExt(filename)}`
    );
    // const chunkDir = path.resolve(UPLOAD_DIR, filename);
    const chunkDir = path.resolve(UPLOAD_DIR, fileHash);

    // 文件存在直接返回
    if (fse.existsSync(filePath)) {
        res.end("file exist");
        return;
    }

    // 切片目录不存在，创建切片目录
    if (!fse.existsSync(chunkDir)) {
      fse.mkdirpSync(chunkDir);
    }

    // fs-extra 专用方法，类似 fs.rename 并且跨平台
    // fs-extra 的 rename 方法 windows 平台会有权限问题
    // https://github.com/meteor/meteor/issues/7852#issuecomment-255767835
    try {
      await fse.move(chunk.path, path.resolve(chunkDir, hash));
    } catch (error) {
      console.log('问题：',chunk.path,path.resolve(chunkDir, hash),error)
    }    
   
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
  const ext = extractExt(filename);//后缀
  // const filePath = path.resolve(UPLOAD_DIR, `${filename}${ext}`);
  const filePath = path.resolve(UPLOAD_DIR, `${fileHash}${ext}`);
  // mergeFileChunk(filePath, filename, size);
  mergeFileChunk(filePath, fileHash, size);
  res.end(
    JSON.stringify({
      code: 0,
      message: "file merged success"
    })
  );
})






  
const pipeStream = (path, writeStream) =>
  new Promise(resolve => {
    const readStream = fse.createReadStream(path);
    readStream.on("end", () => {
      fse.unlinkSync(path); // 删除读过的切片
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
    // 遍历切片文件夹
    chunkPaths.map((chunkPath, index) =>
    // 组合切片
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
  verify
}
