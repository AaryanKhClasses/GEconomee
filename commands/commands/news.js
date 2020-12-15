const { MessageEmbed } = require("discord.js");

module.exports = { 
    commands: 'news',
    cooldown: 10,
    callback: (message) => {
        /*
        //v.1.2.2-bfix
        const v122_bfix = new MessageEmbed()
        .setTitle('GEconomme v1.2.2-bfix (Bug Fixes Update)')
        .setDescription(`**Bug Fix #1:** Fixed the Bug Which Caused Gambling cooldown to be displayed as \`00\`\n` + 
        `**Bug Fix #2:** Fixed The LeaderBoard so that it shows the Bank GCoins too!`)
        .setColor('GREEN')
        .setTimestamp()
        message.channel.send(v122_bfix)
        */

        //v.1.3-pets-exp1
        const v13_pets_exp1 = new MessageEmbed()
        .setTitle('GEconomme v.1.3-pets-exp1 (Pets Snapshot 1)')
        .addFields(
            {
                name: ':bug: Bug Fixes',
                value: 'Fixed The LeaderBoard **again**\n\n',
            },
            {
                name: '<:emojiyes:779190801392861224> Additions!',
                value: '**Claim-Pet** Command!: This command allows you to claim your first pet! This doesn\'t do anything, but you can upgrade it!\n' +
                        '**Pet** Command!: See your or your friend\'s pet!\n\n',
            },
            {
                name: ':twisted_rightwards_arrows: Changes',
                value: '**Help:** Added the Pets Category and the Pets Command List!'
            }
        )
        .setColor('GREEN')
        .setTimestamp()
        message.channel.send(v13_pets_exp1)
    }
}

