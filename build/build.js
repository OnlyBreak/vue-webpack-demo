var webpack = require('webpack');

process.env.NODE_ENV = 'production' // 注意设置位置

var webpackConfig = require('./webpack.prod.conf');

webpack(webpackConfig, function (err, stats) {
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')
})