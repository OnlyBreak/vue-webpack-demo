const utils = require('./utils');
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    loaders: utils.cssLoaders(true),
    postcss: [
      require('autoprefixer')({
        browsers: ['last 2 versions']
      })
    ]
}