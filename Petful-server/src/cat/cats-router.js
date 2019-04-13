'use strict';

const express = require('express');
const catsRouter = express.Router();
const CatsService = require('./cats-service');
const { Queue, peek, display, isEmpty } = require('../modules/queue');
const catQ = new Queue();
const catA = new Array();

catsRouter
  .route('/')
  .get((req, res, next) => {
    if (isEmpty(catQ)) {
      CatsService.getAllCats(req.app.get('db'))
        .then(cats => {
          for (let i = 0; i < cats.length; i++) {
            cats[i].adopted = false;
            catQ.enqueue(cats[i]);
            catA.push(cats[i]);
          }

          res.json(catA);
        })
        .catch(next);
    } else {
      res.json(catA);
    }
  })
  .delete((req, res, next) => {
    debugger;
    const adopted = catQ.dequeue();
    if (adopted !== null) {
      adopted.adopted = true;
    }
    res.json(204).end();
  });

catsRouter.route('/queue').get((req, res, next) => {
  debugger;
  if (catQ.first === null) {
    res.json(null);
  } else {
    res.json(peek(catQ));
  }
});

/*catsRouter.route('/:id').get((req, res) => {
  const db = req.app.get('db');
  let id = req.params.id;
  CatsService.getCatDetails(db, id).then(cat => res.json(cat));
});*/

module.exports = catsRouter;
