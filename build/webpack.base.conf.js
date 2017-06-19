var webpack = require('webpack');
var path = require('path');
var vueLoaderConfig = require('./vue-loader.conf');

module.exports = {
    entry: {
        app: './src/main.js'
    },
    // entry: {
    //     'entry.1': '../entry.1.js',
    //     'entry.2': '../entry.2.js'
    // },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|vue)$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                },
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader'
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000
                    // name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    },
    node: {
        net: 'empty',
        dns: 'empty'
    }
}
