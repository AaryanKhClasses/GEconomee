const Discord = require('discord.js')
const db = require('quick.db')

module.exports = {
    commands: ['pay', 'give-gcoins', 'transfer'],
    cooldown: 10,
    callback: (message, args, client) => {
        let user
        if(message.mentions.users.first()){
            user = message.mentions.users.first()
        } else if(args[1]){
            user = message.guild.members.cache.get(args[0]).user
        }

        let balance = db.get(`account.${message.author.id}.balance`)

        if(!user){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`<:emojino:779190801598775317> Please specify a person to give GCoins to!`)
            .setColor('RED')
            .setFooter('GEconomee')
            .setTimestamp(new Date())
            return message.channel.send(embed)
        }
        if(user.bot || user === client.user){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`<:emojino:779190801598775317> Sorry! You cannot give GCoins to bots!`)
            .setColor('RED')
            .setFooter('GEconomee')
            .setTimestamp(new Date())
            return message.channel.send(embed)
        }
        if(user.id === message.author.id || user === message.author){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`<:emojino:779190801598775317> Sorry! You cannot give GCoins to yourself! Why would you wanna do that?`)
            .setColor('RED')
            .setFooter('GEconomee')
            .setTimestamp(new Date())
            return message.channel.send(embed)
        }

        let amount = parseInt(args[1])
        if(!amount){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`<:emojino:779190801598775317> Please specify the number of GCoins you want to give.`)
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

        if(!balance || balance === 0){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`<:emojino:779190801598775317> Check your wallet first! You don't have any GCoins`)
            .setColor('RED')
            .setFooter('GEconomee')
            .setTimestamp(new Date())
            return message.channel.send(embed)
        }
        if(amount > balance){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`<:emojino:779190801598775317> You don't have that much GCoins to give!`)
            .setColor('RED')
            .setFooter('GEconomee')
            .setTimestamp(new Date())
            return message.channel.send(embed)
        }
        if(amount < 1){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`<:emojino:779190801598775317> Sorry! You cannot give less than 1 GCoins! Why would you wanna do that?`)
            .setColor('RED')
            .setFooter('GEconomee')
            .setTimestamp(new Date())
            return message.channel.send(embed)
        }

        db.add(`account.${user.id}.balance`, amount)
        db.subtract(`account.${message.author.id}.balance`, amount)
        const embed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        .setDescription(`<:emojiyes:779190801392861224> Yay! You have given ${amount} GCoin(s) to <@${user.id}>.Now they can finally buy a pizza!`)
        .setColor('GREEN')
        .setFooter('GEconomee')
        .setTimestamp(new Date())
        return message.channel.send(embed)
    }
}