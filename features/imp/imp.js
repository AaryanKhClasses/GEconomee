module.exports = (client) => {
    client.on('message', async(message) => {
        message.guild.channels.create('mod-logs', { type: text }) //mod-logs

        //muted
        let mutedRole = message.guild.roles.cache.find(r => r.name === 'Muted')
        if(!mutedRole){
            mutedRole = await message.guild.roles.create({
                data: {
                    name: 'Muted',
                    color: '#000000',
                    permissions: []
                }}
            )
    
            message.guild.channels.cache.forEach(async(channel) => {
                await channel.createOverwrite(mutedRole, {
                    SEND_MESSAGES: false,
                    MANAGE_MESSAGES: false,
                    ADD_REACTIONS: false
                })
            })
        }
    })
}