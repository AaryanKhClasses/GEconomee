const { MessageEmbed } = require("discord.js")
const db = require('quick.db')

module.exports = {
    commands: 'buy',
    cooldown: 5,
    callback: async(message, args) => {
        const item = args.join(' ')
        const balance = await db.get(`account.${message.author.id}.balance`)
        const items = await db.fetch(`inventory.${message.author.id}.${{ items: [] }}`)
        if(item === 'Test Item1'){

            if(balance < 500) {
                const embed = new MessageEmbed()
                .setDescription(`<:emojino:779190801598775317> You do not have enough GCoins to buy **${item}**! Check your wallet or withdraw from bank!`)
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setColor('RED')
                .setFooter('GEconomee')
                .setTimestamp()
                message.channel.send(embed)
            } else {
                await db.subtract(`account.${message.author.id}.balance`, 500)
                await db.push(`inventory.${message.author.id}`, 'Test Item1')
                const embed = new MessageEmbed()
                .setDescription(`<:emojiyes:779190801392861224> Successfully purchased **${item}**, it costed you 500 GCoins!`)
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setColor('GREEN')
                .setFooter('GEconomee')
                .setTimestamp()
                message.channel.send(embed)
            }

        } else if(item === 'Test Item2'){

            if(balance < 1000) {
                const embed = new MessageEmbed()
                .setDescription(`<:emojino:779190801598775317> You do not have enough GCoins to buy **${item}**! Check your wallet or withdraw from bank!`)
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setColor('RED')
                .setFooter('GEconomee')
                .setTimestamp()
                message.channel.send(embed)
            } else {
                await db.subtract(`account.${message.author.id}.balance`, 1000)
                await db.push(`inventory.${message.author.id}`, 'Test Item2')
                const embed = new MessageEmbed()
                .setDescription(`<:emojiyes:779190801392861224> Successfully purchased **${item}**, it costed you 1000 GCoins!`)
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setColor('GREEN')
                .setFooter('GEconomee')
                .setTimestamp()
                message.channel.send(embed)
            }

        } else if(!item){
            const embed = new MessageEmbed()
            .setDescription(`<:emojino:779190801598775317> Please specify an item to purchase! See **!!store** for all items!`)
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setColor('RED')
            .setFooter('GEconomee')
            .setTimestamp()
            message.channel.send(embed)
        } else {
            const embed = new MessageEmbed()
            .setDescription(`<:emojino:779190801598775317> There is currently no item in the shop named **${item}**`)
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setColor('RED')
            .setFooter('GEconomee')
            .setTimestamp()
            message.channel.send(embed)
        }
    }
}