// imports
const dotEnv = require('dotenv')
const fetch = require('node-fetch')

// config
dotEnv.config({ path: './config.env' })

// constants
const baseURI = `https://api.telegram.org/bot${process.env.bot_api_key}/getFile?file_id=<file_id>`

// api
const get = url => fetch(url).then(resp => resp.json())

const sendForCompression = (img, bot, msg) => {
    return get(`http://api.resmush.it/ws.php?img=${img}`)
    .then(image => {
        bot.sendMessage(msg.chat.id, 'Here is your compressed image...')
        bot.sendPhoto(msg.chat.id, image.dest)
    }).catch(error => console.log(error))
}

// functions
exports.getSentPicture = (fileID, bot, msg) => {
    return get(baseURI.replace('<file_id>', fileID))
    .then(resp => {
        const imgURL = `https://api.telegram.org/file/bot${process.env.bot_api_key}/${resp.result.file_path}`
        sendForCompression(imgURL, bot, msg)
    }).catch(error => console.log(error))
}
