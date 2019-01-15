const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: resolve(__dirname, './public/index.js'),
  output: {
    path: resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  devServer: { // DevServer 相关配置
    contentBase: resolve(__dirname, '../dist'),
    host: '0.0.0.0',
    disableHostCheck: true, //  新增该配置项
    port: 4000
  },
  plugins: [new HtmlWebpackPlugin({
    filename: 'index.html',
    template: resolve(__dirname, '../src/html/index.html')
  })]
}
