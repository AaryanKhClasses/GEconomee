const { MessageEmbed } = require('discord.js')
const fs = require('fs')
const ms = require('ms')

module.exports = {
    commands: ['clear-warnings', 'cw'],
    cooldown: 3,
    callback: (message, args) => {

        const channel = message.guild.channels.cache.find(ch => ch.name === 'mod-logs').id
        const channell = message.guild.channels.cache.get(channel)

        if(message.member.hasPermission('MANAGE_GUILD')){
            let reason = args.slice(1).join(' ')
            let warns = JSON.parse(fs.readFileSync('commands/commands/moderation/warnings.json', 'utf-8'))
            const user = message.mentions.members.first()
            if(!user){
                const embed = new MessageEmbed()
                .setDescription(`<:emojino:779190801598775317> Please mention a member to clear warnings of!`)
                .setColor('RED')
                .setFooter('GEconomee')
                .setTimestamp()
                message.channel.send(embed)
            }

            if(!reason) reason = 'No Reason Specified!'

            if(!warns[`${user.id}, ${message.guild.id}`]){
                warns[`${user.id}, ${message.guild.id}`] = {
                    warns: 0
                }
            }

            if(warns[`${user.id}, ${message.guild.id}`].warns > 0){
                warns[`${user.id}, ${message.guild.id}`] = {
                    warns: 0
                }
                const embed = new MessageEmbed()
                .setDescription(`<:emojiyes:779190801392861224> The warnings of the member has been cleared!`)
                .setColor('GREEN')
                .setFooter('GEconomee')
                .setTimestamp()
                message.channel.send(embed)

                const logembed = new MessageEmbed()
                .setTitle('Mod Command Triggered!')
                .setColor('GREEN')
                .setFooter('GEconomee')
                .setTimestamp()
                .addFields(
                    {
                        name: 'Action',
                        value: 'Clear Warnings',
                    },
                    {
                        name: 'User',
                        value: `${user.user.tag} (<@${user.id}>)`,
                    },
                    {
                        name: 'Moderator',
                        value: `${message.author.tag} (<@${message.author.id}>)`,
                    },
                    {
                        name: 'Reason',
                        value: reason,
                    }
                )
                channell.send(logembed)

                fs.writeFile('commands/commands/moderation/warnings.json', JSON.stringify(warns), err => {
                    if(err) throw err
                })
            } else {
                const embed = new MessageEmbed()
                .setDescription(`<:emojino:779190801598775317> The member have no warnings to clear!`)
                .setColor('RED')
                .setFooter('GEconomee')
                .setTimestamp()
                message.channel.send(embed)
            }
            
        } else {
            const embed = new MessageEmbed()
            .setDescription(`<:emojino:779190801598775317> You don't have permissions to use this command!`)
            .setColor('RED')
            .setFooter('GEconomee')
            .setTimestamp()
            message.channel.send(embed)
        }
    }
}