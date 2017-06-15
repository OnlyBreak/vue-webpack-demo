var db = require('../config/db.js')
var mongoose = require('mongoose')
var UserSchema = require('../schema/user')

var User = mongoose.model('User', UserSchema)

var saveUserInfo = (info) => {
  User.create(info, (err) => {
    if (err) {
      return console.error(error)
    }
    console.log('save success')
  })
}

var getUserById = function *(id) {
  return yield User.findOne({
    id: id
  })
}

module.exports = {
  saveUserInfo,
  getUserById
}
