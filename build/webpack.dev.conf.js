var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var utils = require('./utils');

// add hot-reload related code to entry chunks
var devClient = './build/dev-client';
Object.keys(baseWebpackConfig.entry).forEach((name => {
    var extras = [devClient];
    baseWebpackConfig.entry[name] = extras.concat(baseWebpackConfig.entry[name])
}))
module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  module: {
    rules: utils.styleLoaders({
      usePostCSS: true
    })
  },
  devtool: 'cheap-source-map',
  plugins: [
    new webpack.BannerPlugin('This file is created by onlyBreak'),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usa
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/jantimon/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, '../dist/index.html'),
      template: 'index.html'
    })
  ]
})