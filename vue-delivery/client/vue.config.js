//  对默认的配置进行覆盖

module.exports={
  devServer: {
    hot: true, //热加载
    host: process.env.HOST || '0.0.0.0', //ip地址
    port: 8080, //端口
    https: false, //false关闭https，true为开启
    open: true, //自动打开浏览器
    proxy: {
        '/users': { //本地                                        
        target: 'https://localhost:8083/',
        // 如果要代理 websockets
        ws: true,
        changeOrigin: true
      },
    }
  },
  // 该对象将会被 webpack-merge 合并入最终的 webpack 配置。
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
    }
  },
  // esLint
  lintOnSave: process.env.NODE_ENV !== 'production'
}