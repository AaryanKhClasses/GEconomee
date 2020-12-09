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

            if(!args[1] || args[1] === '1'){
                const eOEmbed = new MessageEmbed()
                .setTitle('!!help economy command')
                .setFooter('Help Page 1/2 | GEconomee')
                .setColor('#FEAD40')
                .setTimestamp()
                .setDescription(`:coin: **Economy:** Get GCoins by doing deeds and show off to your friends!\n**__Global Economy__** Even better! Your GCoins will be synced to each server means that you can show off more friends!\n\n` +
                `:credit_card: **Common Economy Features:** These __Economy Features__ you can use after a specified long interval of time!\n\n` + 
                
                `:dollar: **Balance:** See how much GCoins you have!\n` +
                `:briefcase: **Work:** Do good deeds and earn GCoins from 200 GCoins to 500 GCoins!\n` + 
                `:spy: **Crime:** Do bad deeds and earn GCoins. :name_badge: *CAUTION:* You might lose GCoins too if you got arrested!\n` +
                `:coin: **Daily:** Earn your daily rewards from 500 GCoins to 1300 GCoins!\n` + 
                `:joystick: **Gamble:** Basic and Non-Gamed Gamble Command!\n` + 
                `:trophy: **Leaderboard:** See Global Leaderboard and who you are against!\n` + 
                `:moneybag: **Pay:** Pay some GLoans or gift your friends some GCoins!\n` + 
                `:ninja: **Rob:** Rob other players for 1000 GCoins every day! But you could get caught and be fined 1000 GCoins!`)
                message.channel.send(eOEmbed)
            } 
            // else{
            //     const eTwEmbed = new MessageEmbed()
            //     .setTitle('!!help economy command')
            //     .setFooter('Help Page 2/2 | GEconomee')
            //     .setColor('#FEAD40')
            //     .setTimestamp()
            //     .setDescription(`:coin: **Economy:** Get GCoins by doing deeds and show off to your friends!\n**__Global Economy__** Even better! Your GCoins will be synced to each server means that you can show off more friends!\n\n` +
            //     `:video_game: **Gaming Economy Features:** These __Economy Features__ can either **__Double or Half__** the GCoins you gamble!\n\n` + 
            
            //     `:joystick: **Gamble:** Basic and Non-Gamed Gamble Command!\n` + 
            //     `:black_joker: **BlackJack:** Play a basic __Blackjack__ Game!\n` + 
            //     `:slot_machine: **Slots:** Play a Slots Game! Have a very less chance to win!\n` + 
            //     // 
            //     `:white_check_mark: **Usage for all Commands:** [command name] [gambled GCoins]`)
            //     message.channel.send(eTwEmbed)
            // }
            else{
                const eTwEmbed = new MessageEmbed()
                .setTitle('!!help economy command')
                .setFooter('Help Page 2/2 | GEconomee')
                .setColor('#FEAD40')
                .setTimestamp()
                .setDescription(`:coin: **Economy:** Get GCoins by doing deeds and show off to your friends!\n**__Global Economy__** Even better! Your GCoins will be synced to each server means that you can show off more friends!\n\n` +
                `:bank: **Banking Economy Features:** These __Economy Features__ will be a safe vault for your GCoins!\n\n` + 
                
                `:inbox_tray: **Deposit:** Deposit a specific amount of GCoins or all GCoins to the bank!\n` + 
                `:outbox_tray: **WithDraw:** Withdraw a specific amount of GCoins or all GCoins from the bank!\n` + 
                `:shopping_cart: **Store:** Explore the vast valuable item collection from the GStore and buy stuff by \`!!buy\`!\n` + 
                `:tickets: **Buy:** Buy Items from the GStore for a price of GCoins!\n` + 
                `:purse: **Inventory:** Your newly purchased items as well as other items will be shown here, so you can showoff your friends!\n\n` +
                // 
                `:white_check_mark: **Usage for all Commands:** [command name] [GCoins]`)
                message.channel.send(eTwEmbed)
            }
            
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
            `:memo: **List-Warns:** List the warnings of a member\n\n` + 
            
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