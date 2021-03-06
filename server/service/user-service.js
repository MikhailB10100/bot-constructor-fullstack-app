const UserModel = require('../models/user-model')
const bcrypt = require('bcrypt')
const tokenService = require('./token-service')
const UserDto = require('../dtos/uset-dto')
const ApiError = require('../exceptions/api-error')
const botService = require('./bot-service')

class UserService {
  async registration(username, password) {
    const candidate = await UserModel.findOne({username})
    if (candidate) {
      throw ApiError.BadRequest(`Username '${username}' is already taken.`)
    }
    const hashPassword = await bcrypt.hash(password, 3)
    const user = await UserModel.create({username: username.trim(), password: hashPassword})

    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({...userDto})
    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return {...tokens, user: userDto}
  }

  async login(username, password) {
    const user = await UserModel.findOne({username})
    if (!user) {
      throw ApiError.BadRequest('The user was not found')
    }
    const isPassEquals = await bcrypt.compare(password, user.password)
    if (!isPassEquals) {
      throw ApiError.BadRequest('Incorrect password')
    }
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({...userDto})

    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return {...tokens, user: userDto}
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken)
    return token
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnathorizedError()
    }
    const userData = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await tokenService.findToken(refreshToken)
    if (!userData || !tokenFromDb) {
      throw ApiError.UnathorizedError()
    }
    const user = await UserModel.findById(userData.id)
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({...userDto})

    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return {...tokens, user: userDto}
  }

  async createBot(options) {
    const bot = await botService.createBot(options)
    return bot
  }
}

module.exports = new UserService()