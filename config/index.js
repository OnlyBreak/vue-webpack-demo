var path = require('path')

module.exports = {
  build: {
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist/'),
    assetsSubDirectory: 'static'
  },
  dev: {
    env: '"development"',
    proxyTable: {
      '/auth': {
        target: 'http://localhost:8889',
        changeOrigin: true
      },
      '/api': {
        target: 'http://localhost:8889',
        changeOrigin: true
      }
    }
  }
}
