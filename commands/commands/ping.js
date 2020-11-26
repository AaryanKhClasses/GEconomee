module.exports = {
    commands: 'ping',
    cooldown: 3,
    callback: (message) => {
        message.channel.send('Pong!').then((resultMessage) => {
            const ping = resultMessage.createdTimestamp - message.createdTimestamp
            resultMessage.edit(`Pong! The ping is \`${ping}ms\``)
        })
    }
}