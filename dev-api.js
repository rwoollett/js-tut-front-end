// External libraries
var express = require('express');

// Local files
var api = require('./api/api');

// = DEV =
// This stands up the express.js API
var app = express();

// We define the API routes here
api.defineApi(app);

app.listen(8081, function () {
  console.log('API is up!')
});
