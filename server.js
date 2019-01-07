//  This file contains all of the configuration build functions. Import them with require('./server')

module.exports = {

  // this will export the makeServer function to whatever file requires it. The parameter is the app created
  makeServer: function(app){
    var server = require('http').createServer(app);
    // This exports the server for use in app.js by doing :  server = require('./server');
    return server;
  },

  // takes as a parameter the config = require('config') variable from the app main
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
