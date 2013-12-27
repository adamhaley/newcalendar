var http 	= require('http');
var mysql 	= require('mysql');
var express = require('express');
var moment = require('moment');
var _ = require('underscore');


// this code is run twice
// see implementation notes below
console.log(process.pid);

// after this point, we are a daemon
require('daemon')();

// different pid because we are now forked
// original parent has exited
console.log(process.pid);


var app = express();

var db = mysql.createConnection({
	host     : 'jjgym.com',
	database : 'jjgym_calendar_new',
	user     : 'jjgym_root',
	password : 'sl1nkyjuggl3r',
});
/*
var db = mysql.createConnection({
  host     : 'localhost',
  database : 'jjgym_calendar',
  user     : 'root',
  password : 'root'
});
*/
db.connect();

// Add headers
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
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
	q += "CONCAT(e.date, 'T', LPAD(e.time_start,5,'0')) as start, CONCAT(e.date, 'T', LPAD(e.time_end,5,'0')) as end,";
	q += "CONCAT(u.name_first, ' ', u.name_last) as title, e.usage, e.comments as description ";
	q += "FROM events as e, users as u WHERE e.user_id = u.id and e.date >= FROM_UNIXTIME(" + req.query.start + ")";
  q += " and e.date <= FROM_UNIXTIME(" + req.query.end + ")";



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
