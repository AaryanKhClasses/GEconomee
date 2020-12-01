const { MessageEmbed } = require('discord.js')
const fs = require('fs')
const ms = require('ms')

module.exports = { 
    commands: ['list-warnings', 'lw'],
    cooldown: 3,
    callback: (message) => {
        let warns = JSON.parse(fs.readFileSync('commands/commands/moderation/warnings.json', 'utf-8'))
        const user = message.mentions.members.first()
        if(!user){
            const embed = new MessageEmbed()
            .setDescription(`<:emojino:779190801598775317> Please mention a member to list-warnings of!`)
            .setColor('RED')
            .setFooter('GEconomee')
            .setTimestamp()
            message.channel.send(embed)
        }

        if(!warns[`${user.id}`]) warns[user.id] = {
            warns: 0
        }

        const embed = new MessageEmbed()
        .setDescription(`**Number of warnings of member _${user.user.username}:_** ${warns[`${user.id}, ${message.guild.id}`].warns}`)
        .setColor('GREEN')
        .setFooter('GEconomee')
        .setTimestamp()
        message.channel.send(embed)
    }
}