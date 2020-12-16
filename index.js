const Discord = require('discord.js')
const client = new Discord.Client()
const { prefix, token } = require('./config.json')

const loadCommands = require('./commands/load-commands')
const loadFeatures = require('./features/load-features')

const levelling = require('./features/levelling/levelling')

client.on('ready', () => {
    console.log('The Bot is Online!')
    client.user.setActivity(`${prefix}help`, {type: 'LISTENING'}).catch(console.error)

    loadCommands(client)
    levelling(client)
    // loadFeatures(client)
})

// client.on('message', async(message) => {
//     message.guild.channels.create('mod-logs', { type: text }) //mod-logs

//     //muted
//     let mutedRole = message.guild.roles.cache.find(r => r.name === 'Muted')
//     if(!mutedRole){
//         mutedRole = await message.guild.roles.create({
//             data: {
//                 name: 'Muted',
//                 color: '#000000',
//                 permissions: []
//             }}
//         )

//         message.guild.channels.cache.forEach(async(channel) => {
//             await channel.createOverwrite(mutedRole, {
//                 SEND_MESSAGES: false,
//                 MANAGE_MESSAGES: false,
//                 ADD_REACTIONS: false
//             })
//         })
//     }
// })

client.login(token)