require('module-alias/register')

const Discord = require('discord.js')
const client = new Discord.Client()
const { prefix, token } = require('@root/config.json')

const loadCommands = require('@root/commands/load-commands')
const loadFeatures = require('@root/features/load-features')

client.on('ready', () => {
    console.log('The Bot is Online!')
    client.user.setActivity(`${prefix}help`, {type: 'LISTENING'}).catch(console.error)

    loadCommands(client)
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