/*
 * GET home page.
 */
exports.index = function(req, res){
	console.log(req.session);
  	res.render('index.html', {flash: req.flash(), session: req.session});
};

exports.login = function(req, res){
  console.log(req.body);
  var password = req.body.password;
  if(!password){
    req.flash('error','No password given');
    res.redirect('/');
  }
  var q = "SELECT * from users where password = '" + password + "';";
  db.query(q, function(err, user){
    console.log(user);
    if(err){
      console.log('ERROR');
      console.log(err);
      req.flash('error',err);
      return res.redirect('/');

    }
    if (user.length === 0) {
      console.log('USER NOT FOUND');
      req.flash('error','Incorrect password');
      return res.redirect('/');
    }

    console.log('SUCCESS');
    req.flash('info','Login successful!');
    res.cookie('uid', user[0].id, { maxAge: 600000, httpOnly: false});

    req.session.user = user[0];
    res.redirect('/');
    return;
  });  
}

exports.logout = function(req, res){
  res.clearCookie('uid');
  delete req.session.user;
  res.redirect('/');
}

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

exports.checkAvailability = function(req, res){
  res.writeHead(200, {"Content-Type": "text/json"});
  console.log('in checkAvailability');
  res.write("yes!");
  res.end();
};