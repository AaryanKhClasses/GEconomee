const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    commands : 'claim-pet',
    callback: (message) => {
        const pet = db.fetch(`pet.${message.author.id}`)
        if(!pet){
            db.push(`pet.${message.author.id}`, ':cat: Cat! (Tier1 Pet)\n"Meow...." says the Cat!')
            const embed = new MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setTitle('Claim Pet Tier1')
            .setDescription('WoW! This is the journey of you and your pet! You got a Cat as a Pet!')
            .setColor('GREEN')
            .setFooter('GEconomee')
            .setTimestamp()
            message.channel.send(embed)
        } else{
            const embed = new MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setTitle('Claim Pet Tier1')
            .setDescription('Oops! Looks like you already have a pet! You can buy higher tier pets and other items at **!!store**')
            .setColor('RED')
            .setFooter('GEconomee')
            .setTimestamp()
            message.channel.send(embed)
        }
    }
}