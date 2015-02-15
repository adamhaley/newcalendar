var mysql 	= require('mysql');
var Sequelize = require("sequelize");
/**
*DB Connection
*/
var config = {
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
};

db = {};
/**
*handle disconnection situations
*/
function connect() {
  var sequelize = new Sequelize(config.database, config.user, config.password, config);
  db.sequelize = sequelize;
  db = mysql.createConnection(config);
  db.connect(function(err) {  
    if(err) {                                     
      console.log('error when connecting to db:', err);
      setTimeout(connect, 2000); 
    }                                     
  });                                     

  db.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
      connect();                         
    } else {                                      
      throw err;                                  
    }
  });
}
/**
*handle it
*/
connect();

exports.db = db;