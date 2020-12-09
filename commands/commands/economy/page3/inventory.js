const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    commands: ['inv', 'inventory'],
    cooldown: 5,
    callback: async(message) => {
        const items = await db.fetch(`inventory.${message.author.id}`)
        if(items === null) items = 'No Items, Buy Items at **!!store**!'

        const embed = new MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        .addField('Inventory', items)
        .setColor('RANDOM')
        .setFooter('GEconomee')
        .setTimestamp()
        message.channel.send(embed)
    }
}