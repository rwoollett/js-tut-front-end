// External libraries
var express = require('express');

// Local files
var api = require('./api/api');

  // = PROD =
  // This is here for simplicity's sake,
  // in a real-world application none of
  // the development code should be copied
  // over to the production server.
  var app = express();

  // We serve the bundle folder, which
  // should contain an `index.html` and
  // a `bundle.js` file only.
  app.use('/', express.static('dist'));

  // We define the API routes here
  api.defineApi(app);

  app.listen(8080, function () {
    console.log('Both front-end and API are up!')
  });
