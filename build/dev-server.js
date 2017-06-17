var express = require('express')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.dev.conf.js')

// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var proxyMiddleware = require('http-proxy-middleware')

// 创建一个express实例
var app = express()

// 调用webpack并把配置传过去
var compiler = webpack(webpackConfig)

// 使用webpack-dev-middleware中间件
var devMiddleware = require('webpack-dev-middleware')(compiler, {
    stats: {
        colors: true,
        chunks: false
    }
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]

  if (typeof options === 'string') {
    options = { target: options }
  }

  app.use(proxyMiddleware(options.filter || context, options))
})

var hotMiddleware = require('webpack-hot-middleware')(compiler)

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', (compilation) => {
    compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
        hotMiddleware.publish({
            action: 'reload'
        })
        cb()
    })
})

// 注册中间件
app.use(devMiddleware)
app.use(hotMiddleware)

app.listen(8888, function(err) {
    if(err) {
        console.log(err)
        return
    }
    console.log('Listen at http://localhost:8888')
})
