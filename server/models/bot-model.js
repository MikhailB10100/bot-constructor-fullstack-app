const {Schema, model} = require('mongoose')

const BotSchema = new Schema({
  users: {type: Array},
  name: {type: String},
  token: {type: String, required: true},
  confResponse: {type: String, required: true},
  commands: {type: Array}
})

module.exports = model('Bot', BotSchema)