var mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/userinfo')

module.exports = {
  mongoDB: mongoose.connection
}
