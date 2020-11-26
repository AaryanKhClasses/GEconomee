const db = require('quick.db')
const ms = require('parse-ms')
const Discord = require('discord.js')

module.exports = {
    commands: 'rob',
    callback: async(message, args, client) => {
        let user
        if(message.mentions.users.first()){
            user = message.mentions.users.first()
        } else if(args[0]){
            user = message.guild.members.cache.get(args[0]).user
        }

        let pad_zero =  num => (num < 10 ? '0': '') + num
        let cooldown = 8.64e+7
        let result = Math.floor(Math.random() * 10)

        let lastRob = await db.get(`lastRob.${message.author.id}`)

        if(!user){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`<:emojino:779190801598775317> Please Specify a person to rob!`)
            .setColor('RED')
            .setFooter('GEconomee')
            .setTimestamp(new Date())
            return message.channel.send(embed)
        } else if(user === message.author){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`<:emojino:779190801598775317>You cant rob yourselves! Why do you wanna do that?`)
            .setColor('RED')
            .setFooter('GEconomee')
            .setTimestamp(new Date())
            return message.channel.send(embed)
        }else if(user.bot || user === client.user){
            const embed = new Discord.MessageEmbed()
            .setDescription(`<:emojino:779190801598775317> Sorry! The mentioned user is a bot and you cant rob bots for GCoins!`)
            .setColor('RED')
            .setFooter('GEconomee')
            .setTimestamp(new Date())
            return message.channel.send(embed)
        }else {
            try{
                if(lastRob !== null && cooldown - (Date.now() - lastRob) > 0){
                    let timeObj = ms(cooldown - (Date.now() - lastRob))
    
                    let hours = pad_zero(timeObj.hours).padStart(2, '0')
                        mins = pad_zero(timeObj.minutes).padStart(2, '0')
                        secs = pad_zero(timeObj.seconds).padStart(2, '0')
    
                    let finalTime = `**${hours}:${mins}:${secs}**`
                    const embed = new Discord.MessageEmbed()
                    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                    .setDescription(`<:emojino:779190801598775317> Sorry! You have already robbed someone / attempted to rob someone. Please wait until ${finalTime} to rob again!`)
                    .setColor('RED')
                    .setFooter('GEconomee')
                    .setTimestamp(new Date())
                    return message.channel.send(embed)
                } else{
                    if(result < 4.5){
                        db.set(`lastRob.${message.author.id}`, Date.now())
                        db.add(`account.${message.author.id}.balance`, 1000)
                        db.subtract(`account.${user.id}.balance`, 1000)
                        const embed = new Discord.MessageEmbed()
                        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                        .setDescription(`<:emojiyes:779190801392861224> You successfully robbed ${user.username}! You got 1000 GCoins!`)
                        .setColor('GREEN')
                        .setFooter('GEconomee')
                        .setTimestamp(new Date())
                        return message.channel.send(embed)
                    } 
                     if(result > 5.5){
                        db.set(`lastRob.${message.author.id}`, Date.now())
                        db.subtract(`account.${message.author.id}.balance`, 1000)
                        db.add(`account.${user.id}.balance`, 500)
                        const embed = new Discord.MessageEmbed()
                        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                        .setDescription(`<:emojino:779190801598775317>You got caught while robbing ${user.username}! You lost 1000 coins!`)
                        .setColor('RED')
                        .setFooter('GEconomee')
                        .setTimestamp(new Date())
                        return message.channel.send(embed)
                    }
                }
            } catch(error){
                console.log(error)
            }
        }
    }
}