const { MessageEmbed } = require("discord.js")

module.exports = {
    commands: 'help',
    cooldown: 0,
    callback: (message, args) => {
        if(!args[0]){
            const embed = new MessageEmbed()
            .setTitle(`!!help command`)
            .setFooter('GEconomee')
            .setColor('#FEAD40')
            .setTimestamp()
            .setDescription('I am a **__Global-Economy__** Bot! I have __economy__ and __moderation__ features. Below are my categories.\nType in ```js\n!!help <category>``` for complete category information!\n\n:coin: **Economy:** __Global Economy__ Global Economy means your GCoins will be synced in every server!\n\n:shield: **Moderation:** Moderation Commands like __Kick__, __Ban__ and __Mute__ + **Auto Mod Feature**')
            message.channel.send(embed)
        } else if(args[0] === 'economy' || args[0] === 'Economy' || args[0] === 'ECONOMY'){
            const embed = new MessageEmbed()
            .setTitle('!!help economy command')
            .setFooter('GEconomee')
            .setColor('#FEAD40')
            .setTimestamp()
            .setDescription(`:coin: **Economy:** Get GCoins by doing deeds and show off to your friends!\n**__Global Economy__** Even better! Your GCoins will be synced to each server means that you can show off more friends!\n\n` +
            `:dollar: **Balance:** See how much GCoins you have!\n` +
            `:briefcase: **Work:** Do good deeds and earn GCoins from 200 GCoins to 500 GCoins!\n` + 
            `:spy: **Crime:** Do bad deeds and earn GCoins. :name_badge: *CAUTION:* You might lose GCoins too if you got arrested!\n` +
            `:coin: **Daily:** Earn your daily rewards from 500 GCoins to 1300 GCoins!\n` + 
            `:joystick: **Gamble:** Gamble your earned GCoins! Beeware! Your GCoins may get __Doubled__ or __Halved__\n` + 
            `:trophy: **Leaderboard:** See Global Leaderboard and what you are against!\n` + 
            `:moneybag: **Pay:** Pay some GLoans or gift your friends some GCoins!\n` + 
            `:ninja: **Rob:** Rob other players for 1000 GCoins every day! But you could get caughta nd be fined 1000 GCoins!`)
            message.channel.send(embed)
        } else if(args[0] === 'moderation' || args[0] === 'Moderation' || args[0] === 'MODERATION'){
            const embed = new MessageEmbed()
            .setTitle('!!help moderation command')
            .setFooter('GEconomee')
            .setColor('#FEAD40')
            .setTimestamp()
            .setDescription(`:shield: **Moderation:** GEconomee comes with additional security as with GCoins security is important!\n**__Mod Features and Mod Commands:__** In GEconomee commands and global features are included\n\n` + 
            `:gear: **Feature**: __Auto Mod:__ **AutoMod** have Banned Words, All Links, Discord Invites, Mass Mentions and Spoiler Features to keep you safe at all times!\n\n` + 
            `:magic_wand: **Commands:** GEconomee have a lot of moderation-related commands!\n\n` + 
            `:mechanical_leg: **Kick:** Kicks a member!\n` + 
            `:hammer_pick: **Ban:** Bans a member!\n` + 
            `:negative_squared_cross_mark: **Unban:** Unbans a member!\n` +
            `:no_entry: **Mute:** Mutes a member!\n` + 
            `:hammer: **Soft-Ban:** Bans and immediately unbans a member!\n` +
            `:anger: **Warn:** Warns a member! The more warns, the higher punishment!\n` +
            `:hotsprings: **Clear-Warns:** Clear warnings of a member!\n` +
            `:white_check_mark: **Usage for all Commands:** [command name] [mentioned user] (optional reason)`
            )
            message.channel.send(embed)
        } else {
            const embed = new MessageEmbed()
            .setTitle('!!help command')
            .setColor('#FC2800')
            .setFooter('GEconomee')
            .setDescription('<:emojino:779190801598775317> Looks like you make a typo or if not GEconomee doesnt have that category!')
            message.channel.send(embed)
        }
    }
}