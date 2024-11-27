/**
 * Module dependencies.
 */
require('dotenv').config();
var express = require('express');
var db = require('./db');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session'); 
var bodyParser = require('body-parser');
var session = require('express-session');
var favicon = require('serve-favicon');

var app = express();

var routes = require('./routes');
// var user = require('./routes/user');

var http = require('http');
var path = require('path');
var flash = require('connect-flash');

var app = express();

var env = process.env.NODE_ENV || 'development';

if(env == 'development'){
	app.use(flash());
    console.log('GOING to include STATIC \n');
    console.log(__dirname + '/public');
	app.use(express.static(__dirname + '/public'));
	app.use(cookieParser('4n0th3r'));
	app.use(cookieSession({
		name: 'session',
		keys: ['key1','key2']
	}));
	app.use(bodyParser());
	app.use(session({ secret: '4n0th3r',cookie: { maxAge: 60000, httpOnly: false }}));
 
}

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

app.engine('html', require('hogan-express'));
app.set('view engine', 'html');

// app.use(favicon());
// app.use(express.logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded());
// app.use(express.methodOverride());


// development only
// if ('development' == app.get('env')) {
//   app.use(express.errorHandler());
// }

app.get('/', routes.index);
app.get('/logout',routes.logout);
app.get('/api/users',routes.users);
app.get('/api/events',routes.getEvents);
app.put('/api/events/', routes.putEvents);
app.post('/api/events/', routes.postEvents);
app.delete('/api/events/:id', routes.deleteEvent);
app.get('/api/check-availability',routes.checkAvailability);

app.get('/api/announcements',routes.getAnnouncements);


app.post('/login', routes.login, function(req, res){
	console.log('in login callback...');
	console.log(req.user);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
