var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.json());

var prs = require('./prs');
var bot = require('../bot/bot');

router.get('/all', function(request, response) {
  let all = prs.getAll();
  response.json(all);
});

router.use('/', validateRequest);
router.post('/', function(request, response){
  let channel = request.query.channel;
  let pr = prs.add(channel, request.body);
  bot.post(channel, pr);
  response.send('ok');
});

function validateRequest(request, response, next){
  let event = request.get('X-GitHub-Event');
  if(event === "pull_request"){
    return next();
  }
  console.log("INVALID REQUEST. EVENT: ", event);
  response.send('invalid request');
}

module.exports = router;