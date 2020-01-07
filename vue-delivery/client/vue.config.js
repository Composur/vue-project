/**
 * @description 对默认的配置进行覆盖
 */  
const NODE_ENV= process.env.NODE_ENV
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
const resolve = (dir)=>{
  return path.join(__dirname, dir);
}


module.exports={
  publicPath: './',
  devServer: {
    hot: true, //热加载
    // host: process.env.HOST || '0.0.0.0', //ip地址
    // host: 'localhost',
    port: 8081, //端口
    https: false, //false关闭https，true为开启
    open: true, //自动打开浏览器
    proxy: {
        '/api': { //本地                                        
        target: 'http://localhost:8083/',
        changeOrigin: true,//支持跨域
        // pathRewrite:{ //重写路径
        //   "^/api":''
        // }
      },
    }
  },
  // 该对象将会被 webpack-merge 合并入最终的 webpack 配置。
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets',resolve('src/assets'))
      .set('@components',resolve('src/components'))
      .set('@pages',resolve('src/pages'))
  },
  configureWebpack: {
    plugins: [
      // new BundleAnalyzerPlugin(),
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: productionGzipExtensions,
        threshold: 10240,
        minRatio: 0.8
      })
    ]
  },
  // esLint
  lintOnSave: process.env.NODE_ENV !== 'production',
}