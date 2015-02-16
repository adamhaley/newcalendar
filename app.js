/**
 * Module dependencies.
 */
var express = require('express');
var db = require('./db');

var routes = require('./routes');
// var user = require('./routes/user');

var http = require('http');
var path = require('path');
var flash = require('connect-flash');

var app = express();

app.configure(function() {
	console.log(__dirname);
	app.use(flash());
	app.use(express.static(__dirname + '/public'));
	app.use(express.cookieParser('4n0th3r'));
	app.use(express.cookieSession());
	app.use(express.bodyParser());
	app.use(express.session({ secret: '4n0th3r',cookie: { maxAge: 60000, httpOnly: false }}));
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
app.get('/logout',routes.logout);
app.get('/api/users',routes.users);
app.get('/api/events',routes.getEvents);
app.put('/api/events/', routes.putEvents);
app.post('/api/events/', routes.postEvents);
app.delete('/api/events/:id', routes.deleteEvent);
app.get('/api/check-availability',routes.checkAvailability);

app.get('/api/announcements',routes.getAnnouncements);
//crud for user/events admin
// var User = require('./models/user');
// var Event = require('./models/event');
// var Announcement = require('./models/announcement');

// Event.orm.belongsTo(User.orm);
// User.orm.hasMany(Event.orm, {as: 'Events'});

// var opts = {
//     formatResponse: function(res) {
//     	console.log('in formatResponse');
//     	console.log(res);
//         return {
//             timestamp: Date.now(),
//             payload: result
//         };
//     }
// };

// require('express-crud')(app, opts);

// app.crud('users', User);
// app.crud('events', Event);
// app.crud('announcements', Announcement);
//end crud/REST for user/events admin

app.post('/login', routes.login, function(req, res){
	console.log('in login callback...');
	console.log(req.user);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
