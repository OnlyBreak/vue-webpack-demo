var express = require('express')
var webpack = require('webpack')
var config = require('./webpack.config.js')

// 创建一个express实例
var app = express()

// 调用webpack并把配置传过去
var compiler = webpack(config)

// 使用webpack-dev-middleware中间件
var devMiddleware = require('webpack-dev-middleware')(compiler, {
    stats: {
        colors: true,
        chunks: false
    }
})

// 注册中间件
app.use(devMiddleware)

app.listen(8888, function(err) {
    if(err) {
        console.log(err)
        return
    }
    console.log('Listen at http://localhost:8888')
})