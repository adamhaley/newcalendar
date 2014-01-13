
/**
 * Module dependencies.
 */

var express = require('express');
var db = require('./db');

var routes = require('./routes');
var user = require('./routes/user');

var http = require('http');
var path = require('path');
var flash = require('connect-flash');


var app = express();

app.configure(function() {
	app.use(flash());
	app.use(express.static('public'));
	app.use(express.cookieParser('4n0th3r'));
	app.use(express.cookieSession());
	app.use(express.bodyParser());
	app.use(express.session({ secret: '4n0th3r',cookie: { maxAge: 60000 }}));
	app.use(app.router);
 
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

app.engine('html', require('hogan-express'));
app.set('view engine', 'html');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/logout',routes.logout);
app.get('/api/users',routes.users);
app.get('/api/events',routes.events);

app.post('/login', routes.login, function(req, res){
	console.log('in login callback...');
	console.log(req.user);
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
