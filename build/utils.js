const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.cssLoaders = (options) => {
    const cssLoader = {
        loader: 'css-loader'
    }

    // generate loader string to be used with extract text plugin
    const generateLoaders = (loader) => {
        const loaders = [cssLoader]
        if (loader) {
            loaders.push(loader + '-loader')
        }

        if (options) {
            return ExtractTextPlugin.extract({
                use: loaders
            })
        } else {
            return ['vue-style-loader'].concat(loaders)
        }
    }

    return {
        css: generateLoaders()
    }
}
