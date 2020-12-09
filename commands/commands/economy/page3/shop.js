const { MessageEmbed } = require("discord.js")

module.exports = {
    commands: ['shop', 'store'],
    cooldown: 5,
    callback: (message) => {
        const embed = new MessageEmbed()
        .setTitle('Type `!!buy [item name]` to buy')
        .setDescription(
            `**Test Item 1**\nID: \`test_item1\` Required: 500 GCoins\n\n` + 
            `**Test Item 2**\nID: \`test_item2\` Required: 1000 GCoins\n\n`
        )
        .setFooter('GEconomee')
        .setTimestamp()
        .setColor('GREEN')
        message.channel.send(embed)
    }
}