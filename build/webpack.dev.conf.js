var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.config');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// add hot-reload related code to entry chunks
var devClient = './build/dev-client';
Object.keys(baseWebpackConfig.entry).forEach((name => {
    var extras = [devClient];
    baseWebpackConfig.entry[name] = extras.concat(baseWebpackConfig.entry[name])
}))
module.exports = merge(baseWebpackConfig, {
    plugins: [
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