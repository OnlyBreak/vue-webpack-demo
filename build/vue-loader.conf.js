var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    loaders: {
        css: ExtractTextPlugin.extract(['css-loader'])
    },
    postcss: [
      require('autoprefixer')({
        browsers: ['last 2 versions']
      })
    ]
}