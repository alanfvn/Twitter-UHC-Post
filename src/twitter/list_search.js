const {TwClient, ListId, good_tweet, send_tweet} = require('./tw_utils');
const tweeted = {}

//TODO: cleanup the tweeted stuff.


/**
 * Function to periodically search for tweets.
 */
function tweet_task(){  
    search_tweets();
    setInterval(search_tweets, 1000*60*2);
    setInterval(delete_old_ids, 1000*60*30);
}

/**
 * Function to delete all old ids stored from 
 * the tweet search.
 */
function delete_old_ids(){
    for(const [key, value] of Object.entries(tweeted)){
        const elapsed = get_elapsed_time(value);
        if(elapsed >= 25){
            delete tweeted[key];
        }
    }
}

async function search_tweets(){
    const client = TwClient.v1;
    const tweets = await client.listStatuses({
        list_id: ListId, include_rts: false, 
        tweet_mode: 'extended', count: 25
    });
        
    for(let tweet of tweets){
        const twId = tweet.id;
        const twt = good_tweet(tweet);
        /*  
            !!We only check for tweets no more old 
            than 20 minutes.
        */
        const elapsed = get_elapsed_time(tweet.created_at);

        if(twId in tweeted){
            //tweet has already been posted.
            continue;
        }
        if(twt && elapsed <= 20){
            /*
                Tweet is valid and 20 minutes haven't 
                passed yet so we store the id of the tweet 
                to avoid multiple posts.
            */
            const id = await send_tweet(twt);

            if(id){
                tweeted[twId] = new Date();
                console.log(`Tweet sent (id: ${id})`);
            }else{
                console.log(`An a error has occurred while trying to send the tweet with id: ${twId}`);
            }
        }
    }
}

/**
 * 
 * @param {Date} date 
 * @returns the elapsed time from the date provided in 
 * the parameter and current time.
 */
function get_elapsed_time(date){
    const now = new Date();
    const out = new Date(Date.parse(date));

    const secs = Math.floor((now - (out))/1000);
    const mins = Math.floor(secs/60);

    return mins;
}


module.exports={
    tweet_task,
}