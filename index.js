const SlackBot =  require('slackbots');
const axios = require('axios');
const dotenv = require('dotenv')

dotenv.config()

const bot = new SlackBot({
    token: `${process.env.BOT_TOKEN}`,
    name: 'AddQ-Bot'
    
})
//Start handler
bot.on('start', () => {
    const params = {
        icon_emoji: ':q:'
    }
})

// Error Handler
bot.on('error', (err) => {
    console.log(err);
})

// Message Handler
bot.on('message', (data) => {
    if(data.type !== 'message') {
        return;
    }
    handleMessage(data.text);
})

function handleMessage(message) {
    if(message.includes(' inspire me')) {
        inspireMe()
    } else if(message.includes(' chuck norris')) {
        randomNorris()
    } else if(message.includes(' help')) {
        runHelp()
    } else if(message.includes(' spela shoreline')) {
        spelaShoreline()
    } else if(message.includes(' why are we here?')) {
        buildWorld()
    } else if(message.includes(' how do we do it?')) {
        howDoWe()
    }        
}

function inspireMe() {
    axios.get('https://raw.githubusercontent.com/BolajiAyodeji/inspireNuggets/master/src/quotes.json')
      .then(res => {
            const quotes = res.data;
            const random = Math.floor(Math.random() * quotes.length);
            const quote = quotes[random].quote
            const author = quotes[random].author

            const params = {
                icon_emoji: ':q:'
            }

            bot.postMessageToChannel(
                'teknik',
                `:zap: ${quote} - *${author}*`,
                params
            );
      })
}

function randomNorris() {
    axios.get('https://api.chucknorris.io/jokes/random')
      .then(res => {
            const joke = res.data.value;

            const params = {
                icon_emoji: ':q:'
            }
        
            bot.postMessageToChannel(
                'teknik',
                `:chuck: ${joke}`,
                params
            );

      })
}

function runHelp() {
    const params = {
        icon_emoji: ':q:'
    }

    bot.postMessageToChannel(
        'teknik',
        `Type *@addq-bot* with *inspire me* to get an inspiring techie quote, *chuck norris* to get a Chuck Norris random joke, *spela shoreline* to get the best song in the world and *help* to get this instruction again`,
        params
    );
}

function spelaShoreline() {
    const params = {
        icon_emoji: ':q:'
    }

    bot.postMessageToChannel(
        'teknik',
        'https://open.spotify.com/track/2nK30KDjrDHRedyIcHTOQS',
        params
    );
}

function buildWorld() {
    const params = {
        icon_emoji: ':q:'
    }

    bot.postMessageToChannel(
        'teknik',
        'To build a World That Works',
        params
    );
}

function howDoWe() {
    const params = {
        icon_emoji: ':q:'
    }

    bot.postMessageToChannel(
        'teknik',
        'We Question Everything',
        params
    );
}
