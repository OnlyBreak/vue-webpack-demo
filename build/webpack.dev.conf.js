var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.config')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(baseWebpackConfig, {
    plugins: [
      // https://github.com/glenjamin/webpack-hot-middleware#installation--usa
      new webpack.HotModuleReplacementPlugin(),
      // https://github.com/jantimon/html-webpack-plugin
      new HtmlWebpackPlugin({
        filename: path.resolve(__dirname, '../dist/index.html'),
        template: 'index.html'
      })
    ]
})