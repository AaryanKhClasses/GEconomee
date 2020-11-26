const Discord = require('discord.js')
const db = require('quick.db')
const ms = require('parse-ms')

module.exports = {
    commands: 'gamble',
    callback: async(message, args) => {
        const amount = parseInt(args[0])
        const result = Math.floor(Math.random() * 10)
        const balance = db.get(`account.${message.author.id}.balance`)

        if(!amount){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`<:emojino:779190801598775317> Please specify the number of GCoins to gamble first!`)
            .setColor('RED')
            .setFooter('GEconomee')
            .setTimestamp(new Date())
            return message.channel.send(embed)
        }
        if(isNaN(amount)){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`<:emojino:779190801598775317> Please specify a valid number of GCoins to gamble!`)
            .setColor('RED')
            .setFooter('GEconomee')
            .setTimestamp(new Date())
            return message.channel.send(embed)
        }
        if(amount > balance){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`<:emojino:779190801598775317> You don't have enough GCoins to gamble! Please check your wallet!`)
            .setColor('RED')
            .setFooter('GEconomee')
            .setTimestamp(new Date())
            return message.channel.send(embed)
        }

        if(amount <= 99){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`<:emojino:779190801598775317> You cannot gamble less than 100 GCoins!`)
            .setColor('RED')
            .setFooter('GEconomee')
            .setTimestamp(new Date())
            return message.channel.send(embed)
        }
        
        let cooldown = 25000
        let pad_zero = num => (num < 10 ? '0': '')
        let lastGamble = await db.get(`lastGamble.${message.author.id}`)

        if(lastGamble !== null && cooldown - (Date.now() - lastGamble) > 0){
            let timeObj = ms(cooldown - (Date.now() - lastGamble))
            let second = pad_zero(timeObj.second).padStart(2, '0')
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`<:emojino:779190801598775317> You are gambling too fast! Please wait **${second}** second(s) before gambling again!`)
            .setColor('RED')
            .setFooter('GEconomee')
            .setTimestamp(new Date())
            return message.channel.send(embed)
        }

        if(result < 5){
            await db.set(`lastGamble.${message.author.id}`, Date.now())
            await db.subtract(`account.${message.author.id}.balance`, amount)
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`<:emojino:779190801598775317> Oopsie! You lost this gamble along with your ${amount} GCoins! Better Luck next time!`)
            .setColor('RED')
            .setFooter('GEconomee')
            .setTimestamp(new Date())
            return message.channel.send(embed)
        } else if(result > 5){
            await db.set(`lastGamble.${message.author.id}`, Date.now())
            await db.add(`account.${message.author.id}.balance`, amount)
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`<:emojiyes:779190801392861224> Yay! You won the gamble with getting your GCoins doubled! Enjoy!`)
            .setColor('GREEN')
            .setFooter('GEconomee')
            .setTimestamp(new Date())
            return message.channel.send(embed)
        }
    }
}