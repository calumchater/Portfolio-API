
module.exports = {

  connectDb: function(config){
    var pg = require('pg');
    var pgClient = new pg.Client({
      database: config.DATABASE.DBNAME,
      host: config.DATABASE.HOST,
      port: config.DATABASE.PORT,
      user: config.DATABASE.USERNAME,
      password: config.DATABASE.PASSWORD
    });
    pgClient.connect();
    return pgClient;
  }
};
