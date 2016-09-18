const Mouse   = require('node-mouse'),
      Dotenv  = require('dotenv').config(),
      Twitter = require('twitter'),
      exec    = require('child_process').exec;

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

let sentence = [
    'にゃーん',
    'にゃーん？',
    '眠いにゃ',
    'おなかすいたにゃ',
];

let position = 0;
let status = '';

m.on('mouseup', (event) => {
    if (event.button == 0 || event.button == 2) {
        if (event.button == 2) {
            // 右クリック
            position++;
        } else {
            // 左クリック
            position--;
        }
        
        if (typeof sentence[position] == 'undefined') {
            position = 0;
        }
        
        status = sentence[position];
        exec('yukkuri "' + status + '"');
    } else {
        // 中クリック
        client.post('statuses/update', {status: status}, (error, tweet, response) => {
            if (error) throw error;
            console.log(tweet);
        });
    }
});
