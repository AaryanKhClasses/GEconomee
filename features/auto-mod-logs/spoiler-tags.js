const { MessageEmbed } = require('discord.js')

module.exports = (client) => {
    client.on('message', (message) => {

        if(!message.member.hasPermission('MANAGE_MESSAGES')){
            const channel = message.guild.channels.cache.find(ch => ch.name === 'mod-logs').id
            const channell = message.guild.channels.cache.get(channel)

            if(message.member.bot){
                return
            }

            if(message.content.includes(`||`)){
                message.delete()
                message.channel.send('<:emojino:779190801598775317> Spoiler tags are banned!')
                const embed = new MessageEmbed()
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setFooter('GEconomee')
                .setTimestamp()
                .setColor('RED')
                .setDescription(
                    `**Message sent by <@${message.author.id}> got deleted in <#${message.channel.id}>**\n` + 
                    `${message.content}`
                )
                .addFields(
                    {
                        name: 'Member ID',
                        value: message.author.id,
                    },
                    {
                        name: 'Reason',
                        value: 'Spolier Tags!'
                    }
                )
                channell.send(embed)
            }
        }else {
            return
        }
    })
}