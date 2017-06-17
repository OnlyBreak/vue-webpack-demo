const user = require('../model/user')
const convert = require('koa-convert')
const jwt = require('koa-jwt')

let jack = {
  id: '5'
}

// User.saveUserInfo(jack)

const getUserInfo = function *() {
  let id = this.params.id
  let result = yield user.getUserById(id)

  this.body = result
}

const postUserAuth = function *() {
  const data = this.request.body
  const userInfo = yield user.getUserByName(data.name)
  console.log('--userInfo', userInfo)
  if (userInfo != null) {
    if (userInfo.password != data.password) {
      this.body = {
        success: false,
        info: '密码错误！'
      }
    } else {
      const userToken = {
        name: userInfo.name,
        id: userInfo.id
      }
      console.log('--userToken', userToken)
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
