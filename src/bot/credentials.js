var request = require('request');

var credentials = {
    id: null,
    token: 'xoxb-251969985616-5U3FPBPlp9gOxFKeJ1lf8AEw'
}

function getIdAsync(cb){
    var options = {
        url: 'https://slack.com/api/auth.test',
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        form: { token: credentials.id }
    }
    request(options, function(error, response, body){
        let data = JSON.parse(body);
        if(error || !data.ok) {
            console.log("Get BotID Error: ", error);
            console.log("Get BotID Body: ", body);
        }
        credentials.id = data.user_id;
        return cb(credentials.id);
    });
}

function memberJoined(event){
    return  event.type === 'event_callback' &&
            event.event.type === 'member_joined_channel';
}

function watchEvent(event){
    if(!memberJoined(event)) { return; }

    let channelKey = event.event.channel;
    if(channels.has(channelKey)){ return; }

    getIdAsync(function(id) {
        if(event.event.user === id) { channels.add(channelKey); }
    });
}

function updateToken(token) {
    credentials.token = token;
}

exports = module.exports = {
    credentials: credentials,
    watchEvent: watchEvent,
    updateToken: updateToken
}