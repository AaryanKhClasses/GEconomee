const { MessageEmbed } = require("discord.js")

module.exports = {
    commands: ['shop', 'store'],
    cooldown: 5,
    callback: (message, args) => {
        if(!args[0] || args[0] === '1'){
            const embed = new MessageEmbed()
            .setTitle('Type `!!buy [item name]` to buy')
            .setDescription(
                `**:apple: Apple**\nID: \`apple\` Required: 10 GCoins\nEat An Apple Everyday, Keep The Doctor Away!\n\n` + 
                `**:banana: Banana**\nID: \`banana\` Required: 25 GCoins\nDont Slip On It!\n\n` + 
                `**:motor_scooter: Scooter**\nID: \`scooter\` Required: 575 GCoins\nBuy a Scooter an go on a LONG Drive!\n\n` + 
                `**:computer: Laptop**\nID: \`laptop\` Required: 949 GCoins\nPlay Games, Play Music, Code and do Other Things on this Laptop!\n\n`
            )
            .setFooter('Shop Page 1/2 | GEconomee')
            .setTimestamp()
            .setColor('GREEN')
            message.channel.send(embed)
        } else if(args[0] === '2'){
            const embed = new MessageEmbed()
            .setTitle('Type `!!buy [item name]` to buy')
            .setDescription(
                `**:blue_car: Blue Car**\nID: \`car_blue\` Required: 2500 GCoins\nGo On a Long Drive In This Blue Car!\n\n` + 
                `**:red_car: Red Car**\nID: \`car_red\` Required: 2500 GCoins\nGo On a Long Drive In This Red Car!\n\n` + 
                `**More Items Coming Soon!**\n\n`
            )
            .setFooter('Shop Page 2/2 | GEconomee')
            .setTimestamp()
            .setColor('GREEN')
            message.channel.send(embed)
        } else if(args[0] === 'pets'){
            const embed = new MessageEmbed()
            .setTitle('Type `!!buy [item name]` to buy')
            .setDescription(
                `**:chicken: Chicken(Pet Tier2)**\nID: \`chicken_pt2\` Required: 20000 GCoins\nChicken lays eggs!\nSpecial Effect: **Money+%:** 5% \n\n` + 
                `**:pig: Pig(Pet Tier3)**\nID: \`pig_pt3\` Required: 50000 GCoins\nThis pig likes to play in mud and Oinks a LOT!\nSpecial Effect: **Money+%:** 15%\n\n` + 
                `**More Items Coming Soon!**\n\n`
            )
            .setFooter('Pet Shop Page 1/1 | GEconomee')
            .setTimestamp()
            .setColor('GREEN')
            message.channel.send(embed)
        } else {
            const embed = new MessageEmbed()
            .setTitle('Type `!!buy [item name]` to buy')
            .setDescription(`<:emojino:779190801598775317> Sorry! We don't have a shop page called **${args[0]}**`)
            .setFooter('Shop | GEconomee')
            .setTimestamp()
            .setColor('GREEN')
            message.channel.send(embed)
        }
    }
}

