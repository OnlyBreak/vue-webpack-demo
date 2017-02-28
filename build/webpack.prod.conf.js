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
      new webpack.LoaderOptionsPlugin({
        vue: {
            loaders: {
                css: ExtractTextPlugin.extract('css-loader')
            }
        }
      }),
      new webpack.BannerPlugin('This file is created by onlyBreak'),
      new ExtractTextPlugin("style.css"),
      new HtmlWebpackPlugin({
        filename: path.resolve(__dirname, '../dist/index.html'),
        template: 'index.html',
        inject: true
      })
    ]
})