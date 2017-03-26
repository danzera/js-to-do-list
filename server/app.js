var express = require('express'); // import express
var app = express();
var bodyParser = require('body-parser'); // import body-parser
var addTask = require('./modules/add-task.js'); // import add-task module

app.set('port', 5000); // set our port
app.use(bodyParser.urlencoded({extended: true})); // use body-parser
app.use(express.static('server/public')); // set default file path
app.use('/addTask', addTask); // use add-task module

app.listen(app.get('port'), function() { // listen on our port
  console.log('live on port', app.get('port'));
});
