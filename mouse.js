let Mouse   = require('node-mouse'),
    Dotenv  = require('dotenv').config(),
    Twitter = require('twitter');

process.on('uncaughtException', (error) => {
    console.log(error);
});

let m = new Mouse;
let client = new Twitter({
    consumer_key: process.env.TWITTER_OAUTH_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_OAUTH_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_OAUTH_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_OAUTH_ACCESS_SECRET,
});

m.on('mouseup', event => {
    if (event.button == 0) {
        client.post('statuses/update', {status: 'にゃーん'}, (error, tweet, response) => {
            if (error) throw error;
            console.log(tweet);
        });
    }
});
