require('express-crud')(app);
var User = require('../models/user')
/*
 * GET users listing.
 */

app.crud('users', User);


// exports.list = function(req, res){
//   res.send("respond with a resource");
// };