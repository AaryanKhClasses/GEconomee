const db = require('quick.db')
const { MessageEmbed } = require('discord.js')

module.exports = {
    commands: 'pet',
    cooldown: 10,
    callback: (message, args, client) => {
        let user
        if(message.mentions.users.first()){
            user = message.mentions.users.first()
        } else {
            user = message.author
        }

        if(user.bot || user === client.user){
            const embed = new MessageEmbed()
            .setDescription(`<:emojino:779190801598775317> Sorry! The mentioned user is a bot and bots cannot have Pets!`)
            .setColor('RED')
            .setFooter('GEconomee')
            .setTimestamp(new Date())
            return message.channel.send(embed)
        }

        let pet = db.get(`pet.${user.id}`)
        if(!pet) pet = `No Pet Yet! Tell them to do **!!claim-pet**`
        else pet = pet

        const embed = new MessageEmbed()
        .setAuthor(`${user.tag}`, user.displayAvatarURL())
        .setDescription(`<:emojiyes:779190801392861224> **Pet:** ${pet}`)
        .setColor('GREEN')
        .setFooter('GEconomee')
        .setTimestamp(new Date())
        return message.channel.send(embed)
    }
}