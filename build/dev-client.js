var hotClient = require('webpack-hot-middleware/client?noInfo=true')

hotClient.subscribe(event => {
    if (event.action === 'reload') {
        window.location.reload()
    }
})