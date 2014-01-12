
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index.html', { title: 'Express' });
};

exports.events = function(req, res){
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
  			/*
  			rows = _.map(rows, function(row,i){
  				row.allDay = false;
          return row;
  			});
  			console.log(rows);	
  			*/
  			res.write(JSON.stringify(rows));
  		}
  		res.end();
  	});

};

exports.users = function(req, res){
	res.writeHead(200, {"Content-Type": "text/json"});

	db.query('select id, name_first, name_last, username, email from users', function(err,rows){

		if(err){
  			res.end('Query Error: ' . err);
  		}else{
  			res.write(JSON.stringify(rows));
  		}
  		res.end();
  	});

};