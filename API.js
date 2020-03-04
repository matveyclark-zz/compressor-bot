// imports
const dotEnv = require('dotenv')
const fetch = require('node-fetch')

// config
dotEnv.config({ path: './config.env' })

// constants
const baseURI = `https://api.telegram.org/bot${process.env.bot_api_key}/getFile?file_id=<file_id>`

// api
const get = url => fetch(url).then(resp => resp.json())

// functions
exports.getSentPicture = fileID => {
    return get(baseURI.replace('<file_id>', fileID))
    .then(resp => {
        console.log(`https://api.telegram.org/file/bot${process.env.bot_api_key}/${resp.result.file_path}`)
    })
}