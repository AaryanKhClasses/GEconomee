const { MessageEmbed } = require("discord.js")

module.exports = {
    commands: 'unban',
    cooldown: 3,
    callback: (message, args, client) => {
        const channel = message.guild.channels.cache.find(ch => ch.name === 'mod-logs').id
        const channell = message.guild.channels.cache.get(channel)

        if(message.member.hasPermission('BAN_MEMBERS')){
            const user = args[0]
            let reason = args.slice(1).join(' ')
            if(reason.length < 1) reason = 'No Reason Specified!'
            if(!user){
                const embed = new MessageEmbed()
                .setDescription(`<:emojino:779190801598775317> Please specify a valid UserID`)
                .setColor('RED')
                .setFooter('GEconomee')
                .setTimestamp()
                message.channel.send(embed)
            }

            message.guild.members.unban(user, reason).catch(e => {
                if(e){
                    const embed = new MessageEmbed()
                    .setDescription(`<:emojino:779190801598775317> ${user} isn't banned and thus cannot be unbanned!`)
                    .setColor('RED')
                    .setFooter('GEconomee')
                    .setTimestamp()
                    message.channel.send(embed)
                } else {
                    const embed = new MessageEmbed()
                    .setDescription(`<:emojiyes:779190801392861224> Successfully unbanned ${user}!`)
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
                            value: 'Unban',
                        },
                        {
                            name: 'User',
                            value: 'hi, this wrks'//`${user.user.tag} (<@${user.id}>)`,
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
                }
            }) 
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
