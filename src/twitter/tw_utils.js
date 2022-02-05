const { TwitterApi } = require('twitter-api-v2');

const ListId = process.env.list_id;
const TwClient = new TwitterApi({
    appKey: process.env.key,
    appSecret: process.env.secret,
    accessToken: process.env.token,
    accessSecret: process.env.token_secret,
});

/**
 * 
 * @param {string} text 
 * @returns the id of the sent tweet.
 */
async function send_tweet(text){
    let tweet;
    try{
        tweet = await TwClient.v1.tweet(text);
    }catch(err){
        tweet = null;
    }
    return tweet?.id;
}

/**
 * 
 * @param {tweet} tweet 
 * @returns {string} the tweet with the fixed
 * urls 
 */
function fix_urls(tweet){
    let text = tweet.text ?? tweet.full_text;
    let urls = tweet.entities.urls

    if('extended_tweet' in tweet){
        //this only applies when we stream tweets.        
        let xt = tweet.extended_tweet;
        text = xt.full_text
        urls = xt.entities.urls
    }
    for(let u of urls){
        bad_url = u.url
        good_url = u.display_url
        text = text.replace(bad_url, good_url)
    }
    return text
}

/**
 * 
 * @param {tweet} tweet Tweet object
 * @returns {string} the tweet itself if it contains
 * the 'time.is' keyword.
 */
function good_tweet(tweet){
    const text = fix_urls(tweet)
    return text.includes('time.is') ? text : null;
}


module.exports = {
    TwClient,
    ListId,
    send_tweet,
    good_tweet,
}