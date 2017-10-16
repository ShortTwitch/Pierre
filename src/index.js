var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

var prs = require('./pull_requests/router');
app.use('/prs', prs);

var bot = require('./bot/router');
app.use('/bot', bot);

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});