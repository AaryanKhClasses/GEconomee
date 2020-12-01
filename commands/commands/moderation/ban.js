const { MessageEmbed } = require("discord.js")

module.exports = {
    commands: 'ban',
    cooldown: 3,
    callback: (message, args) => {
        const channel = message.guild.channels.cache.find(ch => ch.name === 'mod-logs').id
        const channell = message.guild.channels.cache.get(channel)

        if(message.member.hasPermission('BAN_MEMBERS')){
            let reason = args.slice(1).join(' ')

            const user = message.mentions.members.first()
            if(!user){
                const embed = new MessageEmbed()
                .setDescription(`<:emojino:779190801598775317> Please mention a member to ban!`)
                .setColor('RED')
                .setFooter('GEconomee')
                .setTimestamp()
                message.channel.send(embed)
            }

            if(!reason) reason = 'No Reason Specified!'
            
            if(user.hasPermission('MANAGE_GUILD')){
                const embed = new MessageEmbed()
                .setDescription(`<:emojino:779190801598775317> That user is a mod/admin! I can't ban them!`)
                .setColor('RED')
                .setFooter('GEconomee')
                .setTimestamp()
                message.channel.send(embed)
            } else {
                message.guild.members.ban(user.id, {days: 7, reason: reason})
                const embed = new MessageEmbed()
                .setDescription(`<:emojiyes:779190801392861224> Successfully banned <@${user.id}>!`)
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
                        value: 'Ban',
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