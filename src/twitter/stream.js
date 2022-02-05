const { ETwitterStreamEvent } = require("twitter-api-v2");
const {TwClient} = require('./tw_utils');

/*
    WIP....
    TODO: Add option to choose from tweet streaming
    and list search, also finish the logic for tweet
    streaming.
*/

/**
 * Function to start the stream of tweets.
 */
async function start_stream(){
    const client = TwClient.v1;
    const list_members = await client.listMembers({ list_id: listId })
    const ids = []
    //store ids of every member of the list.
    for(members of list_members){
        ids.push(members.id);
    }
    
    const stream = await client.filterStream({follow: ids, tweet_mode: 'extended'})
    stream.autoReconnect = true;

    stream.on(ETwitterStreamEvent.ConnectionError, err => console.log('Connection error:', err))
    stream.on(ETwitterStreamEvent.ConnectionClosed, () => console.log('Connection closed.'))
    stream.on(ETwitterStreamEvent.Data, eventData => stream_logic(eventData))
}


function stream_logic(data){}

module.exports = {
    start_stream,
}