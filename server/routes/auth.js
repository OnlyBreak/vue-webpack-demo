var auth = require('../controllers/user')
var router = require('koa-router')()

router.get('/user/:id', auth.getUserInfo)

module.exports = router
