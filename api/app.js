var http 	= require('http');
var mysql 	= require('mysql');
var express = require('express');
var moment = require('moment');
var _ = require('underscore');

//config - set 'false' for live
var local = true;

var dbConfig = {};
dbConfig.host = local? 'localhost' : 'jjgym.com';
dbConfig.database = local? 'jjgym_calendar' : 'jjgym_calendar_new';
dbConfig.user = local?  'root' : 'jjgym_root';
dbConfig.password = local? 'root' : 'sl1nkyjuggl3r';

var db = mysql.createConnection(dbConfig);
db.connect();

var app = express();

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

var port = process.env.PORT || 2000;

app.listen(port);
