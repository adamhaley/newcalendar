var mysql 	= require('mysql');
/**
*DB Connection
*/
var dbConfig = {
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
};

exports.db;
/**
*handle disconnection situations
*/
function handleDisconnect() {
  db = mysql.createConnection(dbConfig);
  db.connect(function(err) {  
    if(err) {                                     
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); 
    }                                     
  });                                     

  db.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
      handleDisconnect();                         
    } else {                                      
      throw err;                                  
    }
  });
}
/**
*handle it
*/
handleDisconnect();

exports.db = db;