const utils = require('./utils');
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
    loaders: utils.cssLoaders(isProduction),
    postcss: [
      require('autoprefixer')({
        browsers: ['last 2 versions']
      })
    ]
}