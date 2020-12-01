const { MessageEmbed } = require("discord.js")

module.exports = {
    commands: 'unmute',
    cooldown: 3,
    callback: async(message, args) => {

        const channel = message.guild.channels.cache.find(ch => ch.name === 'mod-logs').id
        const channell = message.guild.channels.cache.get(channel)

        if(message.member.hasPermission('MANAGE_ROLES')){
            let reason = args.slice(1).join(' ')
            const user = message.mentions.members.first()
            if(!user){
                const embed = new MessageEmbed()
                .setDescription(`<:emojino:779190801598775317> Please mention someone to unmute!`)
                .setColor('RED')
                .setFooter('GEconomee')
                .setTimestamp()
                message.channel.send(embed)
            }

            let mutedRole = message.guild.roles.cache.find(r => r.name === 'Muted')
            if(!mutedRole){
                try{
                    mutedRole = await message.guild.roles.create({data: {
                        name: 'Muted',
                        color: '#000000',
                        permissions: []
                    }})
                    
                    message.guild.channels.cache.forEach(async(channel) => {
                        await channel.createOverwrite(mutedRole, {
                            SEND_MESSAGES: false,
                            MANAGE_MESSAGES: false,
                            ADD_REACTIONS: false
                        })
                    })
                } catch(e) {
                    console.log(e.stack)
                }
            } else {
                if(reason.length < 1) reason = 'No Reason Specified!'

                if(!user.hasPermission('MANAGE_GUILD')){
                    message.guild.member(user).roles.remove(mutedRole)

                    const embed = new MessageEmbed()
                    .setDescription(`<:emojiyes:779190801392861224> Successfully unmuted <@${user.id}>`)
                    .setColor("GREEN")
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
                            value: 'Unmute',
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