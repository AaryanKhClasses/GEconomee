const { MessageEmbed } = require('discord.js')
const { bannedWords } = require('../../json.json')

module.exports = (client) => {
    client.on('message', (message) => {
        if(!message.member.hasPermission('MANAGE_MESSAGES')){
            const channel = message.guild.channels.cache.find(ch => ch.name === 'mod-logs').id
            const channell = message.guild.channels.cache.get(channel)

            if(message.member.user.bot){
                return
            }

            if(message.content.includes([...bannedWords])){
                message.delete()
                message.channel.send('<:emojino:779190801598775317> That word is banned!')
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
                        value: 'Banned Word!'
                    }
                )
                channell.send(embed)
            }
        }else{
            return
        }
    })
}