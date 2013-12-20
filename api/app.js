var http 	= require('http');
var mysql 	= require('mysql');
var express = require('express');


var app = express();

var db = mysql.createConnection({
	host     : 'localhost',
	database : 'jjgym_calendar',
	user     : 'root',
	password : 'root',
});

db.connect();

app.get('/', function(req, res){
	res.send('Hi');
});

app.get('/users', function(req, res){
	res.writeHead(200, {"Content-Type": "text/json"});

	db.query('select id, name_first, name_last, username, email from users', function(err,rows){
		if(err){
  			res.end('Query Error: ' . err);
  		}else{
  			res.write(JSON.stringify(rows));
  		}
  		res.end();
  	});

});

app.get('/events', function(req, res){
	res.writeHead(200, {"Content-Type": "text/json"});

	db.query('select * from events', function(err,rows){
		if(err){
  			res.end('Query Error: ' . err);
  		}else{
  			res.write(JSON.stringify(rows));
  		}
  		res.end();
  	});

});

app.listen(2000);