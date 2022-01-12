// External libraries
import express from 'express';
// Local files
import defineApi from './api';

  // = PROD =
 let port:number = 0;
if (!process.env.PORT) {
  // If env has no PORT, we will default to webpack'd env
  port = 8080;
}

  // This is here for simplicity's sake,
  // in a real-world application none of
  // the development code should be copied
  // over to the production server.
  var app = express();
  app.use(express.json());

  // We serve the bundle folder, which
  // should contain an `index.html` and
  // a `bundle.js` file only.
  app.use('/', express.static('dist'));

  // We define the API routes here
  defineApi(app);
  app.get(/.*/, function (req, res) {
    res.sendFile('index.html', { root: __dirname + "./../../dist" });
  })
  
  app.listen(port, function () {
    console.log('Both front-end and API are up!')
  });
