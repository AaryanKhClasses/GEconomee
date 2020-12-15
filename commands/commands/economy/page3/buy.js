const { MessageEmbed } = require("discord.js")
const db = require('quick.db')

module.exports = {
    commands: 'buy',
    cooldown: 5,
    callback: async(message, args) => {
        const item = args.join(' ')
        const balance = await db.get(`account.${message.author.id}.balance`)
        const items = await db.fetch(`inventory.${message.author.id}.${{ items: [] }}`)
        if(item === 'Apple' || item === 'apple'){

            if(balance < 10) {
                const embed = new MessageEmbed()
                .setDescription(`<:emojino:779190801598775317> You do not have enough GCoins to buy **${item}**! Check your wallet or withdraw from bank!`)
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setColor('RED')
                .setFooter('GEconomee')
                .setTimestamp()
                message.channel.send(embed)
            } else {
                await db.subtract(`account.${message.author.id}.balance`, 10)
                await db.push(`inventory.${message.author.id}`, ':apple: **Apple**\nID:\`apple\` Buy: 10 GCoins | Sell: 0 GCoins \nEat An Apple Everyday, Keep The Doctor Away!')
                const embed = new MessageEmbed()
                .setDescription(`<:emojiyes:779190801392861224> Successfully purchased **${item}**, it costed you 10 GCoins!`)
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setColor('GREEN')
                .setFooter('GEconomee')
                .setTimestamp()
                message.channel.send(embed)
            }

        } else if(item === 'Banana' || item === 'banana'){

            if(balance < 25) {
                const embed = new MessageEmbed()
                .setDescription(`<:emojino:779190801598775317> You do not have enough GCoins to buy **${item}**! Check your wallet or withdraw from bank!`)
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setColor('RED')
                .setFooter('GEconomee')
                .setTimestamp()
                message.channel.send(embed)
            } else {
                await db.subtract(`account.${message.author.id}.balance`, 25)
                await db.push(`inventory.${message.author.id}`, ':banana: **Banana**\nID:\`banana\` Buy: 25 GCoins | Sell: 0 GCoins\nDont Slip On It!')
                const embed = new MessageEmbed()
                .setDescription(`<:emojiyes:779190801392861224> Successfully purchased **${item}**, it costed you 25 GCoins!`)
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setColor('GREEN')
                .setFooter('GEconomee')
                .setTimestamp()
                message.channel.send(embed)
            }

        } else if(item === 'Scooter' || item === 'scooter'){

            if(balance < 575) {
                const embed = new MessageEmbed()
                .setDescription(`<:emojino:779190801598775317> You do not have enough GCoins to buy **${item}**! Check your wallet or withdraw from bank!`)
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setColor('RED')
                .setFooter('GEconomee')
                .setTimestamp()
                message.channel.send(embed)
            } else {
                await db.subtract(`account.${message.author.id}.balance`, 575)
                await db.push(`inventory.${message.author.id}`, ':motor_scooter: **Scooter**\nID: \`scooter\` Buy: 575 GCoins | Sell: 0 GCoins\nBuy a Scooter an go on a LONG Drive!')
                const embed = new MessageEmbed()
                .setDescription(`<:emojiyes:779190801392861224> Successfully purchased **${item}**, it costed you 575 GCoins!`)
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setColor('GREEN')
                .setFooter('GEconomee')
                .setTimestamp()
                message.channel.send(embed)
            }

        } else if(item === 'Laptop' || item === 'laptop'){

            if(balance < 949) {
                const embed = new MessageEmbed()
                .setDescription(`<:emojino:779190801598775317> You do not have enough GCoins to buy **${item}**! Check your wallet or withdraw from bank!`)
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setColor('RED')
                .setFooter('GEconomee')
                .setTimestamp()
                message.channel.send(embed)
            } else {
                await db.subtract(`account.${message.author.id}.balance`, 949)
                await db.push(`inventory.${message.author.id}`, ':laptop: **Laptop**\nID: \`laptop\` Buy: 949 GCoins | Sell: 0 GCoins\nPlay Games, Play Music, Code and do Other Things on this Laptop!')
                const embed = new MessageEmbed()
                .setDescription(`<:emojiyes:779190801392861224> Successfully purchased **${item}**, it costed you 949 GCoins!`)
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setColor('GREEN')
                .setFooter('GEconomee')
                .setTimestamp()
                message.channel.send(embed)
            }

        } else if(item === 'Blue Car' || item === 'blue car' || item === 'blue_car' || item === 'car blue' || item === 'car_blue'){

            if(balance < 2500) {
                const embed = new MessageEmbed()
                .setDescription(`<:emojino:779190801598775317> You do not have enough GCoins to buy **${item}**! Check your wallet or withdraw from bank!`)
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setColor('RED')
                .setFooter('GEconomee')
                .setTimestamp()
                message.channel.send(embed)
            } else {
                await db.subtract(`account.${message.author.id}.balance`, 2500)
                await db.push(`inventory.${message.author.id}`, ':blue_car: **Blue Car**\nID: \`car_blue\` Buy: 2500 GCoins | Sell: 0 GCoins\nGo On a Long Drive In This Blue Car!')
                const embed = new MessageEmbed()
                .setDescription(`<:emojiyes:779190801392861224> Successfully purchased **${item}**, it costed you 2500 GCoins!`)
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setColor('GREEN')
                .setFooter('GEconomee')
                .setTimestamp()
                message.channel.send(embed)
            }

        } else if(item === 'Red Car' || item === 'red car' || item === 'red_car' || item === 'car red' || item === 'car_red'){

            if(balance < 2500) {
                const embed = new MessageEmbed()
                .setDescription(`<:emojino:779190801598775317> You do not have enough GCoins to buy **${item}**! Check your wallet or withdraw from bank!`)
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setColor('RED')
                .setFooter('GEconomee')
                .setTimestamp()
                message.channel.send(embed)
            } else {
                await db.subtract(`account.${message.author.id}.balance`, 2500)
                await db.push(`inventory.${message.author.id}`, ':red_car: **Red Car**\nID: \`car_red\` Buy: 2500 GCoins | Sell: 0 GCoins\nGo On a Long Drive In This Red Car!')
                const embed = new MessageEmbed()
                .setDescription(`<:emojiyes:779190801392861224> Successfully purchased **${item}**, it costed you 2500 GCoins!`)
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setColor('GREEN')
                .setFooter('GEconomee')
                .setTimestamp()
                message.channel.send(embed)
            }

        } else if(item === 'Chicken' || item === 'chicken'){

            if(balance < 20000) {
                const embed = new MessageEmbed()
                .setDescription(`<:emojino:779190801598775317> You do not have enough GCoins to buy **${item}**! Check your wallet or withdraw from bank!`)
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setColor('RED')
                .setFooter('GEconomee')
                .setTimestamp()
                message.channel.send(embed)
            } else {
                await db.subtract(`account.${message.author.id}.balance`, 20000)
                await db.set(`pet.${message.author.id}`, ':chicken: **Chicken**\nID: \`chicken_pt2\` Buy: 20000 GCoins | Sell: 0 GCoins\nChicken Lays Eggs!\nSpecial Effect: **Money+%:** 5%')
                const embed = new MessageEmbed()
                .setDescription(`<:emojiyes:779190801392861224> Successfully purchased **${item}**, it costed you 20000 GCoins!`)
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setColor('GREEN')
                .setFooter('GEconomee')
                .setTimestamp()
                message.channel.send(embed)
            }

        } else if(!item){
            const embed = new MessageEmbed()
            .setDescription(`<:emojino:779190801598775317> Please specify an item to purchase! See **!!store** for all items!`)
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setColor('RED')
            .setFooter('GEconomee')
            .setTimestamp()
            message.channel.send(embed)
        } else {
            const embed = new MessageEmbed()
            .setDescription(`<:emojino:779190801598775317> There is currently no item in the shop named **${item}**`)
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setColor('RED')
            .setFooter('GEconomee')
            .setTimestamp()
            message.channel.send(embed)
        }
    }
}