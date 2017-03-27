var express = require('express'); // import express
var router = express.Router(); // create a router instance (?)
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
router.put('/', function(req, res) {
  var taskID = req.body.id;
  var dueDate = req.body.dueDate;
  var taskStatus = req.body.complete;
  console.log('/updateTask ' + taskID + ' ' + taskStatus + ' route hit in update-task.js router'); // server console
  // update task in our database
  pool.connect(function(errorConnectingToDatabase, database, done) {
    if (errorConnectingToDatabase) { // error connecting
      res.sendStatus(500); // internal server error
    } else { // connected to database
      console.log(taskStatus, taskID);
      // UPDATE "tasks" SET "complete" = true WHERE "id" = 3;
      database.query('UPDATE "tasks" SET ("due_date", "complete") = ($1, $2) WHERE "id" = $3;',
        [dueDate, taskStatus, taskID], function(queryError, result) {
          done(); // release the connection to the pool
          if (queryError) {
            console.log('error making select query in get-tasks.js');
            res.sendStatus(500); // internal server error
          } else {
            res.sendStatus(201); // UPDATE "tasks" table successul
          }
      }); // end database UPDATE query
    } // end if-else database connection
  }); // end database connection function
}); // end 'add-task' router.post

module.exports = router; // export the router functionality
