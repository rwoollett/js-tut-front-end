import express from 'express';
import homepage from './homepage.json';

module.exports = {
  defineApi: function(app: express.Express){
    app.get('/api/v1/homepage', function (req, res) {
      res.send(homepage.homepage);
    });
  }
}