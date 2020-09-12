const express    = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const items = require('./data/data')();
const cars = require('./data/cars')();




module.exports = () => {
  const app = express();

  app.set('port', 5000);

  // MIDDLEWARES
  app.use(cors());
  app.use(bodyParser.json());

  app.route('/items').get((req, res) => {
    setTimeout(() => {
      res.status(200).json(items)
    }, 7000)

  });

  app.route('/cars').get((req, res) => {
    setTimeout(() => {
      res.status(200).json(cars)
    }, 4000)
  });

  return app;
};
