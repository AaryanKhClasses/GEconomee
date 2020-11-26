const { MessageEmbed } = require("discord.js")

module.exports = {
    commands: 'kick',
    cooldown: 3,
    callback: (message, args) => {
        if(message)
        let reason = args.slice(1).join(' ')

        const user = message.mentions.members.first()
        if(!user){
            const embed = new MessageEmbed()
            .setDescription(`<:emojino:779190801598775317> Please mention a member to kick!`)
            .setColor('RED')
            .setFooter('GEconomee')
            .setTimestamp()
            message.channel.send(embed)
        }

        if(!reason) reason = 'No Reason Specified!'


    }
}