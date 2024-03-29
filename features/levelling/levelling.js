const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = (client) => {
    client.on('message', (message) => {
        if(message.content.startsWith('!!')) return
        const randomNumber = Math.floor(Math.random() * 10) + 15
        db.add(`levelling.xp.${message.author.id}`, randomNumber)
        db.add(`levelling.xpTotal.${message.author.id}`, randomNumber)
        var level = db.get(`levelling.level.${message.author.id}`) || 1
        var xp = db.get(`levelling.xp.${message.author.id}`)
        var xpNeeded = level * 512
        if(xpNeeded < xp){
            db.add(`levelling.level.${message.author.id}`, 1)
            let newLevel = db.get(`levelling.level.${message.author.id}`)
            db.subtract(`levelling.xp.${message.author.id}`, xpNeeded)
            let min = 300
            let max = 500
            var ran = Math.floor(Math.random() * (max - min + 1)) + min
            db.add(`account.${message.author.id}.balance`, newLevel * ran)
            const embed = new MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`<:emojiyes:779190801392861224> Yay **${message.author.tag}**! You levelled up to level **${newLevel}**!\nYou got **${ran}** as a levelling up Bonus`)
            .setColor('GREEN')
            .setFooter('GEconomee')
            .setTimestamp()
            message.channel.send(embed)
            console.log(newLevel)
        }
    })
}