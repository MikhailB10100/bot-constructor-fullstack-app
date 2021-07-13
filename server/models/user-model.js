const {Schema, model} = require('mongoose')

const UserSchema = new Schema({
  username: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  bots: {type: Array, default: []}
})

module.exports = model('User', UserSchema)