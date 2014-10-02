var moment = require('moment');
var _ = require('underscore');
var twix = require('twix');
var intervals = require('interval-query');

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
};

exports.logout = function(req, res){
  res.clearCookie('uid');
  delete req.session.user;
  res.redirect('/');
}

exports.getEvents = function(req, res){
	res.writeHead(200, {"Content-Type": "text/json"});

	var q = "SELECT e.id as id, e.user_id as user_id, "
	q += "CONCAT(e.date, 'T', LPAD(e.time_start,5,'0')) as start, CONCAT(e.date, 'T', LPAD(e.time_end,5,'0')) as end,";
	q += "CONCAT(u.name_first, ' ', u.name_last) as title, e.usage, e.comments as description ";
	q += "FROM events as e, users as u WHERE e.user_id = u.id and e.date >= FROM_UNIXTIME(" + (req.query.start) + ")";
  q += " and e.date <= FROM_UNIXTIME(" + req.query.end + ")";

  // console.log(q);

	db.query(q, function(err,rows){

		if(err){
  			res.end('Query Error: ' . err);
  		}else{
  			res.write(JSON.stringify(rows));
  		}
  		res.end();
  	});

};

exports.putEvents = function(req, res){
  console.log('in putEvents');
  console.log(req);
  res.write(JSON.stringify({message:'ok: PUT events'}));
  res.end();
};

exports.postEvents = function(req, res){
  console.log('time_start: ' + req.body.time_start + ' time_end: ' + req.body.time_end);


  var userId = req.session.user.id;
  var timeStart = moment(req.body.time_start).format('HH:mm');
  var timeEnd = moment(req.body.time_end).format('HH:mm');
  var comments = req.body.note;

  var usage = req.body.usage;
  usage = usage.substring(0, usage.length - 1);//strip off % from end

  var date = moment(req.body.date).format("YYYY-MM-DD");

  var q = "INSERT INTO `events` (`id`, `user_id`, `date`, `time_start`, `time_end`, `comments`, `usage`, `created_at`) VALUES (NULL, '"+userId+"', '"+date+"', '"+timeStart+"', '"+timeEnd+"', '"+comments+"','"+usage+"', CURRENT_TIMESTAMP);";
  // console.log(q);

  db.query(q, function(err,result){
      if(err){
        console.log('QUERY ERROR' + err);
        res.end('Query Error: ' . err);
      }else{
        console.log('QUERY SUCCESS');
        var eventData = {
          id: result.insertId,
          title: req.session.user.name_first + ' ' + req.session.user.name_last,
          description: comments, //<----- description,comments, note are all the same thing depending on where you are. i know, i know. bad bad.
          time_start: req.body.time_start,
          time_end: req.body.time_end,
          usage: usage
        }

        res.write(JSON.stringify(eventData));
      }
      res.end();
  });
};

exports.deleteEvent = function(req, res){
  var q = "DELETE from events where id=" + req.params.id + ";";
  console.log(q);
  db.query(q, function(err,result){
    if(err){
      res.writeHead(500, {"Content-Type": "text/json"});
      console.log('QUERY ERROR' + err);
      res.end('Query Error: ' . err);
    }else{
      res.writeHead(200, {"Content-Type": "text/json"});
      console.log('QUERY SUCCESS');
      res.write(JSON.stringify({response: 'ok'}));
    }
    res.end();
  });
}

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

  var date = moment(req.query.start).format("YYYY-MM-DD");
  var timeStart = moment(req.query.start).format("HH:mm");
  var timeEnd = moment(req.query.end).format("HH:mm");

  q = "SELECT * from events as e where e.date = '" + date + "' ";

  db.query(q, function(err,rows){
    if(err){
        res.end('Query Error: ' . err);
    }else{
      overlappingEvents = _.filter(rows,function(row){
          //if the row overlaps our time boundaries
          var range1 = moment(date + " " + timeStart).twix(date + " " + timeEnd);
          var range2 = moment(date + " " + row.time_start).twix(date + " " + row.time_end);
          if(range2.overlaps(range1)){
            return row;
          } 
      });
      
      //total up percentage
      //loop through every half hour time slot between timeStart and timeEnd
      var maxUsage = 0;
      for(i = 0; moment(date + " " + timeStart).add('minutes', i * 30).isBefore(moment(date + " " + timeEnd)); i++){
        var usage = 0;
        var rangeStart = moment(date + " " + timeStart).add('minutes', i * 30);
        var rangeEnd = moment(date + " " + timeStart).add('minutes', (i+1) * 30);

        //filter overlappingEvents by events that occur in this range
        thisSlotOverlapping = _.filter(rows,function(row){
          //if the row overlaps our time boundaries
          var range1 = rangeStart.twix(rangeEnd);
          var range2 = moment(date + " " + row.time_start).twix(date + " " + row.time_end);
          if(range2.overlaps(range1)){
            return row;
          }
        });
        //add up usage percentage
        _.each(thisSlotOverlapping,function(row){
          usage += parseInt(row.usage);
        });
        maxUsage = usage > maxUsage? usage : maxUsage;
      }

      var out = {
        overlappingEvents: overlappingEvents,
        usage: maxUsage,
        available: 100 - maxUsage
      }

      res.write(JSON.stringify(out));
    }
    res.end();
  });
  
};

exports.checkAvailabilityRange = function(req, res){
    var date = moment(req.query.start).format("YYYY-MM-DD");
    var dateEnd = moment(req.query.endDate).format("YYYY-MM-DD");
    var timeStart = moment(req.query.start).format("HH:mm");
    var timeEnd = moment(req.query.end).format("HH:mm");
 
    var endDate = moment().add('weeks',4);
    console.log('creating dates weekly before Sep 24, 2014');

    var out = {
      dates: []
    }
    var i=0;
    var nextDate = moment();

    for(nextDate = moment(); nextDate.isBefore(endDate); nextDate = nextDate.add('days',7)){
      console.log(nextDate + "\n");
      out.dates.push(nextDate.format('YYYY-MM-DD'));
      
      i++;
    }
    res.writeHead(200, {"Content-Type": "text/json"});
    res.write(JSON.stringify(out));
    res.end();
};
