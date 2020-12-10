const { MessageEmbed } = require("discord.js");

module.exports = { 
    commands: 'news',
    cooldown: 10,
    callback: (message) => {
        //v.1.2.2-bfix
        const v122bfix = new MessageEmbed()
        .setTitle('GEconomme v1.2.2-bfix (Bug Fixes Update)')
        .setDescription(`**Bug Fix #1:** Fixed the Bug Which Caused Gambling cooldown to be displayed as \`00\`\n` + 
        `**Bug Fix #2:** Fixed The LeaderBoard so that it shows the Bank GCoins too!`)
        .setColor('GREEN')
        .setTimestamp()
        message.channel.send(v122bfix)
    }
}

