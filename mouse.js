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

m.on('mouseup', (event) => {
    let status = '';
    if (event.button == 2) {
        // 右クリック
        status = '眠いにゃ';
    } else if (event.button == 1) {
        // 中クリック
        status = 'おなかすいたにゃ';
    } else {
        // 左クリック
        status = 'にゃーん';
    }
    
    client.post('statuses/update', {status: status}, (error, tweet, response) => {
        if (error) throw error;
        console.log(tweet);
    });
});
