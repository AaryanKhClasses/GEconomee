const Discord = require("discord.js")
const client = new Discord.Client()
const { prefix } = require('@root/config.json')
const { version } = require('@root/package.json')

function uptime(time) {
    let Seconds = Math.floor(time / 1000)
    const Days = Math.floor(Seconds / 86400)
    Seconds %= 86400
    const Hours = Math.floor(Seconds / 3600)
    Seconds %= 3600
    const Minutes = Math.floor(Seconds / 60)
    const seconds = Math.floor(Seconds % 60)
    return [Days, Hours, Minutes, seconds]
}

module.exports = {
    commands: 'info',
    cooldown: 10,
    callback: (message) => {
        const Uptime = uptime(client.uptime)
        const embed = new Discord.MessageEmbed()
        .setTitle(`Info for GEconomee`)
        .setColor('GREEN')
        .setTimestamp(new Date())
        .setFooter('GEconomee')
        .addFields(
            {
                name: 'Developer',
                value: 'AaryanKh#4532',
                inline: true,
            },
            {
                name: 'Library',
                value: 'Discord.JS',
                inline: true,
            },
            {
                name: 'Version',
                value: version,
                inline: true,
            },
            {
                name: 'Commands',
                value: `23`,
                inline: true,
            },
            {
                name: 'Prefix',
                value: `${prefix}help`,
                inline: true,
            },
            {
                name: 'Invite',
                value: '[Invite me to your server!](https://discord.com/oauth2/authorize?client_id=781006900690157642&scope=bot&permissions=8)',
            },
            {
                name: 'Support',
                value: '[Join the Support Server](https://discord.io/everythinbot)',
            },
            {
                name: 'Uptime',
                value: `${Uptime[0]} days ${Uptime[1]} hours ${Uptime[2]} minutes ${Uptime[3]} Seconds`
            }
        )
        message.channel.send(embed)
    }
}