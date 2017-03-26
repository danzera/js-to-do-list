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

// 'deleteTask' 'DELETE' request
router.delete('/', function(req, res) {
  // TEST
  console.log('/deleteTask route hit in delete-task.js router'); // server console
  res.sendStatus(200);
  // // add new task to our database
  // pool.connect(function(errorConnectingToDatabase, database, done) {
  //   if (errorConnectingToDatabase) { // error connecting
  //     res.sendStatus(500); // internal server error
  //   } else { // connected to database
  //     // // TEST
  //     console.log('connected to database on /getTasks route');
  //     // SELECT * FROM "tasks";
  //     database.query('SELECT * FROM "tasks";', function(queryError, result) {
  //         done(); // release the connection to the pool
  //         if (queryError) {
  //           console.log('error making select query in get-tasks.js');
  //           res.sendStatus(500); // internal server error
  //         } else {
  //           res.send(result.rows); // SELECT "tasks" table successul
  //         }
  //     }); // end database INSERT query
  //   } // end if-else database connection
  // }); // end database connection function
}); // end 'add-task' router.post

module.exports = router; // export the router functionality
