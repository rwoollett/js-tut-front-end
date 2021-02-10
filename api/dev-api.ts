// External libraries
import express from 'express';
import {json} from 'body-parser';

// Local files
var api = require('./api');

// = DEV =
// This stands up the express.js API
var app = express();
app.use(json());

// We define the API routes here
api.defineApi(app);

app.listen(8081, function () {
  console.log('API is up!')
});
