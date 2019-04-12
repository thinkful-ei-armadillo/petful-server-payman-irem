'use strict';

const express = require('express');
const catsRouter = express.Router();
const CatsService = require('./cats-service');
const { Queue, peek, display, isEmpty } = require('../modules/queue');

catsRouter
  .route('/')
  .get((req, res, next) => {
    CatsService.getAllCats(req.app.get('db'))
      .then(cats => {
        const catQ = new Queue();
        for (let i = 0; i < cats.length; i++) {
          catQ.enqueue(cats[i]);
        }
        res.json({ first: peek(catQ), cats: display(catQ) });
      })
      .catch(next);
  })
  .delete((req, res, next) => {
    CatsService.getAllCats(req.app.get('db'))
      .then(cats => {
        const catQ = new Queue();
        for (let i = 0; i < cats.length; i++) {
          catQ.enqueue(cats[i]);
        }
        catQ.dequeue();
        res.json(204).end();
      })
      .catch(next);
  });

/*catsRouter.route('/:id').get((req, res) => {
  const db = req.app.get('db');
  let id = req.params.id;
  CatsService.getCatDetails(db, id).then(cat => res.json(cat));
});*/

module.exports = catsRouter;
