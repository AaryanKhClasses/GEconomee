const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    commands: ['balance', 'bal'],
    cooldown: 10,
    callback: (message, args, client) => {
        let user
        if(message.mentions.users.first()){
            user = message.mentions.users.first()
        } else if(args[0]){
            user = message.guild.members.cache.get(args[0]).user
        } else {
            user = message.author
        }

        if(user.bot || user === client.user){
            const embed = new MessageEmbed()
            .setDescription(`<:emojino:779190801598775317> Sorry! The mentioned user is a bot and bots cannot have GCoins!`)
            .setColor('RED')
            .setFooter('GEconomee')
            .setTimestamp(new Date())
            return message.channel.send(embed)
        }

        let balance = db.get(`account.${user.id}.balance`)
        if(!balance) balance = 0
        else balance = balance

        const embed = new MessageEmbed()
        .setAuthor(`${user.tag}`, user.displayAvatarURL())
        .setDescription(`<:emojiyes:779190801392861224> **GCoins balance:** ${(balance).toLocaleString()} GCoins!`)
        .setColor('GREEN')
        .setFooter('GEconomee')
        .setTimestamp(new Date())
        return message.channel.send(embed)
    }
}