var path = require('path')
var webpack = require('webpack')
var baseWebpackConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var merge = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var config = require('../config')
var utils = require('./utils')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

var webpackConfig = merge(baseWebpackConfig, {
    plugins: [
      new webpack.BannerPlugin('This file is created by onlyBreak'),
      // https://github.com/webpack-contrib/extract-text-webpack-plugin
      new ExtractTextPlugin({
        filename: 'style.css'
      }),
      new UglifyJSPlugin({
        compress: {
          warnings: false
        },
        sourceMap: false
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        chunks: 2,
        minChunks: Infinity
      }),
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'manifest',
      //   minChunks: Infinity
      // }),
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'vendor',
      //   minChunks: function (module, count) {
      //     // any required modules inside node_modules are extracted to vendor
      //     return (
      //       module.resource &&
      //       /\.js$/.test(module.resource) &&
      //       module.resource.indexOf(
      //         path.join(__dirname, '../node_modules')
      //       ) === 0
      //     )
      //   }
      // }),
      new OptimizeCSSPlugin(),
      new HtmlWebpackPlugin({
        filename: config.build.index,
        template: 'index.html',
        inject: true
      })
    ],
    output: {
      path: config.build.assetsRoot,
      filename: utils.assetsPath('js/[name].js')
    }
})

module.exports = webpackConfig
