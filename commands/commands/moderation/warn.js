const { MessageEmbed } = require('discord.js')
const fs = require('fs')
const ms = require('ms')

module.exports = {
    commands: 'warn',
    cooldown: 3,
    callback: (message, args) => {

        const channel = message.guild.channels.cache.find(ch => ch.name === 'mod-logs').id
        const channell = message.guild.channels.cache.get(channel)

        if(message.member.hasPermission('MANAGE_GUILD')){
            let reason = args.slice(1).join(' ')
            const user = message.mentions.members.first()
            let warns = JSON.parse(fs.readFileSync('commands/commands/moderation/warnings.json', 'utf-8'))

            if(!user){
                const embed = new MessageEmbed()
                .setDescription(`<:emojino:779190801598775317> Please mention a member to warn!`)
                .setColor('RED')
                .setFooter('GEconomee')
                .setTimestamp()
                message.channel.send(embed)
            }

            if(reason.length < 1) reason = 'No Reason Supplied!'

            if(!warns[`${user.id}, ${message.guild.id}`]) warns[`${user.id}, ${message.guild.id}`] = {
                warns: 0
            }

            warns[`${user.id}, ${message.guild.id}`].warns++

            fs.writeFile('commands/commands/moderation/warnings.json', JSON.stringify(warns), err => {
                if(err) throw err
            })

            const embed = new MessageEmbed()
            .setDescription(`<:emojiyes:779190801392861224> The member has been warned!`)
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
                    value: 'Warn',
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

            if(warns[`${user.id}, ${message.guild.id}`].warns == 2){
                const mutedRole = message.guild.roles.cache.find(r => r.name === 'Muted')
                const mutedTime = '60s'

                message.guild.member(user).roles.add(mutedRole)
                const mEmbed = new MessageEmbed()
                .setDescription(`<:emojiyes:779190801392861224> The member had 2 warns and is muted temporarily!`)
                .setColor('GREEN')
                .setFooter('GEconomee')
                .setTimestamp()
                message.channel.send(mEmbed)

                setTimeout(function(){
                    message.guild.member(user).roles.remove(mutedRole)
                }, ms(mutedTime));
            }

            if(warns[`${user.id}, ${message.guild.id}`].warns == 5){
                message.guild.member(user).kick('5 Warns by GEconomee!')
                const kEmbed = new MessageEmbed()
                .setDescription(`<:emojiyes:779190801392861224> The member had 5 warns and is kicked from the server!`)
                .setColor('GREEN')
                .setFooter('GEconomee')
                .setTimestamp()
                message.channel.send(kEmbed)
            }

            if(warns[`${user.id}, ${message.guild.id}`].warns == 10){
                message.guild.member(user).ban('10 Warns by GEconomee!')
                const bEmbed = new MessageEmbed()
                .setDescription(`<:emojiyes:779190801392861224> The member had 10 warns and is banned from the server!`)
                .setColor('GREEN')
                .setFooter('GEconomee')
                .setTimestamp()
                message.channel.send(bEmbed)
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