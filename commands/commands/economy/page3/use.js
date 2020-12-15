const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    commands: 'use',
    cooldown: 10,
    callback: async(message, args) => {
        let usingItem = args.join(' ')
        let items = await db.fetch(`inventory.${user.id}`)

        if(!usingItem){
            const embed = new MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`<:emojino:779190801598775317> Please Specify an Item to use!`)
            .setColor('RED')
            .setFooter('GEconomee')
            .setTimestamp()
            message.channel.send(embed)
        }

        

    }
}
