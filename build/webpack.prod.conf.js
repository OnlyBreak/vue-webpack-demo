var path = require('path');
var webpack = require('webpack');
var baseWebpackConfig = require('./webpack.base.conf');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var utils = require('./utils');

module.exports = merge(baseWebpackConfig, {
    plugins: [
      new webpack.BannerPlugin('This file is created by onlyBreak'),
      // https://github.com/webpack-contrib/extract-text-webpack-plugin
      new ExtractTextPlugin({
        filename: 'style.css'
      }),
      new HtmlWebpackPlugin({
        filename: path.resolve(__dirname, '../dist/index.html'),
        template: 'index.html',
        inject: true
      })
    ]
})