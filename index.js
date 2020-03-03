// constants
const TelegramBot = require('node-telegram-bot-api')
const ogs = require('open-graph-scraper')
const dotEnv = require('dotenv')

// dotEnv config
dotEnv.config({ path: './config.env' })

// creating the telegram bot
const bot = new TelegramBot(process.env.bot_api_key, { polling: true })

// configuring the bot befaviour
bot.on('photo', msg => {
    bot.sendMessage(msg.chat.id, 'Thanks for the photo... Sending off for compression...')
})
