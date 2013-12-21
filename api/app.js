var http 	= require('http');
var mysql 	= require('mysql');
var express = require('express');
var _ = require('underscore');


var app = express();

var db = mysql.createConnection({
	host     : 'jjgym.com',
	database : 'jjgym_calendar_new',
	user     : 'jjgym_root',
	password : 'slinkyjuggler',
});


db.connect();

// Add headers
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();

});



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

	var q = "SELECT e.id as id,"
	q += "CONCAT(e.date, 'T', e.time_start, '-08') as start, CONCAT(e.date, 'T', e.time_end, 'Z') as end,";
	q += "CONCAT(u.name_first, ' ', u.name_last) as title, e.usage ";
	q += "FROM events as e, users as u WHERE e.user_id = u.id";

	db.query(q, function(err,rows){

		if(err){
  			res.end('Query Error: ' . err);
  		}else{
  			rows = _.map(rows, function(row,i){
  				row.allDay = false;
  				return row;
  			});
  			console.log(rows);	
  			res.write(JSON.stringify(rows));
  		}
  		res.end();
  	});

});

app.listen(2000);