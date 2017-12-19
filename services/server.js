// dependencies
var express = require('express');
var path    = require('path');
var config  = require('../config.json');

// vars
var app     = express();
var port    = config.port;

// paths
var folder  = path.resolve(__dirname, '..', config.folder);
var view    = path.resolve(folder, 'index.html');

app
  // middleware
  .use(express.static(folder))
  // routes
  .get('/', function(req, res) {
    res.sendFile(view);
  })
  // listen port
  .listen(port, function() {
    console.log('\n  King Of App server is ready');
    console.log('\x1b[36m    http://localhost:' + port + '\n');
  });
