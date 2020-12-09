const Discord = require('discord.js')
const db = require('quick.db')

function ToInteger(card) { 
    if(card == 'A'){
        return 11
    } else if(card == 'base'){
        return 0
    } else if(card == 'J' || card == 'Q' || card == 'K') {
        return 10
    } else { 
        return Number(card)
    }
}

function aceCheck(value, total) {
    if(total + value > 21 && value == 11){
        return 1
    } else { 
        return value
    }
}

function Card(value) {
    this.toInteger = ToInteger(value[0])
    this.val = value[0]
    this.suite = value[1]
}

function randCard() {
    var randCardInt = Math.floor(Math.random() * 20) + 1
    var randSuite = Math.floor(Math.random() * 3) + 1
    var suites = [':spades:', ':hearts:', ':diamonds:', ':clubs:']
    var fullCollection = ['A', 'A', '2', '2', '3', '4', '5', '6', '7', '8', '9', '9', '9', '9', '10', 'J', 'J', 'Q', 'Q', 'K', 'K']

    return [fullCollection[randCardInt - 1], suites[randSuite]]
}

function arrCardCalc(arr) {
    var sum = 0
    var iterations = 0
    for(var x in arr){
        sum += arr[iterations].toInteger
        iterations += 1
    }

    return [sum, iterations]
}

function Interface(message, question, callback) {
    var collected = false
    var closed = false
    var qMessage
    message.channel.send(question).then((msg) => {
        qMessage = msg
    })

    const collector = new Discord.MessageCollector(message.channel, m => m.author.id == message.author.id, { maxMatches: 1 })
    collector.on('collect', msg => {
        collected = true
        callback(msg, qMessage)
    })

    collector.on('end', () => {
        closed = true
    })
}

async function userHit(cardsObj, message) {
    var user = message.author

    var card = new Card(randCard())
    var total = arrCardCalc(cardsObj.userTotal)
    var newTotal = total[0] + aceCheck(card.toInteger, total[0])

    var bet = Number(cardsObj.bet)
    console.log('1')

    if(newTotal > 21){
        db.subtract(`account.${message.author.id}.balance`, bet)
        message.channel.send('lost')
    } else if(newTotal == 21 && total[1] == 1){
        db.add(`account.${message.author.id}.balance`, bet)
        message.channel.send('won')
    } else {
        cardsObj.userTotal.push(card)
        new Interface(message, 'hit/stand', (collected, question) => {
            if(collected.content.toLowerCase() == 'hit'){
                userHit(cardsObj, message)
            } else if(collected.content.toLowerCase() == 'stand'){
                userStand(cardsObj, message)
            }
        })
    }
}

function compHit(cardsObj, message, profile) {
    var user = message.author

    var card = new Card(randCard())
    var userTotal = arrCardCalc(cardsObj.userTotal)
    var compTotal = arrCardCalc(cardsObj.compTotal)
    var newTotal = compTotal[0] + aceCheck(card.toInteger, compTotal[0])

    var bet = Number(cardsObj.bet)
    message.channel.send(`ok`)

    if(newTotal > 21){
        db.add(`account.${message.author.id}.balance`, bet)
        message.channel.send('won')
    } else if(newTotal >= 17){
        if(newTotal == 21 && compTotal[1] == 1){
            db.subtract(`account.${message.author.id}.balance`, bet)
        } else if(newTotal > userTotal[0]){
            db.subtract(`account.${message.author.id}.balance`, bet)
            message.channel.send('lost')
        } else if(newTotal == userTotal[0]){
            message.channel.send('tie')
        } else {
            db.add(`account.${message.author.id}.balance`, bet)
            message.channel.send('won')
        }
    } else {
        cardsObj.compTotal.push(card)
        setTimeout(() => {
            compHit(cardsObj, message, profile)
        }, 1500)
    }
}

function createCardCollection(bet) {
    var cardsObj = {
        userTotal: [],
        compTotal: [],
        bet: bet
    }

    var userBase = new Card(randCard())
    var compBase = new Card(['base', 'base'])
    cardsObj.userTotal.push(userBase)
    cardsObj.compTotal.push(compBase)
    return cardsObj
}

function startGame(args, message) {
    var balance = db.get(`account.${message.author.id}.balance`)

    if(args[0] && !isNaN(args[0]) && (Number(args[0]) <= Number(balance))){
        var cardsObj = createCardCollection(args[0])
        var StarterCard = cardsObj.userTotal[0]
        message.channel.send('start')

        new Interface(message, 'hit/stand', (collected, question) => {
            if(collected.content.toLowerCase() == 'hit'){
                userHit(cardsObj, message)
            } else if(collected.content.toLowerCase() == 'stand'){
                userStand(cardsObj, message)
            }
        })
    } else {
        message.channel.send('no')
    }
}

function userStand(cardsObj, message) {
    message.channel.send('stand!lamo')
    var profile = db.get(`account.${message.author.id}.balance`)
    return compHit(cardsObj, message, profile)
}

var blackjack = {
    start: startGame
}

module.exports = {
    commands: ['blackjack', 'bj', 'deal'],
    cooldown: 5,
    callback: (message, args) => {
        blackjack.start(args, message)
    }
}