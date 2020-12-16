const db = require('quick.db')
const canvacord = require('canvacord')
const { MessageAttachment } = require('discord.js')

module.exports = {
    commands: ['rank', 'level'],
    cooldown: 10,
    callback: async(message) => {
        var user = message.mentions.users.first() || message.author
        var level = db.get(`levelling.level.${user.id}`) || 0
        let xp = db.get(`levelling.xp.${user.id}`) || 0
        var xpNeeded = level * 512
        let every = db
            .all()
            .filter(i => i.ID.startsWith(`levelling.xpTotal.`))
            .sort((a, b) => b.data - a.data)
        var rank = every.map(x => x.ID).indexOf(`levelling.xpTotal.${user.id}`) + 1
        var image = await new canvacord.Rank()
        .setUsername(user.username)
        .setDiscriminator(user.discriminator)
        .setStatus(user.presence.status)
        .setCurrentXP(xp)
        .setRequiredXP(xpNeeded)
        .setRank(rank)
        .setLevel(level)
        .setAvatar(user.displayAvatarURL({ format: 'png' }))
        .setProgressBar('#FFFFFF')

        image.build()
        .then(data => {
            const attachment = new MessageAttachment(data, 'rank.png')
            message.channel.send(attachment)
        })
    }
}