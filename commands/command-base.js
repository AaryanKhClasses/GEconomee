const { prefix } = require('../config.json')

let recentlyRan = []

module.exports = (client, commandOptions) => {
    let{
        commands,
        cooldown = -1,
        callback,
    } = commandOptions

    if(!commands){
        return
    }

    if(typeof commands === 'string'){
        commands = [commands]
    }
    console.log(`Registering command "${commands[0]}"`)

    client.on('message', async (message) => {
        const { member, content, guild, channel } = message

        for(const alias of commands){
            const command = `${prefix}${alias.toLowerCase()}`

            if(
                content.toLowerCase().startsWith(`${command}`) ||
                content.toLowerCase() === command
            ){

                let cooldownString = `${guild.id}-${member.id}-${commands[0]}`
                console.log('cooldownString: ', cooldownString)

                if(cooldown > 0 && recentlyRan.includes(cooldownString)){
                    message
                    .reply('a little too quick there.')
                    .then((thisMessage) => {
                        thisMessage.delete({
                            timeout: 5000
                        })
                    })
                    message.delete()
                    return
                }

                const arguments = content.split(/[ ]+/) //split on any number of spaces
                arguments.shift() //Removes the command which is the first index

                if(cooldown > 0){
                    recentlyRan.push(cooldownString)
                    setTimeout(() => {
                        console.log('BEFORE: ', recentlyRan)
                        recentlyRan = recentlyRan.filter((string) => {
                            return string !== cooldownString
                        })

                        console.log('AFTER: ', recentlyRan)
                    }, 1000 * cooldown)
                }

                callback(message, arguments, arguments.join(' '), client) //handle the custom command code
                return
            }
        }
    })
}