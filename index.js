// constants
const TelegramBot = require('node-telegram-bot-api')
const API = require('./API')
const dotEnv = require('dotenv')

// dotEnv config
dotEnv.config({ path: './config.env' })

// creating the telegram bot
const bot = new TelegramBot(process.env.bot_api_key, { polling: true })

// configuring the bot befaviour
bot.on('message', msg => {
    bot.sendMessage(msg.chat.id, 'Thanks for the photo... Sending off for compression...')
    .then(() => {
        API.getSentPicture(msg.document.file_id)
    })
})

bot.on("polling_error", (err) => console.log(err));
