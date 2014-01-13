
/*
 * GET home page.
 */

exports.index = function(req, res){
	console.log(req.session);
  	res.render('index.html', { title: 'Express' });
};

/**
*Passport login stuff
*/
passport = require('passport')
, LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
  	var q = "SELECT * from users where password = '" + password + "';";
  	db.query(q, function(err, user){
  		console.log(user);
		if(err){
			console.log('ERROR');
			return done(err);
  		}
  		if (user.length === 0) {
  			console.log('USER NOT FOUND');
        	return done(null, false, { message: 'Incorrect password.' });
      	}
  		console.log('SUCCESS');
  		req.flash
  		return done(null, user.id, { message: 'Welcome, ' + user[0].name_first + '!'});
  	});
  }
));

exports.login = passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/',
                                   successFlash: true,
                                   failureFlash: true
                                });
exports.loginCallback = function(req, res){
	console.log('in login callback...');
	console.log(req.user);
}
/**
*end passport login stuff
*/


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