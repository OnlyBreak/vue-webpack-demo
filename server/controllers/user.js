const user = require('../model/user')
const convert = require('koa-convert')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
var salt = bcrypt.genSaltSync(10)

// let jack = {
//   id: 0,
//   user_name: 'zhang',
//   password: bcrypt.hashSync('1', salt)
// }

// user.saveUserInfo(jack)

const getUserInfo = function *() {
  let id = this.params.id
  let result = yield user.getUserById(id)

  this.body = result
}

const postUserAuth = function *() {
  const data = this.request.body
  const userInfo = yield user.getUserByName(data.name)

  if (userInfo != null) {
    if (data.password != userInfo.password) {
      this.body = {
        success: false,
        info: '密码错误！'
      }
    } else {
      const userToken = {
        name: userInfo.user_name,
        password: userInfo.password
      }
      const secret = 'vue-koa-demo'
      const token = jwt.sign(userToken, secret)

      this.body = {
        success: true,
        token: token
      }
    }
  } else {
    this.body = {
      success: false,
      info: '用户不存在！'
    }
  }
}

module.exports = {
  getUserInfo,
  postUserAuth
}
