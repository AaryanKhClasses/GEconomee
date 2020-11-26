const Discord = require('discord.js')
const db = require('quick.db')
let ms = require('parse-ms')

module.exports = {
    commands: 'daily',
    callback: async (message) => {
        let pad_zero =  num => (num < 10 ? '0': '') + num
        let cooldown = 8.64e+7

        let min = 500
        let max = 1300
        let amount = Math.floor(Math.random() * (max - min + 1)) + min

        let lastDaily = await db.get(`lastDaily.${message.author.id}`)
        let balance = await db.get(`account.${message.author.id}.balance`)
        try{
            if(lastDaily !== null && cooldown - (Date.now() - lastDaily) > 0){
                let timeObj = ms(cooldown - (Date.now() - lastDaily))

                let hours = pad_zero(timeObj.hours).padStart(2, '0')
                    mins = pad_zero(timeObj.minutes).padStart(2, '0')
                    secs = pad_zero(timeObj.seconds).padStart(2, '0')

                let finalTime = `**${hours}:${mins}:${secs}**`
                const embed = new Discord.MessageEmbed()
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setDescription(`<:emojino:779190801598775317> Sorry! You have already claimed your dailies. Please wait until ${finalTime} to do daily again!`)
                .setColor('RED')
                .setFooter('GEconomee')
                .setTimestamp(new Date())
                return message.channel.send(embed)
            } else {
                db.set(`lastDaily.${message.author.id}`, Date.now())
                db.add(`account.${message.author.id}.balance`, amount)
                const embed = new Discord.MessageEmbed()
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setDescription(`<:emojiyes:779190801392861224> Yay! You have claimed your dailies and you got ${amount} GCoins!\nYou can claim your dailies again in 24 hours!`)
                .setColor('GREEN')
                .setFooter('GEconomee')
                .setTimestamp(new Date())
                return message.channel.send(embed)
                
            }
        } catch(error) {
            console.log(error)
        }
    }
}