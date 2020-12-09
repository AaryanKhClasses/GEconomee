const Discord = require('discord.js')
const db = require('quick.db')

module.exports = {
    commands: 'add-gcoins',
    callback: (message, args) => {
        if(message.author.id === '639352891018051584'){
            let user
            let amount

            if(message.mentions.users.first()){
                user = message.mentions.users.first()
                amount = parseInt(args[1])
            } else{
                user = message.author
                amount = parseInt(args[0])
            }
            

            db.add(`account.${user.id}.balance`, amount)
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`Added!`)
            .setColor('GREEN')
            .setFooter('GEconomee')
            .setTimestamp(new Date())
            return message.channel.send(embed)
        } else {
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`You need to be the owner to use this command!`)
            .setColor('RED')
            .setFooter('GEconomee')
            .setTimestamp(new Date())
            return message.channel.send(embed)
        }
        
    }
}