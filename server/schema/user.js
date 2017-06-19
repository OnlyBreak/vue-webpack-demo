var mongoose = require('mongoose')
var Schema = mongoose.Schema
var UserSchema = new Schema({
  id: Number,
  user_name: String,
  password: String
})

module.exports = UserSchema
