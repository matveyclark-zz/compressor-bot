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
    if(msg.photo) {
        bot.sendMessage(msg.chat.id, '💥 Please send the image as a file to avoid loss of quality! 💥')
    } else {
        if(msg.document.file_size > 5000000) {
            bot.sendMessage(msg.chat.id, 'The image must be smaller than 5mb 😢')
        } else {
            bot.sendMessage(msg.chat.id, 'Thanks for the photo ♥️')
            .then(() => {
                bot.sendMessage(msg.chat.id, 'Sending the photo off for compression! 🤖')
                API.getSentPicture(msg.document.file_id, bot, msg)
            })
        }
    }
})

bot.on("polling_error", (err) => console.log(err));
