var db = require('../config/db.js')
var mongoose = require('mongoose')
var UserSchema = require('../schema/user')

const User = mongoose.model('User', UserSchema)

const saveUserInfo = (info) => {
  User.create(info, (err) => {
    if (err) {
      return console.error(error)
    }
    console.log('save success')
  })
}

const getUserById = function *(id) {
  return yield User.findOne({
    id: id
  })
}

const getUserByName = function *(name) {
  console.log('--name', name)
  const userInfo = yield User.findOne({
    name: name
  })
  return userInfo
}

module.exports = {
  saveUserInfo,
  getUserById,
  getUserByName
}
