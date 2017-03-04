var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    module: {
        rules: [
          {
            test: /\.css$/,
            use: ExtractTextPlugin.extract(['css-loader'])
          }
        ]
    },
    postcss: [
      require('autoprefixer')({
        browsers: ['last 2 versions']
      })
    ]
}