const merge = require("webpack-merge");
const webpack = require("webpack");
const baseConfig = require("./webpack.base.conf.js");

module.exports = merge(baseConfig, {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  plugins: [new webpack.HotModuleReplacementPlugin()],
  optimization: {
    usedExports: true //tree shaking，删除无用代码，只支持esmodule（import），
    //dev环境不支持tree shaking，要使用需要配置,打包的文件下还有无用的代码，是为了保证source-map对应
    //prod环境不用改配置，prod内部配置好了
  },
  devServer: {
    port: "3001",
    hot: true,
    hotOnly: true,
    historyApiFallback: true,
    compress: true
    // watchOptions:{
    //   poll:1000,//监测修改的时间(ms)
    //   aggregeateTimeout:500, //防止重复按键，500毫米内算按键一次
    //   ignored:/node_modules/,//不监测
    // }
  }
});
