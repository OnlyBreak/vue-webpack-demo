var path = require('path')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.config')

// https://github.com/jantimon/html-webpack-plugin
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(baseWebpackConfig, {
    plugins: [
      new HtmlWebpackPlugin({
        filename: path.resolve(__dirname, '../dist/index.html'),
        template: 'index.html'
      })
    ]
})