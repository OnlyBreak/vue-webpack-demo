var path = require('path');
var webpack = require('webpack');
var rm = require('rimraf');
var chalk = require('chalk');
var config = require('../config');

process.env.NODE_ENV = 'production'; // 注意设置位置

var webpackConfig = require('./webpack.prod.conf');

var path = path.join(config.build.assetsRoot, config.build.assetsSubDirectory);

rm(path, () => {
  webpack(webpackConfig, function(err, stats) {
    process.stdout.write(
      stats.toString({
        colors: true,
        modules: true,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n'
    );

    console.log(chalk.cyan('  Build complete.'));
  });
});
