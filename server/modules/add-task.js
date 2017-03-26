var express = require('express'); // import express
var router = express.Router(); // create a router instance (?)
var path = require('path'); // import path functionality
var pg = require('pg'); // import pg to configure database connection
var config = { // database connection configuration
  database: 'chi', // database we're connecting to
  host: 'localhost', // where our database is hosted
  port: 5432, // database port
  max: 10, // max number of database connections
  idleTimeoutMillis: 30000 // max time to attempt connecting to database
};
var pool = new pg.Pool(config); // create database connection pool

// 'addTask' 'POST' request
router.post('/', function(req, res) {
  console.log('/addTask route hit in new-task.js router'); // server console
  // add new task to our database
  pool.connect(function(errorConnectingToDatabase, database, done) {
    if (errorConnectingToDatabase) { // error connecting
      res.sendStatus(500); // internal server error
    } else { // connected to database
      // TEST - WORKING
      console.log(req.body);
      var taskName = req.body.name;
      var taskDescription = req.body.description;
      var dueDate = req.body.due;
      // INSERT INTO "tasks" ("name", "description", "due_date") VALUES ('weekend challenge 3', 'to-do list', '03/26/2017');
      database.query('INSERT INTO "tasks" ' +
                     '("name", "description", "due_date") ' +
                     'VALUES ($1, $2, $3);',
        [taskName, taskDescription, dueDate], function(queryError, result) {
          done(); // release the connection to the pool
          if (queryError) {
            console.log('error making insert query in add-task.js');
            res.sendStatus(500); // internal server error
          } else {
            res.sendStatus(201); // insert to "tasks" table successul
          }
      }); // end database INSERT query
    } // end if-else database connection
  }); // end database connection function
  // res.send('hello from the server on the /addTask route'); // send back to client
}); // end 'add-task' router.post

module.exports = router; // export the router functionality
