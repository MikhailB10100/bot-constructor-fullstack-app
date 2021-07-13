module.exports = class BotDto {
  users
  name
  id
  commands

  constructor(model) {
    this.users = model.users
    this.name = model.name
    this.id = model._id
    this.commands = model.commands
  }
}