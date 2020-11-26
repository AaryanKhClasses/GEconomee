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
    loadFeatures(client)
})

client.login(token)