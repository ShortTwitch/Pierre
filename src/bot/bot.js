const prs = require('../pull_requests/prs');
const messages = require('./messages');
const credentials = require('./credentials').credentials;
var request = require('request');

// send message to slack using slack API
function postMessage(channel, message, attachments = []){
    var options = {
        url: 'https://slack.com/api/chat.postMessage',
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        form: {
            token: credentials.token,
            channel: channel,
            text: message,
            attachments: JSON.stringify(attachments)
        }
    };
    request(options, function(error, response, body){
        if(error || !body.ok){
            console.log("postMessage error: ", error);
            console.log("postMessage body: ", body);
        }
    });
}

function post(channel, pr){
    if(pr.action === "opened" || pr.action === "reopened"){
        let attachments = messages.formatOpened(pr);
        let message = `A pull request has been ${ pr.action }`;
        postMessage(channel, message, attachments);
    }
}

function sendUpdates(){
    channels.forEach(function(channel){
        let attachments = messages.formatAll(channel);
        postMessage(channel, "Here is your daily update, humans.", attachments);
    });
}

exports = module.exports = {
    post: post,
    sendUpdates, sendUpdates
}
