const express    = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const items = require('./data/data')();
const cars = require('./data/cars')();
const user = require('./data/user')();

const list1 = [
  {
    id: 1,
    first_name: 'Elyse',
  },
  {
    id: 2,
    first_name: 'Algo',
  },
];



module.exports = () => {
  const app = express();

  app.set('port', 5000);

  // MIDDLEWARES
  app.use(cors());
  app.use(bodyParser.json());

  app.route('/user').get((req, res) => {
    setTimeout(() => {
      res.status(200).json(user)
    }, 8000)
  });

  app.route('/items')
    .get((req, res) => {
      setTimeout(() => {
          // res.status(200).json(list1);
        // res.status(200).json();
         res.status(400).json();
      }, 100)
  });
  app.route('/items')
    .post((req, res) => {
      setTimeout(() => {
        const item = {
          id: (list1.length + 1),
          first_name: 'Item ' + (list1.length + 1)
        };
        list1.push(item);
        res.status(200).json(item);
      }, 6000);
    });

  app.route('/cars').get((req, res) => {
    setTimeout(() => {
      res.status(200).json(cars)
    }, 4000)
  });

  return app;
};
