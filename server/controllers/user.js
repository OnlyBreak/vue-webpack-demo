var User = require('../model/userModule')
const convert = require('koa-convert')

var jack = {
  id: '5'
}

// User.saveUserInfo(jack)

var getUserInfo = convert(function *(){
  var id = this.params.id
  var result = yield User.getUserById(id)

  this.body = result
})

module.exports = {
  getUserInfo
}
