var express = require('express'); // import express
var router = express.Router(); // create a router instance (?)
var path = require('path'); // import path functionality

// 'addTask' 'POST' request
router.post('/', function(req, res) {
  console.log('/addTask route hit in new-task.js router'); // server console
  res.send('hello from the server on the /addTask route'); // send back to client
});

module.exports = router; // export the router functionality
