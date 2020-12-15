const Discord = require('discord.js')
const db = require('quick.db')

module.exports = {
    commands: ['leaderboard', 'lb'],
    cooldown: 10,
    callback: (message, args) => {
        let data = db.get('account')
        if(!data) return message.channel.send('Unknown Generated Data!')

        var limit = 10

        let lastPage = Math.ceil(Object.keys(data).length / limit)
        let page = parseInt(args[0])
        if(!page) page = 1
        if(page > lastPage) page = lastPage

        let fromPages = limit * (page - 1)
        let pageslimit = 10 * page

        let list = Object.entries(data).sort((a, b) => b[1].balance - a[1].balance).slice(fromPages, pageslimit)
        let arr = []

        for(var i in list){
            arr.push(`**${i * 1 + 1 + fromPages}.** ${message.guild.members.cache.get(list[i][0]) ? message.guild.members.cache.get(list[i][0]).user.tag : "UnknownUser"} - GCoins: **${(parseInt(`${list[i][1].balance}`) ? parseInt(`${list[i][1].bank}`) : '') + (parseInt(`${list[i][1].bank}`) ? parseInt(`${list[i][1].balance}`) : '')}**`)
        }

        const embed = new Discord.MessageEmbed()
        .setTitle('GCoins LeaderBoard!')
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        .setDescription(arr.join('\n'))
        .setColor('GREEN')
        .setTimestamp(new Date())
        .setFooter(`${page} / ${lastPage} | GEconomee`)
        message.channel.send(embed)
    }
}