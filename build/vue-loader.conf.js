var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    module: {
        rules: [
          {
            test: /\.sass$/,
            use: [{
                loader: 'css-loader'
            }, {
                loader: 'sass-loader'
            }]
          }
        ]
    },
    postcss: [
      require('autoprefixer')({
        browsers: ['last 2 versions']
      })
    ]
}