var express = require('express'); // import express
var app = express();
var bodyParser = require('body-parser'); // import body-parser
var index = require('./modules/index.js'); // import custom index module

app.set('port', 5000); // set our port
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public', index)); // set default file path
app.use('/', index);

app.listen(app.get('port'), function() { // listen on our port
  console.log('live on port', app.get('port'));
});
