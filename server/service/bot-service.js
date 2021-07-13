const BotDto = require('../dtos/bot-dto')
const BotModel = require('../models/bot-model')

class BotService {
  async createBot(options) {
    const bot = await BotModel.create({...options})
    const botDto = new BotDto(bot)
    return botDto
  }
}

module.exports = new BotService()
