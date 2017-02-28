var path = require('path');
var webpack = require('webpack');
var baseWebpackConfig = require('./webpack.base.conf');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
    module: {
        rules: [
          {
            test: /\.css$/,
            use: ExtractTextPlugin.extract(['css-loader'])
          }
        ]
    },
    plugins: [
      new webpack.BannerPlugin('This file is created by onlyBreak'),
      // https://github.com/webpack-contrib/extract-text-webpack-plugin
      new ExtractTextPlugin({
        filename: '[name].css'
      }),
      new HtmlWebpackPlugin({
        filename: path.resolve(__dirname, '../dist/index.html'),
        template: 'index.html',
        inject: true
      })
    ]
})