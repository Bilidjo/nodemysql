// Module dependencies
 
var express = require('express');
var Client = require('mariasql');
//mysql = require('mysql');
 
/* Application initialization
 
var connection = mysql.createConnection({
host : 'localhost',
user : 'root',
password : 'pizzle'
});*/

var connection = new Client();
connection.connect
(
  {
      host: 'eu-cdbr-azure-west-b.cloudapp.net',
      port: '3306',
      user: 'b3596f3d55219d',
      password: '4043ce20'
  }
);


var app = express();
 
// Database setup
 
connection.query('CREATE DATABASE IF NOT EXISTS test', function (err) {
if (err) throw err;
connection.query('USE test', function (err) {
if (err) throw err;
connection.query('CREATE TABLE IF NOT EXISTS users('
+ 'id INT NOT NULL AUTO_INCREMENT,'
+ 'PRIMARY KEY(id),'
+ 'name VARCHAR(30)'
+ ')', function (err) {
if (err) throw err;
});
});
});
 
// Configuration
 
app.use(express.bodyParser());
 
// Main route sends our HTML file
 
app.get('/', function(req, res) {
res.sendfile(__dirname + '/index.html');
});
 
// Update MySQL database
 
app.post('/users', function (req, res) {
connection.query('INSERT INTO users SET ?', req.body,
function (err, result) {
if (err) throw err;
res.send('User added to database with ID: ' + result.insertId);
}
);
});
 
// Begin listening
 
app.listen(3000);
console.log("Express server listening on port 3000 in %s mode", app.settings.env);