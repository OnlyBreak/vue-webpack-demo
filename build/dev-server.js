var express = require('express');
var webpack = require('webpack');
var config = require('../config');
var webpackConfig = require('./webpack.dev.conf.js');
const env = process.env.NODE_ENV;

// 创建一个express实例
var app = express();

// 调用webpack并把配置传过去
var compiler = webpack(webpackConfig);

// 使用webpack-dev-middleware中间件
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  stats: {
    colors: true,
    chunks: false
  }
});

var hotMiddleware = require('webpack-hot-middleware')(compiler);

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', compilation => {
  compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
    hotMiddleware.publish({
      action: 'reload'
    });
    cb();
  });
});

// handle fallback for HTML5 history API
// var history = require('connect-history-api-fallback');
// app.use(history());

// register middleware
app.use(devMiddleware);
app.use(hotMiddleware);

app.listen(8888, function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listen at http://localhost:8000');
});
