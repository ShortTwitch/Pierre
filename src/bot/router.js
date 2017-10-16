var router = require('express').Router();
var bodyParser = require('body-parser');

var cli = require('./cli');
var credentials = require('./credentials');

router.get('/token/:token', function(request, response){
  credentials.updateToken(request.params.token);
  response.send("Bot now using token: " + credentials.credentials.token);
});

router.use('/cli', bodyParser.urlencoded({ extended: true }));
router.post('/cli', function(request, response){
  var command = request.body;
  var output = cli(command);
  response.json(output);
});

router.use('/subscribe', bodyParser.json());
router.post('/subscribe', function(request, response){
  let event = request.body;
  credentials.watchEvent(event);
  response.json({'challenge': data.challenge});
});

module.exports = router;