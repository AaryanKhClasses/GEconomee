const db = require('quick.db')
const Discord = require('discord.js')

module.exports = {
    commands: ['with', 'withdraw'],
    cooldown: 5,
    callback: (message, args) => {
        let bank = db.get(`account.${message.author.id}.bank`)

        let amount = parseInt(args[0])
        if(!amount){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`<:emojino:779190801598775317> Please specify the number of GCoins you want to withdraw.`)
            .setColor('RED')
            .setFooter('GEconomee')
            .setTimestamp(new Date())
            return message.channel.send(embed)
        }
        if(isNaN(amount)){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`<:emojino:779190801598775317> That is an invaild number of GCoins.`)
            .setColor('RED')
            .setFooter('GEconomee')
            .setTimestamp(new Date())
            return message.channel.send(embed)
        }

        if(!bank || bank === 0){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`<:emojino:779190801598775317> Check your bank first! You don't have any GCoins`)
            .setColor('RED')
            .setFooter('GEconomee')
            .setTimestamp(new Date())
            return message.channel.send(embed)
        }
        if(amount > bank){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`<:emojino:779190801598775317> You don't have that much GCoins to withdraw!`)
            .setColor('RED')
            .setFooter('GEconomee')
            .setTimestamp(new Date())
            return message.channel.send(embed)
        }
        if(amount < 1){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`<:emojino:779190801598775317> Sorry! You cannot withdraw less than 1 GCoins! Why would you wanna do that?`)
            .setColor('RED')
            .setFooter('GEconomee')
            .setTimestamp(new Date())
            return message.channel.send(embed)
        }

        db.add(`account.${message.author.id}.balance`, amount)
        db.subtract(`account.${message.author.id}.bank`, amount)
        const embed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        .setDescription(`<:emojiyes:779190801392861224> Successfully withdrawn ${amount} GCoins!`)
        .setColor('GREEN')
        .setFooter('GEconomee')
        .setTimestamp(new Date())
        return message.channel.send(embed)
    }
}